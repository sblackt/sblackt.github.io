import React, { useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Event, TimeSlot } from '../types';
import { firebaseService } from '../services/firebaseService';
import { format, parseISO } from 'date-fns';
import Calendar from './Calendar';
import { DEFAULT_EVENT_TYPE, EVENT_TYPE_OPTIONS } from '../constants/eventTypes';
import './CreateEvent.css';

interface CreateEventProps {
  onEventCreated: (eventId: string) => void;
  onCancel: () => void;
}

const DEFAULT_TIME_SUGGESTIONS = ['17:00', '18:30', '20:00'];

const formatDateLabel = (isoDate: string): string => {
  try {
    return format(parseISO(isoDate), 'EEE, MMM d');
  } catch (error) {
    console.error('Error formatting date label', error);
    return isoDate;
  }
};

const formatTimeLabel = (value: string): string => {
  if (value === 'all-day') {
    return 'All Day';
  }

  const [hours, minutes] = value.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return value;
  }

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return format(date, 'h:mm a');
};

const toMinutes = (value: string): number => {
  if (value === 'all-day') {
    return 0;
  }

  const [hours, minutes] = value.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return 0;
  }
  return hours * 60 + minutes;
};

const sortTimes = (values: string[]): string[] => {
  return values.slice().sort((a, b) => toMinutes(a) - toMinutes(b));
};

const shiftTimeValue = (value: string, offsetMinutes: number): string => {
  const [hours, minutes] = value.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return value;
  }

  const totalMinutes = ((hours * 60 + minutes + offsetMinutes) % (24 * 60) + 24 * 60) % (24 * 60);
  const shiftedHours = Math.floor(totalMinutes / 60);
  const shiftedMinutes = totalMinutes % 60;
  return `${String(shiftedHours).padStart(2, '0')}:${String(shiftedMinutes).padStart(2, '0')}`;
};

const normalizeTimeValue = (value: string): string | undefined => {
  if (!value) {
    return undefined;
  }
  if (value === 'all-day') {
    return 'all-day';
  }

  const [hours, minutes] = value.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return undefined;
  }

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

const CreateEvent: React.FC<CreateEventProps> = ({ onEventCreated, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState(DEFAULT_EVENT_TYPE);
  const [links, setLinks] = useState<Array<{ label: string; url: string }>>([
    { label: '', url: '' }
  ]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [dateTimes, setDateTimes] = useState<Record<string, string[]>>({});
  const [customTimeInputs, setCustomTimeInputs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleDateToggle = (date: string) => {
    try {
      // Ensure the date is in YYYY-MM-DD format in local timezone
      const [year, month, day] = date.split('-').map(Number);
      const pad = (value: number) => value.toString().padStart(2, '0');
      const localDateString = `${year}-${pad(month)}-${pad(day)}`;

      setSelectedDates(prev => {
        if (prev.includes(localDateString)) {
          setDateTimes(current => {
            const next = { ...current };
            delete next[localDateString];
            return next;
          });
          setCustomTimeInputs(current => {
            const next = { ...current };
            delete next[localDateString];
            return next;
          });
          return prev.filter(d => d !== localDateString);
        }

        setDateTimes(current => ({
          ...current,
          [localDateString]: current[localDateString] ?? ['all-day']
        }));
        return [...prev, localDateString];
      });
    } catch (error) {
      console.error('Error toggling date:', error);
      alert('Error selecting date. Please try again.');
    }
  };

  const handleLinkChange = (index: number, field: 'label' | 'url', value: string) => {
    setLinks((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addLink = () => setLinks((prev) => [...prev, { label: '', url: '' }]);

  const removeLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddTime = (date: string, rawValue: string) => {
    const normalized = normalizeTimeValue(rawValue);
    if (!normalized) {
      return;
    }

    setDateTimes(current => {
      const existing = current[date] ?? ['all-day'];
      if (normalized === 'all-day') {
        return {
          ...current,
          [date]: ['all-day']
        };
      }

      const withoutAllDay = existing.filter(time => time !== 'all-day');
      if (withoutAllDay.includes(normalized)) {
        return current;
      }

      return {
        ...current,
        [date]: sortTimes([...withoutAllDay, normalized])
      };
    });
  };

  const handleRemoveTime = (date: string, value: string) => {
    setDateTimes(current => {
      const times = current[date];
      if (!times || times.length <= 1) {
        return current;
      }

      const remaining = times.filter(time => time !== value);
      return {
        ...current,
        [date]: remaining.length > 0 ? remaining : ['all-day']
      };
    });
  };

  const handleCustomTimeSubmit = (date: string) => {
    const pending = customTimeInputs[date];
    if (!pending) {
      alert('Please pick a time first.');
      return;
    }
    handleAddTime(date, pending);
    setCustomTimeInputs(prev => ({ ...prev, [date]: '' }));
  };

  const anchorTime = useMemo(() => {
    for (const date of selectedDates) {
      const times = dateTimes[date];
      if (!times) {
        continue;
      }
      const firstSpecificTime = times.find(time => time !== 'all-day');
      if (firstSpecificTime) {
        return firstSpecificTime;
      }
    }
    return undefined;
  }, [dateTimes, selectedDates]);

  const getSuggestionsForDate = (date: string) => {
    if (anchorTime) {
      const earlier = shiftTimeValue(anchorTime, -30);
      const later = shiftTimeValue(anchorTime, 30);
      return [
        { label: `Match ${formatTimeLabel(anchorTime)}`, value: anchorTime },
        { label: `Earlier (${formatTimeLabel(earlier)})`, value: earlier },
        { label: `Later (${formatTimeLabel(later)})`, value: later }
      ];
    }

    return DEFAULT_TIME_SUGGESTIONS.map(value => ({
      label: formatTimeLabel(value),
      value
    }));
  };

  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    
    selectedDates.forEach(date => {
      const timesForDate = dateTimes[date] ?? ['all-day'];
      timesForDate.forEach(timeValue => {
        slots.push({
          id: uuidv4(),
          date,
          time: timeValue,
          available: [],
          unavailable: []
        });
      });
    });
    
    return slots;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || selectedDates.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      const timeSlots = generateTimeSlots();
      
      const sanitizedLinks = links
        .map(({ label, url }) => ({
          label: label.trim(),
          url: url.trim()
        }))
        .filter(({ label, url }) => label || url);

      const eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'> = {
        title: title.trim(),
        description: description.trim() || '',
        eventType,
        createdBy: 'Anonymous', // You could add user management later
        timeSlots,
        participants: [], // Start with empty participants list
        isActive: true,
        isCompleted: false,
        reactions: {},
        ...(sanitizedLinks.length ? { links: sanitizedLinks } : {})
      };

      const eventId = await firebaseService.createEvent(eventData);
      onEventCreated(eventId);
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!descriptionRef.current) return;

    const textarea = descriptionRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [description]);

  return (
    <div className="create-event">
      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-section">
          <h2>Event Details</h2>
          
          <div className="form-group">
            <label htmlFor="title">Event Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Friday Night Hangout"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description (optional)</label>
            <textarea
              id="description"
              ref={descriptionRef}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your event, location, what to bring, etc."
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Links (optional)</label>
            <p className="form-helper">Add URLs for virtual tables, maps, or RSVP forms.</p>
            <div className="links-grid">
              {links.map((link, index) => (
                <div key={index} className="link-row">
                  <input
                    type="text"
                    placeholder="Label (e.g., Roll20, Zoom, Map)"
                    value={link.label}
                    onChange={(e) => handleLinkChange(index, 'label', e.target.value)}
                  />
                  <input
                    type="url"
                    placeholder="https://..."
                    value={link.url}
                    onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                  />
                  <button
                    type="button"
                    className="remove-link-button"
                    onClick={() => removeLink(index)}
                    aria-label="Remove link"
                    disabled={links.length === 1}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button type="button" className="add-link-button" onClick={addLink}>
              + Add link
            </button>
          </div>

          <div className="form-group">
            <label>Event Type &amp; Theme</label>
            <p className="form-helper">Pick a vibe so friends immediately know what to expect.</p>
            <div className="event-type-grid">
              {EVENT_TYPE_OPTIONS.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  className={`event-type-card ${eventType === option.value ? 'selected' : ''}`}
                  onClick={() => setEventType(option.value)}
                  style={
                    {
                      '--accent-color': option.accent,
                      '--accent-strong': option.accentStrong,
                      '--accent-bg': option.background,
                      '--accent-text': option.text
                    } as React.CSSProperties
                  }
                  aria-pressed={eventType === option.value}
                >
                  <div className="event-type-icon" aria-hidden="true">
                    {option.icon}
                  </div>
                  <div className="event-type-copy">
                    <div className="event-type-label">{option.label}</div>
                    <div className="event-type-description">{option.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>



        <div className="form-section">
          <h2>Available Dates *</h2>
          <Calendar
            selectedDates={selectedDates}
            onDateToggle={handleDateToggle}
            minDate={new Date()}
          />
        </div>

        {selectedDates.length > 0 && (
          <div className="form-section">
            <h2>Times &amp; Smart Suggestions</h2>
            <p className="form-helper">
              Optionally drop preferred start times for each date. We&apos;ll keep suggestions aligned across dates so planning feels cohesive.
            </p>
            <div className="time-planner">
              {[...selectedDates].sort().map(date => {
                const timesForDate = dateTimes[date] ?? ['all-day'];
                const suggestions = getSuggestionsForDate(date);
                const hasAllDay = timesForDate.includes('all-day');

                return (
                  <div key={date} className="date-time-card">
                    <div className="date-time-header">
                      <div>
                        <strong>{formatDateLabel(date)}</strong>
                        <span className="date-time-count">
                          {timesForDate.length} time{timesForDate.length === 1 ? '' : 's'}
                        </span>
                      </div>
                    </div>

                    <div className="time-chip-row">
                      {timesForDate.map((time) => (
                        <div key={time} className="time-chip">
                          <span>{formatTimeLabel(time)}</span>
                          {timesForDate.length > 1 && (
                            <button type="button" onClick={() => handleRemoveTime(date, time)} aria-label={`Remove ${formatTimeLabel(time)}`}>
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="smart-suggestions">
                      <span className="smart-suggestions-label">Smart picks:</span>
                      {suggestions.map(suggestion => (
                        <button
                          type="button"
                          key={`${date}-${suggestion.value}`}
                          className="smart-button"
                          onClick={() => handleAddTime(date, suggestion.value)}
                        >
                          {suggestion.label}
                        </button>
                      ))}
                      <button
                        type="button"
                        className="smart-button"
                        onClick={() => handleAddTime(date, 'all-day')}
                        disabled={hasAllDay && timesForDate.length === 1}
                      >
                        All day
                      </button>
                    </div>

                    <div className="custom-time-row">
                      <label htmlFor={`custom-time-${date}`}>Custom time</label>
                      <input
                        id={`custom-time-${date}`}
                        type="time"
                        value={customTimeInputs[date] ?? ''}
                        onChange={(e) => setCustomTimeInputs(prev => ({ ...prev, [date]: e.target.value }))}
                      />
                      <button type="button" onClick={() => handleCustomTimeSubmit(date)}>
                        + Add time
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent; 

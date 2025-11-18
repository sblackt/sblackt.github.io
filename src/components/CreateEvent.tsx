import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Event, TimeSlot } from '../types';
import { firebaseService } from '../services/firebaseService';
// format import removed since it's no longer used
import Calendar from './Calendar';
import { DEFAULT_EVENT_TYPE, EVENT_TYPE_OPTIONS } from '../constants/eventTypes';
import './CreateEvent.css';

interface CreateEventProps {
  onEventCreated: (eventId: string) => void;
  onCancel: () => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({ onEventCreated, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState(DEFAULT_EVENT_TYPE);
  const [links, setLinks] = useState<Array<{ label: string; url: string }>>([
    { label: '', url: '' }
  ]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  // Remove the old date generation function since we're using the calendar now

  const handleDateToggle = (date: string) => {
    try {
      // Ensure the date is in YYYY-MM-DD format in local timezone
      const [year, month, day] = date.split('-').map(Number);
      const pad = (value: number) => value.toString().padStart(2, '0');
      const localDateString = `${year}-${pad(month)}-${pad(day)}`;
      
      setSelectedDates(prev => 
        prev.includes(localDateString) 
          ? prev.filter(d => d !== localDateString)
          : [...prev, localDateString]
      );
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

  // Time selection removed - focusing on dates only

  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    
    selectedDates.forEach(date => {
      // Create a single time slot for each date (representing the whole day)
      slots.push({
        id: uuidv4(),
        date,
        time: 'all-day', // Special value to indicate all day
        available: [],
        unavailable: []
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

        {/* Time selection removed - focusing on dates only */}

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

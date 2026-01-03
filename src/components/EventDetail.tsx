import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Event, AvailabilityResponse, EventCategory, TimeSlot } from '../types';
import { firebaseService } from '../services/firebaseService';
import { format } from 'date-fns';
import AvailabilityHeatmap from './AvailabilityHeatmap';
import { parseLocalDate } from '../utils/dateUtils';
import { EVENT_TYPE_OPTIONS, getEventTypeConfig } from '../constants/eventTypes';
import './EventDetail.css';

const EVENT_PREVIEW_BASE_URL = process.env.REACT_APP_EVENT_PREVIEW_BASE_URL;

const formatSlotTime = (value: string): string => {
  if (value === 'all-day') {
    return 'All Day';
  }

  const [hours, minutes] = value.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return value;
  }

  const displayDate = new Date();
  displayDate.setHours(hours, minutes, 0, 0);
  return format(displayDate, 'h:mm a');
};

const buildShareLink = (eventId: string): string => {
  if (EVENT_PREVIEW_BASE_URL) {
    const separator = EVENT_PREVIEW_BASE_URL.includes('?') ? '&' : '?';
    return `${EVENT_PREVIEW_BASE_URL}${separator}eventId=${encodeURIComponent(eventId)}`;
  }

  const url = new URL(window.location.href);
  url.searchParams.set('eventId', eventId);
  return url.toString();
};

const copyTextToClipboard = async (value: string): Promise<boolean> => {
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch (error) {
      console.warn('navigator.clipboard failed, falling back to execCommand', error);
    }
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    return successful;
  } catch (error) {
    console.error('Fallback copy failed:', error);
    return false;
  }
};

const buildMapSearchLink = (location: string): string => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
};

interface EventDetailProps {
  event: Event;
  onEventUpdated: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ event, onEventUpdated }) => {
  const [responses, setResponses] = useState<AvailabilityResponse[]>([]);
  const [participantName, setParticipantName] = useState('');
  const [participantNotes, setParticipantNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [pendingChanges, setPendingChanges] = useState<string[]>([]);
  const [savedName, setSavedName] = useState('');
  const [justSaved, setJustSaved] = useState(false);
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const [reactionPickerOpen, setReactionPickerOpen] = useState(false);
  const [planning, setPlanning] = useState(false);
  const [updatingType, setUpdatingType] = useState(false);
  const [editingLocation, setEditingLocation] = useState(false);
  const [locationName, setLocationName] = useState(event.location?.name ?? '');
  const [locationLink, setLocationLink] = useState(event.location?.mapUrl ?? '');
  const [savingLocation, setSavingLocation] = useState(false);
  const [newSlotDate, setNewSlotDate] = useState('');
  const [newSlotTimeType, setNewSlotTimeType] = useState<'all-day' | 'specific'>('all-day');
  const [newSlotTimeValue, setNewSlotTimeValue] = useState('18:00');
  const [addingTimeSlot, setAddingTimeSlot] = useState(false);
  const [cleaningPastSlots, setCleaningPastSlots] = useState(false);
  const normalizeDetailLinks = (links?: Array<{ label: string; url: string }>) =>
    links && links.length > 0 ? links : [{ label: '', url: '' }];
  const [editingDetails, setEditingDetails] = useState(false);
  const [detailsDescription, setDetailsDescription] = useState(event.description ?? '');
  const [detailsImageUrl, setDetailsImageUrl] = useState(event.imageUrl ?? '');
  const [detailsLinks, setDetailsLinks] = useState<Array<{ label: string; url: string }>>(normalizeDetailLinks(event.links));
  const [savingDetails, setSavingDetails] = useState(false);
  const actionsMenuRef = useRef<HTMLDivElement | null>(null);
  const reactionPickerRef = useRef<HTMLDivElement | null>(null);
  const theme = getEventTypeConfig(event.eventType);
  const reactionEmojis = theme.reactions;
  const timeTypeRadioName = `time-kind-${event.id}`;
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const todayIso = format(startOfToday, 'yyyy-MM-dd');
  const pastTimeSlots = event.timeSlots.filter(slot => parseLocalDate(slot.date).getTime() < startOfToday.getTime());
  const hasPastSlots = pastTimeSlots.length > 0;
  const canAddSlot = Boolean(newSlotDate && (newSlotTimeType === 'all-day' || newSlotTimeValue));

  useEffect(() => {
    // Load existing responses for this event
    const loadResponses = async () => {
      try {
        const eventResponses = await firebaseService.getEventResponses(event.id);
        setResponses(eventResponses);
        
        // Set selected dates based on current user's responses
        const currentUserName = savedName || participantName.trim();
        if (currentUserName) {
          const userResponses = eventResponses.filter((r: AvailabilityResponse) => r.participantName === currentUserName);
          const userAvailableDates = new Set<string>();
          
          userResponses.forEach((response: AvailabilityResponse) => {
            if (response.available) {
              const timeSlot = event.timeSlots.find(slot => slot.id === response.timeSlotId);
              if (timeSlot) {
                userAvailableDates.add(timeSlot.date);
              }
            }
            // Load the user's notes if they exist
            if (response.notes && !participantNotes) {
              setParticipantNotes(response.notes);
            }
          });
          
          setSelectedDates(Array.from(userAvailableDates));
        }
      } catch (error) {
        console.error('Error loading responses:', error);
      }
    };

    loadResponses();

    // Subscribe to real-time updates for this event
    const unsubscribe = firebaseService.subscribeToEvent(event.id, (updatedEvent) => {
      if (updatedEvent && !justSaved) {
        // Only reload responses if the event actually changed and we didn't just save
        loadResponses();
      }
    });

    return () => unsubscribe();
  }, [event.id, savedName]);

  useEffect(() => {
    setLocationName(event.location?.name ?? '');
    setLocationLink(event.location?.mapUrl ?? '');
  }, [event.id, event.location?.name, event.location?.mapUrl]);

  useEffect(() => {
    setNewSlotDate('');
    setNewSlotTimeType('all-day');
    setNewSlotTimeValue('18:00');
  }, [event.id]);

  useEffect(() => {
    if (!editingDetails) {
      setDetailsDescription(event.description ?? '');
      setDetailsImageUrl(event.imageUrl ?? '');
      setDetailsLinks(normalizeDetailLinks(event.links));
    }
  }, [editingDetails, event.description, event.imageUrl, event.links]);

  useEffect(() => {
    if (!actionsMenuOpen && !reactionPickerOpen) {
      return;
    }

    const handleDocumentClick = (event: MouseEvent) => {
      const targetNode = event.target as Node;
      if (
        actionsMenuOpen &&
        actionsMenuRef.current &&
        !actionsMenuRef.current.contains(targetNode)
      ) {
        setActionsMenuOpen(false);
      }

      if (
        reactionPickerOpen &&
        reactionPickerRef.current &&
        !reactionPickerRef.current.contains(targetNode)
      ) {
        setReactionPickerOpen(false);
      }
    };

    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (actionsMenuOpen) {
          setActionsMenuOpen(false);
        }
        if (reactionPickerOpen) {
          setReactionPickerOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    document.addEventListener('keydown', handleDocumentKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, [actionsMenuOpen, reactionPickerOpen]);

  const handleDateToggle = (date: string) => {
    if (!participantName.trim()) {
      alert('Please enter your name first');
      return;
    }

    // Update pending changes (not saved yet)
    setPendingChanges(prev => 
      prev.includes(date) 
        ? prev.filter(d => d !== date)
        : [...prev, date]
    );
  };

  const handleSaveAvailability = async () => {
    const trimmedName = participantName.trim();
    const trimmedNotes = participantNotes.trim();

    if (!trimmedName) {
      alert('Please enter your name first');
      return;
    }

    if (pendingChanges.length === 0) {
      alert('No changes to save');
      return;
    }

    setLoading(true);
    
    try {
      // Process all pending changes
      for (const date of pendingChanges) {
        const dateTimeSlots = event.timeSlots.filter(slot => slot.date === date);
        const isCurrentlyAvailable = selectedDates.includes(date);
        
        // Toggle availability for all time slots on this date
        for (const timeSlot of dateTimeSlots) {
          const response: AvailabilityResponse = {
            participantName: trimmedName,
            timeSlotId: timeSlot.id,
            available: !isCurrentlyAvailable,
            eventId: event.id,
            ...(trimmedNotes ? { notes: trimmedNotes } : {})
          };

          await firebaseService.submitResponse(response);
        }
      }
      
      // Update local state
      setSelectedDates(prev => {
        const newSelected = [...prev];
        pendingChanges.forEach(date => {
          if (newSelected.includes(date)) {
            const index = newSelected.indexOf(date);
            newSelected.splice(index, 1);
          } else {
            newSelected.push(date);
          }
        });
        return newSelected;
      });
      
      // Update responses state
      const newResponses: AvailabilityResponse[] = [];
      pendingChanges.forEach(date => {
        const dateTimeSlots = event.timeSlots.filter(slot => slot.date === date);
        const isCurrentlyAvailable = selectedDates.includes(date);
        
        dateTimeSlots.forEach(timeSlot => {
          newResponses.push({
            participantName: trimmedName,
            timeSlotId: timeSlot.id,
            available: !isCurrentlyAvailable,
            eventId: event.id,
            ...(trimmedNotes ? { notes: trimmedNotes } : {})
          });
        });
      });
      
      setResponses(prev => [
        ...prev.filter(r => !(r.participantName === trimmedName && 
          pendingChanges.some(date => event.timeSlots.filter(slot => slot.date === date).some(slot => slot.id === r.timeSlotId)))),
        ...newResponses
      ]);
      
      // Update the event's participants list if this is a new participant
      if (!event.participants.includes(trimmedName)) {
        try {
          await firebaseService.updateEvent(event.id, {
            participants: [...event.participants, trimmedName]
          });
        } catch (error) {
          console.error('Error updating participants list:', error);
        }
      }
      
      // Clear pending changes and save name
      setPendingChanges([]);
      setSavedName(trimmedName);
      setJustSaved(true);
      
      // Reset the justSaved flag after a short delay
      setTimeout(() => setJustSaved(false), 2000);
      
      // Don't call onEventUpdated here as it can cause re-renders
      // The real-time listener will handle updates
      
      alert('Your availability has been saved!');
    } catch (error) {
      console.error('Error saving availability:', error);
      alert('Failed to save availability. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closeActionsMenu = () => setActionsMenuOpen(false);

  const handleCompleteEvent = async () => {
    if (window.confirm('Mark this event as completed?')) {
      try {
        await firebaseService.completeEvent(event.id);
        onEventUpdated();
      } catch (error) {
        console.error('Error completing event:', error);
        alert('Failed to complete event. Please try again.');
      }
    }
  };

  const handleArchiveEvent = async () => {
    if (window.confirm('Archive this event?')) {
      try {
        await firebaseService.archiveEvent(event.id);
        onEventUpdated();
      } catch (error) {
        console.error('Error archiving event:', error);
        alert('Failed to archive event. Please try again.');
      }
    }
  };

  const handleTrashEvent = async () => {
    if (!window.confirm('Move this event to the trash? This will hide it from all lists.')) {
      return;
    }
    try {
      await firebaseService.trashEvent(event.id);
      onEventUpdated();
    } catch (error) {
      console.error('Error trashing event:', error);
      alert('Failed to move event to trash. Please try again.');
    }
  };

  const handleDetailsLinkChange = (index: number, field: 'label' | 'url', value: string) => {
    setDetailsLinks(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleAddDetailsLink = () => {
    setDetailsLinks(prev => [...prev, { label: '', url: '' }]);
  };

  const handleRemoveDetailsLink = (index: number) => {
    setDetailsLinks(prev => {
      if (prev.length === 1) {
        return [{ label: '', url: '' }];
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleCancelDetailsEdit = () => {
    setEditingDetails(false);
    setDetailsDescription(event.description ?? '');
    setDetailsImageUrl(event.imageUrl ?? '');
    setDetailsLinks(normalizeDetailLinks(event.links));
  };

  const handleSaveDetails = async () => {
    const trimmedDescription = detailsDescription.trim();
    const trimmedImage = detailsImageUrl.trim();
    const sanitizedLinks = detailsLinks
      .map(({ label, url }) => ({
        label: label.trim(),
        url: url.trim()
      }))
      .filter(({ label, url }) => label || url);

    setSavingDetails(true);
    try {
      await firebaseService.updateEvent(event.id, {
        description: trimmedDescription,
        imageUrl: trimmedImage || undefined,
        links: sanitizedLinks
      });
      setEditingDetails(false);
    } catch (error) {
      console.error('Error saving event details:', error);
      alert('Failed to update event details. Please try again.');
    } finally {
      setSavingDetails(false);
    }
  };

  const handleGenerateMapLink = () => {
    const trimmedName = locationName.trim();
    if (!trimmedName) {
      alert('Add the location name first.');
      return;
    }
    setLocationLink(buildMapSearchLink(trimmedName));
  };

  const handleCancelLocationEdit = () => {
    setEditingLocation(false);
    setLocationName(event.location?.name ?? '');
    setLocationLink(event.location?.mapUrl ?? '');
  };

  const handleSaveLocation = async () => {
    const trimmedName = locationName.trim();
    const trimmedLink = locationLink.trim();

    if (!trimmedName) {
      alert('Please enter the venue or address.');
      return;
    }

    setSavingLocation(true);
    try {
      await firebaseService.updateEvent(event.id, {
        location: {
          name: trimmedName,
          mapUrl: trimmedLink || buildMapSearchLink(trimmedName)
        }
      });
      setEditingLocation(false);
      onEventUpdated();
    } catch (error) {
      console.error('Error saving location:', error);
      alert('Failed to save the location. Please try again.');
    } finally {
      setSavingLocation(false);
    }
  };

  const handleClearLocation = async () => {
    if (!event.location) {
      setEditingLocation(false);
      setLocationName('');
      setLocationLink('');
      return;
    }

    const shouldRemove = window.confirm('Remove the saved location for this event?');
    if (!shouldRemove) {
      return;
    }

    setSavingLocation(true);
    try {
      await firebaseService.updateEvent(event.id, { location: null });
      setLocationName('');
      setLocationLink('');
      setEditingLocation(false);
      onEventUpdated();
    } catch (error) {
      console.error('Error clearing location:', error);
      alert('Failed to remove the location. Please try again.');
    } finally {
      setSavingLocation(false);
    }
  };

  const handleAddTimeSlotOption = async () => {
    if (!newSlotDate) {
      alert('Pick a date to add.');
      return;
    }

    const selectedDate = parseLocalDate(newSlotDate);
    if (selectedDate.getTime() < startOfToday.getTime()) {
      alert('That date is already in the past.');
      return;
    }

    const normalizedTime = newSlotTimeType === 'all-day' ? 'all-day' : newSlotTimeValue;
    if (newSlotTimeType === 'specific' && !normalizedTime) {
      alert('Choose a start time.');
      return;
    }

    if (newSlotTimeType === 'specific' && !/^\d{2}:\d{2}$/.test(normalizedTime)) {
      alert('Time should look like 18:30.');
      return;
    }

    const duplicateSlot = event.timeSlots.some(
      slot => slot.date === newSlotDate && slot.time === normalizedTime
    );
    if (duplicateSlot) {
      alert('That date and time option already exists.');
      return;
    }

    setAddingTimeSlot(true);
    try {
      const newSlot: TimeSlot = {
        id: uuidv4(),
        date: newSlotDate,
        time: normalizedTime,
        available: [],
        unavailable: []
      };

      await firebaseService.updateEvent(event.id, {
        timeSlots: [...event.timeSlots, newSlot]
      });

      setNewSlotDate('');
      setNewSlotTimeType('all-day');
      setNewSlotTimeValue('18:00');
    } catch (error) {
      console.error('Error adding new time slot:', error);
      alert('Failed to add that date option. Please try again.');
    } finally {
      setAddingTimeSlot(false);
    }
  };

  const handleRemovePastTimeSlots = async () => {
    if (!hasPastSlots) {
      alert('There are no past date options to remove.');
      return;
    }

    const upcoming = event.timeSlots.filter(
      slot => parseLocalDate(slot.date).getTime() >= startOfToday.getTime()
    );

    if (event.timeSlots.length === pastTimeSlots.length) {
      alert('Add at least one future date before removing the final option.');
      return;
    }

    const shouldRemove = window.confirm(
      `Remove ${pastTimeSlots.length} past date option${pastTimeSlots.length !== 1 ? 's' : ''}?`
    );
    if (!shouldRemove) {
      return;
    }

    setCleaningPastSlots(true);
    try {
      const updates: Partial<Event> = { timeSlots: upcoming };

      if (
        event.confirmedTimeSlotId &&
        !upcoming.some(slot => slot.id === event.confirmedTimeSlotId)
      ) {
        updates.confirmedTimeSlotId = null;
      }

      await firebaseService.updateEvent(event.id, updates);
    } catch (error) {
      console.error('Error removing past time slots:', error);
      alert('Failed to remove the past options. Please try again.');
    } finally {
      setCleaningPastSlots(false);
    }
  };

  const handleConfirmTimeSlot = async (timeSlotId: string | null) => {
    setPlanning(true);
    try {
      await firebaseService.updateEvent(event.id, { confirmedTimeSlotId: timeSlotId ?? null });
      onEventUpdated();
    } catch (error) {
      console.error('Error setting planned time:', error);
      alert('Failed to update planned time. Please try again.');
    } finally {
      setPlanning(false);
    }
  };

  const handleChangeEventType = async (type: EventCategory) => {
    if (type === event.eventType) {
      setActionsMenuOpen(false);
      return;
    }
    setUpdatingType(true);
    try {
      await firebaseService.updateEvent(event.id, { eventType: type });
      onEventUpdated();
      setActionsMenuOpen(false);
    } catch (error) {
      console.error('Error updating event type:', error);
      alert('Failed to update event type. Please try again.');
    } finally {
      setUpdatingType(false);
    }
  };

  const getAvailabilityForTimeSlot = (timeSlotId: string) => {
    const slotResponses = responses.filter(r => r.timeSlotId === timeSlotId);
    const available = slotResponses.filter(r => r.available).map(r => r.participantName);
    const unavailable = slotResponses.filter(r => !r.available).map(r => r.participantName);
    
    return { available, unavailable };
  };

  const plannedSlot = event.confirmedTimeSlotId
    ? event.timeSlots.find(slot => slot.id === event.confirmedTimeSlotId)
    : undefined;
  const upcomingSlots = event.timeSlots.filter(
    slot => parseLocalDate(slot.date).getTime() >= startOfToday.getTime()
  );
  const locationDisplayLink = event.location?.name
    ? (event.location.mapUrl || buildMapSearchLink(event.location.name))
    : '';
  const plannedDateShort = plannedSlot
    ? format(parseLocalDate(plannedSlot.date), 'EEE, MMM d')
    : '';
  const plannedDateLong = plannedSlot
    ? format(parseLocalDate(plannedSlot.date), 'EEEE, MMM d')
    : '';
  const plannedTimeLabel = plannedSlot
    ? (plannedSlot.time === 'all-day' ? 'All-day hang' : formatSlotTime(plannedSlot.time))
    : '';
  const timeSlotsToShow = plannedSlot
    ? [plannedSlot]
    : (upcomingSlots.length > 0 ? upcomingSlots : event.timeSlots);

  // Get unique participants from responses
  const uniqueParticipants = Array.from(new Set(responses.map(r => r.participantName)));
  const reactionCounts: Record<string, number> = event.reactions ?? {};
  const sortedReactions = Object.entries(reactionCounts)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);
  const hasReactions = sortedReactions.length > 0;

  const handleReactionClick = async (emoji: string) => {
    try {
      await firebaseService.addReaction(event.id, emoji);
      setReactionPickerOpen(false);
    } catch (error) {
      console.error('Error adding reaction:', error);
      alert('Failed to add reaction. Please try again.');
    }
  };

  const handleCopyLink = async () => {
    const shareLink = buildShareLink(event.id);
    const plannedDateText = plannedSlot ? plannedDateShort : null;

    const shareLines = [
      `${theme.icon} ${event.title}`,
      `Type: ${theme.label}${plannedDateText ? ` • Planned date: ${plannedDateText}` : ''}`,
      shareLink
    ];

    try {
      const copied = await copyTextToClipboard(shareLines.join('\n'));
      if (!copied) {
        throw new Error('Copy failed');
      }
      setActionsMenuOpen(false);
      alert('Event link copied to clipboard');
    } catch (error) {
      console.error('Error copying event link:', error);
      alert('Could not copy the event link. Please try again.');
    }
  };

  const handleCopyLinkUrl = async (url: string) => {
    try {
      const copied = await copyTextToClipboard(url);
      if (!copied) {
        throw new Error('Copy failed');
      }
      alert('Link copied!');
    } catch (error) {
      console.error('Error copying link:', error);
      alert('Could not copy that link. Tap and hold to copy manually.');
    }
  };

  return (
    <div
      className="event-detail"
      style={
        {
          '--accent-color': theme.accent,
          '--accent-strong': theme.accentStrong,
          '--accent-bg': theme.background,
          '--accent-text': theme.text,
          '--card-surface': theme.cardSurface,
          '--card-pattern': theme.cardPattern
        } as React.CSSProperties
      }
    >
      <div className="event-header">
        <div className="event-info">
          <div className="event-title-row">
            <div className="event-type-chip">
              <span className="event-type-icon" aria-hidden="true">{theme.icon}</span>
              <span className="event-type-label">{theme.label}</span>
            </div>
            <h1>{event.title}</h1>
            <span className="event-date">{format(new Date(event.createdAt), 'MMM d, yyyy')}</span>
            {plannedSlot && (
              <span className="planned-badge">
                Planned: {plannedDateShort}
              </span>
            )}
          </div>
          {!editingDetails && (
            <>
              {event.description ? (
                <p className="event-description">{event.description}</p>
              ) : (
                <p className="event-description event-description--empty">
                  Add details so everyone knows what kind of hang this is.
                </p>
              )}

              {event.imageUrl && (
                <div className="event-hero">
                  <img src={event.imageUrl} alt={`${event.title} cover art`} />
                </div>
              )}
            </>
          )}

          <div className="event-details-edit-row">
            <div>
              <p className="event-details-eyebrow">Story &amp; Links</p>
              <p className="event-details-copy">
                Keep the description, cover art, and handy links fresh as plans evolve.
              </p>
            </div>
            {!editingDetails && (
              <button
                type="button"
                className="event-details-button"
                onClick={() => setEditingDetails(true)}
              >
                {(event.description || event.imageUrl || (event.links?.length ?? 0) > 0)
                  ? 'Edit details'
                  : 'Add details'}
              </button>
            )}
          </div>

          {editingDetails ? (
            <div className="event-details-editor">
              <label htmlFor="details-description">Event description</label>
              <textarea
                id="details-description"
                value={detailsDescription}
                onChange={(e) => setDetailsDescription(e.target.value)}
                rows={3}
                placeholder="Drop the vibe, what to bring, or important reminders."
              />

              <label htmlFor="details-image">Cover image URL</label>
              <input
                id="details-image"
                type="url"
                value={detailsImageUrl}
                onChange={(e) => setDetailsImageUrl(e.target.value)}
                placeholder="https://example.com/photo.jpg"
              />

              <div className="event-details-links-header">
                <span>Helpful links</span>
                <button
                  type="button"
                  className="event-details-add-link"
                  onClick={handleAddDetailsLink}
                >
                  + Add link
                </button>
              </div>

              <div className="event-details-links-grid">
                {detailsLinks.map((link, index) => (
                  <div key={index} className="event-details-link-row">
                    <input
                      type="text"
                      placeholder="Label (e.g., Map, RSVP, Roll20)"
                      value={link.label}
                      onChange={(e) => handleDetailsLinkChange(index, 'label', e.target.value)}
                    />
                    <input
                      type="url"
                      placeholder="https://..."
                      value={link.url}
                      onChange={(e) => handleDetailsLinkChange(index, 'url', e.target.value)}
                    />
                    <button
                      type="button"
                      className="event-details-remove-link"
                      onClick={() => handleRemoveDetailsLink(index)}
                      disabled={detailsLinks.length === 1}
                      aria-label="Remove link"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="event-details-editor-actions">
                <button
                  type="button"
                  className="event-location-button secondary"
                  onClick={handleCancelDetailsEdit}
                  disabled={savingDetails}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="event-location-button"
                  onClick={() => void handleSaveDetails()}
                  disabled={savingDetails}
                >
                  {savingDetails ? 'Saving...' : 'Save changes'}
                </button>
              </div>
            </div>
          ) : (
            event.links && event.links.length > 0 && (
              <div className="event-links-list">
                {event.links.map((link, index) => (
                  <div
                    key={`${link.label}-${index}`}
                    className="event-link-chip"
                  >
                    <div className="event-link-chip-text">
                      <span className="event-link-chip-label">{link.label || 'Link'}</span>
                      <span className="event-link-chip-url">{link.url}</span>
                    </div>
                    <div className="event-link-chip-actions">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="event-link-chip-open"
                      >
                        Open
                      </a>
                      <button
                        type="button"
                        className="event-link-chip-copy"
                        onClick={() => void handleCopyLinkUrl(link.url)}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          <div className="event-location-card">
            <div className="event-location-header">
              <p className="event-location-eyebrow">Meetup spot</p>
              {!editingLocation && (
                <button 
                  type="button" 
                  className="event-location-button"
                  onClick={() => setEditingLocation(true)}
                >
                  {event.location ? 'Edit location' : 'Add location'}
                </button>
              )}
            </div>

            {event.location ? (
              <div className="event-location-details">
                <div className="event-location-name">
                  <span className="event-location-pin" aria-hidden="true">📍</span>
                  <span>{event.location.name}</span>
                </div>
                <div className="event-location-actions">
                  {locationDisplayLink && (
                    <a
                      className="event-location-button ghost"
                      href={locationDisplayLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open map
                    </a>
                  )}
                  <button
                    type="button"
                    className="event-location-button secondary"
                    onClick={() => setEditingLocation(true)}
                  >
                    Update
                  </button>
                </div>
              </div>
            ) : (
              <div className="event-location-empty">
                <p>Haven&apos;t picked a venue yet? Once you decide, hit “Add location” to share it.</p>
              </div>
            )}

            {editingLocation && (
              <div className="event-location-form">
                <label htmlFor="location-name">Location name or address</label>
                <input
                  id="location-name"
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="Meeple Tower HQ, 123 Boardwalk Ave"
                />
                <label htmlFor="location-link">Map / directions link (optional)</label>
                <div className="location-link-row">
                  <input
                    id="location-link"
                    type="url"
                    value={locationLink}
                    onChange={(e) => setLocationLink(e.target.value)}
                    placeholder="https://maps.app.goo.gl/..."
                  />
                  <button
                    type="button"
                    className="generate-map-button"
                    onClick={handleGenerateMapLink}
                  >
                    Drop a pin
                  </button>
                </div>
                <p className="location-helper">
                  Leave the link empty and we&apos;ll build a Google Maps search automatically.
                </p>
                <div className="location-form-actions">
                  {event.location && (
                    <button
                      type="button"
                      className="event-location-button ghost"
                      onClick={() => void handleClearLocation()}
                      disabled={savingLocation}
                    >
                      Remove
                    </button>
                  )}
                  <button
                    type="button"
                    className="event-location-button secondary"
                    onClick={handleCancelLocationEdit}
                    disabled={savingLocation}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="event-location-button"
                    onClick={() => void handleSaveLocation()}
                    disabled={savingLocation}
                  >
                    {savingLocation ? 'Saving...' : 'Save location'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="reaction-inline">
            <div className="reaction-summary">
              {hasReactions ? (
                sortedReactions.map(([emoji, count]) => (
                  <span key={emoji} className="event-reaction-pill">
                    <span className="event-reaction-emoji" aria-hidden="true">{emoji}</span>
                    <span className="event-reaction-count">{count}</span>
                  </span>
                ))
              ) : (
                <p className="reaction-empty">No reactions yet. Be the first!</p>
              )}
            </div>
            <div className="reaction-add" ref={reactionPickerRef}>
              <button
                type="button"
                className="reaction-add-button"
                onClick={() => setReactionPickerOpen(prev => !prev)}
                aria-expanded={reactionPickerOpen}
                aria-haspopup="true"
              >
                <span aria-hidden="true">＋</span>
                <span>Add reaction</span>
              </button>
              {reactionPickerOpen && (
                <div className="reaction-picker" role="menu">
                  {reactionEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className="reaction-option"
                      onClick={() => void handleReactionClick(emoji)}
                      role="menuitem"
                    >
                      <span className="reaction-option-emoji" aria-hidden="true">{emoji}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="event-actions" ref={actionsMenuRef}>
          <button
            type="button"
            className="actions-toggle"
            aria-haspopup="true"
            aria-expanded={actionsMenuOpen}
            onClick={() => setActionsMenuOpen(prev => !prev)}
          >
            ⋮
          </button>
          {actionsMenuOpen && (
            <div className="actions-menu" role="menu">
              <button
                type="button"
                className="actions-menu-item"
                role="menuitem"
                onClick={handleCopyLink}
              >
                Copy event link
              </button>
              {!event.isCompleted && (
                <button
                  type="button"
                  className="actions-menu-item"
                  role="menuitem"
                  onClick={() => {
                    closeActionsMenu();
                    void handleCompleteEvent();
                  }}
                >
                  Mark Complete
                </button>
              )}
              <button
                type="button"
                className="actions-menu-item"
                role="menuitem"
                onClick={() => {
                  closeActionsMenu();
                  void handleArchiveEvent();
                }}
              >
                Archive Event
              </button>
              {!event.isTrashed && (
                <button
                  type="button"
                  className="actions-menu-item destructive"
                  role="menuitem"
                  onClick={() => {
                    closeActionsMenu();
                    void handleTrashEvent();
                  }}
                >
                  Move to Trash
                </button>
              )}
              <div className="actions-menu-divider" role="separator"></div>
              <div className="actions-menu-subtitle">Change Event Type</div>
              <div className="actions-type-grid">
                {EVENT_TYPE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`actions-type-button ${event.eventType === option.value ? 'active' : ''}`}
                    onClick={() => void handleChangeEventType(option.value)}
                    disabled={updatingType}
                  >
                    <span className="actions-type-icon" aria-hidden="true">{option.icon}</span>
                    <span className="actions-type-label">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {plannedSlot && (
        <div className="planned-celebration">
          <div className="planned-celebration__content">
            <div className="planned-celebration__emoji" aria-hidden="true">🎉</div>
            <div className="planned-celebration__copy-group">
              <p className="planned-celebration__eyebrow">It's official!</p>
              <h2>{plannedDateLong}</h2>
              <p className="planned-celebration__time">{plannedTimeLabel}</p>
              <p className="planned-celebration__copy">
                Share the plan with the crew or clear it if anything changes.
              </p>
            </div>
          </div>
          <div className="planned-celebration__actions">
            <button
              type="button"
              className="planned-celebration__share"
              onClick={handleCopyLink}
            >
              Share the vibe
            </button>
            <button
              type="button"
              className="planned-celebration__clear"
              onClick={() => handleConfirmTimeSlot(null)}
              disabled={planning}
            >
              Change date
            </button>
          </div>
        </div>
      )}

      <div className="time-slot-manager">
        <div className="time-slot-manager__header">
          <div>
            <p className="event-details-eyebrow">Open Time Options</p>
            <p className="event-details-copy">
              Add fresh dates when plans shift and clear out past options.
            </p>
          </div>
          <button
            type="button"
            className="event-details-button"
            onClick={handleRemovePastTimeSlots}
            disabled={!hasPastSlots || cleaningPastSlots}
          >
            {cleaningPastSlots ? 'Cleaning…' : `Remove past (${pastTimeSlots.length})`}
          </button>
        </div>
        <div className="time-slot-form">
          <div className="time-slot-date">
            <label htmlFor="new-slot-date">New date</label>
            <input
              id="new-slot-date"
              type="date"
              min={todayIso}
              value={newSlotDate}
              onChange={(e) => setNewSlotDate(e.target.value)}
            />
          </div>
          <div className="time-slot-type">
            <label>Time</label>
            <div className="time-type-options" role="radiogroup" aria-label="Time selection">
              <label className={`time-type-pill ${newSlotTimeType === 'all-day' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name={timeTypeRadioName}
                  value="all-day"
                  checked={newSlotTimeType === 'all-day'}
                  onChange={() => setNewSlotTimeType('all-day')}
                />
                All day
              </label>
              <label className={`time-type-pill ${newSlotTimeType === 'specific' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name={timeTypeRadioName}
                  value="specific"
                  checked={newSlotTimeType === 'specific'}
                  onChange={() => setNewSlotTimeType('specific')}
                />
                Specific time
              </label>
            </div>
          </div>
          {newSlotTimeType === 'specific' && (
            <div className="time-slot-time">
              <label htmlFor="new-slot-time">Start time</label>
              <input
                id="new-slot-time"
                type="time"
                value={newSlotTimeValue}
                onChange={(e) => setNewSlotTimeValue(e.target.value)}
              />
            </div>
          )}
          <div className="time-slot-actions">
            <button
              type="button"
              className="save-button"
              onClick={handleAddTimeSlotOption}
              disabled={addingTimeSlot || !canAddSlot}
            >
              {addingTimeSlot ? 'Adding…' : 'Add date option'}
            </button>
          </div>
        </div>
        {hasPastSlots && (
          <p className="time-slot-helper">
            You have {pastTimeSlots.length} past date option{pastTimeSlots.length !== 1 ? 's' : ''}.
            Clean them up to keep the poll fresh.
          </p>
        )}
      </div>

      <div className="participant-input-section">
        <h3>Enter your name to respond:</h3>
        <div className="name-input-row">
          <input
            type="text"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            placeholder="Your name"
            className="name-input"
          />
          {savedName && (
            <div className="saved-name-indicator">
              ✓ Saved as: {savedName}
            </div>
          )}
        </div>
        
        {participantName.trim() && (
          <div className="availability-actions">
            <div className="notes-input-group">
              <label htmlFor="participant-notes">What will you bring? (optional)</label>
              <textarea
                id="participant-notes"
                value={participantNotes}
                onChange={(e) => setParticipantNotes(e.target.value)}
                placeholder="e.g., Snacks, drinks, games, tools, etc."
                className="notes-input"
                rows={2}
              />
            </div>
            <p className="instructions">
              Click on dates below to mark your availability, then click "Save Availability" when done.
            </p>
            {pendingChanges.length > 0 && (
              <div className="pending-changes">
                <span>Pending changes: {pendingChanges.length} date{pendingChanges.length !== 1 ? 's' : ''}</span>
                <button 
                  onClick={handleSaveAvailability}
                  disabled={loading}
                  className="save-button"
                >
                  {loading ? 'Saving...' : 'Save Availability'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <AvailabilityHeatmap
        timeSlots={timeSlotsToShow}
        responses={responses}
        participantName={participantName}
        onDateToggle={handleDateToggle}
        selectedDates={selectedDates}
        pendingChanges={pendingChanges}
        theme={theme}
      />

      {uniqueParticipants.length > 0 && (
        <div className="availability-details">
          <h3>Who's Available When</h3>
          <div className="availability-details-grid">
            {timeSlotsToShow.map((slot) => {
              const { available, unavailable } = getAvailabilityForTimeSlot(slot.id);
              const isPlanned = event.confirmedTimeSlotId === slot.id;
              return (
                <div key={slot.id} className="availability-detail-item">
                  <div className="date-header">
                    <div className="date-header-left">
                      <strong>{format(parseLocalDate(slot.date), 'EEE, MMM d')}</strong>
                      <span>{formatSlotTime(slot.time)}</span>
                    </div>
                    <div className="planned-actions">
                      {isPlanned ? (
                        <button
                          type="button"
                          className="planned-chip planned-chip--active"
                          onClick={() => handleConfirmTimeSlot(null)}
                          disabled={planning}
                        >
                          Planned
                          <span className="planned-chip__action">Clear</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="planned-chip"
                          onClick={() => handleConfirmTimeSlot(slot.id)}
                          disabled={planning}
                        >
                          Set as planned
                        </button>
                      )}
                    </div>
                  </div>
                  {available.length > 0 && (
                    <div className="available-participants">
                      <span className="available-label">Available:</span>
                      {available.map((name, index) => (
                        <span key={name} className="participant-name available">
                          {name}{index < available.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  )}
                  {unavailable.length > 0 && (
                    <div className="unavailable-participants">
                      <span className="unavailable-label">Not Available:</span>
                      {unavailable.map((name, index) => (
                        <span key={name} className="participant-name unavailable">
                          {name}{index < unavailable.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  )}
                  {available.length === 0 && unavailable.length === 0 && (
                    <div className="no-responses">
                      <span>No responses yet</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="participants-list">
        <h3>Participants ({uniqueParticipants.length})</h3>
        <div className="participants-grid">
          {uniqueParticipants.map((participant) => {
            // Find the participant's notes from their responses
            const participantResponse = responses.find(r => r.participantName === participant && r.notes);
            return (
              <div key={participant} className="participant-card">
                <span className="participant-tag">
                  {participant}
                </span>
                {participantResponse?.notes && (
                  <div className="participant-notes">
                    <span className="notes-label">Bringing:</span> {participantResponse.notes}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventDetail; 

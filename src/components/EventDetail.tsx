import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Event, AvailabilityResponse, EventCategory, TimeSlot, AvailabilityPreference } from '../types';
import { firebaseService } from '../services/firebaseService';
import { sendDiscordPlannedNotification } from '../services/discordService';
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

const getAnonymousVoterId = (): string => {
  const key = 'meeple_voter_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = uuidv4();
    localStorage.setItem(key, id);
  }
  return id;
};

const EventDetail: React.FC<EventDetailProps> = ({ event, onEventUpdated }) => {
  const [responses, setResponses] = useState<AvailabilityResponse[]>([]);
  const [participantName, setParticipantName] = useState('');
  const [participantNotes, setParticipantNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Map<string, AvailabilityPreference | null>>(new Map());
  const [pendingChanges, setPendingChanges] = useState<Map<string, AvailabilityPreference | null>>(new Map());
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
  const [openMenuParticipant, setOpenMenuParticipant] = useState<string | null>(null);
  const [deletingParticipant, setDeletingParticipant] = useState<string | null>(null);
  const [locationSectionOpen, setLocationSectionOpen] = useState(false);
  const [addDateSectionOpen, setAddDateSectionOpen] = useState(false);
  const [cleaningPastSlots, setCleaningPastSlots] = useState(false);
  const [hasExpressedInterest, setHasExpressedInterest] = useState(() => {
    try {
      const stored = localStorage.getItem(`interest-${event.id}`);
      return stored === 'true';
    } catch {
      return false;
    }
  });
  const [editingInterest, setEditingInterest] = useState(false);
  const [interestInput, setInterestInput] = useState('');
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
    // Helper function to prioritize preferences
    const getPrefPriority = (pref: AvailabilityPreference | null): number => {
      if (pref === 'preferred') return 3;
      if (pref === 'tentative') return 1;
      if (pref === 'available') return 2;
      return 0;
    };

    // Load existing responses for this event
    const loadResponses = async () => {
      try {
        const eventResponses = await firebaseService.getEventResponses(event.id);
        setResponses(eventResponses);

        // Set selected dates based on current user's responses
        const currentUserName = savedName || participantName.trim();
        if (currentUserName) {
          const userResponses = eventResponses.filter((r: AvailabilityResponse) => r.participantName === currentUserName);
          const userAvailableDates = new Map<string, AvailabilityPreference | null>();

          userResponses.forEach((response: AvailabilityResponse) => {
            if (response.available) {
              const timeSlot = event.timeSlots.find(slot => slot.id === response.timeSlotId);
              if (timeSlot) {
                // Store the preference for this date (default to 'available' if no preference specified)
                const existingPref = userAvailableDates.get(timeSlot.date);
                // If multiple time slots for same date, prefer the higher priority preference
                if (!existingPref || (response.preference && getPrefPriority(response.preference) > getPrefPriority(existingPref))) {
                  userAvailableDates.set(timeSlot.date, response.preference || 'available');
                }
              }
            }
            // Load the user's notes if they exist
            if (response.notes && !participantNotes) {
              setParticipantNotes(response.notes);
            }
          });

          setSelectedDates(userAvailableDates);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.participant-menu')) {
        setOpenMenuParticipant(null);
      }
    };

    if (openMenuParticipant) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openMenuParticipant]);

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

  const handleExpressInterest = async () => {
    if (hasExpressedInterest) return;
    try {
      await firebaseService.addInterest(event.id);
      setHasExpressedInterest(true);
      try {
        localStorage.setItem(`interest-${event.id}`, 'true');
      } catch { /* localStorage unavailable */ }
    } catch (error) {
      console.error('Error expressing interest:', error);
      alert('Failed to register interest. Please try again.');
    }
  };

  const handleSetInterestCount = async () => {
    const value = Number(interestInput);
    if (!Number.isFinite(value) || value < 0) {
      alert('Please enter a valid number (0 or higher).');
      return;
    }
    try {
      await firebaseService.setInterestedCount(event.id, value);
      setEditingInterest(false);
      setInterestInput('');
    } catch (error) {
      console.error('Error setting interest count:', error);
      alert('Failed to update interest count. Please try again.');
    }
  };

  const handleDateToggle = (date: string, preference: AvailabilityPreference | null = null) => {
    if (!participantName.trim()) {
      alert('Please enter your name first');
      return;
    }

    // Update pending changes with the new preference
    setPendingChanges(prev => {
      const newMap = new Map(prev);
      if (preference === null) {
        newMap.delete(date);
      } else {
        newMap.set(date, preference);
      }
      return newMap;
    });
  };

  const handleSaveAvailability = async () => {
    const trimmedName = participantName.trim();
    const trimmedNotes = participantNotes.trim();

    if (!trimmedName) {
      alert('Please enter your name first');
      return;
    }

    if (pendingChanges.size === 0) {
      alert('No changes to save');
      return;
    }

    setLoading(true);

    try {
      // Get the dates that have been changed
      const changedDates = Array.from(pendingChanges.keys());

      // Only delete responses for the specific dates that were changed
      // This preserves all other existing availability selections
      for (const date of changedDates) {
        const dateTimeSlots = event.timeSlots.filter(slot => slot.date === date);
        const timeSlotIds = dateTimeSlots.map(slot => slot.id);

        // Delete responses for this specific date's time slots
        await firebaseService.deleteParticipantTimeSlotResponses(
          event.id,
          trimmedName,
          timeSlotIds
        );
      }

      // Process all pending changes
      for (const [date, preference] of Array.from(pendingChanges.entries())) {
        const dateTimeSlots = event.timeSlots.filter(slot => slot.date === date);

        // Only submit new responses if preference is not null and not unavailable
        // If unavailable, we just delete (already done above) and don't save anything
        if (preference !== null && preference !== 'unavailable') {
          for (const timeSlot of dateTimeSlots) {
            const response: AvailabilityResponse = {
              participantName: trimmedName,
              timeSlotId: timeSlot.id,
              available: true,
              preference: preference, // Store the preference level
              eventId: event.id,
              ...(trimmedNotes ? { notes: trimmedNotes } : {})
            };

            await firebaseService.submitResponse(response);
          }
        }
      }

      // Update local state - merge pending changes into selected dates
      setSelectedDates(prev => {
        const newSelected = new Map(prev);
        pendingChanges.forEach((preference, date) => {
          if (preference === null) {
            newSelected.delete(date);
          } else {
            newSelected.set(date, preference);
          }
        });
        return newSelected;
      });

      // Update responses state - only update responses for changed dates
      const newResponses: AvailabilityResponse[] = [];
      pendingChanges.forEach((preference, date) => {
        const dateTimeSlots = event.timeSlots.filter(slot => slot.date === date);

        // Only add responses if not null and not unavailable
        if (preference !== null && preference !== 'unavailable') {
          dateTimeSlots.forEach(timeSlot => {
            newResponses.push({
              participantName: trimmedName,
              timeSlotId: timeSlot.id,
              available: true,
              preference: preference,
              eventId: event.id,
              ...(trimmedNotes ? { notes: trimmedNotes } : {})
            });
          });
        }
      });

      setResponses(prev => [
        ...prev.filter(r => !(r.participantName === trimmedName &&
          Array.from(pendingChanges.keys()).some(date => event.timeSlots.filter(slot => slot.date === date).some(slot => slot.id === r.timeSlotId)))),
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
      setPendingChanges(new Map());
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

  const handleDeleteParticipant = async (participantNameToDelete: string) => {
    const confirmDelete = window.confirm(
      `Delete all responses from "${participantNameToDelete}"? This action cannot be undone.`
    );

    if (!confirmDelete) {
      setOpenMenuParticipant(null);
      return;
    }

    setDeletingParticipant(participantNameToDelete);
    setOpenMenuParticipant(null);

    try {
      // Delete all responses for this participant
      await firebaseService.deleteParticipantResponses(event.id, participantNameToDelete);

      // Update local state
      setResponses(prev => prev.filter(r => r.participantName !== participantNameToDelete));

      // Remove from participants list if present
      if (event.participants.includes(participantNameToDelete)) {
        await firebaseService.updateEvent(event.id, {
          participants: event.participants.filter(p => p !== participantNameToDelete)
        });
      }

      alert(`Removed all responses from ${participantNameToDelete}`);
    } catch (error) {
      console.error('Error deleting participant responses:', error);
      alert('Failed to delete participant. Please try again.');
    } finally {
      setDeletingParticipant(null);
    }
  };

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

  const handleRescheduleVote = async (vote: 'yes' | 'no') => {
    const voterId = getAnonymousVoterId();
    if (event.rescheduleVote?.voters.includes(voterId)) return;
    try {
      await firebaseService.castRescheduleVote(event.id, vote, voterId);
      onEventUpdated();
    } catch (error) {
      console.error('Error casting reschedule vote:', error);
      alert('Failed to record your vote. Please try again.');
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
      const isReschedule = !!event.confirmedTimeSlotId && timeSlotId !== null && timeSlotId !== event.confirmedTimeSlotId;
      await firebaseService.updateEvent(event.id, { confirmedTimeSlotId: timeSlotId ?? null });
      onEventUpdated();

      if (timeSlotId !== null) {
        const slot = event.timeSlots.find(s => s.id === timeSlotId);
        if (slot) {
          const shareLink = buildShareLink(event.id);
          sendDiscordPlannedNotification(event, slot, shareLink, isReschedule).catch(err => {
            console.error('Discord notification failed:', err);
          });
        }
      }
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
    const available = slotResponses
      .filter(r => r.available)
      .map(r => ({ name: r.participantName, preference: r.preference || 'available' }));
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
            <div
              className="event-location-header collapsible-header"
              onClick={() => setLocationSectionOpen(!locationSectionOpen)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLocationSectionOpen(!locationSectionOpen);
                }
              }}
            >
              <p className="event-location-eyebrow">
                <span className="collapse-arrow">{locationSectionOpen ? '▼' : '▶'}</span>
                Meetup spot {event.location && `— ${event.location.name}`}
              </p>
            </div>

            {locationSectionOpen && (
              <>
                {!editingLocation && (
                  <button
                    type="button"
                    className="event-location-button"
                    onClick={() => setEditingLocation(true)}
                  >
                    {event.location ? 'Edit location' : 'Add location'}
                  </button>
                )}
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
                    <p>Haven&apos;t picked a venue yet? Once you decide, hit "Add location" to share it.</p>
                  </div>
                )}
              </>
            )}

            {locationSectionOpen && editingLocation && (
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

          <div className="interest-section">
            <div className="interest-row">
              <button
                type="button"
                className={`interest-button ${hasExpressedInterest ? 'interested' : ''}`}
                onClick={() => void handleExpressInterest()}
                disabled={hasExpressedInterest}
              >
                <span aria-hidden="true">{hasExpressedInterest ? '✓' : '✋'}</span>
                <span>{hasExpressedInterest ? "You're interested" : "I'm Interested"}</span>
              </button>
              <span className="interest-count">
                {event.interestedCount ?? 0} interested
              </span>
              {!editingInterest ? (
                <button
                  type="button"
                  className="interest-edit-toggle"
                  onClick={() => {
                    setInterestInput(String(event.interestedCount ?? 0));
                    setEditingInterest(true);
                  }}
                  aria-label="Edit interest count"
                >
                  ✏️
                </button>
              ) : (
                <div className="interest-edit-inline">
                  <input
                    type="number"
                    min="0"
                    value={interestInput}
                    onChange={(e) => setInterestInput(e.target.value)}
                    className="interest-edit-input"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') void handleSetInterestCount();
                      if (e.key === 'Escape') setEditingInterest(false);
                    }}
                  />
                  <button
                    type="button"
                    className="interest-edit-save"
                    onClick={() => void handleSetInterestCount()}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="interest-edit-cancel"
                    onClick={() => setEditingInterest(false)}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          {event.rescheduleVote && (() => {
            const vote = event.rescheduleVote!;
            const interestedCount = event.interestedCount ?? 0;
            const totalVotes = vote.yesVotes + vote.noVotes;
            const hasVoted = vote.voters.includes(getAnonymousVoterId());
            const noWins = vote.noVotes > vote.yesVotes && totalVotes >= interestedCount && interestedCount > 0;

            return (
              <div className="reschedule-vote-card">
                <p className="reschedule-vote-question">Should this event be rescheduled?</p>
                {!hasVoted ? (
                  <div className="reschedule-vote-buttons">
                    <button
                      type="button"
                      className="reschedule-vote-btn yes"
                      onClick={() => void handleRescheduleVote('yes')}
                    >
                      ✅ Yes, let's reschedule
                    </button>
                    <button
                      type="button"
                      className="reschedule-vote-btn no"
                      onClick={() => void handleRescheduleVote('no')}
                    >
                      ❌ No, let's call it
                    </button>
                  </div>
                ) : (
                  <p className="reschedule-vote-voted">You've voted.</p>
                )}
                <p className="reschedule-vote-tally">
                  {vote.yesVotes} reschedule · {vote.noVotes} cancel
                  {totalVotes > 0 && ` (${totalVotes} ${totalVotes === 1 ? 'vote' : 'votes'})`}
                </p>
                {noWins && (
                  <div className="reschedule-vote-cancel-prompt">
                    <p>The group voted to cancel this event.</p>
                    <button
                      type="button"
                      className="reschedule-vote-archive-btn"
                      onClick={() => void handleArchiveEvent()}
                    >
                      Archive this event
                    </button>
                  </div>
                )}
              </div>
            );
          })()}

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
                onClick={() => {
                  closeActionsMenu();
                  setEditingDetails(true);
                }}
              >
                Edit Details
              </button>
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
              {!event.rescheduleVote && (
                <button
                  type="button"
                  className="actions-menu-item"
                  role="menuitem"
                  onClick={() => {
                    closeActionsMenu();
                    void firebaseService.startRescheduleVote(event.id);
                  }}
                >
                  Start Reschedule Vote
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
        <div
          className="time-slot-manager__header collapsible-header"
          onClick={() => setAddDateSectionOpen(!addDateSectionOpen)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setAddDateSectionOpen(!addDateSectionOpen);
            }
          }}
        >
          <div>
            <p className="event-details-eyebrow">
              <span className="collapse-arrow">{addDateSectionOpen ? '▼' : '▶'}</span>
              Open Time Options
            </p>
            <p className="event-details-copy">
              Add fresh dates when plans shift and clear out past options.
            </p>
          </div>
          {addDateSectionOpen && (
            <button
              type="button"
              className="event-details-button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemovePastTimeSlots();
              }}
              disabled={!hasPastSlots || cleaningPastSlots}
            >
              {cleaningPastSlots ? 'Cleaning…' : `Remove past (${pastTimeSlots.length})`}
            </button>
          )}
        </div>
        {addDateSectionOpen && (
          <>
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
          </>
        )}
      </div>

      <div className="availability-section">
        <div className="availability-section-header">
          <h3>Your Availability</h3>
          <p className="availability-section-description">
            Enter your name and select which dates work for you
          </p>
        </div>

        <div className="participant-input-section">
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
                <label htmlFor="participant-notes">Comments (optional)</label>
                <textarea
                  id="participant-notes"
                  value={participantNotes}
                  onChange={(e) => setParticipantNotes(e.target.value)}
                  placeholder="Add any notes or comments..."
                  className="notes-input"
                  rows={2}
                />
              </div>
              <p className="instructions">
                Click on dates below to mark your availability, then click "Save Availability" when done.
              </p>
              {pendingChanges.size > 0 && (
                <div className="pending-changes">
                  <span>Pending changes: {pendingChanges.size} date{pendingChanges.size !== 1 ? 's' : ''}</span>
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
      </div>

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
                      {available.map(({ name, preference }, index) => {
                        const prefClass = preference === 'preferred' ? 'preferred' : preference === 'tentative' ? 'tentative' : 'available';
                        const icon = preference === 'preferred' ? '★ ' : preference === 'tentative' ? '? ' : '';
                        return (
                          <React.Fragment key={name}>
                            <span className={`participant-name ${prefClass}`}>{icon}{name}</span>
                            {index < available.length - 1 && ', '}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  )}
                  {unavailable.length > 0 && (
                    <div className="unavailable-participants">
                      <span className="unavailable-label">Not Available:</span>
                      {unavailable.map((name, index) => (
                        <React.Fragment key={name}>
                          <span className="participant-name unavailable">{name}</span>
                          {index < unavailable.length - 1 && ', '}
                        </React.Fragment>
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
            const isDeleting = deletingParticipant === participant;
            const isMenuOpen = openMenuParticipant === participant;

            return (
              <div key={participant} className="participant-card">
                <div className="participant-card-header">
                  <span className="participant-tag">
                    {participant}
                  </span>
                  <div className="participant-menu">
                    <button
                      className="participant-menu-button"
                      onClick={() => setOpenMenuParticipant(isMenuOpen ? null : participant)}
                      disabled={isDeleting}
                      aria-label="Participant options"
                    >
                      ⋮
                    </button>
                    {isMenuOpen && (
                      <div className="participant-menu-dropdown">
                        <button
                          className="participant-menu-item delete"
                          onClick={() => handleDeleteParticipant(participant)}
                          disabled={isDeleting}
                        >
                          🗑️ Delete Responses
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {participantResponse?.notes && (
                  <div className="participant-notes">
                    <span className="notes-label">Comments:</span> {participantResponse.notes}
                  </div>
                )}
                {isDeleting && (
                  <div className="participant-deleting">Deleting...</div>
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

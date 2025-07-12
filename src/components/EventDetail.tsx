import React, { useState, useEffect } from 'react';
import { Event, AvailabilityResponse } from '../types';
import { firebaseService } from '../services/firebaseService';
import { format } from 'date-fns';
import AvailabilityHeatmap from './AvailabilityHeatmap';
import './EventDetail.css';

interface EventDetailProps {
  event: Event;
  onEventUpdated: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ event, onEventUpdated }) => {
  const [responses, setResponses] = useState<AvailabilityResponse[]>([]);
  const [participantName, setParticipantName] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [pendingChanges, setPendingChanges] = useState<string[]>([]);
  const [savedName, setSavedName] = useState('');
  const [justSaved, setJustSaved] = useState(false);

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
    if (!participantName.trim()) {
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
            participantName: participantName.trim(),
            timeSlotId: timeSlot.id,
            available: !isCurrentlyAvailable,
            eventId: event.id // Add the event ID to link the response
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
            participantName: participantName.trim(),
            timeSlotId: timeSlot.id,
            available: !isCurrentlyAvailable,
            eventId: event.id
          });
        });
      });
      
      setResponses(prev => [
        ...prev.filter(r => !(r.participantName === participantName.trim() && 
          pendingChanges.some(date => event.timeSlots.filter(slot => slot.date === date).some(slot => slot.id === r.timeSlotId)))),
        ...newResponses
      ]);
      
      // Update the event's participants list if this is a new participant
      if (!event.participants.includes(participantName.trim())) {
        try {
          await firebaseService.updateEvent(event.id, {
            participants: [...event.participants, participantName.trim()]
          });
        } catch (error) {
          console.error('Error updating participants list:', error);
        }
      }
      
      // Clear pending changes and save name
      setPendingChanges([]);
      setSavedName(participantName.trim());
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

  const getAvailabilityForTimeSlot = (timeSlotId: string) => {
    const slotResponses = responses.filter(r => r.timeSlotId === timeSlotId);
    const available = slotResponses.filter(r => r.available).map(r => r.participantName);
    const unavailable = slotResponses.filter(r => !r.available).map(r => r.participantName);
    
    return { available, unavailable };
  };

  const getBestTimeSlots = () => {
    return event.timeSlots
      .map(slot => {
        const { available, unavailable } = getAvailabilityForTimeSlot(slot.id);
        const score = available.length - unavailable.length;
        return { ...slot, score, available, unavailable };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  };

  const bestSlots = getBestTimeSlots();

  // Get unique participants from responses
  const uniqueParticipants = Array.from(new Set(responses.map(r => r.participantName)));

  return (
    <div className="event-detail">
      <div className="event-header">
        <div className="event-info">
          <div className="event-title-row">
            <h1>{event.title}</h1>
            <span className="event-date">{format(new Date(event.createdAt), 'MMM d, yyyy')}</span>
          </div>
          {event.description && <p className="event-description">{event.description}</p>}
        </div>
        
        <div className="event-actions">
          {!event.isCompleted && (
            <button onClick={handleCompleteEvent} className="complete-button">
              Mark Complete
            </button>
          )}
          <button onClick={handleArchiveEvent} className="archive-button">
            Archive
          </button>
        </div>
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

      {bestSlots.length > 0 && (
        <div className="best-times">
          <h3>Best Times (based on responses)</h3>
          <div className="best-times-grid">
            {bestSlots.map((slot) => (
              <div key={slot.id} className="best-time-slot">
                <div className="time-info">
                  <strong>{format(new Date(slot.date), 'EEE, MMM d')}</strong>
                  <span>{slot.time === 'all-day' ? 'All Day' : slot.time}</span>
                </div>
                <div className="availability-summary">
                  <span className="available-count">✓ {slot.available.length}</span>
                  <span className="unavailable-count">✗ {slot.unavailable.length}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AvailabilityHeatmap
        timeSlots={event.timeSlots}
        responses={responses}
        participantName={participantName}
        onDateToggle={handleDateToggle}
        selectedDates={selectedDates}
        pendingChanges={pendingChanges}
      />

      {uniqueParticipants.length > 0 && (
        <div className="availability-details">
          <h3>Who's Available When</h3>
          <div className="availability-details-grid">
            {event.timeSlots.map((slot) => {
              const { available, unavailable } = getAvailabilityForTimeSlot(slot.id);
              return (
                <div key={slot.id} className="availability-detail-item">
                  <div className="date-header">
                    <strong>{format(new Date(slot.date), 'EEE, MMM d')}</strong>
                    <span>{slot.time === 'all-day' ? 'All Day' : slot.time}</span>
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
          {uniqueParticipants.map((participant) => (
            <span key={participant} className="participant-tag">
              {participant}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetail; 
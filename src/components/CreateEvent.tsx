import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Event, TimeSlot } from '../types';
import { firebaseService } from '../services/firebaseService';
// format import removed since it's no longer used
import Calendar from './Calendar';
import './CreateEvent.css';

interface CreateEventProps {
  onEventCreated: (eventId: string) => void;
  onCancel: () => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({ onEventCreated, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Remove the old date generation function since we're using the calendar now

  const handleDateToggle = (date: string) => {
    try {
      setSelectedDates(prev => 
        prev.includes(date) 
          ? prev.filter(d => d !== date)
          : [...prev, date]
      );
    } catch (error) {
      console.error('Error toggling date:', error);
      alert('Error selecting date. Please try again.');
    }
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
      
      const eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'> = {
        title: title.trim(),
        description: description.trim() || '',
        createdBy: 'Anonymous', // You could add user management later
        timeSlots,
        participants: [], // Start with empty participants list
        isActive: true,
        isCompleted: false
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
              placeholder="e.g., Friday Night Board Games"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description (optional)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What games will we play? Any special instructions?"
              rows={3}
            />
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
import React from 'react';
import { Event } from '../types';
import { format } from 'date-fns';
import './EventList.css';

interface EventListProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  onCreateEvent: () => void;
}

const EventList: React.FC<EventListProps> = ({ events, onEventClick, onCreateEvent }) => {
  if (events.length === 0) {
    return (
      <div className="event-list">
        <div className="empty-state">
          <div className="empty-icon">🎲</div>
          <h2>No events yet!</h2>
          <p>Create your first board game night to get started.</p>
          <button className="primary-button" onClick={onCreateEvent}>
            Create Event
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="event-list">
      <div className="events-grid">
        {events.map((event) => (
          <div 
            key={event.id} 
            className="event-card"
            onClick={() => onEventClick(event)}
          >
            <div className="event-header">
              <h3 className="event-title">{event.title}</h3>
              <span className={`event-status ${event.isCompleted ? 'completed' : 'active'}`}>
                {event.isCompleted ? 'Completed' : 'Active'}
              </span>
            </div>
            
            {event.description && (
              <p className="event-description">{event.description}</p>
            )}
            
            <div className="event-meta">
              <div className="meta-item">
                <span className="meta-label">Created:</span>
                <span className="meta-value">
                  {format(new Date(event.createdAt), 'MMM d, yyyy')}
                </span>
              </div>
              
              <div className="meta-item">
                <span className="meta-label">Time Slots:</span>
                <span className="meta-value">{event.timeSlots.length}</span>
              </div>
              
              <div className="meta-item">
                <span className="meta-label">Participants:</span>
                <span className="meta-value">{event.participants.length}</span>
              </div>
            </div>
            
            <div className="event-participants">
              {event.participants.slice(0, 3).map((participant, index) => (
                <span key={index} className="participant-tag">
                  {participant}
                </span>
              ))}
              {event.participants.length > 3 && (
                <span className="participant-more">
                  +{event.participants.length - 3} more
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList; 
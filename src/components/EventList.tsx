import React from 'react';
import { Event } from '../types';
import { format } from 'date-fns';
import CalendarIcon from './CalendarIcon';
import { getEventTypeConfig } from '../constants/eventTypes';
import { parseLocalDate } from '../utils/dateUtils';
import './EventList.css';

interface EventListProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  onCreateEvent: () => void;
  filter: 'active' | 'history';
  onFilterChange: (filter: 'active' | 'history') => void;
}

const EventList: React.FC<EventListProps> = ({
  events,
  onEventClick,
  onCreateEvent,
  filter,
  onFilterChange
}) => {
  const isHistoryView = filter === 'history';

  return (
    <div className="event-list">
      <div className="event-list-header">
        <div>
          <h2 className="event-list-title">
            {isHistoryView ? 'Event History' : 'Active Events'}
          </h2>
          <p className="event-list-subtitle">
            {isHistoryView
              ? 'Review completed and archived sessions.'
              : 'Track ongoing scheduling threads.'}
          </p>
        </div>
        <div className="event-filters">
          <button
            type="button"
            className={`filter-button ${!isHistoryView ? 'active' : ''}`}
            onClick={() => onFilterChange('active')}
          >
            Active
          </button>
          <button
            type="button"
            className={`filter-button ${isHistoryView ? 'active' : ''}`}
            onClick={() => onFilterChange('history')}
          >
            History
          </button>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <CalendarIcon />
          </div>
          <h2>{isHistoryView ? 'No past events yet' : 'No events yet!'}</h2>
          <p>
            {isHistoryView
              ? 'Completed or archived events will appear here after you close them out.'
              : 'Create your first event to get started.'}
          </p>
          {!isHistoryView && (
            <button className="primary-button" onClick={onCreateEvent}>
              Create Event
            </button>
          )}
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => {
            const theme = getEventTypeConfig(event.eventType);
            const plannedSlot = event.confirmedTimeSlotId
              ? event.timeSlots.find(slot => slot.id === event.confirmedTimeSlotId)
              : undefined;

            return (
              <div 
                key={event.id} 
                className="event-card"
                onClick={() => onEventClick(event)}
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
                  <div className="event-header-left">
                    <div className="event-type-badge">
                      <span className="event-type-icon" aria-hidden="true">{theme.icon}</span>
                      <span className="event-type-label">{theme.label}</span>
                    </div>
                    <h3 className="event-title">{event.title}</h3>
                  </div>
                  {event.isCompleted && (
                    <span className="event-status completed">
                      Completed
                    </span>
                  )}
                </div>

                {plannedSlot && (
                  <div className="event-planned-pill">
                    Planned: {format(parseLocalDate(plannedSlot.date), 'MMM d, yyyy')}
                  </div>
                )}
                
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

                {event.reactions && Object.keys(event.reactions).length > 0 && (
                  <div className="event-reactions">
                    {Object.entries(event.reactions)
                      .filter(([, count]) => count > 0)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 4)
                      .map(([emoji, count]) => (
                        <span key={emoji} className="event-reaction-pill">
                          <span className="event-reaction-emoji" aria-hidden="true">{emoji}</span>
                          <span className="event-reaction-count">{count}</span>
                        </span>
                      ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventList; 

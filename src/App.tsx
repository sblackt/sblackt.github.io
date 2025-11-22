import React, { useState, useEffect } from 'react';
import './App.css';
import { Event } from './types';
import { firebaseService } from './services/firebaseService';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import CreateEvent from './components/CreateEvent';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [view, setView] = useState<'list' | 'detail' | 'create'>('list');
  const [loading, setLoading] = useState(true);
  const [eventsFilter, setEventsFilter] = useState<'active' | 'history'>('active');
  const [deepLinkEventId, setDeepLinkEventId] = useState<string | null>(null);
  const [initialDeepLinkHandled, setInitialDeepLinkHandled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('eventId');

    if (eventId) {
      setDeepLinkEventId(eventId);
    } else {
      setInitialDeepLinkHandled(true);
    }
  }, []);

  useEffect(() => {
    // Subscribe to real-time updates for active or archived events
    setLoading(true);
    const subscribe = eventsFilter === 'active'
      ? firebaseService.subscribeToActiveEvents
      : firebaseService.subscribeToArchivedEvents;

    const unsubscribe = subscribe((updatedEvents) => {
      setEvents(updatedEvents);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [eventsFilter]);

  useEffect(() => {
    if (!deepLinkEventId || initialDeepLinkHandled) {
      return;
    }

    const matchFromList = events.find((evt) => evt.id === deepLinkEventId);

    const loadEvent = async () => {
      if (matchFromList) {
        setCurrentEvent(matchFromList);
        setView('detail');
        setEventsFilter(matchFromList.isActive ? 'active' : 'history');
        setInitialDeepLinkHandled(true);
        return;
      }

      try {
        const fetchedEvent = await firebaseService.getEvent(deepLinkEventId);
        if (fetchedEvent) {
          setCurrentEvent(fetchedEvent);
          setView('detail');
          setEventsFilter(fetchedEvent.isActive ? 'active' : 'history');
        }
      } catch (error) {
        console.error('Error loading linked event:', error);
      } finally {
        setInitialDeepLinkHandled(true);
      }
    };

    void loadEvent();
  }, [deepLinkEventId, events, initialDeepLinkHandled]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (view === 'detail' && currentEvent) {
      params.set('eventId', currentEvent.id);
    } else {
      params.delete('eventId');
    }

    const newSearch = params.toString();
    const newUrl = newSearch ? `${window.location.pathname}?${newSearch}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [view, currentEvent]);

  useEffect(() => {
    if (!currentEvent) {
      return;
    }

    const updated = events.find((evt) => evt.id === currentEvent.id);
    if (updated && updated.updatedAt !== currentEvent.updatedAt) {
      setCurrentEvent(updated);
    }
  }, [events, currentEvent]);

  const handleEventClick = (event: Event) => {
    setCurrentEvent(event);
    setView('detail');
  };

  const handleCreateEvent = () => {
    setView('create');
  };

  const handleBackToList = () => {
    setView('list');
    setCurrentEvent(null);
  };

  const handleEventCreated = (eventId: string) => {
    // The real-time listener will automatically update the events list
    setView('list');
  };

  const handleEventUpdated = () => {
    // The real-time listener will automatically update the events list
    // Navigate back to list view
    setView('list');
    setCurrentEvent(null);
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header 
        onBackToList={view !== 'list' ? handleBackToList : undefined}
        onCreateEvent={view === 'list' ? handleCreateEvent : undefined}
        currentView={view}
      />
      
      <main className="main-content">
        {view === 'list' && (
          <EventList 
            events={events}
            onEventClick={handleEventClick}
            onCreateEvent={handleCreateEvent}
            filter={eventsFilter}
            onFilterChange={setEventsFilter}
          />
        )}
        
        {view === 'detail' && currentEvent && (
          <ErrorBoundary>
            <EventDetail 
              event={currentEvent}
              onEventUpdated={handleEventUpdated}
            />
          </ErrorBoundary>
        )}
        
        {view === 'create' && (
          <ErrorBoundary>
            <CreateEvent 
              onEventCreated={handleEventCreated}
              onCancel={handleBackToList}
            />
          </ErrorBoundary>
        )}
      </main>
    </div>
  );
}

export default App;

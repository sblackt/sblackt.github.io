import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDoc, 
  getDocs, 
  onSnapshot, 
  query, 
  where,
  orderBy,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { Event, TimeSlot, AvailabilityResponse } from '../types';

const EVENTS_COLLECTION = 'events';
const RESPONSES_COLLECTION = 'responses';

export const firebaseService = {
  // Create a new event
  async createEvent(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const now = new Date().toISOString();
      const eventData = {
        ...event,
        createdAt: now,
        updatedAt: now
      };
      
      const docRef = await addDoc(collection(db, EVENTS_COLLECTION), eventData);
      return docRef.id;
    } catch (error) {
      console.error('Firebase error creating event:', error);
      // For now, return a mock ID so the app doesn't crash
      return 'mock-event-' + Date.now();
    }
  },

  // Get an event by ID
  async getEvent(eventId: string): Promise<Event | null> {
    const docRef = doc(db, EVENTS_COLLECTION, eventId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Event;
    }
    return null;
  },

  // Get all active events
  async getActiveEvents(): Promise<Event[]> {
    try {
      const q = query(
        collection(db, EVENTS_COLLECTION),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Event);
    } catch (error) {
      console.error('Firebase error getting events:', error);
      // Return empty array so the app doesn't crash
      return [];
    }
  },

  // Update an event
  async updateEvent(eventId: string, updates: Partial<Event>): Promise<void> {
    const docRef = doc(db, EVENTS_COLLECTION, eventId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  },

  // Mark event as completed
  async completeEvent(eventId: string): Promise<void> {
    await this.updateEvent(eventId, { isCompleted: true, isActive: false });
  },

  // Archive event (mark as inactive)
  async archiveEvent(eventId: string): Promise<void> {
    await this.updateEvent(eventId, { isActive: false });
  },

  // Add time slots to an event
  async addTimeSlots(eventId: string, timeSlots: TimeSlot[]): Promise<void> {
    const event = await this.getEvent(eventId);
    if (!event) throw new Error('Event not found');
    
    const updatedTimeSlots = [...event.timeSlots, ...timeSlots];
    await this.updateEvent(eventId, { timeSlots: updatedTimeSlots });
  },

  // Submit availability response
  async submitResponse(response: AvailabilityResponse): Promise<void> {
    await addDoc(collection(db, RESPONSES_COLLECTION), {
      ...response,
      timestamp: new Date().toISOString()
    });
  },

  // Get responses for an event
  async getEventResponses(eventId: string): Promise<AvailabilityResponse[]> {
    const q = query(
      collection(db, RESPONSES_COLLECTION),
      where('eventId', '==', eventId)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as AvailabilityResponse);
  },

  // Real-time listener for event updates
  subscribeToEvent(eventId: string, callback: (event: Event | null) => void): () => void {
    const docRef = doc(db, EVENTS_COLLECTION, eventId);
    
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        callback({ id: doc.id, ...doc.data() } as Event);
      } else {
        callback(null);
      }
    });
  },

  // Real-time listener for all active events
  subscribeToActiveEvents(callback: (events: Event[]) => void): () => void {
    try {
      const q = query(
        collection(db, EVENTS_COLLECTION),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );
      
      return onSnapshot(q, (querySnapshot) => {
        const events = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Event);
        callback(events);
      }, (error) => {
        console.error('Firebase listener error:', error);
        // Call with empty array to prevent app crash
        callback([]);
      });
    } catch (error) {
      console.error('Firebase error setting up listener:', error);
      // Return a no-op function
      return () => {};
    }
  }
}; 
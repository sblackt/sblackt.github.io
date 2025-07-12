export interface TimeSlot {
  id: string;
  date: string; // ISO date string
  time: string; // 'all-day' or HH:MM format
  available: string[]; // Array of participant names
  unavailable: string[]; // Array of participant names
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  timeSlots: TimeSlot[];
  participants: string[];
  isActive: boolean;
  isCompleted: boolean;
}

export interface Participant {
  name: string;
  color: string;
}

export interface AvailabilityResponse {
  participantName: string;
  timeSlotId: string;
  available: boolean;
  eventId?: string; // Optional for backward compatibility
} 
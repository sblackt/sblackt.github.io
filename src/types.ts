export interface TimeSlot {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  time: string; // 'all-day' or HH:mm range
  available: string[];
  unavailable: string[];
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

export interface AvailabilityResponse {
  participantName: string;
  timeSlotId: string;
  available: boolean;
  eventId: string;
  notes?: string;
  timestamp?: string;
}


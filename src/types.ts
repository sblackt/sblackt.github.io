export interface TimeSlot {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  time: string; // 'all-day' or HH:mm range
  available: string[];
  unavailable: string[];
}

export type EventCategory = 'board-game' | 'hangout' | 'worker-bee' | 'dnd' | 'other';

export interface Event {
  id: string;
  title: string;
  description?: string;
  eventType?: EventCategory;
  confirmedTimeSlotId?: string | null;
  links?: Array<{ label: string; url: string }>;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  timeSlots: TimeSlot[];
  participants: string[];
  isActive: boolean;
  isCompleted: boolean;
  reactions?: Record<string, number>;
  reminderSettings?: {
    daysBefore?: number[];
  };
  remindersSent?: Record<string, string>;
}

export interface AvailabilityResponse {
  participantName: string;
  timeSlotId: string;
  available: boolean;
  eventId: string;
  notes?: string;
  timestamp?: string;
}

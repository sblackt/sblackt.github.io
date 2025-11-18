import { EventCategory } from '../types';

export type EventTypeConfig = {
  value: EventCategory;
  label: string;
  description: string;
  icon: string;
  accent: string;
  accentStrong: string;
  background: string;
  text: string;
  cardSurface: string;
  cardPattern?: string;
  reactions: string[];
};

const EVENT_TYPE_MAP: Record<EventCategory, EventTypeConfig> = {
  'board-game': {
    value: 'board-game',
    label: 'Board Game Night',
    description: 'Meeples, dice, cards, snacks.',
    icon: '🎲',
    accent: '#667eea',
    accentStrong: '#764ba2',
    background: 'rgba(102, 126, 234, 0.08)',
    text: '#2d2f55',
    cardSurface: '#ffffff',
    cardPattern: 'radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.14), transparent 45%), radial-gradient(circle at 80% 10%, rgba(118, 75, 162, 0.18), transparent 40%)',
    reactions: ['🎲', '🙌', '🤓', '😂', '🔥', '👍']
  },
  hangout: {
    value: 'hangout',
    label: 'Hangout',
    description: 'Chill vibes, music, conversation.',
    icon: '🎉',
    accent: '#f59e0b',
    accentStrong: '#ef4444',
    background: 'rgba(245, 158, 11, 0.12)',
    text: '#5b3706',
    cardSurface: '#fffdf7',
    cardPattern: 'radial-gradient(circle at 20% 20%, rgba(245, 158, 11, 0.12), transparent 40%), radial-gradient(circle at 80% 0%, rgba(239, 68, 68, 0.12), transparent 36%)',
    reactions: ['🎉', '😊', '🥳', '✨', '🍻', '👍']
  },
  'worker-bee': {
    value: 'worker-bee',
    label: 'Worker Bee',
    description: 'Help out, build, fix, lend a hand.',
    icon: '🛠️',
    accent: '#10b981',
    accentStrong: '#059669',
    background: 'rgba(16, 185, 129, 0.12)',
    text: '#064e3b',
    cardSurface: '#f7fffb',
    cardPattern: 'radial-gradient(circle at 15% 25%, rgba(16, 185, 129, 0.12), transparent 40%), radial-gradient(circle at 85% 20%, rgba(5, 150, 105, 0.12), transparent 38%)',
    reactions: ['🛠️', '✅', '💪', '🙌', '🚀', '👍']
  },
  dnd: {
    value: 'dnd',
    label: 'D&D Quest',
    description: 'Swords, spells, dragons, roleplay.',
    icon: '⚔️',
    accent: '#ef4444',
    accentStrong: '#b91c1c',
    background: 'rgba(239, 68, 68, 0.12)',
    text: '#7f1d1d',
    cardSurface: '#fff7f7',
    cardPattern: 'radial-gradient(circle at 10% 10%, rgba(239, 68, 68, 0.14), transparent 35%), radial-gradient(circle at 90% 8%, rgba(185, 28, 28, 0.12), transparent 35%)',
    reactions: ['⚔️', '🛡️', '🐉', '🧙‍♂️', '🎲', '✨']
  },
  other: {
    value: 'other',
    label: 'Just a Plan',
    description: 'Anything else you want to organize.',
    icon: '📅',
    accent: '#3b82f6',
    accentStrong: '#1d4ed8',
    background: 'rgba(59, 130, 246, 0.1)',
    text: '#1e3a8a',
    cardSurface: '#f8fbff',
    cardPattern: 'radial-gradient(circle at 12% 14%, rgba(59, 130, 246, 0.12), transparent 38%), radial-gradient(circle at 88% 8%, rgba(29, 78, 216, 0.12), transparent 36%)',
    reactions: ['📅', '✅', '🙌', '🙂', '👍', '🔥']
  }
};

export const DEFAULT_EVENT_TYPE: EventCategory = 'board-game';

export const getEventTypeConfig = (type?: EventCategory | string): EventTypeConfig => {
  if (!type) {
    return EVENT_TYPE_MAP[DEFAULT_EVENT_TYPE];
  }

  const normalized = type as EventCategory;
  return EVENT_TYPE_MAP[normalized] ?? EVENT_TYPE_MAP[DEFAULT_EVENT_TYPE];
};

export const EVENT_TYPE_OPTIONS = Object.values(EVENT_TYPE_MAP);

import { Event, TimeSlot } from '../types';
import { format } from 'date-fns';
import { parseLocalDate } from '../utils/dateUtils';
import { getEventTypeConfig } from '../constants/eventTypes';

const WEBHOOK_URL = process.env.REACT_APP_DISCORD_WEBHOOK_URL;

const formatTime = (time: string): string => {
  if (time === 'all-day') return 'All day';
  const [hours, minutes] = time.split(':').map(Number);
  if (Number.isNaN(hours)) return time;
  const d = new Date();
  d.setHours(hours, minutes, 0, 0);
  return format(d, 'h:mm a');
};

export const sendDiscordPlannedNotification = async (
  event: Event,
  slot: TimeSlot,
  shareLink: string,
  isReschedule: boolean
): Promise<void> => {
  if (!WEBHOOK_URL) return;

  const theme = getEventTypeConfig(event.eventType);
  const dateStr = format(parseLocalDate(slot.date), 'EEEE, MMMM d');
  const timeStr = formatTime(slot.time);
  const verb = isReschedule ? 'rescheduled' : 'happening';
  const headline = isReschedule
    ? `📅 **${event.title}** has been rescheduled!`
    : `🎉 **${event.title}** is officially on!`;

  const body = {
    embeds: [
      {
        title: event.title,
        url: shareLink,
        color: parseInt(theme.accent.replace('#', ''), 16),
        description: `${theme.icon} ${theme.label}`,
        fields: [
          { name: 'Date', value: dateStr, inline: true },
          { name: 'Time', value: timeStr, inline: true },
        ],
        footer: { text: `It's ${verb} — mark your calendar!` },
      },
    ],
    content: headline,
  };

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Discord webhook failed: ${response.status}`);
  }
};

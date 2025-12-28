import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { differenceInCalendarDays, format } from 'date-fns';
import { ADAFRUIT_DEFAULT_HISTORY_LIMIT, fetchAdafruitHistory } from './adafruit';

admin.initializeApp();

const firestore = admin.firestore();
const EVENTS_COLLECTION = 'events';

type EventCategory = 'board-game' | 'hangout' | 'worker-bee' | 'dnd' | 'other';

interface TimeSlot {
  id: string;
  date: string;
  time: string;
}

interface EventLocation {
  name: string;
  mapUrl?: string;
}

interface PlannerEvent {
  title: string;
  description?: string;
  imageUrl?: string;
  eventType?: EventCategory;
  confirmedTimeSlotId?: string | null;
  timeSlots: TimeSlot[];
  participants?: string[];
  reminderSettings?: {
    daysBefore?: number[];
  };
  remindersSent?: Record<string, string>;
  location?: EventLocation | null;
}

const EVENT_TYPE_MAP: Record<EventCategory, {
  label: string;
  icon: string;
  accent: string;
  embedColor: number;
}> = {
  'board-game': {
    label: 'Board Game',
    icon: '🎲',
    accent: '#6C5CE7',
    embedColor: 0x6C5CE7
  },
  hangout: {
    label: 'Hangout',
    icon: '🧋',
    accent: '#00B894',
    embedColor: 0x00B894
  },
  'worker-bee': {
    label: 'Worker Bee',
    icon: '🛠️',
    accent: '#E17055',
    embedColor: 0xE17055
  },
  dnd: {
    label: 'D&D',
    icon: '🐉',
    accent: '#E84393',
    embedColor: 0xE84393
  },
  other: {
    label: 'Event',
    icon: '📅',
    accent: '#0984E3',
    embedColor: 0x0984E3
  }
};

const DEFAULT_REMINDER_DAYS = [3, 1, 0];

const parseLocalDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const formatSlotTime = (value: string): string => {
  if (value === 'all-day') {
    return 'All Day';
  }

  const [hours, minutes] = value.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return value;
  }

  const displayDate = new Date();
  displayDate.setHours(hours, minutes, 0, 0);
  return format(displayDate, 'h:mm a');
};

const getAppBaseUrl = (): string => {
  return functions.config().app?.base_url ?? 'https://stevemwhite.com/planner';
};

const getPreviewBaseUrl = (): string | undefined => {
  return functions.config().app?.preview_url;
};

type ShareImageConfig = Record<EventCategory | 'default', string>;

const getShareImageMap = (): ShareImageConfig => {
  const raw = functions.config().app?.share_images as Record<string, string> | undefined;
  if (!raw) {
    return { default: functions.config().app?.share_image_url ?? `${getAppBaseUrl()}/share-card.png` } as ShareImageConfig;
  }

  const normalized: ShareImageConfig = {
    default: raw.default ?? functions.config().app?.share_image_url ?? `${getAppBaseUrl()}/share-card.png`,
    'board-game': raw['board-game'] ?? raw.boardgame,
    hangout: raw['hangout'],
    'worker-bee': raw['worker-bee'] ?? raw.workerbee,
    dnd: raw['dnd'],
    other: raw['other']
  };

  return normalized;
};

const getShareImageUrl = (type?: EventCategory | null): string => {
  const map = getShareImageMap();
  if (!type) {
    return map.default;
  }
  return map[type] ?? map.default;
};

const getReminderDays = (): number[] => {
  const configured = functions.config().app?.reminder_days as string | undefined;
  if (!configured) {
    return DEFAULT_REMINDER_DAYS;
  }

  const parsed = configured
    .split(',')
    .map(token => Number(token.trim()))
    .filter((value) => Number.isFinite(value));

  return parsed.length > 0 ? parsed : DEFAULT_REMINDER_DAYS;
};

const getReminderToken = (): string | undefined => {
  return functions.config().app?.reminder_token;
};

const getEventTypeConfig = (type?: EventCategory | null) => {
  if (!type) {
    return EVENT_TYPE_MAP.other;
  }

  return EVENT_TYPE_MAP[type] ?? EVENT_TYPE_MAP.other;
};

const buildAppEventLink = (eventId: string): string => {
  const url = new URL(getAppBaseUrl());
  url.searchParams.set('eventId', eventId);
  return url.toString();
};

const buildShareLink = (eventId: string): string => {
  const previewBase = getPreviewBaseUrl();
  if (!previewBase) {
    return buildAppEventLink(eventId);
  }

  const separator = previewBase.includes('?') ? '&' : '?';
  return `${previewBase}${separator}eventId=${encodeURIComponent(eventId)}`;
};

const getPlannedSlot = (event: PlannerEvent) => {
  if (!event.confirmedTimeSlotId) {
    return undefined;
  }

  return event.timeSlots?.find(slot => slot.id === event.confirmedTimeSlotId);
};

const escapeHtml = (value: string): string => {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case '\'':
        return '&#039;';
      default:
        return char;
    }
  });
};

const renderPreviewHtml = (params: { title: string; description: string; url: string; imageUrl: string }) => {
  const { title, description, url, imageUrl } = params;
  const escapedTitle = escapeHtml(title);
  const escapedDescription = escapeHtml(description);
  const escapedUrl = escapeHtml(url);
  const escapedImage = escapeHtml(imageUrl);

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta property="og:title" content="${escapedTitle}" />
    <meta property="og:description" content="${escapedDescription}" />
    <meta property="og:url" content="${escapedUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${escapedImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapedTitle}" />
    <meta name="twitter:description" content="${escapedDescription}" />
    <meta name="twitter:image" content="${escapedImage}" />
    <meta http-equiv="refresh" content="0; url=${escapedUrl}" />
    <title>${escapedTitle}</title>
  </head>
  <body style="font-family: system-ui, sans-serif; padding: 2rem;">
    <p>Redirecting to <a href="${escapedUrl}">${escapedTitle}</a>…</p>
    <p>If you are not redirected automatically, <a href="${escapedUrl}">click here</a>.</p>
  </body>
</html>`;
};

const getDiscordWebhookUrl = (type?: EventCategory | null): string | undefined => {
  const discordConfig = functions.config().discord as {
    webhook_url?: string;
    webhooks?: Record<string, string>;
  } | undefined;

  if (!discordConfig) {
    return undefined;
  }

  if (type && discordConfig.webhooks) {
    const map = discordConfig.webhooks;
    const explicit = map[type];
    if (explicit) {
      return explicit;
    }
  }

  return discordConfig.webhook_url;
};

const sendDiscordReminder = async (params: {
  event: PlannerEvent;
  eventId: string;
  plannedDate: Date;
  daysUntil: number;
}) => {
  const { event, eventId, plannedDate, daysUntil } = params;
  const webhookUrl = getDiscordWebhookUrl(event.eventType);
  if (!webhookUrl) {
    functions.logger.warn('Skipping reminder because discord.webhook_url is not set.');
    return;
  }

  const theme = getEventTypeConfig(event.eventType);
  const eventLink = buildAppEventLink(eventId);
  const shareLink = buildShareLink(eventId);
  const plannedDateText = format(plannedDate, 'EEE, MMM d');
  const plannedSlot = getPlannedSlot(event);
  const plannedTimeText = plannedSlot ? formatSlotTime(plannedSlot.time) : undefined;
  const participantCount = event.participants?.length ?? 0;
  const friendlyTiming = daysUntil === 0
    ? 'is happening today'
    : daysUntil === 1
      ? 'is happening tomorrow'
      : `is happening in ${daysUntil} days`;
  const friendlyLink = `[Open event details](${shareLink})`;
  const locationName = event.location?.name?.trim();
  const locationLink = event.location?.mapUrl?.trim();
  const locationMarkdown = locationName
    ? (locationLink ? `[${locationName}](${locationLink})` : locationName)
    : undefined;
  const embedImageUrl = event.imageUrl?.trim() || getShareImageUrl(event.eventType);
  const descriptionLines = [
    `${theme.label} planned for **${plannedDateText}**${plannedTimeText ? ` • ${plannedTimeText}` : ''}`,
    `Participants: ${participantCount}`
  ];

  if (locationMarkdown) {
    descriptionLines.push(`Location: ${locationMarkdown}`);
  }

  const payload = {
    username: 'Meeple Planner',
    embeds: [
      {
        title: `${theme.icon} ${event.title}`,
        description: descriptionLines.join('\n'),
        url: eventLink,
        color: theme.embedColor,
        ...(embedImageUrl ? { image: { url: embedImageUrl } } : {}),
        footer: {
          text: 'Shared via Meeple Planner'
        }
      }
    ],
    content: [
      `Heads up! **${event.title}** ${friendlyTiming}.`,
      shareLink,
      friendlyLink,
      plannedTimeText ? `Time: ${plannedTimeText}` : null,
      locationName ? `Location: ${locationName}${locationLink ? ` (${locationLink})` : ''}` : null
    ]
      .filter(Boolean)
      .join('\n')
  };

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Discord webhook failed: ${response.status} ${body}`);
  }
};

export const eventPreview = functions.https.onRequest(async (req, res) => {
  const eventIdFromQuery = typeof req.query.eventId === 'string' ? req.query.eventId : undefined;
  const pathSegments = req.path.split('/').filter(Boolean);
  const fallbackEventId = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : undefined;
  const eventId = eventIdFromQuery ?? fallbackEventId;

  if (!eventId) {
    res.status(400).send('Missing eventId');
    return;
  }

  try {
    const snapshot = await firestore.collection(EVENTS_COLLECTION).doc(eventId).get();
    if (!snapshot.exists) {
      res.status(404).send('Event not found');
      return;
    }

    const event = snapshot.data() as PlannerEvent;
    const theme = getEventTypeConfig(event.eventType);
    const plannedSlot = getPlannedSlot(event);
    const plannedDateText = plannedSlot
      ? format(parseLocalDate(plannedSlot.date), 'EEE, MMM d')
      : 'Date TBD';
    const plannedTimeText = plannedSlot ? formatSlotTime(plannedSlot.time) : undefined;
    const locationName = event.location?.name?.trim();
    const locationLink = event.location?.mapUrl?.trim();
    const descriptionParts: string[] = [];

    if (plannedSlot) {
      descriptionParts.push(`${theme.label} planned for ${plannedDateText}${plannedTimeText ? ` • ${plannedTimeText}` : ''}`);
    } else {
      descriptionParts.push(`${theme.label} date to be determined`);
    }

    if (locationName) {
      descriptionParts.push(`Location: ${locationName}${locationLink ? ` (${locationLink})` : ''}`);
    }

    if (event.description?.trim()) {
      descriptionParts.push(event.description.trim());
    }

    const description = descriptionParts.join(' • ').slice(0, 240);

    const previewImage = event.imageUrl?.trim() || getShareImageUrl(event.eventType);

    const html = renderPreviewHtml({
      title: `${theme.icon} ${event.title}`,
      description,
      url: buildAppEventLink(eventId),
      imageUrl: previewImage
    });

    res.set('Cache-Control', 'public, max-age=300, s-maxage=1800');
    res.status(200).send(html);
  } catch (error) {
    functions.logger.error('eventPreview', error);
    res.status(500).send('Internal error');
  }
});

export const adafruitHistory = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  const limitParam = typeof req.query.limit === 'string' ? Number(req.query.limit) : undefined;
  const startParam = typeof req.query.start === 'string' ? Number(new Date(req.query.start).getTime()) : undefined;
  const endParam = typeof req.query.end === 'string' ? Number(new Date(req.query.end).getTime()) : undefined;
  const limit = Number.isFinite(limitParam) ? limitParam : ADAFRUIT_DEFAULT_HISTORY_LIMIT;

  try {
    const history = await fetchAdafruitHistory({
      limit,
      startTime: startParam,
      endTime: endParam
    });
    const payload = history.map((point) => ({
      value: Number(point.value.toFixed(3)),
      timestamp: point.timestamp
    }));
    res.set('Cache-Control', 'public, max-age=30, s-maxage=60');
    res.status(200).json({
      count: payload.length,
      newest: payload[payload.length - 1]?.timestamp ?? null,
      oldest: payload[0]?.timestamp ?? null,
      points: payload
    });
  } catch (error) {
    functions.logger.error('adafruitHistory', error);
    res.status(500).json({ error: (error as Error).message });
  }
});

const runReminderJob = async () => {
  const now = new Date();
  const todaysKey = format(now, 'yyyy-MM-dd');
  const reminderDefaults = getReminderDays();

  try {
    const snapshot = await firestore.collection(EVENTS_COLLECTION)
      .where('isActive', '==', true)
      .get();

    const reminders = snapshot.docs.map(async (doc) => {
      const event = doc.data() as PlannerEvent;
      const plannedSlot = getPlannedSlot(event);
      if (!plannedSlot) {
        return;
      }

      const reminderDays = event.reminderSettings?.daysBefore?.length
        ? event.reminderSettings.daysBefore
        : reminderDefaults;

      const plannedDate = parseLocalDate(plannedSlot.date);
      const daysUntil = differenceInCalendarDays(plannedDate, now);

      if (daysUntil < 0 || !reminderDays.includes(daysUntil)) {
        return;
      }

      const reminderKey = String(daysUntil);
      if (event.remindersSent?.[reminderKey] === todaysKey) {
        return;
      }

      try {
        await sendDiscordReminder({
          event,
          eventId: doc.id,
          plannedDate,
          daysUntil
        });

        await doc.ref.set({
          remindersSent: {
            ...(event.remindersSent ?? {}),
            [reminderKey]: todaysKey
          }
        }, { merge: true });

        functions.logger.info('Sent reminder', { eventId: doc.id, reminderKey });
      } catch (error) {
        functions.logger.error('Failed to send reminder', { eventId: doc.id, error });
      }
    });

    await Promise.all(reminders);
  } catch (error) {
    functions.logger.error('runReminderJob', error);
    throw error;
  }
};

export const triggerEventReminders = functions.https.onRequest(async (req, res) => {
  const expectedToken = getReminderToken();
  if (!expectedToken) {
    res.status(500).send('Reminder token not configured');
    return;
  }

  const tokenFromQuery = typeof req.query.token === 'string' ? req.query.token : undefined;
  const tokenFromHeader = req.header('x-reminder-token');
  const providedToken = tokenFromQuery ?? tokenFromHeader;

  if (providedToken !== expectedToken) {
    res.status(403).send('Invalid token');
    return;
  }

  try {
    await runReminderJob();
    res.status(200).send('Reminders processed');
  } catch (error) {
    res.status(500).send('Reminder job failed');
  }
});

export const onEventPlanned = functions.firestore
  .document(`${EVENTS_COLLECTION}/{eventId}`)
  .onUpdate(async (change, context) => {
    const before = change.before.data() as PlannerEvent | undefined;
    const after = change.after.data() as PlannerEvent | undefined;

    if (!after) {
      return;
    }

    const wasPlanned = Boolean(before?.confirmedTimeSlotId);
    const isPlanned = Boolean(after.confirmedTimeSlotId);
    const announcementAlreadySent = Boolean(before?.remindersSent?.plannedAnnouncement);

    if (!isPlanned || wasPlanned || announcementAlreadySent) {
      return;
    }

    const plannedSlot = getPlannedSlot(after);
    if (!plannedSlot) {
      functions.logger.warn('onEventPlanned: planned slot not found', { eventId: context.params.eventId });
      return;
    }

    const now = new Date();
    const plannedDate = parseLocalDate(plannedSlot.date);
    const daysUntil = differenceInCalendarDays(plannedDate, now);

    if (!Number.isFinite(daysUntil) || daysUntil < 0) {
      functions.logger.warn('onEventPlanned: invalid daysUntil value', {
        eventId: context.params.eventId,
        plannedSlot,
        daysUntil
      });
      return;
    }

    try {
      await sendDiscordReminder({
        event: after,
        eventId: context.params.eventId,
        plannedDate,
        daysUntil
      });

      const todaysKey = format(now, 'yyyy-MM-dd');
      const reminderKey = String(daysUntil);

      await change.after.ref.set({
        remindersSent: {
          ...(after.remindersSent ?? {}),
          [reminderKey]: todaysKey,
          plannedAnnouncement: todaysKey
        }
      }, { merge: true });

      functions.logger.info('Sent planning announcement', { eventId: context.params.eventId, reminderKey });
    } catch (error) {
      functions.logger.error('Failed to send planning announcement', { eventId: context.params.eventId, error });
    }
  });

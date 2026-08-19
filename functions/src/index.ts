import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { differenceInCalendarDays, format } from 'date-fns';
import { ADAFRUIT_DEFAULT_HISTORY_LIMIT, fetchAdafruitHistory } from './adafruit';

admin.initializeApp();

const firestore = admin.firestore();
const EVENTS_COLLECTION = 'events';
const FIRE_JOURNAL_COLLECTION = 'fireJournal';
const FIRE_JOURNAL_MAX_LIMIT = 200;
const OUTDOOR_HISTORY_COLLECTION = 'outdoorHistory';
const OUTDOOR_HISTORY_RETENTION_DAYS = 30;
const OUTDOOR_HISTORY_MAX_LIMIT = 5000;
const OUTDOOR_HISTORY_DEFAULT_LIMIT = 1200;
const OUTDOOR_HISTORY_PURGE_BATCH_SIZE = 500;
const OUTDOOR_LOG_SCHEDULE = 'every 10 minutes';
const DEFAULT_OUTDOOR_LOCATION = {
  latitude: 45.54,
  longitude: -77.1,
  timezone: 'America/Toronto'
};

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
  createdAt?: string;
  description?: string;
  imageUrl?: string;
  eventType?: EventCategory;
  confirmedTimeSlotId?: string | null;
  isCompleted?: boolean;
  timeSlots: TimeSlot[];
  participants?: string[];
  reminderSettings?: {
    daysBefore?: number[];
  };
  remindersSent?: Record<string, string>;
  location?: EventLocation | null;
  interestedCount?: number;
  availabilityReminders?: {
    lastSentAt?: string;
    reminderCount?: number;
  };
  staleEventReminders?: {
    lastSentAt?: string;
    reminderCount?: number;
  };
  rescheduleVote?: {
    startedAt: string;
    yesVotes: number;
    noVotes: number;
    voters: string[];
  };
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

interface FireJournalRecord {
  timestamp: number;
  sizeId: string;
  sizeLabel: string;
  detail?: string;
  note?: string;
  loggedAt?: FirebaseFirestore.FieldValue | FirebaseFirestore.Timestamp | null;
}

interface OutdoorSampleRecord {
  timestamp: number;
  temp_out_c: number;
  fetched_at: number;
  source: string;
  wind_kph?: number | null;
}

const FIRE_SIZE_MAP: Record<string, { id: string; label: string; detail: string }> = {
  'top-up': { id: 'top-up', label: 'Small top-up', detail: 'Two or three splits keep the ducts warm without overheating bedrooms.' },
  medium: { id: 'medium', label: 'Medium reload', detail: 'Half load the box so the forced air can cruise through the day.' },
  large: { id: 'large', label: 'Large burn', detail: 'Full firebox to saturate the plenum for a long hold.' },
  custom: { id: 'custom', label: 'Custom fire', detail: 'Logged manually' }
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

type CompletionCopySet = { title: string; body: string; fallback: string };

const sendDiscordCompletionNotification = async (params: {
  event: PlannerEvent;
  eventId: string;
}) => {
  const { event, eventId } = params;
  const webhookUrl = getDiscordWebhookUrl(event.eventType);
  if (!webhookUrl) {
    functions.logger.warn('Skipping completion notification because discord.webhook_url is not set.');
    return;
  }

  const theme = getEventTypeConfig(event.eventType);
  const eventLink = buildAppEventLink(eventId);
  const embedImageUrl = event.imageUrl?.trim() || getShareImageUrl(event.eventType);

  const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const completionVariants: Record<EventCategory, CompletionCopySet[]> = {
    dnd: [
      {
        title: `${theme.icon} The party returns — ${event.title}`,
        body: `The party returns from **${event.title}**. What tales came out of this session?`,
        fallback: `${theme.icon} **${event.title}** has concluded — how did the session go?`
      },
      {
        title: `${theme.icon} Session complete — ${event.title}`,
        body: `Another session of **${event.title}** is in the books. How'd the campaign move along?`,
        fallback: `${theme.icon} **${event.title}** is complete — how'd the campaign go?`
      }
    ],
    'board-game': [
      {
        title: `${theme.icon} The table's been cleared — ${event.title}`,
        body: `The table's been cleared on **${event.title}**. Who came out on top?`,
        fallback: `${theme.icon} **${event.title}** is complete — how'd the games go?`
      },
      {
        title: `${theme.icon} Game night wrapped — ${event.title}`,
        body: `**${event.title}** has wrapped. How'd the games go — any big wins or upsets?`,
        fallback: `${theme.icon} **${event.title}** is complete — how'd it go?`
      }
    ],
    hangout: [
      {
        title: `${theme.icon} That's a wrap — ${event.title}`,
        body: `**${event.title}** is a wrap! How was the hang?`,
        fallback: `${theme.icon} **${event.title}** is complete — how was the hang?`
      },
      {
        title: `${theme.icon} ${event.title} — all done!`,
        body: `**${event.title}** has come and gone. How'd it go?`,
        fallback: `${theme.icon} **${event.title}** is complete — how'd it go?`
      }
    ],
    'worker-bee': [
      {
        title: `${theme.icon} Job well done — ${event.title}`,
        body: `The crew wrapped up **${event.title}**. How'd the work go?`,
        fallback: `${theme.icon} **${event.title}** is complete — how'd the work go?`
      },
      {
        title: `${theme.icon} ${event.title} — crew's done`,
        body: `**${event.title}** is finished. How much did the crew get through?`,
        fallback: `${theme.icon} **${event.title}** is complete — how'd it go?`
      }
    ],
    other: [
      {
        title: `${theme.icon} ${event.title} — in the books!`,
        body: `That's a wrap on **${event.title}**. How'd it go?`,
        fallback: `${theme.icon} **${event.title}** is complete — how'd it go?`
      },
      {
        title: `${theme.icon} ${event.title} — all done!`,
        body: `**${event.title}** has wrapped up. How'd it go?`,
        fallback: `${theme.icon} **${event.title}** is complete — how'd it go?`
      }
    ]
  };

  const variants = completionVariants[event.eventType ?? 'other'] ?? completionVariants.other;
  const copy = pick(variants);

  const payload = {
    username: 'Meeple Planner',
    embeds: [
      {
        title: copy.title,
        description: copy.body,
        url: eventLink,
        color: theme.embedColor,
        ...(embedImageUrl ? { image: { url: embedImageUrl } } : {}),
        footer: {
          text: 'Shared via Meeple Planner'
        }
      }
    ],
    content: `${copy.fallback}\n${eventLink}`
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

const getOutdoorLocationConfig = () => {
  const weatherConfig = functions.config().weather as Record<string, unknown> | undefined;
  const latitude = Number(weatherConfig?.latitude ?? weatherConfig?.lat);
  const longitude = Number(weatherConfig?.longitude ?? weatherConfig?.lon);
  const timezone = typeof weatherConfig?.timezone === 'string'
    ? weatherConfig?.timezone
    : DEFAULT_OUTDOOR_LOCATION.timezone;
  return {
    latitude: Number.isFinite(latitude) ? latitude : DEFAULT_OUTDOOR_LOCATION.latitude,
    longitude: Number.isFinite(longitude) ? longitude : DEFAULT_OUTDOOR_LOCATION.longitude,
    timezone: timezone ?? DEFAULT_OUTDOOR_LOCATION.timezone
  };
};

const fetchOutdoorSnapshot = async (): Promise<OutdoorSampleRecord | null> => {
  const location = getOutdoorLocationConfig();
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: 'temperature_2m,windspeed_10m',
    timezone: location.timezone ?? 'auto'
  });
  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    functions.logger.warn('fetchOutdoorSnapshot failed', { status: response.status });
    return null;
  }
  const payload = await response.json() as {
    current?: { temperature_2m?: number; windspeed_10m?: number; time?: string };
    current_units?: { temperature_2m?: string; windspeed_10m?: string };
  };
  const temperature = Number(payload?.current?.temperature_2m);
  if (!Number.isFinite(temperature)) {
    functions.logger.warn('fetchOutdoorSnapshot: missing temperature', { payload });
    return null;
  }
  const measurementTime = payload?.current?.time ? Number(new Date(payload.current.time).getTime()) : Date.now();
  const timestamp = Number.isFinite(measurementTime) ? measurementTime : Date.now();
  const windSpeed = Number(payload?.current?.windspeed_10m);
  return {
    timestamp,
    temp_out_c: temperature,
    fetched_at: Date.now(),
    wind_kph: Number.isFinite(windSpeed) ? windSpeed : null,
    source: payload?.current_units?.temperature_2m
      ? `open-meteo:${payload.current_units.temperature_2m}`
      : 'open-meteo'
  };
};

const saveOutdoorSample = async (sample: OutdoorSampleRecord) => {
  const docId = String(sample.timestamp);
  await firestore.collection(OUTDOOR_HISTORY_COLLECTION)
    .doc(docId)
    .set(sample, { merge: true });
};

const pruneOutdoorHistory = async () => {
  const cutoff = Date.now() - OUTDOOR_HISTORY_RETENTION_DAYS * 24 * 60 * 60 * 1000;
  const collection = firestore.collection(OUTDOOR_HISTORY_COLLECTION);
  let removed = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const snapshot = await collection
      .where('timestamp', '<', cutoff)
      .orderBy('timestamp', 'asc')
      .limit(OUTDOOR_HISTORY_PURGE_BATCH_SIZE)
      .get();
    if (snapshot.empty) {
      break;
    }
    const batch = firestore.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    removed += snapshot.size;
    if (snapshot.size < OUTDOOR_HISTORY_PURGE_BATCH_SIZE) {
      break;
    }
  }
  if (removed > 0) {
    functions.logger.info('pruneOutdoorHistory removed samples', { removed });
  }
};

export const meteoOutdoorHistory = functions.https.onRequest(async (req, res) => {
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
  const normalizedLimit = Number.isFinite(limitParam) ? Number(limitParam) : undefined;
  const limit = typeof normalizedLimit === 'number'
    ? Math.max(1, Math.min(OUTDOOR_HISTORY_MAX_LIMIT, normalizedLimit))
    : OUTDOOR_HISTORY_DEFAULT_LIMIT;

  try {
    let query: FirebaseFirestore.Query = firestore.collection(OUTDOOR_HISTORY_COLLECTION);
    if (Number.isFinite(startParam)) {
      query = query.where('timestamp', '>=', startParam);
    }
    if (Number.isFinite(endParam)) {
      query = query.where('timestamp', '<=', endParam);
    }
    query = query.orderBy('timestamp', 'asc').limit(limit);

    const snapshot = await query.get();
    const points = snapshot.docs
      .map((doc) => doc.data() as OutdoorSampleRecord)
      .filter((entry) => Number.isFinite(entry?.timestamp) && Number.isFinite(entry?.temp_out_c))
      .sort((a, b) => a.timestamp - b.timestamp)
      .map((entry) => {
        const value = Number(entry.temp_out_c);
        const normalized = Number.isFinite(value) ? Number(value.toFixed(3)) : null;
        return {
          timestamp: entry.timestamp,
          temp_out_c: normalized,
          value: normalized,
          source: entry.source,
          wind_kph: Number.isFinite(entry.wind_kph) ? Number(entry.wind_kph) : undefined
        };
      })
      .filter((entry) => entry.temp_out_c !== null);
    res.set('Cache-Control', 'public, max-age=60, s-maxage=120');
    res.status(200).json({
      count: points.length,
      newest: points[points.length - 1]?.timestamp ?? null,
      oldest: points[0]?.timestamp ?? null,
      points
    });
  } catch (error) {
    functions.logger.error('meteoOutdoorHistory', error);
    res.status(500).json({ error: (error as Error).message });
  }
});

export const logOutdoorTemperature = functions.pubsub
  .schedule(OUTDOOR_LOG_SCHEDULE)
  .timeZone(getOutdoorLocationConfig().timezone ?? 'Etc/UTC')
  .onRun(async () => {
    try {
      const sample = await fetchOutdoorSnapshot();
      if (!sample) {
        return null;
      }
      await saveOutdoorSample(sample);
      await pruneOutdoorHistory();
      functions.logger.info('Logged outdoor sample', {
        timestamp: sample.timestamp,
        temp_out_c: sample.temp_out_c
      });
    } catch (error) {
      functions.logger.error('logOutdoorTemperature', error);
    }
    return null;
  });

export const fireJournal = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    if (req.method === 'GET') {
      const limitParam = typeof req.query.limit === 'string' ? Number(req.query.limit) : undefined;
      const sinceParam = typeof req.query.since === 'string' ? Number(req.query.since) : undefined;
      const limit = Number.isFinite(limitParam)
        ? Math.max(1, Math.min(FIRE_JOURNAL_MAX_LIMIT, Number(limitParam)))
        : 50;
      let query: FirebaseFirestore.Query = firestore.collection(FIRE_JOURNAL_COLLECTION);
      if (Number.isFinite(sinceParam)) {
        const since = Number(sinceParam);
        query = query.where('timestamp', '>=', since);
      }
      query = query.orderBy('timestamp', 'desc').limit(limit);
      const snapshot = await query.get();
      const entries = snapshot.docs
        .map((doc) => serializeFireJournalDoc(doc))
        .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
      res.set('Cache-Control', 'no-store');
      res.status(200).json({ entries });
      return;
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'object' && req.body !== null
        ? req.body as Record<string, unknown>
        : {};
      const sizeIdRaw = body.sizeId;
      const noteRaw = body.note;
      const timestampRaw = body.timestamp;
      if (typeof sizeIdRaw !== 'string' || sizeIdRaw.trim() === '') {
        res.status(400).json({ error: 'sizeId is required' });
        return;
      }
      const meta = getFireJournalSizeMeta(sizeIdRaw);
      const note = sanitizeFireJournalNote(typeof noteRaw === 'string' ? noteRaw : '');
      const timestampCandidate = Number(timestampRaw);
      const timestamp = Number.isFinite(timestampCandidate) ? timestampCandidate : Date.now();
      const record: FireJournalRecord = {
        sizeId: meta.id,
        sizeLabel: meta.label,
        detail: meta.detail,
        note,
        timestamp,
        loggedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      const docRef = await firestore.collection(FIRE_JOURNAL_COLLECTION).add(record);
      res.status(201).json({
        entry: {
          id: docRef.id,
          sizeId: record.sizeId,
          sizeLabel: record.sizeLabel,
          detail: record.detail ?? '',
          note: record.note ?? '',
          timestamp: record.timestamp
        }
      });
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    functions.logger.error('fireJournal', error);
    res.status(500).json({ error: (error as Error).message });
  }
});

const getFireJournalSizeMeta = (sizeId: string) => {
  const normalized = (sizeId || '').toLowerCase();
  return FIRE_SIZE_MAP[normalized] ?? FIRE_SIZE_MAP.custom;
};

const sanitizeFireJournalNote = (value: string): string => {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim().slice(0, 240);
};

const serializeFireJournalDoc = (doc: FirebaseFirestore.DocumentSnapshot) => {
  const data = doc.data() as FireJournalRecord | undefined;
  if (!data || !Number.isFinite(data.timestamp)) {
    return null;
  }
  let loggedAt: number | null = null;
  if (data.loggedAt && typeof (data.loggedAt as FirebaseFirestore.Timestamp).toMillis === 'function') {
    loggedAt = (data.loggedAt as FirebaseFirestore.Timestamp).toMillis();
  }
  return {
    id: doc.id,
    sizeId: data.sizeId,
    sizeLabel: data.sizeLabel,
    detail: data.detail ?? '',
    note: data.note ?? '',
    timestamp: data.timestamp,
    loggedAt: loggedAt ?? data.timestamp
  };
};


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

    if (wasPlanned && !isPlanned) {
      // Event was unscheduled — clear the sent-announcement flag so a future
      // reschedule triggers a fresh Discord notification instead of being
      // silently skipped as "already sent".
      if (before?.remindersSent?.plannedAnnouncement) {
        await change.after.ref.set({
          remindersSent: {
            plannedAnnouncement: admin.firestore.FieldValue.delete()
          }
        }, { merge: true });
      }
      return;
    }

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

export const onEventCompleted = functions.firestore
  .document(`${EVENTS_COLLECTION}/{eventId}`)
  .onUpdate(async (change, context) => {
    const before = change.before.data() as PlannerEvent | undefined;
    const after = change.after.data() as PlannerEvent | undefined;

    if (!after) {
      return;
    }

    const wasCompleted = Boolean(before?.isCompleted);
    const isNowCompleted = Boolean(after.isCompleted);
    const announcementAlreadySent = Boolean(before?.remindersSent?.completedAnnouncement);

    if (!isNowCompleted || wasCompleted || announcementAlreadySent) {
      return;
    }

    try {
      await sendDiscordCompletionNotification({ event: after, eventId: context.params.eventId });

      const todaysKey = format(new Date(), 'yyyy-MM-dd');
      await change.after.ref.set({
        remindersSent: {
          ...(after.remindersSent ?? {}),
          completedAnnouncement: todaysKey
        }
      }, { merge: true });

      functions.logger.info('Sent completion announcement', { eventId: context.params.eventId });
    } catch (error) {
      functions.logger.error('Failed to send completion announcement', { eventId: context.params.eventId, error });
    }
  });

const AVAILABILITY_FIRST_REMINDER_DAYS = 5;
const AVAILABILITY_SUBSEQUENT_INTERVAL_DAYS = 2;
const RESPONSES_COLLECTION = 'responses';
const STALE_EVENT_MAX_REMINDERS = 2;
const STALE_EVENT_FOLLOWUP_DAYS = 3;
const STALE_EVENT_MIN_AGE_DAYS = 30;

const isEventStale = (event: PlannerEvent, now: Date): boolean => {
  if (event.confirmedTimeSlotId) return false;
  if (!event.timeSlots || event.timeSlots.length === 0) return false;
  const createdAt = new Date(event.createdAt ?? now.toISOString());
  if (differenceInCalendarDays(now, createdAt) < STALE_EVENT_MIN_AGE_DAYS) return false;
  return event.timeSlots.every(slot => differenceInCalendarDays(parseLocalDate(slot.date), now) < 0);
};

const sendAvailabilityReminder = async (params: {
  event: PlannerEvent;
  eventId: string;
  interestedCount: number;
  respondedCount: number;
}) => {
  const { event, eventId, interestedCount, respondedCount } = params;
  const webhookUrl = getDiscordWebhookUrl(event.eventType);
  if (!webhookUrl) {
    functions.logger.warn('Skipping availability reminder — discord.webhook_url not set.');
    return;
  }

  const theme = getEventTypeConfig(event.eventType);
  const shareLink = buildShareLink(eventId);
  const missingCount = interestedCount - respondedCount;

  const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
  const missing1 = missingCount === 1;
  const hasnt = missing1 ? "hasn't" : "haven't";

  type CopySet = { title: string; nudge: string; cta: string; fallback: string };

  const flavorVariants: Record<EventCategory, CopySet[]> = {
    'board-game': [
      {
        title: `${theme.icon} Roll call for ${event.title}!`,
        nudge: `**${missingCount}** of **${interestedCount}** meeples ${hasnt} placed ${missing1 ? "a meeple" : "their meeples"} on the board yet.`,
        cta: `[Claim your seat at the table](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — ${missingCount} of ${interestedCount} meeples still need to pick their dates!`
      },
      {
        title: `${theme.icon} ${event.title} needs players!`,
        nudge: `We've got **${respondedCount}** locked in, but **${missingCount}** more ${missing1 ? "player is" : "players are"} still shuffling through the rule book.`,
        cta: `[Join the game](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — ${missingCount} more ${missing1 ? "player" : "players"} still need to pick dates!`
      },
      {
        title: `${theme.icon} Don't let ${event.title} gather dust!`,
        nudge: `**${missingCount}** of **${interestedCount}** interested ${missing1 ? "player" : "players"} still ${hasnt} picked a date. The box is open, the table is set...`,
        cta: `[Take your turn](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — ${missingCount} ${missing1 ? "player" : "players"} still need to commit!`
      }
    ],
    dnd: [
      {
        title: `${theme.icon} The party needs you — ${event.title}`,
        nudge: `**${missingCount}** of **${interestedCount}** adventurers ${hasnt} checked in with the quest board yet.`,
        cta: `[Report to the quest board](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — ${missingCount} of ${interestedCount} adventurers haven't reported in!`
      },
      {
        title: `${theme.icon} Roll for initiative — ${event.title}`,
        nudge: `**${missingCount}** of **${interestedCount}** party members ${missing1 ? "is" : "are"} still lost in the tavern. The DM is waiting.`,
        cta: `[Answer the call to adventure](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — ${missingCount} party ${missing1 ? "member" : "members"} still MIA!`
      },
      {
        title: `${theme.icon} A quest awaits — ${event.title}`,
        nudge: `The dungeon won't clear itself. **${missingCount}** of **${interestedCount}** heroes ${hasnt} committed to the mission yet.`,
        cta: `[Pledge your sword](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — ${missingCount} ${missing1 ? "hero" : "heroes"} still haven't pledged!`
      }
    ],
    hangout: [
      {
        title: `${theme.icon} Vibe check: ${event.title}`,
        nudge: `**${missingCount}** of **${interestedCount}** ${missing1 ? "person" : "people"} said they're down but ${hasnt} picked dates yet.`,
        cta: `[Lock in your dates](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — ${missingCount} of ${interestedCount} people still need to add their availability!`
      },
      {
        title: `${theme.icon} ${event.title} won't plan itself!`,
        nudge: `**${missingCount}** of **${interestedCount}** interested ${missing1 ? "person is" : "people are"} ghosting the calendar. Don't be that person.`,
        cta: `[Drop your dates](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — ${missingCount} ${missing1 ? "person" : "people"} still need to weigh in!`
      },
      {
        title: `${theme.icon} Still waiting on some folks — ${event.title}`,
        nudge: `**${respondedCount}** ${missing1 ? "person is" : "people are"} ready to go, but **${missingCount}** more ${hasnt} chimed in yet.`,
        cta: `[Add your availability](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — waiting on ${missingCount} more ${missing1 ? "person" : "people"}!`
      }
    ],
    'worker-bee': [
      {
        title: `${theme.icon} Crew check: ${event.title}`,
        nudge: `**${missingCount}** of **${interestedCount}** volunteers ${hasnt} signed up for a shift yet.`,
        cta: `[Sign up for a shift](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — ${missingCount} of ${interestedCount} volunteers still need to pick their dates!`
      },
      {
        title: `${theme.icon} Hands needed — ${event.title}`,
        nudge: `We've got **${respondedCount}** on the crew, but **${missingCount}** more ${missing1 ? "person" : "people"} said they'd pitch in and ${hasnt} picked a time.`,
        cta: `[Grab a time slot](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — ${missingCount} more ${missing1 ? "volunteer" : "volunteers"} needed!`
      }
    ],
    other: [
      {
        title: `${theme.icon} Availability check: ${event.title}`,
        nudge: `**${missingCount}** of **${interestedCount}** interested ${missing1 ? "person" : "people"} ${hasnt} added their availability yet.`,
        cta: `[Add your availability](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — ${missingCount} of ${interestedCount} people still need to add availability.`
      },
      {
        title: `${theme.icon} ${event.title} — who's in?`,
        nudge: `**${respondedCount}** down so far, but **${missingCount}** more ${missing1 ? "person" : "people"} ${hasnt} weighed in yet.`,
        cta: `[Add your dates](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — still waiting on ${missingCount} ${missing1 ? "person" : "people"}!`
      }
    ]
  };

  const variants = flavorVariants[event.eventType ?? 'other'] ?? flavorVariants.other;
  const copy = pick(variants);

  const payload = {
    username: 'Meeple Planner',
    embeds: [
      {
        title: copy.title,
        description: [
          copy.nudge,
          `${respondedCount} ${respondedCount === 1 ? 'person has' : 'people have'} already ${pick(['locked in', 'committed', 'signed up', 'thrown their hat in'])}.`,
          '',
          copy.cta
        ].join('\n'),
        url: buildAppEventLink(eventId),
        color: theme.embedColor,
        footer: { text: 'Shared via Meeple Planner' }
      }
    ],
    content: `${copy.fallback}\n${shareLink}`
  };

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Discord webhook failed: ${response.status} ${body}`);
  }
};

const sendStaleEventNudge = async (params: {
  event: PlannerEvent;
  eventId: string;
  isFollowUp: boolean;
  currentVote?: { yesVotes: number; noVotes: number };
}) => {
  const { event, eventId, isFollowUp, currentVote } = params;
  const webhookUrl = getDiscordWebhookUrl(event.eventType);
  if (!webhookUrl) {
    functions.logger.warn('Skipping stale event nudge — discord.webhook_url not set.');
    return;
  }

  const theme = getEventTypeConfig(event.eventType);
  const shareLink = buildShareLink(eventId);

  const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  type StaleCopySet = { title: string; nudge: string; cta: string; fallback: string };

  const staleVariants: Record<EventCategory, StaleCopySet[]> = {
    dnd: [
      {
        title: `${theme.icon} Should the campaign continue? — ${event.title}`,
        nudge: `All proposed quest dates have passed with no confirmed session. Should the party try again, or call it?`,
        cta: `[Cast your vote](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — all quest dates have passed. Should the campaign continue?`
      },
      {
        title: `${theme.icon} The quest board has expired — ${event.title}`,
        nudge: `Every date on the quest board is now in the past. Is the party ready to forge a new path, or hang up their swords?`,
        cta: `[Cast your vote](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — the quest board has expired. Reschedule or cancel?`
      }
    ],
    'board-game': [
      {
        title: `${theme.icon} Keep it on the table? — ${event.title}`,
        nudge: `All proposed game dates have passed and nothing was locked in. Should the group deal new dates, or pack it away?`,
        cta: `[Cast your vote](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — all proposed dates have passed. Keep it going or call it?`
      },
      {
        title: `${theme.icon} ${event.title} — reschedule or cancel?`,
        nudge: `The table is set but the calendar is empty. Is the group ready to play, or is this one getting shelved?`,
        cta: `[Cast your vote](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — all dates have passed. Should the group deal new ones?`
      }
    ],
    hangout: [
      {
        title: `${theme.icon} Should we still make this happen? — ${event.title}`,
        nudge: `All the proposed hangout dates have come and gone. Is the group still down, or should we let this one go?`,
        cta: `[Cast your vote](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — all proposed dates have passed. Still want to make it happen?`
      },
      {
        title: `${theme.icon} ${event.title} — try again or let it go?`,
        nudge: `Every proposed date is now in the past with no plan confirmed. What does the group think?`,
        cta: `[Cast your vote](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — all dates have passed. Reschedule or move on?`
      }
    ],
    'worker-bee': [
      {
        title: `${theme.icon} Worth rescheduling? — ${event.title}`,
        nudge: `All the proposed work bee dates are in the past and nothing was scheduled. Should the crew regroup, or wrap it up?`,
        cta: `[Cast your vote](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — work dates have expired. Worth rescheduling?`
      },
      {
        title: `${theme.icon} ${event.title} — reschedule or cancel?`,
        nudge: `Every proposed date has passed with no confirmed time. Should the crew keep going or call it done?`,
        cta: `[Cast your vote](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — all proposed dates are in the past. Reschedule or cancel?`
      }
    ],
    other: [
      {
        title: `${theme.icon} Should we try again? — ${event.title}`,
        nudge: `All the proposed dates for this event have passed with nothing confirmed. Should the group try again or let it go?`,
        cta: `[Cast your vote](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — all proposed dates have passed. Try again or move on?`
      },
      {
        title: `${theme.icon} ${event.title} — reschedule or cancel?`,
        nudge: `Every proposed date is now in the past and no time was confirmed. What does the group want to do?`,
        cta: `[Cast your vote](${shareLink})`,
        fallback: `${theme.icon} **${event.title}** — needs a decision. Reschedule or cancel?`
      }
    ]
  };

  const variants = staleVariants[event.eventType ?? 'other'] ?? staleVariants.other;
  const copy = pick(variants);

  const title = isFollowUp ? `Friendly reminder: ${copy.title}` : copy.title;

  const voteTallyLine = isFollowUp && currentVote
    ? `\nCurrent vote: **${currentVote.yesVotes}** reschedule · **${currentVote.noVotes}** cancel`
    : '';

  const payload = {
    username: 'Meeple Planner',
    embeds: [
      {
        title,
        description: [
          copy.nudge,
          voteTallyLine,
          '',
          copy.cta
        ].filter(line => line !== '').join('\n'),
        url: buildAppEventLink(eventId),
        color: theme.embedColor,
        footer: { text: 'Shared via Meeple Planner' }
      }
    ],
    content: `${copy.fallback}\n${shareLink}`
  };

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Discord webhook failed: ${response.status} ${body}`);
  }
};

const runStaleEventNudgeJob = async () => {
  const now = new Date();

  try {
    const snapshot = await firestore.collection(EVENTS_COLLECTION)
      .where('isActive', '==', true)
      .get();

    const tasks = snapshot.docs.map(async (doc) => {
      const event = doc.data() as PlannerEvent;
      const eventId = doc.id;

      if (!isEventStale(event, now)) return;

      const reminderCount = event.staleEventReminders?.reminderCount ?? 0;
      if (reminderCount >= STALE_EVENT_MAX_REMINDERS) return;

      const lastSentAt = event.staleEventReminders?.lastSentAt
        ? new Date(event.staleEventReminders.lastSentAt)
        : null;

      if (lastSentAt) {
        const daysSinceLastNudge = differenceInCalendarDays(now, lastSentAt);
        if (daysSinceLastNudge < STALE_EVENT_FOLLOWUP_DAYS) return;
      }

      const isFollowUp = reminderCount > 0;
      const currentVote = event.rescheduleVote
        ? { yesVotes: event.rescheduleVote.yesVotes, noVotes: event.rescheduleVote.noVotes }
        : undefined;

      try {
        await sendStaleEventNudge({ event, eventId, isFollowUp, currentVote });

        const updatePayload: Record<string, unknown> = {
          staleEventReminders: {
            lastSentAt: now.toISOString(),
            reminderCount: reminderCount + 1
          }
        };

        // Initialize the reschedule vote on the first nudge
        if (!isFollowUp) {
          updatePayload.rescheduleVote = {
            startedAt: now.toISOString(),
            yesVotes: 0,
            noVotes: 0,
            voters: []
          };
        }

        await doc.ref.set(updatePayload, { merge: true });

        functions.logger.info('Sent stale event nudge', { eventId, reminderCount, isFollowUp });
      } catch (error) {
        functions.logger.error('Failed to send stale event nudge', { eventId, error });
      }
    });

    await Promise.all(tasks);
  } catch (error) {
    functions.logger.error('runStaleEventNudgeJob', error);
    throw error;
  }
};

const runAvailabilityReminderJob = async () => {
  const now = new Date();

  try {
    const snapshot = await firestore.collection(EVENTS_COLLECTION)
      .where('isActive', '==', true)
      .get();

    const tasks = snapshot.docs.map(async (doc) => {
      const event = doc.data() as PlannerEvent;
      const eventId = doc.id;
      const interestedCount = event.interestedCount ?? 0;

      if (interestedCount <= 0) return;

      // Skip events that already have a confirmed date — those use the planned-date reminder system
      if (event.confirmedTimeSlotId) return;

      // Skip stale events — those get a separate stale-event nudge
      if (isEventStale(event, now)) return;

      // Determine if a reminder is due
      const createdAt = new Date(event.createdAt ?? now.toISOString());
      const daysSinceCreation = differenceInCalendarDays(now, createdAt);

      const lastSentAt = event.availabilityReminders?.lastSentAt
        ? new Date(event.availabilityReminders.lastSentAt)
        : null;
      const reminderCount = event.availabilityReminders?.reminderCount ?? 0;

      let shouldSend = false;

      if (reminderCount === 0) {
        // First reminder after 5 days
        shouldSend = daysSinceCreation >= AVAILABILITY_FIRST_REMINDER_DAYS;
      } else if (lastSentAt) {
        // Subsequent reminders every 2 days
        const daysSinceLastReminder = differenceInCalendarDays(now, lastSentAt);
        shouldSend = daysSinceLastReminder >= AVAILABILITY_SUBSEQUENT_INTERVAL_DAYS;
      }

      if (!shouldSend) return;

      // Count unique respondents from the responses collection
      const responsesSnapshot = await firestore.collection(RESPONSES_COLLECTION)
        .where('eventId', '==', eventId)
        .get();

      const uniqueRespondents = new Set(
        responsesSnapshot.docs
          .map((r) => (r.data() as { participantName?: string }).participantName)
          .filter(Boolean)
      );
      const respondedCount = uniqueRespondents.size;
      const missingCount = interestedCount - respondedCount;

      if (missingCount <= 0) return;

      try {
        await sendAvailabilityReminder({ event, eventId, interestedCount, respondedCount });

        await doc.ref.set({
          availabilityReminders: {
            lastSentAt: now.toISOString(),
            reminderCount: reminderCount + 1
          }
        }, { merge: true });

        functions.logger.info('Sent availability reminder', { eventId, missingCount, interestedCount, respondedCount });
      } catch (error) {
        functions.logger.error('Failed to send availability reminder', { eventId, error });
      }
    });

    await Promise.all(tasks);
  } catch (error) {
    functions.logger.error('runAvailabilityReminderJob', error);
    throw error;
  }
};

export const checkAvailabilityReminders = functions.pubsub
  .schedule('every day 10:00')
  .timeZone('America/Toronto')
  .onRun(async () => {
    await runAvailabilityReminderJob();
    await runStaleEventNudgeJob();
  });

export const triggerAvailabilityReminders = functions.https.onRequest(async (req, res) => {
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
    await runAvailabilityReminderJob();
    await runStaleEventNudgeJob();
    res.status(200).send('Availability reminders processed');
  } catch (error) {
    res.status(500).send('Availability reminder job failed');
  }
});

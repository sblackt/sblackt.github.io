import * as functions from 'firebase-functions';

const ADAFRUIT_MAX_CHUNK = 1000;
export const ADAFRUIT_DEFAULT_HISTORY_LIMIT = 60000;

export interface AdafruitPoint {
  value: number;
  timestamp: number;
}

export const getAdafruitConfig = () => {
  const username = functions.config().adafruit?.username ?? 'sblackt';
  const key = functions.config().adafruit?.key as string | undefined;
  const feedKey = functions.config().adafruit?.feed ?? 'home.temperature';
  return { username, key, feedKey };
};

const fetchAdafruitChunk = async (params: {
  username: string;
  feed: string;
  key: string;
  endTime?: number;
  limit?: number;
}): Promise<AdafruitPoint[]> => {
  const { username, feed, key, endTime, limit = ADAFRUIT_MAX_CHUNK } = params;
  const search = new URLSearchParams({ limit: String(limit) });
  if (typeof endTime === 'number') {
    search.set('end_time', new Date(endTime).toISOString());
  }
  const url = `https://io.adafruit.com/api/v2/${encodeURIComponent(username)}/feeds/${encodeURIComponent(feed)}/data?${search.toString()}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-AIO-Key': key
    }
  });
  if (!response.ok) {
    throw new Error(`Adafruit request failed (${response.status})`);
  }
  const raw = await response.json();
  if (!Array.isArray(raw)) {
    return [];
  }
  return raw
    .map(entry => {
      const rawValue = Number.parseFloat(entry.value);
      const timestamp = Date.parse(entry.created_at ?? entry.createdAt);
      if (!Number.isFinite(rawValue) || Number.isNaN(timestamp)) {
        return null;
      }
      return { value: rawValue, timestamp } as AdafruitPoint;
    })
    .filter(Boolean) as AdafruitPoint[];
};

export const fetchAdafruitHistory = async (options: {
  limit?: number;
  startTime?: number;
  endTime?: number;
}): Promise<AdafruitPoint[]> => {
  const { username, key, feedKey } = getAdafruitConfig();
  if (!key) {
    throw new Error('Adafruit API key not configured. Run `firebase functions:config:set adafruit.key=YOUR_KEY`.');
  }

  const maxSamples = Math.min(options.limit ?? ADAFRUIT_DEFAULT_HISTORY_LIMIT, ADAFRUIT_DEFAULT_HISTORY_LIMIT);
  const startBoundary = typeof options.startTime === 'number' ? options.startTime : undefined;
  let nextEndTime = typeof options.endTime === 'number' ? options.endTime : Date.now();
  const results: AdafruitPoint[] = [];
  let guard = 0;

  while (results.length < maxSamples && guard < 600) {
    const remaining = maxSamples - results.length;
    const chunk = await fetchAdafruitChunk({
      username,
      feed: feedKey,
      key,
      endTime: nextEndTime,
      limit: Math.min(ADAFRUIT_MAX_CHUNK, remaining)
    });
    if (!chunk.length) {
      break;
    }
    results.push(...chunk);
    const oldest = chunk.reduce((acc, point) => Math.min(acc, point.timestamp), Number.POSITIVE_INFINITY);
    if (!Number.isFinite(oldest)) {
      break;
    }
    if (startBoundary && oldest <= startBoundary) {
      break;
    }
    nextEndTime = oldest - 1000;
    guard += 1;
  }

  const filtered = startBoundary ? results.filter(point => point.timestamp >= startBoundary) : results;

  return filtered
    .sort((a, b) => a.timestamp - b.timestamp)
    .slice(-maxSamples);
};

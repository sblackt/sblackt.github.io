import * as functions from 'firebase-functions';

const ADAFRUIT_MAX_CHUNK = 1000;
const ADAFRUIT_CHUNK_WINDOW_MS = 3 * 24 * 60 * 60 * 1000; // 3 days
export const ADAFRUIT_DEFAULT_HISTORY_LIMIT = 120000;

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
  startTime?: number;
  limit?: number;
}): Promise<AdafruitPoint[]> => {
  const { username, feed, key, endTime, startTime, limit = ADAFRUIT_MAX_CHUNK } = params;
  const search = new URLSearchParams({ limit: String(limit) });
  if (typeof endTime === 'number') {
    search.set('end_time', new Date(endTime).toISOString());
  }
  if (typeof startTime === 'number') {
    search.set('start_time', new Date(startTime).toISOString());
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
    const chunkEnd = nextEndTime;
    const chunkStart = startBoundary
      ? Math.max(startBoundary, chunkEnd - ADAFRUIT_CHUNK_WINDOW_MS)
      : chunkEnd - ADAFRUIT_CHUNK_WINDOW_MS;
    const chunk = await fetchAdafruitChunk({
      username,
      feed: feedKey,
      key,
      endTime: chunkEnd,
      startTime: chunkStart,
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
    if (startBoundary && chunkStart <= startBoundary) {
      break;
    }
    nextEndTime = chunkStart - 1000;
    guard += 1;
  }

  const filtered = startBoundary ? results.filter(point => point.timestamp >= startBoundary) : results;

  return filtered
    .sort((a, b) => a.timestamp - b.timestamp)
    .slice(-maxSamples);
};

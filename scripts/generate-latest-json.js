#!/usr/bin/env node
/**
 * Pulls the latest Adafruit IO readings and writes sensor/latest.json
 * so Scriptable (or any consumer) can grab a tiny payload quickly.
 *
 * Usage:
 *   ADAFRUIT_IO_USERNAME=sblackt node scripts/generate-latest-json.js
 */

const path = require('path');
const fs = require('fs/promises');

const USERNAME = process.env.ADAFRUIT_IO_USERNAME || 'sblackt';
const DATA_LIMIT = 1;
const OUTPUT_PATH = path.join(__dirname, '..', 'sensor', 'latest.json');

const FEEDS = [
  {
    id: 'home.temperature',
    field: 'tempC',
    adjust: (value) => Number((value - 3.3).toFixed(2)),
  },
  {
    id: 'home.humidity',
    field: 'humidity',
    adjust: (value) => Number(value.toFixed(2)),
  },
  {
    id: 'home.pressure',
    field: 'hPa',
    adjust: (value) => Number(value.toFixed(1)),
  },
  {
    id: 'home.gas',
    field: 'gas_kohm',
    adjust: (value) => Number((value / 1000).toFixed(1)),
  },
  {
    id: 'home.altitude',
    field: 'alt_m',
    adjust: (value) => Number(value.toFixed(1)),
  },
];

async function fetchFeed(feed) {
  const url = `https://io.adafruit.com/api/v2/${encodeURIComponent(
    USERNAME
  )}/feeds/${encodeURIComponent(feed.id)}/data?limit=${DATA_LIMIT}`;

  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new Error(`Failed to load ${feed.id}: ${response.status}`);
  }

  const raw = await response.json();
  const latest = Array.isArray(raw) ? raw[0] : null;
  if (!latest) {
    return null;
  }

  const rawValue = Number.parseFloat(latest.value);
  if (!Number.isFinite(rawValue)) {
    return null;
  }

  const value =
    typeof feed.adjust === 'function' ? feed.adjust(rawValue) : rawValue;

  return {
    field: feed.field,
    value,
    timestamp: latest.created_at,
  };
}

async function run() {
  try {
    const results = await Promise.allSettled(FEEDS.map(fetchFeed));

    const payload = {};
    const timestamps = [];

    results.forEach((result) => {
      if (result.status === 'fulfilled' && result.value) {
        payload[result.value.field] = result.value.value;
        if (result.value.timestamp) {
          const ts = Date.parse(result.value.timestamp);
          if (!Number.isNaN(ts)) {
            timestamps.push(ts);
          }
        }
      } else if (result.status === 'rejected') {
        console.warn(result.reason?.message || result.reason);
      }
    });

    payload.updated = timestamps.length
      ? new Date(Math.max(...timestamps)).toISOString()
      : new Date().toISOString();

    await fs.writeFile(OUTPUT_PATH, JSON.stringify(payload, null, 2));
    console.log(`✅ Wrote ${OUTPUT_PATH}`);
  } catch (error) {
    console.error('Failed to generate latest JSON:', error);
    process.exitCode = 1;
  }
}

run();

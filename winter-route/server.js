const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5178;
const GRAPHOPPER_BASE_URL = (process.env.GRAPHHOPPER_BASE_URL || 'https://graphhopper.com/api/1').replace(/\/$/, '');
const GRAPHOPPER_API_KEY = process.env.GRAPHHOPPER_API_KEY || '';
const NOMINATIM_BASE_URL = (process.env.NOMINATIM_BASE_URL || 'https://nominatim.openstreetmap.org').replace(/\/$/, '');
const USER_AGENT = process.env.HTTP_USER_AGENT || 'winter-route-planner/0.1 (github.com/stevemwhite)';

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const ensureNumber = (value) => {
  const parsed = typeof value === 'string' ? Number(value) : value;
  return Number.isFinite(parsed) ? parsed : null;
};

const toLabel = (candidate, fallback) => {
  if (typeof candidate === 'string' && candidate.trim().length > 0) {
    return candidate.trim();
  }
  return fallback;
};

async function geocodeInput(input, kind) {
  if (input && typeof input === 'object' && ensureNumber(input.lat) !== null && ensureNumber(input.lon) !== null) {
    return {
      lat: ensureNumber(input.lat),
      lon: ensureNumber(input.lon),
      label: toLabel(input.label, `${input.lat.toFixed(5)},${input.lon.toFixed(5)}`),
      source: 'coordinates'
    };
  }

  const lookup = typeof input === 'string' ? input : input?.label;
  if (!lookup || !lookup.trim()) {
    throw new Error(`Missing ${kind} address`);
  }

  const params = new URLSearchParams({
    q: lookup.trim(),
    format: 'jsonv2',
    limit: '1',
    addressdetails: '1'
  });

  const resp = await fetch(`${NOMINATIM_BASE_URL}/search?${params.toString()}`, {
    headers: {
      'User-Agent': USER_AGENT
    }
  });

  if (!resp.ok) {
    throw new Error(`Geocoding failed for ${kind}`);
  }

  const [match] = await resp.json();
  if (!match) {
    throw new Error(`Could not locate ${kind}`);
  }

  return {
    lat: Number(match.lat),
    lon: Number(match.lon),
    label: toLabel(lookup, match.display_name),
    displayLabel: match.display_name,
    source: 'geocode'
  };
}

function buildWinterCustomModel() {
  return {
    distance_influence: 90,
    speed: [
      { if: 'road_class == MOTORWAY', multiply_by: 1.12 },
      { if: 'road_class == TRUNK', multiply_by: 1.08 },
      { if: 'road_class == PRIMARY', multiply_by: 1.03 },
      { if: 'road_class == SECONDARY', multiply_by: 0.7 },
      { if: 'road_class == TERTIARY', multiply_by: 0.45 },
      { if: 'road_class == RESIDENTIAL || road_class == LIVING_STREET', multiply_by: 0.25 },
      { if: 'road_class == SERVICE || road_class == TRACK || road_class == UNCLASSIFIED', multiply_by: 0.15 }
    ],
    priority: [
      { if: 'road_class == MOTORWAY', multiply_by: 2.2 },
      { if: 'road_class == MOTORWAY_LINK || road_class == TRUNK', multiply_by: 1.8 },
      { if: 'road_class == PRIMARY || road_class == PRIMARY_LINK', multiply_by: 1.5 },
      { if: 'road_class == SECONDARY || road_class == SECONDARY_LINK', multiply_by: 0.6 },
      { if: 'road_class == TERTIARY || road_class == TERTIARY_LINK', multiply_by: 0.4 },
      { if: 'road_class == RESIDENTIAL || road_class == LIVING_STREET || road_class == SERVICE || road_class == TRACK', multiply_by: 0.2 },
      { if: 'surface == GRAVEL || surface == UNPAVED || surface == DIRT || surface == GROUND || surface == SAND || surface == PEBBLESTONE', multiply_by: 0.1 },
      { if: 'track_type == GRADE3 || track_type == GRADE4 || track_type == GRADE5', multiply_by: 0.08 },
      { if: 'road_access == DESTINATION || road_access == PRIVATE || road_access == NO', multiply_by: 0.05 },
      { if: 'road_environment == FERRY', multiply_by: 0.05 },
      { if: 'road_environment == TUNNEL', multiply_by: 0.4 }
    ]
  };
}

async function fetchGraphHopperRoute(origin, destination, winterSafe) {
  const params = new URLSearchParams({
    profile: 'car',
    points_encoded: 'false',
    instructions: 'true',
    calc_points: 'true',
    locale: 'en'
  });

  ['road_class', 'surface', 'road_access'].forEach((detail) => params.append('details', detail));
  if (GRAPHOPPER_API_KEY) {
    params.append('key', GRAPHOPPER_API_KEY);
  }

  const payload = {
    points: [
      [origin.lon, origin.lat],
      [destination.lon, destination.lat]
    ],
    profile: 'car'
  };

  if (winterSafe) {
    payload.custom_model = buildWinterCustomModel();
  }

  const resp = await fetch(`${GRAPHOPPER_BASE_URL}/route?${params.toString()}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(data.message || 'Routing request failed');
  }

  if (!data.paths || !data.paths.length) {
    throw new Error('No route options returned');
  }

  return data.paths[0];
}

function toLatLngCoordinates(points) {
  if (!points?.coordinates?.length) {
    return [];
  }

  return points.coordinates.map(([lon, lat]) => ({
    lat,
    lon
  }));
}

function haversineMeters(a, b) {
  const R = 6371000;
  const toRad = (deg) => deg * (Math.PI / 180);
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

function accumulateDistances(coords) {
  const cumulative = [0];
  for (let i = 1; i < coords.length; i += 1) {
    cumulative[i] = cumulative[i - 1] + haversineMeters(coords[i - 1], coords[i]);
  }
  return cumulative;
}

function computeAnchors(coords, totalDistance) {
  if (coords.length < 4 || totalDistance < 5000) {
    return [];
  }

  const cumulative = accumulateDistances(coords);
  const percents = totalDistance > 40000 ? [0.3, 0.7] : [0.5];

  const anchors = percents.map((percent) => {
    const target = percent * totalDistance;
    for (let i = 1; i < cumulative.length; i += 1) {
      if (cumulative[i] >= target) {
        const prev = coords[i - 1];
        const next = coords[i];
        const segmentDistance = cumulative[i] - cumulative[i - 1];
        const ratio = segmentDistance === 0 ? 0 : (target - cumulative[i - 1]) / segmentDistance;
        return {
          lat: Number((prev.lat + (next.lat - prev.lat) * ratio).toFixed(6)),
          lon: Number((prev.lon + (next.lon - prev.lon) * ratio).toFixed(6)),
          pct: Math.round(percent * 100)
        };
      }
    }
    return null;
  }).filter(Boolean);

  return anchors.slice(0, 2);
}

function sumDetailDistances(coords, detailSegments = []) {
  const safeCoords = coords.length ? coords : [];
  if (safeCoords.length < 2) {
    return {};
  }
  return detailSegments.reduce((acc, [fromIdx, toIdx, rawValue]) => {
    if (!safeCoords.length || fromIdx === toIdx) {
      return acc;
    }

    const value = typeof rawValue === 'string' ? rawValue.toLowerCase() : rawValue;
    if (!value) {
      return acc;
    }
    const from = Math.max(0, Math.min(fromIdx, safeCoords.length - 2));
    const to = Math.max(from + 1, Math.min(toIdx, safeCoords.length - 1));
    let distance = 0;
    for (let i = from; i < to; i += 1) {
      if (!safeCoords[i] || !safeCoords[i + 1]) {
        continue;
      }
      distance += haversineMeters(safeCoords[i], safeCoords[i + 1]);
    }

    if (!acc[value]) {
      acc[value] = 0;
    }
    acc[value] += distance;
    return acc;
  }, {});
}

function buildSafetyInsights(totalDistance, detailStats) {
  const roadClass = detailStats.roadClass || {};
  const surface = detailStats.surface || {};
  const roadAccess = detailStats.roadAccess || {};

  const highwayMeters = ['motorway', 'trunk', 'primary']
    .map((key) => roadClass[key] || 0)
    .reduce((sum, value) => sum + value, 0);
  const secondaryMeters = ['secondary', 'tertiary'].map((key) => roadClass[key] || 0).reduce((sum, value) => sum + value, 0);
  const slowerMeters = ['residential', 'living_street', 'service', 'track', 'unclassified']
    .map((key) => roadClass[key] || 0)
    .reduce((sum, value) => sum + value, 0);
  const gravelMeters = ['gravel', 'ground', 'dirt', 'unknown', 'unpaved', 'sand'].map((key) => surface[key] || 0).reduce((sum, value) => sum + value, 0);
  const restrictedMeters = ['destination', 'private', 'no'].map((key) => roadAccess[key] || 0).reduce((sum, value) => sum + value, 0);

  const insights = [];
  const pctHighway = totalDistance ? Math.round((highwayMeters / totalDistance) * 100) : 0;
  if (pctHighway >= 40) {
    insights.push(`Keeps ${pctHighway}% of the drive on motorway/primary highways for better plowing and lighting.`);
  } else if (secondaryMeters > 0) {
    const pct = Math.round(((highwayMeters + secondaryMeters) / totalDistance) * 100);
    insights.push(`Guides you along ${pct}% major corridors instead of cutting across residential streets.`);
  }

  if (gravelMeters < 50) {
    insights.push('Avoids gravel or unpaved roads entirely.');
  } else {
    insights.push(`Limits gravel/unpaved surfaces to ${(gravelMeters / 1000).toFixed(1)} km of the total route.`);
  }

  if (restrictedMeters > 0) {
    insights.push(`Bypasses ${(restrictedMeters / 1000).toFixed(1)} km of roads marked private/seasonal access.`);
  } else {
    insights.push('Skips roads flagged as private, seasonal, or destination-only.');
  }

  if (slowerMeters > 0) {
    const pctSlow = Math.round((slowerMeters / totalDistance) * 100);
    insights.push(`Only ${pctSlow}% of the distance uses local/residential roads to reduce icy side-street exposure.`);
  }

  return insights.slice(0, 4);
}

function buildGoogleMapsLink(origin, destination, anchors) {
  const params = new URLSearchParams({
    api: '1',
    origin: `${origin.lat},${origin.lon}`,
    destination: `${destination.lat},${destination.lon}`,
    travelmode: 'driving'
  });

  if (anchors?.length) {
    params.append('waypoints', anchors.map((anchor) => `${anchor.lat},${anchor.lon}`).join('|'));
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

app.post('/api/route', async (req, res) => {
  try {
    const { origin, destination, mode, winterSafe, preferences } = req.body || {};
    if (!origin || !destination) {
      return res.status(400).json({ message: 'origin and destination are required' });
    }

    const winterModeEnabled = Boolean(winterSafe ?? (mode === 'winter' || mode === 'winter_safe'));
    const [originPoint, destinationPoint] = await Promise.all([
      geocodeInput(origin, 'origin'),
      geocodeInput(destination, 'destination')
    ]);

    let winterApplied = winterModeEnabled;
    let path;
    try {
      path = await fetchGraphHopperRoute(originPoint, destinationPoint, winterModeEnabled);
    } catch (err) {
      if (winterModeEnabled) {
        console.warn('Winter routing failed, retrying with normal profile', err.message);
        path = await fetchGraphHopperRoute(originPoint, destinationPoint, false);
        winterApplied = false;
      } else {
        throw err;
      }
    }
    const coords = toLatLngCoordinates(path.points);
    const anchors = computeAnchors(coords, path.distance || 0);
    const routeLatLng = coords.map((point) => [
      Number(point.lat.toFixed(6)),
      Number(point.lon.toFixed(6))
    ]);
    const geoJsonRoute = {
      type: 'LineString',
      coordinates: routeLatLng.map(([lat, lon]) => [lon, lat])
    };

    const detailStats = {
      roadClass: sumDetailDistances(coords, path.details?.road_class),
      surface: sumDetailDistances(coords, path.details?.surface),
      roadAccess: sumDetailDistances(coords, path.details?.road_access)
    };

    const reasons = buildSafetyInsights(path.distance || 0, detailStats);
    const googleMapsUrl = buildGoogleMapsLink(originPoint, destinationPoint, anchors);

    return res.json({
      meta: {
        winterModeRequested: winterModeEnabled,
        winterProfileActive: winterApplied,
        preferences: preferences || null
      },
      origin: originPoint,
      destination: destinationPoint,
      distanceMeters: path.distance,
      durationSeconds: Math.round((path.time || 0) / 1000),
      route: geoJsonRoute,
      routeLatLng,
      rawPath: path.points,
      instructions: path.instructions,
      anchors,
      googleMapsUrl,
      reasons,
      detailStats
    });
  } catch (error) {
    console.error('route error', error);
    return res.status(500).json({ message: error.message || 'Unknown error' });
  }
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Winter Route Planner running on http://localhost:${PORT}`);
});

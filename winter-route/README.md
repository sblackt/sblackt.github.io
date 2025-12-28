# Winter-Safe Route Planner MVP

Build a conservative winter-ready corridor, show the ETA/distance on Leaflet + OpenStreetMap, then hand the drive off to Google Maps with 0–2 anchor waypoints so the navigation app stays on the same path.

## Features

- Origin/destination inputs with optional “Use my location” shortcut
- Winter-safe toggle that applies GraphHopper custom model penalties for gravel, tertiary, and seasonal roads
- Backend geocoding via Nominatim + routing via GraphHopper with path details
- Anchor selection at ~30%/70% of the route (or midpoint for shorter drives) with Google Maps deep link generation
- “Why safer” insights derived from actual road class/surface stats
- Leaflet map overlay with corridor polyline + anchor markers

## Stack

- **Backend:** Node.js + Express (`server.js`)
- **Routing data:** GraphHopper Directions API (self-hosted or cloud)
- **Geocoding:** OpenStreetMap Nominatim
- **Frontend:** Vanilla JS + Leaflet served statically from `public/`

## Getting started

1. Install dependencies (from `winter-route/`):

   ```bash
   npm install
   ```

2. Copy the example environment file and fill in your values:

   ```bash
   cp .env.example .env
   ```

   - `GRAPHHOPPER_API_KEY`: required when hitting the hosted GraphHopper API. Leave empty if you route against a local server without keys.
   - `GRAPHHOPPER_BASE_URL`: defaults to `https://graphhopper.com/api/1`, change to `http://localhost:8989` when pointing at your own container.
   - `NOMINATIM_BASE_URL`: defaults to the public instance; consider swapping to your own if you need higher throughput.

3. Start the server:

   ```bash
   npm start
   ```

4. Visit [http://localhost:5178](http://localhost:5178) to use the planner. Leaflet tiles + API calls all originate from the backend domain so the single process covers both UI and routing.

## API contract

`POST /api/route`

```json
{
  "origin": { "label": "Ottawa, ON" },
  "destination": { "label": "Algonquin Park" },
  "winterSafe": true
}
```

- `origin` can also include `{ "lat": 45.42, "lon": -75.69 }` when the client has GPS position.
- `mode: "winter"` is accepted as an alias for `winterSafe: true`.

Response payload (abridged):

```json
{
  "distanceMeters": 254320,
  "durationSeconds": 11340,
  "route": { "type": "LineString", "coordinates": [[45.42, -75.69], ...] },
  "anchors": [{ "lat": 45.123, "lon": -76.456, "pct": 30 }],
  "googleMapsUrl": "https://www.google.com/maps/dir/?api=1&origin=...",
  "reasons": [
    "Keeps 62% of the drive on motorway/primary highways for better plowing and lighting.",
    "Avoids gravel or unpaved roads entirely."
  ]
}
```

If the GraphHopper server rejects the custom winter model, the API automatically falls back to the normal `car` profile and flags `winterProfileActive: false` in the `meta` block for the UI.

## Implementation notes

- Anchor selection uses cumulative haversine distances along the returned polyline and chooses the midpoint for shorter drives or 30%/70% points for >40 km trips.
- “Why safer” chips analyze `road_class`, `surface`, and `road_access` details directly from GraphHopper to describe what the route is doing differently.
- Geocode + route calls set a descriptive user agent string. Consider setting up caching or your own Nominatim instance for heavier usage.
- All static assets live under `public/` and are served by Express (no build step required).
- Requires Node 18+ so the backend can rely on the built-in `fetch` implementation.

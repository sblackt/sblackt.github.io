# Winter Route Planner

**Stack:** Node.js + Express (backend) · Vanilla JS + Leaflet (frontend)
**Purpose:** Winter-safe route planning MVP

## Files

```
winter-route/
  server.js       ← Express backend (~400 lines)
  public/         ← Static frontend (Leaflet via CDN, no build)
  package.json
  README.md
```

## Starting the App

```bash
npm install   # Node 18+ required
npm start     # Runs on PORT env var, default 5178
```

## Environment Variables

| Variable | Required | Notes |
|----------|----------|-------|
| `GRAPHHOPPER_API_KEY` | Yes | Routing API key |
| `GRAPHHOPPER_BASE_URL` | No | Defaults to GraphHopper public API |
| `NOMINATIM_BASE_URL` | No | Defaults to OSM Nominatim |
| `PORT` | No | Default `5178` |

Set these in a `.env` file or shell environment before running.

## Main API

**`POST /api/route`**

```json
{
  "origin": "...",
  "destination": "...",
  "winterSafe": true
}
```

Returns: `{ distance, duration, polyline, anchors, googleMapsUrl }`

- `anchors` — waypoints at ~30% and ~70% of the route for winter-safe road selection
- Falls back to standard routing if winter-safe routing fails
- Geocoding via Nominatim/OSM (no key required)

## Notes

- Frontend uses Leaflet via CDN — no npm for the frontend, just edit files in `public/`
- `node_modules/` is gitignored; always run `npm install` after cloning

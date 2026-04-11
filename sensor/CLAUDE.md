# Sensor Dashboard

**Stack:** Vanilla HTML/CSS/JS + Chart.js (CDN), no build
**Purpose:** Environmental sensor data dashboard for the "Stonehedge" property

## Files

```
sensor/
  index.html              ← main dashboard (~4,829 lines)
  plant/index.html        ← plant-specific view (~22,872 lines)
  heat-timeline-utils.js  ← shared utility: data normalization for flexible sensor schema
  latest.json             ← current sensor data (served/updated externally)
  tests/                  ← tests for heat-timeline-utils.js
```

## Dependencies

All via CDN — no `npm install` needed:
- **Chart.js v4.4.1**
- **chartjs-adapter-date-fns**

## Data Source

`latest.json` is fetched at runtime. It is updated externally (not by this app). The schema can vary between sensor versions — `heat-timeline-utils.js` normalizes it.

## Gotchas

- **`plant/index.html` is ~22,872 lines.** Make surgical, targeted edits only — load the relevant section with an offset, do not read the whole file.
- If chart data looks wrong, check `heat-timeline-utils.js` first — it handles schema normalization and is the most likely source of data issues.
- Do not add npm dependencies; keep everything CDN-based.

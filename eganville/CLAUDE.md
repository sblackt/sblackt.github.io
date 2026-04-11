# Eganville Dashboard

**Stack:** Vanilla HTML/CSS/JS — single file, no build
**Purpose:** Live weather, news, and traffic dashboard for Eganville, Ontario

## Files

```
eganville/
  index.html    ← entire app (~721 lines); all CSS and JS embedded here
```

All edits happen directly in `index.html`. No separate CSS/JS files, no build step.

## APIs & Data Sources

| Source | What | Auth |
|--------|------|------|
| Open-Meteo | Weather forecast + current conditions | None (free, no key) |
| allorigins.win + r.jina.ai | CORS proxy for CBC Ottawa RSS feed | None |
| Waze | Traffic data | None |

- Location constants: **45.54°N, 77.1°W** — hardcoded near top of the `<script>` section
- News filter keywords are hardcoded as an array near the top of the script section; edit there to add/remove topic filters

## Gotchas

- **CORS proxies can flap.** If news or traffic feeds stop loading, check that `allorigins.win` and `r.jina.ai` are reachable — these are the first things to suspect before debugging JS logic
- All state is in-page; there is no backend or localStorage persistence

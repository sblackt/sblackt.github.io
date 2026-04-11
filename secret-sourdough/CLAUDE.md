# Secret Sourdough App

**Stack:** Vanilla HTML/CSS/JS — single file, no build
**Purpose:** Sourdough starter exchange/gifting organizer

## Files

```
secret-sourdough/
  index.html    ← entire app (~780 lines); all CSS and JS embedded here
  img/          ← 8 image assets — do not remove any
```

All edits happen directly in `index.html`. No build step, no backend.

## Design

- **Color scheme:** warm orange/brown, accent `#f4a259`
- **Image assets:** `img/` contains 8 files referenced in the HTML — do not delete or rename them

## Notes

- Structurally similar to `secret-santa/` — same single-file pattern, same glassmorphism-adjacent style
- All state is in-page; nothing is persisted between sessions
- No external API calls

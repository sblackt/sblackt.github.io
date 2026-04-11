# Recipes App

**Stack:** Vanilla HTML/CSS/JS — single file, no build
**Purpose:** Static recipe library with browsing, filtering, and search

## Files

```
recipes/
  index.html    ← entire app (~8,856 lines); all CSS and JS embedded here
```

All edits happen directly in `index.html`. No build step, no external API.

## Design

- **Color scheme:** warm brown/orange; background `#140906`
- **CSS variables:** `--accent`, `--panel` (and others) defined at top of `<style>` block
- **Font:** Inter (loaded via CDN)
- **Layout:** tab-based navigation, mobile hamburger menu

## Adding Recipes

Follow the existing card structure in the HTML. Each recipe card lives in the markup — find an existing card, duplicate it, and update the content. Keep the same class names and data attributes to preserve filtering/search behavior.

## Notes

- Fully static — no login, no backend, no localStorage
- Large file (~8,856 lines) — use targeted search to find the right section before editing

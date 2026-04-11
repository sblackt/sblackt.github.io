# Personal Website Monorepo

Stephen White's personal brand site + independent side apps. All live in the same GitHub Pages repo but are completely decoupled.

## Repo Structure

```
/                   ← Portfolio site (vanilla HTML/CSS/JS)
eganville/          ← Weather/news dashboard
planner/            ← Meeple Planner build output (source in src/)
recipes/            ← Recipe library
secret-santa/       ← Secret Santa organizer
secret-sourdough/   ← Sourdough starter exchange
sensor/             ← Environmental sensor dashboard
winter-route/       ← Winter route planner (Node/Express)
src/                ← Meeple Planner React source (builds → planner/)
```

## Sub-App Routing

| App | Directory | Purpose | Docs |
|-----|-----------|---------|------|
| Eganville dashboard | `eganville/` | Live weather, news, traffic for Eganville ON | `eganville/CLAUDE.md` |
| Meeple Planner | `src/` + `planner/` | Collaborative event scheduling (React/Firebase) | `planner/CLAUDE.md` |
| Recipes | `recipes/` | Static recipe library | `recipes/CLAUDE.md` |
| Secret Santa | `secret-santa/` | Family gift exchange organizer | `secret-santa/CLAUDE.md` |
| Secret Sourdough | `secret-sourdough/` | Sourdough starter exchange | `secret-sourdough/CLAUDE.md` |
| Sensor | `sensor/` | Environmental sensor dashboard | `sensor/CLAUDE.md` |
| Winter Route | `winter-route/` | Winter-safe route planner | `winter-route/CLAUDE.md` |

**Rule:** Only modify a sub-app when explicitly asked. Changes to the portfolio site must not touch any sub-app directory, and vice versa.

---

## Portfolio Site (Root)

**Purpose:** Professional portfolio for Stephen White — Director of Product Design

### Key Files

| File | Role |
|------|------|
| `index.html` | Landing / About page |
| `case-studies.html` | Case studies with folder-tab filter UI |
| `writing.html` | Blog/writing with notebook aesthetic |
| `contact.html` | Contact page (placeholder content) |
| `shared.js` | Dark mode, mobile menu, parallax — shared across all pages |
| `styles.css` | Shared stylesheet |
| `fonts/` | EdmondSans custom font files |

**No build process.** Edit HTML/CSS/JS directly and open in browser.

### Design System

- **Case studies:** file-folder aesthetic, `#f5f5f5` paper background, folded-corner cards
- **Writing:** dot-grid notebook aesthetic, fixed sidebar nav (desktop), card-based articles
- **Dark mode:** toggled via `shared.js`, persisted in `localStorage`
- **Font:** EdmondSans (custom, loaded from `fonts/`)

### Rules

1. Use semantic HTML5 (`<nav>`, `<main>`, `<article>`, `<section>`)
2. Maintain WCAG compliance — skip links, proper ARIA labels, heading hierarchy
3. Nav HTML is duplicated across pages — active state auto-detected from URL via `shared.js`
4. No React, no build tools, no SPA patterns in the portfolio

### Content

- **Case studies:** "Design Systems: How One Designer Built What Engineering Couldn't" · "8 Bosses, Zero Problems: How to Build Team Stability in Chaos"
- **Focus areas:** Accessibility, Inclusive Culture, Organizational Change

## Git / Deploy

- **Main branch:** `main` (production, GitHub Pages)
- **Working branch:** `new`
- Deploy is automatic on push to `main` via GitHub Pages
- Planner uses `npm run deploy` (gh-pages) — see `planner/CLAUDE.md`

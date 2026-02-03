# Project Overview

This repository contains Stephen White's personal brand website along with multiple separate side applications that should remain decoupled.

## Current Work: Personal Brand Website

**Architecture:** Traditional multi-page site (vanilla HTML/CSS/JS)

**Main Files:**
- [index.html](index.html) - About/Landing page with hero (Stephen White + tagline)
- [case-studies.html](case-studies.html) - Case studies with filter system
- [writing.html](writing.html) - Writing page (coming soon)
- [contact.html](contact.html) - Contact page (coming soon)
- [shared.js](shared.js) - Shared functionality across all pages
- [styles.css](styles.css) - Shared styles
- [fonts/](fonts/) - Custom font files (EdmondSans)

**Purpose:** Professional portfolio site for Stephen White - Director of Product Design

**Key Features:**
- Multi-page architecture with semantic HTML
- WCAG accessible with skip links and proper ARIA labels
- Responsive design with mobile hamburger menu
- Dark mode toggle with localStorage persistence
- Parallax scroll effects on gradient circles
- Case study filtering system
- Custom typography with EdmondSans font
- No build process required

**Current State:**
- Landing page (index.html) features hero with name, tagline, and positioning
- Case studies page features two detailed case studies with file folder aesthetic
  - "Design Systems: How One Designer Built What Engineering Couldn't"
  - "8 Bosses, Zero Problems: How to Build Team Stability in Chaos"
- Focus areas: Accessibility, Inclusive Culture, Organizational Change
- Writing page features two blog articles with sophisticated notebook aesthetic
- Contact page has placeholder content

**Navigation:**
- Each page has identical navigation structure
- Active page state is automatically set based on URL
- Mobile hamburger menu with overlay
- Skip link for keyboard accessibility

**Case Studies Page Design:**
- File folder aesthetic with clean, professional organization
- Folder tab navigation with clipped corners and subtle shadows
- Document-style cards with folded corner detail
- Light background (#f5f5f5) for paper-like feel
- Metadata system (category, date) for each study
- Subtle gradient circle accent (low opacity)
- Professional typography for case study content
- Fully responsive with adaptive tab layout

**Writing Page Design:**
- Notebook/Obsidian-inspired aesthetic with subtle dot grid background
- Fixed sidebar navigation with article list (desktop) or top card menu (mobile/tablet)
- Active state highlighting for current article in viewport
- Smooth scrolling to articles when clicking sidebar links
- Card-based article layout with hover effects
- Metadata system (date, tags) for article organization
- Callout boxes for emphasis
- Clean typography optimized for long-form reading
- Fully responsive with mobile-first approach

## Separate Apps (DO NOT MODIFY unless specifically working on them)

Each of these apps is decoupled and should not be affected by changes to the main personal website:

- **eganville/** - Separate app
- **planner/** - React-based event planning app (The Meeple Planner)
- **recipes/** - Recipe app
- **secret-santa/** - Secret Santa app
- **secret-sourdough/** - Sourdough-related app
- **sensor/** - Sensor app
- **winter-route/** - Winter route app

## The Meeple Planner (React App in src/ folder)

The [src/](src/) folder contains the **source code for the planner app ONLY**:
- React + TypeScript event planning application
- Components: App, AvailabilityHeatmap, Calendar, CharacterRoster, CreateEvent, EventDetail, EventList, Header, ErrorBoundary
- Firebase/Firestore backend integration
- See [planner/CLAUDE.md](planner/CLAUDE.md) for full planner app documentation

**CRITICAL:** The `src/` folder is ONLY for the planner app. It is completely separate from the personal website HTML files at the root. Do not mix the two.

## Git Branch Structure

- Current branch: `new`
- Main branch: `main`
- Modified files on current branch include both portfolio files and planner app files

## Development Guidelines

1. **Keep Apps Decoupled:** Changes to the personal brand website should not affect any of the separate apps in their folders
2. **Portfolio Files Only:** When working on the personal brand site, only modify:
   - index.html (landing/about page)
   - case-studies.html
   - writing.html
   - contact.html
   - shared.js
   - styles.css
   - fonts/ (if needed)
3. **No Cross-Contamination:** Do not introduce React dependencies or planner app code into the portfolio site
4. **Explicit Targeting:** Only work on side apps when explicitly requested by name
5. **Semantic Code:** Always use semantic HTML5 elements (`<nav>`, `<main>`, `<article>`)
6. **Accessibility First:** Maintain WCAG compliance, proper heading hierarchy, ARIA labels

## Architecture Notes

- **Multi-page approach:** Better SEO, shareable URLs, natural browser behavior
- **No SPA navigation:** Pages load normally, no JavaScript required for basic navigation
- **Shared functionality:** Dark mode, mobile menu, parallax effects handled in shared.js
- **Navigation duplication:** Nav HTML duplicated on each page (acceptable for small site)
- **Active state:** Auto-detected based on current page URL

## Current Tasks

- Building out the professional Director of Product Design portfolio
- Main portfolio site is vanilla HTML/CSS/JS (no build process)
- Writing page uses blog/notebook aesthetic with card-based articles
- Contact page needs content added
- Additional case studies can be added to case-studies.html with appropriate data-tags
- Additional blog articles can be added to writing.html using the article-card structure

# Secret Santa App

**Stack:** Vanilla HTML/CSS/JS, single file per year, no build
**Purpose:** White family gift exchange (pairings + shared wish lists)

## Files

```
secret-santa/
  index.html     ← current year (2026, "warmth and cosy" theme); all CSS and JS embedded
  portraits/     ← 320px square head crops of the avatars (WebP), used by the current page
  img/           ← original avatars (used by the archive) + knit.svg; do not delete or rename
  2025/          ← archived 2025 page, read-only (no writes, no shuffle)
```

## Data

Firestore (`the-meeple-planner` project), collection `secretSanta`, one pair of docs per year:

| Year | Pairings | Wish lists |
|---|---|---|
| 2025 | `pairings` | `wishlists` |
| 2026 | `pairings2026` | `wishlists2026` |

`firestore.rules` allow-lists these doc IDs, so a new year's IDs need adding there AND
`firebase deploy --only firestore:rules` from a machine with Node (Rodney has none).
The 2026 page can't save until that deploy is done. App Check is enforced, so plain REST reads get a 403.

localStorage keys are per year too (same origin as the archive), so old backups can't leak into a new year.
The first visitor to a year's page generates its pairings; the shuffle menu needs the family password.

## New year checklist

1. Move `index.html` to `<year>/index.html`; change avatar paths to `../`, make it read-only (see the 2025 diff)
2. New doc IDs and localStorage keys in the new page; add the IDs to `firestore.rules` and deploy
3. Add the archive to the footer's "Past years" line

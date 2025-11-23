Stephen White

A personal site and various projects.

## Planner utilities

The planner app now ships with a small Firebase Cloud Functions bundle that powers rich Discord previews and scheduled reminders.

### Functions

| Function | Description |
| --- | --- |
| `eventPreview` | HTTP endpoint that returns Open Graph tags for an event (Discord unfurls get the title, emoji, type, and planned date) and then redirects the visitor to the planner UI. |
| `triggerEventReminders` | HTTPS endpoint that runs the reminder job when called with a shared token. A GitHub Actions workflow (below) calls it daily so we keep everything on the free Firebase tier. |

### Runtime configuration

Set these before deploying functions (adjust values for your project):

```bash
firebase functions:config:set \
  app.base_url="https://stevemwhite.com/planner" \
  app.preview_url="https://us-central1-the-meeple-planner.cloudfunctions.net/eventPreview" \
  app.share_image_url="https://stevemwhite.com/planner/share-card.png" \
  app.share_images.board-game="https://stevemwhite.com/planner/share-cards/board-game.png" \
  app.share_images.dnd="https://stevemwhite.com/planner/share-cards/dnd.png" \
  app.reminder_days="3,1,0" \
  app.reminder_token="super-secret-token" \
  discord.webhook_url="https://discord.com/api/webhooks/.../..." \
  discord.webhooks.dnd="https://discord.com/api/webhooks/.../..."
```

- `app.preview_url` should point at the deployed `eventPreview` endpoint; the front-end uses this for Copy Link buttons so Discord gets rich data.
- `app.share_image_url` can be any publicly accessible image you want shown in embeds/unfurls.
- `app.share_images.<eventType>` overrides the share image for specific event types (e.g., `app.share_images.dnd`).
- `app.reminder_days` is a comma-separated list of day offsets (per-event overrides are also supported through Firestore fields).
- `app.reminder_token` must match the token that the GitHub workflow uses when calling `triggerEventReminders`.
- `discord.webhooks.<eventType>` lets you send reminders to a specific channel/webhook for that event type (falls back to `discord.webhook_url`).
- `discord.webhook_url` is the channel webhook that should receive reminders.

### Deploying

```bash
cd functions
npm install           # once
npm run build
firebase deploy --only functions
```

### GitHub Action (reminders)

Create two repository secrets:

- `REMINDER_FUNCTION_URL`: The deployed `triggerEventReminders` URL (for example `https://us-central1-the-meeple-planner.cloudfunctions.net/triggerEventReminders`).
- `REMINDER_FUNCTION_TOKEN`: Same value as `app.reminder_token`.

The workflow in `.github/workflows/event-reminders.yml` runs daily (15:00 UTC) and on-demand via the “Run workflow” button. It hits the function URL with the token so reminders go out without needing Firebase’s paid scheduler.

### Front-end link previews

Expose the preview endpoint URL to the CRA build (for example in `.env.local`):

```
REACT_APP_EVENT_PREVIEW_BASE_URL=https://us-central1-the-meeple-planner.cloudfunctions.net/eventPreview
```

When users copy an event link, the preview URL is used. Bots (Discord) read the metadata, humans get redirected to the actual planner at `app.base_url`.

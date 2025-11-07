Stephen White

A personal site and various projects.

## Sensor Snapshot JSON

The `sensor/index.html` page now exposes the live readings inside the page markup so you don't need to talk to Adafruit directly:

```html
<script id="stonehedge-latest-json" type="application/json">{"tempC":19.8,...}</script>
```

If you prefer a static file, you can still emit `sensor/latest.json` with:

```bash
npm run sensor:latest
```

The script calls the public Adafruit IO feeds (`home.temperature`, `home.humidity`, `home.pressure`, `home.gas`, `home.altitude`) and writes a payload like:

```json
{
  "tempC": 19.8,
  "humidity": 42.5,
  "hPa": 1006.1,
  "gas_kohm": 152.4,
  "alt_m": 305.4,
  "updated": "2025-11-07T12:34:56.000Z"
}
```

Run it manually before deploying (or hook it into your deploy script) so the widget always has a tiny JSON endpoint to read from. Set `ADAFRUIT_IO_USERNAME` in the environment if you use a different account name. Otherwise, have Scriptable fetch `/sensor/index.html` and parse the contents of `#stonehedge-latest-json`.

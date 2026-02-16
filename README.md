	![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

# GH-900 Demo — Timezones & Weather (Node.js)

This Node.js web app demonstrates a simple UI that displays current times for multiple regions and a weather forecast using Azure Maps. It's built for the GH-900 training course.

Features
- Displays current time for: Singapore, Australia, India, Japan, and (optionally) other regions.
- Shows weather forecast data using Azure Maps services.
- Frontend UI implemented with Bootstrap for responsive layout.
- Minimal Node.js server in `app.js` serves the page and map data.

Prerequisites
- Node.js (LTS, e.g., 16+)
- An Azure Maps subscription key (set as `AZURE_MAPS_KEY` environment variable)

Quick start
1. Install dependencies:

```bash
npm install
```

2. Set your Azure Maps key (PowerShell example):

```powershell
$env:AZURE_MAPS_KEY = "<your-azure-maps-key>"
```

3. Run the app:

```bash
node app.js
```

4. Open your browser at `http://localhost:3000` (or the port printed by the app).

Notes
- The app uses Azure Maps for map tiles and weather/forecast APIs; ensure your key has the required permissions and correct billing.
- UI styling and layout are implemented with Bootstrap to keep the interface simple and mobile-friendly.
- `app.js` contains the minimal server and wiring to provide timezone and weather endpoints to the frontend.

For GH-900 training
- This repository is a demo used during GH-900 training to show integration of Azure Maps with a Node.js + Bootstrap web UI.
- Feel free to extend the list of timezones, localize the UI, or add caching for forecast requests.

Files
- `app.js` — Node.js server and route handlers
- `README.md` — (this file) explanation and run guide

Next steps
- Confirm the Azure Maps key is configured and run the app.
- I can add example screenshots, expand the deployment notes, or create a sample `.env` template if you want.

License
- See `LICENSE` for licensing details.
# GH-900-demo-Feb-2026
for demonstration GH-900 in Feb 2026

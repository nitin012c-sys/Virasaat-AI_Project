# Virasaat Monument Catalog API

This is a small Node API with no extra runtime packages. It holds the India monument metadata in `server/data/monuments.json`, supports your own photogrammetry or Blender exports, and can search Sketchfab's public metadata API.

## Start it

Set an admin key before starting the server. In PowerShell:

```powershell
$env:CATALOG_ADMIN_KEY = "replace-with-a-long-private-value"
$env:CORS_ORIGIN = "http://localhost:8443"
pnpm api
```

The API is available at `http://localhost:8787`.

## Read routes

| Route | Purpose |
| --- | --- |
| `GET /health` | Server health check |
| `GET /api/monuments?q=taj&state=Delhi&has3d=true&page=1&limit=20` | Search the local catalog |
| `GET /api/monuments/:id` | Full monument record |
| `GET /api/monuments/:id/embed` | Cleared viewer URL and attribution |
| `GET /api/sources/sketchfab/search?q=red+fort&limit=12` | Live source search; results are not saved |

## Add an owned scan or Blender export

`POST /api/monuments` requires the `X-Api-Key` header. Send a stored HTTPS GLB URL; do not send the binary model through this API.

```json
{
  "name": "Amer Fort",
  "description": "Photogrammetry scan made by our field team.",
  "location": { "city": "Amer", "state": "Rajasthan", "country": "India" },
  "heritage": { "era": "Kachhwaha Rajput", "yearCompleted": 1592 },
  "keywords": ["fort", "rajasthan", "photogrammetry"],
  "asset": {
    "provider": "own-photogrammetry",
    "format": "glb",
    "glbUrl": "https://cdn.example.com/models/amer-fort.glb"
  },
  "rights": {
    "holder": "Virasaat AI",
    "licenseName": "All rights reserved"
  }
}
```

## Add a reviewed Sketchfab model

First search the model using the live route. After checking its license and attribution, call `POST /api/monuments/import/sketchfab` with the same `X-Api-Key` header:

```json
{ "modelUid": "32-character-sketchfab-model-uid", "licenseApproved": true }
```

The API stores the source page, creator, license, thumbnail and an embeddable viewer URL. It deliberately does not download or cache model files. Sketchfab's Download API requires end-user authentication and its Creative Commons model licenses require visible creator and source attribution. See the [Sketchfab Download API](https://sketchfab.com/developers/download-api) and [integration guidelines](https://sketchfab.com/developers/download-api/guidelines).

## Use it in the React app

`src/api/monuments.ts` exports `getMonuments`, `getMonument`, and `formatAttribution`. Set `VITE_CATALOG_API_URL` to the deployed API URL for production. Keep the returned attribution with every Sketchfab model shown in the interface.

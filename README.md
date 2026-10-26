# Virasat AI Monument Data API

Node.js + Express starter API with JSON storage and prepared Hindi/English narration. It does not call an AI service. Browser speech synthesis can read the returned narration aloud.

## Data access and reuse

IndiaLegacy's [Terms & Conditions](https://indialegacy.in/terms-conditions/) say its original articles, guides, text and graphics are copyrighted; prohibit copying/republication, commercial use without authorization, and automated scraping/bulk downloads; and request written permission for broader use. No public API or downloadable data access is documented there. This project does not import IndiaLegacy content. Obtain written permission from `contact.indialegacy@gmail.com` before using its articles or data beyond the limited uses in its terms.

Starter factual metadata is independently written from UNESCO World Heritage Centre records for the [Taj Mahal](https://whc.unesco.org/en/list/252/), [Sun Temple, Konark](https://whc.unesco.org/en/list/246/), and [Ajanta Caves](https://whc.unesco.org/en/list/242/). UNESCO marks page descriptions CC-BY-SA IGO 3.0; each record includes attribution/license detail. Narrations here are original prepared summaries, not copied UNESCO or IndiaLegacy prose. Review translations and facts before production. These three records are a demo, not a comprehensive dataset.

## Requirements and Windows setup (PowerShell)

Install Node.js 20+ (the Node.js installer normally includes npm), then open PowerShell in this folder:

```powershell
node --version
npm --version
npm install
Copy-Item .env.example .env
$key = node scripts/generate-key.js
$envText = [IO.File]::ReadAllText((Resolve-Path .env))
[IO.File]::WriteAllText((Resolve-Path .env), [regex]::Replace($envText, '(?m)^API_KEY=.*$', "API_KEY=$key"), [Text.UTF8Encoding]::new($false))
Remove-Variable key
npm start
```

The key generator uses `crypto.randomBytes(32)` and prints a 256-bit URL-safe secret. Keep `.env` private; `.gitignore` excludes it. Do not paste the key in frontend JavaScript, a public repository, issue, or chat. Rotate it by generating a new key and replacing `API_KEY`, then restart.

## Authentication and frontend integration

All `/api/*` routes require `X-API-Key`. Keep the key in the integrating server's secret manager/environment and have the Virasat AI server proxy requests to this API. A browser app cannot keep a key secret: never embed it in frontend code. For browser-direct public reads, remove key auth only after adding suitable abuse controls or put a server-side proxy/session in front. `CORS_ORIGINS` is an allowlist, not an authentication substitute. Set it to the exact browser origin(s), comma separated.

## API

Base URL locally: `http://localhost:3000`. Every API response is JSON. `GET /health` is unauthenticated. Monument IDs are URL-safe slugs.

| Method and path | Purpose |
| --- | --- |
| `GET /api/monuments` | List compact monument records |
| `GET /api/monuments/:id` | Full record, attribution and narration |
| `GET /api/monuments/:id/story?lang=en` | Prepared English narration |
| `GET /api/monuments/:id/story?lang=hi` | Prepared Hindi narration |
| `GET /api/search?q=keyword` | Search names, location and style (minimum 2 chars) |

### Example requests

```powershell
$headers = @{ 'X-API-Key' = '<your-server-side-key>' }
Invoke-RestMethod 'http://localhost:3000/api/monuments' -Headers $headers
Invoke-RestMethod 'http://localhost:3000/api/monuments/taj-mahal' -Headers $headers
Invoke-RestMethod 'http://localhost:3000/api/monuments/taj-mahal/story?lang=hi' -Headers $headers
Invoke-RestMethod 'http://localhost:3000/api/search?q=Agra' -Headers $headers
```

Equivalent curl:

```sh
curl -H "X-API-Key: $API_KEY" http://localhost:3000/api/monuments
curl -H "X-API-Key: $API_KEY" "http://localhost:3000/api/monuments/taj-mahal/story?lang=en"
```

Example detail response (shortened):

```json
{
  "data": {
    "id": "taj-mahal",
    "name": { "en": "Taj Mahal", "hi": "ताजमहल" },
    "location": { "city": "Agra", "state": "Uttar Pradesh", "country": "India", "coordinates": { "lat": 27.1751, "lon": 78.0421 } },
    "period": { "en": "Mughal period; construction began in 1632 and the mausoleum was completed in 1648", "hi": "मुग़ल काल; निर्माण 1632 में शुरू हुआ और मकबरा 1648 में पूरा हुआ" },
    "architecturalStyle": { "en": "Indo-Islamic Mughal architecture", "hi": "हिंद-इस्लामी मुग़ल वास्तुकला" },
    "culturalSignificance": { "en": "A Mughal mausoleum commissioned by Shah Jahan in memory of Mumtaz Mahal; inscribed on the UNESCO World Heritage List in 1983.", "hi": "मुमताज़ महल की स्मृति में शाहजहाँ द्वारा बनवाया गया मुग़ल मकबरा; 1983 में यूनेस्को विश्व धरोहर सूची में शामिल हुआ।" },
    "narration": { "en": "...", "hi": "..." },
    "sources": [{ "title": "Taj Mahal — UNESCO World Heritage Centre", "url": "https://whc.unesco.org/en/list/252/", "license": "..." }]
  }
}
```

Story responses include `narrationType: "prepared"`, `generatedByAI: false`, and `speech.lang` (`en-IN`/`hi-IN`) for `speechSynthesis`. Example browser use: `const u = new SpeechSynthesisUtterance(story.data.narration); u.lang = story.data.speech.lang; speechSynthesis.speak(u);`. Browser voice availability depends on the visitor's device.

Errors use `{ "error": { "code": "...", "message": "..." } }`. Missing/invalid key returns 401; unknown monument/route 404; invalid id/query/language 400; rate limit 429. Default limit is 100 requests per minute per IP. Adjust via `.env`.

## Hosting

Deploy to a Node.js host (for example, a managed app platform or your own VPS): include `src/`, `data/`, `package.json` and lockfile; install with `npm ci`; set `API_KEY`, `PORT`, `CORS_ORIGINS`, and rate-limit settings as host secrets/environment variables; run `npm start`; enable HTTPS; and configure health check `/health`. Do not upload `.env` or commit it. This is a single-process JSON-backed starter; for multi-instance production, move data to a managed database and rate limits to a shared store. Rotate the API key if disclosed. Hosting account and domain credentials are user-provided setup.

## Current scope / permissions

- IndiaLegacy reuse requires its owner's prior written permission for commercial reuse/copying and automated extraction is prohibited by its terms. This API does not call or scrape that site.
- No paid AI or external credentials are used. Production hosting, domain/DNS, HTTPS configuration, and any owner permission are separate setup.
- JSON records live in `data/monuments.json`; add carefully verified, licensed records using the same schema and attribution fields.

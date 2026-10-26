import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { readFile } from 'node:fs/promises';
import { timingSafeEqual } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT || 3000);
const apiKey = process.env.API_KEY;
const dataPath = fileURLToPath(new URL('../data/monuments.json', import.meta.url));

app.disable('x-powered-by');
app.use(helmet());
app.use(express.json({ limit: '16kb' }));
const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
app.use((req, res, next) => {
  const origin = req.get('origin');
  if (origin && (allowedOrigins.includes('*') || allowedOrigins.includes(origin))) {
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Vary', 'Origin');
    res.set('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000),
  limit: Number(process.env.RATE_LIMIT_MAX || 100),
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: { code: 'RATE_LIMITED', message: 'Too many requests; try again later.' } }
});
app.use('/api', limiter);

function requireApiKey(req, res, next) {
  if (!apiKey || apiKey.length < 32) {
    return res.status(503).json({ error: { code: 'API_NOT_CONFIGURED', message: 'Set a strong API_KEY in the server .env file.' } });
  }
  const supplied = req.get('x-api-key') || '';
  const a = Buffer.from(supplied);
  const b = Buffer.from(apiKey);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'A valid X-API-Key header is required.' } });
  }
  next();
}

async function monuments() {
  const content = await readFile(dataPath, 'utf8');
  return JSON.parse(content);
}
function validId(id) { return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id); }
function summary(m) {
  const { id, name, location, period, architecturalStyle } = m;
  return { id, name, location, period, architecturalStyle };
}

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api', requireApiKey);

app.get('/api/monuments', async (_req, res, next) => {
  try { res.json({ data: (await monuments()).map(summary), attribution: 'Source links and licenses are included in each monument detail response.' }); }
  catch (err) { next(err); }
});

app.get('/api/monuments/:id', async (req, res, next) => {
  if (!validId(req.params.id)) return res.status(400).json({ error: { code: 'INVALID_ID', message: 'Monument id has an invalid format.' } });
  try {
    const item = (await monuments()).find(m => m.id === req.params.id);
    if (!item) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Monument not found.' } });
    res.json({ data: item });
  } catch (err) { next(err); }
});

app.get('/api/monuments/:id/story', async (req, res, next) => {
  const lang = req.query.lang || 'en';
  if (!['en', 'hi'].includes(lang)) return res.status(400).json({ error: { code: 'INVALID_LANGUAGE', message: 'lang must be en or hi.' } });
  if (!validId(req.params.id)) return res.status(400).json({ error: { code: 'INVALID_ID', message: 'Monument id has an invalid format.' } });
  try {
    const item = (await monuments()).find(m => m.id === req.params.id);
    if (!item) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Monument not found.' } });
    res.json({ data: { id: item.id, name: item.name[lang], lang, narration: item.narration[lang], narrationType: 'prepared', generatedByAI: false, speech: { useBrowserTextToSpeech: true, lang: lang === 'hi' ? 'hi-IN' : 'en-IN' }, sources: item.sources } });
  } catch (err) { next(err); }
});

app.get('/api/search', async (req, res, next) => {
  const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
  if (q.length < 2 || q.length > 100) return res.status(400).json({ error: { code: 'INVALID_QUERY', message: 'q must contain 2 to 100 characters.' } });
  try {
    const needle = q.toLocaleLowerCase();
    const items = (await monuments()).filter(m => [m.id, m.name.en, m.name.hi, m.location.city, m.location.state, m.architecturalStyle.en, m.architecturalStyle.hi].some(v => v.toLocaleLowerCase().includes(needle))).map(summary);
    res.json({ data: items, query: q, count: items.length });
  } catch (err) { next(err); }
});

app.use((req, res) => res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found.' } }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'An unexpected server error occurred.' } });
});

app.listen(port, () => console.log(`Virasat AI Monument API listening on port ${port}`));

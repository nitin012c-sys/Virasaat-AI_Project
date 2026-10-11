import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

const PORT = Number.parseInt(process.env.API_PORT ?? "8787", 10);
const ADMIN_KEY = process.env.CATALOG_ADMIN_KEY;
const DATA_FILE = fileURLToPath(new URL("./data/monuments.json", import.meta.url));
const SKETCHFAB_API = "https://api.sketchfab.com/v3";

function sendJson(response, status, payload, origin) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": origin ?? "*",
    "Access-Control-Allow-Headers": "Content-Type, X-Api-Key",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    Vary: "Origin",
  });
  response.end(JSON.stringify(payload, null, 2));
}

function getAllowedOrigin(request) {
  const requestedOrigin = request.headers.origin;
  const configuredOrigin = process.env.CORS_ORIGIN;

  if (!configuredOrigin || !requestedOrigin) return configuredOrigin ?? undefined;
  return requestedOrigin === configuredOrigin ? configuredOrigin : undefined;
}

function error(response, status, code, message, origin) {
  sendJson(response, status, { error: { code, message } }, origin);
}

async function readCatalog() {
  const content = await readFile(DATA_FILE, "utf8");
  const records = JSON.parse(content);
  if (!Array.isArray(records)) throw new Error("The monument catalog must be an array.");
  return records;
}

async function writeCatalog(records) {
  await writeFile(DATA_FILE, `${JSON.stringify(records, null, 2)}\n`, "utf8");
}

function parseLimit(value, fallback = 20, maximum = 100) {
  const parsed = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  return Math.min(parsed, maximum);
}

function toSlug(value) {
  return value
  .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 72);
}

function isAdmin(request) {
  return Boolean(ADMIN_KEY) && request.headers["x-api-key"] === ADMIN_KEY;
}

async function readBody(request) {
  const chunks = [];
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;
    if (size > 256_000) throw new Error("Request body is too large.");
    chunks.push(chunk);
  }

  if (chunks.length === 0) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function monumentSummary(record) {
  return {
    id: record.id,
    name: record.name,
    location: record.location,
    heritage: record.heritage,
    coverImageUrl: record.coverImageUrl,
    keywords: record.keywords,
    asset: {
      status: record.asset?.status ?? "unavailable",
      provider: record.asset?.provider ?? null,
      viewerUrl: record.asset?.viewerUrl ?? null,
      hasGlb: Boolean(record.asset?.glbUrl),
    },
    attribution: record.attribution,
  };
}

function normalizeSketchfabModel(model) {
  const uid = model.uid;
  const images = model.thumbnails?.images ?? [];
  const cover = [...images].sort((left, right) => (right.width ?? 0) - (left.width ?? 0))[0];
  const license = model.license ?? {};
  const creator = model.user ?? {};
  const createdAt = model.publishedAt ?? model.createdAt ?? null;

  return {
    id: `sketchfab-${uid}`,
    name: model.name ?? "Untitled Sketchfab model",
    description: model.description ?? "",
    location: { city: null, state: null, country: null, latitude: null, longitude: null },
    heritage: { era: null, yearCompleted: null, architecturalStyle: null },
    keywords: Array.isArray(model.tags) ? model.tags.map((tag) => tag.name ?? tag).filter(Boolean) : [],
    coverImageUrl: cover?.url ?? null,
    asset: {
      status: "external-viewer",
      provider: "sketchfab",
      format: "embedded-viewer",
      viewerUrl: `https://sketchfab.com/models/${uid}/embed`,
      glbUrl: null,
      sourceModelUrl: `https://sketchfab.com/3d-models/${uid}`,
      sourceModelUid: uid,
      downloadable: Boolean(model.isDownloadable),
    },
    attribution: {
      creatorName: creator.displayName ?? creator.username ?? "Unknown creator",
      creatorUrl: creator.profileUrl ?? (creator.username ? `https://sketchfab.com/${creator.username}` : null),
      sourceName: "Sketchfab",
      sourceUrl: `https://sketchfab.com/3d-models/${uid}`,
      licenseName: license.label ?? license.name ?? "License requires review",
      licenseUrl: license.url ?? null,
      required: true,
    },
    provenance: {
      entrySource: "sketchfab-live-search",
      importedAt: createdAt,
      licenseApproved: false,
    },
  };
}

async function getSketchfabModel(uid) {
  const response = await fetch(`${SKETCHFAB_API}/models/${encodeURIComponent(uid)}`);
  if (!response.ok) throw new Error(`Sketchfab returned ${response.status}.`);
  return response.json();
}

async function searchSketchfab(query, limit) {
  const endpoint = new URL(`${SKETCHFAB_API}/search`);
  endpoint.searchParams.set("type", "models");
  endpoint.searchParams.set("q", query);
  endpoint.searchParams.set("count", String(limit));

  const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Sketchfab search returned ${response.status}.`);
  const payload = await response.json();
  const candidates = payload.results?.models ?? payload.results ?? payload.models ?? [];
  const models = Array.isArray(candidates) ? candidates.slice(0, limit) : [];
  const details = await Promise.all(
    models.map(async (model) => {
      try {
        return await getSketchfabModel(model.uid);
        } catch {
        return model;
      }
    }),
  );

  return details.map(normalizeSketchfabModel);
}

function validateOwnedMonument(payload) {
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const sourceType = payload.asset?.provider;
  const holder = typeof payload.rights?.holder === "string" ? payload.rights.holder.trim() : "";

  if (!name) return "name is required.";
  if (!['own-photogrammetry', 'blender-photogrammetry'].includes(sourceType)) {
    return "asset.provider must be own-photogrammetry or blender-photogrammetry.";
  }
  if (!holder) return "rights.holder is required for an asset you add.";
  if (payload.asset?.glbUrl && !String(payload.asset.glbUrl).startsWith("https://")) {
    return "asset.glbUrl must be an HTTPS URL.";
  }
  return null;
}

function makeOwnedMonument(payload) {
  const now = new Date().toISOString();
  const id = `${toSlug(payload.name)}-${randomUUID().slice(0, 8)}`;

  return {
    id,
    name: payload.name.trim(),
    description: typeof payload.description === "string" ? payload.description.trim() : "",
    location: {
      city: payload.location?.city ?? null,
      state: payload.location?.state ?? null,
      country: payload.location?.country ?? "India",
      latitude: Number.isFinite(payload.location?.latitude) ? payload.location.latitude : null,
      longitude: Number.isFinite(payload.location?.longitude) ? payload.location.longitude : null,
    },
    heritage: {
      era: payload.heritage?.era ?? null,
      yearCompleted: Number.isFinite(payload.heritage?.yearCompleted) ? payload.heritage.yearCompleted : null,
      architecturalStyle: payload.heritage?.architecturalStyle ?? null,
    },
    keywords: Array.isArray(payload.keywords) ? payload.keywords.filter((tag) => typeof tag === "string").slice(0, 24) : [],
    coverImageUrl: typeof payload.coverImageUrl === "string" ? payload.coverImageUrl : null,
    asset: {
      status: payload.asset?.glbUrl ? "ready" : "metadata-only",
      provider: payload.asset.provider,
      format: payload.asset?.format ?? "glb",
      viewerUrl: payload.asset?.viewerUrl ?? null,
      glbUrl: payload.asset?.glbUrl ?? null,
      sourceModelUrl: null,
      sourceModelUid: null,
      downloadable: false,
    },
    attribution: {
      creatorName: payload.rights.holder,
      creatorUrl: payload.rights?.holderUrl ?? null,
      sourceName: "Virasaat collection",
      sourceUrl: null,
      licenseName: payload.rights?.licenseName ?? "All rights reserved",
      licenseUrl: payload.rights?.licenseUrl ?? null,
      required: true,
    },
    provenance: {
      entrySource: payload.asset.provider,
      importedAt: now,
      licenseApproved: true,
    },
  };
}

async function handleRequest(request, response) {
  const origin = getAllowedOrigin(request);
  if (request.method === "OPTIONS") return sendJson(response, 204, {}, origin);

  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
  const { pathname, searchParams } = url;

  try {
    if (request.method === "GET" && pathname === "/health") {
      return sendJson(response, 200, { ok: true, service: "virasaat-monument-catalog" }, origin);
    }

    if (request.method === "GET" && pathname === "/api/monuments") {
      const catalog = await readCatalog();
      const terms = (searchParams.get("q") ?? "").trim().toLowerCase();
      const requestedSource = searchParams.get("source");
      const requestedState = searchParams.get("state");
      const has3d = searchParams.get("has3d");
      const page = parseLimit(searchParams.get("page"), 1, 10_000);
      const limit = parseLimit(searchParams.get("limit"), 20);
      const filtered = catalog.filter((record) => {
        const searchable = [record.name, record.description, record.location?.city, record.location?.state, ...(record.keywords ?? [])]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        const matchesTerms = !terms || searchable.includes(terms);
        const matchesSource = !requestedSource || record.asset?.provider === requestedSource;
        const matchesState = !requestedState || record.location?.state?.toLowerCase() === requestedState.toLowerCase();
        const matches3d = has3d !== "true" || record.asset?.status === "ready" || record.asset?.status === "external-viewer";
        return matchesTerms && matchesSource && matchesState && matches3d;
      });
      const start = (page - 1) * limit;
      return sendJson(response, 200, {
        data: filtered.slice(start, start + limit).map(monumentSummary),
        pagination: { page, limit, total: filtered.length, hasNextPage: start + limit < filtered.length },
      }, origin);
    }

    const monumentMatch = pathname.match(/^\/api\/monuments\/([a-z0-9-]+)$/i);
    if (request.method === "GET" && monumentMatch) {
      const monument = (await readCatalog()).find((entry) => entry.id === monumentMatch[1]);
      if (!monument) return error(response, 404, "MONUMENT_NOT_FOUND", "No monument matches this id.", origin);
      return sendJson(response, 200, { data: monument }, origin);
    }

    const embedMatch = pathname.match(/^\/api\/monuments\/([a-z0-9-]+)\/embed$/i);
    if (request.method === "GET" && embedMatch) {
      const monument = (await readCatalog()).find((entry) => entry.id === embedMatch[1]);
      if (!monument) return error(response, 404, "MONUMENT_NOT_FOUND", "No monument matches this id.", origin);
      if (!monument.asset?.viewerUrl) {
        return error(response, 409, "MODEL_NOT_READY", "This monument has no cleared interactive model yet.", origin);
      }
      return sendJson(response, 200, {
        data: { viewerUrl: monument.asset.viewerUrl, attribution: monument.attribution, asset: monument.asset },
      }, origin);
    }

    if (request.method === "GET" && pathname === "/api/sources/sketchfab/search") {
      const query = (searchParams.get("q") ?? "").trim();
      if (query.length < 2) return error(response, 400, "QUERY_REQUIRED", "Use a search query with at least two characters.", origin);
      const limit = parseLimit(searchParams.get("limit"), 12, 20);
      const models = await searchSketchfab(query, limit);
      return sendJson(response, 200, {
        data: models,
        notice: "External results are not yet in your catalog. Review the model license and attribution before importing.",
      }, origin);
    }

    if (request.method === "POST" && pathname === "/api/monuments/import/sketchfab") {
        if (!isAdmin(request)) return error(response, 401, "ADMIN_KEY_REQUIRED", "Set CATALOG_ADMIN_KEY and send it as X-Api-Key.", origin);
      const payload = await readBody(request);
      const uid = typeof payload.modelUid === "string" ? payload.modelUid.trim() : "";
      if (!/^[a-z0-9]{32}$/i.test(uid)) return error(response, 400, "INVALID_MODEL_UID", "modelUid must be a Sketchfab model UID.", origin);
      if (payload.licenseApproved !== true) {
        return error(response, 400, "LICENSE_APPROVAL_REQUIRED", "Set licenseApproved to true after reviewing the model's license and attribution.", origin);
      }
      const model = normalizeSketchfabModel(await getSketchfabModel(uid));
      model.provenance.licenseApproved = true;
      const catalog = await readCatalog();
      const existing = catalog.find((entry) => entry.id === model.id);
      if (!existing) {
        catalog.push(model);
        await writeCatalog(catalog);
      }
      return sendJson(response, existing ? 200 : 201, { data: existing ?? model, created: !existing }, origin);
    }

    if (request.method === "POST" && pathname === "/api/monuments") {
      if (!isAdmin(request)) return error(response, 401, "ADMIN_KEY_REQUIRED", "Set CATALOG_ADMIN_KEY and send it as X-Api-Key.", origin);
      const payload = await readBody(request);
      const validationError = validateOwnedMonument(payload);
      if (validationError) return error(response, 400, "INVALID_MONUMENT", validationError, origin);
      const monument = makeOwnedMonument(payload);
      const catalog = await readCatalog();
      catalog.push(monument);
      await writeCatalog(catalog);
      return sendJson(response, 201, { data: monument }, origin);
    }

    return error(response, 404, "ROUTE_NOT_FOUND", "The requested API route does not exist.", origin);
  } catch (caught) {
    const message = caught instanceof Error ? caught.message : "Unexpected server error.";
    return error(response, 500, "SERVER_ERROR", message, origin);
  }
}

createServer(handleRequest).listen(PORT, () => {
  console.log(`Virasaat monument API listening at http://localhost:${PORT}`);
});
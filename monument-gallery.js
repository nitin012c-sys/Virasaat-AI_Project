(() => {
  const gallery = document.querySelector("#monument-gallery");
  const form = document.querySelector("#monument-search-form");
  const searchInput = document.querySelector("#monument-search-term");
  const RESULT_LIMIT = 12;

  if (!gallery) return;

  const LOCAL_CATALOG = [
    { uid: "33149233cefd492b9abdd50fe5a8c921", name: "Taj Mahal", city: "Agra", state: "Uttar Pradesh" },
    { uid: "6cc905be2ae34e8091eb1eaa84a17738", name: "Sun Temple, Konark", city: "Konark", state: "Odisha" },
    { uid: "e165e25ec8f1497aa83ab72419f40ddc", name: "Qutub Minar", city: "Delhi", state: "Delhi" },
    { uid: "b80c75f91dad4994a0e7000467433ac9", name: "Brihadeeswarar Temple", city: "Thanjavur", state: "Tamil Nadu" },
    { uid: "47c0ea2a759544729c137d8b86ba5b9a", name: "Hawa Mahal (Palace of Winds)", city: "Jaipur", state: "Rajasthan" },
    { uid: "bfde286898e94fd6bd44570df4669a8c", name: "Red Fort (Lal Qila)", city: "Delhi", state: "Delhi" }
  ];

  function showStatus(message) {
    gallery.replaceChildren();
    const status = document.createElement("p");
    status.className = "gallery-status";
    status.textContent = message;
    gallery.append(status);
  }

  function getModels(payload) {
    if (!payload) return [];
    if (Array.isArray(payload.results?.models)) return payload.results.models;
    if (Array.isArray(payload.results)) return payload.results;
    if (Array.isArray(payload.models)) return payload.models;
    if (Array.isArray(payload.data)) return payload.data;
    if (Array.isArray(payload)) return payload;
    return [];
  }

  function makeModelCard(model) {
    const uid = model.uid || model.asset?.sourceModelUid;
    if (typeof uid !== "string" || !/^[a-z0-9]+$/i.test(uid)) return null;

    const card = document.createElement("article");
    card.className = "sketchfab-card";

    const frame = document.createElement("iframe");
    frame.src = `https://sketchfab.com/models/${encodeURIComponent(uid)}/embed?autostart=0&ui_infos=0`;
    frame.title = model.name ? `${model.name} 3D model` : "Sketchfab 3D monument model";
    frame.loading = "lazy";
    frame.allow = "autoplay; fullscreen; xr-spatial-tracking";
    frame.setAttribute("allowfullscreen", "");

    const info = document.createElement("div");
    info.className = "sketchfab-card-info";

    const title = document.createElement("strong");
    title.textContent = model.name || "Untitled 3D model";

    const actions = document.createElement("div");
    actions.className = "sketchfab-card-actions";
    actions.style.display = "flex";
    actions.style.gap = "10px";
    actions.style.marginTop = "8px";
    actions.style.alignItems = "center";
    actions.style.flexWrap = "wrap";

    const fullBtn = document.createElement("button");
    fullBtn.type = "button";
    fullBtn.textContent = "Open Fullscreen ⛶";
    fullBtn.style.padding = "5px 12px";
    fullBtn.style.fontSize = "11px";
    fullBtn.style.background = "#d7b36c";
    fullBtn.style.color = "#201a15";
    fullBtn.style.border = "none";
    fullBtn.style.cursor = "pointer";
    fullBtn.style.fontWeight = "600";
    fullBtn.addEventListener("click", () => {
      const monObj = {
        name: model.name || "Monument 3D Model",
        place: [model.city, model.state].filter(Boolean).join(", ") || "India",
        year: model.year || "Heritage Archive",
        dynasty: model.era || "Historical Era",
        hotspots: 18,
        modelUrl: model.modelUrl || `https://sketchfab.com/3d-models/${encodeURIComponent(uid)}`,
        modelEmbed: `https://sketchfab.com/models/${encodeURIComponent(uid)}/embed?autostart=1&ui_infos=0`,
        streetViewUrl: model.streetViewUrl || "",
        mapsEmbedUrl: model.mapsEmbedUrl || "",
        videoEmbedUrl: model.videoEmbedUrl || ""
      };
      if (window.openFullscreenViewer) {
        window.openFullscreenViewer(monObj, "model");
      }
    });

    const sourceLink = document.createElement("a");
    sourceLink.href = model.modelUrl || `https://sketchfab.com/3d-models/${encodeURIComponent(uid)}`;
    sourceLink.target = "_blank";
    sourceLink.rel = "noopener noreferrer";
    sourceLink.textContent = "Source Link ↗";
    sourceLink.style.fontSize = "11px";

    actions.append(fullBtn, sourceLink);
    info.append(title, actions);
    card.append(frame, info);
    return card;
  }

  async function loadModels(searchTerm) {
    const query = searchTerm.trim();
    if (!query) {
      showStatus("Enter a monument, city, or heritage site to search.");
      return;
    }

    showStatus(`Searching models for “${query}”…`);
    const endpoint = new URL("https://api.sketchfab.com/v3/search");
    endpoint.searchParams.set("type", "models");
    endpoint.searchParams.set("q", query);
    endpoint.searchParams.set("count", String(RESULT_LIMIT));

    let models = [];

    // 1. Try public Sketchfab API
    try {
      const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
      if (response.ok) {
        models = getModels(await response.json());
      }
    } catch (err) {
      console.warn("Sketchfab direct API request bypassed, attempting local monument.json catalog:", err);
    }

    // 2. Try proxy /api/sources/sketchfab/search if running local api server
    if (models.length === 0) {
      try {
        const proxyResp = await fetch(`/api/sources/sketchfab/search?q=${encodeURIComponent(query)}&limit=${RESULT_LIMIT}`);
        if (proxyResp.ok) {
          const proxyJson = await proxyResp.json();
          models = getModels(proxyJson);
        }
      } catch (_) {}
    }

    // 3. Try monument.json / public/monument.json
    if (models.length === 0) {
      try {
        const jsonRes = await fetch("monument.json").catch(() => fetch("/monument.json"));
        if (jsonRes && jsonRes.ok) {
          const data = await jsonRes.json();
          const allLocal = getModels(data);
          const qLower = query.toLowerCase();
          const matched = allLocal.filter(m =>
            (m.name && m.name.toLowerCase().includes(qLower)) ||
            (m.city && m.city.toLowerCase().includes(qLower)) ||
            (m.state && m.state.toLowerCase().includes(qLower)) ||
            (m.description && m.description.toLowerCase().includes(qLower)) ||
            qLower.includes("monument") ||
            qLower.includes("india")
          );
          models = matched.length > 0 ? matched : allLocal;
        }
      } catch (localErr) {
        console.warn("Failed fetching external monument.json, using built-in catalog:", localErr);
      }
    }

    // 4. Built-in catalog fallback
    if (models.length === 0) {
      const qLower = query.toLowerCase();
      const matched = LOCAL_CATALOG.filter(m =>
        m.name.toLowerCase().includes(qLower) ||
        m.city.toLowerCase().includes(qLower) ||
        m.state.toLowerCase().includes(qLower) ||
        qLower.includes("monument") ||
        qLower.includes("india")
      );
      models = matched.length > 0 ? matched : LOCAL_CATALOG;
    }

    const cards = models.map(makeModelCard).filter(Boolean);
    gallery.replaceChildren();

    if (cards.length === 0) {
      showStatus("No embeddable models were found. Try another search term.");
      return;
    }

    gallery.append(...cards);
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    loadModels(searchInput?.value ?? "");
  });

  loadModels(gallery.dataset.searchTerm ?? "Indian monuments");
})();

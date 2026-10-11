(() => {
  const gallery = document.querySelector("#monument-gallery");
  const form = document.querySelector("#monument-search-form");
  const searchInput = document.querySelector("#monument-search-term");
  const RESULT_LIMIT = 12;

  if (!gallery) return;

  function showStatus(message) {
    gallery.replaceChildren();
    const status = document.createElement("p");
    status.className = "gallery-status";
    status.textContent = message;
    gallery.append(status);
  }

  function getModels(payload) {
    if (Array.isArray(payload.results?.models)) return payload.results.models;
    if (Array.isArray(payload.results)) return payload.results;
    if (Array.isArray(payload.models)) return payload.models;
    return [];
  }

  function makeModelCard(model) {
    if (typeof model.uid !== "string" || !/^[a-z0-9]+$/i.test(model.uid)) return null;

    const card = document.createElement("article");
    card.className = "sketchfab-card";

    const frame = document.createElement("iframe");
    frame.src = `https://sketchfab.com/models/${encodeURIComponent(model.uid)}/embed?autostart=0&ui_infos=0`;
    frame.title = model.name ? `${model.name} 3D model` : "Sketchfab 3D monument model";
    frame.loading = "lazy";
    frame.allow = "autoplay; fullscreen; xr-spatial-tracking";
    frame.setAttribute("allowfullscreen", "");

    const info = document.createElement("div");
    info.className = "sketchfab-card-info";

    const title = document.createElement("strong");
    title.textContent = model.name || "Untitled 3D model";

    const sourceLink = document.createElement("a");
    sourceLink.href = `https://sketchfab.com/3d-models/${encodeURIComponent(model.uid)}`;
    sourceLink.target = "_blank";
    sourceLink.rel = "noopener noreferrer";
    sourceLink.textContent = "View source and attribution on Sketchfab";

    info.append(title, sourceLink);
    card.append(frame, info);
    return card;
  }

  async function loadModels(searchTerm) {
    const query = searchTerm.trim();
    if (!query) {
      showStatus("Enter a monument, city, or heritage site to search.");
      return;
    }

    showStatus(`Searching Sketchfab for “${query}”…`);
    const endpoint = new URL("https://api.sketchfab.com/v3/search");
    endpoint.searchParams.set("type", "models");
    endpoint.searchParams.set("q", query);
    endpoint.searchParams.set("count", String(RESULT_LIMIT));

    try {
      const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(`Sketchfab returned ${response.status}`);

      const models = getModels(await response.json());
      const cards = models.map(makeModelCard).filter(Boolean);
      gallery.replaceChildren();

      if (cards.length === 0) {
        showStatus("No embeddable models were found. Try another search term.");
        return;
      }

      gallery.append(...cards);
    } catch (error) {
      console.error("Sketchfab model search failed:", error);
      showStatus("Models could not be loaded right now. Please try again shortly.");
    }
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    loadModels(searchInput?.value ?? "");
  });

  loadModels(gallery.dataset.searchTerm ?? "Indian monuments");
})();

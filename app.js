// Virasaat AI - Interactive Logic (Vanilla JavaScript)
(function() {
  // --- SVG Icons Definition ---
  const ICONS = {
    arch: (size = 22) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><path d="M4 21V9l8-6 8 6v12" /><path d="M8 21v-8a4 4 0 0 1 8 0v8M2 21h20" /></g></svg>`,
    book: (size = 22) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13Z" /><path d="M8 8h8M8 12h6" /></g></svg>`,
    map: (size = 22) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" /><path d="M9 3v15M15 6v15" /></g></svg>`,
    image: (size = 22) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><rect x="3" y="4" width="18" height="16" rx="1" /><circle cx="9" cy="10" r="2" /><path d="m21 15-5-5L5 20" /></g></svg>`,
    scan: (size = 22) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" /><circle cx="12" cy="12" r="4" /><path d="M7 12h10" /></g></svg>`,
    arrow: (size = 18) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><path d="M5 12h14m-5-5 5 5-5 5" /></g></svg>`,
    play: (size = 20) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><path d="m8 5 11 7-11 7V5Z" /></g></svg>`,
    pause: (size = 20) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><path d="M9 5v14M15 5v14" /></g></svg>`,
    spark: (size = 17) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><path d="m12 3 1.3 4.2L17 9l-3.7 1.8L12 15l-1.3-4.2L7 9l3.7-1.8L12 3Z" /><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15ZM5 3l.7 2.3L8 6l-2.3.7L5 9l-.7-2.3L2 6l2.3-.7L5 3Z" /></g></svg>`,
    cube: (size = 22) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 7 9 5 9-5v10l-9 5-9-5V7Z" /><path d="M12 12v10" /></g></svg>`,
    search: (size = 18) => `<svg aria-hidden="true" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></g></svg>`
  };

  // Populate Static Icons
  const brandIcon = document.getElementById("brand-icon");
  if (brandIcon) brandIcon.innerHTML = ICONS.arch(24);
  const footerIcon = document.getElementById("footer-arch-icon");
  if (footerIcon) footerIcon.innerHTML = ICONS.arch(27);
  document.querySelectorAll(".btn-arrow").forEach(el => el.innerHTML = ICONS.arrow(17));
  const s3d = document.getElementById("search-icon-3d");
  if (s3d) s3d.innerHTML = ICONS.search(18);
  const sStory = document.getElementById("search-icon-story");
  if (sStory) sStory.innerHTML = ICONS.search(18);
  const sparkBtn = document.getElementById("spark-icon-btn");
  if (sparkBtn) sparkBtn.innerHTML = ICONS.spark(17);
  const scanBtn = document.getElementById("scan-btn-icon");
  if (scanBtn) scanBtn.innerHTML = ICONS.scan(18);
  const playIcon = document.getElementById("story-play-icon");
  if (playIcon) playIcon.innerHTML = ICONS.play(20);

  // --- Data Models ---
  const features = [
    {
      id: "3d",
      icon: "arch",
      number: "01",
      title: "3D Monument",
      subtitle: "Walk through history",
      description: "Rotate, zoom and discover verified hotspots across photoreal heritage models—right from your browser."
    },
    {
      id: "story",
      icon: "book",
      number: "02",
      title: "AI Storyteller",
      subtitle: "Hear the walls speak",
      description: "Listen to vivid, multilingual stories shaped from verified archives and local oral traditions."
    },
    {
      id: "culture",
      icon: "map",
      number: "03",
      title: "State Culture",
      subtitle: "36 places, countless traditions",
      description: "Explore the food, festivals, crafts, music and living heritage of every Indian state and territory."
    },
    {
      id: "gallery",
      icon: "image",
      number: "04",
      title: "Culture Gallery",
      subtitle: "A visual archive",
      description: "Journey through restored photographs, miniature paintings and rare cultural records."
    },
    {
      id: "scanner",
      icon: "scan",
      number: "05",
      title: "Smart Scanner",
      subtitle: "Point. Scan. Discover.",
      description: "Identify a monument through your camera and instantly retrieve its story, era and archival record."
    }
  ];

  const monuments = [
    {
      name: "Hawa Mahal",
      place: "Jaipur, Rajasthan",
      year: 1799,
      dynasty: "Kachhwaha Rajput",
      image: "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1200",
      hotspots: 18,
      desc: "The Palace of Winds, built as an extension of Jaipur City Palace with 953 honeycomb jharokhas."
    },
    {
      name: "Taj Mahal",
      place: "Agra, Uttar Pradesh",
      year: 1648,
      dynasty: "Mughal Empire",
      image: "https://images.unsplash.com/photo-1532664189809-02133fee698d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1200",
      hotspots: 24,
      desc: "The renowned white marble mausoleum on the Yamuna river, commissioned by Mughal Emperor Shah Jahan."
    },
    {
      name: "Red Fort",
      place: "Delhi",
      year: 1639,
      dynasty: "Mughal Empire",
      image: "https://images.unsplash.com/photo-1519955266818-0231b63402bc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1200",
      hotspots: 31,
      desc: "The fortified red sandstone palace complex of Shahjahanabad in Old Delhi."
    },
    {
      name: "Qutub Minar",
      place: "Delhi",
      year: 1199,
      dynasty: "Delhi Sultanate",
      image: "https://images.unsplash.com/photo-1629735919597-fed920b5bd84?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1200",
      hotspots: 14,
      desc: "A towering 73m fluted brick minaret built by Qutb-ud-din Aibak and Iltutmish."
    },
    {
      name: "Sun Temple",
      place: "Konark, Odisha",
      year: 1250,
      dynasty: "Eastern Ganga dynasty",
      image: "https://images.unsplash.com/photo-1596901224267-67ca38199090?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1200",
      hotspots: 20,
      desc: "Thirteenth-century monumental chariot temple of Surya with 24 carved stone wheels."
    },
    {
      name: "Brihadeeswarar Temple",
      place: "Thanjavur, Tamil Nadu",
      year: 1010,
      dynasty: "Chola dynasty",
      image: "https://images.unsplash.com/photo-1719498481736-c125dfa45b03?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1200",
      hotspots: 25,
      desc: "The great Chola granite temple dedicated to Shiva, celebrating Dravidian engineering."
    }
  ];

  const dynasties = [
    { name: "The Chola Dynasty", era: "848–1279 CE", story: "Masters of bronze, oceans and monumental temples" },
    { name: "The Mughal Empire", era: "1526–1857 CE", story: "Gardens, empires and the architecture of memory" },
    { name: "The Mauryan Empire", era: "322–185 BCE", story: "From conquest to compassion under Emperor Ashoka" },
    { name: "The Ahom Kingdom", era: "1228–1826 CE", story: "Six centuries of resilience beside the Brahmaputra" },
    { name: "The Vijayanagara Empire", era: "1336–1646 CE", story: "Golden era of stone carving, markets and Hampi" },
    { name: "The Maratha Empire", era: "1674–1818 CE", story: "Rugged hill forts and naval prowess of Chhatrapati Shivaji" }
  ];

  const stateCultures = {
    "Rajasthan": {
      slogan: "Footprints of valour across the golden sands.",
      categories: [
        { title: "Legends & Legacies", detail: "Rajput chronicles, forts and stories of courage" },
        { title: "Food & Flavours", detail: "Dal baati churma, ker sangri and royal kitchens" },
        { title: "Festivals & Faith", detail: "Gangaur, Teej and desert celebrations" },
        { title: "Craft & Costume", detail: "Blue pottery, bandhani and block printing" }
      ]
    },
    "Tamil Nadu": {
      slogan: "Where living temples keep a thousand years of rhythm.",
      categories: [
        { title: "Legends & Legacies", detail: "Chola seas, Sangam poetry and temple cities" },
        { title: "Food & Flavours", detail: "Pongal, filter coffee and Chettinad kitchens" },
        { title: "Festivals & Faith", detail: "Pongal, Karthigai and temple traditions" },
        { title: "Dance & Music", detail: "Bharatanatyam and Carnatic compositions" }
      ]
    },
    "Assam": {
      slogan: "Stories carried by the great river and the red earth.",
      categories: [
        { title: "Legends & Legacies", detail: "Ahom heritage and the chronicles of Buranjis" },
        { title: "Food & Flavours", detail: "Khar, pitha and indigenous ingredients" },
        { title: "Festivals & Faith", detail: "Bihu seasons and satra traditions" },
        { title: "Craft & Costume", detail: "Muga silk, bamboo craft and the gamosa" }
      ]
    },
    "Gujarat": {
      slogan: "A coast of commerce, colour and enduring craft.",
      categories: [
        { title: "Legends & Legacies", detail: "Harappan cities, stepwells and freedom stories" },
        { title: "Food & Flavours", detail: "Undhiyu, dhokla and the Gujarati thali" },
        { title: "Festivals & Faith", detail: "Navratri, Uttarayan and vibrant garba" },
        { title: "Craft & Costume", detail: "Kutch embroidery, patola and bandhani" }
      ]
    }
  };

  const cultureChanges = [
    { id: "currency", title: "Currency", then: "Silver rupee", now: "Digital rupee", note: "From hand-struck imperial coins to instant digital exchange." },
    { id: "message", title: "Messages", then: "Palm-leaf letter", now: "Instant message", note: "The medium changed; our need to stay connected did not." },
    { id: "music", title: "Music", then: "Royal mehfil", now: "Global streaming", note: "Once heard in intimate courts, classical traditions now cross borders." },
    { id: "travel", title: "Travel", then: "Grand trunk road", now: "High-speed rail", note: "Ancient routes still shape the way modern India moves." }
  ];

  const experienceImages = [
    "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1800",
    "https://images.unsplash.com/photo-1519955266818-0231b63402bc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1800",
    "https://images.unsplash.com/photo-1629735919597-fed920b5bd84?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1800",
    "https://images.unsplash.com/photo-1596901224267-67ca38199090?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1800",
    "https://images.unsplash.com/photo-1532664189809-02133fee698d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1800",
    "https://images.unsplash.com/photo-1719498481736-c125dfa45b03?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1800"
  ];

  const visitModes = [
    { id: "model", title: "Interactive 3D", detail: "Rotate, zoom and open historical hotspots", icon: "cube" },
    { id: "video", title: "3D Video Walkthrough", detail: "Watch a guided cinematic journey", icon: "play" },
    { id: "maps", title: "Google Maps 3D Visit", detail: "Explore the monument and its surroundings", icon: "map" }
  ];

  // --- Application State ---
  let activeFeature = "3d";
  let backdropIndex = 0;
  let selectedMonument = monuments[0];
  let visitMode = "model";
  let selectedDynasty = dynasties[0];
  let isPlaying = false;
  let selectedState = "Rajasthan";
  let selectedCultureCategory = stateCultures["Rajasthan"].categories[0];
  let selectedComparison = cultureChanges[0];
  let isScanning = false;
  let scanComplete = false;

  // --- Render Feature Grid ---
  const featureCardsGrid = document.getElementById("feature-cards-grid");
  if (featureCardsGrid) {
    featureCardsGrid.innerHTML = "";
    features.forEach((feat) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = `feature-card ${feat.id === activeFeature ? "is-active" : ""}`;
      card.dataset.id = feat.id;
      card.innerHTML = `
        <span class="feature-number">${feat.number}</span>
        <span class="feature-icon">${ICONS[feat.icon](28)}</span>
        <strong>${feat.title}</strong>
        <small>${feat.subtitle}</small>
        <span class="feature-description">${feat.description}</span>
        <span class="feature-link">Open experience ${ICONS.arrow(16)}</span>
      `;
      card.addEventListener("click", () => {
        selectFeature(feat.id);
        document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      featureCardsGrid.appendChild(card);
    });
  }

  // --- Feature Switcher ---
  function selectFeature(id) {
    activeFeature = id;
    changeBackdrop();

    // Update active card styling
    document.querySelectorAll(".feature-card").forEach(c => {
      c.classList.toggle("is-active", c.dataset.id === id);
    });

    // Update experience headers
    const cur = features.find(f => f.id === id);
    const countEl = document.getElementById("experience-count-num");
    if (countEl) countEl.textContent = `${cur.number} / 05`;
    const titleEl = document.getElementById("experience-title-heading");
    if (titleEl) titleEl.textContent = cur.title;
    const leadEl = document.getElementById("experience-lead-p");
    if (leadEl) leadEl.textContent = cur.description;

    // Toggle Panels
    document.querySelectorAll(".experience-panel").forEach(p => p.style.display = "none");
    const targetPanel = document.getElementById(`panel-${id}`);
    if (targetPanel) targetPanel.style.display = "block";

    // Update overlays
    const modelOverlay = document.getElementById("experience-model-overlay");
    const scanFrame = document.getElementById("experience-scan-frame");
    
    if (id === "3d") {
      if (modelOverlay) modelOverlay.style.display = "block";
      if (scanFrame) scanFrame.style.display = "none";
      updateModelBadge();
    } else if (id === "scanner") {
      if (modelOverlay) modelOverlay.style.display = "none";
      if (scanFrame) scanFrame.style.display = "block";
    } else {
      if (modelOverlay) modelOverlay.style.display = "none";
      if (scanFrame) scanFrame.style.display = "none";
    }
  }

  function changeBackdrop() {
    let next = Math.floor(Math.random() * experienceImages.length);
    if (next === backdropIndex) next = (next + 1) % experienceImages.length;
    backdropIndex = next;
    const bgImg = document.getElementById("experience-bg-img");
    if (bgImg) {
      bgImg.classList.remove("animate-in");
      void bgImg.offsetWidth;
      bgImg.src = experienceImages[backdropIndex];
      bgImg.classList.add("animate-in");
    }
  }

  // --- 3D Panel Logic ---
  function updateModelBadge() {
    const curMode = visitModes.find(m => m.id === visitMode);
    const badge = document.getElementById("experience-model-badge");
    if (badge) {
      badge.innerHTML = `${ICONS[curMode.icon](17)} ${curMode.title} ready`;
    }
  }

  function renderRecentMonuments() {
    const container = document.getElementById("monuments-recent-buttons");
    if (!container) return;
    container.innerHTML = "";
    monuments.slice(0, 3).forEach(m => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = (m.name === selectedMonument.name) ? "selected" : "";
      btn.innerHTML = `<strong>${m.name}</strong><span>${m.place}</span>`;
      btn.addEventListener("click", () => {
        selectedMonument = m;
        renderRecentMonuments();
        update3DLabels();
        changeBackdrop();
      });
      container.appendChild(btn);
    });
  }

  function renderVisitModes() {
    const container = document.getElementById("visit-modes-grid");
    if (!container) return;
    container.innerHTML = "";
    visitModes.forEach(mode => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = (mode.id === visitMode) ? "selected" : "";
      btn.innerHTML = `
        ${ICONS[mode.icon](22)}
        <span><strong>${mode.title}</strong><small>${mode.detail}</small></span>
      `;
      btn.addEventListener("click", () => {
        visitMode = mode.id;
        renderVisitModes();
        updateModelBadge();
        update3DLabels();
        changeBackdrop();
      });
      container.appendChild(btn);
    });
  }

  function update3DLabels() {
    const label = document.getElementById("visit-mode-label");
    if (label) label.textContent = `Choose how to experience ${selectedMonument.name}`;
    const launchBtn = document.getElementById("launch-visit-btn");
    if (launchBtn) {
      launchBtn.textContent = (visitMode === "model") ? "Launch 3D model" : (visitMode === "video" ? "Play walkthrough" : "Open 3D map visit");
    }
  }

  // Monument Search Filter
  const monumentSearchInput = document.getElementById("monument-search-input");
  const monumentSearchResults = document.getElementById("monument-search-results");
  const recentsWrap = document.getElementById("monument-recents-wrap");

  if (monumentSearchInput) {
    monumentSearchInput.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        if (monumentSearchResults) monumentSearchResults.style.display = "none";
        if (recentsWrap) recentsWrap.style.display = "block";
        return;
      }
      if (recentsWrap) recentsWrap.style.display = "none";
      if (monumentSearchResults) {
        monumentSearchResults.style.display = "block";
        monumentSearchResults.innerHTML = "";
        const matched = monuments.filter(m => `${m.name} ${m.place}`.toLowerCase().includes(q));
        if (matched.length === 0) {
          monumentSearchResults.innerHTML = `<p class="empty-state">No monument found. Try a city or state.</p>`;
        } else {
          matched.forEach(m => {
            const item = document.createElement("button");
            item.type = "button";
            item.innerHTML = `
              <span><strong>${m.name}</strong><small>${m.place} · ${m.year}</small></span>
              ${ICONS.cube(16)}
            `;
            item.addEventListener("click", () => {
              selectedMonument = m;
              monumentSearchInput.value = "";
              monumentSearchResults.style.display = "none";
              if (recentsWrap) recentsWrap.style.display = "block";
              renderRecentMonuments();
              update3DLabels();
              changeBackdrop();
            });
            monumentSearchResults.appendChild(item);
          });
        }
      }
    });
  }

  // 3D Launch Action Modal
  const viewerModal = document.getElementById("viewer-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const launchBtn = document.getElementById("launch-visit-btn");
  if (launchBtn && viewerModal) {
    launchBtn.addEventListener("click", () => {
      document.getElementById("modal-monument-name").textContent = `${selectedMonument.name} — ${visitModes.find(v => v.id === visitMode).title}`;
      document.getElementById("modal-preview-screen").style.backgroundImage = `url("${selectedMonument.image}")`;
      document.getElementById("modal-monument-era").textContent = `${selectedMonument.place} · ${selectedMonument.dynasty} (${selectedMonument.year})`;
      document.getElementById("modal-mode-badge").innerHTML = `<span>${visitMode.toUpperCase()} ACTIVE · ${selectedMonument.hotspots} VERIFIED ARCHIVAL POINTS</span>`;
      viewerModal.classList.add("is-open");
    });
  }
  if (modalCloseBtn && viewerModal) {
    modalCloseBtn.addEventListener("click", () => viewerModal.classList.remove("is-open"));
    viewerModal.addEventListener("click", (e) => {
      if (e.target === viewerModal) viewerModal.classList.remove("is-open");
    });
  }

  // --- AI Storyteller Logic ---
  const storySearchInput = document.getElementById("story-search-input");
  const storySearchResults = document.getElementById("story-search-results");
  const surpriseStoryBtn = document.getElementById("surprise-story-btn");
  const storyToggleBtn = document.getElementById("story-toggle-btn");
  const soundwaveBars = document.getElementById("soundwave-bars");

  function updateStoryUI() {
    const statusEl = document.getElementById("story-player-status");
    if (statusEl) statusEl.textContent = isPlaying ? "Now telling" : "Ready to tell";
    const titleEl = document.getElementById("story-player-title");
    if (titleEl) titleEl.textContent = selectedDynasty.name;
    const summaryEl = document.getElementById("story-summary-text");
    if (summaryEl) summaryEl.textContent = `${selectedDynasty.story} · ${selectedDynasty.era}`;
    const playIcon = document.getElementById("story-play-icon");
    if (playIcon) playIcon.innerHTML = isPlaying ? ICONS.pause(20) : ICONS.play(20);
    if (soundwaveBars) soundwaveBars.classList.toggle("moving", isPlaying);
  }

  if (storySearchInput) {
    storySearchInput.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        if (storySearchResults) storySearchResults.style.display = "none";
        return;
      }
      if (storySearchResults) {
        storySearchResults.style.display = "block";
        storySearchResults.innerHTML = "";
        const matched = dynasties.filter(d => d.name.toLowerCase().includes(q));
        if (matched.length === 0) {
          storySearchResults.innerHTML = `<p class="empty-state">No matching dynasty found.</p>`;
        } else {
          matched.forEach(d => {
            const item = document.createElement("button");
            item.type = "button";
            item.innerHTML = `
              <span><strong>${d.name}</strong><small>${d.era}</small></span>
              ${ICONS.arrow(15)}
            `;
            item.addEventListener("click", () => {
              selectedDynasty = d;
              storySearchInput.value = "";
              storySearchResults.style.display = "none";
              updateStoryUI();
              changeBackdrop();
            });
            storySearchResults.appendChild(item);
          });
        }
      }
    });
  }

  if (surpriseStoryBtn) {
    surpriseStoryBtn.addEventListener("click", () => {
      const idx = dynasties.findIndex(d => d.name === selectedDynasty.name);
      selectedDynasty = dynasties[(idx + 1) % dynasties.length];
      if (storySearchInput) storySearchInput.value = "";
      if (storySearchResults) storySearchResults.style.display = "none";
      isPlaying = true;
      updateStoryUI();
      changeBackdrop();
      speakStory(selectedDynasty);
    });
  }

  if (storyToggleBtn) {
    storyToggleBtn.addEventListener("click", () => {
      isPlaying = !isPlaying;
      updateStoryUI();
      if (isPlaying) {
        speakStory(selectedDynasty);
      } else if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    });
  }

  function speakStory(d) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${d.name}. ${d.story}, during ${d.era}.`);
    utterance.rate = 0.95;
    utterance.onend = () => {
      isPlaying = false;
      updateStoryUI();
    };
    window.speechSynthesis.speak(utterance);
  }

  // --- State Culture Logic ---
  function renderStateCulture() {
    const statePickerContainer = document.getElementById("state-picker-buttons");
    if (!statePickerContainer) return;
    statePickerContainer.innerHTML = "";
    Object.keys(stateCultures).forEach(st => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = (st === selectedState) ? "selected" : "";
      btn.textContent = st;
      btn.addEventListener("click", () => {
        selectedState = st;
        selectedCultureCategory = stateCultures[st].categories[0];
        renderStateCulture();
        changeBackdrop();
      });
      statePickerContainer.appendChild(btn);
    });

    const sloganEl = document.getElementById("state-slogan-quote");
    if (sloganEl) sloganEl.textContent = `“${stateCultures[selectedState].slogan}”`;
    const categoriesGrid = document.getElementById("culture-categories-grid");
    if (!categoriesGrid) return;
    categoriesGrid.innerHTML = "";

    stateCultures[selectedState].categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = (cat.title === selectedCultureCategory.title) ? "selected" : "";
      btn.innerHTML = `<strong>${cat.title}</strong><span>${cat.detail}</span>`;
      btn.addEventListener("click", () => {
        selectedCultureCategory = cat;
        renderStateCulture();
        changeBackdrop();
      });
      categoriesGrid.appendChild(btn);
    });
  }

  // --- Culture Gallery (Then vs Now) Logic ---
  function renderCultureGallery() {
    const tabsContainer = document.getElementById("gallery-change-tabs");
    if (!tabsContainer) return;
    tabsContainer.innerHTML = "";
    cultureChanges.forEach(ch => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = (ch.id === selectedComparison.id) ? "selected" : "";
      btn.textContent = ch.title;
      btn.addEventListener("click", () => {
        selectedComparison = ch;
        renderCultureGallery();
        changeBackdrop();
      });
      tabsContainer.appendChild(btn);
    });

    const compContainer = document.getElementById("gallery-then-now-container");
    if (compContainer) {
      compContainer.innerHTML = `
        <div>
          <small>Then</small>
          <strong>${selectedComparison.then}</strong>
          <span>Past archive</span>
        </div>
        <i>${ICONS.arrow(20)}</i>
        <div>
          <small>Now</small>
          <strong>${selectedComparison.now}</strong>
          <span>Living culture</span>
        </div>
      `;
    }
    const noteEl = document.getElementById("gallery-note-text");
    if (noteEl) noteEl.textContent = selectedComparison.note;
  }

  // --- Smart Scanner Logic ---
  const smartScanBtn = document.getElementById("smart-scan-btn");
  const scanBtnIcon = document.getElementById("scan-btn-icon");
  const scanBtnLabel = document.getElementById("scan-btn-label");
  const scanLine = document.getElementById("experience-scan-line");
  const scannerResultCard = document.getElementById("scanner-result-card");

  if (smartScanBtn) {
    smartScanBtn.addEventListener("click", () => {
      if (isScanning) return;
      isScanning = true;
      scanComplete = false;
      smartScanBtn.disabled = true;
      if (scanBtnIcon) scanBtnIcon.innerHTML = ICONS.spark(18);
      if (scanBtnLabel) scanBtnLabel.textContent = "Recognising monument…";
      if (scanLine) scanLine.style.display = "block";
      if (scannerResultCard) scannerResultCard.style.display = "none";

      window.setTimeout(() => {
        isScanning = false;
        scanComplete = true;
        smartScanBtn.disabled = false;
        if (scanBtnIcon) scanBtnIcon.innerHTML = ICONS.scan(18);
        if (scanBtnLabel) scanBtnLabel.textContent = "Scan another monument";
        if (scanLine) scanLine.style.display = "none";
        if (scannerResultCard) {
          scannerResultCard.style.display = "block";
          const scannedMon = monuments[Math.floor(Math.random() * monuments.length)];
          document.getElementById("scanner-detected-title").textContent = `${scannedMon.name} (${scannedMon.place})`;
          document.getElementById("scanner-detected-desc").textContent = `Identified: ${scannedMon.desc} Era: ${scannedMon.dynasty} (${scannedMon.year}). Verified record retrieved from National Heritage Database.`;
        }
      }, 1800);
    });
  }

  // Initialize Module Displays
  renderRecentMonuments();
  renderVisitModes();
  updateModelBadge();
  updateStoryUI();
  renderStateCulture();
  renderCultureGallery();
  selectFeature("3d");

})();

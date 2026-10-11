import { useEffect, useState } from "react";

type IconName =
  | "arch"
  | "book"
  | "map"
  | "image"
  | "scan"
  | "arrow"
  | "play"
  | "pause"
  | "spark"
  | "cube"
  | "search";

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arch: (
      <>
        <path d="M4 21V9l8-6 8 6v12" />
        <path d="M8 21v-8a4 4 0 0 1 8 0v8M2 21h20" />
      </>
    ),
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13Z" />
        <path d="M8 8h8M8 12h6" />
      </>
    ),
    map: (
      <>
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
        <path d="M9 3v15M15 6v15" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="1" />
        <circle cx="9" cy="10" r="2" />
        <path d="m21 15-5-5L5 20" />
      </>
    ),
    scan: (
      <>
        <path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" />
        <circle cx="12" cy="12" r="4" />
        <path d="M7 12h10" />
      </>
    ),
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    play: <path d="m8 5 11 7-11 7V5Z" />,
    pause: (
      <>
        <path d="M9 5v14M15 5v14" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.3 4.2L17 9l-3.7 1.8L12 15l-1.3-4.2L7 9l3.7-1.8L12 3Z" />
        <path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15ZM5 3l.7 2.3L8 6l-2.3.7L5 9l-.7-2.3L2 6l2.3-.7L5 3Z" />
      </>
    ),
    cube: (
      <>
        <path d="m12 2 9 5-9 5-9-5 9-5Z" />
        <path d="m3 7 9 5 9-5v10l-9 5-9-5V7Z" />
        <path d="M12 12v10" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7">
        {paths[name]}
      </g>
    </svg>
  );
}

const features = [
  {
    id: "3d",
    icon: "arch" as IconName,
    number: "01",
    title: "3D Monument",
    subtitle: "Walk through history",
    description:
      "Rotate, zoom and discover verified hotspots across photoreal heritage models—right from your browser.",
  },
  {
    id: "story",
    icon: "book" as IconName,
    number: "02",
    title: "AI Storyteller",
    subtitle: "Hear the walls speak",
    description:
      "Listen to vivid, multilingual stories shaped from verified archives and local oral traditions.",
  },
  {
    id: "culture",
    icon: "map" as IconName,
    number: "03",
    title: "State Culture",
    subtitle: "36 places, countless traditions",
    description:
      "Explore the food, festivals, crafts, music and living heritage of every Indian state and territory.",
  },
  {
    id: "gallery",
    icon: "image" as IconName,
    number: "04",
    title: "Culture Gallery",
    subtitle: "A visual archive",
    description:
      "Journey through restored photographs, miniature paintings and rare cultural records.",
  },
  {
    id: "scanner",
    icon: "scan" as IconName,
    number: "05",
    title: "Smart Scanner",
    subtitle: "Point. Scan. Discover.",
    description:
      "Identify a monument through your camera and instantly retrieve its story, era and archival record.",
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1713986719526-8c44918a9688?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
    alt: "Historic Indian painting of figures in a forest",
    label: "Miniature painting · c. 1760",
  },
  {
    src: "https://images.unsplash.com/photo-1519955266818-0231b63402bc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
    alt: "Arched stone pavilion at the Red Fort",
    label: "Red Fort arcade · Delhi",
  },
  {
    src: "https://images.unsplash.com/photo-1715627156647-8fc249b99b2a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
    alt: "Historic painting of a woman reading under a tree",
    label: "Letter beneath a tree · c. 1810",
  },
];

const monuments = [
  {
    name: "Hawa Mahal",
    place: "Jaipur, Rajasthan",
    year: 1799,
    dynasty: "Kachhwaha Rajput",
    image: "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1200",
    hotspots: 18,
  },
  {
    name: "Taj Mahal",
    place: "Agra, Uttar Pradesh",
    year: 1648,
    dynasty: "Mughal Empire",
    image: "https://images.unsplash.com/photo-1532664189809-02133fee698d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1200",
    hotspots: 24,
  },
  {
    name: "Red Fort",
    place: "Delhi",
    year: 1639,
    dynasty: "Mughal Empire",
    image: "https://images.unsplash.com/photo-1519955266818-0231b63402bc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1200",
    hotspots: 31,
  },
  {
    name: "Qutub Minar",
    place: "Delhi",
    year: 1199,
    dynasty: "Delhi Sultanate",
    image: "https://images.unsplash.com/photo-1629735919597-fed920b5bd84?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1200",
    hotspots: 14,
  },
];

const dynasties = [
  { name: "The Chola Dynasty", era: "848–1279 CE", story: "Masters of bronze, oceans and monumental temples" },
  { name: "The Mughal Empire", era: "1526–1857 CE", story: "Gardens, empires and the architecture of memory" },
  { name: "The Mauryan Empire", era: "322–185 BCE", story: "From conquest to compassion under Emperor Ashoka" },
  { name: "The Ahom Kingdom", era: "1228–1826 CE", story: "Six centuries of resilience beside the Brahmaputra" },
];

const stateCultures: Record<string, { slogan: string; categories: { title: string; detail: string }[] }> = {
  Rajasthan: {
    slogan: "Footprints of valour across the golden sands.",
    categories: [
      { title: "Legends & Legacies", detail: "Rajput chronicles, forts and stories of courage" },
      { title: "Food & Flavours", detail: "Dal baati churma, ker sangri and royal kitchens" },
      { title: "Festivals & Faith", detail: "Gangaur, Teej and desert celebrations" },
      { title: "Craft & Costume", detail: "Blue pottery, bandhani and block printing" },
    ],
  },
  "Tamil Nadu": {
    slogan: "Where living temples keep a thousand years of rhythm.",
    categories: [
      { title: "Legends & Legacies", detail: "Chola seas, Sangam poetry and temple cities" },
      { title: "Food & Flavours", detail: "Pongal, filter coffee and Chettinad kitchens" },
      { title: "Festivals & Faith", detail: "Pongal, Karthigai and temple traditions" },
      { title: "Dance & Music", detail: "Bharatanatyam and Carnatic compositions" },
    ],
  },
  Assam: {
    slogan: "Stories carried by the great river and the red earth.",
    categories: [
      { title: "Legends & Legacies", detail: "Ahom heritage and the chronicles of Buranjis" },
      { title: "Food & Flavours", detail: "Khar, pitha and indigenous ingredients" },
      { title: "Festivals & Faith", detail: "Bihu seasons and satra traditions" },
      { title: "Craft & Costume", detail: "Muga silk, bamboo craft and the gamosa" },
    ],
  },
  Gujarat: {
    slogan: "A coast of commerce, colour and enduring craft.",
    categories: [
      { title: "Legends & Legacies", detail: "Harappan cities, stepwells and freedom stories" },
      { title: "Food & Flavours", detail: "Undhiyu, dhokla and the Gujarati thali" },
      { title: "Festivals & Faith", detail: "Navratri, Uttarayan and vibrant garba" },
      { title: "Craft & Costume", detail: "Kutch embroidery, patola and bandhani" },
    ],
  },
};

const cultureChanges = [
  { id: "currency", title: "Currency", then: "Silver rupee", now: "Digital rupee", note: "From hand-struck imperial coins to instant digital exchange." },
  { id: "message", title: "Messages", then: "Palm-leaf letter", now: "Instant message", note: "The medium changed; our need to stay connected did not." },
  { id: "music", title: "Music", then: "Royal mehfil", now: "Global streaming", note: "Once heard in intimate courts, classical traditions now cross borders." },
  { id: "travel", title: "Travel", then: "Grand trunk road", now: "High-speed rail", note: "Ancient routes still shape the way modern India moves." },
];

const experienceImages = [
  "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1800",
  "https://images.unsplash.com/photo-1519955266818-0231b63402bc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1800",
  "https://images.unsplash.com/photo-1629735919597-fed920b5bd84?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1800",
  "https://images.unsplash.com/photo-1596901224267-67ca38199090?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1800",
  "https://images.unsplash.com/photo-1532664189809-02133fee698d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1800",
  "https://images.unsplash.com/photo-1719498481736-c125dfa45b03?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1800",
];

const visitModes = [
  { id: "model", title: "Interactive 3D", detail: "Rotate, zoom and open historical hotspots", icon: "cube" as IconName },
  { id: "video", title: "3D Video Walkthrough", detail: "Watch a guided cinematic journey", icon: "play" as IconName },
  { id: "maps", title: "Google Maps 3D Visit", detail: "Explore the monument and its surroundings", icon: "map" as IconName },
];

export default function App() {
  const [active, setActive] = useState("3d");
  const [isPlaying, setIsPlaying] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [state, setState] = useState("Rajasthan");
  const [monumentQuery, setMonumentQuery] = useState("");
  const [selectedMonument, setSelectedMonument] = useState(monuments[0]);
  const [storyQuery, setStoryQuery] = useState("");
  const [selectedDynasty, setSelectedDynasty] = useState(dynasties[0]);
  const [cultureType, setCultureType] = useState(stateCultures.Rajasthan.categories[0]);
  const [comparison, setComparison] = useState(cultureChanges[0]);
  const [backdropIndex, setBackdropIndex] = useState(0);
  const [visitMode, setVisitMode] = useState("model");

  const monumentResults = monuments.filter((item) =>
    `${item.name} ${item.place}`.toLowerCase().includes(monumentQuery.toLowerCase()),
  );
  const storyResults = dynasties.filter((item) =>
    item.name.toLowerCase().includes(storyQuery.toLowerCase()),
  );

  useEffect(() => {
    if (!scanning) return;
    const timer = window.setTimeout(() => {
      setScanning(false);
      setScanComplete(true);
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [scanning]);

  function openFeature(id: string) {
    setActive(id);
    changeBackdrop();
    document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function changeBackdrop() {
    setBackdropIndex((current) => {
      if (experienceImages.length < 2) return current;
      let next = Math.floor(Math.random() * experienceImages.length);
      if (next === current) next = (next + 1) % experienceImages.length;
      return next;
    });
  }

  function chooseMonument(item: (typeof monuments)[number]) {
    setSelectedMonument(item);
    setMonumentQuery("");
    changeBackdrop();
  }

  function chooseVisitMode(id: string) {
    setVisitMode(id);
    changeBackdrop();
  }

  function chooseState(item: string) {
    setState(item);
    setCultureType(stateCultures[item].categories[0]);
    changeBackdrop();
  }

  function surpriseStory() {
    const currentIndex = dynasties.findIndex((item) => item.name === selectedDynasty.name);
    setSelectedDynasty(dynasties[(currentIndex + 1) % dynasties.length]);
    setStoryQuery("");
    setIsPlaying(true);
    changeBackdrop();
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Virasaat home">
          <span className="brand-mark"><Icon name="arch" size={24} /></span>
          <span>VIRASAAT</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#discover">Discover</a>
          <a href="#experience">Experiences</a>
          <a href="#archive">The Archive</a>
        </nav>
        <a className="nav-action" href="#experience">
          Enter the archive <Icon name="arrow" size={17} />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> India’s living digital archive</p>
          <h1>THE PAST IS<br />NOT <em>PAST.</em></h1>
          <p className="hero-intro">
            Step inside India’s living heritage. Explore its monuments, hear its stories, and uncover
            the culture carried through generations.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#discover">
              Begin your journey <Icon name="arrow" size={18} />
            </a>
            <span className="archive-note">Verified records<br />Open heritage data</span>
          </div>
        </div>

        <div className="hero-collage" aria-label="Historic Indian architecture collage">
          <div className="sun-disc" />
          <figure className="photo-main">
            <img
              src="https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1000"
              alt="Hawa Mahal in Jaipur"
            />
            <figcaption>Hawa Mahal<br /><span>Jaipur · 1799</span></figcaption>
          </figure>
          <figure className="photo-small">
            <img
              src="https://images.unsplash.com/photo-1532664189809-02133fee698d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=600"
              alt="Taj Mahal reflected in its pool"
            />
          </figure>
          <span className="vertical-type">MEMORY · CRAFT · IDENTITY</span>
          <div className="stamp">EST.<br /><strong>2026</strong><br />INDIA</div>
        </div>
      </section>

      <section className="marquee" aria-label="Platform capabilities">
        <span>Explore</span><i>✦</i><span>Listen</span><i>✦</i><span>Scan</span><i>✦</i>
        <span>Remember</span><i>✦</i><span>Preserve</span>
      </section>

      <section className="feature-section" id="discover">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> Five ways into the past</p>
            <h2>CHOOSE YOUR<br /><em>WAY IN.</em></h2>
          </div>
          <p>
            History is not one story. Enter through a monument, a voice, a place, an image—or
            something standing right in front of you.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <button
              className={`feature-card ${active === feature.id ? "is-active" : ""}`}
              key={feature.id}
              onClick={() => openFeature(feature.id)}
              type="button"
            >
              <span className="feature-number">{feature.number}</span>
              <span className="feature-icon"><Icon name={feature.icon} size={28} /></span>
              <strong>{feature.title}</strong>
              <small>{feature.subtitle}</small>
              <span className="feature-description">{feature.description}</span>
              <span className="feature-link">Open experience <Icon name="arrow" size={16} /></span>
            </button>
          ))}
        </div>
      </section>

      <section className="experience-section" id="experience">
        <div className="experience-visual">
          <img
            key={experienceImages[backdropIndex]}
            src={experienceImages[backdropIndex]}
            alt="Selected Indian heritage experience"
          />
          {active === "3d" && (
            <div className="model-overlay">
              <span className="model-badge">
                <Icon name={visitModes.find((item) => item.id === visitMode)?.icon ?? "cube"} size={17} />
                {visitModes.find((item) => item.id === visitMode)?.title} ready
              </span>
            </div>
          )}
          {active === "scanner" && (
            <div className={`scan-frame ${scanning ? "is-scanning" : ""}`}>
              <span className="corner tl" /><span className="corner tr" />
              <span className="corner bl" /><span className="corner br" />
              {scanning && <span className="scan-line" />}
            </div>
          )}
        </div>

        <div className="experience-copy">
          <p className="eyebrow"><span /> Live experience</p>
          <p className="experience-count">
            {features.find((item) => item.id === active)?.number} / 05
          </p>
          <h2>{features.find((item) => item.id === active)?.title}</h2>
          <p className="experience-lead">{features.find((item) => item.id === active)?.description}</p>

          {active === "story" && (
            <div className="browse-panel">
              <div className="search-row">
                <label className="search-field">
                  <Icon name="search" size={18} />
                  <input
                    value={storyQuery}
                    onChange={(event) => setStoryQuery(event.target.value)}
                    placeholder="Search a dynasty or empire…"
                  />
                </label>
                <button className="surprise-button" onClick={surpriseStory} type="button">
                  <Icon name="spark" size={17} /> Tell me anything
                </button>
              </div>
              {storyQuery && (
                <div className="search-results">
                  {storyResults.map((item) => (
                    <button key={item.name} onClick={() => { setSelectedDynasty(item); setStoryQuery(""); changeBackdrop(); }} type="button">
                      <span><strong>{item.name}</strong><small>{item.era}</small></span>
                      <Icon name="arrow" size={15} />
                    </button>
                  ))}
                </div>
              )}
              <button className="story-player" onClick={() => setIsPlaying(!isPlaying)} type="button">
                <span className="play-button"><Icon name={isPlaying ? "pause" : "play"} size={20} /></span>
                <span><small>{isPlaying ? "Now telling" : "Ready to tell"}</small><strong>{selectedDynasty.name}</strong></span>
                <span className={`soundwave ${isPlaying ? "moving" : ""}`}><i /><i /><i /><i /><i /></span>
              </button>
              <p className="story-summary">{selectedDynasty.story} · {selectedDynasty.era}</p>
            </div>
          )}

          {active === "culture" && (
            <div className="culture-browser">
              <div className="state-picker">
                <small>First, choose a state</small>
                <div>
                  {Object.keys(stateCultures).map((item) => (
                    <button
                      className={state === item ? "selected" : ""}
                      key={item}
                      onClick={() => chooseState(item)}
                      type="button"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <blockquote>“{stateCultures[state].slogan}”</blockquote>
              <small className="collection-label">Now choose what you want to discover</small>
              <div className="culture-options">
                {stateCultures[state].categories.map((item) => (
                  <button
                    className={cultureType.title === item.title ? "selected" : ""}
                    key={item.title}
                    onClick={() => { setCultureType(item); changeBackdrop(); }}
                    type="button"
                  >
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {active === "gallery" && (
            <div className="change-gallery">
              <small>Choose a chapter of change</small>
              <div className="change-tabs">
                {cultureChanges.map((item) => (
                  <button className={comparison.id === item.id ? "selected" : ""} key={item.id} onClick={() => { setComparison(item); changeBackdrop(); }} type="button">
                    {item.title}
                  </button>
                ))}
              </div>
              <div className="then-now">
                <div><small>Then</small><strong>{comparison.then}</strong><span>Past archive</span></div>
                <i><Icon name="arrow" size={20} /></i>
                <div><small>Now</small><strong>{comparison.now}</strong><span>Living culture</span></div>
              </div>
              <p>{comparison.note}</p>
            </div>
          )}

          {active === "3d" && (
            <div className="browse-panel">
              <label className="search-field monument-search">
                <Icon name="search" size={18} />
                <input
                  value={monumentQuery}
                  onChange={(event) => setMonumentQuery(event.target.value)}
                  placeholder="Search monuments, cities or states…"
                />
              </label>
              {monumentQuery ? (
                <div className="search-results">
                  {monumentResults.length > 0 ? monumentResults.map((item) => (
                    <button key={item.name} onClick={() => chooseMonument(item)} type="button">
                      <span><strong>{item.name}</strong><small>{item.place} · {item.year}</small></span>
                      <Icon name="cube" size={16} />
                    </button>
                  )) : <p className="empty-state">No monument found. Try a city or state.</p>}
                </div>
              ) : (
                <>
                  <small className="collection-label">Recently explored</small>
                  <div className="recent-monuments">
                    {monuments.slice(0, 3).map((item) => (
                      <button className={selectedMonument.name === item.name ? "selected" : ""} key={item.name} onClick={() => chooseMonument(item)} type="button">
                        <strong>{item.name}</strong>
                        <span>{item.place}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
              <small className="collection-label visit-label">Choose how to experience {selectedMonument.name}</small>
              <div className="visit-modes">
                {visitModes.map((mode) => (
                  <button
                    className={visitMode === mode.id ? "selected" : ""}
                    key={mode.id}
                    onClick={() => chooseVisitMode(mode.id)}
                    type="button"
                  >
                    <Icon name={mode.icon} size={22} />
                    <span><strong>{mode.title}</strong><small>{mode.detail}</small></span>
                  </button>
                ))}
              </div>
              <div className="model-controls">
                <button type="button">
                  {visitMode === "model" ? "Launch 3D model" : visitMode === "video" ? "Play walkthrough" : "Open 3D map visit"}
                </button>
              </div>
            </div>
          )}

          {active === "scanner" && (
            <button
              className="primary-action scanner-button"
              disabled={scanning}
              onClick={() => { setScanComplete(false); setScanning(true); }}
              type="button"
            >
              <Icon name={scanning ? "spark" : "scan"} size={18} />
              {scanning ? "Recognising monument…" : scanComplete ? "Scan another monument" : "Start smart scan"}
            </button>
          )}

        </div>
      </section>

      <section className="archive-section" id="archive">
        <p className="eyebrow light"><span /> The archive grows every day</p>
        <div className="archive-title">
          <h2>PRESERVING WHAT<br />TIME <em>CANNOT.</em></h2>
          <div className="archive-stat"><strong>5,000+</strong><span>verified cultural<br />records and counting</span></div>
        </div>
        <div className="archive-grid">
          {galleryImages.map((item, index) => (
            <figure key={item.src} className={index === 1 ? "tall" : ""}>
              <img src={item.src} alt={item.alt} />
              <figcaption><span>0{index + 1}</span>{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <Icon name="arch" size={27} />
          <strong>VIRASAAT</strong>
          <span>India’s living digital archive</span>
        </div>
        <p>Built for curious minds, careful research and the stories that deserve to live on.</p>
        <span>© 2026 VIRAASATVERSE</span>
      </footer>
    </main>
  );
}

import React, { useEffect, useState } from "react";
import "./HuntingTower.css";
import huntingTowerImgOne from "../../assets/hunting-tower-1.png";
import huntingTowerImgTwo from "../../assets/hunting-tower-2.png";
import huntingTowerImgThree from "../../assets/hunting-tower-3.png";
import huntingTowerImgFour from "../../assets/hunting-tower-4.png";
import huntingTowerImgFive from "../../assets/hunting-tower-5.png";
import huntingTowerImgSix from "../../assets/hunting-tower-6.png";

const galleryImages = [
  {
    src: huntingTowerImgOne,
    title: "Ancient Royal Hunting Tower (Shikar Gah)",
    location: "Dangmal Core Forest Reserve",
    category: "Heritage Monument",
  },
  {
    src: huntingTowerImgTwo,
    title: "Kanika King Archival Masonry Ruins",
    location: "Old Royal Forest Circuit",
    category: "Historical Architecture",
  },
  {
    src: huntingTowerImgThree,
    title: "Watchtower Glade & Wildlife Viewpoint",
    location: "Dangmal Meadow Perch",
    category: "Canopy Vantage",
  },
  {
    src: huntingTowerImgFour,
    title: "Delta Overlook from Upper Observation Deck",
    location: "High Forest Watchtower",
    category: "Delta Panorama",
  },
  {
    src: huntingTowerImgFive,
    title: "Sacred Lotus Pond & Heritage Trench",
    location: "Royal Hunting Grounds Boundary",
    category: "Heritage Wetland",
  },
  {
    src: huntingTowerImgSix,
    title: "Golden Hour View Over Mangrove Tree Line",
    location: "Forest Watch Deck",
    category: "Sunset Vantage",
  },
];

const navTabs = [
  { id: "tower-overview", label: "Hunting Tower & Trails" },
  { id: "history-guide", label: "Heritage & History Guide" },
  { id: "book-visit", label: "Book Heritage Tour" },
  { id: "heritage-gallery", label: "Historic Tower Gallery" },
];

const towerExperiences = [
  {
    tag: "HERITAGE WALK",
    title: "Dangmal Royal Hunting Tower Circuit",
    route: "Dangmal Pier → Ancient Shikar Gah → Heritage Waterhole → Core Watchtower",
    duration: "2 to 2.5 Hours",
    highlights:
      "Explore the 19th-century royal masonry tower used by the rulers of Kanika, vintage arrow and rifle slits, surrounding watering holes, and wildlife vantage decks.",
    capacity: "Guided Forest Batch Departures (Up to 10–15 Guests)",
  },
  {
    tag: "BOAT & HERITAGE COMBO",
    title: "Full Day Estuarine Safari & Hunting Tower Trail",
    route: "Khola Jetty Safari Boat → Dangmal Forest Ghat → Heritage Trail → Suajore Creek",
    duration: "5 to 6 Hours (Comprehensive Package)",
    highlights:
      "Seamless motorboat cruise with Bhitarakanika Boat Service combined with a guided walking trek to the ancient hunting tower and crocodile breeding center.",
    capacity: "Custom Private Cruisers & Forest Naturalist",
  },
  {
    tag: "PHOTOGRAPHY FOCUS",
    title: "Sunrise Canopy & Historic Ruins Trek",
    route: "Dangmal Forest Buffer → Historical Enclosure → Observation Watchtower",
    duration: "Early Morning (6:30 AM – 9:30 AM)",
    highlights:
      "Capture soft morning light across weathered laterite brickwork, spotted deer herds grazing in surrounding glades, and resident raptors perched on tree crowns.",
    capacity: "Private Custom Group with Senior Eco-Guide",
  },
];

const towerFAQs = [
  {
    q: "What is the history behind the Hunting Tower in Bhitarkanika?",
    a: "The Hunting Tower (locally known as the Shikar Gah) dates back to the era of the Raja of Kanika, who ruled the region prior to national park declaration. Built amidst the dense Dangmal forest, the multi-tier stone-and-brick structure served as a royal lookout post over natural watering holes to observe game.",
  },
  {
    q: "Where is the Hunting Tower located and how do visitors reach it?",
    a: "The tower is situated on Dangmal Island inside the core terrestrial sector of Bhitarkanika National Park. Visitors arrive aboard authorized safari boats operated by Bhitarakanika Boat Service from Khola Jetty, docking at Dangmal Ghat before taking the cleared forest walking trail.",
  },
  {
    q: "Is entry to the Hunting Tower covered under standard sanctuary permits?",
    a: "Yes. General sanctuary entry clearances cover the historical hunting tower, nature boardwalks, and watchtowers. Bhitarakanika Boat Service organizes all necessary Forest Department passenger permits and guide clearances before boat departure.",
  },
  {
    q: "What wildlife can be seen near the Hunting Tower grounds?",
    a: "The clearing surrounding the ancient tower features freshwater ponds that regularly attract herds of spotted deer (Chital), wild boars, monitor lizards, rhesus macaques, and various wetland birds such as kingfishers, egrets, and white-bellied sea eagles.",
  },
  {
    q: "Are there any seasonal restrictions for visiting the heritage sites?",
    a: "The heritage trails follow the general sanctuary operating schedule and remain strictly closed annually from May 1 to July 31 during the saltwater crocodile breeding season. The winter months from October to March offer the best walking conditions.",
  },
];

const HuntingTower = () => {
  const [activeTab, setActiveTab] = useState("tower-overview");
  const [activeImage, setActiveImage] = useState(null);
  const [faqIndex, setFaqIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    if (tabId === "history-guide") {
      setFaqIndex(0);
    }

    if (tabId === "book-visit") {
      setFormSubmitted(false);
    }

    document.getElementById("hunting-tower-services")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (activeImage === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
      if (event.key === "ArrowRight") {
        setActiveImage((current) => (current + 1) % galleryImages.length);
      }
      if (event.key === "ArrowLeft") {
        setActiveImage(
          (current) =>
            (current - 1 + galleryImages.length) % galleryImages.length
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage]);

  return (
    <section className="HuntingTower" id="hunting-tower-services">
      <div className="HuntingTower__layout">
        {/* MAIN CONTENT */}
        <main className="HuntingTower__main" key={activeTab}>
          {/* 1. TOWER OVERVIEW */}
          {activeTab === "tower-overview" && (
            <div className="HuntingTower__viewPane">
              <div className="HuntingTower__eyebrow">
                <span className="HuntingTower__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • ROYAL HERITAGE TRAILS</span>
              </div>

              <h1 className="HuntingTower__pageTitle">
                Ancient Hunting Tower <span>& Historical Forest Outposts.</span>
              </h1>

              <p className="HuntingTower__lead">
                Walk through pages of delta history inside the core forests of
                Dangmal with Bhitarakanika Boat Service. Built by the former rulers of
                Kanika, the historic Hunting Tower stands preserved amidst dense mangrove
                groves, offering panoramic views across natural freshwater glades frequented
                by spotted deer, wild boars, and native avifauna.
              </p>

              <figure className="HuntingTower__heroFigure">
                <img
                  className="HuntingTower__heroImage"
                  src={huntingTowerImgOne}
                  alt="Ancient stone and brick Hunting Tower in the forests of Bhitarkanika National Park"
                />

                <figcaption className="HuntingTower__heroCaption">
                  <span className="HuntingTower__heroCaptionDot" />
                  <span>
                    Bhitarakanika Boat Service • Royal Shikar Gah & Forest Heritage Circuits
                  </span>
                </figcaption>
              </figure>

              {/* HIGHLIGHT PILLARS */}
              <div className="HuntingTower__featureGrid">
                <div className="HuntingTower__specBox">
                  <span className="HuntingTower__specNum">01</span>
                  <h3>Feudal Royal Architecture</h3>
                  <p>
                    Inspect century-old fortified laterite stone masonry, surveillance
                    slits, and observation terraces built by the King of Kanika.
                  </p>
                </div>

                <div className="HuntingTower__specBox">
                  <span className="HuntingTower__specNum">02</span>
                  <h3>Wildlife Glade Overlook</h3>
                  <p>
                    Strategically overlooks a freshwater lake where herds of spotted deer,
                    wild boars, and water monitor lizards gather to hydrate daily.
                  </p>
                </div>

                <div className="HuntingTower__specBox">
                  <span className="HuntingTower__specNum">03</span>
                  <h3>Boat Safari Integration</h3>
                  <p>
                    Cruises from Khola Jetty connect directly to the Dangmal forest trailhead,
                    led by certified Forest Department eco-guides and trackers.
                  </p>
                </div>
              </div>

              {/* PACKAGES */}
              <div className="HuntingTower__packageSection">
                <div className="HuntingTower__subHeader">
                  <span>CURATED HERITAGE EXPEDITIONS</span>
                  <h2>Featured Hunting Tower & Trail Circuits</h2>
                </div>

                <div className="HuntingTower__packageGrid">
                  {towerExperiences.map((pkg) => (
                    <div key={pkg.title} className="HuntingTower__packageCard">
                      <span className="HuntingTower__packageTag">{pkg.tag}</span>
                      <h3>{pkg.title}</h3>
                      <p className="HuntingTower__packageRoute">
                        <strong>Route:</strong> {pkg.route}
                      </p>
                      <div className="HuntingTower__packageMeta">
                        <span>⏱ {pkg.duration}</span>
                        <span>👥 {pkg.capacity}</span>
                      </div>
                      <p className="HuntingTower__packageDesc">
                        {pkg.highlights}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="HuntingTower__actionBanner">
                <div>
                  <h3>Plan Your Heritage Forest Tour with Bhitarakanika Boat Service</h3>
                  <p>
                    Pre-reserve your safari vessel from Khola Jetty to include guided
                    walking access to the ancient Hunting Tower and Dangmal interpretive center.
                  </p>
                </div>

                <button
                  type="button"
                  className="HuntingTower__btnPrimary"
                  onClick={() => handleTabChange("book-visit")}
                >
                  Reserve Heritage Tour ↗
                </button>
              </div>
            </div>
          )}

          {/* 2. HISTORY & VISITATION GUIDE */}
          {activeTab === "history-guide" && (
            <div className="HuntingTower__viewPane">
              <div className="HuntingTower__eyebrow">
                <span className="HuntingTower__eyebrowLine" />
                <span>ARCHIVAL BACKGROUND & TRAIL DIRECTIVES</span>
              </div>

              <h1 className="HuntingTower__pageTitle">
                Everything Required <span>To Explore the Royal Tower.</span>
              </h1>

              <p className="HuntingTower__lead">
                Understand the historical significance of the Kanika dynasty's forest
                retreat, architectural details, walking route protocols, and safety rules.
              </p>

              <div className="HuntingTower__planAccordion">
                {towerFAQs.map((item, index) => {
                  const isOpen = faqIndex === index;

                  return (
                    <div
                      key={item.q}
                      className={`HuntingTower__planItem ${
                        isOpen ? "is-open" : ""
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        className="HuntingTower__planTrigger"
                        onClick={() => setFaqIndex(isOpen ? -1 : index)}
                      >
                        <span>
                          {String(index + 1).padStart(2, "0")}. {item.q}
                        </span>

                        <span className="HuntingTower__planToggle">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <p className="HuntingTower__planAnswer">{item.a}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="HuntingTower__routeBox">
                <h3>Heritage Circuit Highlights & Sanctuary Guidelines</h3>

                <ul>
                  <li>
                    <strong>The Royal Shooting Box (Shikar Gah):</strong> A historic fortified
                    structure designed with narrow gun-slits and elevated vantage decks
                    providing wide visibility over the marshy glade.
                  </li>

                  <li>
                    <strong>Artificial Freshwater Reservoir:</strong> Commissioned by royal
                    decree to retain rainwater during hot summers, now serving as an essential
                    hydration pool for the island's spotted deer herds.
                  </li>

                  <li>
                    <strong>Monument Preservation Directives:</strong> Defacing historic
                    brickwork, climbing unstable outer parapets, littering, and shouting are
                    strictly prohibited under Forest Department heritage protection rules.
                  </li>

                  <li>
                    <strong>Designated Trail Pathways:</strong> Visitors must stay on cleared
                    trails accompanied by licensed guides to avoid concealed mud holes and
                    wildlife corridors.
                  </li>
                </ul>

                <p className="HuntingTower__routeNote">
                  <strong>Annual Park Closure:</strong> The forest trails and heritage circuits
                  remain strictly closed between <strong>May 1 and July 31</strong> annually during
                  the saltwater crocodile breeding and nesting cycle.
                </p>
              </div>

              <div className="HuntingTower__actionBanner">
                <div>
                  <h3>Organizing a Photography, Student, or History Tour?</h3>
                  <p>
                    Connect with our tour desk at Bhitarakanika Boat Service for chartered
                    group boats, historical briefings, and dedicated forest naturalists.
                  </p>
                </div>

                <button
                  type="button"
                  className="HuntingTower__btnPrimary"
                  onClick={() => handleTabChange("book-visit")}
                >
                  Send Heritage Inquiry ↗
                </button>
              </div>
            </div>
          )}

          {/* 3. BOOK HERITAGE TOUR */}
          {activeTab === "book-visit" && (
            <div className="HuntingTower__viewPane">
              <div className="HuntingTower__eyebrow">
                <span className="HuntingTower__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • EXPEDITION REGISTRATION</span>
              </div>

              <h1 className="HuntingTower__pageTitle">
                Reserve Your Hunting <span>Tower & Safari Experience.</span>
              </h1>

              <p className="HuntingTower__lead">
                Submit your expected travel dates and party size. Bhitarakanika Boat
                Service will arrange boat departures from Khola Jetty, organize required
                Forest Department permits, and assign an authorized eco-guide for your tour.
              </p>

              {formSubmitted ? (
                <div className="HuntingTower__formSuccess">
                  <span className="HuntingTower__checkIcon">✓</span>

                  <h3>Heritage Tour Request Received!</h3>

                  <p>
                    Your booking inquiry has been recorded by Bhitarakanika Boat Service.
                    Our desk will review vessel slots, organize required clearances, and
                    contact you with timing and pricing details.
                  </p>

                  <button
                    type="button"
                    className="HuntingTower__btnPrimary"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Submit Another Tour Request
                  </button>
                </div>
              ) : (
                <form
                  className="HuntingTower__form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setFormSubmitted(true);
                  }}
                >
                  <div className="HuntingTower__formHeading">
                    <span>BHITARAKANIKA BOAT SERVICE</span>
                    <h3>Hunting Tower & Boat Safari Booking Form</h3>
                    <p>
                      Mandatory visitor details required for Forest Department entry manifests (*).
                    </p>
                  </div>

                  <div className="HuntingTower__formGrid">
                    <div className="HuntingTower__inputGroup">
                      <label htmlFor="HuntingTower-name">Lead Visitor Name *</label>
                      <input
                        id="HuntingTower-name"
                        name="name"
                        type="text"
                        placeholder="e.g. Debashis Mohapatra"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="HuntingTower__inputGroup">
                      <label htmlFor="HuntingTower-email">Email Address *</label>
                      <input
                        id="HuntingTower-email"
                        name="email"
                        type="email"
                        placeholder="debashis@example.com"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="HuntingTower__inputGroup">
                      <label htmlFor="HuntingTower-phone">WhatsApp / Contact Number *</label>
                      <input
                        id="HuntingTower-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 94370 XXXXX"
                        autoComplete="tel"
                        required
                      />
                    </div>

                    <div className="HuntingTower__inputGroup">
                      <label htmlFor="HuntingTower-date">Expected Visit Date *</label>
                      <input
                        id="HuntingTower-date"
                        name="travelDate"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    <div className="HuntingTower__inputGroup">
                      <label htmlFor="HuntingTower-entryGate">Departure Jetty Point</label>
                      <select
                        id="HuntingTower-entryGate"
                        name="entryGate"
                        defaultValue="Khola Gate (Direct Cruise to Dangmal Trailhead)"
                      >
                        <option value="Khola Gate (Direct Cruise to Dangmal Trailhead)">
                          Khola Gate (Direct Cruise to Dangmal Trailhead)
                        </option>
                        <option value="Gupti Gate (Estuary & Coastal Route)">
                          Gupti Gate (Estuary & Coastal Route)
                        </option>
                        <option value="Chandbali Ghat (River Delta Approach)">
                          Chandbali Ghat (River Delta Approach)
                        </option>
                      </select>
                    </div>

                    <div className="HuntingTower__inputGroup">
                      <label htmlFor="HuntingTower-guests">Number of Visitors</label>
                      <select
                        id="HuntingTower-guests"
                        name="guests"
                        defaultValue="1–4 Persons (Private Small Boat + Trail)"
                      >
                        <option value="1–4 Persons (Private Small Boat + Trail)">
                          1–4 Persons (Private Small Boat + Trail)
                        </option>
                        <option value="5–8 Persons (Standard Safari Vessel)">
                          5–8 Persons (Standard Safari Vessel)
                        </option>
                        <option value="9–14 Persons (Large Family / Group Tour)">
                          9–14 Persons (Large Family / Group Tour)
                        </option>
                        <option value="15+ Persons (Educational / Corporate Camp)">
                          15+ Persons (Educational / Corporate Camp)
                        </option>
                      </select>
                    </div>

                    <div className="HuntingTower__inputGroup HuntingTower__inputGroup--full">
                      <label htmlFor="HuntingTower-service">Select Experience Package</label>
                      <select
                        id="HuntingTower-service"
                        name="service"
                        defaultValue="Boat Safari + Dangmal Hunting Tower Circuit (4-5 hrs)"
                      >
                        <option value="Boat Safari + Dangmal Hunting Tower Circuit (4-5 hrs)">
                          Boat Safari + Dangmal Hunting Tower Circuit (4-5 hrs)
                        </option>
                        <option value="Morning Historical Walking & Birding Trail (3 hrs)">
                          Morning Historical Walking & Birding Trail (3 hrs)
                        </option>
                        <option value="Full Day Delta Boat Cruise, Tower & Skywalk Combo">
                          Full Day Delta Boat Cruise, Tower & Skywalk Combo
                        </option>
                        <option value="Private Heritage Photography Charter (Custom Hours)">
                          Private Heritage Photography Charter (Custom Hours)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="HuntingTower__inputGroup">
                    <label htmlFor="HuntingTower-notes">
                      Special Requests / Senior Citizen Assistance
                    </label>
                    <textarea
                      id="HuntingTower-notes"
                      name="notes"
                      rows="4"
                      placeholder="Let Bhitarakanika Boat Service know if anyone requires extra boarding assistance, binoculars, historical briefing notes, or cottage accommodation..."
                    />
                  </div>

                  <button type="submit" className="HuntingTower__submitBtn">
                    Submit Heritage Booking Request ↗
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 4. GALLERY */}
          {activeTab === "heritage-gallery" && (
            <div className="HuntingTower__viewPane">
              <div className="HuntingTower__eyebrow">
                <span className="HuntingTower__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • HERITAGE ARCHIVE</span>
              </div>

              <h1 className="HuntingTower__pageTitle">
                Glimpses of the <span>Royal Forest Citadel.</span>
              </h1>

              <p className="HuntingTower__lead">
                Explore photographs of the ancient Hunting Tower, surrounding freshwater
                watering holes, and wildlife vantage points across Dangmal Island. Click any
                image to view details in full screen.
              </p>

              <div className="HuntingTower__galleryPageGrid">
                {galleryImages.map((img, index) => (
                  <button
                    key={`${img.title}-${index}`}
                    type="button"
                    className="HuntingTower__galleryPageCard"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View ${img.title}`}
                  >
                    <img src={img.src} alt={img.title} loading="lazy" />

                    <span className="HuntingTower__galleryCardOverlay">
                      <span>{img.category}</span>
                      <span className="HuntingTower__galleryCardTitle">
                        {img.title}
                      </span>
                      <span className="HuntingTower__galleryLocation">
                        <span aria-hidden="true">📍</span> {img.location}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="HuntingTower__sidebar">
          {/* NAVIGATION */}
          <div className="HuntingTower__sideBox">
            <div className="HuntingTower__sideTitle">
              <span />
              <h2>Explore Heritage Desk</h2>
            </div>

            <nav
              className="HuntingTower__serviceNav"
              aria-label="Explore hunting tower navigation"
            >
              {navTabs.map((tab) => {
                const isSelected = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    className={isSelected ? "is-highlighted" : ""}
                    aria-current={isSelected ? "page" : undefined}
                    onClick={() => handleTabChange(tab.id)}
                  >
                    <span className="HuntingTower__navArrow">↗</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* SUPPORT CARD */}
          <div className="HuntingTower__supportCard">
            <div className="HuntingTower__supportIcon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L4 9v11h6v-6h4v6h6V9l-8-7z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="HuntingTower__supportHeading">
              <span>BHITARAKANIKA BOAT SERVICE</span>
              <h3>Need Heritage Advice?</h3>
            </div>

            <p>
              Tidal levels govern boat transfer timings to the Dangmal forest trailhead.
              Speak with our dock tour desk for today's tide tables and heritage trail access.
            </p>

            <button
              type="button"
              className="HuntingTower__supportLink"
              onClick={() => handleTabChange("book-visit")}
            >
              <span>Connect with Jetty Desk</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          {/* QUICK LINKS */}
          <div className="HuntingTower__sideBox HuntingTower__downloads">
            <div className="HuntingTower__sideTitle">
              <span />
              <h2>Sanctuary Quick Links</h2>
            </div>

            <div className="HuntingTower__downloadGrid">
              <button
                type="button"
                className={activeTab === "tower-overview" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("tower-overview")}
              >
                <span className="HuntingTower__downloadIcon">01</span>
                <strong>Tower Trails</strong>
                <small>View routes ↗</small>
              </button>

              <button
                type="button"
                className={activeTab === "history-guide" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("history-guide")}
              >
                <span className="HuntingTower__downloadIcon">02</span>
                <strong>History Guide</strong>
                <small>Read chronicle ↗</small>
              </button>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="HuntingTower__sideBox HuntingTower__contactBox">
            <div className="HuntingTower__sideTitle">
              <span />
              <h2>Bhitarakanika Boat Service</h2>
            </div>

            <div className="HuntingTower__contactInfo">
              <span className="HuntingTower__contactInfoIcon" aria-hidden="true">
                📍
              </span>
              <div>
                <strong>Primary Jetty & Booking Hub</strong>
                <p>
                  Khola Entry Ghat, Rajnagar Block, Kendrapara District, Odisha 754225
                </p>
              </div>
            </div>

            <div className="HuntingTower__contactInfo">
              <span className="HuntingTower__contactInfoIcon" aria-hidden="true">
                ✉
              </span>
              <div>
                <strong>Official Heritage Inquiries</strong>
                <a href="mailto:safari@bhitarakanikaboatservice.com">
                  safari@bhitarakanikaboatservice.com
                </a>
              </div>
            </div>

            <div className="HuntingTower__contactInfo">
              <span className="HuntingTower__contactInfoIcon" aria-hidden="true">
                🕒
              </span>
              <div>
                <strong>Forest Gate Operating Hours</strong>
                <p>6:30 AM to 5:00 PM (Sunset Clearance Strictly Enforced)</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      {activeImage !== null && (
        <div
          className="HuntingTower__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Hunting tower photograph viewer"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="HuntingTower__lightboxBox"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="HuntingTower__lightboxClose"
              aria-label="Close image viewer"
              onClick={() => setActiveImage(null)}
            >
              ✕
            </button>

            <img
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].title}
            />

            <div className="HuntingTower__lightboxCaption">
              <div>
                <span>{galleryImages[activeImage].category}</span>
                <h3>{galleryImages[activeImage].title}</h3>
                <small>📍 {galleryImages[activeImage].location}</small>
              </div>

              <span className="HuntingTower__lightboxCount">
                {String(activeImage + 1).padStart(2, "0")} /{" "}
                {String(galleryImages.length).padStart(2, "0")}
              </span>
            </div>

            <div className="HuntingTower__lightboxControls">
              <button
                type="button"
                onClick={() =>
                  setActiveImage(
                    (activeImage - 1 + galleryImages.length) %
                      galleryImages.length
                  )
                }
                aria-label="Previous photograph"
              >
                ← Previous
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveImage((activeImage + 1) % galleryImages.length)
                }
                aria-label="Next photograph"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HuntingTower;
import React, { useEffect, useState } from "react";
import "./MangroveForest.css";
import mangroveImgOne from "../../assets/MangroveForest-1.png";
import mangroveImgTwo from "../../assets/MangroveForest-2.png";
import mangroveImgThree from "../../assets/MangroveForest-3.png";
import mangroveImgFour from "../../assets/MangroveForest-4.png";
import mangroveImgFive from "../../assets/MangroveForest-5.png";
import mangroveImgSix from "../../assets/MangroveForest-6.png";

const galleryImages = [
  {
    src: mangroveImgOne,
    title: "Dense Stilt Root Labyrinth",
    location: "Dangmal Core Waterway",
    category: "Rhizophora Stand",
  },
  {
    src: mangroveImgTwo,
    title: "Pneumatophore Breathing Roots",
    location: "Suajore Mudflat Banks",
    category: "Wetland Ecology",
  },
  {
    src: mangroveImgThree,
    title: "Canopy Trail Over Tidal Creeks",
    location: "Bhitarkanika Forest Boardwalk",
    category: "Canopy Walkway",
  },
  {
    src: mangroveImgFour,
    title: "Delta Mangrove Confluence",
    location: "Brahmani & Baitarani Estuary",
    category: "Delta Biome",
  },
  {
    src: mangroveImgFive,
    title: "Ancient Sundari & Hental Groves",
    location: "Khola Forest Buffer Zone",
    category: "Rare Floral Species",
  },
  {
    src: mangroveImgSix,
    title: "Golden Hour Mangrove Reflections",
    location: "Habalikhati Coastal Creek",
    category: "Tidal Waterway",
  },
];

const navTabs = [
  { id: "mangrove-safari", label: "Mangrove Forest Safaris" },
  { id: "botany-guide", label: "Flora & Creek Guide" },
  { id: "book-safari", label: "Book Mangrove Safari" },
  { id: "forest-gallery", label: "Mangrove Forest Gallery" },
];

const safariPackages = [
  {
    tag: "PRIMARY EXPEDITION",
    title: "Ancient Core Creek Safari",
    route: "Khola Jetty → Dangmal Core Forest → Suajore Pass → Return",
    duration: "3.5 to 4 Hours",
    highlights:
      "Dense stilt roots of Rhizophora, massive Avicennia stands, Heritiera fomes (Sundari), mudflats, and crab populations.",
    capacity: "Authorized Forest Vessels (Up to 8 / 14 / 20 Seats)",
  },
  {
    tag: "CANOPY & BOTANY",
    title: "Dangmal Boardwalk & Floral Walk",
    route: "Khola Ghat → Dangmal Nature Trail → Watchtower Loop → Tidal Creek",
    duration: "4 to 5 Hours",
    highlights:
      "Guided walk along the elevated wooden boardwalk into pristine mangrove interiors, medicinal shrub tracking, and view deck.",
    capacity: "Forest Eco-Cruiser with Certified Botanist Guide",
  },
  {
    tag: "COASTAL ECOSYSTEM",
    title: "Outer Estuarine Delta Cruise",
    route: "Gupti Gate → Brahmani Estuary → Hukitola Channel → Barrier Spits",
    duration: "Full Day / 6–7 Hours (Tide Synchronized)",
    highlights:
      "Expansive saltwater mangroves, dynamic silt shoals, coastal forest buffers against cyclonic tides, and estuary birdlife.",
    capacity: "Marine Certified Cruisers (Up to 10–12 Guests)",
  },
];

const mangroveFAQs = [
  {
    q: "Why is the Bhitarkanika mangrove ecosystem considered globally significant?",
    a: "Bhitarkanika is India's second largest mangrove ecosystem after the Sundarbans and houses the country's highest mangrove genetic diversity, containing over 62 true and associate mangrove species along the delta.",
  },
  {
    q: "What specialized adaptations allow these trees to survive in saltwater?",
    a: "Mangrove species here utilize unique adaptations including stilt prop roots for mechanical stability in tidal mud, pneumatophores (vertical breathing roots) to intake oxygen during high tides, and viviparous germination where seeds sprout while still attached to the tree.",
  },
  {
    q: "How does the tidal rhythm affect mangrove boat tours?",
    a: "High tide fills shallow, winding creeks, allowing boats to glide deep into undisturbed forest canopies. Mid and low tides expose dense respiratory roots, foraging mud crabs, mudskippers, and root networks along the water's edge.",
  },
  {
    q: "Can visitors walk inside the core mangrove forest?",
    a: "Visitors cannot disembark directly into the tidal mud due to deep silt and wildlife presence. Instead, Forest Department approved elevated wooden boardwalks at Dangmal provide safe, intimate access through the core interior.",
  },
  {
    q: "What is the best season to explore the mangrove trails?",
    a: "October through March offers pleasant weather, clear waterways, and active wetland ecology. The core park remains closed annually between May 1 and July 31 for saltwater crocodile breeding.",
  },
];

const MangroveForest = () => {
  const [activeTab, setActiveTab] = useState("mangrove-safari");
  const [activeImage, setActiveImage] = useState(null);
  const [faqIndex, setFaqIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    if (tabId === "botany-guide") {
      setFaqIndex(0);
    }

    if (tabId === "book-safari") {
      setFormSubmitted(false);
    }

    document.getElementById("mangrove-forest")?.scrollIntoView({
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
    <section className="MangroveForest" id="mangrove-forest">
      <div className="MangroveForest__layout">
        {/* MAIN CONTENT */}
        <main className="MangroveForest__main" key={activeTab}>
          {/* 1. MANGROVE FOREST SAFARI */}
          {activeTab === "mangrove-safari" && (
            <div className="MangroveForest__viewPane">
              <div className="MangroveForest__eyebrow">
                <span className="MangroveForest__eyebrowLine" />
                <span>BHITARKANIKA RAMSAR BIOSPHERE • ODISHA</span>
              </div>

              <h1 className="MangroveForest__pageTitle">
                Ancient Mangrove Forests <span>& Labyrinthine Creeks.</span>
              </h1>

              <p className="MangroveForest__lead">
                Immerse yourself in India’s richest coastal green barrier. Navigate quiet
                brackish passages fringed by centuries-old Sundari, Phoenix, and Rhizophora trees
                that shield the Odisha coastline from surging cyclonic tides and nurture
                a complex estuarine web of life.
              </p>

              <figure className="MangroveForest__heroFigure">
                <img
                  className="MangroveForest__heroImage"
                  src={mangroveImgOne}
                  alt="Ancient mangrove trees and stilt root systems along Bhitarkanika waterways"
                />

                <figcaption className="MangroveForest__heroCaption">
                  <span className="MangroveForest__heroCaptionDot" />
                  <span>
                    Ramsar Wetland Site • India's Highest Mangrove Floral Diversity
                  </span>
                </figcaption>
              </figure>

              {/* HIGHLIGHT PILLARS */}
              <div className="MangroveForest__featureGrid">
                <div className="MangroveForest__specBox">
                  <span className="MangroveForest__specNum">01</span>
                  <h3>62+ Mangrove Species</h3>
                  <p>
                    Home to true mangroves including Heritiera fomes (Sundari), Sonneratia,
                    Avicennia, and Xylocarpus flourishing along tidal mudbanks.
                  </p>
                </div>

                <div className="MangroveForest__specBox">
                  <span className="MangroveForest__specNum">02</span>
                  <h3>Pneumatophore Networks</h3>
                  <p>
                    Witness thousands of conical spike roots rising from the mudflats,
                    drawing vital oxygen during high-tide submergence cycles.
                  </p>
                </div>

                <div className="MangroveForest__specBox">
                  <span className="MangroveForest__specNum">03</span>
                  <h3>Natural Cyclone Shield</h3>
                  <p>
                    An indispensable biosphere barrier engineered by nature, dissipating
                    ferocious Bay of Bengal tidal surges across river channels.
                  </p>
                </div>
              </div>

              {/* PACKAGES */}
              <div className="MangroveForest__packageSection">
                <div className="MangroveForest__subHeader">
                  <span>CURATED FIELD TRAILS</span>
                  <h2>Signature Mangrove River Expeditions</h2>
                </div>

                <div className="MangroveForest__packageGrid">
                  {safariPackages.map((pkg) => (
                    <div key={pkg.title} className="MangroveForest__packageCard">
                      <span className="MangroveForest__packageTag">{pkg.tag}</span>
                      <h3>{pkg.title}</h3>
                      <p className="MangroveForest__packageRoute">
                        <strong>Route:</strong> {pkg.route}
                      </p>
                      <div className="MangroveForest__packageMeta">
                        <span>⏱ {pkg.duration}</span>
                        <span>👥 {pkg.capacity}</span>
                      </div>
                      <p className="MangroveForest__packageDesc">
                        {pkg.highlights}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="MangroveForest__actionBanner">
                <div>
                  <h3>Ready to Cruise Through Ancient Mangrove Waterways?</h3>
                  <p>
                    Book authorized silent crafts and forest-certified eco-guides to
                    explore the untouched creek labyrinths of Bhitarkanika.
                  </p>
                </div>

                <button
                  type="button"
                  className="MangroveForest__btnPrimary"
                  onClick={() => handleTabChange("book-safari")}
                >
                  Reserve Mangrove Safari ↗
                </button>
              </div>
            </div>
          )}

          {/* 2. BOTANY & LOGISTICS GUIDE */}
          {activeTab === "botany-guide" && (
            <div className="MangroveForest__viewPane">
              <div className="MangroveForest__eyebrow">
                <span className="MangroveForest__eyebrowLine" />
                <span>BOTANICAL ADAPTATIONS & PARK LOGISTICS</span>
              </div>

              <h1 className="MangroveForest__pageTitle">
                Everything Required <span>To Explore Mangrove Forests.</span>
              </h1>

              <p className="MangroveForest__lead">
                Discover the evolutionary resilience of halophytic plant life, departure
                timetables, tidal mechanics, and sanctuary conservation protocols.
              </p>

              <div className="MangroveForest__planAccordion">
                {mangroveFAQs.map((item, index) => {
                  const isOpen = faqIndex === index;

                  return (
                    <div
                      key={item.q}
                      className={`MangroveForest__planItem ${
                        isOpen ? "is-open" : ""
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        className="MangroveForest__planTrigger"
                        onClick={() => setFaqIndex(isOpen ? -1 : index)}
                      >
                        <span>
                          {String(index + 1).padStart(2, "0")}. {item.q}
                        </span>

                        <span className="MangroveForest__planToggle">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <p className="MangroveForest__planAnswer">{item.a}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="MangroveForest__routeBox">
                <h3>Botanical Hotspots & Key Trail Sectors</h3>

                <ul>
                  <li>
                    <strong>Dangmal Elevated Canopy Trail:</strong> A scenic wooden walkway
                    cutting through dense stands of Sundari, Excoecaria agallocha (Blinding
                    Tree), and climbing ferns with zero ground disturbance.
                  </li>

                  <li>
                    <strong>Suajore Tidal Creek Corridor:</strong> Sheltered waterways
                    flanked by towering Rhizophora mucronata arching their aerial roots straight
                    into the water.
                  </li>

                  <li>
                    <strong>Gupti to Habalikhati Forest Spits:</strong> Expansive coastal
                    mangroves and Casuarina belts that absorb strong maritime winds and anchor
                    shifting coastal sandbars.
                  </li>
                </ul>

                <p className="MangroveForest__routeNote">
                  <strong>Conservation Directive:</strong> Touching or plucking mangrove leaves,
                  disturbing root beds, and collecting botanical samples are strictly prohibited
                  under the Wildlife Protection Act.
                </p>
              </div>

              <div className="MangroveForest__actionBanner">
                <div>
                  <h3>Seeking Custom Botanical or Research Charters?</h3>
                  <p>
                    Consult directly with certified forest naturalists for student research groups,
                    botanical study expeditions, and early morning tide departures.
                  </p>
                </div>

                <button
                  type="button"
                  className="MangroveForest__btnPrimary"
                  onClick={() => handleTabChange("book-safari")}
                >
                  Send Botany Inquiry ↗
                </button>
              </div>
            </div>
          )}

          {/* 3. BOOK MANGROVE SAFARI */}
          {activeTab === "book-safari" && (
            <div className="MangroveForest__viewPane">
              <div className="MangroveForest__eyebrow">
                <span className="MangroveForest__eyebrowLine" />
                <span>EXPEDITION PERMITS & PASSENGER MANIFEST</span>
              </div>

              <h1 className="MangroveForest__pageTitle">
                Reserve Your Mangrove <span>Creek Expedition.</span>
              </h1>

              <p className="MangroveForest__lead">
                Provide your travel details and group size. Our forest desk will align
                tide windows, secure mandatory vessel permits, and allocate licensed guides.
              </p>

              {formSubmitted ? (
                <div className="MangroveForest__formSuccess">
                  <span className="MangroveForest__checkIcon">✓</span>

                  <h3>Mangrove Safari Inquiry Logged!</h3>

                  <p>
                    Your expedition request has been registered. Our boat desk will check
                    tide schedules for your date and get in touch with vessel allocations
                    and Forest Department permit assistance.
                  </p>

                  <button
                    type="button"
                    className="MangroveForest__btnPrimary"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form
                  className="MangroveForest__form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setFormSubmitted(true);
                  }}
                >
                  <div className="MangroveForest__formHeading">
                    <span>BHITARKANIKA FOREST DESK</span>
                    <h3>Mangrove Expedition Booking Form</h3>
                    <p>
                      Required fields for Forest Department passenger permits (*).
                    </p>
                  </div>

                  <div className="MangroveForest__formGrid">
                    <div className="MangroveForest__inputGroup">
                      <label htmlFor="MangroveForest-name">
                        Lead Passenger Name *
                      </label>
                      <input
                        id="MangroveForest-name"
                        name="name"
                        type="text"
                        placeholder="e.g. Debashis Mohapatra"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="MangroveForest__inputGroup">
                      <label htmlFor="MangroveForest-email">Email Address *</label>
                      <input
                        id="MangroveForest-email"
                        name="email"
                        type="email"
                        placeholder="debashis@example.com"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="MangroveForest__inputGroup">
                      <label htmlFor="MangroveForest-phone">
                        WhatsApp / Contact Number *
                      </label>
                      <input
                        id="MangroveForest-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 94370 XXXXX"
                        autoComplete="tel"
                        required
                      />
                    </div>

                    <div className="MangroveForest__inputGroup">
                      <label htmlFor="MangroveForest-date">
                        Safari Date *
                      </label>
                      <input
                        id="MangroveForest-date"
                        name="travelDate"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    <div className="MangroveForest__inputGroup">
                      <label htmlFor="MangroveForest-entryGate">
                        Departure Jetty Point
                      </label>
                      <select
                        id="MangroveForest-entryGate"
                        name="entryGate"
                        defaultValue="Khola Gate (Direct to Core Mangrove Creeks)"
                      >
                        <option value="Khola Gate (Direct to Core Mangrove Creeks)">
                          Khola Gate (Direct to Core Mangrove Creeks)
                        </option>
                        <option value="Gupti Gate (Estuarine & Coastal Mangroves)">
                          Gupti Gate (Estuarine & Coastal Mangroves)
                        </option>
                        <option value="Chandbali Ghat (Delta Approach)">
                          Chandbali Ghat (Delta Approach)
                        </option>
                      </select>
                    </div>

                    <div className="MangroveForest__inputGroup">
                      <label htmlFor="MangroveForest-guests">
                        Number of Visitors
                      </label>
                      <select
                        id="MangroveForest-guests"
                        name="guests"
                        defaultValue="1–4 Persons (Private Small Boat)"
                      >
                        <option value="1–4 Persons (Private Small Boat)">
                          1–4 Persons (Private Small Boat)
                        </option>
                        <option value="5–8 Persons (Standard Safari Vessel)">
                          5–8 Persons (Standard Safari Vessel)
                        </option>
                        <option value="9–14 Persons (Large Group Cruiser)">
                          9–14 Persons (Large Group Cruiser)
                        </option>
                        <option value="15+ Persons (Botany / College Group)">
                          15+ Persons (Botany / College Group)
                        </option>
                      </select>
                    </div>

                    <div className="MangroveForest__inputGroup MangroveForest__inputGroup--full">
                      <label htmlFor="MangroveForest-service">
                        Expedition Experience Tier
                      </label>
                      <select
                        id="MangroveForest-service"
                        name="service"
                        defaultValue="Core Creek Mangrove Safari (4 hrs)"
                      >
                        <option value="Core Creek Mangrove Safari (4 hrs)">
                          Core Creek Mangrove Safari (4 hrs) — High Water Access
                        </option>
                        <option value="Dangmal Boardwalk & Botany Walk (4-5 hrs)">
                          Dangmal Boardwalk & Botany Walk (4-5 hrs)
                        </option>
                        <option value="Full Day Outer Estuary & Delta Exploration (6-7 hrs)">
                          Full Day Outer Estuary & Delta Exploration (6-7 hrs)
                        </option>
                        <option value="Private Low-Wake Photography & Research Charter">
                          Private Low-Wake Photography & Research Charter
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="MangroveForest__inputGroup">
                    <label htmlFor="MangroveForest-notes">
                      Special Requirements / Botanical Interests
                    </label>
                    <textarea
                      id="MangroveForest-notes"
                      name="notes"
                      rows="4"
                      placeholder="Specify if you require a specialized botany guide, binoculars, cottage arrangements, or customized low-speed sailing..."
                    />
                  </div>

                  <button type="submit" className="MangroveForest__submitBtn">
                    Submit Safari Booking Request ↗
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 4. MANGROVE GALLERY */}
          {activeTab === "forest-gallery" && (
            <div className="MangroveForest__viewPane">
              <div className="MangroveForest__eyebrow">
                <span className="MangroveForest__eyebrowLine" />
                <span>FLORA & WETLAND PHOTOGRAPHY ARCHIVE</span>
              </div>

              <h1 className="MangroveForest__pageTitle">
                Portraits from the <span>Tidal Green Heart.</span>
              </h1>

              <p className="MangroveForest__lead">
                Explore the dense root systems, canopy reflections, and tranquil
                waterways across Bhitarkanika. Click any image to view details and location tags.
              </p>

              <div className="MangroveForest__galleryPageGrid">
                {galleryImages.map((img, index) => (
                  <button
                    key={`${img.title}-${index}`}
                    type="button"
                    className="MangroveForest__galleryPageCard"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View ${img.title}`}
                  >
                    <img src={img.src} alt={img.title} loading="lazy" />

                    <span className="MangroveForest__galleryCardOverlay">
                      <span>{img.category}</span>
                      <span className="MangroveForest__galleryCardTitle">
                        {img.title}
                      </span>
                      <span className="MangroveForest__galleryLocation">
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
        <aside className="MangroveForest__sidebar">
          {/* NAVIGATION */}
          <div className="MangroveForest__sideBox">
            <div className="MangroveForest__sideTitle">
              <span />
              <h2>Explore Forest Desk</h2>
            </div>

            <nav
              className="MangroveForest__serviceNav"
              aria-label="Explore mangrove forest topics"
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
                    <span className="MangroveForest__navArrow">↗</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* SUPPORT CARD */}
          <div className="MangroveForest__supportCard">
            <div className="MangroveForest__supportIcon" aria-hidden="true">
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

            <div className="MangroveForest__supportHeading">
              <span>FOREST ECOTOURISM DESK</span>
              <h3>Need Botanical Advice?</h3>
            </div>

            <p>
              Tidal levels dictate how far vessels can venture into narrow creek
              branches. Speak with our local dock staff for current tide windows and
              guide assignments.
            </p>

            <button
              type="button"
              className="MangroveForest__supportLink"
              onClick={() => handleTabChange("book-safari")}
            >
              <span>Connect with Forest Desk</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          {/* TRAVEL ESSENTIALS */}
          <div className="MangroveForest__sideBox MangroveForest__downloads">
            <div className="MangroveForest__sideTitle">
              <span />
              <h2>Sanctuary Quick Links</h2>
            </div>

            <div className="MangroveForest__downloadGrid">
              <button
                type="button"
                className={activeTab === "mangrove-safari" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("mangrove-safari")}
              >
                <span className="MangroveForest__downloadIcon">01</span>
                <strong>Forest Trails</strong>
                <small>View expeditions ↗</small>
              </button>

              <button
                type="button"
                className={activeTab === "botany-guide" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("botany-guide")}
              >
                <span className="MangroveForest__downloadIcon">02</span>
                <strong>Botany Guide</strong>
                <small>View flora tips ↗</small>
              </button>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="MangroveForest__sideBox MangroveForest__contactBox">
            <div className="MangroveForest__sideTitle">
              <span />
              <h2>Jetty Information</h2>
            </div>

            <div className="MangroveForest__contactInfo">
              <span
                className="MangroveForest__contactInfoIcon"
                aria-hidden="true"
              >
                📍
              </span>
              <div>
                <strong>Primary Jetty Location</strong>
                <p>
                  Khola Entry Ghat, Rajnagar Block, Kendrapara District, Odisha 754225
                </p>
              </div>
            </div>

            <div className="MangroveForest__contactInfo">
              <span
                className="MangroveForest__contactInfoIcon"
                aria-hidden="true"
              >
                ✉
              </span>
              <div>
                <strong>Official Forest Bookings</strong>
                <a href="mailto:safari@bhitarkanikaboats.com">
                  safari@bhitarkanikaboats.com
                </a>
              </div>
            </div>

            <div className="MangroveForest__contactInfo">
              <span
                className="MangroveForest__contactInfoIcon"
                aria-hidden="true"
              >
                🕒
              </span>
              <div>
                <strong>Sanctuary Gate Timings</strong>
                <p>6:30 AM to 5:00 PM (Strict Sunset Entry Closure)</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      {activeImage !== null && (
        <div
          className="MangroveForest__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Mangrove forest photograph viewer"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="MangroveForest__lightboxBox"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="MangroveForest__lightboxClose"
              aria-label="Close image viewer"
              onClick={() => setActiveImage(null)}
            >
              ✕
            </button>

            <img
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].title}
            />

            <div className="MangroveForest__lightboxCaption">
              <div>
                <span>{galleryImages[activeImage].category}</span>
                <h3>{galleryImages[activeImage].title}</h3>
                <small>📍 {galleryImages[activeImage].location}</small>
              </div>

              <span className="MangroveForest__lightboxCount">
                {String(activeImage + 1).padStart(2, "0")} /{" "}
                {String(galleryImages.length).padStart(2, "0")}
              </span>
            </div>

            <div className="MangroveForest__lightboxControls">
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

export default MangroveForest;
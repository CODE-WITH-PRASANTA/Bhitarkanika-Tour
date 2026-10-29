import React, { useEffect, useState } from "react";
import "./SaltWaterCrocodile.css";
import crocImgOne from "../../assets/crocodile-1.jpeg";
import crocImgTwo from "../../assets/crocodile-2.jpeg";
import crocImgThree from "../../assets/crocodile-3.jpeg";
import crocImgFour from "../../assets/crocodile-4.jpeg";
import crocImgFive from "../../assets/crocodile-5.jpeg";
import crocImgSix from "../../assets/crocodile-6.jpeg";

const galleryImages = [
  {
    src: crocImgOne,
    title: "Estuarine Apex Predator Basking",
    location: "Dangmal Mudflat Riverbank",
    category: "Giant Croc Sighting",
  },
  {
    src: crocImgTwo,
    title: "Crocodylus Porosus Hatchling Center",
    location: "Dangmal Breeding Research Facility",
    category: "Conservation Hub",
  },
  {
    src: crocImgThree,
    title: "Suajore Tidal Creek Giant",
    location: "Suajore Mangrove Channels",
    category: "Creek Cruiser",
  },
  {
    src: crocImgFour,
    title: "Territorial Delta Bull",
    location: "Baitarani Confluence Banks",
    category: "Deep Delta",
  },
  {
    src: crocImgFive,
    title: "Camouflaged in Mangrove Roots",
    location: "Khola Creek Channel",
    category: "Mangrove Ambush",
  },
  {
    src: crocImgSix,
    title: "20-Foot Delta Giant on Mudflats",
    location: "Bhitarkanika Core Riverbed",
    category: "Mega Fauna",
  },
];

const navTabs = [
  { id: "croc-safari", label: "Crocodile Boat Safaris" },
  { id: "species-guide", label: "Tidal & Sighting Guide" },
  { id: "book-safari", label: "Book Crocodile Safari" },
  { id: "croc-gallery", label: "Estuarine Croc Gallery" },
];

const safariPackages = [
  {
    tag: "HIGHEST SIGHTING RATE",
    title: "Low-Tide Mudflat Creek Safari",
    route: "Khola Jetty → Dangmal Riverbed → Suajore Creeks → Return",
    duration: "3.5 to 4 Hours (Tide Synchronized)",
    highlights:
      "Basking saltwater crocodiles along mudflats, 16–20+ foot apex delta bulls, mangrove monitor lizards, and mudskippers.",
    capacity: "Forest-Authorized Motor Vessels (Up to 8 / 14 / 20 Seats)",
  },
  {
    tag: "CONSERVATION & HERITAGE",
    title: "Dangmal Breeding & Museum Expedition",
    route: "Khola Ghat → Dangmal Island Jetty → Captive Breeding Center → Core Delta",
    duration: "4 to 5 Hours",
    highlights:
      "Guided walk through the captive breeding & research center, white crocodile enclosures, museum, and river creek cruise.",
    capacity: "Eco-Cruiser Vessel with Forest Certified Naturalist",
  },
  {
    tag: "DEEP ESTUARY EXPEDITION",
    title: "Gupti Estuary & Delta Confluence Tour",
    route: "Gupti Gate → Brahmani & Baitarani Estuary → Habalikhati Edge",
    duration: "Full Day / 6–7 Hours (High Tide Dependent)",
    highlights:
      "Open saltwater delta cruise, estuarine crocodile river runs, coastal creeks, and mudflat marine biodiversity.",
    capacity: "High-Stability Marine Safari Cruiser (Up to 12 Pax)",
  },
];

const crocPlanningFAQs = [
  {
    q: "Why are saltwater crocodiles in Bhitarkanika globally unique?",
    a: "Bhitarkanika National Park holds the Guinness World Record for housing the world's largest living estuarine crocodiles (Crocodylus porosus). Over 70% of India's wild saltwater crocodile population thrives here, with several alpha bulls measuring between 18 and 22 feet in length.",
  },
  {
    q: "How does the saltwater tidal cycle affect crocodile sightings?",
    a: "Saltwater crocodiles are cold-blooded reptiles that cannot regulate body heat internally. During low and mid tides, falling water exposes warm mudflats under direct sunlight. Crocodiles haul themselves out of the brackish channels to bask, making low tide the prime viewing window.",
  },
  {
    q: "Is boat safari travel safe around giant saltwater crocodiles?",
    a: "All vessels operated by Bhitarkanika Boat Service are strictly forest-authorized with high-walled rigid safety gunwales, licensed helmsmen trained in low-wake maneuvering, forest eco-guides, and lifejackets mandatory for every passenger.",
  },
  {
    q: "When is the park closed for crocodile breeding and nesting?",
    a: "To ensure undisturbed mating and egg-laying by female crocodiles in mangrove mounds, the core sanctuary remains strictly closed to all tourists annually from May 1 through July 31.",
  },
  {
    q: "Which gate offers the quickest boat access to crocodile habitats?",
    a: "Khola Jetty Terminal is the ideal boarding point. It leads straight into the Dangmal river system and core mangrove creeks where crocodile density is highest.",
  },
];

const SaltWaterCrocodile = () => {
  const [activeTab, setActiveTab] = useState("croc-safari");
  const [activeImage, setActiveImage] = useState(null);
  const [faqIndex, setFaqIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    if (tabId === "species-guide") {
      setFaqIndex(0);
    }

    if (tabId === "book-safari") {
      setFormSubmitted(false);
    }

    document.getElementById("saltwater-crocodile")?.scrollIntoView({
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
    <section className="SaltWaterCrocodile" id="saltwater-crocodile">
      <div className="SaltWaterCrocodile__layout">
        {/* MAIN CONTENT */}
        <main className="SaltWaterCrocodile__main" key={activeTab}>
          {/* 1. CROCODILE BOAT SAFARI */}
          {activeTab === "croc-safari" && (
            <div className="SaltWaterCrocodile__viewPane">
              <div className="SaltWaterCrocodile__eyebrow">
                <span className="SaltWaterCrocodile__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • ESTUARINE EXPEDITION</span>
              </div>

              <h1 className="SaltWaterCrocodile__pageTitle">
                Realm of the Giant <span>Saltwater Crocodile.</span>
              </h1>

              <p className="SaltWaterCrocodile__lead">
                Journey through the brackish tidal labyrinth of Bhitarkanika National Park
                aboard forest-authorized cruisers. Witness the world's largest living
                reptiles—the estuarine crocodile (<em>Crocodylus porosus</em>)—basking along
                exposed mudflats where the Brahmani, Baitarani, and Dhamra rivers merge with
                the sea.
              </p>

              <figure className="SaltWaterCrocodile__heroFigure">
                <img
                  className="SaltWaterCrocodile__heroImage"
                  src={crocImgOne}
                  alt="Giant saltwater crocodile basking on the mudflats of Bhitarkanika"
                />

                <figcaption className="SaltWaterCrocodile__heroCaption">
                  <span className="SaltWaterCrocodile__heroCaptionDot" />
                  <span>
                    Bhitarkanika Boat Service • Certified Helmsmen & Forest Department Naturalists
                  </span>
                </figcaption>
              </figure>

              {/* SAFARI HIGHLIGHT PILLARS */}
              <div className="SaltWaterCrocodile__featureGrid">
                <div className="SaltWaterCrocodile__specBox">
                  <span className="SaltWaterCrocodile__specNum">01</span>
                  <h3>Peak Basking Hours</h3>
                  <p>
                    Departures synchronized with daily low-tide cycles (6:30 AM – 10:30 AM
                    and 1:30 PM – 4:30 PM) for clear sightings along exposed mudbanks.
                  </p>
                </div>

                <div className="SaltWaterCrocodile__specBox">
                  <span className="SaltWaterCrocodile__specNum">02</span>
                  <h3>Giant Delta Specimens</h3>
                  <p>
                    Encounter world-record estuarine crocodiles exceeding 18 to 20 feet,
                    including albino variants at the Dangmal Research Enclosure.
                  </p>
                </div>

                <div className="SaltWaterCrocodile__specBox">
                  <span className="SaltWaterCrocodile__specNum">03</span>
                  <h3>Authorized Fleet Safety</h3>
                  <p>
                    Heavy-duty, high-freeboard vessels fitted with approved lifejackets,
                    safety railings, first-aid equipment, and low-RPM stealth propulsion.
                  </p>
                </div>
              </div>

              {/* SAFARI PACKAGES */}
              <div className="SaltWaterCrocodile__packageSection">
                <div className="SaltWaterCrocodile__subHeader">
                  <span>EXPEDITIONS BY BHITARAKANIKA BOAT SERVICE</span>
                  <h2>Popular Estuarine Crocodile Cruises</h2>
                </div>

                <div className="SaltWaterCrocodile__packageGrid">
                  {safariPackages.map((pkg) => (
                    <div
                      key={pkg.title}
                      className="SaltWaterCrocodile__packageCard"
                    >
                      <span className="SaltWaterCrocodile__packageTag">
                        {pkg.tag}
                      </span>
                      <h3>{pkg.title}</h3>
                      <p className="SaltWaterCrocodile__packageRoute">
                        <strong>Route:</strong> {pkg.route}
                      </p>
                      <div className="SaltWaterCrocodile__packageMeta">
                        <span>⏱ {pkg.duration}</span>
                        <span>👥 {pkg.capacity}</span>
                      </div>
                      <p className="SaltWaterCrocodile__packageDesc">
                        {pkg.highlights}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="SaltWaterCrocodile__actionBanner">
                <div>
                  <h3>Ready to Spot Giant Crocodiles with Bhitarakanika Boat Service?</h3>
                  <p>
                    Pre-reserve private or shared safari boats to secure preferred gate clearance
                    and certified naturalist allocation during prime basking windows.
                  </p>
                </div>

                <button
                  type="button"
                  className="SaltWaterCrocodile__btnPrimary"
                  onClick={() => handleTabChange("book-safari")}
                >
                  Reserve Safari Boat ↗
                </button>
              </div>
            </div>
          )}

          {/* 2. SPECIES & EXPEDITION GUIDE */}
          {activeTab === "species-guide" && (
            <div className="SaltWaterCrocodile__viewPane">
              <div className="SaltWaterCrocodile__eyebrow">
                <span className="SaltWaterCrocodile__eyebrowLine" />
                <span>FIELD ECOLOGY & TIDE LOGISTICS</span>
              </div>

              <h1 className="SaltWaterCrocodile__pageTitle">
                Everything Required <span>To Track Saltwater Crocodiles.</span>
              </h1>

              <p className="SaltWaterCrocodile__lead">
                Learn how tidal fluctuations, solar hours, and estuary salinity shape the
                behavior of India’s largest estuarine predators across Bhitarkanika.
              </p>

              <div className="SaltWaterCrocodile__planAccordion">
                {crocPlanningFAQs.map((item, index) => {
                  const isOpen = faqIndex === index;

                  return (
                    <div
                      key={item.q}
                      className={`SaltWaterCrocodile__planItem ${
                        isOpen ? "is-open" : ""
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        className="SaltWaterCrocodile__planTrigger"
                        onClick={() => setFaqIndex(isOpen ? -1 : index)}
                      >
                        <span>
                          {String(index + 1).padStart(2, "0")}. {item.q}
                        </span>

                        <span className="SaltWaterCrocodile__planToggle">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <p className="SaltWaterCrocodile__planAnswer">{item.a}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="SaltWaterCrocodile__routeBox">
                <h3>Prime Sighting Hotspots Across the Estuary</h3>

                <ul>
                  <li>
                    <strong>Khola to Dangmal Creek Channel:</strong> The primary river artery
                    with shallow silt mudflats, providing the highest density of basking
                    crocodiles during the midday sun.
                  </li>

                  <li>
                    <strong>Suajore & Bhitarkanika Core Creek:</strong> Narrow mangrove passages
                    offering close, calm views of territorial males and juveniles resting near root systems.
                  </li>

                  <li>
                    <strong>Dangmal Crocodile Breeding Center:</strong> Forest Department research
                    station featuring captive rearing tanks, white crocodile pools, and the skeletal
                    remains of record-sized specimens.
                  </li>
                </ul>

                <p className="SaltWaterCrocodile__routeNote">
                  <strong>Annual Breeding Closure Advisory:</strong> Bhitarkanika National Park
                  is strictly closed to visitors every year from <strong>May 1 to July 31</strong> during
                  the peak crocodile nesting season.
                </p>
              </div>

              <div className="SaltWaterCrocodile__actionBanner">
                <div>
                  <h3>Have Specific Group or Timing Inquiries?</h3>
                  <p>
                    Speak with our dock managers at Bhitarakanika Boat Service for updated daily
                    tide charts, water levels, and private naturalist hire.
                  </p>
                </div>

                <button
                  type="button"
                  className="SaltWaterCrocodile__btnPrimary"
                  onClick={() => handleTabChange("book-safari")}
                >
                  Send Safari Inquiry ↗
                </button>
              </div>
            </div>
          )}

          {/* 3. BOOK CROCODILE SAFARI */}
          {activeTab === "book-safari" && (
            <div className="SaltWaterCrocodile__viewPane">
              <div className="SaltWaterCrocodile__eyebrow">
                <span className="SaltWaterCrocodile__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • EXPEDITION DESK</span>
              </div>

              <h1 className="SaltWaterCrocodile__pageTitle">
                Reserve Your Safari <span>Into Crocodile Waters.</span>
              </h1>

              <p className="SaltWaterCrocodile__lead">
                Submit your planned travel dates and group size. Bhitarakanika Boat Service
                will verify tidal schedules, organize Forest Department clearances, and reserve
                your boat.
              </p>

              {formSubmitted ? (
                <div className="SaltWaterCrocodile__formSuccess">
                  <span className="SaltWaterCrocodile__checkIcon">✓</span>

                  <h3>Crocodile Safari Request Logged!</h3>

                  <p>
                    Your request has been received by Bhitarakanika Boat Service. Our tour desk
                    will verify tide timings for your date and confirm your boat allocation along
                    with permit guidance.
                  </p>

                  <button
                    type="button"
                    className="SaltWaterCrocodile__btnPrimary"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Submit Another Booking Request
                  </button>
                </div>
              ) : (
                <form
                  className="SaltWaterCrocodile__form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setFormSubmitted(true);
                  }}
                >
                  <div className="SaltWaterCrocodile__formHeading">
                    <span>BHITARAKANIKA BOAT SERVICE</span>
                    <h3>Crocodile Safari Booking Form</h3>
                    <p>
                      Mandatory fields required for vessel licensing and forest passenger manifests (*).
                    </p>
                  </div>

                  <div className="SaltWaterCrocodile__formGrid">
                    <div className="SaltWaterCrocodile__inputGroup">
                      <label htmlFor="SaltWaterCrocodile-name">
                        Lead Passenger Name *
                      </label>
                      <input
                        id="SaltWaterCrocodile-name"
                        name="name"
                        type="text"
                        placeholder="e.g. Debashis Mohapatra"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="SaltWaterCrocodile__inputGroup">
                      <label htmlFor="SaltWaterCrocodile-email">Email Address *</label>
                      <input
                        id="SaltWaterCrocodile-email"
                        name="email"
                        type="email"
                        placeholder="debashis@example.com"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="SaltWaterCrocodile__inputGroup">
                      <label htmlFor="SaltWaterCrocodile-phone">
                        WhatsApp / Contact Number *
                      </label>
                      <input
                        id="SaltWaterCrocodile-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 94370 XXXXX"
                        autoComplete="tel"
                        required
                      />
                    </div>

                    <div className="SaltWaterCrocodile__inputGroup">
                      <label htmlFor="SaltWaterCrocodile-date">
                        Expected Safari Date *
                      </label>
                      <input
                        id="SaltWaterCrocodile-date"
                        name="travelDate"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    <div className="SaltWaterCrocodile__inputGroup">
                      <label htmlFor="SaltWaterCrocodile-entryGate">
                        Preferred Departure Jetty
                      </label>
                      <select
                        id="SaltWaterCrocodile-entryGate"
                        name="entryGate"
                        defaultValue="Khola Gate (Direct to Core Crocodile Creeks)"
                      >
                        <option value="Khola Gate (Direct to Core Crocodile Creeks)">
                          Khola Gate (Direct to Core Crocodile Creeks)
                        </option>
                        <option value="Gupti Gate (Estuary & Coastal Mudflats)">
                          Gupti Gate (Estuary & Coastal Mudflats)
                        </option>
                        <option value="Chandbali Ghat (River Delta Approach)">
                          Chandbali Ghat (River Delta Approach)
                        </option>
                      </select>
                    </div>

                    <div className="SaltWaterCrocodile__inputGroup">
                      <label htmlFor="SaltWaterCrocodile-guests">
                        Number of Passengers
                      </label>
                      <select
                        id="SaltWaterCrocodile-guests"
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
                        <option value="15+ Persons (Corporate / Group Tour)">
                          15+ Persons (Corporate / Group Tour)
                        </option>
                      </select>
                    </div>

                    <div className="SaltWaterCrocodile__inputGroup SaltWaterCrocodile__inputGroup--full">
                      <label htmlFor="SaltWaterCrocodile-service">
                        Select Safari Experience Tier
                      </label>
                      <select
                        id="SaltWaterCrocodile-service"
                        name="service"
                        defaultValue="Morning Wildlife & Crocodile Safari (4 hrs) — Peak Basking Window"
                      >
                        <option value="Morning Wildlife & Crocodile Safari (4 hrs) — Peak Basking Window">
                          Morning Wildlife & Crocodile Safari (4 hrs) — Peak Basking Window
                        </option>
                        <option value="Afternoon Creek Safari (3 hrs)">
                          Afternoon Creek Safari (3 hrs)
                        </option>
                        <option value="Full Day Gupti & Habalikhati Coastal Cruise (6-7 hrs)">
                          Full Day Gupti & Habalikhati Coastal Cruise (6-7 hrs)
                        </option>
                        <option value="Wildlife Photography Low-Speed Private Charter">
                          Wildlife Photography Low-Speed Private Charter
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="SaltWaterCrocodile__inputGroup">
                    <label htmlFor="SaltWaterCrocodile-notes">
                      Special Requirements / Notes
                    </label>
                    <textarea
                      id="SaltWaterCrocodile-notes"
                      name="notes"
                      rows="4"
                      placeholder="Let Bhitarakanika Boat Service know if you need dedicated wildlife spotters, cottage accommodations, or custom departure timing..."
                    />
                  </div>

                  <button type="submit" className="SaltWaterCrocodile__submitBtn">
                    Submit Safari Booking Request ↗
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 4. CROCODILE GALLERY */}
          {activeTab === "croc-gallery" && (
            <div className="SaltWaterCrocodile__viewPane">
              <div className="SaltWaterCrocodile__eyebrow">
                <span className="SaltWaterCrocodile__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • FIELD GALLERY</span>
              </div>

              <h1 className="SaltWaterCrocodile__pageTitle">
                Glimpses of the <span>Estuarine Giants.</span>
              </h1>

              <p className="SaltWaterCrocodile__lead">
                Explore photographs of saltwater crocodiles captured during Bhitarakanika Boat
                Service expeditions along the mudflats, river bends, and breeding facilities.
              </p>

              <div className="SaltWaterCrocodile__galleryPageGrid">
                {galleryImages.map((img, index) => (
                  <button
                    key={`${img.title}-${index}`}
                    type="button"
                    className="SaltWaterCrocodile__galleryPageCard"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View ${img.title}`}
                  >
                    <img src={img.src} alt={img.title} loading="lazy" />

                    <span className="SaltWaterCrocodile__galleryCardOverlay">
                      <span>{img.category}</span>
                      <span className="SaltWaterCrocodile__galleryCardTitle">
                        {img.title}
                      </span>
                      <span className="SaltWaterCrocodile__galleryLocation">
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
        <aside className="SaltWaterCrocodile__sidebar">
          {/* NAVIGATION */}
          <div className="SaltWaterCrocodile__sideBox">
            <div className="SaltWaterCrocodile__sideTitle">
              <span />
              <h2>Explore Safari Desk</h2>
            </div>

            <nav
              className="SaltWaterCrocodile__serviceNav"
              aria-label="Explore saltwater crocodile services"
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
                    <span className="SaltWaterCrocodile__navArrow">↗</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* SUPPORT CARD */}
          <div className="SaltWaterCrocodile__supportCard">
            <div
              className="SaltWaterCrocodile__supportIcon"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13v-2a7 7 0 0 1 14 0v2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <rect
                  x="3.5"
                  y="11"
                  width="4"
                  height="7"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <rect
                  x="16.5"
                  y="11"
                  width="4"
                  height="7"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M18 18c0 2-2 3-5 3h-1"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="SaltWaterCrocodile__supportHeading">
              <span>BHITARAKANIKA BOAT SERVICE</span>
              <h3>Need Tide Guidance?</h3>
            </div>

            <p>
              Tidal levels dictate daily crocodile basking quality. Speak directly with our dock
              operators for today's tide charts and departure schedules.
            </p>

            <button
              type="button"
              className="SaltWaterCrocodile__supportLink"
              onClick={() => handleTabChange("book-safari")}
            >
              <span>Connect with Jetty Desk</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          {/* ESSENTIALS */}
          <div className="SaltWaterCrocodile__sideBox SaltWaterCrocodile__downloads">
            <div className="SaltWaterCrocodile__sideTitle">
              <span />
              <h2>Sanctuary Quick Links</h2>
            </div>

            <div className="SaltWaterCrocodile__downloadGrid">
              <button
                type="button"
                className={activeTab === "croc-safari" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("croc-safari")}
              >
                <span className="SaltWaterCrocodile__downloadIcon">01</span>
                <strong>Boat Fleet</strong>
                <small>View cruisers ↗</small>
              </button>

              <button
                type="button"
                className={activeTab === "species-guide" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("species-guide")}
              >
                <span className="SaltWaterCrocodile__downloadIcon">02</span>
                <strong>Tide Guide</strong>
                <small>View charts ↗</small>
              </button>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="SaltWaterCrocodile__sideBox SaltWaterCrocodile__contactBox">
            <div className="SaltWaterCrocodile__sideTitle">
              <span />
              <h2>Bhitarakanika Boat Service</h2>
            </div>

            <div className="SaltWaterCrocodile__contactInfo">
              <span
                className="SaltWaterCrocodile__contactInfoIcon"
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

            <div className="SaltWaterCrocodile__contactInfo">
              <span
                className="SaltWaterCrocodile__contactInfoIcon"
                aria-hidden="true"
              >
                ✉
              </span>
              <div>
                <strong>Official Bookings & Inquiries</strong>
                <a href="mailto:safari@bhitarakanikaboatservice.com">
                  safari@bhitarakanikaboatservice.com
                </a>
              </div>
            </div>

            <div className="SaltWaterCrocodile__contactInfo">
              <span
                className="SaltWaterCrocodile__contactInfoIcon"
                aria-hidden="true"
              >
                🕒
              </span>
              <div>
                <strong>Operational Hours</strong>
                <p>6:30 AM to 5:00 PM (Strict Sunset Entry Closure)</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      {activeImage !== null && (
        <div
          className="SaltWaterCrocodile__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Saltwater crocodile photograph viewer"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="SaltWaterCrocodile__lightboxBox"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="SaltWaterCrocodile__lightboxClose"
              aria-label="Close image viewer"
              onClick={() => setActiveImage(null)}
            >
              ✕
            </button>

            <img
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].title}
            />

            <div className="SaltWaterCrocodile__lightboxCaption">
              <div>
                <span>{galleryImages[activeImage].category}</span>
                <h3>{galleryImages[activeImage].title}</h3>
                <small>📍 {galleryImages[activeImage].location}</small>
              </div>

              <span className="SaltWaterCrocodile__lightboxCount">
                {String(activeImage + 1).padStart(2, "0")} /{" "}
                {String(galleryImages.length).padStart(2, "0")}
              </span>
            </div>

            <div className="SaltWaterCrocodile__lightboxControls">
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

export default SaltWaterCrocodile;
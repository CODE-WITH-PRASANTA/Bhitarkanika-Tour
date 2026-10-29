import React, { useEffect, useState } from "react";
import "./Deer.css";
import deerImgOne from "../../assets/deer-1.png";
import deerImgTwo from "../../assets/deer-2.png";
import deerImgThree from "../../assets/deer-3.png";
import deerImgFour from "../../assets/deer-4.png";
import deerImgFive from "../../assets/deer-5.png";
import deerImgSix from "../../assets/deer-6.png";

const galleryImages = [
  {
    src: deerImgOne,
    title: "Spotted Deer Herd Grazing in Clearing",
    location: "Dangmal Forest Meadow",
    category: "Chital Herd",
  },
  {
    src: deerImgTwo,
    title: "Axis Deer at Mangrove Creek Edge",
    location: "Suajore Tidal Bank",
    category: "Creek Wildlife",
  },
  {
    src: deerImgThree,
    title: "Antlered Stag in Dense Undergrowth",
    location: "Bhitarkanika Core Forest Trail",
    category: "Stag Sighting",
  },
  {
    src: deerImgFour,
    title: "Chital Herd Along Mudflat Glades",
    location: "Raipati Wetland Clearing",
    category: "Herbivore Meadow",
  },
  {
    src: deerImgFive,
    title: "Deer Drinking at Freshwater Pond",
    location: "Dangmal Enclosure Sanctuary",
    category: "Freshwater Pool",
  },
  {
    src: deerImgSix,
    title: "Herd Foraging Near Elevated Boardwalk",
    location: "Skywalk Forest Fringe",
    category: "Canopy Edge",
  },
];

const navTabs = [
  { id: "deer-safari", label: "Spotted Deer Safaris" },
  { id: "ecology-guide", label: "Habitat & Behavior Guide" },
  { id: "book-safari", label: "Book Deer Safari" },
  { id: "deer-gallery", label: "Spotted Deer Gallery" },
];

const safariPackages = [
  {
    tag: "MOST POPULAR",
    title: "Dangmal Meadow & Creek Deer Safari",
    route: "Khola Jetty → Dangmal Forest Glades → Watchtower Meadow → Return",
    duration: "3.5 to 4 Hours",
    highlights:
      "Large herds of Spotted Deer (Chital) grazing in natural forest glades, water monitors, and estuarine creek cruising.",
    capacity: "Authorized Motor Cruisers (Up to 8 / 14 / 20 Seats)",
  },
  {
    tag: "HERBIVORE TRAIL",
    title: "Dangmal Nature Walk & Deer Glade Trail",
    route: "Khola Ghat → Dangmal Jetty → Elevated Forest Boardwalk → Deer Enclosure",
    duration: "4 to 5 Hours",
    highlights:
      "Guided walk along the elevated wooden trail through dense mangroves into open pastures where spotted deer congregate.",
    capacity: "Eco-Boat Transfer + Certified Forest Naturalist",
  },
  {
    tag: "FULL SANCTUARY TRAIL",
    title: "Extended Delta & Core Habitat Expedition",
    route: "Gupti Gate → Coastal Creek Passages → Habalikhati Forest Meadows",
    duration: "Full Day / 6–7 Hours (Tide Synchronized)",
    highlights:
      "Tracking coastal herds of spotted deer, wild boars, Brahminy kites, and coastal mangrove ecology.",
    capacity: "High-Stability Safari Cruiser (Up to 10–12 Guests)",
  },
];

const deerFAQs = [
  {
    q: "Which deer species is native to Bhitarkanika National Park?",
    a: "The Spotted Deer (Axis axis), locally known as Chital, is the primary and most abundant herbivore species inhabiting Bhitarkanika. They roam the elevated delta islands, mangrove borders, and open grasslands around Dangmal in large herds.",
  },
  {
    q: "How do Spotted Deer survive in a tidal saltwater mangrove habitat?",
    a: "While Bhitarkanika is a tidal mangrove delta, spotted deer stay predominantly around elevated, non-submerged forest islands, freshwater bunds, and grassy glades. They browse on tender mangrove leaves, fallen fruits, and sweet grasses, relying on rainwater pools for freshwater.",
  },
  {
    q: "What role do Spotted Deer play in the Bhitarkanika ecosystem?",
    a: "Spotted deer are crucial ecosystem balancers. Their grazing prevents excessive scrub choking in forest glades, and they share a mutualistic alert relationship with rhesus macaques and birds, sounding warning barks when predators like saltwater crocodiles or leopards are near.",
  },
  {
    q: "Where is the best place to view deer in the park?",
    a: "The open forest pastures surrounding the Dangmal Forest Rest House, the elevated Skywalk nature trail, and the edges of freshwater waterholes inside the core sanctuary are the most reliable spots to see large herds at close range.",
  },
  {
    q: "What are the optimal hours for spotting deer?",
    a: "Early morning hours (6:30 AM – 9:30 AM) and late afternoons (3:00 PM – 5:00 PM) are best. During midday heat, herds retreat into the cool, shady canopy of Sundari and mangrove groves.",
  },
];

const Deer = () => {
  const [activeTab, setActiveTab] = useState("deer-safari");
  const [activeImage, setActiveImage] = useState(null);
  const [faqIndex, setFaqIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    if (tabId === "ecology-guide") {
      setFaqIndex(0);
    }

    if (tabId === "book-safari") {
      setFormSubmitted(false);
    }

    document.getElementById("spotted-deer")?.scrollIntoView({
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
    <section className="Deer" id="spotted-deer">
      <div className="Deer__layout">
        {/* MAIN CONTENT */}
        <main className="Deer__main" key={activeTab}>
          {/* 1. DEER SAFARI OVERVIEW */}
          {activeTab === "deer-safari" && (
            <div className="Deer__viewPane">
              <div className="Deer__eyebrow">
                <span className="Deer__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • WILDLIFE EXPEDITIONS</span>
              </div>

              <h1 className="Deer__pageTitle">
                Spotted Deer of Bhitarkanika <span>In Coastal Forest Glades.</span>
              </h1>

              <p className="Deer__lead">
                Traverse tidal riverways aboard authorized motor cruisers by Bhitarakanika
                Boat Service to explore the grassy savannahs and elevated forest islands of
                Dangmal. Witness hundreds of graceful Spotted Deer (Chital) browsing peacefully
                along mangrove fringes alongside wild boars, monitor lizards, and delta birdlife.
              </p>

              <figure className="Deer__heroFigure">
                <img
                  className="Deer__heroImage"
                  src={deerImgOne}
                  alt="Herd of spotted deer grazing in the open glades of Bhitarkanika National Park"
                />

                <figcaption className="Deer__heroCaption">
                  <span className="Deer__heroCaptionDot" />
                  <span>
                    Bhitarakanika Boat Service • Forest Wildlife Safaris & Eco-Guided Trails
                  </span>
                </figcaption>
              </figure>

              {/* HIGHLIGHT PILLARS */}
              <div className="Deer__featureGrid">
                <div className="Deer__specBox">
                  <span className="Deer__specNum">01</span>
                  <h3>Abundant Wild Herds</h3>
                  <p>
                    Home to thousands of Axis deer freely roaming natural open meadows,
                    feeding grounds, and forest buffer zones.
                  </p>
                </div>

                <div className="Deer__specBox">
                  <span className="Deer__specNum">02</span>
                  <h3>Dawn & Dusk Glades</h3>
                  <p>
                    Departures synchronized with prime grazing hours when stags with majestic
                    antlers lead herds into open sunlight.
                  </p>
                </div>

                <div className="Deer__specBox">
                  <span className="Deer__specNum">03</span>
                  <h3>Safe Forest Trails</h3>
                  <p>
                    Combine river cruising with elevated wooden boardwalk walks around Dangmal
                    for close wildlife observation.
                  </p>
                </div>
              </div>

              {/* SAFARI PACKAGES */}
              <div className="Deer__packageSection">
                <div className="Deer__subHeader">
                  <span>CURATED FIELD ITINERARIES</span>
                  <h2>Popular Wildlife & Deer Safari Routes</h2>
                </div>

                <div className="Deer__packageGrid">
                  {safariPackages.map((pkg) => (
                    <div key={pkg.title} className="Deer__packageCard">
                      <span className="Deer__packageTag">{pkg.tag}</span>
                      <h3>{pkg.title}</h3>
                      <p className="Deer__packageRoute">
                        <strong>Route:</strong> {pkg.route}
                      </p>
                      <div className="Deer__packageMeta">
                        <span>⏱ {pkg.duration}</span>
                        <span>👥 {pkg.capacity}</span>
                      </div>
                      <p className="Deer__packageDesc">
                        {pkg.highlights}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="Deer__actionBanner">
                <div>
                  <h3>Ready to Spot Herds of Chital with Bhitarakanika Boat Service?</h3>
                  <p>
                    Reserve private or shared safari boats with forest permits and certified
                    naturalists for seamless wildlife exploration in Bhitarkanika.
                  </p>
                </div>

                <button
                  type="button"
                  className="Deer__btnPrimary"
                  onClick={() => handleTabChange("book-safari")}
                >
                  Reserve Safari Boat ↗
                </button>
              </div>
            </div>
          )}

          {/* 2. ECOLOGY & BEHAVIOR GUIDE */}
          {activeTab === "ecology-guide" && (
            <div className="Deer__viewPane">
              <div className="Deer__eyebrow">
                <span className="Deer__eyebrowLine" />
                <span>SPECIES ECOLOGY & SANCTUARY GUIDELINES</span>
              </div>

              <h1 className="Deer__pageTitle">
                Everything Required <span>To Observe Spotted Deer.</span>
              </h1>

              <p className="Deer__lead">
                Learn about the unique adaptation of Chital to the estuarine ecosystem of
                Bhitarkanika, optimal viewing sectors, and forest sanctuary conduct.
              </p>

              <div className="Deer__planAccordion">
                {deerFAQs.map((item, index) => {
                  const isOpen = faqIndex === index;

                  return (
                    <div
                      key={item.q}
                      className={`Deer__planItem ${
                        isOpen ? "is-open" : ""
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        className="Deer__planTrigger"
                        onClick={() => setFaqIndex(isOpen ? -1 : index)}
                      >
                        <span>
                          {String(index + 1).padStart(2, "0")}. {item.q}
                        </span>

                        <span className="Deer__planToggle">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <p className="Deer__planAnswer">{item.a}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="Deer__routeBox">
                <h3>Prime Sighting Sectors & Trail Etiquette</h3>

                <ul>
                  <li>
                    <strong>Dangmal Forest Clearing:</strong> A large natural grassland opening
                    behind the forest campus where herds emerge by late afternoon to graze and
                    hydrate at freshwater ponds.
                  </li>

                  <li>
                    <strong>Skywalk Trail Perimeters:</strong> Walking along the elevated
                    canopy boardwalk offers an aerial vantage point to watch deer navigating
                    through mangrove roots and shrub clearings undisturbed.
                  </li>

                  <li>
                    <strong>Suajore Creek Banks:</strong> Deer frequently visit muddy creek edges
                    during low tide to lick mineral-rich soil and browse lower foliage.
                  </li>
                </ul>

                <p className="Deer__routeNote">
                  <strong>Wildlife Sanctuary Advisory:</strong> Feeding, whistling, approaching,
                  or disturbing deer herds is strictly prohibited under Forest Department laws.
                  Always maintain silence on walking trails and viewing platforms.
                </p>
              </div>

              <div className="Deer__actionBanner">
                <div>
                  <h3>Planning a Group or Family Wildlife Tour?</h3>
                  <p>
                    Connect with our jetty operations desk at Bhitarakanika Boat Service for
                    custom multi-hour itineraries, boat sizing, and eco-guide support.
                  </p>
                </div>

                <button
                  type="button"
                  className="Deer__btnPrimary"
                  onClick={() => handleTabChange("book-safari")}
                >
                  Send Travel Inquiry ↗
                </button>
              </div>
            </div>
          )}

          {/* 3. BOOK DEER SAFARI */}
          {activeTab === "book-safari" && (
            <div className="Deer__viewPane">
              <div className="Deer__eyebrow">
                <span className="Deer__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • EXPEDITION REGISTRATION</span>
              </div>

              <h1 className="Deer__pageTitle">
                Reserve Your Wildlife <span>Safari in Bhitarkanika.</span>
              </h1>

              <p className="Deer__lead">
                Submit your travel schedule and passenger details. Bhitarakanika Boat
                Service will verify vessel availability, handle Forest Department entry
                permits, and assign an eco-guide for your tour.
              </p>

              {formSubmitted ? (
                <div className="Deer__formSuccess">
                  <span className="Deer__checkIcon">✓</span>

                  <h3>Safari Inquiry Received!</h3>

                  <p>
                    Your request has been logged successfully with Bhitarakanika Boat Service.
                    Our desk will review vessel slots, organize required clearances, and
                    contact you with timing and pricing details.
                  </p>

                  <button
                    type="button"
                    className="Deer__btnPrimary"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Submit Another Booking Request
                  </button>
                </div>
              ) : (
                <form
                  className="Deer__form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setFormSubmitted(true);
                  }}
                >
                  <div className="Deer__formHeading">
                    <span>BHITARAKANIKA BOAT SERVICE</span>
                    <h3>Wildlife & Deer Safari Booking Form</h3>
                    <p>
                      Mandatory fields for Forest Department passenger permits (*).
                    </p>
                  </div>

                  <div className="Deer__formGrid">
                    <div className="Deer__inputGroup">
                      <label htmlFor="Deer-name">Lead Passenger Name *</label>
                      <input
                        id="Deer-name"
                        name="name"
                        type="text"
                        placeholder="e.g. Debashis Mohapatra"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="Deer__inputGroup">
                      <label htmlFor="Deer-email">Email Address *</label>
                      <input
                        id="Deer-email"
                        name="email"
                        type="email"
                        placeholder="debashis@example.com"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="Deer__inputGroup">
                      <label htmlFor="Deer-phone">WhatsApp / Mobile Number *</label>
                      <input
                        id="Deer-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 94370 XXXXX"
                        autoComplete="tel"
                        required
                      />
                    </div>

                    <div className="Deer__inputGroup">
                      <label htmlFor="Deer-date">Expected Safari Date *</label>
                      <input
                        id="Deer-date"
                        name="travelDate"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    <div className="Deer__inputGroup">
                      <label htmlFor="Deer-entryGate">Preferred Departure Jetty</label>
                      <select
                        id="Deer-entryGate"
                        name="entryGate"
                        defaultValue="Khola Gate (Direct to Dangmal Deer Glades)"
                      >
                        <option value="Khola Gate (Direct to Dangmal Deer Glades)">
                          Khola Gate (Direct to Dangmal Deer Glades)
                        </option>
                        <option value="Gupti Gate (Estuary & Coastal Islands)">
                          Gupti Gate (Estuary & Coastal Islands)
                        </option>
                        <option value="Chandbali Ghat (River Approach)">
                          Chandbali Ghat (River Approach)
                        </option>
                      </select>
                    </div>

                    <div className="Deer__inputGroup">
                      <label htmlFor="Deer-guests">Number of Passengers</label>
                      <select
                        id="Deer-guests"
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
                        <option value="15+ Persons (Corporate / School Tour)">
                          15+ Persons (Corporate / School Tour)
                        </option>
                      </select>
                    </div>

                    <div className="Deer__inputGroup Deer__inputGroup--full">
                      <label htmlFor="Deer-service">Select Safari Service Tier</label>
                      <select
                        id="Deer-service"
                        name="service"
                        defaultValue="Morning Wildlife & Deer Safari (4 hrs) — Peak Activity Window"
                      >
                        <option value="Morning Wildlife & Deer Safari (4 hrs) — Peak Activity Window">
                          Morning Wildlife & Deer Safari (4 hrs) — Peak Activity Window
                        </option>
                        <option value="Afternoon Glade Safari (3 hrs)">
                          Afternoon Glade Safari (3 hrs)
                        </option>
                        <option value="Full Day Wildlife & Canopy Skywalk Combo (6 hrs)">
                          Full Day Wildlife & Canopy Skywalk Combo (6 hrs)
                        </option>
                        <option value="Wildlife Photography Low-Speed Private Charter">
                          Wildlife Photography Low-Speed Private Charter
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="Deer__inputGroup">
                    <label htmlFor="Deer-notes">
                      Special Requirements / Pick-up Details
                    </label>
                    <textarea
                      id="Deer-notes"
                      name="notes"
                      rows="4"
                      placeholder="Let Bhitarakanika Boat Service know if you need forest cottage arrangements, dedicated nature guide, binoculars, or senior citizen assistance..."
                    />
                  </div>

                  <button type="submit" className="Deer__submitBtn">
                    Submit Safari Booking Request ↗
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 4. DEER GALLERY */}
          {activeTab === "deer-gallery" && (
            <div className="Deer__viewPane">
              <div className="Deer__eyebrow">
                <span className="Deer__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • FIELD GALLERY</span>
              </div>

              <h1 className="Deer__pageTitle">
                Glimpses of the <span>Spotted Deer Herds.</span>
              </h1>

              <p className="Deer__lead">
                Browse photographs captured during wildlife safaris across the forest
                clearings and mangrove edges of Bhitarkanika. Click any image to view
                details in full screen.
              </p>

              <div className="Deer__galleryPageGrid">
                {galleryImages.map((img, index) => (
                  <button
                    key={`${img.title}-${index}`}
                    type="button"
                    className="Deer__galleryPageCard"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View ${img.title}`}
                  >
                    <img src={img.src} alt={img.title} loading="lazy" />

                    <span className="Deer__galleryCardOverlay">
                      <span>{img.category}</span>
                      <span className="Deer__galleryCardTitle">
                        {img.title}
                      </span>
                      <span className="Deer__galleryLocation">
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
        <aside className="Deer__sidebar">
          {/* NAVIGATION */}
          <div className="Deer__sideBox">
            <div className="Deer__sideTitle">
              <span />
              <h2>Explore Safari Desk</h2>
            </div>

            <nav
              className="Deer__serviceNav"
              aria-label="Explore spotted deer services"
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
                    <span className="Deer__navArrow">↗</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* SUPPORT CARD */}
          <div className="Deer__supportCard">
            <div className="Deer__supportIcon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div className="Deer__supportHeading">
              <span>BHITARAKANIKA BOAT SERVICE</span>
              <h3>Need Safari Advice?</h3>
            </div>

            <p>
              Deer sightings peak during morning and late afternoon grazing windows.
              Speak with our dock managers for today's wildlife movements and permit assistance.
            </p>

            <button
              type="button"
              className="Deer__supportLink"
              onClick={() => handleTabChange("book-safari")}
            >
              <span>Connect with Jetty Desk</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          {/* QUICK LINKS */}
          <div className="Deer__sideBox Deer__downloads">
            <div className="Deer__sideTitle">
              <span />
              <h2>Sanctuary Quick Links</h2>
            </div>

            <div className="Deer__downloadGrid">
              <button
                type="button"
                className={activeTab === "deer-safari" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("deer-safari")}
              >
                <span className="Deer__downloadIcon">01</span>
                <strong>Deer Safaris</strong>
                <small>View routes ↗</small>
              </button>

              <button
                type="button"
                className={activeTab === "ecology-guide" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("ecology-guide")}
              >
                <span className="Deer__downloadIcon">02</span>
                <strong>Habitat Guide</strong>
                <small>View insights ↗</small>
              </button>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="Deer__sideBox Deer__contactBox">
            <div className="Deer__sideTitle">
              <span />
              <h2>Bhitarakanika Boat Service</h2>
            </div>

            <div className="Deer__contactInfo">
              <span className="Deer__contactInfoIcon" aria-hidden="true">
                📍
              </span>
              <div>
                <strong>Primary Jetty Location</strong>
                <p>
                  Khola Entry Ghat, Rajnagar Block, Kendrapara District, Odisha 754225
                </p>
              </div>
            </div>

            <div className="Deer__contactInfo">
              <span className="Deer__contactInfoIcon" aria-hidden="true">
                ✉
              </span>
              <div>
                <strong>Official Safari Inquiries</strong>
                <a href="mailto:safari@bhitarakanikaboatservice.com">
                  safari@bhitarakanikaboatservice.com
                </a>
              </div>
            </div>

            <div className="Deer__contactInfo">
              <span className="Deer__contactInfoIcon" aria-hidden="true">
                🕒
              </span>
              <div>
                <strong>Forest Gate Operating Hours</strong>
                <p>6:30 AM to 5:00 PM (Sunset Closure Strictly Enforced)</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      {activeImage !== null && (
        <div
          className="Deer__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Spotted deer photograph viewer"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="Deer__lightboxBox"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="Deer__lightboxClose"
              aria-label="Close image viewer"
              onClick={() => setActiveImage(null)}
            >
              ✕
            </button>

            <img
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].title}
            />

            <div className="Deer__lightboxCaption">
              <div>
                <span>{galleryImages[activeImage].category}</span>
                <h3>{galleryImages[activeImage].title}</h3>
                <small>📍 {galleryImages[activeImage].location}</small>
              </div>

              <span className="Deer__lightboxCount">
                {String(activeImage + 1).padStart(2, "0")} /{" "}
                {String(galleryImages.length).padStart(2, "0")}
              </span>
            </div>

            <div className="Deer__lightboxControls">
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

export default Deer;
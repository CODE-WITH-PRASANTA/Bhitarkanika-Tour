import React, { useEffect, useState } from "react";
import "./WhiteCrocodile.css";
import whiteCrocOne from "../../assets/white-crocodile-1.png";
import whiteCrocTwo from "../../assets/white-crocodile-2.png";
import whiteCrocThree from "../../assets/white-crocodile-3.png";
import whiteCrocFour from "../../assets/white-crocodile-4.png";
import whiteCrocFive from "../../assets/white-crocodile-5.png";
import whiteCrocSix from "../../assets/white-crocodile-6.png";

const galleryImages = [
  {
    src: whiteCrocOne,
    title: "Rare Leucistic White Crocodile Basking",
    location: "Dangmal Research Enclosure",
    category: "Gori & Offspring Lineage",
  },
  {
    src: whiteCrocTwo,
    title: "Albino Estuarine Hatchling Pool",
    location: "Captive Rearing Facility",
    category: "Conservation Hub",
  },
  {
    src: whiteCrocThree,
    title: "White Crocodile on Riverbed Mudflat",
    location: "Dangmal Core Tidal Bank",
    category: "Estuarine Sighting",
  },
  {
    src: whiteCrocFour,
    title: "Sub-Adult Leucistic Estuarine Crocodile",
    location: "Suajore Tidal Channel",
    category: "Wild Bloodline",
  },
  {
    src: whiteCrocFive,
    title: "Gori Memorial Research Exhibit",
    location: "Dangmal Wildlife Interpretation Centre",
    category: "Sanctuary Legend",
  },
  {
    src: whiteCrocSix,
    title: "Pale Morph Basking in Direct Sun",
    location: "Bhitarkanika Freshwater Pool",
    category: "Delta Bio-Reserve",
  },
];

const navTabs = [
  { id: "white-croc-safari", label: "White Crocodile Safaris" },
  { id: "leucism-guide", label: "Gori & Genetics Guide" },
  { id: "book-safari", label: "Book Crocodile Safari" },
  { id: "white-croc-gallery", label: "White Croc Gallery" },
];

const safariPackages = [
  {
    tag: "SIGNATURE TOUR",
    title: "Dangmal Research & White Croc Expedition",
    route: "Khola Jetty → Dangmal Island Pier → Captive Breeding Facility → Suajore Creek",
    duration: "3.5 to 4 Hours",
    highlights:
      "Exclusive guided viewing of captive and wild leucistic (white) estuarine crocodiles, offspring of the famous 'Gori', museum tour, and creek cruising.",
    capacity: "Authorized Motor Cruisers (Up to 8 / 14 / 20 Seats)",
  },
  {
    tag: "CONSERVATION FOCUS",
    title: "Captive Rearing & Hatchery Trail",
    route: "Khola Ghat → Dangmal Interpretive Centre → Incubation Pools → Core Glades",
    duration: "4 to 5 Hours",
    highlights:
      "In-depth educational walkthrough of the Forest Department's egg incubation programs, white morph conservation biology, and white croc enclosure.",
    capacity: "Eco-Boat Transfer + Certified Forest Naturalist",
  },
  {
    tag: "DELTA WILD TRACK",
    title: "Core Creek Pale-Morph Expedition",
    route: "Khola Gate → Dangmal Creek → Core Tidal Mudflats → Return",
    duration: "Full Day / 6 Hours (Tide Synchronized)",
    highlights:
      "Track free-roaming wild sub-adults and pale-morph saltwater crocodiles along exposed mudflats during low-tide basking hours.",
    capacity: "High-Stability Safari Cruiser (Up to 10–12 Guests)",
  },
];

const whiteCrocFAQs = [
  {
    q: "Why does Bhitarkanika have rare white saltwater crocodiles?",
    a: "Bhitarkanika is world-renowned for housing leucistic (hypomelanistic) saltwater crocodiles (Crocodylus porosus). Unlike pure albinos with pink eyes, these rare crocodiles possess reduced melanin producing an ivory-white or pale cream hide with normal dark eyes.",
  },
  {
    q: "Who was 'Gori' and why is she famous in Bhitarkanika?",
    a: "Gori was India's first celebrated captive-reared female white crocodile, hatched in 1975 under the Forest Department's crocodile conservation project in Dangmal. She lived to be over 40 years old, became a global conservation icon, and her lineage is preserved at the research center.",
  },
  {
    q: "Can white crocodiles be seen in the wild creeks as well as enclosures?",
    a: "Yes. While visitors can reliably observe white crocodiles inside the specialized open-air research enclosures at Dangmal, occasional wild-born sub-adult white and pale-phase crocodiles are spotted along the mudflats of Dangmal and Suajore creeks.",
  },
  {
    q: "How does Bhitarakanika Boat Service arrange this tour?",
    a: "Bhitarakanika Boat Service provides authorized safari crafts departing from Khola Jetty that cruise through core estuarine creeks directly to the Dangmal Forest pier, with dedicated time allocated for the white crocodile facility and nature trails.",
  },
  {
    q: "When is the best season to plan a white crocodile tour?",
    a: "The prime window is from October through April when clear skies encourage long basking sessions on exposed riverbanks. Note that the core park remains closed annually from May 1 to July 31 for the crocodile breeding season.",
  },
];

const WhiteCrocodile = () => {
  const [activeTab, setActiveTab] = useState("white-croc-safari");
  const [activeImage, setActiveImage] = useState(null);
  const [faqIndex, setFaqIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    if (tabId === "leucism-guide") {
      setFaqIndex(0);
    }

    if (tabId === "book-safari") {
      setFormSubmitted(false);
    }

    document.getElementById("white-crocodile")?.scrollIntoView({
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
    <section className="WhiteCrocodile" id="white-crocodile">
      <div className="WhiteCrocodile__layout">
        {/* MAIN CONTENT */}
        <main className="WhiteCrocodile__main" key={activeTab}>
          {/* 1. SAFARI OVERVIEW */}
          {activeTab === "white-croc-safari" && (
            <div className="WhiteCrocodile__viewPane">
              <div className="WhiteCrocodile__eyebrow">
                <span className="WhiteCrocodile__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • RARE ESTUARINE EXPEDITION</span>
              </div>

              <h1 className="WhiteCrocodile__pageTitle">
                Rare White Crocodiles <span>of Bhitarkanika National Park.</span>
              </h1>

              <p className="WhiteCrocodile__lead">
                Discover one of nature’s rarest wonders aboard authorized cruisers by
                Bhitarakanika Boat Service. Journey through the tidal mangrove rivers
                to Dangmal, home to the world's most famous genetic lineage of leucistic
                saltwater crocodiles—including the legacy of the legendary white crocodile
                "Gori" and her descendants.
              </p>

              <figure className="WhiteCrocodile__heroFigure">
                <img
                  className="WhiteCrocodile__heroImage"
                  src={whiteCrocOne}
                  alt="Rare leucistic white saltwater crocodile basking in Bhitarkanika"
                />

                <figcaption className="WhiteCrocodile__heroCaption">
                  <span className="WhiteCrocodile__heroCaptionDot" />
                  <span>
                    Bhitarakanika Boat Service • Certified Guides & Captive Rearing Tours
                  </span>
                </figcaption>
              </figure>

              {/* HIGHLIGHT PILLARS */}
              <div className="WhiteCrocodile__featureGrid">
                <div className="WhiteCrocodile__specBox">
                  <span className="WhiteCrocodile__specNum">01</span>
                  <h3>Leucistic Wonder</h3>
                  <p>
                    Unlike total albinos, Bhitarkanika's white crocodiles have a natural ivory-pale
                    pigmentation with dark pigmented eyes, making them an evolutionary marvel.
                  </p>
                </div>

                <div className="WhiteCrocodile__specBox">
                  <span className="WhiteCrocodile__specNum">02</span>
                  <h3>Dangmal Breeding Center</h3>
                  <p>
                    Up-close access to open breeding ponds where white crocodiles and hatchlings
                    are preserved and monitored by the Odisha Forest Department.
                  </p>
                </div>

                <div className="WhiteCrocodile__specBox">
                  <span className="WhiteCrocodile__specNum">03</span>
                  <h3>River & Enclosure Tour</h3>
                  <p>
                    Combines scenic boat safaris through crocodile-rich creeks with
                    walking tours through Dangmal's interpretive center and watchtower.
                  </p>
                </div>
              </div>

              {/* SAFARI PACKAGES */}
              <div className="WhiteCrocodile__packageSection">
                <div className="WhiteCrocodile__subHeader">
                  <span>EXPEDITIONS BY BHITARAKANIKA BOAT SERVICE</span>
                  <h2>Curated White Crocodile Safari Routes</h2>
                </div>

                <div className="WhiteCrocodile__packageGrid">
                  {safariPackages.map((pkg) => (
                    <div
                      key={pkg.title}
                      className="WhiteCrocodile__packageCard"
                    >
                      <span className="WhiteCrocodile__packageTag">
                        {pkg.tag}
                      </span>
                      <h3>{pkg.title}</h3>
                      <p className="WhiteCrocodile__packageRoute">
                        <strong>Route:</strong> {pkg.route}
                      </p>
                      <div className="WhiteCrocodile__packageMeta">
                        <span>⏱ {pkg.duration}</span>
                        <span>👥 {pkg.capacity}</span>
                      </div>
                      <p className="WhiteCrocodile__packageDesc">
                        {pkg.highlights}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="WhiteCrocodile__actionBanner">
                <div>
                  <h3>Ready to Witness the White Crocodiles with Bhitarakanika Boat Service?</h3>
                  <p>
                    Pre-reserve your safari vessel from Khola Jetty to guarantee preferred gate
                    manifest clearances, prime tide timings, and expert forest guide allocation.
                  </p>
                </div>

                <button
                  type="button"
                  className="WhiteCrocodile__btnPrimary"
                  onClick={() => handleTabChange("book-safari")}
                >
                  Reserve Safari Boat ↗
                </button>
              </div>
            </div>
          )}

          {/* 2. LEUCISM & GENETICS GUIDE */}
          {activeTab === "leucism-guide" && (
            <div className="WhiteCrocodile__viewPane">
              <div className="WhiteCrocodile__eyebrow">
                <span className="WhiteCrocodile__eyebrowLine" />
                <span>GENETICS, HISTORY & CONSERVATION</span>
              </div>

              <h1 className="WhiteCrocodile__pageTitle">
                Everything Required <span>To Understand the White Crocodile.</span>
              </h1>

              <p className="WhiteCrocodile__lead">
                Explore the conservation history of Gori, the difference between albinism
                and leucism, and guidelines for visiting the breeding pools and tidal mudflats.
              </p>

              <div className="WhiteCrocodile__planAccordion">
                {whiteCrocFAQs.map((item, index) => {
                  const isOpen = faqIndex === index;

                  return (
                    <div
                      key={item.q}
                      className={`WhiteCrocodile__planItem ${
                        isOpen ? "is-open" : ""
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        className="WhiteCrocodile__planTrigger"
                        onClick={() => setFaqIndex(isOpen ? -1 : index)}
                      >
                        <span>
                          {String(index + 1).padStart(2, "0")}. {item.q}
                        </span>

                        <span className="WhiteCrocodile__planToggle">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <p className="WhiteCrocodile__planAnswer">{item.a}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="WhiteCrocodile__routeBox">
                <h3>Sighting Points & Habitat Highlights</h3>

                <ul>
                  <li>
                    <strong>Dangmal Dedicated White Croc Enclosure:</strong> The primary location
                    housing living descendants of Gori, protected from territorial wild bulls.
                  </li>

                  <li>
                    <strong>Dangmal to Suajore Confluence:</strong> Brackish mangrove riverbanks
                    where rare wild pale-phase estuarine crocodiles occasionally haul out during mid-day low tides.
                  </li>

                  <li>
                    <strong>Interpretation Museum & Skeletal Display:</strong> Houses the
                    preserved history, skull specimens, and archival records of Bhitarkanika's world-record
                    estuarine reptiles.
                  </li>
                </ul>

                <p className="WhiteCrocodile__routeNote">
                  <strong>Breeding Season Advisory:</strong> The sanctuary remains strictly
                  closed to tourists every year between <strong>May 1 and July 31</strong> during the
                  nesting season. Advance bookings are advised for winter weekends.
                </p>
              </div>

              <div className="WhiteCrocodile__actionBanner">
                <div>
                  <h3>Planning a Research, Student or Family Tour?</h3>
                  <p>
                    Speak with our dock managers at Bhitarakanika Boat Service for custom
                    safari departures synchronized with low-tide basking periods.
                  </p>
                </div>

                <button
                  type="button"
                  className="WhiteCrocodile__btnPrimary"
                  onClick={() => handleTabChange("book-safari")}
                >
                  Send Safari Inquiry ↗
                </button>
              </div>
            </div>
          )}

          {/* 3. BOOK CROCODILE SAFARI */}
          {activeTab === "book-safari" && (
            <div className="WhiteCrocodile__viewPane">
              <div className="WhiteCrocodile__eyebrow">
                <span className="WhiteCrocodile__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • EXPEDITION REGISTRATION</span>
              </div>

              <h1 className="WhiteCrocodile__pageTitle">
                Reserve Your White <span>Crocodile Boat Safari.</span>
              </h1>

              <p className="WhiteCrocodile__lead">
                Submit your expected travel dates and party details. Bhitarakanika Boat Service
                will coordinate forest gate entry clearances, verify daily tide windows, and
                confirm your dedicated safari vessel.
              </p>

              {formSubmitted ? (
                <div className="WhiteCrocodile__formSuccess">
                  <span className="WhiteCrocodile__checkIcon">✓</span>

                  <h3>Safari Inquiry Received!</h3>

                  <p>
                    Your request has been logged successfully with Bhitarakanika Boat Service.
                    Our tour desk will review vessel slots, organize required clearances, and
                    contact you with timing and pricing details.
                  </p>

                  <button
                    type="button"
                    className="WhiteCrocodile__btnPrimary"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Submit Another Booking Request
                  </button>
                </div>
              ) : (
                <form
                  className="WhiteCrocodile__form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setFormSubmitted(true);
                  }}
                >
                  <div className="WhiteCrocodile__formHeading">
                    <span>BHITARAKANIKA BOAT SERVICE</span>
                    <h3>White Crocodile Safari Booking Form</h3>
                    <p>
                      Mandatory fields for Forest Department passenger permits (*).
                    </p>
                  </div>

                  <div className="WhiteCrocodile__formGrid">
                    <div className="WhiteCrocodile__inputGroup">
                      <label htmlFor="WhiteCrocodile-name">
                        Lead Passenger Name *
                      </label>
                      <input
                        id="WhiteCrocodile-name"
                        name="name"
                        type="text"
                        placeholder="e.g. Debashis Mohapatra"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="WhiteCrocodile__inputGroup">
                      <label htmlFor="WhiteCrocodile-email">
                        Email Address *
                      </label>
                      <input
                        id="WhiteCrocodile-email"
                        name="email"
                        type="email"
                        placeholder="debashis@example.com"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="WhiteCrocodile__inputGroup">
                      <label htmlFor="WhiteCrocodile-phone">
                        WhatsApp / Contact Number *
                      </label>
                      <input
                        id="WhiteCrocodile-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 94370 XXXXX"
                        autoComplete="tel"
                        required
                      />
                    </div>

                    <div className="WhiteCrocodile__inputGroup">
                      <label htmlFor="WhiteCrocodile-date">
                        Expected Safari Date *
                      </label>
                      <input
                        id="WhiteCrocodile-date"
                        name="travelDate"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    <div className="WhiteCrocodile__inputGroup">
                      <label htmlFor="WhiteCrocodile-entryGate">
                        Preferred Departure Jetty
                      </label>
                      <select
                        id="WhiteCrocodile-entryGate"
                        name="entryGate"
                        defaultValue="Khola Gate (Direct to Dangmal White Croc Enclosure)"
                      >
                        <option value="Khola Gate (Direct to Dangmal White Croc Enclosure)">
                          Khola Gate (Direct to Dangmal White Croc Enclosure)
                        </option>
                        <option value="Gupti Gate (Estuary & Coastal Route)">
                          Gupti Gate (Estuary & Coastal Route)
                        </option>
                        <option value="Chandbali Ghat (River Approach)">
                          Chandbali Ghat (River Approach)
                        </option>
                      </select>
                    </div>

                    <div className="WhiteCrocodile__inputGroup">
                      <label htmlFor="WhiteCrocodile-guests">
                        Number of Passengers
                      </label>
                      <select
                        id="WhiteCrocodile-guests"
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

                    <div className="WhiteCrocodile__inputGroup WhiteCrocodile__inputGroup--full">
                      <label htmlFor="WhiteCrocodile-service">
                        Select Safari Experience Tier
                      </label>
                      <select
                        id="WhiteCrocodile-service"
                        name="service"
                        defaultValue="Dangmal Research & White Croc Expedition (4 hrs)"
                      >
                        <option value="Dangmal Research & White Croc Expedition (4 hrs)">
                          Dangmal Research & White Croc Expedition (4 hrs) — Peak Basking Window
                        </option>
                        <option value="Captive Rearing & Hatchery Trail (5 hrs)">
                          Captive Rearing & Hatchery Trail (5 hrs)
                        </option>
                        <option value="Full Day Delta & White Croc Safari (6 hrs)">
                          Full Day Delta & White Croc Safari (6 hrs)
                        </option>
                        <option value="Wildlife Photography Low-Speed Private Charter">
                          Wildlife Photography Low-Speed Private Charter
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="WhiteCrocodile__inputGroup">
                    <label htmlFor="WhiteCrocodile-notes">
                      Special Requirements / Pick-up Details
                    </label>
                    <textarea
                      id="WhiteCrocodile-notes"
                      name="notes"
                      rows="4"
                      placeholder="Let Bhitarakanika Boat Service know if you need forest resthouse assistance, binoculars, a dedicated reptile naturalist, or senior citizen assistance..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="WhiteCrocodile__submitBtn"
                  >
                    Submit Safari Booking Request ↗
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 4. GALLERY */}
          {activeTab === "white-croc-gallery" && (
            <div className="WhiteCrocodile__viewPane">
              <div className="WhiteCrocodile__eyebrow">
                <span className="WhiteCrocodile__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • FIELD GALLERY</span>
              </div>

              <h1 className="WhiteCrocodile__pageTitle">
                Portraits of the <span>Leucistic Giants.</span>
              </h1>

              <p className="WhiteCrocodile__lead">
                Browse photographs of white crocodiles captured during expeditions
                to the captive research center and wild mangrove creeks of Bhitarkanika.
                Click any photograph to view full-screen details.
              </p>

              <div className="WhiteCrocodile__galleryPageGrid">
                {galleryImages.map((img, index) => (
                  <button
                    key={`${img.title}-${index}`}
                    type="button"
                    className="WhiteCrocodile__galleryPageCard"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View ${img.title}`}
                  >
                    <img src={img.src} alt={img.title} loading="lazy" />

                    <span className="WhiteCrocodile__galleryCardOverlay">
                      <span>{img.category}</span>
                      <span className="WhiteCrocodile__galleryCardTitle">
                        {img.title}
                      </span>
                      <span className="WhiteCrocodile__galleryLocation">
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
        <aside className="WhiteCrocodile__sidebar">
          {/* NAVIGATION */}
          <div className="WhiteCrocodile__sideBox">
            <div className="WhiteCrocodile__sideTitle">
              <span />
              <h2>Explore Safari Desk</h2>
            </div>

            <nav
              className="WhiteCrocodile__serviceNav"
              aria-label="Explore white crocodile services"
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
                    <span className="WhiteCrocodile__navArrow">↗</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* SUPPORT CARD */}
          <div className="WhiteCrocodile__supportCard">
            <div
              className="WhiteCrocodile__supportIcon"
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

            <div className="WhiteCrocodile__supportHeading">
              <span>BHITARAKANIKA BOAT SERVICE</span>
              <h3>Need Safari Advice?</h3>
            </div>

            <p>
              Tidal levels and sunny hours directly control crocodile basking visibility.
              Speak with our dock managers for today's tide tables and enclosure visiting hours.
            </p>

            <button
              type="button"
              className="WhiteCrocodile__supportLink"
              onClick={() => handleTabChange("book-safari")}
            >
              <span>Connect with Jetty Desk</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          {/* QUICK LINKS */}
          <div className="WhiteCrocodile__sideBox WhiteCrocodile__downloads">
            <div className="WhiteCrocodile__sideTitle">
              <span />
              <h2>Sanctuary Quick Links</h2>
            </div>

            <div className="WhiteCrocodile__downloadGrid">
              <button
                type="button"
                className={
                  activeTab === "white-croc-safari" ? "is-active-btn" : ""
                }
                onClick={() => handleTabChange("white-croc-safari")}
              >
                <span className="WhiteCrocodile__downloadIcon">01</span>
                <strong>Crocodile Safaris</strong>
                <small>View boat tours ↗</small>
              </button>

              <button
                type="button"
                className={activeTab === "leucism-guide" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("leucism-guide")}
              >
                <span className="WhiteCrocodile__downloadIcon">02</span>
                <strong>Gori & Genetics</strong>
                <small>Read field guide ↗</small>
              </button>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="WhiteCrocodile__sideBox WhiteCrocodile__contactBox">
            <div className="WhiteCrocodile__sideTitle">
              <span />
              <h2>Bhitarakanika Boat Service</h2>
            </div>

            <div className="WhiteCrocodile__contactInfo">
              <span
                className="WhiteCrocodile__contactInfoIcon"
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

            <div className="WhiteCrocodile__contactInfo">
              <span
                className="WhiteCrocodile__contactInfoIcon"
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

            <div className="WhiteCrocodile__contactInfo">
              <span
                className="WhiteCrocodile__contactInfoIcon"
                aria-hidden="true"
              >
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
          className="WhiteCrocodile__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="White crocodile photograph viewer"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="WhiteCrocodile__lightboxBox"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="WhiteCrocodile__lightboxClose"
              aria-label="Close image viewer"
              onClick={() => setActiveImage(null)}
            >
              ✕
            </button>

            <img
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].title}
            />

            <div className="WhiteCrocodile__lightboxCaption">
              <div>
                <span>{galleryImages[activeImage].category}</span>
                <h3>{galleryImages[activeImage].title}</h3>
                <small>📍 {galleryImages[activeImage].location}</small>
              </div>

              <span className="WhiteCrocodile__lightboxCount">
                {String(activeImage + 1).padStart(2, "0")} /{" "}
                {String(galleryImages.length).padStart(2, "0")}
              </span>
            </div>

            <div className="WhiteCrocodile__lightboxControls">
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

export default WhiteCrocodile;
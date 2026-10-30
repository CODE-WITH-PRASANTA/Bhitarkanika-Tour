import React, { useEffect, useState } from "react";
import "./NarrowCreek.css";
import narrowCreekOne from "../../assets/narrowcreek-1.png";
import narrowCreekTwo from "../../assets/narrowcreek-2.png";
import narrowCreekThree from "../../assets/narrowcreek-3.png";
import narrowCreekFour from "../../assets/narrowcreek-4.png";
import narrowCreekFive from "../../assets/narrowcreek-5.png";
import narrowCreekSix from "../../assets/narrowcreek-6.png";

const galleryImages = [
  {
    src: narrowCreekOne,
    title: "Tidal Creek Stilt Root Channel",
    location: "Suajore Narrow Creek Passage",
    category: "Creek Safari",
  },
  {
    src: narrowCreekTwo,
    title: "Dense Canopy Waterway Navigation",
    location: "Dangmal Interior Water Corridor",
    category: "Mangrove Labyrinth",
  },
  {
    src: narrowCreekThree,
    title: "Mudflat Kingfisher Perch",
    location: "Khola Minor Branch Creek",
    category: "Avian Spotting",
  },
  {
    src: narrowCreekFour,
    title: "Low-Wake Creek Cruise",
    location: "Bhitarkanika Backwater Shallows",
    category: "Eco Cruising",
  },
  {
    src: narrowCreekFive,
    title: "Basking Estuarine Giant at Water Edge",
    location: "Suajore Muddy Cut",
    category: "Reptile Sighting",
  },
  {
    src: narrowCreekSix,
    title: "Golden Hour High-Tide Creek Run",
    location: "Delta Core Mangrove Narrows",
    category: "Sunset Passage",
  },
];

const navTabs = [
  { id: "creek-safari", label: "Narrow Creek Safaris" },
  { id: "tide-navigation", label: "Tide & Creek Navigation" },
  { id: "book-safari", label: "Book Creek Safari" },
  { id: "creek-gallery", label: "Creek Safari Gallery" },
];

const creekPackages = [
  {
    tag: "SIGNATURE EXPEDITION",
    title: "Suajore Tidal Creek Safari",
    route: "Khola Jetty → Suajore Creek Narrows → Dangmal Forest Bend → Return",
    duration: "3.5 to 4 Hours (Tide Synchronized)",
    highlights:
      "Navigate narrow waterways arched by Rhizophora canopies, spot camouflaged saltwater crocodiles at eye level, kingfishers, and mudskippers.",
    capacity: "Forest-Authorized Low-Wake Crafts (Up to 6 / 10 / 14 Seats)",
  },
  {
    tag: "PHOTOGRAPHY FOCUS",
    title: "Early Dawn Silent Creek Cruise",
    route: "Khola Ghat → Interior Mangrove Feeder Creeks → Shallow Mudflat Spits",
    duration: "Early Morning / 4 Hours (6:30 AM – 10:30 AM)",
    highlights:
      "Silent, low-RPM maneuvering through mirror-calm backwaters for unobstructed photography of 8 kingfisher species, raptors, and morning basking giants.",
    capacity: "Private Custom Boat with Master Helmsman & Naturalist",
  },
  {
    tag: "DEEP DELTA EXPLORATION",
    title: "Backwater Estuary & Island Channels",
    route: "Gupti Gate → Brahmani Delta Feeder Channels → Habalikhati Creek Approach",
    duration: "Full Day / 6–7 Hours (High Tide Dependent)",
    highlights:
      "Extensive journey into secluded saltwater channels, coastal delta shallows, and pristine mangrove habitats inaccessible to large ferries.",
    capacity: "Authorized Marine Cruisers (Up to 10–12 Guests)",
  },
];

const creekFAQs = [
  {
    q: "Why are narrow creek safaris unique in Bhitarkanika?",
    a: "Unlike wide main rivers, narrow tidal creeks wind intimately beneath interlocking mangrove canopies. These protected waterways offer close encounters with wildlife, sheltered waters, and quiet conditions that allow boats to glide near basking crocodiles and feeding waders without causing disruption.",
  },
  {
    q: "How do tidal water levels dictate narrow creek boat navigation?",
    a: "Tides are the heartbeat of Bhitarkanika's creek network. During rising and high tides, water fills narrow feeder channels, allowing small safari boats to cruise beneath dense canopies. Low and receding tides expose muddy riverbanks where estuarine crocodiles and mudskippers bask under direct sunlight.",
  },
  {
    q: "Are the safari boats safe inside shallow and tight creek bends?",
    a: "All vessels operated by Bhitarakanika Boat Service feature rigid, high-walled safety gunwales, certified low-noise propulsion engines, licensed helmsmen skilled in tidal navigation, forest eco-guides, and mandatory life jackets for all passengers.",
  },
  {
    q: "Which jetty provides the best access for narrow creek expeditions?",
    a: "Khola Jetty Terminal is the ideal departure ghat for narrow creek exploration, placing visitors directly into the Suajore and Dangmal creek waterways where mangrove density and wildlife activity are concentrated.",
  },
  {
    q: "What is the best season for exploring the interior creeks?",
    a: "The ideal months are October through March when temperatures are mild, morning mists clear into bright sunshine, and migratory birds join resident species. The core sanctuary remains closed annually from May 1 to July 31 for the crocodile breeding cycle.",
  },
];

const NarrowCreek = () => {
  const [activeTab, setActiveTab] = useState("creek-safari");
  const [activeImage, setActiveImage] = useState(null);
  const [faqIndex, setFaqIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedPassengers, setSelectedPassengers] = useState(2);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    if (tabId === "tide-navigation") {
      setFaqIndex(0);
    }

    if (tabId === "book-safari") {
      setFormSubmitted(false);
    }

    document.getElementById("narrow-creek-services")?.scrollIntoView({
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
    <section className="NarrowCreek" id="narrow-creek-services">
      <div className="NarrowCreek__layout">
        {/* MAIN CONTENT */}
        <main className="NarrowCreek__main" key={activeTab}>
          {/* 1. NARROW CREEK SAFARI */}
          {activeTab === "creek-safari" && (
            <div className="NarrowCreek__viewPane">
              <div className="NarrowCreek__eyebrow">
                <span className="NarrowCreek__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • TIDAL CREEK EXPEDITIONS</span>
              </div>

              <h1 className="NarrowCreek__pageTitle">
                Narrow Creek Safaris <span>Through Living Mangrove Canopies.</span>
              </h1>

              <p className="NarrowCreek__lead">
                Venture deep into the quiet interior arteries of Bhitarkanika National
                Park with Bhitarakanika Boat Service. Cruise past exposed silt banks,
                glide beneath natural arches of stilt roots, and observe estuarine
                crocodiles, kingfishers, and monitor lizards along winding backwater channels.
              </p>

              <figure className="NarrowCreek__heroFigure">
                <img
                  className="NarrowCreek__heroImage"
                  src={narrowCreekOne}
                  alt="Authorized safari boat navigating through the narrow mangrove creeks of Bhitarkanika"
                />

                <figcaption className="NarrowCreek__heroCaption">
                  <span className="NarrowCreek__heroCaptionDot" />
                  <span>
                    Bhitarakanika Boat Service • Certified Low-Wake Safari Fleet & Naturalist Guides
                  </span>
                </figcaption>
              </figure>

              {/* HIGHLIGHT PILLARS */}
              <div className="NarrowCreek__featureGrid">
                <div className="NarrowCreek__specBox">
                  <span className="NarrowCreek__specNum">01</span>
                  <h3>Tide-Synchronized Cruising</h3>
                  <p>
                    Departures calculated with daily high and mid-tides to ensure safe depth
                    and optimal access through secluded mangrove creek branches.
                  </p>
                </div>

                <div className="NarrowCreek__specBox">
                  <span className="NarrowCreek__specNum">02</span>
                  <h3>Close-Range Encounters</h3>
                  <p>
                    Tight channel bends place you within safe viewing distance of basking
                    saltwater crocodiles, foraging mudskippers, and nesting waterfowl.
                  </p>
                </div>

                <div className="NarrowCreek__specBox">
                  <span className="NarrowCreek__specNum">03</span>
                  <h3>Low-Wake Propulsion</h3>
                  <p>
                    Specially fitted quiet motors reduce water wake and engine sound,
                    protecting fragile stilt root banks while ensuring calm wildlife watching.
                  </p>
                </div>
              </div>

              {/* PACKAGES */}
              <div className="NarrowCreek__packageSection">
                <div className="NarrowCreek__subHeader">
                  <span>CURATED WATERWAY EXPEDITIONS</span>
                  <h2>Signature Narrow Creek Itineraries</h2>
                </div>

                <div className="NarrowCreek__packageGrid">
                  {creekPackages.map((pkg) => (
                    <div key={pkg.title} className="NarrowCreek__packageCard">
                      <span className="NarrowCreek__packageTag">{pkg.tag}</span>
                      <h3>{pkg.title}</h3>
                      <p className="NarrowCreek__packageRoute">
                        <strong>Route:</strong> {pkg.route}
                      </p>
                      <div className="NarrowCreek__packageMeta">
                        <span>⏱ {pkg.duration}</span>
                        <span>👥 {pkg.capacity}</span>
                      </div>
                      <p className="NarrowCreek__packageDesc">
                        {pkg.highlights}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="NarrowCreek__actionBanner">
                <div>
                  <h3>Ready to Explore the Mangrove Narrows with Bhitarakanika Boat Service?</h3>
                  <p>
                    Pre-reserve private or shared low-wake boats to align with daily tidal
                    depths and secure certified Forest Department eco-guides.
                  </p>
                </div>

                <button
                  type="button"
                  className="NarrowCreek__btnPrimary"
                  onClick={() => handleTabChange("book-safari")}
                >
                  Reserve Creek Boat ↗
                </button>
              </div>
            </div>
          )}

          {/* 2. TIDE & CREEK NAVIGATION GUIDE */}
          {activeTab === "tide-navigation" && (
            <div className="NarrowCreek__viewPane">
              <div className="NarrowCreek__eyebrow">
                <span className="NarrowCreek__eyebrowLine" />
                <span>FIELD HYDROLOGY & PASSAGE LOGISTICS</span>
              </div>

              <h1 className="NarrowCreek__pageTitle">
                Everything Required <span>To Navigate the Narrow Creeks.</span>
              </h1>

              <p className="NarrowCreek__lead">
                Learn how semidiurnal lunar tides shape boat accessibility, wildlife
                spotting windows, and safety rules across the backwater channels of Bhitarkanika.
              </p>

              <div className="NarrowCreek__planAccordion">
                {creekFAQs.map((item, index) => {
                  const isOpen = faqIndex === index;

                  return (
                    <div
                      key={item.q}
                      className={`NarrowCreek__planItem ${
                        isOpen ? "is-open" : ""
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        className="NarrowCreek__planTrigger"
                        onClick={() => setFaqIndex(isOpen ? -1 : index)}
                      >
                        <span>
                          {String(index + 1).padStart(2, "0")}. {item.q}
                        </span>

                        <span className="NarrowCreek__planToggle">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <p className="NarrowCreek__planAnswer">{item.a}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="NarrowCreek__routeBox">
                <h3>Key Narrow Creek Corridors & Navigation Rules</h3>

                <ul>
                  <li>
                    <strong>Suajore Creek Channel:</strong> The primary narrow waterway
                    meandering from Khola toward Dangmal, known for towering Rhizophora stands
                    and prime crocodile basking mud shelves.
                  </li>

                  <li>
                    <strong>Dangmal Inner Feeder Creeks:</strong> Shallow freshwater-influenced
                    branches offering habitat for 8 species of kingfishers and water monitor lizards.
                  </li>

                  <li>
                    <strong>Safety & Environmental Directives:</strong> Keep arms and hands
                    inside the boat gunwales at all times. Touching trailing mangrove branches,
                    shouting, and plastic disposal are strictly prohibited by the Forest Department.
                  </li>
                </ul>

                <p className="NarrowCreek__routeNote">
                  <strong>Annual Breeding Closure:</strong> The interior creek network and main
                  sanctuary routes are strictly closed every year from <strong>May 1 to July 31</strong> during
                  the saltwater crocodile nesting cycle.
                </p>
              </div>

              <div className="NarrowCreek__actionBanner">
                <div>
                  <h3>Need Real-Time Tide Information for Your Travel Date?</h3>
                  <p>
                    Speak directly with dock operators at Bhitarakanika Boat Service for
                    updated high-tide departure charts and custom photography charters.
                  </p>
                </div>

                <button
                  type="button"
                  className="NarrowCreek__btnPrimary"
                  onClick={() => handleTabChange("book-safari")}
                >
                  Check Tide Schedules ↗
                </button>
              </div>
            </div>
          )}

          {/* 3. BOOK CREEK SAFARI */}
          {activeTab === "book-safari" && (
            <div className="NarrowCreek__viewPane">
              <div className="NarrowCreek__eyebrow">
                <span className="NarrowCreek__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • EXPEDITION REGISTRATION</span>
              </div>

              <h1 className="NarrowCreek__pageTitle">
                Reserve Your Narrow <span>Creek Boat Safari.</span>
              </h1>

              <p className="NarrowCreek__lead">
                Submit your expected safari dates and group details. Bhitarakanika Boat
                Service will verify water depth, manage Forest Department permit manifests,
                and allocate an experienced helmsman for your voyage.
              </p>

              {formSubmitted ? (
                <div className="NarrowCreek__formSuccess">
                  <span className="NarrowCreek__checkIcon">✓</span>

                  <h3>Creek Safari Request Received!</h3>

                  <p>
                    Your booking inquiry has been recorded by Bhitarakanika Boat Service.
                    Our desk will review tidal predictions for your date and contact you
                    with departure slots and permit instructions.
                  </p>

                  <button
                    type="button"
                    className="NarrowCreek__btnPrimary"
                    onClick={() => {
                      setFormSubmitted(false);
                      setSelectedPassengers(2);
                    }}
                  >
                    Submit Another Booking Request
                  </button>
                </div>
              ) : (
                <form
                  className="NarrowCreek__form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setFormSubmitted(true);
                  }}
                >
                  <div className="NarrowCreek__formHeading">
                    <span>BHITARAKANIKA BOAT SERVICE</span>
                    <h3>Narrow Creek Safari Booking Form</h3>
                    <p>
                      Mandatory passenger credentials required for Forest Department entry permits (*).
                    </p>
                  </div>

                  <div className="NarrowCreek__formGrid">
                    <div className="NarrowCreek__inputGroup">
                      <label htmlFor="NarrowCreek-name">Lead Passenger Name *</label>
                      <input
                        id="NarrowCreek-name"
                        name="name"
                        type="text"
                        placeholder="Enter full name"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="NarrowCreek__inputGroup">
                      <label htmlFor="NarrowCreek-email">Email Address *</label>
                      <input
                        id="NarrowCreek-email"
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="NarrowCreek__inputGroup">
                      <label htmlFor="NarrowCreek-phone">WhatsApp / Mobile Number *</label>
                      <input
                        id="NarrowCreek-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                        pattern="[+0-9()\\s-]{8,18}"
                        required
                      />
                    </div>

                    <div className="NarrowCreek__inputGroup">
                      <label htmlFor="NarrowCreek-aadhaar">Aadhaar Card Number</label>
                      <input
                        id="NarrowCreek-aadhaar"
                        name="aadhaar"
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter 12-digit Aadhaar number"
                        maxLength={12}
                        pattern="[0-9]{12}"
                      />
                    </div>

                    <div className="NarrowCreek__inputGroup">
                      <label htmlFor="NarrowCreek-date">Expected Safari Date *</label>
                      <input
                        id="NarrowCreek-date"
                        name="travelDate"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    <div className="NarrowCreek__inputGroup">
                      <label htmlFor="NarrowCreek-time">Booking Time *</label>
                      <select
                        id="NarrowCreek-time"
                        name="bookingTime"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>Select booking time</option>
                        <option value="6:30 AM - 8:30 AM">6:30 AM - 8:30 AM</option>
                        <option value="8:30 AM - 10:30 AM">8:30 AM - 10:30 AM</option>
                        <option value="10:30 AM - 12:30 PM">10:30 AM - 12:30 PM</option>
                        <option value="12:30 PM - 2:30 PM">12:30 PM - 2:30 PM</option>
                        <option value="2:30 PM - 4:30 PM">2:30 PM - 4:30 PM</option>
                      </select>
                    </div>

                    <div className="NarrowCreek__inputGroup NarrowCreek__inputGroup--full">
                      <label htmlFor="NarrowCreek-entryGate">Preferred Departure Jetty *</label>
                      <select
                        id="NarrowCreek-entryGate"
                        name="entryGate"
                        defaultValue="Khola Gate (Direct to Suajore Narrow Creeks)"
                        required
                      >
                        <option value="Khola Gate (Direct to Suajore Narrow Creeks)">
                          Khola Gate (Direct to Suajore Narrow Creeks)
                        </option>
                        <option value="Gupti Gate (Estuary & Coastal Channels)">
                          Gupti Gate (Estuary & Coastal Channels)
                        </option>
                        <option value="Chandbali Ghat (River Delta Approach)">
                          Chandbali Ghat (River Delta Approach)
                        </option>
                      </select>
                    </div>

                    <div className="NarrowCreek__inputGroup NarrowCreek__inputGroup--full">
                      <label>Number of Passengers *</label>
                      <div
                        className="NarrowCreek__passengerGrid"
                        role="group"
                        aria-label="Select number of passengers"
                      >
                        {Array.from({ length: 18 }, (_, index) => index + 1).map((count) => (
                          <button
                            key={count}
                            type="button"
                            className={selectedPassengers === count ? "is-selected" : ""}
                            aria-pressed={selectedPassengers === count}
                            onClick={() => setSelectedPassengers(count)}
                          >
                            {count}
                          </button>
                        ))}
                      </div>
                      <input type="hidden" name="guests" value={selectedPassengers} />
                      <div className="NarrowCreek__passengerInfo">
                        <span>
                          Selected passengers: <strong>{selectedPassengers}</strong>
                        </span>
                        <span>Maximum 18 passengers</span>
                      </div>
                    </div>

                    <div className="NarrowCreek__inputGroup NarrowCreek__inputGroup--full">
                      <label htmlFor="NarrowCreek-service">Select Safari Experience *</label>
                      <select
                        id="NarrowCreek-service"
                        name="service"
                        defaultValue="Suajore Tidal Creek Safari (3.5 - 4 hrs) — Tide Synchronized"
                        required
                      >
                        <option value="Suajore Tidal Creek Safari (3.5 - 4 hrs) — Tide Synchronized">
                          Suajore Tidal Creek Safari (3.5 - 4 hrs) — Tide Synchronized
                        </option>
                        <option value="Early Dawn Silent Creek Photography Cruise (4 hrs)">
                          Early Dawn Silent Creek Photography Cruise (4 hrs)
                        </option>
                        <option value="Full Day Backwater Estuary & Island Channels (6-7 hrs)">
                          Full Day Backwater Estuary & Island Channels (6-7 hrs)
                        </option>
                        <option value="Private Low-Wake Birding & Macro Charter">
                          Private Low-Wake Birding & Macro Charter
                        </option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="NarrowCreek__submitBtn">
                    Submit Creek Safari Booking Request ↗
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 4. GALLERY */}
          {activeTab === "creek-gallery" && (
            <div className="NarrowCreek__viewPane">
              <div className="NarrowCreek__eyebrow">
                <span className="NarrowCreek__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • FIELD GALLERY</span>
              </div>

              <h1 className="NarrowCreek__pageTitle">
                Glimpses from the <span>Mangrove Waterways.</span>
              </h1>

              <p className="NarrowCreek__lead">
                Explore photographs captured along the winding creeks and backwater
                channels of Bhitarkanika. Click any photograph to view it enlarged with details.
              </p>

              <div className="NarrowCreek__galleryPageGrid">
                {galleryImages.map((img, index) => (
                  <button
                    key={`${img.title}-${index}`}
                    type="button"
                    className="NarrowCreek__galleryPageCard"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View ${img.title}`}
                  >
                    <img src={img.src} alt={img.title} loading="lazy" />

                    <span className="NarrowCreek__galleryCardOverlay">
                      <span>{img.category}</span>
                      <span className="NarrowCreek__galleryCardTitle">
                        {img.title}
                      </span>
                      <span className="NarrowCreek__galleryLocation">
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
        <aside className="NarrowCreek__sidebar">
          {/* NAVIGATION */}
          <div className="NarrowCreek__sideBox">
            <div className="NarrowCreek__sideTitle">
              <span />
              <h2>Explore Safari Desk</h2>
            </div>

            <nav
              className="NarrowCreek__serviceNav"
              aria-label="Explore narrow creek safari navigation"
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
                    <span className="NarrowCreek__navArrow">↗</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* SUPPORT CARD */}
          <div className="NarrowCreek__supportCard">
            <div className="NarrowCreek__supportIcon" aria-hidden="true">
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

            <div className="NarrowCreek__supportHeading">
              <span>BHITARAKANIKA BOAT SERVICE</span>
              <h3>Need Tide Guidance?</h3>
            </div>

            <p>
              Tidal levels dictate narrow creek water depth and crocodile basking quality.
              Speak with our dock managers for today's tide timetable and permit assistance.
            </p>

            <button
              type="button"
              className="NarrowCreek__supportLink"
              onClick={() => handleTabChange("book-safari")}
            >
              <span>Connect with Jetty Desk</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          {/* QUICK LINKS */}
          <div className="NarrowCreek__sideBox NarrowCreek__downloads">
            <div className="NarrowCreek__sideTitle">
              <span />
              <h2>Sanctuary Quick Links</h2>
            </div>

            <div className="NarrowCreek__downloadGrid">
              <button
                type="button"
                className={activeTab === "creek-safari" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("creek-safari")}
              >
                <span className="NarrowCreek__downloadIcon">01</span>
                <strong>Creek Fleet</strong>
                <small>View craft options ↗</small>
              </button>

              <button
                type="button"
                className={activeTab === "tide-navigation" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("tide-navigation")}
              >
                <span className="NarrowCreek__downloadIcon">02</span>
                <strong>Tide Guide</strong>
                <small>View navigation rules ↗</small>
              </button>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="NarrowCreek__sideBox NarrowCreek__contactBox">
            <div className="NarrowCreek__sideTitle">
              <span />
              <h2>Bhitarakanika Boat Service</h2>
            </div>

            <div className="NarrowCreek__contactInfo">
              <span className="NarrowCreek__contactInfoIcon" aria-hidden="true">
                📍
              </span>
              <div>
                <strong>Primary Jetty Location</strong>
                <p>
                  Khola Entry Ghat, Rajnagar Block, Kendrapara District, Odisha 754225
                </p>
              </div>
            </div>

            <div className="NarrowCreek__contactInfo">
              <span className="NarrowCreek__contactInfoIcon" aria-hidden="true">
                ✉
              </span>
              <div>
                <strong>Official Inquiries</strong>
                <a href="mailto:safari@bhitarakanikaboatservice.com">
                  safari@bhitarakanikaboatservice.com
                </a>
              </div>
            </div>

            <div className="NarrowCreek__contactInfo">
              <span className="NarrowCreek__contactInfoIcon" aria-hidden="true">
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
          className="NarrowCreek__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Narrow creek photograph viewer"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="NarrowCreek__lightboxBox"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="NarrowCreek__lightboxClose"
              aria-label="Close image viewer"
              onClick={() => setActiveImage(null)}
            >
              ✕
            </button>

            <img
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].title}
            />

            <div className="NarrowCreek__lightboxCaption">
              <div>
                <span>{galleryImages[activeImage].category}</span>
                <h3>{galleryImages[activeImage].title}</h3>
                <small>📍 {galleryImages[activeImage].location}</small>
              </div>

              <span className="NarrowCreek__lightboxCount">
                {String(activeImage + 1).padStart(2, "0")} /{" "}
                {String(galleryImages.length).padStart(2, "0")}
              </span>
            </div>

            <div className="NarrowCreek__lightboxControls">
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

export default NarrowCreek;

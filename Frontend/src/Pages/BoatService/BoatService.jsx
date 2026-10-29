import React, { useEffect, useState } from "react";
import "./BoatService.css";
import boatServiceImg from "../../assets/boatservice-1.png";
import boatServiceTwo from "../../assets/boatservice-2.png";
import boatServiceThree from "../../assets/boatservice-3.png";
import boatServiceFour from "../../assets/boatservice-4.png";
import boatServiceFive from "../../assets/boatservice-5.png";
import boatServiceSix from "../../assets/boatservice-6.png";

const galleryImages = [
  {
    src: boatServiceImg,
    title: "Authorized Safari Boat",
    location: "Khola Jetty Terminal",
    category: "River Fleet",
  },
  {
    src: boatServiceTwo,
    title: "Estuarine Crocodile Creek Route",
    location: "Dangmal Mudflat Banks",
    category: "Mangrove Safari",
  },
  {
    src: boatServiceThree,
    title: "Suajore Tidal Channel",
    location: "Suajore Creek Passage",
    category: "Creek Cruise",
  },
  {
    src: boatServiceFour,
    title: "Sanctuary Island Transfer",
    location: "Dangmal Forest Ghat",
    category: "Island Ferry",
  },
  {
    src: boatServiceFive,
    title: "Delta Confluence Expedition",
    location: "Brahmani & Baitarani Rivers",
    category: "River Expedition",
  },
  {
    src: boatServiceSix,
    title: "Ancient Mangrove Waterway",
    location: "Bhitarkanika Core Forest",
    category: "Eco Boating",
  },
];

const navTabs = [
  { id: "boat-safari", label: "Boat Safari Services" },
  { id: "trip-planning", label: "Safari & Permit Guide" },
  { id: "enquire-trip", label: "Book Safari Boat" },
  { id: "wildlife-gallery", label: "Sanctuary Gallery" },
];

const safariPackages = [
  {
    tag: "MOST POPULAR",
    title: "Standard Creek Safari",
    route: "Khola Gate → Dangmal Island → Crocodile Breeding Centre → Return",
    duration: "3.5 to 4 Hours",
    highlights:
      "Saltwater crocodile sightings, mangrove birding, Dangmal museum walk, tidal creeks.",
    capacity: "Up to 8 / 14 / 20 Seater Boats Available",
  },
  {
    tag: "COASTAL EXPEDITION",
    title: "Gupti Estuary & Island Cruise",
    route: "Gupti Gate → Habalikhati Beach → Hukitola Lighthouse Creek",
    duration: "Full Day / 6–7 Hours (High Tide Dependent)",
    highlights:
      "Olive ridley coastal creeks, historic British storehouse at Hukitola, dolphin sightings.",
    capacity: "Authorized Marine Cruisers (Up to 10–12 Pax)",
  },
  {
    tag: "PHOTOGRAPHY FOCUS",
    title: "Private Birding & Macro Safari",
    route: "Customised low-wake river cruise covering Suajore & interior creeks",
    duration: "Early Morning (6:30 AM – 10:30 AM)",
    highlights:
      "8 Kingfisher species, White-bellied Sea Eagle, mudskippers, and basking giants.",
    capacity: "Private Custom Boat with Eco Guide",
  },
];

const planningFAQs = [
  {
    q: "Which departure jetty is recommended (Khola or Gupti)?",
    a: "Khola Jetty is the primary entry point for wildlife enthusiasts heading straight to the core Dangmal area, crocodile breeding centre, and watchtower. Gupti Jetty is situated further south and is preferred for extensive coastal creek journeys heading towards Habalikhati and Ekakula.",
  },
  {
    q: "How are Bhitarkanika Forest entry permits and boat licenses managed?",
    a: "Entry permits must be issued through the Forest Department checkpoints at Khola or Gupti. Valid government identity proofs (Aadhaar, Passport, or Voter ID) are strictly mandatory for all travellers prior to vessel clearance.",
  },
  {
    q: "How do tidal timings influence the boat safari schedule?",
    a: "Bhitarkanika is a tidal mangrove delta. Basking estuarine crocodiles and mud-dwelling species are best observed during low to mid tides when mudflats are exposed under sunlight. Departures are timed in sync with local daily tide charts.",
  },
  {
    q: "What safety equipment is provided on board?",
    a: "All forest-authorized boats are equipped with standard life jackets for every passenger, ring buoys, first-aid kits, licensed helmsmen, and accompanied Forest Department certified eco-guides.",
  },
  {
    q: "What is the optimal season for boat safaris?",
    a: "The ideal months are October through March when the climate is cool, migratory birds flock to the heronries, and giant saltwater crocodiles bask along the sunlit banks. The core park remains closed annually between May 1 and July 31 for crocodile nesting.",
  },
];

const BoatService = () => {
  const [activeTab, setActiveTab] = useState("boat-safari");
  const [activeImage, setActiveImage] = useState(null);
  const [faqIndex, setFaqIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    if (tabId === "trip-planning") {
      setFaqIndex(0);
    }

    if (tabId === "enquire-trip") {
      setFormSubmitted(false);
    }

    document.getElementById("boat-services")?.scrollIntoView({
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
    <section className="BoatService" id="boat-services">
      <div className="BoatService__layout">
        {/* MAIN CONTENT */}
        <main className="BoatService__main" key={activeTab}>
          {/* 1. BOAT SAFARI */}
          {activeTab === "boat-safari" && (
            <div className="BoatService__viewPane">
              <div className="BoatService__eyebrow">
                <span className="BoatService__eyebrowLine" />
                <span>BHITARKANIKA NATIONAL PARK • ODISHA</span>
              </div>

              <h1 className="BoatService__pageTitle">
                Authorized Boat Safaris{" "}
                <span>Through Tidal Mangrove Creeks.</span>
              </h1>

              <p className="BoatService__lead">
                Traverse India’s second largest mangrove delta aboard authorized motor
                vessels. Cruise past pristine mudflats, witness giant saltwater
                crocodiles bask under the morning sun, and explore the dense labyrinth
                of the Brahmani, Baitarani, and Dhamra river channels.
              </p>

              <figure className="BoatService__heroFigure">
                <img
                  className="BoatService__heroImage"
                  src={boatServiceImg}
                  alt="Authorized safari boat cruising through Bhitarkanika mangrove waters"
                />

                <figcaption className="BoatService__heroCaption">
                  <span className="BoatService__heroCaptionDot" />
                  <span>
                    Forest-Licensed Eco Safari Boats • Certified Local Boatmen &
                    Guides
                  </span>
                </figcaption>
              </figure>

              {/* SAFARI HIGHLIGHT PILLARS */}
              <div className="BoatService__featureGrid">
                <div className="BoatService__specBox">
                  <span className="BoatService__specNum">01</span>
                  <h3>Scheduled Gate Departures</h3>
                  <p>
                    Daily morning (6:30 AM – 10:30 AM) and afternoon (1:30 PM –
                    5:00 PM) safari departures from Khola and Gupti entry gates
                    mapped with tidal cycles.
                  </p>
                </div>

                <div className="BoatService__specBox">
                  <span className="BoatService__specNum">02</span>
                  <h3>Certified Eco Guides</h3>
                  <p>
                    Every boat safari includes a Forest Department trained guide
                    who tracks saltwater crocodiles, water monitor lizards,
                    kingfishers, and migratory waterfowl.
                  </p>
                </div>

                <div className="BoatService__specBox">
                  <span className="BoatService__specNum">03</span>
                  <h3>Certified Safety Fleet</h3>
                  <p>
                    Rigid multi-passenger motorboats fitted with lifejackets for
                    each guest, high-walled safety railings, first-aid kits, and
                    low-noise propulsion engines.
                  </p>
                </div>
              </div>

              {/* SAFARI ROUTE PACKAGES */}
              <div className="BoatService__packageSection">
                <div className="BoatService__subHeader">
                  <span>CURATED WATER EXPEDITIONS</span>
                  <h2>Popular Bhitarkanika River Itineraries</h2>
                </div>

                <div className="BoatService__packageGrid">
                  {safariPackages.map((pkg) => (
                    <div key={pkg.title} className="BoatService__packageCard">
                      <span className="BoatService__packageTag">{pkg.tag}</span>
                      <h3>{pkg.title}</h3>
                      <p className="BoatService__packageRoute">
                        <strong>Route:</strong> {pkg.route}
                      </p>
                      <div className="BoatService__packageMeta">
                        <span>⏱ {pkg.duration}</span>
                        <span>👥 {pkg.capacity}</span>
                      </div>
                      <p className="BoatService__packageDesc">
                        {pkg.highlights}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="BoatService__actionBanner">
                <div>
                  <h3>Ready for a River Expedition in Bhitarkanika?</h3>
                  <p>
                    Pre-reserve private or shared boats to secure preferred gate
                    clearance and eco-guide allocation during peak tourist seasons.
                  </p>
                </div>

                <button
                  type="button"
                  className="BoatService__btnPrimary"
                  onClick={() => handleTabChange("enquire-trip")}
                >
                  Reserve Safari Boat ↗
                </button>
              </div>
            </div>
          )}

          {/* 2. TRIP PLANNING */}
          {activeTab === "trip-planning" && (
            <div className="BoatService__viewPane">
              <div className="BoatService__eyebrow">
                <span className="BoatService__eyebrowLine" />
                <span>EXPEDITION PLANNING & FOREST LOGISTICS</span>
              </div>

              <h1 className="BoatService__pageTitle">
                Everything Required{" "}
                <span>To Plan Your Boat Safari.</span>
              </h1>

              <p className="BoatService__lead">
                Ensure a hassle-free trip to Bhitarkanika Wildlife Sanctuary with
                updated rules on entry checkpoints, boat permissions, tidal
                timelines, and transit logistics.
              </p>

              <div className="BoatService__planAccordion">
                {planningFAQs.map((item, index) => {
                  const isOpen = faqIndex === index;

                  return (
                    <div
                      key={item.q}
                      className={`BoatService__planItem ${
                        isOpen ? "is-open" : ""
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        className="BoatService__planTrigger"
                        onClick={() => setFaqIndex(isOpen ? -1 : index)}
                      >
                        <span>
                          {String(index + 1).padStart(2, "0")}. {item.q}
                        </span>

                        <span className="BoatService__planToggle">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <p className="BoatService__planAnswer">{item.a}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="BoatService__routeBox">
                <h3>Transit Directions to Departure Jetties</h3>

                <ul>
                  <li>
                    <strong>From Bhubaneswar / Cuttack (135–150 km):</strong>{" "}
                    Drive via NH16 through Chandikhole, Kendrapara, Pattamundai,
                    and Rajnagar to reach Khola or Gupti gate in approximately
                    3.5 to 4 hours.
                  </li>

                  <li>
                    <strong>From Bhadrak Railway Station (70 km):</strong> The
                    nearest major train hub. Taxis and private cruisers connect
                    Bhadrak to Chandbali / Khola entry ghats within 2 hours.
                  </li>

                  <li>
                    <strong>Nearest Airport:</strong> Biju Patnaik International
                    Airport (BBI), Bhubaneswar, connects daily flights from all
                    prime Indian metros.
                  </li>
                </ul>

                <p className="BoatService__routeNote">
                  <strong>Important Sanctuary Advisory:</strong> The park remains
                  strictly closed during the crocodile breeding season from May
                  1 to July 31 annually. Advance permit reservations are
                  recommended for winter weekends.
                </p>
              </div>

              <div className="BoatService__actionBanner">
                <div>
                  <h3>Have Specific Group or Timing Inquiries?</h3>
                  <p>
                    Talk directly to local boat managers for customized
                    multi-hour river itineraries and student nature camps.
                  </p>
                </div>

                <button
                  type="button"
                  className="BoatService__btnPrimary"
                  onClick={() => handleTabChange("enquire-trip")}
                >
                  Send Travel Inquiry ↗
                </button>
              </div>
            </div>
          )}

          {/* 3. ENQUIRE ABOUT A TRIP */}
          {activeTab === "enquire-trip" && (
            <div className="BoatService__viewPane">
              <div className="BoatService__eyebrow">
                <span className="BoatService__eyebrowLine" />
                <span>BOOKINGS & EXPEDITION REGISTRATION</span>
              </div>

              <h1 className="BoatService__pageTitle">
                Reserve Your Boat Safari <span>In Bhitarkanika.</span>
              </h1>

              <p className="BoatService__lead">
                Submit your expected travel dates and party details. Our boat desk
                will verify tidal conditions, check forest boat permits, and
                confirm vessel availability.
              </p>

              {formSubmitted ? (
                <div className="BoatService__formSuccess">
                  <span className="BoatService__checkIcon">✓</span>

                  <h3>Safari Inquiry Received!</h3>

                  <p>
                    Your request has been logged successfully. Our tour desk will
                    review water tidal timings for your selected date and contact
                    you with boat options and permit assistance.
                  </p>

                  <button
                    type="button"
                    className="BoatService__btnPrimary"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Submit Another Booking Request
                  </button>
                </div>
              ) : (
                <form
                  className="BoatService__form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setFormSubmitted(true);
                  }}
                >
                  <div className="BoatService__formHeading">
                    <span>BHITARKANIKA TOUR DESK</span>
                    <h3>Safari Boat Booking Form</h3>
                    <p>
                      Mandatory fields for Forest Department passenger permits (*).
                    </p>
                  </div>

                  <div className="BoatService__formGrid">
                    <div className="BoatService__inputGroup">
                      <label htmlFor="BoatService-name">
                        Lead Passenger Name *
                      </label>
                      <input
                        id="BoatService-name"
                        name="name"
                        type="text"
                        placeholder="e.g. Debashis Mohapatra"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="BoatService__inputGroup">
                      <label htmlFor="BoatService-email">Email Address *</label>
                      <input
                        id="BoatService-email"
                        name="email"
                        type="email"
                        placeholder="debashis@example.com"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="BoatService__inputGroup">
                      <label htmlFor="BoatService-phone">
                        WhatsApp / Mobile Number *
                      </label>
                      <input
                        id="BoatService-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 94370 XXXXX"
                        autoComplete="tel"
                        required
                      />
                    </div>

                    <div className="BoatService__inputGroup">
                      <label htmlFor="BoatService-date">
                        Expected Safari Date *
                      </label>
                      <input
                        id="BoatService-date"
                        name="travelDate"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    <div className="BoatService__inputGroup">
                      <label htmlFor="BoatService-entryGate">
                        Preferred Entry Jetty
                      </label>
                      <select
                        id="BoatService-entryGate"
                        name="entryGate"
                        defaultValue="Khola Gate (Direct to Dangmal)"
                      >
                        <option value="Khola Gate (Direct to Dangmal)">
                          Khola Gate (Direct to Dangmal)
                        </option>
                        <option value="Gupti Gate (Estuary & Islands)">
                          Gupti Gate (Estuary & Islands)
                        </option>
                        <option value="Chandbali Ghat">
                          Chandbali Ghat (River Transit)
                        </option>
                      </select>
                    </div>

                    <div className="BoatService__inputGroup">
                      <label htmlFor="BoatService-guests">
                        Number of Passengers
                      </label>
                      <select
                        id="BoatService-guests"
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

                    <div className="BoatService__inputGroup BoatService__inputGroup--full">
                      <label htmlFor="BoatService-service">
                        Select Safari Service Tier
                      </label>
                      <select
                        id="BoatService-service"
                        name="service"
                        defaultValue="Morning Wildlife & Crocodile Safari (4 hrs)"
                      >
                        <option value="Morning Wildlife & Crocodile Safari (4 hrs)">
                          Morning Wildlife & Crocodile Safari (4 hrs) — Peak
                          Basking Window
                        </option>
                        <option value="Afternoon Sunset Safari (3 hrs)">
                          Afternoon Sunset Creek Safari (3 hrs)
                        </option>
                        <option value="Full Day Gupti & Habalikhati Coastal Cruise">
                          Full Day Gupti & Habalikhati Coastal Cruise (6-7 hrs)
                        </option>
                        <option value="Bird Photography Low-Speed Private Charter">
                          Bird Photography Low-Speed Private Charter (Custom
                          Timing)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="BoatService__inputGroup">
                    <label htmlFor="BoatService-notes">
                      Special Requirements / Pick-up Details
                    </label>
                    <textarea
                      id="BoatService-notes"
                      name="notes"
                      rows="4"
                      placeholder="Let us know if you need forest cottage arrangements, binoculars, dedicated nature guide, or dietary accommodations..."
                    />
                  </div>

                  <button type="submit" className="BoatService__submitBtn">
                    Submit Safari Booking Request ↗
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 4. WILDLIFE GALLERY */}
          {activeTab === "wildlife-gallery" && (
            <div className="BoatService__viewPane">
              <div className="BoatService__eyebrow">
                <span className="BoatService__eyebrowLine" />
                <span>BHITARKANIKA BIODIVERSITY & FLEET GALLERY</span>
              </div>

              <h1 className="BoatService__pageTitle">
                Glimpses from the <span>Mangrove Safari Fleet.</span>
              </h1>

              <p className="BoatService__lead">
                Browse our fleet and safari routes across Bhitarkanika. Click any
                photograph to view it enlarged with details.
              </p>

              <div className="BoatService__galleryPageGrid">
                {galleryImages.map((img, index) => (
                  <button
                    key={`${img.title}-${index}`}
                    type="button"
                    className="BoatService__galleryPageCard"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View ${img.title}`}
                  >
                    <img src={img.src} alt={img.title} loading="lazy" />

                    <span className="BoatService__galleryCardOverlay">
                      <span>{img.category}</span>
                      <span className="BoatService__galleryCardTitle">
                        {img.title}
                      </span>
                      <span className="BoatService__galleryLocation">
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
        <aside className="BoatService__sidebar">
          {/* NAVIGATION */}
          <div className="BoatService__sideBox">
            <div className="BoatService__sideTitle">
              <span />
              <h2>Explore Services</h2>
            </div>

            <nav
              className="BoatService__serviceNav"
              aria-label="Explore services"
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
                    <span className="BoatService__navArrow">↗</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* SUPPORT CARD */}
          <div className="BoatService__supportCard">
            <div className="BoatService__supportIcon" aria-hidden="true">
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

            <div className="BoatService__supportHeading">
              <span>LOCAL TOUR ASSISTANCE</span>
              <h3>Need Safari Advice?</h3>
            </div>

            <p>
              Tidal levels dictate daily crocodile viewing quality. Speak with our
              local dock operators for today’s tide timetable and permit paperwork.
            </p>

            <button
              type="button"
              className="BoatService__supportLink"
              onClick={() => handleTabChange("enquire-trip")}
            >
              <span>Connect with Jetty Desk</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          {/* TRAVEL ESSENTIALS */}
          <div className="BoatService__sideBox BoatService__downloads">
            <div className="BoatService__sideTitle">
              <span />
              <h2>Sanctuary Quick Links</h2>
            </div>

            <div className="BoatService__downloadGrid">
              <button
                type="button"
                className={activeTab === "boat-safari" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("boat-safari")}
              >
                <span className="BoatService__downloadIcon">01</span>
                <strong>Boat Options</strong>
                <small>View boat fleet ↗</small>
              </button>

              <button
                type="button"
                className={activeTab === "trip-planning" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("trip-planning")}
              >
                <span className="BoatService__downloadIcon">02</span>
                <strong>Permits & Tides</strong>
                <small>View guidelines ↗</small>
              </button>
            </div>
          </div>

          {/* CONTACT INFORMATION */}
          <div className="BoatService__sideBox BoatService__contactBox">
            <div className="BoatService__sideTitle">
              <span />
              <h2>Jetty Information</h2>
            </div>

            <div className="BoatService__contactInfo">
              <span
                className="BoatService__contactInfoIcon"
                aria-hidden="true"
              >
                📍
              </span>
              <div>
                <strong>Primary Jetty Location</strong>
                <p>
                  Khola Entry Ghat, Rajnagar Block, Kendrapara District, Odisha
                  754225
                </p>
              </div>
            </div>

            <div className="BoatService__contactInfo">
              <span
                className="BoatService__contactInfoIcon"
                aria-hidden="true"
              >
                ✉
              </span>
              <div>
                <strong>Official Inquiries</strong>
                <a href="mailto:safari@bhitarkanikaboats.com">
                  safari@bhitarkanikaboats.com
                </a>
              </div>
            </div>

            <div className="BoatService__contactInfo">
              <span
                className="BoatService__contactInfoIcon"
                aria-hidden="true"
              >
                🕒
              </span>
              <div>
                <strong>Forest Gate Operational Hours</strong>
                <p>6:30 AM to 5:00 PM (Sunset Closure Strict Enforcement)</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FULLSCREEN GALLERY LIGHTBOX */}
      {activeImage !== null && (
        <div
          className="BoatService__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Bhitarkanika photograph viewer"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="BoatService__lightboxBox"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="BoatService__lightboxClose"
              aria-label="Close image viewer"
              onClick={() => setActiveImage(null)}
            >
              ✕
            </button>

            <img
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].title}
            />

            <div className="BoatService__lightboxCaption">
              <div>
                <span>{galleryImages[activeImage].category}</span>
                <h3>{galleryImages[activeImage].title}</h3>
                <small>📍 {galleryImages[activeImage].location}</small>
              </div>

              <span className="BoatService__lightboxCount">
                {String(activeImage + 1).padStart(2, "0")} /{" "}
                {String(galleryImages.length).padStart(2, "0")}
              </span>
            </div>

            <div className="BoatService__lightboxControls">
              <button
                type="button"
                onClick={() =>
                  setActiveImage(
                    (activeImage - 1 + galleryImages.length) %
                      galleryImages.length
                  )
                }
                aria-label="Previous image"
              >
                ← Previous
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveImage((activeImage + 1) % galleryImages.length)
                }
                aria-label="Next image"
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

export default BoatService;
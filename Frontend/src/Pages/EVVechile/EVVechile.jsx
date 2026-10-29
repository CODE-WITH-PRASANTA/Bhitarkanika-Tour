import React, { useEffect, useState } from "react";
import "./EVVechile.css";
import evVechileOne from "../../assets/ev-vechile-1.png";
import evVechileTwo from "../../assets/ev-vechile-2.png";
import evVechileThree from "../../assets/ev-vechile-3.png";
import evVechileFour from "../../assets/ev-vechile-4.png";
import evVechileFive from "../../assets/ev-vechile-5.png";
import evVechileSix from "../../assets/ev-vechile-6.png";

const galleryImages = [
  {
    src: evVechileOne,
    title: "Zero-Emission Sanctuary Safari Cart",
    location: "Dangmal Eco-Corridor Trail",
    category: "Green Mobility",
  },
  {
    src: evVechileTwo,
    title: "Eco Cart Cruising Forest Canopy Path",
    location: "Dangmal Island Perimeter",
    category: "Silent Transit",
  },
  {
    src: evVechileThree,
    title: "EV Shuttle at Khola Jetty Terminal",
    location: "Khola Entry Ghat Hub",
    category: "Jetty Transfer",
  },
  {
    src: evVechileFour,
    title: "Solar Charging & Maintenance Station",
    location: "Forest Green Energy Depot",
    category: "Eco Infrastructure",
  },
  {
    src: evVechileFive,
    title: "Senior Citizen & Family Eco Transit",
    location: "Boardwalk & Museum Loop",
    category: "Accessible Travel",
  },
  {
    src: evVechileSix,
    title: "Quiet Nature Sightings in Forest Glades",
    location: "Dangmal Deer Meadow Road",
    category: "Low-Impact Safari",
  },
];

const navTabs = [
  { id: "ev-rides", label: "EV Safari Rides & Shuttles" },
  { id: "route-guide", label: "Routes & Green Guidelines" },
  { id: "book-ev", label: "Reserve EV Vehicle" },
  { id: "ev-gallery", label: "Green Fleet Gallery" },
];

const evPackages = [
  {
    tag: "MOST POPULAR",
    title: "Dangmal Island Complete EV Circuit",
    route: "Dangmal Forest Ghat → Skywalk Boardwalk → Crocodile Enclosure → Interpretation Center",
    duration: "1.5 to 2 Hours",
    highlights:
      "Silent, zero-noise electric cart tour across Dangmal’s core attractions, deer glades, and heritage structures with zero carbon emissions.",
    capacity: "Eco Golf Carts (4 / 6 / 8 Seater Configurations)",
  },
  {
    tag: "JETTY CONNECTIVITY",
    title: "Khola Gate to Jetty EV Shuttle Transfer",
    route: "Khola Forest Checkpoint Parking → Khola River Boarding Ghat",
    duration: "Continuous On-Demand Shuttle (15 Minutes)",
    highlights:
      "Comfortable luggage and passenger transit from the forest entry parking area directly to Bhitarakanika Boat Service boarding piers.",
    capacity: "Shuttle Van & Cart Options (Up to 12 Passengers)",
  },
  {
    tag: "ACCESSIBLE NATURE",
    title: "Senior Citizen & Assisted Green Tour",
    route: "Customised Dangmal Trail covering watchtowers and nursery glades",
    duration: "2 Hours (Relaxed Pace)",
    highlights:
      "Wheelchair-friendly boarding, step-free access, and a certified eco-naturalist onboard for effortless wildlife observation.",
    capacity: "Private Custom Cart with Dedicated Driver & Guide",
  },
];

const evFAQs = [
  {
    q: "Why are electric vehicles used inside Bhitarkanika National Park?",
    a: "To protect the sensitive mangrove biosphere, traditional combustion engines are restricted inside core pedestrian zones. Electric vehicles (EVs) operate with zero tailpipe emissions and near-silent motors, preventing air pollution and avoiding disturbance to nesting birds and wildlife.",
  },
  {
    q: "How does Bhitarakanika Boat Service integrate EV services with boat safaris?",
    a: "Bhitarakanika Boat Service coordinates seamless multimodal transfers. Our electric carts pick you up at the entry parking gates, transport you to the boat ghats, and are available on arrival at Dangmal Island for core trail exploration.",
  },
  {
    q: "Are EV carts suitable for senior citizens and differently-abled visitors?",
    a: "Yes. Our electric safari carts have low ground clearance, wide steps, handrails, and ample space for mobility aids, ensuring that elderly travelers and families can comfortably tour Dangmal without long walks on uneven paths.",
  },
  {
    q: "Is advance booking required for EV carts on Dangmal Island?",
    a: "Because the number of authorized electric vehicles permitted inside the sanctuary is strictly regulated by the Forest Department, pre-reserving your cart alongside your boat safari tickets is strongly recommended, especially on weekends.",
  },
  {
    q: "What wildlife can be observed during the EV safari circuit?",
    a: "Because the vehicles produce virtually no motor noise, spotted deer (chital), wild boars, rhesus macaques, water monitor lizards, and diverse birds frequently remain calm along the trail edges as the cart passes.",
  },
];

const EVVechile = () => {
  const [activeTab, setActiveTab] = useState("ev-rides");
  const [activeImage, setActiveImage] = useState(null);
  const [faqIndex, setFaqIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    if (tabId === "route-guide") {
      setFaqIndex(0);
    }

    if (tabId === "book-ev") {
      setFormSubmitted(false);
    }

    document.getElementById("ev-vechile-services")?.scrollIntoView({
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
    <section className="EVVechile" id="ev-vechile-services">
      <div className="EVVechile__layout">
        {/* MAIN CONTENT */}
        <main className="EVVechile__main" key={activeTab}>
          {/* 1. EV RIDES & OVERVIEW */}
          {activeTab === "ev-rides" && (
            <div className="EVVechile__viewPane">
              <div className="EVVechile__eyebrow">
                <span className="EVVechile__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • ECO MOBILITY FLEET</span>
              </div>

              <h1 className="EVVechile__pageTitle">
                Electric Vehicles <span>& Eco-Friendly Green Safaris.</span>
              </h1>

              <p className="EVVechile__lead">
                Experience sustainable, whisper-quiet travel through Bhitarkanika National
                Park with Bhitarakanika Boat Service. Our fleet of 100% electric, zero-emission
                safari carts and jetty shuttles provide clean, noise-free mobility
                from entry terminals to core mangrove nature trails, protecting fragile wildlife habitats.
              </p>

              <figure className="EVVechile__heroFigure">
                <img
                  className="EVVechile__heroImage"
                  src={evVechileOne}
                  alt="Silent electric safari vehicle driving through the green corridors of Bhitarkanika"
                />

                <figcaption className="EVVechile__heroCaption">
                  <span className="EVVechile__heroCaptionDot" />
                  <span>
                    Bhitarakanika Boat Service • 100% Electric, Zero-Noise Eco Transport
                  </span>
                </figcaption>
              </figure>

              {/* HIGHLIGHT PILLARS */}
              <div className="EVVechile__featureGrid">
                <div className="EVVechile__specBox">
                  <span className="EVVechile__specNum">01</span>
                  <h3>Silent Green Motion</h3>
                  <p>
                    Zero acoustic pollution allows vehicles to glide close to spotted deer,
                    monitor lizards, and birds without triggering panic or flight.
                  </p>
                </div>

                <div className="EVVechile__specBox">
                  <span className="EVVechile__specNum">02</span>
                  <h3>Clean Air Biosphere</h3>
                  <p>
                    Completely battery-powered mobility helping safeguard sensitive mangrove
                    air quality and pristine wetland ecosystems.
                  </p>
                </div>

                <div className="EVVechile__specBox">
                  <span className="EVVechile__specNum">03</span>
                  <h3>Accessible & Family Friendly</h3>
                  <p>
                    Designed with low step-in heights and open-air visibility, making island
                    exploration effortless for seniors, children, and photography enthusiasts.
                  </p>
                </div>
              </div>

              {/* PACKAGES */}
              <div className="EVVechile__packageSection">
                <div className="EVVechile__subHeader">
                  <span>CLEAN MOBILITY CIRCUITS</span>
                  <h2>Featured Electric Vehicle Services</h2>
                </div>

                <div className="EVVechile__packageGrid">
                  {evPackages.map((pkg) => (
                    <div key={pkg.title} className="EVVechile__packageCard">
                      <span className="EVVechile__packageTag">{pkg.tag}</span>
                      <h3>{pkg.title}</h3>
                      <p className="EVVechile__packageRoute">
                        <strong>Route:</strong> {pkg.route}
                      </p>
                      <div className="EVVechile__packageMeta">
                        <span>⏱ {pkg.duration}</span>
                        <span>👥 {pkg.capacity}</span>
                      </div>
                      <p className="EVVechile__packageDesc">
                        {pkg.highlights}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="EVVechile__actionBanner">
                <div>
                  <h3>Need Silent EV Transport for Your Bhitarkanika Tour?</h3>
                  <p>
                    Pre-reserve your electric cart alongside your safari boat with Bhitarakanika
                    Boat Service for synchronized jetty transfers and Dangmal Island circuits.
                  </p>
                </div>

                <button
                  type="button"
                  className="EVVechile__btnPrimary"
                  onClick={() => handleTabChange("book-ev")}
                >
                  Reserve EV Vehicle ↗
                </button>
              </div>
            </div>
          )}

          {/* 2. ROUTES & GUIDELINES GUIDE */}
          {activeTab === "route-guide" && (
            <div className="EVVechile__viewPane">
              <div className="EVVechile__eyebrow">
                <span className="EVVechile__eyebrowLine" />
                <span>GREEN TRANSIT POLICIES & CONNECTIVITY</span>
              </div>

              <h1 className="EVVechile__pageTitle">
                Everything Required <span>To Ride the Eco Fleet.</span>
              </h1>

              <p className="EVVechile__lead">
                Learn how electric vehicles operate across Bhitarkanika, where charging
                depots and boarding hubs are located, and how to combine rides with boat safaris.
              </p>

              <div className="EVVechile__planAccordion">
                {evFAQs.map((item, index) => {
                  const isOpen = faqIndex === index;

                  return (
                    <div
                      key={item.q}
                      className={`EVVechile__planItem ${
                        isOpen ? "is-open" : ""
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        className="EVVechile__planTrigger"
                        onClick={() => setFaqIndex(isOpen ? -1 : index)}
                      >
                        <span>
                          {String(index + 1).padStart(2, "0")}. {item.q}
                        </span>

                        <span className="EVVechile__planToggle">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <p className="EVVechile__planAnswer">{item.a}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="EVVechile__routeBox">
                <h3>EV Operating Hubs & Sanctuary Directives</h3>

                <ul>
                  <li>
                    <strong>Khola Gate Shuttle Point:</strong> Operating continuously from
                    the main vehicle parking zone to the Khola boat boarding ghat, facilitating
                    smooth transfers for families and heavy camera luggage.
                  </li>

                  <li>
                    <strong>Dangmal Island Circuit:</strong> Electric carts station right at the
                    Dangmal Forest Pier, connecting passengers directly to the elevated Skywalk,
                    crocodile enclosures, and the Nature Interpretation Center.
                  </li>

                  <li>
                    <strong>Strict Speed Limits:</strong> All electric safari vehicles are
                    speed-governed to a maximum of 15 km/h to guarantee complete pedestrian and
                    wildlife safety on unpaved forest paths.
                  </li>
                </ul>

                <p className="EVVechile__routeNote">
                  <strong>Breeding Season Notice:</strong> Forest areas follow general sanctuary
                  closures annually from <strong>May 1 to July 31</strong> during the saltwater
                  crocodile breeding season. EV operations continue normally from October through April.
                </p>
              </div>

              <div className="EVVechile__actionBanner">
                <div>
                  <h3>Arranging Transport for Senior Citizens or Large Groups?</h3>
                  <p>
                    Speak directly with Bhitarakanika Boat Service dispatchers to block dedicated
                    multi-seater electric carts and assisted boarding support.
                  </p>
                </div>

                <button
                  type="button"
                  className="EVVechile__btnPrimary"
                  onClick={() => handleTabChange("book-ev")}
                >
                  Send EV Inquiry ↗
                </button>
              </div>
            </div>
          )}

          {/* 3. BOOK EV VEHICLE */}
          {activeTab === "book-ev" && (
            <div className="EVVechile__viewPane">
              <div className="EVVechile__eyebrow">
                <span className="EVVechile__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • ECO MOBILITY DESK</span>
              </div>

              <h1 className="EVVechile__pageTitle">
                Reserve Your Electric <span>Safari Vehicle.</span>
              </h1>

              <p className="EVVechile__lead">
                Submit your expected visit date and party details. Bhitarakanika Boat Service
                will coordinate vehicle availability with your boat safari arrival and ensure
                dedicated driver and naturalist allocation.
              </p>

              {formSubmitted ? (
                <div className="EVVechile__formSuccess">
                  <span className="EVVechile__checkIcon">✓</span>

                  <h3>EV Booking Request Received!</h3>

                  <p>
                    Your electric vehicle booking request has been registered with Bhitarakanika
                    Boat Service. Our dispatch team will verify cart slots for your date and
                    contact you with timing and pickup confirmations.
                  </p>

                  <button
                    type="button"
                    className="EVVechile__btnPrimary"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Submit Another Booking Request
                  </button>
                </div>
              ) : (
                <form
                  className="EVVechile__form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setFormSubmitted(true);
                  }}
                >
                  <div className="EVVechile__formHeading">
                    <span>BHITARAKANIKA BOAT SERVICE</span>
                    <h3>Electric Vehicle Booking Form</h3>
                    <p>
                      Please provide your travel details for vehicle scheduling (*).
                    </p>
                  </div>

                  <div className="EVVechile__formGrid">
                    <div className="EVVechile__inputGroup">
                      <label htmlFor="EVVechile-name">Lead Passenger Name *</label>
                      <input
                        id="EVVechile-name"
                        name="name"
                        type="text"
                        placeholder="e.g. Debashis Mohapatra"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="EVVechile__inputGroup">
                      <label htmlFor="EVVechile-email">Email Address *</label>
                      <input
                        id="EVVechile-email"
                        name="email"
                        type="email"
                        placeholder="debashis@example.com"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="EVVechile__inputGroup">
                      <label htmlFor="EVVechile-phone">WhatsApp / Contact Number *</label>
                      <input
                        id="EVVechile-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 94370 XXXXX"
                        autoComplete="tel"
                        required
                      />
                    </div>

                    <div className="EVVechile__inputGroup">
                      <label htmlFor="EVVechile-date">Expected Safari Date *</label>
                      <input
                        id="EVVechile-date"
                        name="travelDate"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    <div className="EVVechile__inputGroup">
                      <label htmlFor="EVVechile-pickupLocation">Pickup Location</label>
                      <select
                        id="EVVechile-pickupLocation"
                        name="pickupLocation"
                        defaultValue="Khola Gate Parking (Shuttle to Boat Jetty)"
                      >
                        <option value="Khola Gate Parking (Shuttle to Boat Jetty)">
                          Khola Gate Parking (Shuttle to Boat Jetty)
                        </option>
                        <option value="Dangmal Island Pier (Core Sanctuary Safari)">
                          Dangmal Island Pier (Core Sanctuary Safari)
                        </option>
                        <option value="Dangmal Forest Resthouse Hub">
                          Dangmal Forest Resthouse Hub
                        </option>
                      </select>
                    </div>

                    <div className="EVVechile__inputGroup">
                      <label htmlFor="EVVechile-guests">Number of Passengers</label>
                      <select
                        id="EVVechile-guests"
                        name="guests"
                        defaultValue="1–4 Persons (Standard 4-Seater Cart)"
                      >
                        <option value="1–4 Persons (Standard 4-Seater Cart)">
                          1–4 Persons (Standard 4-Seater Cart)
                        </option>
                        <option value="5–6 Persons (Mid-Size 6-Seater Cart)">
                          5–6 Persons (Mid-Size 6-Seater Cart)
                        </option>
                        <option value="7–8 Persons (Large 8-Seater Cart)">
                          7–8 Persons (Large 8-Seater Cart)
                        </option>
                        <option value="9+ Persons (Multiple Carts / Group Shuttle)">
                          9+ Persons (Multiple Carts / Group Shuttle)
                        </option>
                      </select>
                    </div>

                    <div className="EVVechile__inputGroup EVVechile__inputGroup--full">
                      <label htmlFor="EVVechile-service">Select EV Service Package</label>
                      <select
                        id="EVVechile-service"
                        name="service"
                        defaultValue="Dangmal Core Island EV Safari Circuit (2 hrs)"
                      >
                        <option value="Dangmal Core Island EV Safari Circuit (2 hrs)">
                          Dangmal Core Island EV Safari Circuit (2 hrs)
                        </option>
                        <option value="Khola Gate Parking to Boat Jetty Shuttle Transfer">
                          Khola Gate Parking to Boat Jetty Shuttle Transfer
                        </option>
                        <option value="Full Day Boat Safari + Dangmal Island EV Combo">
                          Full Day Boat Safari + Dangmal Island EV Combo
                        </option>
                        <option value="Senior Citizen Assisted Relaxed-Pace Green Tour">
                          Senior Citizen Assisted Relaxed-Pace Green Tour
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="EVVechile__inputGroup">
                    <label htmlFor="EVVechile-notes">
                      Special Requirements / Accessibility Needs
                    </label>
                    <textarea
                      id="EVVechile-notes"
                      name="notes"
                      rows="4"
                      placeholder="Let Bhitarakanika Boat Service know if anyone requires wheelchair boarding assistance, child seats, luggage space, or a dedicated eco-guide..."
                    />
                  </div>

                  <button type="submit" className="EVVechile__submitBtn">
                    Submit EV Booking Request ↗
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 4. GALLERY */}
          {activeTab === "ev-gallery" && (
            <div className="EVVechile__viewPane">
              <div className="EVVechile__eyebrow">
                <span className="EVVechile__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • ECO FLEET GALLERY</span>
              </div>

              <h1 className="EVVechile__pageTitle">
                Portraits of the <span>Green Fleet in Action.</span>
              </h1>

              <p className="EVVechile__lead">
                Browse photographs of our electric safari carts and shuttle vehicles operating
                across the lush corridors and jetty points of Bhitarkanika. Click any image to view details in full screen.
              </p>

              <div className="EVVechile__galleryPageGrid">
                {galleryImages.map((img, index) => (
                  <button
                    key={`${img.title}-${index}`}
                    type="button"
                    className="EVVechile__galleryPageCard"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View ${img.title}`}
                  >
                    <img src={img.src} alt={img.title} loading="lazy" />

                    <span className="EVVechile__galleryCardOverlay">
                      <span>{img.category}</span>
                      <span className="EVVechile__galleryCardTitle">
                        {img.title}
                      </span>
                      <span className="EVVechile__galleryLocation">
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
        <aside className="EVVechile__sidebar">
          {/* NAVIGATION */}
          <div className="EVVechile__sideBox">
            <div className="EVVechile__sideTitle">
              <span />
              <h2>Explore EV Desk</h2>
            </div>

            <nav
              className="EVVechile__serviceNav"
              aria-label="Explore electric vehicle navigation"
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
                    <span className="EVVechile__navArrow">↗</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* SUPPORT CARD */}
          <div className="EVVechile__supportCard">
            <div className="EVVechile__supportIcon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="EVVechile__supportHeading">
              <span>BHITARAKANIKA BOAT SERVICE</span>
              <h3>Need Transit Assistance?</h3>
            </div>

            <p>
              EV carts connect with daily boat safari schedules. Connect directly with
              our dispatch desk for real-time cart availability and assisted boarding support.
            </p>

            <button
              type="button"
              className="EVVechile__supportLink"
              onClick={() => handleTabChange("book-ev")}
            >
              <span>Connect with Dispatch Desk</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          {/* QUICK LINKS */}
          <div className="EVVechile__sideBox EVVechile__downloads">
            <div className="EVVechile__sideTitle">
              <span />
              <h2>Sanctuary Quick Links</h2>
            </div>

            <div className="EVVechile__downloadGrid">
              <button
                type="button"
                className={activeTab === "ev-rides" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("ev-rides")}
              >
                <span className="EVVechile__downloadIcon">01</span>
                <strong>EV Circuits</strong>
                <small>View routes ↗</small>
              </button>

              <button
                type="button"
                className={activeTab === "route-guide" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("route-guide")}
              >
                <span className="EVVechile__downloadIcon">02</span>
                <strong>Green Rules</strong>
                <small>Read guidelines ↗</small>
              </button>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="EVVechile__sideBox EVVechile__contactBox">
            <div className="EVVechile__sideTitle">
              <span />
              <h2>Bhitarakanika Boat Service</h2>
            </div>

            <div className="EVVechile__contactInfo">
              <span className="EVVechile__contactInfoIcon" aria-hidden="true">
                📍
              </span>
              <div>
                <strong>Primary Dispatch & Jetty Point</strong>
                <p>
                  Khola Entry Ghat, Rajnagar Block, Kendrapara District, Odisha 754225
                </p>
              </div>
            </div>

            <div className="EVVechile__contactInfo">
              <span className="EVVechile__contactInfoIcon" aria-hidden="true">
                ✉
              </span>
              <div>
                <strong>EV Mobility Inquiries</strong>
                <a href="mailto:safari@bhitarakanikaboatservice.com">
                  safari@bhitarakanikaboatservice.com
                </a>
              </div>
            </div>

            <div className="EVVechile__contactInfo">
              <span className="EVVechile__contactInfoIcon" aria-hidden="true">
                🕒
              </span>
              <div>
                <strong>Operating Hours</strong>
                <p>6:30 AM to 5:00 PM (Sunset Clearance Strictly Enforced)</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      {activeImage !== null && (
        <div
          className="EVVechile__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Electric vehicle photograph viewer"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="EVVechile__lightboxBox"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="EVVechile__lightboxClose"
              aria-label="Close image viewer"
              onClick={() => setActiveImage(null)}
            >
              ✕
            </button>

            <img
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].title}
            />

            <div className="EVVechile__lightboxCaption">
              <div>
                <span>{galleryImages[activeImage].category}</span>
                <h3>{galleryImages[activeImage].title}</h3>
                <small>📍 {galleryImages[activeImage].location}</small>
              </div>

              <span className="EVVechile__lightboxCount">
                {String(activeImage + 1).padStart(2, "0")} /{" "}
                {String(galleryImages.length).padStart(2, "0")}
              </span>
            </div>

            <div className="EVVechile__lightboxControls">
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

export default EVVechile;
import React, { useEffect, useState } from "react";
import "./BoatService.css";
import boatServiceImg from "../../assets/boatservice-1.png";
import boatServiceTwo from "../../assets/boatservice-2.png";
import boatServiceThree from "../../assets/boatservice-3.png";
import boatServiceFour from "../../assets/boatservice-4.png";
import boatServiceFive from "../../assets/boatservice-5.png";
import boatServiceSix from "../../assets/boatservice-6.png";

// ============================================
// WHATSAPP SETTINGS
// ============================================

const WHATSAPP_NUMBER = "918328982394"; // country code + number, digits only
const WHATSAPP_DISPLAY = "+91 83289 82394";
const GENERAL_MESSAGE =
  "Hello Bhitarkanika Boat Service! I would like to know about safari boat availability and today's tide timings.";

const whatsappLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// ============================================
// SMALL HELPERS
// ============================================

const todayISO = () => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

const formatDate = (iso) => {
  if (!iso) return "Not selected";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const ICONS = {
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M17 14.5a5 5 0 0 1 4 5.5" />
    </>
  ),
  chat: (
    <>
      <path d="M21 12a8 8 0 0 1-11.7 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
    </>
  ),
};

const Icon = ({ name }) => (
  <svg
    className="BoatService__icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {ICONS[name]}
  </svg>
);

const WaIcon = () => (
  <svg className="BoatService__waIcon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.6 5.95L0 24l6.3-1.65a11.9 11.9 0 0 0 5.74 1.46h.01c6.55 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.43-8.43zM12.05 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.87 9.87 0 0 1-1.52-5.27c0-5.46 4.44-9.9 9.91-9.9 2.64 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 7c0 5.46-4.45 9.9-9.9 9.9zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
  </svg>
);

const WhatsAppLink = ({ message = GENERAL_MESSAGE, className, children }) => (
  <a
    className={className}
    href={whatsappLink(message)}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

// ============================================
// DATA
// ============================================

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

const heroStats = [
  { value: "8", label: "Kingfisher species" },
  { value: "Oct – Mar", label: "Best safari season" },
  { value: "8 – 20", label: "Seater boats" },
  { value: "3.5 – 4 hrs", label: "Standard safari" },
];

const GATE_OPTIONS = [
  "Khola Gate (Direct to Dangmal)",
  "Gupti Gate (Estuary & Islands)",
  "Chandbali Ghat (River Transit)",
];

const GUEST_OPTIONS = [
  "1–4 Persons (Private Small Boat)",
  "5–8 Persons (Standard Safari Vessel)",
  "9–14 Persons (Large Group Cruiser)",
  "15+ Persons (Corporate / School Tour)",
];

const SERVICE_OPTIONS = [
  "Morning Wildlife & Crocodile Safari (4 hrs)",
  "Afternoon Sunset Creek Safari (3 hrs)",
  "Full Day Gupti & Habalikhati Coastal Cruise (6-7 hrs)",
  "Bird Photography Low-Speed Private Charter",
];

const safariPackages = [
  {
    tag: "MOST POPULAR",
    title: "Standard Creek Safari",
    route: "Khola Gate → Dangmal Island → Crocodile Breeding Centre → Return",
    duration: "3.5 to 4 Hours",
    highlights:
      "Saltwater crocodile sightings, mangrove birding, Dangmal museum walk, tidal creeks.",
    capacity: "8 / 14 / 20 seater boats available",
    gate: GATE_OPTIONS[0],
    service: SERVICE_OPTIONS[0],
  },
  {
    tag: "COASTAL EXPEDITION",
    title: "Gupti Estuary & Island Cruise",
    route: "Gupti Gate → Habalikhati Beach → Hukitola Lighthouse Creek",
    duration: "Full day · 6–7 hours (high tide dependent)",
    highlights:
      "Olive ridley coastal creeks, historic British storehouse at Hukitola, dolphin sightings.",
    capacity: "Authorized marine cruisers · 10–12 guests",
    gate: GATE_OPTIONS[1],
    service: SERVICE_OPTIONS[2],
  },
  {
    tag: "PHOTOGRAPHY FOCUS",
    title: "Private Birding & Macro Safari",
    route: "Customised low-wake river cruise covering Suajore & interior creeks",
    duration: "Early morning · 6:30 AM – 10:30 AM",
    highlights:
      "8 kingfisher species, White-bellied Sea Eagle, mudskippers, and basking giants.",
    capacity: "Private custom boat with eco guide",
    gate: GATE_OPTIONS[0],
    service: SERVICE_OPTIONS[3],
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

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  travelDate: "",
  entryGate: GATE_OPTIONS[0],
  guests: GUEST_OPTIONS[0],
  service: SERVICE_OPTIONS[0],
  notes: "",
};

const buildBookingMessage = (d) =>
  [
    "Hello Bhitarkanika Boat Service! I would like to book a safari boat.",
    "",
    `Name: ${d.name}`,
    `Mobile: ${d.phone}`,
    `Email: ${d.email}`,
    `Safari date: ${formatDate(d.travelDate)}`,
    `Service: ${d.service}`,
    `Entry jetty: ${d.entryGate}`,
    `Passengers: ${d.guests}`,
    d.notes ? `Notes: ${d.notes}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");

// ============================================
// COMPONENT
// ============================================

const BoatService = () => {
  const [activeTab, setActiveTab] = useState("boat-safari");
  const [activeImage, setActiveImage] = useState(null);
  const [faqIndex, setFaqIndex] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(null); // holds the sent form data

  const scrollToTop = () => {
    document.getElementById("boat-services")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "trip-planning") setFaqIndex(0);
    if (tabId === "enquire-trip") setSubmitted(null);
    scrollToTop();
  };

  // "Book" button on a package card: open the form with that package filled in
  const handleBookPackage = (pkg) => {
    setForm((prev) => ({ ...prev, entryGate: pkg.gate, service: pkg.service }));
    handleTabChange("enquire-trip");
  };

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: also send `form` to your backend / email service here.
    setSubmitted({ ...form });
    scrollToTop();
  };

  const handleNewRequest = () => {
    setForm(INITIAL_FORM);
    setSubmitted(null);
  };

  // Lightbox: keyboard + scroll lock
  useEffect(() => {
    if (activeImage === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "ArrowRight") {
        setActiveImage((current) => (current + 1) % galleryImages.length);
      }
      if (event.key === "ArrowLeft") {
        setActiveImage(
          (current) => (current - 1 + galleryImages.length) % galleryImages.length
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
                Traverse India’s second largest mangrove delta aboard authorized
                motor vessels. Cruise past pristine mudflats, watch giant
                saltwater crocodiles bask in the morning sun, and explore the
                dense labyrinth of the Brahmani, Baitarani, and Dhamra river
                channels with a certified local guide beside you.
              </p>

              <figure className="BoatService__heroFigure">
                <img
                  className="BoatService__heroImage"
                  src={boatServiceImg}
                  alt="Authorized safari boat cruising through Bhitarkanika mangrove waters"
                />

                <span className="BoatService__heroChip">
                  <Icon name="pin" /> Khola · Gupti · Chandbali
                </span>

                <figcaption className="BoatService__heroCaption">
                  <span className="BoatService__heroCaptionDot" />
                  <span>
                    Forest-Licensed Eco Safari Boats • Certified Local Boatmen &
                    Guides
                  </span>
                </figcaption>
              </figure>

              <div className="BoatService__stats">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="BoatService__stat">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* SAFARI HIGHLIGHT PILLARS */}
              <div className="BoatService__featureGrid">
                <div className="BoatService__specBox">
                  <span className="BoatService__specNum">01</span>
                  <h3>Scheduled Gate Departures</h3>
                  <p>
                    Daily morning (6:30 AM – 10:30 AM) and afternoon (1:30 PM –
                    5:00 PM) safari departures from Khola and Gupti entry gates,
                    mapped to the tidal cycle.
                  </p>
                </div>

                <div className="BoatService__specBox">
                  <span className="BoatService__specNum">02</span>
                  <h3>Certified Eco Guides</h3>
                  <p>
                    Every safari includes a Forest Department trained guide who
                    tracks saltwater crocodiles, water monitor lizards,
                    kingfishers, and migratory waterfowl.
                  </p>
                </div>

                <div className="BoatService__specBox">
                  <span className="BoatService__specNum">03</span>
                  <h3>Certified Safety Fleet</h3>
                  <p>
                    Rigid multi-passenger motorboats with a lifejacket for every
                    guest, high-walled railings, first-aid kits, and low-noise
                    engines.
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
                        <span>
                          <Icon name="clock" /> {pkg.duration}
                        </span>
                        <span>
                          <Icon name="users" /> {pkg.capacity}
                        </span>
                      </div>

                      <p className="BoatService__packageDesc">{pkg.highlights}</p>

                      <div className="BoatService__packageActions">
                        <button
                          type="button"
                          className="BoatService__pkgBtn"
                          onClick={() => handleBookPackage(pkg)}
                        >
                          Book This Safari ↗
                        </button>

                        <WhatsAppLink
                          className="BoatService__pkgBtn BoatService__pkgBtn--wa"
                          message={`Hello Bhitarkanika Boat Service! I'm interested in the "${pkg.title}". Please share availability and pricing.`}
                        >
                          <WaIcon /> Ask on WhatsApp
                        </WhatsAppLink>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="BoatService__actionBanner">
                <div>
                  <h3>Ready for a River Expedition in Bhitarkanika?</h3>
                  <p>
                    Pre-reserve a private or shared boat to secure your preferred
                    gate clearance and eco-guide during peak tourist season.
                  </p>
                </div>

                <div className="BoatService__bannerActions">
                  <button
                    type="button"
                    className="BoatService__btnPrimary"
                    onClick={() => handleTabChange("enquire-trip")}
                  >
                    Reserve Safari Boat ↗
                  </button>
                  <WhatsAppLink className="BoatService__btnWhatsApp">
                    <WaIcon /> Chat on WhatsApp
                  </WhatsAppLink>
                </div>
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
                Everything Required <span>To Plan Your Boat Safari.</span>
              </h1>

              <p className="BoatService__lead">
                Plan a smooth trip to Bhitarkanika Wildlife Sanctuary with clear
                guidance on entry checkpoints, boat permissions, tidal timelines,
                and how to reach each departure jetty.
              </p>

              <div className="BoatService__planAccordion">
                {planningFAQs.map((item, index) => {
                  const isOpen = faqIndex === index;

                  return (
                    <div
                      key={item.q}
                      className={`BoatService__planItem ${isOpen ? "is-open" : ""}`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        className="BoatService__planTrigger"
                        onClick={() => setFaqIndex(isOpen ? -1 : index)}
                      >
                        <span className="BoatService__planIndex">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="BoatService__planQuestion">{item.q}</span>
                        <span className="BoatService__planToggle">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && <p className="BoatService__planAnswer">{item.a}</p>}
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
                    Airport (BBI), Bhubaneswar, with daily flights from all major
                    Indian metros.
                  </li>
                </ul>

                <p className="BoatService__routeNote">
                  <strong>Important Sanctuary Advisory:</strong> The park remains
                  strictly closed during the crocodile breeding season from May 1
                  to July 31 annually. Advance permit reservations are
                  recommended for winter weekends.
                </p>
              </div>

              <div className="BoatService__actionBanner">
                <div>
                  <h3>Have Specific Group or Timing Questions?</h3>
                  <p>
                    Talk directly to our boat service team for custom multi-hour
                    river itineraries and student nature camps.
                  </p>
                </div>

                <div className="BoatService__bannerActions">
                  <button
                    type="button"
                    className="BoatService__btnPrimary"
                    onClick={() => handleTabChange("enquire-trip")}
                  >
                    Send Travel Inquiry ↗
                  </button>
                  <WhatsAppLink
                    className="BoatService__btnWhatsApp"
                    message="Hello Bhitarkanika Boat Service! I have a question about group size and safari timing."
                  >
                    <WaIcon /> Chat on WhatsApp
                  </WhatsAppLink>
                </div>
              </div>
            </div>
          )}

          {/* 3. BOOK A SAFARI BOAT */}
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
                Share your travel date and group details. Our boat desk checks
                tidal conditions and boat availability, then confirms your
                safari on WhatsApp.
              </p>

              {submitted ? (
                <div className="BoatService__formSuccess">
                  <span className="BoatService__checkIcon">✓</span>

                  <h3>One last step, {submitted.name.split(" ")[0]}!</h3>

                  <p>
                    Your safari request is ready. Send it to our boat service
                    team on WhatsApp so we can confirm tide timings, boat
                    availability and permit help for your date.
                  </p>

                  <dl className="BoatService__summary">
                    <div>
                      <dt>Safari date</dt>
                      <dd>{formatDate(submitted.travelDate)}</dd>
                    </div>
                    <div>
                      <dt>Entry jetty</dt>
                      <dd>{submitted.entryGate}</dd>
                    </div>
                    <div>
                      <dt>Passengers</dt>
                      <dd>{submitted.guests}</dd>
                    </div>
                    <div>
                      <dt>Service</dt>
                      <dd>{submitted.service}</dd>
                    </div>
                  </dl>

                  <div className="BoatService__successActions">
                    <WhatsAppLink
                      className="BoatService__btnWhatsApp BoatService__btnWhatsApp--large"
                      message={buildBookingMessage(submitted)}
                    >
                      <WaIcon /> Send Request on WhatsApp
                    </WhatsAppLink>

                    <button
                      type="button"
                      className="BoatService__btnGhost"
                      onClick={handleNewRequest}
                    >
                      New Booking Request
                    </button>
                  </div>
                </div>
              ) : (
                <form className="BoatService__form" onSubmit={handleSubmit}>
                  <div className="BoatService__formHeading">
                    <span>BHITARKANIKA BOAT SERVICE</span>
                    <h3>Safari Boat Booking Form</h3>
                    <p>
                      Fields marked * are needed for Forest Department passenger
                      permits.
                    </p>
                  </div>

                  <div className="BoatService__formGrid">
                    <div className="BoatService__inputGroup">
                      <label htmlFor="BoatService-name">Lead Passenger Name *</label>
                      <input
                        id="BoatService-name"
                        name="name"
                        type="text"
                        placeholder="e.g. Debashis Mohapatra"
                        autoComplete="name"
                        value={form.name}
                        onChange={updateField}
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
                        value={form.email}
                        onChange={updateField}
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
                        inputMode="tel"
                        placeholder="+91 94370 XXXXX"
                        autoComplete="tel"
                        pattern="[0-9+ ]{10,15}"
                        title="Enter a valid mobile number (10 to 15 digits)"
                        value={form.phone}
                        onChange={updateField}
                        required
                      />
                    </div>

                    <div className="BoatService__inputGroup">
                      <label htmlFor="BoatService-date">Expected Safari Date *</label>
                      <input
                        id="BoatService-date"
                        name="travelDate"
                        type="date"
                        min={todayISO()}
                        value={form.travelDate}
                        onChange={updateField}
                        required
                      />
                    </div>

                    <div className="BoatService__inputGroup">
                      <label htmlFor="BoatService-entryGate">Preferred Entry Jetty</label>
                      <select
                        id="BoatService-entryGate"
                        name="entryGate"
                        value={form.entryGate}
                        onChange={updateField}
                      >
                        {GATE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="BoatService__inputGroup">
                      <label htmlFor="BoatService-guests">Number of Passengers</label>
                      <select
                        id="BoatService-guests"
                        name="guests"
                        value={form.guests}
                        onChange={updateField}
                      >
                        {GUEST_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="BoatService__inputGroup BoatService__inputGroup--full">
                      <label htmlFor="BoatService-service">Select Safari Service</label>
                      <select
                        id="BoatService-service"
                        name="service"
                        value={form.service}
                        onChange={updateField}
                      >
                        {SERVICE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="BoatService__inputGroup BoatService__inputGroup--full">
                      <label htmlFor="BoatService-notes">
                        Special Requirements / Pick-up Details
                      </label>
                      <textarea
                        id="BoatService-notes"
                        name="notes"
                        rows="4"
                        placeholder="Tell us if you need forest cottage arrangements, binoculars, a dedicated nature guide, or dietary accommodations..."
                        value={form.notes}
                        onChange={updateField}
                      />
                    </div>
                  </div>

                  <button type="submit" className="BoatService__submitBtn">
                    Continue to Confirm on WhatsApp ↗
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 4. SANCTUARY GALLERY */}
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
                Browse our fleet and safari routes across Bhitarkanika. Tap any
                photograph to view it full screen with route details.
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
                        <Icon name="pin" /> {img.location}
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

            <nav className="BoatService__serviceNav" aria-label="Explore services">
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

          {/* SUPPORT CARD → WHATSAPP */}
          <div className="BoatService__supportCard">
            <div className="BoatService__supportIcon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13v-2a7 7 0 0 1 14 0v2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <rect x="3.5" y="11" width="4" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                <rect x="16.5" y="11" width="4" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="M18 18c0 2-2 3-5 3h-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>

            <div className="BoatService__supportHeading">
              <span>LOCAL TOUR ASSISTANCE</span>
              <h3>Need Safari Advice?</h3>
            </div>

            <p>
              Tidal levels shape daily crocodile viewing. Message our boat
              service team for today’s tide timetable, boat availability and
              permit help.
            </p>

            <WhatsAppLink className="BoatService__supportWa">
              <span className="BoatService__waBadge">
                <WaIcon />
              </span>
              <span className="BoatService__waText">
                <strong>Connect with Boat Service</strong>
                <small>Chat on WhatsApp · {WHATSAPP_DISPLAY}</small>
              </span>
              <span className="BoatService__waArrow" aria-hidden="true">
                ↗
              </span>
            </WhatsAppLink>
          </div>

          {/* QUICK LINKS */}
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
              <h2>Boat Information</h2>
            </div>

            <div className="BoatService__contactInfo">
              <span className="BoatService__contactInfoIcon">
                <Icon name="pin" />
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
              <span className="BoatService__contactInfoIcon BoatService__contactInfoIcon--wa">
                <WaIcon />
              </span>
              <div>
                <strong>Boat Service WhatsApp</strong>
                <WhatsAppLink>{WHATSAPP_DISPLAY}</WhatsAppLink>
              </div>
            </div>

            <div className="BoatService__contactInfo">
              <span className="BoatService__contactInfoIcon">
                <Icon name="mail" />
              </span>
              <div>
                <strong>Official Inquiries</strong>
                <a href="mailto:safari@bhitarkanikaboats.com">
                  safari@bhitarkanikaboats.com
                </a>
              </div>
            </div>

            <div className="BoatService__contactInfo">
              <span className="BoatService__contactInfoIcon">
                <Icon name="clock" />
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
                <small>
                  <Icon name="pin" /> {galleryImages[activeImage].location}
                </small>
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
                    (activeImage - 1 + galleryImages.length) % galleryImages.length
                  )
                }
                aria-label="Previous image"
              >
                ← Previous
              </button>

              <WhatsAppLink
                className="BoatService__lightboxWa"
                message={`Hello Bhitarkanika Boat Service! I liked "${galleryImages[activeImage].title}" (${galleryImages[activeImage].location}). Can I book this route?`}
              >
                <WaIcon /> Book this route
              </WhatsAppLink>

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
import React, { useEffect, useState } from "react";
import "./Deer.css";
import deerImgOne from "../../assets/deer-1.png";
import deerImgTwo from "../../assets/deer-2.png";
import deerImgThree from "../../assets/deer-3.png";
import deerImgFour from "../../assets/deer-4.png";
import deerImgFive from "../../assets/deer-5.png";
import deerImgSix from "../../assets/deer-6.png";

// ============================================
// WHATSAPP SETTINGS
// ============================================

const WHATSAPP_NUMBER = "918328982394"; // country code + number, digits only
const WHATSAPP_DISPLAY = "+91 83289 82394";
const GENERAL_MESSAGE =
  "Hello Bhitarakanika Boat Service! I would like to know about spotted deer safari availability and today's tide timings.";

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
};

const Icon = ({ name }) => (
  <svg
    className="Deer__icon"
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
  <svg className="Deer__waIcon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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

const heroStats = [
  { value: "Axis axis", label: "Spotted deer (Chital)" },
  { value: "6:30 – 9:30", label: "Best morning window" },
  { value: "Oct – Mar", label: "Best safari season" },
  { value: "3.5 – 4 hrs", label: "Standard safari" },
];

const GATE_OPTIONS = [
  "Khola Gate (Direct to Dangmal Deer Glades)",
  "Gupti Gate (Estuary & Coastal Islands)",
  "Chandbali Ghat (River Approach)",
];

const GUEST_OPTIONS = [
  "1–4 Persons (Private Small Boat)",
  "5–8 Persons (Standard Safari Vessel)",
  "9–14 Persons (Large Group Cruiser)",
  "15+ Persons (Corporate / School Tour)",
];

const SERVICE_OPTIONS = [
  "Morning Wildlife & Deer Safari (4 hrs) — Peak Activity Window",
  "Afternoon Glade Safari (3 hrs)",
  "Full Day Wildlife & Canopy Skywalk Combo (6 hrs)",
  "Wildlife Photography Low-Speed Private Charter",
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
    gate: GATE_OPTIONS[0],
    service: SERVICE_OPTIONS[0],
  },
  {
    tag: "HERBIVORE TRAIL",
    title: "Dangmal Nature Walk & Deer Glade Trail",
    route: "Khola Ghat → Dangmal Jetty → Elevated Forest Boardwalk → Deer Enclosure",
    duration: "4 to 5 Hours",
    highlights:
      "Guided walk along the elevated wooden trail through dense mangroves into open pastures where spotted deer congregate.",
    capacity: "Eco-Boat Transfer + Certified Forest Naturalist",
    gate: GATE_OPTIONS[0],
    service: SERVICE_OPTIONS[2],
  },
  {
    tag: "FULL SANCTUARY TRAIL",
    title: "Extended Delta & Core Habitat Expedition",
    route: "Gupti Gate → Coastal Creek Passages → Habalikhati Forest Meadows",
    duration: "Full Day / 6–7 Hours (Tide Synchronized)",
    highlights:
      "Tracking coastal herds of spotted deer, wild boars, Brahminy kites, and coastal mangrove ecology.",
    capacity: "High-Stability Safari Cruiser (Up to 10–12 Guests)",
    gate: GATE_OPTIONS[1],
    service: SERVICE_OPTIONS[2],
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
    "Hello Bhitarakanika Boat Service! I would like to book a spotted deer safari.",
    "",
    `Name: ${d.name}`,
    `Mobile: ${d.phone}`,
    `Email: ${d.email}`,
    `Safari date: ${formatDate(d.travelDate)}`,
    `Service: ${d.service}`,
    `Departure jetty: ${d.entryGate}`,
    `Passengers: ${d.guests}`,
    d.notes ? `Notes: ${d.notes}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");

// ============================================
// COMPONENT
// ============================================

const Deer = () => {
  const [activeTab, setActiveTab] = useState("deer-safari");
  const [activeImage, setActiveImage] = useState(null);
  const [faqIndex, setFaqIndex] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(null); // holds the sent form data

  const scrollToTop = () => {
    document.getElementById("spotted-deer")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "ecology-guide") setFaqIndex(0);
    if (tabId === "book-safari") setSubmitted(null);
    scrollToTop();
  };

  // "Book" button on a package card: open the form with that package filled in
  const handleBookPackage = (pkg) => {
    setForm((prev) => ({ ...prev, entryGate: pkg.gate, service: pkg.service }));
    handleTabChange("book-safari");
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
                Spotted Deer of Bhitarkanika{" "}
                <span>In Coastal Forest Glades.</span>
              </h1>

              <p className="Deer__lead">
                Traverse tidal riverways aboard authorized motor cruisers by
                Bhitarakanika Boat Service to explore the grassy savannahs and
                elevated forest islands of Dangmal. Witness hundreds of graceful
                Spotted Deer (Chital) browsing peacefully along mangrove fringes
                alongside wild boars, monitor lizards, and delta birdlife.
              </p>

              <figure className="Deer__heroFigure">
                <img
                  className="Deer__heroImage"
                  src={deerImgOne}
                  alt="Herd of spotted deer grazing in the open glades of Bhitarkanika National Park"
                />

                <span className="Deer__heroChip">
                  <Icon name="pin" /> Khola · Gupti · Chandbali
                </span>

                <figcaption className="Deer__heroCaption">
                  <span className="Deer__heroCaptionDot" />
                  <span>
                    Bhitarakanika Boat Service • Forest Wildlife Safaris &
                    Eco-Guided Trails
                  </span>
                </figcaption>
              </figure>

              <div className="Deer__stats">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="Deer__stat">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* HIGHLIGHT PILLARS */}
              <div className="Deer__featureGrid">
                <div className="Deer__specBox">
                  <span className="Deer__specNum">01</span>
                  <h3>Abundant Wild Herds</h3>
                  <p>
                    Home to thousands of Axis deer freely roaming natural open
                    meadows, feeding grounds, and forest buffer zones.
                  </p>
                </div>

                <div className="Deer__specBox">
                  <span className="Deer__specNum">02</span>
                  <h3>Dawn & Dusk Glades</h3>
                  <p>
                    Departures synchronized with prime grazing hours when stags
                    with majestic antlers lead herds into open sunlight.
                  </p>
                </div>

                <div className="Deer__specBox">
                  <span className="Deer__specNum">03</span>
                  <h3>Safe Forest Trails</h3>
                  <p>
                    Combine river cruising with elevated wooden boardwalk walks
                    around Dangmal for close wildlife observation.
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
                        <span>
                          <Icon name="clock" /> {pkg.duration}
                        </span>
                        <span>
                          <Icon name="users" /> {pkg.capacity}
                        </span>
                      </div>

                      <p className="Deer__packageDesc">{pkg.highlights}</p>

                      <div className="Deer__packageActions">
                        <button
                          type="button"
                          className="Deer__pkgBtn"
                          onClick={() => handleBookPackage(pkg)}
                        >
                          Book This Safari ↗
                        </button>

                        <WhatsAppLink
                          className="Deer__pkgBtn Deer__pkgBtn--wa"
                          message={`Hello Bhitarakanika Boat Service! I'm interested in the "${pkg.title}". Please share availability and pricing.`}
                        >
                          <WaIcon /> Ask on WhatsApp
                        </WhatsAppLink>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="Deer__actionBanner">
                <div>
                  <h3>Ready to Spot Herds of Chital with Bhitarakanika Boat Service?</h3>
                  <p>
                    Reserve private or shared safari boats with forest permits
                    and certified naturalists for seamless wildlife exploration
                    in Bhitarkanika.
                  </p>
                </div>

                <div className="Deer__bannerActions">
                  <button
                    type="button"
                    className="Deer__btnPrimary"
                    onClick={() => handleTabChange("book-safari")}
                  >
                    Reserve Safari Boat ↗
                  </button>
                  <WhatsAppLink className="Deer__btnWhatsApp">
                    <WaIcon /> Chat on WhatsApp
                  </WhatsAppLink>
                </div>
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
                Learn about the unique adaptation of Chital to the estuarine
                ecosystem of Bhitarkanika, optimal viewing sectors, and forest
                sanctuary conduct.
              </p>

              <div className="Deer__planAccordion">
                {deerFAQs.map((item, index) => {
                  const isOpen = faqIndex === index;

                  return (
                    <div
                      key={item.q}
                      className={`Deer__planItem ${isOpen ? "is-open" : ""}`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        className="Deer__planTrigger"
                        onClick={() => setFaqIndex(isOpen ? -1 : index)}
                      >
                        <span className="Deer__planIndex">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="Deer__planQuestion">{item.q}</span>
                        <span className="Deer__planToggle">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && <p className="Deer__planAnswer">{item.a}</p>}
                    </div>
                  );
                })}
              </div>

              <div className="Deer__routeBox">
                <h3>Prime Sighting Sectors & Trail Etiquette</h3>

                <ul>
                  <li>
                    <strong>Dangmal Forest Clearing:</strong> A large natural
                    grassland opening behind the forest campus where herds
                    emerge by late afternoon to graze and hydrate at freshwater
                    ponds.
                  </li>

                  <li>
                    <strong>Skywalk Trail Perimeters:</strong> Walking along the
                    elevated canopy boardwalk offers an aerial vantage point to
                    watch deer navigating through mangrove roots and shrub
                    clearings undisturbed.
                  </li>

                  <li>
                    <strong>Suajore Creek Banks:</strong> Deer frequently visit
                    muddy creek edges during low tide to lick mineral-rich soil
                    and browse lower foliage.
                  </li>
                </ul>

                <p className="Deer__routeNote">
                  <strong>Wildlife Sanctuary Advisory:</strong> Feeding,
                  whistling, approaching, or disturbing deer herds is strictly
                  prohibited under Forest Department laws. Always maintain
                  silence on walking trails and viewing platforms.
                </p>
              </div>

              <div className="Deer__actionBanner">
                <div>
                  <h3>Planning a Group or Family Wildlife Tour?</h3>
                  <p>
                    Connect with our jetty operations desk at Bhitarakanika Boat
                    Service for custom multi-hour itineraries, boat sizing, and
                    eco-guide support.
                  </p>
                </div>

                <div className="Deer__bannerActions">
                  <button
                    type="button"
                    className="Deer__btnPrimary"
                    onClick={() => handleTabChange("book-safari")}
                  >
                    Send Travel Inquiry ↗
                  </button>
                  <WhatsAppLink
                    className="Deer__btnWhatsApp"
                    message="Hello Bhitarakanika Boat Service! I have a question about group size and deer safari timing."
                  >
                    <WaIcon /> Chat on WhatsApp
                  </WhatsAppLink>
                </div>
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
                Submit your travel schedule and passenger details. Bhitarakanika
                Boat Service will verify vessel availability, handle Forest
                Department entry permits, assign an eco-guide, and confirm your
                tour on WhatsApp.
              </p>

              {submitted ? (
                <div className="Deer__formSuccess">
                  <span className="Deer__checkIcon">✓</span>

                  <h3>One last step, {submitted.name.split(" ")[0]}!</h3>

                  <p>
                    Your safari request is ready. Send it to Bhitarakanika Boat
                    Service on WhatsApp so we can confirm vessel slots, timings
                    and permit help for your date.
                  </p>

                  <dl className="Deer__summary">
                    <div>
                      <dt>Safari date</dt>
                      <dd>{formatDate(submitted.travelDate)}</dd>
                    </div>
                    <div>
                      <dt>Departure jetty</dt>
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

                  <div className="Deer__successActions">
                    <WhatsAppLink
                      className="Deer__btnWhatsApp Deer__btnWhatsApp--large"
                      message={buildBookingMessage(submitted)}
                    >
                      <WaIcon /> Send Request on WhatsApp
                    </WhatsAppLink>

                    <button
                      type="button"
                      className="Deer__btnGhost"
                      onClick={handleNewRequest}
                    >
                      New Booking Request
                    </button>
                  </div>
                </div>
              ) : (
                <form className="Deer__form" onSubmit={handleSubmit}>
                  <div className="Deer__formHeading">
                    <span>BHITARAKANIKA BOAT SERVICE</span>
                    <h3>Wildlife & Deer Safari Booking Form</h3>
                    <p>
                      Fields marked * are needed for Forest Department passenger
                      permits.
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
                        value={form.name}
                        onChange={updateField}
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
                        value={form.email}
                        onChange={updateField}
                        required
                      />
                    </div>

                    <div className="Deer__inputGroup">
                      <label htmlFor="Deer-phone">WhatsApp / Mobile Number *</label>
                      <input
                        id="Deer-phone"
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

                    <div className="Deer__inputGroup">
                      <label htmlFor="Deer-date">Expected Safari Date *</label>
                      <input
                        id="Deer-date"
                        name="travelDate"
                        type="date"
                        min={todayISO()}
                        value={form.travelDate}
                        onChange={updateField}
                        required
                      />
                    </div>

                    <div className="Deer__inputGroup">
                      <label htmlFor="Deer-entryGate">Preferred Departure Jetty</label>
                      <select
                        id="Deer-entryGate"
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

                    <div className="Deer__inputGroup">
                      <label htmlFor="Deer-guests">Number of Passengers</label>
                      <select
                        id="Deer-guests"
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

                    <div className="Deer__inputGroup Deer__inputGroup--full">
                      <label htmlFor="Deer-service">Select Safari Service Tier</label>
                      <select
                        id="Deer-service"
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

                    <div className="Deer__inputGroup Deer__inputGroup--full">
                      <label htmlFor="Deer-notes">
                        Special Requirements / Pick-up Details
                      </label>
                      <textarea
                        id="Deer-notes"
                        name="notes"
                        rows="4"
                        placeholder="Let Bhitarakanika Boat Service know if you need forest cottage arrangements, dedicated nature guide, binoculars, or senior citizen assistance..."
                        value={form.notes}
                        onChange={updateField}
                      />
                    </div>
                  </div>

                  <button type="submit" className="Deer__submitBtn">
                    Continue to Confirm on WhatsApp ↗
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
                Browse photographs captured during wildlife safaris across the
                forest clearings and mangrove edges of Bhitarkanika. Tap any
                image to view it full screen with location details.
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
                      <span className="Deer__galleryCardTitle">{img.title}</span>
                      <span className="Deer__galleryLocation">
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
        <aside className="Deer__sidebar">
          {/* NAVIGATION */}
          <div className="Deer__sideBox">
            <div className="Deer__sideTitle">
              <span />
              <h2>Explore Safari Desk</h2>
            </div>

            <nav className="Deer__serviceNav" aria-label="Explore spotted deer services">
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

          {/* SUPPORT CARD → WHATSAPP */}
          <div className="Deer__supportCard">
            <div className="Deer__supportIcon" aria-hidden="true">
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

            <div className="Deer__supportHeading">
              <span>BHITARAKANIKA BOAT SERVICE</span>
              <h3>Need Safari Advice?</h3>
            </div>

            <p>
              Deer sightings peak during morning and late afternoon grazing
              windows. Message our dock managers for today's wildlife movements,
              boat availability and permit assistance.
            </p>

            <WhatsAppLink className="Deer__supportWa">
              <span className="Deer__waBadge">
                <WaIcon />
              </span>
              <span className="Deer__waText">
                <strong>Connect with Jetty Desk</strong>
                <small>Chat on WhatsApp · {WHATSAPP_DISPLAY}</small>
              </span>
              <span className="Deer__waArrow" aria-hidden="true">
                ↗
              </span>
            </WhatsAppLink>
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

          {/* CONTACT INFORMATION */}
          <div className="Deer__sideBox Deer__contactBox">
            <div className="Deer__sideTitle">
              <span />
              <h2>Bhitarakanika Boat Service</h2>
            </div>

            <div className="Deer__contactInfo">
              <span className="Deer__contactInfoIcon">
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

            <div className="Deer__contactInfo">
              <span className="Deer__contactInfoIcon Deer__contactInfoIcon--wa">
                <WaIcon />
              </span>
              <div>
                <strong>Boat Service WhatsApp</strong>
                <WhatsAppLink>{WHATSAPP_DISPLAY}</WhatsAppLink>
              </div>
            </div>

            <div className="Deer__contactInfo">
              <span className="Deer__contactInfoIcon">
                <Icon name="mail" />
              </span>
              <div>
                <strong>Official Safari Inquiries</strong>
                <a href="mailto:safari@bhitarakanikaboatservice.com">
                  safari@bhitarakanikaboatservice.com
                </a>
              </div>
            </div>

            <div className="Deer__contactInfo">
              <span className="Deer__contactInfoIcon">
                <Icon name="clock" />
              </span>
              <div>
                <strong>Forest Gate Operating Hours</strong>
                <p>6:30 AM to 5:00 PM (Sunset Closure Strictly Enforced)</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FULLSCREEN GALLERY LIGHTBOX */}
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
                <small>
                  <Icon name="pin" /> {galleryImages[activeImage].location}
                </small>
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
                    (activeImage - 1 + galleryImages.length) % galleryImages.length
                  )
                }
                aria-label="Previous photograph"
              >
                ← Previous
              </button>

              <WhatsAppLink
                className="Deer__lightboxWa"
                message={`Hello Bhitarakanika Boat Service! I liked "${galleryImages[activeImage].title}" (${galleryImages[activeImage].location}). Can I book a safari to this area?`}
              >
                <WaIcon /> Book this area
              </WhatsAppLink>

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
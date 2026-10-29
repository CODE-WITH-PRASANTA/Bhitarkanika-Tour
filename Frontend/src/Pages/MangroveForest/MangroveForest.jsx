import React, { useEffect, useState } from "react";
import "./MangroveForest.css";
import mangroveImgOne from "../../assets/MangroveForest-1.png";
import mangroveImgTwo from "../../assets/MangroveForest-2.png";
import mangroveImgThree from "../../assets/MangroveForest-3.png";
import mangroveImgFour from "../../assets/MangroveForest-4.png";
import mangroveImgFive from "../../assets/MangroveForest-5.png";
import mangroveImgSix from "../../assets/MangroveForest-6.png";

// ============================================
// WHATSAPP SETTINGS
// ============================================

const WHATSAPP_NUMBER = "918328982394"; // country code + number, digits only
const WHATSAPP_DISPLAY = "+91 83289 82394";
const GENERAL_MESSAGE =
  "Hello Bhitarkanika Forest Desk! I would like to know about mangrove safari availability and today's tide timings.";

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
    className="MangroveForest__icon"
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
  <svg className="MangroveForest__waIcon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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

const heroStats = [
  { value: "62+", label: "Mangrove species" },
  { value: "Oct – Mar", label: "Best safari season" },
  { value: "2nd", label: "Largest in India" },
  { value: "3.5 – 4 hrs", label: "Core creek safari" },
];

const GATE_OPTIONS = [
  "Khola Gate (Direct to Core Mangrove Creeks)",
  "Gupti Gate (Estuarine & Coastal Mangroves)",
  "Chandbali Ghat (Delta Approach)",
];

const GUEST_OPTIONS = [
  "1–4 Persons (Private Small Boat)",
  "5–8 Persons (Standard Safari Vessel)",
  "9–14 Persons (Large Group Cruiser)",
  "15+ Persons (Botany / College Group)",
];

const SERVICE_OPTIONS = [
  "Core Creek Mangrove Safari (4 hrs)",
  "Dangmal Boardwalk & Botany Walk (4-5 hrs)",
  "Full Day Outer Estuary & Delta Exploration (6-7 hrs)",
  "Private Low-Wake Photography & Research Charter",
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
    gate: GATE_OPTIONS[0],
    service: SERVICE_OPTIONS[0],
  },
  {
    tag: "CANOPY & BOTANY",
    title: "Dangmal Boardwalk & Floral Walk",
    route: "Khola Ghat → Dangmal Nature Trail → Watchtower Loop → Tidal Creek",
    duration: "4 to 5 Hours",
    highlights:
      "Guided walk along the elevated wooden boardwalk into pristine mangrove interiors, medicinal shrub tracking, and view deck.",
    capacity: "Forest Eco-Cruiser with Certified Botanist Guide",
    gate: GATE_OPTIONS[0],
    service: SERVICE_OPTIONS[1],
  },
  {
    tag: "COASTAL ECOSYSTEM",
    title: "Outer Estuarine Delta Cruise",
    route: "Gupti Gate → Brahmani Estuary → Hukitola Channel → Barrier Spits",
    duration: "Full Day / 6–7 Hours (Tide Synchronized)",
    highlights:
      "Expansive saltwater mangroves, dynamic silt shoals, coastal forest buffers against cyclonic tides, and estuary birdlife.",
    capacity: "Marine Certified Cruisers (Up to 10–12 Guests)",
    gate: GATE_OPTIONS[1],
    service: SERVICE_OPTIONS[2],
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
    "Hello Bhitarkanika Forest Desk! I would like to book a mangrove safari.",
    "",
    `Name: ${d.name}`,
    `Mobile: ${d.phone}`,
    `Email: ${d.email}`,
    `Safari date: ${formatDate(d.travelDate)}`,
    `Expedition: ${d.service}`,
    `Departure jetty: ${d.entryGate}`,
    `Visitors: ${d.guests}`,
    d.notes ? `Notes: ${d.notes}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");

// ============================================
// COMPONENT
// ============================================

const MangroveForest = () => {
  const [activeTab, setActiveTab] = useState("mangrove-safari");
  const [activeImage, setActiveImage] = useState(null);
  const [faqIndex, setFaqIndex] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(null); // holds the sent form data

  const scrollToTop = () => {
    document.getElementById("mangrove-forest")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "botany-guide") setFaqIndex(0);
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
                Immerse yourself in India’s richest coastal green barrier.
                Navigate quiet brackish passages fringed by centuries-old
                Sundari, Phoenix, and Rhizophora trees that shield the Odisha
                coastline from surging cyclonic tides and nurture a complex
                estuarine web of life.
              </p>

              <figure className="MangroveForest__heroFigure">
                <img
                  className="MangroveForest__heroImage"
                  src={mangroveImgOne}
                  alt="Ancient mangrove trees and stilt root systems along Bhitarkanika waterways"
                />

                <span className="MangroveForest__heroChip">
                  <Icon name="pin" /> Khola · Gupti · Chandbali
                </span>

                <figcaption className="MangroveForest__heroCaption">
                  <span className="MangroveForest__heroCaptionDot" />
                  <span>
                    Ramsar Wetland Site • India's Highest Mangrove Floral
                    Diversity
                  </span>
                </figcaption>
              </figure>

              <div className="MangroveForest__stats">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="MangroveForest__stat">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* HIGHLIGHT PILLARS */}
              <div className="MangroveForest__featureGrid">
                <div className="MangroveForest__specBox">
                  <span className="MangroveForest__specNum">01</span>
                  <h3>62+ Mangrove Species</h3>
                  <p>
                    Home to true mangroves including Heritiera fomes (Sundari),
                    Sonneratia, Avicennia, and Xylocarpus flourishing along
                    tidal mudbanks.
                  </p>
                </div>

                <div className="MangroveForest__specBox">
                  <span className="MangroveForest__specNum">02</span>
                  <h3>Pneumatophore Networks</h3>
                  <p>
                    Witness thousands of conical spike roots rising from the
                    mudflats, drawing vital oxygen during high-tide submergence
                    cycles.
                  </p>
                </div>

                <div className="MangroveForest__specBox">
                  <span className="MangroveForest__specNum">03</span>
                  <h3>Natural Cyclone Shield</h3>
                  <p>
                    An indispensable biosphere barrier engineered by nature,
                    dissipating ferocious Bay of Bengal tidal surges across
                    river channels.
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
                        <span>
                          <Icon name="clock" /> {pkg.duration}
                        </span>
                        <span>
                          <Icon name="users" /> {pkg.capacity}
                        </span>
                      </div>

                      <p className="MangroveForest__packageDesc">
                        {pkg.highlights}
                      </p>

                      <div className="MangroveForest__packageActions">
                        <button
                          type="button"
                          className="MangroveForest__pkgBtn"
                          onClick={() => handleBookPackage(pkg)}
                        >
                          Book This Safari ↗
                        </button>

                        <WhatsAppLink
                          className="MangroveForest__pkgBtn MangroveForest__pkgBtn--wa"
                          message={`Hello Bhitarkanika Forest Desk! I'm interested in the "${pkg.title}". Please share availability and pricing.`}
                        >
                          <WaIcon /> Ask on WhatsApp
                        </WhatsAppLink>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="MangroveForest__actionBanner">
                <div>
                  <h3>Ready to Cruise Through Ancient Mangrove Waterways?</h3>
                  <p>
                    Book authorized silent crafts and forest-certified
                    eco-guides to explore the untouched creek labyrinths of
                    Bhitarkanika.
                  </p>
                </div>

                <div className="MangroveForest__bannerActions">
                  <button
                    type="button"
                    className="MangroveForest__btnPrimary"
                    onClick={() => handleTabChange("book-safari")}
                  >
                    Reserve Mangrove Safari ↗
                  </button>
                  <WhatsAppLink className="MangroveForest__btnWhatsApp">
                    <WaIcon /> Chat on WhatsApp
                  </WhatsAppLink>
                </div>
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
                Discover the evolutionary resilience of halophytic plant life,
                departure timetables, tidal mechanics, and sanctuary
                conservation protocols.
              </p>

              <div className="MangroveForest__planAccordion">
                {mangroveFAQs.map((item, index) => {
                  const isOpen = faqIndex === index;

                  return (
                    <div
                      key={item.q}
                      className={`MangroveForest__planItem ${isOpen ? "is-open" : ""}`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        className="MangroveForest__planTrigger"
                        onClick={() => setFaqIndex(isOpen ? -1 : index)}
                      >
                        <span className="MangroveForest__planIndex">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="MangroveForest__planQuestion">
                          {item.q}
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
                    <strong>Dangmal Elevated Canopy Trail:</strong> A scenic
                    wooden walkway cutting through dense stands of Sundari,
                    Excoecaria agallocha (Blinding Tree), and climbing ferns
                    with zero ground disturbance.
                  </li>

                  <li>
                    <strong>Suajore Tidal Creek Corridor:</strong> Sheltered
                    waterways flanked by towering Rhizophora mucronata arching
                    their aerial roots straight into the water.
                  </li>

                  <li>
                    <strong>Gupti to Habalikhati Forest Spits:</strong>{" "}
                    Expansive coastal mangroves and Casuarina belts that absorb
                    strong maritime winds and anchor shifting coastal sandbars.
                  </li>
                </ul>

                <p className="MangroveForest__routeNote">
                  <strong>Conservation Directive:</strong> Touching or plucking
                  mangrove leaves, disturbing root beds, and collecting
                  botanical samples are strictly prohibited under the Wildlife
                  Protection Act.
                </p>
              </div>

              <div className="MangroveForest__actionBanner">
                <div>
                  <h3>Seeking Custom Botanical or Research Charters?</h3>
                  <p>
                    Consult directly with certified forest naturalists for
                    student research groups, botanical study expeditions, and
                    early morning tide departures.
                  </p>
                </div>

                <div className="MangroveForest__bannerActions">
                  <button
                    type="button"
                    className="MangroveForest__btnPrimary"
                    onClick={() => handleTabChange("book-safari")}
                  >
                    Send Botany Inquiry ↗
                  </button>
                  <WhatsAppLink
                    className="MangroveForest__btnWhatsApp"
                    message="Hello Bhitarkanika Forest Desk! I have a question about a botanical / research charter and safari timing."
                  >
                    <WaIcon /> Chat on WhatsApp
                  </WhatsAppLink>
                </div>
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
                Provide your travel details and group size. Our forest desk
                will align tide windows, secure mandatory vessel permits, and
                allocate licensed guides, then confirm on WhatsApp.
              </p>

              {submitted ? (
                <div className="MangroveForest__formSuccess">
                  <span className="MangroveForest__checkIcon">✓</span>

                  <h3>One last step, {submitted.name.split(" ")[0]}!</h3>

                  <p>
                    Your expedition request is ready. Send it to our forest desk
                    on WhatsApp so we can confirm tide windows, vessel
                    allocation and permit help for your date.
                  </p>

                  <dl className="MangroveForest__summary">
                    <div>
                      <dt>Safari date</dt>
                      <dd>{formatDate(submitted.travelDate)}</dd>
                    </div>
                    <div>
                      <dt>Departure jetty</dt>
                      <dd>{submitted.entryGate}</dd>
                    </div>
                    <div>
                      <dt>Visitors</dt>
                      <dd>{submitted.guests}</dd>
                    </div>
                    <div>
                      <dt>Expedition</dt>
                      <dd>{submitted.service}</dd>
                    </div>
                  </dl>

                  <div className="MangroveForest__successActions">
                    <WhatsAppLink
                      className="MangroveForest__btnWhatsApp MangroveForest__btnWhatsApp--large"
                      message={buildBookingMessage(submitted)}
                    >
                      <WaIcon /> Send Request on WhatsApp
                    </WhatsAppLink>

                    <button
                      type="button"
                      className="MangroveForest__btnGhost"
                      onClick={handleNewRequest}
                    >
                      New Booking Request
                    </button>
                  </div>
                </div>
              ) : (
                <form className="MangroveForest__form" onSubmit={handleSubmit}>
                  <div className="MangroveForest__formHeading">
                    <span>BHITARKANIKA FOREST DESK</span>
                    <h3>Mangrove Expedition Booking Form</h3>
                    <p>
                      Fields marked * are needed for Forest Department passenger
                      permits.
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
                        value={form.name}
                        onChange={updateField}
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
                        value={form.email}
                        onChange={updateField}
                        required
                      />
                    </div>

                    <div className="MangroveForest__inputGroup">
                      <label htmlFor="MangroveForest-phone">
                        WhatsApp / Mobile Number *
                      </label>
                      <input
                        id="MangroveForest-phone"
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

                    <div className="MangroveForest__inputGroup">
                      <label htmlFor="MangroveForest-date">Safari Date *</label>
                      <input
                        id="MangroveForest-date"
                        name="travelDate"
                        type="date"
                        min={todayISO()}
                        value={form.travelDate}
                        onChange={updateField}
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

                    <div className="MangroveForest__inputGroup">
                      <label htmlFor="MangroveForest-guests">
                        Number of Visitors
                      </label>
                      <select
                        id="MangroveForest-guests"
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

                    <div className="MangroveForest__inputGroup MangroveForest__inputGroup--full">
                      <label htmlFor="MangroveForest-service">
                        Expedition Experience Tier
                      </label>
                      <select
                        id="MangroveForest-service"
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

                    <div className="MangroveForest__inputGroup MangroveForest__inputGroup--full">
                      <label htmlFor="MangroveForest-notes">
                        Special Requirements / Botanical Interests
                      </label>
                      <textarea
                        id="MangroveForest-notes"
                        name="notes"
                        rows="4"
                        placeholder="Specify if you require a specialized botany guide, binoculars, cottage arrangements, or customized low-speed sailing..."
                        value={form.notes}
                        onChange={updateField}
                      />
                    </div>
                  </div>

                  <button type="submit" className="MangroveForest__submitBtn">
                    Continue to Confirm on WhatsApp ↗
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
                waterways across Bhitarkanika. Tap any image to view it full
                screen with location details.
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

          {/* SUPPORT CARD → WHATSAPP */}
          <div className="MangroveForest__supportCard">
            <div className="MangroveForest__supportIcon" aria-hidden="true">
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

            <div className="MangroveForest__supportHeading">
              <span>FOREST ECOTOURISM DESK</span>
              <h3>Need Botanical Advice?</h3>
            </div>

            <p>
              Tidal levels dictate how far vessels can venture into narrow
              creek branches. Message our forest desk for current tide windows
              and guide assignments.
            </p>

            <WhatsAppLink className="MangroveForest__supportWa">
              <span className="MangroveForest__waBadge">
                <WaIcon />
              </span>
              <span className="MangroveForest__waText">
                <strong>Connect with Forest Desk</strong>
                <small>Chat on WhatsApp · {WHATSAPP_DISPLAY}</small>
              </span>
              <span className="MangroveForest__waArrow" aria-hidden="true">
                ↗
              </span>
            </WhatsAppLink>
          </div>

          {/* QUICK LINKS */}
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

          {/* CONTACT INFORMATION */}
          <div className="MangroveForest__sideBox MangroveForest__contactBox">
            <div className="MangroveForest__sideTitle">
              <span />
              <h2>Jetty Information</h2>
            </div>

            <div className="MangroveForest__contactInfo">
              <span className="MangroveForest__contactInfoIcon">
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

            <div className="MangroveForest__contactInfo">
              <span className="MangroveForest__contactInfoIcon MangroveForest__contactInfoIcon--wa">
                <WaIcon />
              </span>
              <div>
                <strong>Forest Desk WhatsApp</strong>
                <WhatsAppLink>{WHATSAPP_DISPLAY}</WhatsAppLink>
              </div>
            </div>

            <div className="MangroveForest__contactInfo">
              <span className="MangroveForest__contactInfoIcon">
                <Icon name="mail" />
              </span>
              <div>
                <strong>Official Forest Bookings</strong>
                <a href="mailto:safari@bhitarkanikaboats.com">
                  safari@bhitarkanikaboats.com
                </a>
              </div>
            </div>

            <div className="MangroveForest__contactInfo">
              <span className="MangroveForest__contactInfoIcon">
                <Icon name="clock" />
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
                <small>
                  <Icon name="pin" /> {galleryImages[activeImage].location}
                </small>
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
                    (activeImage - 1 + galleryImages.length) % galleryImages.length
                  )
                }
                aria-label="Previous photograph"
              >
                ← Previous
              </button>

              <WhatsAppLink
                className="MangroveForest__lightboxWa"
                message={`Hello Bhitarkanika Forest Desk! I liked "${galleryImages[activeImage].title}" (${galleryImages[activeImage].location}). Can I book a safari to this area?`}
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

export default MangroveForest;
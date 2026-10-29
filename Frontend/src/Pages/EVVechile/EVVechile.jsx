import React, { useEffect, useState } from "react";
import "./EVVechile.css";
import evVechileOne from "../../assets/ev-vechile-1.png";
import evVechileTwo from "../../assets/ev-vechile-2.png";
import evVechileThree from "../../assets/ev-vechile-3.png";
import evVechileFour from "../../assets/ev-vechile-4.png";
import evVechileFive from "../../assets/ev-vechile-5.png";
import evVechileSix from "../../assets/ev-vechile-6.png";

// ============================================
// WHATSAPP SETTINGS
// ============================================

const WHATSAPP_NUMBER = "918328982394"; // country code + number, digits only
const WHATSAPP_DISPLAY = "+91 83289 82394";
const GENERAL_MESSAGE =
  "Hello Bhitarakanika Boat Service! I would like to know about electric vehicle (EV cart) availability for my Bhitarkanika visit.";

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
    className="EVVechile__icon"
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
  <svg className="EVVechile__waIcon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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

const heroStats = [
  { value: "100%", label: "Electric, zero emission" },
  { value: "15 km/h", label: "Wildlife-safe speed limit" },
  { value: "4 – 8", label: "Seater cart options" },
  { value: "1.5 – 2 hrs", label: "Island EV circuit" },
];

const PICKUP_OPTIONS = [
  "Khola Gate Parking (Shuttle to Boat Jetty)",
  "Dangmal Island Pier (Core Sanctuary Safari)",
  "Dangmal Forest Resthouse Hub",
];

const GUEST_OPTIONS = [
  "1–4 Persons (Standard 4-Seater Cart)",
  "5–6 Persons (Mid-Size 6-Seater Cart)",
  "7–8 Persons (Large 8-Seater Cart)",
  "9+ Persons (Multiple Carts / Group Shuttle)",
];

const SERVICE_OPTIONS = [
  "Dangmal Core Island EV Safari Circuit (2 hrs)",
  "Khola Gate Parking to Boat Jetty Shuttle Transfer",
  "Full Day Boat Safari + Dangmal Island EV Combo",
  "Senior Citizen Assisted Relaxed-Pace Green Tour",
];

const evPackages = [
  {
    tag: "MOST POPULAR",
    title: "Dangmal Island Complete EV Circuit",
    route:
      "Dangmal Forest Ghat → Skywalk Boardwalk → Crocodile Enclosure → Interpretation Center",
    duration: "1.5 to 2 Hours",
    highlights:
      "Silent, zero-noise electric cart tour across Dangmal’s core attractions, deer glades, and heritage structures with zero carbon emissions.",
    capacity: "Eco Golf Carts (4 / 6 / 8 Seater Configurations)",
    pickup: PICKUP_OPTIONS[1],
    service: SERVICE_OPTIONS[0],
  },
  {
    tag: "JETTY CONNECTIVITY",
    title: "Khola Gate to Jetty EV Shuttle Transfer",
    route: "Khola Forest Checkpoint Parking → Khola River Boarding Ghat",
    duration: "Continuous On-Demand Shuttle (15 Minutes)",
    highlights:
      "Comfortable luggage and passenger transit from the forest entry parking area directly to Bhitarakanika Boat Service boarding piers.",
    capacity: "Shuttle Van & Cart Options (Up to 12 Passengers)",
    pickup: PICKUP_OPTIONS[0],
    service: SERVICE_OPTIONS[1],
  },
  {
    tag: "ACCESSIBLE NATURE",
    title: "Senior Citizen & Assisted Green Tour",
    route: "Customised Dangmal Trail covering watchtowers and nursery glades",
    duration: "2 Hours (Relaxed Pace)",
    highlights:
      "Wheelchair-friendly boarding, step-free access, and a certified eco-naturalist onboard for effortless wildlife observation.",
    capacity: "Private Custom Cart with Dedicated Driver & Guide",
    pickup: PICKUP_OPTIONS[2],
    service: SERVICE_OPTIONS[3],
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

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  travelDate: "",
  pickupLocation: PICKUP_OPTIONS[0],
  guests: GUEST_OPTIONS[0],
  service: SERVICE_OPTIONS[0],
  notes: "",
};

const buildBookingMessage = (d) =>
  [
    "Hello Bhitarakanika Boat Service! I would like to book an electric vehicle (EV cart).",
    "",
    `Name: ${d.name}`,
    `Mobile: ${d.phone}`,
    `Email: ${d.email}`,
    `Visit date: ${formatDate(d.travelDate)}`,
    `Service: ${d.service}`,
    `Pickup location: ${d.pickupLocation}`,
    `Passengers: ${d.guests}`,
    d.notes ? `Notes: ${d.notes}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");

// ============================================
// COMPONENT
// ============================================

const EVVechile = () => {
  const [activeTab, setActiveTab] = useState("ev-rides");
  const [activeImage, setActiveImage] = useState(null);
  const [faqIndex, setFaqIndex] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(null); // holds the sent form data

  const scrollToTop = () => {
    document.getElementById("ev-vechile-services")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "route-guide") setFaqIndex(0);
    if (tabId === "book-ev") setSubmitted(null);
    scrollToTop();
  };

  // "Book" button on a package card: open the form with that package filled in
  const handleBookPackage = (pkg) => {
    setForm((prev) => ({
      ...prev,
      pickupLocation: pkg.pickup,
      service: pkg.service,
    }));
    handleTabChange("book-ev");
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
                Experience sustainable, whisper-quiet travel through Bhitarkanika
                National Park with Bhitarakanika Boat Service. Our fleet of 100%
                electric, zero-emission safari carts and jetty shuttles provide
                clean, noise-free mobility from entry terminals to core mangrove
                nature trails, protecting fragile wildlife habitats.
              </p>

              <figure className="EVVechile__heroFigure">
                <img
                  className="EVVechile__heroImage"
                  src={evVechileOne}
                  alt="Silent electric safari vehicle driving through the green corridors of Bhitarkanika"
                />

                <span className="EVVechile__heroChip">
                  <Icon name="pin" /> Khola · Dangmal · Skywalk
                </span>

                <figcaption className="EVVechile__heroCaption">
                  <span className="EVVechile__heroCaptionDot" />
                  <span>
                    Bhitarakanika Boat Service • 100% Electric, Zero-Noise Eco
                    Transport
                  </span>
                </figcaption>
              </figure>

              <div className="EVVechile__stats">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="EVVechile__stat">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* HIGHLIGHT PILLARS */}
              <div className="EVVechile__featureGrid">
                <div className="EVVechile__specBox">
                  <span className="EVVechile__specNum">01</span>
                  <h3>Silent Green Motion</h3>
                  <p>
                    Zero acoustic pollution allows vehicles to glide close to
                    spotted deer, monitor lizards, and birds without triggering
                    panic or flight.
                  </p>
                </div>

                <div className="EVVechile__specBox">
                  <span className="EVVechile__specNum">02</span>
                  <h3>Clean Air Biosphere</h3>
                  <p>
                    Completely battery-powered mobility helping safeguard
                    sensitive mangrove air quality and pristine wetland
                    ecosystems.
                  </p>
                </div>

                <div className="EVVechile__specBox">
                  <span className="EVVechile__specNum">03</span>
                  <h3>Accessible & Family Friendly</h3>
                  <p>
                    Designed with low step-in heights and open-air visibility,
                    making island exploration effortless for seniors, children,
                    and photography enthusiasts.
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
                        <span>
                          <Icon name="clock" /> {pkg.duration}
                        </span>
                        <span>
                          <Icon name="users" /> {pkg.capacity}
                        </span>
                      </div>

                      <p className="EVVechile__packageDesc">{pkg.highlights}</p>

                      <div className="EVVechile__packageActions">
                        <button
                          type="button"
                          className="EVVechile__pkgBtn"
                          onClick={() => handleBookPackage(pkg)}
                        >
                          Book This EV Service ↗
                        </button>

                        <WhatsAppLink
                          className="EVVechile__pkgBtn EVVechile__pkgBtn--wa"
                          message={`Hello Bhitarakanika Boat Service! I'm interested in the "${pkg.title}". Please share availability and pricing.`}
                        >
                          <WaIcon /> Ask on WhatsApp
                        </WhatsAppLink>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="EVVechile__actionBanner">
                <div>
                  <h3>Need Silent EV Transport for Your Bhitarkanika Tour?</h3>
                  <p>
                    Pre-reserve your electric cart alongside your safari boat
                    with Bhitarakanika Boat Service for synchronized jetty
                    transfers and Dangmal Island circuits.
                  </p>
                </div>

                <div className="EVVechile__bannerActions">
                  <button
                    type="button"
                    className="EVVechile__btnPrimary"
                    onClick={() => handleTabChange("book-ev")}
                  >
                    Reserve EV Vehicle ↗
                  </button>
                  <WhatsAppLink className="EVVechile__btnWhatsApp">
                    <WaIcon /> Chat on WhatsApp
                  </WhatsAppLink>
                </div>
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
                Learn how electric vehicles operate across Bhitarkanika, where
                charging depots and boarding hubs are located, and how to combine
                rides with boat safaris.
              </p>

              <div className="EVVechile__planAccordion">
                {evFAQs.map((item, index) => {
                  const isOpen = faqIndex === index;

                  return (
                    <div
                      key={item.q}
                      className={`EVVechile__planItem ${isOpen ? "is-open" : ""}`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        className="EVVechile__planTrigger"
                        onClick={() => setFaqIndex(isOpen ? -1 : index)}
                      >
                        <span className="EVVechile__planIndex">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="EVVechile__planQuestion">{item.q}</span>
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
                    <strong>Khola Gate Shuttle Point:</strong> Operating
                    continuously from the main vehicle parking zone to the Khola
                    boat boarding ghat, facilitating smooth transfers for
                    families and heavy camera luggage.
                  </li>

                  <li>
                    <strong>Dangmal Island Circuit:</strong> Electric carts
                    station right at the Dangmal Forest Pier, connecting
                    passengers directly to the elevated Skywalk, crocodile
                    enclosures, and the Nature Interpretation Center.
                  </li>

                  <li>
                    <strong>Strict Speed Limits:</strong> All electric safari
                    vehicles are speed-governed to a maximum of 15 km/h to
                    guarantee complete pedestrian and wildlife safety on unpaved
                    forest paths.
                  </li>
                </ul>

                <p className="EVVechile__routeNote">
                  <strong>Breeding Season Notice:</strong> Forest areas follow
                  general sanctuary closures annually from{" "}
                  <strong>May 1 to July 31</strong> during the saltwater
                  crocodile breeding season. EV operations continue normally from
                  October through April.
                </p>
              </div>

              <div className="EVVechile__actionBanner">
                <div>
                  <h3>Arranging Transport for Senior Citizens or Large Groups?</h3>
                  <p>
                    Speak directly with Bhitarakanika Boat Service dispatchers to
                    block dedicated multi-seater electric carts and assisted
                    boarding support.
                  </p>
                </div>

                <div className="EVVechile__bannerActions">
                  <button
                    type="button"
                    className="EVVechile__btnPrimary"
                    onClick={() => handleTabChange("book-ev")}
                  >
                    Send EV Inquiry ↗
                  </button>
                  <WhatsAppLink
                    className="EVVechile__btnWhatsApp"
                    message="Hello Bhitarakanika Boat Service! I need EV cart support for senior citizens / a large group. Please share details."
                  >
                    <WaIcon /> Chat on WhatsApp
                  </WhatsAppLink>
                </div>
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
                Submit your expected visit date and party details. Bhitarakanika
                Boat Service will coordinate vehicle availability with your boat
                safari arrival, allocate a dedicated driver and naturalist, and
                confirm on WhatsApp.
              </p>

              {submitted ? (
                <div className="EVVechile__formSuccess">
                  <span className="EVVechile__checkIcon">✓</span>

                  <h3>One last step, {submitted.name.split(" ")[0]}!</h3>

                  <p>
                    Your EV booking request is ready. Send it to Bhitarakanika
                    Boat Service on WhatsApp so our dispatch team can confirm cart
                    slots, timings and pickup for your date.
                  </p>

                  <dl className="EVVechile__summary">
                    <div>
                      <dt>Visit date</dt>
                      <dd>{formatDate(submitted.travelDate)}</dd>
                    </div>
                    <div>
                      <dt>Pickup location</dt>
                      <dd>{submitted.pickupLocation}</dd>
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

                  <div className="EVVechile__successActions">
                    <WhatsAppLink
                      className="EVVechile__btnWhatsApp EVVechile__btnWhatsApp--large"
                      message={buildBookingMessage(submitted)}
                    >
                      <WaIcon /> Send Request on WhatsApp
                    </WhatsAppLink>

                    <button
                      type="button"
                      className="EVVechile__btnGhost"
                      onClick={handleNewRequest}
                    >
                      New Booking Request
                    </button>
                  </div>
                </div>
              ) : (
                <form className="EVVechile__form" onSubmit={handleSubmit}>
                  <div className="EVVechile__formHeading">
                    <span>BHITARAKANIKA BOAT SERVICE</span>
                    <h3>Electric Vehicle Booking Form</h3>
                    <p>Please provide your travel details for vehicle scheduling (*).</p>
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
                        value={form.name}
                        onChange={updateField}
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
                        value={form.email}
                        onChange={updateField}
                        required
                      />
                    </div>

                    <div className="EVVechile__inputGroup">
                      <label htmlFor="EVVechile-phone">
                        WhatsApp / Mobile Number *
                      </label>
                      <input
                        id="EVVechile-phone"
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

                    <div className="EVVechile__inputGroup">
                      <label htmlFor="EVVechile-date">Expected Visit Date *</label>
                      <input
                        id="EVVechile-date"
                        name="travelDate"
                        type="date"
                        min={todayISO()}
                        value={form.travelDate}
                        onChange={updateField}
                        required
                      />
                    </div>

                    <div className="EVVechile__inputGroup">
                      <label htmlFor="EVVechile-pickupLocation">Pickup Location</label>
                      <select
                        id="EVVechile-pickupLocation"
                        name="pickupLocation"
                        value={form.pickupLocation}
                        onChange={updateField}
                      >
                        {PICKUP_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="EVVechile__inputGroup">
                      <label htmlFor="EVVechile-guests">Number of Passengers</label>
                      <select
                        id="EVVechile-guests"
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

                    <div className="EVVechile__inputGroup EVVechile__inputGroup--full">
                      <label htmlFor="EVVechile-service">Select EV Service Package</label>
                      <select
                        id="EVVechile-service"
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

                    <div className="EVVechile__inputGroup EVVechile__inputGroup--full">
                      <label htmlFor="EVVechile-notes">
                        Special Requirements / Accessibility Needs
                      </label>
                      <textarea
                        id="EVVechile-notes"
                        name="notes"
                        rows="4"
                        placeholder="Let Bhitarakanika Boat Service know if anyone requires wheelchair boarding assistance, child seats, luggage space, or a dedicated eco-guide..."
                        value={form.notes}
                        onChange={updateField}
                      />
                    </div>
                  </div>

                  <button type="submit" className="EVVechile__submitBtn">
                    Continue to Confirm on WhatsApp ↗
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
                Browse photographs of our electric safari carts and shuttle
                vehicles operating across the lush corridors and jetty points of
                Bhitarkanika. Tap any image to view it full screen with location
                details.
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

          {/* SUPPORT CARD → WHATSAPP */}
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
              EV carts connect with daily boat safari schedules. Message our
              dispatch desk for real-time cart availability and assisted boarding
              support.
            </p>

            <WhatsAppLink className="EVVechile__supportWa">
              <span className="EVVechile__waBadge">
                <WaIcon />
              </span>
              <span className="EVVechile__waText">
                <strong>Connect with Dispatch Desk</strong>
                <small>Chat on WhatsApp · {WHATSAPP_DISPLAY}</small>
              </span>
              <span className="EVVechile__waArrow" aria-hidden="true">
                ↗
              </span>
            </WhatsAppLink>
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

          {/* CONTACT INFORMATION */}
          <div className="EVVechile__sideBox EVVechile__contactBox">
            <div className="EVVechile__sideTitle">
              <span />
              <h2>Bhitarakanika Boat Service</h2>
            </div>

            <div className="EVVechile__contactInfo">
              <span className="EVVechile__contactInfoIcon">
                <Icon name="pin" />
              </span>
              <div>
                <strong>Primary Dispatch & Jetty Point</strong>
                <p>
                  Khola Entry Ghat, Rajnagar Block, Kendrapara District, Odisha
                  754225
                </p>
              </div>
            </div>

            <div className="EVVechile__contactInfo">
              <span className="EVVechile__contactInfoIcon EVVechile__contactInfoIcon--wa">
                <WaIcon />
              </span>
              <div>
                <strong>Dispatch Desk WhatsApp</strong>
                <WhatsAppLink>{WHATSAPP_DISPLAY}</WhatsAppLink>
              </div>
            </div>

            <div className="EVVechile__contactInfo">
              <span className="EVVechile__contactInfoIcon">
                <Icon name="mail" />
              </span>
              <div>
                <strong>EV Mobility Inquiries</strong>
                <a href="mailto:safari@bhitarakanikaboatservice.com">
                  safari@bhitarakanikaboatservice.com
                </a>
              </div>
            </div>

            <div className="EVVechile__contactInfo">
              <span className="EVVechile__contactInfoIcon">
                <Icon name="clock" />
              </span>
              <div>
                <strong>Operating Hours</strong>
                <p>6:30 AM to 5:00 PM (Sunset Clearance Strictly Enforced)</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FULLSCREEN GALLERY LIGHTBOX */}
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
                <small>
                  <Icon name="pin" /> {galleryImages[activeImage].location}
                </small>
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
                    (activeImage - 1 + galleryImages.length) % galleryImages.length
                  )
                }
                aria-label="Previous photograph"
              >
                ← Previous
              </button>

              <WhatsAppLink
                className="EVVechile__lightboxWa"
                message={`Hello Bhitarakanika Boat Service! I liked "${galleryImages[activeImage].title}" (${galleryImages[activeImage].location}). Can I book an EV cart for this route?`}
              >
                <WaIcon /> Book this route
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

export default EVVechile;
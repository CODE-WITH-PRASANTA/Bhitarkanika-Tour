import React, { useEffect, useState } from "react";
import "./JungleTrakking.css";
import jungleTrakkingOne from "../../assets/JungleTrakking-1.png";
import jungleTrakkingTwo from "../../assets/JungleTrakking-2.png";
import jungleTrakkingThree from "../../assets/JungleTrakking-3.png";
import jungleTrakkingFour from "../../assets/JungleTrakking-4.png";
import jungleTrakkingFive from "../../assets/JungleTrakking-5.png";
import jungleTrakkingSix from "../../assets/JungleTrakking-6.png";

const galleryImages = [
  {
    src: jungleTrakkingOne,
    title: "Guided Mangrove Jungle Trail",
    location: "Dangmal Core Wilderness Circuit",
    category: "Forest Trek",
  },
  {
    src: jungleTrakkingTwo,
    title: "Ancient Sundari & Hental Canopy Path",
    location: "Bhitarkanika Old Forest Route",
    category: "Flora Trekking",
  },
  {
    src: jungleTrakkingThree,
    title: "Watchtower Glade Overlook",
    location: "Dangmal Island Meadow",
    category: "Wildlife Trail",
  },
  {
    src: jungleTrakkingFour,
    title: "Tidal Creek Buffer Trail",
    location: "Suajore Creek Shoreline",
    category: "Creek Trek",
  },
  {
    src: jungleTrakkingFive,
    title: "Historical Hunting Tower & Ruins",
    location: "Kanika King Heritage Trail",
    category: "Heritage Circuit",
  },
  {
    src: jungleTrakkingSix,
    title: "Coastal Sandbar & Casuarina Trek",
    location: "Habalikhati Beach Trail",
    category: "Coastal Wilderness",
  },
];

const navTabs = [
  { id: "jungle-treks", label: "Guided Jungle Treks" },
  { id: "trek-guide", label: "Trail Rules & Guide" },
  { id: "book-trek", label: "Book Jungle Trek" },
  { id: "trek-gallery", label: "Wilderness Gallery" },
];

const trekPackages = [
  {
    tag: "MOST POPULAR",
    title: "Dangmal Core Mangrove Circuit",
    route: "Dangmal Jetty → Ancient Hunting Tower → Forest Canopy Loop → Crocodile Enclosure",
    duration: "2.5 to 3 Hours",
    highlights:
      "Trek through thickets of Sundari and Phoenix paludosa, spot spotted deer, wild boars, monitor lizards, and native kingfishers with forest naturalists.",
    capacity: "Small Groups (Up to 6–10 Trekkers per Guide)",
  },
  {
    tag: "COASTAL EXPEDITION",
    title: "Habalikhati Beach & Mangrove Trail",
    route: "Habalikhati Forest Jetty → Casuarina Groves → Coastal Dune Walk → Habalikhati Shore",
    duration: "3.5 to 4 Hours",
    highlights:
      "A scenic trek traversing dense coastal buffer jungle, pristine secluded beaches, and natural creeks frequented by marine shorebirds and raptors.",
    capacity: "Accompanied by Armed Forest Guard & Eco-Guide",
  },
  {
    tag: "HERITAGE & BOTANY",
    title: "Old Kanika Palace & Delta Trail",
    route: "Dangmal Ghat → Ancient Hunting Lodge Ruins → Sacred Lotus Pond → Core Watchtower",
    duration: "2 to 2.5 Hours",
    highlights:
      "Explore historical remnants of the Kanika Royal Dynasty, identify 30+ true mangrove associates, and observe raptor nesting canopies.",
    capacity: "Private Custom Group with Senior Forest Naturalist",
  },
];

const trekkingFAQs = [
  {
    q: "Are independent, unguided treks permitted inside Bhitarkanika National Park?",
    a: "No. Solo and unguided walking inside the sanctuary is strictly prohibited due to active populations of giant saltwater crocodiles, wild boars, and venomous snakes. All jungle treks must be accompanied by licensed Forest Department guides arranged via Bhitarakanika Boat Service.",
  },
  {
    q: "How do trekkers reach the starting points of the jungle trails?",
    a: "The most popular nature trails are located on Dangmal Island and Habalikhati. Guests board forest-authorized vessels operated by Bhitarakanika Boat Service at Khola or Gupti jetty, cruising across scenic waterways directly to the trailheads.",
  },
  {
    q: "What footwear and gear are required for jungle trekking?",
    a: "Sturdy, closed-toe walking shoes or light hiking boots are mandatory. Long breathable trousers, earth-tone clothing (olive, khaki, brown), mosquito repellent, drinking water, and binoculars are strongly recommended.",
  },
  {
    q: "Are the jungle trails suitable for children and senior citizens?",
    a: "Yes. The primary Dangmal forest circuit features flat terrain and designated wooden boardwalk sections suitable for visitors of average fitness. Alternative easy-paced nature walks can be organized upon request.",
  },
  {
    q: "What season is optimal for jungle trekking in Bhitarkanika?",
    a: "The best months are from October through March when humidity is low, migratory birds are active, and forest trails remain dry. The core sanctuary is completely closed annually from May 1 to July 31 for the crocodile breeding season.",
  },
];

const JungleTrakking = () => {
  const [activeTab, setActiveTab] = useState("jungle-treks");
  const [activeImage, setActiveImage] = useState(null);
  const [faqIndex, setFaqIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    if (tabId === "trek-guide") {
      setFaqIndex(0);
    }

    if (tabId === "book-trek") {
      setFormSubmitted(false);
    }

    document.getElementById("jungle-trakking")?.scrollIntoView({
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
    <section className="JungleTrakking" id="jungle-trakking">
      <div className="JungleTrakking__layout">
        {/* MAIN CONTENT */}
        <main className="JungleTrakking__main" key={activeTab}>
          {/* 1. JUNGLE TREKS OVERVIEW */}
          {activeTab === "jungle-treks" && (
            <div className="JungleTrakking__viewPane">
              <div className="JungleTrakking__eyebrow">
                <span className="JungleTrakking__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • ECO TRAILS & TREKKING</span>
              </div>

              <h1 className="JungleTrakking__pageTitle">
                Guided Jungle Trekking <span>Through Primeval Mangrove Trails.</span>
              </h1>

              <p className="JungleTrakking__lead">
                Step off the boat and journey into the heart of India’s second largest
                mangrove biosphere with Bhitarakanika Boat Service. Led by certified
                forest naturalists and local trackers, explore winding dirt circuits,
                centuries-old hunting lodge ruins, deer grazing glades, and coastal forest
                paths that reveal the untamed wilderness of Bhitarkanika.
              </p>

              <figure className="JungleTrakking__heroFigure">
                <img
                  className="JungleTrakking__heroImage"
                  src={jungleTrakkingOne}
                  alt="Guided nature trail and jungle trekking in Bhitarkanika National Park"
                />

                <figcaption className="JungleTrakking__heroCaption">
                  <span className="JungleTrakking__heroCaptionDot" />
                  <span>
                    Bhitarakanika Boat Service • Forest Department Certified Trackers & Guides
                  </span>
                </figcaption>
              </figure>

              {/* HIGHLIGHT PILLARS */}
              <div className="JungleTrakking__featureGrid">
                <div className="JungleTrakking__specBox">
                  <span className="JungleTrakking__specNum">01</span>
                  <h3>Certified Naturalists</h3>
                  <p>
                    Every walking group is led by an experienced local eco-guide trained to
                    read tracks, spot camouflaged fauna, and maintain strict forest safety.
                  </p>
                </div>

                <div className="JungleTrakking__specBox">
                  <span className="JungleTrakking__specNum">02</span>
                  <h3>Boat & Trail Transfers</h3>
                  <p>
                    Seamless motorboat connections departing from Khola and Gupti entry
                    jetties deliver trekkers directly to core forest walking trailheads.
                  </p>
                </div>

                <div className="JungleTrakking__specBox">
                  <span className="JungleTrakking__specNum">03</span>
                  <h3>Rich Wildlife Sightings</h3>
                  <p>
                    Walk along natural clearings populated by herds of spotted deer, wild
                    boars, monitor lizards, tree-dwelling crabs, and exotic kingfishers.
                  </p>
                </div>
              </div>

              {/* TREK PACKAGES */}
              <div className="JungleTrakking__packageSection">
                <div className="JungleTrakking__subHeader">
                  <span>CURATED FOREST EXPEDITIONS</span>
                  <h2>Featured Bhitarkanika Trekking Circuits</h2>
                </div>

                <div className="JungleTrakking__packageGrid">
                  {trekPackages.map((pkg) => (
                    <div key={pkg.title} className="JungleTrakking__packageCard">
                      <span className="JungleTrakking__packageTag">{pkg.tag}</span>
                      <h3>{pkg.title}</h3>
                      <p className="JungleTrakking__packageRoute">
                        <strong>Circuit:</strong> {pkg.route}
                      </p>
                      <div className="JungleTrakking__packageMeta">
                        <span>⏱ {pkg.duration}</span>
                        <span>👥 {pkg.capacity}</span>
                      </div>
                      <p className="JungleTrakking__packageDesc">
                        {pkg.highlights}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="JungleTrakking__actionBanner">
                <div>
                  <h3>Ready for a Wilderness Trek with Bhitarakanika Boat Service?</h3>
                  <p>
                    Pre-book your boat transfer and forest trekking permits early to secure
                    experienced naturalists during peak morning and winter safari slots.
                  </p>
                </div>

                <button
                  type="button"
                  className="JungleTrakking__btnPrimary"
                  onClick={() => handleTabChange("book-trek")}
                >
                  Reserve Jungle Trek ↗
                </button>
              </div>
            </div>
          )}

          {/* 2. TRAIL RULES & GUIDE */}
          {activeTab === "trek-guide" && (
            <div className="JungleTrakking__viewPane">
              <div className="JungleTrakking__eyebrow">
                <span className="JungleTrakking__eyebrowLine" />
                <span>EXPEDITION SAFETY & TRAIL LOGISTICS</span>
              </div>

              <h1 className="JungleTrakking__pageTitle">
                Everything Required <span>To Trek Safely in Bhitarkanika.</span>
              </h1>

              <p className="JungleTrakking__lead">
                Ensure a safe and responsible walking safari across Bhitarkanika with
                essential field rules, clothing recommendations, permit protocols, and timing.
              </p>

              <div className="JungleTrakking__planAccordion">
                {trekkingFAQs.map((item, index) => {
                  const isOpen = faqIndex === index;

                  return (
                    <div
                      key={item.q}
                      className={`JungleTrakking__planItem ${
                        isOpen ? "is-open" : ""
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        className="JungleTrakking__planTrigger"
                        onClick={() => setFaqIndex(isOpen ? -1 : index)}
                      >
                        <span>
                          {String(index + 1).padStart(2, "0")}. {item.q}
                        </span>

                        <span className="JungleTrakking__planToggle">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <p className="JungleTrakking__planAnswer">{item.a}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="JungleTrakking__routeBox">
                <h3>Sanctuary Trekking Protocol & Safety Directives</h3>

                <ul>
                  <li>
                    <strong>Stay on Marked Pathways:</strong> Never wander off the designated
                    cleared paths. The mangrove undergrowth contains concealed mud holes,
                    breathing pneumatophore spikes, and active reptile habitats.
                  </li>

                  <li>
                    <strong>Maintain Strict Silence:</strong> Keep voices low to avoid
                    startling spotted deer and to hear bird calls, alarm barks, and guide instructions.
                  </li>

                  <li>
                    <strong>No Plastic & Zero Waste:</strong> Bhitarkanika is a strictly enforced
                    no-plastic zone. Trekkers must carry non-disposable water bottles and carry all
                    belongings back out.
                  </li>

                  <li>
                    <strong>Safe Crocodile Distance:</strong> Never approach muddy creek banks or
                    water edges on foot. Saltwater crocodiles ambush from underwater shelves.
                  </li>
                </ul>

                <p className="JungleTrakking__routeNote">
                  <strong>Annual Park Closure:</strong> All trekking trails and boat safaris are
                  strictly closed between <strong>May 1 and July 31</strong> every year during
                  the saltwater crocodile nesting and breeding season.
                </p>
              </div>

              <div className="JungleTrakking__actionBanner">
                <div>
                  <h3>Have Photography, Birding, or Group Inquiries?</h3>
                  <p>
                    Speak with Bhitarakanika Boat Service coordinators for custom sunrise
                    walking trails, photography paces, and student nature study camps.
                  </p>
                </div>

                <button
                  type="button"
                  className="JungleTrakking__btnPrimary"
                  onClick={() => handleTabChange("book-trek")}
                >
                  Send Trek Inquiry ↗
                </button>
              </div>
            </div>
          )}

          {/* 3. BOOK JUNGLE TREK */}
          {activeTab === "book-trek" && (
            <div className="JungleTrakking__viewPane">
              <div className="JungleTrakking__eyebrow">
                <span className="JungleTrakking__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • EXPEDITION REGISTRATION</span>
              </div>

              <h1 className="JungleTrakking__pageTitle">
                Reserve Your Guided <span>Jungle Trek in Bhitarkanika.</span>
              </h1>

              <p className="JungleTrakking__lead">
                Submit your target trekking dates and party details. Bhitarakanika Boat Service
                will coordinate forest gate manifests, boat transfers, and assign licensed
                eco-guides for your excursion.
              </p>

              {formSubmitted ? (
                <div className="JungleTrakking__formSuccess">
                  <span className="JungleTrakking__checkIcon">✓</span>

                  <h3>Trekking Request Received!</h3>

                  <p>
                    Your jungle trekking inquiry has been logged with Bhitarakanika Boat Service.
                    Our desk will review boat transit timings, organize Forest Department trail
                    permits, and contact you with confirmation details.
                  </p>

                  <button
                    type="button"
                    className="JungleTrakking__btnPrimary"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Submit Another Booking Request
                  </button>
                </div>
              ) : (
                <form
                  className="JungleTrakking__form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setFormSubmitted(true);
                  }}
                >
                  <div className="JungleTrakking__formHeading">
                    <span>BHITARAKANIKA BOAT SERVICE</span>
                    <h3>Jungle Trek Booking Form</h3>
                    <p>
                      Mandatory fields for Forest Department passenger permits (*).
                    </p>
                  </div>

                  <div className="JungleTrakking__formGrid">
                    <div className="JungleTrakking__inputGroup">
                      <label htmlFor="JungleTrakking-name">
                        Lead Trekker Name *
                      </label>
                      <input
                        id="JungleTrakking-name"
                        name="name"
                        type="text"
                        placeholder="e.g. Debashis Mohapatra"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="JungleTrakking__inputGroup">
                      <label htmlFor="JungleTrakking-email">Email Address *</label>
                      <input
                        id="JungleTrakking-email"
                        name="email"
                        type="email"
                        placeholder="debashis@example.com"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="JungleTrakking__inputGroup">
                      <label htmlFor="JungleTrakking-phone">
                        WhatsApp / Contact Number *
                      </label>
                      <input
                        id="JungleTrakking-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 94370 XXXXX"
                        autoComplete="tel"
                        required
                      />
                    </div>

                    <div className="JungleTrakking__inputGroup">
                      <label htmlFor="JungleTrakking-date">
                        Expected Trek Date *
                      </label>
                      <input
                        id="JungleTrakking-date"
                        name="travelDate"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    <div className="JungleTrakking__inputGroup">
                      <label htmlFor="JungleTrakking-entryGate">
                        Preferred Boarding Jetty
                      </label>
                      <select
                        id="JungleTrakking-entryGate"
                        name="entryGate"
                        defaultValue="Khola Gate (Direct Cruise to Dangmal Trailhead)"
                      >
                        <option value="Khola Gate (Direct Cruise to Dangmal Trailhead)">
                          Khola Gate (Direct Cruise to Dangmal Trailhead)
                        </option>
                        <option value="Gupti Gate (Access to Habalikhati Coastal Trail)">
                          Gupti Gate (Access to Habalikhati Coastal Trail)
                        </option>
                        <option value="Chandbali Ghat (River Approach)">
                          Chandbali Ghat (River Approach)
                        </option>
                      </select>
                    </div>

                    <div className="JungleTrakking__inputGroup">
                      <label htmlFor="JungleTrakking-guests">
                        Number of Trekkers
                      </label>
                      <select
                        id="JungleTrakking-guests"
                        name="guests"
                        defaultValue="1–4 Persons (Private Small Group + Guide)"
                      >
                        <option value="1–4 Persons (Private Small Group + Guide)">
                          1–4 Persons (Private Small Group + Guide)
                        </option>
                        <option value="5–8 Persons (Standard Group Trek)">
                          5–8 Persons (Standard Group Trek)
                        </option>
                        <option value="9–14 Persons (Nature Club / Family Group)">
                          9–14 Persons (Nature Club / Family Group)
                        </option>
                        <option value="15+ Persons (School / College Group)">
                          15+ Persons (School / College Group)
                        </option>
                      </select>
                    </div>

                    <div className="JungleTrakking__inputGroup JungleTrakking__inputGroup--full">
                      <label htmlFor="JungleTrakking-service">
                        Select Trekking Circuit
                      </label>
                      <select
                        id="JungleTrakking-service"
                        name="service"
                        defaultValue="Dangmal Core Mangrove Circuit (2.5 - 3 hrs)"
                      >
                        <option value="Dangmal Core Mangrove Circuit (2.5 - 3 hrs)">
                          Dangmal Core Mangrove Circuit (2.5 - 3 hrs)
                        </option>
                        <option value="Habalikhati Beach & Coastal Jungle Trail (4 hrs)">
                          Habalikhati Beach & Coastal Jungle Trail (4 hrs)
                        </option>
                        <option value="Boat Safari + Dangmal Heritage Walking Combo (5 hrs)">
                          Boat Safari + Dangmal Heritage Walking Combo (5 hrs)
                        </option>
                        <option value="Dawn Birding & Macro Botany Trek (Custom Timing)">
                          Dawn Birding & Macro Botany Trek (Custom Timing)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="JungleTrakking__inputGroup">
                    <label htmlFor="JungleTrakking-notes">
                      Special Requirements / Fitness Notes
                    </label>
                    <textarea
                      id="JungleTrakking-notes"
                      name="notes"
                      rows="4"
                      placeholder="Let Bhitarakanika Boat Service know if anyone requires an easy-pace walking option, spotting binoculars, senior citizen assistance, or cottage stay reservations..."
                    />
                  </div>

                  <button type="submit" className="JungleTrakking__submitBtn">
                    Submit Trek Booking Request ↗
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 4. TREK GALLERY */}
          {activeTab === "trek-gallery" && (
            <div className="JungleTrakking__viewPane">
              <div className="JungleTrakking__eyebrow">
                <span className="JungleTrakking__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • TRAIL ARCHIVE</span>
              </div>

              <h1 className="JungleTrakking__pageTitle">
                Glimpses Along the <span>Forest Pathways.</span>
              </h1>

              <p className="JungleTrakking__lead">
                Explore photographs from guided treks through the ancient mangrove
                stands, elevated boardwalks, and coastal dunes of Bhitarkanika. Click any
                image to view full-screen details.
              </p>

              <div className="JungleTrakking__galleryPageGrid">
                {galleryImages.map((img, index) => (
                  <button
                    key={`${img.title}-${index}`}
                    type="button"
                    className="JungleTrakking__galleryPageCard"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View ${img.title}`}
                  >
                    <img src={img.src} alt={img.title} loading="lazy" />

                    <span className="JungleTrakking__galleryCardOverlay">
                      <span>{img.category}</span>
                      <span className="JungleTrakking__galleryCardTitle">
                        {img.title}
                      </span>
                      <span className="JungleTrakking__galleryLocation">
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
        <aside className="JungleTrakking__sidebar">
          {/* NAVIGATION */}
          <div className="JungleTrakking__sideBox">
            <div className="JungleTrakking__sideTitle">
              <span />
              <h2>Explore Trek Desk</h2>
            </div>

            <nav
              className="JungleTrakking__serviceNav"
              aria-label="Explore jungle trekking services"
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
                    <span className="JungleTrakking__navArrow">↗</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* SUPPORT CARD */}
          <div className="JungleTrakking__supportCard">
            <div className="JungleTrakking__supportIcon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L4 9v11h6v-6h4v6h6V9l-8-7z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="JungleTrakking__supportHeading">
              <span>BHITARAKANIKA BOAT SERVICE</span>
              <h3>Need Trek Advice?</h3>
            </div>

            <p>
              Tidal levels dictate boat transit times to the island trailheads. Speak
              directly with our dock managers for today's tide charts and certified naturalist allocations.
            </p>

            <button
              type="button"
              className="JungleTrakking__supportLink"
              onClick={() => handleTabChange("book-trek")}
            >
              <span>Connect with Jetty Desk</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          {/* QUICK LINKS */}
          <div className="JungleTrakking__sideBox JungleTrakking__downloads">
            <div className="JungleTrakking__sideTitle">
              <span />
              <h2>Sanctuary Quick Links</h2>
            </div>

            <div className="JungleTrakking__downloadGrid">
              <button
                type="button"
                className={activeTab === "jungle-treks" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("jungle-treks")}
              >
                <span className="JungleTrakking__downloadIcon">01</span>
                <strong>Trail Circuits</strong>
                <small>View routes ↗</small>
              </button>

              <button
                type="button"
                className={activeTab === "trek-guide" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("trek-guide")}
              >
                <span className="JungleTrakking__downloadIcon">02</span>
                <strong>Safety Rules</strong>
                <small>Read guidelines ↗</small>
              </button>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="JungleTrakking__sideBox JungleTrakking__contactBox">
            <div className="JungleTrakking__sideTitle">
              <span />
              <h2>Bhitarakanika Boat Service</h2>
            </div>

            <div className="JungleTrakking__contactInfo">
              <span className="JungleTrakking__contactInfoIcon" aria-hidden="true">
                📍
              </span>
              <div>
                <strong>Primary Jetty Location</strong>
                <p>
                  Khola Entry Ghat, Rajnagar Block, Kendrapara District, Odisha 754225
                </p>
              </div>
            </div>

            <div className="JungleTrakking__contactInfo">
              <span className="JungleTrakking__contactInfoIcon" aria-hidden="true">
                ✉
              </span>
              <div>
                <strong>Official Trekking Inquiries</strong>
                <a href="mailto:safari@bhitarakanikaboatservice.com">
                  safari@bhitarakanikaboatservice.com
                </a>
              </div>
            </div>

            <div className="JungleTrakking__contactInfo">
              <span className="JungleTrakking__contactInfoIcon" aria-hidden="true">
                🕒
              </span>
              <div>
                <strong>Forest Gate Operating Hours</strong>
                <p>6:30 AM to 5:00 PM (Sunset Clearance Strictly Enforced)</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      {activeImage !== null && (
        <div
          className="JungleTrakking__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Jungle trekking photograph viewer"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="JungleTrakking__lightboxBox"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="JungleTrakking__lightboxClose"
              aria-label="Close image viewer"
              onClick={() => setActiveImage(null)}
            >
              ✕
            </button>

            <img
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].title}
            />

            <div className="JungleTrakking__lightboxCaption">
              <div>
                <span>{galleryImages[activeImage].category}</span>
                <h3>{galleryImages[activeImage].title}</h3>
                <small>📍 {galleryImages[activeImage].location}</small>
              </div>

              <span className="JungleTrakking__lightboxCount">
                {String(activeImage + 1).padStart(2, "0")} /{" "}
                {String(galleryImages.length).padStart(2, "0")}
              </span>
            </div>

            <div className="JungleTrakking__lightboxControls">
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

export default JungleTrakking;
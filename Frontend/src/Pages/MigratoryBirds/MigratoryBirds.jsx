import React, { useEffect, useState } from "react";
import "./MigratoryBirds.css";
import birdImgOne from "../../assets/migratory-1.jpeg";
import birdImgTwo from "../../assets/migratory-2.jpeg";
import birdImgThree from "../../assets/migratory-3.jpeg";
import birdImgFour from "../../assets/migratory-4.jpeg";
import birdImgFive from "../../assets/migratory-5.jpeg";
import birdImgSix from "../../assets/migratory-6.jpeg";

const galleryImages = [
  {
    src: birdImgOne,
    title: "Asian Openbill Stork Colony",
    location: "Bagagahana Heronry Core",
    category: "Nesting Heronry",
  },
  {
    src: birdImgTwo,
    title: "Black-Capped Kingfisher",
    location: "Khola Creek Mangrove Perch",
    category: "Kingfisher Haven",
  },
  {
    src: birdImgThree,
    title: "White-Bellied Sea Eagle",
    location: "Dhamra River Delta Canopy",
    category: "Raptor Watch",
  },
  {
    src: birdImgFour,
    title: "Bar-Headed Geese Winter Flock",
    location: "Raipati Wetland Mudflats",
    category: "Winter Migrant",
  },
  {
    src: birdImgFive,
    title: "Lesser Whistling Teal Flotilla",
    location: "Suajore Backwater Lagoon",
    category: "Waterfowl Haven",
  },
  {
    src: birdImgSix,
    title: "Mangrove Pitta in Undergrowth",
    location: "Dangmal Nature Trail Canopy",
    category: "Forest Jewel",
  },
];

const navTabs = [
  { id: "bird-expedition", label: "Birding Expeditions" },
  { id: "species-guide", label: "Birding & Season Guide" },
  { id: "book-tour", label: "Book Birding Safari" },
  { id: "avian-gallery", label: "Avian Photo Gallery" },
];

const expeditionPackages = [
  {
    tag: "PRIME HERONRY",
    title: "Bagagahana Nesting Cruise",
    route: "Khola Jetty → Bagagahana Island → Suajore Creek → Watchtower",
    duration: "4 Hours (Morning / Dawn Departure)",
    highlights:
      "Mass nesting colonies of 8+ heron and egret species, Asian Openbills, night herons, and cormorant feeding zones.",
    capacity: "Silent Low-Wake Eco Craft (Up to 6–10 Birders)",
  },
  {
    tag: "COASTAL MIGRATION",
    title: "Estuarine Wader & Raptor Trail",
    route: "Gupti Ghat → Barunei Mudflats → Ekakula Estuary Spits",
    duration: "Full Day / 6–7 Hours (Tide Synchronized)",
    highlights:
      "Migratory waders, curlews, plovers, godwits, Brahminy Kites, Osprey hunting dives, and White-bellied Sea Eagles.",
    capacity: "Tide-Navigated Marine Boat with Ornithology Guide",
  },
  {
    tag: "SPECIALIST TRAIL",
    title: "Mangrove Kingfisher & Pitta Census",
    route: "Dangmal Forest Buffer & Narrow Creeks → Habalikhati Forest Edge",
    duration: "Dawn Trail (6:00 AM – 10:30 AM)",
    highlights:
      "Tracking 8 kingfisher species (Brown-winged, Ruddy, Pied, Black-capped), Mangrove Pitta, and nocturnal owls.",
    capacity: "Private Custom Boat with Master Spotter",
  },
];

const birdingFAQs = [
  {
    q: "What is the peak season to witness migratory birds in Bhitarkanika?",
    a: "The winter migratory window runs from November through late February, bringing thousands of trans-Himalayan waterfowl, ducks, and waders. For breeding local migrants like Asian Openbills and Darters, the peak nesting months at Bagagahana heronry are July to October.",
  },
  {
    q: "Which specific areas are best for bird photography?",
    a: "Bagagahana heronry near Dangmal is renowned for dense communal nesting. Suajore Creek, Khola Channel, and the exposed mudflats along Raipati offer close vantage points for kingfishers, waders, and raptors under soft morning light.",
  },
  {
    q: "Do safaris provide telephoto optics or bird spotters?",
    a: "Certified eco-guides accompanied on all official trips carry spotting scopes and high-powered binoculars. Photographers are recommended to bring their own focal lenses (300mm to 600mm) and protective dust covers.",
  },
  {
    q: "Are silent electric or low-wake boats available for birding?",
    a: "Yes, customized birding departures utilize low-RPM muffled propulsion vessels to minimize wake and acoustic disturbance along sensitive creek banks and nesting islands.",
  },
  {
    q: "What forest rules apply during avian nesting seasons?",
    a: "Noise restrictions are strictly enforced inside the heronry channels. Drones, flash photography, laser pointers, and leaving designated boat channels or landing without ranger clearance are strictly prohibited.",
  },
];

const MigratoryBirds = () => {
  const [activeTab, setActiveTab] = useState("bird-expedition");
  const [activeImage, setActiveImage] = useState(null);
  const [faqIndex, setFaqIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    if (tabId === "species-guide") {
      setFaqIndex(0);
    }

    if (tabId === "book-tour") {
      setFormSubmitted(false);
    }

    document.getElementById("migratory-birds")?.scrollIntoView({
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
    <section className="MigratoryBirds" id="migratory-birds">
      <div className="MigratoryBirds__layout">
        {/* MAIN CONTENT */}
        <main className="MigratoryBirds__main" key={activeTab}>
          {/* 1. BIRD EXPEDITIONS */}
          {activeTab === "bird-expedition" && (
            <div className="MigratoryBirds__viewPane">
              <div className="MigratoryBirds__eyebrow">
                <span className="MigratoryBirds__eyebrowLine" />
                <span>BHITARKANIKA RAMSAR SITE • ODISHA</span>
              </div>

              <h1 className="MigratoryBirds__pageTitle">
                Avian Wonderlands <span>Among Tidal Mangroves.</span>
              </h1>

              <p className="MigratoryBirds__lead">
                Over 320 resident and migratory bird species converge across the
                brackish wetlands and heronries of Bhitarkanika. From the dramatic
                nesting clusters of Bagagahana to wintering waterfowl from Central
                Asia and Siberia, discover India’s premier coastal bird sanctuary.
              </p>

              <figure className="MigratoryBirds__heroFigure">
                <img
                  className="MigratoryBirds__heroImage"
                  src={birdImgOne}
                  alt="Asian Openbill Storks and migratory waterfowl nesting in Bhitarkanika"
                />

                <figcaption className="MigratoryBirds__heroCaption">
                  <span className="MigratoryBirds__heroCaptionDot" />
                  <span>
                    Recognized Important Bird Area (IBA) • 320+ Documented Avian Species
                  </span>
                </figcaption>
              </figure>

              {/* HIGHLIGHT PILLARS */}
              <div className="MigratoryBirds__featureGrid">
                <div className="MigratoryBirds__specBox">
                  <span className="MigratoryBirds__specNum">01</span>
                  <h3>Bagagahana Heronry</h3>
                  <p>
                    Asia’s prime mass-breeding colony for Asian Openbill storks,
                    Oriental white ibis, darters, and egrets nesting along
                    canopy islands.
                  </p>
                </div>

                <div className="MigratoryBirds__specBox">
                  <span className="MigratoryBirds__specNum">02</span>
                  <h3>8 Kingfisher Species</h3>
                  <p>
                    One of the world's dense habitats for Brown-winged,
                    Black-capped, Pied, White-throated, and rare Ruddy kingfishers.
                  </p>
                </div>

                <div className="MigratoryBirds__specBox">
                  <span className="MigratoryBirds__specNum">03</span>
                  <h3>Winter Flyway Haven</h3>
                  <p>
                    Trans-Himalayan migrants including Northern Pintails,
                    Eurasian Wigeons, Bar-headed Geese, and curlews resting on
                    tidal flats.
                  </p>
                </div>
              </div>

              {/* ITINERARIES */}
              <div className="MigratoryBirds__packageSection">
                <div className="MigratoryBirds__subHeader">
                  <span>CURATED FIELD ITINERARIES</span>
                  <h2>Signature Birdwatching Safaris</h2>
                </div>

                <div className="MigratoryBirds__packageGrid">
                  {expeditionPackages.map((pkg) => (
                    <div key={pkg.title} className="MigratoryBirds__packageCard">
                      <span className="MigratoryBirds__packageTag">{pkg.tag}</span>
                      <h3>{pkg.title}</h3>
                      <p className="MigratoryBirds__packageRoute">
                        <strong>Route:</strong> {pkg.route}
                      </p>
                      <div className="MigratoryBirds__packageMeta">
                        <span>⏱ {pkg.duration}</span>
                        <span>👥 {pkg.capacity}</span>
                      </div>
                      <p className="MigratoryBirds__packageDesc">
                        {pkg.highlights}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="MigratoryBirds__actionBanner">
                <div>
                  <h3>Planning an Avian Expedition to Bhitarkanika?</h3>
                  <p>
                    Secure specialized silent boats with ornithologist spotters
                    early during the winter migration peak (November–February).
                  </p>
                </div>

                <button
                  type="button"
                  className="MigratoryBirds__btnPrimary"
                  onClick={() => handleTabChange("book-tour")}
                >
                  Reserve Birding Tour ↗
                </button>
              </div>
            </div>
          )}

          {/* 2. SPECIES & FIELD GUIDE */}
          {activeTab === "species-guide" && (
            <div className="MigratoryBirds__viewPane">
              <div className="MigratoryBirds__eyebrow">
                <span className="MigratoryBirds__eyebrowLine" />
                <span>FIELD KNOWLEDGE & SEASON TIMETABLES</span>
              </div>

              <h1 className="MigratoryBirds__pageTitle">
                Everything Required <span>To Track Migratory Flocks.</span>
              </h1>

              <p className="MigratoryBirds__lead">
                Review verified seasonal census timelines, equipment recommendations,
                tide windows, and conservation guidelines for responsible birdwatching.
              </p>

              <div className="MigratoryBirds__planAccordion">
                {birdingFAQs.map((item, index) => {
                  const isOpen = faqIndex === index;

                  return (
                    <div
                      key={item.q}
                      className={`MigratoryBirds__planItem ${
                        isOpen ? "is-open" : ""
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        className="MigratoryBirds__planTrigger"
                        onClick={() => setFaqIndex(isOpen ? -1 : index)}
                      >
                        <span>
                          {String(index + 1).padStart(2, "0")}. {item.q}
                        </span>

                        <span className="MigratoryBirds__planToggle">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <p className="MigratoryBirds__planAnswer">{item.a}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="MigratoryBirds__routeBox">
                <h3>Prime Birdwatching Sectors & Hotspots</h3>

                <ul>
                  <li>
                    <strong>Bagagahana & Dangmal Creek:</strong> Ground zero for
                    the monumental monsoon breeding season (July–October) where
                    thousands of openbills and herons raise broods across mangrove trees.
                  </li>

                  <li>
                    <strong>Raipati & Suajore Mudflats:</strong> Low-tide exposed banks
                    serving as feeding grounds for Eurasian Curlews, Common Redshanks,
                    Terek Sandpipers, and Greater Flamingos.
                  </li>

                  <li>
                    <strong>Habalikhati & Hukitola Coastline:</strong> Open sea and
                    estuary mouths frequented by White-bellied Sea Eagles, Brahminy
                    Kites, Ospreys, and Caspian Terns.
                  </li>
                </ul>

                <p className="MigratoryBirds__routeNote">
                  <strong>Field Advisory:</strong> Low-tide mornings offer maximum
                  foraging activity along exposed tidal mudflats. Always maintain a
                  minimum 30-meter buffer from nesting trees to prevent nest abandonment.
                </p>
              </div>

              <div className="MigratoryBirds__actionBanner">
                <div>
                  <h3>Have Photography Gear or Custom Group Queries?</h3>
                  <p>
                    Consult directly with licensed sanctuary spotters for private
                    custom dawn charters and high-tide creek positioning.
                  </p>
                </div>

                <button
                  type="button"
                  className="MigratoryBirds__btnPrimary"
                  onClick={() => handleTabChange("book-tour")}
                >
                  Inquire with Naturalist ↗
                </button>
              </div>
            </div>
          )}

          {/* 3. BOOK BIRDING EXPEDITION */}
          {activeTab === "book-tour" && (
            <div className="MigratoryBirds__viewPane">
              <div className="MigratoryBirds__eyebrow">
                <span className="MigratoryBirds__eyebrowLine" />
                <span>EXPEDITION REGISTRATION & SLOTS</span>
              </div>

              <h1 className="MigratoryBirds__pageTitle">
                Reserve Your Birding <span>Safari in Bhitarkanika.</span>
              </h1>

              <p className="MigratoryBirds__lead">
                Submit your travel schedule and group preferences. Our ornithology
                desk will align departures with tidal charts and reserve certified
                forest naturalists.
              </p>

              {formSubmitted ? (
                <div className="MigratoryBirds__formSuccess">
                  <span className="MigratoryBirds__checkIcon">✓</span>

                  <h3>Birding Safari Inquiry Logged!</h3>

                  <p>
                    Your safari request has been recorded. Our team will review
                    tide charts, check boat and spotter availability for your date,
                    and reach out with permit confirmations.
                  </p>

                  <button
                    type="button"
                    className="MigratoryBirds__btnPrimary"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Submit Another Tour Request
                  </button>
                </div>
              ) : (
                <form
                  className="MigratoryBirds__form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setFormSubmitted(true);
                  }}
                >
                  <div className="MigratoryBirds__formHeading">
                    <span>BHITARKANIKA AVIAN EXPEDITIONS</span>
                    <h3>Birdwatching Registration Form</h3>
                    <p>
                      Mandatory details required for Forest Department ecotourism permits (*).
                    </p>
                  </div>

                  <div className="MigratoryBirds__formGrid">
                    <div className="MigratoryBirds__inputGroup">
                      <label htmlFor="MigratoryBirds-name">
                        Lead Birder / Guest Name *
                      </label>
                      <input
                        id="MigratoryBirds-name"
                        name="name"
                        type="text"
                        placeholder="e.g. Debashis Mohapatra"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="MigratoryBirds__inputGroup">
                      <label htmlFor="MigratoryBirds-email">Email Address *</label>
                      <input
                        id="MigratoryBirds-email"
                        name="email"
                        type="email"
                        placeholder="debashis@example.com"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="MigratoryBirds__inputGroup">
                      <label htmlFor="MigratoryBirds-phone">
                        WhatsApp / Contact Number *
                      </label>
                      <input
                        id="MigratoryBirds-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 94370 XXXXX"
                        autoComplete="tel"
                        required
                      />
                    </div>

                    <div className="MigratoryBirds__inputGroup">
                      <label htmlFor="MigratoryBirds-date">
                        Target Safari Date *
                      </label>
                      <input
                        id="MigratoryBirds-date"
                        name="travelDate"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    <div className="MigratoryBirds__inputGroup">
                      <label htmlFor="MigratoryBirds-entryGate">
                        Preferred Departure Jetty
                      </label>
                      <select
                        id="MigratoryBirds-entryGate"
                        name="entryGate"
                        defaultValue="Khola Gate (Direct to Bagagahana & Dangmal)"
                      >
                        <option value="Khola Gate (Direct to Bagagahana & Dangmal)">
                          Khola Gate (Direct to Bagagahana & Dangmal)
                        </option>
                        <option value="Gupti Gate (Estuarine Waders & Mudflats)">
                          Gupti Gate (Estuarine Waders & Mudflats)
                        </option>
                        <option value="Chandbali Ghat (River Delta Approach)">
                          Chandbali Ghat (River Delta Approach)
                        </option>
                      </select>
                    </div>

                    <div className="MigratoryBirds__inputGroup">
                      <label htmlFor="MigratoryBirds-guests">
                        Party Size / Birders
                      </label>
                      <select
                        id="MigratoryBirds-guests"
                        name="guests"
                        defaultValue="1–2 Birders (Private Silent Charter)"
                      >
                        <option value="1–2 Birders (Private Silent Charter)">
                          1–2 Birders (Private Silent Charter)
                        </option>
                        <option value="3–5 Birders (Small Photography Group)">
                          3–5 Birders (Small Photography Group)
                        </option>
                        <option value="6–10 Birders (Naturalist Group Vessel)">
                          6–10 Birders (Naturalist Group Vessel)
                        </option>
                        <option value="11+ Birders (Student & Research Group)">
                          11+ Birders (Student & Research Group)
                        </option>
                      </select>
                    </div>

                    <div className="MigratoryBirds__inputGroup MigratoryBirds__inputGroup--full">
                      <label htmlFor="MigratoryBirds-service">
                        Specialized Avian Focus
                      </label>
                      <select
                        id="MigratoryBirds-service"
                        name="service"
                        defaultValue="Early Morning Heronry & Kingfisher Trail (Dawn to 10:30 AM)"
                      >
                        <option value="Early Morning Heronry & Kingfisher Trail (Dawn to 10:30 AM)">
                          Early Morning Heronry & Kingfisher Trail (Dawn to 10:30 AM)
                        </option>
                        <option value="Coastal Mudflat Wader & Sea Eagle Cruise (Full Day)">
                          Coastal Mudflat Wader & Sea Eagle Cruise (Full Day)
                        </option>
                        <option value="Wintering Waterfowl & Geese Census Route (4 Hours)">
                          Wintering Waterfowl & Geese Census Route (4 Hours)
                        </option>
                        <option value="Dedicated Bird Photography Low-Wake Charter (Custom Timing)">
                          Dedicated Bird Photography Low-Wake Charter (Custom Timing)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="MigratoryBirds__inputGroup">
                    <label htmlFor="MigratoryBirds-notes">
                      Target Species / Telephoto Gear Notes
                    </label>
                    <textarea
                      id="MigratoryBirds-notes"
                      name="notes"
                      rows="4"
                      placeholder="Mention any target species (e.g. Mangrove Pitta, Ruddy Kingfisher), lens specifications, or requirements for binoculars and tripods..."
                    />
                  </div>

                  <button type="submit" className="MigratoryBirds__submitBtn">
                    Submit Birding Safari Request ↗
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 4. AVIAN GALLERY */}
          {activeTab === "avian-gallery" && (
            <div className="MigratoryBirds__viewPane">
              <div className="MigratoryBirds__eyebrow">
                <span className="MigratoryBirds__eyebrowLine" />
                <span>MIGRATORY & RESIDENT AVIAN ARCHIVE</span>
              </div>

              <h1 className="MigratoryBirds__pageTitle">
                Portraits from the <span>Mangrove Canopy.</span>
              </h1>

              <p className="MigratoryBirds__lead">
                Explore photographed species across the river systems and mudflats
                of Bhitarkanika. Click any image to view details and location tags.
              </p>

              <div className="MigratoryBirds__galleryPageGrid">
                {galleryImages.map((img, index) => (
                  <button
                    key={`${img.title}-${index}`}
                    type="button"
                    className="MigratoryBirds__galleryPageCard"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View ${img.title}`}
                  >
                    <img src={img.src} alt={img.title} loading="lazy" />

                    <span className="MigratoryBirds__galleryCardOverlay">
                      <span>{img.category}</span>
                      <span className="MigratoryBirds__galleryCardTitle">
                        {img.title}
                      </span>
                      <span className="MigratoryBirds__galleryLocation">
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
        <aside className="MigratoryBirds__sidebar">
          {/* NAVIGATION */}
          <div className="MigratoryBirds__sideBox">
            <div className="MigratoryBirds__sideTitle">
              <span />
              <h2>Explore Avian Life</h2>
            </div>

            <nav
              className="MigratoryBirds__serviceNav"
              aria-label="Explore avian topics"
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
                    <span className="MigratoryBirds__navArrow">↗</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* SUPPORT CARD */}
          <div className="MigratoryBirds__supportCard">
            <div className="MigratoryBirds__supportIcon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div className="MigratoryBirds__supportHeading">
              <span>FIELD NATURALIST DESK</span>
              <h3>Need Birding Guidance?</h3>
            </div>

            <p>
              Tidal levels and morning mist significantly alter bird foraging
              and sightings. Connect with our local naturalists for today's creek
              conditions and sighting logs.
            </p>

            <button
              type="button"
              className="MigratoryBirds__supportLink"
              onClick={() => handleTabChange("book-tour")}
            >
              <span>Connect with Spotter Desk</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          {/* TRAVEL ESSENTIALS */}
          <div className="MigratoryBirds__sideBox MigratoryBirds__downloads">
            <div className="MigratoryBirds__sideTitle">
              <span />
              <h2>Sanctuary Quick Links</h2>
            </div>

            <div className="MigratoryBirds__downloadGrid">
              <button
                type="button"
                className={activeTab === "bird-expedition" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("bird-expedition")}
              >
                <span className="MigratoryBirds__downloadIcon">01</span>
                <strong>Birding Routes</strong>
                <small>View expeditions ↗</small>
              </button>

              <button
                type="button"
                className={activeTab === "species-guide" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("species-guide")}
              >
                <span className="MigratoryBirds__downloadIcon">02</span>
                <strong>Seasons & Guides</strong>
                <small>View guide ↗</small>
              </button>
            </div>
          </div>

          {/* CONTACT INFORMATION */}
          <div className="MigratoryBirds__sideBox MigratoryBirds__contactBox">
            <div className="MigratoryBirds__sideTitle">
              <span />
              <h2>Sanctuary Field Office</h2>
            </div>

            <div className="MigratoryBirds__contactInfo">
              <span
                className="MigratoryBirds__contactInfoIcon"
                aria-hidden="true"
              >
                📍
              </span>
              <div>
                <strong>Primary Birding Jetty</strong>
                <p>
                  Khola Entry Gate, Rajnagar, Kendrapara District, Odisha 754225
                </p>
              </div>
            </div>

            <div className="MigratoryBirds__contactInfo">
              <span
                className="MigratoryBirds__contactInfoIcon"
                aria-hidden="true"
              >
                ✉
              </span>
              <div>
                <strong>Naturalist Desk Inquiries</strong>
                <a href="mailto:birding@bhitarkanikawildlife.com">
                  birding@bhitarkanikawildlife.com
                </a>
              </div>
            </div>

            <div className="MigratoryBirds__contactInfo">
              <span
                className="MigratoryBirds__contactInfoIcon"
                aria-hidden="true"
              >
                🕒
              </span>
              <div>
                <strong>Recommended Birding Window</strong>
                <p>6:00 AM – 10:30 AM (Peak Foraging Activity)</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FULLSCREEN GALLERY LIGHTBOX */}
      {activeImage !== null && (
        <div
          className="MigratoryBirds__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Avian photograph viewer"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="MigratoryBirds__lightboxBox"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="MigratoryBirds__lightboxClose"
              aria-label="Close image viewer"
              onClick={() => setActiveImage(null)}
            >
              ✕
            </button>

            <img
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].title}
            />

            <div className="MigratoryBirds__lightboxCaption">
              <div>
                <span>{galleryImages[activeImage].category}</span>
                <h3>{galleryImages[activeImage].title}</h3>
                <small>📍 {galleryImages[activeImage].location}</small>
              </div>

              <span className="MigratoryBirds__lightboxCount">
                {String(activeImage + 1).padStart(2, "0")} /{" "}
                {String(galleryImages.length).padStart(2, "0")}
              </span>
            </div>

            <div className="MigratoryBirds__lightboxControls">
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

export default MigratoryBirds;
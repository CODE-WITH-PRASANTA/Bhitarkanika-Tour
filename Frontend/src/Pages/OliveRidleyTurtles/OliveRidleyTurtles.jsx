import React, { useEffect, useState } from "react";
import "./OliveRidleyTurtles.css";
import turtleImgOne from "../../assets/oliveturtle-1.png";
import turtleImgTwo from "../../assets/oliveturtle-2.png";
import turtleImgThree from "../../assets/oliveturtle-3.png";
import turtleImgFour from "../../assets/oliveturtle-4.png";
import turtleImgFive from "../../assets/oliveturtle-5.png";
import turtleImgSix from "../../assets/oliveturtle-6.png";

const galleryImages = [
  {
    src: turtleImgOne,
    title: "Mass Nesting Phenomenon (Arribada)",
    location: "Gahirmatha Marine Sanctuary Beach",
    category: "Mass Nesting",
  },
  {
    src: turtleImgTwo,
    title: "Olive Ridley Mating Flotilla in Coastal Waters",
    location: "Ekakulanasi Coastal Shelf",
    category: "Offshore Mating",
  },
  {
    src: turtleImgThree,
    title: "Hatchlings Emerging Under Starlight",
    location: "Nasi-II Island Sandspit",
    category: "Hatchling Emergence",
  },
  {
    src: turtleImgFour,
    title: "Marine Cruising Along Coastal Estuaries",
    location: "Baitarani & Dhamra Estuary Confluence",
    category: "Marine Corridor",
  },
  {
    src: turtleImgFive,
    title: "Seaward Crawl Across Coastal Sandbars",
    location: "Habalikhati Beach Reserve",
    category: "Shoreline Transit",
  },
  {
    src: turtleImgSix,
    title: "Coast Guard & Forest Patrol Outpost",
    location: "Babubali Island Base",
    category: "Conservation Watch",
  },
];

const navTabs = [
  { id: "turtle-expedition", label: "Marine Turtle Expeditions" },
  { id: "arribada-guide", label: "Arribada & Season Guide" },
  { id: "book-safari", label: "Book Turtle Safari" },
  { id: "turtle-gallery", label: "Marine Turtle Gallery" },
];

const turtlePackages = [
  {
    tag: "WORLD LARGEST ROOKERY",
    title: "Gahirmatha Marine Sanctuary Cruise",
    route: "Gupti Jetty → Patasala River → Dhamra Mouth → Gahirmatha Marine Edge",
    duration: "Full Day / 6 to 7 Hours (Tide & Weather Dependent)",
    highlights:
      "Cruise authorized marine buffers adjacent to Gahirmatha, observe offshore mating pairs, coastal dolphins, and estuarine shorebirds.",
    capacity: "Authorized Seaworthy Cruisers (Up to 10–12 Guests)",
  },
  {
    tag: "ISLAND & COASTAL RUN",
    title: "Habalikhati Beach & Marine Trail",
    route: "Gupti Gate → Outer Creek Corridors → Habalikhati Forest Ghat → Coastal Beach Walk",
    duration: "Full Day / 6 Hours",
    highlights:
      "Explore the outer coastal perimeter of Bhitarkanika where marine turtles approach coastal sand dunes, backed by ancient Casuarina and mangrove belts.",
    capacity: "Marine Cruiser + Forest Department Escort",
  },
  {
    tag: "CONSERVATION WATCH",
    title: "Hukitola & Estuary Pelican Trail",
    route: "Gupti Jetty → Jamboo Creek → Hukitola Historical Island → Estuary Sandbars",
    duration: "Full Day / 7 Hours",
    highlights:
      "Navigate coastal channels where pelicans, sea eagles, and marine turtles converge near the historic British masonry rainwater storehouse.",
    capacity: "Private Custom Marine Charter with Eco-Guide",
  },
];

const turtleFAQs = [
  {
    q: "What makes Gahirmatha and Bhitarkanika globally renowned for Olive Ridley Turtles?",
    a: "Gahirmatha Beach, bordering the Bhitarkanika mangrove delta, is the world's largest rookery for Olive Ridley sea turtles (Lepidochelys olivacea). Hundreds of thousands of females emerge synchronously onto sandy barrier islands to lay eggs in a mass nesting event known as 'Arribada' (Spanish for arrival).",
  },
  {
    q: "When is the optimal season to witness the Olive Ridley phenomenon?",
    a: "Mating pairs begin congregating in offshore shallow coastal waters from November through January. The synchronized mass nesting (Arribada) typically occurs between late January and March, followed by massive hatchling emergences approximately 45 to 55 days later in March and April.",
  },
  {
    q: "Are boats allowed to land directly on Gahirmatha mass nesting beaches?",
    a: "No. Gahirmatha Marine Sanctuary is a strictly protected zero-landing reserve enforced by the Odisha Forest Department and Indian Coast Guard to prevent nest trampling and artificial light disorientation. Bhitarakanika Boat Service operates authorized seaworthy cruises along permitted marine waters and adjacent coastal points like Habalikhati.",
  },
  {
    q: "Which departure jetty is best for coastal marine turtle expeditions?",
    a: "Gupti Jetty is the designated departure ghat for all coastal and marine expeditions heading toward Gahirmatha, Habalikhati, and the outer Bay of Bengal coastal channels.",
  },
  {
    q: "What safety equipment and navigation measures are implemented on board?",
    a: "All vessels operated by Bhitarakanika Boat Service are seaworthy marine-certified crafts equipped with offshore marine lifejackets, GPS units, ring buoys, first-aid kits, licensed marine helmsmen, and Forest Department certified naturalists.",
  },
];

const OliveRidleyTurtles = () => {
  const [activeTab, setActiveTab] = useState("turtle-expedition");
  const [activeImage, setActiveImage] = useState(null);
  const [faqIndex, setFaqIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    if (tabId === "arribada-guide") {
      setFaqIndex(0);
    }

    if (tabId === "book-safari") {
      setFormSubmitted(false);
    }

    document.getElementById("olive-ridley-turtles")?.scrollIntoView({
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
    <section className="OliveRidleyTurtles" id="olive-ridley-turtles">
      <div className="OliveRidleyTurtles__layout">
        {/* MAIN CONTENT */}
        <main className="OliveRidleyTurtles__main" key={activeTab}>
          {/* 1. MARINE TURTLE EXPEDITIONS */}
          {activeTab === "turtle-expedition" && (
            <div className="OliveRidleyTurtles__viewPane">
              <div className="OliveRidleyTurtles__eyebrow">
                <span className="OliveRidleyTurtles__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • GAHIRMATHA MARINE SANCTUARY</span>
              </div>

              <h1 className="OliveRidleyTurtles__pageTitle">
                Olive Ridley Sea Turtles <span>& Coastal Marine Expeditions.</span>
              </h1>

              <p className="OliveRidleyTurtles__lead">
                Witness one of the Earth's greatest marine wildlife spectacles aboard
                authorized marine vessels by Bhitarakanika Boat Service. Cruise from the
                mangrove estuaries toward the open coastal shelf of Gahirmatha, where
                hundreds of thousands of Olive Ridley sea turtles migrate thousands of miles
                across the Indian Ocean to breed and nest along Odisha's shoreline.
              </p>

              <figure className="OliveRidleyTurtles__heroFigure">
                <img
                  className="OliveRidleyTurtles__heroImage"
                  src={turtleImgOne}
                  alt="Olive Ridley sea turtle nesting on the beaches of Gahirmatha Marine Sanctuary"
                />

                <figcaption className="OliveRidleyTurtles__heroCaption">
                  <span className="OliveRidleyTurtles__heroCaptionDot" />
                  <span>
                    Bhitarakanika Boat Service • Marine-Certified Cruisers & Forest Eco-Naturalists
                  </span>
                </figcaption>
              </figure>

              {/* HIGHLIGHT PILLARS */}
              <div className="OliveRidleyTurtles__featureGrid">
                <div className="OliveRidleyTurtles__specBox">
                  <span className="OliveRidleyTurtles__specNum">01</span>
                  <h3>World's Premier Rookery</h3>
                  <p>
                    Gahirmatha hosts over half a million nesting Olive Ridley sea
                    turtles annually, establishing it as the largest arribada ground on the globe.
                  </p>
                </div>

                <div className="OliveRidleyTurtles__specBox">
                  <span className="OliveRidleyTurtles__specNum">02</span>
                  <h3>Offshore Flotilla Sightings</h3>
                  <p>
                    During winter months, authorized cruises observe vast offshore mating
                    aggregations floating peacefully near river mouth confluences.
                  </p>
                </div>

                <div className="OliveRidleyTurtles__specBox">
                  <span className="OliveRidleyTurtles__specNum">03</span>
                  <h3>Strict Conservation Fleet</h3>
                  <p>
                    Seaworthy marine crafts outfitted with propeller guards, compliant low-impact
                    engines, and navigational GPS under Forest Department protocols.
                  </p>
                </div>
              </div>

              {/* EXPEDITION PACKAGES */}
              <div className="OliveRidleyTurtles__packageSection">
                <div className="OliveRidleyTurtles__subHeader">
                  <span>CURATED COASTAL VOYAGES</span>
                  <h2>Signature Marine Turtle Itineraries</h2>
                </div>

                <div className="OliveRidleyTurtles__packageGrid">
                  {turtlePackages.map((pkg) => (
                    <div
                      key={pkg.title}
                      className="OliveRidleyTurtles__packageCard"
                    >
                      <span className="OliveRidleyTurtles__packageTag">
                        {pkg.tag}
                      </span>
                      <h3>{pkg.title}</h3>
                      <p className="OliveRidleyTurtles__packageRoute">
                        <strong>Route:</strong> {pkg.route}
                      </p>
                      <div className="OliveRidleyTurtles__packageMeta">
                        <span>⏱ {pkg.duration}</span>
                        <span>👥 {pkg.capacity}</span>
                      </div>
                      <p className="OliveRidleyTurtles__packageDesc">
                        {pkg.highlights}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="OliveRidleyTurtles__actionBanner">
                <div>
                  <h3>Plan an Olive Ridley Marine Cruise with Bhitarakanika Boat Service</h3>
                  <p>
                    Pre-reserve authorized seaworthy vessels departing from Gupti Jetty with
                    coordinated maritime permits and certified marine spotters.
                  </p>
                </div>

                <button
                  type="button"
                  className="OliveRidleyTurtles__btnPrimary"
                  onClick={() => handleTabChange("book-safari")}
                >
                  Reserve Marine Safari ↗
                </button>
              </div>
            </div>
          )}

          {/* 2. ARRIBADA & SEASON GUIDE */}
          {activeTab === "arribada-guide" && (
            <div className="OliveRidleyTurtles__viewPane">
              <div className="OliveRidleyTurtles__eyebrow">
                <span className="OliveRidleyTurtles__eyebrowLine" />
                <span>MARINE REPTILE ECOLOGY & TIMETABLES</span>
              </div>

              <h1 className="OliveRidleyTurtles__pageTitle">
                Everything Required <span>To Understand the Arribada.</span>
              </h1>

              <p className="OliveRidleyTurtles__lead">
                Explore the biological migratory cycle of Olive Ridley sea turtles,
                lunar nesting correlations, sanctuary boundary rules, and visitor guidelines.
              </p>

              <div className="OliveRidleyTurtles__planAccordion">
                {turtleFAQs.map((item, index) => {
                  const isOpen = faqIndex === index;

                  return (
                    <div
                      key={item.q}
                      className={`OliveRidleyTurtles__planItem ${
                        isOpen ? "is-open" : ""
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        className="OliveRidleyTurtles__planTrigger"
                        onClick={() => setFaqIndex(isOpen ? -1 : index)}
                      >
                        <span>
                          {String(index + 1).padStart(2, "0")}. {item.q}
                        </span>

                        <span className="OliveRidleyTurtles__planToggle">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <p className="OliveRidleyTurtles__planAnswer">{item.a}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="OliveRidleyTurtles__routeBox">
                <h3>Key Marine Zones & Strict Ecological Guidelines</h3>

                <ul>
                  <li>
                    <strong>Gahirmatha Marine Sanctuary Waters:</strong> Encompasses the
                    coastal waters from the mouth of the Dhamra River south to the Mahanadi River
                    mouth. Strict motorized fishing bans are enforced by the Coast Guard from
                    November 1 through May 31 to protect migrating turtles.
                  </li>

                  <li>
                    <strong>Nasi-I & Nasi-II Sandspit Islands:</strong> Narrow isolated sandbars
                    where the dense mass nesting Arribada occurs under strong offshore winds
                    and specific lunar moon phases.
                  </li>

                  <li>
                    <strong>Artificial Lighting & Drone Bans:</strong> Bright white flashlights,
                    camera strobes, and aerial drones are strictly outlawed near nesting and
                    hatching beaches, as disorientation leads hatchlings away from the ocean.
                  </li>
                </ul>

                <p className="OliveRidleyTurtles__routeNote">
                  <strong>Strict Sanctuary Regulation:</strong> Disembarking onto core nesting
                  islands is strictly prohibited under the Wildlife Protection Act. All tours
                  conducted by Bhitarakanika Boat Service adhere to Forest Department maritime
                  perimeter guidelines.
                </p>
              </div>

              <div className="OliveRidleyTurtles__actionBanner">
                <div>
                  <h3>Have Photography, Scientific or Educational Group Queries?</h3>
                  <p>
                    Speak with our marine tour coordinators at Bhitarakanika Boat Service
                    for customized tidal charters and certified ornithologist-naturalist escorts.
                  </p>
                </div>

                <button
                  type="button"
                  className="OliveRidleyTurtles__btnPrimary"
                  onClick={() => handleTabChange("book-safari")}
                >
                  Send Marine Inquiry ↗
                </button>
              </div>
            </div>
          )}

          {/* 3. BOOK TURTLE SAFARI */}
          {activeTab === "book-safari" && (
            <div className="OliveRidleyTurtles__viewPane">
              <div className="OliveRidleyTurtles__eyebrow">
                <span className="OliveRidleyTurtles__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • EXPEDITION REGISTRATION</span>
              </div>

              <h1 className="OliveRidleyTurtles__pageTitle">
                Reserve Your Marine <span>Turtle Boat Expedition.</span>
              </h1>

              <p className="OliveRidleyTurtles__lead">
                Submit your target travel dates and party details. Bhitarakanika Boat
                Service will verify weather conditions, handle Forest Department marine
                manifests, and assign an authorized seaworthy vessel for your journey.
              </p>

              {formSubmitted ? (
                <div className="OliveRidleyTurtles__formSuccess">
                  <span className="OliveRidleyTurtles__checkIcon">✓</span>

                  <h3>Marine Safari Inquiry Received!</h3>

                  <p>
                    Your request has been logged successfully with Bhitarakanika Boat Service.
                    Our marine desk will evaluate coastal tide charts, verify seaworthy craft
                    availability, and contact you with departure confirmations.
                  </p>

                  <button
                    type="button"
                    className="OliveRidleyTurtles__btnPrimary"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Submit Another Tour Request
                  </button>
                </div>
              ) : (
                <form
                  className="OliveRidleyTurtles__form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setFormSubmitted(true);
                  }}
                >
                  <div className="OliveRidleyTurtles__formHeading">
                    <span>BHITARAKANIKA BOAT SERVICE</span>
                    <h3>Marine Turtle Safari Booking Form</h3>
                    <p>
                      Mandatory details required for Forest Department marine entry permits (*).
                    </p>
                  </div>

                  <div className="OliveRidleyTurtles__formGrid">
                    <div className="OliveRidleyTurtles__inputGroup">
                      <label htmlFor="OliveRidleyTurtles-name">
                        Lead Passenger Name *
                      </label>
                      <input
                        id="OliveRidleyTurtles-name"
                        name="name"
                        type="text"
                        placeholder="e.g. Debashis Mohapatra"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="OliveRidleyTurtles__inputGroup">
                      <label htmlFor="OliveRidleyTurtles-email">
                        Email Address *
                      </label>
                      <input
                        id="OliveRidleyTurtles-email"
                        name="email"
                        type="email"
                        placeholder="debashis@example.com"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="OliveRidleyTurtles__inputGroup">
                      <label htmlFor="OliveRidleyTurtles-phone">
                        WhatsApp / Contact Number *
                      </label>
                      <input
                        id="OliveRidleyTurtles-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 94370 XXXXX"
                        autoComplete="tel"
                        required
                      />
                    </div>

                    <div className="OliveRidleyTurtles__inputGroup">
                      <label htmlFor="OliveRidleyTurtles-date">
                        Target Safari Date *
                      </label>
                      <input
                        id="OliveRidleyTurtles-date"
                        name="travelDate"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    <div className="OliveRidleyTurtles__inputGroup">
                      <label htmlFor="OliveRidleyTurtles-entryGate">
                        Preferred Departure Jetty
                      </label>
                      <select
                        id="OliveRidleyTurtles-entryGate"
                        name="entryGate"
                        defaultValue="Gupti Gate (Direct Approach to Coastal & Marine Waters)"
                      >
                        <option value="Gupti Gate (Direct Approach to Coastal & Marine Waters)">
                          Gupti Gate (Direct Approach to Coastal & Marine Waters)
                        </option>
                        <option value="Khola Gate (Inland Creeks & Island Connection)">
                          Khola Gate (Inland Creeks & Island Connection)
                        </option>
                        <option value="Chandbali Ghat (River Delta Approach)">
                          Chandbali Ghat (River Delta Approach)
                        </option>
                      </select>
                    </div>

                    <div className="OliveRidleyTurtles__inputGroup">
                      <label htmlFor="OliveRidleyTurtles-guests">
                        Number of Passengers
                      </label>
                      <select
                        id="OliveRidleyTurtles-guests"
                        name="guests"
                        defaultValue="1–4 Persons (Private Small Seaworthy Boat)"
                      >
                        <option value="1–4 Persons (Private Small Seaworthy Boat)">
                          1–4 Persons (Private Small Seaworthy Boat)
                        </option>
                        <option value="5–8 Persons (Standard Marine Cruiser)">
                          5–8 Persons (Standard Marine Cruiser)
                        </option>
                        <option value="9–12 Persons (Authorized Seaworthy Vessel)">
                          9–12 Persons (Authorized Seaworthy Vessel)
                        </option>
                        <option value="13+ Persons (Educational / Research Group)">
                          13+ Persons (Educational / Research Group)
                        </option>
                      </select>
                    </div>

                    <div className="OliveRidleyTurtles__inputGroup OliveRidleyTurtles__inputGroup--full">
                      <label htmlFor="OliveRidleyTurtles-service">
                        Select Expedition Package
                      </label>
                      <select
                        id="OliveRidleyTurtles-service"
                        name="service"
                        defaultValue="Gahirmatha Marine Sanctuary Perimeter Cruise (6-7 hrs)"
                      >
                        <option value="Gahirmatha Marine Sanctuary Perimeter Cruise (6-7 hrs)">
                          Gahirmatha Marine Sanctuary Perimeter Cruise (6-7 hrs)
                        </option>
                        <option value="Habalikhati Beach & Coastal Marine Trail (6 hrs)">
                          Habalikhati Beach & Coastal Marine Trail (6 hrs)
                        </option>
                        <option value="Hukitola Island & Marine Delta Confluence Safari (7 hrs)">
                          Hukitola Island & Marine Delta Confluence Safari (7 hrs)
                        </option>
                        <option value="Custom Marine Research & Photography Charter">
                          Custom Marine Research & Photography Charter
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="OliveRidleyTurtles__inputGroup">
                    <label htmlFor="OliveRidleyTurtles-notes">
                      Special Requirements / Marine Notes
                    </label>
                    <textarea
                      id="OliveRidleyTurtles-notes"
                      name="notes"
                      rows="4"
                      placeholder="Let Bhitarakanika Boat Service know if you require high-magnification binoculars, specialized naturalist guides, or group logistics..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="OliveRidleyTurtles__submitBtn"
                  >
                    Submit Marine Safari Request ↗
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 4. GALLERY */}
          {activeTab === "turtle-gallery" && (
            <div className="OliveRidleyTurtles__viewPane">
              <div className="OliveRidleyTurtles__eyebrow">
                <span className="OliveRidleyTurtles__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • MARINE ARCHIVE</span>
              </div>

              <h1 className="OliveRidleyTurtles__pageTitle">
                Portraits of the <span>Ocean Voyagers.</span>
              </h1>

              <p className="OliveRidleyTurtles__lead">
                Browse photographs documenting Olive Ridley sea turtles along the marine
                shallows, estuary mouths, and sandbanks of Bhitarkanika and Gahirmatha.
                Click any image to view details in full screen.
              </p>

              <div className="OliveRidleyTurtles__galleryPageGrid">
                {galleryImages.map((img, index) => (
                  <button
                    key={`${img.title}-${index}`}
                    type="button"
                    className="OliveRidleyTurtles__galleryPageCard"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View ${img.title}`}
                  >
                    <img src={img.src} alt={img.title} loading="lazy" />

                    <span className="OliveRidleyTurtles__galleryCardOverlay">
                      <span>{img.category}</span>
                      <span className="OliveRidleyTurtles__galleryCardTitle">
                        {img.title}
                      </span>
                      <span className="OliveRidleyTurtles__galleryLocation">
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
        <aside className="OliveRidleyTurtles__sidebar">
          {/* NAVIGATION */}
          <div className="OliveRidleyTurtles__sideBox">
            <div className="OliveRidleyTurtles__sideTitle">
              <span />
              <h2>Explore Marine Desk</h2>
            </div>

            <nav
              className="OliveRidleyTurtles__serviceNav"
              aria-label="Explore marine turtle safari navigation"
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
                    <span className="OliveRidleyTurtles__navArrow">↗</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* SUPPORT CARD */}
          <div className="OliveRidleyTurtles__supportCard">
            <div
              className="OliveRidleyTurtles__supportIcon"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div className="OliveRidleyTurtles__supportHeading">
              <span>BHITARAKANIKA BOAT SERVICE</span>
              <h3>Need Marine Advice?</h3>
            </div>

            <p>
              Coastal tides and sea conditions directly govern marine departures from
              Gupti Jetty. Speak with our dock managers for today's weather forecasts and permit assistance.
            </p>

            <button
              type="button"
              className="OliveRidleyTurtles__supportLink"
              onClick={() => handleTabChange("book-safari")}
            >
              <span>Connect with Marine Desk</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          {/* QUICK LINKS */}
          <div className="OliveRidleyTurtles__sideBox OliveRidleyTurtles__downloads">
            <div className="OliveRidleyTurtles__sideTitle">
              <span />
              <h2>Sanctuary Quick Links</h2>
            </div>

            <div className="OliveRidleyTurtles__downloadGrid">
              <button
                type="button"
                className={
                  activeTab === "turtle-expedition" ? "is-active-btn" : ""
                }
                onClick={() => handleTabChange("turtle-expedition")}
              >
                <span className="OliveRidleyTurtles__downloadIcon">01</span>
                <strong>Marine Fleet</strong>
                <small>View cruisers ↗</small>
              </button>

              <button
                type="button"
                className={
                  activeTab === "arribada-guide" ? "is-active-btn" : ""
                }
                onClick={() => handleTabChange("arribada-guide")}
              >
                <span className="OliveRidleyTurtles__downloadIcon">02</span>
                <strong>Arribada Guide</strong>
                <small>View timings ↗</small>
              </button>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="OliveRidleyTurtles__sideBox OliveRidleyTurtles__contactBox">
            <div className="OliveRidleyTurtles__sideTitle">
              <span />
              <h2>Bhitarakanika Boat Service</h2>
            </div>

            <div className="OliveRidleyTurtles__contactInfo">
              <span
                className="OliveRidleyTurtles__contactInfoIcon"
                aria-hidden="true"
              >
                📍
              </span>
              <div>
                <strong>Primary Marine Departure Jetty</strong>
                <p>
                  Gupti Entry Ghat, Rajnagar Block, Kendrapara District, Odisha 754225
                </p>
              </div>
            </div>

            <div className="OliveRidleyTurtles__contactInfo">
              <span
                className="OliveRidleyTurtles__contactInfoIcon"
                aria-hidden="true"
              >
                ✉
              </span>
              <div>
                <strong>Official Marine Inquiries</strong>
                <a href="mailto:safari@bhitarakanikaboatservice.com">
                  safari@bhitarakanikaboatservice.com
                </a>
              </div>
            </div>

            <div className="OliveRidleyTurtles__contactInfo">
              <span
                className="OliveRidleyTurtles__contactInfoIcon"
                aria-hidden="true"
              >
                🕒
              </span>
              <div>
                <strong>Marine Gate Operating Hours</strong>
                <p>6:00 AM to 4:30 PM (Maritime Clearance Strictly Enforced)</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      {activeImage !== null && (
        <div
          className="OliveRidleyTurtles__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Olive Ridley turtle photograph viewer"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="OliveRidleyTurtles__lightboxBox"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="OliveRidleyTurtles__lightboxClose"
              aria-label="Close image viewer"
              onClick={() => setActiveImage(null)}
            >
              ✕
            </button>

            <img
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].title}
            />

            <div className="OliveRidleyTurtles__lightboxCaption">
              <div>
                <span>{galleryImages[activeImage].category}</span>
                <h3>{galleryImages[activeImage].title}</h3>
                <small>📍 {galleryImages[activeImage].location}</small>
              </div>

              <span className="OliveRidleyTurtles__lightboxCount">
                {String(activeImage + 1).padStart(2, "0")} /{" "}
                {String(galleryImages.length).padStart(2, "0")}
              </span>
            </div>

            <div className="OliveRidleyTurtles__lightboxControls">
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

export default OliveRidleyTurtles;
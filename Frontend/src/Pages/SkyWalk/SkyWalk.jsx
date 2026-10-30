import React, { useEffect, useState } from "react";
import "./SkyWalk.css";

import skywalkImgOne from "../../assets/skywalk-1.png";
import skywalkImgTwo from "../../assets/skywalk-2.png";
import skywalkImgThree from "../../assets/skywalk-3.jpeg";
import skywalkImgFour from "../../assets/skywalk-4.png";
import skywalkImgFive from "../../assets/skywalk-5.png";
import skywalkImgSix from "../../assets/skywalk-6.jpeg";

const galleryImages = [
  { src: skywalkImgOne, title: "Elevated Mangrove Skywalk Pathway", location: "Dangmal Core Forest Canopy", category: "Canopy Walkway" },
  { src: skywalkImgTwo, title: "Panoramic Wetland Observation Deck", location: "Bhitarkanika High Watchtower", category: "Observation Point" },
  { src: skywalkImgThree, title: "Canopy Eye-Level Birding Platform", location: "Bagagahana Perch Line", category: "Avian Spotting" },
  { src: skywalkImgFour, title: "Creek Aerial Overlook Trail", location: "Dangmal Backwater Curve", category: "Tidal Aerial View" },
  { src: skywalkImgFive, title: "Ancient Sundari Tree Canopy Span", location: "Core Boardwalk Section", category: "Botanical Canopy" },
  { src: skywalkImgSix, title: "Golden Hour Forest Vista", location: "Delta Sky Observation Tower", category: "Sunset Deck" },
];

const navTabs = [
  { id: "skywalk-overview", label: "Canopy Skywalk & Trails" },
  { id: "visit-guide", label: "Skywalk & Entry Guide" },
  { id: "book-visit", label: "Book Skywalk Tour" },
  { id: "canopy-gallery", label: "Skywalk Photo Gallery" },
];

const skywalkExperiences = [
  {
    tag: "TOP RATED",
    title: "Dangmal Canopy Skywalk & Forest Trail",
    route: "Dangmal Jetty → Elevated Wooden Boardwalk → Central Canopy Deck → Forest Museum",
    duration: "2 to 2.5 Hours",
    highlights: "Stroll safely above the tidal mudflats, view kingfishers and monitor lizards at eye level, and examine giant Sundari tree crowns.",
    capacity: "Available for Families, Birders & Educational Groups",
  },
  {
    tag: "AERIAL WILDLIFE",
    title: "Watchtower Apex & Creek Panorama",
    route: "Core Forest Trail → Multi-Tier Watchtower Deck → Crocodile Pond Overlook",
    duration: "1.5 to 2 Hours",
    highlights: "Sweeping 360-degree aerial views of the Brahmani-Baitarani delta waterways, openbill flight paths, and distant basking crocodiles.",
    capacity: "Guided Forest Batch Departures",
  },
  {
    tag: "BOAT & SKYWALK COMBO",
    title: "Full Day Safari & Canopy Expedition",
    route: "Khola Jetty Boat Safari → Dangmal Skywalk → Core River Creeks → Return",
    duration: "5 to 6 Hours (Comprehensive Package)",
    highlights: "Seamless blend of tidal creek motorboating by Bhitarkanika Boat Service followed by a guided elevated walk through the core canopy.",
    capacity: "Custom Private Cruisers & Forest Naturalist",
  },
];

const skywalkFAQs = [
  {
    q: "Where is the Mangrove Skywalk located and how do visitors reach it?",
    a: "The elevated canopy boardwalk is situated inside the core Dangmal forest sector. Visitors typically arrive via authorized safari boats operated by Bhitarkanika Boat Service departing from Khola Jetty Terminal, disembarking directly at the Dangmal Forest Ghat.",
  },
  {
    q: "Is the elevated boardwalk safe for elderly visitors and children?",
    a: "Yes. The skywalk is a sturdy, high-railed wooden structure built securely above the tidal flood line and mudflats, offering a level walking experience away from ground hazards and wildlife contact.",
  },
  {
    q: "What wildlife can be spotted from the skywalk and observation decks?",
    a: "Because you are elevated within the tree canopy, it provides vantage points for spotting Mangrove Pittas, Black-capped Kingfishers, spotted deer, water monitor lizards, tree-climbing crabs, and basking estuarine crocodiles below.",
  },
  {
    q: "Are separate entry permits required for the Skywalk?",
    a: "Access to the Skywalk and watchtowers is included under the general Bhitarkanika Wildlife Sanctuary entry permits. Bhitarkanika Boat Service manages passenger permit clearances and guide allocations at the jetty counters.",
  },
  {
    q: "What is the best time of day to experience the Skywalk?",
    a: "Early mornings (7:00 AM – 10:00 AM) and late afternoons (2:30 PM – 4:30 PM) offer cooler canopy breezes, active bird choruses, and golden photographic lighting across the delta treetops.",
  },
];

const SkyWalk = () => {
  const [activeTab, setActiveTab] = useState("skywalk-overview");
  const [activeImage, setActiveImage] = useState(null);
  const [faqIndex, setFaqIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedPassengers, setSelectedPassengers] = useState(2);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    if (tabId === "visit-guide") setFaqIndex(0);

    if (tabId === "book-visit") {
      setFormSubmitted(false);
    }

    document.getElementById("skywalk-experience")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
    <section className="SkyWalk" id="skywalk-experience">
      <div className="SkyWalk__layout">
        <main className="SkyWalk__main" key={activeTab}>
          {/* 1. SKYWALK OVERVIEW */}
          {activeTab === "skywalk-overview" && (
            <div className="SkyWalk__viewPane">
              <div className="SkyWalk__eyebrow">
                <span className="SkyWalk__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • CANOPY EXPEDITIONS</span>
              </div>

              <h1 className="SkyWalk__pageTitle">
                Elevated Skywalk <span>Above Tidal Mangrove Forests.</span>
              </h1>

              <p className="SkyWalk__lead">
                Step above the coastal tides and wander along the elevated timber
                skywalks of Bhitarkanika. Seamlessly integrated with our signature
                river cruises, this aerial nature trail lets you explore the untouched
                core canopy of Dangmal, witness rare birds at eye level, and view
                estuarine wildlife from secure observation decks.
              </p>

              <figure className="SkyWalk__heroFigure">
                <img
                  className="SkyWalk__heroImage"
                  src={skywalkImgOne}
                  alt="Elevated wooden skywalk above Bhitarkanika mangrove canopy"
                />
                <figcaption className="SkyWalk__heroCaption">
                  <span className="SkyWalk__heroCaptionDot" />
                  <span>
                    Bhitarkanika Boat Service • Forest Boardwalks & High Observation Platforms
                  </span>
                </figcaption>
              </figure>

              <div className="SkyWalk__featureGrid">
                <div className="SkyWalk__specBox">
                  <span className="SkyWalk__specNum">01</span>
                  <h3>Canopy-Level Immersion</h3>
                  <p>
                    Walk safely above the tidal silt floor through dense crowns of
                    Sundari, Avicennia, and intertwining climber vines.
                  </p>
                </div>

                <div className="SkyWalk__specBox">
                  <span className="SkyWalk__specNum">02</span>
                  <h3>Multi-Tier Watchtower</h3>
                  <p>
                    Ascend panoramic vantage platforms overlooking river
                    confluences, waterfowl heronries, and distant crocodile mudflats.
                  </p>
                </div>

                <div className="SkyWalk__specBox">
                  <span className="SkyWalk__specNum">03</span>
                  <h3>Boat & Trail Sync</h3>
                  <p>
                    Coordinated jetty transfers from Khola directly to the Dangmal
                    forest trailhead with certified Forest Department eco-guides.
                  </p>
                </div>
              </div>

              <div className="SkyWalk__packageSection">
                <div className="SkyWalk__subHeader">
                  <span>CANOPY PACKAGES & TRAILS</span>
                  <h2>Curated Skywalk & Forest Experiences</h2>
                </div>

                <div className="SkyWalk__packageGrid">
                  {skywalkExperiences.map((pkg) => (
                    <div key={pkg.title} className="SkyWalk__packageCard">
                      <span className="SkyWalk__packageTag">{pkg.tag}</span>
                      <h3>{pkg.title}</h3>
                      <p className="SkyWalk__packageRoute">
                        <strong>Trail:</strong> {pkg.route}
                      </p>
                      <div className="SkyWalk__packageMeta">
                        <span>⏱ {pkg.duration}</span>
                        <span>👥 {pkg.capacity}</span>
                      </div>
                      <p className="SkyWalk__packageDesc">{pkg.highlights}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="SkyWalk__actionBanner">
                <div>
                  <h3>
                    Plan Your Skywalk & Boat Safari with Bhitarakanika Boat Service
                  </h3>
                  <p>
                    Combine your river creek cruise with reserved access to the
                    Dangmal canopy boardwalk and watchtower observation platforms.
                  </p>
                </div>
                <button
                  type="button"
                  className="SkyWalk__btnPrimary"
                  onClick={() => handleTabChange("book-visit")}
                >
                  Reserve Skywalk Tour ↗
                </button>
              </div>
            </div>
          )}

          {/* 2. VISIT & LOGISTICS GUIDE */}
          {activeTab === "visit-guide" && (
            <div className="SkyWalk__viewPane">
              <div className="SkyWalk__eyebrow">
                <span className="SkyWalk__eyebrowLine" />
                <span>CANOPY LOGISTICS & TRAIL REGULATIONS</span>
              </div>

              <h1 className="SkyWalk__pageTitle">
                Everything Required <span>To Walk the Mangrove Canopy.</span>
              </h1>

              <p className="SkyWalk__lead">
                Review visitor safety guidelines, optimal photography hours, permit
                arrangements, and jetty boat connectivity for the Dangmal Skywalk.
              </p>

              <div className="SkyWalk__planAccordion">
                {skywalkFAQs.map((item, index) => {
                  const isOpen = faqIndex === index;

                  return (
                    <div
                      key={item.q}
                      className={`SkyWalk__planItem ${isOpen ? "is-open" : ""}`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        className="SkyWalk__planTrigger"
                        onClick={() => setFaqIndex(isOpen ? -1 : index)}
                      >
                        <span>
                          {String(index + 1).padStart(2, "0")}. {item.q}
                        </span>
                        <span className="SkyWalk__planToggle">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <p className="SkyWalk__planAnswer">{item.a}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="SkyWalk__routeBox">
                <h3>Connecting Transit & Trail Access</h3>
                <ul>
                  <li>
                    <strong>From Khola Departure Jetty:</strong> Board authorized
                    safari crafts via Bhitarakanika Boat Service. A picturesque
                    cruise delivers passengers directly to Dangmal Ghat.
                  </li>
                  <li>
                    <strong>Dangmal Trail Loop:</strong> The skywalk links the
                    interpretive nature center, captive breeding enclosures,
                    historical watchtower, and core wetland trail.
                  </li>
                  <li>
                    <strong>Best Footwear & Attire:</strong> Comfortable flat
                    walking shoes are recommended. Earth-tone clothing is advised
                    for wildlife photography from the canopy deck.
                  </li>
                </ul>

                <p className="SkyWalk__routeNote">
                  <strong>Sanctuary Regulation:</strong> Feeding wild animals from
                  the skywalk, running along boardwalk rails, and using personal
                  drones are strictly prohibited by the Forest Department.
                </p>
              </div>

              <div className="SkyWalk__actionBanner">
                <div>
                  <h3>Arranging a Group or School Educational Tour?</h3>
                  <p>
                    Talk directly to Bhitarakanika Boat Service coordinators for
                    specialized naturalist-led canopy walks and group permit clearance.
                  </p>
                </div>
                <button
                  type="button"
                  className="SkyWalk__btnPrimary"
                  onClick={() => handleTabChange("book-visit")}
                >
                  Inquire for Groups ↗
                </button>
              </div>
            </div>
          )}

          {/* 3. BOOK SKYWALK TOUR */}
          {activeTab === "book-visit" && (
            <div className="SkyWalk__viewPane">
              <div className="SkyWalk__eyebrow">
                <span className="SkyWalk__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • EXPEDITION REGISTRATION</span>
              </div>

              <h1 className="SkyWalk__pageTitle">
                Reserve Your Canopy <span>Skywalk Experience.</span>
              </h1>

              <p className="SkyWalk__lead">
                Submit your expected travel dates and party details. Bhitarakanika
                Boat Service will synchronize your boat departure from Khola Jetty
                with Dangmal Skywalk passes and dedicated naturalist guides.
              </p>

              {formSubmitted ? (
                <div className="SkyWalk__formSuccess">
                  <span className="SkyWalk__checkIcon">✓</span>
                  <h3>Skywalk Booking Inquiry Received!</h3>
                  <p>
                    Your canopy tour request has been received. Our tour desk will
                    verify boat availability, align forest permits, and contact you
                    with the schedule.
                  </p>
                  <button
                    type="button"
                    className="SkyWalk__btnPrimary"
                    onClick={() => {
                      setFormSubmitted(false);
                      setSelectedPassengers(2);
                    }}
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form
                  className="SkyWalk__form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setFormSubmitted(true);
                  }}
                >
                  <div className="SkyWalk__formHeading">
                    <span>BHITARAKANIKA BOAT SERVICE</span>
                    <h3>Skywalk & Boat Safari Booking Form</h3>
                    <p>
                      Complete your details below to reserve your Skywalk experience.
                      Fields marked * are required.
                    </p>
                  </div>

                  <div className="SkyWalk__formGrid">
                    <div className="SkyWalk__inputGroup">
                      <label htmlFor="SkyWalk-name">Lead Passenger Name *</label>
                      <input
                        id="SkyWalk-name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="SkyWalk__inputGroup">
                      <label htmlFor="SkyWalk-email">Email Address *</label>
                      <input
                        id="SkyWalk-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="SkyWalk__inputGroup">
                      <label htmlFor="SkyWalk-phone">
                        WhatsApp / Mobile Number *
                      </label>
                      <input
                        id="SkyWalk-phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter mobile number"
                        autoComplete="tel"
                        required
                      />
                    </div>

                    <div className="SkyWalk__inputGroup">
                      <label htmlFor="SkyWalk-aadhaar">
                        Aadhaar Card Number *
                      </label>
                      <input
                        id="SkyWalk-aadhaar"
                        name="aadhaar"
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter 12-digit Aadhaar number"
                        pattern="[0-9]{12}"
                        minLength={12}
                        maxLength={12}
                        title="Please enter a valid 12-digit Aadhaar number"
                        required
                      />
                    </div>

                    <div className="SkyWalk__inputGroup">
                      <label htmlFor="SkyWalk-date">Expected Visit Date *</label>
                      <input
                        id="SkyWalk-date"
                        name="travelDate"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    <div className="SkyWalk__inputGroup">
                      <label htmlFor="SkyWalk-time">Preferred Safari Time *</label>
                      <select
                        id="SkyWalk-time"
                        name="bookingTime"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>
                          Select Safari Time
                        </option>
                        <optgroup label="Morning Safari">
                          <option value="07:00 AM">07:00 AM</option>
                          <option value="08:00 AM">08:00 AM</option>
                          <option value="09:00 AM">09:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                        </optgroup>
                        <optgroup label="Afternoon Safari">
                          <option value="01:00 PM">01:00 PM</option>
                          <option value="02:00 PM">02:00 PM</option>
                          <option value="03:00 PM">03:00 PM</option>
                          <option value="04:00 PM">04:00 PM</option>
                          <option value="05:00 PM">05:00 PM</option>
                        </optgroup>
                      </select>
                    </div>

                    <div className="SkyWalk__inputGroup SkyWalk__inputGroup--full">
                      <label htmlFor="SkyWalk-entryGate">
                        Preferred Entry Jetty *
                      </label>
                      <select
                        id="SkyWalk-entryGate"
                        name="entryGate"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>
                          Select Entry Jetty
                        </option>
                        <option value="Khola Gate (Direct Cruise to Dangmal Skywalk)">
                          Khola Gate (Direct Cruise to Dangmal Skywalk)
                        </option>
                        <option value="Gupti Gate (Estuary & Coastal Route)">
                          Gupti Gate (Estuary & Coastal Route)
                        </option>
                        <option value="Chandbali Ghat (River Approach)">
                          Chandbali Ghat (River Approach)
                        </option>
                      </select>
                    </div>

                    <div className="SkyWalk__inputGroup SkyWalk__inputGroup--full">
                      <label>Number of Passengers *</label>

                      <div className="SkyWalk__passengerBox">
                        <div className="SkyWalk__passengerHeader">
                          <div>
                            <strong>Select Passengers</strong>
                            <span>Choose your total group size</span>
                          </div>
                          <div className="SkyWalk__passengerCount">
                            {selectedPassengers}{" "}
                            {selectedPassengers === 1 ? "Person" : "Persons"}
                          </div>
                        </div>

                        <div className="SkyWalk__passengerGrid">
                          {Array.from({ length: 18 }, (_, index) => {
                            const number = index + 1;
                            const isSelected = selectedPassengers === number;

                            return (
                              <label
                                key={number}
                                className={`SkyWalk__passengerOption ${
                                  isSelected ? "is-selected" : ""
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="guests"
                                  value={number}
                                  checked={isSelected}
                                  onChange={() => setSelectedPassengers(number)}
                                />
                                <span>{number}</span>
                              </label>
                            );
                          })}
                        </div>

                        <div className="SkyWalk__passengerFooter">
                          <span>
                            <span className="SkyWalk__passengerDot" />
                            Selected passengers: {selectedPassengers}
                          </span>
                          <span>Maximum capacity: 18 persons</span>
                        </div>
                      </div>
                    </div>

                    <div className="SkyWalk__inputGroup SkyWalk__inputGroup--full">
                      <label htmlFor="SkyWalk-service">
                        Select Skywalk Experience *
                      </label>
                      <select
                        id="SkyWalk-service"
                        name="service"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>
                          Select Your Skywalk Experience
                        </option>
                        <option value="Boat Safari + Dangmal Canopy Skywalk Combo (4-5 hrs)">
                          Boat Safari + Dangmal Canopy Skywalk Combo (4-5 hrs)
                        </option>
                        <option value="Morning Watchtower & Eye-Level Birding Trail (3 hrs)">
                          Morning Watchtower & Eye-Level Birding Trail (3 hrs)
                        </option>
                        <option value="Full Day Delta Boat Cruise & Extended Forest Skywalk">
                          Full Day Delta Boat Cruise & Extended Forest Skywalk
                        </option>
                        <option value="Private Photography Canopy Charter (Custom Hours)">
                          Private Photography Canopy Charter (Custom Hours)
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Special Requests textarea intentionally removed */}

                  <div className="SkyWalk__formBottom">
                    <p>
                      <span>*</span> Please check your details before continuing.
                    </p>
                    <button type="submit" className="SkyWalk__submitBtn">
                      Continue Booking <span>↗</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* 4. CANOPY GALLERY */}
          {activeTab === "canopy-gallery" && (
            <div className="SkyWalk__viewPane">
              <div className="SkyWalk__eyebrow">
                <span className="SkyWalk__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • CANOPY PERSPECTIVES</span>
              </div>

              <h1 className="SkyWalk__pageTitle">
                Views from the <span>Mangrove Treetops.</span>
              </h1>

              <p className="SkyWalk__lead">
                Preview views along the elevated wooden boardwalks, watchtower
                perches, and creek bridges across Bhitarkanika. Click any image to
                view details in full screen.
              </p>

              <div className="SkyWalk__galleryPageGrid">
                {galleryImages.map((img, index) => (
                  <button
                    key={`${img.title}-${index}`}
                    type="button"
                    className="SkyWalk__galleryPageCard"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View ${img.title}`}
                  >
                    <img src={img.src} alt={img.title} loading="lazy" />
                    <span className="SkyWalk__galleryCardOverlay">
                      <span>{img.category}</span>
                      <span className="SkyWalk__galleryCardTitle">
                        {img.title}
                      </span>
                      <span className="SkyWalk__galleryLocation">
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
        <aside className="SkyWalk__sidebar">
          <div className="SkyWalk__sideBox">
            <div className="SkyWalk__sideTitle">
              <span />
              <h2>Explore Skywalk</h2>
            </div>

            <nav className="SkyWalk__serviceNav" aria-label="Explore skywalk navigation">
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
                    <span className="SkyWalk__navArrow">↗</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="SkyWalk__supportCard">
            <div className="SkyWalk__supportIcon" aria-hidden="true">
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

            <div className="SkyWalk__supportHeading">
              <span>BHITARAKANIKA BOAT SERVICE</span>
              <h3>Need Trail Assistance?</h3>
            </div>

            <p>
              Tidal schedules affect boat transfers connecting to the Dangmal
              Skywalk. Reach out to our jetty tour desk for today's tide charts and
              trail availability.
            </p>

            <button
              type="button"
              className="SkyWalk__supportLink"
              onClick={() => handleTabChange("book-visit")}
            >
              <span>Connect with Jetty Desk</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          <div className="SkyWalk__sideBox SkyWalk__downloads">
            <div className="SkyWalk__sideTitle">
              <span />
              <h2>Sanctuary Quick Links</h2>
            </div>

            <div className="SkyWalk__downloadGrid">
              <button
                type="button"
                className={activeTab === "skywalk-overview" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("skywalk-overview")}
              >
                <span className="SkyWalk__downloadIcon">01</span>
                <strong>Skywalk Trails</strong>
                <small>View routes ↗</small>
              </button>

              <button
                type="button"
                className={activeTab === "visit-guide" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("visit-guide")}
              >
                <span className="SkyWalk__downloadIcon">02</span>
                <strong>Entry Guide</strong>
                <small>View rules ↗</small>
              </button>
            </div>
          </div>

          <div className="SkyWalk__sideBox SkyWalk__contactBox">
            <div className="SkyWalk__sideTitle">
              <span />
              <h2>Bhitarakanika Boat Service</h2>
            </div>

            <div className="SkyWalk__contactInfo">
              <span className="SkyWalk__contactInfoIcon" aria-hidden="true">📍</span>
              <div>
                <strong>Primary Jetty & Dispatch</strong>
                <p>
                  Khola Entry Ghat, Rajnagar Block, Kendrapara District, Odisha 754225
                </p>
              </div>
            </div>

            <div className="SkyWalk__contactInfo">
              <span className="SkyWalk__contactInfoIcon" aria-hidden="true">✉</span>
              <div>
                <strong>Official Trail Inquiries</strong>
                <a href="mailto:safari@bhitarakanikaboatservice.com">
                  safari@bhitarakanikaboatservice.com
                </a>
              </div>
            </div>

            <div className="SkyWalk__contactInfo">
              <span className="SkyWalk__contactInfoIcon" aria-hidden="true">🕒</span>
              <div>
                <strong>Skywalk & Gate Operating Hours</strong>
                <p>6:30 AM to 5:00 PM (Sunset Clearance Strictly Enforced)</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      {activeImage !== null && (
        <div
          className="SkyWalk__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Canopy Skywalk photograph viewer"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="SkyWalk__lightboxBox"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="SkyWalk__lightboxClose"
              aria-label="Close image viewer"
              onClick={() => setActiveImage(null)}
            >
              ✕
            </button>

            <img
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].title}
            />

            <div className="SkyWalk__lightboxCaption">
              <div>
                <span>{galleryImages[activeImage].category}</span>
                <h3>{galleryImages[activeImage].title}</h3>
                <small>📍 {galleryImages[activeImage].location}</small>
              </div>

              <span className="SkyWalk__lightboxCount">
                {String(activeImage + 1).padStart(2, "0")} /{" "}
                {String(galleryImages.length).padStart(2, "0")}
              </span>
            </div>

            <div className="SkyWalk__lightboxControls">
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

export default SkyWalk;
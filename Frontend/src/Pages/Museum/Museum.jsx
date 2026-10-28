import React, { useEffect, useState } from "react";
import "./Museum.css";
import museumImgOne from "../../assets/museum-1.png";
import museumImgTwo from "../../assets/museum-2.png";
import museumImgThree from "../../assets/museum-3.png";
import museumImgFour from "../../assets/museum-4.png";
import museumImgFive from "../../assets/museum-5.png";
import museumImgSix from "../../assets/museum-6.png";

const galleryImages = [
  {
    src: museumImgOne,
    title: "Dangmal Wildlife Interpretation Hall",
    location: "Dangmal Sanctuary Museum",
    category: "Interpretation Centre",
  },
  {
    src: museumImgTwo,
    title: "World Record Crocodile Skeleton Exhibit",
    location: "Fauna Osteology Gallery",
    category: "Record Specimen",
  },
  {
    src: museumImgThree,
    title: "Preserved Estuarine Crocodile Hatchling Displays",
    location: "Herpetology Research Wing",
    category: "Reptile Life Cycle",
  },
  {
    src: museumImgFour,
    title: "Mangrove Botany & Seed Adaptation Diorama",
    location: "Wetland Ecology Section",
    category: "Botanical Science",
  },
  {
    src: museumImgFive,
    title: "Historical Kanika Dynasty Marine Relics",
    location: "Delta Heritage Gallery",
    category: "Archaeological Exhibit",
  },
  {
    src: museumImgSix,
    title: "Audio-Visual Bio-Diversity Orientation Theatre",
    location: "Orientation Auditorium",
    category: "Conservation Theatre",
  },
];

const navTabs = [
  { id: "museum-overview", label: "Museum & Heritage Center" },
  { id: "exhibit-guide", label: "Exhibits & Visitor Guide" },
  { id: "book-visit", label: "Book Museum Tour" },
  { id: "museum-gallery", label: "Interpretation Gallery" },
];

const museumExperiences = [
  {
    tag: "SIGNATURE TOUR",
    title: "Dangmal Nature Museum & Interpretive Walk",
    route: "Dangmal Forest Jetty → Main Exhibition Gallery → Crocodile Osteology Section → Orientation Hall",
    duration: "1.5 to 2 Hours",
    highlights:
      "Explore life-size skeletal structures of giant saltwater crocodiles, seed germination models, taxidermy collections, and research archives.",
    capacity: "Guided Forest Batch Visits (Up to 15–20 Guests)",
  },
  {
    tag: "STUDENT & RESEARCH",
    title: "Biodiversity & Ecology Education Trail",
    route: "Interpretation Center → Hatchery Laboratory → Botanical Conservatory → Forest Library",
    duration: "2 to 2.5 Hours",
    highlights:
      "Interactive sessions with Forest Department researchers, mangrove seed pods, medicinal plant cataloguing, and audio-visual screenings.",
    capacity: "Dedicated Group Tour with Senior Eco-Educator",
  },
  {
    tag: "BOAT & HERITAGE COMBO",
    title: "Full Day Safari & Museum Experience",
    route: "Khola Jetty Boat Safari → Dangmal Museum Walk → Skywalk Trail → Core Creeks",
    duration: "5 to 6 Hours (Comprehensive Package)",
    highlights:
      "Seamless blend of tidal creek motorboating by Bhitarakanika Boat Service combined with priority access to the Dangmal museum and breeding grounds.",
    capacity: "Custom Private Cruisers & Forest Naturalist",
  },
];

const museumFAQs = [
  {
    q: "Where is the Bhitarkanika Interpretation Centre & Museum situated?",
    a: "The museum is located within the core Dangmal Forest campus on Dangmal Island. Visitors reach the center by taking authorized safari boats operated by Bhitarakanika Boat Service from Khola Jetty Terminal directly to the Dangmal pier.",
  },
  {
    q: "What are the most notable exhibits inside the museum?",
    a: "The centerpiece is the preserved skeletal structure of a record-breaking 20-foot-plus estuarine crocodile. Other highlights include displays on the captive breeding of white crocodiles, mangrove vivipary seeds, water monitor lizard skeletons, and antique artifacts from the local royal dynasty.",
  },
  {
    q: "Is entry to the museum included with the sanctuary boat permit?",
    a: "Yes. General sanctuary entry clearances cover the museum, nature trails, and watchtowers. Bhitarakanika Boat Service coordinates all required Forest Department permits and passenger manifests before embarkation.",
  },
  {
    q: "Is photography allowed inside the museum galleries?",
    a: "Still photography for educational and personal use is generally permitted inside the display halls. Flash photography and professional video equipment may require specific permission from the local range office.",
  },
  {
    q: "What are the museum operating hours and seasonal schedules?",
    a: "The museum is open daily from 7:00 AM to 5:00 PM. Access follows the general sanctuary calendar and remains closed annually between May 1 and July 31 during the saltwater crocodile nesting season.",
  },
];

const Museum = () => {
  const [activeTab, setActiveTab] = useState("museum-overview");
  const [activeImage, setActiveImage] = useState(null);
  const [faqIndex, setFaqIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    if (tabId === "exhibit-guide") {
      setFaqIndex(0);
    }

    if (tabId === "book-visit") {
      setFormSubmitted(false);
    }

    document.getElementById("museum-experience")?.scrollIntoView({
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
    <section className="Museum" id="museum-experience">
      <div className="Museum__layout">
        {/* MAIN CONTENT */}
        <main className="Museum__main" key={activeTab}>
          {/* 1. OVERVIEW */}
          {activeTab === "museum-overview" && (
            <div className="Museum__viewPane">
              <div className="Museum__eyebrow">
                <span className="Museum__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • SANCTUARY INTERPRETATION</span>
              </div>

              <h1 className="Museum__pageTitle">
                Wildlife Interpretation Centre <span>& Natural History Museum.</span>
              </h1>

              <p className="Museum__lead">
                Delve into the evolutionary science and ecological heritage of India’s
                coastal wetlands. Curated inside the Dangmal Forest campus and reached via
                scenic river transit with Bhitarakanika Boat Service, the museum showcases
                the anatomy of giant estuarine crocodiles, rare floral specimens, archaeological
                ruins, and decades of wetland conservation history.
              </p>

              <figure className="Museum__heroFigure">
                <img
                  className="Museum__heroImage"
                  src={museumImgOne}
                  alt="Dangmal Wildlife Interpretation Center and Natural History Museum in Bhitarkanika"
                />

                <figcaption className="Museum__heroCaption">
                  <span className="Museum__heroCaptionDot" />
                  <span>
                    Bhitarakanika Boat Service • Forest Interpretive Exhibits & Heritage Tours
                  </span>
                </figcaption>
              </figure>

              {/* HIGHLIGHT PILLARS */}
              <div className="Museum__featureGrid">
                <div className="Museum__specBox">
                  <span className="Museum__specNum">01</span>
                  <h3>Giant Crocodile Osteology</h3>
                  <p>
                    Inspect complete reconstructed skeletons, skull specimens, and teeth
                    of record-sized salt marsh crocodiles documented in the delta.
                  </p>
                </div>

                <div className="Museum__specBox">
                  <span className="Museum__specNum">02</span>
                  <h3>Mangrove Ecology Displays</h3>
                  <p>
                    Educational models illustrating salt-filtering roots, pneumatophores,
                    estuarine food webs, and coastal storm mitigation.
                  </p>
                </div>

                <div className="Museum__specBox">
                  <span className="Museum__specNum">03</span>
                  <h3>Audio-Visual Orientation</h3>
                  <p>
                    A dedicated theatre playing informative nature documentaries on
                    the Olive Ridley turtle nesting phenomenon and crocodile conservation.
                  </p>
                </div>
              </div>

              {/* PACKAGES */}
              <div className="Museum__packageSection">
                <div className="Museum__subHeader">
                  <span>EXHIBITION EXPERIENCES & TOURS</span>
                  <h2>Curated Museum & Heritage Itineraries</h2>
                </div>

                <div className="Museum__packageGrid">
                  {museumExperiences.map((pkg) => (
                    <div key={pkg.title} className="Museum__packageCard">
                      <span className="Museum__packageTag">{pkg.tag}</span>
                      <h3>{pkg.title}</h3>
                      <p className="Museum__packageRoute">
                        <strong>Route:</strong> {pkg.route}
                      </p>
                      <div className="Museum__packageMeta">
                        <span>⏱ {pkg.duration}</span>
                        <span>👥 {pkg.capacity}</span>
                      </div>
                      <p className="Museum__packageDesc">
                        {pkg.highlights}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="Museum__actionBanner">
                <div>
                  <h3>Plan Your Museum Visit with Bhitarakanika Boat Service</h3>
                  <p>
                    Pre-reserve complete boat cruise transfers from Khola Jetty to Dangmal
                    Island with included museum orientation and guided nature walks.
                  </p>
                </div>

                <button
                  type="button"
                  className="Museum__btnPrimary"
                  onClick={() => handleTabChange("book-visit")}
                >
                  Reserve Museum Tour ↗
                </button>
              </div>
            </div>
          )}

          {/* 2. EXHIBITS & VISITOR GUIDE */}
          {activeTab === "exhibit-guide" && (
            <div className="Museum__viewPane">
              <div className="Museum__eyebrow">
                <span className="Museum__eyebrowLine" />
                <span>EXHIBIT HIGHLIGHTS & VISITATION PROTOCOLS</span>
              </div>

              <h1 className="Museum__pageTitle">
                Everything Required <span>To Tour the Museum Center.</span>
              </h1>

              <p className="Museum__lead">
                Prepare your itinerary with updated guidelines on gallery sections,
                opening schedules, conservation archives, and transportation logistics.
              </p>

              <div className="Museum__planAccordion">
                {museumFAQs.map((item, index) => {
                  const isOpen = faqIndex === index;

                  return (
                    <div
                      key={item.q}
                      className={`Museum__planItem ${
                        isOpen ? "is-open" : ""
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        className="Museum__planTrigger"
                        onClick={() => setFaqIndex(isOpen ? -1 : index)}
                      >
                        <span>
                          {String(index + 1).padStart(2, "0")}. {item.q}
                        </span>

                        <span className="Museum__planToggle">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <p className="Museum__planAnswer">{item.a}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="Museum__routeBox">
                <h3>Key Galleries & Visitor Directives</h3>

                <ul>
                  <li>
                    <strong>Osteology & Anatomy Wing:</strong> Displays real skull fragments,
                    egg incubation models, and biological measurements explaining reptile longevity.
                  </li>

                  <li>
                    <strong>Marine & Mangrove Herbarium:</strong> Preserved samples of rare
                    medicinal mangrove plants, climbing ferns, and estuarine grasses.
                  </li>

                  <li>
                    <strong>Kanika Royal Heritage Collection:</strong> Artifacts, antique maps,
                    and hunting memorabilia documenting the delta's human and feudal history.
                  </li>

                  <li>
                    <strong>Visitor Etiquette:</strong> Touching glass display cases and
                    fragile biological specimens is strictly prohibited. School groups must
                    remain accompanied by designated group supervisors.
                  </li>
                </ul>

                <p className="Museum__routeNote">
                  <strong>Seasonal Advisory:</strong> The museum and surrounding core areas
                  remain closed from <strong>May 1 to July 31</strong> each year for the
                  crocodile nesting cycle. Plan trips during the winter window for ideal conditions.
                </p>
              </div>

              <div className="Museum__actionBanner">
                <div>
                  <h3>Arranging an Educational or Institutional Tour?</h3>
                  <p>
                    Contact Bhitarakanika Boat Service for chartered student group cruises,
                    curated scientific walkthroughs, and audio-visual hall bookings.
                  </p>
                </div>

                <button
                  type="button"
                  className="Museum__btnPrimary"
                  onClick={() => handleTabChange("book-visit")}
                >
                  Inquire for School & Research Groups ↗
                </button>
              </div>
            </div>
          )}

          {/* 3. BOOK MUSEUM TOUR */}
          {activeTab === "book-visit" && (
            <div className="Museum__viewPane">
              <div className="Museum__eyebrow">
                <span className="Museum__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • EXPEDITION REGISTRATION</span>
              </div>

              <h1 className="Museum__pageTitle">
                Reserve Your Guided <span>Museum & Safari Experience.</span>
              </h1>

              <p className="Museum__lead">
                Submit your expected travel dates and party details. Bhitarakanika Boat
                Service will coordinate your boat transfers from Khola Jetty, organize
                Forest Department permits, and reserve your guided museum tour.
              </p>

              {formSubmitted ? (
                <div className="Museum__formSuccess">
                  <span className="Museum__checkIcon">✓</span>

                  <h3>Booking Inquiry Successfully Logged!</h3>

                  <p>
                    Your request has been received by Bhitarakanika Boat Service. Our desk
                    will verify boat departure slots, align forest entry permits, and
                    reach out promptly with schedule details.
                  </p>

                  <button
                    type="button"
                    className="Museum__btnPrimary"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Submit Another Tour Request
                  </button>
                </div>
              ) : (
                <form
                  className="Museum__form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setFormSubmitted(true);
                  }}
                >
                  <div className="Museum__formHeading">
                    <span>BHITARAKANIKA BOAT SERVICE</span>
                    <h3>Museum & Boat Safari Booking Form</h3>
                    <p>
                      Mandatory passenger details required for Forest Department registration (*).
                    </p>
                  </div>

                  <div className="Museum__formGrid">
                    <div className="Museum__inputGroup">
                      <label htmlFor="Museum-name">Lead Passenger Name *</label>
                      <input
                        id="Museum-name"
                        name="name"
                        type="text"
                        placeholder="e.g. Debashis Mohapatra"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="Museum__inputGroup">
                      <label htmlFor="Museum-email">Email Address *</label>
                      <input
                        id="Museum-email"
                        name="email"
                        type="email"
                        placeholder="debashis@example.com"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="Museum__inputGroup">
                      <label htmlFor="Museum-phone">WhatsApp / Mobile Number *</label>
                      <input
                        id="Museum-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 94370 XXXXX"
                        autoComplete="tel"
                        required
                      />
                    </div>

                    <div className="Museum__inputGroup">
                      <label htmlFor="Museum-date">Expected Visit Date *</label>
                      <input
                        id="Museum-date"
                        name="travelDate"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    <div className="Museum__inputGroup">
                      <label htmlFor="Museum-entryGate">Departure Jetty Point</label>
                      <select
                        id="Museum-entryGate"
                        name="entryGate"
                        defaultValue="Khola Gate (Direct Cruise to Dangmal Museum Pier)"
                      >
                        <option value="Khola Gate (Direct Cruise to Dangmal Museum Pier)">
                          Khola Gate (Direct Cruise to Dangmal Museum Pier)
                        </option>
                        <option value="Gupti Gate (Estuary & Coastal Route)">
                          Gupti Gate (Estuary & Coastal Route)
                        </option>
                        <option value="Chandbali Ghat (River Delta Approach)">
                          Chandbali Ghat (River Delta Approach)
                        </option>
                      </select>
                    </div>

                    <div className="Museum__inputGroup">
                      <label htmlFor="Museum-guests">Party Size</label>
                      <select
                        id="Museum-guests"
                        name="guests"
                        defaultValue="1–4 Persons (Private Small Boat + Museum)"
                      >
                        <option value="1–4 Persons (Private Small Boat + Museum)">
                          1–4 Persons (Private Small Boat + Museum)
                        </option>
                        <option value="5–8 Persons (Standard Safari Vessel)">
                          5–8 Persons (Standard Safari Vessel)
                        </option>
                        <option value="9–14 Persons (Large Group Cruiser)">
                          9–14 Persons (Large Group Cruiser)
                        </option>
                        <option value="15+ Persons (Educational / Corporate Tour)">
                          15+ Persons (Educational / Corporate Tour)
                        </option>
                      </select>
                    </div>

                    <div className="Museum__inputGroup Museum__inputGroup--full">
                      <label htmlFor="Museum-service">Select Experience Package</label>
                      <select
                        id="Museum-service"
                        name="service"
                        defaultValue="Boat Safari + Dangmal Museum & Heritage Tour (4-5 hrs)"
                      >
                        <option value="Boat Safari + Dangmal Museum & Heritage Tour (4-5 hrs)">
                          Boat Safari + Dangmal Museum & Heritage Tour (4-5 hrs)
                        </option>
                        <option value="Student Biodiversity & Ecology Education Circuit (3 hrs)">
                          Student Biodiversity & Ecology Education Circuit (3 hrs)
                        </option>
                        <option value="Full Day Delta Boat Cruise, Museum & Canopy Skywalk">
                          Full Day Delta Boat Cruise, Museum & Canopy Skywalk
                        </option>
                        <option value="Custom Research & Photography Charter">
                          Custom Research & Photography Charter
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="Museum__inputGroup">
                    <label htmlFor="Museum-notes">
                      Special Requests / Educational Focus
                    </label>
                    <textarea
                      id="Museum-notes"
                      name="notes"
                      rows="4"
                      placeholder="Let Bhitarakanika Boat Service know if you need audio-visual hall arrangements, student concessions, dedicated eco-guides, or cottage accommodation..."
                    />
                  </div>

                  <button type="submit" className="Museum__submitBtn">
                    Submit Museum Booking Request ↗
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 4. GALLERY */}
          {activeTab === "museum-gallery" && (
            <div className="Museum__viewPane">
              <div className="Museum__eyebrow">
                <span className="Museum__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • ARCHIVE GALLERY</span>
              </div>

              <h1 className="Museum__pageTitle">
                Portraits from the <span>Interpretation Galleries.</span>
              </h1>

              <p className="Museum__lead">
                Browse archival displays, skeletal exhibits, and interpretive
                halls from Dangmal. Click any image to view details in full screen.
              </p>

              <div className="Museum__galleryPageGrid">
                {galleryImages.map((img, index) => (
                  <button
                    key={`${img.title}-${index}`}
                    type="button"
                    className="Museum__galleryPageCard"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View ${img.title}`}
                  >
                    <img src={img.src} alt={img.title} loading="lazy" />

                    <span className="Museum__galleryCardOverlay">
                      <span>{img.category}</span>
                      <span className="Museum__galleryCardTitle">
                        {img.title}
                      </span>
                      <span className="Museum__galleryLocation">
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
        <aside className="Museum__sidebar">
          {/* NAVIGATION */}
          <div className="Museum__sideBox">
            <div className="Museum__sideTitle">
              <span />
              <h2>Explore Museum</h2>
            </div>

            <nav
              className="Museum__serviceNav"
              aria-label="Explore museum navigation"
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
                    <span className="Museum__navArrow">↗</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* SUPPORT CARD */}
          <div className="Museum__supportCard">
            <div className="Museum__supportIcon" aria-hidden="true">
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

            <div className="Museum__supportHeading">
              <span>BHITARAKANIKA BOAT SERVICE</span>
              <h3>Need Visit Guidance?</h3>
            </div>

            <p>
              Tidal levels govern boat transfer schedules to Dangmal Island.
              Connect directly with our dock desk for daily timetables and naturalist bookings.
            </p>

            <button
              type="button"
              className="Museum__supportLink"
              onClick={() => handleTabChange("book-visit")}
            >
              <span>Connect with Jetty Desk</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          {/* QUICK LINKS */}
          <div className="Museum__sideBox Museum__downloads">
            <div className="Museum__sideTitle">
              <span />
              <h2>Sanctuary Quick Links</h2>
            </div>

            <div className="Museum__downloadGrid">
              <button
                type="button"
                className={activeTab === "museum-overview" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("museum-overview")}
              >
                <span className="Museum__downloadIcon">01</span>
                <strong>Exhibits</strong>
                <small>View galleries ↗</small>
              </button>

              <button
                type="button"
                className={activeTab === "exhibit-guide" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("exhibit-guide")}
              >
                <span className="Museum__downloadIcon">02</span>
                <strong>Visitor Guide</strong>
                <small>View timings ↗</small>
              </button>
            </div>
          </div>

          {/* CONTACT INFORMATION */}
          <div className="Museum__sideBox Museum__contactBox">
            <div className="Museum__sideTitle">
              <span />
              <h2>Bhitarakanika Boat Service</h2>
            </div>

            <div className="Museum__contactInfo">
              <span className="Museum__contactInfoIcon" aria-hidden="true">
                📍
              </span>
              <div>
                <strong>Primary Jetty & Booking Counter</strong>
                <p>
                  Khola Entry Ghat, Rajnagar Block, Kendrapara District, Odisha 754225
                </p>
              </div>
            </div>

            <div className="Museum__contactInfo">
              <span className="Museum__contactInfoIcon" aria-hidden="true">
                ✉
              </span>
              <div>
                <strong>Official Tour Inquiries</strong>
                <a href="mailto:safari@bhitarakanikaboatservice.com">
                  safari@bhitarakanikaboatservice.com
                </a>
              </div>
            </div>

            <div className="Museum__contactInfo">
              <span className="Museum__contactInfoIcon" aria-hidden="true">
                🕒
              </span>
              <div>
                <strong>Museum & Gate Operating Hours</strong>
                <p>7:00 AM to 5:00 PM (Sunset Closure Strictly Enforced)</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      {activeImage !== null && (
        <div
          className="Museum__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Museum photograph viewer"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="Museum__lightboxBox"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="Museum__lightboxClose"
              aria-label="Close image viewer"
              onClick={() => setActiveImage(null)}
            >
              ✕
            </button>

            <img
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].title}
            />

            <div className="Museum__lightboxCaption">
              <div>
                <span>{galleryImages[activeImage].category}</span>
                <h3>{galleryImages[activeImage].title}</h3>
                <small>📍 {galleryImages[activeImage].location}</small>
              </div>

              <span className="Museum__lightboxCount">
                {String(activeImage + 1).padStart(2, "0")} /{" "}
                {String(galleryImages.length).padStart(2, "0")}
              </span>
            </div>

            <div className="Museum__lightboxControls">
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

export default Museum;
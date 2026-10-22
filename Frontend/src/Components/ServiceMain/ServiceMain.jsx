import React, { useEffect, useState } from "react";
import "./ServiceMain.css";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=1000&q=85",
    title: "Estuarine Crocodile",
    location: "Dangmal Riverbank",
    category: "Reptiles",
  },
  {
    src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=85",
    title: "Mangrove Tidal Creeks",
    location: "Khola Entry Gate",
    category: "Landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1000&q=85",
    title: "Spotted Deer Herd",
    location: "Sanctuary Meadows",
    category: "Mammals",
  },
  {
    src: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1000&q=85",
    title: "Pied Kingfisher",
    location: "Brahmani River Delta",
    category: "Birds",
  },
  {
    src: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=85",
    title: "Dense Canopy Trail",
    location: "Ancient Mangrove Forest",
    category: "Flora",
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
    title: "Eco Boat Exploration",
    location: "Gupti Water Channel",
    category: "Boating",
  },
];

const navTabs = [
  { id: "boat-safari", label: "Boat Safari" },
  { id: "wildlife-nature", label: "Wildlife & Nature" },
  { id: "trip-planning", label: "Trip Planning" },
  { id: "enquire-trip", label: "Enquire About a Trip" },
  { id: "wildlife-gallery", label: "Wildlife Gallery" },
];

const ServiceMain = () => {
  const [activeTab, setActiveTab] = useState("boat-safari");
  const [activeImage, setActiveImage] = useState(null);
  const [faqIndex, setFaqIndex] = useState(0);

  // Form states for booking enquiry
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Scroll to top of section when tab changes
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (activeImage === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveImage(null);
      if (e.key === "ArrowRight") setActiveImage((c) => (c + 1) % galleryImages.length);
      if (e.key === "ArrowLeft") setActiveImage((c) => (c - 1 + galleryImages.length) % galleryImages.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage]);

  return (
    <section className="ServiceMain" id="services">
      <div className="ServiceMain__layout">
        
        {/* =========================================================
            LEFT DYNAMIC MAIN VIEW (Changes completely per tab)
        ========================================================= */}
        <main className="ServiceMain__main" key={activeTab}>

          {/* 1. BOAT SAFARI VIEW */}
          {activeTab === "boat-safari" && (
            <div className="ServiceMain__viewPane">
              <div className="ServiceMain__eyebrow">
                <span className="ServiceMain__eyebrowLine" />
                <span>RIVER EXPEDITIONS</span>
              </div>

              <h1 className="ServiceMain__pageTitle">
                Guided Boat Safaris <span>Across Tidal Mangroves.</span>
              </h1>

              <p className="ServiceMain__lead">
                Traverse tranquil estuaries, lush mudflats, and sunlit riverbanks where giant saltwater crocodiles bask and river eagles soar overhead.
              </p>

              <figure className="ServiceMain__heroFigure">
                <img
                  className="ServiceMain__heroImage"
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85"
                  alt="Boat safari in mangroves"
                />
                <figcaption className="ServiceMain__heroCaption">
                  <span className="ServiceMain__heroCaptionDot" />
                  <span>Licensed forest eco-boats operate daily</span>
                </figcaption>
              </figure>

              <div className="ServiceMain__featureGrid">
                <div className="ServiceMain__specBox">
                  <span className="ServiceMain__specNum">01</span>
                  <h3>Departures & Timing</h3>
                  <p>Morning safaris (07:30 AM – 11:30 AM) and afternoon excursions (02:00 PM – 05:00 PM) scheduled around daily tidal movements.</p>
                </div>
                <div className="ServiceMain__specBox">
                  <span className="ServiceMain__specNum">02</span>
                  <h3>Certified Naturalists</h3>
                  <p>Every vessel is accompanied by an authorized forest department guide to identify species and navigate deep channels safely.</p>
                </div>
                <div className="ServiceMain__specBox">
                  <span className="ServiceMain__specNum">03</span>
                  <h3>Vessel Capacities</h3>
                  <p>Choice of intimate 4-seater private wooden crafts up to 20-seater covered family eco-vessels equipped with safety jackets.</p>
                </div>
              </div>

              <div className="ServiceMain__actionBanner">
                <div>
                  <h3>Ready to Reserve a Boat?</h3>
                  <p>Check slot availability and reserve your certified eco-safari operator.</p>
                </div>
                <button
                  type="button"
                  className="ServiceMain__btnPrimary"
                  onClick={() => handleTabChange("enquire-trip")}
                >
                  Book Safari Now ↗
                </button>
              </div>
            </div>
          )}

          {/* 2. WILDLIFE & NATURE VIEW */}
          {activeTab === "wildlife-nature" && (
            <div className="ServiceMain__viewPane">
              <div className="ServiceMain__eyebrow">
                <span className="ServiceMain__eyebrowLine" />
                <span>FLORA & FAUNA GUIDE</span>
              </div>

              <h1 className="ServiceMain__pageTitle">
                Sanctuary of Giants <span>& Rare Birdlife.</span>
              </h1>

              <p className="ServiceMain__lead">
                Bhitarkanika harbors India's highest concentration of endangered Saltwater Crocodiles alongside 215+ avian varieties and lush mangrove ecosystems.
              </p>

              <figure className="ServiceMain__heroFigure">
                <img
                  className="ServiceMain__heroImage"
                  src="https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=1600&q=85"
                  alt="Wildlife in Bhitarkanika"
                />
                <figcaption className="ServiceMain__heroCaption">
                  <span className="ServiceMain__heroCaptionDot" />
                  <span>Estuarine sanctuary wildlife habitat</span>
                </figcaption>
              </figure>

              <div className="ServiceMain__wildlifeCards">
                <div className="ServiceMain__animalCard">
                  <h4>Saltwater Crocodiles</h4>
                  <p>Growing up to 20+ feet, these apex prehistoric reptiles thrive in the brackish waterways of Dangmal and Suajore.</p>
                  <span className="ServiceMain__badge">Apex Predator</span>
                </div>
                <div className="ServiceMain__animalCard">
                  <h4>Eight Kingfisher Species</h4>
                  <p>Brown-winged, Pied, Black-capped, and White-throated kingfishers frequent the water branches all year long.</p>
                  <span className="ServiceMain__badge">Birdwatching</span>
                </div>
                <div className="ServiceMain__animalCard">
                  <h4>Olive Ridley Sea Turtles</h4>
                  <p>Nearby Gahirmatha beach hosts mass nesting (arribada) of hundreds of thousands of turtles each winter.</p>
                  <span className="ServiceMain__badge">Coastal Wonder</span>
                </div>
                <div className="ServiceMain__animalCard">
                  <h4>Spotted Deer & Wild Boar</h4>
                  <p>Herds freely graze across the Dangmal enclosure and interior mangrove glades during early daylight hours.</p>
                  <span className="ServiceMain__badge">Mammals</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. TRIP PLANNING VIEW */}
          {activeTab === "trip-planning" && (
            <div className="ServiceMain__viewPane">
              <div className="ServiceMain__eyebrow">
                <span className="ServiceMain__eyebrowLine" />
                <span>TRAVEL CHECKLIST & LOGISTICS</span>
              </div>

              <h1 className="ServiceMain__pageTitle">
                Everything You Need <span>To Plan Your Visit.</span>
              </h1>

              <p className="ServiceMain__lead">
                Plan entry points, forest checkpoint permits, and transport gateways to ensure a seamless experience in Kendrapara district.
              </p>

              <div className="ServiceMain__planAccordion">
                {[
                  {
                    q: "Which entry gate should I choose (Khola vs Gupti)?",
                    a: "Khola Gate is the primary and most accessible checkpoint for day visitors and boat tours heading into Dangmal. Gupti Gate is situated further east and is ideal for long river expeditions leading towards the coastal creeks.",
                  },
                  {
                    q: "How to obtain official entry permits?",
                    a: "Permits are issued at Forest Department counters at Khola and Gupti entry points upon presenting valid photo ID. Arrive early (07:30 AM – 09:00 AM) to clear registration smoothly.",
                  },
                  {
                    q: "What is the best season to explore?",
                    a: "October through March offers pleasant weather, peak crocodile basking visibility, and the arrival of thousands of migratory birds across the wetlands.",
                  },
                  {
                    q: "What should I pack for the river safari?",
                    a: "Neutral cotton clothing, sun hat, UV protection, binoculars for bird spotting, refillable water bottle, and government identity cards.",
                  },
                ].map((item, idx) => {
                  const isOpen = faqIndex === idx;
                  return (
                    <div
                      key={item.q}
                      className={`ServiceMain__planItem ${isOpen ? "is-open" : ""}`}
                    >
                      <button
                        type="button"
                        onClick={() => setFaqIndex(isOpen ? -1 : idx)}
                        className="ServiceMain__planTrigger"
                      >
                        <span>0{idx + 1}. {item.q}</span>
                        <span className="ServiceMain__planToggle">{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && <p className="ServiceMain__planAnswer">{item.a}</p>}
                    </div>
                  );
                })}
              </div>

              <div className="ServiceMain__routeBox">
                <h3>🚗 Reaching Bhitarkanika</h3>
                <ul>
                  <li><strong>By Air:</strong> Biju Patnaik Airport, Bhubaneswar (~140 km, 3.5 hrs drive).</li>
                  <li><strong>By Rail:</strong> Bhadrak (70 km) or Cuttack (110 km) railway stations.</li>
                  <li><strong>Road Access:</strong> Taxis and private rentals connect directly to Rajnagar / Khola.</li>
                </ul>
              </div>
            </div>
          )}

          {/* 4. ENQUIRE ABOUT A TRIP VIEW */}
          {activeTab === "enquire-trip" && (
            <div className="ServiceMain__viewPane">
              <div className="ServiceMain__eyebrow">
                <span className="ServiceMain__eyebrowLine" />
                <span>BOOKINGS & ENQUIRY</span>
              </div>

              <h1 className="ServiceMain__pageTitle">
                Start Planning Your <span>Wildlife Expedition.</span>
              </h1>

              <p className="ServiceMain__lead">
                Fill in your expected visit details below. Our licensed guides and trip coordinators will assist you with pricing, boat options, and permit scheduling.
              </p>

              {formSubmitted ? (
                <div className="ServiceMain__formSuccess">
                  <span className="ServiceMain__checkIcon">✓</span>
                  <h3>Thank you for your enquiry!</h3>
                  <p>Our nature tour desk has received your request and will contact you via email/phone shortly.</p>
                  <button
                    type="button"
                    className="ServiceMain__btnPrimary"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form
                  className="ServiceMain__form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                >
                  <div className="ServiceMain__formGrid">
                    <div className="ServiceMain__inputGroup">
                      <label>Full Name *</label>
                      <input type="text" placeholder="e.g. Rahul Sharma" required />
                    </div>

                    <div className="ServiceMain__inputGroup">
                      <label>Email Address *</label>
                      <input type="email" placeholder="rahul@example.com" required />
                    </div>

                    <div className="ServiceMain__inputGroup">
                      <label>Phone Number *</label>
                      <input type="tel" placeholder="+91 98765 43210" required />
                    </div>

                    <div className="ServiceMain__inputGroup">
                      <label>Expected Travel Date</label>
                      <input type="date" />
                    </div>

                    <div className="ServiceMain__inputGroup">
                      <label>Number of Guests</label>
                      <select>
                        <option>1 – 2 Persons (Couple / Solo)</option>
                        <option>3 – 5 Persons (Family)</option>
                        <option>6 – 10 Persons (Group)</option>
                        <option>10+ Persons (Large Tour)</option>
                      </select>
                    </div>

                    <div className="ServiceMain__inputGroup">
                      <label>Interested Service</label>
                      <select>
                        <option>Guided Boat Safari (Morning)</option>
                        <option>Guided Boat Safari (Afternoon)</option>
                        <option>Full Day Wildlife & Birding Tour</option>
                        <option>Custom Photography Expedition</option>
                      </select>
                    </div>
                  </div>

                  <div className="ServiceMain__inputGroup">
                    <label>Additional Notes or Custom Requirements</label>
                    <textarea rows="4" placeholder="Let us know if you need pickup guidance, special birding requests, or eco-cottage recommendations..." />
                  </div>

                  <button type="submit" className="ServiceMain__submitBtn">
                    Submit Travel Request ↗
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 5. WILDLIFE GALLERY VIEW */}
          {activeTab === "wildlife-gallery" && (
            <div className="ServiceMain__viewPane">
              <div className="ServiceMain__eyebrow">
                <span className="ServiceMain__eyebrowLine" />
                <span>PHOTOGRAPHY SHOWCASE</span>
              </div>

              <h1 className="ServiceMain__pageTitle">
                Moments Captured in the <span>Mangrove Wild.</span>
              </h1>

              <p className="ServiceMain__lead">
                Click any photograph below to open the high-resolution lightbox view.
              </p>

              <div className="ServiceMain__galleryPageGrid">
                {galleryImages.map((img, idx) => (
                  <div
                    key={img.title}
                    className="ServiceMain__galleryPageCard"
                    onClick={() => setActiveImage(idx)}
                    role="button"
                    tabIndex={0}
                  >
                    <img src={img.src} alt={img.title} loading="lazy" />
                    <div className="ServiceMain__galleryCardOverlay">
                      <span>{img.category}</span>
                      <h4>{img.title}</h4>
                      <small>📍 {img.location}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

        {/* =========================================================
            RIGHT FIXED SIDEBAR (Controls the Active View)
        ========================================================= */}
        <aside className="ServiceMain__sidebar">
          
          {/* Explore Services Navigator Box */}
          <div className="ServiceMain__sideBox">
            <div className="ServiceMain__sideTitle">
              <span />
              <h2>Explore Services</h2>
            </div>

            <nav className="ServiceMain__serviceNav" aria-label="Explore service views">
              {navTabs.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    className={isSelected ? "is-highlighted" : ""}
                    onClick={() => handleTabChange(tab.id)}
                  >
                    <span className="ServiceMain__navArrow">↗</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Help & Support Card */}
          <div className="ServiceMain__supportCard">
            <div className="ServiceMain__supportIcon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 13v-2a7 7 0 0 1 14 0v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <rect x="3.5" y="11" width="4" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                <rect x="16.5" y="11" width="4" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="M18 18c0 2-2 3-5 3h-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>

            <div className="ServiceMain__supportHeading">
              <span>HERE TO HELP</span>
              <h3>Need Travel Guidance?</h3>
            </div>

            <p>
              Get verified guidance on boat safaris, entry gate timings, and official forest checkpoint regulations.
            </p>

            <button
              type="button"
              className="ServiceMain__supportLink"
              onClick={() => handleTabChange("enquire-trip")}
            >
              <span>Contact Tour Desk</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          {/* Quick Travel Essentials Cards */}
          <div className="ServiceMain__sideBox ServiceMain__downloads">
            <div className="ServiceMain__sideTitle">
              <span />
              <h2>Travel Essentials</h2>
            </div>

            <div className="ServiceMain__downloadGrid">
              <button
                type="button"
                className={activeTab === "boat-safari" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("boat-safari")}
              >
                <span className="ServiceMain__downloadIcon">01</span>
                <strong>Boat Safari</strong>
                <small>View itineraries ↗</small>
              </button>

              <button
                type="button"
                className={activeTab === "trip-planning" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("trip-planning")}
              >
                <span className="ServiceMain__downloadIcon">02</span>
                <strong>Trip Planning</strong>
                <small>View guidelines ↗</small>
              </button>
            </div>
          </div>

          {/* Quick Contact Info */}
          <div className="ServiceMain__sideBox ServiceMain__contactBox">
            <div className="ServiceMain__sideTitle">
              <span />
              <h2>Get in Touch</h2>
            </div>

            <div className="ServiceMain__contactInfo">
              <span className="ServiceMain__contactInfoIcon">📍</span>
              <div>
                <strong>Location</strong>
                <p>Khola Gate, Bhitarkanika Sanctuary, Odisha</p>
              </div>
            </div>

            <div className="ServiceMain__contactInfo">
              <span className="ServiceMain__contactInfoIcon">✉️</span>
              <div>
                <strong>Email</strong>
                <a href="mailto:info@example.com">info@example.com</a>
              </div>
            </div>

            <div className="ServiceMain__contactInfo">
              <span className="ServiceMain__contactInfoIcon">🕒</span>
              <div>
                <strong>Safari Timings</strong>
                <p>07:00 AM – 05:00 PM (Daily, weather permitting)</p>
              </div>
            </div>
          </div>
        </aside>

      </div>

      {/* Fullscreen Lightbox */}
      {activeImage !== null && (
        <div
          className="ServiceMain__lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveImage(null)}
        >
          <div className="ServiceMain__lightboxBox" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="ServiceMain__lightboxClose"
              onClick={() => setActiveImage(null)}
            >
              ✕
            </button>
            <img src={galleryImages[activeImage].src} alt={galleryImages[activeImage].title} />
            <div className="ServiceMain__lightboxCaption">
              <div>
                <span>{galleryImages[activeImage].category}</span>
                <h3>{galleryImages[activeImage].title}</h3>
                <small>📍 {galleryImages[activeImage].location}</small>
              </div>
              <span className="ServiceMain__lightboxCount">
                0{activeImage + 1} / 0{galleryImages.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceMain;
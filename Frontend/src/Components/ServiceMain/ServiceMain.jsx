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
  { id: "trip-planning", label: "Trip Planning" },
  { id: "enquire-trip", label: "Enquire About a Trip" },
  { id: "wildlife-gallery", label: "Wildlife Gallery" },
];

const planningFAQs = [
  {
    q: "Which entry gate should I choose (Khola vs Gupti)?",
    a: "Khola Gate is a common entry point for visitors and boat tours heading towards Dangmal. Gupti Gate provides access to different river routes and coastal creeks. Confirm the best entry point with the local Forest Department before travelling.",
  },
  {
    q: "How can I obtain official entry permits?",
    a: "Check the current permit requirements with the Forest Department or the relevant official entry checkpoint before your visit. Carry valid photo identification and allow sufficient time for registration.",
  },
  {
    q: "What is the best season to explore?",
    a: "October through March is generally a pleasant period to explore the mangroves and observe migratory birds. Weather, wildlife visibility, and access conditions can vary.",
  },
  {
    q: "What should I pack for the river safari?",
    a: "Carry comfortable clothing, a sun hat, sunscreen, binoculars, drinking water, and valid identification. Follow your boat operator's safety instructions throughout the trip.",
  },
];

const ServiceMain = () => {
  const [activeTab, setActiveTab] = useState("boat-safari");
  const [activeImage, setActiveImage] = useState(null);
  const [faqIndex, setFaqIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    if (tabId === "trip-planning") {
      setFaqIndex(0);
    }

    if (tabId === "enquire-trip") {
      setFormSubmitted(false);
    }

    document
      .getElementById("services")
      ?.scrollIntoView({
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
        setActiveImage(
          (current) => (current + 1) % galleryImages.length
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveImage(
          (current) =>
            (current - 1 + galleryImages.length) %
            galleryImages.length
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
    <section className="ServiceMain" id="services">
      <div className="ServiceMain__layout">

        {/* MAIN CONTENT */}
        <main className="ServiceMain__main" key={activeTab}>

          {/* 1. BOAT SAFARI */}
          {activeTab === "boat-safari" && (
            <div className="ServiceMain__viewPane">
              <div className="ServiceMain__eyebrow">
                <span className="ServiceMain__eyebrowLine" />
                <span>RIVER EXPEDITIONS</span>
              </div>

              <h1 className="ServiceMain__pageTitle">
                Guided Boat Safaris{" "}
                <span>Across Tidal Mangroves.</span>
              </h1>

              <p className="ServiceMain__lead">
                Explore tranquil estuaries, lush mangrove creeks,
                and sunlit riverbanks while discovering the remarkable
                wildlife of Bhitarkanika.
              </p>

              <figure className="ServiceMain__heroFigure">
                <img
                  className="ServiceMain__heroImage"
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85"
                  alt="Nature and river landscape during a boat safari"
                />

                <figcaption className="ServiceMain__heroCaption">
                  <span className="ServiceMain__heroCaptionDot" />
                  <span>
                    Explore the mangroves with an authorized boat operator
                  </span>
                </figcaption>
              </figure>

              <div className="ServiceMain__featureGrid">
                <div className="ServiceMain__specBox">
                  <span className="ServiceMain__specNum">01</span>

                  <h3>Departures & Timing</h3>

                  <p>
                    Plan morning or afternoon excursions according
                    to local operating hours, tidal conditions,
                    and weather.
                  </p>
                </div>

                <div className="ServiceMain__specBox">
                  <span className="ServiceMain__specNum">02</span>

                  <h3>Local Nature Guides</h3>

                  <p>
                    Discover mangrove ecosystems and local wildlife
                    with an authorized guide, subject to availability.
                  </p>
                </div>

                <div className="ServiceMain__specBox">
                  <span className="ServiceMain__specNum">03</span>

                  <h3>Boat Options</h3>

                  <p>
                    Ask about private boats, family-friendly vessels,
                    seating capacity, and available safety equipment.
                  </p>
                </div>
              </div>

              <div className="ServiceMain__actionBanner">
                <div>
                  <h3>Ready to Reserve a Boat?</h3>

                  <p>
                    Send an enquiry to discuss availability and
                    suitable safari options.
                  </p>
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

          {/* 2. TRIP PLANNING */}
          {activeTab === "trip-planning" && (
            <div className="ServiceMain__viewPane">
              <div className="ServiceMain__eyebrow">
                <span className="ServiceMain__eyebrowLine" />
                <span>TRAVEL CHECKLIST & LOGISTICS</span>
              </div>

              <h1 className="ServiceMain__pageTitle">
                Everything You Need{" "}
                <span>To Plan Your Visit.</span>
              </h1>

              <p className="ServiceMain__lead">
                Prepare for your Bhitarkanika visit with practical
                information about entry points, permits, travel,
                and essential items.
              </p>

              <div className="ServiceMain__planAccordion">
                {planningFAQs.map((item, index) => {
                  const isOpen = faqIndex === index;

                  return (
                    <div
                      key={item.q}
                      className={`ServiceMain__planItem ${
                        isOpen ? "is-open" : ""
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        className="ServiceMain__planTrigger"
                        onClick={() =>
                          setFaqIndex(isOpen ? -1 : index)
                        }
                      >
                        <span>
                          {String(index + 1).padStart(2, "0")}.{" "}
                          {item.q}
                        </span>

                        <span className="ServiceMain__planToggle">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <p className="ServiceMain__planAnswer">
                          {item.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="ServiceMain__routeBox">
                <h3>Reaching Bhitarkanika</h3>

                <ul>
                  <li>
                    <strong>By Air:</strong> Bhubaneswar Airport
                    is a major air gateway for visitors travelling
                    to the region.
                  </li>

                  <li>
                    <strong>By Rail:</strong> Check trains to
                    Bhadrak or other suitable railway stations
                    before planning onward transport.
                  </li>

                  <li>
                    <strong>By Road:</strong> Arrange a taxi or
                    private vehicle to reach your selected entry
                    point.
                  </li>
                </ul>

                <p className="ServiceMain__routeNote">
                  Travel distances, access routes, entry rules,
                  and operating times may vary. Verify current
                  information before departure.
                </p>
              </div>

              <div className="ServiceMain__actionBanner">
                <div>
                  <h3>Need Help Planning Your Trip?</h3>

                  <p>
                    Tell us about your travel dates and group size.
                  </p>
                </div>

                <button
                  type="button"
                  className="ServiceMain__btnPrimary"
                  onClick={() => handleTabChange("enquire-trip")}
                >
                  Enquire Now ↗
                </button>
              </div>
            </div>
          )}

          {/* 3. ENQUIRE ABOUT A TRIP */}
          {activeTab === "enquire-trip" && (
            <div className="ServiceMain__viewPane">
              <div className="ServiceMain__eyebrow">
                <span className="ServiceMain__eyebrowLine" />
                <span>BOOKINGS & ENQUIRY</span>
              </div>

              <h1 className="ServiceMain__pageTitle">
                Start Planning Your{" "}
                <span>Wildlife Expedition.</span>
              </h1>

              <p className="ServiceMain__lead">
                Share your expected visit details to enquire about
                boat options, travel arrangements, and availability.
              </p>

              {formSubmitted ? (
                <div className="ServiceMain__formSuccess">
                  <span className="ServiceMain__checkIcon">
                    ✓
                  </span>

                  <h3>Thank You for Your Enquiry!</h3>

                  <p>
                    Your form has been submitted successfully in
                    this demo interface. Connect the form to your
                    backend or email service to receive actual
                    booking enquiries.
                  </p>

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
                  onSubmit={(event) => {
                    event.preventDefault();
                    setFormSubmitted(true);
                  }}
                >
                  <div className="ServiceMain__formHeading">
                    <span>YOUR JOURNEY STARTS HERE</span>
                    <h3>Travel Enquiry Form</h3>
                    <p>
                      Fields marked with * are required.
                    </p>
                  </div>

                  <div className="ServiceMain__formGrid">
                    <div className="ServiceMain__inputGroup">
                      <label htmlFor="ServiceMain-name">
                        Full Name *
                      </label>

                      <input
                        id="ServiceMain-name"
                        name="name"
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="ServiceMain__inputGroup">
                      <label htmlFor="ServiceMain-email">
                        Email Address *
                      </label>

                      <input
                        id="ServiceMain-email"
                        name="email"
                        type="email"
                        placeholder="rahul@example.com"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="ServiceMain__inputGroup">
                      <label htmlFor="ServiceMain-phone">
                        Phone Number *
                      </label>

                      <input
                        id="ServiceMain-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                        required
                      />
                    </div>

                    <div className="ServiceMain__inputGroup">
                      <label htmlFor="ServiceMain-date">
                        Expected Travel Date
                      </label>

                      <input
                        id="ServiceMain-date"
                        name="travelDate"
                        type="date"
                        min={new Date().toLocaleDateString("en-CA")}
                      />
                    </div>

                    <div className="ServiceMain__inputGroup">
                      <label htmlFor="ServiceMain-guests">
                        Number of Guests
                      </label>

                      <select
                        id="ServiceMain-guests"
                        name="guests"
                        defaultValue="1–2 Persons"
                      >
                        <option value="1–2 Persons">
                          1–2 Persons
                        </option>

                        <option value="3–5 Persons">
                          3–5 Persons
                        </option>

                        <option value="6–10 Persons">
                          6–10 Persons
                        </option>

                        <option value="10+ Persons">
                          10+ Persons
                        </option>
                      </select>
                    </div>

                    <div className="ServiceMain__inputGroup">
                      <label htmlFor="ServiceMain-service">
                        Interested Service
                      </label>

                      <select
                        id="ServiceMain-service"
                        name="service"
                        defaultValue="Morning Boat Safari"
                      >
                        <option value="Morning Boat Safari">
                          Morning Boat Safari
                        </option>

                        <option value="Afternoon Boat Safari">
                          Afternoon Boat Safari
                        </option>

                        <option value="Wildlife and Birding Tour">
                          Wildlife and Birding Tour
                        </option>

                        <option value="Photography Expedition">
                          Photography Expedition
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="ServiceMain__inputGroup">
                    <label htmlFor="ServiceMain-notes">
                      Additional Notes
                    </label>

                    <textarea
                      id="ServiceMain-notes"
                      name="notes"
                      rows="4"
                      placeholder="Tell us about your travel requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="ServiceMain__submitBtn"
                  >
                    Submit Travel Request ↗
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 4. WILDLIFE GALLERY */}
          {activeTab === "wildlife-gallery" && (
            <div className="ServiceMain__viewPane">
              <div className="ServiceMain__eyebrow">
                <span className="ServiceMain__eyebrowLine" />
                <span>PHOTOGRAPHY SHOWCASE</span>
              </div>

              <h1 className="ServiceMain__pageTitle">
                Moments Captured in the{" "}
                <span>Mangrove Wild.</span>
              </h1>

              <p className="ServiceMain__lead">
                Explore our wildlife and nature gallery. Select
                a photograph to view it in the fullscreen gallery.
              </p>

              <div className="ServiceMain__galleryPageGrid">
                {galleryImages.map((img, index) => (
                  <button
                    key={img.title}
                    type="button"
                    className="ServiceMain__galleryPageCard"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View ${img.title}`}
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      loading="lazy"
                    />

                    <span className="ServiceMain__galleryCardOverlay">
                      <span>{img.category}</span>

                      <span className="ServiceMain__galleryCardTitle">
                        {img.title}
                      </span>

                      <span className="ServiceMain__galleryLocation">
                        <span aria-hidden="true">📍</span>{" "}
                        {img.location}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="ServiceMain__sidebar">

          {/* EXPLORE SERVICES */}
          <div className="ServiceMain__sideBox">
            <div className="ServiceMain__sideTitle">
              <span />
              <h2>Explore Services</h2>
            </div>

            <nav
              className="ServiceMain__serviceNav"
              aria-label="Explore services"
            >
              {navTabs.map((tab) => {
                const isSelected = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    className={
                      isSelected ? "is-highlighted" : ""
                    }
                    aria-current={
                      isSelected ? "page" : undefined
                    }
                    onClick={() => handleTabChange(tab.id)}
                  >
                    <span className="ServiceMain__navArrow">
                      ↗
                    </span>

                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* SUPPORT CARD */}
          <div className="ServiceMain__supportCard">
            <div
              className="ServiceMain__supportIcon"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13v-2a7 7 0 0 1 14 0v2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <rect
                  x="3.5"
                  y="11"
                  width="4"
                  height="7"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <rect
                  x="16.5"
                  y="11"
                  width="4"
                  height="7"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <path
                  d="M18 18c0 2-2 3-5 3h-1"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="ServiceMain__supportHeading">
              <span>HERE TO HELP</span>
              <h3>Need Travel Guidance?</h3>
            </div>

            <p>
              Need assistance with your boat safari, travel
              arrangements, or trip planning? Send us an enquiry.
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

          {/* TRAVEL ESSENTIALS */}
          <div className="ServiceMain__sideBox ServiceMain__downloads">
            <div className="ServiceMain__sideTitle">
              <span />
              <h2>Travel Essentials</h2>
            </div>

            <div className="ServiceMain__downloadGrid">
              <button
                type="button"
                className={
                  activeTab === "boat-safari"
                    ? "is-active-btn"
                    : ""
                }
                onClick={() => handleTabChange("boat-safari")}
              >
                <span className="ServiceMain__downloadIcon">
                  01
                </span>

                <strong>Boat Safari</strong>
                <small>View details ↗</small>
              </button>

              <button
                type="button"
                className={
                  activeTab === "trip-planning"
                    ? "is-active-btn"
                    : ""
                }
                onClick={() => handleTabChange("trip-planning")}
              >
                <span className="ServiceMain__downloadIcon">
                  02
                </span>

                <strong>Trip Planning</strong>
                <small>View guidelines ↗</small>
              </button>
            </div>
          </div>

          {/* CONTACT INFORMATION */}
          <div className="ServiceMain__sideBox ServiceMain__contactBox">
            <div className="ServiceMain__sideTitle">
              <span />
              <h2>Get in Touch</h2>
            </div>

            <div className="ServiceMain__contactInfo">
              <span
                className="ServiceMain__contactInfoIcon"
                aria-hidden="true"
              >
                📍
              </span>

              <div>
                <strong>Location</strong>

                <p>
                  Khola Gate, Bhitarkanika Sanctuary, Odisha
                </p>
              </div>
            </div>

            <div className="ServiceMain__contactInfo">
              <span
                className="ServiceMain__contactInfoIcon"
                aria-hidden="true"
              >
                ✉
              </span>

              <div>
                <strong>Email</strong>

                <a href="mailto:info@example.com">
                  info@example.com
                </a>
              </div>
            </div>

            <div className="ServiceMain__contactInfo">
              <span
                className="ServiceMain__contactInfoIcon"
                aria-hidden="true"
              >
                🕒
              </span>

              <div>
                <strong>Safari Timings</strong>

                <p>
                  Check current operating hours before travelling.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FULLSCREEN GALLERY LIGHTBOX */}
      {activeImage !== null && (
        <div
          className="ServiceMain__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Wildlife photograph viewer"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="ServiceMain__lightboxBox"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="ServiceMain__lightboxClose"
              aria-label="Close image viewer"
              onClick={() => setActiveImage(null)}
            >
              ✕
            </button>

            <img
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].title}
            />

            <div className="ServiceMain__lightboxCaption">
              <div>
                <span>
                  {galleryImages[activeImage].category}
                </span>

                <h3>
                  {galleryImages[activeImage].title}
                </h3>

                <small>
                  📍 {galleryImages[activeImage].location}
                </small>
              </div>

              <span className="ServiceMain__lightboxCount">
                {String(activeImage + 1).padStart(2, "0")} /{" "}
                {String(galleryImages.length).padStart(2, "0")}
              </span>
            </div>

            <div className="ServiceMain__lightboxControls">
              <button
                type="button"
                onClick={() =>
                  setActiveImage(
                    (activeImage - 1 + galleryImages.length) %
                      galleryImages.length
                  )
                }
                aria-label="Previous image"
              >
                ← Previous
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveImage(
                    (activeImage + 1) % galleryImages.length
                  )
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

export default ServiceMain;
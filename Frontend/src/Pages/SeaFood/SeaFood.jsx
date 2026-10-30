import React, { useEffect, useState } from "react";
import "./SeaFood.css";
import seafoodImgOne from "../../assets/sea-food-1.png";
import seafoodImgTwo from "../../assets/sea-food-2.png";
import seafoodImgThree from "../../assets/sea-food-3.png";
import seafoodImgFour from "../../assets/sea-food-4.png";
import seafoodImgFive from "../../assets/sea-food-5.png";
import seafoodImgSix from "../../assets/sea-food-6.png";

const galleryImages = [
  {
    src: seafoodImgOne,
    title: "Fresh Estuarine Mud Crab Curry (Kankada Jhola)",
    location: "Dangmal Island Dining Hall",
    category: "Delta Delicacy",
  },
  {
    src: seafoodImgTwo,
    title: "Golden Fried Tiger Prawns (Chingudi Bhaja)",
    location: "Khola Jetty Waterfront Kitchen",
    category: "Fresh Catch",
  },
  {
    src: seafoodImgThree,
    title: "Smoked Hilsa (Ilishi Machha Besara)",
    location: "Dhamra Confluence Floating Dining",
    category: "Traditional Odia Thali",
  },
  {
    src: seafoodImgFour,
    title: "Coastal Pomfret Tawa Fry",
    location: "Gupti Jetty Coastal Retreat",
    category: "Marine Grill",
  },
  {
    src: seafoodImgFive,
    title: "Claypot Prawn Malai Curry",
    location: "Bhitarkanika Eco Cottage Kitchen",
    category: "Chef's Special",
  },
  {
    src: seafoodImgSix,
    title: "Authentic Odia Coastal Seafood Feast",
    location: "Sanctuary Camp Gazebo",
    category: "Traditional Feast",
  },
];

const navTabs = [
  { id: "seafood-menu", label: "Seafood Dining Packages" },
  { id: "culinary-guide", label: "Fresh Catch & Sourcing Guide" },
  { id: "book-dining", label: "Reserve Seafood Meal" },
  { id: "culinary-gallery", label: "Coastal Culinary Gallery" },
];

const diningPackages = [
  {
    tag: "SIGNATURE FEAST",
    title: "Royal Delta Mud Crab & Prawn Thali",
    route: "Dangmal Island Resort / Khola Waterfront Pavilion",
    duration: "Lunch (12:30 PM – 3:30 PM) / Dinner (7:30 PM – 10:00 PM)",
    highlights:
      "Freshly harvested brackish water mud crabs (Kankada Jhola), jumbo tiger prawns, mustard ilishi curry, steamed coastal rice, dalma, and sweet chhena poda.",
    capacity: "Individual Travellers, Couples & Family Groups",
  },
  {
    tag: "BOAT CRUISE SPECIAL",
    title: "Onboard River Safari Seafood Lunch",
    route: "Khola Jetty → Suajore Creek → River Anchor Point",
    duration: "Served Mid-Safari (Between 1:00 PM – 2:30 PM)",
    highlights:
      "Hot packed estuarine prawn biryani or fish curry meal boxes prepared fresh at the jetty kitchen, served anchored amidst calm mangrove waterways.",
    capacity: "Pre-reserved for Private & Group Safari Boats",
  },
  {
    tag: "CHEF'S CATCH",
    title: "Live Catch Evening Barbecue & Grill",
    route: "Eco Cottage Lawn / Riverside Campsite Deck",
    duration: "Evening (6:30 PM – 9:30 PM)",
    highlights:
      "Charcoal-grilled river prawns, spice-marinated sea bass (Bhetki), whole pomfret, coastal salads, and warm rumali rotis under the starlit sky.",
    capacity: "Custom Setup for Family & Corporate Groups",
  },
];

const culinaryFAQs = [
  {
    q: "How fresh is the seafood served during the Bhitarkanika tours?",
    a: "All seafood is caught daily from local estuarine river mouths, brackish backwaters, and traditional fishing villages adjoining Dhamra and Talchua. We never use frozen stock; mud crabs and giant tiger prawns are sourced live every morning.",
  },
  {
    q: "Can hot seafood meals be pre-ordered directly on the safari boat?",
    a: "Yes. Bhitarakanika Boat Service allows travellers to pre-book hot packaged safari meals or full traditional seafood thalis at our jetty counters before departure, timed for anchor breaks inside the permissible river channels.",
  },
  {
    q: "Are vegetarian and non-seafood meals available for accompanying guests?",
    a: "Absolutely. Along with our rich coastal seafood spread, we offer traditional Odia vegetarian thalis (Dalma, Besara, Saga Bhaja, Chhena Tarkari) and farm-fresh country chicken curries prepared in separate kitchen sections.",
  },
  {
    q: "What local fish and seafood varieties are most recommended?",
    a: "Bhitarkanika's mud crabs (known for rich, sweet meat), giant river tiger prawns, estuarine Bhetki (Barramundi), and seasonal Ilishi (Hilsa) from the Brahmani-Baitarani confluence are absolute must-tries.",
  },
  {
    q: "Is prior booking mandatory for specialized seafood dining?",
    a: "Advance booking of at least 4 to 6 hours is strongly recommended, especially for live mud crabs and tiger prawns, as catches are procured and cleaned fresh based on daily guest orders.",
  },
];

const SeaFood = () => {
  const [activeTab, setActiveTab] = useState("seafood-menu");
  const [activeImage, setActiveImage] = useState(null);
  const [faqIndex, setFaqIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedDiners, setSelectedDiners] = useState(2);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    if (tabId === "culinary-guide") {
      setFaqIndex(0);
    }

    if (tabId === "book-dining") {
      setFormSubmitted(false);
    }

    document.getElementById("seafood-services")?.scrollIntoView({
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
    <section className="SeaFood" id="seafood-services">
      <div className="SeaFood__layout">
        {/* MAIN CONTENT */}
        <main className="SeaFood__main" key={activeTab}>
          {/* 1. SEAFOOD DINING OVERVIEW */}
          {activeTab === "seafood-menu" && (
            <div className="SeaFood__viewPane">
              <div className="SeaFood__eyebrow">
                <span className="SeaFood__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • COASTAL CULINARY EXPERIENCES</span>
              </div>

              <h1 className="SeaFood__pageTitle">
                Authentic Delta Seafood <span>& Fresh Estuarine Feasts.</span>
              </h1>

              <p className="SeaFood__lead">
                Complement your river expedition with the rich culinary heritage of coastal
                Odisha. Savor fresh estuarine mud crabs, jumbo tiger prawns, and spiced
                Bhetki curated by Bhitarakanika Boat Service, freshly prepared using
                traditional claypots, mustard pastes, and aromatic local spices.
              </p>

              <figure className="SeaFood__heroFigure">
                <img
                  className="SeaFood__heroImage"
                  src={seafoodImgOne}
                  alt="Authentic Odia mud crab curry and prawn seafood spread in Bhitarkanika"
                />

                <figcaption className="SeaFood__heroCaption">
                  <span className="SeaFood__heroCaptionDot" />
                  <span>
                    Bhitarakanika Boat Service • Daily Fresh Catch & Riverside Kitchens
                  </span>
                </figcaption>
              </figure>

              {/* HIGHLIGHT PILLARS */}
              <div className="SeaFood__featureGrid">
                <div className="SeaFood__specBox">
                  <span className="SeaFood__specNum">01</span>
                  <h3>Daily Fresh Catch</h3>
                  <p>
                    Procured every dawn from local coastal fishermen around Dhamra and Talchua
                    estuary channels, ensuring tender sweetness and zero chemical preservation.
                  </p>
                </div>

                <div className="SeaFood__specBox">
                  <span className="SeaFood__specNum">02</span>
                  <h3>Authentic Odia Recipes</h3>
                  <p>
                    Prepared using slow-cooked mustard bases (Besara), sun-dried spices, and
                    aromatic coconut gravies that define coastal Kendrapara cuisine.
                  </p>
                </div>

                <div className="SeaFood__specBox">
                  <span className="SeaFood__specNum">03</span>
                  <h3>Boat Safari Sync</h3>
                  <p>
                    Pre-order hot seafood lunches directly coordinated with your boat safari
                    timings, served either onboard or at riverside forest resthouses.
                  </p>
                </div>
              </div>

              {/* DINING PACKAGES */}
              <div className="SeaFood__packageSection">
                <div className="SeaFood__subHeader">
                  <span>CURATED COASTAL TASTINGS</span>
                  <h2>Popular Bhitarkanika Seafood Menus</h2>
                </div>

                <div className="SeaFood__packageGrid">
                  {diningPackages.map((pkg) => (
                    <div key={pkg.title} className="SeaFood__packageCard">
                      <span className="SeaFood__packageTag">{pkg.tag}</span>
                      <h3>{pkg.title}</h3>
                      <p className="SeaFood__packageRoute">
                        <strong>Venue:</strong> {pkg.route}
                      </p>
                      <div className="SeaFood__packageMeta">
                        <span>⏱ {pkg.duration}</span>
                        <span>👥 {pkg.capacity}</span>
                      </div>
                      <p>{pkg.highlights}</p>
                      <button
                        type="button"
                        className="SeaFood__textLink"
                        onClick={() => handleTabChange("book-dining")}
                      >
                        Reserve This Meal <span>↗</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. CULINARY GUIDE */}
          {activeTab === "culinary-guide" && (
            <div className="SeaFood__viewPane">
              <div className="SeaFood__eyebrow">
                <span className="SeaFood__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • SOURCING & PREPARATION</span>
              </div>

              <h1 className="SeaFood__pageTitle">
                From the Estuary <span>to Your Dining Table.</span>
              </h1>

              <p className="SeaFood__lead">
                Discover the local ingredients, fishing traditions, and careful preparation
                behind every coastal meal served during your Bhitarkanika experience.
              </p>

              <div className="SeaFood__guideGrid">
                <article className="SeaFood__guideCard">
                  <span className="SeaFood__guideNumber">01</span>
                  <h3>Locally Sourced Ingredients</h3>
                  <p>
                    Our menus highlight seasonal estuarine fish, mud crabs, prawns, local
                    vegetables, and ingredients sourced through nearby fishing communities.
                  </p>
                </article>

                <article className="SeaFood__guideCard">
                  <span className="SeaFood__guideNumber">02</span>
                  <h3>Traditional Coastal Cooking</h3>
                  <p>
                    Regional cooking methods bring together mustard, turmeric, coconut,
                    aromatic spices, and traditional Odia recipes.
                  </p>
                </article>

                <article className="SeaFood__guideCard">
                  <span className="SeaFood__guideNumber">03</span>
                  <h3>Safari Meal Coordination</h3>
                  <p>
                    Advance meal requests help coordinate packed lunches and dining schedules
                    with your planned boat safari.
                  </p>
                </article>
              </div>

              <div className="SeaFood__faqSection">
                <div className="SeaFood__subHeader">
                  <span>HELPFUL INFORMATION</span>
                  <h2>Seafood Dining FAQs</h2>
                </div>

                <div className="SeaFood__faqList">
                  {culinaryFAQs.map((faq, index) => (
                    <div
                      key={faq.q}
                      className={`SeaFood__faqItem ${
                        faqIndex === index ? "is-open" : ""
                      }`}
                    >
                      <button
                        type="button"
                        className="SeaFood__faqQuestion"
                        onClick={() =>
                          setFaqIndex(faqIndex === index ? -1 : index)
                        }
                        aria-expanded={faqIndex === index}
                      >
                        <span>{faq.q}</span>
                        <span>{faqIndex === index ? "−" : "+"}</span>
                      </button>

                      {faqIndex === index && (
                        <div className="SeaFood__faqAnswer">
                          <p>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="SeaFood__guideCTA">
                <div>
                  <span>PERSONALIZED DINING ARRANGEMENTS</span>
                  <h3>Have Large Group or Specific Dietary Inquiries?</h3>
                  <p>
                    Talk directly to our catering desk at Bhitarakanika Boat Service for
                    banquet thali menus, picnic boxes, and cottage barbecue arrangements.
                  </p>
                </div>

                <button
                  type="button"
                  className="SeaFood__btnPrimary"
                  onClick={() => handleTabChange("book-dining")}
                >
                  Send Dining Inquiry ↗
                </button>
              </div>
            </div>
          )}

          {/* 3. BOOK SEAFOOD DINING */}
          {activeTab === "book-dining" && (
            <div className="SeaFood__viewPane">
              <div className="SeaFood__eyebrow">
                <span className="SeaFood__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • DINING RESERVATIONS</span>
              </div>

              <h1 className="SeaFood__pageTitle">
                Reserve Your Fresh <span>Coastal Seafood Meal.</span>
              </h1>

              <p className="SeaFood__lead">
                Submit your travel dates and dining preferences. Our culinary desk will
                reserve fresh catch supplies, align meal deliveries with your safari schedule,
                and prepare your feast.
              </p>

              {formSubmitted ? (
                <div className="SeaFood__formSuccess">
                  <span className="SeaFood__checkIcon">✓</span>

                  <h3>Dining Request Received!</h3>

                  <p>
                    Your seafood dining request has been logged successfully with Bhitarakanika
                    Boat Service. Our kitchen coordinator will verify daily fresh catch availability
                    and contact you with confirmation.
                  </p>

                  <button
                    type="button"
                    className="SeaFood__btnPrimary"
                    onClick={() => {
                      setFormSubmitted(false);
                      setSelectedDiners(2);
                    }}
                  >
                    Submit Another Dining Request
                  </button>
                </div>
              ) : (
                <form
                  className="SeaFood__form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setFormSubmitted(true);
                  }}
                >
                  <div className="SeaFood__formHeading">
                    <span>BHITARAKANIKA BOAT SERVICE</span>
                    <h3>Seafood Meal Booking Form</h3>
                    <p>
                      Please share your contact and meal preferences (*).
                    </p>
                  </div>

                  <div className="SeaFood__formGrid">
                    <div className="SeaFood__inputGroup">
                      <label htmlFor="SeaFood-name">Lead Guest Name *</label>
                      <input
                        id="SeaFood-name"
                        name="name"
                        type="text"
                        placeholder="Enter lead guest full name"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="SeaFood__inputGroup">
                      <label htmlFor="SeaFood-email">Email Address *</label>
                      <input
                        id="SeaFood-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="SeaFood__inputGroup">
                      <label htmlFor="SeaFood-phone">
                        WhatsApp / Mobile Number *
                      </label>
                      <input
                        id="SeaFood-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 94370 XXXXX"
                        autoComplete="tel"
                        pattern="[+0-9()\\s-]{8,18}"
                        title="Enter a valid mobile number"
                        required
                      />
                    </div>

                    <div className="SeaFood__inputGroup">
                      <label htmlFor="SeaFood-aadhaar">
                        Aadhaar Card Number <span>(Optional)</span>
                      </label>
                      <input
                        id="SeaFood-aadhaar"
                        name="aadhaar"
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter 12-digit Aadhaar number"
                        pattern="[0-9]{12}"
                        maxLength="12"
                        title="Aadhaar number must contain exactly 12 digits"
                      />
                    </div>

                    <div className="SeaFood__inputGroup">
                      <label htmlFor="SeaFood-date">Expected Dining Date *</label>
                      <input
                        id="SeaFood-date"
                        name="travelDate"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    <div className="SeaFood__inputGroup">
                      <label htmlFor="SeaFood-time">Preferred Dining Time *</label>
                      <select
                        id="SeaFood-time"
                        name="diningTime"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>
                          Select dining time
                        </option>
                        <option value="7:00 AM - 9:00 AM">
                          7:00 AM - 9:00 AM
                        </option>
                        <option value="9:00 AM - 11:00 AM">
                          9:00 AM - 11:00 AM
                        </option>
                        <option value="11:00 AM - 1:00 PM">
                          11:00 AM - 1:00 PM
                        </option>
                        <option value="1:00 PM - 3:00 PM">
                          1:00 PM - 3:00 PM
                        </option>
                        <option value="3:00 PM - 5:00 PM">
                          3:00 PM - 5:00 PM
                        </option>
                        <option value="7:30 PM - 10:00 PM">
                          7:30 PM - 10:00 PM
                        </option>
                      </select>
                    </div>

                    <div className="SeaFood__inputGroup SeaFood__inputGroup--full">
                      <label htmlFor="SeaFood-diningVenue">
                        Preferred Dining Venue *
                      </label>
                      <select
                        id="SeaFood-diningVenue"
                        name="venue"
                        defaultValue="Khola Jetty Waterfront Dining Pavilion"
                        required
                      >
                        <option value="Khola Jetty Waterfront Dining Pavilion">
                          Khola Jetty Waterfront Dining Pavilion
                        </option>
                        <option value="Dangmal Island Resort Restaurant">
                          Dangmal Island Resort Restaurant
                        </option>
                        <option value="Packed Safari Boat Lunch (Onboard Anchored Meal)">
                          Packed Safari Boat Lunch (Onboard Anchored Meal)
                        </option>
                        <option value="Gupti Jetty Coastal Retreat">
                          Gupti Jetty Coastal Retreat
                        </option>
                      </select>
                    </div>

                    <div className="SeaFood__inputGroup SeaFood__inputGroup--full">
                      <label>Number of Diners *</label>
                      <div
                        className="SeaFood__passengerGrid"
                        role="group"
                        aria-label="Select number of diners"
                      >
                        {Array.from({ length: 18 }, (_, index) => index + 1).map(
                          (number) => (
                            <button
                              key={number}
                              type="button"
                              className={`SeaFood__passengerBtn ${
                                selectedDiners === number ? "is-active" : ""
                              }`}
                              onClick={() => setSelectedDiners(number)}
                              aria-pressed={selectedDiners === number}
                            >
                              {number}
                            </button>
                          )
                        )}
                      </div>

                      <input
                        type="hidden"
                        name="guests"
                        value={selectedDiners}
                      />

                      <small className="SeaFood__passengerHint">
                        Selected: {selectedDiners}{" "}
                        {selectedDiners === 1 ? "Diner" : "Diners"} (Maximum 18)
                      </small>
                    </div>

                    <div className="SeaFood__inputGroup SeaFood__inputGroup--full">
                      <label htmlFor="SeaFood-package">
                        Select Seafood Dining Package *
                      </label>
                      <select
                        id="SeaFood-package"
                        name="package"
                        defaultValue="Royal Delta Mud Crab & Jumbo Prawn Special Thali"
                        required
                      >
                        <option value="Royal Delta Mud Crab & Jumbo Prawn Special Thali">
                          Royal Delta Mud Crab & Jumbo Prawn Special Thali
                        </option>
                        <option value="Standard Coastal Fish & Prawn Thali (Bhetki / Pomfret)">
                          Standard Coastal Fish & Prawn Thali (Bhetki / Pomfret)
                        </option>
                        <option value="Onboard Hot Safari Packed Meal (Prawn Biryani Box)">
                          Onboard Hot Safari Packed Meal (Prawn Biryani Box)
                        </option>
                        <option value="Live Evening Barbecue & Coastal Tawa Grill">
                          Live Evening Barbecue & Coastal Tawa Grill
                        </option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="SeaFood__submitBtn">
                    Submit Dining Request ↗
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 4. CULINARY GALLERY */}
          {activeTab === "culinary-gallery" && (
            <div className="SeaFood__viewPane">
              <div className="SeaFood__eyebrow">
                <span className="SeaFood__eyebrowLine" />
                <span>BHITARAKANIKA BOAT SERVICE • FOOD ARCHIVE</span>
              </div>

              <h1 className="SeaFood__pageTitle">
                Dishes from the <span>Estuarine Hearth.</span>
              </h1>

              <p className="SeaFood__lead">
                Explore signature seafood preparations served to travelers in Bhitarkanika.
                Click any dish photograph to view details in full screen.
              </p>

              <div className="SeaFood__galleryPageGrid">
                {galleryImages.map((img, index) => (
                  <button
                    key={`${img.title}-${index}`}
                    type="button"
                    className="SeaFood__galleryPageCard"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View ${img.title}`}
                  >
                    <img src={img.src} alt={img.title} loading="lazy" />

                    <span className="SeaFood__galleryCardOverlay">
                      <span>{img.category}</span>
                      <span className="SeaFood__galleryCardTitle">
                        {img.title}
                      </span>
                      <span className="SeaFood__galleryLocation">
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
        <aside className="SeaFood__sidebar">
          {/* NAVIGATION */}
          <div className="SeaFood__sideBox">
            <div className="SeaFood__sideTitle">
              <span />
              <h2>Explore Dining Desk</h2>
            </div>

            <nav
              className="SeaFood__serviceNav"
              aria-label="Explore seafood dining navigation"
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
                    <span className="SeaFood__navArrow">↗</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* SUPPORT CARD */}
          <div className="SeaFood__supportCard">
            <div className="SeaFood__supportIcon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div className="SeaFood__supportHeading">
              <span>BHITARAKANIKA BOAT SERVICE</span>
              <h3>Need Dining Assistance?</h3>
            </div>

            <p>
              Fresh catch availability fluctuates with morning hauls. Connect directly
              with our dining manager for today's live mud crab and prawn stocks.
            </p>

            <button
              type="button"
              className="SeaFood__supportLink"
              onClick={() => handleTabChange("book-dining")}
            >
              <span>Connect with Dining Desk</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          {/* QUICK LINKS */}
          <div className="SeaFood__sideBox SeaFood__downloads">
            <div className="SeaFood__sideTitle">
              <span />
              <h2>Dining Quick Links</h2>
            </div>

            <div className="SeaFood__downloadGrid">
              <button
                type="button"
                className={activeTab === "seafood-menu" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("seafood-menu")}
              >
                <span className="SeaFood__downloadIcon">01</span>
                <strong>Menu Tiers</strong>
                <small>View dishes ↗</small>
              </button>

              <button
                type="button"
                className={activeTab === "culinary-guide" ? "is-active-btn" : ""}
                onClick={() => handleTabChange("culinary-guide")}
              >
                <span className="SeaFood__downloadIcon">02</span>
                <strong>Catch Guide</strong>
                <small>Sourcing rules ↗</small>
              </button>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="SeaFood__sideBox SeaFood__contactBox">
            <div className="SeaFood__sideTitle">
              <span />
              <h2>Bhitarakanika Boat Service</h2>
            </div>

            <div className="SeaFood__contactInfo">
              <span className="SeaFood__contactInfoIcon" aria-hidden="true">
                📍
              </span>
              <div>
                <strong>Kitchen & Dining Hub</strong>
                <p>
                  Khola Entry Ghat, Rajnagar Block, Kendrapara District, Odisha 754225
                </p>
              </div>
            </div>

            <div className="SeaFood__contactInfo">
              <span className="SeaFood__contactInfoIcon" aria-hidden="true">
                ✉
              </span>
              <div>
                <strong>Dining Inquiries</strong>
                <a href="mailto:safari@bhitarakanikaboatservice.com">
                  safari@bhitarakanikaboatservice.com
                </a>
              </div>
            </div>

            <div className="SeaFood__contactInfo">
              <span className="SeaFood__contactInfoIcon" aria-hidden="true">
                🕒
              </span>
              <div>
                <strong>Kitchen Operating Hours</strong>
                <p>7:00 AM to 9:30 PM (Pre-orders Taken Daily)</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      {activeImage !== null && (
        <div
          className="SeaFood__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Seafood photograph viewer"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="SeaFood__lightboxBox"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="SeaFood__lightboxClose"
              aria-label="Close image viewer"
              onClick={() => setActiveImage(null)}
            >
              ✕
            </button>

            <img
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].title}
            />

            <div className="SeaFood__lightboxCaption">
              <div>
                <span>{galleryImages[activeImage].category}</span>
                <h3>{galleryImages[activeImage].title}</h3>
                <small>📍 {galleryImages[activeImage].location}</small>
              </div>

              <span className="SeaFood__lightboxCount">
                {String(activeImage + 1).padStart(2, "0")} /{" "}
                {String(galleryImages.length).padStart(2, "0")}
              </span>
            </div>

            <div className="SeaFood__lightboxControls">
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

export default SeaFood;
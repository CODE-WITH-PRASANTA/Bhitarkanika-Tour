
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPlane,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import "./Tourpackage.css";

// =====================================================
// FRONTEND-ONLY ODISHA TOUR PACKAGES
// No backend API or database required
// =====================================================

const tourPackages = [
  {
    id: 1,
    slug: "bhitarkanika-wildlife-safari",
    title: "Bhitarkanika Wildlife Safari",
    destination: "Bhitarkanika",
    duration: "2 DAYS / 1 NIGHT",
    tag: "WILDLIFE & NATURE",
    route: "Bhitarkanika → Mangrove Forest → River Safari",
    price: 2499,
    oldPrice: 2999,
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 2,
    slug: "puri-jagannath-tour",
    title: "Puri Jagannath Temple Tour",
    destination: "Puri",
    duration: "2 DAYS / 1 NIGHT",
    tag: "TEMPLE & CULTURE",
    route: "Puri → Jagannath Temple → Golden Beach",
    price: 1999,
    oldPrice: 2499,
    image:
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 3,
    slug: "konark-sun-temple-tour",
    title: "Konark Sun Temple Experience",
    destination: "Konark",
    duration: "1 DAY",
    tag: "HERITAGE & HISTORY",
    route: "Bhubaneswar → Dhauli → Konark Sun Temple",
    price: 1499,
    oldPrice: 1999,
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 4,
    slug: "chilika-lake-tour",
    title: "Chilika Lake Boat Adventure",
    destination: "Chilika Lake",
    duration: "1 DAY",
    tag: "LAKE & BIRDWATCHING",
    route: "Barkul → Chilika Lake → Scenic Boat Ride",
    price: 1799,
    oldPrice: 2299,
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 5,
    slug: "daringbadi-hill-station",
    title: "Daringbadi Hill Station Escape",
    destination: "Daringbadi",
    duration: "3 DAYS / 2 NIGHTS",
    tag: "HILLS & NATURE",
    route: "Daringbadi → Pine Forest → Hill Viewpoints",
    price: 3999,
    oldPrice: 4599,
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 6,
    slug: "odisha-complete-tour",
    title: "Discover the Best of Odisha",
    destination: "Odisha",
    duration: "5 DAYS / 4 NIGHTS",
    tag: "COMPLETE ODISHA TOUR",
    route: "Bhubaneswar → Puri → Konark → Chilika",
    price: 6999,
    oldPrice: 7999,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
  },
];

// =====================================================
// HELPERS
// =====================================================

const formatPrice = (price) =>
  `₹${Number(price).toLocaleString("en-IN")}`;

const Tourpackage = () => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // =====================================================
  // RESPONSIVE SLIDER
  // =====================================================

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 650);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // =====================================================
  // SLIDER CONTROLS
  // =====================================================

  const handlePrev = () => {
    setCurrentIndex((previous) =>
      previous === 0 ? tourPackages.length - 1 : previous - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((previous) =>
      previous === tourPackages.length - 1 ? 0 : previous + 1
    );
  };

  // =====================================================
  // NAVIGATION
  // =====================================================

  const handleCardClick = (pkg) => {
    navigate(`/tours/${pkg.slug}`);
  };

  const handleBooking = (event, pkg) => {
    event.stopPropagation();
    navigate(`/tours/${pkg.slug}`);
  };

  const handleViewAll = () => {
    navigate("/tours");
  };

  // =====================================================
  // DISPLAY PACKAGES
  // =====================================================

  const displayedPackages = isMobile
    ? [tourPackages[currentIndex]]
    : tourPackages;

  // =====================================================
  // JSX
  // =====================================================

  return (
    <section className="tourpackage-section">
      <div className="tourpackage-container">

        {/* ================= HEADER ================= */}

        <div className="tourpackage-header">
          <div className="tourpackage-badge">
            <span className="badge-arrow">→</span>
            <span className="badge-text">
              Explore Incredible Odisha
            </span>
            <span className="badge-wave">✦</span>
          </div>

          <h2 className="tourpackage-main-title">
            Discover Odisha Tour Packages
          </h2>

          <p className="tourpackage-subtext">
            From Bhitarkanika's mysterious mangrove forests and
            wildlife safaris to Puri's sacred temples, Konark's
            architectural wonders, and Chilika's peaceful waters,
            discover unforgettable experiences across Odisha.
          </p>
        </div>

        {/* ================= TOUR PACKAGES GRID ================= */}

        <div className="tourpackage-grid">
          {displayedPackages.map((pkg) => (
            <article
              key={pkg.id}
              className="tourpackage-card"
              onClick={() => handleCardClick(pkg)}
              role="link"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleCardClick(pkg);
                }
              }}
            >
              {/* IMAGE */}

              <div className="card-img-wrap">
                <img
                  src={pkg.image}
                  alt={`${pkg.title} in Odisha`}
                  className="card-image"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.visibility = "hidden";
                  }}
                />

                <div className="shine-sweep-overlay" />

                <span className="badge-duration">
                  {pkg.duration}
                </span>

                <div className="badge-location-tag">
                  <FaMapMarkerAlt className="loc-icon" />
                  <span>{pkg.tag}</span>
                </div>
              </div>

              {/* CARD CONTENT */}

              <div className="card-body-content">
                <h3 className="card-title" title={pkg.title}>
                  {pkg.title}
                </h3>

                <p className="card-route-text" title={pkg.route}>
                  {pkg.route}
                </p>

                <hr className="card-divider-line" />

                {/* PRICE AND BOOKING */}

                <div className="card-footer-flex">
                  <div className="price-container">
                    <span className="starting-text">
                      Starting From:
                    </span>

                    <div className="price-row">
                      <span className="active-price">
                        {formatPrice(pkg.price)}
                      </span>

                      {pkg.oldPrice > pkg.price && (
                        <span className="striked-price">
                          {formatPrice(pkg.oldPrice)}
                        </span>
                      )}
                    </div>

                    <span className="taxes-note">
                      PER PERSON / ESTIMATED PRICE
                    </span>
                  </div>

                  <button
                    type="button"
                    className="btn-book-tour-pkg"
                    onClick={(event) => handleBooking(event, pkg)}
                  >
                    <span>Explore Trip</span>
                    <FaPlane className="plane-fly-icon" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ================= MOBILE SLIDER ================= */}

        {isMobile && tourPackages.length > 1 && (
          <div className="mobile-slider-controls">
            <button
              type="button"
              className="slider-arrow-btn"
              onClick={handlePrev}
              aria-label="Previous package"
            >
              <FaChevronLeft />
            </button>

            <div className="slider-indicator-dots">
              {tourPackages.map((pkg, index) => (
                <button
                  key={pkg.id}
                  type="button"
                  aria-label={`Show ${pkg.title}`}
                  aria-current={
                    currentIndex === index ? "true" : undefined
                  }
                  className={`slider-dot ${
                    currentIndex === index ? "active" : ""
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <button
              type="button"
              className="slider-arrow-btn"
              onClick={handleNext}
              aria-label="Next package"
            >
              <FaChevronRight />
            </button>
          </div>
        )}

        {/* ================= VIEW ALL ================= */}

        <div className="view-all-packages-wrapper">
          <button
            type="button"
            className="btn-view-all-golden"
            onClick={handleViewAll}
          >
            <span>View All Odisha Packages</span>
            <FaChevronRight className="view-all-arrow" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Tourpackage;

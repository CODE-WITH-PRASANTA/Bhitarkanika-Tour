
import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaLeaf,
  FaBinoculars,
  FaTree,
  FaWater,
  FaCamera,
  FaCompass,
  FaPaw,
  FaShieldAlt,
} from "react-icons/fa";

import "./Facility.css";

import facilityImg1 from "../../assets/sky-walk.jpeg";
import facilityImg2 from "../../assets/crocodile.jpeg";

// ============================================
// BHITARKANIKA FACILITY SLIDES
// ============================================

const facilitySlides = [
  {
    id: 1,
    eyebrow: "EXPLORE THE MANGROVES",
    title: "Walk Into The Heart Of Nature",
    description:
      "Discover the fascinating mangrove ecosystem of Bhitarkanika, Odisha. Wander along nature trails, experience the peaceful forest atmosphere, and admire the extraordinary beauty of this coastal wilderness.",
    features: [
      {
        icon: FaTree,
        title: "Mangrove Forest Trails",
      },
      {
        icon: FaCompass,
        title: "Nature Exploration",
      },
      {
        icon: FaBinoculars,
        title: "Birdwatching",
      },
      {
        icon: FaCamera,
        title: "Photography Spots",
      },
      {
        icon: FaLeaf,
        title: "Rich Biodiversity",
      },
      {
        icon: FaWater,
        title: "Coastal Ecosystem",
      },
    ],
    image: facilityImg1,
    imageAlt: "Nature trail through the mangrove forest of Bhitarkanika",
    imageLabel: "MANGROVE NATURE TRAILS",
  },
  {
    id: 2,
    eyebrow: "DISCOVER THE WILD",
    title: "Witness The Mighty Saltwater Crocodile",
    description:
      "Experience the wild side of Bhitarkanika, famous for its saltwater crocodiles and remarkable wildlife. Explore the riverbanks and mangrove waterways on an authorized guided safari while appreciating these magnificent reptiles from a safe distance.",
    features: [
      {
        icon: FaPaw,
        title: "Saltwater Crocodiles",
      },
      {
        icon: FaWater,
        title: "Scenic River Safaris",
      },
      {
        icon: FaBinoculars,
        title: "Wildlife Observation",
      },
      {
        icon: FaTree,
        title: "Mangrove Habitats",
      },
      {
        icon: FaCamera,
        title: "Wildlife Photography",
      },
      {
        icon: FaShieldAlt,
        title: "Responsible Wildlife Viewing",
      },
    ],
    image: facilityImg2,
    imageAlt: "Saltwater crocodile in its natural mangrove habitat",
    imageLabel: "WILDLIFE EXPERIENCE",
  },
];

// ============================================
// FACILITY COMPONENT
// ============================================

const Facility = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isAnimating) return;

    const animationTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 450);

    return () => clearTimeout(animationTimer);
  }, [isAnimating, currentSlide]);

  const handleSlideChange = (newIndex) => {
    if (newIndex === currentSlide || isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide(newIndex);
  };

  const handlePrev = () => {
    const previousIndex =
      currentSlide === 0
        ? facilitySlides.length - 1
        : currentSlide - 1;

    handleSlideChange(previousIndex);
  };

  const handleNext = () => {
    const nextIndex =
      currentSlide === facilitySlides.length - 1
        ? 0
        : currentSlide + 1;

    handleSlideChange(nextIndex);
  };

  const current = facilitySlides[currentSlide];

  return (
    <section className="facility-section">
      <div className="facility-container">

        {/* =====================================
            LEFT CONTENT COLUMN
        ===================================== */}

        <div
          className="facility-left-col"
          style={{
            "--bg-image": `url(${current.image})`,
          }}
        >
          {/* SECTION BADGE */}

          <div className="facility-badge">
            <span className="facility-badge-icon">
              <FaLeaf />
            </span>

            <span className="facility-badge-text">
              Discover Bhitarkanika
            </span>

            <span className="facility-badge-star">✦</span>
          </div>

          {/* SLIDE CONTENT */}

          <div
            className={`facility-slide-content ${
              isAnimating
                ? "facility-slide-fade-out"
                : "facility-slide-fade-in"
            }`}
            key={current.id}
          >
            <span className="facility-eyebrow">
              {current.eyebrow}
            </span>

            <h2 className="facility-title">
              {current.title}
            </h2>

            <p className="facility-desc">
              {current.description}
            </p>

            {/* FEATURE LIST */}

            <div className="facility-features-grid">
              {current.features.map((feature, index) => {
                const FeatureIcon = feature.icon;

                return (
                  <div
                    className="facility-feature-item"
                    key={`${current.id}-${index}`}
                  >
                    <span className="facility-feature-icon">
                      <FeatureIcon />
                    </span>

                    <span className="facility-feature-name">
                      {feature.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* NATURE HIGHLIGHT */}

            <div className="facility-nature-note">
              <span className="facility-nature-note-icon">
                <FaLeaf />
              </span>

              <p>
                Discover responsibly. Respect wildlife. Preserve nature.
              </p>
            </div>
          </div>

          {/* =====================================
              PAGINATION CONTROLS
          ===================================== */}

          <div className="facility-pagination">
            <button
              type="button"
              className="facility-page-arrow"
              onClick={handlePrev}
              disabled={isAnimating}
              aria-label="Previous experience"
            >
              <FaArrowLeft />
            </button>

            <div className="facility-page-numbers">
              {facilitySlides.map((slide, index) => (
                <button
                  type="button"
                  key={slide.id}
                  className={`facility-num-btn ${
                    currentSlide === index
                      ? "facility-num-active"
                      : ""
                  }`}
                  onClick={() => handleSlideChange(index)}
                  disabled={isAnimating}
                  aria-label={`Show ${slide.imageLabel}`}
                  aria-current={
                    currentSlide === index ? "true" : undefined
                  }
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              ))}
            </div>

            <span className="facility-page-divider">/</span>

            <span className="facility-page-total">
              {String(facilitySlides.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              className="facility-page-arrow"
              onClick={handleNext}
              disabled={isAnimating}
              aria-label="Next experience"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* =====================================
            RIGHT IMAGE COLUMN
        ===================================== */}

        <div className="facility-right-col">
          <div className="facility-img-wrapper">

            {/* IMAGE SLIDES */}

            {facilitySlides.map((slide, index) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.imageAlt}
                className={`facility-main-img ${
                  index === currentSlide
                    ? "facility-main-img-active"
                    : ""
                }`}
                loading="lazy"
              />
            ))}

            {/* IMAGE GRADIENT */}

            <div className="facility-image-gradient" />

            {/* IMAGE LABEL */}

            <div className="facility-image-label">
              <span className="facility-image-label-icon">
                <FaLeaf />
              </span>

              <div>
                <span className="facility-image-label-small">
                  EXPERIENCE NATURE
                </span>

                <h3>{current.imageLabel}</h3>
              </div>
            </div>

            {/* NATURE BADGE */}

            <div className="facility-nature-badge">
              <div className="facility-nature-badge-icon">
                <FaLeaf />
              </div>

              <span>PURE</span>
              <strong>NATURE</strong>

              <span className="facility-nature-badge-line" />
              <small>ODISHA, INDIA</small>
            </div>

            {/* IMAGE INDICATORS */}

            <div className="facility-image-indicators">
              {facilitySlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`facility-image-dot ${
                    currentSlide === index
                      ? "facility-image-dot-active"
                      : ""
                  }`}
                  onClick={() => handleSlideChange(index)}
                  disabled={isAnimating}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Facility;

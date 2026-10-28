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
// BHITARAKANIKA BOAT SERVICE - FACILITY SLIDES
// ============================================

const facilitySlides = [
  {
    id: 1,

    eyebrow: "EXPLORE THE MANGROVES",

    title: "Discover the Natural Beauty of Bhitarkanika",

    description:
      "Experience the peaceful beauty of Bhitarkanika, Odisha, with Bhitarakanika Boat Service. Discover lush mangrove forests, winding waterways, beautiful birdlife, and a remarkable coastal ecosystem. From scenic nature trails to unforgettable boat journeys, explore a destination where nature takes centre stage.",

    features: [
      {
        icon: FaTree,
        title: "Mangrove Forests",
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
        title: "Nature Photography",
      },
      {
        icon: FaLeaf,
        title: "Rich Biodiversity",
      },
      {
        icon: FaWater,
        title: "Scenic Waterways",
      },
    ],

    image: facilityImg1,

    imageAlt:
      "Scenic nature trail surrounded by the green mangrove landscape of Bhitarkanika, Odisha",

    imageLabel: "MANGROVE NATURE EXPLORATION",
  },

  {
    id: 2,

    eyebrow: "DISCOVER THE WILD",

    title: "Experience the World of Saltwater Crocodiles",

    description:
      "Explore the extraordinary wildlife of Bhitarkanika, renowned for its saltwater crocodiles and rich mangrove habitats. Journey through beautiful river channels by boat and discover the natural surroundings of one of Odisha's remarkable wildlife destinations. With Bhitarakanika Boat Service, enjoy a memorable nature experience while respecting wildlife and maintaining a safe distance from animals.",

    features: [
      {
        icon: FaPaw,
        title: "Saltwater Crocodiles",
      },
      {
        icon: FaWater,
        title: "Scenic Boat Journeys",
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

    imageAlt:
      "Saltwater crocodile in the natural waterways of the Bhitarkanika mangrove ecosystem",

    imageLabel: "SALTWATER CROCODILE EXPERIENCE",
  },
];

// ============================================
// MAIN FACILITY COMPONENT
// ============================================

const Facility = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Reset animation state after the slide transition.
  useEffect(() => {
    if (!isAnimating) return;

    const animationTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 450);

    return () => clearTimeout(animationTimer);
  }, [isAnimating, currentSlide]);

  // Handle slide navigation.
  const handleSlideChange = (newIndex) => {
    if (
      newIndex === currentSlide ||
      isAnimating ||
      newIndex < 0 ||
      newIndex >= facilitySlides.length
    ) {
      return;
    }

    setIsAnimating(true);
    setCurrentSlide(newIndex);
  };

  // Previous slide.
  const handlePrev = () => {
    const previousIndex =
      currentSlide === 0
        ? facilitySlides.length - 1
        : currentSlide - 1;

    handleSlideChange(previousIndex);
  };

  // Next slide.
  const handleNext = () => {
    const nextIndex =
      currentSlide === facilitySlides.length - 1
        ? 0
        : currentSlide + 1;

    handleSlideChange(nextIndex);
  };

  const current = facilitySlides[currentSlide];

  return (
    <section
      className="facility-section"
      aria-label="Discover Bhitarkanika with Bhitarakanika Boat Service"
    >
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
          {/* WEBSITE BRANDING */}

          <div className="facility-badge">
            <span className="facility-badge-icon">
              <FaLeaf />
            </span>

            <span className="facility-badge-text">
              Bhitarakanika Boat Service
            </span>

            <span className="facility-badge-star">
              ✦
            </span>
          </div>

          {/* DYNAMIC SLIDE CONTENT */}

          <div
            className={`facility-slide-content ${
              isAnimating
                ? "facility-slide-fade-out"
                : "facility-slide-fade-in"
            }`}
            key={current.id}
          >
            {/* SECTION LABEL */}

            <span className="facility-eyebrow">
              {current.eyebrow}
            </span>

            {/* MAIN HEADING */}

            <h2 className="facility-title">
              {current.title}
            </h2>

            {/* DESCRIPTION */}

            <p className="facility-desc">
              {current.description}
            </p>

            {/* EXPERIENCE FEATURES */}

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

            {/* NATURE AND RESPONSIBLE TOURISM NOTE */}

            <div className="facility-nature-note">
              <span className="facility-nature-note-icon">
                <FaLeaf />
              </span>

              <p>
                Explore Bhitarkanika. Respect wildlife.
                Preserve nature for future generations.
              </p>
            </div>
          </div>

          {/* =====================================
              SLIDE NAVIGATION
          ===================================== */}

          <div className="facility-pagination">
            {/* PREVIOUS */}

            <button
              type="button"
              className="facility-page-arrow"
              onClick={handlePrev}
              disabled={isAnimating}
              aria-label="Previous Bhitarkanika experience"
            >
              <FaArrowLeft />
            </button>

            {/* SLIDE NUMBERS */}

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
                    currentSlide === index
                      ? "true"
                      : undefined
                  }
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              ))}
            </div>

            <span className="facility-page-divider">
              /
            </span>

            <span className="facility-page-total">
              {String(facilitySlides.length).padStart(2, "0")}
            </span>

            {/* NEXT */}

            <button
              type="button"
              className="facility-page-arrow"
              onClick={handleNext}
              disabled={isAnimating}
              aria-label="Next Bhitarkanika experience"
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
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}

            {/* IMAGE GRADIENT */}

            <div className="facility-image-gradient" />

            {/* IMAGE TITLE */}

            <div className="facility-image-label">
              <span className="facility-image-label-icon">
                <FaLeaf />
              </span>

              <div>
                <span className="facility-image-label-small">
                  BHITARAKANIKA BOAT SERVICE
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
                  aria-label={`Go to experience ${index + 1}`}
                  aria-current={
                    currentSlide === index
                      ? "true"
                      : undefined
                  }
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
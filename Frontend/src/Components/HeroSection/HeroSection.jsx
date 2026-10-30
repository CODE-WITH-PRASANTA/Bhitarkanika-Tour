import React, { useEffect, useRef, useState } from "react";
import "./HeroSection.css";

import heroImage1 from "../../assets/a.jpeg";
import heroImage2 from "../../assets/b.jpeg";
import heroImage3 from "../../assets/c.jpeg";
import heroImage4 from "../../assets/ev-vechile-4.png";
import heroImage5 from "../../assets/e.jpeg";
import heroImage6 from "../../assets/f.jpeg";
import heroImage7 from "../../assets/g.jpeg";
import heroImage8 from "../../assets/h.jpeg";

// ============================================
// SETTINGS
// ============================================

const BRAND_NAME = "Bhitarakanika Boat Service";
const LOCATION_TEXT = "Bhitarkanika National Park, Odisha";
const SLIDE_DURATION = 6000; // 6 seconds per slide

const heroSlides = [
  {
    image: heroImage1,
    eyebrow: "Mangrove Boat Safari",
    title: "SAIL THROUGH",
    highlight: "MANGROVE CREEKS",
    description:
      "Experience safe, certified boat safaris through the tranquil tidal waters of Bhitarkanika National Park, surrounded by lush estuarine mangrove forests.",
    ctaText: "Book River Safari",
  },
  {
    image: heroImage2,
    eyebrow: "Wildlife Encounters",
    title: "DISCOVER THE",
    highlight: "MIGHTY CROCODILES",
    description:
      "Witness giant saltwater crocodiles basking along the muddy riverbanks of Dangamal and Khola from our stable, eco-friendly safari boats.",
    ctaText: "Explore Safari Routes",
  },
  {
    image: heroImage3,
    eyebrow: "Canopy Cruise Expedition",
    title: "JOURNEY INTO",
    highlight: "SHADED WATERWAYS",
    description:
      "Navigate narrow tidal creeks beneath interlocking mangrove branches with certified boat captains and forest-guided naturalists.",
    ctaText: "View Boating Packages",
  },
  {
    image: heroImage4,
    eyebrow: "Estuarine Habitat",
    title: "EXPLORE THE",
    highlight: "APEX REPTILES",
    description:
      "Get an up-close glimpse of Bhitarkanika's famous saltwater crocodiles in their undisturbed habitat, alongside unique stilt and breathing roots.",
    ctaText: "Check Safari Timings",
  },
  {
    image: heroImage5,
    eyebrow: "Scenic Delta Vistas",
    title: "EXPERIENCE THE",
    highlight: "VIBRANT WETLANDS",
    description:
      "Take in panoramic views across the Brahmani and Baitarani river systems, home to some of India's richest coastal biodiversity.",
    ctaText: "Plan Your Visit",
  },
  {
    image: heroImage6,
    eyebrow: "Guided Group Safaris",
    title: "EXPLORE WITH",
    highlight: "CERTIFIED GUIDES",
    description:
      "Enjoy family and group boat rides equipped with safety jackets, Eco-Tour Guide and knowledgeable local naturalists.",
    ctaText: "Book Group Tours",
  },
  {
    image: heroImage7,
    eyebrow: "Shoreline Wildlife Cruise",
    title: "CRUISE ALONG",
    highlight: "SUNBASKING SHORES",
    description:
      "Capture prime wildlife moments as kingfishers, deer and giant estuarine crocodiles rest along the sunlit mudflats.",
    ctaText: "Reserve A Boat",
  },
  {
    image: heroImage8,
    eyebrow: "The Heart of Bhitarakanika",
    title: "SAIL INTO",
    highlight: "UNTOUCHED NATURE",
    description:
      "Unwind as our boat glides through the serene river sanctuary, giving you a peaceful escape into the heart of Odisha's mangrove paradise.",
    ctaText: "Enquire for Booking",
  },
];

const trustPoints = ["Certified Boat Captains", "Safety Jackets Provided", "Eco-Tour Guide"];

// ============================================
// COMPONENT
// ============================================

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef(null);
  const total = heroSlides.length;

  // AUTO SLIDE: every 6 seconds (timer restarts after any manual change)
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % total);
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [activeSlide, total]);

  const goPrev = () => setActiveSlide((prev) => (prev - 1 + total) % total);
  const goNext = () => setActiveSlide((prev) => (prev + 1) % total);

  // SWIPE SUPPORT (mobile / touch)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      diff < 0 ? goNext() : goPrev();
    }
    touchStartX.current = null;
  };

  const handleEnquiry = () => {
    const enquirySection = document.getElementById("enquiry");

    if (enquirySection) {
      enquirySection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "/contact";
    }
  };

  const handleExplore = () => {
    const hero = document.querySelector(".HeroSection");
    const nextSection = hero?.nextElementSibling;

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
    }
  };

  const currentSlide = heroSlides[activeSlide];
  const counter = String(activeSlide + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  return (
    <section
      className="HeroSection"
      aria-roledescription="carousel"
      aria-label={`${BRAND_NAME} highlights`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* FULL BACKGROUND IMAGES */}
      <div className="HeroSection-slides">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`HeroSection-slide ${
              activeSlide === index ? "HeroSection-slideActive" : ""
            }`}
            aria-hidden={activeSlide !== index}
          >
            <img
              src={slide.image}
              alt={`${slide.highlight.toLowerCase()} - ${BRAND_NAME}`}
              className="HeroSection-image"
              loading={index === 0 ? "eager" : "lazy"}
              draggable="false"
            />
          </div>
        ))}

        <div className="HeroSection-overlay" />
      </div>

      {/* BRAND BADGE */}
      <div className="HeroSection-brand">
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path d="M6 30c6 0 6-4 12-4s6 4 12 4 6-4 12-4" />
          <path d="M6 38c6 0 6-4 12-4s6 4 12 4 6-4 12-4" />
          <path d="M24 6v16M24 6l10 12H24M24 6L14 18h10" />
        </svg>
        <div>
          <strong>{BRAND_NAME}</strong>
          <span>{LOCATION_TEXT}</span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="HeroSection-inner">
        <div className="HeroSection-content" key={activeSlide} aria-live="polite">
          <span className="HeroSection-eyebrow">{currentSlide.eyebrow}</span>

          <h1 className="HeroSection-title">
            <strong>{currentSlide.title}</strong>
            <span>{currentSlide.highlight}</span>
          </h1>

          <p className="HeroSection-description">{currentSlide.description}</p>

          <ul className="HeroSection-points">
            {trustPoints.map((point) => (
              <li key={point}>
                <i aria-hidden="true">✓</i>
                {point}
              </li>
            ))}
          </ul>

          <div className="HeroSection-actionRow">
            <button
              type="button"
              className="HeroSection-ctaButton"
              onClick={handleEnquiry}
            >
              {currentSlide.ctaText}
              <span aria-hidden="true">→</span>
            </button>

            <button
              type="button"
              className="HeroSection-ghostButton"
              onClick={handleExplore}
            >
              Explore More
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR: PROGRESS + COUNTER + ARROWS */}
      <div className="HeroSection-bottom">
        <div className="HeroSection-progress" role="tablist" aria-label="Choose a slide">
          {heroSlides.map((slide, index) => {
            const state =
              index < activeSlide ? "done" : index === activeSlide ? "active" : "";
            return (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={activeSlide === index}
                aria-label={`Go to slide ${index + 1}`}
                className={`HeroSection-bar ${state ? `HeroSection-bar--${state}` : ""}`}
                onClick={() => setActiveSlide(index)}
              >
                <span style={{ animationDuration: `${SLIDE_DURATION}ms` }} />
              </button>
            );
          })}
        </div>

        <div className="HeroSection-controls">
          <span className="HeroSection-counter">
            <strong>{counter}</strong> / {totalLabel}
          </span>

          <button
            type="button"
            className="HeroSection-arrow"
            onClick={goPrev}
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            type="button"
            className="HeroSection-arrow"
            onClick={goNext}
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
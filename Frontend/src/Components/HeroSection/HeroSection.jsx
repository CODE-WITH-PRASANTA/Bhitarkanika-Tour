import React, { useEffect, useState } from "react";
import "./HeroSection.css";

import heroImage1 from "../../assets/a.jpeg";
import heroImage2 from "../../assets/b.jpeg";
import heroImage3 from "../../assets/c.jpeg";
import heroImage4 from "../../assets/d.jpeg";
import heroImage5 from "../../assets/e.jpeg";
import heroImage6 from "../../assets/f.jpeg";
import heroImage7 from "../../assets/g.jpeg";
import heroImage8 from "../../assets/h.jpeg";

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      image: heroImage1,
      eyebrow: "BHITARAKANIKA BOAT SERVICE",
      title: "SAIL THROUGH",
      highlight: "MANGROVE CREEKS",
      description:
        "Experience safe, certified boat safaris through the tranquil tidal waters of Bhitarkanika National Park, surrounded by lush estuarine mangrove forests.",
      ctaText: "Book River Safari",
    },
    {
      image: heroImage2,
      eyebrow: "WILDLIFE ENCOUNTERS",
      title: "DISCOVER THE",
      highlight: "MIGHTY CROCODILES",
      description:
        "Witness giant saltwater crocodiles basking along the muddy riverbanks of Dangamal and Khola from our stable, eco-friendly safari boats.",
      ctaText: "Explore Safari Routes",
    },
    {
      image: heroImage3,
      eyebrow: "CANOPY CRUISE EXPEDITION",
      title: "JOURNEY INTO",
      highlight: "SHADED WATERWAYS",
      description:
        "Navigate narrow tidal creeks beneath interlocking mangrove branches with certified boat captains and forest-guided naturalists.",
      ctaText: "View Boating Packages",
    },
    {
      image: heroImage4,
      eyebrow: "ESTUARINE HABITAT",
      title: "ENCOUNTER THE",
      highlight: "APEX REPTILES",
      description:
        "Get an up-close glimpse of Bhitarkanika's famous saltwater crocodiles in their undisturbed habitat alongside unique stilt and breathing roots.",
      ctaText: "Check Safari Timings",
    },
    {
      image: heroImage5,
      eyebrow: "SCENIC DELTA VISTAS",
      title: "EXPERIENCE THE",
      highlight: "VIBRANT WETLANDS",
      description:
        "Absorb panoramic views across the Brahmani and Baitarani river systems, home to India's richest biodiversity and coastal wildlife.",
      ctaText: "Plan Your Visit",
    },
    {
      image: heroImage6,
      eyebrow: "GUIDED GROUP SAFARIS",
      title: "EXPLORE WITH",
      highlight: "CERTIFIED GUIDES",
      description:
        "Enjoy family and group boat rides equipped with safety jackets, eco-tour permits, and knowledgeable local naturalists.",
      ctaText: "Book Group Tours",
    },
    {
      image: heroImage7,
      eyebrow: "SHORELINE WILDLIFE CRUISE",
      title: "CRUISE ALONG",
      highlight: "SUNBASKING SHORES",
      description:
        "Capture prime wildlife moments as kingfishers, deer, and giant estuarine crocodiles rest along the sunlit mudflats.",
      ctaText: "Reserve A Boat",
    },
    {
      image: heroImage8,
      eyebrow: "THE HEART OF BHITARAKANIKA",
      title: "SAIL INTO",
      highlight: "UNTOUCHED NATURE",
      description:
        "Unwind as our boat glides through the serene river sanctuary, providing a peaceful escape into the heart of Odisha's mangrove paradise.",
      ctaText: "Enquire for Booking",
    },
  ];

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setActiveSlide((previousSlide) => (previousSlide + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(sliderInterval);
  }, [heroSlides.length]);

  const currentSlide = heroSlides[activeSlide];

  const handleEnquiry = () => {
    const enquirySection = document.getElementById("enquiry");

    if (enquirySection) {
      enquirySection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.location.href = "/contact";
    }
  };

  return (
    <section className="HeroSection">
      <div className="HeroSection-container">
        {/* LEFT IMAGE SLIDER */}
        <div className="HeroSection-imagePanel">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.image}
              className={`HeroSection-slide ${
                activeSlide === index ? "HeroSection-slideActive" : ""
              }`}
              aria-hidden={activeSlide !== index}
            >
              <img
                src={slide.image}
                alt={`${slide.highlight} - Bhitarakanika Boat Service`}
                className="HeroSection-image"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}

          <div className="HeroSection-imageOverlay" />
        </div>

        {/* RIGHT CONTENT PANEL */}
        <div className="HeroSection-contentPanel">
          <div className="HeroSection-content" key={activeSlide}>
            <span className="HeroSection-eyebrow">
              {currentSlide.eyebrow}
            </span>

            <h1 className="HeroSection-title">
              <strong>{currentSlide.title}</strong>{" "}
              <span>{currentSlide.highlight}</span>
            </h1>

            <p className="HeroSection-description">
              {currentSlide.description}
            </p>

            <div className="HeroSection-actionRow">
              <button
                type="button"
                className="HeroSection-ctaButton"
                onClick={handleEnquiry}
              >
                {currentSlide.ctaText}
              </button>
            </div>
          </div>

          {/* SLIDE INDICATORS */}
          <div
            className="HeroSection-indicators"
            aria-label="Choose a slide"
          >
            {heroSlides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                className={`HeroSection-indicator ${
                  activeSlide === index ? "HeroSection-indicatorActive" : ""
                }`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={activeSlide === index ? "true" : undefined}
              />
            ))}
          </div>
        </div>

        {/* SIDE FLOATING ENQUIRY TAB */}
        <button
          type="button"
          className="HeroSection-enquiryButton"
          onClick={handleEnquiry}
          aria-label="Open enquiry form"
        >
          ENQUIRE NOW
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
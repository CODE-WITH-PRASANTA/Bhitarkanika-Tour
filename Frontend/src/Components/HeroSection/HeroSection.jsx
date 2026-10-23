
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
      eyebrow: "BHITARKANIKA RIVER SAFARI",
      title: "SAIL THROUGH",
      highlight: "MANGROVE RIVERS",
      description:
        "Experience a scenic boat journey through the winding rivers of Bhitarkanika, surrounded by lush green mangroves and breathtaking natural landscapes.",
    },
    {
      image: heroImage2,
      eyebrow: "WILDLIFE ENCOUNTERS",
      title: "DISCOVER THE",
      highlight: "MIGHTY CROCODILES",
      description:
        "Observe magnificent saltwater crocodiles resting along the muddy riverbanks during a guided boat safari through the remarkable wilderness of Bhitarkanika.",
    },
    {
      image: heroImage3,
      eyebrow: "EXPLORE HIDDEN WATERWAYS",
      title: "JOURNEY INTO",
      highlight: "MANGROVE FORESTS",
      description:
        "Navigate narrow forest waterways beneath a canopy of lush mangroves and discover the peaceful, mysterious beauty of this unique coastal ecosystem.",
    },
    {
      image: heroImage4,
      eyebrow: "A BIRD'S-EYE VIEW",
      title: "EXPLORE THE",
      highlight: "GREEN WILDERNESS",
      description:
        "Admire the vast mangrove forests and winding waterways from above, revealing the extraordinary scale and natural beauty of Bhitarkanika.",
    },
    {
      image: heroImage5,
      eyebrow: "YOUR NEXT NATURE ESCAPE",
      title: "EXPERIENCE",
      highlight: "WILDLIFE SAFARIS",
      description:
        "Enjoy an unforgettable boat excursion through serene mangrove creeks, where forest wildlife and the spectacular scenery create a memorable adventure.",
    },
    {
      image: heroImage6,
      eyebrow: "FOLLOW THE RIVER",
      title: "FIND PEACE IN",
      highlight: "NATURE'S BEAUTY",
      description:
        "Discover a tranquil river winding between thriving mangrove forests, with calm waters and beautiful greenery offering a refreshing escape into nature.",
    },
    {
      image: heroImage7,
      eyebrow: "ADVENTURE ON THE WATER",
      title: "SAIL BENEATH",
      highlight: "THE MANGROVE CANOPY",
      description:
        "Travel beneath arching mangrove branches on a memorable boat ride through shaded creeks and experience the forest from a unique perspective.",
    },
    {
      image: heroImage8,
      eyebrow: "THE KINGDOM OF CROCODILES",
      title: "WITNESS THE",
      highlight: "WILD UP CLOSE",
      description:
        "Discover the powerful saltwater crocodile in its natural mangrove habitat and experience the fascinating wildlife that makes Bhitarkanika special.",
    },
  ];

 useEffect(() => {
  const sliderInterval = setInterval(() => {
    setActiveSlide((previousSlide) => (
      (previousSlide + 1) % heroSlides.length
    ));
  }, 5000); // Change photo every 5 seconds

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
                activeSlide === index
                  ? "HeroSection-slideActive"
                  : ""
              }`}
              aria-hidden={activeSlide !== index}
            >
              <img
                src={slide.image}
                alt={`${slide.highlight} in Bhitarkanika, Odisha`}
                className="HeroSection-image"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}

          <div className="HeroSection-imageOverlay" />
        </div>

        {/* RIGHT CONTENT: MATCHES ACTIVE IMAGE */}
        <div className="HeroSection-contentPanel">
          <div
            className="HeroSection-content"
            key={activeSlide}
          >
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
                  activeSlide === index
                    ? "HeroSection-indicatorActive"
                    : ""
                }`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={
                  activeSlide === index ? "true" : undefined
                }
              />
            ))}
          </div>
        </div>

        {/* ENQUIRY BUTTON */}
      

      </div>
    </section>
  );
};

export default HeroSection;

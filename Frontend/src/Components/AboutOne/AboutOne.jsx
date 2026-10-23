import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AboutOneImage from "../../assets/aboutimage.png";
import "./AboutOne.css";

const aboutFeatures = [
  {
    number: "01",
    title: "Wildlife Conservation",
    description:
      "Protecting the natural beauty and biodiversity of Bhitarkanika is at the heart of responsible tourism.",
  },
  {
    number: "02",
    title: "Save Wildlife Habitat",
    description:
      "Discover the importance of preserving mangrove forests and the habitats of native wildlife.",
  },
  {
    number: "03",
    title: "Respect Nature",
    description:
      "Explore the outdoors thoughtfully and help keep these beautiful natural surroundings undisturbed.",
  },
  {
    number: "04",
    title: "Guided Experiences",
    description:
      "Make your journey more meaningful with local guidance and responsible travel practices.",
  },
];

const AboutOne = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [experienceYears, setExperienceYears] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return undefined;

    const duration = 1500;
    const startTime = performance.now();
    let animationFrame;

    const animateCounter = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const easedProgress = 1 - Math.pow(1 - progress, 4);

      setExperienceYears(Math.round(easedProgress * 25));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateCounter);
      } else {
        setExperienceYears(25);
      }
    };

    animationFrame = requestAnimationFrame(animateCounter);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className={`AboutOne ${
        isVisible ? "AboutOne--visible" : ""
      }`}
      aria-labelledby="AboutOne-title"
    >
      <div className="AboutOne__container">
        {/* LEFT CONTENT */}
        <div className="AboutOne__content">
          <div className="AboutOne__eyebrow">
            <span className="AboutOne__eyebrowLine" />
            Welcome to Bhitarkanika
          </div>

          <h2 className="AboutOne__title" id="AboutOne-title">
            Discover the Beauty of
            <span>Nature and Wildlife.</span>
          </h2>

          <p className="AboutOne__intro">
            Explore the enchanting mangrove forests, peaceful
            waterways and remarkable biodiversity of Bhitarkanika.
            Every journey is an opportunity to appreciate nature and
            understand why its conservation matters.
          </p>

          <div className="AboutOne__features">
            {aboutFeatures.map((feature) => (
              <article
                className="AboutOne__feature"
                key={feature.number}
              >
                <span className="AboutOne__featureNumber">
                  {feature.number}
                </span>

                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>

          <div className="AboutOne__actions">
            <Link
              to="/about"
              className="AboutOne__button AboutOne__button--primary"
            >
              Discover Our Story
              <span aria-hidden="true">↗</span>
            </Link>

            <Link
              to="/contact"
              className="AboutOne__button AboutOne__button--secondary"
            >
              Contact Us
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="AboutOne__visual">
          <div className="AboutOne__imageFrame">
            <img
              className="AboutOne__image"
              src={AboutOneImage}
              alt="Explore the natural landscapes and wildlife of Bhitarkanika"
              loading="lazy"
              decoding="async"
            />

            <div className="AboutOne__imageOverlay" />

            <div className="AboutOne__imageLabel">
              <span className="AboutOne__statusDot" />
              Explore. Discover. Preserve.
            </div>
          </div>

          {/* EXPERIENCE COUNTER */}
          <div className="AboutOne__experience">
            <span className="AboutOne__experienceLabel">
              OUR COMMITMENT
            </span>

            <div
              className="AboutOne__counter"
              aria-label={`${experienceYears} plus`}
            >
              {experienceYears}
              <span>+</span>
            </div>

            <h3>Years of Experience</h3>

            <p>
              A lasting commitment to meaningful journeys and
              responsible nature exploration.
            </p>

            <div className="AboutOne__experienceLine">
              <span />
            </div>
          </div>

          <div
            className="AboutOne__decor AboutOne__decor--one"
            aria-hidden="true"
          />
          <div
            className="AboutOne__decor AboutOne__decor--two"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutOne;
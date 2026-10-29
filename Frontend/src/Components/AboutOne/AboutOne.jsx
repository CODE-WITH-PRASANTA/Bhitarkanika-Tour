import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AboutOneImage from "../../assets/aboutimage.png";
import "./AboutOne.css";

const aboutFeatures = [
  {
    number: "01",
    title: "Scenic Boat Safaris",
    description:
      "Explore Bhitarkanika's beautiful rivers, winding creeks, and peaceful mangrove waterways on a memorable boat journey.",
  },
  {
    number: "02",
    title: "Remarkable Wildlife",
    description:
      "Discover the natural habitat of saltwater crocodiles, kingfishers, and other fascinating wildlife while respecting their space.",
  },
  {
    number: "03",
    title: "Mangrove Conservation",
    description:
      "Experience the beauty of this unique coastal ecosystem and learn why protecting its mangrove forests is essential.",
  },
  {
    number: "04",
    title: "Nature & Birdwatching",
    description:
      "Enjoy peaceful surroundings, observe beautiful birds, capture nature photography, and create unforgettable memories in Odisha.",
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
            Welcome to Bhitarakanika Boat Service
          </div>

          <h2 className="AboutOne__title" id="AboutOne-title">
            Discover the Magic of
            <span> Bhitarkanika by Boat.</span>
          </h2>

          <p className="AboutOne__intro">
            Welcome to Bhitarakanika Boat Service, your gateway to
            exploring the extraordinary natural beauty of Bhitarkanika,
            Odisha. Cruise through peaceful mangrove waterways, admire
            lush green forests, and discover a remarkable world of
            saltwater crocodiles and diverse birdlife. Whether you are
            a nature lover, wildlife enthusiast, photographer, or
            travelling with family, every boat journey offers a chance
            to experience the wilderness and create lasting memories.
          </p>

          {/* BHITARKANIKA EXPERIENCES */}

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

          {/* ACTION BUTTONS */}

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
              Plan Your Visit
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
              alt="Discover the mangrove waterways and natural beauty of Bhitarkanika, Odisha"
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

            <h3>Nature Comes First</h3>

            <p>
              Discover Bhitarkanika responsibly through memorable boat
              journeys, respect for wildlife, and a shared commitment
              to protecting Odisha's natural heritage.
            </p>

            <div className="AboutOne__experienceLine">
              <span />
            </div>
          </div>

          {/* DECORATIVE ELEMENTS */}

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
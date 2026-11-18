import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AboutOneImage from "../../assets/aboutimage.png";
import "./AboutOne.css";

const aboutFeatures = [
  {
    number: "01",
    tag: "SAFARI",
    title: "Scenic Boat Safaris",
    description:
      "Explore Bhitarkanika's pristine rivers, winding creeks, and tranquil mangrove waterways on a memorable boat journey.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20a6 6 0 0 0 10 0 6 6 0 0 0 10 0" />
        <path d="M4 16l2-8 6-3 6 3 2 8" />
        <path d="M12 5v11" />
      </svg>
    ),
  },
  {
    number: "02",
    tag: "WILDLIFE",
    title: "Remarkable Wildlife",
    description:
      "Discover the natural sanctuary of giant saltwater crocodiles, spotted deer, and rare mangrove fauna with respectful observation.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
        <circle cx="12" cy="9" r="3" />
      </svg>
    ),
  },
  {
    number: "03",
    tag: "ECOSYSTEM",
    title: "Mangrove Conservation",
    description:
      "Witness India's second-largest mangrove forest ecosystem and learn why preserving this coastal treasure is crucial for our planet.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
  },
  {
    number: "04",
    tag: "EXPERIENCE",
    title: "Nature & Birdwatching",
    description:
      "Immerse in tranquil silence, spot rare migratory birds and vibrant kingfishers, and take home unforgettable photographs of Odisha.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
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
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return undefined;

    const duration = 1600;
    const startTime = performance.now();
    let animationFrame;

    const animateCounter = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
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
      className={`AboutOne ${isVisible ? "AboutOne--visible" : ""}`}
      aria-labelledby="AboutOne-title"
    >
      {/* Decorative ambient elements */}
      <div className="AboutOne__ambientMesh" aria-hidden="true" />
      <div className="AboutOne__ambientGlow AboutOne__ambientGlow--top" aria-hidden="true" />
      <div className="AboutOne__ambientGlow AboutOne__ambientGlow--bottom" aria-hidden="true" />

      <div className="AboutOne__container">
        {/* LEFT CONTENT */}
        <div className="AboutOne__content">
          <div className="AboutOne__eyebrow">
            <span className="AboutOne__eyebrowBadge">
              <span className="AboutOne__eyebrowSparkle">✨</span>
              <span className="AboutOne__eyebrowText">AUTHORISED BOAT SAFARIS</span>
              <span className="AboutOne__eyebrowSep">•</span>
              <span className="AboutOne__eyebrowSub">BHITARKANIKA, ODISHA</span>
            </span>
          </div>

          <h1 className="AboutOne__title" id="AboutOne-title">
            Discover the Magic of{" "}
            <span className="AboutOne__titleHighlight">Bhitarkanika by Boat</span>
          </h1>

          <p className="AboutOne__intro">
            Welcome to <strong>Bhitarkanika Boat Booking</strong>, your trusted gateway to
            the untouched wilderness of Odisha. Glide silently through winding mangrove creeks,
            encounter prehistoric <strong>saltwater crocodiles</strong> basking on riverbanks,
            and immerse yourself in one of India’s most breathtaking coastal eco-sanctuaries.
          </p>

          {/* LUXURY FEATURE CARDS */}
          <div className="AboutOne__features">
            {aboutFeatures.map((feature) => (
              <article className="AboutOne__featureCard" key={feature.number}>
                <div className="AboutOne__featureHeader">
                  <span className="AboutOne__featureBadge">
                    <span className="AboutOne__featureIcon">{feature.icon}</span>
                    <span className="AboutOne__featureNum">{feature.number}</span>
                  </span>
                  <span className="AboutOne__featureTag">{feature.tag}</span>
                </div>

                <h3 className="AboutOne__featureTitle">{feature.title}</h3>
                <p className="AboutOne__featureDesc">{feature.description}</p>
                <div className="AboutOne__cardGlow" aria-hidden="true" />
              </article>
            ))}
          </div>

          {/* ACTION BUTTONS & TRUST SIGNALS */}
          <div className="AboutOne__actionArea">
            <div className="AboutOne__actions">
              <Link
                to="/contact"
                className="AboutOne__button AboutOne__button--primary"
              >
                <span>Plan Your Safari</span>
                <span className="AboutOne__buttonArrow" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </Link>

              <Link
                to="/contact"
                className="AboutOne__button AboutOne__button--secondary"
              >
                <span>Check Availability</span>
                <span className="AboutOne__buttonArrow" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* TRUST BADGES ROW */}
            <div className="AboutOne__trustRow">
              <div className="AboutOne__trustItem">
                <span className="AboutOne__trustIcon">🛡️</span>
                <span>Govt. Certified Permits</span>
              </div>
              <div className="AboutOne__trustDivider" />
              <div className="AboutOne__trustItem">
                <span className="AboutOne__trustIcon">👨‍✈️</span>
                <span>Licensed Native Boatmen</span>
              </div>
              <div className="AboutOne__trustDivider" />
              <div className="AboutOne__trustItem">
                <span className="AboutOne__trustIcon">🦺</span>
                <span>Lifejackets Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT VISUAL SHOWCASE */}
        <div className="AboutOne__visual">
          <div className="AboutOne__visualStack">
            <div className="AboutOne__imageFrame">
              <img
                className="AboutOne__image"
                src={AboutOneImage}
                alt="Discover the mangrove waterways and natural beauty of Bhitarkanika, Odisha"
                loading="eager"
                decoding="async"
              />

              <div className="AboutOne__imageOverlay" />

              {/* FLOATING STATUS PILL */}
              <div className="AboutOne__statusBadge">
                <span className="AboutOne__pulseDot">
                  <span className="AboutOne__pulseRing" />
                </span>
                <div className="AboutOne__statusContent">
                  <span className="AboutOne__statusHeading">Daily Safaris Active</span>
                  <span className="AboutOne__statusSub">Morning & Afternoon Departures</span>
                </div>
              </div>

              {/* LOCATION PILL */}
              <div className="AboutOne__locationPill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Bhitarkanika National Park, Odisha</span>
              </div>
            </div>

            {/* FLOATING LUXURY COMMITMENT CARD */}
            <div className="AboutOne__experienceCard">
              <div className="AboutOne__expBadgeTop">
                <span className="AboutOne__expStar">★</span>
                <span>PREMIER SAFARI OPERATOR</span>
              </div>

              <div className="AboutOne__expMainRow">
                <div
                  className="AboutOne__counter"
                  aria-label={`${experienceYears} plus years`}
                >
                  <span className="AboutOne__counterNum">{experienceYears}</span>
                  <span className="AboutOne__counterPlus">+</span>
                </div>
                <div className="AboutOne__counterLabel">
                  <span className="AboutOne__counterTitle">Years of Trust</span>
                  <span className="AboutOne__counterSub">Wilderness Experience</span>
                </div>
              </div>

              <h4 className="AboutOne__expHeading">Nature & Safety First</h4>

              <p className="AboutOne__expText">
                Dedicated to responsible eco-tourism with silent-motor safaris, zero plastic
                disturbance, and strict adherence to wildlife conservation.
              </p>

              <div className="AboutOne__expProgressTrack">
                <span className="AboutOne__expProgressBar" />
              </div>

              <div className="AboutOne__expFooter">
                <span className="AboutOne__expRating">
                  ⭐⭐⭐⭐⭐ <strong>4.9 / 5.0</strong>
                </span>
                <span className="AboutOne__expGuests">Over 15,000+ happy travellers</span>
              </div>
            </div>

            {/* DECORATIVE BACKGROUND ACCENTS */}
            <div className="AboutOne__decorRing AboutOne__decorRing--one" aria-hidden="true" />
            <div className="AboutOne__decorRing AboutOne__decorRing--two" aria-hidden="true" />
            <div className="AboutOne__decorDotGrid" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOne;

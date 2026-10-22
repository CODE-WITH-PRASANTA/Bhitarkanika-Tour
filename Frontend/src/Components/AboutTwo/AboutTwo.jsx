
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./AboutTwo.css";

const AboutTwo = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]);

  const stats = [
    { value: 700, suffix: "+", label: "Square kilometres of protected landscape", short: "Nature & habitats" },
    { value: 170, suffix: "+", label: "Bird species recorded in the region", short: "Birdwatching" },
    { value: 365, suffix: "", label: "Days to discover the beauty of nature", short: "Explore all year" },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return undefined;

    const duration = 1500;
    const start = performance.now();
    let frame;

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      setCounts(stats.map((item) => Math.round(item.value * eased)));

      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [visible]);

  return (
    <section
      className={`AboutTwo ${visible ? "AboutTwo--visible" : ""}`}
      ref={sectionRef}
      aria-labelledby="AboutTwo-title"
    >
      <div className="AboutTwo__container">
        <div className="AboutTwo__content">
          <div className="AboutTwo__eyebrow">
            <span className="AboutTwo__eyebrowLine" />
            OUR NATURAL HERITAGE
          </div>

          <h2 className="AboutTwo__title" id="AboutTwo-title">
            A World of
            <span>Wonder Awaits.</span>
          </h2>

          <p className="AboutTwo__description">
            Discover Bhitarkanika, where winding waterways, lush mangroves
            and remarkable wildlife create an unforgettable Odisha
            experience. Every visit is an opportunity to connect with nature
            and help protect it for generations to come.
          </p>

          <div className="AboutTwo__stats">
            {stats.map((stat, index) => (
              <div className="AboutTwo__stat" key={stat.short}>
                <span className="AboutTwo__statNumber">
                  {counts[index]}
                  {stat.suffix}
                </span>
                <span className="AboutTwo__statLabel">{stat.short}</span>
              </div>
            ))}
          </div>

          <div className="AboutTwo__actions">
            <Link
              to="/services/boat-safari"
              className="AboutTwo__button AboutTwo__button--primary"
            >
              Explore Boat Safari <span>↗</span>
            </Link>

            <Link
              to="/gallery"
              className="AboutTwo__button AboutTwo__button--secondary"
            >
              View Gallery <span>↗</span>
            </Link>
          </div>
        </div>

        <div className="AboutTwo__visual">
          <div className="AboutTwo__imageMain">
            <img
              src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=85"
              alt="Sunlight filtering through a lush green forest"
              loading="lazy"
            />
            <div className="AboutTwo__imageOverlay" />
            <span className="AboutTwo__imageTag">
              <span /> Nature, untouched
            </span>
          </div>

          <div className="AboutTwo__imageSmall">
            <img
              src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=700&q=85"
              alt="Peaceful water and a natural coastline"
              loading="lazy"
            />
          </div>

          <div className="AboutTwo__quote">
            <span className="AboutTwo__quoteMark">“</span>
            <p>Leave only footprints. Take home memories.</p>
            <span className="AboutTwo__quoteLine" />
          </div>

          <span className="AboutTwo__decor AboutTwo__decor--one" />
          <span className="AboutTwo__decor AboutTwo__decor--two" />
        </div>
      </div>
    </section>
  );
};

export default AboutTwo;

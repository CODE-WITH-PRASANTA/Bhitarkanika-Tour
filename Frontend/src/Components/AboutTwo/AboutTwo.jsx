import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./AboutTwo.css";

const AboutTwo = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]);

  const stats = [
    {
      value: 700,
      suffix: "+",
      label: "Nature and mangrove landscape",
      short: "Nature & habitats",
    },
    {
      value: 170,
      suffix: "+",
      label: "Bird species and birdwatching opportunities",
      short: "Birdwatching",
    },
    {
      value: 365,
      suffix: "",
      label: "Plan your next nature adventure",
      short: "Nature escapes",
    },
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

      setCounts(
        stats.map((item) => Math.round(item.value * eased))
      );

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [visible]);

  return (
    <section
      className={`AboutTwo ${
        visible ? "AboutTwo--visible" : ""
      }`}
      ref={sectionRef}
      aria-labelledby="AboutTwo-title"
    >
      <div className="AboutTwo__container">

        {/* LEFT CONTENT */}

        <div className="AboutTwo__content">

          <div className="AboutTwo__eyebrow">
            <span className="AboutTwo__eyebrowLine" />
            BHITARAKANIKA BOAT SERVICE
          </div>

          <h2 className="AboutTwo__title" id="AboutTwo-title">
            A World of
            <span>Natural Wonders Awaits.</span>
          </h2>

          <p className="AboutTwo__description">
            Discover the breathtaking beauty of Bhitarkanika, Odisha,
            with Bhitarakanika Boat Service. Cruise through winding
            mangrove waterways, experience the peaceful beauty of
            nature, and explore a remarkable habitat known for its
            saltwater crocodiles and diverse birdlife. Every journey
            offers an opportunity to connect with nature, create
            unforgettable memories, and appreciate the importance
            of protecting our natural heritage.
          </p>

          {/* NATURE STATISTICS */}

          <div className="AboutTwo__stats">
            {stats.map((stat, index) => (
              <div className="AboutTwo__stat" key={stat.short}>
                <span
                  className="AboutTwo__statNumber"
                  title={stat.label}
                >
                  {counts[index]}
                  {stat.suffix}
                </span>

                <span className="AboutTwo__statLabel">
                  {stat.short}
                </span>
              </div>
            ))}
          </div>

          {/* ACTION BUTTONS */}

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

        {/* RIGHT IMAGE SECTION */}

        <div className="AboutTwo__visual">

          {/* MAIN NATURE IMAGE */}

          <div className="AboutTwo__imageMain">
            <img
              src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=85"
              alt="Lush green forest representing the natural beauty of Bhitarkanika"
              loading="lazy"
            />

            <div className="AboutTwo__imageOverlay" />

            <span className="AboutTwo__imageTag">
              <span /> Discover Bhitarkanika
            </span>
          </div>

          {/* SECONDARY WATER IMAGE */}

          <div className="AboutTwo__imageSmall">
            <img
              src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=700&q=85"
              alt="Peaceful water representing the scenic waterways of Bhitarkanika"
              loading="lazy"
            />
          </div>

          {/* NATURE QUOTE */}

          <div className="AboutTwo__quote">
            <span className="AboutTwo__quoteMark">
              “
            </span>

            <p>
              Explore nature. Respect wildlife. Take home memories.
            </p>

            <span className="AboutTwo__quoteLine" />
          </div>

          {/* DECORATIVE ELEMENTS */}

          <span className="AboutTwo__decor AboutTwo__decor--one" />

          <span className="AboutTwo__decor AboutTwo__decor--two" />

        </div>
      </div>
    </section>
  );
};

export default AboutTwo;
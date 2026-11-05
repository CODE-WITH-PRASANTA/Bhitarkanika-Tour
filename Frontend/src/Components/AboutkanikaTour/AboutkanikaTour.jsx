import React, { useEffect, useRef, useState } from "react";
import "./AboutkanikaTour.css";
import aboutImg1 from "../../assets/aboutpage-1.png";
import aboutImg2 from "../../assets/aboutpage-2.png";

/* ---------- Animated counter hook ---------- */
const useCounter = (end, start, duration = 2200) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    let frame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * end));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [end, start, duration]);

  return count;
};

const BadgeCounter = ({ end, suffix, start }) => {
  const value = useCounter(end, start);
  return (
    <span className="AboutkanikaTour__badge-number">
      {value}
      {suffix}
    </span>
  );
};

/* ---------- Decorative leaf (background) ---------- */
const Leaf = ({ className }) => (
  <svg
    className={`AboutkanikaTour__leaf ${className}`}
    viewBox="0 0 100 150"
    aria-hidden="true"
  >
    <path
      className="AboutkanikaTour__leaf-body"
      d="M50 4C88 34 96 92 50 146C4 92 12 34 50 4Z"
    />
    <path
      className="AboutkanikaTour__leaf-vein"
      d="M50 14V146M50 52L72 34M50 52L28 34M50 84L76 64M50 84L24 64M50 114L70 98M50 114L30 98"
    />
  </svg>
);

const AboutkanikaTour = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const features = [
    "Boat Safari",
    "Saltwater Crocodile",
    "Gahirmatha & Habalikhati",
    "Mangrove Forest",
    "White Crocodile",
    "Kingfisher Bird",
  ];

  return (
    <section
      ref={sectionRef}
      className={`AboutkanikaTour ${inView ? "AboutkanikaTour--visible" : ""}`}
    >
      {/* ---------- BACKGROUND DECOR ---------- */}
      <div className="AboutkanikaTour__bg" aria-hidden="true">
        <span className="AboutkanikaTour__bg-glow AboutkanikaTour__bg-glow--one" />
        <span className="AboutkanikaTour__bg-glow AboutkanikaTour__bg-glow--two" />
        <span className="AboutkanikaTour__bg-dots" />

        <Leaf className="AboutkanikaTour__leaf--one" />
        <Leaf className="AboutkanikaTour__leaf--two" />
        <Leaf className="AboutkanikaTour__leaf--three" />
        <Leaf className="AboutkanikaTour__leaf--four" />
        <Leaf className="AboutkanikaTour__leaf--five" />
        <Leaf className="AboutkanikaTour__leaf--six" />
        <Leaf className="AboutkanikaTour__leaf--seven" />
      </div>

      <div className="AboutkanikaTour__container">
        {/* ---------- LEFT : IMAGE COLLAGE ---------- */}
        <div className="AboutkanikaTour__visual">
          <span className="AboutkanikaTour__blob" />
          <span className="AboutkanikaTour__ring" />
          <span className="AboutkanikaTour__dots" />

          <div className="AboutkanikaTour__image-main">
            <img
              src={aboutImg1}
              alt="Bhitarkanika mangrove boat safari"
              className="AboutkanikaTour__img"
              loading="lazy"
            />
          </div>

          <div className="AboutkanikaTour__badge AboutkanikaTour__badge--top">
            <BadgeCounter end={25} suffix=" Years" start={inView} />
            <span className="AboutkanikaTour__badge-label">Of Experience</span>
          </div>

          <div className="AboutkanikaTour__circle">
            <img
              src={aboutImg2}
              alt="Spotted deer in Bhitarkanika"
              className="AboutkanikaTour__img AboutkanikaTour__img--circle"
              loading="lazy"
            />
          </div>

          <div className="AboutkanikaTour__badge AboutkanikaTour__badge--bottom">
            <BadgeCounter end={5000} suffix="+" start={inView} />
            <span className="AboutkanikaTour__badge-label">Happy Clients</span>
          </div>
        </div>

        {/* ---------- RIGHT : CONTENT ---------- */}
        <div className="AboutkanikaTour__content">
          <span className="AboutkanikaTour__eyebrow AboutkanikaTour__reveal AboutkanikaTour__delay-1">
            Bhitarkanika Boat Service
          </span>

          <h2 className="AboutkanikaTour__title AboutkanikaTour__reveal AboutkanikaTour__delay-2">
            We Provide The Best{" "}
            <span className="AboutkanikaTour__title-accent">Bhitarkanika</span>{" "}
            Tour &amp; Boat Services.
          </h2>

          <p className="AboutkanikaTour__text AboutkanikaTour__reveal AboutkanikaTour__delay-3">
            Discover the breathtaking beauty of Bhitarkanika, Odisha, with
            Bhitarkanika Boat Service. Cruise through winding mangrove
            waterways and explore a remarkable habitat known for its saltwater
            crocodiles, spotted deer and diverse birdlife. Every journey is a
            chance to connect with nature and take home unforgettable memories.
          </p>

          <ul className="AboutkanikaTour__features AboutkanikaTour__reveal AboutkanikaTour__delay-4">
            {features.map((item) => (
              <li key={item} className="AboutkanikaTour__feature">
                {item}
              </li>
            ))}
          </ul>

          <div className="AboutkanikaTour__actions AboutkanikaTour__reveal AboutkanikaTour__delay-5">
            <a
              href="/contact"
              className="AboutkanikaTour__btn AboutkanikaTour__btn--primary"
            >
              Book Your Boat
            </a>
            <a
              href="tel:+918328982394"
              className="AboutkanikaTour__btn AboutkanikaTour__btn--outline"
            >
              +91 832 898 2394
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutkanikaTour;
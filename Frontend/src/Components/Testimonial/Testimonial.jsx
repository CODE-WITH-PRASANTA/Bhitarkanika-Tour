import React, { useState, useEffect } from "react";
import { API_ENDPOINTS, getImageUrl } from "../../api/api";
import "./Testimonial.css";

const API_URL = API_ENDPOINTS.TESTIMONIALS_ACTIVE;

const formatImageUrl = (img) => {
  if (!img) return "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&h=160&q=80";
  return getImageUrl(img);
};

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch real live testimonials directly from MongoDB database
  useEffect(() => {
    let isMounted = true;
    const fetchLiveTestimonials = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        if (isMounted) {
          if (res.ok && json.success && Array.isArray(json.data)) {
            setTestimonials(json.data);
          } else {
            setTestimonials([]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch testimonials from database:", err);
        if (isMounted) {
          setTestimonials([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchLiveTestimonials();

    return () => {
      isMounted = false;
    };
  }, []);

  const total = testimonials.length;

  const showPrevious = () => {
    if (total === 0) return;
    setActiveIndex((current) => (current === 0 ? total - 1 : current - 1));
  };

  const showNext = () => {
    if (total === 0) return;
    setActiveIndex((current) => (current + 1) % total);
  };

  // If loading, don't show stale/fallback data
  if (loading) {
    return (
      <section className="Testimonial" aria-busy="true">
        <div className="Testimonial__container" style={{ padding: "40px 0", textAlign: "center", color: "#5e7467" }}>
          <p>Loading real traveller experiences...</p>
        </div>
      </section>
    );
  }

  // If no active testimonials exist in the database, do not show any fake/fallback cards
  if (total === 0) {
    return null;
  }

  const visibleTestimonials =
    total > 1
      ? [testimonials[activeIndex % total], testimonials[(activeIndex + 1) % total]]
      : testimonials;

  return (
    <section className="Testimonial" aria-labelledby="Testimonial-title">
      {/* Background Decorative Ambient Radial Glow */}
      <div className="Testimonial__ambientGlow" aria-hidden="true" />

      <div className="Testimonial__container">
        
        {/* Header Section */}
        <div className="Testimonial__header">
          <div className="Testimonial__heading">
            <span className="Testimonial__eyebrow">
              <span className="Testimonial__eyebrowLine" />
              <span>TRAVELLER EXPERIENCES</span>
            </span>

            <h2 className="Testimonial__title" id="Testimonial-title">
              Memories That <span>Stay With You.</span>
            </h2>

            <p className="Testimonial__subtitle">
              Discover authentic reviews from travellers who explored the tranquil waterways, ancient mangroves, and wildlife sanctuaries of Bhitarkanika.
            </p>
          </div>

          {/* Luxury Arrow Navigation Controls */}
          {total > 1 && (
            <div className="Testimonial__navigation">
              <button
                type="button"
                className="Testimonial__navButton"
                onClick={showPrevious}
                aria-label="Previous testimonials"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>

              <button
                type="button"
                className="Testimonial__navButton Testimonial__navButton--next"
                onClick={showNext}
                aria-label="Next testimonials"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Testimonials 2-Column Grid */}
        <div className="Testimonial__grid" key={activeIndex}>
          {visibleTestimonials.map((item, index) => {
            if (!item) return null;
            const ratingNum = item.rating || 5;
            return (
              <article
                className="Testimonial__card"
                key={item._id || item.id || index}
                style={{ "--Testimonial-delay": `${index * 120}ms` }}
              >
                <div className="Testimonial__cardContent">
                  
                  {/* Card Top: Watermark Quote + Verified Pill */}
                  <div className="Testimonial__cardTop">
                    <span className="Testimonial__quoteIcon" aria-hidden="true">
                      “
                    </span>

                    {item.isVerified !== false && (
                      <span className="Testimonial__verified">
                        <span className="Testimonial__verifiedDot" />
                        <span>Verified Traveller</span>
                      </span>
                    )}
                  </div>

                  {/* Review Text */}
                  <p className="Testimonial__review">"{item.review}"</p>

                  {/* Rating Stars */}
                  <div
                    className="Testimonial__stars"
                    aria-label={`${ratingNum} out of 5 stars`}
                  >
                    <span className="Testimonial__starIcons">
                      {"★".repeat(Math.min(5, Math.max(1, ratingNum)))}
                    </span>
                    <span className="Testimonial__ratingText">
                      {ratingNum}.0 Rating
                    </span>
                  </div>
                </div>

                {/* Author Strip */}
                <div className="Testimonial__cardFooter">
                  <div className="Testimonial__divider" />

                  <div className="Testimonial__author">
                    <div className="Testimonial__avatarWrap">
                      <img
                        className="Testimonial__avatar"
                        src={formatImageUrl(item.image)}
                        alt={item.name}
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&h=160&q=80";
                        }}
                      />
                      <span className="Testimonial__avatarStatus" />
                    </div>

                    <div className="Testimonial__authorInfo">
                      <h3 className="Testimonial__authorName">{item.name}</h3>
                      <p className="Testimonial__authorRole">{item.role || "Traveller"}</p>
                      <span className="Testimonial__location">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {item.location || "Odisha, India"}
                      </span>
                    </div>

                    <span className="Testimonial__authorArrow" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer Progress Indicators & Counter */}
        {total > 1 && (
          <div className="Testimonial__footer">
            <div className="Testimonial__progress">
              {testimonials.map((item, index) => (
                <button
                  key={item._id || item.id || index}
                  type="button"
                  className={`Testimonial__progressDot ${
                    index === activeIndex ? "is-active" : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                />
              ))}
            </div>

            <span className="Testimonial__counter">
              <strong>{String((activeIndex % total) + 1).padStart(2, "0")}</strong>
              <span>/</span>
              {String(total).padStart(2, "0")}
            </span>
          </div>
        )}

      </div>
    </section>
  );
};

export default Testimonial;

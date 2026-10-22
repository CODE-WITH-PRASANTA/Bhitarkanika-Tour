import React, { useState } from "react";
import "./Testimonial.css";

const testimonialData = [
  {
    id: 1,
    name: "Rahul Mohanty",
    role: "Nature Explorer",
    location: "Odisha, India",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=85",
    review:
      "The Bhitarkanika boat safari was an unforgettable experience. The mangrove scenery was breathtaking, and spotting giant saltwater crocodiles resting on the mudbanks made the expedition truly remarkable.",
  },
  {
    id: 2,
    name: "Priya Das",
    role: "Wildlife Enthusiast",
    location: "Bhubaneswar, India",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=85",
    review:
      "A peaceful journey through pristine waterways surrounded by lush greenery and vibrant kingfishers. The entire sanctuary felt serene, and our certified forest guide made all the difference.",
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "Family Traveller",
    location: "Cuttack, India",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&h=160&q=85",
    review:
      "We enjoyed exploring the mangrove forests by boat with our children. The safety standards were excellent, and the sightings of spotted deer and wild boars left our family with lasting memories.",
  },
  {
    id: 4,
    name: "Sneha Patel",
    role: "Travel Photographer",
    location: "Mumbai, India",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&h=160&q=85",
    review:
      "Bhitarkanika is a dream destination for wildlife photography. The golden hour reflections along the creeks, paired with rare birdlife perching on stilt roots, offered stunning compositions around every turn.",
  },
];

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonialData.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % testimonialData.length);
  };

  const visibleTestimonials = [
    testimonialData[activeIndex],
    testimonialData[(activeIndex + 1) % testimonialData.length],
  ];

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
        </div>

        {/* Testimonials 2-Column Grid */}
        <div className="Testimonial__grid" key={activeIndex}>
          {visibleTestimonials.map((item, index) => (
            <article
              className="Testimonial__card"
              key={`${item.id}-${index}`}
              style={{ "--Testimonial-delay": `${index * 120}ms` }}
            >
              <div className="Testimonial__cardContent">
                
                {/* Card Top: Watermark Quote + Verified Pill */}
                <div className="Testimonial__cardTop">
                  <span className="Testimonial__quoteIcon" aria-hidden="true">
                    “
                  </span>

                  <span className="Testimonial__verified">
                    <span className="Testimonial__verifiedDot" />
                    <span>Verified Traveller</span>
                  </span>
                </div>

                {/* Review Text */}
                <p className="Testimonial__review">"{item.review}"</p>

                {/* Rating Stars */}
                <div
                  className="Testimonial__stars"
                  aria-label={`${item.rating} out of 5 stars`}
                >
                  <span className="Testimonial__starIcons">
                    {"★".repeat(item.rating)}
                  </span>
                  <span className="Testimonial__ratingText">
                    {item.rating}.0 Rating
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
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                    />
                    <span className="Testimonial__avatarStatus" />
                  </div>

                  <div className="Testimonial__authorInfo">
                    <h3 className="Testimonial__authorName">{item.name}</h3>
                    <p className="Testimonial__authorRole">{item.role}</p>
                    <span className="Testimonial__location">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {item.location}
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
          ))}
        </div>

        {/* Footer Progress Indicators & Counter */}
        <div className="Testimonial__footer">
          <div className="Testimonial__progress">
            {testimonialData.map((item, index) => (
              <button
                key={item.id}
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
            <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
            <span>/</span>
            {String(testimonialData.length).padStart(2, "0")}
          </span>
        </div>

      </div>
    </section>
  );
};

export default Testimonial;
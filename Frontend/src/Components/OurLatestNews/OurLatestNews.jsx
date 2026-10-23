import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./OurLatestNews.css";

// Replace these filenames with your actual image filenames.
import WildlifeImage from "../../assets/wildlife-travel.png";
import CrocodileImage from "../../assets/bhitarkanika-crocodile.png";
import MangroveImage from "../../assets/bhitarkanika-mangrove.png";

const newsData = [
  {
    id: 1,
    category: "Wildlife",
    title: "Discover the Untamed Beauty of Bhitarkanika",
    date: "22 Oct 2026",
    author: "Bhitarkanika Team",
    image: WildlifeImage,
    alt: "Wildlife in a beautiful natural forest habitat",
    link: "/blog",
  },
  {
    id: 2,
    category: "Wildlife Conservation",
    title: "Saltwater Crocodiles: The Giants of the Mangroves",
    date: "18 Oct 2026",
    author: "Bhitarkanika Team",
    image: CrocodileImage,
    alt: "Saltwater crocodile in its natural habitat",
    link: "/blog",
  },
  {
    id: 3,
    category: "Nature & Travel",
    title: "Explore the Magical Waterways of Bhitarkanika",
    date: "12 Oct 2026",
    author: "Bhitarkanika Team",
    image: MangroveImage,
    alt: "Lush green mangrove forest and waterways",
    link: "/services",
  },
];

const OurLatestNews = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      className={`OurLatestNews ${
        isVisible ? "OurLatestNews--visible" : ""
      }`}
      ref={sectionRef}
      aria-labelledby="OurLatestNews-title"
    >
      <div className="OurLatestNews__container">
        {/* Section heading */}
        <div className="OurLatestNews__header">
          <div className="OurLatestNews__heading">
            <span className="OurLatestNews__eyebrow">
              <span className="OurLatestNews__eyebrowLine" />
              STORIES FROM THE WILD
            </span>

            <h2
              className="OurLatestNews__title"
              id="OurLatestNews-title"
            >
              Latest News
              <span>&amp; Articles.</span>
            </h2>
          </div>

          <div className="OurLatestNews__headerRight">
            <p className="OurLatestNews__description">
              Discover the wildlife, peaceful waterways, lush mangroves
              and unforgettable experiences of Bhitarkanika, Odisha.
            </p>

            <Link
              to="/blog"
              className="OurLatestNews__viewAll"
            >
              Explore All Stories
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        {/* News cards */}
        <div className="OurLatestNews__grid">
          {newsData.map((news, index) => (
            <article
              className="OurLatestNews__card"
              key={news.id}
              style={{
                "--OurLatestNews-delay": `${index * 160}ms`,
              }}
            >
              <Link
                to={news.link}
                className="OurLatestNews__cardLink"
                aria-label={`Read: ${news.title}`}
              >
                <img
                  className="OurLatestNews__image"
                  src={news.image}
                  alt={news.alt}
                  loading="lazy"
                  decoding="async"
                />

                <div className="OurLatestNews__imageShade" />

                <div className="OurLatestNews__cardTop">
                  <span className="OurLatestNews__category">
                    <span className="OurLatestNews__categoryDot" />
                    {news.category}
                  </span>

                  <span className="OurLatestNews__cardNumber">
                    0{news.id}
                  </span>
                </div>

                <div className="OurLatestNews__cardContent">
                  <div className="OurLatestNews__meta">
                    <span className="OurLatestNews__metaIcon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          cx="12"
                          cy="8"
                          r="3.5"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        />
                        <path
                          d="M5 20c.4-3.6 2.9-5.5 7-5.5s6.6 1.9 7 5.5"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <span>{news.author}</span>

                    <span className="OurLatestNews__metaDivider" />

                    <span className="OurLatestNews__metaIcon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="8.5"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        />
                        <path
                          d="M12 7v5l3.2 2"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <time>{news.date}</time>
                  </div>

                  <h3 className="OurLatestNews__cardTitle">
                    {news.title}
                  </h3>

                  <div className="OurLatestNews__readMore">
                    <span>Read Story</span>
                    <span
                      className="OurLatestNews__readArrow"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="OurLatestNews__footer">
          <span className="OurLatestNews__footerLine" />
          <p>
            Explore more. Discover nature.
            <span> Protect what makes it beautiful.</span>
          </p>
          <span className="OurLatestNews__footerLine" />
        </div>
      </div>
    </section>
  );
};

export default OurLatestNews;
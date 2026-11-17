import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS, getImageUrl } from "../../api/api";
import "./OurLatestNews.css";

const API_PUBLISHED_BLOGS_URL = API_ENDPOINTS.BLOGS_PUBLISHED;

const resolveImageUrl = (image) => getImageUrl(image);

const formatDate = (dateValue, createdAt) => {
  const source = dateValue ? `${dateValue}T00:00:00` : createdAt;
  if (!source) return "Recent Story";
  const parsed = new Date(source);
  if (Number.isNaN(parsed.getTime())) return dateValue || "Recent Story";
  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const OurLatestNews = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch only real published blogs from backend
  useEffect(() => {
    let isMounted = true;

    const fetchPublishedBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_PUBLISHED_BLOGS_URL);
        const json = await res.json();

        if (
          res.ok &&
          json.success &&
          Array.isArray(json.data) &&
          json.data.length > 0
        ) {
          const published = json.data
            .filter((blog) => blog.published === true)
            .slice(0, 3)
            .map((blog, index) => {
              const blogSlug = blog.slug || blog._id || blog.id;

              return {
                id: blog._id || blog.id || index + 1,
                category: blog.category || "Wilderness",
                title: blog.title || "Untamed Bhitarkanika",
                date: formatDate(blog.date, blog.createdAt),
                author: blog.author || "Bhitarkanika Team",
                image: resolveImageUrl(blog.mainImage),
                alt: blog.title || "Bhitarkanika blog story",
                link: `/blog/${blogSlug}`,
              };
            });

          if (isMounted) {
            setNewsList(published);
          }
        } else if (isMounted) {
          setNewsList([]);
        }
      } catch (error) {
        console.warn("Could not fetch published blogs from backend:", error);
        if (isMounted) {
          setNewsList([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPublishedBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  // Intersection observer for section animation
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
      className={`OurLatestNews ${isVisible ? "OurLatestNews--visible" : ""}`}
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

            <h2 className="OurLatestNews__title" id="OurLatestNews-title">
              Latest News <span>&amp; Articles.</span>
            </h2>
          </div>

          <div className="OurLatestNews__headerRight">
            <p className="OurLatestNews__description">
              Discover the wildlife, peaceful waterways, lush mangroves
              and unforgettable experiences of Bhitarkanika, Odisha.
            </p>

            <Link to="/blog" className="OurLatestNews__viewAll">
              Explore All Stories
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        {/* Real published news cards */}
        {loading ? (
          <div className="OurLatestNews__grid">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="OurLatestNews__card OurLatestNews__card--skeleton"
              />
            ))}
          </div>
        ) : newsList.length > 0 ? (
          <div className="OurLatestNews__grid">
            {newsList.map((news, index) => (
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
                  {news.image ? (
                    <img
                      className="OurLatestNews__image"
                      src={news.image}
                      alt={news.alt}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="OurLatestNews__imageFallback">
                      <span>{news.category}</span>
                    </div>
                  )}

                  <div className="OurLatestNews__imageShade" />

                  <div className="OurLatestNews__cardTop">
                    <span className="OurLatestNews__category">
                      <span className="OurLatestNews__categoryDot" />
                      {news.category}
                    </span>

                    <span className="OurLatestNews__cardNumber">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="OurLatestNews__cardContent">
                    <div className="OurLatestNews__meta">
                      <span className="OurLatestNews__metaIcon">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

                    <h3 className="OurLatestNews__cardTitle">{news.title}</h3>

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
        ) : (
          <div className="OurLatestNews__emptyState">
            <p>No published articles found at the moment.</p>
          </div>
        )}

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

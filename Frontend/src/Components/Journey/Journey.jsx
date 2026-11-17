import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaLeaf,
  FaMapMarkerAlt,
} from "react-icons/fa";

import "./Journey.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const ITEMS_PER_PAGE = 6;

const Journey = () => {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const fetchExplores = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/explores`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          // Display live published explore posts from admin
          const list = json.data.filter((item) => item.published !== false);
          setAttractions(list);
          if (list.length > 0) {
            setActiveId(list[0]._id || list[0].id);
          }
        } else {
          setAttractions([]);
        }
      } catch (err) {
        console.error("Failed to load explore items:", err);
        setAttractions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExplores();
  }, []);

  const totalPages = Math.max(1, Math.ceil(attractions.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentAttractions = attractions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
    setActiveId(null);

    document
      .getElementById("journey-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="journey-section" id="journey-section">
      <div className="journey-container">
        {/* SECTION HEADER */}
        <div className="journey-header">
          <span className="journey-badge">
            <FaLeaf />
            Explore Bhitarkanika
          </span>

          <h2 className="journey-main-title">
            Discover The Wonders
            <span> Of Bhitarkanika</span>
          </h2>

          <p className="journey-header-description">
            Explore beautiful mangrove forests, incredible wildlife,
            peaceful waterways and unforgettable natural experiences.
          </p>
        </div>

        {/* ATTRACTION GRID: EXACTLY 6 IMAGES PER PAGE */}
        {loading ? (
          <div className="journey-loading">
            <div className="journey-spinner" />
            <p>Loading explore attractions...</p>
          </div>
        ) : attractions.length === 0 ? (
          <div className="journey-empty">
            <p>No explore attractions posted yet.</p>
          </div>
        ) : (
          <>
            <div className="journey-grid">
              {currentAttractions.map((item, index) => {
                const displayIndex = startIndex + index + 1;
                const itemId = item._id || item.id || index;
                const imageUrl = item.image || item.imageUrl || "";
                const specification =
                  item.specification ||
                  item.location ||
                  item.bestTimeToVisit ||
                  "Bhitarkanika Sanctuary";
                const description =
                  item.shortDesc || item.description || item.fullDesc || "";

                return (
                  <article
                    className={`destination-card ${
                      activeId === itemId ? "active" : ""
                    }`}
                    key={itemId}
                    tabIndex={0}
                    onMouseEnter={() => setActiveId(itemId)}
                    onMouseLeave={() => setActiveId(null)}
                    onFocus={() => setActiveId(itemId)}
                    onBlur={() => setActiveId(null)}
                  >
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={item.title}
                        className="card-bg-img"
                        loading="lazy"
                      />
                    )}

                    <div className="card-overlay"></div>

                    <div className="card-number">
                      {String(displayIndex).padStart(2, "0")}
                    </div>

                    <div className="card-info-content">
                      <span className="card-category">
                        <FaLeaf />
                        {item.category || "Nature & Wildlife"}
                      </span>

                      <h3 className="place-title">{item.title}</h3>

                      {specification && (
                        <p className="card-specification">{specification}</p>
                      )}

                      {description && (
                        <p className="card-description">{description}</p>
                      )}
                    </div>

                    <div className="card-location-icon">
                      <FaMapMarkerAlt />
                    </div>
                  </article>
                );
              })}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="journey-pagination">
                <button
                  type="button"
                  className="journey-pagination-arrow"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <FaChevronLeft />
                  <span>Previous</span>
                </button>

                <div className="journey-pagination-numbers">
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (page) => (
                      <button
                        type="button"
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`journey-page-number ${
                          currentPage === page ? "selected" : ""
                        }`}
                        aria-label={`Go to page ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  type="button"
                  className="journey-pagination-arrow"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <span>Next</span>
                  <FaChevronRight />
                </button>
              </div>
            )}

            <p className="journey-page-information">
              Showing <strong>{startIndex + 1}</strong> –{" "}
              <strong>
                {Math.min(startIndex + ITEMS_PER_PAGE, attractions.length)}
              </strong>{" "}
              of <strong>{attractions.length}</strong> attractions
            </p>
          </>
        )}

        {/* PROMOTIONAL CARD - OUTSIDE THE SIX-IMAGE GRID */}
        <div className="promo-banner-card">
          <div className="promo-banner-content">
            <span className="promo-small-label">Experience The Adventure</span>

            <h3>Explore Bhitarkanika By Boat</h3>

            <p>
              Discover hidden waterways, beautiful mangroves and extraordinary
              wildlife on an unforgettable boat journey.
            </p>

            <Link
              to="/#book-trip"
              className="promo-banner-button"
              onClick={(e) => {
                const el = document.getElementById("book-trip");
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            >
              Explore Boat Services
              <FaArrowRight />
            </Link>
          </div>

          <div className="promo-banner-decoration">
            <FaLeaf />
          </div>
        </div>

        {/* BOTTOM NOTE */}
        <div className="journey-bottom-note">
          <FaLeaf />
          <p>
            Wildlife sightings depend on natural conditions and seasons. The
            River Sangam sunset experience is available only for afternoon
            booking guests.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Journey;

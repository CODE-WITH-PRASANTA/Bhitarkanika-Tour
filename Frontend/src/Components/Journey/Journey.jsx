
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Journey.css";

import brazilImg from "../../assets/a1.jpeg";
import italyImg from "../../assets/a2.jpeg";
import newYorkImg from "../../assets/a3.jpeg";
import saudiArabImg from "../../assets/a4.jpeg";
import europeImg from "../../assets/a5.jpeg";

const Journey = () => {
  const [activeId, setActiveId] = useState(3);

 const destinations = [
  {
    id: 1,
    title: "Bhitarkanika Boat Safari",
    image: brazilImg,
    tours: "River Cruise",
  },
  {
    id: 2,
    title: "Migratory Birdwatching",
    image: italyImg,
    tours: "Bird Watching",
  },
  {
    id: 3,
    title: "Mangrove Wooden Walkway",
    image: newYorkImg,
    tours: "Nature Trail",
  },
  {
    id: 4,
    title: "Mangrove Forest Trek",
    image: saudiArabImg,
    tours: "Forest Walk",
  },
  {
    id: 5,
    title: "Painted Stork Birdwatching",
    image: europeImg,
    tours: "Wildlife",
  },
];

  return (
    <section className="journey-section">
      <div className="journey-container">

        {/* SECTION HEADER */}
        <div className="journey-header">
          <div className="journey-badge">
            <span className="badge-arrow">→</span>
            <span className="badge-text">Explore Bhitarkanika</span>
            <span className="badge-wave">~</span>
          </div>

          <h2 className="journey-main-title">
            Discover the Wonders of Nature
          </h2>
        </div>

        {/* DESTINATION GRID */}
        <div
          className="journey-grid"
          onMouseLeave={() => setActiveId(3)}
        >
          {destinations.map((item) => {
            const isActive = activeId === item.id;

            return (
              <div
                key={item.id}
                className={`destination-card ${
                  isActive ? "active" : ""
                }`}
                onMouseEnter={() => setActiveId(item.id)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="card-bg-img"
                  loading="lazy"
                />

                <div className="card-overlay"></div>

                <div className="card-info-content">
                  <h3 className="place-title">
                    {item.title}
                  </h3>

                  <div className="tour-badge-wrapper">
                    <div className="tour-ribbon">
                      <span className="ribbon-text">
                        {item.tours}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* PROMOTIONAL CARD */}
          <div className="promo-banner-card">
            <div className="plane-sketch sketch-top">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#778079"
                strokeWidth="1.5"
              >
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </div>

            <div className="plane-sketch sketch-bottom">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#778079"
                strokeWidth="1.5"
              >
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </div>

            <div className="promo-content">
              <div className="discount-tag">
                <span>Explore the Wild</span>
              </div>

              <h3 className="promo-title">
                Your Next<br />
                Nature Adventure
              </h3>

              <Link
                to="/services/boat-service"
                className="btn-view-destinations"
              >
                Explore All Tours
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;

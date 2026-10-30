
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaLeaf,
  FaMapMarkerAlt,
} from "react-icons/fa";

import "./Journey.css";

const attractions = [
  {
    id: 1,
    title: "Mangrove Forest",
    category: "Nature & Wildlife",
    description:
      "Explore the beautiful mangrove ecosystem of Bhitarkanika, filled with winding waterways and rich biodiversity.",
    specification: "Dense mangrove ecosystem",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bhitarakanika%20national%20park%20mangroves.jpg?width=1000",
  },
  {
    id: 2,
    title: "Jungle Trekking",
    category: "Adventure",
    description:
      "Walk through natural forest trails and experience the peaceful atmosphere of the mangrove wilderness.",
    specification: "Guided nature trail",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bhitarkanika%20National%20Park%20inside%20pathway%20.jpg?width=1000",
  },
  {
    id: 3,
    title: "Skywalk View",
    category: "Scenic Experience",
    description:
      "Enjoy beautiful elevated views of the surrounding natural landscape and forest environment.",
    specification: "Panoramic nature view",
    image:
      "https://jungleavengers.com/wp-content/uploads/2025/08/a-breathtaking-scene-of-bhitarkanika-national-par-768x768.png",
  },
  {
    id: 4,
    title: "Monitor Lizard",
    category: "Wildlife",
    description:
      "Discover the fascinating water monitor lizard, one of the interesting reptiles found in the region.",
    specification: "Wildlife observation",
    image:
      "https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    title: "Spotted Deer",
    category: "Wildlife",
    description:
      "Watch spotted deer moving through the forest surroundings and enjoying their natural habitat.",
    specification: "Natural wildlife habitat",
    image:
      "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    title: "Saltwater Crocodile",
    category: "Wildlife",
    description:
      "Experience the incredible sight of the famous saltwater crocodile, one of Bhitarkanika's major attractions.",
    specification: "Saltwater crocodile habitat",
    image:
      "https://res.cloudinary.com/roundglass/image/upload/f_auto/v1592388282/roundglass/sustain/odisha-bhitarkanika-saltwater-crocodile-dhritiman-mukherjee_vc63fo.jpg",
  },
  {
    id: 7,
    title: "Boating Experience",
    category: "Adventure",
    description:
      "Travel through beautiful rivers and narrow creeks while enjoying the natural beauty of Bhitarkanika.",
    specification: "River and creek safari",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 8,
    title: "Olive Ridley Turtles",
    category: "Marine Wildlife",
    description:
      "Learn about the Olive Ridley turtles and their conservation along Odisha's coastal ecosystem.",
    specification: "Seasonal turtle conservation",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Habalikhati%20Island%20Turtle%20Site.jpg?width=1000",
  },
  {
    id: 9,
    title: "Wildlife Museum",
    category: "Learning & Discovery",
    description:
      "Explore exhibits and learn about the wildlife, ecology and conservation heritage of the region.",
    specification: "Educational experience",
    image:
      "https://bhitarkanikatour.in/wp-content/uploads/2022/06/wildlife_conservation.jpg",
  },
  {
    id: 10,
    title: "Hunting Tower",
    category: "Heritage",
    description:
      "Discover the historic structures and heritage associated with the natural landscape of Bhitarkanika.",
    specification: "Historical landmark",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bhitarkanika%20National%20Park.jpg?width=1000",
  },
  {
    id: 11,
    title: "Migratory Birds Point",
    category: "Birdwatching",
    description:
      "Observe seasonal migratory birds visiting the wetlands and waterways of Bhitarkanika.",
    specification: "Seasonal birdwatching",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Storks%20-%20Bhitarkanika%20National%20Park.jpg?width=1000",
  },
  {
    id: 12,
    title: "Kingfisher Birds",
    category: "Birdwatching",
    description:
      "Enjoy birdwatching and look for colourful kingfishers among the riverside trees and waterways.",
    specification: "Eight kingfisher types reported in the region",
    image:
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 13,
    title: "Wetland Ecosystem",
    category: "Nature",
    description:
      "Explore the wetlands that support a rich variety of birds, fish, reptiles and other wildlife.",
    specification: "Rich wetland habitat",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bhitarkanika%20National%20Park.jpg?width=1000",
  },
  {
    id: 14,
    title: "Biodiversity",
    category: "Nature & Discovery",
    description:
      "Experience the incredible variety of plants, birds, reptiles and animals found across the ecosystem.",
    specification: "Diverse flora and fauna",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bhitarakanika%20national%20park%20mangroves.jpg?width=1000",
  },
  {
    id: 15,
    title: "Ramsar Site",
    category: "Natural Heritage",
    description:
      "Discover the internationally recognised wetland ecosystem and its importance for biodiversity conservation.",
    specification: "Internationally recognised wetland",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Storks%20-%20Bhitarkanika%20National%20Park.jpg?width=1000",
  },
  {
    id: 16,
    title: "Red Crab",
    category: "Wildlife",
    description:
      "Look for colourful red crabs moving across the muddy banks and mangrove surroundings.",
    specification: "Mangrove mudflat wildlife",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Red%20crabs%2C%20Bhitarkanmika%20National%20Park.jpg?width=1000",
  },
  {
    id: 17,
    title: "Mud Crab",
    category: "Marine Wildlife",
    description:
      "Discover mud crabs living in the muddy tidal areas and mangrove ecosystem.",
    specification: "Coastal mangrove species",
    image:
      "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 18,
    title: "White Crocodile – Gori",
    category: "Wildlife",
    description:
      "Learn about Gori, the well-known white crocodile associated with Bhitarkanika's crocodile conservation story.",
    specification: "Famous white crocodile",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Crocodile%2C%20Bhitarkanika%20National%20Park.jpg?width=1000",
  },
  {
    id: 19,
    title: "River Sangam Sunset",
    category: "Scenic Experience",
    description:
      "Enjoy a beautiful sunset at the river confluence. This experience is available only for afternoon booking guests.",
    specification: "Afternoon booking guests only",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Sunset%20%28Bhitarkanika%20National%20Park%29%20%28Odisha%29.jpg?width=1000",
  },
  {
    id: 20,
    title: "Crocodile Breeding Hatchery",
    category: "Conservation",
    description:
      "Learn about crocodile breeding, conservation activities and the protection of saltwater crocodiles.",
    specification: "Crocodile conservation centre",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Crocodile%20near%20plants%20%28Bhitarkanika%20National%20Park%29%20%28Odisha%29.jpg?width=1000",
  },
];

const ITEMS_PER_PAGE = 6;

const Journey = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeId, setActiveId] = useState(3);

  const totalPages = Math.ceil(attractions.length / ITEMS_PER_PAGE);

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

  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src =
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85";
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
        <div className="journey-grid">
          {currentAttractions.map((item) => (
            <article
              className={`destination-card ${
                activeId === item.id ? "active" : ""
              }`}
              key={item.id}
              tabIndex={0}
              onMouseEnter={() => setActiveId(item.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(item.id)}
              onBlur={() => setActiveId(null)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="card-bg-img"
                loading="lazy"
                onError={handleImageError}
              />

              <div className="card-overlay"></div>

              <div className="card-number">
                {String(item.id).padStart(2, "0")}
              </div>

              <div className="card-info-content">
                <span className="card-category">
                  <FaLeaf />
                  {item.category}
                </span>

                <h3 className="place-title">{item.title}</h3>

                <p className="card-specification">
                  {item.specification}
                </p>

                <p className="card-description">
                  {item.description}
                </p>
              </div>

              <div className="card-location-icon">
                <FaMapMarkerAlt />
              </div>
            </article>
          ))}
        </div>

        {/* PAGINATION */}
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

        <p className="journey-page-information">
          Showing{" "}
          <strong>{startIndex + 1}</strong> –{" "}
          <strong>
            {Math.min(startIndex + ITEMS_PER_PAGE, attractions.length)}
          </strong>{" "}
          of <strong>{attractions.length}</strong> attractions
        </p>

        {/* PROMOTIONAL CARD - OUTSIDE THE SIX-IMAGE GRID */}
        <div className="promo-banner-card">
          <div className="promo-banner-content">
            <span className="promo-small-label">
              Experience The Adventure
            </span>

            <h3>Explore Bhitarkanika By Boat</h3>

            <p>
              Discover hidden waterways, beautiful mangroves and
              extraordinary wildlife on an unforgettable boat journey.
            </p>

            <Link to="/services/boat-service" className="promo-banner-button">
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
            Wildlife sightings depend on natural conditions and seasons.
            The River Sangam sunset experience is available only for
            afternoon booking guests.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Journey;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Experience.css";

// ============================================
// TOUR PACKAGE DATA
// ============================================

const tourData = [
  {
    id: 1,
    slug: "bhitarkanika-wildlife-tour",
    title: "Bhitarkanika Wildlife Adventure",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=85",
    duration: "3 DAYS / 2 NIGHTS",
    location: "KENDRAPARA, ODISHA",
    category: "WILDLIFE",
    route: "Mangrove Forest → River Safari → Wildlife Viewing",
    price: 4500,
    oldPrice: 5500,
  },
  {
    id: 2,
    slug: "bhitarkanika-boat-safari",
    title: "Bhitarkanika Boat Safari",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=85",
    duration: "1 DAY",
    location: "BHITARKANIKA, ODISHA",
    category: "BOAT SAFARI",
    route: "Scenic Waterways → Mangrove Creeks → Nature",
    price: 1800,
    oldPrice: 2200,
  },
  {
    id: 3,
    slug: "odisha-nature-tour",
    title: "Explore the Mangrove Forest",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=85",
    duration: "2 DAYS / 1 NIGHT",
    location: "ODISHA",
    category: "NATURE",
    route: "Forest Trails → Green Landscapes → Nature Walk",
    price: 3200,
    oldPrice: 4000,
  },
  {
    id: 4,
    slug: "bhitarkanika-birdwatching",
    title: "Birdwatching Experience",
    image:
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1000&q=85",
    duration: "1 DAY",
    location: "BHITARKANIKA, ODISHA",
    category: "BIRDWATCHING",
    route: "Birdwatching → Forest Exploration → Nature",
    price: 1500,
    oldPrice: 1900,
  },
  {
    id: 5,
    slug: "odisha-family-holiday",
    title: "Odisha Nature Getaway",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
    duration: "4 DAYS / 3 NIGHTS",
    location: "ODISHA",
    category: "FAMILY TOUR",
    route: "Nature → Scenic Landscapes → Local Exploration",
    price: 7500,
    oldPrice: 9000,
  },
  {
    id: 6,
    slug: "bhitarkanika-weekend-getaway",
    title: "Peaceful River Escape",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=85",
    duration: "2 DAYS / 1 NIGHT",
    location: "KENDRAPARA, ODISHA",
    category: "WEEKEND TOUR",
    route: "River Views → Nature Trails → Scenic Landscapes",
    price: 3500,
    oldPrice: 4200,
  },
];

// ============================================
// HOTEL DATA
// ============================================

const hotelData = [
  {
    id: 1,
    slug: "premium-nature-stay",
    title: "Premium Nature Resort",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85",
    location: "Bhitarkanika, Odisha",
    distance: "Nature getaway",
    rating: "4.5",
    breakfast: "BREAKFAST INCLUDED",
    amenities: ["Free Wi-Fi", "Restaurant", "Room Service"],
    roomType: "Deluxe Room",
    bed: "King Bed",
    cancellation: "Free Cancellation",
    price: 2500,
    oldPrice: 3200,
  },
  {
    id: 2,
    slug: "family-comfort-stay",
    title: "Family Comfort Stay",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=85",
    location: "Kendrapara, Odisha",
    distance: "Comfortable family accommodation",
    rating: "4.4",
    breakfast: "MEALS AVAILABLE",
    amenities: ["Restaurant", "Family Rooms", "Parking"],
    roomType: "Family Room",
    bed: "Double Bed",
    cancellation: "Flexible Policy",
    price: 3000,
    oldPrice: 3800,
  },
  {
    id: 3,
    slug: "nature-view-retreat",
    title: "Nature View Retreat",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=85",
    location: "Odisha",
    distance: "Relaxing holiday retreat",
    rating: "4.6",
    breakfast: "BREAKFAST INCLUDED",
    amenities: ["Restaurant", "Garden", "Room Service"],
    roomType: "Premium Room",
    bed: "King Bed",
    cancellation: "Free Cancellation",
    price: 3500,
    oldPrice: 4200,
  },
  {
    id: 4,
    slug: "eco-friendly-lodge",
    title: "Eco-Friendly Lodge",
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1000&q=85",
    location: "Near Bhitarkanika",
    distance: "Peaceful nature surroundings",
    rating: "4.3",
    breakfast: "MEALS AVAILABLE",
    amenities: ["Restaurant", "Parking", "Garden"],
    roomType: "Standard Room",
    bed: "Double Bed",
    cancellation: "Flexible Policy",
    price: 2000,
    oldPrice: 2600,
  },
  {
    id: 5,
    slug: "luxury-relaxation-stay",
    title: "Luxury Relaxation Stay",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=85",
    location: "Odisha",
    distance: "Premium holiday experience",
    rating: "4.7",
    breakfast: "BREAKFAST INCLUDED",
    amenities: ["Free Wi-Fi", "Restaurant", "Room Service"],
    roomType: "Luxury Room",
    bed: "King Bed",
    cancellation: "Free Cancellation",
    price: 4500,
    oldPrice: 5500,
  },
  {
    id: 6,
    slug: "peaceful-riverside-stay",
    title: "Peaceful Riverside Stay",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=85",
    location: "Kendrapara, Odisha",
    distance: "Relaxing getaway",
    rating: "4.4",
    breakfast: "MEALS AVAILABLE",
    amenities: ["Restaurant", "Parking", "Room Service"],
    roomType: "Deluxe Room",
    bed: "Queen Bed",
    cancellation: "Flexible Policy",
    price: 2800,
    oldPrice: 3500,
  },
];

// ============================================
// PRICE FORMATTER
// ============================================

const formatPrice = (value) => {
  return `₹${Number(value).toLocaleString("en-IN")}`;
};

// ============================================
// EXPERIENCE COMPONENT
// ============================================

const Experience = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("tour");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 650 : false
  );

  const displayedItems = activeTab === "tour" ? tourData : hotelData;

  // RESPONSIVE SCREEN DETECTION
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 650);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // CHANGE TABS
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  // MOBILE CAROUSEL
  const handlePrev = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0
        ? displayedItems.length - 1
        : previousIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex === displayedItems.length - 1
        ? 0
        : previousIndex + 1
    );
  };

  // NAVIGATION
  const handleBookTrip = (item) => {
    navigate(`/tours/${item.slug}`);
  };

  const handleCheckAvailability = (item) => {
    navigate(`/hotel/${item.slug}`, {
      state: { hotel: item },
    });
  };

  // IMAGE FALLBACK
  const handleImageError = (event) => {
    event.currentTarget.style.display = "none";
  };

  return (
    <section className="exp-section">
      <div className="exp-container">

        {/* SECTION HEADER */}
        <div className="exp-header">
          <div className="exp-header-content">
            <span className="exp-eyebrow">
              BHITARKANIKA EXPLORE
            </span>

            <h1>
              Discover Odisha <span>Tour Packages</span>
            </h1>

            <p>
              Explore beautiful mangrove forests, experience unforgettable
              boat safaris, discover local wildlife, and find comfortable
              stays for your next Odisha adventure.
            </p>
          </div>

          {/* TOUR AND HOTEL TABS ONLY */}
          <div className="exp-tabs">
            <button
              type="button"
              className={
                activeTab === "tour" ? "exp-tab active" : "exp-tab"
              }
              onClick={() => handleTabChange("tour")}
              aria-pressed={activeTab === "tour"}
            >
              <span className="exp-tab-icon">✦</span>
              Tour Packages
            </button>

            <button
              type="button"
              className={
                activeTab === "hotel" ? "exp-tab active" : "exp-tab"
              }
              onClick={() => handleTabChange("hotel")}
              aria-pressed={activeTab === "hotel"}
            >
              <span className="exp-tab-icon">◆</span>
              Hotels
            </button>
          </div>
        </div>

        {/* TOUR / HOTEL CARDS */}
        <div className="exp-cards-grid">
          {displayedItems.map((item, index) => {
            // SHOW ONE CARD AT A TIME ON MOBILE
            if (isMobile && index !== currentIndex) {
              return null;
            }

            // TOUR CARD
            if (activeTab === "tour") {
              return (
                <article className="exp-tour-card" key={item.id}>
                  <div className="exp-card-image-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="exp-card-image"
                      loading="lazy"
                      onError={handleImageError}
                    />

                    <div className="exp-image-overlay" />

                    <span className="exp-duration">
                      {item.duration}
                    </span>

                    <span className="exp-location">
                      {item.category} • {item.location}
                    </span>

                    <div className="exp-image-shine" />
                  </div>

                  <div className="exp-card-content">
                    <h2>{item.title}</h2>

                    <div className="exp-route">
                      <span>⟶</span>
                      <span>{item.route}</span>
                    </div>

                    <div className="exp-card-footer">
                      <div className="exp-price-box">
                        <span className="exp-price-label">
                          Starting From
                        </span>

                        <div className="exp-price-row">
                          <strong>{formatPrice(item.price)}</strong>
                          <del>{formatPrice(item.oldPrice)}</del>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="exp-primary-btn"
                        onClick={() => handleBookTrip(item)}
                      >
                        Book Trip <span>→</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            }

            // HOTEL CARD
            return (
              <article className="exp-hotel-card" key={item.id}>
                <div className="exp-hotel-image-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="exp-hotel-image"
                    loading="lazy"
                    onError={handleImageError}
                  />

                  <div className="exp-image-overlay" />

                  <span className="exp-breakfast">
                    {item.breakfast}
                  </span>

                  <span className="exp-hotel-rating">
                    ★ {item.rating}
                  </span>
                </div>

                <div className="exp-hotel-content">
                  <div className="exp-hotel-title-row">
                    <div>
                      <h2>{item.title}</h2>

                      <p className="exp-hotel-location">
                        <span>📍</span> {item.location}
                      </p>
                    </div>
                  </div>

                  <p className="exp-hotel-distance">
                    {item.distance}
                  </p>

                  <div className="exp-amenities">
                    {item.amenities.slice(0, 4).map((amenity) => (
                      <span key={amenity}>✓ {amenity}</span>
                    ))}
                  </div>

                  <div className="exp-room-info">
                    <div>
                      <small>ROOM</small>
                      <strong>{item.roomType}</strong>
                    </div>

                    <div>
                      <small>BED</small>
                      <strong>{item.bed}</strong>
                    </div>

                    <div>
                      <small>POLICY</small>
                      <strong>{item.cancellation}</strong>
                    </div>
                  </div>

                  <div className="exp-hotel-footer">
                    <div className="exp-price-box">
                      <span className="exp-price-label">
                        Per Night
                      </span>

                      <div className="exp-price-row">
                        <strong>{formatPrice(item.price)}</strong>
                        <del>{formatPrice(item.oldPrice)}</del>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="exp-primary-btn"
                      onClick={() => handleCheckAvailability(item)}
                    >
                      Check Availability <span>→</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* MOBILE SLIDER CONTROLS */}
        {isMobile && displayedItems.length > 1 && (
          <div className="exp-mobile-controls">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous item"
            >
              ←
            </button>

            <div className="exp-dots">
              {displayedItems.map((item, index) => (
                <button
                  type="button"
                  key={item.id}
                  className={index === currentIndex ? "active" : ""}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to item ${index + 1}`}
                  aria-current={index === currentIndex ? "true" : undefined}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next item"
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;

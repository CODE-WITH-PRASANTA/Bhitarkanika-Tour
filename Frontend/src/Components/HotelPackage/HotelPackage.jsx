
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Star,
  Heart,
  Wifi,
  Utensils,
  Waves,
  ArrowRight,
  Building2,
  Sparkles,
  BedDouble,
  Coffee,
  ShieldCheck,
  Dumbbell,
  Wind,
  CircleParking,
} from "lucide-react";

import "./HotelPackage.css";

// =====================================================
// FRONTEND HOTEL DATA — NO BACKEND REQUIRED
// Images are loaded directly from Unsplash.
// =====================================================

const hotelData = [
  {
    id: 1,
    name: "Bhitarkanika Nature Resort",
    slug: "bhitarkanika-nature-resort",
    city: "Bhitarkanika",
    address: "Near the Bhitarkanika National Park",
    landmark: "Mangrove Forest",
    rating: 4.8,
    reviews: 128,
    badge: "Nature Escape",
    shortDesc:
      "Relax close to the mangrove forests and enjoy a peaceful nature-inspired stay near Bhitarkanika.",
    price: 2499,
    amenities: [
      "Free WiFi",
      "Restaurant",
      "Car Parking",
      "Room Service",
    ],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    id: 2,
    name: "Puri Beachside Resort",
    slug: "puri-beachside-resort",
    city: "Puri",
    address: "Near Puri Beach",
    landmark: "Golden Beach",
    rating: 4.7,
    reviews: 214,
    badge: "Popular Stay",
    shortDesc:
      "Enjoy a relaxing coastal getaway with comfortable rooms and easy access to the beautiful beach.",
    price: 3299,
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Restaurant",
      "Breakfast Included",
    ],
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    id: 3,
    name: "Bhubaneswar Heritage Hotel",
    slug: "bhubaneswar-heritage-hotel",
    city: "Bhubaneswar",
    address: "Central Bhubaneswar",
    landmark: "Temple City",
    rating: 4.6,
    reviews: 176,
    badge: "Heritage Stay",
    shortDesc:
      "A comfortable base for exploring Odisha's historic temples, cultural attractions, and city landmarks.",
    price: 2799,
    amenities: [
      "Free WiFi",
      "Restaurant",
      "Air Conditioning",
      "Car Parking",
    ],
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    id: 4,
    name: "Chilika Lake Retreat",
    slug: "chilika-lake-retreat",
    city: "Chilika",
    address: "Near Chilika Lake",
    landmark: "Lake View",
    rating: 4.5,
    reviews: 96,
    badge: "Scenic Getaway",
    shortDesc:
      "Unwind near the scenic lagoon and plan memorable days exploring the surrounding natural beauty.",
    price: 2199,
    amenities: [
      "Restaurant",
      "Free WiFi",
      "Car Parking",
      "Breakfast Included",
    ],
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    id: 5,
    name: "Daringbadi Hill View Resort",
    slug: "daringbadi-hill-view-resort",
    city: "Daringbadi",
    address: "Daringbadi Hill Station",
    landmark: "Pine Forest",
    rating: 4.6,
    reviews: 143,
    badge: "Hill Escape",
    shortDesc:
      "Experience a refreshing hill-station holiday surrounded by green landscapes and cool mountain air.",
    price: 2999,
    amenities: [
      "Restaurant",
      "Car Parking",
      "Room Service",
      "Air Conditioning",
    ],
    images: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    id: 6,
    name: "Konark Luxury Retreat",
    slug: "konark-luxury-retreat",
    city: "Konark",
    address: "Konark Coastal Region",
    landmark: "Sun Temple",
    rating: 4.7,
    reviews: 112,
    badge: "Premium Stay",
    shortDesc:
      "Make your heritage trip memorable with a relaxing stay while discovering the wonders of coastal Odisha.",
    price: 3599,
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Restaurant",
      "Fitness Centre",
    ],
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85",
    ],
  },
];

// =====================================================
// HOTEL PACKAGE COMPONENT
// =====================================================

const HotelPackage = () => {
  const navigate = useNavigate();
  const [likedHotels, setLikedHotels] = useState([]);

  // =====================================================
  // FORMAT PRICE
  // =====================================================

  const formatPrice = (price) =>
    Number(price).toLocaleString("en-IN");

  // =====================================================
  // HOTEL DETAILS NAVIGATION
  // =====================================================

  const openHotelDetails = (hotel) => {
    navigate(`/hotel/${hotel.slug}`, {
      state: {
        hotelId: hotel.id,
        hotel,
      },
    });
  };

  // =====================================================
  // VIEW ALL HOTELS
  // =====================================================

  const handleViewAll = () => {
    navigate("/hotel");
  };

  // =====================================================
  // FAVORITE HOTEL
  // =====================================================

  const toggleLike = (event, hotelId) => {
    event.stopPropagation();

    setLikedHotels((previous) =>
      previous.includes(hotelId)
        ? previous.filter((id) => id !== hotelId)
        : [...previous, hotelId]
    );
  };

  // =====================================================
  // AMENITY ICON
  // =====================================================

  const getAmenityIcon = (amenity) => {
    const value = String(amenity).toLowerCase();

    if (value.includes("wifi") || value.includes("internet")) {
      return <Wifi />;
    }

    if (
      value.includes("restaurant") ||
      value.includes("food") ||
      value.includes("dining")
    ) {
      return <Utensils />;
    }

    if (value.includes("pool") || value.includes("swimming")) {
      return <Waves />;
    }

    if (value.includes("parking")) {
      return <CircleParking />;
    }

    if (value.includes("breakfast") || value.includes("coffee")) {
      return <Coffee />;
    }

    if (value.includes("fitness") || value.includes("gym")) {
      return <Dumbbell />;
    }

    if (
      value.includes("air conditioning") ||
      value.includes("ac")
    ) {
      return <Wind />;
    }

    if (value.includes("security")) {
      return <ShieldCheck />;
    }

    if (value.includes("room")) {
      return <BedDouble />;
    }

    return <Building2 />;
  };

  // =====================================================
  // RENDER STAR RATINGS
  // =====================================================

  const renderStars = (rating) => (
    <div className="HotelPackage-ratingStars">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={17}
          strokeWidth={0}
          fill={
            star <= Math.floor(rating)
              ? "#f8b400"
              : "#d9dfe8"
          }
        />
      ))}
    </div>
  );

  // =====================================================
  // DISPLAY AMENITIES
  // =====================================================

  const getDisplayAmenities = (amenities) =>
    amenities.filter(Boolean).slice(0, 4);

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <section
      className="HotelPackage"
      aria-labelledby="HotelPackage-heading"
    >
      {/* DECORATIVE BACKGROUND */}

      <div className="HotelPackage-backgroundShape HotelPackage-backgroundShapeOne" />

      <div className="HotelPackage-backgroundShape HotelPackage-backgroundShapeTwo" />

      <div className="HotelPackage-backgroundDots" />

      <div className="HotelPackage-container">

        {/* =================================================
            SECTION HEADING
        ================================================= */}

        <div className="HotelPackage-heading">
          <div className="HotelPackage-subHeading">
            <span className="HotelPackage-subHeadingArrow">
              →
            </span>

            <span>Discover Stays Across Odisha</span>

            <span className="HotelPackage-subHeadingArrow">
              ←
            </span>
          </div>

          <h2
            id="HotelPackage-heading"
            className="HotelPackage-title"
          >
            Find Your Perfect Stay in Odisha
          </h2>

          <p className="HotelPackage-description">
            From peaceful mangrove escapes in Bhitarkanika to
            relaxing beach resorts in Puri and scenic hill
            retreats in Daringbadi, discover comfortable stays
            for your next Odisha adventure.
          </p>

          <div className="HotelPackage-headingDecoration">
            <Building2 size={24} />
            <span />
            <Sparkles size={18} />
          </div>
        </div>

        {/* =================================================
            HOTEL GRID
        ================================================= */}

        <div className="HotelPackage-grid">
          {hotelData.map((hotel) => {
            const hotelImage = hotel.images[0];

            const displayAmenities = getDisplayAmenities(
              hotel.amenities
            );

            const isLiked = likedHotels.includes(hotel.id);

            return (
              <article
                className="HotelPackage-card"
                key={hotel.id}
              >
                {/* HOTEL IMAGE */}

                <div
                  className="HotelPackage-imageWrapper"
                  onClick={() => openHotelDetails(hotel)}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      openHotelDetails(hotel);
                    }
                  }}
                >
                  <img
                    src={hotelImage}
                    alt={`${hotel.name} accommodation`}
                    className="HotelPackage-image"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src =
                        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80";
                    }}
                  />

                  <div className="HotelPackage-imageOverlay" />

                  {/* RATING */}

                  <div className="HotelPackage-ratingBadge">
                    <span>{hotel.rating.toFixed(1)}</span>

                    <Star
                      size={15}
                      fill="#ffc107"
                      strokeWidth={0}
                    />
                  </div>

                  {/* LOCATION */}

                  <div className="HotelPackage-locationBadge">
                    <MapPin size={14} fill="#51ad2d" />

                    <span>{hotel.city.toUpperCase()}</span>
                  </div>

                  {/* HOTEL BADGE */}

                  {hotel.badge && (
                    <div
                      className={`HotelPackage-statusBadge ${
                        hotel.rating >= 4.7
                          ? "HotelPackage-statusBadge-popular"
                          : hotel.rating >= 4.5
                          ? "HotelPackage-statusBadge-value"
                          : "HotelPackage-statusBadge-temple"
                      }`}
                    >
                      {hotel.badge}
                    </div>
                  )}
                </div>

                {/* HOTEL CONTENT */}

                <div className="HotelPackage-cardContent">

                  {/* HOTEL NAME AND FAVORITE */}

                  <div className="HotelPackage-nameRow">
                    <h3
                      className="HotelPackage-hotelName"
                      onClick={() => openHotelDetails(hotel)}
                    >
                      {hotel.name}
                    </h3>

                    <button
                      type="button"
                      className={`HotelPackage-likeButton ${
                        isLiked
                          ? "HotelPackage-likeButtonActive"
                          : ""
                      }`}
                      onClick={(event) =>
                        toggleLike(event, hotel.id)
                      }
                      aria-label={
                        isLiked
                          ? `Remove ${hotel.name} from favorites`
                          : `Add ${hotel.name} to favorites`
                      }
                    >
                      <Heart
                        size={20}
                        fill={isLiked ? "currentColor" : "none"}
                      />
                    </button>
                  </div>

                  {/* RATING */}

                  <div className="HotelPackage-reviewRow">
                    {renderStars(hotel.rating)}

                    <span className="HotelPackage-reviewText">
                      ({hotel.reviews} reviews)
                    </span>
                  </div>

                  {/* LOCATION */}

                  <div className="HotelPackage-cardLocation">
                    <MapPin size={14} />

                    <span>
                      {hotel.city}, {hotel.address}
                    </span>
                  </div>

                  {/* DESCRIPTION */}

                  <p className="HotelPackage-shortDesc">
                    {hotel.shortDesc}
                  </p>

                  {/* AMENITIES */}

                  <div className="HotelPackage-amenities">
                    {displayAmenities.map((amenity, index) => (
                      <div
                        className="HotelPackage-amenity"
                        key={`${hotel.id}-${index}`}
                      >
                        <div className="HotelPackage-amenityIcon">
                          {React.cloneElement(
                            getAmenityIcon(amenity),
                            {
                              size: 20,
                              strokeWidth: 1.8,
                            }
                          )}
                        </div>

                        <span className="HotelPackage-amenityText">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* DIVIDER */}

                  <div className="HotelPackage-divider" />

                  {/* PRICE AND BUTTON */}

                  <div className="HotelPackage-bottom">
                    <div className="HotelPackage-priceArea">
                      <span className="HotelPackage-priceLabel">
                        Starting From:
                      </span>

                      <div className="HotelPackage-priceRow">
                        <span className="HotelPackage-price">
                          ₹{formatPrice(hotel.price)}
                        </span>

                        <span className="HotelPackage-oldPrice">
                          ₹
                          {formatPrice(
                            Math.round(hotel.price * 1.15)
                          )}
                        </span>

                        <span className="HotelPackage-priceDuration">
                          / Night
                        </span>
                      </div>

                      <span className="HotelPackage-priceNote">
                        SAMPLE PRICE / ROOM
                      </span>
                    </div>

                    <button
                      type="button"
                      className="HotelPackage-bookButton"
                      onClick={() => openHotelDetails(hotel)}
                    >
                      <span>Explore Stay</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* =================================================
            VIEW ALL HOTELS
        ================================================= */}

        <div className="HotelPackage-viewAllWrapper">
          <button
            type="button"
            className="HotelPackage-viewAllButton"
            onClick={handleViewAll}
          >
            <span>EXPLORE ALL STAYS IN ODISHA</span>
            <ArrowRight size={19} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default HotelPackage;

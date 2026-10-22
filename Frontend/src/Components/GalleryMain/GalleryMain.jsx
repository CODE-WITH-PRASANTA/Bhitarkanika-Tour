import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import "./GalleryMain.css";

const galleryImages = [
  {
    id: 1,
    title: "Saltwater Crocodile",
    category: "Wildlife",
    location: "Bhitarkanika National Park",
    image:
      "https://images.squarespace-cdn.com/content/v1/552ce6d0e4b0d3f184888632/1439705415659-VQJQ7HYKF6J9RKBDYTON/5D3_9150.jpg",
  },
  {
    id: 2,
    title: "Olive Ridley Turtles",
    category: "Wildlife",
    location: "Odisha Coast",
    image:
      "https://res.cloudinary.com/roundglass/image/upload/f_auto/v1584218805/roundglass/sustain/Odisha_Olive-ridley_Kartik-Shanker-copy_ze1jx0.jpg",
  },
  {
    id: 3,
    title: "Birds of the Mangroves",
    category: "Birds",
    location: "Bhitarkanika Wetlands",
    image:
      "https://miro.medium.com/v2/resize%3Afit%3A1200/0%2A6UWbJD-wqfPe4MXk.jpg",
  },
  {
    id: 4,
    title: "Deep Green Forest",
    category: "Nature",
    location: "Mangrove Forest",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 5,
    title: "Deer in the Wilderness",
    category: "Wildlife",
    location: "Forest Habitat",
    image:
      "https://apps.odishatourism.gov.in/Application/uploadDocuments/UserContribution/user20200130121601619",
  },
  {
    id: 6,
    title: "Coastal Blue",
    category: "Nature",
    location: "Odisha Coastline",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 7,
    title: "Colourful Birdlife",
    category: "Birds",
    location: "Birdwatching Trail",
    image:
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 8,
    title: "A Journey Through Nature",
    category: "Boating",
    location: "Mangrove Waterways",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 9,
    title: "Forest Canopy",
    category: "Nature",
    location: "Green Forest Trail",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 10,
    title: "Birds in Their Natural Habitat",
    category: "Birds",
    location: "Wetland Sanctuary",
    image:
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 11,
    title: "Peaceful Ocean Waves",
    category: "Nature",
    location: "Coastal Odisha",
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 12,
    title: "Wild Nature",
    category: "Wildlife",
    location: "Natural Habitat",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 13,
    title: "The Living Forest",
    category: "Nature",
    location: "Mangrove Ecosystem",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 14,
    title: "Wings in Motion",
    category: "Birds",
    location: "Bird Habitat",
    image:
      "https://images.unsplash.com/photo-1480044965905-02098d419e96?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 15,
    title: "River Adventure",
    category: "Boating",
    location: "Bhitarkanika Waterways",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 16,
    title: "A Natural Paradise",
    category: "Wildlife",
    location: "Odisha Wilderness",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 17,
    title: "Golden Hour",
    category: "Nature",
    location: "Evening Landscape",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 18,
    title: "Into the Wilderness",
    category: "Nature",
    location: "Forest Trails",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1400&q=85",
  },
];

const categories = ["All", "Wildlife", "Birds", "Nature", "Boating"];
const IMAGES_PER_PAGE = 12;

const GalleryMain = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [failedImages, setFailedImages] = useState([]);

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return galleryImages;
    return galleryImages.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredImages.length / IMAGES_PER_PAGE);

  const currentImages = useMemo(() => {
    const start = (currentPage - 1) * IMAGES_PER_PAGE;
    return filteredImages.slice(start, start + IMAGES_PER_PAGE);
  }, [filteredImages, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  useEffect(() => {
    if (!selectedImage) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }

      if (event.key === "ArrowRight") {
        setSelectedImage((current) => {
          if (!current) return null;
          const index = filteredImages.findIndex((item) => item.id === current.id);
          return filteredImages[(index + 1) % filteredImages.length];
        });
      }

      if (event.key === "ArrowLeft") {
        setSelectedImage((current) => {
          if (!current) return null;
          const index = filteredImages.findIndex((item) => item.id === current.id);
          return filteredImages[
            (index - 1 + filteredImages.length) % filteredImages.length
          ];
        });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedImage, filteredImages]);

  const changePage = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const moveSelectedImage = (direction) => {
    if (!selectedImage || filteredImages.length < 2) return;
    const index = filteredImages.findIndex((item) => item.id === selectedImage.id);
    const nextIndex =
      (index + direction + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const lightbox = selectedImage
    ? createPortal(
        <div
          className="GalleryMain__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedImage(null);
            }
          }}
        >
          {/* Close Button */}
          <button
            type="button"
            className="GalleryMain__lightboxClose"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image preview"
            title="Close preview (Esc)"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Left Arrow */}
          {filteredImages.length > 1 && (
            <button
              type="button"
              className="GalleryMain__lightboxNav GalleryMain__lightboxPrev"
              aria-label="Previous image"
              onClick={() => moveSelectedImage(-1)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Lightbox Main Frame */}
          <div className="GalleryMain__lightboxPanel">
            <div className="GalleryMain__lightboxImageArea">
              <img
                className="GalleryMain__lightboxImage"
                src={selectedImage.image}
                alt={selectedImage.title}
              />
            </div>

            <div className="GalleryMain__lightboxCaption">
              <div className="GalleryMain__lightboxMeta">
                <span className="GalleryMain__lightboxCategory">
                  {selectedImage.category}
                </span>
                <h2>{selectedImage.title}</h2>
                <p>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {selectedImage.location}
                </p>
              </div>

              <span className="GalleryMain__lightboxCounter">
                {String(
                  filteredImages.findIndex((item) => item.id === selectedImage.id) + 1
                ).padStart(2, "0")}{" "}
                <span>/</span> {String(filteredImages.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Right Arrow */}
          {filteredImages.length > 1 && (
            <button
              type="button"
              className="GalleryMain__lightboxNav GalleryMain__lightboxNext"
              aria-label="Next image"
              onClick={() => moveSelectedImage(1)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <section className="GalleryMain" id="gallery">
        <div className="GalleryMain__container">
          
          {/* Header */}
          <header className="GalleryMain__header">
            <div className="GalleryMain__eyebrow">
              <span className="GalleryMain__eyebrowLine" />
              <span>BHITARKANIKA THROUGH OUR LENS</span>
              <span className="GalleryMain__eyebrowLine" />
            </div>

            <h1 className="GalleryMain__title">
              Explore Our <span>Wildlife Gallery</span>
            </h1>

            <p className="GalleryMain__description">
              Discover the enchanting beauty of mangrove forests, vibrant bird colonies, estuarine crocodiles, and serene river trails.
            </p>

            <div className="GalleryMain__headingAccent">
              <span />
              <span />
              <span />
            </div>
          </header>

          {/* Filter Toolbar */}
          <div className="GalleryMain__toolbar">
            <div
              className="GalleryMain__filters"
              role="group"
              aria-label="Filter gallery by category"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`GalleryMain__filter ${
                    activeCategory === category ? "is-active" : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>

            <span className="GalleryMain__count">
              Showing <strong>{filteredImages.length}</strong> photographs
            </span>
          </div>

          {/* Gallery Cards Grid */}
          <div className="GalleryMain__grid">
            {currentImages.map((item, index) => (
              <article
                key={item.id}
                className="GalleryMain__card"
                style={{ "--GalleryMain-index": index }}
                onClick={() => setSelectedImage(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedImage(item);
                  }
                }}
                aria-label={`Open photo of ${item.title}`}
              >
                <div className="GalleryMain__imageWrap">
                  {!failedImages.includes(item.id) ? (
                    <img
                      className="GalleryMain__image"
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      onError={() =>
                        setFailedImages((previous) =>
                          previous.includes(item.id) ? previous : [...previous, item.id]
                        )
                      }
                    />
                  ) : (
                    <div className="GalleryMain__imageFallback">
                      <span>BHITARKANIKA</span>
                      <strong>{item.category}</strong>
                    </div>
                  )}

                  <span className="GalleryMain__imageNumber">
                    {String(item.id).padStart(2, "0")}
                  </span>

                  <span className="GalleryMain__imageCategory">
                    {item.category}
                  </span>

                  {/* Refined Luxury Hover Overlay */}
                  <div className="GalleryMain__imageHover">
                    <span className="GalleryMain__zoomIcon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <polyline points="15 3 21 3 21 9" />
                        <polyline points="9 21 3 21 3 15" />
                        <line x1="21" y1="3" x2="14" y2="10" />
                        <line x1="3" y1="21" x2="10" y2="14" />
                      </svg>
                    </span>
                    <span>View Photograph</span>
                  </div>
                </div>

                <div className="GalleryMain__cardContent">
                  <div className="GalleryMain__cardText">
                    <span className="GalleryMain__location">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {item.location}
                    </span>
                    <h2 className="GalleryMain__cardTitle">{item.title}</h2>
                  </div>

                  <span className="GalleryMain__cardArrow" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              className="GalleryMain__pagination"
              aria-label="Gallery pagination"
            >
              <button
                type="button"
                className="GalleryMain__pageArrow"
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
              >
                ← Previous
              </button>

              <div className="GalleryMain__pageNumbers">
                {pageNumbers.map((page) => (
                  <button
                    type="button"
                    key={page}
                    className={`GalleryMain__pageNumber ${
                      currentPage === page ? "is-active" : ""
                    }`}
                    onClick={() => changePage(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="GalleryMain__pageArrow"
                disabled={currentPage === totalPages}
                onClick={() => changePage(currentPage + 1)}
              >
                Next →
              </button>
            </nav>
          )}

          <p className="GalleryMain__footerNote">
            <span aria-hidden="true">✦</span>
            Preserving nature through every captured frame.
          </p>
        </div>
      </section>

      {lightbox}
    </>
  );
};

export default GalleryMain;
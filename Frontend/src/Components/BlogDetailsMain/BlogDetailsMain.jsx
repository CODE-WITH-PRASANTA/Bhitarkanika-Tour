import React, { useMemo, useState } from "react";
import {
  Search,
  CalendarDays,
  MessageCircle,
  ChevronRight,
  Clock3,
  Share2,
  ArrowUpRight,
  ArrowRight,
  Quote,
  Tag,
  Leaf,
  Send,
  CheckCircle2,
  X,
} from "lucide-react";
import "./BlogDetailsMain.css";

const images = {
  river:
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=85",
  crocodile:
    "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=700&q=85",
  bird:
    "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=700&q=85",
  deer:
    "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=700&q=85",
  forest:
    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85",
  sunset:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=85",
  boat:
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=700&q=85",
  wetlands:
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=700&q=85",
};

const categories = [
  { name: "Travel Guide", count: 12 },
  { name: "Wildlife", count: 8 },
  { name: "Boat Safari", count: 6 },
  { name: "Local Culture", count: 5 },
  { name: "Tips & Hacks", count: 4 },
  { name: "News & Updates", count: 3 },
];

const recentPosts = [
  {
    title: "Top 5 Things to Do in Bhitarkanika",
    date: "Oct 15, 2026",
    image: images.sunset,
    category: "Travel Guide",
  },
  {
    title: "Migratory Birds of Bhitarkanika",
    date: "Oct 10, 2026",
    image: images.bird,
    category: "Wildlife",
  },
  {
    title: "Best Time for Boat Safari in Bhitarkanika",
    date: "Oct 05, 2026",
    image: images.boat,
    category: "Boat Safari",
  },
  {
    title: "Exploring the Mangrove Forests",
    date: "Sep 28, 2026",
    image: images.forest,
    category: "Travel Guide",
  },
];

const relatedPosts = [
  {
    title: "Top 5 Things to Do in Bhitarkanika",
    date: "Oct 15, 2026",
    image: images.sunset,
    category: "Travel Guide",
  },
  {
    title: "Migratory Birds of Bhitarkanika",
    date: "Oct 10, 2026",
    image: images.wetlands,
    category: "Wildlife",
  },
  {
    title: "Best Time for Boat Safari in Bhitarkanika",
    date: "Oct 05, 2026",
    image: images.boat,
    category: "Boat Safari",
  },
];

const BlogDetailsMain = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Travel Guide");
  const [categoryFilter, setCategoryFilter] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  const [comments, setComments] = useState([
    {
      name: "Rakesh Patra",
      date: "Oct 12, 2026",
      message:
        "Amazing information! We spotted two huge crocodiles during our boat safari. It was a thrilling experience.",
      initials: "RP",
    },
    {
      name: "Sneha Das",
      date: "Oct 13, 2026",
      message:
        "Very well written. Bhitarkanika is truly a paradise for nature lovers.",
      initials: "SD",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const filteredRecentPosts = useMemo(
    () =>
      recentPosts.filter((post) => {
        const matchesSearch = post.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        const matchesCategory =
          !categoryFilter || post.category === activeCategory;

        return matchesSearch && matchesCategory;
      }),
    [searchTerm, activeCategory, categoryFilter]
  );

  const handleShare = async (platform) => {
    const pageUrl = window.location.href;
    const title =
      "Exploring Bhitarkanika: A Paradise for Nature Lovers";

    if (platform === "Copy link") {
      try {
        await navigator.clipboard.writeText(pageUrl);
        setShareMessage("Link copied successfully!");
      } catch {
        setShareMessage(`Copy this page URL: ${pageUrl}`);
      }
      return;
    }

    const shareUrls = {
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
      Twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(pageUrl)}`,
      LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
    };

    window.open(
      shareUrls[platform],
      "_blank",
      "noopener,noreferrer,width=650,height=500"
    );
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      return;
    }

    const newComment = {
      name: form.name.trim(),
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      message: form.message.trim(),
      initials: form.name
        .trim()
        .split(/\s+/)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    };

    setComments((previous) => [...previous, newComment]);

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  const scrollTo = (selector) => {
    document
      .querySelector(selector)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const galleryItems = [
    {
      src: images.crocodile,
      alt: "Wildlife in a natural habitat",
      label: "Wildlife",
    },
    {
      src: images.bird,
      alt: "Bird in a natural setting",
      label: "Bird watching",
    },
    {
      src: images.deer,
      alt: "Deer in a green forest",
      label: "Forest life",
    },
  ];

  return (
    <main className="BlogDetailsMain">
      <div className="BlogDetailsMain__container">
        <header className="BlogDetailsMain__intro">
          <div className="BlogDetailsMain__intro-left">
            <span className="BlogDetailsMain__eyebrow">
              <Leaf size={15} />
              EXPLORE THE WILD
            </span>

            <h1 className="BlogDetailsMain__page-heading">
              Stories from the <span>wild side.</span>
            </h1>

            <p>
              Discover wildlife, peaceful waterways and unforgettable
              experiences in the heart of Bhitarkanika.
            </p>
          </div>

          <div className="BlogDetailsMain__intro-badge">
            <span className="BlogDetailsMain__badge-icon">
              <Leaf size={24} />
            </span>

            <span>
              <strong>Nature journal</strong>
              <small>Stories worth exploring</small>
            </span>
          </div>
        </header>

        <div className="BlogDetailsMain__toolbar">
          <div className="BlogDetailsMain__toolbar-info">
            <span>
              Showing <strong>6 wildlife stories</strong>
            </span>
            <span className="BlogDetailsMain__toolbar-dot" />
            <span>
              Tales from India's second-largest mangrove sanctuary
            </span>
          </div>

          <div className="BlogDetailsMain__toolbar-line" />
        </div>

        <div className="BlogDetailsMain__layout">
          <article className="BlogDetailsMain__article">
            <div className="BlogDetailsMain__hero-image-wrap">
              <img
                className="BlogDetailsMain__hero-image"
                src={images.river}
                alt="Peaceful river surrounded by lush greenery"
              />

              <div className="BlogDetailsMain__image-caption">
                <span>
                  <Leaf size={14} />
                  NATURE &amp; DISCOVERY
                </span>
                <span>6 min read</span>
              </div>
            </div>

            <div className="BlogDetailsMain__meta">
              <span>
                <CalendarDays size={15} />
                October 20, 2026
              </span>
              <i />

              <span>
                <MessageCircle size={15} />
                {comments.length + 3} Comments
              </span>
              <i />

              <span>
                <Clock3 size={15} />
                6 min read
              </span>
            </div>

            <p className="BlogDetailsMain__lead">
              Bhitarkanika National Park, located in the Kendrapara
              district of Odisha, is one of India's most fascinating
              mangrove ecosystems. Known for its rich biodiversity,
              serene waterways, and majestic saltwater crocodiles,
              Bhitarkanika is a haven for wildlife enthusiasts,
              photographers, and nature lovers from around the world.
            </p>

            <section className="BlogDetailsMain__content-section">
              <h2>The Beauty of Bhitarkanika</h2>
              <p>
                Spread over a vast area of dense mangrove forests and
                winding creeks, Bhitarkanika offers a mesmerizing blend
                of natural beauty and adventure. The tranquil backwaters,
                lush greenery, and diverse wildlife create an unforgettable
                experience for every visitor.
              </p>
            </section>

            <section className="BlogDetailsMain__content-section">
              <h2>Wildlife You Can Spot</h2>
              <p>
                Bhitarkanika is renowned for its saltwater crocodiles.
                Apart from crocodiles, you can also spot spotted deer,
                wild boars, water monitors, kingfishers, herons, and a
                variety of migratory birds. The region's unique ecosystem
                supports a rich diversity of flora and fauna.
              </p>

              <div className="BlogDetailsMain__gallery">
                {galleryItems.map((item) => (
                  <button
                    className="BlogDetailsMain__gallery-item"
                    key={item.label}
                    type="button"
                    onClick={() =>
                      window.open(
                        item.src,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    aria-label={`View ${item.label} image`}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                    />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="BlogDetailsMain__content-section">
              <h2>Best Time to Visit</h2>
              <p>
                The ideal time to explore Bhitarkanika is generally from
                November to February, when the weather is pleasant and
                suitable for boat safaris. During this time, you can enjoy
                comfortable rides, better wildlife sightings, and the
                true beauty of the mangrove forests. Check local park
                rules and current access arrangements before your visit.
              </p>
            </section>

            <blockquote className="BlogDetailsMain__quote">
              <Quote size={29} />
              <p>
                Bhitarkanika is not just a destination; it's an experience
                — a perfect harmony of wildlife, nature, and tranquility.
              </p>
            </blockquote>

            <div className="BlogDetailsMain__tags-share">
              <div className="BlogDetailsMain__tags">
                <strong>
                  <Tag size={15} />
                  Tags:
                </strong>

                {[
                  "Bhitarkanika",
                  "Nature",
                  "Wildlife",
                  "Travel Guide",
                  "Boat Safari",
                ].map((tag) => (
                  <button
                    className="BlogDetailsMain__tag"
                    type="button"
                    key={tag}
                    onClick={() => {
                      setSearchTerm(tag === "Nature" ? "" : tag);
                      setCategoryFilter(false);
                      scrollTo(".BlogDetailsMain__sidebar");
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="BlogDetailsMain__share">
                <strong>Share:</strong>

                <button
                  type="button"
                  className="BlogDetailsMain__share-button BlogDetailsMain__share-button--facebook"
                  aria-label="Share on Facebook"
                  onClick={() => handleShare("Facebook")}
                >
                  f
                </button>

                <button
                  type="button"
                  className="BlogDetailsMain__share-button BlogDetailsMain__share-button--twitter"
                  aria-label="Share on Twitter"
                  onClick={() => handleShare("Twitter")}
                >
                  𝕏
                </button>

                <button
                  type="button"
                  className="BlogDetailsMain__share-button BlogDetailsMain__share-button--linkedin"
                  aria-label="Share on LinkedIn"
                  onClick={() => handleShare("LinkedIn")}
                >
                  in
                </button>

                <button
                  type="button"
                  className="BlogDetailsMain__share-button BlogDetailsMain__share-button--copy"
                  aria-label="Copy article link"
                  onClick={() => handleShare("Copy link")}
                >
                  <Share2 size={15} />
                </button>
              </div>
            </div>

            {shareMessage && (
              <div
                className="BlogDetailsMain__share-feedback"
                role="status"
              >
                <CheckCircle2 size={16} />
                <span>{shareMessage}</span>
                <button
                  type="button"
                  aria-label="Dismiss message"
                  onClick={() => setShareMessage("")}
                >
                  <X size={15} />
                </button>
              </div>
            )}

            <div className="BlogDetailsMain__author">
              <div className="BlogDetailsMain__author-avatar">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=80"
                  alt="Blog author"
                  loading="lazy"
                />
              </div>

              <div className="BlogDetailsMain__author-info">
                <span className="BlogDetailsMain__author-label">
                  WRITTEN BY
                </span>
                <h3>About the Author</h3>
                <strong>Admin</strong>
                <p>
                  We are passionate about showcasing the natural beauty
                  of Bhitarkanika. Our mission is to provide the best
                  travel experiences and help you explore the rich
                  wildlife and scenic landscapes of Odisha.
                </p>
              </div>

              <div className="BlogDetailsMain__author-mark">
                <Leaf size={25} />
              </div>
            </div>

            <section
              className="BlogDetailsMain__comments"
              id="blog-comments"
            >
              <div className="BlogDetailsMain__section-heading">
                <div>
                  <span className="BlogDetailsMain__section-kicker">
                    JOIN THE CONVERSATION
                  </span>
                  <h2>
                    Reader comments <span>({comments.length})</span>
                  </h2>
                </div>
              </div>

              <div className="BlogDetailsMain__comment-list">
                {comments.map((comment, index) => (
                  <div
                    className="BlogDetailsMain__comment"
                    key={`${comment.name}-${index}`}
                  >
                    <div className="BlogDetailsMain__comment-avatar">
                      {comment.initials}
                    </div>

                    <div className="BlogDetailsMain__comment-body">
                      <div className="BlogDetailsMain__comment-top">
                        <strong>{comment.name}</strong>
                        <span>{comment.date}</span>
                      </div>
                      <p>{comment.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form
                className="BlogDetailsMain__comment-form"
                onSubmit={handleCommentSubmit}
              >
                <h3>Leave a comment</h3>
                <p>
                  Have a story to share? We'd love to hear from you.
                </p>

                <div className="BlogDetailsMain__form-row">
                  <input
                    type="text"
                    placeholder="Your name"
                    aria-label="Your name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    required
                  />

                  <input
                    type="email"
                    placeholder="Your email"
                    aria-label="Your email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </div>

                <textarea
                  placeholder="Write your comment..."
                  aria-label="Write your comment"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  rows={4}
                  required
                />

                <button
                  className="BlogDetailsMain__submit"
                  type="submit"
                >
                  Post Comment <Send size={15} />
                </button>

                <small className="BlogDetailsMain__form-note">
                  <CheckCircle2 size={13} />
                  Your comment will appear on this page.
                </small>
              </form>
            </section>

            <section className="BlogDetailsMain__related">
              <div className="BlogDetailsMain__section-heading">
                <div>
                  <span className="BlogDetailsMain__section-kicker">
                    KEEP EXPLORING
                  </span>
                  <h2>Related stories</h2>
                </div>

                <button
                  type="button"
                  className="BlogDetailsMain__view-all"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Back to top <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="BlogDetailsMain__related-grid">
                {relatedPosts.map((post) => (
                  <button
                    className="BlogDetailsMain__related-card"
                    key={post.title}
                    type="button"
                    onClick={() => {
                      setSearchTerm(post.title);
                      setCategoryFilter(false);
                      scrollTo(".BlogDetailsMain__sidebar");
                    }}
                  >
                    <div className="BlogDetailsMain__related-image">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                      />
                      <span>{post.category}</span>
                      <div className="BlogDetailsMain__related-arrow">
                        <ArrowRight size={17} />
                      </div>
                    </div>

                    <div className="BlogDetailsMain__related-content">
                      <small>
                        <CalendarDays size={12} />
                        {post.date}
                      </small>
                      <h3>{post.title}</h3>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </article>

          <aside className="BlogDetailsMain__sidebar">
            <section className="BlogDetailsMain__side-card BlogDetailsMain__search-card">
              <div className="BlogDetailsMain__side-title">
                <Search size={19} />
                <h2>Search Blog</h2>
              </div>

              <form
                className="BlogDetailsMain__search-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setCategoryFilter(false);
                }}
              >
                <input
                  type="search"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCategoryFilter(false);
                  }}
                  aria-label="Search blog articles"
                />

                {searchTerm && (
                  <button
                    type="button"
                    className="BlogDetailsMain__clear-search"
                    aria-label="Clear search"
                    onClick={() => setSearchTerm("")}
                  >
                    <X size={15} />
                  </button>
                )}

                <button type="submit" aria-label="Search">
                  <Search size={17} />
                </button>
              </form>
            </section>

            <section className="BlogDetailsMain__side-card BlogDetailsMain__categories-card">
              <div className="BlogDetailsMain__side-title">
                <Leaf size={19} />
                <h2>Categories</h2>
              </div>

              <div className="BlogDetailsMain__category-list">
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category.name}
                    className={`BlogDetailsMain__category ${
                      activeCategory === category.name && categoryFilter
                        ? "BlogDetailsMain__category--active"
                        : ""
                    }`}
                    onClick={() => {
                      setActiveCategory(category.name);
                      setCategoryFilter(true);
                      setSearchTerm("");
                    }}
                  >
                    <span>{category.name}</span>

                    <span className="BlogDetailsMain__category-right">
                      <small>{category.count}</small>
                      <ChevronRight size={15} />
                    </span>
                  </button>
                ))}

                {categoryFilter && (
                  <button
                    type="button"
                    className="BlogDetailsMain__clear-filter"
                    onClick={() => setCategoryFilter(false)}
                  >
                    Clear category filter
                  </button>
                )}
              </div>
            </section>

            <section className="BlogDetailsMain__side-card BlogDetailsMain__recent-card">
              <div className="BlogDetailsMain__side-title">
                <Clock3 size={19} />
                <h2>Recent Posts</h2>
              </div>

              <div className="BlogDetailsMain__recent-list">
                {filteredRecentPosts.length ? (
                  filteredRecentPosts.map((post) => (
                    <button
                      className="BlogDetailsMain__recent-item"
                      key={post.title}
                      type="button"
                      onClick={() =>
                        setShareMessage(`Selected story: ${post.title}`)
                      }
                    >
                      <img src={post.image} alt="" loading="lazy" />

                      <span className="BlogDetailsMain__recent-text">
                        <strong>{post.title}</strong>
                        <small>{post.date}</small>
                      </span>

                      <ArrowUpRight
                        className="BlogDetailsMain__recent-arrow"
                        size={15}
                      />
                    </button>
                  ))
                ) : (
                  <p className="BlogDetailsMain__no-results">
                    No matching stories found. Try another search.
                  </p>
                )}
              </div>
            </section>

            <section className="BlogDetailsMain__booking-card">
              <img
                src={images.forest}
                alt="Lush green forest"
                loading="lazy"
              />
              <div className="BlogDetailsMain__booking-overlay" />

              <div className="BlogDetailsMain__booking-content">
                <span className="BlogDetailsMain__booking-icon">
                  <Leaf size={27} />
                </span>

                <span className="BlogDetailsMain__booking-kicker">
                  YOUR NEXT ADVENTURE
                </span>

                <h2>Plan Your Bhitarkanika Trip Today</h2>

                <p>
                  Book your boat safari and experience the beauty of
                  nature up close.
                </p>

                <a
                  href="/contact"
                  className="BlogDetailsMain__booking-button"
                >
                  Book Now <ArrowRight size={16} />
                </a>
              </div>

              <div className="BlogDetailsMain__booking-decoration" />
            </section>

            <section className="BlogDetailsMain__mini-related">
              <div className="BlogDetailsMain__side-title">
                <Leaf size={18} />
                <h2>Explore More</h2>
              </div>

              <p>
                Discover more stories, wildlife guides, and travel
                inspiration from Odisha.
              </p>

              <button
                type="button"
                onClick={() => scrollTo(".BlogDetailsMain__related")}
              >
                Explore stories <ArrowRight size={15} />
              </button>
            </section>
          </aside>
        </div>
      </div>

      <button
        className="BlogDetailsMain__back-top"
        type="button"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
        aria-label="Back to top"
      >
        <ArrowUpRight size={20} />
      </button>
    </main>
  );
};

export default BlogDetailsMain;
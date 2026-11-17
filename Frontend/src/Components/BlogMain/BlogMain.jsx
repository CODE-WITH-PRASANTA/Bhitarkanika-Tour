import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./BlogMain.css";
import { API_ENDPOINTS } from "../../api/api";

const API_PUBLISHED_BLOGS_URL = API_ENDPOINTS.BLOGS_PUBLISHED;
const API_CATEGORIES_URL = API_ENDPOINTS.BLOG_CATEGORIES_ACTIVE;
const PETALS = [0, 1, 2, 3, 4, 5, 6, 7];

const stripHtml = (html = "") =>
  html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const formatDate = (dateValue, createdAt) => {
  const source = dateValue ? `${dateValue}T00:00:00` : createdAt;
  if (!source) return "";
  const parsed = new Date(source);
  if (Number.isNaN(parsed.getTime())) return dateValue || "";
  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const BlogMain = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");
  const [failedImages, setFailedImages] = useState([]);

  useEffect(() => {
    const fetchPublishedBlogsAndCategories = async () => {
      try {
        setLoading(true);
        const [blogsRes, categoriesRes] = await Promise.all([
          fetch(API_PUBLISHED_BLOGS_URL),
          fetch(API_CATEGORIES_URL),
        ]);
        const [blogsJson, categoriesJson] = await Promise.all([
          blogsRes.json(),
          categoriesRes.json(),
        ]);

        if (blogsRes.ok && blogsJson.success) {
          const mapped = (blogsJson.data || [])
            .filter((blog) => blog.published === true)
            .map((blog) => ({
              id: blog._id || blog.id,
              category: blog.category || "",
              date: formatDate(blog.date, blog.createdAt),
              comments: blog.comments ?? 0,
              title: blog.title,
              excerpt: stripHtml(blog.description),
              place: blog.location || "",
              season: blog.idealSeason || "",
              image: blog.mainImage,
              imageAlt: blog.title,
              link: `/blog/${blog.slug || blog._id || blog.id}`,
            }));
          setPosts(mapped);
        }

        if (categoriesRes.ok && categoriesJson.success) {
          setCategories(
            (categoriesJson.data || []).map((cat) => cat.name).filter(Boolean)
          );
        }
      } catch (error) {
        console.error("Failed to fetch published blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishedBlogsAndCategories();
  }, []);

  const filters = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set([
          ...categories,
          ...posts.map((post) => post.category).filter(Boolean),
        ])
      ),
    ],
    [categories, posts]
  );

  const visiblePosts = useMemo(
    () =>
      active === "All"
        ? posts
        : posts.filter((post) => post.category === active),
    [active, posts]
  );

  const handleImageError = (id) => {
    setFailedImages((previous) =>
      previous.includes(id) ? previous : [...previous, id]
    );
  };

  return (
    <section className="BlogMain" aria-labelledby="BlogMain-heading">
      <div className="BlogMain__container">
        
        {/* Header */}
        <header className="BlogMain__header">
          <div className="BlogMain__headerText">
            <span className="BlogMain__eyebrow">
              <span className="BlogMain__eyebrowLine" />
              WILDLIFE JOURNAL
              <span className="BlogMain__eyebrowLine" />
            </span>

            <h2 className="BlogMain__heading" id="BlogMain-heading">
              Field Notes from <span>Bhitarkanika</span>
            </h2>

            <p className="BlogMain__subheading">
              Chronicles of estuarine crocodiles, sea turtles, rare kingfishers, and the timeless mangrove ecosystems of coastal Odisha.
            </p>
          </div>

          {/* Filter Tabs */}
          <div
            className="BlogMain__filters"
            role="group"
            aria-label="Filter wildlife stories"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`BlogMain__filter ${
                  active === filter ? "BlogMain__filter--active" : ""
                }`}
                aria-pressed={active === filter}
                onClick={() => setActive(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </header>

        {/* Results Bar */}
        <div className="BlogMain__resultLine">
          <span>
            Showing <strong>{visiblePosts.length}</strong> wildlife stories
          </span>
          <span className="BlogMain__resultDot" />
          <span>Tales from India's second-largest mangrove sanctuary</span>
        </div>

        {/* Story Grid */}
        {loading ? (
          <div className="BlogMain__empty">
            <p>Loading published stories...</p>
          </div>
        ) : (
          <div className="BlogMain__grid">
            {visiblePosts.map((post, index) => (
              <article className="BlogMain__card" key={post.id}>
                
                {/* Media Wrap */}
                <div className="BlogMain__media">
                  {!failedImages.includes(post.id) ? (
                    <img
                      className="BlogMain__image"
                      src={post.image}
                      alt={post.imageAlt}
                      loading="lazy"
                      decoding="async"
                      onError={() => handleImageError(post.id)}
                    />
                  ) : (
                    <div
                      className="BlogMain__imageFallback"
                      role="img"
                      aria-label={`${post.category} image unavailable`}
                    >
                      <span>{post.category}</span>
                      <small>Bhitarkanika Sanctuary</small>
                    </div>
                  )}

                  <div className="BlogMain__imageShade" />
                  <span className="BlogMain__tag">{post.category}</span>
                  <span className="BlogMain__imageNumber">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

              {/* Card Body */}
              <div className="BlogMain__body">
                {/* Micro Botanical Bud Emblem */}
                <span className="BlogMain__bud" aria-hidden="true">
                  {PETALS.map((index) => (
                    <span
                      className="BlogMain__petal"
                      style={{ "--i": index }}
                      key={index}
                    />
                  ))}
                </span>

                <div className="BlogMain__meta">
                  <span className="BlogMain__date">{post.date}</span>
                  <span className="BlogMain__dot" aria-hidden="true" />
                  <span className="BlogMain__comments">
                    {post.comments} Comments
                  </span>
                </div>

                <h3 className="BlogMain__title">
                  <Link className="BlogMain__titleLink" to={post.link}>
                    {post.title}
                  </Link>
                </h3>

                <span className="BlogMain__more">
                  Explore story
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>

                {/* Animated Botanical Bloom Layer */}
                <div className="BlogMain__bloom">
                  <span className="BlogMain__bloomFlower" aria-hidden="true">
                    {PETALS.map((index) => (
                      <span
                        className="BlogMain__bloomPetal"
                        style={{ "--i": index }}
                        key={index}
                      />
                    ))}
                  </span>

                  <p className="BlogMain__excerpt">{post.excerpt}</p>

                  <dl className="BlogMain__facts">
                    <div className="BlogMain__fact">
                      <dt className="BlogMain__factLabel">Location</dt>
                      <dd className="BlogMain__factValue">{post.place}</dd>
                    </div>

                    <div className="BlogMain__fact">
                      <dt className="BlogMain__factLabel">Ideal Season</dt>
                      <dd className="BlogMain__factValue">{post.season}</dd>
                    </div>
                  </dl>

                  <Link className="BlogMain__button" to={post.link}>
                    <span>Read Full Story</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
          </div>
        )}

        {!loading && visiblePosts.length === 0 && (
          <div className="BlogMain__empty">
            <p>No journal entries found in this category.</p>
          </div>
        )}

        {/* Section Footer */}
        <footer className="BlogMain__footer">
          <span className="BlogMain__footerLine" />
          <p>Every creek has a story. Every creature has a sanctuary.</p>
          <span className="BlogMain__footerLine" />
        </footer>

      </div>
    </section>
  );
};

export default BlogMain;
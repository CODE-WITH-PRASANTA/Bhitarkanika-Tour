import React, { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
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

const API_BASE = import.meta.env.VITE_API_BASE;
const API_BLOGS_URL = `${API_BASE}/blogs`;
const API_CATEGORIES_URL = `${API_BASE}/blog-categories?active=true`;
const API_COMMENTS_URL = `${API_BASE}/blog-comments`;

const formatBlogDate = (dateValue, createdAt) => {
  const source = dateValue ? `${dateValue}T00:00:00` : createdAt;
  if (!source) return "";
  const parsed = new Date(source);
  if (Number.isNaN(parsed.getTime())) return dateValue || "";
  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

const BlogDetailsMain = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const blogId = searchParams.get("id");

  const [blog, setBlog] = useState(null);
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const [dbCategories, setDbCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const [pubRes, catRes] = await Promise.all([
          fetch(`${API_BLOGS_URL}/published`),
          fetch(API_CATEGORIES_URL),
        ]);
        const [pubJson, catJson] = await Promise.all([
          pubRes.json(),
          catRes.json(),
        ]);

        const pubList = pubRes.ok && pubJson.success ? pubJson.data || [] : [];
        setPublishedBlogs(pubList);

        if (catRes.ok && catJson.success) {
          setDbCategories(
            (catJson.data || []).map((cat) => cat.name).filter(Boolean)
          );
        }

        const lookupUrl = slug
          ? `${API_BLOGS_URL}/slug/${encodeURIComponent(slug)}`
          : blogId
            ? `${API_BLOGS_URL}/${blogId}`
            : null;

        if (lookupUrl) {
          const singleRes = await fetch(lookupUrl);
          const singleJson = await singleRes.json();
          if (singleRes.ok && singleJson.success && singleJson.data?.published) {
            const fetched = singleJson.data;
            setBlog(fetched);
            if (fetched.slug && slug !== fetched.slug) {
              navigate(`/blog/${fetched.slug}`, { replace: true });
            }
          } else {
            const fallback = pubList[0] || null;
            setBlog(fallback);
            if (fallback?.slug && slug !== fallback.slug) {
              navigate(`/blog/${fallback.slug}`, { replace: true });
            }
          }
        } else {
          const fallback = pubList[0] || null;
          setBlog(fallback);
          if (fallback?.slug && slug !== fallback.slug) {
            navigate(`/blog/${fallback.slug}`, { replace: true });
          }
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("Failed to fetch blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [slug, blogId]);

  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentNotice, setCommentNotice] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchComments = async () => {
      if (!blog?._id) {
        setComments([]);
        return;
      }

      try {
        setCommentsLoading(true);
        const res = await fetch(`${API_COMMENTS_URL}/blog/${blog._id}`);
        const json = await res.json();
        if (res.ok && json.success) {
          setComments(json.data || []);
        } else {
          setComments([]);
        }
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        setComments([]);
      } finally {
        setCommentsLoading(false);
      }
    };

    fetchComments();
    setCommentNotice({ type: "", text: "" });
  }, [blog?._id]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleShare = async (platform) => {
    const pageUrl = window.location.href;
    const title = blog?.title || "Bhitarkanika Story";

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

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      setCommentNotice({
        type: "error",
        text: "Please enter your name, email, and comment message.",
      });
      return;
    }

    if (!blog?._id) {
      setCommentNotice({
        type: "error",
        text: "Blog post not loaded. Please try again.",
      });
      return;
    }

    try {
      setCommentSubmitting(true);
      setCommentNotice({ type: "", text: "" });

      const response = await fetch(API_COMMENTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogId: blog._id,
          blogTitle: blog.title,
          blogSlug: blog.slug || "",
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      const result = await response.json();

      if (response.status === 409) {
        setCommentNotice({
          type: "warning",
          text: result.message || "You have already submitted this comment on this story.",
        });
        return;
      }

      if (!response.ok || !result.success) {
        setCommentNotice({
          type: "error",
          text: result.message || "Failed to post comment. Please try again.",
        });
        return;
      }

      setForm({ name: "", email: "", message: "" });
      setCommentNotice({
        type: "success",
        text: "Thank you! Your comment has been submitted and is pending approval by the admin.",
      });
    } catch (error) {
      console.error("Comment submission error:", error);
      setCommentNotice({
        type: "error",
        text: "Network error occurred while posting your comment.",
      });
    } finally {
      setCommentSubmitting(false);
    }
  };

  const scrollTo = (selector) => {
    document
      .querySelector(selector)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const galleryItems = useMemo(() => {
    const imgs = Array.isArray(blog?.contentImages) ? blog.contentImages : [];
    return imgs.map((src, idx) => ({
      src,
      alt: `${blog?.title || "Blog"} image ${idx + 1}`,
      label: `Photo ${idx + 1}`,
    }));
  }, [blog]);

  const dynamicCategories = useMemo(() => {
    const allNames = Array.from(
      new Set([
        ...dbCategories,
        ...publishedBlogs.map((item) => item.category).filter(Boolean),
      ])
    );
    return allNames.map((name) => ({
      name,
      count: publishedBlogs.filter((item) => item.category === name).length,
    }));
  }, [dbCategories, publishedBlogs]);

  const dynamicRecentPosts = useMemo(
    () =>
      publishedBlogs.slice(0, 5).map((item) => ({
        id: item._id,
        slug: item.slug || item._id,
        title: item.title,
        date: formatBlogDate(item.date, item.createdAt),
        image: item.mainImage,
        category: item.category,
      })),
    [publishedBlogs]
  );

  const dynamicRelatedPosts = useMemo(
    () =>
      publishedBlogs
        .filter((item) => item._id !== blog?._id)
        .slice(0, 3)
        .map((item) => ({
          id: item._id,
          slug: item.slug || item._id,
          title: item.title,
          date: formatBlogDate(item.date, item.createdAt),
          image: item.mainImage,
          category: item.category,
        })),
    [publishedBlogs, blog]
  );

  const filteredDynamicRecent = useMemo(
    () =>
      dynamicRecentPosts.filter((post) => {
        const matchesSearch = post.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          !categoryFilter ||
          activeCategory === "All" ||
          post.category === activeCategory;
        return matchesSearch && matchesCategory;
      }),
    [dynamicRecentPosts, searchTerm, activeCategory, categoryFilter]
  );

  if (loading) {
    return (
      <main className="BlogDetailsMain">
        <div className="BlogDetailsMain__container" style={{ padding: "80px 20px", textAlign: "center" }}>
          <p>Loading story...</p>
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="BlogDetailsMain">
        <div className="BlogDetailsMain__container" style={{ padding: "80px 20px", textAlign: "center" }}>
          <h2>No published story found</h2>
          <p>Publish a blog from the admin panel to view it here.</p>
          <Link to="/blog" className="BlogDetailsMain__tag" style={{ display: "inline-block", marginTop: "14px" }}>
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

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
              Showing <strong>{publishedBlogs.length} published {publishedBlogs.length === 1 ? "story" : "stories"}</strong>
            </span>
            <span className="BlogDetailsMain__toolbar-dot" />
            <span>
              {blog.location || "Bhitarkanika Sanctuary"}
            </span>
          </div>

          <div className="BlogDetailsMain__toolbar-line" />
        </div>

        <div className="BlogDetailsMain__layout">
          <article className="BlogDetailsMain__article">
            <div className="BlogDetailsMain__hero-image-wrap">
              <img
                className="BlogDetailsMain__hero-image"
                src={blog.mainImage}
                alt={blog.title}
              />

              <div className="BlogDetailsMain__image-caption">
                <span>
                  <Leaf size={14} />
                  {blog.category}
                </span>
                <span>{blog.idealSeason}</span>
              </div>
            </div>

            <div className="BlogDetailsMain__meta">
              <span>
                <CalendarDays size={15} />
                {formatBlogDate(blog.date, blog.createdAt)}
              </span>
              <i />

              <span>
                <MessageCircle size={15} />
                {comments.length} Comments
              </span>
              <i />

              <span>
                <Clock3 size={15} />
                {blog.idealSeason || "All Year"}
              </span>
            </div>

            <h2 style={{ fontSize: "2rem", margin: "12px 0 18px", color: "#0f172a" }}>
              {blog.title}
            </h2>

            <div
              className="BlogDetailsMain__content-section"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />

            {galleryItems.length > 0 && (
              <section className="BlogDetailsMain__content-section">
                <div className="BlogDetailsMain__gallery">
                  {galleryItems.map((item) => (
                    <button
                      className="BlogDetailsMain__gallery-item"
                      key={item.src}
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
            )}

            {blog.quote && (
              <blockquote className="BlogDetailsMain__quote">
                <Quote size={29} />
                <p>{blog.quote}</p>
              </blockquote>
            )}

            <div className="BlogDetailsMain__tags-share">
              <div className="BlogDetailsMain__tags">
                <strong>
                  <Tag size={15} />
                  Tags:
                </strong>

                {(Array.isArray(blog.tags) ? blog.tags : []).map((tag) => (
                  <button
                    className="BlogDetailsMain__tag"
                    type="button"
                    key={tag}
                    onClick={() => {
                      setSearchTerm(tag);
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
                {commentsLoading ? (
                  <p style={{ color: "#64748b", padding: "12px 0" }}>
                    Loading comments...
                  </p>
                ) : comments.length === 0 ? (
                  <p style={{ color: "#64748b", padding: "12px 0" }}>
                    No comments yet. Be the first to share your thoughts!
                  </p>
                ) : (
                  comments.map((comment, index) => (
                    <div
                      className="BlogDetailsMain__comment"
                      key={comment._id || `${comment.name}-${index}`}
                    >
                      <div className="BlogDetailsMain__comment-avatar">
                        {comment.initials ||
                          (comment.name || "U")
                            .split(/\s+/)
                            .map((w) => w[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                      </div>

                      <div className="BlogDetailsMain__comment-body">
                        <div className="BlogDetailsMain__comment-top">
                          <strong>{comment.name}</strong>
                          <span>{comment.date}</span>
                        </div>
                        <p>{comment.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <form
                className="BlogDetailsMain__comment-form"
                onSubmit={handleCommentSubmit}
              >
                <h3>Leave a comment</h3>
                <p>
                  Have a story to share? We'd love to hear from you.
                </p>

                {commentNotice.text && (
                  <div
                    role="alert"
                    style={{
                      padding: "10px 14px",
                      borderRadius: "8px",
                      marginBottom: "14px",
                      fontSize: "0.92rem",
                      fontWeight: 500,
                      backgroundColor:
                        commentNotice.type === "success"
                          ? "#ecfdf5"
                          : commentNotice.type === "warning"
                          ? "#fffbeb"
                          : "#fef2f2",
                      color:
                        commentNotice.type === "success"
                          ? "#065f46"
                          : commentNotice.type === "warning"
                          ? "#92400e"
                          : "#991b1b",
                      border: `1px solid ${
                        commentNotice.type === "success"
                          ? "#a7f3d0"
                          : commentNotice.type === "warning"
                          ? "#fde68a"
                          : "#fecaca"
                      }`,
                    }}
                  >
                    {commentNotice.text}
                  </div>
                )}

                <div className="BlogDetailsMain__form-row">
                  <input
                    type="text"
                    placeholder="Your name"
                    aria-label="Your name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    disabled={commentSubmitting}
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
                    disabled={commentSubmitting}
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
                  disabled={commentSubmitting}
                  required
                />

                <button
                  className="BlogDetailsMain__submit"
                  type="submit"
                  disabled={commentSubmitting}
                >
                  {commentSubmitting ? (
                    "Posting..."
                  ) : (
                    <>
                      Post Comment <Send size={15} />
                    </>
                  )}
                </button>
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
                {dynamicRelatedPosts.map((post) => (
                  <button
                    className="BlogDetailsMain__related-card"
                    key={post.id}
                    type="button"
                    onClick={() => navigate(`/blog/${post.slug}`)}
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
                {dynamicCategories.map((category) => (
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
                {filteredDynamicRecent.length ? (
                  filteredDynamicRecent.map((post) => (
                    <button
                      className="BlogDetailsMain__recent-item"
                      key={post.id}
                      type="button"
                      onClick={() => navigate(`/blog/${post.slug}`)}
                    >
                      <img src={post.image} alt={post.title} loading="lazy" />

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
                src={blog.mainImage}
                alt={blog.title}
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
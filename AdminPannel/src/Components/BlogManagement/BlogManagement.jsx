
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  List,
  LayoutGrid,
  Plus,
  Search,
  MapPin,
  CalendarDays,
  Eye,
  Pencil,
  Trash2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Leaf,
  X,
  Snowflake,
  Sun,
  CloudRain,
  Compass,
} from "lucide-react";
import "./BlogManagement.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
const API_BLOGS_URL = `${API_BASE}/blogs`;
const API_CATEGORIES_URL = `${API_BASE}/blog-categories`;

const stripHtml = (html = "") =>
  html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const getCategoryIcon = (category) => {
  const icons = {
    Wildlife: "🐾",
    Birds: "🕊",
    Boating: "🛶",
    Nature: "🌿",
    Adventure: "⛰",
    "Travel Guide": "🧭",
  };

  return icons[category] || "🌿";
};

const BlogManagement = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [previewBlog, setPreviewBlog] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, categoriesRes] = await Promise.all([
          fetch(API_BLOGS_URL),
          fetch(API_CATEGORIES_URL),
        ]);
        const [blogsJson, categoriesJson] = await Promise.all([
          blogsRes.json(),
          categoriesRes.json(),
        ]);

        if (blogsRes.ok && blogsJson.success) {
          const mapped = (blogsJson.data || []).map((blog) => ({
            id: blog._id || blog.id,
            title: blog.title,
            category: blog.category || "",
            location: blog.location || "",
            season: blog.idealSeason || "",
            tags: Array.isArray(blog.tags) ? blog.tags : [],
            date:
              blog.date ||
              (blog.createdAt
                ? blog.createdAt.slice(0, 10)
                : new Date().toISOString().slice(0, 10)),
            description: stripHtml(blog.description),
            image: blog.mainImage || "",
            published: blog.published !== false,
          }));
          setBlogs(mapped);
        }

        if (categoriesRes.ok && categoriesJson.success) {
          setCategories(
            (categoriesJson.data || []).map((c) => c.name).filter(Boolean)
          );
        }
      } catch (error) {
        console.error("Failed to fetch blog management data:", error);
      }
    };

    fetchData();
  }, []);

  const BLOG_CATEGORIES = useMemo(
    () =>
      categories.length
        ? categories
        : Array.from(new Set(blogs.map((b) => b.category).filter(Boolean))),
    [categories, blogs]
  );

  const BLOG_LOCATIONS = useMemo(
    () => Array.from(new Set(blogs.map((b) => b.location).filter(Boolean))),
    [blogs]
  );

  const BLOG_SEASONS = useMemo(
    () => Array.from(new Set(blogs.map((b) => b.season).filter(Boolean))),
    [blogs]
  );

  const itemsPerPage = 5;

  const filteredBlogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesSearch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.category.toLowerCase().includes(query) ||
        blog.location.toLowerCase().includes(query) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesCategory =
        !categoryFilter || blog.category === categoryFilter;

      const matchesLocation =
        !locationFilter || blog.location === locationFilter;

      const matchesSeason = !seasonFilter || blog.season === seasonFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesSeason
      );
    });
  }, [blogs, search, categoryFilter, locationFilter, seasonFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBlogs.length / itemsPerPage)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedBlogs = filteredBlogs.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  const resetFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setLocationFilter("");
    setSeasonFilter("");
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog post?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BLOGS_URL}/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (res.ok && result.success) {
        setBlogs((previous) => previous.filter((blog) => blog.id !== id));
        setPreviewBlog((previous) => (previous?.id === id ? null : previous));
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleEdit = (id) => {
    if (id) {
      navigate(`/blog/posting?edit=${id}`);
    } else {
      navigate("/blog/posting");
    }
  };

  const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getSeasonIcon = (season) => {
    if (season === "Winter") return <Snowflake size={14} />;
    if (season === "Summer") return <Sun size={14} />;
    if (season === "Monsoon") return <CloudRain size={14} />;
    return <CalendarDays size={14} />;
  };

  const renderCategory = (category) => (
    <span
      className={`BlogManagement-category-badge BlogManagement-category-${category
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
    >
      <span>{getCategoryIcon(category)}</span>
      {category}
    </span>
  );

  const renderSeason = (season) => (
    <span
      className={`BlogManagement-season-badge BlogManagement-season-${season
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
    >
      {getSeasonIcon(season)}
      {season}
    </span>
  );

  const renderTags = (tags, maxVisible = 2) => (
    <div className="BlogManagement-tags">
      {tags.slice(0, maxVisible).map((tag) => (
        <span key={tag} className="BlogManagement-tag">
          #{tag}
        </span>
      ))}
      {tags.length > maxVisible && (
        <span className="BlogManagement-tag BlogManagement-tag-more">
          +{tags.length - maxVisible}
        </span>
      )}
    </div>
  );

  const renderActions = (blog) => (
    <div className="BlogManagement-actions">
      <button
        type="button"
        className="BlogManagement-action-btn BlogManagement-view-btn"
        title="View blog"
        aria-label={`View ${blog.title}`}
        onClick={() => setPreviewBlog(blog)}
      >
        <Eye size={17} />
      </button>

      <button
        type="button"
        className="BlogManagement-action-btn BlogManagement-edit-btn"
        title="Edit blog"
        aria-label={`Edit ${blog.title}`}
        onClick={() => handleEdit(blog.id)}
      >
        <Pencil size={17} />
      </button>

      <button
        type="button"
        className="BlogManagement-action-btn BlogManagement-delete-btn"
        title="Delete blog"
        aria-label={`Delete ${blog.title}`}
        onClick={() => handleDelete(blog.id)}
      >
        <Trash2 size={17} />
      </button>
    </div>
  );

  return (
    <div className="BlogManagement">
      {/* Nature-inspired page header */}
      <header className="BlogManagement-hero">
        <div className="BlogManagement-hero-decoration BlogManagement-hero-decoration-one" />
        <div className="BlogManagement-hero-decoration BlogManagement-hero-decoration-two" />

        <div className="BlogManagement-hero-content">
          <div className="BlogManagement-title-group">
            <div className="BlogManagement-title-icon">
              <BookOpen size={28} strokeWidth={2.3} />
            </div>

            <div>
              <h1>Blog Management</h1>
              <p>View, edit and manage all your blog posts.</p>
            </div>
          </div>

          <button
            type="button"
            className="BlogManagement-create-btn"
            onClick={() => handleEdit()}
          >
            <Plus size={19} />
            Create New Blog
          </button>
        </div>

        <div className="BlogManagement-hero-leaf">
          <Leaf size={38} />
        </div>
      </header>

      {/* List and grid view switch */}
      <div className="BlogManagement-view-toolbar">
        <div className="BlogManagement-view-tabs">
          <button
            type="button"
            className={`BlogManagement-view-tab ${
              viewMode === "list" ? "active" : ""
            }`}
            onClick={() => setViewMode("list")}
          >
            <List size={19} />
            List View
          </button>

          <button
            type="button"
            className={`BlogManagement-view-tab ${
              viewMode === "grid" ? "active" : ""
            }`}
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid size={18} />
            Grid View
          </button>
        </div>

        <div className="BlogManagement-total-count">
          Showing <strong>{filteredBlogs.length}</strong> blog
          {filteredBlogs.length === 1 ? "" : "s"}
        </div>
      </div>

      {/* Search and filters */}
      <section className="BlogManagement-content-panel">
        <div className="BlogManagement-filters">
          <div className="BlogManagement-search">
            <Search size={19} />
            <input
              type="search"
              value={search}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search by title, category, location or tags..."
              aria-label="Search blogs"
            />
            {search && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <select
            value={categoryFilter}
            onChange={(event) =>
              handleFilterChange(setCategoryFilter, event.target.value)
            }
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {BLOG_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={locationFilter}
            onChange={(event) =>
              handleFilterChange(setLocationFilter, event.target.value)
            }
            aria-label="Filter by location"
          >
            <option value="">All Locations</option>
            {BLOG_LOCATIONS.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          <select
            value={seasonFilter}
            onChange={(event) =>
              handleFilterChange(setSeasonFilter, event.target.value)
            }
            aria-label="Filter by season"
          >
            <option value="">All Seasons</option>
            {BLOG_SEASONS.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="BlogManagement-reset-btn"
            onClick={resetFilters}
          >
            <RotateCcw size={16} />
            Reset
          </button>

          <div className="BlogManagement-compact-view">
            <button
              type="button"
              className={viewMode === "list" ? "active" : ""}
              onClick={() => setViewMode("list")}
              aria-label="Switch to list view"
              title="List view"
            >
              <List size={19} />
            </button>
            <button
              type="button"
              className={viewMode === "grid" ? "active" : ""}
              onClick={() => setViewMode("grid")}
              aria-label="Switch to grid view"
              title="Grid view"
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>

        {/* LIST VIEW */}
        {viewMode === "list" && (
          <div className="BlogManagement-table-scroll">
            <table className="BlogManagement-table">
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Ideal Season</th>
                  <th>Tags</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedBlogs.map((blog, index) => (
                  <tr key={blog.id}>
                    <td>
                      {(safePage - 1) * itemsPerPage + index + 1}
                    </td>

                    <td>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="BlogManagement-table-image"
                        loading="lazy"
                      />
                    </td>

                    <td>
                      <span className="BlogManagement-table-title">
                        {blog.title}
                      </span>
                    </td>

                    <td>{renderCategory(blog.category)}</td>

                    <td>
                      <span className="BlogManagement-location">
                        <MapPin size={15} />
                        {blog.location}
                      </span>
                    </td>

                    <td>{renderSeason(blog.season)}</td>

                    <td>{renderTags(blog.tags)}</td>

                    <td className="BlogManagement-date">
                      {formatDate(blog.date)}
                    </td>

                    <td>{renderActions(blog)}</td>
                  </tr>
                ))}

                {paginatedBlogs.length === 0 && (
                  <tr>
                    <td colSpan="9">
                      <div className="BlogManagement-empty">
                        <BookOpen size={34} />
                        <h3>No blog posts found</h3>
                        <p>Try changing your search or filter options.</p>
                        <button
                          type="button"
                          onClick={resetFilters}
                        >
                          Clear Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* GRID VIEW */}
        {viewMode === "grid" && (
          <div className="BlogManagement-grid">
            {paginatedBlogs.map((blog) => (
              <article className="BlogManagement-blog-card" key={blog.id}>
                <div className="BlogManagement-card-image-wrap">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="BlogManagement-card-image"
                    loading="lazy"
                  />

                  <span className="BlogManagement-card-category">
                    {blog.category}
                  </span>
                </div>

                <div className="BlogManagement-card-body">
                  <div className="BlogManagement-card-meta">
                    <span>
                      <MapPin size={14} />
                      {blog.location}
                    </span>
                  </div>

                  <h3>{blog.title}</h3>

                  <p className="BlogManagement-card-description">
                    {blog.description}
                  </p>

                  <div className="BlogManagement-card-season">
                    {renderSeason(blog.season)}
                  </div>

                  {renderTags(blog.tags, 2)}

                  <div className="BlogManagement-card-footer">
                    <span className="BlogManagement-card-date">
                      <CalendarDays size={15} />
                      {formatDate(blog.date)}
                    </span>
                    {renderActions(blog)}
                  </div>
                </div>
              </article>
            ))}

            {paginatedBlogs.length === 0 && (
              <div className="BlogManagement-empty BlogManagement-empty-grid">
                <BookOpen size={34} />
                <h3>No blog posts found</h3>
                <p>Try changing your search or filter options.</p>
                <button type="button" onClick={resetFilters}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        <footer className="BlogManagement-pagination">
          <span>
            Showing{" "}
            <strong>
              {filteredBlogs.length === 0
                ? 0
                : (safePage - 1) * itemsPerPage + 1}
              {"–"}
              {Math.min(safePage * itemsPerPage, filteredBlogs.length)}
            </strong>{" "}
            of <strong>{filteredBlogs.length}</strong> blogs
          </span>

          <div className="BlogManagement-pagination-buttons">
            <button
              type="button"
              aria-label="Previous page"
              disabled={safePage === 1}
              onClick={() => setCurrentPage(safePage - 1)}
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .filter(
                (page) =>
                  totalPages <= 5 ||
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - safePage) <= 1
              )
              .map((page, index, pages) => (
                <React.Fragment key={page}>
                  {index > 0 && page - pages[index - 1] > 1 && (
                    <span className="BlogManagement-page-ellipsis">…</span>
                  )}
                  <button
                    type="button"
                    className={safePage === page ? "active" : ""}
                    onClick={() => setCurrentPage(page)}
                    aria-label={`Go to page ${page}`}
                    aria-current={safePage === page ? "page" : undefined}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}

            <button
              type="button"
              aria-label="Next page"
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage(safePage + 1)}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </footer>
      </section>

      {/* Blog preview modal */}
      {previewBlog && (
        <div
          className="BlogManagement-modal-overlay"
          onClick={() => setPreviewBlog(null)}
        >
          <section
            className="BlogManagement-preview-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="BlogManagement-preview-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="BlogManagement-modal-header">
              <div>
                <span className="BlogManagement-modal-eyebrow">
                  BLOG PREVIEW
                </span>
                <h2 id="BlogManagement-preview-title">
                  {previewBlog.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setPreviewBlog(null)}
                aria-label="Close preview"
              >
                <X size={21} />
              </button>
            </header>

            <div className="BlogManagement-modal-body">
              <img
                src={previewBlog.image}
                alt={previewBlog.title}
                className="BlogManagement-preview-image"
              />

              {renderCategory(previewBlog.category)}

              <p className="BlogManagement-preview-location">
                <MapPin size={16} />
                {previewBlog.location}
              </p>

              <p className="BlogManagement-preview-description">
                {previewBlog.description}
              </p>

              <div className="BlogManagement-preview-details">
                {renderSeason(previewBlog.season)}
                <span>
                  <CalendarDays size={15} />
                  {formatDate(previewBlog.date)}
                </span>
              </div>

              {renderTags(previewBlog.tags, 5)}
            </div>

            <footer className="BlogManagement-modal-footer">
              <button
                type="button"
                className="BlogManagement-modal-close"
                onClick={() => setPreviewBlog(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="BlogManagement-create-btn"
                onClick={() => handleEdit(previewBlog.id)}
              >
                <Pencil size={16} />
                Edit Blog
              </button>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;


import React, { useMemo, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  BookOpen,
  Plus,
  List,
  Search,
  MapPin,
  CalendarDays,
  Tag,
  Quote,
  ImagePlus,
  Upload,
  Pencil,
  Trash2,
  Eye,
  X,
  Save,
  RotateCcw,
  FileText,
  Images,
  CheckCircle2,
} from "lucide-react";
import "./BlogPosting.css";

const BLOG_CATEGORIES = [
  "Travel Guide",
  "Wildlife",
  "Adventure",
  "Culture",
  "Photography",
  "Travel Tips",
  "Destination",
];

const BLOG_SEASONS = [
  "Winter",
  "Summer",
  "Monsoon",
  "Spring",
  "Autumn",
  "All Year Round",
];

const INITIAL_BLOGS = [
  {
    id: 1,
    title: "Exploring the Beauty of Bhitarkanika",
    description:
      "<p>Discover the beautiful mangrove forests, rich biodiversity, and unforgettable river experiences of Bhitarkanika.</p>",
    location: "Bhitarkanika, Odisha",
    idealSeason: "Winter",
    category: "Travel Guide",
    quote: "Nature always has a story worth discovering.",
    tags: ["Bhitarkanika", "Nature", "Odisha"],
    mainImage:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&auto=format&fit=crop&q=80",
    contentImages: [],
    date: "2026-10-20",
  },
  {
    id: 2,
    title: "A Complete Guide to Mangrove Wildlife",
    description:
      "<p>Explore the fascinating wildlife and natural habitats found within the mangrove ecosystem.</p>",
    location: "Kendrapara, Odisha",
    idealSeason: "Winter",
    category: "Wildlife",
    quote: "Protecting nature means protecting our future.",
    tags: ["Wildlife", "Mangroves", "Travel"],
    mainImage:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=900&auto=format&fit=crop&q=80",
    contentImages: [],
    date: "2026-10-18",
  },
  {
    id: 3,
    title: "Planning Your Next Nature Adventure",
    description:
      "<p>Plan a refreshing getaway with scenic landscapes, memorable journeys, and responsible tourism.</p>",
    location: "Odisha, India",
    idealSeason: "Winter",
    category: "Adventure",
    quote: "The best journeys bring us closer to nature.",
    tags: ["Adventure", "Travel Tips"],
    mainImage:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&auto=format&fit=crop&q=80",
    contentImages: [],
    date: "2026-10-15",
  },
];

const EMPTY_FORM = {
  title: "",
  description: "",
  location: "",
  idealSeason: "",
  category: "",
  quote: "",
  tags: [],
  mainImage: "",
  contentImages: [],
};

const BlogPosting = () => {
  const [activeTab, setActiveTab] = useState("form");
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [tagInput, setTagInput] = useState("");
  const [notice, setNotice] = useState("");
  const [previewBlog, setPreviewBlog] = useState(null);

  const mainImageRef = useRef(null);
  const contentImagesRef = useRef(null);

  const filteredBlogs = useMemo(() => {
    const term = search.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesSearch =
        !term ||
        blog.title.toLowerCase().includes(term) ||
        blog.location.toLowerCase().includes(term) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(term));

      const matchesCategory =
        categoryFilter === "All Categories" ||
        blog.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [blogs, search, categoryFilter]);

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleMainImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setNotice("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setNotice("Main image must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    updateField("mainImage", file);
    setNotice("");
  };

  const handleContentImages = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const validFiles = files.filter(
      (file) =>
        file.type.startsWith("image/") &&
        file.size <= 5 * 1024 * 1024
    );

    if (validFiles.length !== files.length) {
      setNotice("Some images were skipped. Images must be under 5 MB.");
    } else {
      setNotice("");
    }

    setFormData((previous) => ({
      ...previous,
      contentImages: [...previous.contentImages, ...validFiles],
    }));

    event.target.value = "";
  };

  const removeContentImage = (index) => {
    setFormData((previous) => ({
      ...previous,
      contentImages: previous.contentImages.filter(
        (_, imageIndex) => imageIndex !== index
      ),
    }));
  };

  const addTag = () => {
    const tag = tagInput.trim().replace(/^#/, "");
    if (!tag) return;

    if (
      formData.tags.some(
        (existingTag) => existingTag.toLowerCase() === tag.toLowerCase()
      )
    ) {
      setTagInput("");
      return;
    }

    updateField("tags", [...formData.tags, tag]);
    setTagInput("");
  };

  const removeTag = (tagToRemove) => {
    updateField(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setEditingId(null);
    setTagInput("");
    setNotice("");

    if (mainImageRef.current) mainImageRef.current.value = "";
    if (contentImagesRef.current) contentImagesRef.current.value = "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setNotice("Please enter a blog title.");
      return;
    }

    if (!formData.description.trim() || formData.description === "<p></p>") {
      setNotice("Please enter the blog description.");
      return;
    }

    if (!formData.location.trim()) {
      setNotice("Please enter the blog location.");
      return;
    }

    if (!formData.category || !formData.idealSeason) {
      setNotice("Please select a category and ideal season.");
      return;
    }

    if (!formData.mainImage) {
      setNotice("Please upload a main image.");
      return;
    }

    const existingBlog = blogs.find((blog) => blog.id === editingId);

    const savedBlog = {
      ...formData,
      id: editingId ?? Date.now(),
      mainImage:
        formData.mainImage instanceof File
          ? URL.createObjectURL(formData.mainImage)
          : formData.mainImage,
      contentImages: formData.contentImages.map((image) =>
        image instanceof File ? URL.createObjectURL(image) : image
      ),
      date: existingBlog?.date || new Date().toISOString().slice(0, 10),
    };

    if (editingId !== null) {
      setBlogs((previous) =>
        previous.map((blog) =>
          blog.id === editingId ? savedBlog : blog
        )
      );
      setNotice("Blog updated successfully.");
    } else {
      setBlogs((previous) => [savedBlog, ...previous]);
      setNotice("Blog created successfully.");
    }

    setFormData(EMPTY_FORM);
    setEditingId(null);
    setTagInput("");

    if (mainImageRef.current) mainImageRef.current.value = "";
    if (contentImagesRef.current) contentImagesRef.current.value = "";

    setActiveTab("table");
  };

  const handleEdit = (blog) => {
    setFormData({ ...blog, tags: [...blog.tags], contentImages: [...blog.contentImages] });
    setEditingId(blog.id);
    setNotice("");
    setActiveTab("form");

    if (mainImageRef.current) mainImageRef.current.value = "";
    if (contentImagesRef.current) contentImagesRef.current.value = "";

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    setBlogs((previous) => previous.filter((blog) => blog.id !== id));

    if (editingId === id) resetForm();

    setNotice("Blog deleted successfully.");
  };

  const getImageUrl = (image) => {
    if (image instanceof File) return URL.createObjectURL(image);
    return image || "";
  };

  return (
    <div className="BlogPosting">
      {/* Page Header */}
     

      {/* Form / Table Tabs */}
      <div className="BlogPosting-tabs">
        <button
          type="button"
          className={`BlogPosting-tab ${
            activeTab === "form" ? "active" : ""
          }`}
          onClick={() => {
            setActiveTab("form");
            setNotice("");
          }}
        >
          <Plus size={18} />
          {editingId ? "Edit Blog" : "Blog Form"}
        </button>

        <button
          type="button"
          className={`BlogPosting-tab ${
            activeTab === "table" ? "active" : ""
          }`}
          onClick={() => {
            setActiveTab("table");
            setNotice("");
          }}
        >
          <List size={18} />
          Blog Table
          <span className="BlogPosting-tab-count">{blogs.length}</span>
        </button>
      </div>

      {/* Notification */}
      {notice && (
        <div className="BlogPosting-notice" role="status">
          <CheckCircle2 size={18} />
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Blog Form */}
      {activeTab === "form" && (
        <form className="BlogPosting-form" onSubmit={handleSubmit}>
          <div className="BlogPosting-card">
            <div className="BlogPosting-card-heading">
              <div className="BlogPosting-card-heading-icon">
                <FileText size={21} />
              </div>
              <div>
                <h2>{editingId ? "Update Blog" : "Blog Information"}</h2>
                <p>Enter the main details of your blog article.</p>
              </div>
            </div>

            <div className="BlogPosting-form-grid">
              <div className="BlogPosting-field BlogPosting-field-full">
                <label htmlFor="BlogPosting-title">
                  Blog Title <span>*</span>
                </label>
                <input
                  id="BlogPosting-title"
                  type="text"
                  value={formData.title}
                  onChange={(event) =>
                    updateField("title", event.target.value)
                  }
                  placeholder="Enter an engaging blog title"
                  maxLength={150}
                  required
                />
                <small>
                  {formData.title.length}/150 characters
                </small>
              </div>

              <div className="BlogPosting-field BlogPosting-field-full">
                <label>
                  Blog Description <span>*</span>
                </label>

                <div className="BlogPosting-editor-wrap">
                  <Editor
                    apiKey="8hswbe7bfeeneui9eb9gjgsym8ku30nx5gwre9808ajdzniu"
                    value={formData.description}
                    onEditorChange={(content) =>
                      updateField("description", content)
                    }
                    init={{
                      height: 350,
                      menubar: false,
                      branding: false,
                      statusbar: true,
                      plugins: [
                        "lists",
                        "link",
                        "table",
                        "wordcount",
                        "code",
                      ],
                      toolbar:
                        "undo redo | blocks | bold italic underline | " +
                        "forecolor backcolor | alignleft aligncenter " +
                        "alignright | bullist numlist | blockquote | " +
                        "link table | removeformat | code",
                      block_formats:
                        "Paragraph=p; Heading 2=h2; Heading 3=h3; Heading 4=h4",
                      content_style:
                        "body { font-family: Inter, Arial, sans-serif; font-size: 14px; line-height: 1.8; color: #344054; padding: 10px; }",
                      resize: true,
                      placeholder:
                        "Write your detailed blog content here...",
                    }}
                  />
                </div>

                <small>
                  Use the editor toolbar to format paragraphs, headings,
                  lists and links.
                </small>
              </div>

              <div className="BlogPosting-field">
                <label htmlFor="BlogPosting-location">
                  <MapPin size={15} />
                  Location <span>*</span>
                </label>
                <input
                  id="BlogPosting-location"
                  type="text"
                  value={formData.location}
                  onChange={(event) =>
                    updateField("location", event.target.value)
                  }
                  placeholder="e.g. Bhitarkanika, Odisha"
                  required
                />
              </div>

              <div className="BlogPosting-field">
                <label htmlFor="BlogPosting-season">
                  <CalendarDays size={15} />
                  Ideal Season <span>*</span>
                </label>
                <select
                  id="BlogPosting-season"
                  value={formData.idealSeason}
                  onChange={(event) =>
                    updateField("idealSeason", event.target.value)
                  }
                  required
                >
                  <option value="">Choose ideal season</option>
                  {BLOG_SEASONS.map((season) => (
                    <option key={season} value={season}>
                      {season}
                    </option>
                  ))}
                </select>
              </div>

              <div className="BlogPosting-field">
                <label htmlFor="BlogPosting-category">
                  <BookOpen size={15} />
                  Category <span>*</span>
                </label>
                <select
                  id="BlogPosting-category"
                  value={formData.category}
                  onChange={(event) =>
                    updateField("category", event.target.value)
                  }
                  required
                >
                  <option value="">Choose category</option>
                  {BLOG_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="BlogPosting-field">
                <label htmlFor="BlogPosting-quote">
                  <Quote size={15} />
                  Featured Quote
                </label>
                <input
                  id="BlogPosting-quote"
                  type="text"
                  value={formData.quote}
                  onChange={(event) =>
                    updateField("quote", event.target.value)
                  }
                  placeholder="Enter an inspiring quote"
                  maxLength={250}
                />
              </div>

              {/* Tags */}
              <div className="BlogPosting-field BlogPosting-field-full">
                <label htmlFor="BlogPosting-tags">
                  <Tag size={15} />
                  Blog Tags
                </label>

                <div className="BlogPosting-tag-input-wrap">
                  <input
                    id="BlogPosting-tags"
                    type="text"
                    value={tagInput}
                    onChange={(event) => setTagInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="Type a tag and press Enter"
                  />

                  <button
                    type="button"
                    className="BlogPosting-add-tag-btn"
                    onClick={addTag}
                  >
                    <Plus size={16} />
                    Add Tag
                  </button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="BlogPosting-tags-list">
                    {formData.tags.map((tag) => (
                      <span className="BlogPosting-tag" key={tag}>
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          aria-label={`Remove ${tag}`}
                        >
                          <X size={13} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Image Upload */}
          <div className="BlogPosting-card">
            <div className="BlogPosting-card-heading">
              <div className="BlogPosting-card-heading-icon">
                <ImagePlus size={21} />
              </div>
              <div>
                <h2>Main Blog Image</h2>
                <p>
                  Upload the featured image displayed on the blog card.
                </p>
              </div>
            </div>

            <input
              ref={mainImageRef}
              type="file"
              accept="image/*"
              className="BlogPosting-hidden-input"
              id="BlogPosting-main-image"
              onChange={handleMainImage}
            />

            <label
              htmlFor="BlogPosting-main-image"
              className="BlogPosting-upload-zone"
            >
              {formData.mainImage ? (
                <img
                  src={getImageUrl(formData.mainImage)}
                  alt="Main blog preview"
                  className="BlogPosting-main-image-preview"
                />
              ) : (
                <>
                  <span className="BlogPosting-upload-icon">
                    <Upload size={26} />
                  </span>
                  <strong>Click to upload main image</strong>
                  <span>PNG, JPG, WEBP or JPEG · Maximum 5 MB</span>
                </>
              )}
            </label>

            {formData.mainImage && (
              <button
                type="button"
                className="BlogPosting-remove-image-btn"
                onClick={() => {
                  updateField("mainImage", "");
                  if (mainImageRef.current) {
                    mainImageRef.current.value = "";
                  }
                }}
              >
                <Trash2 size={15} />
                Remove main image
              </button>
            )}
          </div>

          {/* Multiple Content Images */}
          <div className="BlogPosting-card">
            <div className="BlogPosting-card-heading">
              <div className="BlogPosting-card-heading-icon">
                <Images size={21} />
              </div>
              <div>
                <h2>Content Images</h2>
                <p>
                  Upload multiple supporting images for the blog article.
                </p>
              </div>
            </div>

            <input
              ref={contentImagesRef}
              type="file"
              accept="image/*"
              multiple
              className="BlogPosting-hidden-input"
              id="BlogPosting-content-images"
              onChange={handleContentImages}
            />

            <label
              htmlFor="BlogPosting-content-images"
              className="BlogPosting-multiple-upload"
            >
              <ImagePlus size={23} />
              <span>
                <strong>Add content images</strong>
                <small>Select multiple images at once · Maximum 5 MB each</small>
              </span>
              <Plus size={20} />
            </label>

            {formData.contentImages.length > 0 && (
              <div className="BlogPosting-image-grid">
                {formData.contentImages.map((image, index) => (
                  <div
                    className="BlogPosting-content-image-card"
                    key={`${image.name || image}-${index}`}
                  >
                    <img
                      src={getImageUrl(image)}
                      alt={`Blog content ${index + 1}`}
                    />
                    <span>Image {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeContentImage(index)}
                      aria-label={`Remove image ${index + 1}`}
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="BlogPosting-upload-hint">
              {formData.contentImages.length} content image(s) selected
            </p>
          </div>

          {/* Form Actions */}
          <div className="BlogPosting-form-actions">
            <button
              type="button"
              className="BlogPosting-reset-btn"
              onClick={resetForm}
            >
              <RotateCcw size={17} />
              Reset Form
            </button>

            <button
              type="submit"
              className="BlogPosting-submit-btn"
            >
              <Save size={18} />
              {editingId ? "Update Blog" : "Publish Blog"}
            </button>
          </div>
        </form>
      )}

      {/* Blog Table */}
      {activeTab === "table" && (
        <div className="BlogPosting-table-card">
          <div className="BlogPosting-table-header">
            <div className="BlogPosting-card-heading">
              <div className="BlogPosting-card-heading-icon">
                <List size={21} />
              </div>
              <div>
                <h2>Blog Management</h2>
                <p>View, edit and manage your published blog entries.</p>
              </div>
            </div>

            <button
              type="button"
              className="BlogPosting-new-btn"
              onClick={() => {
                resetForm();
                setActiveTab("form");
              }}
            >
              <Plus size={18} />
              Create Blog
            </button>
          </div>

          <div className="BlogPosting-table-toolbar">
            <div className="BlogPosting-search-box">
              <Search size={18} />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search title, location or tags..."
                aria-label="Search blogs"
              />
            </div>

            <select
              className="BlogPosting-category-filter"
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              aria-label="Filter blogs by category"
            >
              <option>All Categories</option>
              {BLOG_CATEGORIES.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>

            <span className="BlogPosting-results-count">
              Showing <strong>{filteredBlogs.length}</strong> of{" "}
              <strong>{blogs.length}</strong> blogs
            </span>
          </div>

          <div className="BlogPosting-table-scroll">
            <table className="BlogPosting-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Blog Details</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Ideal Season</th>
                  <th>Tags</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredBlogs.map((blog, index) => (
                  <tr key={blog.id}>
                    <td>{index + 1}</td>

                    <td>
                      <div className="BlogPosting-blog-info">
                        <img
                          src={blog.mainImage}
                          alt={blog.title}
                          className="BlogPosting-table-image"
                        />
                        <div>
                          <strong>{blog.title}</strong>
                          <span>
                            {blog.contentImages.length} content image(s)
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="BlogPosting-location-cell">
                        <MapPin size={14} />
                        {blog.location}
                      </span>
                    </td>

                    <td>
                      <span className="BlogPosting-category-badge">
                        {blog.category}
                      </span>
                    </td>

                    <td>{blog.idealSeason}</td>

                    <td>
                      <div className="BlogPosting-table-tags">
                        {blog.tags.slice(0, 2).map((tag) => (
                          <span key={tag}>#{tag}</span>
                        ))}
                        {blog.tags.length > 2 && (
                          <span>+{blog.tags.length - 2}</span>
                        )}
                      </div>
                    </td>

                    <td>
                      {new Date(`${blog.date}T00:00:00`).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </td>

                    <td>
                      <div className="BlogPosting-actions">
                        <button
                          type="button"
                          className="BlogPosting-action-btn BlogPosting-view-btn"
                          title="Preview blog"
                          aria-label={`Preview ${blog.title}`}
                          onClick={() => setPreviewBlog(blog)}
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          className="BlogPosting-action-btn BlogPosting-edit-btn"
                          title="Edit blog"
                          aria-label={`Edit ${blog.title}`}
                          onClick={() => handleEdit(blog)}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          className="BlogPosting-action-btn BlogPosting-delete-btn"
                          title="Delete blog"
                          aria-label={`Delete ${blog.title}`}
                          onClick={() => handleDelete(blog.id)}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredBlogs.length === 0 && (
                  <tr>
                    <td colSpan="8">
                      <div className="BlogPosting-empty-state">
                        <span>
                          <BookOpen size={28} />
                        </span>
                        <strong>No blogs found</strong>
                        <p>
                          Try another search or create a new blog post.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setSearch("");
                            setCategoryFilter("All Categories");
                          }}
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

          <div className="BlogPosting-table-footer">
            <span>
              {filteredBlogs.length} blog
              {filteredBlogs.length === 1 ? "" : "s"} displayed
            </span>
            <span className="BlogPosting-footer-note">
              <CheckCircle2 size={15} />
              Blog management
            </span>
          </div>
        </div>
      )}

      {/* Blog Preview Modal */}
      {previewBlog && (
        <div
          className="BlogPosting-modal-backdrop"
          onClick={() => setPreviewBlog(null)}
        >
          <div
            className="BlogPosting-preview-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="BlogPosting-preview-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="BlogPosting-preview-header">
              <h2>Blog Preview</h2>
              <button
                type="button"
                onClick={() => setPreviewBlog(null)}
                aria-label="Close preview"
              >
                <X size={21} />
              </button>
            </div>

            <div className="BlogPosting-preview-content">
              <img
                src={previewBlog.mainImage}
                alt={previewBlog.title}
                className="BlogPosting-preview-image"
              />

              <span className="BlogPosting-category-badge">
                {previewBlog.category}
              </span>

              <h2 id="BlogPosting-preview-title">
                {previewBlog.title}
              </h2>

              <p className="BlogPosting-preview-location">
                <MapPin size={16} />
                {previewBlog.location} · {previewBlog.idealSeason}
              </p>

              {previewBlog.quote && (
                <blockquote className="BlogPosting-preview-quote">
                  “{previewBlog.quote}”
                </blockquote>
              )}

              <div
                className="BlogPosting-preview-description"
                dangerouslySetInnerHTML={{
                  __html: previewBlog.description,
                }}
              />

              {previewBlog.tags.length > 0 && (
                <div className="BlogPosting-tags-list">
                  {previewBlog.tags.map((tag) => (
                    <span className="BlogPosting-tag" key={tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {previewBlog.contentImages.length > 0 && (
                <div className="BlogPosting-preview-gallery">
                  {previewBlog.contentImages.map((image, index) => (
                    <img
                      key={`${image}-${index}`}
                      src={image}
                      alt={`${previewBlog.title} ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="BlogPosting-preview-footer">
              <button
                type="button"
                className="BlogPosting-reset-btn"
                onClick={() => setPreviewBlog(null)}
              >
                Close Preview
              </button>

              <button
                type="button"
                className="BlogPosting-submit-btn"
                onClick={() => {
                  handleEdit(previewBlog);
                  setPreviewBlog(null);
                }}
              >
                <Pencil size={16} />
                Edit Blog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPosting;

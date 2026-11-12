
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
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

const BLOG_SEASONS = [
  "Winter",
  "Summer",
  "Monsoon",
  "Spring",
  "Autumn",
  "All Year Round",
];

const API_BASE_URL = "http://localhost:5000/api/blogs";
const API_CATEGORIES_URL = "http://localhost:5000/api/blog-categories?active=true";

const normalizeBlog = (blog) => ({
  ...blog,
  id: blog._id || blog.id,
  tags: Array.isArray(blog.tags) ? blog.tags : [],
  contentImages: Array.isArray(blog.contentImages) ? blog.contentImages : [],
  published: blog.published !== false,
  date: blog.date || (blog.createdAt ? blog.createdAt.slice(0, 10) : new Date().toISOString().slice(0, 10)),
});

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
  published: true,
};

const BlogPosting = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const editParamId = searchParams.get("edit");

  const [activeTab, setActiveTab] = useState("form");
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [tagInput, setTagInput] = useState("");
  const [notice, setNotice] = useState("");
  const [previewBlog, setPreviewBlog] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const mainImageRef = useRef(null);
  const contentImagesRef = useRef(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [blogsRes, categoriesRes] = await Promise.all([
          fetch(API_BASE_URL),
          fetch(API_CATEGORIES_URL),
        ]);
        const [blogsJson, categoriesJson] = await Promise.all([
          blogsRes.json(),
          categoriesRes.json(),
        ]);

        if (blogsRes.ok && blogsJson.success) {
          setBlogs((blogsJson.data || []).map(normalizeBlog));
        }
        if (categoriesRes.ok && categoriesJson.success) {
          setCategories(
            (categoriesJson.data || []).map((item) => item.name).filter(Boolean)
          );
        }
      } catch (error) {
        setNotice("Unable to load blogs or categories from server.");
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!editParamId) return;

    const loadBlogForEdit = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/${editParamId}`);
        const result = await res.json();
        if (!res.ok || !result.success || !result.data) {
          throw new Error(result.message || "Blog not found.");
        }

        const blog = normalizeBlog(result.data);
        setFormData({
          title: blog.title || "",
          description: blog.description || "",
          location: blog.location || "",
          idealSeason: blog.idealSeason || "",
          category: blog.category || "",
          quote: blog.quote || "",
          tags: [...blog.tags],
          mainImage: blog.mainImage || "",
          contentImages: [...blog.contentImages],
          published: blog.published,
        });
        setEditingId(blog.id);
        setActiveTab("form");
        setNotice("");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        setNotice(error.message || "Unable to load blog for editing.");
      }
    };

    loadBlogForEdit();
  }, [editParamId]);

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
    if (editParamId) setSearchParams({});

    if (mainImageRef.current) mainImageRef.current.value = "";
    if (contentImagesRef.current) contentImagesRef.current.value = "";
  };

  const handleSubmit = async (event) => {
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

    try {
      setSubmitting(true);
      setNotice("");

      const payload = new FormData();
      payload.append("title", formData.title.trim());
      payload.append("description", formData.description);
      payload.append("location", formData.location.trim());
      payload.append("idealSeason", formData.idealSeason);
      payload.append("category", formData.category);
      payload.append("quote", formData.quote || "");
      payload.append("tags", JSON.stringify(formData.tags));
      payload.append("published", String(formData.published));

      if (formData.mainImage instanceof File) {
        payload.append("mainImage", formData.mainImage);
      } else {
        payload.append("mainImage", formData.mainImage);
      }

      const existingContentUrls = formData.contentImages.filter(
        (image) => typeof image === "string"
      );
      payload.append(
        "existingContentImages",
        JSON.stringify(existingContentUrls)
      );

      formData.contentImages.forEach((image) => {
        if (image instanceof File) {
          payload.append("contentImages", image);
        }
      });

      const isEditing = editingId !== null;
      const response = await fetch(
        isEditing ? `${API_BASE_URL}/${editingId}` : API_BASE_URL,
        {
          method: isEditing ? "PUT" : "POST",
          body: payload,
        }
      );

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to save blog.");
      }

      const savedBlog = normalizeBlog(result.data);

      if (isEditing) {
        setBlogs((previous) =>
          previous.map((blog) => (blog.id === editingId ? savedBlog : blog))
        );
        setNotice("Blog updated successfully.");
      } else {
        setBlogs((previous) => [savedBlog, ...previous]);
        setNotice("Blog saved to database successfully.");
      }

      setFormData(EMPTY_FORM);
      setEditingId(null);
      setTagInput("");
      if (editParamId) setSearchParams({});

      if (mainImageRef.current) mainImageRef.current.value = "";
      if (contentImagesRef.current) contentImagesRef.current.value = "";

      setActiveTab("table");
    } catch (error) {
      setNotice(error.message || "Error saving blog.");
    } finally {
      setSubmitting(false);
    }
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

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete blog.");
      }

      setBlogs((previous) => previous.filter((blog) => blog.id !== id));

      if (editingId === id) resetForm();

      setNotice("Blog deleted successfully.");
    } catch (error) {
      setNotice(error.message || "Error deleting blog.");
    }
  };

  const handleTogglePublish = async (blog) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${blog.id}/publish`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !blog.published }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update publish status.");
      }

      const updated = normalizeBlog(result.data);
      setBlogs((previous) =>
        previous.map((item) => (item.id === blog.id ? updated : item))
      );
      setNotice(
        updated.published
          ? "Blog published successfully."
          : "Blog moved to draft."
      );
    } catch (error) {
      setNotice(error.message || "Error updating publish status.");
    }
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
                  <option value="">
                    {categories.length
                      ? "Choose category"
                      : "No categories found — add one in Add Category"}
                  </option>
                  {categories.map((category) => (
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

          {/* Publish / Draft Toggle */}
          <div className="BlogPosting-form-card BlogPosting-publish-card">
            <div className="BlogPosting-publish-copy">
              <strong>Visibility Status</strong>
              <span>
                {formData.published
                  ? "Published — visible on the public blog page"
                  : "Draft — saved in database, hidden from public blog page"}
              </span>
            </div>

            <div className="BlogPosting-publish-control">
              <span
                className={`BlogPosting-publish-label ${
                  !formData.published ? "is-draft" : ""
                }`}
              >
                Draft
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={formData.published}
                aria-label="Toggle publish or draft status"
                className={`BlogPosting-switch ${
                  formData.published ? "is-published" : ""
                }`}
                onClick={() => updateField("published", !formData.published)}
              >
                <span className="BlogPosting-switch-thumb" />
              </button>
              <span
                className={`BlogPosting-publish-label ${
                  formData.published ? "is-published" : ""
                }`}
              >
                Publish
              </span>
            </div>
          </div>

          {/* Form Actions */}
          <div className="BlogPosting-form-actions">
            <button
              type="button"
              className="BlogPosting-reset-btn"
              onClick={resetForm}
              disabled={submitting}
            >
              <RotateCcw size={17} />
              Reset Form
            </button>

            <button
              type="submit"
              className="BlogPosting-submit-btn"
              disabled={submitting}
            >
              <Save size={18} />
              {submitting
                ? "Saving..."
                : editingId
                  ? "Update Blog"
                  : formData.published
                    ? "Publish Blog"
                    : "Save as Draft"}
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
              {categories.map((category) => (
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
                  <th>Status</th>
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
                      <div className="BlogPosting-table-switch">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={blog.published}
                          aria-label={`Toggle ${blog.title} publish or draft`}
                          className={`BlogPosting-switch BlogPosting-switch--sm ${
                            blog.published ? "is-published" : ""
                          }`}
                          onClick={() => handleTogglePublish(blog)}
                          title="Toggle Publish / Draft"
                        >
                          <span className="BlogPosting-switch-thumb" />
                        </button>
                        <span
                          className={`BlogPosting-status-text ${
                            blog.published ? "is-published" : "is-draft"
                          }`}
                        >
                          {blog.published ? "Published" : "Draft"}
                        </span>
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

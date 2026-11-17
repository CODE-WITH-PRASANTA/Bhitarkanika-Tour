import React, { useEffect, useMemo, useState } from "react";
import {
  Tags,
  Plus,
  Search,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  Sparkles,
  RotateCcw,
  Save,
  FolderOpen,
} from "lucide-react";
import "./BlogCategory.css";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_URL = `${API_BASE}/blog-categories`;

const EMPTY_FORM = {
  name: "",
  description: "",
  isActive: true,
};

const BlogCategory = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState({ type: "", text: "" });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const result = await res.json();
      if (res.ok && result.success) {
        setCategories(result.data || []);
      }
    } catch {
      setNotice({
        type: "error",
        text: "Unable to load categories from server.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return categories;
    return categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(term) ||
        (cat.description || "").toLowerCase().includes(term) ||
        (cat.slug || "").toLowerCase().includes(term)
    );
  }, [categories, search]);

  const activeCount = useMemo(
    () => categories.filter((cat) => cat.isActive !== false).length,
    [categories]
  );

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedName = form.name.trim();
    if (!trimmedName) {
      setNotice({ type: "error", text: "Please enter a category name." });
      return;
    }

    try {
      setSubmitting(true);
      setNotice({ type: "", text: "" });

      const isEdit = editingId !== null;
      const res = await fetch(isEdit ? `${API_URL}/${editingId}` : API_URL, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          description: form.description.trim(),
          isActive: form.isActive,
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to save category.");
      }

      if (isEdit) {
        setCategories((prev) =>
          prev.map((cat) => (cat._id === editingId ? result.data : cat))
        );
        setNotice({ type: "success", text: "Category updated successfully." });
      } else {
        setCategories((prev) => [result.data, ...prev]);
        setNotice({
          type: "success",
          text: "Category saved to database successfully.",
        });
      }

      resetForm();
    } catch (error) {
      setNotice({
        type: "error",
        text: error.message || "Error saving category.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (category) => {
    setForm({
      name: category.name || "",
      description: category.description || "",
      isActive: category.isActive !== false,
    });
    setEditingId(category._id);
    setNotice({ type: "", text: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (category) => {
    const confirmed = window.confirm(
      `Delete category "${category.name}"? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_URL}/${category._id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to delete category.");
      }
      setCategories((prev) => prev.filter((cat) => cat._id !== category._id));
      if (editingId === category._id) resetForm();
      setNotice({ type: "success", text: "Category deleted successfully." });
    } catch (error) {
      setNotice({
        type: "error",
        text: error.message || "Error deleting category.",
      });
    }
  };

  const handleToggleActive = async (category) => {
    try {
      const res = await fetch(`${API_URL}/${category._id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !category.isActive }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to update status.");
      }
      setCategories((prev) =>
        prev.map((cat) => (cat._id === category._id ? result.data : cat))
      );
      setNotice({
        type: "success",
        text: `"${result.data.name}" is now ${
          result.data.isActive ? "Active" : "Inactive"
        }.`,
      });
    } catch (error) {
      setNotice({
        type: "error",
        text: error.message || "Error updating category status.",
      });
    }
  };

  return (
    <div className="BlogCategory">
      {/* Premium Hero Banner */}
      <header className="BlogCategory-hero">
        <div className="BlogCategory-hero-copy">
          <span className="BlogCategory-eyebrow">
            <Sparkles size={14} />
            BLOG TAXONOMY STUDIO
          </span>
          <h1>Blog Categories</h1>
          <p>
            Create and organize dynamic categories for Bhitarkanika stories.
            Active categories appear automatically in Blog Posting and the
            public Blog filter bar.
          </p>
        </div>

        <div className="BlogCategory-stats">
          <div className="BlogCategory-stat-card">
            <span>Total Categories</span>
            <strong>{categories.length}</strong>
          </div>
          <div className="BlogCategory-stat-card BlogCategory-stat-card--active">
            <span>Active</span>
            <strong>{activeCount}</strong>
          </div>
        </div>
      </header>

      {notice.text && (
        <div
          className={`BlogCategory-notice BlogCategory-notice--${notice.type}`}
          role="status"
        >
          {notice.type === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <XCircle size={18} />
          )}
          <span>{notice.text}</span>
        </div>
      )}

      <div className="BlogCategory-grid">
        {/* Form Panel */}
        <section className="BlogCategory-card BlogCategory-form-card">
          <div className="BlogCategory-card-head">
            <div className="BlogCategory-icon-badge">
              {editingId ? <Pencil size={20} /> : <Plus size={20} />}
            </div>
            <div>
              <h2>{editingId ? "Edit Category" : "Add New Category"}</h2>
              <p>Saved directly to MongoDB and synced across blogs.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="BlogCategory-form">
            <div className="BlogCategory-field">
              <label htmlFor="cat-name">Category Name *</label>
              <input
                id="cat-name"
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="e.g., Mangrove Safari, Birding, Wildlife"
                maxLength={60}
              />
            </div>

            <div className="BlogCategory-field">
              <label htmlFor="cat-desc">Short Description</label>
              <textarea
                id="cat-desc"
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Briefly describe what stories belong in this category..."
                maxLength={220}
              />
            </div>

            <div className="BlogCategory-toggle-row">
              <div className="BlogCategory-toggle-copy">
                <strong>Active Status</strong>
                <span>Available in Blog Posting & Website</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={form.isActive}
                aria-label="Toggle category active status"
                className={`BlogCategory-switch ${
                  form.isActive ? "is-on" : ""
                }`}
                onClick={() =>
                  setForm((prev) => ({ ...prev, isActive: !prev.isActive }))
                }
              >
                <span className="BlogCategory-switch-thumb" />
              </button>
            </div>

            <div className="BlogCategory-form-actions">
              {editingId && (
                <button
                  type="button"
                  className="BlogCategory-btn BlogCategory-btn--ghost"
                  onClick={resetForm}
                  disabled={submitting}
                >
                  <RotateCcw size={16} />
                  Cancel
                </button>
              )}

              <button
                type="submit"
                className="BlogCategory-btn BlogCategory-btn--primary"
                disabled={submitting}
              >
                <Save size={17} />
                {submitting
                  ? "Saving..."
                  : editingId
                    ? "Update Category"
                    : "Save Category"}
              </button>
            </div>
          </form>
        </section>

        {/* Directory Panel */}
        <section className="BlogCategory-card BlogCategory-list-card">
          <div className="BlogCategory-list-head">
            <div className="BlogCategory-card-head">
              <div className="BlogCategory-icon-badge">
                <Tags size={20} />
              </div>
              <div>
                <h2>Category Directory</h2>
                <p>
                  Showing {filteredCategories.length} of {categories.length}{" "}
                  categories
                </p>
              </div>
            </div>

            <div className="BlogCategory-search">
              <Search size={16} />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories..."
                aria-label="Search categories"
              />
            </div>
          </div>

          {loading ? (
            <div className="BlogCategory-empty">
              <p>Loading categories...</p>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="BlogCategory-empty">
              <FolderOpen size={36} />
              <h3>No categories found</h3>
              <p>
                {categories.length === 0
                  ? "Create your first blog category using the form on the left."
                  : "Try adjusting your search query."}
              </p>
            </div>
          ) : (
            <div className="BlogCategory-items">
              {filteredCategories.map((cat) => (
                <article className="BlogCategory-item" key={cat._id}>
                  <div className="BlogCategory-item-main">
                    <div className="BlogCategory-item-info">
                      <div className="BlogCategory-item-title-row">
                        <h3>{cat.name}</h3>
                        <span className="BlogCategory-slug">/{cat.slug}</span>
                      </div>
                      {cat.description && <p>{cat.description}</p>}
                    </div>
                  </div>

                  <div className="BlogCategory-item-actions">
                    <div className="BlogCategory-inline-switch">
                      <span
                        className={`BlogCategory-status-text ${
                          cat.isActive !== false ? "is-active" : "is-inactive"
                        }`}
                      >
                        {cat.isActive !== false ? "Active" : "Inactive"}
                      </span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={cat.isActive !== false}
                        aria-label={`Toggle ${cat.name} active status`}
                        className={`BlogCategory-switch BlogCategory-switch--sm ${
                          cat.isActive !== false ? "is-on" : ""
                        }`}
                        onClick={() => handleToggleActive(cat)}
                      >
                        <span className="BlogCategory-switch-thumb" />
                      </button>
                    </div>

                    <button
                      type="button"
                      className="BlogCategory-icon-btn"
                      onClick={() => handleEdit(cat)}
                      aria-label={`Edit ${cat.name}`}
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      className="BlogCategory-icon-btn BlogCategory-icon-btn--danger"
                      onClick={() => handleDelete(cat)}
                      aria-label={`Delete ${cat.name}`}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default BlogCategory;


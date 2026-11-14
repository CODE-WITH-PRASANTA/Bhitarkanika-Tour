import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  MessageSquareQuote,
  Star,
  CheckCircle2,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  RotateCcw,
  Upload,
  ShieldCheck,
  MapPin,
  User,
  Sparkles,
} from "lucide-react";

import "./Testimonial.css";

const API_BASE = "http://localhost:5000/api/testimonials";

const INITIAL_FORM = {
  name: "",
  role: "",
  location: "",
  review: "",
  rating: 5,
  image: "",
  status: "Active",
  isVerified: true,
  order: 0,
};

const Testimonial = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [ratingFilter, setRatingFilter] = useState("All Ratings");

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...INITIAL_FORM });
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  // Load testimonials from Backend API
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE);
      const json = await res.json();
      if (res.ok && json.success && Array.isArray(json.data)) {
        setItems(json.data);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error("Failed to load testimonials:", err);
      setNotice("Unable to connect to server to load testimonials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Filtered items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.role && item.role.toLowerCase().includes(q)) ||
        (item.location && item.location.toLowerCase().includes(q)) ||
        (item.review && item.review.toLowerCase().includes(q));

      const matchesStatus =
        statusFilter === "All Status" || item.status === statusFilter;

      const matchesRating =
        ratingFilter === "All Ratings" ||
        item.rating === parseInt(ratingFilter, 10);

      return matchesSearch && matchesStatus && matchesRating;
    });
  }, [items, searchTerm, statusFilter, ratingFilter]);

  // Stats calculation
  const totalCount = items.length;
  const activeCount = items.filter((i) => i.status === "Active").length;
  const fiveStarCount = items.filter((i) => i.rating === 5).length;
  const verifiedCount = items.filter((i) => i.isVerified).length;

  // Open Add Modal
  const handleOpenAdd = () => {
    setFormData({ ...INITIAL_FORM });
    setEditingId(null);
    setImageFile(null);
    setImagePreview("");
    setIsModalOpen(true);
    setNotice("");
  };

  // Open Edit Modal
  const handleOpenEdit = (item) => {
    setFormData({
      name: item.name || "",
      role: item.role || "Traveller",
      location: item.location || "Odisha, India",
      review: item.review || "",
      rating: item.rating || 5,
      image: item.image || "",
      status: item.status || "Active",
      isVerified: item.isVerified !== false,
      order: item.order || 0,
    });
    setEditingId(item._id || item.id);
    setImageFile(null);
    setImagePreview(item.image || "");
    setIsModalOpen(true);
    setNotice("");
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setImageFile(null);
    setImagePreview("");
  };

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setNotice("Please select a valid image file.");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Submit Save / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.review.trim()) {
      setNotice("Please fill in Traveller Name and Testimonial Review.");
      return;
    }

    try {
      setSubmitting(true);
      setNotice("");

      const payload = new FormData();
      payload.append("name", formData.name.trim());
      payload.append("role", formData.role.trim());
      payload.append("location", formData.location.trim());
      payload.append("review", formData.review.trim());
      payload.append("rating", Number(formData.rating));
      payload.append("status", formData.status);
      payload.append("isVerified", String(formData.isVerified));
      payload.append("order", Number(formData.order || 0));

      if (imageFile) {
        payload.append("image", imageFile);
      } else if (formData.image) {
        payload.append("image", formData.image);
      }

      const url = editingId ? `${API_BASE}/${editingId}` : API_BASE;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: payload,
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setNotice(
          editingId
            ? "Testimonial updated successfully!"
            : "Testimonial created successfully!"
        );
        handleCloseModal();
        await fetchTestimonials();
      } else {
        setNotice(json.message || "Failed to save testimonial.");
      }
    } catch (err) {
      console.error("Save error:", err);
      setNotice("Network error while saving testimonial.");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Testimonial
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the testimonial from "${name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setNotice(`Testimonial from "${name}" was deleted.`);
        await fetchTestimonials();
      } else {
        setNotice(json.message || "Failed to delete testimonial.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setNotice("Server error deleting testimonial.");
    }
  };

  return (
    <div className="Admin-Testimonial">
      {/* Notice Banner */}
      {notice && (
        <div className="Admin-Testimonial-notice">
          <span>{notice}</span>
          <button type="button" onClick={() => setNotice("")} aria-label="Close">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <section className="Admin-Testimonial-stats">
        <div className="Admin-Testimonial-stat-card stat-total">
          <div className="stat-icon">
            <MessageSquareQuote size={26} />
          </div>
          <div className="stat-info">
            <span>Total Testimonials</span>
            <strong>{totalCount}</strong>
            <small>Database records</small>
          </div>
        </div>

        <div className="Admin-Testimonial-stat-card stat-active">
          <div className="stat-icon">
            <CheckCircle2 size={26} />
          </div>
          <div className="stat-info">
            <span>Active Reviews</span>
            <strong>{activeCount}</strong>
            <small>Visible on website</small>
          </div>
        </div>

        <div className="Admin-Testimonial-stat-card stat-rating">
          <div className="stat-icon">
            <Star size={26} />
          </div>
          <div className="stat-info">
            <span>5-Star Reviews</span>
            <strong>{fiveStarCount}</strong>
            <small>Top rated experiences</small>
          </div>
        </div>

        <div className="Admin-Testimonial-stat-card stat-verified">
          <div className="stat-icon">
            <ShieldCheck size={26} />
          </div>
          <div className="stat-info">
            <span>Verified Travellers</span>
            <strong>{verifiedCount}</strong>
            <small>With verified badge</small>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="Admin-Testimonial-toolbar">
        <div className="toolbar-search">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search by traveller name, role, quote..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button type="button" onClick={() => setSearchTerm("")}>
              <X size={15} />
            </button>
          )}
        </div>

        <div className="toolbar-select">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="toolbar-select">
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            <option>All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
          </select>
        </div>

        {(searchTerm || statusFilter !== "All Status" || ratingFilter !== "All Ratings") && (
          <button
            type="button"
            className="toolbar-reset-btn"
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("All Status");
              setRatingFilter("All Ratings");
            }}
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        )}

        <button
          type="button"
          className="toolbar-add-btn"
          onClick={handleOpenAdd}
        >
          <Plus size={18} />
          <span>Add Testimonial</span>
        </button>
      </section>

      {/* Testimonials Table / List View */}
      <section className="Admin-Testimonial-table-wrapper">
        {loading ? (
          <div className="Admin-Testimonial-loading">
            <div className="spinner" />
            <p>Loading testimonials from database...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="Admin-Testimonial-empty">
            <MessageSquareQuote size={48} />
            <h3>No Testimonials Found</h3>
            <p>There are no testimonials matching your filter. Click "+ Add Testimonial" to create one.</p>
            <button type="button" className="toolbar-add-btn" onClick={handleOpenAdd}>
              <Plus size={16} /> Add Testimonial
            </button>
          </div>
        ) : (
          <table className="Admin-Testimonial-table">
            <thead>
              <tr>
                <th>Traveller</th>
                <th>Role & Location</th>
                <th>Rating</th>
                <th>Quote / Review</th>
                <th>Verified</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item._id || item.id}>
                  <td>
                    <div className="traveller-cell">
                      <div className="traveller-avatar">
                        {item.image ? (
                          <img src={item.image} alt={item.name} />
                        ) : (
                          <span>{item.name ? item.name.charAt(0) : "U"}</span>
                        )}
                      </div>
                      <div>
                        <strong className="traveller-name">{item.name}</strong>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="role-cell">
                      <span className="role-badge">{item.role || "Traveller"}</span>
                      <small className="location-text">
                        <MapPin size={11} /> {item.location || "Odisha, India"}
                      </small>
                    </div>
                  </td>
                  <td>
                    <div className="rating-stars">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          size={14}
                          className={idx < (item.rating || 5) ? "star-filled" : "star-empty"}
                        />
                      ))}
                      <span>{(item.rating || 5).toFixed(1)}</span>
                    </div>
                  </td>
                  <td>
                    <p className="quote-cell">"{item.review}"</p>
                  </td>
                  <td>
                    {item.isVerified ? (
                      <span className="badge-verified">
                        <CheckCircle2 size={12} /> Verified
                      </span>
                    ) : (
                      <span className="badge-standard">Standard</span>
                    )}
                  </td>
                  <td>
                    <span className={`status-pill ${item.status === "Active" ? "status-active" : "status-inactive"}`}>
                      ● {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        type="button"
                        className="btn-action edit"
                        title="Edit Testimonial"
                        onClick={() => handleOpenEdit(item)}
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        className="btn-action delete"
                        title="Delete Testimonial"
                        onClick={() => handleDelete(item._id || item.id, item.name)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Modal Dialog for Add / Edit */}
      {isModalOpen && (
        <div className="Admin-Testimonial-modal-backdrop" onClick={handleCloseModal}>
          <div
            className="Admin-Testimonial-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-header">
              <div className="modal-title">
                <MessageSquareQuote size={22} />
                <h3>{editingId ? "Edit Testimonial" : "Add New Testimonial"}</h3>
              </div>
              <button
                type="button"
                className="modal-close"
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-grid">
                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name">Traveller Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Mohanty"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                {/* Role / Designation */}
                <div className="form-group">
                  <label htmlFor="role">Role / Category *</label>
                  <input
                    id="role"
                    name="role"
                    type="text"
                    placeholder="e.g. Nature Explorer, Wildlife Enthusiast"
                    value={formData.role}
                    onChange={handleChange}
                  />
                </div>

                {/* Location */}
                <div className="form-group">
                  <label htmlFor="location">Location *</label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="e.g. Odisha, India or Bhubaneswar"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                {/* Rating */}
                <div className="form-group">
                  <label htmlFor="rating">Rating (1 to 5 Stars)</label>
                  <select
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                  >
                    <option value={5}>5.0 - Excellent (★★★★★)</option>
                    <option value={4}>4.0 - Very Good (★★★★☆)</option>
                    <option value={3}>3.0 - Average (★★★☆☆)</option>
                    <option value={2}>2.0 - Fair (★★☆☆☆)</option>
                    <option value={1}>1.0 - Poor (★☆☆☆☆)</option>
                  </select>
                </div>
              </div>

              {/* Review / Quote */}
              <div className="form-group full-width">
                <label htmlFor="review">Traveller Quote / Review *</label>
                <textarea
                  id="review"
                  name="review"
                  rows={4}
                  required
                  placeholder="Share the traveller's authentic safari experience..."
                  value={formData.review}
                  onChange={handleChange}
                />
              </div>

              {/* Photo Upload & Preview */}
              <div className="form-group full-width photo-upload-group">
                <label>Traveller Photo / Avatar</label>
                <div className="photo-upload-container">
                  <div className="photo-preview">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" />
                    ) : (
                      <div className="photo-placeholder">
                        <User size={32} />
                      </div>
                    )}
                  </div>
                  <div className="photo-inputs">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    <button
                      type="button"
                      className="upload-btn"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload size={15} /> Upload Photo
                    </button>
                    <span className="photo-or">or Image URL:</span>
                    <input
                      type="url"
                      name="image"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.image}
                      onChange={(e) => {
                        handleChange(e);
                        setImagePreview(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Toggles: Status & Verified */}
              <div className="form-toggles">
                <div className="toggle-group">
                  <label htmlFor="status">Display Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active (Visible)</option>
                    <option value="Inactive">Inactive (Hidden)</option>
                  </select>
                </div>

                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="isVerified"
                      checked={formData.isVerified}
                      onChange={handleChange}
                    />
                    <span>Mark as Verified Traveller</span>
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-btn-cancel"
                  onClick={handleCloseModal}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="modal-btn-save"
                  disabled={submitting}
                >
                  <Sparkles size={16} />
                  <span>{submitting ? "Saving..." : editingId ? "Update Testimonial" : "Save Testimonial"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonial;

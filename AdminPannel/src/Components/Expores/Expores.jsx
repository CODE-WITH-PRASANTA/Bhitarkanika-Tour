import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import "./Expores.css";

/* ---------------------------------- Icons --------------------------------- */
const ICONS = {
  plus: <path d="M12 5v14M5 12h14" />,
  layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  ),
  refresh: (
    <>
      <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
      <path d="M21 3v5h-5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  edit: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),
  save: (
    <>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <path d="M17 21v-8H7v8M7 3v5h8" />
    </>
  ),
  upload: (
    <>
      <path d="M20 16.6A5 5 0 0 0 18 7h-1.3A8 8 0 1 0 4 15.3" />
      <path d="M12 12v9" />
      <path d="M8 16l4-4 4 4" />
    </>
  ),
  x: <path d="M18 6L6 18M6 6l12 12" />,
  check: <path d="M20 6L9 17l-5-5" />,
  chevL: <path d="M15 18l-6-6 6-6" />,
  chevR: <path d="M9 18l6-6-6-6" />,
  chevD: <path d="M6 9l6 6 6-6" />,
  alert: (
    <>
      <path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4M12 17h.01" />
    </>
  ),
  leaf: (
    <>
      <path d="M11 20A7 7 0 0 1 4 13c0-5 5-9 16-10-1 11-5 17-9 17z" />
      <path d="M4 21c3-6 6-9 10-11" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.2 7.8 14.1 14.1 7.8 16.2 9.9 9.9 16.2 7.8" />
    </>
  ),
  camera: (
    <>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </>
  ),
  paw: (
    <>
      <circle cx="5" cy="11" r="2" />
      <circle cx="9" cy="6" r="2" />
      <circle cx="15" cy="6" r="2" />
      <circle cx="19" cy="11" r="2" />
      <path d="M12 12c-3 0-6 3-6 6 0 2 2 3 4 2 1-.5 1.5-.5 2-.5s1 0 2 .5c2 1 4 0 4-2 0-3-3-6-6-6z" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </>
  ),
};

const Icon = ({ name, size = 18, className = "" }) => (
  <svg
    className={`expores-icon ${className}`}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {ICONS[name]}
  </svg>
);

/* -------------------------------- Constants ------------------------------- */
const STORAGE_KEY = "expores_items_v1";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const DESC_LIMIT = 300;

const CATEGORIES = [
  { value: "Nature & Wildlife", icon: "leaf", tone: "green" },
  { value: "Adventure", icon: "compass", tone: "orange" },
  { value: "Scenic Experience", icon: "camera", tone: "blue" },
  { value: "Wildlife", icon: "paw", tone: "purple" },
];

const getCategory = (value) =>
  CATEGORIES.find((c) => c.value === value) || {
    value,
    icon: "leaf",
    tone: "green",
  };

const img = (seed) => `https://picsum.photos/seed/${seed}/400/300`;

const SEED_ITEMS = [
  {
    id: 1,
    title: "Mangrove Forest",
    shortDesc: "Dense mangrove ecosystem",
    fullDesc:
      "Explore the dense mangrove ecosystem, a rich habitat for birds, fish and countless other species along the tidal creeks.",
    category: "Nature & Wildlife",
    published: true,
    image: img("mangrove-forest"),
    createdAt: Date.now() - 600000,
  },
  {
    id: 2,
    title: "Jungle Trekking",
    shortDesc: "Guided nature trail",
    fullDesc:
      "Walk through guided forest trails with experienced local guides and discover hidden viewpoints and rare plants.",
    category: "Adventure",
    published: true,
    image: img("jungle-trekking"),
    createdAt: Date.now() - 500000,
  },
  {
    id: 3,
    title: "Skywalk View",
    shortDesc: "Panoramic nature view",
    fullDesc:
      "Enjoy a breathtaking panoramic view of the canopy and river from the elevated skywalk platform.",
    category: "Scenic Experience",
    published: true,
    image: img("skywalk-view"),
    createdAt: Date.now() - 400000,
  },
  {
    id: 4,
    title: "Monitor Lizard",
    shortDesc: "Wildlife observation",
    fullDesc:
      "Discover the fascinating water monitor lizard, one of the interesting reptiles found in the region.",
    category: "Wildlife",
    published: true,
    image: img("monitor-lizard"),
    createdAt: Date.now() - 300000,
  },
  {
    id: 5,
    title: "Spotted Deer",
    shortDesc: "Natural wildlife habitat",
    fullDesc:
      "Watch herds of spotted deer graze peacefully in their natural habitat during early morning safaris.",
    category: "Wildlife",
    published: true,
    image: img("spotted-deer"),
    createdAt: Date.now() - 200000,
  },
  {
    id: 6,
    title: "Saltwater Crocodile",
    shortDesc: "Saltwater crocodile habitat",
    fullDesc:
      "Observe the mighty saltwater crocodile from a safe distance in its natural estuarine habitat.",
    category: "Wildlife",
    published: true,
    image: img("saltwater-crocodile"),
    createdAt: Date.now() - 100000,
  },
];

const EMPTY_FORM = {
  title: "",
  shortDesc: "",
  fullDesc: "",
  category: "",
  published: true,
  image: "",
};

const loadItems = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    /* ignore */
  }
  return SEED_ITEMS;
};

const formatDate = (ts) =>
  new Date(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

/* ------------------------------- Thumbnail -------------------------------- */
const Thumb = ({ src, alt, className = "" }) => {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (!src || failed) {
    return (
      <div className={`expores-thumb-fallback ${className}`}>
        <Icon name="image" size={22} />
      </div>
    );
  }
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
};

/* -------------------------------- Component ------------------------------- */
const Expores = () => {
  const [items, setItems] = useState(loadItems);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [selected, setSelected] = useState([]);

  const [viewItem, setViewItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null); // item | "bulk"
  const [toast, setToast] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const fileRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const selectAllRef = useRef(null);
  const toastTimer = useRef(null);

  /* persist */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      /* storage full – ignore */
    }
  }, [items]);

  /* toast */
  const showToast = useCallback((message, type = "success") => {
    clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }, []);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  /* modal: esc + scroll lock */
  const modalOpen = Boolean(viewItem || deleteTarget);
  useEffect(() => {
    if (!modalOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setViewItem(null);
        setDeleteTarget(null);
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [modalOpen]);

  /* filtering */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((it) => {
      const matchQ =
        !q ||
        it.title.toLowerCase().includes(q) ||
        it.shortDesc.toLowerCase().includes(q) ||
        (it.fullDesc || "").toLowerCase().includes(q) ||
        it.category.toLowerCase().includes(q);
      const matchC = catFilter === "all" || it.category === catFilter;
      const matchS =
        statusFilter === "all" ||
        (statusFilter === "published" ? it.published : !it.published);
      return matchQ && matchC && matchS;
    });
  }, [items, search, catFilter, statusFilter]);

  /* pagination */
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const startIndex = (page - 1) * perPage;
  const pageItems = filtered.slice(startIndex, startIndex + perPage);
  const showingFrom = filtered.length === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + perPage, filtered.length);

  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = new Set([1, totalPages, page - 1, page, page + 1]);
    const list = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
    const out = [];
    list.forEach((p, i) => {
      if (i > 0 && p - list[i - 1] > 1) out.push("...");
      out.push(p);
    });
    return out;
  }, [page, totalPages]);

  /* selection */
  const allOnPageSelected =
    pageItems.length > 0 && pageItems.every((it) => selected.includes(it.id));
  const someOnPageSelected = pageItems.some((it) => selected.includes(it.id));
  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someOnPageSelected && !allOnPageSelected;
    }
  }, [someOnPageSelected, allOnPageSelected]);

  const toggleSelectAll = () => {
    const ids = pageItems.map((it) => it.id);
    setSelected((prev) =>
      allOnPageSelected ? prev.filter((id) => !ids.includes(id)) : [...new Set([...prev, ...ids])]
    );
  };
  const toggleSelect = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  /* form handlers */
  const updateField = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const handleFile = (file) => {
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrors((e) => ({ ...e, image: "Only JPG, PNG or WEBP images are allowed" }));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrors((e) => ({ ...e, image: "Image must be smaller than 5 MB" }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, image: reader.result }));
      setErrors((e) => ({ ...e, image: undefined }));
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files && e.dataTransfer.files[0]);
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setForm((f) => ({ ...f, image: "" }));
    if (fileRef.current) fileRef.current.value = "";
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setEditingId(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = "Title is required";
    if (!form.shortDesc.trim()) err.shortDesc = "Short description is required";
    if (form.fullDesc.length > DESC_LIMIT) err.fullDesc = `Maximum ${DESC_LIMIT} characters`;
    if (!form.category) err.category = "Please select a category";
    if (!form.image) err.image = "Feature image is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please fix the highlighted fields", "error");
      return;
    }
    const payload = {
      title: form.title.trim(),
      shortDesc: form.shortDesc.trim(),
      fullDesc: form.fullDesc.trim(),
      category: form.category,
      published: form.published,
      image: form.image,
    };

    if (editingId !== null) {
      setItems((prev) => prev.map((it) => (it.id === editingId ? { ...it, ...payload } : it)));
      showToast("Item updated successfully");
    } else {
      const newItem = { id: Date.now(), createdAt: Date.now(), ...payload };
      setItems((prev) => [newItem, ...prev]);
      // make sure the new row is visible on the right side
      setSearch("");
      setCatFilter("all");
      setStatusFilter("all");
      setPage(1);
      showToast("Item added successfully");
    }
    resetForm();
  };

  /* table actions */
  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      shortDesc: item.shortDesc,
      fullDesc: item.fullDesc || "",
      category: item.category,
      published: item.published,
      image: item.image,
    });
    setErrors({});
    setViewItem(null);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setTimeout(() => titleRef.current && titleRef.current.focus({ preventScroll: true }), 350);
  };

  const handleAddNew = () => {
    resetForm();
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setTimeout(() => titleRef.current && titleRef.current.focus({ preventScroll: true }), 350);
  };

  const toggleStatus = (item) => {
    setItems((prev) =>
      prev.map((it) => (it.id === item.id ? { ...it, published: !it.published } : it))
    );
    showToast(item.published ? "Item moved to draft" : "Item published");
  };

  const confirmDelete = () => {
    if (deleteTarget === "bulk") {
      setItems((prev) => prev.filter((it) => !selected.includes(it.id)));
      if (editingId !== null && selected.includes(editingId)) resetForm();
      showToast(`${selected.length} item(s) deleted`);
      setSelected([]);
    } else if (deleteTarget) {
      setItems((prev) => prev.filter((it) => it.id !== deleteTarget.id));
      setSelected((prev) => prev.filter((id) => id !== deleteTarget.id));
      if (editingId === deleteTarget.id) resetForm();
      showToast("Item deleted successfully");
    }
    setDeleteTarget(null);
  };

  const handleRefresh = () => {
    setSpinning(true);
    setItems(loadItems());
    setSelected([]);
    setTimeout(() => setSpinning(false), 700);
    showToast("List refreshed");
  };

  const handleReset = () => {
    setSearch("");
    setCatFilter("all");
    setStatusFilter("all");
    setPage(1);
  };

  const hasFilters = search || catFilter !== "all" || statusFilter !== "all";
  const selectedCat = form.category ? getCategory(form.category) : null;

  /* --------------------------------- Render -------------------------------- */
  return (
    <div className="expores-page">
      <div className="expores-layout">
        {/* ============================ LEFT : FORM ============================ */}
        <aside className="expores-form-card" ref={formRef}>
          <div className="expores-form-header">
            <span className="expores-form-header-icon">
              <Icon name={editingId !== null ? "edit" : "plus"} size={18} />
            </span>
            <h2 className="expores-form-title">
              {editingId !== null ? "Edit Explore Item" : "Add Explore Item"}
            </h2>
          </div>

          <form className="expores-form" onSubmit={handleSave} noValidate>
            <div className="expores-field">
              <label className="expores-label" htmlFor="expores-title">
                Title <span className="expores-required">*</span>
              </label>
              <input
                id="expores-title"
                ref={titleRef}
                className={`expores-input ${errors.title ? "expores-input-error" : ""}`}
                type="text"
                placeholder="Enter title"
                value={form.title}
                maxLength={80}
                onChange={(e) => updateField("title", e.target.value)}
              />
              {errors.title && <span className="expores-error-text">{errors.title}</span>}
            </div>

            <div className="expores-field">
              <label className="expores-label" htmlFor="expores-short">
                Short Description <span className="expores-required">*</span>
              </label>
              <input
                id="expores-short"
                className={`expores-input ${errors.shortDesc ? "expores-input-error" : ""}`}
                type="text"
                placeholder="Enter short description"
                value={form.shortDesc}
                maxLength={80}
                onChange={(e) => updateField("shortDesc", e.target.value)}
              />
              {errors.shortDesc && <span className="expores-error-text">{errors.shortDesc}</span>}
            </div>

            <div className="expores-field">
              <label className="expores-label" htmlFor="expores-full">
                Full Description
              </label>
              <textarea
                id="expores-full"
                className={`expores-textarea ${errors.fullDesc ? "expores-input-error" : ""}`}
                placeholder="Enter full description"
                rows={4}
                value={form.fullDesc}
                maxLength={DESC_LIMIT}
                onChange={(e) => updateField("fullDesc", e.target.value)}
              />
              <span className="expores-counter">
                {form.fullDesc.length} / {DESC_LIMIT}
              </span>
              {errors.fullDesc && <span className="expores-error-text">{errors.fullDesc}</span>}
            </div>

            <div className="expores-field">
              <label className="expores-label" htmlFor="expores-category">
                Category <span className="expores-required">*</span>
              </label>
              <div className={`expores-select-wrap ${errors.category ? "expores-input-error" : ""}`}>
                {selectedCat && (
                  <span className={`expores-select-icon expores-tone-${selectedCat.tone}`}>
                    <Icon name={selectedCat.icon} size={15} />
                  </span>
                )}
                <select
                  id="expores-category"
                  className={`expores-select ${selectedCat ? "expores-select-has-icon" : ""}`}
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.value}
                    </option>
                  ))}
                </select>
                <Icon name="chevD" size={16} className="expores-select-arrow" />
              </div>
              {errors.category && <span className="expores-error-text">{errors.category}</span>}
            </div>

            <div className="expores-field expores-field-inline">
              <span className="expores-label">
                Status <span className="expores-required">*</span>
              </span>
              <div className="expores-switch-row">
                <button
                  type="button"
                  role="switch"
                  aria-checked={form.published}
                  className={`expores-switch ${form.published ? "expores-switch-on" : ""}`}
                  onClick={() => updateField("published", !form.published)}
                >
                  <span className="expores-switch-knob" />
                </button>
                <span className="expores-switch-text">
                  {form.published ? "Publish (Show on Website)" : "Draft (Hidden on Website)"}
                </span>
              </div>
            </div>

            <div className="expores-field">
              <span className="expores-label">
                Feature Image <span className="expores-required">*</span>
              </span>
              <div
                className={`expores-upload ${dragActive ? "expores-upload-active" : ""} ${
                  errors.image ? "expores-upload-error" : ""
                }`}
                onClick={() => fileRef.current && fileRef.current.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={onDrop}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileRef.current && fileRef.current.click();
                  }
                }}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  className="expores-file-input"
                  onChange={(e) => handleFile(e.target.files[0])}
                />
                <div className="expores-upload-text">
                  <Icon name="upload" size={30} className="expores-upload-icon" />
                  <p className="expores-upload-title">Drag &amp; drop an image here, or click to select</p>
                  <p className="expores-upload-hint">JPG, PNG, WEBP (Max 5 MB)</p>
                </div>
                {form.image && (
                  <div className="expores-preview">
                    <Thumb src={form.image} alt="Preview" className="expores-preview-img" />
                    <button
                      type="button"
                      className="expores-preview-remove"
                      onClick={removeImage}
                      aria-label="Remove image"
                    >
                      <Icon name="x" size={12} />
                    </button>
                  </div>
                )}
              </div>
              {errors.image && <span className="expores-error-text">{errors.image}</span>}
            </div>

            <div className="expores-form-actions">
              <button type="submit" className="expores-btn expores-btn-primary">
                <Icon name="save" size={17} />
                {editingId !== null ? "Update Item" : "Save Item"}
              </button>
              <button type="button" className="expores-btn expores-btn-outline" onClick={resetForm}>
                <Icon name="refresh" size={17} />
                Clear Form
              </button>
            </div>
          </form>
        </aside>

        {/* ============================ RIGHT : LIST =========================== */}
        <section className="expores-list-card">
          <div className="expores-list-header">
            <div className="expores-list-heading">
              <span className="expores-list-heading-icon">
                <Icon name="layers" size={20} />
              </span>
              <h2 className="expores-list-title">Manage Explore Items</h2>
            </div>
            <div className="expores-list-header-actions">
              <button
                type="button"
                className="expores-icon-btn"
                onClick={handleRefresh}
                aria-label="Refresh"
                title="Refresh"
              >
                <Icon name="refresh" size={18} className={spinning ? "expores-spin" : ""} />
              </button>
              <button type="button" className="expores-btn expores-btn-primary expores-btn-add" onClick={handleAddNew}>
                <Icon name="plus" size={17} />
                Add New
              </button>
            </div>
          </div>

          <div className="expores-toolbar">
            <div className="expores-search">
              <Icon name="search" size={17} className="expores-search-icon" />
              <input
                type="text"
                className="expores-search-input"
                placeholder="Search by title, description or category..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
              {search && (
                <button
                  type="button"
                  className="expores-search-clear"
                  onClick={() => {
                    setSearch("");
                    setPage(1);
                  }}
                  aria-label="Clear search"
                >
                  <Icon name="x" size={14} />
                </button>
              )}
            </div>

            <div className="expores-filter">
              <select
                className="expores-filter-select"
                value={catFilter}
                onChange={(e) => {
                  setCatFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.value}
                  </option>
                ))}
              </select>
              <Icon name="chevD" size={15} className="expores-filter-arrow" />
            </div>

            <div className="expores-filter">
              <select
                className="expores-filter-select"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <Icon name="chevD" size={15} className="expores-filter-arrow" />
            </div>

            <button
              type="button"
              className="expores-btn expores-btn-outline expores-btn-reset"
              onClick={handleReset}
              disabled={!hasFilters}
            >
              <Icon name="refresh" size={15} />
              Reset
            </button>
          </div>

          {selected.length > 0 && (
            <div className="expores-bulk">
              <span className="expores-bulk-text">
                <strong>{selected.length}</strong> item{selected.length > 1 ? "s" : ""} selected
              </span>
              <div className="expores-bulk-actions">
                <button type="button" className="expores-bulk-btn" onClick={() => setSelected([])}>
                  Clear
                </button>
                <button
                  type="button"
                  className="expores-bulk-btn expores-bulk-btn-danger"
                  onClick={() => setDeleteTarget("bulk")}
                >
                  <Icon name="trash" size={14} />
                  Delete Selected
                </button>
              </div>
            </div>
          )}

          <div className="expores-table-wrap">
            <table className="expores-table">
              <thead className="expores-thead">
                <tr>
                  <th className="expores-th expores-th-check">
                    <input
                      ref={selectAllRef}
                      type="checkbox"
                      className="expores-checkbox"
                      checked={allOnPageSelected}
                      onChange={toggleSelectAll}
                      aria-label="Select all"
                    />
                  </th>
                  <th className="expores-th">SL.</th>
                  <th className="expores-th">Image</th>
                  <th className="expores-th">Title</th>
                  <th className="expores-th">Category</th>
                  <th className="expores-th">Short Description</th>
                  <th className="expores-th">Status</th>
                  <th className="expores-th expores-th-action">Action</th>
                </tr>
              </thead>
              <tbody className="expores-tbody">
                {pageItems.length === 0 ? (
                  <tr className="expores-tr-empty">
                    <td colSpan={8} className="expores-empty-cell">
                      <div className="expores-empty">
                        <span className="expores-empty-icon">
                          <Icon name="search" size={26} />
                        </span>
                        <h3 className="expores-empty-title">No items found</h3>
                        <p className="expores-empty-text">
                          {hasFilters
                            ? "Try changing your search or filters."
                            : "Add your first explore item using the form."}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  pageItems.map((item, idx) => {
                    const cat = getCategory(item.category);
                    const isSelected = selected.includes(item.id);
                    return (
                      <tr
                        key={item.id}
                        className={`expores-tr ${isSelected ? "expores-tr-selected" : ""} ${
                          editingId === item.id ? "expores-tr-editing" : ""
                        }`}
                      >
                        <td className="expores-td expores-td-check">
                          <input
                            type="checkbox"
                            className="expores-checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelect(item.id)}
                            aria-label={`Select ${item.title}`}
                          />
                        </td>
                        <td className="expores-td expores-td-sl" data-label="SL.">
                          {startIndex + idx + 1}
                        </td>
                        <td className="expores-td expores-td-image" data-label="Image">
                          <Thumb src={item.image} alt={item.title} className="expores-thumb" />
                        </td>
                        <td className="expores-td expores-td-title" data-label="Title">
                          {item.title}
                        </td>
                        <td className="expores-td" data-label="Category">
                          <span className={`expores-badge expores-tone-${cat.tone}`}>
                            <Icon name={cat.icon} size={13} />
                            {item.category}
                          </span>
                        </td>
                        <td className="expores-td expores-td-desc" data-label="Short Description">
                          {item.shortDesc}
                        </td>
                        <td className="expores-td" data-label="Status">
                          <button
                            type="button"
                            className={`expores-status ${
                              item.published ? "expores-status-published" : "expores-status-draft"
                            }`}
                            onClick={() => toggleStatus(item)}
                            title="Click to toggle status"
                          >
                            <span className="expores-status-dot" />
                            {item.published ? "Published" : "Draft"}
                          </button>
                        </td>
                        <td className="expores-td expores-td-action" data-label="Action">
                          <div className="expores-actions">
                            <button
                              type="button"
                              className="expores-action expores-action-view"
                              onClick={() => setViewItem(item)}
                              title="View"
                              aria-label={`View ${item.title}`}
                            >
                              <Icon name="eye" size={16} />
                            </button>
                            <button
                              type="button"
                              className="expores-action expores-action-edit"
                              onClick={() => startEdit(item)}
                              title="Edit"
                              aria-label={`Edit ${item.title}`}
                            >
                              <Icon name="edit" size={16} />
                            </button>
                            <button
                              type="button"
                              className="expores-action expores-action-delete"
                              onClick={() => setDeleteTarget(item)}
                              title="Delete"
                              aria-label={`Delete ${item.title}`}
                            >
                              <Icon name="trash" size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="expores-footer">
            <span className="expores-showing">
              Showing {showingFrom} – {showingTo} of {filtered.length} item
              {filtered.length === 1 ? "" : "s"}
            </span>

            <div className="expores-footer-right">
              <label className="expores-rows">
                <span className="expores-rows-label">Rows per page:</span>
                <span className="expores-rows-select-wrap">
                  <select
                    className="expores-rows-select"
                    value={perPage}
                    onChange={(e) => {
                      setPerPage(Number(e.target.value));
                      setPage(1);
                    }}
                  >
                    {[5, 10, 20, 50].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <Icon name="chevD" size={14} className="expores-rows-arrow" />
                </span>
              </label>

              <nav className="expores-pagination" aria-label="Pagination">
                <button
                  type="button"
                  className="expores-page-btn expores-page-nav"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <Icon name="chevL" size={14} />
                  <span className="expores-page-nav-text">Previous</span>
                </button>

                {pageNumbers.map((p, i) =>
                  p === "..." ? (
                    <span key={`dots-${i}`} className="expores-page-dots">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      type="button"
                      className={`expores-page-btn ${p === page ? "expores-page-active" : ""}`}
                      onClick={() => setPage(p)}
                      aria-current={p === page ? "page" : undefined}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  type="button"
                  className="expores-page-btn expores-page-nav"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  <span className="expores-page-nav-text">Next</span>
                  <Icon name="chevR" size={14} />
                </button>
              </nav>
            </div>
          </div>
        </section>
      </div>

      {/* ============================= VIEW POPUP ============================ */}
      {viewItem && (
        <div className="expores-modal-overlay" onClick={() => setViewItem(null)}>
          <div
            className="expores-modal expores-modal-view"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="expores-modal-close"
              onClick={() => setViewItem(null)}
              aria-label="Close"
            >
              <Icon name="x" size={18} />
            </button>

            <div className="expores-modal-cover">
              <Thumb src={viewItem.image} alt={viewItem.title} className="expores-modal-cover-img" />
            </div>

            <div className="expores-modal-body">
              <div className="expores-modal-tags">
                <span className={`expores-badge expores-tone-${getCategory(viewItem.category).tone}`}>
                  <Icon name={getCategory(viewItem.category).icon} size={13} />
                  {viewItem.category}
                </span>
                <span
                  className={`expores-status ${
                    viewItem.published ? "expores-status-published" : "expores-status-draft"
                  } expores-status-static`}
                >
                  <span className="expores-status-dot" />
                  {viewItem.published ? "Published" : "Draft"}
                </span>
              </div>

              <h3 className="expores-modal-title">{viewItem.title}</h3>
              <p className="expores-modal-short">{viewItem.shortDesc}</p>

              <div className="expores-modal-section">
                <h4 className="expores-modal-label">Full Description</h4>
                <p className="expores-modal-text">
                  {viewItem.fullDesc || "No full description provided."}
                </p>
              </div>

              <div className="expores-modal-meta">
                <span>Added on {formatDate(viewItem.createdAt || Date.now())}</span>
              </div>

              <div className="expores-modal-footer">
                <button
                  type="button"
                  className="expores-btn expores-btn-outline"
                  onClick={() => setViewItem(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="expores-btn expores-btn-primary"
                  onClick={() => startEdit(viewItem)}
                >
                  <Icon name="edit" size={16} />
                  Edit Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================== DELETE POPUP ============================ */}
      {deleteTarget && (
        <div className="expores-modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div
            className="expores-modal expores-modal-confirm"
            role="alertdialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="expores-confirm-icon">
              <Icon name="alert" size={28} />
            </span>
            <h3 className="expores-confirm-title">
              {deleteTarget === "bulk" ? "Delete selected items?" : "Delete this item?"}
            </h3>
            <p className="expores-confirm-text">
              {deleteTarget === "bulk" ? (
                <>
                  You are about to delete <strong>{selected.length}</strong> item
                  {selected.length > 1 ? "s" : ""}. This action cannot be undone.
                </>
              ) : (
                <>
                  <strong>{deleteTarget.title}</strong> will be permanently removed. This action
                  cannot be undone.
                </>
              )}
            </p>
            <div className="expores-confirm-actions">
              <button
                type="button"
                className="expores-btn expores-btn-outline"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button type="button" className="expores-btn expores-btn-danger" onClick={confirmDelete}>
                <Icon name="trash" size={16} />
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================== TOAST ================================ */}
      {toast && (
        <div className={`expores-toast expores-toast-${toast.type}`} role="status">
          <Icon name={toast.type === "error" ? "alert" : "check"} size={17} />
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default Expores;

import React, { useRef, useState } from "react";
import {
  Images,
  Plus,
  Folder,
  MapPin,
  Upload,
  RotateCcw,
  Save,
  Search,
  Pencil,
  Trash2,
  Image as ImageIcon,
  X,
} from "lucide-react";

import "./Gallary.css";

const GallaryCategories = [
  "Wildlife",
  "Birds",
  "Boating",
  "Nature",
  "Waterfalls",
  "Beach",
  "Temple",
  "Adventure",
  "Other",
];

const GallarySampleData = [
  {
    id: 1,
    title: "Mountain Escape",
    category: "Nature",
    location: "Eastern Himalayas",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    title: "Tropical Paradise",
    category: "Beach",
    location: "Puri Beach, Odisha",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    title: "Forest Adventure",
    category: "Wildlife",
    location: "Similipal National Park",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=80",
  },
];

const GallaryEmptyForm = {
  title: "",
  category: "",
  location: "",
  image: "",
};

const Gallary = () => {
  const [gallaryItems, setGallaryItems] = useState(GallarySampleData);
  const [gallaryForm, setGallaryForm] = useState({ ...GallaryEmptyForm });
  const [gallarySearch, setGallarySearch] = useState("");
  const [gallaryEditingId, setGallaryEditingId] = useState(null);
  const [gallaryNotice, setGallaryNotice] = useState("");

  const gallaryFileInputRef = useRef(null);
  const gallaryFormRef = useRef(null);

  const gallaryFilteredItems = gallaryItems.filter((item) => {
    const query = gallarySearch.trim().toLowerCase();

    return (
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query)
    );
  });

  const gallaryHandleChange = (event) => {
    const { name, value } = event.target;

    setGallaryForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const gallaryHandleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setGallaryNotice("Please select a JPG, PNG, or WEBP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setGallaryNotice("Please select an image smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setGallaryForm((previous) => ({
        ...previous,
        image: reader.result,
      }));
      setGallaryNotice("");
    };

    reader.onerror = () => {
      setGallaryNotice("Unable to read the selected image.");
    };

    reader.readAsDataURL(file);
  };

  const gallaryResetForm = () => {
    setGallaryForm({ ...GallaryEmptyForm });
    setGallaryEditingId(null);
    setGallaryNotice("");

    if (gallaryFileInputRef.current) {
      gallaryFileInputRef.current.value = "";
    }
  };

  const gallaryHandleSave = (event) => {
    event.preventDefault();

    if (
      !gallaryForm.title.trim() ||
      !gallaryForm.category ||
      !gallaryForm.location.trim() ||
      !gallaryForm.image
    ) {
      setGallaryNotice(
        "Please complete all fields and upload a gallery image."
      );
      return;
    }

    const photograph = {
      id: gallaryEditingId ?? Date.now(),
      title: gallaryForm.title.trim(),
      category: gallaryForm.category,
      location: gallaryForm.location.trim(),
      image: gallaryForm.image,
    };

    if (gallaryEditingId !== null) {
      setGallaryItems((previous) =>
        previous.map((item) =>
          item.id === gallaryEditingId ? photograph : item
        )
      );
      setGallaryNotice("Gallery photograph updated successfully.");
    } else {
      setGallaryItems((previous) => [...previous, photograph]);
      setGallaryNotice("Gallery photograph added successfully.");
    }

    gallaryResetForm();
  };

  const gallaryHandleEdit = (item) => {
    setGallaryForm({
      title: item.title,
      category: item.category,
      location: item.location,
      image: item.image,
    });

    setGallaryEditingId(item.id);
    setGallaryNotice("");

    if (gallaryFileInputRef.current) {
      gallaryFileInputRef.current.value = "";
    }

    gallaryFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const gallaryHandleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this photograph?"
    );

    if (!confirmed) return;

    setGallaryItems((previous) =>
      previous.filter((item) => item.id !== id)
    );

    if (gallaryEditingId === id) {
      gallaryResetForm();
    }

    setGallaryNotice("Gallery photograph deleted successfully.");
  };

  const gallaryClearSearch = () => {
    setGallarySearch("");
  };

  return (
    <main className="Gallary">
      {/* PAGE HEADER */}
      

      {/* NOTIFICATION */}
      {gallaryNotice && (
        <div className="Gallary-notice" role="status">
          <span>{gallaryNotice}</span>

          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => setGallaryNotice("")}
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* ADD / EDIT GALLERY FORM */}
      <section
        className="Gallary-panel Gallary-form-panel"
        id="Gallary-form"
        ref={gallaryFormRef}
      >
        <div className="Gallary-panel-heading">
          <div className="Gallary-section-icon">
            <Plus size={26} />
          </div>

          <div>
            <h2>
              {gallaryEditingId !== null
                ? "Edit Gallery Photograph"
                : "Add Gallery Photograph"}
            </h2>
            <p>Enter the photograph details and upload an image.</p>
          </div>
        </div>

        <form
          className="Gallary-form"
          onSubmit={gallaryHandleSave}
        >
          <div className="Gallary-form-grid">
            <div className="Gallary-form-group">
              <label htmlFor="Gallary-title">
                Photograph Title <span className="Gallary-required">*</span>
              </label>

              <input
                id="Gallary-title"
                name="title"
                type="text"
                placeholder="Enter photograph title"
                value={gallaryForm.title}
                onChange={gallaryHandleChange}
                required
              />
            </div>

            <div className="Gallary-form-group">
              <label htmlFor="Gallary-category">
                <Folder size={17} />
                Category <span className="Gallary-required">*</span>
              </label>

              <select
                id="Gallary-category"
                name="category"
                value={gallaryForm.category}
                onChange={gallaryHandleChange}
                required
              >
                <option value="">Choose category</option>

                {GallaryCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="Gallary-form-group">
              <label htmlFor="Gallary-location">
                <MapPin size={17} />
                Location <span className="Gallary-required">*</span>
              </label>

              <input
                id="Gallary-location"
                name="location"
                type="text"
                placeholder="Enter destination or location"
                value={gallaryForm.location}
                onChange={gallaryHandleChange}
                required
              />
            </div>
          </div>

          {/* IMAGE UPLOAD AND PREVIEW */}
          <div className="Gallary-image-group">
            <label className="Gallary-image-label">
              <Images size={18} />
              Gallery Image <span className="Gallary-required">*</span>
            </label>

            <div className="Gallary-upload-grid">
              <input
                ref={gallaryFileInputRef}
                className="Gallary-hidden-file-input"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={gallaryHandleImageUpload}
                aria-label="Choose gallery image"
              />

              <button
                type="button"
                className="Gallary-upload-box"
                onClick={() => gallaryFileInputRef.current?.click()}
              >
                <span className="Gallary-upload-icon">
                  <Upload size={29} />
                </span>

                <strong>
                  {gallaryForm.image
                    ? "Change Gallery Image"
                    : "Upload Gallery Image"}
                </strong>

                <span>
                  Click to browse your device
                </span>

                <small>JPG, PNG or WEBP · Maximum 5 MB</small>
              </button>

              <div className="Gallary-image-preview">
                {gallaryForm.image ? (
                  <>
                    <img
                      src={gallaryForm.image}
                      alt="Selected gallery preview"
                    />

                    <div className="Gallary-preview-overlay">
                      <span>Image Preview</span>

                      <button
                        type="button"
                        aria-label="Remove selected image"
                        onClick={() =>
                          setGallaryForm((previous) => ({
                            ...previous,
                            image: "",
                          }))
                        }
                      >
                        <X size={17} />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="Gallary-preview-placeholder">
                    <ImageIcon size={38} />
                    <strong>No image selected</strong>
                    <span>Your image preview will appear here.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* FORM ACTIONS */}
          <div className="Gallary-form-actions">
            <button
              type="button"
              className="Gallary-button Gallary-button-reset"
              onClick={gallaryResetForm}
            >
              <RotateCcw size={17} />
              Reset
            </button>

            <button
              type="submit"
              className="Gallary-button Gallary-button-save"
            >
              {gallaryEditingId !== null ? (
                <Save size={18} />
              ) : (
                <Plus size={19} />
              )}

              {gallaryEditingId !== null
                ? "Update Photograph"
                : "Save Photograph"}
            </button>
          </div>
        </form>
      </section>

      {/* GALLERY TABLE */}
      <section className="Gallary-panel Gallary-table-panel">
        <div className="Gallary-table-heading">
          <div className="Gallary-table-title">
            <div className="Gallary-section-icon">
              <Images size={25} />
            </div>

            <div>
              <h2>Gallery Photographs</h2>
              <p>View, search, edit, and manage uploaded photographs.</p>
            </div>
          </div>

          <div className="Gallary-search-box">
            <Search size={19} />

            <input
              type="search"
              placeholder="Search by title, category or location..."
              value={gallarySearch}
              onChange={(event) =>
                setGallarySearch(event.target.value)
              }
              aria-label="Search gallery photographs"
            />

            {gallarySearch && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={gallaryClearSearch}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="Gallary-table-scroll">
          <table className="Gallary-table">
            <thead>
              <tr>
                <th className="Gallary-serial-column">SL. NO.</th>
                <th>IMAGE</th>
                <th>TITLE</th>
                <th>CATEGORY</th>
                <th>LOCATION</th>
                <th className="Gallary-action-column">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {gallaryFilteredItems.length > 0 ? (
                gallaryFilteredItems.map((item, index) => (
                  <tr key={item.id}>
                    <td className="Gallary-serial-column">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    <td>
                      <img
                        className="Gallary-table-image"
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                      />
                    </td>

                    <td className="Gallary-photo-name">
                      <strong>{item.title}</strong>
                    </td>

                    <td>
                      <span
                        className={`Gallary-category-badge Gallary-category-${item.category
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {item.category}
                      </span>
                    </td>

                    <td>
                      <div className="Gallary-location-text">
                        <MapPin size={17} />
                        <span>{item.location}</span>
                      </div>
                    </td>

                    <td>
                      <div className="Gallary-row-actions">
                        <button
                          type="button"
                          className="Gallary-icon-button Gallary-edit-button"
                          title="Edit photograph"
                          aria-label={`Edit ${item.title}`}
                          onClick={() => gallaryHandleEdit(item)}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          className="Gallary-icon-button Gallary-delete-button"
                          title="Delete photograph"
                          aria-label={`Delete ${item.title}`}
                          onClick={() => gallaryHandleDelete(item.id)}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="Gallary-empty-state">
                    <Images size={36} />
                    <strong>No photographs found</strong>
                    <p>
                      {gallarySearch
                        ? "Try another search term."
                        : "Add a photograph using the form above."}
                    </p>

                    {gallarySearch && (
                      <button
                        type="button"
                        onClick={gallaryClearSearch}
                      >
                        Clear search
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="Gallary-table-footer">
          <span>
            Showing <strong>{gallaryFilteredItems.length}</strong> of{" "}
            <strong>{gallaryItems.length}</strong> photographs
          </span>

          <span className="Gallary-total-count">
            Total photographs: {gallaryItems.length}
          </span>
        </footer>
      </section>
    </main>
  );
};

export default Gallary;

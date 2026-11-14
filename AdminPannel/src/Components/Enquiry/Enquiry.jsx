import React, { useEffect, useMemo, useState } from "react";
import {
  Users,
  FileText,
  Clock3,
  MessageCircle,
  CircleCheck,
  Search,
  Eye,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Mail,
  Phone,
  CheckSquare,
  Square,
  Sparkles,
  RefreshCw,
  Send,
  Calendar,
} from "lucide-react";

import "./Enquiry.css";

const API_ENQUIRY_URL = "http://localhost:5000/api/enquiries";

const normalizeEnquiry = (item) => ({
  ...item,
  id: item._id || item.id,
  tour: item.tour || item.subject || "General Enquiry",
  start: item.start && item.start !== "Not set" ? item.start : "",
  end: item.end && item.end !== "Not set" ? item.end : "",
  travelers: item.travelers || 1,
  status: item.status || "New",
  message: item.message || "",
  date:
    item.date ||
    (item.createdAt
      ? new Date(item.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : ""),
  time:
    item.time ||
    (item.createdAt
      ? new Date(item.createdAt).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : ""),
});

const blankForm = {
  name: "",
  email: "",
  phone: "",
  tour: "",
  start: "",
  end: "",
  travelers: "1",
  status: "New",
  message: "",
};

const statusClass = (status = "New") =>
  `Enquiry-status-${status.toLowerCase().replace(/\s+/g, "-")}`;

const Enquiry = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(blankForm);
  const [toast, setToast] = useState("");
  const [viewRow, setViewRow] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_ENQUIRY_URL);
      const result = await res.json();
      if (res.ok && result.success) {
        setRows((result.data || []).map(normalizeEnquiry));
      }
    } catch {
      notify("Unable to load enquiries from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const filtered = useMemo(() => {
    return rows.filter((row) => {
      const matchesStatus =
        status === "All Status" || row.status === status;

      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        [
          row.name,
          row.email,
          row.phone,
          row.tour,
          row.subject,
          row.message,
          row.status,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [rows, search, status]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const counts = {
    total: rows.length,
    new: rows.filter((row) => row.status === "New").length,
    progress: rows.filter((row) => row.status === "In Progress").length,
    replied: rows.filter((row) => row.status === "Replied").length,
    closed: rows.filter((row) => row.status === "Closed").length,
  };

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  };

  const openNew = () => {
    setForm({ ...blankForm });
    setModal({ type: "new" });
  };

  const convertDateForInput = (dateStr) => {
    if (!dateStr || dateStr === "Not set") return "";
    const parsed = new Date(dateStr);
    if (Number.isNaN(parsed.getTime())) return "";
    return [
      parsed.getFullYear(),
      String(parsed.getMonth() + 1).padStart(2, "0"),
      String(parsed.getDate()).padStart(2, "0"),
    ].join("-");
  };

  const openEdit = (row) => {
    setForm({
      ...row,
      start: convertDateForInput(row.start),
      end: convertDateForInput(row.end),
      travelers: String(row.travelers || 1),
    });
    setModal({
      type: "edit",
      id: row.id,
    });
  };

  const saveForm = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const now = new Date();
    const date = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const formatDate = (value) => {
      if (!value) return "Not set";
      return new Date(`${value}T12:00:00`).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    };

    const record = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      tour: form.tour.trim() || "General Enquiry",
      subject: form.tour.trim() || "General Enquiry",
      message: form.message.trim(),
      travelers: Math.max(1, Number(form.travelers) || 1),
      start: form.start ? formatDate(form.start) : "Not set",
      end: form.end ? formatDate(form.end) : "Not set",
      status: form.status || "New",
      date,
      time: now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    try {
      const isEdit = modal.type === "edit";
      const res = await fetch(
        isEdit ? `${API_ENQUIRY_URL}/${modal.id}` : API_ENQUIRY_URL,
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record),
        }
      );

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to save enquiry.");
      }

      const saved = normalizeEnquiry(result.data);

      if (isEdit) {
        setRows((old) => old.map((r) => (r.id === modal.id ? saved : r)));
        notify("Enquiry updated successfully");
      } else {
        setRows((old) => [saved, ...old]);
        setPage(1);
        notify("New enquiry created successfully");
      }

      setModal(null);
    } catch (error) {
      notify(error.message || "Error saving enquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateStatusQuickly = async (row, newStatus) => {
    try {
      const res = await fetch(`${API_ENQUIRY_URL}/${row.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...row, status: newStatus }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        const updated = normalizeEnquiry(result.data);
        setRows((old) => old.map((r) => (r.id === row.id ? updated : r)));
        if (viewRow && viewRow.id === row.id) {
          setViewRow(updated);
        }
        notify(`Status updated to "${newStatus}"`);
      }
    } catch {
      notify("Failed to update status");
    }
  };

  const deleteRow = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) {
      return;
    }

    try {
      const res = await fetch(`${API_ENQUIRY_URL}/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to delete enquiry.");
      }

      setRows((old) => old.filter((r) => r.id !== id));
      setSelected((old) => old.filter((item) => item !== id));
      if (viewRow && viewRow.id === id) setViewRow(null);
      notify("Enquiry deleted successfully");
    } catch (error) {
      notify(error.message || "Error deleting enquiry.");
    }
  };

  const deleteSelected = async () => {
    if (!selected.length) return;
    if (!window.confirm(`Delete ${selected.length} selected enquiries?`)) return;

    try {
      await Promise.all(
        selected.map((id) =>
          fetch(`${API_ENQUIRY_URL}/${id}`, { method: "DELETE" })
        )
      );
      setRows((old) => old.filter((r) => !selected.includes(r.id)));
      setSelected([]);
      notify(`${selected.length} enquiries deleted`);
    } catch {
      notify("Some items could not be deleted.");
    }
  };

  const exportRows = () => {
    const headers = [
      "Customer Name",
      "Email",
      "Phone",
      "Tour/Subject",
      "Message",
      "Travel Start",
      "Travel End",
      "Travelers",
      "Status",
      "Date Received",
    ];

    const csv = [
      headers,
      ...filtered.map((row) => [
        row.name,
        row.email,
        row.phone,
        row.tour,
        row.message,
        row.start || "N/A",
        row.end || "N/A",
        row.travelers,
        row.status,
        `${row.date} ${row.time}`,
      ]),
    ]
      .map((line) =>
        line
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bhitarkanika_enquiries_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    notify("Enquiries exported to CSV");
  };

  const allPageSelected =
    pageRows.length > 0 &&
    pageRows.every((row) => selected.includes(row.id));

  const toggleAll = () => {
    setSelected((oldSelected) =>
      allPageSelected
        ? oldSelected.filter((id) => !pageRows.some((r) => r.id === id))
        : [...new Set([...oldSelected, ...pageRows.map((r) => r.id)])]
    );
  };

  return (
    <div className="Enquiry-container">
      {/* Premium Emerald Hero Header */}
      <header className="Enquiry-hero">
        <div className="Enquiry-hero-text">
          <span className="Enquiry-badge">
            <Sparkles size={13} />
            CUSTOMER RELATIONSHIP
          </span>
          <h1>Customer Enquiries</h1>
          <p>
            Track, filter, and manage tour bookings and contact inquiries in one place.
          </p>
        </div>
      </header>

      {/* Metrics Summary Cards */}
      <section className="Enquiry-stats-grid">
        <div
          className={`Enquiry-stat-card ${status === "All Status" ? "active" : ""}`}
          onClick={() => { setStatus("All Status"); setPage(1); }}
        >
          <div className="Enquiry-stat-icon Enquiry-icon-blue">
            <Users size={20} />
          </div>
          <div className="Enquiry-stat-data">
            <span className="Enquiry-stat-label">TOTAL</span>
            <strong>{counts.total}</strong>
            <small>All customer messages</small>
          </div>
        </div>

        <div
          className={`Enquiry-stat-card ${status === "New" ? "active" : ""}`}
          onClick={() => { setStatus("New"); setPage(1); }}
        >
          <div className="Enquiry-stat-icon Enquiry-icon-amber">
            <FileText size={20} />
          </div>
          <div className="Enquiry-stat-data">
            <span className="Enquiry-stat-label">NEW</span>
            <strong>{counts.new}</strong>
            <small>Awaiting response</small>
          </div>
        </div>

        <div
          className={`Enquiry-stat-card ${status === "In Progress" ? "active" : ""}`}
          onClick={() => { setStatus("In Progress"); setPage(1); }}
        >
          <div className="Enquiry-stat-icon Enquiry-icon-purple">
            <Clock3 size={20} />
          </div>
          <div className="Enquiry-stat-data">
            <span className="Enquiry-stat-label">IN PROGRESS</span>
            <strong>{counts.progress}</strong>
            <small>Currently handling</small>
          </div>
        </div>

        <div
          className={`Enquiry-stat-card ${status === "Replied" ? "active" : ""}`}
          onClick={() => { setStatus("Replied"); setPage(1); }}
        >
          <div className="Enquiry-stat-icon Enquiry-icon-green">
            <MessageCircle size={20} />
          </div>
          <div className="Enquiry-stat-data">
            <span className="Enquiry-stat-label">REPLIED</span>
            <strong>{counts.replied}</strong>
            <small>Client contacted</small>
          </div>
        </div>

        <div
          className={`Enquiry-stat-card ${status === "Closed" ? "active" : ""}`}
          onClick={() => { setStatus("Closed"); setPage(1); }}
        >
          <div className="Enquiry-stat-icon Enquiry-icon-gray">
            <CircleCheck size={20} />
          </div>
          <div className="Enquiry-stat-data">
            <span className="Enquiry-stat-label">CLOSED</span>
            <strong>{counts.closed}</strong>
            <small>Resolved enquiries</small>
          </div>
        </div>
      </section>

      {/* Main Table Card */}
      <section className="Enquiry-main-card">
        {/* Filter and Search Bar */}
        <div className="Enquiry-toolbar">
          <div className="Enquiry-filter-group">
            <div className="Enquiry-select-wrap">
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                aria-label="Filter by status"
              >
                <option value="All Status">All Statuses ({rows.length})</option>
                <option value="New">New ({counts.new})</option>
                <option value="In Progress">In Progress ({counts.progress})</option>
                <option value="Replied">Replied ({counts.replied})</option>
                <option value="Closed">Closed ({counts.closed})</option>
              </select>
              <ChevronDown size={15} />
            </div>

            <div className="Enquiry-search-wrap">
              <Search size={16} />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by name, email, phone, or package..."
              />
              {search && (
                <button
                  type="button"
                  className="Enquiry-clear-search"
                  onClick={() => setSearch("")}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="Enquiry-toolbar-meta">
            Showing <b>{filtered.length ? (page - 1) * pageSize + 1 : 0}</b> to{" "}
            <b>{Math.min(page * pageSize, filtered.length)}</b> of{" "}
            <b>{filtered.length}</b> records
          </div>
        </div>

        {/* Bulk Action Strip */}
        {selected.length > 0 && (
          <div className="Enquiry-bulk-bar">
            <span>
              <b>{selected.length}</b> enquiry selected
            </span>
            <div className="Enquiry-bulk-actions">
              <button
                type="button"
                className="Enquiry-btn-bulk-danger"
                onClick={deleteSelected}
              >
                <Trash2 size={14} />
                Delete Selected
              </button>
              <button
                type="button"
                className="Enquiry-btn-bulk-light"
                onClick={() => setSelected([])}
              >
                Deselect All
              </button>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="Enquiry-table-wrapper">
          <table className="Enquiry-table">
            <thead>
              <tr>
                <th style={{ width: "44px", textAlign: "center" }}>
                  <button
                    type="button"
                    className="Enquiry-check-all"
                    onClick={toggleAll}
                    title="Select / Deselect all"
                  >
                    {allPageSelected ? (
                      <CheckSquare size={16} color="#059669" />
                    ) : (
                      <Square size={16} color="#94a3b8" />
                    )}
                  </button>
                </th>
                <th style={{ width: "40px" }}>#</th>
                <th>CUSTOMER</th>
                <th>CONTACT DETAILS</th>
                <th>TOUR / SUBJECT</th>
                <th>TRAVEL DETAILS</th>
                <th>STATUS</th>
                <th>RECEIVED DATE</th>
                <th style={{ textAlign: "right" }}>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="Enquiry-empty-state">
                    <RefreshCw className="Enquiry-spin" size={24} />
                    <p>Loading enquiries...</p>
                  </td>
                </tr>
              ) : pageRows.length === 0 ? (
                <tr>
                  <td colSpan="9" className="Enquiry-empty-state">
                    <Search size={32} />
                    <strong>No enquiries found</strong>
                    <p>Try adjusting your search keywords or status filter.</p>
                  </td>
                </tr>
              ) : (
                pageRows.map((row, index) => {
                  const isSelected = selected.includes(row.id);
                  const hasTravelDates = row.start || row.end;

                  return (
                    <tr
                      key={row.id}
                      className={isSelected ? "Enquiry-row-selected" : ""}
                    >
                      <td style={{ textAlign: "center" }}>
                        <input
                          type="checkbox"
                          className="Enquiry-checkbox"
                          checked={isSelected}
                          onChange={() =>
                            setSelected((prev) =>
                              prev.includes(row.id)
                                ? prev.filter((id) => id !== row.id)
                                : [...prev, row.id]
                            )
                          }
                        />
                      </td>

                      <td className="Enquiry-index-cell">
                        {(page - 1) * pageSize + index + 1}
                      </td>

                      <td className="Enquiry-customer-cell">
                        <strong className="Enquiry-customer-name">
                          {row.name}
                        </strong>
                      </td>

                      <td className="Enquiry-contact-cell">
                        {row.email && (
                          <div className="Enquiry-contact-item">
                            <Mail size={13} />
                            <a href={`mailto:${row.email}`}>{row.email}</a>
                          </div>
                        )}
                        {row.phone && (
                          <div className="Enquiry-contact-item">
                            <Phone size={13} />
                            <a href={`tel:${row.phone}`}>{row.phone}</a>
                          </div>
                        )}
                        {!row.email && !row.phone && <span>—</span>}
                      </td>

                      <td className="Enquiry-tour-cell">
                        <span className="Enquiry-tour-title">
                          {row.tour || row.subject || "General Enquiry"}
                        </span>
                        {row.message && (
                          <p className="Enquiry-message-preview">
                            {row.message}
                          </p>
                        )}
                      </td>

                      <td className="Enquiry-travel-cell">
                        {hasTravelDates ? (
                          <div className="Enquiry-dates">
                            <Calendar size={13} />
                            <span>
                              {row.start}
                              {row.end && row.end !== row.start ? ` → ${row.end}` : ""}
                            </span>
                          </div>
                        ) : (
                          <span className="Enquiry-no-date">—</span>
                        )}
                        {row.travelers && row.travelers > 1 && (
                          <small className="Enquiry-travelers-tag">
                            {row.travelers} Guests
                          </small>
                        )}
                      </td>

                      <td>
                        <span
                          className={`Enquiry-status-pill ${statusClass(row.status)}`}
                        >
                          <span className="Enquiry-status-dot" />
                          {row.status}
                        </span>
                      </td>

                      <td className="Enquiry-date-cell">
                        <span>{row.date || "—"}</span>
                        {row.time && <small>{row.time}</small>}
                      </td>

                      <td style={{ textAlign: "right" }}>
                        <div className="Enquiry-actions-group">
                          <button
                            type="button"
                            className="Enquiry-act-btn Enquiry-act-view"
                            title="View details"
                            onClick={() => setViewRow(row)}
                          >
                            <Eye size={15} />
                          </button>

                          <button
                            type="button"
                            className="Enquiry-act-btn Enquiry-act-edit"
                            title="Edit enquiry"
                            onClick={() => openEdit(row)}
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            type="button"
                            className="Enquiry-act-btn Enquiry-act-delete"
                            title="Delete"
                            onClick={() => deleteRow(row.id)}
                          >
                            <Trash2 size={15} />
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

        {/* Pagination Footer */}
        <div className="Enquiry-footer">
          <div className="Enquiry-page-size">
            <span>Show</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>entries per page</span>
          </div>

          <div className="Enquiry-pagination-controls">
            <button
              type="button"
              className="Enquiry-page-arrow"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: pageCount }, (_, i) => i + 1)
              .slice(
                Math.max(0, Math.min(page - 1, pageCount - 5)),
                Math.max(5, Math.min(page - 1, pageCount - 5)) + 5
              )
              .map((num) => (
                <button
                  type="button"
                  key={num}
                  className={`Enquiry-page-num ${page === num ? "active" : ""}`}
                  onClick={() => setPage(num)}
                >
                  {num}
                </button>
              ))}

            <button
              type="button"
              className="Enquiry-page-arrow"
              disabled={page >= pageCount}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Add / Edit Enquiry Modal */}
      {modal && (
        <div
          className="Enquiry-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModal(null);
          }}
        >
          <div className="Enquiry-modal-box">
            <div className="Enquiry-modal-header">
              <div className="Enquiry-modal-title">
                <div className="Enquiry-modal-icon-wrap">
                  <Pencil size={18} />
                </div>
                <div>
                  <h3>
                    {modal.type === "edit" ? "Edit Customer Enquiry" : "Add New Enquiry"}
                  </h3>
                  <p>
                    {modal.type === "edit"
                      ? "Update customer information and enquiry status."
                      : "Manually register an enquiry from phone or email."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="Enquiry-modal-close"
                onClick={() => setModal(null)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={saveForm} className="Enquiry-modal-form">
              <div className="Enquiry-form-grid">
                <div className="Enquiry-field">
                  <label>Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full name"
                  />
                </div>

                <div className="Enquiry-field">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@example.com"
                  />
                </div>

                <div className="Enquiry-field">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="Enquiry-field">
                  <label>Tour Package / Subject *</label>
                  <input
                    type="text"
                    required
                    value={form.tour}
                    onChange={(e) => setForm({ ...form, tour: e.target.value })}
                    placeholder="Tour package or inquiry topic"
                  />
                </div>

                <div className="Enquiry-field">
                  <label>Travel Start Date</label>
                  <input
                    type="date"
                    value={form.start}
                    onChange={(e) => setForm({ ...form, start: e.target.value })}
                  />
                </div>

                <div className="Enquiry-field">
                  <label>Travel End Date</label>
                  <input
                    type="date"
                    min={form.start || undefined}
                    value={form.end}
                    onChange={(e) => setForm({ ...form, end: e.target.value })}
                  />
                </div>

                <div className="Enquiry-field">
                  <label>Number of Guests / Travelers</label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={form.travelers}
                    onChange={(e) => setForm({ ...form, travelers: e.target.value })}
                  />
                </div>

                <div className="Enquiry-field">
                  <label>Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Replied">Replied</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="Enquiry-field Enquiry-field-full">
                  <label>Customer Message / Request Details</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Notes or requirements provided by customer..."
                  />
                </div>
              </div>

              <div className="Enquiry-modal-actions">
                <button
                  type="button"
                  className="Enquiry-btn Enquiry-btn-secondary"
                  onClick={() => setModal(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="Enquiry-btn Enquiry-btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : modal.type === "edit" ? "Save Changes" : "Create Enquiry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewRow && (
        <div
          className="Enquiry-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setViewRow(null);
          }}
        >
          <div className="Enquiry-modal-box Enquiry-view-box">
            <div className="Enquiry-modal-header">
              <div className="Enquiry-modal-title">
                <div className="Enquiry-modal-icon-wrap">
                  <Eye size={18} />
                </div>
                <div>
                  <h3>Enquiry Overview</h3>
                  <p>Customer details and submission log</p>
                </div>
              </div>
              <button
                type="button"
                className="Enquiry-modal-close"
                onClick={() => setViewRow(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="Enquiry-view-body">
              {/* Profile Card Header */}
              <div className="Enquiry-view-hero">
                <div className="Enquiry-view-person">
                  <h4>{viewRow.name}</h4>
                  <span className={`Enquiry-status-pill ${statusClass(viewRow.status)}`}>
                    <span className="Enquiry-status-dot" />
                    {viewRow.status}
                  </span>
                </div>

                <div className="Enquiry-view-quick-status">
                  <label>Change Status:</label>
                  <select
                    value={viewRow.status}
                    onChange={(e) => updateStatusQuickly(viewRow, e.target.value)}
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Replied">Replied</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* Information Grid */}
              <div className="Enquiry-view-grid">
                <div className="Enquiry-view-item">
                  <span>EMAIL</span>
                  <strong>
                    <a href={`mailto:${viewRow.email}`}>{viewRow.email || "N/A"}</a>
                  </strong>
                </div>

                <div className="Enquiry-view-item">
                  <span>PHONE</span>
                  <strong>
                    {viewRow.phone ? (
                      <a href={`tel:${viewRow.phone}`}>{viewRow.phone}</a>
                    ) : (
                      "Not provided"
                    )}
                  </strong>
                </div>

                {viewRow.homeTown && (
                  <div className="Enquiry-view-item">
                    <span>HOME TOWN</span>
                    <strong>{viewRow.homeTown}</strong>
                  </div>
                )}

                {viewRow.aadhar && (
                  <div className="Enquiry-view-item">
                    <span>AADHAAR / PASSPORT</span>
                    <strong>{viewRow.aadhar}</strong>
                  </div>
                )}

                <div className="Enquiry-view-item">
                  <span>TOUR / SUBJECT</span>
                  <strong>{viewRow.tour || viewRow.subject || "General Enquiry"}</strong>
                </div>

                <div className="Enquiry-view-item">
                  <span>RECEIVED ON</span>
                  <strong>
                    {viewRow.date} {viewRow.time ? `at ${viewRow.time}` : ""}
                  </strong>
                </div>

                {viewRow.start && (
                  <div className="Enquiry-view-item">
                    <span>TRAVEL START</span>
                    <strong>{viewRow.start}</strong>
                  </div>
                )}

                {viewRow.end && (
                  <div className="Enquiry-view-item">
                    <span>TRAVEL END</span>
                    <strong>{viewRow.end}</strong>
                  </div>
                )}

                {viewRow.travelers && viewRow.travelers > 1 && (
                  <div className="Enquiry-view-item">
                    <span>GUESTS</span>
                    <strong>{viewRow.travelers} Persons</strong>
                  </div>
                )}
              </div>

              {/* Message Block */}
              {viewRow.message && (
                <div className="Enquiry-view-message">
                  <span>CUSTOMER MESSAGE</span>
                  <div className="Enquiry-view-quote">
                    <p>{viewRow.message}</p>
                  </div>
                </div>
              )}

              <div className="Enquiry-modal-actions">
                {viewRow.email && (
                  <a
                    href={`mailto:${viewRow.email}?subject=Regarding your Bhitarkanika enquiry`}
                    className="Enquiry-btn Enquiry-btn-primary"
                    style={{ textDecoration: "none" }}
                  >
                    <Send size={15} />
                    Reply via Email
                  </a>
                )}

                <button
                  type="button"
                  className="Enquiry-btn Enquiry-btn-secondary"
                  onClick={() => {
                    const row = viewRow;
                    setViewRow(null);
                    openEdit(row);
                  }}
                >
                  <Pencil size={15} />
                  Edit Enquiry
                </button>

                <button
                  type="button"
                  className="Enquiry-btn Enquiry-btn-secondary"
                  onClick={() => setViewRow(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toast && (
        <div className="Enquiry-toast" role="alert">
          <CircleCheck size={18} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};

export default Enquiry;

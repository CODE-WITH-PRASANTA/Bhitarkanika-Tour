
import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Trash2,
  Home,
  X,
  Users,
  Phone,
  Mail,
  MapPin,
  UserRound,
  RotateCcw,
  Ship,
} from "lucide-react";

import "./TourBooking.css";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_URL = `${API_BASE}/tour-bookings`;

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  })
    .format(amount || 0)
    .replace("₹", "₹");

const formatDate = (date) => {
  if (!date) return "—";
  const source = date.includes("T") ? date : `${date}T00:00:00`;
  const parsed = new Date(source);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const TourBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPackage, setFilterPackage] = useState("All Packages");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeBooking, setActiveBooking] = useState(null);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState("");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const json = await res.json();
      if (res.ok && json.success && Array.isArray(json.data)) {
        const normalized = json.data.map((item) => ({
          ...item,
          id: item._id || item.id,
          bookingId: item.bookingId || `TB-${String(item._id).slice(-8)}`,
          date: item.date || item.travelDate || "",
          travelDate: item.travelDate || item.date || "",
          time: item.time || item.departureSlot || "",
          departureSlot: item.departureSlot || item.time || "",
          amount: Number(item.amount || item.totalAmount || 0),
          totalAmount: Number(item.totalAmount || item.amount || 0),
          aadhaar: item.aadhaar || item.aadhar || "",
          aadhar: item.aadhar || item.aadhaar || "",
          homeTown: item.homeTown || item.address || "",
          address: item.address || item.homeTown || "",
          image: item.image || "/src/assets/jaynagar-route-map.jpg",
          packageType: item.packageType || "1 DAY Safari",
          boats: Number(item.boats || item.boatCount) || 1,
          boatCount: Number(item.boatCount || item.boats) || 1,
          adults: Number(item.adults) || 1,
          children: Number(item.children) || 0,
          guests: Number(item.guests) || ((Number(item.adults) || 1) + (Number(item.children) || 0)),
          status: item.status || "Confirmed",
          paymentStatus: item.paymentStatus || "Paid",
          paymentId: item.paymentId || "",
          paymentMethod: item.paymentMethod || "Razorpay / UPI",
          from: item.from || "",
          to: item.to || "",
        }));
        setBookings(normalized);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error("Failed to load tour bookings:", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const packageNames = useMemo(
    () => [...new Set(bookings.map((booking) => booking.packageName))],
    [bookings]
  );

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        [
          booking.bookingId,
          booking.name,
          booking.phone,
          booking.email,
          booking.packageName,
        ].some((value) => value.toLowerCase().includes(search));

      const matchesPackage =
        filterPackage === "All Packages" ||
        booking.packageName === filterPackage;

      const matchesStatus =
        filterStatus === "All Status" || booking.status === filterStatus;

      const matchesFromDate = !fromDate || booking.date >= fromDate;
      const matchesToDate = !toDate || booking.date <= toDate;

      return (
        matchesSearch &&
        matchesPackage &&
        matchesStatus &&
        matchesFromDate &&
        matchesToDate
      );
    });
  }, [bookings, searchTerm, filterPackage, filterStatus, fromDate, toDate]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBookings.length / entriesPerPage)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedBookings = filteredBookings.slice(
    (safePage - 1) * entriesPerPage,
    safePage * entriesPerPage
  );

  const totalBookings = bookings.length;
  const confirmedCount = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;
  const pendingCount = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;
  const cancelledCount = bookings.filter(
    (booking) => booking.status === "Cancelled"
  ).length;

  const resetFilters = () => {
    setSearchTerm("");
    setFilterPackage("All Packages");
    setFilterStatus("All Status");
    setFromDate("");
    setToDate("");
    setCurrentPage(1);
  };

  const toggleSelectAll = (checked) => {
    setSelectedIds(
      checked ? paginatedBookings.map((booking) => booking.id) : []
    );
  };

  const toggleSelect = (id) => {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((selectedId) => selectedId !== id)
        : [...previous, id]
    );
  };

  const openView = (booking) => {
    setActiveBooking(booking);
    setModalType("view");
  };

  const openEdit = (booking) => {
    let dateStr = booking.date || booking.travelDate || "";
    if (dateStr && dateStr.includes("T")) {
      dateStr = dateStr.split("T")[0];
    }
    const timeStr = booking.time || booking.departureSlot || "";

    setFormData({
      ...booking,
      id: booking._id || booking.id,
      _id: booking._id || booking.id,
      bookingId: booking.bookingId || "",
      packageName: booking.packageName || "Bhitarkanika Boat Package",
      packageType: booking.packageType || "",
      from: booking.from || "",
      to: booking.to || "",
      image: booking.image || "",
      name: booking.name || "",
      phone: booking.phone || "",
      email: booking.email || "",
      homeTown: booking.homeTown || booking.address || "",
      address: booking.address || booking.homeTown || "",
      date: dateStr,
      travelDate: dateStr,
      time: timeStr,
      departureSlot: timeStr,
      boats: Number(booking.boats || booking.boatCount) || 1,
      boatCount: Number(booking.boats || booking.boatCount) || 1,
      adults: Number(booking.adults) || 1,
      children: Number(booking.children) || 0,
      guests:
        Number(booking.guests) ||
        (Number(booking.adults) || 1) + (Number(booking.children) || 0),
      aadhaar: booking.aadhaar || booking.aadhar || "",
      aadhar: booking.aadhar || booking.aadhaar || "",
      amount: Number(booking.amount || booking.totalAmount) || 0,
      totalAmount: Number(booking.amount || booking.totalAmount) || 0,
      status: booking.status || "Confirmed",
      paymentStatus: booking.paymentStatus || "Paid",
      paymentId: booking.paymentId || "",
      paymentMethod: booking.paymentMethod || "Razorpay / UPI",
    });
    setShowForm(true);
  };

  const openCreate = () => {
    const today = new Date().toISOString().split("T")[0];
    setFormData({
      bookingId: `BTK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      packageName: "Bhitarkanika Boat Package",
      packageType: "Khola (Boating Point) to Bhitarkanika · 1 DAY",
      from: "Khola (Boating Point)",
      to: "Bhitarkanika",
      image: "/src/assets/khola-route-map.jpg",
      name: "",
      adults: 1,
      children: 0,
      guests: 1,
      boats: 1,
      boatCount: 1,
      date: today,
      travelDate: today,
      time: "7:00 AM – 10:30 AM (End)",
      departureSlot: "7:00 AM – 10:30 AM (End)",
      phone: "",
      aadhaar: "",
      aadhar: "",
      email: "",
      homeTown: "",
      address: "",
      amount: 3500,
      totalAmount: 3500,
      status: "Confirmed",
      paymentStatus: "Paid",
      paymentMethod: "Razorpay / UPI",
      paymentId: "",
    });
    setShowForm(true);
  };

  const saveBooking = async (event) => {
    event.preventDefault();

    if (!formData.name?.trim() || !formData.date || !formData.phone?.trim()) {
      setNotice("Please fill in the guest name, travel date, and phone number.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      setNotice("Enter a valid 10-digit mobile number.");
      return;
    }

    const targetId = formData._id || formData.id;
    const exists = bookings.some(
      (b) => (b._id && b._id === targetId) || b.id === targetId
    );

    const payload = {
      ...formData,
      travelDate: formData.date,
      date: formData.date,
      departureSlot: formData.time,
      time: formData.time,
      boatCount: Number(formData.boats) || 1,
      boats: Number(formData.boats) || 1,
      adults: Number(formData.adults) || 1,
      children: Number(formData.children) || 0,
      guests: (Number(formData.adults) || 1) + (Number(formData.children) || 0),
      totalAmount: Number(formData.amount) || 0,
      amount: Number(formData.amount) || 0,
      address: formData.homeTown || "",
      homeTown: formData.homeTown || "",
      aadhar: formData.aadhaar || "",
      aadhaar: formData.aadhaar || "",
    };

    try {
      if (exists && targetId) {
        const res = await fetch(`${API_URL}/${targetId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (res.ok && json.success) {
          setNotice("Booking updated successfully.");
        } else {
          setNotice(json.message || "Failed to update booking.");
        }
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (res.ok && json.success) {
          setNotice("Booking added successfully.");
        } else {
          setNotice(json.message || "Failed to create booking.");
        }
      }
      await fetchBookings();
      setShowForm(false);
      setCurrentPage(1);
    } catch (err) {
      setNotice("Failed to save booking. Please check connection.");
    }
  };

  const deleteBooking = async (booking) => {
    const confirmed = window.confirm(
      `Delete booking ${booking.bookingId} for ${booking.name}?`
    );

    if (!confirmed) return;

    const targetId = booking._id || booking.id;
    try {
      if (booking._id) {
        await fetch(`${API_URL}/${targetId}`, { method: "DELETE" });
      }
      setBookings((previous) =>
        previous.filter((item) => (item._id || item.id) !== targetId)
      );
      setSelectedIds((previous) =>
        previous.filter((id) => id !== targetId)
      );
      setNotice("Booking deleted successfully.");
    } catch (err) {
      setNotice("Failed to delete booking.");
    }
  };

  const deleteSelected = async () => {
    if (!selectedIds.length) return;

    const confirmed = window.confirm(
      `Delete ${selectedIds.length} selected booking(s)?`
    );

    if (!confirmed) return;

    try {
      await Promise.all(
        selectedIds.map((id) =>
          fetch(`${API_URL}/${id}`, { method: "DELETE" })
        )
      );
      setBookings((previous) =>
        previous.filter(
          (booking) => !selectedIds.includes(booking._id || booking.id)
        )
      );
      setSelectedIds([]);
      setNotice("Selected bookings deleted.");
    } catch (err) {
      setNotice("Failed to delete selected bookings.");
    }
  };

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const exportBookings = () => {
    const columns = [
      "Booking ID",
      "Package",
      "Full Name",
      "Adults",
      "Children",
      "Travel Date",
      "Travel Time",
      "Phone",
      "Aadhaar",
      "Email",
      "Amount",
      "Status",
    ];

    const rows = filteredBookings.map((booking) => [
      booking.bookingId,
      booking.packageName,
      booking.name,
      booking.adults,
      booking.children,
      booking.date,
      booking.time,
      booking.phone,
      booking.aadhaar,
      booking.email,
      booking.amount,
      booking.status,
    ]);

    const csvCell = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csv = [columns, ...rows]
      .map((row) => row.map(csvCell).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tour-bookings.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="TourBooking">
   

      {notice && (
        <div className="TourBooking-notice" role="status">
          <span>{notice}</span>
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
          >
            <X size={17} />
          </button>
        </div>
      )}

      <section className="TourBooking-stats-grid">
        <article className="TourBooking-stat-card TourBooking-stat-total">
          <div className="TourBooking-stat-icon">
            <CalendarDays size={29} />
          </div>
          <div className="TourBooking-stat-content">
            <span>Total Bookings</span>
            <strong>{totalBookings}</strong>
            <small>
              <span className="TourBooking-positive">↑</span> All bookings
            </small>
          </div>
        </article>

        <article className="TourBooking-stat-card TourBooking-stat-confirmed">
          <div className="TourBooking-stat-icon">
            <CheckCircle2 size={29} />
          </div>
          <div className="TourBooking-stat-content">
            <span>Confirmed</span>
            <strong>{confirmedCount}</strong>
            <small>
              {totalBookings
                ? Math.round((confirmedCount / totalBookings) * 100)
                : 0}
              % of total
            </small>
          </div>
        </article>

        <article className="TourBooking-stat-card TourBooking-stat-pending">
          <div className="TourBooking-stat-icon">
            <Clock3 size={29} />
          </div>
          <div className="TourBooking-stat-content">
            <span>Pending</span>
            <strong>{pendingCount}</strong>
            <small>
              {totalBookings
                ? Math.round((pendingCount / totalBookings) * 100)
                : 0}
              % of total
            </small>
          </div>
        </article>

        <article className="TourBooking-stat-card TourBooking-stat-cancelled">
          <div className="TourBooking-stat-icon">
            <XCircle size={29} />
          </div>
          <div className="TourBooking-stat-content">
            <span>Cancelled</span>
            <strong>{cancelledCount}</strong>
            <small>
              {totalBookings
                ? Math.round((cancelledCount / totalBookings) * 100)
                : 0}
              % of total
            </small>
          </div>
        </article>
      </section>

      <section className="TourBooking-toolbar">
        <div className="TourBooking-search-box">
          <Search size={19} />
          <input
            type="search"
            placeholder="Search by name, phone, package..."
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setCurrentPage(1);
            }}
          />
          {searchTerm && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearchTerm("")}
            >
              <X size={16} />
            </button>
          )}
        </div>

        <label className="TourBooking-select-box">
          <select
            value={filterPackage}
            onChange={(event) => {
              setFilterPackage(event.target.value);
              setCurrentPage(1);
            }}
            aria-label="Filter by package"
          >
            <option>All Packages</option>
            {packageNames.map((packageName) => (
              <option key={packageName} value={packageName}>
                {packageName}
              </option>
            ))}
          </select>
          <ChevronDown size={17} />
        </label>

        <label className="TourBooking-select-box">
          <select
            value={filterStatus}
            onChange={(event) => {
              setFilterStatus(event.target.value);
              setCurrentPage(1);
            }}
            aria-label="Filter by status"
          >
            <option>All Status</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
          <ChevronDown size={17} />
        </label>

        <div className="TourBooking-actions-group">
          {(searchTerm || filterPackage !== "All Packages" || filterStatus !== "All Status") && (
            <button
              type="button"
              className="TourBooking-reset-btn"
              title="Reset all filters"
              onClick={() => {
                setSearchTerm("");
                setFilterPackage("All Packages");
                setFilterStatus("All Status");
                setCurrentPage(1);
              }}
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          )}

          <button
            className="TourBooking-add-button"
            type="button"
            onClick={openCreate}
          >
            <Plus size={18} />
            <span>Add Booking</span>
          </button>
        </div>
      </section>

      {selectedIds.length > 0 && (
        <div className="TourBooking-bulk-bar">
          <span>{selectedIds.length} booking(s) selected</span>
          <button type="button" onClick={deleteSelected}>
            <Trash2 size={16} />
            Delete selected
          </button>
          <button type="button" onClick={() => setSelectedIds([])}>
            Clear selection
          </button>
        </div>
      )}

      <section className="TourBooking-table-panel">
        <div className="TourBooking-table-scroll">
          <table className="TourBooking-table">
            <thead>
              <tr>
                <th className="TourBooking-checkbox-column">
                  <input
                    type="checkbox"
                    aria-label="Select all bookings on this page"
                    checked={
                      paginatedBookings.length > 0 &&
                      paginatedBookings.every((booking) =>
                        selectedIds.includes(booking.id)
                      )
                    }
                    onChange={(event) =>
                      toggleSelectAll(event.target.checked)
                    }
                  />
                </th>
                <th>#</th>
                <th>Package Details</th>
                <th>Full Name</th>
                <th>Boats</th>
                <th>Adults</th>
                <th>Children</th>
                <th>Travel Date</th>
                <th>Travel Time</th>
                <th>Phone Number</th>
                <th>Aadhaar Number</th>
                <th>Email Address</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedBookings.map((booking, index) => (
                <tr key={booking.id}>
                  <td className="TourBooking-checkbox-column">
                    <input
                      type="checkbox"
                      aria-label={`Select ${booking.bookingId}`}
                      checked={selectedIds.includes(booking.id)}
                      onChange={() => toggleSelect(booking.id)}
                    />
                  </td>
                  <td className="TourBooking-row-number">
                    {(safePage - 1) * entriesPerPage + index + 1}
                  </td>
                  <td>
                    <div className="TourBooking-package-cell">
                      <img
                        src={booking.image}
                        alt={booking.packageName}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.src =
                            "https://placehold.co/100x100/e8f2ec/234538?text=Tour";
                        }}
                      />
                      <div>
                        <strong>{booking.packageName}</strong>
                        <span>{booking.packageType}</span>
                        <b>{formatCurrency(booking.amount)}</b>
                      </div>
                    </div>
                  </td>
                  <td className="TourBooking-guest-name">{booking.name}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: "#065f46" }}>
                      {booking.boats || 1} { (booking.boats || 1) > 1 ? "Boats" : "Boat" }
                    </span>
                  </td>
                  <td>{booking.adults}</td>
                  <td>{booking.children}</td>
                  <td>{formatDate(booking.date)}</td>
                  <td>{booking.time || "—"}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.aadhaar || "—"}</td>
                  <td>{booking.email || "—"}</td>
                  <td className="TourBooking-amount">
                    {formatCurrency(booking.amount)}
                  </td>
                  <td>
                    <span
                      className={`TourBooking-status-badge TourBooking-status-${booking.status.toLowerCase()}`}
                    >
                      <span />
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <div className="TourBooking-action-buttons">
                      <button
                        type="button"
                        className="TourBooking-action-view"
                        title="View booking"
                        aria-label={`View ${booking.bookingId}`}
                        onClick={() => openView(booking)}
                      >
                        <Eye size={17} />
                      </button>
                      <button
                        type="button"
                        className="TourBooking-action-edit"
                        title="Edit booking"
                        aria-label={`Edit ${booking.bookingId}`}
                        onClick={() => openEdit(booking)}
                      >
                        <Pencil size={17} />
                      </button>
                      <button
                        type="button"
                        className="TourBooking-action-delete"
                        title="Delete booking"
                        aria-label={`Delete ${booking.bookingId}`}
                        onClick={() => deleteBooking(booking)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {loading && (
                <tr>
                  <td colSpan="14" className="TourBooking-empty-state">
                    <strong>Loading bookings from database...</strong>
                  </td>
                </tr>
              )}

              {!loading && paginatedBookings.length === 0 && (
                <tr>
                  <td colSpan="14" className="TourBooking-empty-state">
                    <Search size={32} />
                    <strong>No bookings found</strong>
                    <span>No real boat bookings found in database yet. New reservations from the website will appear here automatically.</span>
                    <button type="button" onClick={resetFilters}>
                      Clear filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="TourBooking-table-footer">
          <p>
            Showing{" "}
            <strong>
              {filteredBookings.length
                ? (safePage - 1) * entriesPerPage + 1
                : 0}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(safePage * entriesPerPage, filteredBookings.length)}
            </strong>{" "}
            of <strong>{filteredBookings.length}</strong> bookings
          </p>

          <div className="TourBooking-pagination-area">
            <label className="TourBooking-entries-select">
              <span>Show</span>
              <select
                value={entriesPerPage}
                onChange={(event) => {
                  setEntriesPerPage(Number(event.target.value));
                  setCurrentPage(1);
                }}
                aria-label="Bookings per page"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span>entries</span>
            </label>

            <div className="TourBooking-pagination">
              <button
                type="button"
                aria-label="Previous page"
                disabled={safePage <= 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              >
                <ChevronLeft size={19} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - safePage) <= 1
                )
                .map((page, index, visiblePages) => (
                  <React.Fragment key={page}>
                    {index > 0 && page - visiblePages[index - 1] > 1 && (
                      <span className="TourBooking-page-ellipsis">…</span>
                    )}
                    <button
                      type="button"
                      className={
                        safePage === page
                          ? "TourBooking-page-active"
                          : ""
                      }
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}

              <button
                type="button"
                aria-label="Next page"
                disabled={safePage >= totalPages}
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {modalType === "view" && activeBooking && (
        <div
          className="TourBooking-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setModalType("");
              setActiveBooking(null);
            }
          }}
        >
          <section
            className="TourBooking-detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="TourBooking-detail-title"
          >
            <div className="TourBooking-modal-heading">
              <div>
                <span>Booking details</span>
                <h2 id="TourBooking-detail-title">
                  {activeBooking.bookingId}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close details"
                onClick={() => {
                  setModalType("");
                  setActiveBooking(null);
                }}
              >
                <X size={21} />
              </button>
            </div>

            <div className="TourBooking-detail-package">
              <img src={activeBooking.image} alt={activeBooking.packageName} />
              <div>
                <h3>{activeBooking.packageName}</h3>
                <p>{activeBooking.packageType}</p>
                <strong>{formatCurrency(activeBooking.amount)}</strong>
              </div>
            </div>

            <div className="TourBooking-detail-grid">
              <div><span><UserRound size={15} /> Guest name</span><strong>{activeBooking.name}</strong></div>
              <div><span><Ship size={15} /> Boats booked</span><strong>{activeBooking.boats || 1} {(activeBooking.boats || 1) > 1 ? "Boats" : "Boat"}</strong></div>
              <div><span><Users size={15} /> Guests</span><strong>{activeBooking.adults} adults, {activeBooking.children} children</strong></div>
              <div><span><CalendarDays size={15} /> Travel date</span><strong>{formatDate(activeBooking.date)}</strong></div>
              <div><span><Clock3 size={15} /> Travel time</span><strong>{activeBooking.time || "—"}</strong></div>
              <div><span><Phone size={15} /> Phone</span><strong>{activeBooking.phone}</strong></div>
              <div><span><Mail size={15} /> Email</span><strong>{activeBooking.email || "—"}</strong></div>
              <div><span><Home size={15} /> Home town / City</span><strong>{activeBooking.homeTown || activeBooking.address || "—"}</strong></div>
              <div><span><MapPin size={15} /> Aadhaar number</span><strong>{activeBooking.aadhaar || "—"}</strong></div>
              <div><span><CheckCircle2 size={15} /> Payment status</span><strong style={{ color: activeBooking.paymentStatus === "Paid" ? "#065f46" : activeBooking.paymentStatus === "Refunded" ? "#b45309" : "#304e40" }}>{activeBooking.paymentStatus || "Paid"}</strong></div>
              <div><span><CheckCircle2 size={15} /> Booking status</span><strong>{activeBooking.status}</strong></div>
            </div>

            <div className="TourBooking-modal-footer">
              <button
                type="button"
                className="TourBooking-modal-secondary"
                onClick={() => {
                  setModalType("");
                  setActiveBooking(null);
                }}
              >
                Close
              </button>
              <button
                type="button"
                className="TourBooking-modal-primary"
                onClick={() => {
                  setModalType("");
                  openEdit(activeBooking);
                }}
              >
                <Pencil size={16} /> Edit Booking
              </button>
            </div>
          </section>
        </div>
      )}

      {showForm && formData && (
        <div
          className="TourBooking-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowForm(false);
          }}
        >
          <section
            className="TourBooking-form-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="TourBooking-form-title"
          >
            <div className="TourBooking-modal-heading">
              <div>
                <span>Tour management</span>
                <h2 id="TourBooking-form-title">
                  {bookings.some((booking) => booking.id === formData.id)
                    ? "Edit Booking"
                    : "Add Booking"}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close form"
                onClick={() => setShowForm(false)}
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={saveBooking} className="TourBooking-form">
              <div className="TourBooking-form-grid">
                <label>
                  Booking ID
                  <input
                    value={formData.bookingId || ""}
                    onChange={(event) =>
                      updateField("bookingId", event.target.value)
                    }
                    placeholder="e.g. BTK-10106961"
                    required
                  />
                </label>

                <label>
                  Package Name
                  <input
                    value={formData.packageName || ""}
                    onChange={(event) =>
                      updateField("packageName", event.target.value)
                    }
                    placeholder="e.g. Bhitarkanika Boat Package"
                    required
                  />
                </label>

                <label>
                  Package Route / Type
                  <input
                    value={formData.packageType || ""}
                    onChange={(event) =>
                      updateField("packageType", event.target.value)
                    }
                    placeholder="e.g. Jaynagar to Bhitarkanika · 1 DAY"
                  />
                </label>

                <label>
                  Full name
                  <input
                    value={formData.name || ""}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder="Enter guest full name"
                    required
                  />
                </label>

                <label>
                  Phone number
                  <input
                    value={formData.phone || ""}
                    onChange={(event) => updateField("phone", event.target.value)}
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    required
                  />
                </label>

                <label>
                  Email address
                  <input
                    type="email"
                    value={formData.email || ""}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="guest@example.com"
                  />
                </label>

                <label>
                  Home Town / City
                  <input
                    value={formData.homeTown || ""}
                    onChange={(event) => updateField("homeTown", event.target.value)}
                    placeholder="e.g. Bhubaneswar / Cuttack"
                  />
                </label>

                <label>
                  Travel date
                  <input
                    type="date"
                    value={formData.date || ""}
                    onChange={(event) => updateField("date", event.target.value)}
                    required
                  />
                </label>

                <label>
                  Travel time / Departure Slot
                  <input
                    type="text"
                    value={formData.time || ""}
                    onChange={(event) => updateField("time", event.target.value)}
                    placeholder="e.g. 7:00 AM – 10:30 AM (End)"
                    list="departure-slots-list"
                    required
                  />
                  <datalist id="departure-slots-list">
                    <option value="7:00 AM – 10:30 AM (End)" />
                    <option value="7:30 AM – 11:00 AM (End)" />
                    <option value="8:00 AM – 11:30 AM (End)" />
                    <option value="1:00 PM – 4:30 PM (End)" />
                    <option value="1:30 PM – 5:00 PM (End)" />
                    <option value="2:00 PM – 5:30 PM (End)" />
                    <option value="7:00 AM – 5:00 PM (Full Day)" />
                  </datalist>
                </label>

                <label>
                  Number of Boats
                  <input
                    type="number"
                    min="1"
                    value={formData.boats || 1}
                    onChange={(event) =>
                      updateField("boats", Math.max(1, Number(event.target.value)))
                    }
                    required
                  />
                </label>

                <label>
                  Adults
                  <input
                    type="number"
                    min="1"
                    value={formData.adults ?? 1}
                    onChange={(event) =>
                      updateField("adults", Math.max(1, Number(event.target.value)))
                    }
                    required
                  />
                </label>

                <label>
                  Children
                  <input
                    type="number"
                    min="0"
                    value={formData.children ?? 0}
                    onChange={(event) =>
                      updateField("children", Math.max(0, Number(event.target.value)))
                    }
                    required
                  />
                </label>

                <label>
                  Aadhaar number
                  <input
                    value={formData.aadhaar || ""}
                    onChange={(event) => updateField("aadhaar", event.target.value)}
                    placeholder="12-digit Aadhaar number"
                  />
                </label>

                <label>
                  Total amount (₹)
                  <input
                    type="number"
                    min="0"
                    value={formData.amount ?? 0}
                    onChange={(event) =>
                      updateField("amount", Math.max(0, Number(event.target.value)))
                    }
                    required
                  />
                </label>

                <label>
                  Payment status
                  <select
                    value={formData.paymentStatus || "Paid"}
                    onChange={(event) => updateField("paymentStatus", event.target.value)}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Refunded">Refunded</option>
                    <option value="Failed">Failed</option>
                  </select>
                </label>

                <label>
                  Booking status
                  <select
                    value={formData.status || "Confirmed"}
                    onChange={(event) => updateField("status", event.target.value)}
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </label>
              </div>

              <div className="TourBooking-form-total">
                <span>Total amount</span>
                <strong>{formatCurrency(Number(formData.amount) || 0)}</strong>
              </div>

              <div className="TourBooking-modal-footer">
                <button
                  type="button"
                  className="TourBooking-modal-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="TourBooking-modal-primary">
                  Save Booking <ChevronRight size={17} />
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default TourBooking;


import React, { useMemo, useState } from "react";
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
  Download,
} from "lucide-react";

import "./TourBooking.css";

const initialBookings = [
  {
    id: 1,
    bookingId: "TB-1001",
    packageName: "Jaynagar Boat Package",
    packageType: "Standard package · 1 DAY",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=160&q=80",
    name: "Ramesh Kumar",
    adults: 1,
    children: 0,
    date: "2026-10-15",
    time: "10:00 AM",
    phone: "9876543210",
    aadhaar: "1234 5678 9012",
    email: "ramesh@gmail.com",
    amount: 4000,
    status: "Confirmed",
  },
  {
    id: 2,
    bookingId: "TB-1002",
    packageName: "Sea View Package",
    packageType: "Premium package · 1 DAY",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=160&q=80",
    name: "Priya Sharma",
    adults: 2,
    children: 1,
    date: "2026-10-18",
    time: "02:00 PM",
    phone: "9123456789",
    aadhaar: "9876 5432 1098",
    email: "priya@gmail.com",
    amount: 5500,
    status: "Pending",
  },
  {
    id: 3,
    bookingId: "TB-1003",
    packageName: "Mangrove Exploration",
    packageType: "Standard package · 2 DAYS",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=160&q=80",
    name: "Amit Patel",
    adults: 3,
    children: 1,
    date: "2026-10-20",
    time: "09:00 AM",
    phone: "9988776655",
    aadhaar: "1122 3344 5566",
    email: "amit@gmail.com",
    amount: 6500,
    status: "Confirmed",
  },
  {
    id: 4,
    bookingId: "TB-1004",
    packageName: "Sunset Cruise",
    packageType: "Evening package · 1 DAY",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=160&q=80",
    name: "Neha Verma",
    adults: 2,
    children: 0,
    date: "2026-10-22",
    time: "05:00 PM",
    phone: "8811223344",
    aadhaar: "7788 9900 1122",
    email: "neha@gmail.com",
    amount: 4500,
    status: "Cancelled",
  },
  {
    id: 5,
    bookingId: "TB-1005",
    packageName: "Wildlife Safari",
    packageType: "Premium package · 1 DAY",
    image:
      "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=160&q=80",
    name: "Suresh Das",
    adults: 4,
    children: 2,
    date: "2026-10-25",
    time: "08:00 AM",
    phone: "7766554433",
    aadhaar: "3344 5566 7788",
    email: "suresh@gmail.com",
    amount: 7000,
    status: "Confirmed",
  },
  {
    id: 6,
    bookingId: "TB-1006",
    packageName: "River Adventure",
    packageType: "Adventure package · 1 DAY",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=160&q=80",
    name: "Ananya Mishra",
    adults: 2,
    children: 2,
    date: "2026-10-26",
    time: "11:00 AM",
    phone: "9090909090",
    aadhaar: "4455 6677 8899",
    email: "ananya@gmail.com",
    amount: 6000,
    status: "Pending",
  },
  {
    id: 7,
    bookingId: "TB-1007",
    packageName: "Bhitarkanika Explorer",
    packageType: "Family package · 2 DAYS",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=160&q=80",
    name: "Rahul Mohanty",
    adults: 3,
    children: 2,
    date: "2026-10-28",
    time: "09:30 AM",
    phone: "9098765432",
    aadhaar: "5566 7788 9900",
    email: "rahul@gmail.com",
    amount: 8500,
    status: "Confirmed",
  },
  {
    id: 8,
    bookingId: "TB-1008",
    packageName: "Jaynagar Boat Package",
    packageType: "Standard package · 1 DAY",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=160&q=80",
    name: "Pooja Singh",
    adults: 2,
    children: 1,
    date: "2026-10-30",
    time: "03:00 PM",
    phone: "9812345670",
    aadhaar: "6677 8899 0011",
    email: "pooja@gmail.com",
    amount: 4000,
    status: "Pending",
  },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("₹", "₹");

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const TourBooking = () => {
  const [bookings, setBookings] = useState(initialBookings);
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
    setFormData({ ...booking });
    setShowForm(true);
  };

  const openCreate = () => {
    setFormData({
      id: Date.now(),
      bookingId: `TB-${Date.now().toString().slice(-6)}`,
      packageName: packageNames[0] || "Jaynagar Boat Package",
      packageType: "Standard package · 1 DAY",
      image: initialBookings[0].image,
      name: "",
      adults: 1,
      children: 0,
      date: "",
      time: "",
      phone: "",
      aadhaar: "",
      email: "",
      amount: 4000,
      status: "Pending",
    });
    setShowForm(true);
  };

  const saveBooking = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.date || !formData.phone.trim()) {
      setNotice("Please fill in the guest name, travel date, and phone number.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      setNotice("Enter a valid 10-digit mobile number.");
      return;
    }

    if (bookings.some(
      (booking) =>
        booking.id !== formData.id &&
        booking.bookingId === formData.bookingId
    )) {
      setNotice("This booking ID already exists.");
      return;
    }

    const exists = bookings.some((booking) => booking.id === formData.id);

    setBookings((previous) =>
      exists
        ? previous.map((booking) =>
            booking.id === formData.id ? { ...formData } : booking
          )
        : [{ ...formData }, ...previous]
    );

    setShowForm(false);
    setNotice(exists ? "Booking updated successfully." : "Booking added successfully.");
    setCurrentPage(1);
  };

  const deleteBooking = (booking) => {
    const confirmed = window.confirm(
      `Delete booking ${booking.bookingId} for ${booking.name}?`
    );

    if (!confirmed) return;

    setBookings((previous) =>
      previous.filter((item) => item.id !== booking.id)
    );
    setSelectedIds((previous) =>
      previous.filter((id) => id !== booking.id)
    );
    setNotice("Booking deleted successfully.");
  };

  const deleteSelected = () => {
    if (!selectedIds.length) return;

    const confirmed = window.confirm(
      `Delete ${selectedIds.length} selected booking(s)?`
    );

    if (!confirmed) return;

    setBookings((previous) =>
      previous.filter((booking) => !selectedIds.includes(booking.id))
    );
    setSelectedIds([]);
    setNotice("Selected bookings deleted.");
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

        <div className="TourBooking-date-filter">
          <CalendarDays size={18} />
          <input
            aria-label="From date"
            type="date"
            value={fromDate}
            onChange={(event) => {
              setFromDate(event.target.value);
              setCurrentPage(1);
            }}
          />
          <span>to</span>
          <input
            aria-label="To date"
            type="date"
            value={toDate}
            onChange={(event) => {
              setToDate(event.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <button
          className="TourBooking-search-button"
          type="button"
          onClick={() => setCurrentPage(1)}
        >
          <Search size={18} />
          Search
        </button>

        <button
          className="TourBooking-add-button"
          type="button"
          onClick={openCreate}
        >
          <Plus size={21} />
          Add Booking
        </button>

        <button
          className="TourBooking-export-button"
          type="button"
          onClick={exportBookings}
          title="Export filtered bookings to CSV"
        >
          <Download size={18} />
          <span>Export</span>
        </button>
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
                        <b>{formatCurrency(booking.amount)} <small>per boat</small></b>
                      </div>
                    </div>
                  </td>
                  <td className="TourBooking-guest-name">{booking.name}</td>
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

              {paginatedBookings.length === 0 && (
                <tr>
                  <td colSpan="14" className="TourBooking-empty-state">
                    <Search size={32} />
                    <strong>No bookings found</strong>
                    <span>Try changing your search or filters.</span>
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
              <div><span><Users size={15} /> Guests</span><strong>{activeBooking.adults} adults, {activeBooking.children} children</strong></div>
              <div><span><CalendarDays size={15} /> Travel date</span><strong>{formatDate(activeBooking.date)}</strong></div>
              <div><span><Clock3 size={15} /> Travel time</span><strong>{activeBooking.time || "—"}</strong></div>
              <div><span><Phone size={15} /> Phone</span><strong>{activeBooking.phone}</strong></div>
              <div><span><Mail size={15} /> Email</span><strong>{activeBooking.email || "—"}</strong></div>
              <div><span><MapPin size={15} /> Aadhaar number</span><strong>{activeBooking.aadhaar || "—"}</strong></div>
              <div><span><CheckCircle2 size={15} /> Status</span><strong>{activeBooking.status}</strong></div>
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
                    value={formData.bookingId}
                    onChange={(event) =>
                      updateField("bookingId", event.target.value)
                    }
                    required
                  />
                </label>

                <label>
                  Package
                  <select
                    value={formData.packageName}
                    onChange={(event) => {
                      const selected = event.target.value;
                      updateField("packageName", selected);
                      const existing = bookings.find(
                        (booking) => booking.packageName === selected
                      );
                      if (existing) {
                        setFormData((previous) => ({
                          ...previous,
                          packageName: selected,
                          packageType: existing.packageType,
                          image: existing.image,
                          amount: existing.amount,
                        }));
                      }
                    }}
                    required
                  >
                    {[...new Set([
                      ...packageNames,
                      formData.packageName,
                    ])].map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </label>

                <label>
                  Full name
                  <input
                    value={formData.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </label>

                <label>
                  Phone number
                  <input
                    value={formData.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    required
                  />
                </label>

                <label>
                  Travel date
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(event) => updateField("date", event.target.value)}
                    required
                  />
                </label>

                <label>
                  Travel time
                  <select
                    value={formData.time}
                    onChange={(event) => updateField("time", event.target.value)}
                    required
                  >
                    <option value="">Select a time</option>
                    <option>08:00 AM</option>
                    <option>09:00 AM</option>
                    <option>09:30 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>02:00 PM</option>
                    <option>03:00 PM</option>
                    <option>05:00 PM</option>
                  </select>
                </label>

                <label>
                  Adults
                  <input
                    type="number"
                    min="1"
                    value={formData.adults}
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
                    value={formData.children}
                    onChange={(event) =>
                      updateField("children", Math.max(0, Number(event.target.value)))
                    }
                    required
                  />
                </label>

                <label>
                  Aadhaar number (optional)
                  <input
                    value={formData.aadhaar}
                    onChange={(event) => updateField("aadhaar", event.target.value)}
                    placeholder="12-digit Aadhaar number"
                  />
                </label>

                <label>
                  Email address
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="you@example.com"
                  />
                </label>

                <label>
                  Total amount (₹)
                  <input
                    type="number"
                    min="0"
                    value={formData.amount}
                    onChange={(event) =>
                      updateField("amount", Math.max(0, Number(event.target.value)))
                    }
                    required
                  />
                </label>

                <label>
                  Booking status
                  <select
                    value={formData.status}
                    onChange={(event) => updateField("status", event.target.value)}
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Cancelled</option>
                  </select>
                </label>
              </div>

              <div className="TourBooking-form-total">
                <span>Estimated total</span>
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

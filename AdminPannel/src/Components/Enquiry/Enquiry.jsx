import React, { useMemo, useState } from "react";
import {
  Users,
  FileText,
  Clock3,
  MessageCircle,
  CircleCheck,
  Download,
  Plus,
  Search,
  CalendarDays,
  Eye,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  UserRound,
  Mail,
  Phone,
  CheckSquare,
  LayoutDashboard,
  Leaf,
} from "lucide-react";

import "./Enquiry.css";

const photoPool = [
  "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=140&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=140&q=80",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=140&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=140&q=80",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=140&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=140&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=140&q=80",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=140&q=80",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=140&q=80",
  "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=140&q=80",
];

const initialRows = [
  ["Rahul Mehta", "rahul.mehta@gmail.com", "+91 98765 43210", "Bhitarkanika Tour", "12 Dec 2025", "14 Dec 2025", 2, "New", "24 Oct 2025", "10:30 AM"],
  ["Priya Sharma", "priya.sharma@gmail.com", "+91 87654 32109", "River Safari", "5 Jan 2026", "7 Jan 2026", 4, "In Progress", "23 Oct 2025", "04:15 PM"],
  ["Amit Kumar", "amit.kumar@yahoo.com", "+91 76543 21098", "Wildlife Experience", "20 Jan 2026", "22 Jan 2026", 3, "Replied", "22 Oct 2025", "11:20 AM"],
  ["Sneha Patel", "sneha.patel@gmail.com", "+91 65432 10987", "Mangrove Tour", "14 Feb 2026", "16 Feb 2026", 2, "In Progress", "21 Oct 2025", "02:45 PM"],
  ["Vikash Singh", "vikash.singh@gmail.com", "+91 98760 12345", "Family Tour", "2 Mar 2026", "5 Mar 2026", 5, "Replied", "20 Oct 2025", "09:10 AM"],
  ["Neha Reddy", "neha.reddy@gmail.com", "+91 87650 98765", "Photography Tour", "18 Mar 2026", "20 Mar 2026", 2, "New", "19 Oct 2025", "01:30 PM"],
  ["Sanjay Das", "sanjay.das@gmail.com", "+91 76540 67890", "Bird Watching", "10 Apr 2026", "12 Apr 2026", 3, "Closed", "18 Oct 2025", "12:10 PM"],
  ["Kavita Gupta", "kavita.gupta@gmail.com", "+91 65430 24680", "Weekend Getaway", "24 Apr 2026", "26 Apr 2026", 2, "Replied", "17 Oct 2025", "03:45 AM"],
  ["Arjun Das", "arjun.das@gmail.com", "+91 98765 11002", "Coastal Escape", "2 May 2026", "4 May 2026", 3, "New", "16 Oct 2025", "10:15 AM"],
  ["Meera Nair", "meera.nair@gmail.com", "+91 87654 22011", "Nature Photography", "8 May 2026", "10 May 2026", 2, "In Progress", "15 Oct 2025", "11:40 AM"],
  ["Rohan Patel", "rohan.patel@gmail.com", "+91 76543 33010", "Forest Adventure", "15 May 2026", "17 May 2026", 4, "Closed", "14 Oct 2025", "04:25 PM"],
  ["Ananya Roy", "ananya.roy@gmail.com", "+91 65432 44098", "Island Tour", "21 May 2026", "23 May 2026", 2, "Replied", "13 Oct 2025", "09:50 AM"],
].map((row, index) => ({
  id: index + 1,
  name: row[0],
  email: row[1],
  phone: row[2],
  tour: row[3],
  start: row[4],
  end: row[5],
  travelers: row[6],
  status: row[7],
  date: row[8],
  time: row[9],
  photo: photoPool[index % photoPool.length],
}));

const blankForm = {
  name: "",
  email: "",
  phone: "",
  tour: "",
  start: "",
  end: "",
  travelers: "2",
  status: "New",
};

const statusClass = (status) =>
  `Enquiry-${status.toLowerCase().replace(" ", "-")}`;

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Enquiry = () => {
  const [rows, setRows] = useState(initialRows);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [selected, setSelected] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(blankForm);
  const [toast, setToast] = useState("");
  const [viewRow, setViewRow] = useState(null);

  const filtered = useMemo(() => {
    return rows.filter((row) => {
      const matchesStatus =
        status === "All Status" || row.status === status;

      const matchesSearch = [
        row.name,
        row.email,
        row.phone,
        row.tour,
        row.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [rows, search, status]);

  const pageCount = Math.max(
    1,
    Math.ceil(filtered.length / pageSize)
  );

  const pageRows = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const counts = {
    total: rows.length,
    new: rows.filter((row) => row.status === "New").length,
    progress: rows.filter((row) => row.status === "In Progress").length,
    replied: rows.filter((row) => row.status === "Replied").length,
    closed: rows.filter((row) => row.status === "Closed").length,
  };

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const openNew = () => {
    setForm({ ...blankForm });
    setModal({ type: "new" });
  };

  const convertDateForInput = (date) => {
    if (!date || date === "Not set") return "";

    const parsed = new Date(date);

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
      travelers: String(row.travelers),
    });

    setModal({
      type: "edit",
      id: row.id,
    });
  };

  const saveForm = (event) => {
    event.preventDefault();

    const now = new Date();

    const date = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const formatDate = (value) => {
      if (!value) return "Not set";

      return new Date(`${value}T12:00:00`).toLocaleDateString(
        "en-GB",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      );
    };

    const record = {
      ...form,
      travelers: Math.max(1, Number(form.travelers) || 1),
      start: formatDate(form.start),
      end: formatDate(form.end),
      date,
      time: now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      photo: photoPool[Math.floor(Math.random() * photoPool.length)],
    };

    if (modal.type === "edit") {
      setRows((oldRows) =>
        oldRows.map((row) =>
          row.id === modal.id ? { ...row, ...record } : row
        )
      );

      notify("Enquiry updated successfully");
    } else {
      setRows((oldRows) => [
        { ...record, id: Date.now() },
        ...oldRows,
      ]);

      setPage(1);
      notify("New enquiry added successfully");
    }

    setModal(null);
  };

  const deleteRow = (id) => {
    if (
      window.confirm(
        "Delete this enquiry? This action cannot be undone."
      )
    ) {
      setRows((oldRows) => oldRows.filter((row) => row.id !== id));
      setSelected((oldSelected) =>
        oldSelected.filter((item) => item !== id)
      );

      notify("Enquiry deleted");
    }
  };

  const exportRows = () => {
    const headers = [
      "Customer",
      "Email",
      "Phone",
      "Tour Package",
      "Travel Start",
      "Travel End",
      "Travelers",
      "Status",
      "Date",
    ];

    const csv = [
      headers,
      ...filtered.map((row) => [
        row.name,
        row.email,
        row.phone,
        row.tour,
        row.start,
        row.end,
        row.travelers,
        row.status,
        row.date,
      ]),
    ]
      .map((line) =>
        line
          .map(
            (value) =>
              `"${String(value ?? "").replaceAll('"', '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "enquiries.csv";
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
        ? oldSelected.filter(
            (id) => !pageRows.some((row) => row.id === id)
          )
        : [
            ...new Set([
              ...oldSelected,
              ...pageRows.map((row) => row.id),
            ]),
          ]
    );
  };

  return (
    <main className="Enquiry-app-shell">
      <div className="Enquiry-ambient Enquiry-ambient-one" />
      <div className="Enquiry-ambient Enquiry-ambient-two" />

      {/* Page Header */}
      <header className="Enquiry-page-header">
        <div className="Enquiry-title-line">
          <span className="Enquiry-title-accent" />

          <div>
            <h1>Enquiries</h1>
            <p>Manage all customer enquiries and requests</p>
          </div>
        </div>

        <div className="Enquiry-breadcrumbs">
          <LayoutDashboard size={15} />
          <span>Dashboard</span>
          <ChevronRight size={15} />
          <b>Enquiries</b>
        </div>
      </header>

      {/* Statistics Cards */}
      <section className="Enquiry-stats-grid">
        <Stat
          icon={<Users />}
          label="TOTAL ENQUIRIES"
          value={counts.total}
          note="All customer requests"
          tone="blue"
        />

        <Stat
          icon={<FileText />}
          label="NEW"
          value={counts.new}
          note="Needs attention"
          tone="purple"
        />

        <Stat
          icon={<Clock3 />}
          label="IN PROGRESS"
          value={counts.progress}
          note="Currently processing"
          tone="amber"
        />

        <Stat
          icon={<MessageCircle />}
          label="REPLIED"
          value={counts.replied}
          note="Customer contacted"
          tone="green"
        />

        <Stat
          icon={<CircleCheck />}
          label="CLOSED"
          value={counts.closed}
          note="Completed enquiries"
          tone="slate"
        />
      </section>

      {/* Enquiries Table */}
      <section className="Enquiry-panel">
        <div className="Enquiry-panel-heading">
          <div className="Enquiry-section-title">
            <span className="Enquiry-section-icon">
              <FileText size={23} />
            </span>

            <div>
              <h2>Enquiries List</h2>
              <p>View and manage all incoming enquiries</p>
            </div>
          </div>

          <div className="Enquiry-toolbar">
            <button
              type="button"
              className="Enquiry-btn Enquiry-btn-light"
              onClick={toggleAll}
            >
              <CheckSquare size={16} />
              {allPageSelected ? "Deselect All" : "Select All"}
            </button>

            <button
              type="button"
              className="Enquiry-btn Enquiry-btn-outline"
              onClick={exportRows}
            >
              <Download size={16} />
              Export
            </button>

            <button
              type="button"
              className="Enquiry-btn Enquiry-btn-primary"
              onClick={openNew}
            >
              <Plus size={17} />
              New Enquiry
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="Enquiry-filter-row">
          <label className="Enquiry-select-wrap">
            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
              aria-label="Filter by status"
            >
              <option>All Status</option>
              <option>New</option>
              <option>In Progress</option>
              <option>Replied</option>
              <option>Closed</option>
            </select>

            <ChevronDown size={16} />
          </label>

          <label className="Enquiry-search-box">
            <Search size={18} />

            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search name, email, phone, destination..."
              aria-label="Search enquiries"
            />
          </label>

          <span className="Enquiry-showing">
            Showing{" "}
            <b>
              {filtered.length ? (page - 1) * pageSize + 1 : 0} to{" "}
              {Math.min(page * pageSize, filtered.length)}
            </b>{" "}
            of <b>{filtered.length}</b> results
          </span>
        </div>

        {/* Responsive Table */}
        <div className="Enquiry-table-scroll">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={allPageSelected}
                    onChange={toggleAll}
                    aria-label="Select visible enquiries"
                  />
                </th>
                <th>#</th>
                <th>CUSTOMER</th>
                <th>EMAIL</th>
                <th>PHONE</th>
                <th>TOUR PACKAGE</th>
                <th>TRAVEL DATE</th>
                <th>TRAVELERS</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {pageRows.map((row, index) => (
                <tr key={row.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(row.id)}
                      onChange={() =>
                        setSelected((oldSelected) =>
                          oldSelected.includes(row.id)
                            ? oldSelected.filter((id) => id !== row.id)
                            : [...oldSelected, row.id]
                        )
                      }
                      aria-label={`Select ${row.name}`}
                    />
                  </td>

                  <td className="Enquiry-row-number">
                    {(page - 1) * pageSize + index + 1}
                  </td>

                  <td>
                    <div className="Enquiry-customer-cell">
                      <span
                        className={`Enquiry-avatar Enquiry-avatar-${index % 6}`}
                      >
                        {initials(row.name)}
                      </span>

                      <span className="Enquiry-customer-name">
                        {row.name}
                      </span>
                    </div>
                  </td>

                  <td className="Enquiry-muted-cell">{row.email}</td>
                  <td className="Enquiry-muted-cell">{row.phone}</td>

                  <td>
                    <div className="Enquiry-tour-cell">
                      <img
                        src={row.photo}
                        alt=""
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.src = photoPool[1];
                        }}
                      />
                      <span>{row.tour}</span>
                    </div>
                  </td>

                  <td>
                    <div className="Enquiry-date-cell">
                      <CalendarDays size={16} />
                      <span>
                        {row.start}
                        <small>{row.end}</small>
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="Enquiry-travelers">
                      <Users size={15} />
                      <span>{row.travelers} Adults</span>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`Enquiry-status-badge ${statusClass(row.status)}`}
                    >
                      <i />
                      {row.status}
                    </span>
                  </td>

                  <td className="Enquiry-date-created">
                    {row.date}
                    <small>{row.time}</small>
                  </td>

                  <td>
                    <div className="Enquiry-action-buttons">
                      <button
                        type="button"
                        className="Enquiry-icon-btn Enquiry-view"
                        title="View enquiry"
                        aria-label={`View ${row.name}`}
                        onClick={() => setViewRow(row)}
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        className="Enquiry-icon-btn Enquiry-edit"
                        title="Edit enquiry"
                        aria-label={`Edit ${row.name}`}
                        onClick={() => openEdit(row)}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        className="Enquiry-icon-btn Enquiry-delete"
                        title="Delete enquiry"
                        aria-label={`Delete ${row.name}`}
                        onClick={() => deleteRow(row.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {pageRows.length === 0 && (
                <tr>
                  <td colSpan="11" className="Enquiry-empty-state">
                    <Search size={25} />
                    <strong>No enquiries found</strong>
                    <span>
                      Try changing your search or status filter.
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <footer className="Enquiry-table-footer">
          <div className="Enquiry-entries-control">
            <span>Show</span>

            <label>
              <select
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value));
                  setPage(1);
                }}
                aria-label="Rows per page"
              >
                <option value={5}>5</option>
                <option value={8}>8</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>

              <ChevronDown size={14} />
            </label>

            <span>entries</span>
          </div>

          <div className="Enquiry-pagination">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((current) => current - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft size={17} />
            </button>

            {Array.from(
              { length: pageCount },
              (_, index) => index + 1
            )
              .slice(
                Math.max(0, Math.min(page - 1, pageCount - 3)),
                Math.max(3, Math.min(page - 1, pageCount - 3)) + 3
              )
              .map((number) => (
                <button
                  type="button"
                  key={number}
                  className={
                    page === number ? "Enquiry-current" : ""
                  }
                  onClick={() => setPage(number)}
                >
                  {number}
                </button>
              ))}

            <button
              type="button"
              disabled={page >= pageCount}
              onClick={() => setPage((current) => current + 1)}
              aria-label="Next page"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </footer>
      </section>

      {/* Footer Watermark */}
      <div className="Enquiry-watermark">
        <Leaf size={12} />
        crafted with care
      </div>

      {/* Add / Edit Enquiry Modal */}
      {modal && (
        <div
          className="Enquiry-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setModal(null);
            }
          }}
        >
          <section
            className="Enquiry-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="Enquiry-form-title"
          >
            <div className="Enquiry-modal-header">
              <div>
                <span className="Enquiry-modal-icon">
                  <FileText size={20} />
                </span>

                <div>
                  <h2 id="Enquiry-form-title">
                    {modal.type === "edit"
                      ? "Edit Enquiry"
                      : "New Enquiry"}
                  </h2>

                  <p>
                    {modal.type === "edit"
                      ? "Update customer enquiry details"
                      : "Enter the customer details below to add an enquiry."}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="Enquiry-close-btn"
                onClick={() => setModal(null)}
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={saveForm}>
              <div className="Enquiry-form-grid">
                <label>
                  Customer name *
                  <span className="Enquiry-input-icon">
                    <UserRound size={16} />
                    <input
                      required
                      value={form.name}
                      onChange={(event) =>
                        setForm({ ...form, name: event.target.value })
                      }
                      placeholder="e.g. Rahul Mehta"
                    />
                  </span>
                </label>

                <label>
                  Email address *
                  <span className="Enquiry-input-icon">
                    <Mail size={16} />
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        setForm({ ...form, email: event.target.value })
                      }
                      placeholder="name@example.com"
                    />
                  </span>
                </label>

                <label>
                  Phone number *
                  <span className="Enquiry-input-icon">
                    <Phone size={16} />
                    <input
                      required
                      value={form.phone}
                      onChange={(event) =>
                        setForm({ ...form, phone: event.target.value })
                      }
                      placeholder="+91 98765 43210"
                    />
                  </span>
                </label>

                <label>
                  Tour package *
                  <span className="Enquiry-input-icon">
                    <MapPin size={16} />
                    <input
                      required
                      value={form.tour}
                      onChange={(event) =>
                        setForm({ ...form, tour: event.target.value })
                      }
                      placeholder="Tour or destination"
                    />
                  </span>
                </label>

                <label>
                  Travel start date
                  <input
                    className="Enquiry-plain-input"
                    type="date"
                    value={form.start}
                    onChange={(event) =>
                      setForm({ ...form, start: event.target.value })
                    }
                  />
                </label>

                <label>
                  Travel end date
                  <input
                    className="Enquiry-plain-input"
                    type="date"
                    min={form.start || undefined}
                    value={form.end}
                    onChange={(event) =>
                      setForm({ ...form, end: event.target.value })
                    }
                  />
                </label>

                <label>
                  Number of travelers
                  <input
                    className="Enquiry-plain-input"
                    type="number"
                    min="1"
                    max="99"
                    required
                    value={form.travelers}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        travelers: event.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Enquiry status
                  <select
                    className="Enquiry-plain-input"
                    value={form.status}
                    onChange={(event) =>
                      setForm({ ...form, status: event.target.value })
                    }
                  >
                    <option>New</option>
                    <option>In Progress</option>
                    <option>Replied</option>
                    <option>Closed</option>
                  </select>
                </label>
              </div>

              <div className="Enquiry-form-actions">
                <button
                  type="button"
                  className="Enquiry-btn Enquiry-btn-light"
                  onClick={() => setModal(null)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="Enquiry-btn Enquiry-btn-primary"
                >
                  <Plus size={16} />
                  {modal.type === "edit" ? "Save Changes" : "Add Enquiry"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {/* View Enquiry Details Modal */}
      {viewRow && (
        <div
          className="Enquiry-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setViewRow(null);
            }
          }}
        >
          <section
            className="Enquiry-modal-card Enquiry-detail-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="Enquiry-detail-title"
          >
            <div className="Enquiry-modal-header">
              <div>
                <span className="Enquiry-modal-icon">
                  <Eye size={20} />
                </span>

                <div>
                  <h2 id="Enquiry-detail-title">Enquiry Details</h2>
                  <p>Customer request overview</p>
                </div>
              </div>

              <button
                type="button"
                className="Enquiry-close-btn"
                onClick={() => setViewRow(null)}
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="Enquiry-detail-person">
              <span className="Enquiry-avatar Enquiry-avatar-1">
                {initials(viewRow.name)}
              </span>

              <div>
                <strong>{viewRow.name}</strong>
                <span>{viewRow.email}</span>
              </div>

              <span
                className={`Enquiry-status-badge ${statusClass(viewRow.status)}`}
              >
                <i />
                {viewRow.status}
              </span>
            </div>

            <div className="Enquiry-detail-grid">
              {[
                ["Phone", viewRow.phone],
                ["Tour package", viewRow.tour],
                ["Travel dates", `${viewRow.start} – ${viewRow.end}`],
                ["Travelers", `${viewRow.travelers} Adults`],
                ["Enquiry received", `${viewRow.date}, ${viewRow.time}`],
              ].map(([label, value]) => (
                <div className="Enquiry-detail-item" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            <div className="Enquiry-form-actions">
              <button
                type="button"
                className="Enquiry-btn Enquiry-btn-light"
                onClick={() => setViewRow(null)}
              >
                Close
              </button>

              <button
                type="button"
                className="Enquiry-btn Enquiry-btn-primary"
                onClick={() => {
                  const row = viewRow;
                  setViewRow(null);
                  openEdit(row);
                }}
              >
                <Pencil size={16} />
                Edit Enquiry
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Notification */}
      {toast && (
        <div className="Enquiry-toast">
          <CircleCheck size={18} />
          {toast}
        </div>
      )}
    </main>
  );
};

const Stat = ({ icon, label, value, note, tone }) => {
  return (
    <article className={`Enquiry-stat-card Enquiry-tone-${tone}`}>
      <span className="Enquiry-stat-icon">{icon}</span>

      <div className="Enquiry-stat-copy">
        <span className="Enquiry-stat-label">{label}</span>
        <strong>{value}</strong>
        <span className="Enquiry-stat-note">{note}</span>
      </div>

      <span className="Enquiry-stat-orb" />
    </article>
  );
};

export default Enquiry;
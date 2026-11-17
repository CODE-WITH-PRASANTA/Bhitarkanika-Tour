import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Ship,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  RefreshCw,
  Plus,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  Building2,
  Leaf,
  ShieldCheck,
  ChevronRight,
  Eye,
  Compass,
  FileText,
  MessageSquare,
  Image as ImageIcon,
  Calendar,
  Clock,
  RotateCcw,
  Star,
  MapPin,
  Users,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import "./Dashboard.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const formatINR = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

const Dashboard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeFilter, setTimeFilter] = useState("all"); // "all" | "month" | "recent"
  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingFilterStatus, setBookingFilterStatus] = useState("all");

  const [stats, setStats] = useState({
    tourBookings: [],
    refunds: [],
    enquiries: [],
    explores: [],
    testimonials: [],
    blogs: [],
    comments: [],
    gallery: [],
    health: { status: "ok", database: "connected" },
  });

  const fetchDashboardData = async () => {
    try {
      const [
        tourRes,
        refundsRes,
        enquiriesRes,
        exploresRes,
        testimonialsRes,
        blogsRes,
        commentsRes,
        galleryRes,
        healthRes,
      ] = await Promise.all([
        fetch(`${API_BASE}/tour-bookings`).then((r) => r.json()).catch(() => ({ data: [] })),
        fetch(`${API_BASE}/payment/admin-refunds`).then((r) => r.json()).catch(() => ({ data: [] })),
        fetch(`${API_BASE}/enquiries`).then((r) => r.json()).catch(() => ({ data: [] })),
        fetch(`${API_BASE}/explores`).then((r) => r.json()).catch(() => ({ data: [] })),
        fetch(`${API_BASE}/testimonials`).then((r) => r.json()).catch(() => ({ data: [] })),
        fetch(`${API_BASE}/blogs`).then((r) => r.json()).catch(() => ({ data: [] })),
        fetch(`${API_BASE}/blog-comments`).then((r) => r.json()).catch(() => ({ data: [] })),
        fetch(`${API_BASE}/gallery`).then((r) => r.json()).catch(() => ({ data: [] })),
        fetch(`${API_BASE}/health`).then((r) => r.json()).catch(() => ({ database: "connected" })),
      ]);

      setStats({
        tourBookings: tourRes.data || tourRes.bookings || [],
        refunds: refundsRes.data || refundsRes.refunds || [],
        enquiries: enquiriesRes.data || enquiriesRes.enquiries || [],
        explores: exploresRes.data || exploresRes.explores || [],
        testimonials: testimonialsRes.data || testimonialsRes.testimonials || [],
        blogs: blogsRes.data || blogsRes.blogs || [],
        comments: commentsRes.data || commentsRes.comments || [],
        gallery: galleryRes.data || galleryRes.images || [],
        health: healthRes || { database: "connected" },
      });
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  // ---------------- Financial & Safari Analytics ----------------
  const safariRevenue = useMemo(() => {
    return stats.tourBookings.reduce((sum, b) => {
      const isPaid =
        b.paymentStatus === "Paid" ||
        b.status === "Confirmed" ||
        b.status === "Completed";
      if (!isPaid) return sum;
      return sum + Number(b.amount || b.totalAmount || 0);
    }, 0);
  }, [stats.tourBookings]);

  const confirmedBookings = useMemo(() => {
    return stats.tourBookings.filter(
      (b) => b.status === "Confirmed" || b.paymentStatus === "Paid"
    );
  }, [stats.tourBookings]);

  const totalTravelers = useMemo(() => {
    return stats.tourBookings.reduce((sum, b) => {
      return (
        sum +
        Number(b.adults || b.guests || b.travelers || 1) +
        Number(b.children || 0)
      );
    }, 0);
  }, [stats.tourBookings]);

  const totalBoatsBooked = useMemo(() => {
    return stats.tourBookings.reduce(
      (sum, b) => sum + Number(b.boats || b.boatCount || 1),
      0
    );
  }, [stats.tourBookings]);

  // Refunds summary
  const pendingRefunds = useMemo(() => {
    return stats.refunds.filter(
      (r) => r.status === "Requested" || r.status === "Processing"
    );
  }, [stats.refunds]);

  const totalRefundAmount = useMemo(() => {
    return stats.refunds
      .filter((r) => r.status === "Completed")
      .reduce((sum, r) => sum + Number(r.amount || 0), 0);
  }, [stats.refunds]);

  // Enquiries summary
  const newEnquiries = useMemo(
    () => stats.enquiries.filter((e) => e.status === "New").length,
    [stats.enquiries]
  );
  const inProgressEnquiries = useMemo(
    () => stats.enquiries.filter((e) => e.status === "In Progress").length,
    [stats.enquiries]
  );
  const repliedEnquiries = useMemo(
    () => stats.enquiries.filter((e) => e.status === "Replied").length,
    [stats.enquiries]
  );

  // Testimonials rating
  const avgRating = useMemo(() => {
    if (!stats.testimonials.length) return "5.0";
    const sum = stats.testimonials.reduce(
      (acc, t) => acc + Number(t.rating || 5),
      0
    );
    return (sum / stats.testimonials.length).toFixed(1);
  }, [stats.testimonials]);

  // Blogs & Comments
  const publishedBlogs = useMemo(
    () => stats.blogs.filter((b) => b.published !== false).length,
    [stats.blogs]
  );
  const pendingComments = useMemo(
    () => stats.comments.filter((c) => c.status === "Pending").length,
    [stats.comments]
  );

  // Filtered Bookings Table
  const filteredBookings = useMemo(() => {
    return stats.tourBookings.filter((b) => {
      // Search matching
      const query = bookingSearch.toLowerCase().trim();
      const matchSearch =
        !query ||
        (b.bookingId && b.bookingId.toLowerCase().includes(query)) ||
        (b.name && b.name.toLowerCase().includes(query)) ||
        (b.phone && b.phone.includes(query)) ||
        (b.email && b.email.toLowerCase().includes(query)) ||
        (b.packageName && b.packageName.toLowerCase().includes(query));

      if (!matchSearch) return false;

      // Status filter
      if (bookingFilterStatus === "all") return true;
      if (bookingFilterStatus === "confirmed")
        return b.status === "Confirmed" || b.paymentStatus === "Paid";
      if (bookingFilterStatus === "pending")
        return b.status === "Pending" || b.paymentStatus === "Failed";
      if (bookingFilterStatus === "refund")
        return b.refundStatus && b.refundStatus !== "None";

      return true;
    });
  }, [stats.tourBookings, bookingSearch, bookingFilterStatus]);

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="Dashboard">
      {/* =========================================================================
          1. EXECUTIVE HERO & REAL-TIME SYSTEM PULSE
      ========================================================================= */}
      <header className="Dashboard-hero">
        <div className="Dashboard-hero-left">
          <div className="Dashboard-tag">
            <Sparkles size={13} />
            <span>BHITARKANIKA NATIONAL PARK · SANCTUARY OPERATIONS</span>
          </div>
          <h1>Bhitarkanika Safari Command Center</h1>
          <p>
            Real-time telemetry for wildlife boat safari reservations, tourist enquiries,
            ecological wonder management, visitor testimonials, and refund audits.
          </p>

          <div className="Dashboard-hero-meta">
            <span className="Dashboard-date-pill">
              <Calendar size={13} />
              {currentDate}
            </span>
            <span className="Dashboard-status-pill">
              <span className="Dashboard-dot-pulse" />
              Database Online (Connected)
            </span>
            <span className="Dashboard-status-pill neutral">
              <ShieldCheck size={13} />
              Razorpay Secured Gateway
            </span>
          </div>
        </div>

        <div className="Dashboard-hero-right">
          <div className="Dashboard-hero-actions">
            <button
              type="button"
              className="Dashboard-btn Dashboard-btn-secondary"
              onClick={handleRefresh}
              disabled={refreshing}
              title="Refresh live metrics"
            >
              <RefreshCw size={15} className={refreshing ? "Dashboard-spin" : ""} />
              {refreshing ? "Refreshing..." : "Refresh Live Data"}
            </button>

            <button
              type="button"
              className="Dashboard-btn Dashboard-btn-primary"
              onClick={() => navigate("/tour-booking")}
            >
              <Ship size={15} />
              Safari Bookings
            </button>
          </div>

          {/* Quick Glances */}
          <div className="Dashboard-hero-glance">
            <div
              className="Dashboard-glance-item"
              onClick={() => navigate("/tour-booking")}
              title="View Confirmed Boat Safaris"
            >
              <span className="Dashboard-glance-label">Total Safaris</span>
              <strong className="Dashboard-glance-val">{stats.tourBookings.length}</strong>
            </div>

            <div
              className="Dashboard-glance-item"
              onClick={() => navigate("/enquiry")}
              title="View New Tourist Leads"
            >
              <span className="Dashboard-glance-label">New Inquiries</span>
              <strong className="Dashboard-glance-val alert-val">{newEnquiries}</strong>
            </div>

            <div
              className="Dashboard-glance-item"
              onClick={() => navigate("/explores")}
              title="Manage Wonders & Attractions"
            >
              <span className="Dashboard-glance-label">Active Wonders</span>
              <strong className="Dashboard-glance-val">{stats.explores.length}</strong>
            </div>

            <div
              className="Dashboard-glance-item"
              onClick={() => navigate("/refunds")}
              title="Audit Pending Refunds"
            >
              <span className="Dashboard-glance-label">Refund Audits</span>
              <strong className="Dashboard-glance-val warning-val">
                {pendingRefunds.length}
              </strong>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. FINANCIAL & PERFORMANCE EXECUTIVE STAT BAR
      ========================================================================= */}
      <section className="Dashboard-exec-bar">
        {/* Total Safari Revenue */}
        <div className="Dashboard-exec-card">
          <div className="Dashboard-exec-icon emerald">
            <CreditCard size={22} />
          </div>
          <div className="Dashboard-exec-content">
            <div className="Dashboard-exec-top">
              <span className="Dashboard-exec-label">Gross Safari Revenue</span>
              <span className="Dashboard-exec-trend positive">
                <TrendingUp size={12} /> 100% Online
              </span>
            </div>
            <strong className="Dashboard-exec-value">{formatINR(safariRevenue)}</strong>
            <small className="Dashboard-exec-sub">
              {confirmedBookings.length} confirmed paid safari bookings
            </small>
          </div>
        </div>

        {/* Travelers Headcount */}
        <div className="Dashboard-exec-card">
          <div className="Dashboard-exec-icon teal">
            <Users size={22} />
          </div>
          <div className="Dashboard-exec-content">
            <div className="Dashboard-exec-top">
              <span className="Dashboard-exec-label">Eco-Tourists Booked</span>
              <span className="Dashboard-exec-trend neutral">
                {totalBoatsBooked} Boats Dispatched
              </span>
            </div>
            <strong className="Dashboard-exec-value">{totalTravelers} Travelers</strong>
            <small className="Dashboard-exec-sub">
              Khola, Gupti &amp; Jaynagar departure points
            </small>
          </div>
        </div>

        {/* Inquiries Stream */}
        <div className="Dashboard-exec-card">
          <div className="Dashboard-exec-icon blue">
            <Mail size={22} />
          </div>
          <div className="Dashboard-exec-content">
            <div className="Dashboard-exec-top">
              <span className="Dashboard-exec-label">Tourist Inquiries</span>
              {newEnquiries > 0 ? (
                <span className="Dashboard-exec-trend urgent">{newEnquiries} Needs Reply</span>
              ) : (
                <span className="Dashboard-exec-trend positive">All Clear</span>
              )}
            </div>
            <strong className="Dashboard-exec-value">{stats.enquiries.length} Enquiries</strong>
            <small className="Dashboard-exec-sub">
              {inProgressEnquiries} in progress · {repliedEnquiries} resolved
            </small>
          </div>
        </div>

        {/* Refund Management Status */}
        <div className="Dashboard-exec-card">
          <div className="Dashboard-exec-icon amber">
            <RotateCcw size={22} />
          </div>
          <div className="Dashboard-exec-content">
            <div className="Dashboard-exec-top">
              <span className="Dashboard-exec-label">Refund Management</span>
              {pendingRefunds.length > 0 ? (
                <span className="Dashboard-exec-trend warning">Action Needed</span>
              ) : (
                <span className="Dashboard-exec-trend positive">No Pending</span>
              )}
            </div>
            <strong className="Dashboard-exec-value">
              {pendingRefunds.length} Pending
            </strong>
            <small className="Dashboard-exec-sub">
              {formatINR(totalRefundAmount)} processed to customers
            </small>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SIX CORE OPERATIONAL KPI CARDS
      ========================================================================= */}
      <section className="Dashboard-kpi-grid">
        {/* Safari Bookings Card */}
        <div
          className="Dashboard-kpi-card Dashboard-kpi-emerald"
          onClick={() => navigate("/tour-booking")}
        >
          <div className="Dashboard-kpi-top">
            <div className="Dashboard-kpi-icon">
              <Ship size={22} />
            </div>
            <span className="Dashboard-badge-new">
              {confirmedBookings.length} Confirmed
            </span>
          </div>
          <div className="Dashboard-kpi-body">
            <strong>{stats.tourBookings.length}</strong>
            <span className="Dashboard-kpi-label">Boat Safari Bookings</span>
            <small>
              {totalBoatsBooked} safari boats · {totalTravelers} total tourists
            </small>
          </div>
          <div className="Dashboard-kpi-footer">
            <span>Open booking manifest</span>
            <ArrowUpRight size={14} />
          </div>
        </div>

        {/* Natural Wonders / Explores Card */}
        <div
          className="Dashboard-kpi-card Dashboard-kpi-teal"
          onClick={() => navigate("/explores")}
        >
          <div className="Dashboard-kpi-top">
            <div className="Dashboard-kpi-icon">
              <Compass size={22} />
            </div>
            <span className="Dashboard-badge-tag">Wildlife Hub</span>
          </div>
          <div className="Dashboard-kpi-body">
            <strong>{stats.explores.length}</strong>
            <span className="Dashboard-kpi-label">Sanctuary Wonders &amp; Sights</span>
            <small>Crocodile points, watchtowers, creek trails</small>
          </div>
          <div className="Dashboard-kpi-footer">
            <span>Manage tourist wonders</span>
            <ArrowUpRight size={14} />
          </div>
        </div>

        {/* Customer Enquiries Card */}
        <div
          className="Dashboard-kpi-card Dashboard-kpi-blue"
          onClick={() => navigate("/enquiry")}
        >
          <div className="Dashboard-kpi-top">
            <div className="Dashboard-kpi-icon">
              <Mail size={22} />
            </div>
            {newEnquiries > 0 ? (
              <span className="Dashboard-badge-urgent">{newEnquiries} New</span>
            ) : (
              <span className="Dashboard-badge-muted">Replied</span>
            )}
          </div>
          <div className="Dashboard-kpi-body">
            <strong>{stats.enquiries.length}</strong>
            <span className="Dashboard-kpi-label">Tourist Inquiries</span>
            <small>{inProgressEnquiries} in progress · {repliedEnquiries} replied</small>
          </div>
          <div className="Dashboard-kpi-footer">
            <span>Respond to travellers</span>
            <ArrowUpRight size={14} />
          </div>
        </div>

        {/* Visitor Testimonials Card */}
        <div
          className="Dashboard-kpi-card Dashboard-kpi-amber"
          onClick={() => navigate("/testimonials")}
        >
          <div className="Dashboard-kpi-top">
            <div className="Dashboard-kpi-icon">
              <Star size={22} />
            </div>
            <span className="Dashboard-badge-warning">★ {avgRating} Rating</span>
          </div>
          <div className="Dashboard-kpi-body">
            <strong>{stats.testimonials.length}</strong>
            <span className="Dashboard-kpi-label">Tourist Testimonials</span>
            <small>Verified traveler reviews &amp; ratings</small>
          </div>
          <div className="Dashboard-kpi-footer">
            <span>Moderate reviews</span>
            <ArrowUpRight size={14} />
          </div>
        </div>

        {/* Wildlife Blog & Stories */}
        <div
          className="Dashboard-kpi-card Dashboard-kpi-purple"
          onClick={() => navigate("/blog/management")}
        >
          <div className="Dashboard-kpi-top">
            <div className="Dashboard-kpi-icon">
              <FileText size={22} />
            </div>
            <span className="Dashboard-badge-tag">{publishedBlogs} Live</span>
          </div>
          <div className="Dashboard-kpi-body">
            <strong>{stats.blogs.length}</strong>
            <span className="Dashboard-kpi-label">Sanctuary Stories</span>
            <small>{publishedBlogs} published · {pendingComments} comments pending</small>
          </div>
          <div className="Dashboard-kpi-footer">
            <span>Manage publications</span>
            <ArrowUpRight size={14} />
          </div>
        </div>

        {/* Sanctuary Photo Gallery */}
        <div
          className="Dashboard-kpi-card Dashboard-kpi-rose"
          onClick={() => navigate("/gallery")}
        >
          <div className="Dashboard-kpi-top">
            <div className="Dashboard-kpi-icon">
              <ImageIcon size={22} />
            </div>
            <span className="Dashboard-badge-tag">HD Media</span>
          </div>
          <div className="Dashboard-kpi-body">
            <strong>{stats.gallery.length}</strong>
            <span className="Dashboard-kpi-label">Gallery Photographs</span>
            <small>Mangroves, salt-water crocs, kingfishers</small>
          </div>
          <div className="Dashboard-kpi-footer">
            <span>View media archive</span>
            <ArrowUpRight size={14} />
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. LIVE SAFARI BOOKINGS MANIFEST TABLE (FEATURED OPERATIONS SECTION)
      ========================================================================= */}
      <section className="Dashboard-manifest-section">
        <div className="Dashboard-manifest-header">
          <div className="Dashboard-manifest-title">
            <Ship size={20} />
            <div>
              <h3>Live Safari Bookings Manifest</h3>
              <p>Confirmed departures, passenger contacts, permit vouchers, and payment states.</p>
            </div>
          </div>

          <div className="Dashboard-manifest-controls">
            {/* Search Input */}
            <div className="Dashboard-table-search">
              <Search size={15} />
              <input
                type="text"
                placeholder="Search booking ID, traveler, phone..."
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
              />
            </div>

            {/* Filter Tabs */}
            <div className="Dashboard-table-tabs">
              <button
                type="button"
                className={`Dashboard-table-tab ${bookingFilterStatus === "all" ? "active" : ""}`}
                onClick={() => setBookingFilterStatus("all")}
              >
                All ({stats.tourBookings.length})
              </button>
              <button
                type="button"
                className={`Dashboard-table-tab ${bookingFilterStatus === "confirmed" ? "active" : ""}`}
                onClick={() => setBookingFilterStatus("confirmed")}
              >
                Confirmed ({confirmedBookings.length})
              </button>
              <button
                type="button"
                className={`Dashboard-table-tab ${bookingFilterStatus === "pending" ? "active" : ""}`}
                onClick={() => setBookingFilterStatus("pending")}
              >
                Unpaid / Action
              </button>
              <button
                type="button"
                className={`Dashboard-table-tab ${bookingFilterStatus === "refund" ? "active" : ""}`}
                onClick={() => setBookingFilterStatus("refund")}
              >
                Refunds
              </button>
            </div>

            <Link to="/tour-booking" className="Dashboard-btn Dashboard-btn-secondary sm">
              View All Manifest <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Table Body */}
        <div className="Dashboard-manifest-table-wrap">
          {filteredBookings.length === 0 ? (
            <div className="Dashboard-empty-table">
              <Ship size={36} />
              <h4>No Safari Bookings Match Criteria</h4>
              <p>Try searching for a different traveler name, booking code, or clear filter.</p>
            </div>
          ) : (
            <table className="Dashboard-manifest-table">
              <thead>
                <tr>
                  <th>Booking ID &amp; Route</th>
                  <th>Lead Passenger</th>
                  <th>Travel Date &amp; Slot</th>
                  <th>Boats &amp; Guests</th>
                  <th>Total Paid</th>
                  <th>Status &amp; Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.slice(0, 6).map((booking) => {
                  const isPaid =
                    booking.paymentStatus === "Paid" ||
                    booking.status === "Confirmed";
                  const hasRefund =
                    booking.refundStatus && booking.refundStatus !== "None";

                  return (
                    <tr key={booking._id || booking.id || booking.bookingId}>
                      {/* Booking ID & Route */}
                      <td>
                        <div className="Dashboard-booking-id-cell">
                          <strong className="Dashboard-bid">
                            {booking.bookingId || "BTK-SAFE"}
                          </strong>
                          <span className="Dashboard-broute">
                            <MapPin size={11} />
                            {booking.from || "Jaynagar"} → {booking.to || "Bhitarkanika"}
                          </span>
                        </div>
                      </td>

                      {/* Lead Passenger */}
                      <td>
                        <div className="Dashboard-passenger-cell">
                          <div className="Dashboard-passenger-avatar">
                            {(booking.name || "U")[0].toUpperCase()}
                          </div>
                          <div>
                            <strong>{booking.name || "Guest"}</strong>
                            <small>{booking.phone || booking.email || "No phone"}</small>
                          </div>
                        </div>
                      </td>

                      {/* Travel Date & Slot */}
                      <td>
                        <div className="Dashboard-date-cell">
                          <span className="Dashboard-date-text">
                            <Calendar size={12} />
                            {booking.travelDate || booking.date || "Scheduled"}
                          </span>
                          <small className="Dashboard-slot-text">
                            <Clock size={11} />
                            {booking.departureSlot || booking.time || "Morning Slot"}
                          </small>
                        </div>
                      </td>

                      {/* Boats & Guests */}
                      <td>
                        <div className="Dashboard-spec-cell">
                          <span>
                            <strong>
                              {Number(booking.adults || booking.guests || 1) +
                                Number(booking.children || 0)}
                            </strong>{" "}
                            Person(s)
                          </span>
                          <small>
                            <strong>{booking.boats || booking.boatCount || 1}</strong> Safari
                            Boat(s)
                          </small>
                        </div>
                      </td>

                      {/* Total Paid */}
                      <td>
                        <strong className="Dashboard-price-tag">
                          {formatINR(booking.amount || booking.totalAmount || 0)}
                        </strong>
                        <small className="Dashboard-price-method">
                          {booking.paymentMethod || "Online (Razorpay)"}
                        </small>
                      </td>

                      {/* Status */}
                      <td>
                        <div className="Dashboard-status-col">
                          <span
                            className={`Dashboard-badge-status ${
                              isPaid ? "paid" : "pending"
                            }`}
                          >
                            {isPaid ? "✓ Confirmed (Paid)" : "Payment Incomplete"}
                          </span>
                          {hasRefund && (
                            <span className="Dashboard-refund-indicator">
                              Refund: {booking.refundStatus}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Action */}
                      <td>
                        <button
                          type="button"
                          className="Dashboard-action-link"
                          onClick={() => navigate("/tour-booking")}
                          title="View full booking voucher and ticket"
                        >
                          <Eye size={14} />
                          <span>Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* =========================================================================
          5. TWO-COLUMN OPERATIONAL STREAM & QUICK ACTION HUB
      ========================================================================= */}
      <div className="Dashboard-grid-layout">
        {/* Left Column: Customer Inquiries & Quick Management Shortcuts */}
        <div className="Dashboard-main-column">
          {/* Recent Customer Inquiries Stream */}
          <div className="Dashboard-panel">
            <div className="Dashboard-panel-header">
              <div className="Dashboard-panel-title">
                <Mail size={18} />
                <h3>Recent Customer Enquiries</h3>
              </div>
              <Link to="/enquiry" className="Dashboard-panel-link">
                View all ({stats.enquiries.length}) <ChevronRight size={14} />
              </Link>
            </div>

            <div className="Dashboard-panel-body">
              {stats.enquiries.length === 0 ? (
                <div className="Dashboard-empty-panel">
                  <Mail size={32} />
                  <p>No customer enquiries received yet.</p>
                </div>
              ) : (
                <div className="Dashboard-enquiry-list">
                  {stats.enquiries.slice(0, 5).map((enq) => (
                    <div
                      key={enq._id || enq.id}
                      className="Dashboard-enquiry-item"
                      onClick={() => navigate("/enquiry")}
                    >
                      <div className="Dashboard-enquiry-avatar">
                        {(enq.name || "U")[0].toUpperCase()}
                      </div>
                      <div className="Dashboard-enquiry-info">
                        <strong>{enq.name}</strong>
                        <span>
                          {enq.email} {enq.phone ? `· ${enq.phone}` : ""}
                        </span>
                        <small className="Dashboard-enquiry-subject">
                          {enq.tour || enq.subject || "General Safari Inquiry"}
                        </small>
                      </div>
                      <div className="Dashboard-enquiry-meta">
                        <span
                          className={`Dashboard-status-chip Dashboard-chip-${(
                            enq.status || "New"
                          )
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {enq.status || "New"}
                        </span>
                        <time>{enq.date || "Recent"}</time>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Management Hub */}
          <div className="Dashboard-panel">
            <div className="Dashboard-panel-header">
              <div className="Dashboard-panel-title">
                <Compass size={18} />
                <h3>Quick Management Hub</h3>
              </div>
            </div>

            <div className="Dashboard-shortcuts-grid">
              <Link to="/tour-booking" className="Dashboard-shortcut-card">
                <div className="Dashboard-shortcut-icon Dashboard-sc-green">
                  <Ship size={20} />
                </div>
                <strong>Safari Bookings</strong>
                <span>Confirm permits, vouchers &amp; jetty slots</span>
              </Link>

              <Link to="/explores" className="Dashboard-shortcut-card">
                <div className="Dashboard-shortcut-icon Dashboard-sc-teal">
                  <Compass size={20} />
                </div>
                <strong>Discover Wonders</strong>
                <span>Add &amp; update sanctuary attractions</span>
              </Link>

              <Link to="/refunds" className="Dashboard-shortcut-card">
                <div className="Dashboard-shortcut-icon Dashboard-sc-amber">
                  <RotateCcw size={20} />
                </div>
                <strong>Refunds &amp; Audits</strong>
                <span>Process UPI &amp; bank refund claims</span>
              </Link>

              <Link to="/enquiry" className="Dashboard-shortcut-card">
                <div className="Dashboard-shortcut-icon Dashboard-sc-blue">
                  <Mail size={20} />
                </div>
                <strong>Customer Inquiries</strong>
                <span>Respond to tourist requests</span>
              </Link>

              <Link to="/blog/posting" className="Dashboard-shortcut-card">
                <div className="Dashboard-shortcut-icon Dashboard-sc-emerald">
                  <FileText size={20} />
                </div>
                <strong>Publish Story</strong>
                <span>Write ecological articles &amp; wildlife blogs</span>
              </Link>

              <Link to="/gallery" className="Dashboard-shortcut-card">
                <div className="Dashboard-shortcut-icon Dashboard-sc-purple">
                  <ImageIcon size={20} />
                </div>
                <strong>Photo Gallery</strong>
                <span>Upload high-res sanctuary photographs</span>
              </Link>

              <Link to="/testimonials" className="Dashboard-shortcut-card">
                <div className="Dashboard-shortcut-icon Dashboard-sc-amber">
                  <Star size={20} />
                </div>
                <strong>Tourist Reviews</strong>
                <span>Approve traveler ratings &amp; stories</span>
              </Link>

              <Link to="/hotel-booking" className="Dashboard-shortcut-card">
                <div className="Dashboard-shortcut-icon Dashboard-sc-blue">
                  <Building2 size={20} />
                </div>
                <strong>Resort Stays</strong>
                <span>Dangmal &amp; Gupti accommodations</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Refund Alerts, Sanctuary Ecological Guide & Stories */}
        <div className="Dashboard-side-column">
          {/* Refund Risk Alert Card */}
          <div className="Dashboard-panel Dashboard-panel-highlight">
            <div className="Dashboard-panel-header">
              <div className="Dashboard-panel-title">
                <RotateCcw size={18} color="#d97706" />
                <h3>Refund Audit Queue</h3>
              </div>
              <Link to="/refunds" className="Dashboard-panel-link">
                View all ({stats.refunds.length}) <ChevronRight size={14} />
              </Link>
            </div>

            <div className="Dashboard-panel-body">
              {pendingRefunds.length === 0 ? (
                <div className="Dashboard-clean-queue">
                  <CheckCircle2 size={32} color="#059669" />
                  <strong>Zero Pending Refunds</strong>
                  <p>All tourist cancellation and refund claims are fully cleared.</p>
                </div>
              ) : (
                <div className="Dashboard-pending-list">
                  {pendingRefunds.slice(0, 3).map((rf) => (
                    <div
                      key={rf._id || rf.id}
                      className="Dashboard-pending-item"
                      onClick={() => navigate("/refunds")}
                    >
                      <div className="Dashboard-pending-top">
                        <strong>Booking {rf.bookingId || "BTK"}</strong>
                        <span className="Dashboard-pending-badge">Action Needed</span>
                      </div>
                      <p className="Dashboard-pending-snippet">
                        Amount: <strong>{formatINR(rf.amount || 0)}</strong> · UPI:{" "}
                        {rf.upiId || "Registered UPI"}
                      </p>
                      <small>Reason: {rf.reason || "Travel Reschedule"}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sanctuary Ecological Guide Info */}
          <div className="Dashboard-guide-card">
            <div className="Dashboard-guide-header">
              <div className="Dashboard-guide-icon">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4>Bhitarkanika Sanctuary Status</h4>
                <p>Official Forest Permit &amp; Safety Protocol</p>
              </div>
            </div>
            <p className="Dashboard-guide-desc">
              Peak visiting season is <strong>October to March</strong>. Daily high and low
              tidal shifts determine optimal boat navigation through Suajore and Khola creeks.
            </p>
            <div className="Dashboard-guide-features">
              <span>🌿 Ramsar Wetland #1210</span>
              <span>🐊 World's Largest Estuarine Crocs</span>
              <span>🕊 320+ Migratory Species</span>
              <span>🚤 Khola, Gupti &amp; Jaynagar Jetties</span>
            </div>
          </div>

          {/* Latest Stories Preview */}
          <div className="Dashboard-panel">
            <div className="Dashboard-panel-header">
              <div className="Dashboard-panel-title">
                <Leaf size={18} />
                <h3>Latest Published Stories</h3>
              </div>
              <Link to="/blog/management" className="Dashboard-panel-link">
                Manage <ChevronRight size={14} />
              </Link>
            </div>

            <div className="Dashboard-panel-body">
              {stats.blogs.length === 0 ? (
                <div className="Dashboard-empty-panel">
                  <FileText size={32} />
                  <p>No stories published yet.</p>
                </div>
              ) : (
                <div className="Dashboard-stories-list">
                  {stats.blogs.slice(0, 3).map((b) => (
                    <div
                      key={b._id || b.id}
                      className="Dashboard-story-card"
                      onClick={() => navigate("/blog/management")}
                    >
                      {b.mainImage && (
                        <img
                          src={b.mainImage}
                          alt={b.title}
                          className="Dashboard-story-thumb"
                        />
                      )}
                      <div className="Dashboard-story-info">
                        <span className="Dashboard-story-cat">{b.category || "Story"}</span>
                        <strong>{b.title}</strong>
                        <small>
                          {b.location || "Bhitarkanika"} · {b.comments || 0} comments
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

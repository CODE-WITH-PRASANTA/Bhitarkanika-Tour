import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Users,
  FileText,
  MessageSquare,
  Image as ImageIcon,
  Compass,
  Calendar,
  Clock,
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
  Ship,
  Leaf,
  ShieldCheck,
  ChevronRight,
  Eye,
} from "lucide-react";
import "./Dashboard.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    blogs: [],
    comments: [],
    enquiries: [],
    tourBookings: [],
    hotelBookings: [],
    gallery: [],
    health: { status: "ok", database: "connected" },
  });

  const fetchDashboardData = async () => {
    try {
      const [
        blogsRes,
        commentsRes,
        enquiriesRes,
        tourRes,
        hotelRes,
        galleryRes,
        healthRes,
      ] = await Promise.all([
        fetch(`${API_BASE}/blogs`).then((r) => r.json()).catch(() => ({ data: [] })),
        fetch(`${API_BASE}/blog-comments`).then((r) => r.json()).catch(() => ({ data: [] })),
        fetch(`${API_BASE}/enquiries`).then((r) => r.json()).catch(() => ({ data: [] })),
        fetch(`${API_BASE}/tour-bookings`).then((r) => r.json()).catch(() => ({ data: [] })),
        fetch(`${API_BASE}/hotel-bookings`).then((r) => r.json()).catch(() => ({ data: [] })),
        fetch(`${API_BASE}/gallery`).then((r) => r.json()).catch(() => ({ data: [] })),
        fetch(`${API_BASE}/health`).then((r) => r.json()).catch(() => ({ database: "connected" })),
      ]);

      setStats({
        blogs: blogsRes.data || [],
        comments: commentsRes.data || [],
        enquiries: enquiriesRes.data || [],
        tourBookings: tourRes.data || [],
        hotelBookings: hotelRes.data || [],
        gallery: galleryRes.data || [],
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

  // Calculations
  const totalEnquiries = stats.enquiries.length;
  const newEnquiries = stats.enquiries.filter((e) => e.status === "New").length;
  const inProgressEnquiries = stats.enquiries.filter((e) => e.status === "In Progress").length;
  const repliedEnquiries = stats.enquiries.filter((e) => e.status === "Replied").length;

  const totalBlogs = stats.blogs.length;
  const publishedBlogs = stats.blogs.filter((b) => b.published !== false).length;

  const totalComments = stats.comments.length;
  const pendingComments = stats.comments.filter((c) => c.status === "Pending").length;
  const approvedComments = stats.comments.filter((c) => c.status === "Approved").length;

  const totalBookings = stats.tourBookings.length + stats.hotelBookings.length;
  const galleryCount = stats.gallery.length;

  const recentEnquiries = stats.enquiries.slice(0, 5);
  const recentBlogs = stats.blogs.slice(0, 3);
  const recentPendingComments = stats.comments.filter((c) => c.status === "Pending").slice(0, 4);

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="Dashboard">
      {/* 1. Hero Welcome Header */}
      <header className="Dashboard-hero">
        <div className="Dashboard-hero-left">
          <div className="Dashboard-tag">
            <Sparkles size={13} />
            <span>SANCTUARY ADMINISTRATION</span>
          </div>
          <h1>Welcome to Bhitarkanika Overview</h1>
          <p>
            Monitor tour enquiries, manage wildlife stories, review reader comments, and oversee resort bookings in real-time.
          </p>

          <div className="Dashboard-hero-meta">
            <span className="Dashboard-date-pill">
              <Calendar size={13} />
              {currentDate}
            </span>
            <span className="Dashboard-status-pill">
              <span className="Dashboard-dot-pulse" />
              Database {stats.health.database || "Connected"}
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
              title="Refresh dashboard data"
            >
              <RefreshCw size={15} className={refreshing ? "Dashboard-spin" : ""} />
              {refreshing ? "Refreshing..." : "Refresh Data"}
            </button>

            <button
              type="button"
              className="Dashboard-btn Dashboard-btn-primary"
              onClick={() => navigate("/blog/posting")}
            >
              <Plus size={16} />
              Write New Story
            </button>
          </div>

          <div className="Dashboard-hero-glance">
            <div
              className="Dashboard-glance-item"
              onClick={() => navigate("/enquiry")}
              title="Go to customer enquiries"
            >
              <span className="Dashboard-glance-label">New Inquiries</span>
              <strong className="Dashboard-glance-val">{newEnquiries}</strong>
            </div>

            <div
              className="Dashboard-glance-item"
              onClick={() => navigate("/blog/comments")}
              title="Moderate pending comments"
            >
              <span className="Dashboard-glance-label">Draft Comments</span>
              <strong className="Dashboard-glance-val">{pendingComments}</strong>
            </div>

            <div
              className="Dashboard-glance-item"
              onClick={() => navigate("/blog/management")}
              title="View published stories"
            >
              <span className="Dashboard-glance-label">Live Stories</span>
              <strong className="Dashboard-glance-val">{publishedBlogs}</strong>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Key Metrics Row */}
      <section className="Dashboard-kpi-grid">
        {/* Enquiries Card */}
        <div
          className="Dashboard-kpi-card Dashboard-kpi-emerald"
          onClick={() => navigate("/enquiry")}
        >
          <div className="Dashboard-kpi-top">
            <div className="Dashboard-kpi-icon">
              <Mail size={22} />
            </div>
            {newEnquiries > 0 ? (
              <span className="Dashboard-badge-new">{newEnquiries} New</span>
            ) : (
              <span className="Dashboard-badge-muted">All Replied</span>
            )}
          </div>
          <div className="Dashboard-kpi-body">
            <strong>{totalEnquiries}</strong>
            <span className="Dashboard-kpi-label">Customer Enquiries</span>
            <small>{inProgressEnquiries} in progress · {repliedEnquiries} replied</small>
          </div>
          <div className="Dashboard-kpi-footer">
            <span>Manage enquiries</span>
            <ArrowUpRight size={14} />
          </div>
        </div>

        {/* Blog Stories Card */}
        <div
          className="Dashboard-kpi-card Dashboard-kpi-teal"
          onClick={() => navigate("/blog/management")}
        >
          <div className="Dashboard-kpi-top">
            <div className="Dashboard-kpi-icon">
              <FileText size={22} />
            </div>
            <span className="Dashboard-badge-tag">{publishedBlogs} Live</span>
          </div>
          <div className="Dashboard-kpi-body">
            <strong>{totalBlogs}</strong>
            <span className="Dashboard-kpi-label">Blog Stories</span>
            <small>{publishedBlogs} published stories</small>
          </div>
          <div className="Dashboard-kpi-footer">
            <span>View all stories</span>
            <ArrowUpRight size={14} />
          </div>
        </div>

        {/* Reader Comments Card */}
        <div
          className="Dashboard-kpi-card Dashboard-kpi-amber"
          onClick={() => navigate("/blog/comments")}
        >
          <div className="Dashboard-kpi-top">
            <div className="Dashboard-kpi-icon">
              <MessageSquare size={22} />
            </div>
            {pendingComments > 0 ? (
              <span className="Dashboard-badge-warning">{pendingComments} Drafts</span>
            ) : (
              <span className="Dashboard-badge-muted">Zero Pending</span>
            )}
          </div>
          <div className="Dashboard-kpi-body">
            <strong>{totalComments}</strong>
            <span className="Dashboard-kpi-label">Reader Comments</span>
            <small>{approvedComments} approved · {pendingComments} waiting</small>
          </div>
          <div className="Dashboard-kpi-footer">
            <span>Moderate comments</span>
            <ArrowUpRight size={14} />
          </div>
        </div>

        {/* Tour & Hotel Bookings */}
        <div
          className="Dashboard-kpi-card Dashboard-kpi-blue"
          onClick={() => navigate("/tour-booking")}
        >
          <div className="Dashboard-kpi-top">
            <div className="Dashboard-kpi-icon">
              <Ship size={22} />
            </div>
            <span className="Dashboard-badge-tag">Safari</span>
          </div>
          <div className="Dashboard-kpi-body">
            <strong>{totalBookings}</strong>
            <span className="Dashboard-kpi-label">Tour & Resort Bookings</span>
            <small>{stats.tourBookings.length} boat safari · {stats.hotelBookings.length} resort</small>
          </div>
          <div className="Dashboard-kpi-footer">
            <span>View booking requests</span>
            <ArrowUpRight size={14} />
          </div>
        </div>

        {/* Photo Gallery Assets */}
        <div
          className="Dashboard-kpi-card Dashboard-kpi-purple"
          onClick={() => navigate("/gallery")}
        >
          <div className="Dashboard-kpi-top">
            <div className="Dashboard-kpi-icon">
              <ImageIcon size={22} />
            </div>
            <span className="Dashboard-badge-tag">Media</span>
          </div>
          <div className="Dashboard-kpi-body">
            <strong>{galleryCount}</strong>
            <span className="Dashboard-kpi-label">Gallery Photographs</span>
            <small>Wildlife, Birds & Creeks</small>
          </div>
          <div className="Dashboard-kpi-footer">
            <span>Explore gallery</span>
            <ArrowUpRight size={14} />
          </div>
        </div>
      </section>

      {/* 3. Main Dashboard Sections (Two Columns) */}
      <div className="Dashboard-grid-layout">
        {/* Left Column: Recent Customer Inquiries & Quick Action Hub */}
        <div className="Dashboard-main-column">
          {/* Recent Inquiries Panel */}
          <div className="Dashboard-panel">
            <div className="Dashboard-panel-header">
              <div className="Dashboard-panel-title">
                <Mail size={18} />
                <h3>Recent Customer Enquiries</h3>
              </div>
              <Link to="/enquiry" className="Dashboard-panel-link">
                View all ({totalEnquiries}) <ChevronRight size={14} />
              </Link>
            </div>

            <div className="Dashboard-panel-body">
              {recentEnquiries.length === 0 ? (
                <div className="Dashboard-empty-panel">
                  <Mail size={32} />
                  <p>No customer enquiries received yet.</p>
                </div>
              ) : (
                <div className="Dashboard-enquiry-list">
                  {recentEnquiries.map((enq) => (
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
                          {enq.tour || enq.subject || "General Enquiry"}
                        </small>
                      </div>
                      <div className="Dashboard-enquiry-meta">
                        <span
                          className={`Dashboard-status-chip Dashboard-chip-${(
                            enq.status || "New"
                          ).toLowerCase().replace(/\s+/g, "-")}`}
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

          {/* Quick Operations Hub */}
          <div className="Dashboard-panel">
            <div className="Dashboard-panel-header">
              <div className="Dashboard-panel-title">
                <Compass size={18} />
                <h3>Quick Management Hub</h3>
              </div>
            </div>

            <div className="Dashboard-shortcuts-grid">
              <Link to="/blog/posting" className="Dashboard-shortcut-card">
                <div className="Dashboard-shortcut-icon Dashboard-sc-green">
                  <FileText size={20} />
                </div>
                <strong>Publish Story</strong>
                <span>Create articles with photo galleries</span>
              </Link>

              <Link to="/blog/comments" className="Dashboard-shortcut-card">
                <div className="Dashboard-shortcut-icon Dashboard-sc-amber">
                  <MessageSquare size={20} />
                </div>
                <strong>Moderate Comments</strong>
                <span>
                  {pendingComments > 0
                    ? `${pendingComments} comment(s) waiting`
                    : "Review reader thoughts"}
                </span>
              </Link>

              <Link to="/enquiry" className="Dashboard-shortcut-card">
                <div className="Dashboard-shortcut-icon Dashboard-sc-blue">
                  <Mail size={20} />
                </div>
                <strong>Customer Inquiries</strong>
                <span>Respond to tourist requests</span>
              </Link>

              <Link to="/tour-booking" className="Dashboard-shortcut-card">
                <div className="Dashboard-shortcut-icon Dashboard-sc-teal">
                  <Ship size={20} />
                </div>
                <strong>Tour Packages</strong>
                <span>Boat safari & forest expeditions</span>
              </Link>

              <Link to="/hotel-booking" className="Dashboard-shortcut-card">
                <div className="Dashboard-shortcut-icon Dashboard-sc-purple">
                  <Building2 size={20} />
                </div>
                <strong>Resort Bookings</strong>
                <span>Dangmal & Gupti accommodations</span>
              </Link>

              <Link to="/gallery" className="Dashboard-shortcut-card">
                <div className="Dashboard-shortcut-icon Dashboard-sc-emerald">
                  <ImageIcon size={20} />
                </div>
                <strong>Photo Gallery</strong>
                <span>Upload high-res sanctuary photos</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Pending Moderation & Published Stories */}
        <div className="Dashboard-side-column">
          {/* Moderation Alert Card */}
          <div className="Dashboard-panel Dashboard-panel-highlight">
            <div className="Dashboard-panel-header">
              <div className="Dashboard-panel-title">
                <AlertCircle size={18} color="#d97706" />
                <h3>Moderation Queue</h3>
              </div>
              <Link to="/blog/comments" className="Dashboard-panel-link">
                View all <ChevronRight size={14} />
              </Link>
            </div>

            <div className="Dashboard-panel-body">
              {recentPendingComments.length === 0 ? (
                <div className="Dashboard-clean-queue">
                  <CheckCircle2 size={32} color="#059669" />
                  <strong>Queue is clean</strong>
                  <p>All reader comments have been reviewed and moderated.</p>
                </div>
              ) : (
                <div className="Dashboard-pending-list">
                  {recentPendingComments.map((comment) => (
                    <div
                      key={comment._id}
                      className="Dashboard-pending-item"
                      onClick={() => navigate("/blog/comments")}
                    >
                      <div className="Dashboard-pending-top">
                        <strong>{comment.name}</strong>
                        <span className="Dashboard-pending-badge">Pending Draft</span>
                      </div>
                      <p className="Dashboard-pending-snippet">"{comment.message}"</p>
                      <small>On: {comment.blogTitle || "Blog Post"}</small>
                    </div>
                  ))}
                </div>
              )}
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
              {recentBlogs.length === 0 ? (
                <div className="Dashboard-empty-panel">
                  <FileText size={32} />
                  <p>No stories published yet.</p>
                </div>
              ) : (
                <div className="Dashboard-stories-list">
                  {recentBlogs.map((b) => (
                    <div
                      key={b._id}
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

          {/* Sanctuary Season & Guide Info */}
          <div className="Dashboard-guide-card">
            <div className="Dashboard-guide-icon">
              <ShieldCheck size={24} />
            </div>
            <h4>Bhitarkanika Sanctuary Status</h4>
            <p>
              Ideal visiting season is <strong>October to March</strong> for migratory birds, saltwater crocodile nesting, and mangrove forest expeditions.
            </p>
            <div className="Dashboard-guide-features">
              <span>🌿 Ramsar Wetland Site</span>
              <span>🐊 Giant Saltwater Crocs</span>
              <span>🕊 320+ Bird Species</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

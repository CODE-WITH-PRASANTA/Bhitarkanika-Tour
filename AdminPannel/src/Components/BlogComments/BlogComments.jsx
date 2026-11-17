import React, { useEffect, useMemo, useState } from "react";
import {
  MessageSquare,
  Search,
  Trash2,
  CheckCircle2,
  Clock3,
  ShieldAlert,
  BookOpen,
} from "lucide-react";
import "./BlogComments.css";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_COMMENTS_URL = `${API_BASE}/blog-comments`;

const BlogComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_COMMENTS_URL);
        const result = await res.json();
        if (res.ok && result.success) {
          setComments(result.data || []);
        }
      } catch {
        setNotice("Unable to load blog comments from server.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const filteredComments = useMemo(() => {
    const query = search.trim().toLowerCase();
    return comments.filter((item) => {
      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.message.toLowerCase().includes(query) ||
        (item.blogTitle || "").toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [comments, search, statusFilter]);

  const handleStatusChange = async (comment, newStatus) => {
    try {
      const res = await fetch(`${API_COMMENTS_URL}/${comment._id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to update comment status.");
      }

      setComments((prev) =>
        prev.map((item) => (item._id === comment._id ? result.data : item))
      );
      setNotice(`Comment marked as ${newStatus}.`);
    } catch (error) {
      setNotice(error.message || "Error updating comment status.");
    }
  };

  const handleDelete = async (comment) => {
    if (!window.confirm(`Delete comment by ${comment.name}?`)) return;

    try {
      const res = await fetch(`${API_COMMENTS_URL}/${comment._id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to delete comment.");
      }
      setComments((prev) => prev.filter((item) => item._id !== comment._id));
      setNotice("Comment deleted successfully.");
    } catch (error) {
      setNotice(error.message || "Error deleting comment.");
    }
  };

  const counts = useMemo(
    () => ({
      total: comments.length,
      approved: comments.filter((c) => c.status === "Approved").length,
      pending: comments.filter((c) => c.status === "Pending").length,
      spam: comments.filter((c) => c.status === "Spam").length,
    }),
    [comments]
  );

  return (
    <div className="BlogComments">
      <header className="BlogComments-hero">
        <div className="BlogComments-hero-left">
          <span className="BlogComments-eyebrow">
            <MessageSquare size={14} />
            READER ENGAGEMENT
          </span>
          <h1>Blog Comments</h1>
          <p>
            Review, moderate, and manage reader comments submitted on individual
            blog posts.
          </p>
        </div>

        <div className="BlogComments-hero-right">
          <div className="BlogComments-stats">
            <div className="BlogComments-stat">
              <span>Total</span>
              <strong>{counts.total}</strong>
            </div>
            <div className="BlogComments-stat">
              <span>Approved</span>
              <strong>{counts.approved}</strong>
            </div>
            <div className="BlogComments-stat">
              <span>Draft / Pending</span>
              <strong>{counts.pending}</strong>
            </div>
          </div>
        </div>
      </header>

      {notice && (
        <div className="BlogComments-notice" role="status">
          <span>{notice}</span>
          <button type="button" onClick={() => setNotice("")}>
            ×
          </button>
        </div>
      )}

      <section className="BlogComments-card">
        <div className="BlogComments-toolbar">
          <div className="BlogComments-search">
            <Search size={16} />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by reader, email, blog title, or comment..."
              aria-label="Search comments"
            />
          </div>

          <select
            className="BlogComments-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Draft / Pending ({counts.pending})</option>
            <option value="Approved">Approved ({counts.approved})</option>
            <option value="Spam">Spam ({counts.spam})</option>
          </select>
        </div>

        {loading ? (
          <div className="BlogComments-empty">
            <p>Loading comments...</p>
          </div>
        ) : filteredComments.length === 0 ? (
          <div className="BlogComments-empty">
            <MessageSquare size={36} />
            <h3>No comments found</h3>
            <p>
              Reader comments submitted on published blog pages will appear
              here.
            </p>
          </div>
        ) : (
          <div className="BlogComments-list">
            {filteredComments.map((item) => (
              <article className="BlogComments-item" key={item._id}>
                <div className="BlogComments-item-top">
                  <div className="BlogComments-reader">
                    <span className="BlogComments-avatar">
                      {item.initials || "U"}
                    </span>
                    <div>
                      <strong>{item.name}</strong>
                      <span>
                        {item.email} · {item.date}
                      </span>
                    </div>
                  </div>

                  <div className="BlogComments-meta">
                    {item.blogTitle && (
                      <span className="BlogComments-blog-pill">
                        <BookOpen size={13} />
                        {item.blogTitle}
                      </span>
                    )}
                    <span
                      className={`BlogComments-status BlogComments-status--${(
                        item.status || "Approved"
                      ).toLowerCase()}`}
                    >
                      {item.status || "Approved"}
                    </span>
                  </div>
                </div>

                <p className="BlogComments-message">{item.message}</p>

                <div className="BlogComments-actions">
                  <button
                    type="button"
                    className="BlogComments-btn BlogComments-btn--approve"
                    onClick={() => handleStatusChange(item, "Approved")}
                    disabled={item.status === "Approved"}
                  >
                    <CheckCircle2 size={15} />
                    Approve
                  </button>
                  <button
                    type="button"
                    className="BlogComments-btn BlogComments-btn--pending"
                    onClick={() => handleStatusChange(item, "Pending")}
                    disabled={item.status === "Pending"}
                  >
                    <Clock3 size={15} />
                    Pending
                  </button>
                  <button
                    type="button"
                    className="BlogComments-btn BlogComments-btn--spam"
                    onClick={() => handleStatusChange(item, "Spam")}
                    disabled={item.status === "Spam"}
                  >
                    <ShieldAlert size={15} />
                    Spam
                  </button>
                  <button
                    type="button"
                    className="BlogComments-btn BlogComments-btn--delete"
                    onClick={() => handleDelete(item)}
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogComments;


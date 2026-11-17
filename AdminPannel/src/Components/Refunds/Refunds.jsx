import React, { useEffect, useState, useMemo } from "react";
import {
  RotateCcw,
  CheckCircle2,
  Clock3,
  XCircle,
  AlertCircle,
  Search,
  Download,
  RefreshCw,
  Eye,
  CreditCard,
  X,
  Check,
  ShieldCheck,
  Calendar,
  Phone,
  Mail,
  User,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import "./Refunds.css";

const API_BASE = `${import.meta.env.VITE_API_BASE}/payment/admin-refunds`;

const Refunds = () => {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // "all" | "processing" | "completed" | "rejected"
  const [notice, setNotice] = useState({ type: "", text: "" });

  // Modals state
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  // Form states for processing/rejecting
  const [transactionId, setTransactionId] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch all refunds from backend
  const fetchRefunds = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setRefunds(json.data);
      } else {
        setRefunds([]);
      }
    } catch (err) {
      console.error("Failed to load admin refunds:", err);
      setNotice({ type: "error", text: "Could not connect to backend server." });
      setRefunds([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRefunds();
  }, []);

  // Filter categorization
  const getCategory = (r) => {
    const s = (r.refundStatus || "").toLowerCase();
    if (s.includes("completed") || s.includes("processed") || s.includes("approved")) {
      return "completed";
    }
    if (s.includes("rejected") || s.includes("declined")) {
      return "rejected";
    }
    return "processing";
  };

  // Stats calculation
  const stats = useMemo(() => {
    const total = refunds.length;
    const processing = refunds.filter((r) => getCategory(r) === "processing").length;
    const completed = refunds.filter((r) => getCategory(r) === "completed").length;
    const rejected = refunds.filter((r) => getCategory(r) === "rejected").length;
    const totalAmountRefunded = refunds
      .filter((r) => getCategory(r) === "completed")
      .reduce((sum, r) => sum + Number(r.amount || 0), 0);

    return { total, processing, completed, rejected, totalAmountRefunded };
  }, [refunds]);

  // Filtered list
  const filteredRefunds = useMemo(() => {
    return refunds.filter((r) => {
      // Tab filter
      if (activeTab !== "all" && getCategory(r) !== activeTab) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const matchName = (r.name || "").toLowerCase().includes(q);
        const matchPhone = (r.phone || "").toLowerCase().includes(q);
        const matchEmail = (r.email || "").toLowerCase().includes(q);
        const matchBooking = (r.bookingId || "").toLowerCase().includes(q);
        const matchRefundId = (r.refundId || "").toLowerCase().includes(q);
        const matchUpi = (r.refundUpi || "").toLowerCase().includes(q);
        return matchName || matchPhone || matchEmail || matchBooking || matchRefundId || matchUpi;
      }
      return true;
    });
  }, [refunds, activeTab, searchTerm]);

  // Handle Mark as Processed / Completed
  const handleConfirmProcess = async () => {
    if (!selectedRefund) return;
    try {
      setActionLoading(true);
      const res = await fetch(`${API_BASE}/${selectedRefund._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refundStatus: "Completed",
          transactionId: transactionId || `UTR_${Date.now()}`,
          adminNote: adminNote || "Approved and refunded by administrator.",
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setNotice({
          type: "success",
          text: `Refund for booking ${selectedRefund.bookingId} marked as Completed.`,
        });
        setProcessModalOpen(false);
        setSelectedRefund(null);
        setTransactionId("");
        setAdminNote("");
        fetchRefunds();
      } else {
        alert(json.message || "Failed to update refund.");
      }
    } catch (err) {
      console.error("Refund process error:", err);
      alert("Network error updating refund.");
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Reject Refund
  const handleConfirmReject = async () => {
    if (!selectedRefund) return;
    try {
      setActionLoading(true);
      const res = await fetch(`${API_BASE}/${selectedRefund._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refundStatus: "Rejected",
          adminNote: adminNote || "Cancellation rejected as per safari departure policy.",
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setNotice({
          type: "error",
          text: `Refund request for ${selectedRefund.bookingId} declined.`,
        });
        setRejectModalOpen(false);
        setSelectedRefund(null);
        setAdminNote("");
        fetchRefunds();
      } else {
        alert(json.message || "Failed to reject refund.");
      }
    } catch (err) {
      console.error("Refund reject error:", err);
      alert("Network error updating refund.");
    } finally {
      setActionLoading(false);
    }
  };

  // Export CSV
  const handleExportCsv = () => {
    if (!filteredRefunds.length) return;
    const headers = [
      "Refund ID",
      "Booking ID",
      "Guest Name",
      "Phone",
      "Email",
      "Package",
      "Refund Amount",
      "Destination UPI",
      "Reason",
      "Status",
      "Requested Date",
    ];

    const rows = filteredRefunds.map((r) => [
      r.refundId,
      r.bookingId,
      r.name,
      r.phone,
      r.email,
      r.packageName,
      r.amount,
      r.refundUpi,
      r.refundReason,
      r.refundStatus,
      r.date,
    ]);

    const cell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csvContent = [headers, ...rows].map((row) => row.map(cell).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bhitarkanika-refunds-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="AdminRefunds">
      {/* Toast Notice */}
      {notice.text && (
        <div className={`AdminRefunds-notice ${notice.type}`} role="status">
          <span>{notice.text}</span>
          <button type="button" onClick={() => setNotice({ type: "", text: "" })}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Page Header */}
      <header className="AdminRefunds-header">
        <div>
          <h1 className="AdminRefunds-title">Refunds &amp; Cancellations</h1>
          <p className="AdminRefunds-subtitle">
            Manage traveler cancellation requests, verify bank destinations, and process refunds.
          </p>
        </div>

        <div className="AdminRefunds-header-actions">
          <button
            type="button"
            className="AdminRefunds-btn secondary"
            onClick={fetchRefunds}
            title="Refresh refunds list"
          >
            <RefreshCw size={15} className={loading ? "spin" : ""} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            className="AdminRefunds-btn primary"
            onClick={handleExportCsv}
            disabled={!filteredRefunds.length}
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>
        </div>
      </header>

      {/* Stat Cards */}
      <section className="AdminRefunds-stats-grid">
        <div className="AdminRefunds-stat-card total">
          <div className="AdminRefunds-stat-ico">
            <RotateCcw size={26} />
          </div>
          <div className="AdminRefunds-stat-info">
            <span className="AdminRefunds-stat-lbl">Total Requests</span>
            <strong className="AdminRefunds-stat-val">{stats.total}</strong>
            <small>All registered cancellations</small>
          </div>
        </div>

        <div className="AdminRefunds-stat-card processing">
          <div className="AdminRefunds-stat-ico">
            <Clock3 size={26} />
          </div>
          <div className="AdminRefunds-stat-info">
            <span className="AdminRefunds-stat-lbl">In Review / Processing</span>
            <strong className="AdminRefunds-stat-val">{stats.processing}</strong>
            <small>Awaiting bank disbursement</small>
          </div>
        </div>

        <div className="AdminRefunds-stat-card completed">
          <div className="AdminRefunds-stat-ico">
            <CheckCircle2 size={26} />
          </div>
          <div className="AdminRefunds-stat-info">
            <span className="AdminRefunds-stat-lbl">Completed / Credited</span>
            <strong className="AdminRefunds-stat-val">{stats.completed}</strong>
            <small>₹{stats.totalAmountRefunded.toLocaleString("en-IN")} credited</small>
          </div>
        </div>

        <div className="AdminRefunds-stat-card rejected">
          <div className="AdminRefunds-stat-ico">
            <XCircle size={26} />
          </div>
          <div className="AdminRefunds-stat-info">
            <span className="AdminRefunds-stat-lbl">Declined Requests</span>
            <strong className="AdminRefunds-stat-val">{stats.rejected}</strong>
            <small>Policy non-compliant</small>
          </div>
        </div>
      </section>

      {/* Main Content Card */}
      <div className="AdminRefunds-card">
        {/* Filter Controls Bar */}
        <div className="AdminRefunds-toolbar">
          <div className="AdminRefunds-tabs">
            <button
              type="button"
              className={`AdminRefunds-tab ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              <span>All Requests</span>
              <span className="count">{stats.total}</span>
            </button>
            <button
              type="button"
              className={`AdminRefunds-tab processing ${activeTab === "processing" ? "active" : ""}`}
              onClick={() => setActiveTab("processing")}
            >
              <Clock3 size={13} />
              <span>Processing</span>
              <span className="count">{stats.processing}</span>
            </button>
            <button
              type="button"
              className={`AdminRefunds-tab completed ${activeTab === "completed" ? "active" : ""}`}
              onClick={() => setActiveTab("completed")}
            >
              <CheckCircle2 size={13} />
              <span>Completed</span>
              <span className="count">{stats.completed}</span>
            </button>
            <button
              type="button"
              className={`AdminRefunds-tab rejected ${activeTab === "rejected" ? "active" : ""}`}
              onClick={() => setActiveTab("rejected")}
            >
              <XCircle size={13} />
              <span>Declined</span>
              <span className="count">{stats.rejected}</span>
            </button>
          </div>

          <div className="AdminRefunds-search-box">
            <Search size={15} className="ico" />
            <input
              type="text"
              placeholder="Search by ID, guest name, phone, UPI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="clear-btn"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="AdminRefunds-empty-box">
            <RefreshCw size={28} className="spin" />
            <p>Loading refund records...</p>
          </div>
        ) : filteredRefunds.length === 0 ? (
          <div className="AdminRefunds-empty-box">
            <RotateCcw size={36} />
            <h3>No Refund Requests Found</h3>
            <p>
              {searchTerm
                ? "No refund requests matched your search query."
                : "There are currently no cancellation or refund requests in this view."}
            </p>
          </div>
        ) : (
          <div className="AdminRefunds-table-wrap">
            <table className="AdminRefunds-table">
              <thead>
                <tr>
                  <th>Refund ID</th>
                  <th>Booking Ref</th>
                  <th>Traveler Details</th>
                  <th>Safari Package</th>
                  <th>Refund Amount</th>
                  <th>Target UPI / Bank</th>
                  <th>Cancellation Reason</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRefunds.map((r) => {
                  const cat = getCategory(r);
                  return (
                    <tr key={r._id || r.refundId}>
                      <td>
                        <strong className="AdminRefunds-id-code">{r.refundId}</strong>
                      </td>
                      <td>
                        <span className="AdminRefunds-bkg-chip">{r.bookingId}</span>
                      </td>
                      <td>
                        <div className="AdminRefunds-user-col">
                          <strong>{r.name}</strong>
                          <small>{r.phone}</small>
                        </div>
                      </td>
                      <td>
                        <span className="AdminRefunds-pkg-name">{r.packageName}</span>
                      </td>
                      <td>
                        <strong className="AdminRefunds-amount-val">
                          ₹{Number(r.amount || 0).toLocaleString("en-IN")}
                        </strong>
                      </td>
                      <td>
                        <span className="AdminRefunds-upi-val">{r.refundUpi || "N/A"}</span>
                      </td>
                      <td>
                        <span className="AdminRefunds-reason-text" title={r.refundReason}>
                          {r.refundReason || "N/A"}
                        </span>
                      </td>
                      <td>
                        <small className="AdminRefunds-date-col">{r.date}</small>
                      </td>
                      <td>
                        <span className={`AdminRefunds-status-badge ${cat}`}>
                          {cat === "completed" ? (
                            <CheckCircle2 size={12} />
                          ) : cat === "rejected" ? (
                            <XCircle size={12} />
                          ) : (
                            <Clock3 size={12} />
                          )}
                          <span>{r.refundStatus || "Processing"}</span>
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div className="AdminRefunds-action-btns">
                          {cat === "processing" && (
                            <>
                              <button
                                type="button"
                                className="action-btn process"
                                title="Approve & Mark Refunded"
                                onClick={() => {
                                  setSelectedRefund(r);
                                  setTransactionId(`RFD_${Date.now().toString().slice(-8)}`);
                                  setProcessModalOpen(true);
                                }}
                              >
                                <Check size={14} />
                                <span>Process</span>
                              </button>

                              <button
                                type="button"
                                className="action-btn reject"
                                title="Decline Refund"
                                onClick={() => {
                                  setSelectedRefund(r);
                                  setRejectModalOpen(true);
                                }}
                              >
                                <X size={14} />
                              </button>
                            </>
                          )}

                          <button
                            type="button"
                            className="action-btn view"
                            title="View Full Details"
                            onClick={() => {
                              setSelectedRefund(r);
                              setDetailsModalOpen(true);
                            }}
                          >
                            <Eye size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= MODAL: PROCESS REFUND ================= */}
      {processModalOpen && selectedRefund && (
        <div className="AdminRefunds-modal-backdrop" onClick={() => setProcessModalOpen(false)}>
          <div className="AdminRefunds-modal" onClick={(e) => e.stopPropagation()}>
            <div className="AdminRefunds-modal-head">
              <div className="head-left">
                <CheckCircle2 size={20} className="ico-success" />
                <h3>Approve &amp; Confirm Refund</h3>
              </div>
              <button
                type="button"
                className="close-btn"
                onClick={() => setProcessModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="AdminRefunds-modal-body">
              <p className="modal-desc">
                Disburse or record the bank refund to the traveler's requested destination.
              </p>

              <div className="modal-info-box">
                <div className="info-row">
                  <span>Guest Name:</span>
                  <strong>{selectedRefund.name}</strong>
                </div>
                <div className="info-row">
                  <span>Booking ID:</span>
                  <strong>{selectedRefund.bookingId}</strong>
                </div>
                <div className="info-row">
                  <span>Refund Amount:</span>
                  <strong className="price">₹{Number(selectedRefund.amount || 0).toLocaleString("en-IN")}</strong>
                </div>
                <div className="info-row">
                  <span>Target UPI / Destination:</span>
                  <strong className="upi">{selectedRefund.refundUpi || "N/A"}</strong>
                </div>
              </div>

              <div className="form-group">
                <label>Bank UTR / Razorpay Refund Reference ID</label>
                <input
                  type="text"
                  placeholder="e.g. RFD_81239102 or Bank UTR"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Internal Note (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Notes about payment settlement..."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                />
              </div>
            </div>

            <div className="AdminRefunds-modal-foot">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setProcessModalOpen(false)}
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-confirm-process"
                onClick={handleConfirmProcess}
                disabled={actionLoading}
              >
                {actionLoading ? "Processing..." : "Confirm & Mark Refunded"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: DECLINE REFUND ================= */}
      {rejectModalOpen && selectedRefund && (
        <div className="AdminRefunds-modal-backdrop" onClick={() => setRejectModalOpen(false)}>
          <div className="AdminRefunds-modal" onClick={(e) => e.stopPropagation()}>
            <div className="AdminRefunds-modal-head">
              <div className="head-left">
                <XCircle size={20} className="ico-danger" />
                <h3>Decline Refund Request</h3>
              </div>
              <button
                type="button"
                className="close-btn"
                onClick={() => setRejectModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="AdminRefunds-modal-body">
              <p className="modal-desc danger">
                Are you sure you want to decline this refund request for <strong>{selectedRefund.bookingId}</strong>?
              </p>

              <div className="form-group">
                <label>Decline Reason (Visible to user / logs)</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Cancellation requested after scheduled boat departure slot."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="AdminRefunds-modal-foot">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setRejectModalOpen(false)}
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-confirm-reject"
                onClick={handleConfirmReject}
                disabled={actionLoading}
              >
                {actionLoading ? "Declining..." : "Decline Refund"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: FULL DETAILS ================= */}
      {detailsModalOpen && selectedRefund && (
        <div className="AdminRefunds-modal-backdrop" onClick={() => setDetailsModalOpen(false)}>
          <div className="AdminRefunds-modal details" onClick={(e) => e.stopPropagation()}>
            <div className="AdminRefunds-modal-head">
              <div className="head-left">
                <ShieldCheck size={20} />
                <h3>Refund &amp; Cancellation Dossier</h3>
              </div>
              <button
                type="button"
                className="close-btn"
                onClick={() => setDetailsModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="AdminRefunds-modal-body">
              <div className="details-grid">
                <div className="detail-item">
                  <span>Refund Reference</span>
                  <strong>{selectedRefund.refundId}</strong>
                </div>
                <div className="detail-item">
                  <span>Booking Reference</span>
                  <strong>{selectedRefund.bookingId}</strong>
                </div>
                <div className="detail-item">
                  <span>Primary Traveler</span>
                  <strong>{selectedRefund.name}</strong>
                </div>
                <div className="detail-item">
                  <span>Phone Number</span>
                  <strong>{selectedRefund.phone}</strong>
                </div>
                <div className="detail-item">
                  <span>Email</span>
                  <strong>{selectedRefund.email}</strong>
                </div>
                <div className="detail-item">
                  <span>Tour Package</span>
                  <strong>{selectedRefund.packageName}</strong>
                </div>
                <div className="detail-item">
                  <span>Travel Date</span>
                  <strong>{selectedRefund.travelDate || "Scheduled Date"}</strong>
                </div>
                <div className="detail-item">
                  <span>Departure Slot</span>
                  <strong>{selectedRefund.departureSlot || "Morning Slot"}</strong>
                </div>
                <div className="detail-item highlight">
                  <span>Refund Amount</span>
                  <strong className="price">₹{Number(selectedRefund.amount || 0).toLocaleString("en-IN")}</strong>
                </div>
                <div className="detail-item highlight">
                  <span>Destination UPI</span>
                  <strong className="upi">{selectedRefund.refundUpi || "N/A"}</strong>
                </div>
              </div>

              <div className="detail-full-block">
                <span>Reason for Cancellation:</span>
                <p>{selectedRefund.refundReason || "No specific reason provided."}</p>
              </div>

              {selectedRefund.adminNote && (
                <div className="detail-full-block note">
                  <span>Admin Processing Notes:</span>
                  <p>{selectedRefund.adminNote}</p>
                </div>
              )}
            </div>

            <div className="AdminRefunds-modal-foot">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setDetailsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Refunds;

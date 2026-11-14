import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Anchor,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  CreditCard,
  Download,
  Eye,
  EyeOff,
  FileText,
  KeyRound,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Ticket,
  User,
  Users,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import siteLogo from "../../assets/mlogo.png";
import "./Profile.css";

const API_BASE = "http://localhost:5000/api";

const Profile = () => {
  const { user, token, isAuthenticated, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  // Active Sidebar Tab: "profile" | "bookings" | "transactions" | "refunds" | "security"
  const [activeTab, setActiveTab] = useState("profile");

  // Profile Form State
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [homeTown, setHomeTown] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ type: "", text: "" });

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [changingPwd, setChangingPwd] = useState(false);
  const [pwdMsg, setPwdMsg] = useState({ type: "", text: "" });

  // Bookings & Transactions State
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Refund Modal State
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [selectedBookingForRefund, setSelectedBookingForRefund] = useState(null);
  const [refundReason, setRefundReason] = useState("Personal Emergency");
  const [refundUpi, setRefundUpi] = useState("");
  const [submittingRefund, setSubmittingRefund] = useState(false);
  const [refundSuccessMsg, setRefundSuccessMsg] = useState("");

  // Real backend-stored refund requests (no fallback/dummy data)
  const [refundRequests, setRefundRequests] = useState([]);
  const [loadingRefunds, setLoadingRefunds] = useState(false);

  // Protect page: Redirect if unauthenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?redirect=profile");
    }
  }, [isAuthenticated, navigate]);

  // Sync profile details when user loads
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  // Fetch real user bookings from database
  const fetchUserBookings = async () => {
    if (!user) return;
    try {
      setLoadingBookings(true);
      const userEmail = (user?.email || "").toLowerCase().trim();
      const userPhone = (user?.phone || "").replace(/\D/g, "");
      const res = await fetch(
        `${API_BASE}/tour-bookings?email=${encodeURIComponent(userEmail)}&phone=${encodeURIComponent(userPhone)}`,
        {
          credentials: "include",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        const matched = json.data.filter((b) => {
          const bEmail = (b.email || "").toLowerCase().trim();
          const bPhone = (b.phone || "").replace(/\D/g, "");
          return (
            (userEmail && bEmail && userEmail === bEmail) ||
            (userPhone && bPhone && userPhone === bPhone)
          );
        });

        setBookings(matched);
      }
    } catch (err) {
      console.warn("Could not load bookings:", err);
    } finally {
      setLoadingBookings(false);
    }
  };

  // Fetch real user refund requests from database
  const fetchRefunds = async () => {
    if (!user) return;
    try {
      setLoadingRefunds(true);
      const userEmail = (user?.email || "").toLowerCase().trim();
      const userPhone = (user?.phone || "").replace(/\D/g, "");
      const res = await fetch(
        `${API_BASE}/payment/my-refunds?email=${encodeURIComponent(userEmail)}&phone=${encodeURIComponent(userPhone)}`,
        {
          credentials: "include",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      const json = await res.json();

      if (json.success && Array.isArray(json.refunds)) {
        setRefundRequests(json.refunds);
      } else {
        setRefundRequests([]);
      }
    } catch (err) {
      console.warn("Could not load refunds:", err);
      setRefundRequests([]);
    } finally {
      setLoadingRefunds(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserBookings();
      fetchRefunds();
    }
  }, [isAuthenticated, user]);

  // Handle Profile Update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileMsg({ type: "", text: "" });

    try {
      setSavingProfile(true);
      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify({ name, phone }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        updateUser(data.user);
        setProfileMsg({ type: "success", text: "Profile details updated successfully!" });
      } else {
        setProfileMsg({ type: "error", text: data.message || "Could not update profile." });
      }
    } catch (err) {
      setProfileMsg({ type: "error", text: "Server connection failed." });
    } finally {
      setSavingProfile(false);
    }
  };

  // Handle Password Change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwdMsg({ type: "", text: "" });

    if (newPassword.length < 6) {
      setPwdMsg({ type: "error", text: "New password must be at least 6 characters long." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPwdMsg({ type: "error", text: "Passwords do not match." });
      return;
    }

    try {
      setChangingPwd(true);
      const res = await fetch(`${API_BASE}/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setPwdMsg({ type: "success", text: "Password changed successfully!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPwdMsg({ type: "error", text: data.message || "Failed to change password." });
      }
    } catch (err) {
      setPwdMsg({ type: "error", text: "Server connection error." });
    } finally {
      setChangingPwd(false);
    }
  };

  // Open refund request modal
  const handleOpenRefundModal = (booking) => {
    setSelectedBookingForRefund(booking);
    setRefundReason("Personal Emergency / Reschedule");
    setRefundUpi(user?.phone ? `${user.phone}@upi` : "");
    setRefundSuccessMsg("");
    setRefundModalOpen(true);
  };

  // Submit refund request to Backend
  const handleConfirmRefund = async () => {
    if (!selectedBookingForRefund) return;
    setSubmittingRefund(true);
    setRefundSuccessMsg("");

    try {
      const res = await fetch(`${API_BASE}/payment/request-refund`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify({
          bookingId: selectedBookingForRefund.bookingId || selectedBookingForRefund._id,
          reason: refundReason,
          refundUpi: refundUpi,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setRefundSuccessMsg("Cancellation & Refund request submitted successfully!");
        // Refresh live data from backend database
        await fetchUserBookings();
        await fetchRefunds();

        setTimeout(() => {
          setRefundModalOpen(false);
          setActiveTab("refunds");
        }, 1200);
      } else {
        alert(data.message || "Failed to submit refund request.");
      }
    } catch (err) {
      console.error("Refund submission error:", err);
      alert("Network error while submitting refund request.");
    } finally {
      setSubmittingRefund(false);
    }
  };

  // Format YYYY-MM-DD to readable date like "15 Nov 2026"
  const formatBookingDate = (d) => {
    if (!d) return "Scheduled Date";
    const str = String(d).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
      const [y, m, day] = str.split("-");
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${parseInt(day, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
    }
    return str;
  };

  // Clean slot string e.g. remove trailing "(End)"
  const cleanSlot = (slot) => {
    if (!slot) return "Morning Slot";
    return slot.replace(/\s*\(End\)/gi, "").trim();
  };

  // Convert image to clean Base64 dataURL for jsPDF embedding
  const loadLogoDataUrl = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth || img.width || 500;
          canvas.height = img.naturalHeight || img.height || 500;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/png"));
        } catch (e) {
          resolve(src);
        }
      };
      img.onerror = () => resolve(null);
      img.src = src;
    });
  };

  // Generate and download official PDF voucher with logo
  const handleDownloadPdf = async (b) => {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const W = 210;
      const green = [18, 54, 38];
      const gold = [180, 140, 60];
      const rs = (n) => `Rs. ${Number(n).toLocaleString("en-IN")}`;

      // 1. Fetch & attach official logo
      let logoData = null;
      try {
        logoData = await loadLogoDataUrl(siteLogo);
      } catch (err) {
        console.warn("Could not load logo for PDF ticket:", err);
      }

      // 2. Header Band
      doc.setFillColor(...green);
      doc.rect(0, 0, W, 56, "F");
      doc.setFillColor(...gold);
      doc.rect(0, 56, W, 3, "F");

      // 3. Attach Official Logo on Top Left
      if (logoData) {
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(14, 8, 38, 38, 4, 4, "F");
        doc.addImage(logoData, "PNG", 16, 10, 34, 34);
      }

      const textStartX = logoData ? 58 : 14;

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(19);
      doc.text("BHITARAKANIKA SAFARI", textStartX, 21);

      doc.setFontSize(11.5);
      doc.text("Official Boat Safari E-Pass & Voucher", textStartX, 30);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(225, 200, 140);
      doc.text("Recognized by Forest Dept. · Govt. of Odisha", textStartX, 38);

      // Header Right (Booking & Payment status)
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(`Booking ID: ${b.bookingId || "BTK-ONLINE"}`, W - 14, 20, { align: "right" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.text(`Status: ${b.status || "Confirmed"} · Paid`, W - 14, 28, { align: "right" });
      if (b.paymentId) {
        doc.setTextColor(225, 200, 140);
        doc.setFontSize(8.5);
        doc.text(`Razorpay ID: ${b.paymentId}`, W - 14, 36, { align: "right" });
      }
      doc.setTextColor(220, 230, 225);
      doc.setFontSize(8.5);
      doc.text(`Issued: ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}`, W - 14, 44, { align: "right" });

      // 4. Tour Title & Route Pill
      let curY = 72;
      doc.setTextColor(...green);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(17);
      doc.text(b.packageName || "Bhitarkanika Boat Package", 14, curY);

      curY += 7;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      doc.setTextColor(80, 95, 88);
      doc.text(
        `${b.from || "Khola Boating Point"} to ${b.to || "Bhitarkanika Sanctuary"} · 1 Day Private Boat Safari`,
        14,
        curY
      );

      // 5. Primary Details Box
      curY += 8;
      const boxW = W - 28;
      const boxH = 54;
      doc.setFillColor(250, 252, 250);
      doc.setDrawColor(215, 225, 220);
      doc.roundedRect(14, curY, boxW, boxH, 3, 3, "FD");

      const drawCell = (lbl, val, x, y) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(...gold);
        doc.text(lbl.toUpperCase(), x, y);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(25, 40, 32);
        doc.text(String(val), x, y + 6.5);
      };

      const c1 = 20;
      const c2 = 110;
      drawCell("Primary Guest Name", b.name || user?.name || "Traveler", c1, curY + 11);
      drawCell("Contact Phone", `+91 ${b.phone || user?.phone || "N/A"}`, c2, curY + 11);

      drawCell("Travel Date", formatBookingDate(b.travelDate || b.date), c1, curY + 27);
      drawCell("Jetty Departure Slot", cleanSlot(b.departureSlot || b.time), c2, curY + 27);

      drawCell("Total Travelers", `${b.guests || b.adults || 1} Person(s) · 1 Boat`, c1, curY + 43);
      drawCell("Boarding Jetty Gate", b.from || "Khola Boating Point, Kendrapara", c2, curY + 43);

      // 6. Fare Breakdown Card
      curY += boxH + 8;
      const fareW = W - 28;
      const fareH = 38;
      doc.setFillColor(248, 246, 238);
      doc.setDrawColor(...gold);
      doc.roundedRect(14, curY, fareW, fareH, 3, 3, "FD");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(90, 100, 95);

      const fareAmount = b.boatFare || (b.amount ? b.amount - 90 : 3500);
      const permitAmount = b.forestPermit || 40;
      const taxAmount = b.govtTax || 50;
      const totalAmount = Number(b.amount || b.totalAmount || 3590);

      doc.text("Boat Service Fare (1 Boat)", 20, curY + 9);
      doc.text(rs(fareAmount), W - 20, curY + 9, { align: "right" });

      doc.text(`Govt Forest Permit (${rs(permitAmount)}) & Boat Tax (${rs(taxAmount)})`, 20, curY + 17);
      doc.text(rs(permitAmount + taxAmount), W - 20, curY + 17, { align: "right" });

      doc.setDrawColor(215, 195, 150);
      doc.line(20, curY + 22, W - 20, curY + 22);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...green);
      doc.text("TOTAL AMOUNT PAID (INCL. ALL TAXES & PERMITS)", 20, curY + 30);
      doc.setFontSize(13);
      doc.text(rs(totalAmount), W - 20, curY + 30, { align: "right" });

      // 7. Security Notice & Instructions
      curY += fareH + 10;
      doc.setFillColor(240, 248, 244);
      doc.setDrawColor(180, 220, 200);
      doc.roundedRect(14, curY, W - 28, 40, 3, 3, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...green);
      doc.text("IMPORTANT INSTRUCTIONS FOR ENTRY:", 20, curY + 9);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(70, 85, 78);
      doc.text("1. Please carry this E-Voucher (on your smartphone or printed) to the Khola / Gupti entry jetty gate.", 20, curY + 16);
      doc.text("2. Primary guest must carry valid Govt Photo ID (Aadhaar / Voter ID / Passport) for forest permit check.", 20, curY + 22);
      doc.text("3. Please report at the jetty 15 minutes prior to the scheduled departure time slot.", 20, curY + 28);
      doc.text("4. Certified life jackets are provided on board and mandatory during creek cruising.", 20, curY + 34);

      // Save PDF with clear descriptive name
      doc.save(`Bhitarkanika-Pass-${b.bookingId || "Ticket"}.pdf`);
    } catch (err) {
      console.warn("Could not generate PDF with logo, falling back to print:", err);
      window.print();
    }
  };

  return (
    <div className="btk-profile-page">
      <div className="btk-profile-wrapper">
        <div className="btk-profile-container">
          {/* ================= LEFT SIDEBAR ================= */}
          <aside className="btk-profile-sidebar">
            {/* User Identity Card */}
            <div className="btk-sidebar-user">
              <div className="btk-sidebar-avatar">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <span>{user?.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
                )}
              </div>
              <h3 className="btk-sidebar-name">{user?.name || "Traveler"}</h3>
              <p className="btk-sidebar-email">{user?.email || "traveler@bhitarkanika.gov.in"}</p>
              <div className="btk-sidebar-badge">
                <ShieldCheck size={13} />
                <span>Verified Eco-Tourist</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="btk-sidebar-nav">
              <button
                type="button"
                className={`btk-sidebar-link ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <User size={18} />
                <span>My Profile</span>
              </button>

              <button
                type="button"
                className={`btk-sidebar-link ${activeTab === "bookings" ? "active" : ""}`}
                onClick={() => setActiveTab("bookings")}
              >
                <Ticket size={18} />
                <span>My Bookings</span>
                {bookings.length > 0 && (
                  <span className="btk-sidebar-counter">{bookings.length}</span>
                )}
              </button>

              <button
                type="button"
                className={`btk-sidebar-link ${activeTab === "transactions" ? "active" : ""}`}
                onClick={() => setActiveTab("transactions")}
              >
                <CreditCard size={18} />
                <span>Transactions</span>
              </button>

              <button
                type="button"
                className={`btk-sidebar-link ${activeTab === "refunds" ? "active" : ""}`}
                onClick={() => setActiveTab("refunds")}
              >
                <RotateCcw size={18} />
                <span>Refunds &amp; Cancellation</span>
                {refundRequests.length > 0 && (
                  <span className="btk-sidebar-counter neutral">{refundRequests.length}</span>
                )}
              </button>

              <button
                type="button"
                className={`btk-sidebar-link ${activeTab === "security" ? "active" : ""}`}
                onClick={() => setActiveTab("security")}
              >
                <Lock size={18} />
                <span>Security &amp; Password</span>
              </button>
            </nav>

            {/* Logout Action */}
            <div className="btk-sidebar-footer">
              <button
                type="button"
                className="btk-sidebar-logout"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                <LogOut size={16} />
                <span>Log Out</span>
              </button>
            </div>
          </aside>

          {/* ================= RIGHT MAIN CONTENT ================= */}
          <main className="btk-profile-main">
            {/* Top Greeting Banner - only displayed in the Profile tab */}
            {activeTab === "profile" && (
              <div className="btk-greeting-banner">
                <div className="btk-greeting-left">
                  <span className="btk-greeting-tag">
                    <Sparkles size={13} />
                    <span>Bhitarkanika Wildlife Safari Portal</span>
                  </span>
                  <h1 className="btk-greeting-title">
                    Welcome, {user?.name || "Traveler"}!
                  </h1>
                  <p className="btk-greeting-desc">
                    Manage your verified eco-safari permits, view jetty departure slots, and track refunds.
                  </p>
                </div>

                <Link to="/services/boat-service" className="btk-book-now-pill">
                  <Anchor size={15} />
                  <span>Book Boat Safari</span>
                </Link>
              </div>
            )}

            {/* ================= TAB 1: MY PROFILE ================= */}
            {activeTab === "profile" && (
              <div className="btk-content-card">
                <div className="btk-card-head">
                  <div>
                    <h2 className="btk-card-title">Personal Details</h2>
                    <p className="btk-card-desc">
                      Manage your official passenger and contact details used for Khola &amp; Gupti boat permits.
                    </p>
                  </div>
                </div>

                {profileMsg.text && (
                  <div className={`btk-alert ${profileMsg.type}`}>
                    {profileMsg.type === "success" ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <AlertCircle size={16} />
                    )}
                    <span>{profileMsg.text}</span>
                  </div>
                )}

                <form onSubmit={handleUpdateProfile} className="btk-details-form">
                  <div className="btk-form-row-2">
                    <div className="btk-input-group">
                      <label className="btk-lbl">Full Name (As per ID proof)</label>
                      <div className="btk-input-wrap">
                        <User size={16} className="btk-ico" />
                        <input
                          type="text"
                          className="btk-inp"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="btk-input-group">
                      <label className="btk-lbl">Email Address</label>
                      <div className="btk-input-wrap disabled">
                        <Mail size={16} className="btk-ico" />
                        <input
                          type="email"
                          className="btk-inp"
                          value={user?.email || ""}
                          disabled
                          title="Email address is linked to your account"
                        />
                      </div>
                      <small className="btk-field-hint">Linked authentication email</small>
                    </div>
                  </div>

                  <div className="btk-form-row-2">
                    <div className="btk-input-group">
                      <label className="btk-lbl">Mobile Number (For WhatsApp updates)</label>
                      <div className="btk-input-wrap">
                        <Phone size={16} className="btk-ico" />
                        <input
                          type="tel"
                          className="btk-inp"
                          placeholder="10-digit mobile number"
                          maxLength={10}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        />
                      </div>
                    </div>

                    <div className="btk-input-group">
                      <label className="btk-lbl">Home Town / City</label>
                      <div className="btk-input-wrap">
                        <MapPin size={16} className="btk-ico" />
                        <input
                          type="text"
                          className="btk-inp"
                          placeholder="e.g. Bhubaneswar, Kolkata, Cuttack"
                          value={homeTown}
                          onChange={(e) => setHomeTown(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="btk-form-actions">
                    <button
                      type="submit"
                      className="btk-primary-btn"
                      disabled={savingProfile}
                    >
                      <span>{savingProfile ? "Saving Details..." : "Save Profile Details"}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>

                {/* Additional Trust & Verification Note */}
                <div className="btk-doc-note">
                  <ShieldCheck size={20} className="btk-doc-note-ico" />
                  <div>
                    <h4>Official Forest Department Eco-Tour Permits</h4>
                    <p>
                      Your bookings are authenticated under the Odisha Wildlife Division. Please carry original government ID proof (Aadhaar / Voter ID / Passport) during Jetty boarding at Khola or Gupti.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 2: MY BOOKINGS ================= */}
            {activeTab === "bookings" && (
              <div className="btk-content-card">
                <div className="btk-card-head">
                  <div>
                    <h2 className="btk-card-title">My Boat Safari Bookings</h2>
                    <p className="btk-card-desc">
                      View your confirmed boat safari reservations, tickets, and departure points.
                    </p>
                  </div>

                  <Link to="/services/boat-service" className="btk-ghost-btn">
                    <Anchor size={15} />
                    <span>Book New Safari</span>
                  </Link>
                </div>

                {loadingBookings ? (
                  <div className="btk-loading-state">
                    <Clock size={24} className="btk-spin-ico" />
                    <p>Loading your safari reservations...</p>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="btk-empty-state">
                    <div className="btk-empty-icon">
                      <Compass size={32} />
                    </div>
                    <h3>No Safari Bookings Yet</h3>
                    <p>
                      Experience the untamed mangroves of Bhitarkanika. Spot saltwater crocodiles, exotic kingfishers, and pristine creeks.
                    </p>
                    <Link to="/services/boat-service" className="btk-primary-btn">
                      <span>Reserve a Boat Safari</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                ) : (
                  <div className="btk-bookings-list">
                    {bookings.map((booking, idx) => (
                      <div className="btk-booking-card" key={booking._id || idx}>
                        {/* Header: Reference Badge, Title, Route & Live Status */}
                        <div className="btk-booking-card-head">
                          <div className="btk-booking-title-group">
                            <div className="btk-booking-badge-row">
                              <span className="btk-booking-ref-badge">
                                {booking.bookingId || `BTK-${idx + 1001}`}
                              </span>
                              <span className="btk-booking-gate-chip">
                                <MapPin size={12} />
                                <span>{booking.from || "Khola Jetty"}</span>
                              </span>
                            </div>
                            <h3 className="btk-booking-title">
                              {booking.packageName || "Bhitarkanika Boat Package"}
                            </h3>
                            <div className="btk-booking-route-line">
                              <span>{booking.from || "Khola Boating Point"}</span>
                              <span className="btk-arrow">➔</span>
                              <span>{booking.to || "Bhitarkanika Sanctuary"}</span>
                              <span className="btk-dot-sep">·</span>
                              <span>1 Day Boat Safari</span>
                            </div>
                          </div>

                          <div className="btk-booking-status-col">
                            <span className={`btk-status-pill ${booking.refundStatus && booking.refundStatus !== "None" ? "refund" : "confirmed"}`}>
                              <span className="btk-status-pulse" />
                              {booking.refundStatus && booking.refundStatus !== "None"
                                ? `Refund ${booking.refundStatus}`
                                : (booking.status || "Confirmed")}
                            </span>
                            {booking.paymentId && (
                              <span className="btk-paid-ref-sub">
                                Ref: {booking.paymentId}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* 4 Spacious Value Blocks with Icons */}
                        <div className="btk-booking-meta-grid">
                          <div className="btk-meta-cell">
                            <span className="btk-meta-icon"><Calendar size={15} /></span>
                            <div>
                              <span className="btk-meta-label">Travel Date</span>
                              <strong className="btk-meta-value">
                                {formatBookingDate(booking.travelDate || booking.date)}
                              </strong>
                            </div>
                          </div>

                          <div className="btk-meta-cell">
                            <span className="btk-meta-icon"><Clock size={15} /></span>
                            <div>
                              <span className="btk-meta-label">Departure Slot</span>
                              <strong className="btk-meta-value">
                                {cleanSlot(booking.departureSlot || booking.time)}
                              </strong>
                            </div>
                          </div>

                          <div className="btk-meta-cell">
                            <span className="btk-meta-icon"><Users size={15} /></span>
                            <div>
                              <span className="btk-meta-label">Travelers</span>
                              <strong className="btk-meta-value">
                                {booking.guests || booking.adults || 1} Person(s) · 1 Boat
                              </strong>
                            </div>
                          </div>

                          <div className="btk-meta-cell highlight">
                            <span className="btk-meta-icon money"><CreditCard size={15} /></span>
                            <div>
                              <span className="btk-meta-label">Total Amount Paid</span>
                              <strong className="btk-meta-value price">
                                ₹{Number(booking.amount || booking.totalAmount || 3590).toLocaleString("en-IN")}
                              </strong>
                            </div>
                          </div>
                        </div>

                        {/* Footer: Official Note & Action Buttons */}
                        <div className="btk-booking-card-foot">
                          <div className="btk-booking-foot-note">
                            <ShieldCheck size={14} />
                            <span>Official Forest Permit &amp; Boat Tax Included</span>
                          </div>

                          <div className="btk-booking-foot-actions">
                            <button
                              type="button"
                              className="btk-btn-download-voucher"
                              onClick={() => handleDownloadPdf(booking)}
                            >
                              <Download size={14} />
                              <span>Download E-Voucher</span>
                            </button>

                            {booking.refundStatus && booking.refundStatus !== "None" ? (
                              <span className="btk-action-status-pill">
                                <RotateCcw size={13} />
                                <span>Refund {booking.refundStatus}</span>
                              </span>
                            ) : (
                              <button
                                type="button"
                                className="btk-btn-cancel-refund"
                                onClick={() => handleOpenRefundModal(booking)}
                              >
                                <RotateCcw size={13} />
                                <span>Cancel &amp; Request Refund</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ================= TAB 3: TRANSACTIONS ================= */}
            {activeTab === "transactions" && (
              <div className="btk-content-card">
                <div className="btk-card-head">
                  <div>
                    <h2 className="btk-card-title">Payment Transactions</h2>
                    <p className="btk-card-desc">
                      Detailed record of all boat safaris, forest entry permits, and boat taxes paid.
                    </p>
                  </div>
                </div>

                {bookings.length === 0 ? (
                  <div className="btk-empty-state">
                    <CreditCard size={32} className="btk-empty-icon-static" />
                    <h3>No Transactions Found</h3>
                    <p>When you book a boat safari, your payment receipts will appear here.</p>
                  </div>
                ) : (
                  <div className="btk-table-responsive">
                    <table className="btk-table">
                      <thead>
                        <tr>
                          <th>Transaction ID</th>
                          <th>Booking Ref</th>
                          <th>Safari Package</th>
                          <th>Fare Breakdown</th>
                          <th>Total Paid</th>
                          <th>Payment Mode</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking, idx) => {
                          const fare = booking.boatFare || (booking.amount ? booking.amount - 90 : 3500);
                          const permit = booking.forestPermit || 40;
                          const tax = booking.govtTax || 50;
                          const total = Number(booking.amount || booking.totalAmount || 3590);
                          const txnCode = booking.paymentId || (booking.bookingId ? `TXN_${booking.bookingId.replace(/\D/g, "")}` : `TXN_800${idx}`);

                          return (
                            <tr key={booking._id || idx}>
                              <td>
                                <strong className="btk-txn-code">
                                  {txnCode}
                                </strong>
                              </td>
                              <td>{booking.bookingId || `BTK-${idx + 1001}`}</td>
                              <td>{booking.packageName || "Boat Safari"}</td>
                              <td className="btk-breakdown-col">
                                <span>Boat: ₹{fare}</span>
                                <span>Permit: ₹{permit}</span>
                                <span>Tax: ₹{tax}</span>
                              </td>
                              <td>
                                <strong className="btk-price-val">
                                  ₹{total.toLocaleString("en-IN")}
                                </strong>
                              </td>
                              <td>
                                <span className="btk-mode-pill">{booking.paymentMethod || "Razorpay / UPI"}</span>
                              </td>
                              <td>
                                {booking.refundStatus && booking.refundStatus !== "None" ? (
                                  <span className="btk-badge-refund">
                                    <RotateCcw size={12} />
                                    <span>Refund {booking.refundStatus}</span>
                                  </span>
                                ) : (
                                  <span className="btk-badge-paid">
                                    <CheckCircle2 size={12} />
                                    <span>{booking.paymentStatus || "Paid"}</span>
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ================= TAB 4: REFUNDS & CANCELLATIONS ================= */}
            {activeTab === "refunds" && (
              <div className="btk-content-card">
                <div className="btk-card-head">
                  <div>
                    <h2 className="btk-card-title">Refunds &amp; Cancellations</h2>
                    <p className="btk-card-desc">
                      Manage booking cancellations, view refund statuses, and read official policies.
                    </p>
                  </div>
                </div>

                {/* Refund Policy Card */}
                <div className="btk-policy-card">
                  <div className="btk-policy-head">
                    <RotateCcw size={18} className="btk-policy-icon" />
                    <h4>Bhitarkanika Boat Safari Cancellation &amp; Refund Policy</h4>
                  </div>
                  <ul className="btk-policy-list">
                    <li>
                      <strong>100% Full Refund:</strong> Cancel up to 24 hours prior to scheduled jetty departure slot.
                    </li>
                    <li>
                      <strong>50% Partial Refund:</strong> Cancel between 12 to 24 hours prior to departure time.
                    </li>
                    <li>
                      <strong>Weather / Force Majeure:</strong> In case of cyclonic alerts or forest department creek closures, 100% full refund or free rescheduling is provided immediately.
                    </li>
                    <li>
                      <strong>Processing Time:</strong> Approved refunds are credited directly to original UPI / Bank Account within 1–3 business days.
                    </li>
                  </ul>
                </div>

                {/* Refund Requests List - only shown if there are active refund requests */}
                {refundRequests.length > 0 && (
                  <>
                    <h3 className="btk-section-subtitle">Refund Requests History</h3>
                    <div className="btk-refunds-list">
                      {refundRequests.map((rf) => (
                        <div className="btk-refund-card" key={rf.refundId}>
                          <div className="btk-refund-card-top">
                            <div>
                              <span className="btk-refund-id">{rf.refundId}</span>
                              <h4 className="btk-refund-pkg">{rf.packageName}</h4>
                              <span className="btk-refund-ref">Ref Booking: {rf.bookingId}</span>
                            </div>
                            <span
                              className={`btk-refund-status ${
                                rf.status?.includes("Completed") || rf.status?.includes("Processed")
                                  ? "completed"
                                  : "pending"
                              }`}
                            >
                              {rf.status}
                            </span>
                          </div>

                          <div className="btk-refund-card-meta">
                            <div>
                              <span className="btk-lbl-sub">Refund Amount</span>
                              <strong className="btk-val-sub">₹{Number(rf.amount || 0).toLocaleString("en-IN")}</strong>
                            </div>
                            <div>
                              <span className="btk-lbl-sub">Reason</span>
                              <span className="btk-val-sub">{rf.reason}</span>
                            </div>
                            <div>
                              <span className="btk-lbl-sub">Requested On</span>
                              <span className="btk-val-sub">{rf.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ================= TAB 5: SECURITY ================= */}
            {activeTab === "security" && (
              <div className="btk-content-card">
                <div className="btk-card-head">
                  <div>
                    <h2 className="btk-card-title">Security &amp; Password</h2>
                    <p className="btk-card-desc">
                      Update your account password and review login security settings.
                    </p>
                  </div>
                </div>

                {pwdMsg.text && (
                  <div className={`btk-alert ${pwdMsg.type}`}>
                    {pwdMsg.type === "success" ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <AlertCircle size={16} />
                    )}
                    <span>{pwdMsg.text}</span>
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="btk-security-form">
                  <div className="btk-input-group">
                    <label className="btk-lbl">Current Password</label>
                    <div className="btk-input-wrap">
                      <Lock size={16} className="btk-ico" />
                      <input
                        type={showPwd ? "text" : "password"}
                        className="btk-inp"
                        placeholder="Enter your current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="btk-form-row-2">
                    <div className="btk-input-group">
                      <label className="btk-lbl">New Password</label>
                      <div className="btk-input-wrap">
                        <KeyRound size={16} className="btk-ico" />
                        <input
                          type={showPwd ? "text" : "password"}
                          className="btk-inp"
                          placeholder="Min 6 characters"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="btk-pwd-eye"
                          onClick={() => setShowPwd(!showPwd)}
                        >
                          {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="btk-input-group">
                      <label className="btk-lbl">Confirm New Password</label>
                      <div className="btk-input-wrap">
                        <KeyRound size={16} className="btk-ico" />
                        <input
                          type={showPwd ? "text" : "password"}
                          className="btk-inp"
                          placeholder="Re-enter new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="btk-form-actions">
                    <button
                      type="submit"
                      className="btk-primary-btn"
                      disabled={changingPwd}
                    >
                      <span>{changingPwd ? "Updating..." : "Update Password"}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ================= REFUND REQUEST MODAL ================= */}
      {refundModalOpen && selectedBookingForRefund && (
        <div className="btk-modal-backdrop">
          <div className="btk-modal-card">
            <div className="btk-modal-header">
              <h3>Request Cancellation &amp; Refund</h3>
              <button
                type="button"
                className="btk-modal-close"
                onClick={() => setRefundModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="btk-modal-body">
              {refundSuccessMsg ? (
                <div className="btk-alert success">
                  <CheckCircle2 size={16} />
                  <span>{refundSuccessMsg}</span>
                </div>
              ) : (
                <>
                  <p className="btk-modal-notice">
                    You are requesting a refund for booking{" "}
                    <strong>{selectedBookingForRefund.bookingId || "BTK"}</strong> (
                    {selectedBookingForRefund.packageName || "Safari Package"}).
                  </p>

                  <div className="btk-modal-summary">
                    <div>
                      <span>Refund Amount:</span>
                      <strong>
                        ₹
                        {Number(
                          selectedBookingForRefund.amount ||
                            selectedBookingForRefund.totalAmount ||
                            3590
                        ).toLocaleString("en-IN")}
                      </strong>
                    </div>
                    <div>
                      <span>Scheduled Date:</span>
                      <span>{selectedBookingForRefund.travelDate || selectedBookingForRefund.date || "Scheduled"}</span>
                    </div>
                  </div>

                  <div className="btk-input-group">
                    <label className="btk-lbl">Reason for Cancellation</label>
                    <select
                      className="btk-select"
                      value={refundReason}
                      onChange={(e) => setRefundReason(e.target.value)}
                    >
                      <option value="Personal Emergency">Personal Emergency / Health</option>
                      <option value="Weather / High Tide">Adverse Weather / Rain</option>
                      <option value="Travel Schedule Change">Travel Schedule Change</option>
                      <option value="Duplicate Booking">Booked by mistake</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="btk-input-group">
                    <label className="btk-lbl">Refund Destination (UPI ID or Account)</label>
                    <input
                      type="text"
                      className="btk-inp-modal"
                      placeholder="e.g. mobile@upi or account number"
                      value={refundUpi}
                      onChange={(e) => setRefundUpi(e.target.value)}
                    />
                  </div>

                  <div className="btk-modal-actions">
                    <button
                      type="button"
                      className="btk-cancel-btn"
                      onClick={() => setRefundModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btk-danger-btn"
                      disabled={submittingRefund}
                      onClick={handleConfirmRefund}
                    >
                      {submittingRefund ? "Submitting..." : "Confirm Refund Request"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

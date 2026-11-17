import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  AlertTriangle,
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

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// Dynamically load Razorpay checkout script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Profile = () => {
  const { user, token, isAuthenticated, logout, updateUser, login } = useAuth();
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

  // Security Tab OTP-Based Reset State (Same Forgot Password Integration)
  const [secMode, setSecMode] = useState("standard"); // "standard" | "otp"
  const [secOtpStep, setSecOtpStep] = useState(1); // 1: Send OTP | 2: Verify & Reset
  const [secEmail, setSecEmail] = useState(user?.email || "");
  const [secOtp, setSecOtp] = useState("");
  const [secNewPassword, setSecNewPassword] = useState("");
  const [secConfirmPassword, setSecConfirmPassword] = useState("");
  const [showSecNewPwd, setShowSecNewPwd] = useState(false);
  const [showSecConfirmPwd, setShowSecConfirmPwd] = useState(false);
  const [secLoading, setSecLoading] = useState(false);
  const [secCooldown, setSecCooldown] = useState(0);
  const [secMsg, setSecMsg] = useState({ type: "", text: "" });

  // Bookings & Transactions State
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookingStatusFilter, setBookingStatusFilter] = useState("all"); // "all" | "confirmed" | "refund_processing" | "refunded" | "cancelled"

  // Refund Modal State
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [selectedBookingForRefund, setSelectedBookingForRefund] = useState(null);
  const [refundReason, setRefundReason] = useState("Personal Emergency / Health");
  const [refundReasonDetails, setRefundReasonDetails] = useState("");
  const [refundUpi, setRefundUpi] = useState("");
  const [submittingRefund, setSubmittingRefund] = useState(false);
  const [refundSuccessMsg, setRefundSuccessMsg] = useState("");

  // Real backend-stored refund requests (no fallback/dummy data)
  const [refundRequests, setRefundRequests] = useState([]);
  const [loadingRefunds, setLoadingRefunds] = useState(false);

  // Payment Retry State
  const [payingBookingId, setPayingBookingId] = useState(null);
  const [retryPayMsg, setRetryPayMsg] = useState({ type: "", text: "" });

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
      if (user.email && !secEmail) {
        setSecEmail(user.email);
      }
    }
  }, [user]);

  // Resend OTP Countdown Timer for Security Tab
  useEffect(() => {
    if (secCooldown <= 0) return;
    const timer = setInterval(() => {
      setSecCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secCooldown]);

  // Fetch real user bookings from database
  const fetchUserBookings = async () => {
    if (!user) return;
    try {
      setLoadingBookings(true);
      const userEmail = (user?.email || "").toLowerCase().trim();
      const userPhone = (user?.phone || "").replace(/\D/g, "");
      const userId = user?._id || user?.id || "";
      const res = await fetch(
        `${API_BASE}/tour-bookings?email=${encodeURIComponent(userEmail)}&phone=${encodeURIComponent(userPhone)}&userId=${encodeURIComponent(userId)}`,
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
          const bUserId = b.userId ? String(b.userId) : "";
          return (
            (userId && bUserId && userId === bUserId) ||
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

  // Handle Security OTP Dispatch (Forgot / Reset Password)
  const handleSendSecurityOtp = async (e) => {
    if (e) e.preventDefault();
    setSecMsg({ type: "", text: "" });

    const targetEmail = (secEmail || user?.email || "").trim().toLowerCase();
    if (!targetEmail) {
      setSecMsg({ type: "error", text: "Please provide your registered email address." });
      return;
    }

    try {
      setSecLoading(true);
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setSecMsg({ type: "error", text: data.message || "Failed to generate verification code." });
        return;
      }

      setSecCooldown(60);
      setSecMsg({
        type: "success",
        text: `A 6-digit verification code (OTP) has been sent to ${targetEmail}. Please check your inbox and spam folder.`,
      });
      setSecOtpStep(2);
    } catch (err) {
      setSecMsg({ type: "error", text: "Server connection failed. Please ensure the backend is running." });
    } finally {
      setSecLoading(false);
    }
  };

  // Handle Security OTP Verification & Password Reset
  const handleResetSecurityPasswordWithOtp = async (e) => {
    e.preventDefault();
    setSecMsg({ type: "", text: "" });

    const targetEmail = (secEmail || user?.email || "").trim().toLowerCase();
    const cleanOtp = (secOtp || "").trim();

    if (!cleanOtp) {
      setSecMsg({ type: "error", text: "Please enter the 6-digit verification code." });
      return;
    }

    if (cleanOtp.length !== 6) {
      setSecMsg({ type: "error", text: "Please enter a valid 6-digit verification code." });
      return;
    }

    if (!secNewPassword) {
      setSecMsg({ type: "error", text: "Please enter your new password." });
      return;
    }

    if (secNewPassword.length < 6) {
      setSecMsg({ type: "error", text: "New password must be at least 6 characters long." });
      return;
    }

    if (secNewPassword !== secConfirmPassword) {
      setSecMsg({ type: "error", text: "New password and confirm password do not match." });
      return;
    }

    try {
      setSecLoading(true);
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: targetEmail,
          otp: cleanOtp,
          newPassword: secNewPassword,
          confirmPassword: secConfirmPassword,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setSecMsg({
          type: "error",
          text: data.message || "Password reset failed. Invalid or expired verification code.",
        });
        return;
      }

      if (data.user && login) {
        login(data.user, data.token);
      } else if (data.user) {
        updateUser(data.user);
      }

      setSecMsg({
        type: "success",
        text: "Password reset successful! Your account is now secured with the new password.",
      });
      setSecOtp("");
      setSecNewPassword("");
      setSecConfirmPassword("");
      setSecOtpStep(1);
    } catch (err) {
      setSecMsg({ type: "error", text: "Server connection error during password reset." });
    } finally {
      setSecLoading(false);
    }
  };

  // Open refund request modal
  const handleOpenRefundModal = (booking) => {
    setSelectedBookingForRefund(booking);
    setRefundReason("Personal Emergency / Reschedule");
    setRefundReasonDetails("");
    setRefundUpi(user?.phone ? `${user.phone}@upi` : "");
    setRefundSuccessMsg("");
    setRefundModalOpen(true);
  };

  // Submit refund request to Backend
  const handleConfirmRefund = async () => {
    if (!selectedBookingForRefund) return;
    setSubmittingRefund(true);
    setRefundSuccessMsg("");

    const fullReason = refundReasonDetails.trim()
      ? `${refundReason} - ${refundReasonDetails.trim()}`
      : refundReason;

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
          reason: fullReason,
          reasonDetails: refundReasonDetails.trim(),
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

  // Navigate to Home Page's Boat Safari "Book Trip" Section
  const handleRedirectToBookTrip = (e) => {
    e?.preventDefault();
    navigate("/#book-trip");
    setTimeout(() => {
      const el = document.getElementById("book-trip");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
  };

  // Retry and complete payment for failed/pending booking directly from dashboard
  const handleRetryPayment = async (booking) => {
    if (!booking) return;
    const targetId = booking.bookingId || booking._id;
    setPayingBookingId(targetId);
    setRetryPayMsg({ type: "", text: "" });

    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded || !window.Razorpay) {
        alert("Unable to load secure Razorpay payment gateway. Please check your internet connection.");
        setPayingBookingId(null);
        return;
      }

      // 1. Create order on backend for this specific booking
      const orderAmount = Number(booking.amount || booking.totalAmount || 3590);
      const res = await fetch(`${API_BASE}/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify({
          amount: orderAmount,
          currency: "INR",
          bookingId: booking.bookingId || booking._id,
          receipt: `rcpt_${(booking.bookingId || "btk").slice(0, 30)}`,
          bookingDetails: booking,
        }),
      });

      const orderData = await res.json();
      if (!orderData.success || !orderData.order) {
        alert(orderData.message || "Failed to initialize payment gateway.");
        setPayingBookingId(null);
        return;
      }

      // 2. Configure Razorpay options
      const options = {
        key: orderData.keyId || "rzp_test_TppGgVggUkbJv4",
        amount: orderData.order.amount,
        currency: orderData.order.currency || "INR",
        name: "Bhitarkanika Boat Service",
        description: `${booking.packageName || "Boat Safari"} (Ref: ${booking.bookingId || "Safari"})`,
        image: siteLogo || "https://bhitarkanikatour.in/logo.png",
        order_id: orderData.order.id,
        prefill: {
          name: booking.name || user?.name || "Safari Traveler",
          email: booking.email || user?.email || "",
          contact: booking.phone || user?.phone || "",
        },
        notes: {
          bookingId: booking.bookingId || booking._id,
          packageName: booking.packageName || "Boat Safari",
          departureSlot: booking.departureSlot || booking.time || "",
        },
        theme: {
          color: "#1d352b",
        },
        handler: async function (response) {
          try {
            // Verify payment on backend and update booking status to Confirmed & Paid
            const verifyRes = await fetch(`${API_BASE}/payment/verify-payment`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
              credentials: "include",
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingData: {
                  ...booking,
                  _id: booking._id,
                  bookingId: booking.bookingId,
                  amount: orderAmount,
                  totalAmount: orderAmount,
                },
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setRetryPayMsg({
                type: "success",
                text: `Payment successful! Booking #${booking.bookingId || "Safari"} is now Confirmed. Official E-Voucher is available and confirmation email with ticket was sent.`,
              });
              // Refresh user bookings & transactions from database
              await fetchUserBookings();
            } else {
              setRetryPayMsg({
                type: "error",
                text: verifyData.message || "Payment verification failed.",
              });
            }
          } catch (verErr) {
            console.error("Verification error:", verErr);
            setRetryPayMsg({
              type: "error",
              text: "Server error verifying payment. Please contact support.",
            });
          } finally {
            setPayingBookingId(null);
          }
        },
        modal: {
          ondismiss: function () {
            setPayingBookingId(null);
            setRetryPayMsg({
              type: "warning",
              text: "Payment was not completed. You can click 'Pay Now' anytime to complete your reservation.",
            });
          },
        },
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on("payment.failed", async function (failRes) {
        const errorDesc =
          failRes.error?.description ||
          failRes.error?.reason ||
          "Payment was declined or failed.";
        setPayingBookingId(null);
        setRetryPayMsg({
          type: "error",
          text: `Payment failed: ${errorDesc}`,
        });

        // Record failure in backend
        try {
          await fetch(`${API_BASE}/payment/payment-failed`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            credentials: "include",
            body: JSON.stringify({
              orderId: orderData?.order?.id,
              paymentId: failRes.error?.metadata?.payment_id || "",
              errorCode: failRes.error?.code,
              errorDescription: errorDesc,
              errorReason: failRes.error?.reason,
              bookingData: booking,
            }),
          });
          await fetchUserBookings();
        } catch (logErr) {
          console.warn("Failed to log payment failure:", logErr);
        }
      });

      rzpInstance.open();
    } catch (err) {
      console.error("Retry payment error:", err);
      alert("Failed to launch payment gateway. Please try again.");
      setPayingBookingId(null);
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

  // Determine structured status category for filtering and badges
  const getBookingStatusCategory = (b) => {
    const rStatus = (b?.refundStatus || "").toLowerCase();
    const bStatus = (b?.status || "").toLowerCase();
    const pStatus = (b?.paymentStatus || "").toLowerCase();

    if (
      rStatus === "completed" ||
      rStatus === "processed" ||
      rStatus === "refunded" ||
      bStatus === "refunded"
    ) {
      return "refunded";
    }
    if (
      rStatus.includes("processing") ||
      rStatus.includes("requested") ||
      bStatus.includes("cancellation") ||
      bStatus.includes("refund")
    ) {
      return "refund_processing";
    }
    if (
      pStatus === "failed" ||
      bStatus === "failed" ||
      bStatus === "payment failed" ||
      (pStatus === "pending" && bStatus !== "confirmed")
    ) {
      return "payment_failed";
    }
    if (bStatus === "cancelled") {
      return "cancelled";
    }
    return "confirmed";
  };

  // Render standardized, attractive status badge
  const renderStatusBadge = (booking) => {
    const category = getBookingStatusCategory(booking);
    if (category === "payment_failed") {
      return (
        <span className="btk-status-pill payment-failed">
          <AlertTriangle size={13} />
          <span>Payment Failed (Action Needed)</span>
        </span>
      );
    }
    if (category === "refunded") {
      return (
        <span className="btk-status-pill refunded">
          <CheckCircle2 size={13} />
          <span>Refund Credited</span>
        </span>
      );
    }
    if (category === "refund_processing") {
      return (
        <span className="btk-status-pill refund-processing">
          <RotateCcw size={13} className="btk-spin-subtle" />
          <span>Refund Processing (1-3 Days)</span>
        </span>
      );
    }
    if (category === "cancelled") {
      return (
        <span className="btk-status-pill cancelled">
          <AlertCircle size={13} />
          <span>Booking Cancelled</span>
        </span>
      );
    }
    return (
      <span className="btk-status-pill confirmed">
        <span className="btk-status-pulse" />
        <CheckCircle2 size={13} />
        <span>Confirmed (Success)</span>
      </span>
    );
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

      // Page 1 Footer
      doc.setFillColor(...green);
      doc.rect(0, 282, W, 15, "F");
      doc.setFillColor(...gold);
      doc.rect(0, 282, W, 1.2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text("Page 1 of 2 · Refer to Page 2 for official Terms & Conditions and Cancellation Policy", W / 2, 290, { align: "center" });

      // ==========================================
      // PAGE 2: OFFICIAL TERMS & CONDITIONS & POLICIES
      // ==========================================
      doc.addPage();

      // Page 2 Header Band
      doc.setFillColor(...green);
      doc.rect(0, 0, W, 26, "F");
      doc.setFillColor(...gold);
      doc.rect(0, 26, W, 2, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("TERMS & CONDITIONS · ECOTOUR ODISHA", 14, 13);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(225, 200, 140);
      doc.text("Bhitarkanika Wildlife Sanctuary & National Park · Forest & Environment Dept., Govt. of Odisha", 14, 20);

      let p2Y = 34;

      // Section 1: Approved Cancellation & Date Change Policy Box
      doc.setFillColor(248, 250, 248);
      doc.setDrawColor(200, 220, 210);
      doc.roundedRect(14, p2Y, W - 28, 44, 3, 3, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(...green);
      doc.text("CANCELLATION & DATE CHANGE POLICY", 20, p2Y + 7);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.8);
      doc.setTextColor(50, 65, 58);
      const policyLines = [
        "• 30+ days prior to scheduled check-in / travel date: 5% cancellation charge | 0 INR date change fee.",
        "• 15 to 29 days prior to travel date: 15% cancellation charge | 10% date change fee.",
        "• 7 to 14 days prior to travel date: 25% cancellation charge | 10% date change fee.",
        "• 2 to 6 days prior to travel date: 50% cancellation charge | 25% date change fee.",
        "• 0 to 1 days prior to travel date (last 24 hours): 100% cancellation charge (No refund) | 100% date change fee.",
        "• Reference check-in time is 12:00 noon IST. Refund requests are processed via UPI / original mode in 1 to 3 days.",
      ];
      policyLines.forEach((line, idx) => {
        doc.text(line, 20, p2Y + 13 + idx * 4.9);
      });

      p2Y += 50;

      // Section 2: Standard Terms & Conditions
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...green);
      doc.text("OFFICIAL SANCTUARY & BOOKING TERMS & CONDITIONS", 14, p2Y);

      p2Y += 5;

      const termsList = [
        {
          title: "Booking Acceptance & Forest Permissions",
          desc: "Booking is valid only after payment, availability confirmation, and applicable forest permissions. All bookings are subject to weather, tide conditions, and directions from the Forest Department.",
        },
        {
          title: "Mandatory ID Proof & Entry Verification",
          desc: "Every guest must carry a valid government-issued photo ID (Aadhaar, Passport, Voter ID) and produce it at jetty checkpoints. Denial of entry by forest authorities overrides booking without liability.",
        },
        {
          title: "Strict Activity & Departure Timings",
          desc: "Guests must report at least 15 minutes prior to the departure slot. Boat and safari timings are strictly governed by high/low tides and forest safety regulations. Late arrivals will result in missed services without refund.",
        },
        {
          title: "Wildlife Conduct Norms & Silence",
          desc: "Feeding, chasing, provoking, or photographing with flash in restricted zones is strictly prohibited. Guests must maintain silence, remain in designated areas, and follow guides and forest staff instructions at all times.",
        },
        {
          title: "Safari, Boating & Trekking at Own Risk",
          desc: "Nature activities involve operational and terrain risks. Certified life jackets must be worn at all times aboard safari boats. Participation is voluntary and at guest's own risk, subject to applicable law.",
        },
        {
          title: "Prohibition of Intoxicants, Loud Noise & Pets",
          desc: "Possession or consumption of alcohol, drugs, narcotics, smoking, loud music, parties, and companion animals/pets are strictly forbidden inside eco-tourism zones and will attract immediate legal action.",
        },
        {
          title: "Environmental Protection & Zero-Littering",
          desc: "Bhitarkanika is an eco-sensitive Ramsar site. Single-use plastic, littering, open fire, or damaging flora and fauna are strictly prohibited and punishable under the Wildlife Protection Act.",
        },
        {
          title: "No Sightings Guarantee & Forest Utilities",
          desc: "Wildlife sightings and specific weather cannot be guaranteed. Nature stays in forest zones may have limited or intermittent mobile signal, electricity, and water. No dispute will be entertained on this ground.",
        },
        {
          title: "Damage to Property & Equipment",
          desc: "Any breakage, loss, vandalism, or damage caused to boats, life jackets, or sanctuary facilities will be charged on actual assessment directly to the primary guest.",
        },
        {
          title: "Cancellation, Closure & Force Majeure",
          desc: "Services may be altered, rescheduled, or cancelled due to adverse weather, tidal surges, wildlife movements, or government directives. In such cases, refunds follow applicable forest policy.",
        },
      ];

      termsList.forEach((term) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(...gold);
        doc.text(`• ${term.title}:`, 14, p2Y);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(60, 75, 68);
        const splitText = doc.splitTextToSize(term.desc, W - 28);
        doc.text(splitText, 14, p2Y + 3.8);
        p2Y += 3.8 + splitText.length * 3.4 + 1.6;
      });

      // Page 2 Footer
      doc.setFillColor(...green);
      doc.rect(0, 282, W, 15, "F");
      doc.setFillColor(...gold);
      doc.rect(0, 282, W, 1.2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text("Page 2 of 2 · EcoTour Odisha · Forest & Environment Dept., Govt. of Odisha", W / 2, 290, { align: "center" });

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

                <Link to="/#book-trip" className="btk-book-now-pill" onClick={handleRedirectToBookTrip}>
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
            {activeTab === "bookings" && (() => {
              const statusCounts = {
                all: bookings.length,
                confirmed: bookings.filter((b) => getBookingStatusCategory(b) === "confirmed").length,
                payment_failed: bookings.filter((b) => getBookingStatusCategory(b) === "payment_failed").length,
                refund_processing: bookings.filter((b) => getBookingStatusCategory(b) === "refund_processing").length,
                refunded: bookings.filter((b) => getBookingStatusCategory(b) === "refunded").length,
                cancelled: bookings.filter((b) => getBookingStatusCategory(b) === "cancelled").length,
              };

              const filteredBookings = bookings.filter((b) => {
                if (bookingStatusFilter === "all") return true;
                return getBookingStatusCategory(b) === bookingStatusFilter;
              });

              return (
                <div className="btk-content-card">
                  <div className="btk-card-head">
                    <div>
                      <h2 className="btk-card-title">My Boat Safari Bookings</h2>
                      <p className="btk-card-desc">
                        View your confirmed boat safari reservations, vouchers, live status, and refund trackers.
                      </p>
                    </div>

                    <Link to="/#book-trip" className="btk-ghost-btn" onClick={handleRedirectToBookTrip}>
                      <Anchor size={15} />
                      <span>Book New Safari</span>
                    </Link>
                  </div>

                  {/* Retry payment live notification message */}
                  {retryPayMsg.text && (
                    <div className={`btk-pay-retry-alert ${retryPayMsg.type}`}>
                      {retryPayMsg.type === "success" ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <AlertTriangle size={16} />
                      )}
                      <div className="btk-pay-retry-text">{retryPayMsg.text}</div>
                      <button
                        type="button"
                        className="btk-pay-retry-close"
                        onClick={() => setRetryPayMsg({ type: "", text: "" })}
                        aria-label="Close notification"
                      >
                        ×
                      </button>
                    </div>
                  )}

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
                      <Link to="/#book-trip" className="btk-primary-btn" onClick={handleRedirectToBookTrip}>
                        <span>Reserve a Boat Safari</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  ) : (
                    <>
                      {/* Booking Status Filter Bar */}
                      <div className="btk-booking-filter-bar" role="tablist" aria-label="Filter bookings by status">
                        <button
                          type="button"
                          className={`btk-filter-pill ${bookingStatusFilter === "all" ? "active" : ""}`}
                          onClick={() => setBookingStatusFilter("all")}
                        >
                          <span>All Bookings</span>
                          <span className="btk-filter-count">{statusCounts.all}</span>
                        </button>

                        <button
                          type="button"
                          className={`btk-filter-pill confirmed ${bookingStatusFilter === "confirmed" ? "active" : ""}`}
                          onClick={() => setBookingStatusFilter("confirmed")}
                        >
                          <CheckCircle2 size={13} />
                          <span>Confirmed / Success</span>
                          <span className="btk-filter-count">{statusCounts.confirmed}</span>
                        </button>

                        {statusCounts.payment_failed > 0 && (
                          <button
                            type="button"
                            className={`btk-filter-pill payment-failed ${bookingStatusFilter === "payment_failed" ? "active" : ""}`}
                            onClick={() => setBookingStatusFilter("payment_failed")}
                          >
                            <AlertTriangle size={13} />
                            <span>Payment Failed</span>
                            <span className="btk-filter-count">{statusCounts.payment_failed}</span>
                          </button>
                        )}

                        {statusCounts.refund_processing > 0 && (
                          <button
                            type="button"
                            className={`btk-filter-pill refund-processing ${bookingStatusFilter === "refund_processing" ? "active" : ""}`}
                            onClick={() => setBookingStatusFilter("refund_processing")}
                          >
                            <RotateCcw size={13} />
                            <span>Refund Processing</span>
                            <span className="btk-filter-count">{statusCounts.refund_processing}</span>
                          </button>
                        )}

                        {statusCounts.refunded > 0 && (
                          <button
                            type="button"
                            className={`btk-filter-pill refunded ${bookingStatusFilter === "refunded" ? "active" : ""}`}
                            onClick={() => setBookingStatusFilter("refunded")}
                          >
                            <CheckCircle2 size={13} />
                            <span>Refunded</span>
                            <span className="btk-filter-count">{statusCounts.refunded}</span>
                          </button>
                        )}

                        {statusCounts.cancelled > 0 && (
                          <button
                            type="button"
                            className={`btk-filter-pill cancelled ${bookingStatusFilter === "cancelled" ? "active" : ""}`}
                            onClick={() => setBookingStatusFilter("cancelled")}
                          >
                            <AlertCircle size={13} />
                            <span>Cancelled</span>
                            <span className="btk-filter-count">{statusCounts.cancelled}</span>
                          </button>
                        )}
                      </div>

                      {filteredBookings.length === 0 ? (
                        <div className="btk-empty-filter-state">
                          <p>No bookings found with status filter: <strong>{bookingStatusFilter.replace("_", " ")}</strong></p>
                          <button
                            type="button"
                            className="btk-reset-filter-btn"
                            onClick={() => setBookingStatusFilter("all")}
                          >
                            Show All {bookings.length} Bookings
                          </button>
                        </div>
                      ) : (
                        <div className="btk-bookings-list">
                          {filteredBookings.map((booking, idx) => {
                            const category = getBookingStatusCategory(booking);
                            return (
                              <div className={`btk-booking-card btk-card-${category}`} key={booking._id || idx}>
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
                                    {renderStatusBadge(booking)}
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

                                  <div className={`btk-meta-cell highlight ${category === "payment_failed" ? "payment-due" : ""}`}>
                                    <span className="btk-meta-icon money"><CreditCard size={15} /></span>
                                    <div>
                                      <span className="btk-meta-label">
                                        {category === "payment_failed" ? "Amount Payable" : "Total Amount Paid"}
                                      </span>
                                      <strong className="btk-meta-value price">
                                        ₹{Number(booking.amount || booking.totalAmount || 3590).toLocaleString("en-IN")}
                                      </strong>
                                    </div>
                                  </div>
                                </div>

                                {/* Failure Banner: If Payment Failed, clearly indicate action needed */}
                                {category === "payment_failed" && (
                                  <div className="btk-booking-failed-banner">
                                    <AlertTriangle size={15} className="btk-failed-banner-icon" />
                                    <div className="btk-failed-banner-content">
                                      <strong>Payment Incomplete or Declined</strong>
                                      <p>
                                        {booking.paymentError
                                          ? booking.paymentError
                                          : "Your previous payment attempt was not completed. Click 'Pay Now' below to securely complete your payment and receive your safari e-voucher."}
                                      </p>
                                    </div>
                                  </div>
                                )}

                                {/* Refund Status Tracker Box (if refund is initiated or completed) */}
                                {booking.refundStatus && booking.refundStatus !== "None" && (
                                  <div className="btk-booking-refund-tracker">
                                    <div className="btk-refund-tracker-header">
                                      <div className="btk-rth-left">
                                        <RotateCcw size={14} className={category === "refund_processing" ? "btk-spin-subtle" : ""} />
                                        <strong>Refund Tracking Details</strong>
                                      </div>
                                      <span className={`btk-refund-badge-pill ${category}`}>
                                        {booking.refundStatus}
                                      </span>
                                    </div>
                                    <div className="btk-refund-tracker-grid">
                                      <div className="btk-rt-item">
                                        <span className="btk-rt-label">Refund Reference</span>
                                        <span className="btk-rt-value code">{booking.refundId || `RFD-${booking.bookingId || "ONLINE"}`}</span>
                                      </div>
                                      <div className="btk-rt-item">
                                        <span className="btk-rt-label">Refund Amount</span>
                                        <span className="btk-rt-value price">₹{Number(booking.refundAmount || booking.amount || booking.totalAmount || 3590).toLocaleString("en-IN")}</span>
                                      </div>
                                      {booking.refundUpi && (
                                        <div className="btk-rt-item">
                                          <span className="btk-rt-label">Target UPI ID</span>
                                          <span className="btk-rt-value">{booking.refundUpi}</span>
                                        </div>
                                      )}
                                      <div className="btk-rt-item">
                                        <span className="btk-rt-label">Bank Settlement</span>
                                        <span className="btk-rt-value">1–3 Working Days Direct Credit</span>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Footer: Official Note & Action Buttons */}
                                <div className="btk-booking-card-foot">
                                  <div className="btk-booking-foot-note">
                                    <ShieldCheck size={14} />
                                    <span>Official Forest Permit &amp; Boat Tax Included</span>
                                  </div>

                                  <div className="btk-booking-foot-actions">
                                    {category === "payment_failed" ? (
                                      <button
                                        type="button"
                                        className="btk-btn-pay-now"
                                        disabled={payingBookingId === (booking.bookingId || booking._id)}
                                        onClick={() => handleRetryPayment(booking)}
                                      >
                                        <CreditCard size={14} />
                                        <span>
                                          {payingBookingId === (booking.bookingId || booking._id)
                                            ? "Opening Gateway..."
                                            : `Pay ₹${Number(booking.amount || booking.totalAmount || 3590).toLocaleString("en-IN")} Now`}
                                        </span>
                                      </button>
                                    ) : (
                                      <>
                                        <button
                                          type="button"
                                          className="btk-btn-download-voucher"
                                          onClick={() => handleDownloadPdf(booking)}
                                        >
                                          <Download size={14} />
                                          <span>Download E-Voucher</span>
                                        </button>

                                        {category === "refund_processing" ? (
                                          <span className="btk-action-status-pill refund-processing">
                                            <RotateCcw size={13} className="btk-spin-subtle" />
                                            <span>Refund Processing (1-3 Days)</span>
                                          </span>
                                        ) : category === "refunded" ? (
                                          <span className="btk-action-status-pill refunded">
                                            <CheckCircle2 size={13} />
                                            <span>Refund Credited</span>
                                          </span>
                                        ) : category === "cancelled" ? (
                                          <span className="btk-action-status-pill cancelled">
                                            <AlertCircle size={13} />
                                            <span>Booking Cancelled</span>
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
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })()}

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

                          const category = getBookingStatusCategory(booking);
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
                                {category === "payment_failed" ? (
                                  <span className="btk-badge-failed">
                                    <AlertTriangle size={12} />
                                    <span>Payment Failed</span>
                                  </span>
                                ) : category === "refunded" ? (
                                  <span className="btk-badge-refunded">
                                    <CheckCircle2 size={12} />
                                    <span>Refund Credited</span>
                                  </span>
                                ) : category === "refund_processing" ? (
                                  <span className="btk-badge-refund">
                                    <RotateCcw size={12} className="btk-spin-subtle" />
                                    <span>Refund Processing</span>
                                  </span>
                                ) : category === "cancelled" ? (
                                  <span className="btk-badge-cancelled">
                                    <AlertCircle size={12} />
                                    <span>Cancelled</span>
                                  </span>
                                ) : (
                                  <span className="btk-badge-paid">
                                    <CheckCircle2 size={12} />
                                    <span>Paid (Confirmed)</span>
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

            {/* ================= TAB 5: SECURITY & PASSWORD ================= */}
            {activeTab === "security" && (
              <div className="btk-content-card">
                <div className="btk-card-head btk-card-head-sec">
                  <div>
                    <h2 className="btk-card-title">Security &amp; Password</h2>
                    <p className="btk-card-desc">
                      Update your account password or reset it securely via registered email OTP verification.
                    </p>
                  </div>

                  {/* Mode Switcher Tabs */}
                  <div className="btk-sec-tabs" role="tablist">
                    <button
                      type="button"
                      className={`btk-sec-tab-btn ${secMode === "standard" ? "active" : ""}`}
                      onClick={() => {
                        setSecMode("standard");
                        setPwdMsg({ type: "", text: "" });
                        setSecMsg({ type: "", text: "" });
                      }}
                    >
                      <Lock size={14} />
                      <span>Change Password</span>
                    </button>
                    <button
                      type="button"
                      className={`btk-sec-tab-btn ${secMode === "otp" ? "active" : ""}`}
                      onClick={() => {
                        setSecMode("otp");
                        setPwdMsg({ type: "", text: "" });
                        setSecMsg({ type: "", text: "" });
                      }}
                    >
                      <ShieldCheck size={15} />
                      <span>Forgot? Reset via OTP</span>
                    </button>
                  </div>
                </div>

                {/* ================= SUB-MODE 1: STANDARD PASSWORD CHANGE ================= */}
                {secMode === "standard" && (
                  <div className="btk-sec-form-wrapper">
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
                        <div className="btk-label-between">
                          <label className="btk-lbl">Current Password</label>
                          <button
                            type="button"
                            className="btk-link-action-btn"
                            onClick={() => {
                              setSecMode("otp");
                              setSecOtpStep(1);
                              setSecMsg({ type: "", text: "" });
                            }}
                          >
                            Forgot Current Password?
                          </button>
                        </div>
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
                          <button
                            type="button"
                            className="btk-pwd-eye"
                            onClick={() => setShowPwd(!showPwd)}
                            aria-label={showPwd ? "Hide password" : "Show password"}
                          >
                            {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
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
                          </div>
                        </div>

                        <div className="btk-input-group">
                          <div className="btk-label-between">
                            <label className="btk-lbl">Confirm New Password</label>
                            {confirmPassword && (
                              <span className={`btk-match-pill ${newPassword === confirmPassword ? "match" : "mismatch"}`}>
                                {newPassword === confirmPassword ? "✓ Match" : "✗ Mismatch"}
                              </span>
                            )}
                          </div>
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

                {/* ================= SUB-MODE 2: FORGOT PASSWORD (OTP BASED) ================= */}
                {secMode === "otp" && (
                  <div className="btk-sec-form-wrapper">
                    {secMsg.text && (
                      <div className={`btk-alert ${secMsg.type}`}>
                        {secMsg.type === "success" ? (
                          <CheckCircle2 size={16} />
                        ) : (
                          <AlertCircle size={16} />
                        )}
                        <span>{secMsg.text}</span>
                      </div>
                    )}

                    {secOtpStep === 1 ? (
                      /* STEP 1: REQUEST 6-DIGIT OTP */
                      <form onSubmit={handleSendSecurityOtp} className="btk-security-form">
                        <div className="btk-sec-otp-banner">
                          <div className="btk-sec-otp-banner-icon">
                            <Mail size={22} />
                          </div>
                          <div className="btk-sec-otp-banner-text">
                            <h4>Reset Password via Email OTP</h4>
                            <p>
                              We will send a one-time 6-digit verification code to your registered email address to verify your identity and reset your password.
                            </p>
                          </div>
                        </div>

                        <div className="btk-input-group">
                          <label className="btk-lbl">Registered Account Email</label>
                          <div className="btk-input-wrap">
                            <Mail size={16} className="btk-ico" />
                            <input
                              type="email"
                              className="btk-inp"
                              placeholder="Enter registered email"
                              value={secEmail}
                              onChange={(e) => setSecEmail(e.target.value)}
                              required
                            />
                          </div>
                          <small className="btk-field-hint">
                            A verification code will be sent immediately to this mailbox.
                          </small>
                        </div>

                        <div className="btk-form-actions-split">
                          <button
                            type="button"
                            className="btk-link-action-btn"
                            onClick={() => {
                              setSecMode("standard");
                              setSecMsg({ type: "", text: "" });
                            }}
                          >
                            ← I know my current password
                          </button>

                          <button
                            type="submit"
                            className="btk-primary-btn"
                            disabled={secLoading}
                          >
                            <span>{secLoading ? "Sending OTP Code..." : "Send Verification Code (OTP)"}</span>
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </form>
                    ) : (
                      /* STEP 2: VERIFY OTP AND SET NEW PASSWORD */
                      <form onSubmit={handleResetSecurityPasswordWithOtp} className="btk-security-form">
                        <div className="btk-otp-destination-bar">
                          <div className="btk-otp-dest-left">
                            <Mail size={15} />
                            <span>Verification code sent to: <strong>{secEmail}</strong></span>
                          </div>
                          <button
                            type="button"
                            className="btk-otp-edit-btn"
                            onClick={() => {
                              setSecOtpStep(1);
                              setSecMsg({ type: "", text: "" });
                            }}
                          >
                            Change Email
                          </button>
                        </div>

                        {/* 6-Digit OTP */}
                        <div className="btk-input-group">
                          <div className="btk-label-between">
                            <label className="btk-lbl">6-Digit Verification Code (OTP)</label>
                            {secCooldown > 0 ? (
                              <span className="btk-resend-countdown">
                                Resend in {secCooldown}s
                              </span>
                            ) : (
                              <button
                                type="button"
                                className="btk-resend-btn"
                                disabled={secLoading}
                                onClick={handleSendSecurityOtp}
                              >
                                Resend Code
                              </button>
                            )}
                          </div>
                          <div className="btk-input-wrap">
                            <KeyRound size={16} className="btk-ico" />
                            <input
                              type="text"
                              className="btk-inp btk-otp-code-input"
                              placeholder="Enter 6-digit OTP"
                              value={secOtp}
                              maxLength={6}
                              inputMode="numeric"
                              pattern="[0-9]*"
                              onChange={(e) => setSecOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                              required
                              autoFocus
                            />
                          </div>
                        </div>

                        <div className="btk-form-row-2">
                          {/* New Password */}
                          <div className="btk-input-group">
                            <label className="btk-lbl">New Password</label>
                            <div className="btk-input-wrap">
                              <Lock size={16} className="btk-ico" />
                              <input
                                type={showSecNewPwd ? "text" : "password"}
                                className="btk-inp"
                                placeholder="Min 6 characters"
                                value={secNewPassword}
                                onChange={(e) => setSecNewPassword(e.target.value)}
                                required
                              />
                              <button
                                type="button"
                                className="btk-pwd-eye"
                                onClick={() => setShowSecNewPwd(!showSecNewPwd)}
                                aria-label={showSecNewPwd ? "Hide password" : "Show password"}
                              >
                                {showSecNewPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                            </div>
                          </div>

                          {/* Confirm New Password */}
                          <div className="btk-input-group">
                            <div className="btk-label-between">
                              <label className="btk-lbl">Confirm New Password</label>
                              {secConfirmPassword && (
                                <span className={`btk-match-pill ${secNewPassword === secConfirmPassword ? "match" : "mismatch"}`}>
                                  {secNewPassword === secConfirmPassword ? "✓ Match" : "✗ Mismatch"}
                                </span>
                              )}
                            </div>
                            <div className="btk-input-wrap">
                              <Lock size={16} className="btk-ico" />
                              <input
                                type={showSecConfirmPwd ? "text" : "password"}
                                className="btk-inp"
                                placeholder="Re-enter new password"
                                value={secConfirmPassword}
                                onChange={(e) => setSecConfirmPassword(e.target.value)}
                                required
                              />
                              <button
                                type="button"
                                className="btk-pwd-eye"
                                onClick={() => setShowSecConfirmPwd(!showSecConfirmPwd)}
                                aria-label={showSecConfirmPwd ? "Hide password" : "Show password"}
                              >
                                {showSecConfirmPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="btk-form-actions-split">
                          <button
                            type="button"
                            className="btk-link-action-btn"
                            onClick={() => {
                              setSecOtpStep(1);
                              setSecMode("standard");
                              setSecMsg({ type: "", text: "" });
                            }}
                          >
                            ← Back to standard change password
                          </button>

                          <button
                            type="submit"
                            className="btk-primary-btn"
                            disabled={secLoading}
                          >
                            <span>{secLoading ? "Verifying..." : "Verify OTP & Update Password"}</span>
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
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
                      <option value="Personal Emergency / Health">Personal Emergency / Health</option>
                      <option value="Adverse Weather / Rain">Adverse Weather / Rain</option>
                      <option value="Travel Schedule Change">Travel Schedule Change</option>
                      <option value="Booked by mistake">Booked by mistake</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="btk-input-group">
                    <label className="btk-lbl">Reason</label>
                    <input
                      type="text"
                      className="btk-inp-modal"
                      placeholder="Enter reason or additional details..."
                      value={refundReasonDetails}
                      onChange={(e) => setRefundReasonDetails(e.target.value)}
                    />
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

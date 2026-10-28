import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import "./Experience.css";

// ============================================
// SETTINGS (change these to match your business)
// ============================================

const BRAND_NAME = "Bhitarkanika Explore";
const CHILD_RATE = 0.5; // children pay 50% of the adult price (set 0 for free, 1 for full)
const TIME_SLOTS = [
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "04:00 PM",
];

// ============================================
// TOUR PACKAGE DATA
// ============================================

const tourData = [
  {
    id: 1,
    slug: "bhitarkanika-wildlife-tour",
    title: "Bhitarkanika Wildlife Adventure",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=85",
    duration: "3 DAYS / 2 NIGHTS",
    location: "KENDRAPARA, ODISHA",
    category: "WILDLIFE",
    route: "Mangrove Forest → River Safari → Wildlife Viewing",
    price: 4500,
    oldPrice: 5500,
  },
  {
    id: 2,
    slug: "bhitarkanika-boat-safari",
    title: "Bhitarkanika Boat Safari",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=85",
    duration: "1 DAY",
    location: "BHITARKANIKA, ODISHA",
    category: "BOAT SAFARI",
    route: "Scenic Waterways → Mangrove Creeks → Nature",
    price: 1800,
    oldPrice: 2200,
  },
  {
    id: 3,
    slug: "odisha-nature-tour",
    title: "Explore the Mangrove Forest",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=85",
    duration: "2 DAYS / 1 NIGHT",
    location: "ODISHA",
    category: "NATURE",
    route: "Forest Trails → Green Landscapes → Nature Walk",
    price: 3200,
    oldPrice: 4000,
  },
  {
    id: 4,
    slug: "bhitarkanika-birdwatching",
    title: "Birdwatching Experience",
    image:
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1000&q=85",
    duration: "1 DAY",
    location: "BHITARKANIKA, ODISHA",
    category: "BIRDWATCHING",
    route: "Birdwatching → Forest Exploration → Nature",
    price: 1500,
    oldPrice: 1900,
  },
  {
    id: 5,
    slug: "odisha-family-holiday",
    title: "Odisha Nature Getaway",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
    duration: "4 DAYS / 3 NIGHTS",
    location: "ODISHA",
    category: "FAMILY TOUR",
    route: "Nature → Scenic Landscapes → Local Exploration",
    price: 7500,
    oldPrice: 9000,
  },
  {
    id: 6,
    slug: "bhitarkanika-weekend-getaway",
    title: "Peaceful River Escape",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=85",
    duration: "2 DAYS / 1 NIGHT",
    location: "KENDRAPARA, ODISHA",
    category: "WEEKEND TOUR",
    route: "River Views → Nature Trails → Scenic Landscapes",
    price: 3500,
    oldPrice: 4200,
  },
];

// ============================================
// HOTEL DATA
// ============================================

const hotelData = [
  {
    id: 1,
    slug: "premium-nature-stay",
    title: "Premium Nature Resort",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85",
    location: "Bhitarkanika, Odisha",
    distance: "Nature getaway",
    rating: "4.5",
    breakfast: "BREAKFAST INCLUDED",
    amenities: ["Free Wi-Fi", "Restaurant", "Room Service"],
    roomType: "Deluxe Room",
    bed: "King Bed",
    cancellation: "Free Cancellation",
    price: 2500,
    oldPrice: 3200,
  },
  {
    id: 2,
    slug: "family-comfort-stay",
    title: "Family Comfort Stay",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=85",
    location: "Kendrapara, Odisha",
    distance: "Comfortable family accommodation",
    rating: "4.4",
    breakfast: "MEALS AVAILABLE",
    amenities: ["Restaurant", "Family Rooms", "Parking"],
    roomType: "Family Room",
    bed: "Double Bed",
    cancellation: "Flexible Policy",
    price: 3000,
    oldPrice: 3800,
  },
  {
    id: 3,
    slug: "nature-view-retreat",
    title: "Nature View Retreat",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=85",
    location: "Odisha",
    distance: "Relaxing holiday retreat",
    rating: "4.6",
    breakfast: "BREAKFAST INCLUDED",
    amenities: ["Restaurant", "Garden", "Room Service"],
    roomType: "Premium Room",
    bed: "King Bed",
    cancellation: "Free Cancellation",
    price: 3500,
    oldPrice: 4200,
  },
  {
    id: 4,
    slug: "eco-friendly-lodge",
    title: "Eco-Friendly Lodge",
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1000&q=85",
    location: "Near Bhitarkanika",
    distance: "Peaceful nature surroundings",
    rating: "4.3",
    breakfast: "MEALS AVAILABLE",
    amenities: ["Restaurant", "Parking", "Garden"],
    roomType: "Standard Room",
    bed: "Double Bed",
    cancellation: "Flexible Policy",
    price: 2000,
    oldPrice: 2600,
  },
  {
    id: 5,
    slug: "luxury-relaxation-stay",
    title: "Luxury Relaxation Stay",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=85",
    location: "Odisha",
    distance: "Premium holiday experience",
    rating: "4.7",
    breakfast: "BREAKFAST INCLUDED",
    amenities: ["Free Wi-Fi", "Restaurant", "Room Service"],
    roomType: "Luxury Room",
    bed: "King Bed",
    cancellation: "Free Cancellation",
    price: 4500,
    oldPrice: 5500,
  },
  {
    id: 6,
    slug: "peaceful-riverside-stay",
    title: "Peaceful Riverside Stay",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=85",
    location: "Kendrapara, Odisha",
    distance: "Relaxing getaway",
    rating: "4.4",
    breakfast: "MEALS AVAILABLE",
    amenities: ["Restaurant", "Parking", "Room Service"],
    roomType: "Deluxe Room",
    bed: "Queen Bed",
    cancellation: "Flexible Policy",
    price: 2800,
    oldPrice: 3500,
  },
];

// ============================================
// HELPERS
// ============================================

const formatPrice = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

const todayString = () => {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
};

const formatDate = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const maskAadhar = (value) =>
  value ? `XXXX XXXX ${value.slice(-4)}` : "Not provided";

const generateBookingId = () =>
  `BTK-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const INITIAL_FORM = {
  name: "",
  adults: 1,
  children: 0,
  date: "",
  time: "",
  phone: "",
  aadhar: "",
  email: "",
};

// ============================================
// BOOKING MODAL
// ============================================

const BookingModal = ({ tour, onClose }) => {
  const [step, setStep] = useState("form"); // "form" | "success"
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [booking, setBooking] = useState(null);
  const [closing, setClosing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const nameRef = useRef(null);

  // Smooth close
  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 260);
  };

  // Lock page scroll, close on Escape, focus first field
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);

    const focusTimer = setTimeout(() => nameRef.current?.focus(), 350);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      clearTimeout(focusTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const changeCount = (field, delta) => {
    const min = field === "adults" ? 1 : 0;
    const next = Math.min(20, Math.max(min, form[field] + delta));
    setField(field, next);
  };

  const handleDigits = (field, maxLength) => (e) => {
    setField(field, e.target.value.replace(/\D/g, "").slice(0, maxLength));
  };

  const totalAmount =
    form.adults * tour.price +
    Math.round(form.children * tour.price * CHILD_RATE);

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!form.date) next.date = "Please choose a date.";
    else if (form.date < todayString())
      next.date = "Date cannot be in the past.";
    if (!form.time) next.time = "Please choose a time.";
    if (!/^[6-9]\d{9}$/.test(form.phone))
      next.phone = "Enter a valid 10-digit mobile number.";
    if (form.aadhar && form.aadhar.length !== 12)
      next.aadhar = "Aadhar must be 12 digits (or leave it empty).";
    if (!EMAIL_REGEX.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      id: generateBookingId(),
      issuedOn: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      total: totalAmount,
    };

    // TODO: send `data` to your backend / email service here.
    setBooking(data);
    setStep("success");
  };

  // ------------------------------------------
  // PDF DOWNLOAD (uses jsPDF: npm install jspdf)
  // ------------------------------------------
  const handleDownload = async () => {
    if (!booking) return;
    setDownloading(true);

    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const W = 210;
      const green = [29, 53, 43];
      const gold = [173, 134, 61];
      const rs = (n) => `Rs. ${Number(n).toLocaleString("en-IN")}`;

      // Header band
      doc.setFillColor(...green);
      doc.rect(0, 0, W, 50, "F");
      doc.setFillColor(...gold);
      doc.rect(0, 50, W, 2.5, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("BOOKING CONFIRMATION", 14, 24);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      doc.text(BRAND_NAME, 14, 33);
      doc.setTextColor(...[225, 200, 140]);
      doc.text("Tour Package Reservation", 14, 40);

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(`Booking ID: ${booking.id}`, W - 14, 24, { align: "right" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`Issued on: ${booking.issuedOn}`, W - 14, 32, {
        align: "right",
      });

      // Tour block
      doc.setTextColor(...green);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(17);
      doc.text(tour.title, 14, 70);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(110, 118, 114);
      doc.text(
        `${tour.category}  |  ${tour.location}  |  ${tour.duration}`,
        14,
        77
      );

      doc.setDrawColor(225, 222, 212);
      doc.line(14, 83, W - 14, 83);

      // Details grid
      const drawField = (label, value, x, y) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(...gold);
        doc.text(label.toUpperCase(), x, y);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11.5);
        doc.setTextColor(30, 45, 39);
        doc.text(String(value), x, y + 6.5);
      };

      const col1 = 14;
      const col2 = 110;
      let y = 96;
      const rowGap = 20;

      drawField("Guest name", booking.name, col1, y);
      drawField("Phone number", `+91 ${booking.phone}`, col2, y);
      y += rowGap;
      drawField("Email address", booking.email, col1, y);
      drawField("Aadhar number", maskAadhar(booking.aadhar), col2, y);
      y += rowGap;
      drawField("Travel date", formatDate(booking.date), col1, y);
      drawField("Preferred time", booking.time, col2, y);
      y += rowGap;
      drawField("Adults", booking.adults, col1, y);
      drawField("Children", booking.children, col2, y);
      y += rowGap + 2;

      // Payment box
      doc.setFillColor(248, 246, 238);
      doc.setDrawColor(...gold);
      doc.roundedRect(14, y, W - 28, 36, 3, 3, "FD");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(90, 100, 95);
      doc.text(
        `Adults: ${booking.adults} x ${rs(tour.price)}`,
        20,
        y + 11
      );
      doc.text(
        `Children: ${booking.children} x ${rs(
          Math.round(tour.price * CHILD_RATE)
        )}`,
        20,
        y + 18
      );
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...gold);
      doc.text("ESTIMATED TOTAL", W - 20, y + 11, { align: "right" });
      doc.setFontSize(20);
      doc.setTextColor(...green);
      doc.text(rs(booking.total), W - 20, y + 25, { align: "right" });
      y += 48;

      // Notes
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...green);
      doc.text("Important Notes", 14, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(95, 105, 100);
      const notes = [
        "This is a booking request. Our team will contact you to confirm availability and payment.",
        "Please carry a valid photo ID during the tour.",
        "Timings may change depending on weather and tide conditions.",
      ];
      notes.forEach((n, i) => doc.text(`-  ${n}`, 14, y + 7 + i * 6));

      // Footer
      doc.setFillColor(...green);
      doc.rect(0, 280, W, 17, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.text(`Thank you for choosing ${BRAND_NAME}`, W / 2, 290, {
        align: "center",
      });

      doc.save(`Booking-${booking.id}.pdf`);
    } catch (err) {
      console.error("PDF error:", err);
      alert("Could not create the PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const fieldClass = (name) => (errors[name] ? "bk-field has-error" : "bk-field");

  return createPortal(
    <div
      className={`bk-backdrop ${closing ? "is-closing" : ""}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="bk-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bk-title"
      >
        {/* HEADER */}
        <div className="bk-header">
          <div>
            <span className="bk-kicker">
              {step === "form" ? "Reserve your trip" : "Booking received"}
            </span>
            <h2 id="bk-title">
              {step === "form" ? "Book Your Tour" : "Booking Confirmed"}
            </h2>
          </div>
          <button
            type="button"
            className="bk-close"
            onClick={handleClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {step === "form" ? (
          <form className="bk-body" onSubmit={handleSubmit} noValidate>
            {/* Selected tour */}
            <div className="bk-tour">
              <img src={tour.image} alt="" />
              <div>
                <h3>{tour.title}</h3>
                <p>
                  {tour.duration} · {tour.location}
                </p>
                <strong>
                  {formatPrice(tour.price)} <small>per adult</small>
                </strong>
              </div>
            </div>

            <div className="bk-grid">
              {/* Name */}
              <div className={`${fieldClass("name")} bk-span-2`}>
                <label htmlFor="bk-name">Full name</label>
                <input
                  id="bk-name"
                  ref={nameRef}
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  autoComplete="name"
                />
                {errors.name && <em>{errors.name}</em>}
              </div>

              {/* Adults */}
              <div className="bk-field">
                <label>Adults</label>
                <div className="bk-counter">
                  <button
                    type="button"
                    onClick={() => changeCount("adults", -1)}
                    disabled={form.adults <= 1}
                    aria-label="Decrease adults"
                  >
                    −
                  </button>
                  <span>{form.adults}</span>
                  <button
                    type="button"
                    onClick={() => changeCount("adults", 1)}
                    aria-label="Increase adults"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="bk-field">
                <label>Children</label>
                <div className="bk-counter">
                  <button
                    type="button"
                    onClick={() => changeCount("children", -1)}
                    disabled={form.children <= 0}
                    aria-label="Decrease children"
                  >
                    −
                  </button>
                  <span>{form.children}</span>
                  <button
                    type="button"
                    onClick={() => changeCount("children", 1)}
                    aria-label="Increase children"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Date */}
              <div className={fieldClass("date")}>
                <label htmlFor="bk-date">Choose date</label>
                <input
                  id="bk-date"
                  type="date"
                  min={todayString()}
                  value={form.date}
                  onChange={(e) => setField("date", e.target.value)}
                />
                {errors.date && <em>{errors.date}</em>}
              </div>

              {/* Time */}
              <div className={fieldClass("time")}>
                <label htmlFor="bk-time">Choose time</label>
                <select
                  id="bk-time"
                  value={form.time}
                  onChange={(e) => setField("time", e.target.value)}
                >
                  <option value="">Select a time</option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.time && <em>{errors.time}</em>}
              </div>

              {/* Phone */}
              <div className={fieldClass("phone")}>
                <label htmlFor="bk-phone">Phone number</label>
                <input
                  id="bk-phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={handleDigits("phone", 10)}
                  autoComplete="tel-national"
                />
                {errors.phone && <em>{errors.phone}</em>}
              </div>

              {/* Aadhar */}
              <div className={fieldClass("aadhar")}>
                <label htmlFor="bk-aadhar">
                  Aadhar number <span className="bk-optional">(optional)</span>
                </label>
                <input
                  id="bk-aadhar"
                  type="text"
                  inputMode="numeric"
                  placeholder="12-digit Aadhar number"
                  value={form.aadhar}
                  onChange={handleDigits("aadhar", 12)}
                />
                {errors.aadhar && <em>{errors.aadhar}</em>}
              </div>

              {/* Email */}
              <div className={`${fieldClass("email")} bk-span-2`}>
                <label htmlFor="bk-email">Email address</label>
                <input
                  id="bk-email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  autoComplete="email"
                />
                {errors.email && <em>{errors.email}</em>}
              </div>
            </div>

            {/* Total + actions */}
            <div className="bk-total">
              <div>
                <span>Estimated total</span>
                <strong>{formatPrice(totalAmount)}</strong>
              </div>
              <div className="bk-actions">
                <button
                  type="button"
                  className="bk-btn bk-btn-ghost"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button type="submit" className="bk-btn bk-btn-primary">
                  Continue <span>→</span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="bk-body bk-success">
            <div className="bk-success-top">
              <div className="bk-check" aria-hidden="true">
                <svg viewBox="0 0 52 52">
                  <circle cx="26" cy="26" r="24" />
                  <path d="M15 27l8 8 14-16" />
                </svg>
              </div>
              <h3>Submitted successfully</h3>
              <p>
                Thank you, {booking.name.split(" ")[0]}! Your details are saved
                in the booking slip below. Our team will contact you shortly.
              </p>
            </div>

            {/* DOCUMENT PREVIEW */}
            <div className="bk-doc">
              <div className="bk-doc-head">
                <div>
                  <small>{BRAND_NAME}</small>
                  <h4>Booking Slip</h4>
                </div>
                <div className="bk-doc-id">
                  <small>Booking ID</small>
                  <strong>{booking.id}</strong>
                </div>
              </div>

              <div className="bk-doc-tour">
                <h5>{tour.title}</h5>
                <p>
                  {tour.category} · {tour.location} · {tour.duration}
                </p>
              </div>

              <dl className="bk-doc-grid">
                <div>
                  <dt>Guest name</dt>
                  <dd>{booking.name}</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>+91 {booking.phone}</dd>
                </div>
                <div className="bk-doc-wide">
                  <dt>Email</dt>
                  <dd>{booking.email}</dd>
                </div>
                <div>
                  <dt>Travel date</dt>
                  <dd>{formatDate(booking.date)}</dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>{booking.time}</dd>
                </div>
                <div>
                  <dt>Adults</dt>
                  <dd>{booking.adults}</dd>
                </div>
                <div>
                  <dt>Children</dt>
                  <dd>{booking.children}</dd>
                </div>
                <div className="bk-doc-wide">
                  <dt>Aadhar</dt>
                  <dd>{maskAadhar(booking.aadhar)}</dd>
                </div>
              </dl>

              <div className="bk-doc-total">
                <span>Estimated total</span>
                <strong>{formatPrice(booking.total)}</strong>
              </div>
            </div>

            <div className="bk-actions bk-actions-end">
              <button
                type="button"
                className="bk-btn bk-btn-ghost"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                className="bk-btn bk-btn-primary"
                onClick={handleDownload}
                disabled={downloading}
              >
                {downloading ? "Preparing PDF..." : "Download PDF"}{" "}
                <span>↓</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

// ============================================
// EXPERIENCE COMPONENT
// ============================================

const Experience = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("tour");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookingTour, setBookingTour] = useState(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 650 : false
  );

  const displayedItems = activeTab === "tour" ? tourData : hotelData;

  // RESPONSIVE SCREEN DETECTION
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 650);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // CHANGE TABS
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  // MOBILE CAROUSEL
  const handlePrev = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0 ? displayedItems.length - 1 : previousIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex === displayedItems.length - 1 ? 0 : previousIndex + 1
    );
  };

  // BOOK TRIP -> OPEN POPUP
  const handleBookTrip = (item) => {
    setBookingTour(item);
  };

  const handleCheckAvailability = (item) => {
    navigate(`/hotel/${item.slug}`, {
      state: { hotel: item },
    });
  };

  // IMAGE FALLBACK
  const handleImageError = (event) => {
    event.currentTarget.style.display = "none";
  };

  return (
    <section className="exp-section">
      <div className="exp-container">
        {/* SECTION HEADER */}
        <div className="exp-header">
          <div className="exp-header-content">
            <span className="exp-eyebrow">BHITARKANIKA EXPLORE</span>

            <h1>
              Discover Bhitarakanika <span>Tour Packages</span>
            </h1>

            <p>
              Explore beautiful mangrove forests, experience unforgettable
              boat safaris, discover local wildlife, and find comfortable
              stays for your next Bhitarakanika adventure.
            </p>
          </div>

          {/* TOUR AND HOTEL TABS ONLY */}
          <div className="exp-tabs">
            <button
              type="button"
              className={activeTab === "tour" ? "exp-tab active" : "exp-tab"}
              onClick={() => handleTabChange("tour")}
              aria-pressed={activeTab === "tour"}
            >
              <span className="exp-tab-icon">✦</span>
              Tour Packages
            </button>

            <button
              type="button"
              className={activeTab === "hotel" ? "exp-tab active" : "exp-tab"}
              onClick={() => handleTabChange("hotel")}
              aria-pressed={activeTab === "hotel"}
            >
              <span className="exp-tab-icon">◆</span>
              Hotels
            </button>
          </div>
        </div>

        {/* TOUR / HOTEL CARDS */}
        <div className="exp-cards-grid">
          {displayedItems.map((item, index) => {
            // SHOW ONE CARD AT A TIME ON MOBILE
            if (isMobile && index !== currentIndex) {
              return null;
            }

            // TOUR CARD
            if (activeTab === "tour") {
              return (
                <article className="exp-tour-card" key={item.id}>
                  <div className="exp-card-image-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="exp-card-image"
                      loading="lazy"
                      onError={handleImageError}
                    />

                    <div className="exp-image-overlay" />

                    <span className="exp-duration">{item.duration}</span>

                    <span className="exp-location">
                      {item.category} • {item.location}
                    </span>

                    <div className="exp-image-shine" />
                  </div>

                  <div className="exp-card-content">
                    <h2>{item.title}</h2>

                    <div className="exp-route">
                      <span>⟶</span>
                      <span>{item.route}</span>
                    </div>

                    <div className="exp-card-footer">
                      <div className="exp-price-box">
                        <span className="exp-price-label">Starting From</span>

                        <div className="exp-price-row">
                          <strong>{formatPrice(item.price)}</strong>
                          <del>{formatPrice(item.oldPrice)}</del>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="exp-primary-btn"
                        onClick={() => handleBookTrip(item)}
                      >
                        Book Trip <span>→</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            }

            // HOTEL CARD
            return (
              <article className="exp-hotel-card" key={item.id}>
                <div className="exp-hotel-image-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="exp-hotel-image"
                    loading="lazy"
                    onError={handleImageError}
                  />

                  <div className="exp-image-overlay" />

                  <span className="exp-breakfast">{item.breakfast}</span>

                  <span className="exp-hotel-rating">★ {item.rating}</span>
                </div>

                <div className="exp-hotel-content">
                  <div className="exp-hotel-title-row">
                    <div>
                      <h2>{item.title}</h2>

                      <p className="exp-hotel-location">
                        <span>📍</span> {item.location}
                      </p>
                    </div>
                  </div>

                  <p className="exp-hotel-distance">{item.distance}</p>

                  <div className="exp-amenities">
                    {item.amenities.slice(0, 4).map((amenity) => (
                      <span key={amenity}>✓ {amenity}</span>
                    ))}
                  </div>

                  <div className="exp-room-info">
                    <div>
                      <small>ROOM</small>
                      <strong>{item.roomType}</strong>
                    </div>

                    <div>
                      <small>BED</small>
                      <strong>{item.bed}</strong>
                    </div>

                    <div>
                      <small>POLICY</small>
                      <strong>{item.cancellation}</strong>
                    </div>
                  </div>

                  <div className="exp-hotel-footer">
                    <div className="exp-price-box">
                      <span className="exp-price-label">Per Night</span>

                      <div className="exp-price-row">
                        <strong>{formatPrice(item.price)}</strong>
                        <del>{formatPrice(item.oldPrice)}</del>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="exp-primary-btn"
                      onClick={() => handleCheckAvailability(item)}
                    >
                      Check Availability <span>→</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* MOBILE SLIDER CONTROLS */}
        {isMobile && displayedItems.length > 1 && (
          <div className="exp-mobile-controls">
            <button type="button" onClick={handlePrev} aria-label="Previous item">
              ←
            </button>

            <div className="exp-dots">
              {displayedItems.map((item, index) => (
                <button
                  type="button"
                  key={item.id}
                  className={index === currentIndex ? "active" : ""}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to item ${index + 1}`}
                  aria-current={index === currentIndex ? "true" : undefined}
                />
              ))}
            </div>

            <button type="button" onClick={handleNext} aria-label="Next item">
              →
            </button>
          </div>
        )}
      </div>

      {/* BOOKING POPUP */}
      {bookingTour && (
        <BookingModal
          tour={bookingTour}
          onClose={() => setBookingTour(null)}
        />
      )}
    </section>
  );
};

export default Experience;
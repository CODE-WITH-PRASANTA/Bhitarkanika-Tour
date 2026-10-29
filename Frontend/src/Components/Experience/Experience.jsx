import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Experience.css";

// ============================================
// BOAT SERVICE IMAGES  (put your files in src/assets)
// If this component is not inside src/components, adjust the "../assets/" path.
// ============================================

import boatService1 from "../../assets/boat-service-1.png";
import boatService2 from "../../assets/boat-service-2.png";
import boatService3 from "../../assets/boat-service-3.png";

// ============================================
// SETTINGS
// ============================================

const BRAND_NAME = "Bhitarkanika Boat Service";
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
// BOAT SERVICE DATA  (3 cards)
// Standard prices are the ones you gave. Medium / Premium prices and the
// "perks" lines are placeholders - edit them to your real packages.
// ============================================

const boatData = [
  {
    id: 1,
    slug: "jaynagar-to-bhitarkanika",
    title: "Jaynagar Boat Package",
    tagline: "Glide through quiet mangrove creeks on a private boat ride.",
    image: boatService1,
    duration: "1 DAY",
    category: "BOAT RIDE",
    from: "Jaynagar",
    to: "Bhitarkanika",
    priceUnit: "per boat",
    startingFrom: 1000,
    oldStartingFrom: 1300,
    packages: [
      { key: "standard", name: "Standard", price: 4000, perks: "Private boat with life jackets included." },
      { key: "medium", name: "Medium", price: 5000, perks: "Standard + local guide and wildlife spotting." },
      { key: "premium", name: "Premium", price: 6500, perks: "Medium + snacks, water and priority boarding." },
    ],
  },
  {
    id: 2,
    slug: "khola-to-bhitarkanika",
    title: "Khola Boat Package",
    tagline: "Start from the Khola boating point and cruise into the wild.",
    image: boatService2,
    duration: "1 DAY",
    category: "BOAT RIDE",
    from: "Khola (Boating Point)",
    to: "Bhitarkanika",
    priceUnit: "per boat",
    startingFrom: 2000,
    oldStartingFrom: 2500,
    packages: [
      { key: "standard", name: "Standard", price: 3500, perks: "Private boat with life jackets included." },
      { key: "medium", name: "Medium", price: 4500, perks: "Standard + local guide and wildlife spotting." },
      { key: "premium", name: "Premium", price: 6000, perks: "Medium + snacks, water and priority boarding." },
    ],
  },
  {
    id: 3,
    slug: "bhitarkanika-photography-boat",
    title: "Photography Boat Package",
    tagline: "A full day on the water built around the best photo spots.",
    image: boatService3,
    duration: "FULL DAY",
    category: "PHOTOGRAPHY",
    from: "Khola / Jaynagar",
    to: "Bhitarkanika Photo Spots",
    priceUnit: "per day",
    startingFrom: 3000,
    oldStartingFrom: 3800,
    packages: [
      { key: "standard", name: "Standard", price: 10000, perks: "Full-day private boat for photography." },
      { key: "medium", name: "Medium", price: 12500, perks: "Standard + photo-friendly stops and a guide." },
      { key: "premium", name: "Premium", price: 15000, perks: "Medium + sunrise slot, snacks and a dedicated guide." },
    ],
  },
];

// ============================================
// HOTEL DATA  (3 nearest OYO stays - same images as before)
// Replace the titles / locations with the exact OYO properties you list.
// "totalRooms" is only used by the demo availability check.
// ============================================

const hotelData = [
  {
    id: 1,
    slug: "oyo-premium-nature-resort",
    title: "OYO Premium Nature Resort",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85",
    location: "Near Bhitarkanika, Odisha",
    distance: "Nearest OYO stay to the boating point",
    rating: "4.5",
    breakfast: "BREAKFAST INCLUDED",
    amenities: ["Free Wi-Fi", "Restaurant", "Room Service"],
    roomType: "Deluxe Room",
    bed: "King Bed",
    cancellation: "Free Cancellation",
    price: 2000,
    oldPrice: 2600,
    totalRooms: 6,
  },
  {
    id: 2,
    slug: "oyo-family-comfort-stay",
    title: "OYO Family Comfort Stay",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=85",
    location: "Rajnagar, Kendrapara",
    distance: "Comfortable family accommodation",
    rating: "4.4",
    breakfast: "MEALS AVAILABLE",
    amenities: ["Restaurant", "Family Rooms", "Parking"],
    roomType: "Family Room",
    bed: "Double Bed",
    cancellation: "Flexible Policy",
    price: 3000,
    oldPrice: 3800,
    totalRooms: 5,
  },
  {
    id: 3,
    slug: "oyo-nature-view-retreat",
    title: "OYO Nature View Retreat",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=85",
    location: "Kendrapara, Odisha",
    distance: "Relaxing holiday retreat",
    rating: "4.6",
    breakfast: "BREAKFAST INCLUDED",
    amenities: ["Restaurant", "Garden", "Room Service"],
    roomType: "Premium Room",
    bed: "King Bed",
    cancellation: "Free Cancellation",
    price: 4000,
    oldPrice: 5000,
    totalRooms: 4,
  },
];

// ============================================
// HELPERS
// ============================================

const formatPrice = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

const pad = (n) => String(n).padStart(2, "0");
const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseISO = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const todayString = () => toISO(new Date());
const addDays = (iso, n) => {
  const d = parseISO(iso);
  d.setDate(d.getDate() + n);
  return toISO(d);
};
const nightsBetween = (a, b) =>
  Math.round((parseISO(b) - parseISO(a)) / 86400000);

const formatDate = (iso) => {
  if (!iso) return "";
  return parseISO(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const maskAadhar = (value) =>
  value ? `XXXX XXXX ${value.slice(-4)}` : "Not provided";

const generateBookingId = (prefix = "BTK") =>
  `${prefix}-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ---- Demo availability engine ------------------------------------------
// There is no hotel backend yet, so availability is generated from the hotel
// and the date (same input always gives the same answer). When you have a real
// API, replace getAvailability() with a fetch() call.
const mix = (n) => {
  n ^= n >>> 16;
  n = Math.imul(n, 0x45d9f3b) >>> 0;
  n ^= n >>> 16;
  n = Math.imul(n, 0x45d9f3b) >>> 0;
  n ^= n >>> 16;
  return n >>> 0;
};

const hashString = (str) => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return mix(h >>> 0);
};

const roomsLeftOnNight = (hotel, iso) => {
  const v = hashString(`${hotel.id}|${iso}`) % 10;
  if (v === 0) return 0; // roughly 1 night in 10 is sold out
  return Math.min(hotel.totalRooms, (v % 5) + 1);
};

const getAvailability = (hotel, checkIn, nights, rooms) => {
  let left = Infinity;
  for (let i = 0; i < nights; i++) {
    left = Math.min(left, roomsLeftOnNight(hotel, addDays(checkIn, i)));
  }
  if (left === Infinity) left = 0;
  const status = left === 0 ? "soldout" : left >= rooms ? "available" : "limited";
  return { status, left };
};

const findNextAvailable = (hotel, checkIn, nights, rooms) => {
  for (let offset = 1; offset <= 45; offset++) {
    const start = addDays(checkIn, offset);
    if (getAvailability(hotel, start, nights, rooms).status === "available") {
      return start;
    }
  }
  return null;
};

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
// SHARED MODAL SHELL
// ============================================

const ModalShell = ({ kicker, title, onClose, children }) => {
  const [closing, setClosing] = useState(false);

  const close = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(onClose, 260);
  };

  const closeRef = useRef(close);
  closeRef.current = close;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") closeRef.current();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return createPortal(
    <div
      className={`bk-backdrop ${closing ? "is-closing" : ""}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="bk-modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="bk-header">
          <div>
            <span className="bk-kicker">{kicker}</span>
            <h2>{title}</h2>
          </div>
          <button type="button" className="bk-close" onClick={close} aria-label="Close">
            ×
          </button>
        </div>
        {children(close)}
      </div>
    </div>,
    document.body
  );
};

// ============================================
// BOAT BOOKING MODAL
// ============================================

const BookingModal = ({ tour, pkg, onClose }) => {
  const [step, setStep] = useState("form"); // "form" | "success"
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [booking, setBooking] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const nameRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => nameRef.current?.focus(), 350);
    return () => clearTimeout(t);
  }, []);

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const changeCount = (field, delta) => {
    const min = field === "adults" ? 1 : 0;
    setField(field, Math.min(20, Math.max(min, form[field] + delta)));
  };

  const handleDigits = (field, maxLength) => (e) => {
    setField(field, e.target.value.replace(/\D/g, "").slice(0, maxLength));
  };

  // Boat packages are priced per boat / per day, not per head.
  const totalAmount = pkg.price;

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!form.date) next.date = "Please choose a date.";
    else if (form.date < todayString()) next.date = "Date cannot be in the past.";
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
      id: generateBookingId("BTK"),
      issuedOn: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      total: totalAmount,
      tourTitle: tour.title,
      from: tour.from,
      to: tour.to,
      duration: tour.duration,
      category: tour.category,
      pkgName: pkg.name,
      priceUnit: tour.priceUnit,
    };

    // TODO: send `data` to your backend / email service here.
    setBooking(data);
    setStep("success");
  };

  // ------------------------------------------
  // PDF DOWNLOAD (jsPDF: npm install jspdf)
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
      doc.rect(0, 0, W, 52, "F");
      doc.setFillColor(...gold);
      doc.rect(0, 52, W, 3, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("BOOKING CONFIRMATION", 14, 22);

      doc.setFontSize(13);
      doc.text(BRAND_NAME, 14, 33);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      doc.setTextColor(225, 200, 140);
      doc.text("Boat Service Reservation", 14, 41);

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(`Booking ID: ${booking.id}`, W - 14, 22, { align: "right" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`Issued on: ${booking.issuedOn}`, W - 14, 30, { align: "right" });

      // Package block
      doc.setTextColor(...green);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(17);
      doc.text(booking.tourTitle, 14, 72);

      // Package pill
      const pillText = `${booking.pkgName.toUpperCase()} PACKAGE`;
      doc.setFontSize(8.5);
      const pillW = doc.getTextWidth(pillText) + 10;
      doc.setFillColor(...gold);
      doc.roundedRect(14, 77, pillW, 7, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.text(pillText, 19, 82);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(110, 118, 114);
      doc.text(
        `${booking.category}  |  ${booking.duration}`,
        14 + pillW + 5,
        82
      );

      // Route strip
      doc.setFillColor(...green);
      doc.roundedRect(14, 90, W - 28, 20, 3, 3, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(225, 200, 140);
      doc.text("FROM", 20, 97);
      doc.text("TO", W - 20, 97, { align: "right" });
      doc.setFontSize(11.5);
      doc.setTextColor(255, 255, 255);
      doc.text(booking.from, 20, 105);
      doc.text(booking.to, W - 20, 105, { align: "right" });
      doc.setDrawColor(225, 200, 140);
      doc.setLineDashPattern([1.2, 1.2], 0);
      doc.line(W / 2 - 14, 102, W / 2 + 14, 102);
      doc.setLineDashPattern([], 0);

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
      let y = 124;
      const rowGap = 19;

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
      y += rowGap + 1;

      // Payment box
      doc.setFillColor(248, 246, 238);
      doc.setDrawColor(...gold);
      doc.roundedRect(14, y, W - 28, 32, 3, 3, "FD");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(90, 100, 95);
      doc.text(`Package: ${booking.pkgName} (${booking.priceUnit})`, 20, y + 12);
      doc.text(
        `Guests: ${booking.adults} Adults, ${booking.children} Children`,
        20,
        y + 20
      );
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...gold);
      doc.text("ESTIMATED TOTAL", W - 20, y + 11, { align: "right" });
      doc.setFontSize(20);
      doc.setTextColor(...green);
      doc.text(rs(booking.total), W - 20, y + 24, { align: "right" });
      y += 44;

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
        "Please carry a valid photo ID during the boat ride.",
        "Timings may change depending on weather and tide conditions.",
      ];
      notes.forEach((n, i) => doc.text(`-  ${n}`, 14, y + 7 + i * 6));

      // Footer
      doc.setFillColor(...green);
      doc.rect(0, 280, W, 17, "F");
      doc.setFillColor(...gold);
      doc.rect(0, 280, W, 1.2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
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

  return (
    <ModalShell
      kicker={step === "form" ? "Reserve your boat" : "Booking received"}
      title={step === "form" ? "Book Your Boat Trip" : "Booking Confirmed"}
      onClose={onClose}
    >
      {(close) =>
        step === "form" ? (
          <form className="bk-body" onSubmit={handleSubmit} noValidate>
            <div className="bk-tour">
              <img src={tour.image} alt="" />
              <div>
                <h3>{tour.title}</h3>
                <p>
                  {pkg.name} package · {tour.duration}
                </p>
                <p className="bk-tour-route">
                  {tour.from} <b>→</b> {tour.to}
                </p>
                <strong>
                  {formatPrice(pkg.price)} <small>{tour.priceUnit}</small>
                </strong>
              </div>
            </div>

            <div className="bk-grid">
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

            <div className="bk-total">
              <div>
                <span>Estimated total</span>
                <strong>{formatPrice(totalAmount)}</strong>
              </div>
              <div className="bk-actions">
                <button type="button" className="bk-btn bk-btn-ghost" onClick={close}>
                  Cancel
                </button>
                <button type="submit" className="bk-btn bk-btn-primary">
                  Confirm Booking <span>→</span>
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
                <h5>{booking.tourTitle}</h5>
                <p>
                  {booking.pkgName} package · {booking.category} · {booking.duration}
                </p>
              </div>

              <div className="bk-doc-route">
                <div>
                  <small>From</small>
                  <strong>{booking.from}</strong>
                </div>
                <span aria-hidden="true">⟶</span>
                <div>
                  <small>To</small>
                  <strong>{booking.to}</strong>
                </div>
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
              <button type="button" className="bk-btn bk-btn-ghost" onClick={close}>
                Close
              </button>
              <button
                type="button"
                className="bk-btn bk-btn-primary"
                onClick={handleDownload}
                disabled={downloading}
              >
                {downloading ? "Preparing PDF..." : "Download PDF"} <span>↓</span>
              </button>
            </div>
          </div>
        )
      }
    </ModalShell>
  );
};

// ============================================
// HOTEL AVAILABILITY MODAL
// ============================================

const AvailabilityModal = ({ hotel, onClose }) => {
  const [step, setStep] = useState("check"); // "check" | "details" | "success"
  const [search, setSearch] = useState({
    checkIn: "",
    checkOut: "",
    rooms: 1,
    guests: 2,
  });
  const [errors, setErrors] = useState({});
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);
  const [guest, setGuest] = useState({ name: "", phone: "", email: "" });
  const [guestErrors, setGuestErrors] = useState({});
  const [reservation, setReservation] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const nights =
    search.checkIn && search.checkOut && search.checkOut > search.checkIn
      ? nightsBetween(search.checkIn, search.checkOut)
      : 0;

  const updateSearch = (field, value) => {
    setSearch((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "checkIn" && value && (!prev.checkOut || prev.checkOut <= value)) {
        next.checkOut = addDays(value, 1);
      }
      return next;
    });
    setErrors((prev) => ({ ...prev, [field]: "", checkOut: "" }));
    setResult(null);
  };

  const changeCount = (field, delta, min, max) => {
    updateSearch(field, Math.min(max, Math.max(min, search[field] + delta)));
  };

  const validateSearch = (s) => {
    const next = {};
    if (!s.checkIn) next.checkIn = "Please choose a check-in date.";
    else if (s.checkIn < todayString()) next.checkIn = "Check-in cannot be in the past.";
    if (!s.checkOut) next.checkOut = "Please choose a check-out date.";
    else if (s.checkIn && s.checkOut <= s.checkIn)
      next.checkOut = "Check-out must be after check-in.";
    else if (s.checkIn && nightsBetween(s.checkIn, s.checkOut) > 15)
      next.checkOut = "You can check up to 15 nights at a time.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const runCheck = (s) => {
    if (!validateSearch(s)) return;
    const n = nightsBetween(s.checkIn, s.checkOut);

    setChecking(true);
    setResult(null);
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const { status, left } = getAvailability(hotel, s.checkIn, n, s.rooms);
      const next =
        status === "available" ? null : findNextAvailable(hotel, s.checkIn, n, s.rooms);
      setResult({ status, left, next, nights: n, rooms: s.rooms });
      setChecking(false);
    }, 850);
  };

  const useNextDates = () => {
    const s = {
      ...search,
      checkIn: result.next,
      checkOut: addDays(result.next, result.nights),
    };
    setSearch(s);
    runCheck(s);
  };

  const useFewerRooms = () => {
    const s = { ...search, rooms: result.left };
    setSearch(s);
    runCheck(s);
  };

  const setGuestField = (field, value) => {
    setGuest((prev) => ({ ...prev, [field]: value }));
    if (guestErrors[field]) setGuestErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const submitGuest = (e) => {
    e.preventDefault();
    const next = {};
    if (guest.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[6-9]\d{9}$/.test(guest.phone))
      next.phone = "Enter a valid 10-digit mobile number.";
    if (!EMAIL_REGEX.test(guest.email.trim()))
      next.email = "Enter a valid email address.";
    setGuestErrors(next);
    if (Object.keys(next).length) return;

    const data = {
      id: generateBookingId("HTL"),
      ...search,
      nights: nightsBetween(search.checkIn, search.checkOut),
      name: guest.name.trim(),
      phone: guest.phone,
      email: guest.email.trim(),
    };
    data.total = hotel.price * data.nights * data.rooms;

    // TODO: send `data` to your backend / email service here.
    setReservation(data);
    setStep("success");
  };

  const total = result ? hotel.price * result.nights * result.rooms : 0;
  const roomWord = (n) => (n === 1 ? "room" : "rooms");

  const titles = {
    check: ["Check availability", "Find Your Room"],
    details: ["Almost done", "Your Details"],
    success: ["Request received", "Room Requested"],
  };

  return (
    <ModalShell kicker={titles[step][0]} title={titles[step][1]} onClose={onClose}>
      {(close) => (
        <>
          {step === "check" && (
            <div className="bk-body">
              <div className="bk-tour">
                <img src={hotel.image} alt="" />
                <div>
                  <h3>{hotel.title}</h3>
                  <p>
                    {hotel.location} · ★ {hotel.rating}
                  </p>
                  <strong>
                    {formatPrice(hotel.price)} <small>per night</small>
                  </strong>
                </div>
              </div>

              <div className="bk-grid bk-grid--plain">
                <div className={errors.checkIn ? "bk-field has-error" : "bk-field"}>
                  <label htmlFor="av-in">Check-in</label>
                  <input
                    id="av-in"
                    type="date"
                    min={todayString()}
                    value={search.checkIn}
                    onChange={(e) => updateSearch("checkIn", e.target.value)}
                  />
                  {errors.checkIn && <em>{errors.checkIn}</em>}
                </div>

                <div className={errors.checkOut ? "bk-field has-error" : "bk-field"}>
                  <label htmlFor="av-out">Check-out</label>
                  <input
                    id="av-out"
                    type="date"
                    min={search.checkIn ? addDays(search.checkIn, 1) : todayString()}
                    value={search.checkOut}
                    onChange={(e) => updateSearch("checkOut", e.target.value)}
                  />
                  {errors.checkOut && <em>{errors.checkOut}</em>}
                </div>

                <div className="bk-field">
                  <label>Rooms</label>
                  <div className="bk-counter">
                    <button
                      type="button"
                      onClick={() => changeCount("rooms", -1, 1, 4)}
                      disabled={search.rooms <= 1}
                      aria-label="Fewer rooms"
                    >
                      −
                    </button>
                    <span>{search.rooms}</span>
                    <button
                      type="button"
                      onClick={() => changeCount("rooms", 1, 1, 4)}
                      disabled={search.rooms >= 4}
                      aria-label="More rooms"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="bk-field">
                  <label>Guests</label>
                  <div className="bk-counter">
                    <button
                      type="button"
                      onClick={() => changeCount("guests", -1, 1, 12)}
                      disabled={search.guests <= 1}
                      aria-label="Fewer guests"
                    >
                      −
                    </button>
                    <span>{search.guests}</span>
                    <button
                      type="button"
                      onClick={() => changeCount("guests", 1, 1, 12)}
                      disabled={search.guests >= 12}
                      aria-label="More guests"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {checking && (
                <div className="av-result av-loading" role="status">
                  <span className="av-spinner" aria-hidden="true" />
                  <p>
                    Checking {nights} {nights === 1 ? "night" : "nights"} at{" "}
                    {hotel.title}…
                  </p>
                </div>
              )}

              {result && !checking && (
                <div className={`av-result av-${result.status}`} role="status">
                  <span className="av-icon" aria-hidden="true">
                    {result.status === "available" ? "✓" : "✕"}
                  </span>
                  <div>
                    {result.status === "available" && (
                      <>
                        <h4>Rooms available for your dates</h4>
                        <p>
                          {result.left} {roomWord(result.left)} left ·{" "}
                          {formatPrice(hotel.price)} × {result.nights}{" "}
                          {result.nights === 1 ? "night" : "nights"} × {result.rooms}{" "}
                          {roomWord(result.rooms)} ={" "}
                          <strong>{formatPrice(total)}</strong>
                        </p>
                      </>
                    )}

                    {result.status === "limited" && (
                      <>
                        <h4>
                          Only {result.left} {roomWord(result.left)} available
                        </h4>
                        <p>
                          You asked for {result.rooms} {roomWord(result.rooms)}, but
                          only {result.left} {roomWord(result.left)} are free on these
                          dates.
                        </p>
                        <button type="button" className="av-link" onClick={useFewerRooms}>
                          Check {result.left} {roomWord(result.left)} instead
                        </button>
                      </>
                    )}

                    {result.status === "soldout" && (
                      <>
                        <h4>Sold out for these dates</h4>
                        <p>No rooms are free at {hotel.title} on your selected dates.</p>
                      </>
                    )}

                    {result.status !== "available" && result.next && (
                      <button type="button" className="av-link" onClick={useNextDates}>
                        Try {formatDate(result.next)} –{" "}
                        {formatDate(addDays(result.next, result.nights))}
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="bk-total">
                <div>
                  <span>{result?.status === "available" ? "Total" : "Per night"}</span>
                  <strong>
                    {formatPrice(result?.status === "available" ? total : hotel.price)}
                  </strong>
                </div>
                <div className="bk-actions">
                  <button type="button" className="bk-btn bk-btn-ghost" onClick={close}>
                    Cancel
                  </button>
                  {result?.status === "available" && !checking ? (
                    <button
                      type="button"
                      className="bk-btn bk-btn-primary"
                      onClick={() => setStep("details")}
                    >
                      Request Booking <span>→</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bk-btn bk-btn-primary"
                      onClick={() => runCheck(search)}
                      disabled={checking}
                    >
                      {checking ? "Checking..." : "Check Availability"} <span>→</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === "details" && (
            <form className="bk-body" onSubmit={submitGuest} noValidate>
              <div className="bk-tour">
                <img src={hotel.image} alt="" />
                <div>
                  <h3>{hotel.title}</h3>
                  <p>
                    {formatDate(search.checkIn)} – {formatDate(search.checkOut)} ·{" "}
                    {nights} {nights === 1 ? "night" : "nights"}
                  </p>
                  <strong>
                    {formatPrice(total)}{" "}
                    <small>
                      for {search.rooms} {roomWord(search.rooms)}
                    </small>
                  </strong>
                </div>
              </div>

              <div className="bk-grid">
                <div className={`${guestErrors.name ? "bk-field has-error" : "bk-field"} bk-span-2`}>
                  <label htmlFor="av-name">Full name</label>
                  <input
                    id="av-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={guest.name}
                    onChange={(e) => setGuestField("name", e.target.value)}
                    autoComplete="name"
                  />
                  {guestErrors.name && <em>{guestErrors.name}</em>}
                </div>

                <div className={guestErrors.phone ? "bk-field has-error" : "bk-field"}>
                  <label htmlFor="av-phone">Phone number</label>
                  <input
                    id="av-phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="10-digit mobile number"
                    value={guest.phone}
                    onChange={(e) =>
                      setGuestField("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    autoComplete="tel-national"
                  />
                  {guestErrors.phone && <em>{guestErrors.phone}</em>}
                </div>

                <div className={guestErrors.email ? "bk-field has-error" : "bk-field"}>
                  <label htmlFor="av-email">Email address</label>
                  <input
                    id="av-email"
                    type="email"
                    placeholder="you@example.com"
                    value={guest.email}
                    onChange={(e) => setGuestField("email", e.target.value)}
                    autoComplete="email"
                  />
                  {guestErrors.email && <em>{guestErrors.email}</em>}
                </div>
              </div>

              <div className="bk-total">
                <div>
                  <span>Total</span>
                  <strong>{formatPrice(total)}</strong>
                </div>
                <div className="bk-actions">
                  <button
                    type="button"
                    className="bk-btn bk-btn-ghost"
                    onClick={() => setStep("check")}
                  >
                    Back
                  </button>
                  <button type="submit" className="bk-btn bk-btn-primary">
                    Send Request <span>→</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {step === "success" && reservation && (
            <div className="bk-body bk-success">
              <div className="bk-success-top">
                <div className="bk-check" aria-hidden="true">
                  <svg viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="24" />
                    <path d="M15 27l8 8 14-16" />
                  </svg>
                </div>
                <h3>Room request sent</h3>
                <p>
                  Thank you, {reservation.name.split(" ")[0]}! Our team will contact
                  you shortly to confirm your stay.
                </p>
              </div>

              <div className="bk-doc">
                <div className="bk-doc-head">
                  <div>
                    <small>{hotel.title}</small>
                    <h4>Stay Request</h4>
                  </div>
                  <div className="bk-doc-id">
                    <small>Request ID</small>
                    <strong>{reservation.id}</strong>
                  </div>
                </div>

                <dl className="bk-doc-grid">
                  <div>
                    <dt>Check-in</dt>
                    <dd>{formatDate(reservation.checkIn)}</dd>
                  </div>
                  <div>
                    <dt>Check-out</dt>
                    <dd>{formatDate(reservation.checkOut)}</dd>
                  </div>
                  <div>
                    <dt>Rooms</dt>
                    <dd>{reservation.rooms}</dd>
                  </div>
                  <div>
                    <dt>Guests</dt>
                    <dd>{reservation.guests}</dd>
                  </div>
                  <div>
                    <dt>Guest name</dt>
                    <dd>{reservation.name}</dd>
                  </div>
                  <div>
                    <dt>Phone</dt>
                    <dd>+91 {reservation.phone}</dd>
                  </div>
                  <div className="bk-doc-wide">
                    <dt>Email</dt>
                    <dd>{reservation.email}</dd>
                  </div>
                </dl>

                <div className="bk-doc-total">
                  <span>
                    {reservation.nights} {reservation.nights === 1 ? "night" : "nights"}{" "}
                    total
                  </span>
                  <strong>{formatPrice(reservation.total)}</strong>
                </div>
              </div>

              <div className="bk-actions bk-actions-end">
                <button type="button" className="bk-btn bk-btn-primary" onClick={close}>
                  Done
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </ModalShell>
  );
};

// ============================================
// EXPERIENCE COMPONENT
// ============================================

const Experience = () => {
  const [activeTab, setActiveTab] = useState("boat");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPkg, setSelectedPkg] = useState({}); // { [tourId]: packageKey }
  const [pkgHint, setPkgHint] = useState(null); // tour id that still needs a package
  const [bookingTour, setBookingTour] = useState(null); // { tour, pkg }
  const [checkHotel, setCheckHotel] = useState(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 650 : false
  );

  const displayedItems = activeTab === "boat" ? boatData : hotelData;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 650);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  const handlePrev = () =>
    setCurrentIndex((i) => (i === 0 ? displayedItems.length - 1 : i - 1));
  const handleNext = () =>
    setCurrentIndex((i) => (i === displayedItems.length - 1 ? 0 : i + 1));

  const handleSelectPackage = (tourId, key) => {
    setSelectedPkg((prev) => ({ ...prev, [tourId]: key }));
    if (pkgHint === tourId) setPkgHint(null);
  };

  const handleBookTrip = (tour) => {
    const pkg = tour.packages.find((p) => p.key === selectedPkg[tour.id]);
    if (!pkg) {
      setPkgHint(tour.id);
      return;
    }
    setBookingTour({ tour, pkg });
  };

  const handleImageError = (event) => {
    event.currentTarget.style.display = "none";
  };

  return (
    <section className="exp-section">
      <div className="exp-container">
        {/* SECTION HEADER */}
        <div className="exp-header">
          <div className="exp-header-content">
            <span className="exp-eyebrow">{BRAND_NAME}</span>

            <h1>
              Cruise the Mangroves of <span>Bhitarkanika</span>
            </h1>

            <p>
              Private boat rides from Jaynagar and Khola, full-day photography
              packages, and comfortable OYO stays close to the boating point.
            </p>
          </div>

          <div className="exp-tabs">
            <button
              type="button"
              className={activeTab === "boat" ? "exp-tab active" : "exp-tab"}
              onClick={() => handleTabChange("boat")}
              aria-pressed={activeTab === "boat"}
            >
              <span className="exp-tab-icon">✦</span>
              Boat Service
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

        {/* CARDS */}
        <div className="exp-cards-grid">
          {displayedItems.map((item, index) => {
            if (isMobile && index !== currentIndex) return null;

            // ---------- BOAT CARD ----------
            if (activeTab === "boat") {
              const chosen = item.packages.find((p) => p.key === selectedPkg[item.id]);
              const needsPkg = pkgHint === item.id;

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
                    <span className="exp-location">{item.category}</span>
                    <span className="exp-brand-badge">
                      <i aria-hidden="true" />
                      {BRAND_NAME}
                    </span>
                    <div className="exp-image-shine" />
                  </div>

                  <div className="exp-card-content">
                    <h2>{item.title}</h2>
                    <p className="exp-tagline">{item.tagline}</p>

                    {/* PACKAGE SELECT */}
                    <div className="exp-pkg">
                      <span className="exp-pkg-label">Select package</span>
                      <div
                        className="exp-pkg-options"
                        role="radiogroup"
                        aria-label={`Package for ${item.title}`}
                      >
                        {item.packages.map((p) => (
                          <button
                            type="button"
                            role="radio"
                            aria-checked={chosen?.key === p.key}
                            key={p.key}
                            className={
                              chosen?.key === p.key
                                ? "exp-pkg-pill active"
                                : "exp-pkg-pill"
                            }
                            onClick={() => handleSelectPackage(item.id, p.key)}
                          >
                            {p.name}
                          </button>
                        ))}
                      </div>
                      <p className={needsPkg ? "exp-pkg-perks is-warning" : "exp-pkg-perks"}>
                        {chosen
                          ? chosen.perks
                          : needsPkg
                          ? "Please select a package to continue."
                          : "Pick a package to see the price."}
                      </p>
                    </div>

                    {/* FROM → TO */}
                    <div className="exp-route-card">
                      <div className="exp-route-point">
                        <small>FROM</small>
                        <strong>{item.from}</strong>
                      </div>
                      <div className="exp-route-line" aria-hidden="true">
                        <span className="exp-route-boat">🚤</span>
                      </div>
                      <div className="exp-route-point exp-route-point-end">
                        <small>TO</small>
                        <strong>{item.to}</strong>
                      </div>
                    </div>

                    <div className="exp-card-footer">
                      <div className="exp-price-box">
                        <span className="exp-price-label">
                          {chosen ? `${chosen.name} package` : "Starting from"}
                        </span>
                        <div className="exp-price-row" key={chosen ? chosen.key : "start"}>
                          <strong>
                            {formatPrice(chosen ? chosen.price : item.startingFrom)}
                          </strong>
                          {chosen ? (
                            <small>{item.priceUnit}</small>
                          ) : (
                            <del>{formatPrice(item.oldStartingFrom)}</del>
                          )}
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

            // ---------- HOTEL CARD ----------
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
                  <span className="exp-oyo-tag">OYO · NEAREST STAY</span>

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
                      <span className="exp-price-label">Starting from / night</span>
                      <div className="exp-price-row">
                        <strong>{formatPrice(item.price)}</strong>
                        <del>{formatPrice(item.oldPrice)}</del>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="exp-primary-btn"
                      onClick={() => setCheckHotel(item)}
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

      {bookingTour && (
        <BookingModal
          tour={bookingTour.tour}
          pkg={bookingTour.pkg}
          onClose={() => setBookingTour(null)}
        />
      )}

      {checkHotel && (
        <AvailabilityModal hotel={checkHotel} onClose={() => setCheckHotel(null)} />
      )}
    </section>
  );
};

export default Experience;
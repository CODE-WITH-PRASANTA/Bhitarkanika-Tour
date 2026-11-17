import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Experience.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// ============================================
// BOAT SERVICE IMAGES  (put your files in src/assets)
// If this component is not inside src/components, adjust the "../assets/" path.
// ============================================

import boatService1 from "../../assets/boat-service-1.png";
import boatService2 from "../../assets/boat-service-2.png";
import boatService3 from "../../assets/boat-service-3.png";
import kholaRouteMap from "../../assets/khola-route-map.jpg";
import jaynagarRouteMap from "../../assets/jaynagar-route-map.jpg";
import siteLogo from "../../assets/mlogo.png";

// ============================================
// SETTINGS
// ============================================

const BRAND_NAME = "Bhitarkanika Boat Service";

const MAX_PEOPLE = 18;
const BOAT_TAX = 50; // govt tax per boat (Rs.)
const TAX_UP_TO_9 = 40; // govt tax per person when 9 or fewer people (Rs.)
const TAX_10_PLUS = 25; // govt tax per person when more than 9 people (Rs.)

// Time slots are chosen inside the booking popup (not shown on the card front).
const SLOT_OPTIONS = [
  {
    key: "07:00-10:30",
    name: "7:00 AM",
    start: "7:00 AM",
    end: "10:30 AM",
    label: "7:00 AM – 10:30 AM (End)",
  },
  {
    key: "07:30-11:00",
    name: "7:30 AM",
    start: "7:30 AM",
    end: "11:00 AM",
    label: "7:30 AM – 11:00 AM (End)",
  },
  {
    key: "08:00-11:30",
    name: "8:00 AM",
    start: "8:00 AM",
    end: "11:30 AM",
    label: "8:00 AM – 11:30 AM (End)",
  },
];
const FULL_DAY_SLOT = {
  key: "fullday",
  name: "Full Day",
  start: "7:00 AM",
  end: "5:00 PM",
  label: "Full Day · 7:00 AM – 5:00 PM",
  icon: "⏱️",
};
const ALL_SLOTS = [...SLOT_OPTIONS, FULL_DAY_SLOT];

const slotText = (s) => (s ? s.label || `${s.start} – ${s.end}` : "");
const slotPdf = (s) => (s ? `${s.start} to ${s.end}${s.key === "fullday" ? ` (${s.name})` : ""}` : "");

// ============================================
// BOAT SERVICE DATA  (3 cards)
// Card 1 and 2: fixed fare, no packages, route map, govt taxes added.
// Card 3: full-day photography boat with packages (Standard = Rs. 8000).
// Medium / Premium prices, "tag" and "features" are placeholders - edit to your real packages.
// ============================================

const boatData = [
  {
    id: 1,
    slug: "khola-to-bhitarkanika",
    eyebrow: "Start from Khola",
    title: "Bhitarkanika Boat Package",
    tagline: "Direct departure from the Khola boating point into the core mangrove creeks and sanctuary.",
    image: kholaRouteMap,
    boatPhoto: boatService2,
    duration: "1 DAY",
    category: "BOAT RIDE",
    from: "Khola (Boating Point)",
    to: "Bhitarkanika",
    priceUnit: "per boat",
    fare: 3500,
    govtTax: true,
    fullDay: false,
    packages: null,
    highlights: [
      "Khola Gate Departure",
      "Official Forest Permit",
      "Certified Life Jackets",
      "Licensed River Guide",
    ],
    map: {
      fromLabel: "Khola",
      toLabel: "Bhitarkanika",
      origin: "Khola Boating Point, Kendrapara, Odisha",
      destination: "Bhitarkanika National Park, Odisha",
      image: kholaRouteMap,
    },
  },
  {
    id: 2,
    slug: "jaynagar-to-bhitarkanika",
    eyebrow: "Start from Jaynagar",
    title: "Bhitarkanika Boat Package",
    tagline: "Glide through quiet, scenic tidal mangrove creeks on a Boat ride from Jaynagar.",
    image: jaynagarRouteMap,
    boatPhoto: boatService1,
    duration: "1 DAY",
    category: "BOAT RIDE",
    from: "Jaynagar",
    to: "Bhitarkanika",
    priceUnit: "per boat",
    fare: 4000,
    govtTax: true,
    fullDay: false,
    packages: null,
    highlights: [
      "Jaynagar Gate Departure",
      "Official Forest Permit",
      "Certified Life Jackets",
      "Scenic Creek Safari",
    ],
    map: {
      fromLabel: "Jaynagar",
      toLabel: "Bhitarkanika",
      origin: "Jaynagar, Kendrapara, Odisha",
      destination: "Bhitarkanika National Park, Odisha",
      image: jaynagarRouteMap,
    },
  },
  {
    id: 3,
    slug: "bhitarkanika-photographer-full-day-boat",
    eyebrow: "Khola / Jaynagar",
    title: "Photographer Full Day Boat Booking",
    tagline: "A full day on the water built around the best photo spots.",
    image: boatService3,
    duration: "FULL DAY",
    category: "PHOTOGRAPHY",
    from: "Khola / Jaynagar",
    to: "Bhitarkanika Photo Spots",
    priceUnit: "per day",
    startingFrom: 8000,
    govtTax: false,
    fullDay: true,
    fare: null,
    map: null,
    packages: [
      {
        key: "standard",
        name: "Standard",
        price: 8000,
        icon: "🚤",
        tag: "",
        perks: "Full-day Boat for photography.",
        features: [
          "Full-day Boat for photography",
          "On the water 7:00 AM – 5:00 PM",
          "Start from Khola or Jaynagar",
        ],
      },
      {
        key: "medium",
        name: "Medium",
        price: 12500,
        icon: "📷",
        tag: "Most Popular",
        perks: "Standard + photo-friendly stops and a guide.",
        features: [
          "Everything in Standard",
          "Photo-friendly stops on the route",
          "Local guide included",
        ],
      },
      {
        key: "premium",
        name: "Premium",
        price: 15000,
        icon: "🌅",
        tag: "Best Value",
        perks: "Medium + sunrise slot, snacks and a dedicated guide.",
        features: [
          "Everything in Medium",
          "Golden sunrise photo slot",
          "Snacks & refreshments on board",
          "Dedicated guide all day",
        ],
      },
    ],
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

const personWord = (n) => (n === 1 ? "person" : "people");

// Govt tax rule: 9 people or fewer = Rs. 40 each, more than 9 = Rs. 25 each.
const taxPerPerson = (people) => (people > 9 ? TAX_10_PLUS : TAX_UP_TO_9);

const calcBill = (tour, pkg, people, boats = 1) => {
  const safeBoats = Math.max(1, parseInt(boats, 10) || 1);
  const baseFare = pkg ? pkg.price : tour.fare;
  const fare = baseFare * safeBoats;
  const perPerson = tour.govtTax ? taxPerPerson(people) : 0;
  const personTax = perPerson * people;
  const boatTax = tour.govtTax ? BOAT_TAX * safeBoats : 0;
  return {
    baseFare,
    boats: safeBoats,
    fare,
    perPerson,
    personTax,
    boatTax,
    total: fare + personTax + boatTax,
  };
};

const INITIAL_FORM = {
  name: "",
  boats: 1,
  people: 1,
  date: "",
  time: "",
  phone: "",
  aadhar: "",
  email: "",
  address: "",
};

// ============================================
// SHARED MODAL SHELL
// ============================================

const ModalShell = ({ kicker, title, onClose, children, className = "" }) => {
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
      <div className={`bk-modal ${className}`} role="dialog" aria-modal="true" aria-label={title}>
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
// ROUTE MAP  (card preview + popup with directions)
// ============================================

const RouteMapPreview = ({ map, onOpen }) => (
  <button
    type="button"
    className="exp-map"
    onClick={onOpen}
    aria-label={`View route map from ${map.fromLabel} to ${map.toLabel}`}
  >
    {map.image ? (
      <img
        src={map.image}
        alt={`Route Map from ${map.fromLabel} to ${map.toLabel}`}
        className="exp-map-img"
      />
    ) : (
      <svg viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={`mapBg-${map.fromLabel}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#eef3ea" />
            <stop offset="1" stopColor="#dbe6d6" />
          </linearGradient>
        </defs>
        <rect width="320" height="150" fill={`url(#mapBg-${map.fromLabel})`} />
        {/* faint street grid */}
        <g stroke="rgba(29,53,43,0.07)" strokeWidth="1">
          <path d="M0 30H320M0 75H320M0 120H320" />
          <path d="M60 0V150M130 0V150M200 0V150M270 0V150" />
        </g>
        {/* mangrove patches */}
        <g fill="rgba(47,125,87,0.2)">
          <ellipse cx="95" cy="40" rx="42" ry="17" />
          <ellipse cx="225" cy="112" rx="50" ry="19" />
          <ellipse cx="290" cy="22" rx="28" ry="12" />
        </g>
        {/* river */}
        <path
          d="M-10 118 C 55 96, 95 138, 165 112 S 275 76, 335 96 L335 160 L-10 160 Z"
          fill="rgba(112,168,190,0.38)"
        />
        {/* route */}
        <path
          d="M52 100 C 100 36, 175 132, 268 48"
          fill="none"
          stroke="#ad863d"
          strokeWidth="3.2"
          strokeLinecap="round"
          className="exp-map-route"
        />
        {/* pins */}
        <circle cx="52" cy="100" r="9" fill="#fff" />
        <circle cx="52" cy="100" r="6" fill="#1d352b" />
        <circle cx="268" cy="48" r="9" fill="#fff" />
        <circle cx="268" cy="48" r="6" fill="#ad863d" />
        <text x="40" y="124" fontSize="11" fontWeight="800" fill="#1d352b">
          {map.fromLabel}
        </text>
        <text x="268" y="32" fontSize="11" fontWeight="800" fill="#1d352b" textAnchor="end">
          {map.toLabel}
        </text>
      </svg>
    )}
    <span className="exp-map-cta">
      View route map <b aria-hidden="true">→</b>
    </span>
  </button>
);

const MapModal = ({ tour, onClose }) => {
  const { origin, destination, fromLabel, toLabel, image } = tour.map;
  const [activeTab, setActiveTab] = useState(image ? "infographic" : "google");
  const embedUrl = `https://maps.google.com/maps?saddr=${encodeURIComponent(
    origin
  )}&daddr=${encodeURIComponent(destination)}&output=embed`;
  const openUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    origin
  )}&destination=${encodeURIComponent(destination)}&travelmode=driving`;

  return (
    <ModalShell kicker="Route map" title={`${fromLabel} → ${toLabel}`} onClose={onClose}>
      {(close) => (
        <div className="bk-body">
          {image && (
            <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
              <button
                type="button"
                className={`bk-btn ${activeTab === "infographic" ? "bk-btn-primary" : "bk-btn-ghost"}`}
                onClick={() => setActiveTab("infographic")}
                style={{ fontSize: "12px", padding: "6px 14px" }}
              >
                🗺️ Route Map Graphic
              </button>
              <button
                type="button"
                className={`bk-btn ${activeTab === "google" ? "bk-btn-primary" : "bk-btn-ghost"}`}
                onClick={() => setActiveTab("google")}
                style={{ fontSize: "12px", padding: "6px 14px" }}
              >
                📍 Live Google Map
              </button>
            </div>
          )}

          {activeTab === "infographic" && image ? (
            <div className="bk-map-wrap" style={{ height: "auto", maxHeight: "400px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f7f4" }}>
              <img
                src={image}
                alt={`Route from ${fromLabel} to ${toLabel}`}
                style={{ width: "100%", maxHeight: "390px", objectFit: "contain", borderRadius: "10px" }}
              />
            </div>
          ) : (
            <div className="bk-map-wrap">
              <iframe
                title={`Route from ${fromLabel} to ${toLabel}`}
                src={embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          )}

          <p className="bk-note">
            The map shows the road route to reach the {fromLabel} boating point. The boat
            ride into Bhitarkanika continues by water from there.
          </p>
          <div className="bk-actions bk-actions-end">
            <button type="button" className="bk-btn bk-btn-ghost" onClick={close}>
              Close
            </button>
            <a
              className="bk-btn bk-btn-primary"
              href={openUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps <span>↗</span>
            </a>
          </div>
        </div>
      )}
    </ModalShell>
  );
};

// ============================================
// CUSTOM LUXURY SLOT SELECTOR
// ============================================

const CustomSlotSelect = ({ value, onChange, options, hasError }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selected = options.find((o) => o.key === value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`bk-custom-select ${isOpen ? "is-open" : ""} ${hasError ? "has-error" : ""}`}
    >
      <button
        type="button"
        id="bk-time"
        className="bk-custom-select-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="bk-icon-lead">⏰</span>
        <span className={`bk-custom-select-label ${!selected ? "is-placeholder" : ""}`}>
          {selected ? (
            <span className="bk-slot-display">
              <strong className="bk-slot-title">{selected.label || `${selected.start} – ${selected.end}`}</strong>
            </span>
          ) : (
            "Select departure slot"
          )}
        </span>
        <span className="bk-select-chevron" aria-hidden="true">
          ▾
        </span>
      </button>

      {isOpen && (
        <div className="bk-custom-select-menu" role="listbox">
          {options.map((s) => {
            const isSelected = s.key === value;
            return (
              <div
                key={s.key}
                role="option"
                aria-selected={isSelected}
                tabIndex={0}
                className={`bk-custom-select-option ${isSelected ? "is-selected" : ""}`}
                onClick={() => {
                  onChange(s.key);
                  setIsOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onChange(s.key);
                    setIsOpen(false);
                  }
                }}
              >
                <div className="bk-opt-info">
                  <strong>{s.label || `${s.start} – ${s.end}`}</strong>
                  <small>3.5 hrs safari · Return by {s.end}</small>
                </div>
                {isSelected && <span className="bk-opt-check">✓</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Helper to dynamically load Razorpay checkout script
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

// ============================================
// BOAT BOOKING MODAL
// ============================================

const BookingModal = ({ tour, pkg, onClose }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, token } = useAuth();

  const [step, setStep] = useState("form"); // "form" | "success"
  const [form, setForm] = useState({
    ...INITIAL_FORM,
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    time: tour.fullDay ? FULL_DAY_SLOT.key : "",
  });
  const [errors, setErrors] = useState({});
  const [booking, setBooking] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const nameRef = useRef(null);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    const t = setTimeout(() => nameRef.current?.focus(), 350);
    return () => clearTimeout(t);
  }, []);

  const boatCount = Math.max(1, parseInt(form.boats, 10) || 1);
  const maxCapacity = boatCount * 18;
  const peopleNum = Math.max(0, parseInt(form.people, 10) || 0);
  const bill = calcBill(tour, pkg, peopleNum, boatCount);
  const fareLabel = pkg ? `${pkg.name} package fare` : "Boat fare";
  const selectedSlot = ALL_SLOTS.find((s) => s.key === form.time);

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const changeBoats = (delta) => {
    const nextBoats = Math.min(10, Math.max(1, boatCount + delta));
    setForm((prev) => ({
      ...prev,
      boats: nextBoats,
    }));
    if (errors.boats) setErrors((prev) => ({ ...prev, boats: "" }));
  };

  const changePeople = (delta) => {
    const nextPeople = Math.max(1, peopleNum + delta);
    const neededBoats = Math.max(boatCount, Math.ceil(nextPeople / 18));
    setForm((prev) => ({
      ...prev,
      people: nextPeople,
      boats: neededBoats,
    }));
    if (errors.people) setErrors((prev) => ({ ...prev, people: "" }));
  };

  const handlePeopleInput = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 3);
    const nextVal = digits === "" ? "" : parseInt(digits, 10);
    const neededBoats = nextVal ? Math.max(boatCount, Math.ceil(nextVal / 18)) : boatCount;
    setForm((prev) => ({
      ...prev,
      people: nextVal,
      boats: neededBoats,
    }));
  };

  const handlePeopleBlur = () => {
    if (!peopleNum) setField("people", 1);
  };

  const handleDigits = (field, maxLength) => (e) => {
    setField(field, e.target.value.replace(/\D/g, "").slice(0, maxLength));
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (peopleNum < 1 || peopleNum > maxCapacity)
      next.people = `Enter 1 to ${maxCapacity} people for ${boatCount} ${boatCount > 1 ? "boats" : "boat"}.`;
    if (!form.date) next.date = "Please choose a date.";
    else if (form.date < todayString()) next.date = "Date cannot be in the past.";
    if (!form.time) next.time = "Please choose a time slot.";
    if (!/^[6-9]\d{9}$/.test(form.phone))
      next.phone = "Enter a valid 10-digit mobile number.";
    if (form.aadhar) {
      const isAadhar = /^\d{12}$/.test(form.aadhar);
      const isPassport = /^[A-Z0-9]{6,16}$/i.test(form.aadhar);
      if (!isAadhar && !isPassport) {
        next.aadhar = "Enter valid 12-digit Aadhaar or Passport number (or leave empty).";
      }
    }
    if (!EMAIL_REGEX.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    if (!form.address || form.address.trim().length < 2)
      next.address = "Please enter your home address or city.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setPayError("");

    const data = {
      id: generateBookingId("BTK"),
      issuedOn: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      ...form,
      boats: boatCount,
      people: peopleNum,
      name: form.name.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      bill,
      govtTax: tour.govtTax,
      fareLabel,
      timeLabel: slotText(selectedSlot),
      timePdf: slotPdf(selectedSlot),
      total: bill.total,
      tourTitle: tour.title,
      from: tour.from,
      to: tour.to,
      duration: tour.duration,
      category: tour.category,
      pkgName: pkg ? pkg.name : null,
      priceUnit: tour.priceUnit,
    };

    const bookingPayload = {
      bookingId: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      packageName: data.tourTitle || "Bhitarkanika Boat Package",
      packageType: `${data.from ? data.from + " to " + data.to : "Boat Safari"} · ${data.duration || "1 DAY"}`,
      image: tour.image || "",
      travelDate: data.date,
      date: data.date,
      departureSlot: data.timeLabel,
      time: data.timeLabel,
      boats: data.boats || 1,
      boatCount: data.boats || 1,
      guests: data.people,
      adults: data.people,
      children: 0,
      aadhar: data.aadhar || "",
      aadhaar: data.aadhar || "",
      homeTown: data.address || "",
      address: data.address || "",
      from: data.from || "",
      to: data.to || "",
      duration: data.duration || "",
      amount: data.total || 0,
      totalAmount: data.total || 0,
      boatFare: data.bill?.fare || 0,
      forestPermit: data.bill?.personTax || 0,
      govtTax: data.bill?.boatTax || 0,
      status: "Confirmed",
      paymentStatus: "Paid",
      paymentMethod: "Razorpay / UPI",
    };

    // Preserve booking details in session storage
    try {
      sessionStorage.setItem("pending_booking", JSON.stringify(bookingPayload));
    } catch (err) {
      console.warn("Could not save to sessionStorage", err);
    }

    try {
      setIsPaying(true);

      // 1. Ensure Razorpay Checkout script is loaded
      await loadRazorpayScript();

      // 2. Create Razorpay order from Backend with server-side price validation
      const orderRes = await fetch(`${API_BASE}/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify({
          amount: data.total,
          receipt: data.id,
          bookingDetails: {
            people: data.people,
            boats: data.boats || 1,
            boatCount: data.boats || 1,
            baseFare: data.bill?.baseFare,
            farePerBoat: data.bill?.baseFare,
            pkgKey: data.pkgKey,
            pkgName: data.pkgName,
            packageName: data.tourTitle,
            category: data.category,
            from: data.from,
          },
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        setPayError(orderData.message || "Failed to initialize payment order.");
        setIsPaying(false);
        return;
      }

      // 3. If in dev mode test order, verify seamlessly
      if (orderData.isDevMode || orderData.order?.isMock || !window.Razorpay) {
        try {
          const verifyRes = await fetch(`${API_BASE}/payment/verify-payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            credentials: "include",
            body: JSON.stringify({
              razorpay_order_id: orderData.order.id,
              razorpay_payment_id: `pay_test_${Date.now().toString().slice(-8)}`,
              razorpay_signature: "dev_test_signature",
              bookingData: {
                ...bookingPayload,
                amount: data.total,
                totalAmount: data.total,
                boatFare: data.bill?.fare,
                forestPermit: data.bill?.personTax,
                govtTax: data.bill?.boatTax,
                status: "Confirmed",
                paymentStatus: "Paid",
                paymentMethod: "Razorpay / UPI (Test)",
              },
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            setBooking({
              ...data,
              paymentId: verifyData.paymentId || `pay_test_${Date.now()}`,
              orderId: orderData.order.id,
              paymentStatus: "Paid",
              status: "Confirmed",
            });
            setStep("success");
          } else {
            setPayError(verifyData.message || "Payment verification failed.");
          }
        } catch (verifyErr) {
          console.error("Verification error:", verifyErr);
          setPayError("Server error verifying payment. Please try again.");
        } finally {
          setIsPaying(false);
        }
        return;
      }

      // 4. Configure Razorpay checkout options
      const options = {
        key: orderData.keyId || "rzp_test_TppGgVggUkbJv4",
        amount: orderData.order.amount,
        currency: orderData.order.currency || "INR",
        name: "Bhitarkanika Boat Service",
        description: `${data.tourTitle} Safari Reservation`,
        image: "https://bhitarkanikatour.in/logo.png",
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            // Verify payment cryptographic signature & store confirmed booking in MongoDB
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
                  ...bookingPayload,
                  amount: data.total,
                  totalAmount: data.total,
                  boatFare: data.bill?.fare,
                  forestPermit: data.bill?.personTax,
                  govtTax: data.bill?.boatTax,
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                  signature: response.razorpay_signature,
                  status: "Confirmed",
                  paymentStatus: "Paid",
                  paymentMethod: "Razorpay / UPI",
                },
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setBooking({
                ...data,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                paymentStatus: "Paid",
                status: "Confirmed",
              });
              setStep("success");
            } else {
              setPayError(verifyData.message || "Payment verification failed.");
            }
          } catch (verifyErr) {
            console.error("Verification error:", verifyErr);
            setPayError("Server error verifying your payment. Please contact support.");
          } finally {
            setIsPaying(false);
          }
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        notes: {
          bookingId: data.id,
          tourTitle: data.tourTitle,
          departureSlot: data.timeLabel,
        },
        theme: {
          color: "#1d352b",
        },
        modal: {
          ondismiss: function () {
            setIsPaying(false);
            setPayError("Payment was cancelled before completion. No amount was charged.");
          },
        },
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on("payment.failed", async function (failRes) {
        const errorDesc =
          failRes.error?.description ||
          failRes.error?.reason ||
          "Payment transaction was declined or failed.";
        setPayError(`Payment Failed: ${errorDesc} (Code: ${failRes.error?.code || "PAYMENT_FAILED"})`);
        setIsPaying(false);

        // Record failure in backend audit log
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
              bookingData: bookingPayload,
            }),
          });
        } catch (logErr) {
          console.warn("Failed to record payment failure:", logErr);
        }
      });
      rzpInstance.open();
    } catch (err) {
      console.error("Payment initiation error:", err);
      setPayError("Unable to open Razorpay payment gateway.");
      setIsPaying(false);
    }
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
      const green = [18, 54, 38];
      const gold = [180, 140, 60];
      const rs = (n) => `Rs. ${Number(n).toLocaleString("en-IN")}`;
      const b = booking.bill;

      // 1. Fetch & attach official logo
      let logoData = null;
      try {
        logoData = await loadLogoDataUrl(siteLogo);
      } catch (err) {
        console.warn("Could not load logo for PDF ticket:", err);
      }

      // Header band
      doc.setFillColor(...green);
      doc.rect(0, 0, W, 56, "F");
      doc.setFillColor(...gold);
      doc.rect(0, 56, W, 3, "F");

      // Attach Official Logo on Top Left
      if (logoData) {
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(14, 8, 38, 38, 4, 4, "F");
        doc.addImage(logoData, "PNG", 16, 10, 34, 34);
      }

      const textStartX = logoData ? 58 : 14;

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("BHITARAKANIKA SAFARI", textStartX, 21);

      doc.setFontSize(11);
      doc.text("Official Boat Safari E-Pass & Voucher", textStartX, 30);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(225, 200, 140);
      doc.text("Recognized by Forest Dept. · Govt. of Odisha", textStartX, 38);

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(`Booking ID: ${booking.id}`, W - 14, 20, { align: "right" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.text(`Status: Confirmed · Paid`, W - 14, 28, { align: "right" });
      if (booking.paymentId) {
        doc.setFontSize(8.5);
        doc.setTextColor(225, 200, 140);
        doc.text(`Razorpay ID: ${booking.paymentId}`, W - 14, 36, { align: "right" });
      }
      doc.setTextColor(220, 230, 225);
      doc.setFontSize(8.5);
      doc.text(`Issued: ${booking.issuedOn}`, W - 14, 44, { align: "right" });

      // Title
      doc.setTextColor(...green);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(17);
      doc.text(booking.tourTitle, 14, 72);

      // Pill (package name, or category when there is no package)
      const pillText = booking.pkgName
        ? `${booking.pkgName.toUpperCase()} PACKAGE`
        : booking.category;
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
      const rowGap = 16;

      drawField("Guest name", booking.name, col1, y);
      drawField("Phone number", `+91 ${booking.phone}`, col2, y);
      y += rowGap;
      drawField("Email address", booking.email, col1, y);
      drawField("Home Town", booking.address || "N/A", col2, y);
      y += rowGap;
      drawField("Travel date", formatDate(booking.date), col1, y);
      drawField("Aadhar / Passport", maskAadhar(booking.aadhar), col2, y);
      y += rowGap;
      drawField("Time slot", booking.timePdf, col1, y);
      drawField("Total guests & boats", `${booking.people} Guests (${booking.boats || 1} ${(booking.boats || 1) > 1 ? "Boats" : "Boat"})`, col2, y);
      y += rowGap + 1;

      // Fare breakdown box
      const lines = booking.govtTax
        ? [
            [
              `${booking.fareLabel} (${booking.boats || 1} ${(booking.boats || 1) > 1 ? "boats" : "boat"})`,
              rs(b.fare),
            ],
            [
              `Govt forest permit: Rs. ${b.perPerson} x ${booking.people} ${personWord(booking.people)}`,
              rs(b.personTax),
            ],
            [
              `Govt boat tax (${booking.boats || 1} ${(booking.boats || 1) > 1 ? "boats" : "boat"})`,
              rs(b.boatTax),
            ],
          ]
        : [
            [
              `${booking.fareLabel} (${booking.boats || 1} ${(booking.boats || 1) > 1 ? "boats" : "boat"})`,
              rs(b.fare),
            ],
          ];

      const boxH = 16 + lines.length * 7 + 18;
      doc.setFillColor(248, 246, 238);
      doc.setDrawColor(...gold);
      doc.roundedRect(14, y, W - 28, boxH, 3, 3, "FD");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(90, 100, 95);
      let ly = y + 11;
      lines.forEach(([label, amount]) => {
        doc.text(label, 20, ly);
        doc.text(amount, W - 20, ly, { align: "right" });
        ly += 7;
      });

      doc.setDrawColor(...gold);
      doc.setLineDashPattern([1, 1], 0);
      doc.line(20, ly - 3, W - 20, ly - 3);
      doc.setLineDashPattern([], 0);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...gold);
      doc.text("FINAL PRICE", 20, ly + 5);
      doc.setFontSize(16);
      doc.setTextColor(...green);
      doc.text(rs(booking.total), W - 20, ly + 6, { align: "right" });
      y += boxH + 10;

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
        "Children aged 3 years and above need a ticket. Please carry a valid photo ID.",
        "Timings may change depending on weather and tide conditions.",
      ];
      notes.forEach((n, i) => doc.text(`-  ${n}`, 14, y + 7 + i * 6));

      // Page 1 Footer
      doc.setFillColor(...green);
      doc.rect(0, 280, W, 17, "F");
      doc.setFillColor(...gold);
      doc.rect(0, 280, W, 1.2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(`Page 1 of 2 · ${BRAND_NAME} · See Page 2 for official Terms & Conditions & Policies`, W / 2, 290, {
        align: "center",
      });

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
      doc.rect(0, 280, W, 17, "F");
      doc.setFillColor(...gold);
      doc.rect(0, 280, W, 1.2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text("Page 2 of 2 · EcoTour Odisha · Forest & Environment Dept., Govt. of Odisha", W / 2, 290, { align: "center" });

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
      kicker={step === "form" ? "Reserve your boat" : "Confirmed Safari Reservation"}
      title={step === "form" ? "Book Your Boat Trip" : "Booking Confirmed"}
      onClose={onClose}
      className={step === "form" ? "bk-modal-booking" : "bk-modal-voucher"}
    >
      {(close) =>
        step === "form" ? (
          <form className="bk-body bk-body-split" onSubmit={handleSubmit} noValidate>
            {/* LEFT COLUMN: Tour Summary & Live Fare Card */}
            <div className="bk-summary-side">
              {/* Tour preview card */}
              <div className="bk-tour-summary-card">
                <div className="bk-tour-meta">
                  <div className="bk-tour-meta-top">
                    <span className="bk-tour-gate-chip">
                      {tour.gate ? tour.gate : `Departure: ${tour.from}`}
                    </span>
                    <span className="bk-tour-duration-badge-inline">⏱ {tour.duration}</span>
                  </div>
                  <h3 className="bk-tour-title">{tour.title}</h3>
                  {pkg && <span className="bk-pkg-pill">{pkg.name} Package</span>}
                  <div className="bk-route-pill">
                    <span>{tour.from}</span>
                    <span className="bk-route-arrow">➔</span>
                    <span>{tour.to}</span>
                  </div>
                </div>
              </div>

              {/* Live Fare Breakdown */}
              <div className="bk-live-fare-card">
                <div className="bk-fare-header">
                  <span className="bk-fare-title">Fare & Tax Breakdown</span>
                  <span className="bk-live-tag">● Live Update</span>
                </div>

                <div className="bk-fare-line">
                  <span className="bk-fare-name">
                    {fareLabel}
                    {boatCount > 1 && (
                      <small className="bk-tax-calc">
                        ({formatPrice(bill.baseFare)} × {boatCount} boats)
                      </small>
                    )}
                  </span>
                  <span className="bk-fare-qty">
                    {boatCount} {boatCount === 1 ? "Boat" : "Boats"}
                  </span>
                  <strong className="bk-fare-val bk-pop" key={bill.fare}>
                    {formatPrice(bill.fare)}
                  </strong>
                </div>

                {tour.govtTax ? (
                  <>
                    <div className="bk-fare-line">
                      <span className="bk-fare-name">
                        Govt Forest Permit
                        <small className="bk-tax-calc">
                          ({formatPrice(bill.perPerson)} × {peopleNum} {personWord(peopleNum)})
                        </small>
                      </span>
                      <strong className="bk-fare-val bk-pop" key={bill.personTax}>
                        {formatPrice(bill.personTax)}
                      </strong>
                    </div>

                    <div className="bk-fare-line">
                      <span className="bk-fare-name">
                        Govt Boat Tax
                        <small className="bk-tax-calc">
                          ({formatPrice(BOAT_TAX)} × {boatCount} {boatCount === 1 ? "boat" : "boats"})
                        </small>
                      </span>
                      <strong className="bk-fare-val bk-pop" key={bill.boatTax}>
                        {formatPrice(bill.boatTax)}
                      </strong>
                    </div>
                  </>
                ) : null}

                <div className="bk-total-divider"></div>

                <div className="bk-fare-total-row">
                  <div>
                    <span className="bk-total-title">Total Payable Amount</span>
                    <span className="bk-total-note">Includes all permits & taxes</span>
                  </div>
                  <strong className="bk-total-amount bk-pop" key={bill.total}>
                    {formatPrice(bill.total)}
                  </strong>
                </div>
              </div>

              {/* 3+ Years Ticket Notice */}
              <div className="bk-age-notice" role="note">
                <div className="bk-notice-badge">🎟️</div>
                <div className="bk-notice-content">
                  <h5>Children aged 3+ need ticket</h5>
                  <p>Please include all children aged 3 or older in total guest count.</p>
                </div>
                <span className="bk-notice-chip">3+ YRS</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Guest & Booking Information */}
            <div className="bk-form-side">
              <div className="bk-side-header">
                <h3>Guest &amp; Schedule Details</h3>
              </div>

              <div className="bk-inputs-grid">
                {/* Full Name */}
                <div className={`${fieldClass("name")} bk-col-full`}>
                  <label htmlFor="bk-name">
                    Primary Guest Name <span className="bk-req-star">*</span>
                  </label>
                  <div className="bk-input-control">
                    <span className="bk-icon-lead">👤</span>
                    <input
                      id="bk-name"
                      ref={nameRef}
                      type="text"
                      placeholder="Enter primary traveler's full name"
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                      autoComplete="name"
                    />
                  </div>
                  {errors.name && <em className="bk-err-txt">{errors.name}</em>}
                </div>

                {/* Travel Date */}
                <div className={fieldClass("date")}>
                  <label htmlFor="bk-date">
                    Travel Date <span className="bk-req-star">*</span>
                  </label>
                  <div className="bk-input-control">
                    <span className="bk-icon-lead">📅</span>
                    <input
                      id="bk-date"
                      type="date"
                      min={todayString()}
                      value={form.date}
                      onChange={(e) => setField("date", e.target.value)}
                    />
                  </div>
                  {errors.date && <em className="bk-err-txt">{errors.date}</em>}
                </div>

                {/* Time Slot */}
                <div className={fieldClass("time")}>
                  <label htmlFor="bk-time">
                    Departure Slot <span className="bk-req-star">*</span>
                  </label>
                  <div className="bk-input-control">
                    {tour.fullDay ? (
                      <>
                        <span className="bk-icon-lead">⏰</span>
                        <input
                          id="bk-time"
                          type="text"
                          className="bk-readonly"
                          value={slotText(FULL_DAY_SLOT)}
                          readOnly
                        />
                      </>
                    ) : (
                      <CustomSlotSelect
                        value={form.time}
                        onChange={(val) => setField("time", val)}
                        options={SLOT_OPTIONS}
                        hasError={Boolean(errors.time)}
                      />
                    )}
                  </div>
                  {selectedSlot && (
                    <small className="bk-hint-txt">
                      Start: {selectedSlot.start} · Return: {selectedSlot.end}
                    </small>
                  )}
                  {errors.time && <em className="bk-err-txt">{errors.time}</em>}
                </div>

                {/* Boat Stepper */}
                <div className={fieldClass("boats")}>
                  <label htmlFor="bk-boats">
                    Number of Boats <span className="bk-req-star">*</span>
                  </label>
                  <div className="bk-stepper-box">
                    <button
                      type="button"
                      className="bk-step-btn"
                      onClick={() => changeBoats(-1)}
                      disabled={boatCount <= 1 || boatCount <= Math.ceil(peopleNum / 18)}
                      aria-label="Decrease boats"
                    >
                      −
                    </button>
                    <div className="bk-step-val-wrap">
                      <input
                        id="bk-boats"
                        className="bk-counter-input"
                        type="text"
                        inputMode="numeric"
                        value={form.boats}
                        readOnly
                        aria-label="Number of boats"
                      />
                      <span className="bk-people-sub">
                        {boatCount === 1 ? "Boat" : "Boats"}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="bk-step-btn"
                      onClick={() => changeBoats(1)}
                      disabled={boatCount >= 10}
                      aria-label="Increase boats"
                    >
                      +
                    </button>
                  </div>
                  <small className="bk-hint-txt">Capacity: up to {boatCount * 18} passengers</small>
                </div>

                {/* People Stepper */}
                <div className={fieldClass("people")}>
                  <label htmlFor="bk-people">
                    Number of People <span className="bk-req-star">*</span>
                  </label>
                  <div className="bk-stepper-box">
                    <button
                      type="button"
                      className="bk-step-btn"
                      onClick={() => changePeople(-1)}
                      disabled={peopleNum <= 1}
                      aria-label="Decrease people"
                    >
                      −
                    </button>
                    <div className="bk-step-val-wrap">
                      <input
                        id="bk-people"
                        className="bk-counter-input"
                        type="text"
                        inputMode="numeric"
                        value={form.people}
                        onChange={handlePeopleInput}
                        onBlur={handlePeopleBlur}
                        aria-label="Number of people"
                      />
                      <span className="bk-people-sub">
                        {peopleNum === 1 ? "Person" : "Persons"}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="bk-step-btn"
                      onClick={() => changePeople(1)}
                      disabled={peopleNum >= 180}
                      aria-label="Increase people"
                    >
                      +
                    </button>
                  </div>
                  <small className="bk-hint-txt">
                    {peopleNum > 18
                      ? `${boatCount} boats allocated (cap: ${boatCount * 18})`
                      : `Max 18 passengers per boat`}
                  </small>
                  {errors.people && <em className="bk-err-txt">{errors.people}</em>}
                </div>

                {/* Govt Forest Tax Rate Info Pill */}
                {tour.govtTax ? (
                  <div className="bk-tax-info-field">
                    <label>Forest Permit Rate</label>
                    <div className="bk-tax-rate-box">
                      <div className="bk-tax-rate-main">
                        <strong>{formatPrice(bill.perPerson)}</strong>
                        <span>/ person</span>
                      </div>
                      <div className="bk-tax-tier-tag">
                        {peopleNum <= 9 ? "Tier: Up to 9 (₹40)" : "Tier: 10+ Group (₹25)"}
                      </div>
                    </div>
                    <small className="bk-hint-txt">
                      {formatPrice(TAX_UP_TO_9)} up to 9 · {formatPrice(TAX_10_PLUS)} for 10+
                    </small>
                  </div>
                ) : (
                  <div className="bk-tax-info-field">
                    <label>Package Rate</label>
                    <div className="bk-tax-rate-box">
                      <div className="bk-tax-rate-main">
                        <strong>{formatPrice(bill.fare)}</strong>
                      </div>
                      <span className="bk-tax-tier-tag">{tour.priceUnit}</span>
                    </div>
                    <small className="bk-hint-txt">Included for full boat</small>
                  </div>
                )}

                {/* Phone */}
                <div className={fieldClass("phone")}>
                  <label htmlFor="bk-phone">
                    Mobile Number <span className="bk-req-star">*</span>
                  </label>
                  <div className="bk-input-control">
                    <span className="bk-country-code">+91</span>
                    <input
                      id="bk-phone"
                      type="tel"
                      inputMode="numeric"
                      placeholder="10-digit mobile number"
                      value={form.phone}
                      onChange={handleDigits("phone", 10)}
                      autoComplete="tel-national"
                    />
                  </div>
                  {errors.phone && <em className="bk-err-txt">{errors.phone}</em>}
                </div>

                {/* Aadhar / Passport */}
                <div className={fieldClass("aadhar")}>
                  <label htmlFor="bk-aadhar">
                    Aadhaar / Passport Number <span className="bk-opt-tag">(Optional)</span>
                  </label>
                  <div className="bk-input-control">
                    <span className="bk-icon-lead">🪪</span>
                    <input
                      id="bk-aadhar"
                      type="text"
                      placeholder="12-digit Aadhaar or Passport number"
                      value={form.aadhar}
                      onChange={(e) => setField("aadhar", e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 16))}
                    />
                  </div>
                  {errors.aadhar && <em className="bk-err-txt">{errors.aadhar}</em>}
                </div>

                {/* Email */}
                <div className={fieldClass("email")}>
                  <label htmlFor="bk-email">
                    Email Address <span className="bk-req-star">*</span>
                  </label>
                  <div className="bk-input-control">
                    <span className="bk-icon-lead">✉️</span>
                    <input
                      id="bk-email"
                      type="email"
                      placeholder="Enter email for voucher"
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && <em className="bk-err-txt">{errors.email}</em>}
                </div>

                {/* Home Town */}
                <div className={fieldClass("address")}>
                  <label htmlFor="bk-address">
                    Home Town / City <span className="bk-req-star">*</span>
                  </label>
                  <div className="bk-input-control">
                    <span className="bk-icon-lead">📍</span>
                    <input
                      id="bk-address"
                      type="text"
                      placeholder="Enter your home town / city"
                      value={form.address}
                      onChange={(e) => setField("address", e.target.value)}
                      autoComplete="address-level2"
                    />
                  </div>
                  {errors.address && <em className="bk-err-txt">{errors.address}</em>}
                </div>
              </div>

              {/* Form Action Buttons */}
              {payError && (
                <div style={{ color: "#d9534f", fontSize: "13px", margin: "8px 0 12px", fontWeight: "600", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>⚠️</span>
                  <span>{payError}</span>
                </div>
              )}
              <div className="bk-submit-row">
                <button type="button" className="bk-btn-ghost-modern" onClick={close} disabled={isPaying}>
                  Cancel
                </button>
                <button type="submit" className="bk-btn-primary-luxury" disabled={isPaying}>
                  {isPaying ? (
                    <span>Opening Gateway...</span>
                  ) : (
                    <>
                      <span>Confirm Boat Booking</span>
                      <span className="bk-btn-icon">➔</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="bk-body bk-success-wrap">
            {/* VALUE-ONLY CONFIRMATION TICKET */}
            <div className="bk-doc">
              {/* Header: Package Name, Route & Paid Badge */}
              <div className="bk-doc-head">
                <div>
                  <small>Bhitarkanika Boat Service</small>
                  <h4>{booking.tourTitle}</h4>
                  <span className="bk-doc-route-sub">
                    {booking.from} ➔ {booking.to} · {booking.duration}
                  </span>
                </div>
                <div className="bk-doc-id">
                  <span className="bk-paid-badge-chip">✓ Confirmed</span>
                  <strong>{booking.id}</strong>
                </div>
              </div>

              {/* Core Value Details Grid */}
              <div className="bk-voucher-grid-value">
                <div className="bk-voucher-metric">
                  <span className="bk-metric-lbl">📅 Travel Date &amp; Slot</span>
                  <strong className="bk-metric-val">
                    {formatDate(booking.date)} · {booking.timeLabel}
                  </strong>
                </div>

                <div className="bk-voucher-metric">
                  <span className="bk-metric-lbl">👥 Guests &amp; Boat</span>
                  <strong className="bk-metric-val">
                    {booking.people} {personWord(booking.people)} · 1 Boat
                  </strong>
                </div>

                <div className="bk-voucher-metric">
                  <span className="bk-metric-lbl">👤 Primary Guest</span>
                  <strong className="bk-metric-val">
                    {booking.name} (+91 {booking.phone})
                  </strong>
                </div>

                <div className="bk-voucher-metric">
                  <span className="bk-metric-lbl">💳 Payment Reference</span>
                  <strong className="bk-metric-val code">
                    {booking.paymentId || "Razorpay Verified"}
                  </strong>
                </div>
              </div>

              {/* Total Paid Strip */}
              <div className="bk-doc-total-strip">
                <div>
                  <span className="bk-total-lbl">Total Amount Paid</span>
                  <small className="bk-total-sub">Includes Boat Fare, Forest Permit &amp; Taxes</small>
                </div>
                <strong className="bk-total-price">{formatPrice(booking.total)}</strong>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="bk-actions bk-actions-end">
              <button
                type="button"
                className="bk-btn-ghost-modern"
                onClick={() => {
                  close();
                  navigate("/profile");
                }}
              >
                <span>View in My Profile</span>
              </button>
              <button
                type="button"
                className="bk-btn-primary-luxury"
                onClick={handleDownload}
                disabled={downloading}
              >
                <span>{downloading ? "Preparing PDF..." : "Download PDF Voucher"}</span>
                <span className="bk-btn-icon">↓</span>
              </button>
            </div>
          </div>
        )
      }
    </ModalShell>
  );
};

// ============================================
// EXPERIENCE COMPONENT  (Boat Service only)
// ============================================

const Experience = () => {
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPkg, setSelectedPkg] = useState({ 3: "standard" }); // default card 3 to standard
  const [pkgHint, setPkgHint] = useState(null); // tour id that still needs a package
  const [bookingTour, setBookingTour] = useState(null); // { tour, pkg }
  const [mapTour, setMapTour] = useState(null); // tour whose route map is open
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 650 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 650);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth scroll to "Book Trip" boat packages section if targeted by route hash or query
  useEffect(() => {
    const scrollToBookTrip = () => {
      const hash = location.hash || window.location.hash;
      const search = location.search || window.location.search;
      if (
        hash === "#book-trip" ||
        hash === "#boat-booking" ||
        hash === "#safari-booking" ||
        search.includes("book=true")
      ) {
        const el = document.getElementById("book-trip");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    scrollToBookTrip();
    const t = setTimeout(scrollToBookTrip, 300);
    return () => clearTimeout(t);
  }, [location]);

  const handlePrev = () =>
    setCurrentIndex((i) => (i === 0 ? boatData.length - 1 : i - 1));
  const handleNext = () =>
    setCurrentIndex((i) => (i === boatData.length - 1 ? 0 : i + 1));

  const handleSelectPackage = (tourId, key) => {
    setSelectedPkg((prev) => ({ ...prev, [tourId]: key }));
    if (pkgHint === tourId) setPkgHint(null);
  };

  const handleBookTrip = (tour) => {
    // Cards without packages (1 and 2) book directly at the fixed fare.
    if (!tour.packages) {
      setBookingTour({ tour, pkg: null });
      return;
    }
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
    <section className="exp-section" id="book-trip">
      <div className="exp-container">
        {/* SECTION HEADER */}
        <div className="exp-header">
          <div className="exp-header-content">
            <div className="exp-eyebrow-badge">
              <span className="exp-eyebrow-icon">⛵</span>
              <span className="exp-eyebrow-text">{BRAND_NAME}</span>
              <span className="exp-eyebrow-divider">•</span>
              <span className="exp-eyebrow-tag">Official Safari Expeditions</span>
            </div>

            <h1 className="exp-main-title">
              Cruise the Mangroves of <span className="exp-title-gradient">Bhitarkanika</span>
            </h1>
          </div>
        </div>

        {/* BOAT CARDS */}
        {isMobile ? (
          <div className="exp-cards-grid">
            {boatData.map((item, index) => {
              if (index !== currentIndex) return null;

              const hasPackages = Boolean(item.packages);
              const chosen = hasPackages
                ? item.packages.find((p) => p.key === selectedPkg[item.id])
                : null;
              const needsPkg = pkgHint === item.id;

              return (
                <article className="exp-tour-card" key={item.id}>
                  <div
                    className={`exp-card-image-wrap ${item.map ? "exp-card-map-wrap" : ""}`}
                    onClick={() => item.map && setMapTour(item)}
                    role={item.map ? "button" : undefined}
                    tabIndex={item.map ? 0 : undefined}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="exp-card-image"
                      loading="lazy"
                      onError={handleImageError}
                    />
                    {!item.map && <div className="exp-image-overlay" />}
                    {!item.map && <span className="exp-location">{item.category}</span>}
                    {!item.map && (
                      <span className="exp-brand-badge">
                        <i aria-hidden="true" />
                        {BRAND_NAME}
                      </span>
                    )}
                    <div className="exp-image-shine" />
                  </div>

                  <div className="exp-card-content">
                    <div className="exp-card-eyebrow-row">
                      <span className="exp-card-eyebrow">{item.eyebrow}</span>
                      <span className="exp-duration-pill">⏱️ {item.duration}</span>
                    </div>
                    <h2>{item.title}</h2>
                    <p className="exp-tagline">{item.tagline}</p>

                    {hasPackages ? (
                      <div className="exp-pkg exp-pkg-has">
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
                              <span className="exp-pkg-pill-name">{p.name}</span>
                              <span className="exp-pkg-pill-price">
                                {formatPrice(p.price)}
                              </span>
                            </button>
                          ))}
                        </div>

                        <div
                          key={chosen ? chosen.key : needsPkg ? "warn" : "empty"}
                          className={`exp-pkg-panel ${
                            chosen ? `is-${chosen.key}` : "is-empty"
                          } ${needsPkg && !chosen ? "is-warning" : ""}`}
                          aria-live="polite"
                        >
                          {chosen ? (
                            <>
                              <div className="exp-pkg-panel-head">
                                <span className="exp-pkg-panel-icon" aria-hidden="true">
                                  {chosen.icon}
                                </span>
                                <div className="exp-pkg-panel-title">
                                  <small>You selected</small>
                                  <strong>{chosen.name} Package</strong>
                                </div>
                                {chosen.tag && (
                                  <span className="exp-pkg-tag">{chosen.tag}</span>
                                )}
                              </div>

                              <ul className="exp-pkg-features">
                                {chosen.features.map((f, i) => (
                                 <li key={f} style={{ animationDelay: `${i * 0.08}s` }}>
                                   <i aria-hidden="true">✓</i>
                                   <span>{f}</span>
                                 </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <div className="exp-pkg-empty">
                              <span className="exp-pkg-empty-icon" aria-hidden="true">
                                📸
                              </span>
                              <strong>
                                {needsPkg
                                  ? "Please select a package to continue"
                                  : "Choose your package"}
                              </strong>
                              <p>
                                Tap Standard, Medium or Premium to see what is included.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="exp-highlights-box">
                        <span className="exp-highlights-label">What's included</span>
                        <ul className="exp-highlights-list">
                          {item.highlights?.map((h) => (
                            <li key={h}>
                              <i aria-hidden="true">✓</i>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="exp-card-bottom">
                      <div className="exp-card-footer">
                        <div className="exp-price-box">
                          <span className="exp-price-label">
                            {chosen
                              ? `${chosen.name} package`
                              : hasPackages
                              ? "Starting from"
                              : "Boat fare"}
                          </span>
                          <div className="exp-price-row" key={chosen ? chosen.key : "start"}>
                            <strong>
                              {formatPrice(
                                chosen ? chosen.price : hasPackages ? item.startingFrom : item.fare
                              )}
                            </strong>
                            <small>
                              {hasPackages ? item.priceUnit : `${item.priceUnit} + govt tax`}
                            </small>
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
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="exp-cards-grid">
            {boatData.map((item) => {
              const hasPackages = Boolean(item.packages);
              const chosen = hasPackages
                ? item.packages.find((p) => p.key === selectedPkg[item.id])
                : null;
              const needsPkg = pkgHint === item.id;

              return (
                <article className="exp-tour-card" key={item.id}>
                  <div
                    className={`exp-card-image-wrap ${item.map ? "exp-card-map-wrap" : ""}`}
                    onClick={() => item.map && setMapTour(item)}
                    role={item.map ? "button" : undefined}
                    tabIndex={item.map ? 0 : undefined}
                    aria-label={item.map ? `View full route map for ${item.title}` : undefined}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="exp-card-image"
                      loading="lazy"
                      onError={handleImageError}
                    />
                    {!item.map && <div className="exp-image-overlay" />}
                    {!item.map && <span className="exp-location">{item.category}</span>}
                    {!item.map && (
                      <span className="exp-brand-badge">
                        <i aria-hidden="true" />
                        {BRAND_NAME}
                      </span>
                    )}
                    {item.map && (
                      <div className="exp-map-view-pill">
                        <span>🗺️ View Route Map</span>
                      </div>
                    )}
                    <div className="exp-image-shine" />
                  </div>

                  <div className="exp-card-content">
                    <div className="exp-card-eyebrow-row">
                      <span className="exp-card-eyebrow">{item.eyebrow}</span>
                      <span className="exp-duration-pill">⏱️ {item.duration}</span>
                    </div>
                    <h2>{item.title}</h2>
                    <p className="exp-tagline">{item.tagline}</p>

                    {hasPackages ? (
                      <div className="exp-pkg exp-pkg-has">
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
                              <span className="exp-pkg-pill-name">{p.name}</span>
                              <span className="exp-pkg-pill-price">
                                {formatPrice(p.price)}
                              </span>
                            </button>
                          ))}
                        </div>

                        <div
                          key={chosen ? chosen.key : needsPkg ? "warn" : "empty"}
                          className={`exp-pkg-panel ${
                            chosen ? `is-${chosen.key}` : "is-empty"
                          } ${needsPkg && !chosen ? "is-warning" : ""}`}
                          aria-live="polite"
                        >
                          {chosen ? (
                            <>
                              <div className="exp-pkg-panel-head">
                                <span className="exp-pkg-panel-icon" aria-hidden="true">
                                  {chosen.icon}
                                </span>
                                <div className="exp-pkg-panel-title">
                                  <small>You selected</small>
                                  <strong>{chosen.name} Package</strong>
                                </div>
                                {chosen.tag && (
                                  <span className="exp-pkg-tag">{chosen.tag}</span>
                                )}
                              </div>

                              <ul className="exp-pkg-features">
                                {chosen.features.map((f, i) => (
                                  <li key={f} style={{ animationDelay: `${i * 0.08}s` }}>
                                    <i aria-hidden="true">✓</i>
                                    <span>{f}</span>
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <div className="exp-pkg-empty">
                              <span className="exp-pkg-empty-icon" aria-hidden="true">
                                📸
                              </span>
                              <strong>
                                {needsPkg
                                  ? "Please select a package to continue"
                                  : "Choose your package"}
                              </strong>
                              <p>
                                Tap Standard, Medium or Premium to see what is included.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="exp-highlights-box">
                        <span className="exp-highlights-label">What's included</span>
                        <ul className="exp-highlights-list">
                          {item.highlights?.map((h) => (
                            <li key={h}>
                              <i aria-hidden="true">✓</i>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="exp-card-bottom">
                      <div className="exp-card-footer">
                        <div className="exp-price-box">
                          <span className="exp-price-label">
                            {chosen
                              ? `${chosen.name} package`
                              : hasPackages
                              ? "Starting from"
                              : "Boat fare"}
                          </span>
                          <div className="exp-price-row" key={chosen ? chosen.key : "start"}>
                            <strong>
                              {formatPrice(
                                chosen ? chosen.price : hasPackages ? item.startingFrom : item.fare
                              )}
                            </strong>
                            <small>
                              {hasPackages ? item.priceUnit : `${item.priceUnit} + govt tax`}
                            </small>
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
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* MOBILE SLIDER CONTROLS */}
        {isMobile && boatData.length > 1 && (
          <div className="exp-mobile-controls">
            <button type="button" onClick={handlePrev} aria-label="Previous item">
              ←
            </button>

            <div className="exp-dots">
              {boatData.map((item, index) => (
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

      {mapTour && <MapModal tour={mapTour} onClose={() => setMapTour(null)} />}
    </section>
  );
};

export default Experience;
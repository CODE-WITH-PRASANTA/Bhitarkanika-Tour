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

const MAX_PEOPLE = 18;
const BOAT_TAX = 50; // govt tax per boat (Rs.)
const TAX_UP_TO_9 = 40; // govt tax per person when 9 or fewer people (Rs.)
const TAX_10_PLUS = 25; // govt tax per person when more than 9 people (Rs.)

// Time slots are chosen inside the booking popup (not shown on the card front).
const SLOT_OPTIONS = [
  { key: "morning", name: "Morning Slot", start: "7:00 AM", end: "11:30 AM", icon: "☀️" },
  { key: "afternoon", name: "Afternoon Slot", start: "1:00 PM", end: "5:00 PM", icon: "🌤️" },
];
const FULL_DAY_SLOT = {
  key: "fullday",
  name: "Full Day",
  start: "7:00 AM",
  end: "5:00 PM",
  icon: "⏱️",
};
const ALL_SLOTS = [...SLOT_OPTIONS, FULL_DAY_SLOT];

const slotText = (s) => `${s.name} · ${s.start} – ${s.end}`;
const slotPdf = (s) => `${s.name} (${s.start} to ${s.end})`;

// ============================================
// BOAT SERVICE DATA  (3 cards)
// Card 1 and 2: fixed fare, no packages, route map, govt taxes added.
// Card 3: full-day photography boat with packages (Standard = Rs. 8000).
// Medium / Premium prices, "tag" and "features" are placeholders - edit to your real packages.
// ============================================

const boatData = [
  {
    id: 1,
    slug: "jaynagar-to-bhitarkanika",
    eyebrow: "Start from Jaynagar",
    title: "Bhitarkanika Boat Package",
    tagline: "Glide through quiet mangrove creeks on a private boat ride from Jaynagar.",
    image: boatService1,
    duration: "1 DAY",
    category: "BOAT RIDE",
    from: "Jaynagar",
    to: "Bhitarkanika",
    priceUnit: "per boat",
    fare: 4000,
    govtTax: true,
    fullDay: false,
    packages: null,
    map: {
      fromLabel: "Jaynagar",
      toLabel: "Bhitarkanika",
      origin: "Jaynagar, Kendrapara, Odisha",
      destination: "Bhitarkanika National Park, Odisha",
    },
  },
  {
    id: 2,
    slug: "khola-to-bhitarkanika",
    eyebrow: "Start from Khola",
    title: "Bhitarkanika Boat Package",
    tagline: "Start from the Khola boating point and cruise into the wild.",
    image: boatService2,
    duration: "1 DAY",
    category: "BOAT RIDE",
    from: "Khola (Boating Point)",
    to: "Bhitarkanika",
    priceUnit: "per boat",
    fare: 3500,
    govtTax: true,
    fullDay: false,
    packages: null,
    map: {
      fromLabel: "Khola",
      toLabel: "Bhitarkanika",
      origin: "Khola Boating Point, Kendrapara, Odisha",
      destination: "Bhitarkanika National Park, Odisha",
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
        perks: "Full-day private boat for photography.",
        features: [
          "Full-day private boat for photography",
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

const calcBill = (tour, pkg, people) => {
  const fare = pkg ? pkg.price : tour.fare;
  const perPerson = tour.govtTax ? taxPerPerson(people) : 0;
  const personTax = perPerson * people;
  const boatTax = tour.govtTax ? BOAT_TAX : 0;
  return {
    fare,
    perPerson,
    personTax,
    boatTax,
    total: fare + personTax + boatTax,
  };
};

const INITIAL_FORM = {
  name: "",
  people: 1,
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
// ROUTE MAP  (card preview + popup with directions)
// ============================================

const RouteMapPreview = ({ map, onOpen }) => (
  <button
    type="button"
    className="exp-map"
    onClick={onOpen}
    aria-label={`View route map from ${map.fromLabel} to ${map.toLabel}`}
  >
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
    <span className="exp-map-cta">
      View route map <b aria-hidden="true">→</b>
    </span>
  </button>
);

const MapModal = ({ tour, onClose }) => {
  const { origin, destination, fromLabel, toLabel } = tour.map;
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
          <div className="bk-map-wrap">
            <iframe
              title={`Route from ${fromLabel} to ${toLabel}`}
              src={embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
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
// BOAT BOOKING MODAL
// ============================================

const BookingModal = ({ tour, pkg, onClose }) => {
  const [step, setStep] = useState("form"); // "form" | "success"
  const [form, setForm] = useState({
    ...INITIAL_FORM,
    time: tour.fullDay ? FULL_DAY_SLOT.key : "",
  });
  const [errors, setErrors] = useState({});
  const [booking, setBooking] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const nameRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => nameRef.current?.focus(), 350);
    return () => clearTimeout(t);
  }, []);

  const peopleNum = Math.min(
    MAX_PEOPLE,
    Math.max(0, parseInt(form.people, 10) || 0)
  );
  const bill = calcBill(tour, pkg, peopleNum);
  const fareLabel = pkg ? `${pkg.name} package fare` : "Boat fare";
  const selectedSlot = ALL_SLOTS.find((s) => s.key === form.time);

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const changePeople = (delta) =>
    setField("people", Math.min(MAX_PEOPLE, Math.max(1, peopleNum + delta)));

  const handlePeopleInput = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 2);
    setField("people", digits === "" ? "" : Math.min(MAX_PEOPLE, parseInt(digits, 10)));
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
    if (peopleNum < 1 || peopleNum > MAX_PEOPLE)
      next.people = `Enter 1 to ${MAX_PEOPLE} people.`;
    if (!form.date) next.date = "Please choose a date.";
    else if (form.date < todayString()) next.date = "Date cannot be in the past.";
    if (!form.time) next.time = "Please choose a time slot.";
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
      people: peopleNum,
      name: form.name.trim(),
      email: form.email.trim(),
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
      const b = booking.bill;

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
      drawField("Aadhar number", maskAadhar(booking.aadhar), col2, y);
      y += rowGap;
      drawField("Travel date", formatDate(booking.date), col1, y);
      drawField("Time slot", booking.timePdf, col2, y);
      y += rowGap;
      drawField("People", booking.people, col1, y);
      drawField("Boat", "1 private boat", col2, y);
      y += rowGap + 1;

      // Fare breakdown box
      const lines = booking.govtTax
        ? [
            [booking.fareLabel, rs(b.fare)],
            [
              `Govt tax: Rs. ${b.perPerson} x ${booking.people} ${personWord(booking.people)}`,
              rs(b.personTax),
            ],
            ["Govt boat tax (1 boat)", rs(b.boatTax)],
          ]
        : [[booking.fareLabel, rs(b.fare)]];

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
                  {pkg ? `${pkg.name} package · ` : ""}
                  {tour.duration}
                </p>
                <p className="bk-tour-route">
                  {tour.from} <b>→</b> {tour.to}
                </p>
                <strong>
                  {formatPrice(bill.fare)} <small>{tour.priceUnit}</small>
                </strong>
              </div>
            </div>

            <div className="bk-grid">
              {/* NAME */}
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

              {/* PEOPLE (left) */}
              <div className={fieldClass("people")}>
                <label htmlFor="bk-people">People</label>
                <div className="bk-counter">
                  <button
                    type="button"
                    onClick={() => changePeople(-1)}
                    disabled={peopleNum <= 1}
                    aria-label="Decrease people"
                  >
                    −
                  </button>
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
                  <button
                    type="button"
                    onClick={() => changePeople(1)}
                    disabled={peopleNum >= MAX_PEOPLE}
                    aria-label="Increase people"
                  >
                    +
                  </button>
                </div>
                <small className="bk-hint">Maximum {MAX_PEOPLE} people</small>
                {errors.people && <em>{errors.people}</em>}
              </div>

              {/* RIGHT BOX: govt tax per person (live) or package fare */}
              {tour.govtTax ? (
                <div className="bk-field">
                  <label>Govt tax per person</label>
                  <div className="bk-box">
                    <span className="bk-box-main">
                      <b>{formatPrice(bill.perPerson)}</b> × {peopleNum}{" "}
                      {personWord(peopleNum)}
                    </span>
                    <strong className="bk-box-value bk-pop" key={bill.personTax}>
                      {formatPrice(bill.personTax)}
                    </strong>
                  </div>
                  <small className="bk-hint">
                    {formatPrice(TAX_UP_TO_9)} up to 9 · {formatPrice(TAX_10_PLUS)} for 10+
                  </small>
                </div>
              ) : (
                <div className="bk-field">
                  <label>{fareLabel}</label>
                  <div className="bk-box">
                    <span className="bk-box-main">1 private boat</span>
                    <strong className="bk-box-value">{formatPrice(bill.fare)}</strong>
                  </div>
                  <small className="bk-hint">{tour.priceUnit}</small>
                </div>
              )}

              {/* BOAT FARE + BOAT TAX */}
              {tour.govtTax && (
                <>
                  <div className="bk-field">
                    <label>{fareLabel}</label>
                    <div className="bk-box">
                      <span className="bk-box-main">1 private boat</span>
                      <strong className="bk-box-value">{formatPrice(bill.fare)}</strong>
                    </div>
                    <small className="bk-hint">{tour.priceUnit}</small>
                  </div>

                  <div className="bk-field">
                    <label>Govt tax for boat</label>
                    <div className="bk-box">
                      <span className="bk-box-main">
                        <b>{formatPrice(BOAT_TAX)}</b> × 1 boat
                      </span>
                      <strong className="bk-box-value">{formatPrice(bill.boatTax)}</strong>
                    </div>
                    <small className="bk-hint">{formatPrice(BOAT_TAX)} per boat</small>
                  </div>

                  {/* TICKET NOTICE */}
                  <div className="bk-notice bk-span-2" role="note">
                    <div className="bk-notice-icon" aria-hidden="true">
                      🎟️
                    </div>
                    <div>
                      <h5>Children aged 3 years &amp; above need a ticket</h5>
                      <p>Please count every child aged 3 or older in the People box above.</p>
                    </div>
                    <span className="bk-notice-age">3+ YRS</span>
                  </div>
                </>
              )}

              {/* DATE + TIME */}
              <div className={`${fieldClass("date")} bk-m-full`}>
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

              <div className={`${fieldClass("time")} bk-m-full`}>
                <label htmlFor="bk-time">Choose time</label>
                {tour.fullDay ? (
                  <input
                    id="bk-time"
                    type="text"
                    className="bk-readonly"
                    value={slotText(FULL_DAY_SLOT)}
                    readOnly
                  />
                ) : (
                  <select
                    id="bk-time"
                    value={form.time}
                    onChange={(e) => setField("time", e.target.value)}
                  >
                    <option value="">Select a time slot</option>
                    {SLOT_OPTIONS.map((s) => (
                      <option key={s.key} value={s.key}>
                        {slotText(s)}
                      </option>
                    ))}
                  </select>
                )}
                {selectedSlot && (
                  <small className="bk-hint">
                    Boat start {selectedSlot.start} · Boat end {selectedSlot.end}
                  </small>
                )}
                {errors.time && <em>{errors.time}</em>}
              </div>

              {/* PHONE + AADHAR */}
              <div className={`${fieldClass("phone")} bk-m-full`}>
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

              <div className={`${fieldClass("aadhar")} bk-m-full`}>
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

              {/* EMAIL */}
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

            {/* FARE SUMMARY (left) + BUTTONS (right) */}
            <div className="bk-footer">
              <div className="bk-bill">
                <span className="bk-bill-title">Fare summary</span>
                <div className="bk-bill-row">
                  <span>People</span>
                  <b>{peopleNum}</b>
                </div>
                <div className="bk-bill-row">
                  <span>{fareLabel}</span>
                  <b>{formatPrice(bill.fare)}</b>
                </div>
                {tour.govtTax && (
                  <>
                    <div className="bk-bill-row">
                      <span>
                        Govt tax ({formatPrice(bill.perPerson)} × {peopleNum})
                      </span>
                      <b>{formatPrice(bill.personTax)}</b>
                    </div>
                    <div className="bk-bill-row">
                      <span>Govt boat tax (1 boat)</span>
                      <b>{formatPrice(bill.boatTax)}</b>
                    </div>
                  </>
                )}
                <div className="bk-bill-total">
                  <span>Final price</span>
                  <strong className="bk-pop" key={bill.total}>
                    {formatPrice(bill.total)}
                  </strong>
                </div>
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
                  {booking.pkgName ? `${booking.pkgName} package · ` : ""}
                  {booking.category} · {booking.duration}
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
                  <dt>People</dt>
                  <dd>{booking.people}</dd>
                </div>
                <div className="bk-doc-wide">
                  <dt>Time slot</dt>
                  <dd>{booking.timeLabel}</dd>
                </div>
                <div className="bk-doc-wide">
                  <dt>Aadhar</dt>
                  <dd>{maskAadhar(booking.aadhar)}</dd>
                </div>
              </dl>

              <div className="bk-doc-bill">
                <div>
                  <span>{booking.fareLabel}</span>
                  <b>{formatPrice(booking.bill.fare)}</b>
                </div>
                {booking.govtTax && (
                  <>
                    <div>
                      <span>
                        Govt tax ({formatPrice(booking.bill.perPerson)} × {booking.people})
                      </span>
                      <b>{formatPrice(booking.bill.personTax)}</b>
                    </div>
                    <div>
                      <span>Govt boat tax (1 boat)</span>
                      <b>{formatPrice(booking.bill.boatTax)}</b>
                    </div>
                  </>
                )}
              </div>

              <div className="bk-doc-total">
                <span>Final price</span>
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
// EXPERIENCE COMPONENT  (Boat Service only)
// ============================================

const Experience = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPkg, setSelectedPkg] = useState({}); // { [tourId]: packageKey }
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
              Private boat rides from Jaynagar and Khola, plus full-day
              photography packages through the mangrove creeks.
            </p>
          </div>
        </div>

        {/* BOAT CARDS */}
        <div className="exp-cards-grid">
          {boatData.map((item, index) => {
            if (isMobile && index !== currentIndex) return null;

            const hasPackages = Boolean(item.packages);
            const chosen = hasPackages
              ? item.packages.find((p) => p.key === selectedPkg[item.id])
              : null;
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
                  <span className="exp-card-eyebrow">{item.eyebrow}</span>
                  <h2>{item.title}</h2>
                  <p className="exp-tagline">{item.tagline}</p>

                  {/* PACKAGE SELECT (card 3) or ROUTE MAP (cards 1 and 2) */}
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

                      {/* PACKAGE DETAILS PANEL */}
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
                    <div className="exp-pkg">
                      <span className="exp-pkg-label">Route map</span>
                      <RouteMapPreview map={item.map} onOpen={() => setMapTour(item)} />
                      <p className="exp-pkg-perks">
                        Tap the map to see how to reach {item.map.fromLabel}.
                      </p>
                    </div>
                  )}

                  {/* BOTTOM GROUP: always pinned to the bottom of the card */}
                  <div className="exp-card-bottom">
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
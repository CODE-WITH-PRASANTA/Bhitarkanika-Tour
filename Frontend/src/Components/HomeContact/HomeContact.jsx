import React, { useState, useEffect, useRef } from "react";
import {
  Leaf,
  Phone,
  Mail,
  MapPin,
  User,
  CalendarDays,
  Users,
  MessageCircle,
  Send,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Ship,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./HomeContact.css";

// ============================================
// BUSINESS DETAILS (edit here)
// ============================================

const BRAND_NAME = "Bhitarkanika Boat Service";
const PHONE_DISPLAY = "+91 832 898 2394";
const PHONE_TEL = "+918328982394";
const WHATSAPP_NUMBER = "918328982394";
const EMAIL = "safari@bhitarkanikaboats.com";
const BOOK_TRIP_PATH = "/services/boat-service";
const ADDRESS = "Khola Entry Ghat, Rajnagar, Kendrapara, Odisha 754225";

// Replace with your own photo, e.g. import contactImage from "../../assets/contact-boat.jpg"
const CONTACT_IMAGE =
  "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=1100&q=80";

const GUEST_OPTIONS = [
  "1 Guest",
  "2 Guests",
  "3 – 4 Guests",
  "5 – 8 Guests",
  "9 – 15 Guests",
  "15+ Guests (Group)",
];

const CONTACT_ITEMS = [
  {
    key: "call",
    label: "Call Us",
    value: PHONE_DISPLAY,
    note: "Mon - Sat, 8:00 AM - 5:00 PM",
    href: `tel:${PHONE_TEL}`,
    icon: <Phone size={21} strokeWidth={2} />,
  },
  {
    key: "email",
    label: "Email Us",
    value: EMAIL,
    note: "We usually respond within 24 hours.",
    href: `mailto:${EMAIL}`,
    icon: <Mail size={21} strokeWidth={1.9} />,
  },
  {
    key: "visit",
    label: "Visit Us",
    value: ADDRESS,
    note: "Explore the heart of nature with us.",
    icon: <MapPin size={21} strokeWidth={2} />,
  },
];

const INITIAL_FORM = {
  fullName: "",
  phone: "",
  email: "",
  travelDate: "",
  guests: "",
  message: "",
};

const FIELD_IDS = {
  fullName: "homeContactFullName",
  phone: "homeContactPhone",
  email: "homeContactEmail",
  travelDate: "homeContactTravelDate",
  guests: "homeContactGuests",
  message: "homeContactMessage",
};

const getToday = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split("T")[0];
};

const formatDate = (value) =>
  new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const buildWhatsAppLink = (data) => {
  const lines = [
    `Hello ${BRAND_NAME}! I would like to plan a boat trip.`,
    "",
    `Name: ${data.fullName}`,
    `Phone: +91 ${data.phone}`,
    `Email: ${data.email}`,
    `Travel date: ${formatDate(data.travelDate)}`,
    `Guests: ${data.guests}`,
    "",
    `Message: ${data.message}`,
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
};

const HomeContact = ({ onFormSubmitSuccess }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [whatsAppLink, setWhatsAppLink] = useState("");

  const formCardRef = useRef(null);

  const handleBookClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Bring the success screen into view after submitting
  useEffect(() => {
    if (isSubmitted) {
      formCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isSubmitted]);

  // ==========================================
  // INPUT HANDLING
  // ==========================================
  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue = name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;

    setFormData((prev) => ({ ...prev, [name]: nextValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const openDatePicker = (event) => {
    try {
      event.currentTarget.showPicker?.();
    } catch (error) {
      /* picker not supported - native input still works */
    }
  };

  // ==========================================
  // VALIDATION
  // ==========================================
  const validateForm = () => {
    const next = {};
    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (fullName.length < 3) next.fullName = "Please enter your full name.";

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      next.phone = "Enter a valid 10 digit mobile number.";
    }

    if (!email) {
      next.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Please enter a valid email address.";
    }

    if (!formData.travelDate) {
      next.travelDate = "Please select your travel date.";
    } else if (formData.travelDate < getToday()) {
      next.travelDate = "Travel date cannot be in the past.";
    }

    if (!formData.guests) next.guests = "Please select number of guests.";

    if (message.length < 10) {
      next.message = "Please tell us a little more (at least 10 characters).";
    }

    setErrors(next);

    const firstKey = Object.keys(FIELD_IDS).find((key) => next[key]);
    if (firstKey) {
      document.getElementById(FIELD_IDS[firstKey])?.focus();
      return false;
    }
    return true;
  };

  // ==========================================
  // SUBMIT (no backend: shows success screen)
  // ==========================================
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const payload = {
      fullName: formData.fullName.trim(),
      phone: formData.phone,
      email: formData.email.trim(),
      travelDate: formData.travelDate,
      guests: formData.guests,
      message: formData.message.trim(),
    };

    // No automatic redirect: the success screen is shown first and the
    // visitor opens WhatsApp from the button when ready.
    setWhatsAppLink(buildWhatsAppLink(payload));
    setSubmittedName(payload.fullName.split(" ")[0]);
    setIsSubmitted(true);
    setFormData(INITIAL_FORM);
    setErrors({});

    if (onFormSubmitSuccess) onFormSubmitSuccess(payload);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setErrors({});
  };

  const renderError = (key) =>
    errors[key] ? (
      <p id={`${FIELD_IDS[key]}Error`} className="home-contact-error" role="alert">
        {errors[key]}
      </p>
    ) : null;

  const describedBy = (key) => (errors[key] ? `${FIELD_IDS[key]}Error` : undefined);

  return (
    <section className="home-contact" id="contact" aria-labelledby="homeContactHeading">
      {/* Decorative background */}
      <div className="home-contact-deco" aria-hidden="true">
        <Leaf className="home-contact-deco-leaf home-contact-deco-leaf-1" strokeWidth={1} />
        <Leaf className="home-contact-deco-leaf home-contact-deco-leaf-2" strokeWidth={1} />
        <Leaf className="home-contact-deco-leaf home-contact-deco-leaf-3" strokeWidth={1} />
        <svg className="home-contact-deco-line" viewBox="0 0 400 120" fill="none">
          <path
            d="M2 118C90 112 150 70 220 52C290 34 340 30 398 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 7"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="home-contact-container">
        {/* ===== HEADER ===== */}
        <header className="home-contact-header">
          <div className="home-contact-eyebrow">
            <span className="home-contact-eyebrow-line" />
            <Leaf size={20} fill="currentColor" strokeWidth={1.5} />
            <span className="home-contact-eyebrow-text">GET IN TOUCH</span>
            <span className="home-contact-eyebrow-line" />
          </div>

          <h2 id="homeContactHeading" className="home-contact-heading">
            Plan Your <span>Bhitarkanika</span> Adventure
          </h2>

          <p className="home-contact-subheading">
            We’re here to help you plan a memorable journey through mangrove forests,
            winding waterways and incredible wildlife.
          </p>
        </header>

        {/* ===== GRID ===== */}
        <div className="home-contact-grid">
          {/* ---------- LEFT: INFO ---------- */}
          <div className="home-contact-info">
            <div className="home-contact-info-body">
              <span className="home-contact-accent" />
              <h3 className="home-contact-info-title">
                Let’s make your trip <span>special</span>
              </h3>
              <p className="home-contact-info-text">
                Questions about our boat services, packages or Bhitarkanika tours?
                Our friendly team is ready to help you plan an unforgettable trip.
              </p>

              <ul className="home-contact-list">
                {CONTACT_ITEMS.map((item) => (
                  <li className="home-contact-item" key={item.key}>
                    <span className="home-contact-item-icon">{item.icon}</span>
                    <div className="home-contact-item-content">
                      <span className="home-contact-item-label">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className="home-contact-item-value">
                          {item.value}
                        </a>
                      ) : (
                        <p className="home-contact-item-value">{item.value}</p>
                      )}
                      <span className="home-contact-item-note">{item.note}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="home-contact-info-media">
              <div
                className="home-contact-info-photo"
                style={{ backgroundImage: `url(${CONTACT_IMAGE})` }}
                role="img"
                aria-label="Wildlife and mangroves of Bhitarkanika"
              />
              <span className="home-contact-chip">
                <Ship size={15} />
                Authorised Boat Safaris
              </span>
            </div>

            <div className="home-contact-cta">
              <span className="home-contact-cta-icon">
                <Compass size={24} strokeWidth={1.6} />
              </span>
              <div className="home-contact-cta-text">
                <strong>Ready to explore?</strong>
                <span>Book your boat trip with our friendly team.</span>
              </div>
              <Link
                to={BOOK_TRIP_PATH}
                onClick={handleBookClick}
                className="home-contact-cta-btn"
              >
                Book Your Trip <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* ---------- RIGHT: FORM ---------- */}
          <div className="home-contact-form-card" ref={formCardRef}>
            {isSubmitted ? (
              <div className="home-contact-success" role="status">
                <span className="home-contact-success-icon">
                  <CheckCircle2 size={40} strokeWidth={1.7} />
                </span>
                <h3 className="home-contact-success-title">
                  Almost done{submittedName ? `, ${submittedName}` : ""}!
                </h3>
                <p className="home-contact-success-text">
                  Your details are ready. Tap <strong>Open WhatsApp</strong> and press{" "}
                  <strong>Send</strong> in the chat to complete your enquiry. Our team
                  will reply with the best options for your trip.
                </p>
                <div className="home-contact-success-actions">
                  <a
                    href={whatsAppLink}
                    target="_blank"
                    rel="noreferrer"
                    className="home-contact-wa-btn"
                  >
                    <FaWhatsapp size={18} /> Open WhatsApp
                  </a>
                  <button
                    type="button"
                    className="home-contact-ghost-btn"
                    onClick={handleReset}
                  >
                    Send another enquiry
                  </button>
                </div>
              </div>
            ) : (
              <>
                <span className="home-contact-accent" />
                <h3 className="home-contact-form-title">
                  Send Us an <span>Enquiry</span>
                </h3>
                <p className="home-contact-form-text">
                  Fill out the form and our team will reply with the best options for
                  your Bhitarkanika boat trip.
                </p>

                <form className="home-contact-form" onSubmit={handleSubmit} noValidate>
                  {/* NAME */}
                  <div className="home-contact-field">
                    <label htmlFor={FIELD_IDS.fullName} className="home-contact-label">
                      Full Name <b aria-hidden="true">*</b>
                    </label>
                    <div className="home-contact-input-wrap">
                      <User className="home-contact-input-icon" size={18} aria-hidden="true" />
                      <input
                        id={FIELD_IDS.fullName}
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        maxLength={80}
                        autoComplete="name"
                        aria-invalid={!!errors.fullName}
                        aria-describedby={describedBy("fullName")}
                      />
                    </div>
                    {renderError("fullName")}
                  </div>

                  {/* PHONE */}
                  <div className="home-contact-field">
                    <label htmlFor={FIELD_IDS.phone} className="home-contact-label">
                      Phone Number <b aria-hidden="true">*</b>
                    </label>
                    <div className="home-contact-input-wrap">
                      <Phone className="home-contact-input-icon" size={18} aria-hidden="true" />
                      <input
                        id={FIELD_IDS.phone}
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={10}
                        inputMode="numeric"
                        autoComplete="tel-national"
                        aria-invalid={!!errors.phone}
                        aria-describedby={describedBy("phone")}
                      />
                    </div>
                    {renderError("phone")}
                  </div>

                  {/* EMAIL */}
                  <div className="home-contact-field">
                    <label htmlFor={FIELD_IDS.email} className="home-contact-label">
                      Email Address <b aria-hidden="true">*</b>
                    </label>
                    <div className="home-contact-input-wrap">
                      <Mail className="home-contact-input-icon" size={18} aria-hidden="true" />
                      <input
                        id={FIELD_IDS.email}
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                        aria-describedby={describedBy("email")}
                      />
                    </div>
                    {renderError("email")}
                  </div>

                  {/* TRAVEL DATE */}
                  <div className="home-contact-field">
                    <label htmlFor={FIELD_IDS.travelDate} className="home-contact-label">
                      Travel Date <b aria-hidden="true">*</b>
                    </label>
                    <div className="home-contact-input-wrap home-contact-date-wrap">
                      <CalendarDays className="home-contact-input-icon" size={18} aria-hidden="true" />
                      <input
                        id={FIELD_IDS.travelDate}
                        className={`home-contact-date ${formData.travelDate ? "" : "is-empty"}`}
                        type="date"
                        name="travelDate"
                        value={formData.travelDate}
                        min={getToday()}
                        onChange={handleChange}
                        onClick={openDatePicker}
                        aria-invalid={!!errors.travelDate}
                        aria-describedby={describedBy("travelDate")}
                      />
                      {!formData.travelDate && (
                        <span className="home-contact-date-placeholder" aria-hidden="true">
                          Select travel date
                        </span>
                      )}
                      <CalendarDays className="home-contact-date-end" size={18} aria-hidden="true" />
                    </div>
                    {renderError("travelDate")}
                  </div>

                  {/* GUESTS */}
                  <div className="home-contact-field home-contact-field-full">
                    <label htmlFor={FIELD_IDS.guests} className="home-contact-label">
                      Number of Guests <b aria-hidden="true">*</b>
                    </label>
                    <div className="home-contact-input-wrap">
                      <Users className="home-contact-input-icon" size={18} aria-hidden="true" />
                      <select
                        id={FIELD_IDS.guests}
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        required
                        aria-invalid={!!errors.guests}
                        aria-describedby={describedBy("guests")}
                      >
                        <option value="" disabled>
                          Select number of guests
                        </option>
                        {GUEST_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="home-contact-chevron" size={18} aria-hidden="true" />
                    </div>
                    {renderError("guests")}
                  </div>

                  {/* MESSAGE */}
                  <div className="home-contact-field home-contact-field-full">
                    <label htmlFor={FIELD_IDS.message} className="home-contact-label">
                      Your Message <b aria-hidden="true">*</b>
                    </label>
                    <div className="home-contact-input-wrap">
                      <MessageCircle
                        className="home-contact-input-icon home-contact-input-icon-top"
                        size={18}
                        aria-hidden="true"
                      />
                      <textarea
                        id={FIELD_IDS.message}
                        name="message"
                        rows={2}
                        placeholder="Tell us about your requirements, preferred package, or any special requests..."
                        value={formData.message}
                        onChange={handleChange}
                        maxLength={600}
                        aria-invalid={!!errors.message}
                        aria-describedby={describedBy("message")}
                      />
                    </div>
                    {renderError("message")}
                  </div>

                  {/* SUBMIT */}
                  <button type="submit" className="home-contact-submit">
                    <Send size={18} />
                    <span>Send Enquiry</span>
                    <ArrowRight size={18} />
                  </button>

                  <p className="home-contact-note">
                    <ShieldCheck size={16} fill="currentColor" strokeWidth={1.5} />
                    We’ll get back to you as soon as possible.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;
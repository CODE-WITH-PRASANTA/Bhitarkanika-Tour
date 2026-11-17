
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

import {
  MessageCircle,
  X,
  User,
  Mail,
  Phone,
  RefreshCw,
  Lock,
  Anchor,
  LifeBuoy,
  BadgeCheck,
  Users,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  CreditCard,
  MapPin,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";
import "./EnquireNow.css";

import enquireImage from "../../assets/ev-vechile-1.png";

// ============================================
// BUSINESS DETAILS
// ============================================

const BRAND_NAME = "Bhitarkanika Boat Service";
const CALL_NUMBER = "+918328982394";
const PHONE_DISPLAY = "+91 832 898 2394";
const WHATSAPP_NUMBER = "918328982394";
const API_ENQUIRY_URL = `${import.meta.env.VITE_API_BASE || "http://localhost:5000/api"}/enquiries`;

const SERVICES = [
  "Mangrove Boat Safari",
  "Migratory Birds Point",
  "Saltwater Crocodile Spotting",
  "White Crocodile (Gori) Visit",
  "Narrow Creek Cruise",
  "Jungle Trekking & Sky Walk",
  "Group / Family Package",
];

// ============================================
// FEATURES
// ============================================

const FEATURES = [
  {
    icon: <Anchor size={15} />,
    title: "Certified Captains",
    text: "Experienced local boatmen",
  },
  {
    icon: <LifeBuoy size={15} />,
    title: "Safety Jackets",
    text: "Provided on every trip",
  },
  {
    icon: <BadgeCheck size={15} />,
    title: "Eco-Tour Permits",
    text: "Authorised & guided",
  },
  {
    icon: <Users size={15} />,
    title: "Family Friendly",
    text: "Comfortable for all ages",
  },
];

// ============================================
// INITIAL FORM
// ============================================

const INITIAL_FORM = {
  fullName: "",
  email: "",
  mobile: "",
  homeTown: "",
  aadhar: "",
  service: "Bhitarkanika Boat Safari",
  captchaInput: "",
  agreeTerms: false,
};

// ============================================
// FIELD IDS
// ============================================

const FIELD_IDS = {
  fullName: "enquireNowFullName",
  email: "enquireNowEmail",
  mobile: "enquireNowMobile",
  homeTown: "enquireNowHomeTown",
  aadhar: "enquireNowAadhar",
  service: "enquireNowService",
  captchaInput: "enquireNowCaptcha",
  agreeTerms: "enquireNowTerms",
};

// ============================================
// WHATSAPP LINK
// Aadhaar is intentionally excluded.
// ============================================

const buildWhatsAppLink = ({
  fullName,
  email,
  mobile,
  homeTown,
  service,
}) => {
  const lines = [
    `Hello ${BRAND_NAME}! I would like to enquire about a boat safari.`,
    "",
    `Name: ${fullName}`,
    `Mobile: +91 ${mobile}`,
    homeTown ? `Home Town: ${homeTown}` : null,
    email ? `Email: ${email}` : null,
    service ? `Service: ${service}` : null,
  ].filter((line) => line !== null);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lines.join("\n")
  )}`;
};

// ============================================
// MAIN COMPONENT
// ============================================

const EnquireNow = ({
  triggerOnLoad = false,
  loadDelay = 3000,
  onFormSubmitSuccess,
  isInline = false,
}) => {
  const [isOpen, setIsOpen] = useState(isInline || false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [whatsAppLink, setWhatsAppLink] = useState("");
  const [captchaRaw, setCaptchaRaw] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(INITIAL_FORM);

  const firstInputRef = useRef(null);
  const paneRef = useRef(null);

  // ==========================================
  // CAPTCHA
  // ==========================================

  const generateCaptcha = useCallback(() => {
    const randomNum = Math.floor(
      100 + Math.random() * 900
    ).toString();

    setCaptchaRaw(randomNum);

    setFormData((prev) => ({
      ...prev,
      captchaInput: "",
    }));

    setErrors((prev) => ({
      ...prev,
      captchaInput: "",
    }));
  }, []);

  // ==========================================
  // OPEN / CLOSE
  // ==========================================

  const handleOpen = useCallback(() => {
    setErrors({});
    setIsSubmitted(false);
    generateCaptcha();
    setIsOpen(true);
  }, [generateCaptcha]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Inline initialization
  useEffect(() => {
    if (isInline) {
      setIsOpen(true);
      generateCaptcha();
    }
  }, [isInline, generateCaptcha]);

  // Automatic popup
  useEffect(() => {
    if (isInline || !triggerOnLoad) return undefined;

    const timer = setTimeout(handleOpen, loadDelay);

    return () => clearTimeout(timer);
  }, [isInline, triggerOnLoad, loadDelay, handleOpen]);

  // Focus first input
  useEffect(() => {
    if (!isOpen || isInline) return undefined;

    const timer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 350);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Scroll to top on success
  useEffect(() => {
    if (isSubmitted) {
      paneRef.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [isSubmitted]);

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return undefined;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  // ==========================================
  // INPUT HANDLING
  // ==========================================

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    let nextValue =
      type === "checkbox" ? checked : value;

    // Mobile: only 10 digits
    if (name === "mobile") {
      nextValue = value.replace(/\D/g, "").slice(0, 10);
    }

    // Aadhaar / Passport: alphanumeric up to 16 chars
    if (name === "aadhar") {
      nextValue = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 16);
    }

    // CAPTCHA: only 3 digits
    if (name === "captchaInput") {
      nextValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = () => {
    const next = {};

    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const mobile = formData.mobile.trim();
    const homeTown = formData.homeTown.trim();
    const aadhar = formData.aadhar.trim();

    if (fullName.length < 6) {
      next.fullName =
        "Please enter your full name (at least 6 characters).";
    }

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      next.email = "Please enter a valid email address.";
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      next.mobile =
        "Please enter a valid 10 digit Indian mobile number.";
    }

    if (!homeTown || homeTown.length < 2) {
      next.homeTown = "Please enter your home town or city.";
    }

    // Mandatory Aadhaar / Passport validation
    const isAadhaar = /^\d{12}$/.test(aadhar);
    const isPassport = /^[A-Z0-9]{6,16}$/i.test(aadhar);
    if (!isAadhaar && !isPassport) {
      next.aadhar =
        "Please enter a valid 12-digit Aadhaar number or Passport number.";
    }

    if (formData.captchaInput.trim() !== captchaRaw) {
      next.captchaInput =
        "Code does not match. Please try again.";
    }

    if (!formData.agreeTerms) {
      next.agreeTerms =
        "Please agree to the Terms & Conditions to continue.";
    }

    setErrors(next);

    const firstKey = Object.keys(FIELD_IDS).find(
      (key) => next[key]
    );

    if (firstKey) {
      if (firstKey === "captchaInput") {
        generateCaptcha();
      }

      setTimeout(() => {
        document
          .getElementById(FIELD_IDS[firstKey])
          ?.focus();
      }, 0);

      return false;
    }

    return true;
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const payload = {
      name: formData.fullName.trim(),
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.mobile.trim(),
      mobile: formData.mobile.trim(),
      homeTown: formData.homeTown.trim(),
      aadhar: formData.aadhar.trim(),
      tour: formData.service || "Bhitarkanika Boat Safari",
      service: formData.service || "Bhitarkanika Boat Safari",
      subject: `Safari Booking Enquiry - ${formData.service || "Bhitarkanika Boat Safari"}`,
      message: `Home Town: ${formData.homeTown.trim()}${
        formData.aadhar.trim() ? ` | ID / Aadhaar: ${formData.aadhar.trim()}` : ""
      }`,
    };

    try {
      await fetch(API_ENQUIRY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Enquiry save error:", err);
    } finally {
      setIsSubmitting(false);
    }

    setWhatsAppLink(buildWhatsAppLink(payload));

    setSubmittedName(
      payload.fullName.split(" ")[0]
    );

    setIsSubmitted(true);
    setFormData(INITIAL_FORM);
    setErrors({});
    generateCaptcha();

    if (onFormSubmitSuccess) {
      onFormSubmitSuccess(payload);
    }
  };

  // ==========================================
  // ERROR RENDER
  // ==========================================

  const renderError = (key) =>
    errors[key] ? (
      <p
        id={`${FIELD_IDS[key]}Error`}
        className="enquire-now-error"
        role="alert"
      >
        {errors[key]}
      </p>
    ) : null;

  const captchaSpaced = captchaRaw
    ? captchaRaw.split("").join(" ")
    : "...";

  // ==========================================
  // CARD BODY
  // ==========================================

  const renderCardBody = () => (
    <>
      {/* CLOSE BUTTON */}
      {!isInline && (
        <button
          type="button"
          className="enquire-now-close"
          onClick={handleClose}
          aria-label="Close enquiry form"
        >
          <X size={18} strokeWidth={2.2} />
        </button>
      )}

      {/* FORM PANE (Centerpiece) */}
      <div
        className="enquire-now-pane"
        ref={paneRef}
      >
        {/* FORM HEADER */}
        <div className="enquire-now-header">
          <div className="enquire-now-header-chips">
            <span className="enquire-now-form-badge">
              <Sparkles size={13} />
              <span>QUICK ENQUIRY</span>
            </span>
            <span className="enquire-now-verified-chip">
              <ShieldCheck size={13} />
              <span>Forest Dept. Authorized</span>
            </span>
          </div>

          <h3
            id="enquireNowTitle"
            className="enquire-now-title"
          >
            Plan Your Boat Safari
          </h3>

          <p className="enquire-now-subtitle">
            Fill in your details below to check live boat availability and tide timings. We respond directly via WhatsApp with vessel confirmation.
          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="enquire-now-form"
          noValidate
        >

              {/* FULL NAME */}

              <div className="enquire-now-field">
                <label
                  htmlFor={FIELD_IDS.fullName}
                  className="enquire-now-label"
                >
                  Full name
                </label>

                <div className="enquire-now-input-wrap">
                  <User
                    className="enquire-now-input-icon"
                    size={17}
                    aria-hidden="true"
                  />

                  <input
                    ref={firstInputRef}
                    id={FIELD_IDS.fullName}
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    maxLength={80}
                    autoComplete="name"
                    aria-invalid={!!errors.fullName}
                    aria-describedby={
                      errors.fullName
                        ? `${FIELD_IDS.fullName}Error`
                        : undefined
                    }
                    required
                  />
                </div>

                {renderError("fullName")}
              </div>

              {/* EMAIL */}

              <div className="enquire-now-field">
                <label
                  htmlFor={FIELD_IDS.email}
                  className="enquire-now-label"
                >
                  Email address <em>Optional</em>
                </label>

                <div className="enquire-now-input-wrap">
                  <Mail
                    className="enquire-now-input-icon"
                    size={17}
                    aria-hidden="true"
                  />

                  <input
                    id={FIELD_IDS.email}
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email
                        ? `${FIELD_IDS.email}Error`
                        : undefined
                    }
                  />
                </div>

                {renderError("email")}
              </div>

              {/* MOBILE NUMBER */}

              <div className="enquire-now-field">
                <label
                  htmlFor={FIELD_IDS.mobile}
                  className="enquire-now-label"
                >
                  Mobile number
                </label>

                <div className="enquire-now-input-wrap">
                  <Phone
                    className="enquire-now-input-icon"
                    size={17}
                    aria-hidden="true"
                  />

                  <span className="enquire-now-prefix">
                    +91
                  </span>

                  <input
                    id={FIELD_IDS.mobile}
                    className="enquire-now-input-prefixed"
                    type="tel"
                    name="mobile"
                    placeholder="10 digit mobile number"
                    maxLength={10}
                    value={formData.mobile}
                    onChange={handleChange}
                    autoComplete="tel-national"
                    inputMode="numeric"
                    aria-invalid={!!errors.mobile}
                    aria-describedby={
                      errors.mobile
                        ? `${FIELD_IDS.mobile}Error`
                        : undefined
                    }
                    required
                  />
                </div>

                {renderError("mobile")}
              </div>

              {/* HOME TOWN */}

              <div className="enquire-now-field">
                <label
                  htmlFor={FIELD_IDS.homeTown}
                  className="enquire-now-label"
                >
                  Home town <em>Required</em>
                </label>

                <div className="enquire-now-input-wrap">
                  <MapPin
                    className="enquire-now-input-icon"
                    size={17}
                    aria-hidden="true"
                  />

                  <input
                    id={FIELD_IDS.homeTown}
                    type="text"
                    name="homeTown"
                    placeholder="Enter your home town / city"
                    value={formData.homeTown}
                    onChange={handleChange}
                    maxLength={60}
                    autoComplete="address-level2"
                    aria-invalid={!!errors.homeTown}
                    aria-describedby={
                      errors.homeTown
                        ? `${FIELD_IDS.homeTown}Error`
                        : undefined
                    }
                    required
                  />
                </div>

                {renderError("homeTown")}
              </div>

              {/* =================================
                        AADHAAR / PASSPORT NUMBER INPUT
                    ================================= */}

              <div className="enquire-now-field">
                <label
                  htmlFor={FIELD_IDS.aadhar}
                  className="enquire-now-label"
                >
                  Aadhaar number / Passport number <em>Required</em>
                </label>

                <div className="enquire-now-input-wrap">
                  <CreditCard
                    className="enquire-now-input-icon"
                    size={17}
                    aria-hidden="true"
                  />

                  <input
                    id={FIELD_IDS.aadhar}
                    type="text"
                    name="aadhar"
                    placeholder="Enter 12-digit Aadhaar or Passport"
                    value={formData.aadhar}
                    onChange={handleChange}
                    maxLength={16}
                    autoComplete="off"
                    aria-invalid={!!errors.aadhar}
                    aria-describedby={
                      errors.aadhar
                        ? `${FIELD_IDS.aadhar}Error`
                        : undefined
                    }
                    required
                  />
                </div>

                {renderError("aadhar")}
              </div>

              {/* CAPTCHA */}

              <div className="enquire-now-field">
                <label
                  htmlFor={FIELD_IDS.captchaInput}
                  className="enquire-now-label"
                >
                  Security check
                </label>

                <div className="enquire-now-captcha-row">

                  <div
                    className="enquire-now-captcha-box"
                    aria-label={`Security code ${captchaSpaced}`}
                  >
                    {captchaSpaced}
                  </div>

                  <input
                    id={FIELD_IDS.captchaInput}
                    type="text"
                    name="captchaInput"
                    placeholder="Enter code"
                    className="enquire-now-captcha-input"
                    value={formData.captchaInput}
                    onChange={handleChange}
                    maxLength={3}
                    autoComplete="off"
                    inputMode="numeric"
                    aria-invalid={!!errors.captchaInput}
                    aria-describedby={
                      errors.captchaInput
                        ? `${FIELD_IDS.captchaInput}Error`
                        : undefined
                    }
                  />

                  <button
                    type="button"
                    className="enquire-now-captcha-refresh"
                    onClick={generateCaptcha}
                    aria-label="Generate a new code"
                  >
                    <RefreshCw size={17} />
                  </button>

                </div>

                {renderError("captchaInput")}
              </div>

              {/* TERMS */}

              <div className="enquire-now-terms-wrap">
                <div className="enquire-now-terms">

                  <input
                    type="checkbox"
                    id={FIELD_IDS.agreeTerms}
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    aria-invalid={!!errors.agreeTerms}
                  />

                  <label htmlFor={FIELD_IDS.agreeTerms}>
                    I agree to the{" "}
                    <a
                      href="/terms"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Terms &amp; Conditions
                    </a>{" "}
                    of {BRAND_NAME}.
                  </label>

                </div>

                {renderError("agreeTerms")}
              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="enquire-now-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting enquiry..." : "Submit enquiry"}
                <ArrowRight size={17} />
              </button>

              {/* SUCCESS BANNER BELOW SUBMIT */}
              {isSubmitted && (
                <div className="enquire-now-success-banner" role="status">
                  <CheckCircle2
                    size={22}
                    className="enquire-now-success-banner-icon"
                  />
                  <div className="enquire-now-success-banner-body">
                    <strong className="enquire-now-success-banner-title">
                      Thank you for booking{submittedName ? `, ${submittedName}` : ""}!
                    </strong>
                    <p className="enquire-now-success-banner-msg">
                      Your enquiry has been received successfully. Our team will contact you shortly.
                    </p>
                  </div>
                </div>
              )}

            </form>
          </div>
        </>
      );

  return (
    <>
      {/* SIDE ENQUIRE BUTTON */}
      {!isInline && !isOpen && (
        <button
          type="button"
          className="enquire-now-trigger"
          onClick={handleOpen}
          aria-label="Open enquiry form"
        >
          <span
            className="enquire-now-trigger-dot"
            aria-hidden="true"
          />

          <span
            className="enquire-now-trigger-icon"
            aria-hidden="true"
          >
            <MessageCircle size={17} strokeWidth={2} />
          </span>

          <span className="enquire-now-trigger-text">
            ENQUIRE NOW
          </span>
        </button>
      )}

      {/* INLINE EMBED OR MODAL */}
      {isInline ? (
        <div className="enquire-now-inline-wrapper">
          <div className="enquire-now-card enquire-now-card--inline">
            {renderCardBody()}
          </div>
        </div>
      ) : (
        isOpen && (
          <div
            className="enquire-now-backdrop"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                handleClose();
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquireNowTitle"
          >
            <div className="enquire-now-card">
              {renderCardBody()}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default EnquireNow;

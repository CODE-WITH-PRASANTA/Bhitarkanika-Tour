
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
  aadhar: "",
  service: "",
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
  service,
}) => {
  const lines = [
    `Hello ${BRAND_NAME}! I would like to enquire about a boat safari.`,
    "",
    `Name: ${fullName}`,
    `Mobile: +91 ${mobile}`,
    email ? `Email: ${email}` : null,
    `Service: ${service}`,
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  // Automatic popup
  useEffect(() => {
    if (!triggerOnLoad) return undefined;

    const timer = setTimeout(handleOpen, loadDelay);

    return () => clearTimeout(timer);
  }, [triggerOnLoad, loadDelay, handleOpen]);

  // Focus first input
  useEffect(() => {
    if (!isOpen) return undefined;

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

    // Aadhaar: only 12 digits
    if (name === "aadhar") {
      nextValue = value.replace(/\D/g, "").slice(0, 12);
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

    // Mandatory Aadhaar validation
    if (!/^\d{12}$/.test(aadhar)) {
      next.aadhar =
        "Please enter a valid 12-digit Aadhaar number.";
    }

    if (!formData.service) {
      next.service = "Please select a service.";
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    // Aadhaar is deliberately not sent to WhatsApp.
    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      mobile: formData.mobile.trim(),
      service: formData.service,
    };

    setWhatsAppLink(buildWhatsAppLink(payload));

    setSubmittedName(
      payload.fullName.split(" ")[0]
    );

    setIsSubmitted(true);
    setFormData(INITIAL_FORM);
    setErrors({});

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
  // JSX
  // ==========================================

  return (
    <>
      {/* SIDE ENQUIRE BUTTON */}

      {!isOpen && (
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

      {/* MODAL */}

      {isOpen && (
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

            {/* CLOSE BUTTON */}

            <button
              type="button"
              className="enquire-now-close"
              onClick={handleClose}
              aria-label="Close enquiry form"
            >
              <X size={18} strokeWidth={2.2} />
            </button>

            {/* LEFT PROMO SECTION */}

            <div
              className="enquire-now-promo"
              style={{
                backgroundImage: `url(${enquireImage})`,
              }}
            >
              <div className="enquire-now-promo-overlay" />

              <div className="enquire-now-promo-content">

                <div className="enquire-now-promo-top">

                  <div className="enquire-now-badge">
                    <span className="enquire-now-badge-dot" />
                    Authorised Boat Safaris · Odisha
                  </div>

                  <h2 className="enquire-now-promo-title">
                    Sail into untouched nature with{" "}
                    <span>{BRAND_NAME}</span>
                  </h2>

                  <p className="enquire-now-promo-desc">
                    Glide through the quiet creeks of
                    Bhitarkanika, spot saltwater crocodiles
                    and migratory birds, and explore the
                    mangroves with trained local boatmen.
                  </p>

                </div>

                <div className="enquire-now-feature-grid">
                  {FEATURES.map((item) => (
                    <div
                      className="enquire-now-feature"
                      key={item.title}
                    >
                      <span className="enquire-now-feature-icon">
                        {item.icon}
                      </span>

                      <div>
                        <strong>{item.title}</strong>
                        <small>{item.text}</small>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href={`tel:${CALL_NUMBER}`}
                  className="enquire-now-call-btn"
                >
                  <span className="enquire-now-call-icon">
                    <PhoneCall size={16} />
                  </span>

                  <span className="enquire-now-call-text">
                    <small>Call us now</small>
                    <strong>{PHONE_DISPLAY}</strong>
                  </span>
                </a>

              </div>
            </div>

            {/* RIGHT FORM SECTION */}

            <div
              className="enquire-now-pane"
              ref={paneRef}
            >
              {isSubmitted ? (

                /* SUCCESS SCREEN */

                <div
                  className="enquire-now-success"
                  role="status"
                >
                  <span className="enquire-now-success-icon">
                    <CheckCircle2
                      size={34}
                      strokeWidth={1.8}
                    />
                  </span>

                  <h3
                    className="enquire-now-success-title"
                    id="enquireNowTitle"
                  >
                    Almost done
                    {submittedName
                      ? `, ${submittedName}`
                      : ""}
                    !
                  </h3>

                  <p className="enquire-now-success-text">
                    Your details are ready. Tap{" "}
                    <strong>Open WhatsApp</strong> and
                    press <strong>Send</strong> in the chat
                    to complete your enquiry. We will reply
                    with availability and timings.
                  </p>

                  <div className="enquire-now-success-actions">

                    <a
                      href={whatsAppLink}
                      target="_blank"
                      rel="noreferrer"
                      className="enquire-now-wa-btn"
                    >
                      <FaWhatsapp size={18} />
                      Open WhatsApp
                    </a>

                    <a
                      href={`tel:${CALL_NUMBER}`}
                      className="enquire-now-ghost-btn"
                    >
                      <PhoneCall size={15} />
                      {PHONE_DISPLAY}
                    </a>

                  </div>
                </div>

              ) : (

                <>
                  {/* FORM HEADER */}

                  <div className="enquire-now-header">
                    <span className="enquire-now-form-badge">
                      Quick enquiry
                    </span>

                    <h3
                      id="enquireNowTitle"
                      className="enquire-now-title"
                    >
                      Plan your boat safari
                    </h3>

                    <p className="enquire-now-subtitle">
                      Fill in your details and send them
                      to us on WhatsApp. We will reply
                      with availability and timings.
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

                    {/* =================================
                        AADHAAR NUMBER INPUT
                    ================================= */}

                    <div className="enquire-now-field">
                      <label
                        htmlFor={FIELD_IDS.aadhar}
                        className="enquire-now-label"
                      >
                        Aadhaar number <em>Required</em>
                      </label>

                      <div className="enquire-now-input-wrap">
                        <CreditCard
                          className="enquire-now-input-icon"
                          size={17}
                          aria-hidden="true"
                        />

                        <input
                          id={FIELD_IDS.aadhar}
                          className="enquire-now-input-prefixed"
                          type="text"
                          name="aadhar"
                          placeholder="Enter 12-digit Aadhaar number"
                          value={formData.aadhar}
                          onChange={handleChange}
                          maxLength={12}
                          inputMode="numeric"
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

                      <small className="enquire-now-aadhar-note">
                        Enter exactly 12 digits. Your Aadhaar
                        number will not be shared through WhatsApp.
                      </small>
                    </div>

                    {/* SERVICE DROPDOWN */}

                   

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
                    >
                      Submit enquiry
                      <ArrowRight size={17} />
                    </button>

                    <p className="enquire-now-secure-text">
                      <Lock size={12} />
                      Your details are used only to contact
                      you about this enquiry.
                    </p>

                    {/* MOBILE CALL */}

                    <a
                      href={`tel:${CALL_NUMBER}`}
                      className="enquire-now-mobile-call"
                    >
                      <PhoneCall size={16} />
                      Prefer to talk? Call {PHONE_DISPLAY}
                    </a>

                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnquireNow;

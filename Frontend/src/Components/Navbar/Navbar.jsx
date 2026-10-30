import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ChevronDown,
  Headset,
  ArrowUpRight,
  Menu,
  X,
  CalendarDays,
  Plus,
  Minus,
  CheckCircle2,
} from "lucide-react";
import "./Navbar.css";

const services = [
  { title: "Boat Booking", path: "/services/boat-service" },
  { title: "Migratory Birds Point", path: "/services/migratory-birds-point" },
  { title: "Saltwater Crocodiles", path: "/services/saltwater-crocodiles" },
  { title: "Mangrove Forests", path: "/services/mangrove-forests" },
  { title: "Sky Walk", path: "/services/sky-walk" },
  { title: "Deer", path: "/services/deer" },
  { title: "White Crocodile (Gori)", path: "/services/white-crocodile" },
  { title: "Jungle Trekking", path: "/services/jungle-trekking" },
  { title: "Museum", path: "/services/museum" },
  { title: "EV Vehicle Service", path: "/services/ev-vehicle-service" },
  { title: "Narrow Creek", path: "/services/narrow-creek" },
  { title: "Olive Ridley Turtles", path: "/services/olive-ridley-turtles" },
  { title: "Sea Food", path: "/services/sea-food" },
  {
    title: "Hunting Tower",
    subtitle: "Built by the Kanika Royal Family",
    path: "/services/hunting-tower",
  },
];

const links = [
  { title: "Home", path: "/", end: true },
  { title: "About", path: "/about" },
  { title: "Gallery", path: "/gallery" },
  { title: "Blog", path: "/blog" },
  { title: "FAQ", path: "/faq" },
  { title: "Contact Us", path: "/contact" },
];

const boatPackages = [
  "Jaynagar Boat Package",
  "Khola Boat Package",
  "Photography Boat Package",
];

const initialForm = {
  fullName: "",
  adults: 1,
  children: 0,
  date: "",
  time: "",
  phone: "",
  aadhar: "",
  email: "",
  place: "",
  boatPackage: "",
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  const closeBooking = () => {
    setBookingOpen(false);
    setBookingSuccess(false);
  };

  const updateField = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateCount = (field, amount) => {
    setFormData((prev) => ({
      ...prev,
      [field]: Math.max(
        field === "adults" ? 1 : 0,
        Math.min(20, prev[field] + amount)
      ),
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (formData.aadhar.length !== 12) {
      alert("Please enter a valid 12-digit Aadhaar number.");
      return;
    }

    if (!formData.boatPackage) {
      alert("Please select a boat package.");
      return;
    }

    // Connect your booking API here.
    console.log("Boat Booking Details:", formData);

    setBookingSuccess(true);
  };

  const openBooking = () => {
    closeMenu();
    setFormData(initialForm);
    setBookingSuccess(false);
    setBookingOpen(true);
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">

          {/* Mobile Menu */}
          <button
            type="button"
            className="navbar-mobile-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>

          {/* Navigation */}
          <nav
            className={`navbar-navigation ${
              menuOpen ? "navbar-navigation-open" : ""
            }`}
            aria-label="Main navigation"
          >
            <div className="navbar-links">
              {links.slice(0, 2).map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.end}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `navbar-link ${
                      isActive ? "navbar-link-active" : ""
                    }`
                  }
                >
                  {link.title}
                </NavLink>
              ))}

              {/* Services Dropdown */}
              <div
                className={`navbar-services ${
                  servicesOpen ? "navbar-services-open" : ""
                }`}
                onMouseEnter={() => {
                  if (window.matchMedia("(min-width: 993px)").matches) {
                    setServicesOpen(true);
                  }
                }}
                onMouseLeave={() => {
                  if (window.matchMedia("(min-width: 993px)").matches) {
                    setServicesOpen(false);
                  }
                }}
              >
                <button
                  type="button"
                  className="navbar-link navbar-services-trigger"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  onClick={() => setServicesOpen((prev) => !prev)}
                >
                 Boat Booking
                  <ChevronDown
                    size={15}
                    className="navbar-chevron"
                  />
                </button>

                <div className="navbar-services-dropdown">
                  <div className="navbar-dropdown-heading">
                    <span className="navbar-dropdown-label">
                      EXPLORE WILDDALE
                    </span>
                    <h3>Our Services</h3>
                  </div>

                  <div className="navbar-services-list">
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className="navbar-service-link"
                        onClick={closeMenu}
                      >
                        <span className="navbar-service-text">
                          <span className="navbar-service-title">
                            {service.title}
                          </span>

                          {service.subtitle && (
                            <span className="navbar-service-subtitle">
                              {service.subtitle}
                            </span>
                          )}
                        </span>

                        <ArrowUpRight
                          size={14}
                          className="navbar-service-arrow"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {links.slice(2).map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `navbar-link ${
                      isActive ? "navbar-link-active" : ""
                    }`
                  }
                >
                  {link.title}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Right Side */}
          <div className="navbar-right">
            <a
              href="tel:+918328982394"
              className="navbar-support"
              aria-label="Call our 24/7 support hotline"
            >
              <span className="navbar-support-icon">
                <Headset size={27} strokeWidth={1.7} />
              </span>

              <span className="navbar-support-text">
                <span className="navbar-support-label">
                  24/7 Hotline
                </span>
                <span className="navbar-support-number">
                  +91 832 898 2394
                </span>
              </span>
            </a>

            <button
              type="button"
              className="navbar-book-button"
              onClick={openBooking}
            >
              <span>Book Your Boat</span>
              <span className="navbar-book-icon">
                <ArrowUpRight size={18} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= BOOKING MODAL ================= */}

      {bookingOpen && (
        <div
          className="boat-booking-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeBooking();
          }}
        >
          <div
            className="boat-booking-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="boat-booking-title"
          >
            <div className="boat-booking-header">
              <div>
                <span className="boat-booking-eyebrow">
                  EXPLORE BHITARKANIKA
                </span>
                <h2 id="boat-booking-title">Book Your Boat</h2>
                <p>
                  Plan your journey and enjoy a memorable boat experience.
                </p>
              </div>

              <button
                type="button"
                className="boat-booking-close"
                onClick={closeBooking}
                aria-label="Close booking form"
              >
                <X size={22} />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="boat-booking-success">
                <span className="boat-booking-success-icon">
                  <CheckCircle2 size={48} />
                </span>

                <h3>Booking Request Submitted!</h3>
                <p>
                  Thank you, {formData.fullName}. Your booking request
                  for {formData.boatPackage} has been recorded.
                  Our team will contact you soon.
                </p>

                <button
                  type="button"
                  onClick={closeBooking}
                  className="boat-booking-submit"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                className="boat-booking-form"
                onSubmit={handleBookingSubmit}
              >
                {/* Full Name */}
                <div className="boat-booking-field boat-booking-full">
                  <label htmlFor="booking-fullName">
                    Full name <span>*</span>
                  </label>
                  <input
                    id="booking-fullName"
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={updateField}
                    required
                  />
                </div>

                {/* Adults and Children */}
                <div className="boat-booking-grid">
                  <div className="boat-booking-field">
                    <label>Adults</label>
                    <div className="boat-booking-counter">
                      <button
                        type="button"
                        onClick={() => updateCount("adults", -1)}
                        aria-label="Decrease adults"
                        disabled={formData.adults <= 1}
                      >
                        <Minus size={18} />
                      </button>

                      <strong>{formData.adults}</strong>

                      <button
                        type="button"
                        onClick={() => updateCount("adults", 1)}
                        aria-label="Increase adults"
                        disabled={formData.adults >= 20}
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="boat-booking-field">
                    <label>Children</label>
                    <div className="boat-booking-counter">
                      <button
                        type="button"
                        onClick={() => updateCount("children", -1)}
                        aria-label="Decrease children"
                        disabled={formData.children <= 0}
                      >
                        <Minus size={18} />
                      </button>

                      <strong>{formData.children}</strong>

                      <button
                        type="button"
                        onClick={() => updateCount("children", 1)}
                        aria-label="Increase children"
                        disabled={formData.children >= 20}
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="boat-booking-grid">
                  <div className="boat-booking-field">
                    <label htmlFor="booking-date">
                      Choose date <span>*</span>
                    </label>
                    <div className="boat-booking-input-icon">
                      <input
                        id="booking-date"
                        type="date"
                        name="date"
                        min={new Date().toLocaleDateString("en-CA")}
                        value={formData.date}
                        onChange={updateField}
                        required
                      />
                      <CalendarDays size={19} />
                    </div>
                  </div>

                  <div className="boat-booking-field">
                    <label htmlFor="booking-time">
                      Choose time <span>*</span>
                    </label>
                    <select
                      id="booking-time"
                      name="time"
                      value={formData.time}
                      onChange={updateField}
                      required
                    >
                      <option value="">Select a time</option>
                      <option value="06:00 AM">06:00 AM</option>
                      <option value="07:00 AM">07:00 AM</option>
                      <option value="08:00 AM">08:00 AM</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Phone and Aadhaar */}
                <div className="boat-booking-grid">
                  <div className="boat-booking-field">
                    <label htmlFor="booking-phone">
                      Phone number <span>*</span>
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      name="phone"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10),
                        }))
                      }
                      pattern="[0-9]{10}"
                      maxLength={10}
                      inputMode="numeric"
                      required
                    />
                  </div>

                  <div className="boat-booking-field">
                    <label htmlFor="booking-aadhar">
                      Aadhaar number <span>*</span>
                    </label>
                    <input
                      id="booking-aadhar"
                      type="text"
                      name="aadhar"
                      placeholder="12-digit Aadhaar number"
                      value={formData.aadhar}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          aadhar: e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 12),
                        }))
                      }
                      pattern="[0-9]{12}"
                      maxLength={12}
                      inputMode="numeric"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="boat-booking-field boat-booking-full">
                  <label htmlFor="booking-email">
                    Email address <span>*</span>
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={updateField}
                    required
                  />
                </div>

                {/* Boat Package */}
                <div className="boat-booking-field boat-booking-full">
                  <label htmlFor="booking-package">
                    Choose boat package <span>*</span>
                  </label>
                  <select
                    id="booking-package"
                    name="boatPackage"
                    value={formData.boatPackage}
                    onChange={updateField}
                    required
                  >
                    <option value="">Select a boat package</option>
                    {boatPackages.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit */}
                <div className="boat-booking-footer">
                  <p>
                    <span>*</span> Required fields
                  </p>

                  <button
                    type="submit"
                    className="boat-booking-submit"
                  >
                    Submit Booking
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
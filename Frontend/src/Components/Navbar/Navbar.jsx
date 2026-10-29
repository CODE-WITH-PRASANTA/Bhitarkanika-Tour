
  import React, { useState } from "react";
  import { Link, NavLink } from "react-router-dom";
  import {
    ChevronDown,
    Headset,
    ArrowUpRight,
    Menu,
    X,
  } from "lucide-react";
  import "./Navbar.css";

  const services = [
    { title: "Boat Service", path: "/services/boat-service" },
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

  const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    const closeMenu = () => {
      setMenuOpen(false);
      setServicesOpen(false);
    };

    return (
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

          {/* Navigation Links */}
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
                    `navbar-link ${isActive ? "navbar-link-active" : ""}`
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
                  Services
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
                    `navbar-link ${isActive ? "navbar-link-active" : ""}`
                  }
                >
                  {link.title}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Right Side: Support and Booking */}
          <div className="navbar-right">
            <a
              href="tel:+91 832 898 2394"
              className="navbar-support"
              aria-label="Call our 24/7 support hotline"
            >
              <span className="navbar-support-icon">
                <Headset size={27} strokeWidth={1.7} />
              </span>

              <span className="navbar-support-text">
                <span className="navbar-support-label">24/7 Hotline</span>
                <span className="navbar-support-number">
                  +91 832 898 2394
                </span>
              </span>
            </a>

            <Link
              to="/book-appointment"
              className="navbar-book-button"
              onClick={closeMenu}
            >
              <span>Book Your Story</span>
              <span className="navbar-book-icon">
                <ArrowUpRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </header>
    );
  };

  export default Navbar;

import React from "react";
import {
  MapPin,
  Mail,
  Phone,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaLinkedinIn,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/mlogo.png";
import "./Footer.css";

// ============================================
// BUSINESS DETAILS
// ============================================

const BRAND_NAME = "Bhitarkanika Boat Service";
const BRAND_TAGLINE =
  "Authorised mangrove boat safaris · Kendrapara, Odisha";

const ADDRESS =
  "Khola Boating Point, Rajnagar, Kendrapara, Odisha, 754248";

const EMAIL = "bhitarkanikaboatservice@gmail.com";

const PHONE_DISPLAY = "+91 832 898 2394";
const PHONE_TEL = "+918328982394";

const WHATSAPP_URL = `https://wa.me/918328982394?text=${encodeURIComponent(
  "Hello Bhitarkanika Boat Service! I would like to know about safari boat availability."
)}`;

// ============================================
// FOOTER SERVICES
// ============================================

const footerServices = [
  { title: "Boat Booking", path: "/services/boat-service" },
  {
    title: "Migratory Birds Point",
    path: "/services/migratory-birds-point",
  },
  {
    title: "Saltwater Crocodiles",
    path: "/services/saltwater-crocodiles",
  },
  { title: "Mangrove Forests", path: "/services/mangrove-forests" },
  { title: "Sky Walk", path: "/services/sky-walk" },
  { title: "Deer Park", path: "/services/deer" },
  {
    title: "White Crocodile (Gori)",
    path: "/services/white-crocodile",
  },
  { title: "Jungle Trekking", path: "/services/jungle-trekking" },
  { title: "Museum", path: "/services/museum" },
  {
    title: "EV Vehicle Service",
    path: "/services/ev-vehicle-service",
  },
  { title: "Narrow Creek", path: "/services/narrow-creek" },
  {
    title: "Olive Ridley Turtles",
    path: "/services/olive-ridley-turtles",
  },
  { title: "Sea Food Corner", path: "/services/sea-food" },
  { title: "Hunting Tower", path: "/services/hunting-tower" },
];

// ============================================
// RECENT POSTS
// ============================================

const footerPosts = [
  {
    title: "10 Amazing Wildlife Travel Adventures To Try!",
    category: "Travel",
    date: "August 19, 2024",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=300&q=80",
    path: "/blog/wildlife-travel-adventures",
  },
  {
    title: "The Beauty of Wildlife and Mangrove Ecosystems",
    category: "Mangroves",
    date: "August 10, 2024",
    image:
      "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=300&q=80",
    path: "/blog/beauty-of-wildlife",
  },
];

// ============================================
// FOOTER NAVIGATION
// ============================================

const footerNavigation = [
  { title: "Home", path: "/" },
  { title: "About Us", path: "/about" },
  { title: "Boat Booking", path: "/services/boat-service" },
  { title: "Gallery", path: "/gallery" },
  { title: "Blog", path: "/blog" },
  { title: "Contact Us", path: "/contact" },
];

// ============================================
// SOCIAL LINKS
// ============================================

const socialLinks = [
  {
    label: "WhatsApp",
    href: WHATSAPP_URL,
    className: "footer-social-whatsapp",
    icon: <FaWhatsapp />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    className: "footer-social-facebook",
    icon: <FaFacebookF />,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/",
    className: "footer-social-twitter",
    icon: <FaTwitter />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    className: "footer-social-instagram",
    icon: <FaInstagram />,
  },
  {
    label: "Justdial",
    href: "https://www.justdial.com/",
    className: "footer-social-justdial",
    icon: <span className="footer-justdial-logo">JD</span>,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    className: "footer-social-linkedin",
    icon: <FaLinkedinIn />,
  },
];

// ============================================
// FOOTER COMPONENT
// ============================================

const Footer = () => {
  const location = useLocation();

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">

      {/* TOP CONTACT BAR */}

      <div className="footer-contact-bar">
        <div className="footer-container footer-contact-container">

          <Link
            to="/"
            onClick={handleLinkClick}
            className="footer-brand"
            aria-label={`${BRAND_NAME} home`}
          >
            <img
              src={logo}
              alt={`${BRAND_NAME} logo`}
              className="footer-logo"
            />

            <span className="footer-brand-text">
              <strong>{BRAND_NAME}</strong>
              <small>{BRAND_TAGLINE}</small>
            </span>
          </Link>

          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <MapPin size={20} />
            </div>

            <div className="footer-contact-content">
              <span className="footer-label">Location</span>
              <p>{ADDRESS}</p>
            </div>
          </div>

          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <Mail size={20} />
            </div>

            <div className="footer-contact-content">
              <span className="footer-label">Email Us</span>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
          </div>

          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <Phone size={20} />
            </div>

            <div className="footer-contact-content">
              <span className="footer-label">Call Us</span>
              <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
            </div>
          </div>

        </div>
      </div>

      {/* MAIN FOOTER */}

      <div className="footer-main">
        <div className="footer-container">

          <div className="footer-content-grid">

            {/* SERVICES */}

            <div className="footer-column footer-services">
              <h3 className="footer-heading">
                Explore Bhitarkanika
              </h3>

              <ul className="footer-services-list">
                {footerServices.map((service) => (
                  <li
                    key={service.path}
                    className="footer-services-item"
                  >
                    <Link
                      to={service.path}
                      onClick={handleLinkClick}
                      className={
                        location.pathname === service.path
                          ? "active-link"
                          : ""
                      }
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* RECENT POSTS */}

            <div className="footer-column footer-recent-posts">
              <h3 className="footer-heading">
                Our Recent Posts
              </h3>

              <div className="footer-posts-list">
                {footerPosts.map((post) => (
                  <article
                    className="footer-post-card"
                    key={post.title}
                  >
                    <Link
                      to={post.path}
                      onClick={handleLinkClick}
                      className="footer-post-image-link"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <img
                        src={post.image}
                        alt=""
                        className="footer-post-image"
                        loading="lazy"
                      />
                    </Link>

                    <div className="footer-post-content">
                      <span className="footer-post-category">
                        {post.category}
                      </span>

                      <Link
                        to={post.path}
                        onClick={handleLinkClick}
                        className="footer-post-title"
                      >
                        {post.title}
                      </Link>

                      <span className="footer-post-date">
                        <CalendarDays size={12} />
                        {post.date}
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              <Link
                to="/blog"
                onClick={handleLinkClick}
                className="footer-posts-all"
              >
                View all posts <ArrowRight size={13} />
              </Link>
            </div>

            {/* QUICK LINKS AND SOCIAL */}

            <div className="footer-column footer-quick">
              <h3 className="footer-heading">
                Quick Links
              </h3>

              <nav
                className="footer-quick-list"
                aria-label="Footer quick navigation"
              >
                {footerNavigation.map((item) => (
                  <Link
                    to={item.path}
                    key={item.title}
                    onClick={handleLinkClick}
                    className={`footer-quick-link ${
                      location.pathname === item.path
                        ? "active-nav-link"
                        : ""
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>

              {/* SOCIAL MEDIA */}

              <div className="footer-social-wrapper">
                <span className="footer-social-title">
                  Follow Us
                </span>

                <div className="footer-social-icons">
                  {socialLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      title={item.label}
                      className={`footer-social-link ${item.className}`}
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* COPYRIGHT */}

          <div className="footer-copyright">
            <p>
              Copyright © {new Date().getFullYear()}{" "}
              <strong>{BRAND_NAME}</strong>. All rights reserved.
            </p>

            <p>
              Developed by{" "}
              <a
                href="https://prwebstock.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PR WEBSTOCK
              </a>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
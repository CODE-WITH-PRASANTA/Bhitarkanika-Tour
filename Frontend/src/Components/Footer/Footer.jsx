import React, { useState, useEffect } from "react";
import {
  MapPin,
  Mail,
  Phone,
  CalendarDays,
  ChevronUp,
} from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/mlogo.png";
import "./Footer.css";

const footerServices = [
  { title: "Boat Service", path: "/services/boat-service" },
  { title: "Migratory Birds Point", path: "/services/migratory-birds-point" },
  { title: "Saltwater Crocodiles", path: "/services/saltwater-crocodiles" },
  { title: "Mangrove Forests", path: "/services/mangrove-forests" },
  { title: "Sky Walk", path: "/services/sky-walk" },
  { title: "Deer Park", path: "/services/deer" },
  { title: "White Crocodile (Gori)", path: "/services/white-crocodile" },
  { title: "Jungle Trekking", path: "/services/jungle-trekking" },
  { title: "Museum", path: "/services/museum" },
  { title: "EV Vehicle Service", path: "/services/ev-vehicle-service" },
  { title: "Narrow Creek", path: "/services/narrow-creek" },
  { title: "Olive Ridley Turtles", path: "/services/olive-ridley-turtles" },
  { title: "Sea Food Corner", path: "/services/sea-food" },
  { title: "Hunting Tower", path: "/services/hunting-tower" },
];

const footerPosts = [
  {
    title: "10 Amazing Wildlife Travel Adventures To Try!",
    date: "August 19, 2024",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=300&q=80",
    path: "/blog/wildlife-travel-adventures",
  },
  {
    title: "The Beauty of Wildlife and Mangrove Ecosystems",
    date: "August 10, 2024",
    image:
      "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=300&q=80",
    path: "/blog/beauty-of-wildlife",
  },
];

const footerNavigation = [
  { title: "Home", path: "/" },
  { title: "About Us", path: "/about" },
  { title: "Services", path: "/services" },
  { title: "Gallery", path: "/gallery" },
  { title: "Blog", path: "/blog" },
  { title: "Contact Us", path: "/contact" },
];

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      {/* Top Contact Bar */}
      <div className="footer-contact-bar">
        <div className="footer-container footer-contact-container">
          <Link to="/" onClick={handleLinkClick} className="footer-logo-link" aria-label="WildDale Home">
            <img
              src={logo}
              alt="WildDale Sanctuary Logo"
              className="footer-logo"
            />
          </Link>

          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <MapPin size={32} strokeWidth={1.75} />
            </div>
            <div className="footer-contact-content">
              <span className="footer-label">Location</span>
              <p>207 South Chestnut TuLane</p>
            </div>
          </div>

          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <Mail size={30} strokeWidth={1.75} />
            </div>
            <div className="footer-contact-content">
              <span className="footer-label">Email Us</span>
              <a href="mailto:info@example.com">info@example.com</a>
            </div>
          </div>

          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <Phone size={30} strokeWidth={1.75} />
            </div>
            <div className="footer-contact-content">
              <span className="footer-label">Call Us</span>
              <a href="tel:+1234567890">+123 456 7890</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-content-grid">
            
            {/* Column 1: Testimonial & Socials */}
            <div className="footer-column footer-testimonial">
              <h3 className="footer-heading">What Tourist Say!</h3>

              <div className="footer-testimonial-body">
                <div className="footer-testimonial-img-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=260&q=80"
                    alt="Sanctuary visitor testimonial"
                    className="footer-testimonial-image"
                    loading="lazy"
                  />
                </div>

                <p className="footer-testimonial-text">
                  Wildlife conservation is a long-term commitment and journey that
                  requires the cooperation of everyone in the community. At
                  WildDale, we are devoted to protecting nature and creating
                  unforgettable experiences.
                </p>
              </div>

              <div className="footer-social-wrapper">
                <span className="footer-social-title">Social Share:</span>
                <div className="footer-social-icons">
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visit Facebook"
                    className="footer-social-link"
                  >
                    <FaFacebookF size={15} />
                  </a>

                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visit Twitter"
                    className="footer-social-link"
                  >
                    <FaTwitter size={15} />
                  </a>

                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visit Instagram"
                    className="footer-social-link"
                  >
                    <FaInstagram size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Zoo Services */}
            <div className="footer-column footer-services">
              <h3 className="footer-heading">Zoo Services</h3>

              <ul className="footer-services-list">
                {footerServices.map((service) => (
                  <li key={service.path} className="footer-services-item">
                    <Link 
                      to={service.path} 
                      onClick={handleLinkClick}
                      className={location.pathname === service.path ? "active-link" : ""}
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Recent Posts */}
            <div className="footer-column footer-recent-posts">
              <h3 className="footer-heading">Our Recent Posts</h3>

              <div className="footer-posts-list">
                {footerPosts.map((post) => (
                  <article className="footer-post-card" key={post.title}>
                    <Link
                      to={post.path}
                      onClick={handleLinkClick}
                      className="footer-post-image-link"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="footer-post-image"
                        loading="lazy"
                      />
                    </Link>

                    <div className="footer-post-content">
                      <Link
                        to={post.path}
                        onClick={handleLinkClick}
                        className="footer-post-title"
                      >
                        {post.title}
                      </Link>

                      <div className="footer-post-date">
                        <CalendarDays size={13} />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Primary Navigation */}
          <nav
            className="footer-bottom-navigation"
            aria-label="Footer quick navigation"
          >
            {footerNavigation.map((item) => (
              <Link
                to={item.path}
                key={item.title}
                onClick={handleLinkClick}
                className={`footer-bottom-link ${
                  location.pathname === item.path ? "active-nav-link" : ""
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Copyright Area */}
          <div className="footer-copyright">
            <p>
              Copyright © {new Date().getFullYear()} WildDale. All rights
              reserved. Developed by{" "}
              <a
                href="https://prwebstock.com/"
                target="_blank"
                rel="noreferrer"
              >
                PR WEBSTOCK
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top Action */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`footer-back-to-top ${showScrollTop ? "visible" : ""}`}
        aria-label="Back to top"
      >
        <ChevronUp size={20} strokeWidth={2.5} />
      </button>
    </footer>
  );
};

export default Footer;
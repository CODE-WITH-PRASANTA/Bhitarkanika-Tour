
import React from "react";
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

import { Link } from "react-router-dom";
import logo from "../../assets/mlogo.png";
import "./Footer.css";

const footerServices = [
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
  { title: "Hunting Tower", path: "/services/hunting-tower" },
];

const footerPosts = [
  {
    title: "10 Amazing Wildlife Travel Adventures To Try!",
    date: "August 19, 2021",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=300&q=80",
    path: "/blog",
  },
  {
    title: "The Beauty of Wildlife and Nature",
    date: "August 10, 2021",
    image:
      "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=300&q=80",
    path: "/blog",
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
          <Link to="/" className="footer-logo-link">
            <img
              src={logo}
              alt="WildDale logo"
              className="footer-logo"
            />
          </Link>

          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <MapPin size={40} strokeWidth={1.4} />
            </div>
            <div className="footer-contact-content">
              <h3>Location</h3>
              <p>207 South Chestnut TuLane</p>
            </div>
          </div>

          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <Mail size={40} strokeWidth={1.4} />
            </div>
            <div className="footer-contact-content">
              <h3>Email</h3>
              <a href="mailto:info@example.com">info@example.com</a>
            </div>
          </div>

          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <Phone size={38} strokeWidth={1.4} />
            </div>
            <div className="footer-contact-content">
              <h3>Call us</h3>
              <a href="tel:+1234567890">+123 456 7890</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-content-grid">
            {/* Testimonial */}
            <div className="footer-column footer-testimonial">
              <h2 className="footer-heading">What Tourist Say!</h2>

              <div className="footer-testimonial-body">
                <img
                  src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=260&q=80"
                  alt="Safari visitor"
                  className="footer-testimonial-image"
                  loading="lazy"
                />

                <p className="footer-testimonial-text">
                  Wildlife conservation is a long-term commitment and
                  journey that requires the cooperation of everyone in
                  the community. At WildDale, we are devoted to
                  protecting nature and creating unforgettable
                  experiences.
                </p>
              </div>

              <div className="footer-social">
                <span className="footer-social-title">Social Share:</span>

                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="footer-social-link"
                >
                  <FaFacebookF size={17} />
                </a>

                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                  className="footer-social-link"
                >
                  <FaTwitter size={19} />
                </a>

                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="footer-social-link"
                >
                  <FaInstagram size={19} />
                </a>
              </div>
            </div>

            {/* Zoo Services - Three Columns */}
            <div className="footer-column footer-services">
              <h2 className="footer-heading">Zoo Services</h2>

              <ul className="footer-services-list">
                {footerServices.map((service) => (
                  <li key={service.path}>
                    <Link to={service.path}>{service.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts */}
            <div className="footer-column footer-recent-posts">
              <h2 className="footer-heading">Our Recent Posts</h2>

              <div className="footer-posts-list">
                {footerPosts.map((post) => (
                  <article className="footer-post" key={post.title}>
                    <Link
                      to={post.path}
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
                        className="footer-post-title"
                      >
                        {post.title}
                      </Link>

                      <div className="footer-post-date">
                        <CalendarDays size={15} />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <nav
            className="footer-bottom-navigation"
            aria-label="Footer navigation"
          >
            {footerNavigation.map((item) => (
              <Link
                to={item.path}
                key={item.title}
                className="footer-bottom-link"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
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

      {/* Back To Top */}
      <button
        type="button"
        className="footer-back-to-top"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ChevronUp size={24} strokeWidth={2.5} />
      </button>
    </footer>
  );
};

export default Footer;

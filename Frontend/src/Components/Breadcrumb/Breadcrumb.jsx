import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";

import DefaultBg from "../../assets/BhitarakanikaBreadcrumb.jpeg";

const ROUTE_LABELS = {
  about: "About Us",
  gallery: "Gallery",
  contact: "Contact Us",
  services: "Our Services",
};

const Breadcrumb = ({
  title,
  backgroundImage = DefaultBg,
}) => {
  const location = useLocation();

  const segments = location.pathname
    .split("/")
    .filter(Boolean);

  const currentPage =
    title ||
    ROUTE_LABELS[segments[segments.length - 1]] ||
    "Page";

  return (
    <section
      className="Breadcrumb"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="Breadcrumb-overlay"></div>

      <div className="Breadcrumb-content">
        <h1 className="Breadcrumb-title">
          {currentPage}
        </h1>

        <nav className="Breadcrumb-navigation">
          <Link to="/" className="Breadcrumb-link">
            Home
          </Link>

          {segments.map((segment, index) => {
            const path = "/" + segments
              .slice(0, index + 1)
              .join("/");

            const isLast =
              index === segments.length - 1;

            const label =
              ROUTE_LABELS[segment] ||
              segment
                .replace(/-/g, " ")
                .replace(/\b\w/g, (char) =>
                  char.toUpperCase()
                );

            return (
              <React.Fragment key={path}>
                <span className="Breadcrumb-separator">
                  /
                </span>

                {isLast ? (
                  <span className="Breadcrumb-active">
                    {label}
                  </span>
                ) : (
                  <Link
                    to={path}
                    className="Breadcrumb-link"
                  >
                    {label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </section>
  );
};

export default Breadcrumb;
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Images,
  CalendarCheck,
  MessageSquareText,
  Hotel,
  ChevronDown,
  X,
  FilePenLine,
  FolderKanban,
} from "lucide-react";

import logo from "../../assets/mlogo.png";
import "./Sidebar.css";

export const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    isMatch: (path) =>
      path === "/" || path === "/dashboard" || path.startsWith("/dashboard/"),
  },
  {
    label: "Blog",
    icon: BookOpen,
    path: "/blog",
    children: [
      {
        label: "Blog Posting",
        icon: FilePenLine,
        path: "/blog/posting",
      },
      {
        label: "Blog Management",
        icon: FolderKanban,
        path: "/blog/management",
      },
    ],
  },
  {
    label: "Gallery",
    icon: Images,
    path: "/gallery",
  },
  {
    label: "Tour Booking",
    icon: CalendarCheck,
    path: "/tour-booking",
  },
   {
    label: "Hotel Booking",
    icon: Hotel,
    path: "/hotel-booking",
  },
  {
    label: "Enquiry",
    icon: MessageSquareText,
    path: "/enquiry",
  },
 
];

const Sidebar = ({
  isCollapsed = false,
  isMobileOpen = false,
  onMobileClose = () => {},
  onProfileClick = () => {},
  onLogout = () => {},
  brandName = "Bhitarkanika Tour",
  brandTagline = "ADMIN PANEL",
  user = {
    name: "Admin",
    role: "Super Administrator",
    initials: "AD",
    avatarUrl: "",
  },
  version = "v2.5.0",
}) => {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();

  const [blogOpen, setBlogOpen] = useState(
    currentPath.startsWith("/blog")
  );

  const isPathActive = (path) => {
    const normalizedPath = path.toLowerCase();

    return (
      currentPath === normalizedPath ||
      currentPath.startsWith(`${normalizedPath}/`)
    );
  };

  const isItemActive = (item) => {
    if (item.isMatch) {
      return item.isMatch(currentPath);
    }

    if (item.children) {
      return item.children.some((child) => isPathActive(child.path));
    }

    return isPathActive(item.path);
  };

  const handleLinkClick = (callback) => (event) => {
    if (callback) callback(event);

    if (window.innerWidth <= 992) {
      onMobileClose();
    }
  };

  const handleBlogToggle = () => {
    if (isCollapsed) {
      setBlogOpen(true);
      return;
    }

    setBlogOpen((previous) => !previous);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`HealthySidebar-backdrop ${
          isMobileOpen ? "is-visible" : ""
        }`}
        onClick={onMobileClose}
        aria-hidden="true"
      />

      <aside
        className={`HealthySidebar ${isCollapsed ? "is-collapsed" : ""} ${
          isMobileOpen ? "is-mobile-open" : ""
        }`}
        aria-label="Admin Sidebar"
      >
        {/* Decorative Background */}
        <div className="HealthySidebar-glow HealthySidebar-glow-top" />
        <div className="HealthySidebar-glow HealthySidebar-glow-bottom" />

        {/* Brand Header */}
        <div className="HealthySidebar-header">
          <div className="HealthySidebar-brand">
            <div className="HealthySidebar-logo-ring">
              <img
                src={logo}
                alt={`${brandName} Logo`}
                className="HealthySidebar-logo"
              />
            </div>

            <div className="HealthySidebar-brand-meta">
              <h2>{brandName}</h2>
              <span>{brandTagline}</span>
            </div>
          </div>

          <button
            type="button"
            className="HealthySidebar-mobile-close"
            onClick={onMobileClose}
            aria-label="Close sidebar"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Admin Profile */}
        <NavLink
          to="/profile"
          className="HealthySidebar-profile-card"
          onClick={handleLinkClick(onProfileClick)}
          title={isCollapsed ? `${user.name} (${user.role})` : undefined}
        >
          <div className="HealthySidebar-avatar-wrap">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="HealthySidebar-avatar-img"
              />
            ) : (
              <div className="HealthySidebar-avatar-fallback">
                {user.initials ||
                  user.name
                    ?.split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
              </div>
            )}

            <span className="HealthySidebar-status-beacon" />
          </div>

          <div className="HealthySidebar-profile-details">
            <span className="HealthySidebar-profile-name">
              {user.name}
            </span>
            <span className="HealthySidebar-profile-role">
              {user.role}
            </span>
          </div>
        </NavLink>

        {/* Main Navigation */}
        <nav
          className="HealthySidebar-nav"
          aria-label="Main Navigation"
        >
          {!isCollapsed && (
            <div className="HealthySidebar-nav-heading">
              MAIN MENU
            </div>
          )}

          <div className="HealthySidebar-nav-list">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isItemActive(item);

              {/* Blog Dropdown */}
              if (item.children) {
                return (
                  <div
                    key={item.label}
                    className={`HealthySidebar-group ${
                      active ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className={`HealthySidebar-link HealthySidebar-dropdown-toggle ${
                        active ? "active" : ""
                      }`}
                      onClick={handleBlogToggle}
                      title={isCollapsed ? item.label : undefined}
                      aria-expanded={blogOpen}
                    >
                      <span className="HealthySidebar-icon-box">
                        <Icon size={20} strokeWidth={2.2} />
                      </span>

                      <span className="HealthySidebar-link-title">
                        {item.label}
                      </span>

                      {!isCollapsed && (
                        <ChevronDown
                          size={17}
                          className={`HealthySidebar-chevron ${
                            blogOpen ? "is-open" : ""
                          }`}
                        />
                      )}
                    </button>

                    {blogOpen && (
                      <div className="HealthySidebar-submenu">
                        {item.children.map((child) => {
                          const ChildIcon = child.icon;

                          return (
                            <NavLink
                              key={child.path}
                              to={child.path}
                              className={({ isActive: navActive }) =>
                                `HealthySidebar-sublink ${
                                  navActive || isPathActive(child.path)
                                    ? "active"
                                    : ""
                                }`
                              }
                              onClick={handleLinkClick()}
                              title={
                                isCollapsed ? child.label : undefined
                              }
                            >
                              <span className="HealthySidebar-subicon">
                                <ChildIcon
                                  size={17}
                                  strokeWidth={2}
                                />
                              </span>

                              <span className="HealthySidebar-link-title">
                                {child.label}
                              </span>
                            </NavLink>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              {/* Standard Navigation Item */}
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/dashboard"}
                  className={({ isActive: navActive }) =>
                    `HealthySidebar-link ${
                      active || navActive ? "active" : ""
                    }`
                  }
                  onClick={handleLinkClick()}
                  title={isCollapsed ? item.label : undefined}
                >
                  <span className="HealthySidebar-icon-box">
                    <Icon size={20} strokeWidth={2.2} />
                  </span>

                  <span className="HealthySidebar-link-title">
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        {!isCollapsed && (
          <div className="HealthySidebar-footer">
            <span className="HealthySidebar-footer-version">
              {version}
            </span>
            <span className="HealthySidebar-footer-caption">
              Admin Dashboard
            </span>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
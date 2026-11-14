import React from "react";
import { Link } from "react-router-dom";
import { AlarmClock, Mail, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./Topbar.css";

const Topbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const topbarItems = [
    {
      id: 1,
      icon: AlarmClock,
      title: "Opening Hours",
      description: "Mon - Sat: 07:00 AM - 02:00 PM",
    },
    {
      id: 2,
      icon: Mail,
      title: "Email Us",
      description: "bhitarkanikaboatservice@gmail.com",
      href: "mailto:bhitarkanikaboatservice@gmail.com",
    },
  ];

  return (
    <header className="topbar">
      <div className="topbar-container">
        {/* Left Information Items */}
        <div className="topbar-left">
          {topbarItems.map((item) => {
            const Icon = item.icon;

            const content = (
              <>
                <span className="topbar-icon">
                  <Icon size={18} strokeWidth={2} />
                </span>

                <span className="topbar-content">
                  <span className="topbar-title">{item.title}</span>
                  <span className="topbar-text">{item.description}</span>
                </span>
              </>
            );

            return item.href ? (
              <a
                href={item.href}
                className="topbar-item topbar-item-link"
                key={item.id}
              >
                {content}
              </a>
            ) : (
              <div className="topbar-item" key={item.id}>
                {content}
              </div>
            );
          })}
        </div>

        {/* Right Authentication Action */}
        <div className="topbar-right">
          {isAuthenticated ? (
            <Link to="/profile" className="topbar-user-pill" title="View My Profile">
              <span className="topbar-user-avatar">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  user?.name ? user.name.charAt(0).toUpperCase() : "U"
                )}
              </span>
              <span className="topbar-user-name">
                {user?.name?.split(" ")[0]}
              </span>
            </Link>
          ) : (
            <Link to="/login" className="topbar-signin-pill">
              <User size={16} strokeWidth={2.2} />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;

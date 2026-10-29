
import React from "react";
import {
  AlarmClock,
  MapPin,
  MessagesSquare,
} from "lucide-react";

import logo from "../../assets/mlogo.png";
import "./Topbar.css";

const Topbar = () => {
  const topbarItems = [
    {
      id: 1,
      icon: AlarmClock,
      title: "Openning Hours",
      description: "Mon - Sat: 08:00 - 05:00",
    },
    {
      id: 2,
      icon: MapPin,
      title: "Visit Our Zoo",
      description: "Bhitarakanika, Kendrapara , Odisha",
    },
    {
      id: 3,
      icon: MessagesSquare,
      title: "Email Us",
      description: "info@example.com",
      href: "mailto:info@example.com",
    },
  ];

  return (
    <header className="topbar">
      <div className="topbar-container">
        {/* Logo */}
        <a href="/" className="topbar-logo" aria-label="WildDale Home">
          <img
            src={logo}
            alt="WildDale Awesome Safari"
            className="topbar-logo-image"
          />
        </a>

        {/* Information Items */}
        <div className="topbar-information">
          {topbarItems.map((item) => {
            const Icon = item.icon;

            return (
              <div className="topbar-information-item" key={item.id}>
                <div className="topbar-icon">
                  <Icon size={39} strokeWidth={1.6} />
                </div>

                <div className="topbar-information-content">
                  <span className="topbar-information-title">
                    {item.title}
                  </span>

                  {item.href ? (
                    <a
                      href={item.href}
                      className="topbar-information-description"
                    >
                      {item.description}
                    </a>
                  ) : (
                    <span className="topbar-information-description">
                      {item.description}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Topbar;

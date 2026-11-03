import React from "react";
import { AlarmClock, Mail } from "lucide-react";

import "./Topbar.css";

const Topbar = () => {
  const topbarItems = [
    {
      id: 1,
      icon: AlarmClock,
      title: "Opening Hours",
      description: "Mon - Sat: 08:00 - 05:00",
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
    </header>
  );
};

export default Topbar;
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Menu, ChevronDown, Bell, Search, User, LogOut, Shield } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import './Topbar.css';

const Topbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { admin, logout } = useAdminAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate('/login', { replace: true });
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format path breadcrumb dynamically
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentPath = pathSegments.length > 0 
    ? pathSegments[pathSegments.length - 1].replace(/-/g, ' ') 
    : 'Dashboard';
  const parentPath = pathSegments.length > 1 
    ? pathSegments[0].toUpperCase() 
    : 'ADMIN';

  return (
    <header className="Topbar">
      <div className="Topbar-left">
        <button 
          className="Topbar-toggle-btn" 
          onClick={toggleSidebar} 
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="Topbar-path">
          <span className="Topbar-path-parent">{parentPath}</span>
          <span className="Topbar-path-separator">/</span>
          <span className="Topbar-path-current">{currentPath}</span>
        </div>
      </div>

      <div className="Topbar-right">
        {/* Search Bar */}
        <div className="Topbar-search-box">
          <Search size={16} className="Topbar-search-icon" />
          <input 
            type="text" 
            placeholder="Search resources, orders..." 
            className="Topbar-search-input" 
          />
          <kbd className="Topbar-search-shortcut">⌘K</kbd>
        </div>

        {/* Notifications */}
        <div className="Topbar-action-wrapper" ref={dropdownRef}>
          <button 
            className={`Topbar-action-btn ${notificationsOpen ? 'active' : ''}`}
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setDropdownOpen(false);
            }}
            aria-label="Notifications"
          >
            <Bell size={19} />
            <span className="Topbar-badge">3</span>
          </button>

          {notificationsOpen && (
            <div className="Topbar-dropdown Topbar-notifications-dropdown">
              <div className="Topbar-dropdown-header">
                <span className="Topbar-dropdown-title">Notifications</span>
                <span className="Topbar-dropdown-badge">3 New</span>
              </div>
              <div className="Topbar-notification-list">
                <div className="Topbar-notification-item unread">
                  <div className="Topbar-notification-dot" />
                  <div>
                    <p className="Topbar-notification-text">New order <strong>#WDMS-9402</strong> placed.</p>
                    <span className="Topbar-notification-time">5 mins ago</span>
                  </div>
                </div>
                <div className="Topbar-notification-item unread">
                  <div className="Topbar-notification-dot" />
                  <div>
                    <p className="Topbar-notification-text">Stock alert: Alka Bottle 1L low.</p>
                    <span className="Topbar-notification-time">20 mins ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Profile Menu */}
          <div 
            className={`Topbar-user ${dropdownOpen ? 'active' : ''}`} 
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
              setNotificationsOpen(false);
            }}
          >
            <div className="Topbar-avatar-wrapper">
              {admin?.avatar ? (
                <img 
                  src={admin.avatar} 
                  alt={admin.name || "Admin"} 
                  className="Topbar-avatar" 
                />
              ) : (
                <div
                  className="Topbar-avatar"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#064e3b",
                    color: "#a7f3d0",
                    fontWeight: 700,
                    fontSize: "13px",
                  }}
                >
                  {(admin?.name || admin?.userId || "A")[0].toUpperCase()}
                </div>
              )}
              <span className="Topbar-status-indicator" />
            </div>

            <div className="Topbar-user-info">
              <span className="Topbar-username">{admin?.name || "Sanctuary Admin"}</span>
              <span className="Topbar-role">
                {admin?.role
                  ? admin.role.charAt(0).toUpperCase() + admin.role.slice(1)
                  : "Super Administrator"}
              </span>
            </div>

            <ChevronDown size={15} className={`Topbar-chevron ${dropdownOpen ? 'open' : ''}`} />

            {dropdownOpen && (
              <div className="Topbar-dropdown Topbar-user-dropdown">
                <div className="Topbar-user-card">
                  <p className="Topbar-card-name">{admin?.name || "Sanctuary Admin"}</p>
                  <p className="Topbar-card-email">{admin?.email || "admin@bhitarkanikatour.in"}</p>
                </div>
                <div className="Topbar-dropdown-divider" />
                <button
                  type="button"
                  onClick={handleLogout}
                  className="Topbar-dropdown-item logout"
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    font: "inherit",
                    padding: "9px 14px",
                    color: "#b91c1c",
                  }}
                >
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
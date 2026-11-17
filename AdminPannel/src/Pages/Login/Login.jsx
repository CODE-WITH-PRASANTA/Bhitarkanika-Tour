import React, { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Sparkles,
  KeyRound,
} from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import logo from "../../assets/mlogo.png";
import "./Login.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
const STATIC_USER_ID = import.meta.env.VITE_ADMIN_USER_ID || "admin";
const STATIC_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "Admin@12345";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAdminAuth();

  const [userId, setUserId] = useState(STATIC_USER_ID);
  const [password, setPassword] = useState(STATIC_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    const destination = location.state?.from?.pathname || "/";
    return <Navigate to={destination} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const cleanUserId = userId.trim();
    if (!cleanUserId || !password) {
      setError("Please enter both Admin User ID / Email and Password.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId: cleanUserId,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Invalid Admin credentials. Access denied.");
        return;
      }

      // Successful admin login
      login(data.admin, data.token);

      const destination = location.state?.from?.pathname || "/";
      navigate(destination, { replace: true });
    } catch (err) {
      setError("Server connection failed. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleUseStaticCredentials = () => {
    setUserId(STATIC_USER_ID);
    setPassword(STATIC_PASSWORD);
    setError("");
  };

  return (
    <div className="AdminLogin">
      {/* Background Decor Elements */}
      <div className="AdminLogin-bg-glow" />
      <div className="AdminLogin-bg-grid" />

      <div className="AdminLogin-card">
        {/* Header Section */}
        <div className="AdminLogin-header">
          <div className="AdminLogin-logo-wrap">
            <img src={logo} alt="Bhitarkanika Sanctuary Logo" className="AdminLogin-logo" />
          </div>

          <div className="AdminLogin-badge">
            <Sparkles size={13} />
            <span>SANCTUARY ADMINISTRATION</span>
          </div>

          <h1 className="AdminLogin-title">Executive Command Login</h1>
          <p className="AdminLogin-subtitle">
            Secure administrative access for Bhitarkanika National Park operations, boat safaris &amp; tourist management.
          </p>
        </div>

        {/* Status Error Alert */}
        {error && (
          <div className="AdminLogin-alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="AdminLogin-form">
          {/* User ID / Email */}
          <div className="AdminLogin-group">
            <label className="AdminLogin-lbl" htmlFor="admin-userid">
              Admin User ID or Email
            </label>
            <div className="AdminLogin-input-box">
              <User size={16} className="AdminLogin-icon" />
              <input
                id="admin-userid"
                type="text"
                className="AdminLogin-input"
                placeholder="e.g. admin or admin@bhitarkanikatour.in"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          {/* Password */}
          <div className="AdminLogin-group">
            <div className="AdminLogin-between">
              <label className="AdminLogin-lbl" htmlFor="admin-pwd">
                Admin Password
              </label>
              <button
                type="button"
                className="AdminLogin-hint-btn"
                onClick={handleUseStaticCredentials}
                title="Fill default static credentials from .env"
              >
                <KeyRound size={12} />
                <span>Fill Default Credentials</span>
              </button>
            </div>
            <div className="AdminLogin-input-box">
              <Lock size={16} className="AdminLogin-icon" />
              <input
                id="admin-pwd"
                type={showPassword ? "text" : "password"}
                className="AdminLogin-input"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="AdminLogin-eye"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Options Row */}
          <div className="AdminLogin-options">
            <label className="AdminLogin-checkbox-lbl">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember this session</span>
            </label>

            <span className="AdminLogin-secure-tag">
              <ShieldCheck size={13} />
              256-Bit Encrypted
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="AdminLogin-btn"
            disabled={loading}
          >
            <span>{loading ? "Authenticating Session..." : "Sign In to Command Center"}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Static Credential Helper Card */}
        <div className="AdminLogin-helper">
          <div className="AdminLogin-helper-header">
            <ShieldCheck size={14} />
            <span>Static Credentials Configured in .env</span>
          </div>
          <div className="AdminLogin-helper-body">
            <div>
              <span>User ID:</span> <code>{STATIC_USER_ID}</code>
            </div>
            <div>
              <span>Password:</span> <code>{STATIC_PASSWORD}</code>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="AdminLogin-footer">
          <span>Official Forest Sanctuary Management Portal</span>
          <small>© 2026 Bhitarkanika National Park. All rights reserved.</small>
        </div>
      </div>
    </div>
  );
};

export default Login;

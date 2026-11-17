import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  Phone,
  Sparkles,
  User,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import authBg from "../../assets/BhitarakanikaBreadcrumb.jpeg";
import "./Auth.css";

const API_BASE = "http://localhost:5000/api";
const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  "1070313248799-q3r7khugifnf6rr69nh7uhpmucaeurq0.apps.googleusercontent.com";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Mode: "login" (default) | "register" | "forgot"
  const getInitialMode = () => {
    if (window.location.pathname.includes("forgot") || searchParams.get("mode") === "forgot") {
      return "forgot";
    }
    if (window.location.pathname.includes("register") || searchParams.get("mode") === "register") {
      return "register";
    }
    return "login";
  };
  const [mode, setMode] = useState(getInitialMode);

  // Google OAuth button container refs
  const googleLoginRef = useRef(null);
  const googleRegisterRef = useRef(null);

  // Forgot password step: 1 (request OTP) | 2 (submit OTP & new/confirm password)
  const [forgotStep, setForgotStep] = useState(1);
  const [generatedOtpHint, setGeneratedOtpHint] = useState("");

  // Pending booking data if user was redirected from boat booking
  const [pendingBooking, setPendingBooking] = useState(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Cooldown countdown timer for OTP resend
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Check for pending booking from session storage
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("pending_booking");
      if (stored) {
        setPendingBooking(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not parse pending booking", e);
    }
  }, []);

  // Sync mode with query param if changed
  useEffect(() => {
    const qMode = searchParams.get("mode");
    if (qMode === "register") setMode("register");
    else if (qMode === "forgot") setMode("forgot");
  }, [searchParams]);

  // If already authenticated, finalize pending booking or redirect to profile
  useEffect(() => {
    if (isAuthenticated) {
      if (pendingBooking) {
        finalizePendingBooking();
      } else {
        const redirect = searchParams.get("redirect");
        navigate(redirect === "booking" ? "/services/boat-service" : "/profile");
      }
    }
  }, [isAuthenticated, pendingBooking, searchParams]);

  // Finalize booking after authentication
  const finalizePendingBooking = async () => {
    try {
      setLoading(true);
      const stored = sessionStorage.getItem("pending_booking");
      if (!stored) {
        navigate("/services/boat-service");
        return;
      }

      const bookingPayload = JSON.parse(stored);
      await fetch(`${API_BASE}/tour-bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      sessionStorage.removeItem("pending_booking");
      sessionStorage.setItem("confirmed_booking_id", bookingPayload.bookingId || "CONFIRMED");
      navigate("/services/boat-service?booking=confirmed");
    } catch (err) {
      console.error("Error finalizing booking:", err);
      navigate("/services/boat-service");
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = async (userData, token) => {
    login(userData, token);

    // If there was a pending boat booking, submit it
    const stored = sessionStorage.getItem("pending_booking");
    if (stored) {
      try {
        const payload = JSON.parse(stored);
        await fetch(`${API_BASE}/tour-bookings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            name: payload.name || userData.name,
            email: payload.email || userData.email,
            phone: payload.phone || userData.phone || payload.phone,
          }),
        });
        sessionStorage.removeItem("pending_booking");
        sessionStorage.setItem("confirmed_booking_id", payload.bookingId || "CONFIRMED");
        navigate("/services/boat-service?booking=confirmed");
        return;
      } catch (e) {
        console.warn("Could not save pending booking on auth success", e);
      }
    }

    const redirectUrl = searchParams.get("redirect") === "booking"
      ? "/services/boat-service"
      : "/";
    navigate(redirectUrl);
  };

  // ---------------- SUBMIT HANDLERS ----------------

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Invalid credentials. Please try again.");
        return;
      }

      setSuccess("Welcome back! Redirecting...");
      setTimeout(() => {
        handleAuthSuccess(data.user, data.token);
      }, 400);
    } catch (err) {
      setError("Server connection failed. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Please complete all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Registration failed. Please try again.");
        return;
      }

      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => {
        handleAuthSuccess(data.user, data.token);
      }, 400);
    } catch (err) {
      setError("Server connection failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotRequestOtp = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setSuccess("");

    const cleanEmail = (email || "").trim().toLowerCase();
    if (!cleanEmail) {
      setError("Please enter your registered email address.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Failed to generate verification code.");
        return;
      }

      setResendCooldown(60);
      setSuccess(`A 6-digit OTP verification code has been sent to ${cleanEmail}. Please check your email inbox and spam folder.`);
      setForgotStep(2);
    } catch (err) {
      setError("Connection error. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanOtp = (otp || "").trim();

    if (!cleanOtp) {
      setError("Please enter the 6-digit verification code sent to your email.");
      return;
    }

    if (cleanOtp.length !== 6) {
      setError("Please enter a valid 6-digit verification code.");
      return;
    }

    if (!newPassword) {
      setError("Please enter your new password.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    if (!confirmNewPassword) {
      setError("Please confirm your new password.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          otp: cleanOtp,
          newPassword: newPassword,
          confirmPassword: confirmNewPassword,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Password reset failed. Invalid or expired code.");
        return;
      }

      setSuccess("Password reset successful! Logging you in...");
      setTimeout(() => {
        handleAuthSuccess(data.user, data.token);
      }, 500);
    } catch (err) {
      setError("Server error during password reset. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle redirect code from Google OAuth flow
  useEffect(() => {
    const authCode = searchParams.get("code");
    if (authCode) {
      const exchangeOAuthCode = async () => {
        try {
          setLoading(true);
          setError("");
          setSuccess("Authenticating with Google...");
          const redirectUri = `${window.location.origin}${window.location.pathname}`;
          const res = await fetch(`${API_BASE}/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              code: authCode,
              redirectUri: redirectUri,
            }),
          });
          const data = await res.json();
          if (res.ok && data.success) {
            setSuccess("Google login successful! Redirecting...");
            setTimeout(() => {
              handleAuthSuccess(data.user, data.token);
            }, 350);
          } else {
            setError(data.message || "Google authentication failed. Please try again.");
          }
        } catch (err) {
          setError("Failed to verify Google authentication with server.");
        } finally {
          setLoading(false);
        }
      };
      exchangeOAuthCode();
    }
  }, [searchParams]);

  // Render official Google button into active mode container
  const renderGoogleButton = () => {
    if (!window.google?.accounts?.id) return;
    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      const targetEl = mode === "register" ? googleRegisterRef.current : googleLoginRef.current;
      if (targetEl) {
        targetEl.innerHTML = "";
        window.google.accounts.id.renderButton(targetEl, {
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          width: 310,
          logo_alignment: "left",
        });
      }
    } catch (e) {
      console.warn("Could not render Google Sign-In button:", e);
    }
  };

  // Initialize Google Identity Services
  useEffect(() => {
    let checkCount = 0;
    const interval = setInterval(() => {
      checkCount += 1;
      if (window.google?.accounts?.id) {
        clearInterval(interval);
        renderGoogleButton();
      }
      if (checkCount > 30) clearInterval(interval);
    }, 150);

    return () => clearInterval(interval);
  }, [mode]);

  const handleGoogleCredentialResponse = async (response) => {
    if (!response?.credential) return;
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await fetch(`${API_BASE}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message || "Google sign-in failed. Please try again.");
        return;
      }

      setSuccess("Google login successful! Redirecting...");
      setTimeout(() => {
        handleAuthSuccess(data.user, data.token);
      }, 350);
    } catch (err) {
      console.error("Google auth callback error:", err);
      setError("Network error during Google sign-in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger Google OAuth popup via tokenClient with fallback redirect
  const triggerOAuthPopup = () => {
    if (window.google?.accounts?.oauth2) {
      try {
        setLoading(true);

        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: "email profile openid",
          callback: async (tokenResponse) => {
            if (tokenResponse?.error) {
              setLoading(false);
              if (tokenResponse.error !== "access_denied") {
                setError(`Google Sign-In failed: ${tokenResponse.error_description || tokenResponse.error}`);
              }
              return;
            }

            if (tokenResponse?.access_token) {
              try {
                const res = await fetch(`${API_BASE}/auth/google`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  credentials: "include",
                  body: JSON.stringify({ accessToken: tokenResponse.access_token }),
                });

                const data = await res.json();
                if (!res.ok || !data.success) {
                  setError(data.message || "Google authentication failed.");
                  setLoading(false);
                  return;
                }

                setSuccess("Google login successful! Redirecting...");
                setTimeout(() => {
                  handleAuthSuccess(data.user, data.token);
                }, 350);
              } catch (err) {
                console.error("Backend error after Google token:", err);
                setError("Failed to verify Google account with server.");
                setLoading(false);
              }
            } else {
              setLoading(false);
            }
          },
          error_callback: (nonOAuthError) => {
            setLoading(false);
            console.error("Google sign-in error:", nonOAuthError);
            setError(
              nonOAuthError?.message ||
                "Google sign-in window could not open. Please ensure http://localhost:5173 is added in your Google Cloud Console under 'Authorized JavaScript Origins'."
            );
          },
        });

        tokenClient.requestAccessToken({ prompt: "select_account" });
        return;
      } catch (err) {
        console.error("Error launching token client:", err);
      }
    }

    // Direct Google OAuth redirect as fallback
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const redirectUri = `${window.location.origin}/auth`;
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "openid email profile",
      prompt: "select_account",
      access_type: "offline",
    });
    window.location.assign(`${rootUrl}?${params.toString()}`);
  };

  // Google OAuth Click Handler
  const handleGoogleAuth = () => {
    setError("");
    setSuccess("");

    // 1. If rendered Google button exists in the DOM, click it
    const targetEl = mode === "register" ? googleRegisterRef.current : googleLoginRef.current;
    if (targetEl) {
      const internalBtn = targetEl.querySelector("div[role=button]");
      if (internalBtn) {
        internalBtn.click();
        return;
      }
    }

    // 2. Try Google One Tap prompt
    if (window.google?.accounts?.id) {
      try {
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            triggerOAuthPopup();
          }
        });
        return;
      } catch (err) {
        console.warn("One Tap prompt failed:", err);
      }
    }

    triggerOAuthPopup();
  };

  return (
    <div
      className="btk-auth-page"
      style={{ backgroundImage: `url(${authBg})` }}
    >
      <div className="btk-auth-overlay" />
      <div className="btk-auth-card">
        {/* Top Emblem & Header */}
        <div className="btk-auth-card-header">
          <div className="btk-auth-emblem">
            <span className="btk-auth-emblem-dot" />
            BHITARKANIKA SAFARI
          </div>

          <h1 className="btk-auth-card-title">
            {mode === "login" && "Login to Account"}
            {mode === "register" && "Create an Account"}
            {mode === "forgot" && (forgotStep === 1 ? "Reset Password" : "Set New Password")}
          </h1>

          <p className="btk-auth-card-sub">
            {mode === "login" && "Enter your email and password to access your bookings"}
            {mode === "register" && "Register to book boat safaris & download permits"}
            {mode === "forgot" && (forgotStep === 1 ? "Enter your registered email to receive a 6-digit OTP code" : "Enter the verification code and choose your new password")}
          </p>
        </div>

        {/* Pending booking banner if redirected */}
        {pendingBooking && (
          <div className="btk-auth-pending-alert">
            <Sparkles size={16} className="btk-auth-sparkle" />
            <div>
              <strong>Pending Boat Booking</strong>:{" "}
              {pendingBooking.packageName || "Bhitarkanika Boat Package"} (₹
              {Number(pendingBooking.amount || 3590).toLocaleString("en-IN")})
              <span className="btk-auth-pending-hint">
                — Please login or create an account to confirm.
              </span>
            </div>
          </div>
        )}

        {/* Status Alerts */}
        {error && (
          <div className="btk-auth-msg error">
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="btk-auth-msg success">
            <CheckCircle2 size={16} />
            <span>{success}</span>
          </div>
        )}

        {/* ================= MODE: LOGIN ================= */}
        {mode === "login" && (
          <form className="btk-auth-form-clean" onSubmit={handleLoginSubmit}>
            <div className="btk-form-group">
              <label className="btk-form-label" htmlFor="login-email">
                Email Address
              </label>
              <div className="btk-input-box">
                <Mail size={16} className="btk-input-ico" />
                <input
                  id="login-email"
                  type="email"
                  className="btk-input-element"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="btk-form-group">
              <div className="btk-label-between">
                <label className="btk-form-label" htmlFor="login-password">
                  Password
                </label>
                <button
                  type="button"
                  className="btk-forgot-btn"
                  onClick={() => {
                    setMode("forgot");
                    setForgotStep(1);
                    setError("");
                    setSuccess("");
                  }}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="btk-input-box">
                <Lock size={16} className="btk-input-ico" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className="btk-input-element"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btk-pwd-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Primary Login Button */}
            <button
              type="submit"
              className="btk-btn-primary"
              disabled={loading}
            >
              <span>{loading ? "Logging in..." : "Login"}</span>
              <ArrowRight size={16} />
            </button>

            {/* Google OAuth Button */}
            <div className="btk-divider-wrap">
              <span>OR CONTINUE WITH</span>
            </div>

            <div className="btk-google-wrapper">
              <div ref={googleLoginRef} className="btk-google-rendered-btn" />
              <button
                type="button"
                className="btk-btn-google"
                onClick={handleGoogleAuth}
                disabled={loading}
              >
                <svg className="btk-google-svg" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Bottom Switcher */}
            <div className="btk-switch-row">
              <span>Don't have an account?</span>
              <button
                type="button"
                className="btk-switch-link"
                onClick={() => {
                  setMode("register");
                  setError("");
                  setSuccess("");
                }}
              >
                Create an Account
              </button>
            </div>
          </form>
        )}

        {/* ================= MODE: REGISTER ================= */}
        {mode === "register" && (
          <form className="btk-auth-form-clean" onSubmit={handleRegisterSubmit}>
            <div className="btk-grid-pair">
              <div className="btk-form-group">
                <label className="btk-form-label" htmlFor="reg-name">
                  Full Name
                </label>
                <div className="btk-input-box">
                  <User size={16} className="btk-input-ico" />
                  <input
                    id="reg-name"
                    type="text"
                    className="btk-input-element"
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="btk-form-group">
                <label className="btk-form-label" htmlFor="reg-phone">
                  Phone Number
                </label>
                <div className="btk-input-box">
                  <Phone size={16} className="btk-input-ico" />
                  <input
                    id="reg-phone"
                    type="tel"
                    className="btk-input-element"
                    placeholder="10-digit mobile"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  />
                </div>
              </div>
            </div>

            <div className="btk-form-group">
              <label className="btk-form-label" htmlFor="reg-email">
                Email Address
              </label>
              <div className="btk-input-box">
                <Mail size={16} className="btk-input-ico" />
                <input
                  id="reg-email"
                  type="email"
                  className="btk-input-element"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="btk-grid-pair">
              <div className="btk-form-group">
                <label className="btk-form-label" htmlFor="reg-password">
                  Password
                </label>
                <div className="btk-input-box">
                  <Lock size={16} className="btk-input-ico" />
                  <input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    className="btk-input-element"
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btk-pwd-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="btk-form-group">
                <label className="btk-form-label" htmlFor="reg-confirm">
                  Confirm Password
                </label>
                <div className="btk-input-box">
                  <KeyRound size={16} className="btk-input-ico" />
                  <input
                    id="reg-confirm"
                    type={showPassword ? "text" : "password"}
                    className="btk-input-element"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Primary Create Account Button */}
            <button
              type="submit"
              className="btk-btn-primary"
              disabled={loading}
            >
              <span>{loading ? "Creating..." : "Create Account"}</span>
              <ArrowRight size={16} />
            </button>

            {/* Google OAuth Button */}
            <div className="btk-divider-wrap">
              <span>OR CONTINUE WITH</span>
            </div>

            <div className="btk-google-wrapper">
              <div ref={googleRegisterRef} className="btk-google-rendered-btn" />
              <button
                type="button"
                className="btk-btn-google"
                onClick={handleGoogleAuth}
                disabled={loading}
              >
                <svg className="btk-google-svg" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Bottom Switcher: specifically writes "Login" instead of "Sign In instead" */}
            <div className="btk-switch-row">
              <span>Already have an account?</span>
              <button
                type="button"
                className="btk-switch-link"
                onClick={() => {
                  setMode("login");
                  setError("");
                  setSuccess("");
                }}
              >
                Login
              </button>
            </div>
          </form>
        )}

        {/* ================= MODE: FORGOT PASSWORD ================= */}
        {mode === "forgot" && (
          <div className="btk-auth-form-clean">
            {forgotStep === 1 ? (
              <form onSubmit={handleForgotRequestOtp}>
                <p className="btk-forgot-intro">
                  Enter your registered email address to receive a secure 6-digit verification code (OTP).
                </p>

                <div className="btk-form-group">
                  <label className="btk-form-label" htmlFor="forgot-email">
                    Registered Email Address
                  </label>
                  <div className="btk-input-box">
                    <Mail size={16} className="btk-input-ico" />
                    <input
                      id="forgot-email"
                      type="email"
                      className="btk-input-element"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btk-btn-primary"
                  disabled={loading}
                >
                  <span>{loading ? "Sending Code..." : "Send Verification Code (OTP)"}</span>
                  <ArrowRight size={16} />
                </button>

                <div className="btk-switch-row">
                  <span>Remember your password?</span>
                  <button
                    type="button"
                    className="btk-switch-link"
                    onClick={() => {
                      setMode("login");
                      setError("");
                      setSuccess("");
                    }}
                  >
                    Login
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleResetPasswordSubmit}>
                <div className="btk-otp-destination-bar">
                  <div className="btk-otp-dest-left">
                    <Mail size={14} />
                    <span>Code sent to: <strong>{email}</strong></span>
                  </div>
                  <button
                    type="button"
                    className="btk-otp-edit-btn"
                    onClick={() => {
                      setForgotStep(1);
                      setError("");
                      setSuccess("");
                    }}
                  >
                    Change Email
                  </button>
                </div>

                {/* 6-Digit OTP Field */}
                <div className="btk-form-group">
                  <div className="btk-label-between">
                    <label className="btk-form-label" htmlFor="forgot-otp">
                      6-Digit Verification Code (OTP)
                    </label>
                    {resendCooldown > 0 ? (
                      <span className="btk-resend-countdown">
                        Resend in {resendCooldown}s
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="btk-resend-btn"
                        disabled={loading}
                        onClick={handleForgotRequestOtp}
                      >
                        Resend Code
                      </button>
                    )}
                  </div>
                  <div className="btk-input-box">
                    <KeyRound size={16} className="btk-input-ico" />
                    <input
                      id="forgot-otp"
                      type="text"
                      className="btk-input-element btk-otp-input"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      maxLength={6}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      required
                      autoFocus
                    />
                  </div>
                </div>

                {/* New Password */}
                <div className="btk-form-group">
                  <label className="btk-form-label" htmlFor="forgot-new-pwd">
                    New Password
                  </label>
                  <div className="btk-input-box">
                    <Lock size={16} className="btk-input-ico" />
                    <input
                      id="forgot-new-pwd"
                      type={showPassword ? "text" : "password"}
                      className="btk-input-element"
                      placeholder="At least 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btk-pwd-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="btk-form-group">
                  <div className="btk-label-between">
                    <label className="btk-form-label" htmlFor="forgot-confirm-pwd">
                      Confirm New Password
                    </label>
                    {confirmNewPassword && (
                      <span className={`btk-pwd-match-pill ${newPassword === confirmNewPassword ? "match" : "mismatch"}`}>
                        {newPassword === confirmNewPassword ? "✓ Match" : "✗ Mismatch"}
                      </span>
                    )}
                  </div>
                  <div className="btk-input-box">
                    <KeyRound size={16} className="btk-input-ico" />
                    <input
                      id="forgot-confirm-pwd"
                      type={showConfirmPassword ? "text" : "password"}
                      className="btk-input-element"
                      placeholder="Re-enter new password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btk-pwd-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btk-btn-primary"
                  disabled={loading}
                >
                  <span>{loading ? "Verifying & Updating..." : "Verify OTP & Reset Password"}</span>
                  <ArrowRight size={16} />
                </button>

                <div className="btk-switch-row">
                  <button
                    type="button"
                    className="btk-switch-link"
                    onClick={() => {
                      setForgotStep(1);
                      setError("");
                      setSuccess("");
                    }}
                  >
                    ← Re-enter email
                  </button>
                  <span style={{ opacity: 0.3 }}>•</span>
                  <button
                    type="button"
                    className="btk-switch-link"
                    onClick={() => {
                      setMode("login");
                      setError("");
                      setSuccess("");
                    }}
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;

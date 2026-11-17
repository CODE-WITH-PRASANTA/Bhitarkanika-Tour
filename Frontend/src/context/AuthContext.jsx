import React, { createContext, useContext, useEffect, useState } from "react";
import { API_BASE } from "../api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("btk_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("btk_token") || null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  // Sync state to memory and localStorage (dual-layer defense with httpOnly cookies)
  const login = (userData, tokenValue) => {
    setUser(userData);
    if (tokenValue) setToken(tokenValue);
    try {
      localStorage.setItem("btk_user", JSON.stringify(userData));
      if (tokenValue) localStorage.setItem("btk_token", tokenValue);
    } catch (e) {
      console.error("Failed to save auth to storage", e);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem("btk_user");
      localStorage.removeItem("btk_token");
      // Tell backend to clear the httpOnly btk_token cookie
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.warn("Backend logout notification failed:", e);
    }
  };

  const updateUser = (userData) => {
    const updated = { ...user, ...userData };
    setUser(updated);
    try {
      localStorage.setItem("btk_user", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to update user in storage", e);
    }
  };

  // Verify auth session on initial load via httpOnly cookie or stored token
  useEffect(() => {
    const verifySavedAuth = async () => {
      try {
        const savedToken = localStorage.getItem("btk_token");
        const headers = {};
        if (savedToken) {
          headers.Authorization = `Bearer ${savedToken}`;
        }

        const res = await fetch(`${API_BASE}/auth/me`, {
          method: "GET",
          headers,
          credentials: "include", // Pass httpOnly cookie
        });

        const json = await res.json();
        if (res.ok && json.success && json.user) {
          setUser(json.user);
          localStorage.setItem("btk_user", JSON.stringify(json.user));
        } else {
          // Cookie expired or invalid
          setUser(null);
          setToken(null);
          localStorage.removeItem("btk_user");
          localStorage.removeItem("btk_token");
        }
      } catch (err) {
        console.warn("Could not verify session with server:", err.message);
      } finally {
        setLoading(false);
      }
    };

    verifySavedAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

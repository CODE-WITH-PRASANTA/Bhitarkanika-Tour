import React, { createContext, useContext, useEffect, useState } from "react";

const AdminAuthContext = createContext(null);
const API_BASE = import.meta.env.VITE_API_BASE;

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    try {
      const stored = localStorage.getItem("btk_admin_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("btk_admin_token") || null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  const login = (adminData, tokenValue) => {
    setAdmin(adminData);
    if (tokenValue) setToken(tokenValue);
    try {
      localStorage.setItem("btk_admin_user", JSON.stringify(adminData));
      if (tokenValue) localStorage.setItem("btk_admin_token", tokenValue);
    } catch (e) {
      console.error("Failed to save admin auth to storage", e);
    }
  };

  const logout = async () => {
    setAdmin(null);
    setToken(null);
    try {
      localStorage.removeItem("btk_admin_user");
      localStorage.removeItem("btk_admin_token");
      await fetch(`${API_BASE}/admin/logout`, {
        method: "POST",
        credentials: "include",
      }).catch(() => {});
    } catch (e) {
      console.warn("Backend admin logout notification failed:", e);
    }
  };

  const updateAdmin = (adminData) => {
    const updated = { ...admin, ...adminData };
    setAdmin(updated);
    try {
      localStorage.setItem("btk_admin_user", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to update admin in storage", e);
    }
  };

  // Verify stored session on mount
  useEffect(() => {
    const verifyAdminSession = async () => {
      try {
        const savedToken = localStorage.getItem("btk_admin_token");
        if (!savedToken) {
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE}/admin/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
          credentials: "include",
        });

        const json = await res.json();
        if (res.ok && json.success && json.admin) {
          setAdmin(json.admin);
          localStorage.setItem("btk_admin_user", JSON.stringify(json.admin));
        } else {
          // Token expired or invalid
          setAdmin(null);
          setToken(null);
          localStorage.removeItem("btk_admin_user");
          localStorage.removeItem("btk_admin_token");
        }
      } catch (err) {
        console.warn("Could not verify admin session with server:", err.message);
      } finally {
        setLoading(false);
      }
    };

    verifyAdminSession();
  }, []);

  const value = {
    admin,
    token,
    isAuthenticated: !!admin,
    loading,
    login,
    logout,
    updateAdmin,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

export default AdminAuthContext;

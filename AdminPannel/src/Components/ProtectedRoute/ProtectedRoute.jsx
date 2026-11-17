import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { ShieldAlert, RefreshCw } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "#022c22",
          color: "#a7f3d0",
          gap: "14px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <RefreshCw
          size={36}
          style={{
            animation: "spin 1.2s linear infinite",
            color: "#34d399",
          }}
        />
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        <div style={{ textAlign: "center" }}>
          <strong style={{ display: "block", fontSize: "16px", color: "#ffffff" }}>
            Verifying Admin Authorization
          </strong>
          <small style={{ color: "#a7f3d0", fontSize: "12.5px" }}>
            Connecting to Bhitarkanika Command Center...
          </small>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;

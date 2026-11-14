import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          fontFamily: "'Cinzel', Georgia, serif",
          color: "#1b3d2f",
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            border: "3px solid #e0eae4",
            borderTopColor: "#059669",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            marginBottom: "16px",
          }}
        />
        <p style={{ fontSize: "14px", letterSpacing: "1px", fontWeight: "600" }}>
          VERIFYING SECURE SESSION...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuthStore } from "../../store/adminAuthStore";

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAdminAuthStore();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminProtectedRoute;

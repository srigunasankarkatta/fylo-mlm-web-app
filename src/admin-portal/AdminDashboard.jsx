import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./shared/layouts/AdminLayout";
import AdminDashboardPage from "./features/dashboard/AdminDashboardPage";
import { useAdminAuthStore } from "./store/adminAuthStore";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const adminAuth = useAdminAuthStore();
  const { user, logout, initializeAuth } = adminAuth;

  console.log("AdminDashboard useAdminAuthStore returned:", {
    adminAuth,
    user,
    logout: typeof logout,
    initializeAuth: typeof initializeAuth,
    hasLogout: !!logout,
  });

  useEffect(() => {
    // Initialize auth state on component mount
    initializeAuth();
  }, [initializeAuth]);

  const handleLogout = () => {
    console.log("AdminDashboard handleLogout called");
    logout();
    navigate("/admin/login");
  };

  console.log("AdminDashboard rendering with:", {
    handleLogout: typeof handleLogout,
    user,
    hasLogout: !!logout,
  });

  return (
    <AdminLayout onLogout={handleLogout} user={user}>
      <AdminDashboardPage />
    </AdminLayout>
  );
};

export default AdminDashboard;

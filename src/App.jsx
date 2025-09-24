import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  CustomerLayout,
  HomePage,
  FeaturesPage,
  PackagesPage,
  CustomerInvestmentPlansPage,
  FAQPage,
  ContactPage,
  LoginPage,
  RegisterPage,
  DashboardPage,
  ProtectedRoute,
} from "./customer-portal";
import PackageManagementPage from "./customer-portal/features/packages/PackageManagementPage";
import {
  AdminLoginPage,
  AdminProtectedRoute,
  AdminLayout,
  AdminDashboard,
  AdminUsersPage,
  AdminUserDetailsPage,
  AdminPackagesPage,
  AdminInvestmentPlansPage,
  AdminCreateInvestmentPlanPage,
  AdminEditInvestmentPlanPage,
  AdminInvestmentPlanDetailsPage,
} from "./admin-portal";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages with CustomerLayout */}
        <Route
          path="/"
          element={
            <CustomerLayout>
              <HomePage />
            </CustomerLayout>
          }
        />
        <Route
          path="/features"
          element={
            <CustomerLayout>
              <FeaturesPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/packages"
          element={
            <CustomerLayout>
              <PackagesPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/investment-plans"
          element={
            <ProtectedRoute>
              <CustomerLayout>
                <CustomerInvestmentPlansPage />
              </CustomerLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/packages/manage"
          element={
            <ProtectedRoute>
              <CustomerLayout>
                <PackageManagementPage />
              </CustomerLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faq"
          element={
            <CustomerLayout>
              <FAQPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <CustomerLayout>
              <ContactPage />
            </CustomerLayout>
          }
        />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <CustomerLayout>
                <DashboardPage />
              </CustomerLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Portal Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminUsersPage />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/users/:id"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminUserDetailsPage />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/packages"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminPackagesPage />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/investment-plans"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminInvestmentPlansPage />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/investment-plans/create"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminCreateInvestmentPlanPage />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/investment-plans/:id/edit"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminEditInvestmentPlanPage />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/investment-plans/:id"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminInvestmentPlanDetailsPage />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        {/* Pages without CustomerLayout (full-screen auth pages) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;

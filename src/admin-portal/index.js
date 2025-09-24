// Admin Portal Entry Point
export { default as AdminLayout } from "./shared/layouts/AdminLayout";
export { default as AdminHeader } from "./shared/partials/AdminHeader";
export { default as AdminSidebar } from "./shared/partials/AdminSidebar";
export { default as AdminFooter } from "./shared/partials/AdminFooter";

// Auth Components
export { AdminLoginPage } from "./features/auth";
export { AdminProtectedRoute, AdminTable } from "./shared/components";

// Features
export { default as AdminDashboard } from "./AdminDashboard";
export { default as AdminDashboardPage } from "./features/dashboard/AdminDashboardPage";
export { AdminUsersPage, AdminUserDetailsPage } from "./features/users";
export { AdminPackagesPage } from "./features/packages";
export {
  AdminInvestmentPlansPage,
  AdminCreateInvestmentPlanPage,
  AdminEditInvestmentPlanPage,
  AdminInvestmentPlanDetailsPage,
} from "./features/investment-plans";

// Store
export { useAdminAuthStore } from "./store/adminAuthStore";

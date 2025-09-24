import React from "react";
import clsx from "clsx";
import AdminHeader from "../partials/AdminHeader";
import AdminSidebar from "../partials/AdminSidebar";
import AdminFooter from "../partials/AdminFooter";
import styles from "./AdminLayout.module.scss";

const AdminLayout = ({ children, onLogout, user }) => {
  console.log("AdminLayout props:", {
    onLogout,
    user,
    hasOnLogout: typeof onLogout === "function",
  });
  return (
    <div
      className={clsx("min-h-screen", styles.adminLayout)}
      data-theme="admin"
    >
      {/* Sidebar */}
      <AdminSidebar onLogout={onLogout} user={user} />

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        {/* Header */}
        <AdminHeader onLogout={onLogout} user={user} />

        {/* Page Content */}
        <main className={styles.pageContent}>{children}</main>

        {/* Footer */}
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;

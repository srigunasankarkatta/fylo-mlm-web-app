import React from "react";
import styles from "./AdminDashboardPage.module.scss";

const AdminDashboardPage = () => {
  return (
    <div className={styles.dashboardPage}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <p className={styles.pageDescription}>
          Welcome to the Fylo MLM Admin Dashboard. Monitor your business
          performance and manage your network.
        </p>
      </div>

      {/* Empty Content Area */}
      <div className={styles.emptyContent}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className={styles.emptyTitle}>Dashboard Content Coming Soon</h3>
          <p className={styles.emptyDescription}>
            This dashboard will be populated with analytics, charts, and key
            metrics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

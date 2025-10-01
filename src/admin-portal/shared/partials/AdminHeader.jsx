import React, { useState } from "react";
import clsx from "clsx";
import styles from "./AdminHeader.module.scss";
import { useAdminAuthStore } from "../../store/adminAuthStore";

const AdminHeader = ({ onLogout, user }) => {
  console.log("AdminHeader props:", {
    onLogout,
    user,
    hasOnLogout: typeof onLogout === "function",
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className={styles.adminHeader}>
      <div className={styles.headerContent}>
        {/* Left Section - Search */}
        <div className={styles.leftSection}>
          <div className={styles.searchContainer}>
            <svg
              className={styles.searchIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Right Section - Notifications & Profile */}
        <div className={styles.rightSection}>
          {/* Notifications */}
          <button className={styles.notificationButton}>
            <svg
              className={styles.notificationIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-5 5v-5zM9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className={styles.notificationBadge}>3</span>
          </button>

          {/* Profile Dropdown */}
          <div className={styles.profileContainer}>
            <button
              className={styles.profileButton}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className={styles.profileAvatar}>
                <span className={styles.avatarText}>A</span>
              </div>
              <div className={styles.profileInfo}>
                <span className={styles.profileName}>
                  {user?.name || "Admin User"}
                </span>
                <span className={styles.profileRole}>
                  {user?.role_hint || "Administrator"}
                </span>
              </div>
              <svg
                className={clsx(styles.dropdownIcon, {
                  [styles.dropdownIconOpen]: isProfileOpen,
                })}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className={styles.profileDropdown}>
                <a href="#" className={styles.dropdownItem}>
                  <svg
                    className={styles.dropdownItemIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile
                </a>
                <a href="#" className={styles.dropdownItem}>
                  <svg
                    className={styles.dropdownItemIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </a>
                <div className={styles.dropdownDivider} />
                <button
                  className={styles.dropdownItem}
                  onClick={() => {
                    // Use the proper logout function from the store
                    const { logout } = useAdminAuthStore.getState();
                    logout();
                    window.location.href = "/admin/login";
                  }}
                >
                  <svg
                    className={styles.dropdownItemIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H3m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

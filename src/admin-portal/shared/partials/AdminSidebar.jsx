import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "./AdminSidebar.module.scss";
import { useAdminAuthStore } from "../../store/adminAuthStore";

const AdminSidebar = ({ onLogout, user }) => {
  console.log("AdminSidebar props:", {
    onLogout,
    user,
    hasOnLogout: typeof onLogout === "function",
  });

  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [expandedMenus, setExpandedMenus] = useState({});

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
          />
        </svg>
      ),
      href: "/admin/dashboard",
    },
    {
      id: "users",
      label: "User Management",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
      children: [{ id: "all-users", label: "All Users", href: "/admin/users" }],
    },
    {
      id: "packages",
      label: "Package Management",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      children: [
        { id: "all-packages", label: "All Packages", href: "/admin/packages" },
      ],
    },
    {
      id: "investment-plans",
      label: "Investment Plans",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      children: [
        {
          id: "all-investment-plans",
          label: "All Plans",
          href: "/admin/investment-plans",
        },
        {
          id: "create-plan",
          label: "Create Plan",
          href: "/admin/investment-plans/create",
        },
      ],
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      children: [
        {
          id: "all-transactions",
          label: "All Transactions",
          href: "/admin/transactions",
        },
        {
          id: "investment-transactions",
          label: "Investment Transactions",
          href: "/admin/investment-transactions",
        },
      ],
    },
  ];

  const toggleMenu = (menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const handleMenuClick = (menuId, href) => {
    setActiveMenu(menuId);
    if (href) {
      navigate(href);
    }
  };

  return (
    <aside className={styles.adminSidebar}>
      {/* Logo Section - Sticky */}
      <div className={styles.logoSection}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className={styles.logoText}>Fylo Admin</span>
        </div>
      </div>

      {/* Navigation Menu - Scrollable */}
      <nav className={styles.navigation}>
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <li key={item.id} className={styles.menuItem}>
              {item.children ? (
                <>
                  <button
                    className={clsx(styles.menuButton, {
                      [styles.menuButtonActive]: activeMenu === item.id,
                    })}
                    onClick={() => toggleMenu(item.id)}
                  >
                    <span className={styles.menuIcon}>{item.icon}</span>
                    <span className={styles.menuLabel}>{item.label}</span>
                    <svg
                      className={clsx(styles.chevronIcon, {
                        [styles.chevronIconOpen]: expandedMenus[item.id],
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
                  {expandedMenus[item.id] && (
                    <ul className={styles.submenuList}>
                      {item.children.map((subItem) => (
                        <li key={subItem.id} className={styles.submenuItem}>
                          <button
                            className={clsx(styles.submenuButton, {
                              [styles.submenuButtonActive]:
                                activeMenu === subItem.id,
                            })}
                            onClick={() =>
                              handleMenuClick(subItem.id, subItem.href)
                            }
                          >
                            {subItem.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <button
                  className={clsx(styles.menuButton, {
                    [styles.menuButtonActive]: activeMenu === item.id,
                  })}
                  onClick={() => handleMenuClick(item.id, item.href)}
                >
                  <span className={styles.menuIcon}>{item.icon}</span>
                  <span className={styles.menuLabel}>{item.label}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Section - Sticky */}
      <div className={styles.logoutSection}>
        <button
          className={styles.logoutButton}
          onClick={() => {
            // Use the proper logout function from the store
            const { logout } = useAdminAuthStore.getState();
            logout();
            window.location.href = "/admin/login";
          }}
        >
          <svg
            className={styles.logoutIcon}
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
          <span className={styles.logoutText}>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

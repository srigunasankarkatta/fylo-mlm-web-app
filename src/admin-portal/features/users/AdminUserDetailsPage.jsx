import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminApi } from "../../apiClient";
import styles from "./AdminUserDetailsPage.module.scss";

const AdminUserDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const fetchUserDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await adminApi.get(`/admin/users/${id}`);

      if (response.data.status === "success") {
        setUser(response.data.data);
      } else {
        setError("Failed to fetch user details");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: styles.statusActive,
      inactive: styles.statusInactive,
      pending: styles.statusPending,
    };

    return (
      <span
        className={`${styles.statusBadge} ${
          statusClasses[status] || styles.statusInactive
        }`}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className={styles.userDetailsPage}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.userDetailsPage}>
        <div className={styles.errorState}>
          <svg
            className={styles.errorIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p>{error}</p>
          <div className={styles.errorActions}>
            <button
              onClick={() => fetchUserDetails()}
              className={styles.retryButton}
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/admin/users")}
              className={styles.backButton}
            >
              Back to Users
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.userDetailsPage}>
        <div className={styles.emptyState}>
          <svg
            className={styles.emptyIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p>User not found</p>
          <button
            onClick={() => navigate("/admin/users")}
            className={styles.backButton}
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.userDetailsPage}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTop}>
          <button
            onClick={() => navigate("/admin/users")}
            className={styles.backButton}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Users
          </button>
          <div className={styles.headerActions}>
            <button className={styles.editButton}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit User
            </button>
          </div>
        </div>
        <h1 className={styles.pageTitle}>User Details</h1>
        <p className={styles.pageDescription}>
          View and manage user information
        </p>
      </div>

      {/* User Profile Card */}
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.userAvatar}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className={styles.userInfo}>
            <h2 className={styles.userName}>{user.name}</h2>
            <p className={styles.userEmail}>{user.email}</p>
            <div className={styles.userMeta}>
              <span className={styles.userId}>ID: {user.id}</span>
              <span className={styles.userUuid}>UUID: {user.uuid}</span>
            </div>
          </div>
          <div className={styles.userStatus}>{getStatusBadge(user.status)}</div>
        </div>
      </div>

      {/* User Details Grid */}
      <div className={styles.detailsGrid}>
        {/* Basic Information */}
        <div className={styles.detailCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Basic Information</h3>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Name</span>
              <span className={styles.detailValue}>{user.name}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Email</span>
              <span className={styles.detailValue}>{user.email}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Phone</span>
              <span className={styles.detailValue}>
                {user.phone || "Not provided"}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Status</span>
              <span className={styles.detailValue}>
                {getStatusBadge(user.status)}
              </span>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className={styles.detailCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Account Information</h3>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Referral Code</span>
              <span className={styles.detailValue}>
                <code className={styles.referralCode}>
                  {user.referral_code}
                </code>
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Referred By</span>
              <span className={styles.detailValue}>
                {user.referred_by
                  ? `User ID: ${user.referred_by}`
                  : "Not referred"}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Parent ID</span>
              <span className={styles.detailValue}>
                {user.parent_id ? user.parent_id : "None"}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Position</span>
              <span className={styles.detailValue}>
                {user.position || "Not assigned"}
              </span>
            </div>
          </div>
        </div>

        {/* Verification Status */}
        <div className={styles.detailCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Verification Status</h3>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Email Verified</span>
              <span className={styles.detailValue}>
                {user.email_verified_at ? (
                  <span className={styles.verified}>✓ Verified</span>
                ) : (
                  <span className={styles.unverified}>✗ Not verified</span>
                )}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Phone Verified</span>
              <span className={styles.detailValue}>
                {user.phone_verified_at ? (
                  <span className={styles.verified}>✓ Verified</span>
                ) : (
                  <span className={styles.unverified}>✗ Not verified</span>
                )}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Email Verified At</span>
              <span className={styles.detailValue}>
                {formatDate(user.email_verified_at)}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Phone Verified At</span>
              <span className={styles.detailValue}>
                {formatDate(user.phone_verified_at)}
              </span>
            </div>
          </div>
        </div>

        {/* Roles & Permissions */}
        <div className={styles.detailCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Roles & Permissions</h3>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Roles</span>
              <div className={styles.rolesList}>
                {user.roles.map((role) => (
                  <span key={role.id} className={styles.roleBadge}>
                    {role.name}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Permissions</span>
              <div className={styles.permissionsList}>
                {user.permissions.length > 0 ? (
                  user.permissions.map((permission, index) => (
                    <span key={index} className={styles.permissionBadge}>
                      {permission}
                    </span>
                  ))
                ) : (
                  <span className={styles.noPermissions}>
                    No specific permissions
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Information */}
        <div className={styles.detailCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Activity Information</h3>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Last Login</span>
              <span className={styles.detailValue}>
                {formatDate(user.last_login_at)}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Last Login IP</span>
              <span className={styles.detailValue}>
                {user.last_login_ip || "Not available"}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Account Created</span>
              <span className={styles.detailValue}>
                {formatDate(user.created_at)}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Last Updated</span>
              <span className={styles.detailValue}>
                {formatDate(user.updated_at)}
              </span>
            </div>
          </div>
        </div>

        {/* Package Information */}
        <div className={styles.detailCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Package Information</h3>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Package ID</span>
              <span className={styles.detailValue}>
                {user.package_id ? user.package_id : "No package assigned"}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Role Hint</span>
              <span className={styles.detailValue}>
                {user.role_hint || "Not specified"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetailsPage;

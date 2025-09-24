import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminApi } from "../../apiClient";
import styles from "./AdminInvestmentPlanDetailsPage.module.scss";

const AdminInvestmentPlanDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await adminApi.get(`/admin/investment-plans/${id}`);
        if (response.data.status === "success") {
          setPlan(response.data.data);
        } else {
          setError("Failed to fetch investment plan");
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch investment plan"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlan();
    }
  }, [id]);

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

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(parseFloat(amount));
  };

  const formatPercentage = (value) => {
    return `${value}%`;
  };

  const handleEdit = () => {
    navigate(`/admin/investment-plans/${id}/edit`);
  };

  const handleBack = () => {
    navigate("/admin/investment-plans");
  };

  const handleToggleStatus = async () => {
    try {
      const response = await adminApi.patch(
        `/admin/investment-plans/${id}/toggle-status`
      );
      if (response.data.status === "success") {
        // Refresh the plan data
        const updatedResponse = await adminApi.get(
          `/admin/investment-plans/${id}`
        );
        if (updatedResponse.data.status === "success") {
          setPlan(updatedResponse.data.data);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to toggle plan status");
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm("Are you sure you want to delete this investment plan?")
    ) {
      try {
        const response = await adminApi.delete(`/admin/investment-plans/${id}`);
        if (response.data.status === "success") {
          navigate("/admin/investment-plans");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete plan");
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.planDetailsPage}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
          <p>Loading investment plan...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.planDetailsPage}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3>Error Loading Plan</h3>
          <p>{error}</p>
          <button onClick={handleBack} className={styles.retryButton}>
            Back to Plans
          </button>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className={styles.planDetailsPage}>
        <div className={styles.errorContainer}>
          <h3>Plan Not Found</h3>
          <p>The investment plan you're looking for doesn't exist.</p>
          <button onClick={handleBack} className={styles.retryButton}>
            Back to Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.planDetailsPage}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTop}>
          <div className={styles.headerLeft}>
            <button onClick={handleBack} className={styles.backButton}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Plans
            </button>
            <div className={styles.titleSection}>
              <h1 className={styles.pageTitle}>{plan.name}</h1>
              <div className={styles.statusContainer}>
                <span
                  className={`${styles.statusBadge} ${
                    plan.is_active ? styles.statusActive : styles.statusInactive
                  }`}
                >
                  {plan.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button
              onClick={handleToggleStatus}
              className={styles.toggleButton}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    plan.is_active
                      ? "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                      : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  }
                />
              </svg>
              {plan.is_active ? "Deactivate" : "Activate"}
            </button>
            <button onClick={handleEdit} className={styles.editButton}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Plan
            </button>
            <button onClick={handleDelete} className={styles.deleteButton}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>
        <p className={styles.pageDescription}>
          Investment plan details and information
        </p>
      </div>

      {/* Plan Details */}
      <div className={styles.detailsContainer}>
        {/* Basic Information */}
        <div className={styles.detailsSection}>
          <h3 className={styles.sectionTitle}>Basic Information</h3>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <label>Plan Name</label>
              <span>{plan.name}</span>
            </div>
            <div className={styles.detailItem}>
              <label>Plan ID</label>
              <span>#{plan.id}</span>
            </div>
            <div className={styles.detailItem}>
              <label>Status</label>
              <span
                className={`${styles.statusBadge} ${
                  plan.is_active ? styles.statusActive : styles.statusInactive
                }`}
              >
                {plan.is_active ? "Active" : "Inactive"}
              </span>
            </div>
            <div className={styles.detailItem}>
              <label>Description</label>
              <span>{plan.description || "No description provided"}</span>
            </div>
          </div>
        </div>

        {/* Financial Details */}
        <div className={styles.detailsSection}>
          <h3 className={styles.sectionTitle}>Financial Details</h3>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <label>Minimum Amount</label>
              <span className={styles.amount}>
                {formatAmount(plan.min_amount)}
              </span>
            </div>
            <div className={styles.detailItem}>
              <label>Maximum Amount</label>
              <span className={styles.amount}>
                {plan.max_amount ? formatAmount(plan.max_amount) : "Unlimited"}
              </span>
            </div>
            <div className={styles.detailItem}>
              <label>Daily Profit Percent</label>
              <span className={styles.percentage}>
                {formatPercentage(plan.daily_profit_percent)}
              </span>
            </div>
            <div className={styles.detailItem}>
              <label>Referral Percent</label>
              <span className={styles.percentage}>
                {formatPercentage(plan.referral_percent)}
              </span>
            </div>
            <div className={styles.detailItem}>
              <label>Duration</label>
              <span>{plan.duration_days} days</span>
            </div>
          </div>
        </div>

        {/* Timestamps */}
        <div className={styles.detailsSection}>
          <h3 className={styles.sectionTitle}>Timestamps</h3>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <label>Created At</label>
              <span>{formatDate(plan.created_at)}</span>
            </div>
            <div className={styles.detailItem}>
              <label>Updated At</label>
              <span>{formatDate(plan.updated_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInvestmentPlanDetailsPage;

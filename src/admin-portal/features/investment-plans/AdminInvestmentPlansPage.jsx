import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../../apiClient";
import { AdminTable } from "../../shared/components";
import styles from "./AdminInvestmentPlansPage.module.scss";

const AdminInvestmentPlansPage = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    min_amount: "",
    max_amount: "",
  });

  const fetchPlans = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: pagination.per_page.toString(),
        ...(filters.search && { search: filters.search }),
        ...(filters.status && { status: filters.status }),
        ...(filters.min_amount && { min_amount: filters.min_amount }),
        ...(filters.max_amount && { max_amount: filters.max_amount }),
      });

      const response = await adminApi.get(`/admin/investment-plans?${params}`);

      if (response.data.status === "success") {
        setPlans(response.data.data);
        setPagination(response.data.meta.pagination);
        setTotalCount(response.data.meta.pagination.total);
      } else {
        setError("Failed to fetch investment plans");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch investment plans"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPlans(1);
  };

  const handlePageChange = (page) => {
    fetchPlans(page);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString();
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

  const getStatusBadge = (isActive) => {
    return (
      <span
        className={`${styles.statusBadge} ${
          isActive ? styles.statusActive : styles.statusInactive
        }`}
      >
        {isActive ? "Active" : "Inactive"}
      </span>
    );
  };

  const handleToggleStatus = async (planId, currentStatus) => {
    try {
      const response = await adminApi.patch(
        `/admin/investment-plans/${planId}/toggle-status`
      );
      if (response.data.status === "success") {
        // Refresh the plans list
        fetchPlans(pagination.current_page);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to toggle plan status");
    }
  };

  const handleDelete = async (planId) => {
    if (
      window.confirm("Are you sure you want to delete this investment plan?")
    ) {
      try {
        const response = await adminApi.delete(
          `/admin/investment-plans/${planId}`
        );
        if (response.data.status === "success") {
          // Refresh the plans list
          fetchPlans(pagination.current_page);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete plan");
      }
    }
  };

  // Define table columns
  const columns = [
    {
      key: "plan",
      title: "Plan",
      width: "200px",
      render: (value, plan) => (
        <div className={styles.planInfo}>
          <div className={styles.planIcon}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className={styles.planDetails}>
            <span className={styles.planName}>{plan.name}</span>
            <span className={styles.planId}>ID: {plan.id}</span>
          </div>
        </div>
      ),
    },
    {
      key: "min_amount",
      title: "Min Amount",
      width: "120px",
      render: (value) => formatAmount(value),
    },
    {
      key: "max_amount",
      title: "Max Amount",
      width: "120px",
      render: (value) => (value ? formatAmount(value) : "Unlimited"),
    },
    {
      key: "daily_profit_percent",
      title: "Daily Profit",
      width: "100px",
      render: (value) => formatPercentage(value),
    },
    {
      key: "duration_days",
      title: "Duration",
      width: "100px",
      render: (value) => `${value} days`,
    },
    {
      key: "referral_percent",
      title: "Referral %",
      width: "100px",
      render: (value) => formatPercentage(value),
    },
    {
      key: "is_active",
      title: "Status",
      width: "100px",
      render: (value) => getStatusBadge(value),
    },
    {
      key: "created_at",
      title: "Created",
      width: "120px",
      render: (value) => formatDate(value),
    },
  ];

  // Define table actions
  const renderActions = (plan) => (
    <div className={styles.actions}>
      <button
        className={styles.actionButton}
        title="View Details"
        onClick={() => navigate(`/admin/investment-plans/${plan.id}`)}
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </button>
      <button
        className={styles.actionButton}
        title="Edit Plan"
        onClick={() => navigate(`/admin/investment-plans/${plan.id}/edit`)}
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </button>
      <button
        className={styles.actionButton}
        title={plan.is_active ? "Deactivate" : "Activate"}
        onClick={() => handleToggleStatus(plan.id, plan.is_active)}
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
      </button>
      <button
        className={styles.actionButton}
        title="Delete Plan"
        onClick={() => handleDelete(plan.id)}
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );

  return (
    <div className={styles.investmentPlansPage}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTop}>
          <h1 className={styles.pageTitle}>Investment Plans Management</h1>
          <div className={styles.headerActions}>
            <button
              className={styles.createButton}
              onClick={() => navigate("/admin/investment-plans/create")}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Plan
            </button>
          </div>
        </div>
        <p className={styles.pageDescription}>
          Manage and view all investment plans in the system
        </p>
      </div>

      {/* Filters Section */}
      <div className={styles.filtersSection}>
        <form onSubmit={handleSearch} className={styles.filtersForm}>
          <div className={styles.searchGroup}>
            <div className={styles.searchInput}>
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
                placeholder="Search plans by name..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.filterGroup}>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className={styles.statusSelect}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <input
              type="number"
              placeholder="Min Amount"
              value={filters.min_amount}
              onChange={(e) => handleFilterChange("min_amount", e.target.value)}
              className={styles.amountInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <input
              type="number"
              placeholder="Max Amount"
              value={filters.max_amount}
              onChange={(e) => handleFilterChange("max_amount", e.target.value)}
              className={styles.amountInput}
            />
          </div>

          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
      </div>

      {/* Investment Plans Table */}
      <AdminTable
        columns={columns}
        data={plans}
        loading={loading}
        error={error}
        onRetry={() => fetchPlans()}
        pagination={pagination}
        onPageChange={handlePageChange}
        emptyMessage="No investment plans found"
        actions={renderActions}
        rowKey="id"
        serverSide={true}
        totalCount={totalCount}
        itemsPerPage={pagination.per_page}
      />
    </div>
  );
};

export default AdminInvestmentPlansPage;

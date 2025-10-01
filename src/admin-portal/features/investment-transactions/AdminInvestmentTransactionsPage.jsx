import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../../apiClient";
import { AdminTable } from "../../shared/components";
import styles from "./AdminInvestmentTransactionsPage.module.scss";

const AdminInvestmentTransactionsPage = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
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
    amount_from: "",
    amount_to: "",
    date_from: "",
    date_to: "",
  });

  const fetchTransactions = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: pagination.per_page.toString(),
        ...(filters.search && { search: filters.search }),
        ...(filters.status && { status: filters.status }),
        ...(filters.amount_from && { amount_from: filters.amount_from }),
        ...(filters.amount_to && { amount_to: filters.amount_to }),
        ...(filters.date_from && { date_from: filters.date_from }),
        ...(filters.date_to && { date_to: filters.date_to }),
      });

      const response = await adminApi.get(
        `/admin/investment-transactions?${params}`
      );

      console.log("API Response:", response.data);
      console.log("Response status:", response.data.status);
      console.log("Response data:", response.data.data);
      console.log("Response meta:", response.data.meta);

      if (response.data.status === "success") {
        setTransactions(response.data.data);
        setPagination({
          current_page: response.data.meta.pagination.current_page,
          per_page: response.data.meta.pagination.per_page,
          total: response.data.meta.pagination.total,
          total_pages: response.data.meta.pagination.total_pages,
        });
        setTotalCount(response.data.meta.pagination.total);
        console.log("Transactions set:", response.data.data);
      } else {
        setError("Failed to fetch investment transactions");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch investment transactions"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTransactions(1);
  };

  const handlePageChange = (page) => {
    fetchTransactions(page);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "",
      amount_from: "",
      amount_to: "",
      date_from: "",
      date_to: "",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: styles.statusActive,
      completed: styles.statusCompleted,
      pending: styles.statusPending,
      cancelled: styles.statusCancelled,
    };

    return (
      <span
        className={`${styles.statusBadge} ${
          statusClasses[status] || styles.statusPending
        }`}
      >
        {status}
      </span>
    );
  };

  const getInvestmentIcon = () => {
    return (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    );
  };

  // Define table columns
  const columns = [
    {
      key: "transaction",
      title: "Investment",
      width: "200px",
      render: (value, transaction) => (
        <div className={styles.transactionInfo}>
          <div className={styles.transactionIcon}>{getInvestmentIcon()}</div>
          <div className={styles.transactionDetails}>
            <span className={styles.transactionId}>#{transaction.id}</span>
            <span className={styles.transactionType}>Investment</span>
          </div>
        </div>
      ),
    },
    {
      key: "user",
      title: "User",
      width: "180px",
      render: (value, transaction) => (
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            {transaction.user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className={styles.userDetails}>
            <span className={styles.userName}>
              {transaction.user?.name || "Unknown"}
            </span>
            <span className={styles.userEmail}>
              {transaction.user?.email || "N/A"}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "investmentPlan",
      title: "Investment Plan",
      width: "150px",
      render: (value, transaction) => (
        <div className={styles.planInfo}>
          <span className={styles.planName}>
            {transaction.investment_plan?.name || "N/A"}
          </span>
          <span className={styles.planCode}>
            {transaction.investment_plan?.code || "N/A"}
          </span>
        </div>
      ),
    },
    {
      key: "amount",
      title: "Amount",
      width: "120px",
      render: (value, transaction) => (
        <div className={styles.amountContainer}>
          <span className={`${styles.amount} ${styles.amountPositive}`}>
            {formatCurrency(transaction.amount)}
          </span>
        </div>
      ),
    },
    {
      key: "daily_profit_percent",
      title: "Daily Profit %",
      width: "120px",
      render: (value) => <span className={styles.profitPercent}>{value}%</span>,
    },
    {
      key: "duration_days",
      title: "Duration",
      width: "100px",
      render: (value) => <span className={styles.duration}>{value} days</span>,
    },
    {
      key: "status",
      title: "Status",
      width: "110px",
      render: (value) => getStatusBadge(value),
    },
    {
      key: "invested_at",
      title: "Invested Date",
      width: "150px",
      render: (value) => formatDate(value),
    },
  ];

  // Define table actions
  const renderActions = (transaction) => (
    <div className={styles.actions}>
      <button
        className={styles.actionButton}
        title="View Details"
        onClick={() =>
          navigate(`/admin/investment-transactions/${transaction.id}`)
        }
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
    </div>
  );

  return (
    <div className={styles.transactionsPage}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Investment Transactions</h1>
          <p className={styles.pageDescription}>
            Monitor and manage all investment transactions
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            onClick={() => fetchTransactions()}
            className={styles.refreshButton}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>
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
                placeholder="Search by transaction ID, user name, or plan name..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.filterGroup}>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <input
              type="number"
              placeholder="Min Amount"
              value={filters.amount_from}
              onChange={(e) =>
                handleFilterChange("amount_from", e.target.value)
              }
              className={styles.amountInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <input
              type="number"
              placeholder="Max Amount"
              value={filters.amount_to}
              onChange={(e) => handleFilterChange("amount_to", e.target.value)}
              className={styles.amountInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <input
              type="date"
              value={filters.date_from}
              onChange={(e) => handleFilterChange("date_from", e.target.value)}
              className={styles.dateInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <input
              type="date"
              value={filters.date_to}
              onChange={(e) => handleFilterChange("date_to", e.target.value)}
              className={styles.dateInput}
            />
          </div>

          <div className={styles.filterActions}>
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
            <button
              type="button"
              onClick={clearFilters}
              className={styles.clearButton}
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Transactions Table */}
      {console.log("Rendering AdminTable with:", {
        transactions,
        loading,
        error,
        pagination,
        totalCount,
      })}
      <AdminTable
        columns={columns}
        data={transactions}
        loading={loading}
        error={error}
        onRetry={() => fetchTransactions()}
        pagination={pagination}
        onPageChange={handlePageChange}
        emptyMessage="No investment transactions found"
        actions={renderActions}
        rowKey="id"
        serverSide={true}
        totalCount={totalCount}
        itemsPerPage={pagination.per_page}
      />
    </div>
  );
};

export default AdminInvestmentTransactionsPage;

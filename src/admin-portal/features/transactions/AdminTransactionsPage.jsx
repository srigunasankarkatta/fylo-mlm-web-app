import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../../apiClient";
import { AdminTable } from "../../shared/components";
import styles from "./AdminTransactionsPage.module.scss";

const AdminTransactionsPage = () => {
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
    payment_status: "",
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
        ...(filters.payment_status && {
          payment_status: filters.payment_status,
        }),
        ...(filters.amount_from && { amount_from: filters.amount_from }),
        ...(filters.amount_to && { amount_to: filters.amount_to }),
        ...(filters.date_from && { date_from: filters.date_from }),
        ...(filters.date_to && { date_to: filters.date_to }),
      });

      const response = await adminApi.get(
        `/admin/package-transactions?${params}`
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
        setError("Failed to fetch transactions");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch transactions");
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
      payment_status: "",
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
      completed: styles.statusCompleted,
      pending: styles.statusPending,
      failed: styles.statusFailed,
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

  const getTypeIcon = (type) => {
    const icons = {
      deposit: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
      withdrawal: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H4m16 0l-4-4m4 4l-4 4"
          />
        </svg>
      ),
      transfer: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
      bonus: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
    };

    return (
      <div className={styles.typeIcon}>{icons[type] || icons.deposit}</div>
    );
  };

  // Define table columns
  const columns = [
    {
      key: "transaction",
      title: "Transaction",
      width: "200px",
      render: (value, transaction) => (
        <div className={styles.transactionInfo}>
          <div className={styles.transactionIcon}>{getTypeIcon("deposit")}</div>
          <div className={styles.transactionDetails}>
            <span className={styles.transactionId}>#{transaction.id}</span>
            <span className={styles.transactionType}>Package Purchase</span>
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
      key: "package",
      title: "Package",
      width: "150px",
      render: (value, transaction) => (
        <div className={styles.packageInfo}>
          <span className={styles.packageName}>
            {transaction.package?.name || "N/A"}
          </span>
          <span className={styles.packageCode}>
            {transaction.package?.code || "N/A"}
          </span>
        </div>
      ),
    },
    {
      key: "amount_paid",
      title: "Amount Paid",
      width: "120px",
      render: (value, transaction) => (
        <div className={styles.amountContainer}>
          <span className={`${styles.amount} ${styles.amountPositive}`}>
            {formatCurrency(transaction.amount_paid)}
          </span>
        </div>
      ),
    },
    {
      key: "payment_status",
      title: "Status",
      width: "110px",
      render: (value) => getStatusBadge(value),
    },
    {
      key: "payment_reference",
      title: "Reference",
      width: "150px",
      render: (value) => (
        <span className={styles.reference} title={value}>
          {value || "N/A"}
        </span>
      ),
    },
    {
      key: "purchase_at",
      title: "Purchase Date",
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
        onClick={() => navigate(`/admin/transactions/${transaction.id}`)}
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
          <h1 className={styles.pageTitle}>Package Transactions</h1>
          <p className={styles.pageDescription}>
            Monitor and manage all package purchase transactions
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
                placeholder="Search by transaction ID, user name, or package name..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.filterGroup}>
            <select
              value={filters.payment_status}
              onChange={(e) =>
                handleFilterChange("payment_status", e.target.value)
              }
              className={styles.filterSelect}
            >
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
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
        emptyMessage="No transactions found"
        actions={renderActions}
        rowKey="id"
        serverSide={true}
        totalCount={totalCount}
        itemsPerPage={pagination.per_page}
      />
    </div>
  );
};

export default AdminTransactionsPage;

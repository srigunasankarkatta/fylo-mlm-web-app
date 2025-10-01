import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminApi } from "../../apiClient";
import styles from "./AdminTransactionDetailsPage.module.scss";

const AdminTransactionDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransaction = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await adminApi.get(`/admin/package-transactions/${id}`);

      if (response.data.status === "success") {
        setTransaction(response.data.data);
      } else {
        setError("Failed to fetch transaction details");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch transaction details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTransaction();
    }
  }, [id]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
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

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading transaction details...</p>
      </div>
    );
  }

  if (error) {
    return (
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
        <h2>Error Loading Transaction</h2>
        <p>{error}</p>
        <button onClick={fetchTransaction} className={styles.retryButton}>
          Try Again
        </button>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className={styles.errorContainer}>
        <h2>Transaction Not Found</h2>
        <p>The transaction you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate("/admin/transactions")}
          className={styles.backButton}
        >
          Back to Transactions
        </button>
      </div>
    );
  }

  return (
    <div className={styles.transactionDetailsPage}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <button
            onClick={() => navigate("/admin/transactions")}
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
            Back to Transactions
          </button>
          <div>
            <h1 className={styles.pageTitle}>Transaction #{transaction.id}</h1>
            <p className={styles.pageDescription}>
              View and manage transaction details
            </p>
          </div>
        </div>
      </div>

      {/* Transaction Overview */}
      <div className={styles.overviewSection}>
        <div className={styles.overviewCard}>
          <div className={styles.transactionHeader}>
            <div className={styles.transactionIcon}>
              {getTypeIcon(transaction.type)}
            </div>
            <div className={styles.transactionInfo}>
              <h2 className={styles.transactionTitle}>
                Package Purchase Transaction
              </h2>
              <p className={styles.transactionDescription}>
                {transaction.package?.name || "Package Purchase"} -{" "}
                {transaction.package?.code || "N/A"}
              </p>
            </div>
            <div className={styles.transactionStatus}>
              {getStatusBadge(transaction.status)}
            </div>
          </div>

          <div className={styles.amountSection}>
            <div className={styles.amountLabel}>Amount Paid</div>
            <div className={`${styles.amount} ${styles.amountPositive}`}>
              {formatCurrency(transaction.amount_paid)}
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      <div className={styles.detailsSection}>
        <div className={styles.detailsGrid}>
          {/* User Information */}
          <div className={styles.detailCard}>
            <h3 className={styles.cardTitle}>User Information</h3>
            <div className={styles.detailList}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Name:</span>
                <span className={styles.detailValue}>
                  {transaction.user?.name || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Email:</span>
                <span className={styles.detailValue}>
                  {transaction.user?.email || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Phone:</span>
                <span className={styles.detailValue}>
                  {transaction.user?.phone || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>User ID:</span>
                <span className={styles.detailValue}>
                  {transaction.user?.id || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Package Information */}
          <div className={styles.detailCard}>
            <h3 className={styles.cardTitle}>Package Information</h3>
            <div className={styles.detailList}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Package Name:</span>
                <span className={styles.detailValue}>
                  {transaction.package?.name || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Package Code:</span>
                <span className={styles.detailValue}>
                  {transaction.package?.code || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Level Number:</span>
                <span className={styles.detailValue}>
                  {transaction.package?.level_number || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Package Price:</span>
                <span className={styles.detailValue}>
                  {formatCurrency(transaction.package?.price || 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Transaction Information */}
          <div className={styles.detailCard}>
            <h3 className={styles.cardTitle}>Transaction Information</h3>
            <div className={styles.detailList}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Transaction ID:</span>
                <span className={styles.detailValue}>#{transaction.id}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Payment Status:</span>
                <span className={styles.detailValue}>
                  {getStatusBadge(transaction.payment_status)}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Payment Reference:</span>
                <span className={styles.detailValue}>
                  {transaction.payment_reference || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Assigned Level:</span>
                <span className={styles.detailValue}>
                  {transaction.assigned_level || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className={styles.detailCard}>
            <h3 className={styles.cardTitle}>Financial Details</h3>
            <div className={styles.detailList}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Amount Paid:</span>
                <span className={styles.detailValue}>
                  {formatCurrency(transaction.amount_paid)}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Processing:</span>
                <span className={styles.detailValue}>
                  {transaction.processing ? "Yes" : "No"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Processed At:</span>
                <span className={styles.detailValue}>
                  {formatDate(transaction.processed_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className={styles.detailCard}>
            <h3 className={styles.cardTitle}>Timestamps</h3>
            <div className={styles.detailList}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Purchase Date:</span>
                <span className={styles.detailValue}>
                  {formatDate(transaction.purchase_at)}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Created:</span>
                <span className={styles.detailValue}>
                  {formatDate(transaction.created_at)}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Updated:</span>
                <span className={styles.detailValue}>
                  {formatDate(transaction.updated_at)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTransactionDetailsPage;

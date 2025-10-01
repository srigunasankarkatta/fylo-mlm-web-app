import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminApi } from "../../apiClient";
import styles from "./AdminInvestmentTransactionDetailsPage.module.scss";

const AdminInvestmentTransactionDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransaction = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await adminApi.get(
        `/admin/investment-transactions/${id}`
      );

      if (response.data.status === "success") {
        setTransaction(response.data.data);
      } else {
        setError("Failed to fetch investment transaction details");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch investment transaction details"
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

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading investment transaction details...</p>
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
        <h2>Error Loading Investment Transaction</h2>
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
        <h2>Investment Transaction Not Found</h2>
        <p>The investment transaction you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate("/admin/investment-transactions")}
          className={styles.backButton}
        >
          Back to Investment Transactions
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
            onClick={() => navigate("/admin/investment-transactions")}
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
            Back to Investment Transactions
          </button>
          <div>
            <h1 className={styles.pageTitle}>
              Investment Transaction #{transaction.id}
            </h1>
            <p className={styles.pageDescription}>
              View and manage investment transaction details
            </p>
          </div>
        </div>
      </div>

      {/* Transaction Overview */}
      <div className={styles.overviewSection}>
        <div className={styles.overviewCard}>
          <div className={styles.transactionHeader}>
            <div className={styles.transactionIcon}>{getInvestmentIcon()}</div>
            <div className={styles.transactionInfo}>
              <h2 className={styles.transactionTitle}>
                Investment Transaction
              </h2>
              <p className={styles.transactionDescription}>
                {transaction.investment_plan?.name || "Investment Plan"} -{" "}
                {transaction.investment_plan?.code || "N/A"}
              </p>
            </div>
            <div className={styles.transactionStatus}>
              {getStatusBadge(transaction.status)}
            </div>
          </div>

          <div className={styles.amountSection}>
            <div className={styles.amountLabel}>Investment Amount</div>
            <div className={`${styles.amount} ${styles.amountPositive}`}>
              {formatCurrency(transaction.amount)}
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

          {/* Investment Plan Information */}
          <div className={styles.detailCard}>
            <h3 className={styles.cardTitle}>Investment Plan</h3>
            <div className={styles.detailList}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Plan Name:</span>
                <span className={styles.detailValue}>
                  {transaction.investment_plan?.name || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Plan Code:</span>
                <span className={styles.detailValue}>
                  {transaction.investment_plan?.code || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Daily Profit %:</span>
                <span className={styles.detailValue}>
                  {transaction.daily_profit_percent}%
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Duration:</span>
                <span className={styles.detailValue}>
                  {transaction.duration_days} days
                </span>
              </div>
            </div>
          </div>

          {/* Investment Details */}
          <div className={styles.detailCard}>
            <h3 className={styles.cardTitle}>Investment Details</h3>
            <div className={styles.detailList}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Transaction ID:</span>
                <span className={styles.detailValue}>#{transaction.id}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Status:</span>
                <span className={styles.detailValue}>
                  {getStatusBadge(transaction.status)}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Investment Amount:</span>
                <span className={styles.detailValue}>
                  {formatCurrency(transaction.amount)}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Accrued Interest:</span>
                <span className={styles.detailValue}>
                  {formatCurrency(transaction.accrued_interest)}
                </span>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className={styles.detailCard}>
            <h3 className={styles.cardTitle}>Financial Details</h3>
            <div className={styles.detailList}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Total Payout:</span>
                <span className={styles.detailValue}>
                  {formatCurrency(transaction.total_payout)}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Referral Commission:</span>
                <span className={styles.detailValue}>
                  {formatCurrency(transaction.referral_commission)}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Referrer ID:</span>
                <span className={styles.detailValue}>
                  {transaction.referrer_id || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className={styles.detailCard}>
            <h3 className={styles.cardTitle}>Timestamps</h3>
            <div className={styles.detailList}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Invested At:</span>
                <span className={styles.detailValue}>
                  {formatDate(transaction.invested_at)}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Start Date:</span>
                <span className={styles.detailValue}>
                  {formatDate(transaction.start_at)}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>End Date:</span>
                <span className={styles.detailValue}>
                  {formatDate(transaction.end_at)}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Matured At:</span>
                <span className={styles.detailValue}>
                  {formatDate(transaction.matured_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Referrer Information */}
          {transaction.referrer && (
            <div className={styles.detailCard}>
              <h3 className={styles.cardTitle}>Referrer Information</h3>
              <div className={styles.detailList}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Referrer Name:</span>
                  <span className={styles.detailValue}>
                    {transaction.referrer?.name || "N/A"}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Referrer Email:</span>
                  <span className={styles.detailValue}>
                    {transaction.referrer?.email || "N/A"}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Referrer ID:</span>
                  <span className={styles.detailValue}>
                    {transaction.referrer?.id || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminInvestmentTransactionDetailsPage;

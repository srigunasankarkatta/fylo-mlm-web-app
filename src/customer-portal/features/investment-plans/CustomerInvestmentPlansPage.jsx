import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInvestmentPlansStore } from "../../store/investmentPlansStore";
import styles from "./CustomerInvestmentPlansPage.module.scss";

const CustomerInvestmentPlansPage = () => {
  const navigate = useNavigate();

  // Store state and actions
  const {
    plans,
    isLoading,
    error,
    selectedPlan,
    fetchPlans,
    purchaseInvestment,
    setSelectedPlan,
    clearError,
    setError: setStoreError,
  } = useInvestmentPlansStore();

  // Local state for modal and form
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [purchaseError, setPurchaseError] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const [purchaseForm, setPurchaseForm] = useState({
    amount: "",
    payment_method: "wallet",
    payment_reference: "",
    referrer_id: "",
  });

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handlePurchaseClick = (plan) => {
    setSelectedPlan(plan);
    setPurchaseForm({
      amount: plan.min_amount.toString(),
      payment_method: "wallet",
      payment_reference: "",
      referrer_id: "",
    });
    setShowPurchaseModal(true);
    setPurchaseError(null);
    setPurchaseSuccess(false);
  };

  const handlePurchaseFormChange = (e) => {
    const { name, value } = e.target;
    setPurchaseForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPurchaseError(null);
  };

  const validatePurchaseForm = () => {
    const amount = parseFloat(purchaseForm.amount);
    if (!amount || amount < selectedPlan.min_amount) {
      setPurchaseError(
        `Minimum investment amount is ${selectedPlan.min_investment_formatted}`
      );
      return false;
    }
    if (selectedPlan.max_amount && amount > selectedPlan.max_amount) {
      setPurchaseError(
        `Maximum investment amount is ${selectedPlan.max_investment_formatted}`
      );
      return false;
    }
    return true;
  };

  const handlePurchaseSubmit = async (e) => {
    e.preventDefault();

    if (!validatePurchaseForm()) {
      return;
    }

    setPurchaseLoading(true);
    setPurchaseError(null);

    try {
      const result = await purchaseInvestment({
        investment_plan_id: selectedPlan.id,
        amount: parseFloat(purchaseForm.amount),
        payment_method: purchaseForm.payment_method,
        payment_reference: purchaseForm.payment_reference || null,
        referrer_id: purchaseForm.referrer_id || null,
        metadata: {},
      });

      if (result.success) {
        setPurchaseSuccess(true);
        setTimeout(() => {
          setShowPurchaseModal(false);
          setPurchaseSuccess(false);
          // Optionally redirect to investments dashboard
          navigate("/dashboard");
        }, 2000);
      } else {
        setPurchaseError(result.error || "Failed to create investment");
      }
    } catch (err) {
      setPurchaseError(
        err.response?.data?.message || "Failed to create investment"
      );
    } finally {
      setPurchaseLoading(false);
    }
  };

  const closePurchaseModal = () => {
    setShowPurchaseModal(false);
    setSelectedPlan(null);
    setPurchaseError(null);
    setPurchaseSuccess(false);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(parseFloat(amount));
  };

  const getStatusBadge = (isActive) => {
    return (
      <span
        className={`${styles.statusBadge} ${
          isActive ? styles.statusActive : styles.statusInactive
        }`}
      >
        {isActive ? "Available" : "Unavailable"}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className={styles.investmentPlansPage}>
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
          <p>Loading investment plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.investmentPlansPage}>
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
          <h3>Error Loading Plans</h3>
          <p>{error}</p>
          <button onClick={() => fetchPlans()} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.investmentPlansPage}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Investment Plans</h1>
        <p className={styles.pageDescription}>
          Choose from our carefully selected investment plans and start earning
          today
        </p>
      </div>

      {/* Investment Plans Grid */}
      <div className={styles.plansGrid}>
        {plans.map((plan) => (
          <div key={plan.id} className={styles.planCard}>
            <div className={styles.planHeader}>
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
              <div className={styles.planInfo}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <p className={styles.planCode}>{plan.code}</p>
                {getStatusBadge(plan.is_active)}
              </div>
            </div>

            <div className={styles.planDescription}>
              <p>{plan.description}</p>
            </div>

            <div className={styles.planDetails}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Investment Range</span>
                <span className={styles.detailValue}>
                  {plan.min_investment_formatted} -{" "}
                  {plan.max_investment_formatted}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Daily Profit</span>
                <span className={styles.detailValue}>
                  {plan.daily_profit_formatted}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Total Return</span>
                <span className={styles.detailValue}>
                  {plan.total_return_formatted}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Duration</span>
                <span className={styles.detailValue}>
                  {plan.duration_formatted}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Referral Commission</span>
                <span className={styles.detailValue}>
                  {plan.referral_commission_formatted}
                </span>
              </div>
            </div>

            <div className={styles.planActions}>
              <button
                onClick={() => handlePurchaseClick(plan)}
                disabled={!plan.is_active}
                className={`${styles.purchaseButton} ${
                  !plan.is_active ? styles.disabled : ""
                }`}
              >
                {plan.is_active ? "Invest Now" : "Unavailable"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && selectedPlan && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Invest in {selectedPlan.name}</h3>
              <button
                onClick={closePurchaseModal}
                className={styles.closeButton}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className={styles.modalContent}>
              {purchaseSuccess ? (
                <div className={styles.successMessage}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <h4>Investment Created Successfully!</h4>
                  <p>
                    Your investment has been created. Please complete payment to
                    activate.
                  </p>
                </div>
              ) : (
                <>
                  <div className={styles.planSummary}>
                    <h4>Plan Summary</h4>
                    <div className={styles.summaryDetails}>
                      <div className={styles.summaryRow}>
                        <span>Plan:</span>
                        <span>{selectedPlan.name}</span>
                      </div>
                      <div className={styles.summaryRow}>
                        <span>Daily Profit:</span>
                        <span>{selectedPlan.daily_profit_formatted}</span>
                      </div>
                      <div className={styles.summaryRow}>
                        <span>Duration:</span>
                        <span>{selectedPlan.duration_formatted}</span>
                      </div>
                      <div className={styles.summaryRow}>
                        <span>Total Return:</span>
                        <span>{selectedPlan.total_return_formatted}</span>
                      </div>
                    </div>
                  </div>

                  <form
                    onSubmit={handlePurchaseSubmit}
                    className={styles.purchaseForm}
                  >
                    <div className={styles.formGroup}>
                      <label htmlFor="amount">Investment Amount *</label>
                      <div className={styles.inputWithIcon}>
                        <span className={styles.currencySymbol}>$</span>
                        <input
                          type="number"
                          id="amount"
                          name="amount"
                          value={purchaseForm.amount}
                          onChange={handlePurchaseFormChange}
                          placeholder="Enter amount"
                          step="0.01"
                          min={selectedPlan.min_amount}
                          max={selectedPlan.max_amount}
                          required
                        />
                      </div>
                      <p className={styles.helpText}>
                        Min: {selectedPlan.min_investment_formatted} - Max:{" "}
                        {selectedPlan.max_investment_formatted}
                      </p>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="payment_method">Payment Method *</label>
                      <select
                        id="payment_method"
                        name="payment_method"
                        value={purchaseForm.payment_method}
                        onChange={handlePurchaseFormChange}
                        required
                      >
                        <option value="wallet">Wallet Balance</option>
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="crypto">Cryptocurrency</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="payment_reference">
                        Payment Reference
                      </label>
                      <input
                        type="text"
                        id="payment_reference"
                        name="payment_reference"
                        value={purchaseForm.payment_reference}
                        onChange={handlePurchaseFormChange}
                        placeholder="Transaction ID or reference"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="referrer_id">
                        Referrer ID (Optional)
                      </label>
                      <input
                        type="text"
                        id="referrer_id"
                        name="referrer_id"
                        value={purchaseForm.referrer_id}
                        onChange={handlePurchaseFormChange}
                        placeholder="Enter referrer ID"
                      />
                    </div>

                    {purchaseError && (
                      <div className={styles.errorMessage}>
                        <svg
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
                        {purchaseError}
                      </div>
                    )}

                    <div className={styles.modalActions}>
                      <button
                        type="button"
                        onClick={closePurchaseModal}
                        className={styles.cancelButton}
                        disabled={purchaseLoading}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={styles.confirmButton}
                        disabled={purchaseLoading}
                      >
                        {purchaseLoading ? (
                          <>
                            <svg
                              className={styles.spinner}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                            Processing...
                          </>
                        ) : (
                          "Confirm Investment"
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerInvestmentPlansPage;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminApi } from "../../apiClient";
import styles from "./AdminEditInvestmentPlanPage.module.scss";

const AdminEditInvestmentPlanPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    min_amount: "",
    max_amount: "",
    daily_profit_percent: "",
    duration_days: "",
    referral_percent: "",
    is_active: true,
  });

  const [validationErrors, setValidationErrors] = useState({});

  // Fetch plan data on component mount
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await adminApi.get(`/admin/investment-plans/${id}`);
        if (response.data.status === "success") {
          const plan = response.data.data;
          setFormData({
            name: plan.name || "",
            description: plan.description || "",
            min_amount: plan.min_amount || "",
            max_amount: plan.max_amount || "",
            daily_profit_percent: plan.daily_profit_percent || "",
            duration_days: plan.duration_days || "",
            referral_percent: plan.referral_percent || "",
            is_active: plan.is_active !== undefined ? plan.is_active : true,
          });
        } else {
          setError("Failed to fetch investment plan");
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch investment plan"
        );
      } finally {
        setInitialLoading(false);
      }
    };

    if (id) {
      fetchPlan();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear error and success messages
    setError(null);
    setSuccessMessage("");
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Plan name is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    if (!formData.min_amount || parseFloat(formData.min_amount) <= 0) {
      errors.min_amount = "Minimum amount must be greater than 0";
    }

    if (
      formData.max_amount &&
      parseFloat(formData.max_amount) <= parseFloat(formData.min_amount)
    ) {
      errors.max_amount = "Maximum amount must be greater than minimum amount";
    }

    if (
      !formData.daily_profit_percent ||
      parseFloat(formData.daily_profit_percent) <= 0
    ) {
      errors.daily_profit_percent =
        "Daily profit percent must be greater than 0";
    }

    if (parseFloat(formData.daily_profit_percent) > 50) {
      errors.daily_profit_percent =
        "Daily profit percent seems too high (max 50%)";
    }

    if (
      !formData.referral_percent ||
      parseFloat(formData.referral_percent) < 0
    ) {
      errors.referral_percent = "Referral percent must be 0 or greater";
    }

    if (parseFloat(formData.referral_percent) > 100) {
      errors.referral_percent = "Referral percent must not be greater than 100";
    }

    if (!formData.duration_days || parseInt(formData.duration_days) <= 0) {
      errors.duration_days = "Duration must be greater than 0 days";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await adminApi.put(`/admin/investment-plans/${id}`, {
        name: formData.name.trim(),
        description: formData.description.trim(),
        min_amount: parseFloat(formData.min_amount),
        max_amount: formData.max_amount
          ? parseFloat(formData.max_amount)
          : null,
        daily_profit_percent: parseFloat(formData.daily_profit_percent),
        duration_days: parseInt(formData.duration_days),
        referral_percent: parseFloat(formData.referral_percent),
        is_active: formData.is_active,
      });

      if (response.data.status === "success") {
        setSuccessMessage("Investment plan updated successfully!");
        setTimeout(() => {
          navigate("/admin/investment-plans");
        }, 1500);
      } else {
        setError("Failed to update investment plan");
      }
    } catch (err) {
      // Handle server-side validation errors
      if (err.response?.data?.errors) {
        const serverErrors = err.response.data.errors;
        const newValidationErrors = {};

        // Map server errors to form fields
        Object.keys(serverErrors).forEach((field) => {
          if (serverErrors[field] && serverErrors[field].length > 0) {
            newValidationErrors[field] = serverErrors[field][0]; // Take first error message
          }
        });

        setValidationErrors(newValidationErrors);
        setError("Please fix the validation errors below");
      } else {
        setError(
          err.response?.data?.message || "Failed to update investment plan"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/investment-plans");
  };

  if (initialLoading) {
    return (
      <div className={styles.editPlanPage}>
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

  return (
    <div className={styles.editPlanPage}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTop}>
          <h1 className={styles.pageTitle}>Edit Investment Plan</h1>
          <button className={styles.cancelButton} onClick={handleCancel}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Cancel
          </button>
        </div>
        <p className={styles.pageDescription}>
          Update the investment plan details
        </p>
      </div>

      {/* Form Section */}
      <div className={styles.formSection}>
        <form onSubmit={handleSubmit} className={styles.editForm}>
          {/* Success Message */}
          {successMessage && (
            <div className={styles.successMessage}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className={styles.errorMessage}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div className={styles.formGroup}>
            <h3 className={styles.sectionTitle}>Basic Information</h3>

            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Plan Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`${styles.input} ${
                  validationErrors.name ? styles.inputError : ""
                }`}
                placeholder="Enter plan name"
              />
              {validationErrors.name && (
                <span className={styles.errorText}>
                  {validationErrors.name}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="description" className={styles.label}>
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`${styles.textarea} ${
                  validationErrors.description ? styles.inputError : ""
                }`}
                placeholder="Enter plan description"
                rows={4}
              />
              {validationErrors.description && (
                <span className={styles.errorText}>
                  {validationErrors.description}
                </span>
              )}
            </div>
          </div>

          {/* Financial Details */}
          <div className={styles.formGroup}>
            <h3 className={styles.sectionTitle}>Financial Details</h3>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="min_amount" className={styles.label}>
                  Minimum Amount *
                </label>
                <div className={styles.inputWithIcon}>
                  <span className={styles.currencySymbol}>$</span>
                  <input
                    type="number"
                    id="min_amount"
                    name="min_amount"
                    value={formData.min_amount}
                    onChange={handleInputChange}
                    className={`${styles.input} ${
                      validationErrors.min_amount ? styles.inputError : ""
                    }`}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
                {validationErrors.min_amount && (
                  <span className={styles.errorText}>
                    {validationErrors.min_amount}
                  </span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="max_amount" className={styles.label}>
                  Maximum Amount
                </label>
                <div className={styles.inputWithIcon}>
                  <span className={styles.currencySymbol}>$</span>
                  <input
                    type="number"
                    id="max_amount"
                    name="max_amount"
                    value={formData.max_amount}
                    onChange={handleInputChange}
                    className={`${styles.input} ${
                      validationErrors.max_amount ? styles.inputError : ""
                    }`}
                    placeholder="0.00 (optional)"
                    step="0.01"
                    min="0"
                  />
                </div>
                {validationErrors.max_amount && (
                  <span className={styles.errorText}>
                    {validationErrors.max_amount}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="daily_profit_percent" className={styles.label}>
                  Daily Profit Percent *
                </label>
                <p className={styles.helpText}>
                  Daily profit percentage (0-50%)
                </p>
                <div className={styles.inputWithIcon}>
                  <input
                    type="number"
                    id="daily_profit_percent"
                    name="daily_profit_percent"
                    value={formData.daily_profit_percent}
                    onChange={handleInputChange}
                    className={`${styles.input} ${
                      validationErrors.daily_profit_percent
                        ? styles.inputError
                        : ""
                    }`}
                    placeholder="e.g., 2.5"
                    step="0.01"
                    min="0"
                    max="50"
                  />
                  <span className={styles.percentageSymbol}>%</span>
                </div>
                {validationErrors.daily_profit_percent && (
                  <span className={styles.errorText}>
                    {validationErrors.daily_profit_percent}
                  </span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="duration_days" className={styles.label}>
                  Duration *
                </label>
                <div className={styles.inputWithIcon}>
                  <input
                    type="number"
                    id="duration_days"
                    name="duration_days"
                    value={formData.duration_days}
                    onChange={handleInputChange}
                    className={`${styles.input} ${
                      validationErrors.duration_days ? styles.inputError : ""
                    }`}
                    placeholder="0"
                    min="1"
                  />
                  <span className={styles.daysSymbol}>days</span>
                </div>
                {validationErrors.duration_days && (
                  <span className={styles.errorText}>
                    {validationErrors.duration_days}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="referral_percent" className={styles.label}>
                  Referral Percent *
                </label>
                <p className={styles.helpText}>
                  Referral commission percentage (0-100%)
                </p>
                <div className={styles.inputWithIcon}>
                  <input
                    type="number"
                    id="referral_percent"
                    name="referral_percent"
                    value={formData.referral_percent}
                    onChange={handleInputChange}
                    className={`${styles.input} ${
                      validationErrors.referral_percent ? styles.inputError : ""
                    }`}
                    placeholder="e.g., 5.0"
                    step="0.01"
                    min="0"
                    max="100"
                  />
                  <span className={styles.percentageSymbol}>%</span>
                </div>
                {validationErrors.referral_percent && (
                  <span className={styles.errorText}>
                    {validationErrors.referral_percent}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Plan Settings */}
          <div className={styles.formGroup}>
            <h3 className={styles.sectionTitle}>Plan Settings</h3>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                    className={styles.checkbox}
                  />
                  <span className={styles.checkboxText}>Active Plan</span>
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className={styles.formActions}>
            <button
              type="button"
              onClick={handleCancel}
              className={styles.cancelFormButton}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? (
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
                  Updating...
                </>
              ) : (
                <>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Update Plan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditInvestmentPlanPage;

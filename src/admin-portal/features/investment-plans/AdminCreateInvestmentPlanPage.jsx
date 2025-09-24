import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../../apiClient";
import styles from "./AdminCreateInvestmentPlanPage.module.scss";

const AdminCreateInvestmentPlanPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    min_amount: "",
    max_amount: "",
    return_rate: "",
    duration_days: "",
    risk_level: "medium",
    is_active: true,
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
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
    
    if (formData.max_amount && parseFloat(formData.max_amount) <= parseFloat(formData.min_amount)) {
      errors.max_amount = "Maximum amount must be greater than minimum amount";
    }
    
    if (!formData.return_rate || parseFloat(formData.return_rate) <= 0) {
      errors.return_rate = "Return rate must be greater than 0";
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
      const response = await adminApi.post("/admin/investment-plans", {
        name: formData.name.trim(),
        description: formData.description.trim(),
        min_amount: parseFloat(formData.min_amount),
        max_amount: formData.max_amount ? parseFloat(formData.max_amount) : null,
        return_rate: parseFloat(formData.return_rate),
        duration_days: parseInt(formData.duration_days),
        risk_level: formData.risk_level,
        is_active: formData.is_active,
      });
      
      if (response.data.status === "success") {
        setSuccessMessage("Investment plan created successfully!");
        setTimeout(() => {
          navigate("/admin/investment-plans");
        }, 1500);
      } else {
        setError("Failed to create investment plan");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create investment plan");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/investment-plans");
  };

  return (
    <div className={styles.createPlanPage}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTop}>
          <h1 className={styles.pageTitle}>Create Investment Plan</h1>
          <button 
            className={styles.cancelButton}
            onClick={handleCancel}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
        </div>
        <p className={styles.pageDescription}>
          Create a new investment plan for users to invest in
        </p>
      </div>

      {/* Form Section */}
      <div className={styles.formSection}>
        <form onSubmit={handleSubmit} className={styles.createForm}>
          {/* Success Message */}
          {successMessage && (
            <div className={styles.successMessage}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className={styles.errorMessage}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                className={`${styles.input} ${validationErrors.name ? styles.inputError : ""}`}
                placeholder="Enter plan name"
              />
              {validationErrors.name && (
                <span className={styles.errorText}>{validationErrors.name}</span>
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
                className={`${styles.textarea} ${validationErrors.description ? styles.inputError : ""}`}
                placeholder="Enter plan description"
                rows={4}
              />
              {validationErrors.description && (
                <span className={styles.errorText}>{validationErrors.description}</span>
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
                    className={`${styles.input} ${validationErrors.min_amount ? styles.inputError : ""}`}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
                {validationErrors.min_amount && (
                  <span className={styles.errorText}>{validationErrors.min_amount}</span>
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
                    className={`${styles.input} ${validationErrors.max_amount ? styles.inputError : ""}`}
                    placeholder="0.00 (optional)"
                    step="0.01"
                    min="0"
                  />
                </div>
                {validationErrors.max_amount && (
                  <span className={styles.errorText}>{validationErrors.max_amount}</span>
                )}
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="return_rate" className={styles.label}>
                  Return Rate *
                </label>
                <div className={styles.inputWithIcon}>
                  <input
                    type="number"
                    id="return_rate"
                    name="return_rate"
                    value={formData.return_rate}
                    onChange={handleInputChange}
                    className={`${styles.input} ${validationErrors.return_rate ? styles.inputError : ""}`}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                  <span className={styles.percentageSymbol}>%</span>
                </div>
                {validationErrors.return_rate && (
                  <span className={styles.errorText}>{validationErrors.return_rate}</span>
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
                    className={`${styles.input} ${validationErrors.duration_days ? styles.inputError : ""}`}
                    placeholder="0"
                    min="1"
                  />
                  <span className={styles.daysSymbol}>days</span>
                </div>
                {validationErrors.duration_days && (
                  <span className={styles.errorText}>{validationErrors.duration_days}</span>
                )}
              </div>
            </div>
          </div>

          {/* Plan Settings */}
          <div className={styles.formGroup}>
            <h3 className={styles.sectionTitle}>Plan Settings</h3>
            
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="risk_level" className={styles.label}>
                  Risk Level
                </label>
                <select
                  id="risk_level"
                  name="risk_level"
                  value={formData.risk_level}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </select>
              </div>

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
                  <svg className={styles.spinner} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Plan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateInvestmentPlanPage;

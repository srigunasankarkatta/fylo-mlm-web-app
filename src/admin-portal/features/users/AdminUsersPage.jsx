import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  AlertCircle,
  CheckCircle,
  UserPlus,
  X,
} from "lucide-react";
import { adminApi } from "../../apiClient";
import { AdminTable } from "../../shared/components";
import styles from "./AdminUsersPage.module.scss";

// Yup validation schema for user creation
const createUserValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .max(150, "Name must not exceed 150 characters"),
  email: Yup.string().nullable().email("Please enter a valid email address"),
  phone: Yup.string().nullable().max(30, "Phone must not exceed 30 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  password_confirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  referral_code: Yup.string()
    .nullable()
    .max(20, "Referral code must not exceed 20 characters"),
});

const AdminUsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email"); // email or phone
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState({
    search: "",
    role: "",
  });

  // Password requirements for validation
  const passwordRequirements = [
    {
      text: "At least 6 characters",
      met: (password) => password && password.length >= 6,
    },
    {
      text: "Passwords match",
      met: (password, confirm) => password && confirm && password === confirm,
    },
  ];

  // Create user function
  const handleCreateUser = async (values, { setSubmitting, setFieldError }) => {
    setCreateLoading(true);
    setCreateError(null);
    setCreateSuccess(false);

    try {
      // Validate that at least one contact method is provided
      if (!values.email && !values.phone) {
        setFieldError(
          "general",
          "Please provide either an email address or phone number"
        );
        setSubmitting(false);
        setCreateLoading(false);
        return;
      }

      // Prepare data based on login method
      const userData = {
        name: values.name,
        password: values.password,
        password_confirmation: values.password_confirmation,
        referral_code: values.referral_code || undefined,
        role: "user", // Always create as user role
      };

      // Add email or phone based on method
      if (loginMethod === "email" && values.email) {
        userData.email = values.email;
      } else if (loginMethod === "phone" && values.phone) {
        userData.phone = values.phone;
      }

      const response = await adminApi.post("/admin/users", userData);

      if (response.data.status === "success") {
        setCreateSuccess(true);
        setShowCreateModal(false);
        // Refresh users list
        await fetchUsers();
        // Clear form
        setSubmitting(false);
        setTimeout(() => {
          setCreateSuccess(false);
        }, 3000);
      } else {
        setCreateError(response.data.message || "Failed to create user");
        setSubmitting(false);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create user";
      setCreateError(errorMessage);
      setFieldError("general", errorMessage);
      setSubmitting(false);
    } finally {
      setCreateLoading(false);
    }
  };

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: pagination.per_page.toString(),
        ...(filters.search && { search: filters.search }),
        ...(filters.role && { role: filters.role }),
      });

      const response = await adminApi.get(`/admin/users?${params}`);

      if (response.data.status === "success") {
        setUsers(response.data.data);
        setPagination(response.data.meta.pagination);
        setTotalCount(response.data.meta.pagination.total);
      } else {
        setError("Failed to fetch users");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(1);
  };

  const handlePageChange = (page) => {
    fetchUsers(page);
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

  // Define table columns
  const columns = [
    {
      key: "user",
      title: "User",
      width: "180px",
      render: (value, user) => (
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className={styles.userDetails}>
            <span className={styles.userName}>{user.name}</span>
            <span className={styles.userId}>ID: {user.id}</span>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      title: "Email",
      width: "220px",
    },
    {
      key: "phone",
      title: "Phone",
      width: "130px",
      render: (value) => value || "N/A",
    },
    {
      key: "roles",
      title: "Role",
      width: "130px",
      render: (value) => (
        <div className={styles.rolesList}>
          {value.map((role) => (
            <span key={role.id} className={styles.roleBadge}>
              {role.name}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "status",
      title: "Status",
      width: "110px",
      render: (value) => getStatusBadge(value),
    },
    {
      key: "referral_code",
      title: "Referral Code",
      width: "150px",
      render: (value) => <code className={styles.referralCode}>{value}</code>,
    },
    {
      key: "created_at",
      title: "Created",
      width: "130px",
      render: (value) => formatDate(value),
    },
    {
      key: "last_login_at",
      title: "Last Login",
      width: "130px",
      render: (value) => formatDate(value),
    },
  ];

  // Define table actions
  const renderActions = (user) => (
    <div className={styles.actions}>
      <button
        className={styles.actionButton}
        title="View Details"
        onClick={() => navigate(`/admin/users/${user.id}`)}
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
      <button className={styles.actionButton} title="Edit User">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </button>
    </div>
  );

  return (
    <div className={styles.usersPage}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Users Management</h1>
          <p className={styles.pageDescription}>
            Manage and view all users in the system
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className={styles.createButton}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Create User
        </button>
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
                placeholder="Search users by name or email..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.filterGroup}>
            <select
              value={filters.role}
              onChange={(e) => handleFilterChange("role", e.target.value)}
              className={styles.roleSelect}
            >
              <option value="">All Roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
      </div>

      {/* Users Table */}
      <AdminTable
        columns={columns}
        data={users}
        loading={loading}
        error={error}
        onRetry={() => fetchUsers()}
        pagination={pagination}
        onPageChange={handlePageChange}
        emptyMessage="No users found"
        actions={renderActions}
        rowKey="id"
        serverSide={true}
        totalCount={totalCount}
        itemsPerPage={pagination.per_page}
      />

      {/* Create User Modal */}
      {showCreateModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Create New User</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className={styles.closeButton}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className={styles.modalBody}>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  phone: "",
                  password: "",
                  password_confirmation: "",
                  referral_code: "",
                }}
                validationSchema={createUserValidationSchema}
                onSubmit={handleCreateUser}
              >
                {({ values, isSubmitting, errors, touched }) => (
                  <Form className={styles.createForm}>
                    {/* Login Method Toggle */}
                    <div className={styles.methodToggle}>
                      <button
                        type="button"
                        onClick={() => setLoginMethod("email")}
                        className={`${styles.toggleButton} ${
                          loginMethod === "email" ? styles.toggleActive : ""
                        }`}
                      >
                        Email
                      </button>
                      <button
                        type="button"
                        onClick={() => setLoginMethod("phone")}
                        className={`${styles.toggleButton} ${
                          loginMethod === "phone" ? styles.toggleActive : ""
                        }`}
                      >
                        Phone
                      </button>
                    </div>

                    {/* Row 1: Name and Email/Phone */}
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label className={styles.fieldLabel}>Full Name *</label>
                        <div className={styles.inputGroup}>
                          <User className={styles.inputIcon} />
                          <Field
                            type="text"
                            name="name"
                            className={`${styles.input} ${
                              errors.name && touched.name
                                ? styles.inputError
                                : ""
                            }`}
                            placeholder="Enter full name"
                          />
                        </div>
                        <ErrorMessage
                          name="name"
                          component="div"
                          className={styles.errorMessage}
                        >
                          {(msg) => (
                            <div className={styles.errorContent}>
                              <AlertCircle className="w-3 h-3 mr-1" />
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>

                      <div className={styles.formField}>
                        <label className={styles.fieldLabel}>
                          {loginMethod === "email"
                            ? "Email Address"
                            : "Phone Number"}{" "}
                          (Optional)
                        </label>
                        <div className={styles.inputGroup}>
                          {loginMethod === "email" ? (
                            <Mail className={styles.inputIcon} />
                          ) : (
                            <Phone className={styles.inputIcon} />
                          )}
                          <Field
                            type={loginMethod === "email" ? "email" : "tel"}
                            name={loginMethod === "email" ? "email" : "phone"}
                            className={`${styles.input} ${
                              (loginMethod === "email"
                                ? errors.email
                                : errors.phone) &&
                              (loginMethod === "email"
                                ? touched.email
                                : touched.phone)
                                ? styles.inputError
                                : ""
                            }`}
                            placeholder={
                              loginMethod === "email"
                                ? "Enter email address"
                                : "Enter phone number"
                            }
                          />
                        </div>
                        <ErrorMessage
                          name={loginMethod === "email" ? "email" : "phone"}
                          component="div"
                          className={styles.errorMessage}
                        >
                          {(msg) => (
                            <div className={styles.errorContent}>
                              <AlertCircle className="w-3 h-3 mr-1" />
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                    </div>

                    {/* Row 2: Referral Code */}
                    <div className={styles.formField}>
                      <label className={styles.fieldLabel}>
                        Referral Code (Optional)
                      </label>
                      <div className={styles.inputGroup}>
                        <User className={styles.inputIcon} />
                        <Field
                          type="text"
                          name="referral_code"
                          className={`${styles.input} ${
                            errors.referral_code && touched.referral_code
                              ? styles.inputError
                              : ""
                          }`}
                          placeholder="Enter referral code (if any)"
                        />
                      </div>
                      <ErrorMessage
                        name="referral_code"
                        component="div"
                        className={styles.errorMessage}
                      >
                        {(msg) => (
                          <div className={styles.errorContent}>
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                      <p className={styles.helpText}>
                        If someone referred this user, enter their referral code
                        here
                      </p>
                    </div>

                    {/* Row 3: Password and Confirm Password */}
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label className={styles.fieldLabel}>Password *</label>
                        <div className={styles.inputGroup}>
                          <Lock className={styles.inputIcon} />
                          <Field
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className={`${styles.input} ${
                              errors.password && touched.password
                                ? styles.inputError
                                : ""
                            }`}
                            placeholder="Create a strong password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={styles.passwordToggle}
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className={styles.errorMessage}
                        >
                          {(msg) => (
                            <div className={styles.errorContent}>
                              <AlertCircle className="w-3 h-3 mr-1" />
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>

                      <div className={styles.formField}>
                        <label className={styles.fieldLabel}>
                          Confirm Password *
                        </label>
                        <div className={styles.inputGroup}>
                          <Lock className={styles.inputIcon} />
                          <Field
                            type={showConfirmPassword ? "text" : "password"}
                            name="password_confirmation"
                            className={`${styles.input} ${
                              errors.password_confirmation &&
                              touched.password_confirmation
                                ? styles.inputError
                                : ""
                            }`}
                            placeholder="Confirm password"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className={styles.passwordToggle}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <ErrorMessage
                          name="password_confirmation"
                          component="div"
                          className={styles.errorMessage}
                        >
                          {(msg) => (
                            <div className={styles.errorContent}>
                              <AlertCircle className="w-3 h-3 mr-1" />
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                    </div>

                    {/* Password Requirements */}
                    <div className={styles.passwordRequirements}>
                      {passwordRequirements.map((requirement, index) => (
                        <div
                          key={index}
                          className={`${styles.requirement} ${
                            requirement.met(
                              values.password,
                              values.password_confirmation
                            )
                              ? styles.requirementMet
                              : ""
                          }`}
                        >
                          <div
                            className={`${styles.requirementIcon} ${
                              requirement.met(
                                values.password,
                                values.password_confirmation
                              )
                                ? styles.requirementIconMet
                                : ""
                            }`}
                          >
                            {requirement.met(
                              values.password,
                              values.password_confirmation
                            ) && (
                              <CheckCircle className="w-2 h-2 text-green-600" />
                            )}
                          </div>
                          {requirement.text}
                        </div>
                      ))}
                    </div>

                    {/* Error Messages */}
                    {createError && (
                      <div className={styles.errorAlert}>
                        <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                        <p className="text-red-700 text-sm">{createError}</p>
                      </div>
                    )}

                    {errors.general && (
                      <div className={styles.errorAlert}>
                        <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                        <p className="text-red-700 text-sm">{errors.general}</p>
                      </div>
                    )}

                    {/* Success Message */}
                    {createSuccess && (
                      <div className={styles.successAlert}>
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <p className="text-green-700 text-sm">
                          User created successfully!
                        </p>
                      </div>
                    )}

                    {/* Modal Actions */}
                    <div className={styles.modalActions}>
                      <button
                        type="button"
                        onClick={() => setShowCreateModal(false)}
                        className={styles.cancelButton}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || createLoading}
                        className={styles.submitButton}
                      >
                        {isSubmitting || createLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Creating User...
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-4 h-4 mr-2" />
                            Create User
                          </>
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../../apiClient";
import { AdminTable } from "../../shared/components";
import styles from "./AdminUsersPage.module.scss";

const AdminUsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
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
    role: "",
  });

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
        <h1 className={styles.pageTitle}>Users Management</h1>
        <p className={styles.pageDescription}>
          Manage and view all users in the system
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
    </div>
  );
};

export default AdminUsersPage;

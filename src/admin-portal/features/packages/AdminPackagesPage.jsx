import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../../apiClient";
import { AdminTable } from "../../shared/components";
import styles from "./AdminPackagesPage.module.scss";

const AdminPackagesPage = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
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
    level: "",
  });

  const fetchPackages = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: pagination.per_page.toString(),
        ...(filters.search && { search: filters.search }),
        ...(filters.status && { status: filters.status }),
        ...(filters.level && { level: filters.level }),
      });

      const response = await adminApi.get(`/admin/packages?${params}`);

      if (response.data.status === "success") {
        setPackages(response.data.data);
        setPagination(response.data.meta.pagination);
        setTotalCount(response.data.meta.pagination.total);
      } else {
        setError("Failed to fetch packages");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPackages(1);
  };

  const handlePageChange = (page) => {
    fetchPackages(page);
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(parseFloat(price));
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

  const getLevelBadge = (levelNumber) => {
    const levelColors = {
      1: styles.level1,
      2: styles.level2,
      3: styles.level3,
      4: styles.level4,
      5: styles.level5,
    };

    return (
      <span
        className={`${styles.levelBadge} ${
          levelColors[levelNumber] || styles.levelDefault
        }`}
      >
        Level {levelNumber}
      </span>
    );
  };

  // Define table columns
  const columns = [
    {
      key: "package",
      title: "Package",
      width: "200px",
      render: (value, pkg) => (
        <div className={styles.packageInfo}>
          <div className={styles.packageCode}>{pkg.code}</div>
          <div className={styles.packageDetails}>
            <span className={styles.packageName}>{pkg.name}</span>
            <span className={styles.packageId}>ID: {pkg.id}</span>
          </div>
        </div>
      ),
    },
    {
      key: "price",
      title: "Price",
      width: "120px",
      render: (value) => formatPrice(value),
    },
    {
      key: "level_number",
      title: "Level",
      width: "100px",
      render: (value) => getLevelBadge(value),
    },
    {
      key: "description",
      title: "Description",
      width: "200px",
      render: (value) => value || "No description",
    },
    {
      key: "is_active",
      title: "Status",
      width: "100px",
      render: (value) => getStatusBadge(value),
    },
    {
      key: "users",
      title: "Users",
      width: "80px",
      render: (value) => value.length,
      align: "center",
    },
    {
      key: "created_at",
      title: "Created",
      width: "120px",
      render: (value) => formatDate(value),
    },
    {
      key: "updated_at",
      title: "Updated",
      width: "120px",
      render: (value) => formatDate(value),
    },
  ];

  // Define table actions
  const renderActions = (pkg) => (
    <div className={styles.actions}>
      <button
        className={styles.actionButton}
        title="View Details"
        onClick={() => navigate(`/admin/packages/${pkg.id}`)}
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
      <button className={styles.actionButton} title="Edit Package">
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
    <div className={styles.packagesPage}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Packages Management</h1>
        <p className={styles.pageDescription}>
          Manage and view all packages in the system
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
                placeholder="Search packages by name or code..."
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
            <select
              value={filters.level}
              onChange={(e) => handleFilterChange("level", e.target.value)}
              className={styles.levelSelect}
            >
              <option value="">All Levels</option>
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
              <option value="4">Level 4</option>
              <option value="5">Level 5</option>
            </select>
          </div>

          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
      </div>

      {/* Packages Table */}
      <AdminTable
        columns={columns}
        data={packages}
        loading={loading}
        error={error}
        onRetry={() => fetchPackages()}
        pagination={pagination}
        onPageChange={handlePageChange}
        emptyMessage="No packages found"
        actions={renderActions}
        rowKey="id"
        serverSide={true}
        totalCount={totalCount}
        itemsPerPage={pagination.per_page}
      />
    </div>
  );
};

export default AdminPackagesPage;

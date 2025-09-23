import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../../app/store";
import { useDashboardStore } from "../../store/dashboardStore";
import { OverviewTab, ProfileTab, NetworkTab, EarningsTab } from "./components";
import { Activity, User, Network, Wallet, AlertCircle } from "lucide-react";

const DashboardPage = () => {
  const {
    user,
    isAuthenticated,
    getProfile,
    isLoading: authLoading,
    error: authError,
  } = useAuthStore();
  const {
    dashboardSummary,
    userProfile,
    networkTree,
    networkStats,
    networkMembers,
    earningsSummary,
    earningsHistory,
    earningsByType,
    walletDetails,
    recentActivity,
    quickStats,
    performanceAnalytics,
    dashboardWidgets,
    isLoading,
    errors,
    pagination,
    fetchDashboardSummary,
    fetchUserProfile,
    fetchNetworkTree,
    fetchNetworkStats,
    fetchNetworkMembers,
    fetchEarningsSummary,
    fetchEarningsHistory,
    fetchEarningsByType,
    fetchWalletDetails,
    fetchLedgerTransactions,
    fetchRecentActivity,
    fetchQuickStats,
    fetchPerformanceAnalytics,
    fetchDashboardWidgets,
    updateUserProfile,
    changePassword,
  } = useDashboardStore();

  const [activeTab, setActiveTab] = useState("overview");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [networkFilters, setNetworkFilters] = useState({
    level: "",
    status: "",
    page: 1,
    per_page: 10,
  });

  useEffect(() => {
    // Debug authentication state
    console.log(
      "Dashboard useEffect - User:",
      user,
      "Authenticated:",
      isAuthenticated
    );

    // Only fetch data if user is authenticated
    if (user && isAuthenticated) {
      const fetchOverviewData = async () => {
        try {
          console.log("Fetching dashboard data...");
          await Promise.all([
            fetchDashboardSummary(),
            fetchQuickStats(),
            fetchRecentActivity(),
            fetchDashboardWidgets(),
          ]);
          console.log("Dashboard data fetched successfully");
        } catch (error) {
          console.error("Failed to fetch dashboard data:", error);
        }
      };

      fetchOverviewData();
    } else {
      console.log("User not authenticated, skipping dashboard data fetch");
    }
  }, [
    user,
    isAuthenticated,
    fetchDashboardSummary,
    fetchQuickStats,
    fetchRecentActivity,
    fetchDashboardWidgets,
  ]);

  // Initialize profile form when userProfile is loaded
  useEffect(() => {
    if (userProfile?.user) {
      setProfileForm({
        name: userProfile.user.name || "",
        email: userProfile.user.email || "",
        phone: userProfile.user.phone || "",
      });
    }
  }, [userProfile]);

  // Auto-apply network filters when they change
  useEffect(() => {
    if (
      activeTab === "network" &&
      (networkFilters.level || networkFilters.status)
    ) {
      applyNetworkFilters();
    }
  }, [networkFilters.level, networkFilters.status, networkFilters.per_page]);

  // Auto-fetch network members when page changes
  useEffect(() => {
    if (activeTab === "network" && networkFilters.page > 1) {
      fetchNetworkMembers(networkFilters);
    }
  }, [networkFilters.page]);

  // Handle tab changes and fetch data accordingly
  const handleTabChange = async (tabId) => {
    setActiveTab(tabId);
    setSuccessMessage(""); // Clear any success messages

    // Fetch data based on the selected tab
    switch (tabId) {
      case "profile":
        if (!userProfile) {
          await fetchUserProfile();
        }
        break;
      case "network":
        if (!networkTree || !networkStats) {
          await Promise.all([
            fetchNetworkTree(),
            fetchNetworkStats(),
            fetchNetworkMembers(),
          ]);
        }
        break;
      case "earnings":
        if (!earningsSummary || !earningsByType || walletDetails.length === 0) {
          await Promise.all([
            fetchEarningsSummary(),
            fetchEarningsByType(),
            fetchWalletDetails(),
          ]);
        }
        break;
      default:
        break;
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const result = await updateUserProfile(profileForm);
    if (result.success) {
      setIsEditingProfile(false);
      setSuccessMessage("Profile updated successfully!");
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const result = await changePassword(passwordForm);
    if (result.success) {
      setIsChangingPassword(false);
      setPasswordForm({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
      setSuccessMessage("Password changed successfully!");
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  // Network filtering and pagination
  const handleNetworkFilterChange = (key, value) => {
    setNetworkFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filters change
    }));
  };

  const handleNetworkPageChange = (newPage) => {
    setNetworkFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const applyNetworkFilters = async () => {
    await fetchNetworkMembers(networkFilters);
  };

  const clearNetworkFilters = () => {
    setNetworkFilters({
      level: "",
      status: "",
      page: 1,
      per_page: 10,
    });
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "completed":
      case "paid":
        return <div className="w-4 h-4 bg-green-500 rounded-full"></div>;
      case "pending":
        return <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>;
      case "inactive":
      case "failed":
        return <div className="w-4 h-4 bg-red-500 rounded-full"></div>;
      default:
        return <div className="w-4 h-4 bg-gray-500 rounded-full"></div>;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "completed":
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-customer-ui-background">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-customer-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-customer-ui-text-primary">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700 p-4">
        <AlertCircle className="w-12 h-12 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Error Loading Dashboard</h2>
        <p className="text-center mb-4">{authError}</p>
        <button
          onClick={() => getProfile()}
          className="flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all duration-200"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!user || !isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-customer-ui-background text-customer-ui-text-primary p-4">
        <AlertCircle className="w-16 h-16 text-customer-brand-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Authentication Required</h2>
        <p className="text-center mb-6 text-customer-ui-text-secondary">
          Please log in to access your dashboard.
        </p>
        <button
          onClick={() => (window.location.href = "/login")}
          className="flex items-center px-6 py-3 bg-customer-brand-500 hover:bg-customer-brand-600 text-white rounded-lg font-semibold transition-all duration-200"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const tabs = [
    {
      id: "overview",
      name: "Overview",
      icon: <Activity className="w-5 h-5" />,
    },
    { id: "profile", name: "Profile", icon: <User className="w-5 h-5" /> },
    {
      id: "network",
      name: "Network Tree",
      icon: <Network className="w-5 h-5" />,
    },
    { id: "earnings", name: "Earnings", icon: <Wallet className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-customer-ui-background p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-customer-ui-text-primary">
            Welcome, {user?.name || "Member"}!
          </h1>
          {activeTab === "overview" && (
            <button
              onClick={() => {
                fetchDashboardSummary();
                fetchQuickStats();
                fetchRecentActivity();
                fetchDashboardWidgets();
              }}
              className="flex items-center px-4 py-2 text-customer-brand-500 hover:text-customer-brand-600 transition-colors duration-200"
            >
              Refresh Dashboard
            </button>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 border-b border-customer-ui-border">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "border-customer-brand-500 text-customer-brand-600"
                    : "border-transparent text-customer-ui-text-secondary hover:text-customer-ui-text-primary hover:border-customer-ui-text-tertiary"
                } flex items-center`}
              >
                {tab.icon}
                <span className="ml-2">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <OverviewTab
              dashboardSummary={dashboardSummary}
              quickStats={quickStats}
              recentActivity={recentActivity}
              dashboardWidgets={dashboardWidgets}
              isLoading={isLoading}
              errors={errors}
              onRefresh={() => {
                fetchDashboardSummary();
                fetchQuickStats();
                fetchRecentActivity();
                fetchDashboardWidgets();
              }}
              onTabChange={handleTabChange}
              formatCurrency={formatCurrency}
              formatDateTime={formatDateTime}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
            />
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <ProfileTab
              userProfile={userProfile}
              isLoading={isLoading}
              errors={errors}
              isEditingProfile={isEditingProfile}
              setIsEditingProfile={setIsEditingProfile}
              isChangingPassword={isChangingPassword}
              setIsChangingPassword={setIsChangingPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              profileForm={profileForm}
              setProfileForm={setProfileForm}
              passwordForm={passwordForm}
              setPasswordForm={setPasswordForm}
              successMessage={successMessage}
              onProfileUpdate={handleProfileUpdate}
              onPasswordChange={handlePasswordChange}
              onRefresh={() => fetchUserProfile()}
              formatCurrency={formatCurrency}
            />
          )}

          {/* Network Tree Tab */}
          {activeTab === "network" && (
            <NetworkTab
              networkStats={networkStats}
              networkMembers={networkMembers}
              pagination={pagination}
              isLoading={isLoading}
              errors={errors}
              networkFilters={networkFilters}
              onFilterChange={handleNetworkFilterChange}
              onPageChange={handleNetworkPageChange}
              onApplyFilters={applyNetworkFilters}
              onClearFilters={clearNetworkFilters}
              onRefresh={() => {
                fetchNetworkTree();
                fetchNetworkStats();
                fetchNetworkMembers(networkFilters);
              }}
              formatDate={formatDate}
              getStatusColor={getStatusColor}
            />
          )}

          {/* Earnings Tab */}
          {activeTab === "earnings" && (
            <EarningsTab
              earningsSummary={earningsSummary}
              earningsByType={earningsByType}
              earningsHistory={earningsHistory}
              walletDetails={walletDetails}
              pagination={pagination}
              isLoading={isLoading}
              errors={errors}
              onRefresh={() => {
                fetchEarningsSummary();
                fetchEarningsByType();
                fetchEarningsHistory();
                fetchWalletDetails();
              }}
              formatCurrency={formatCurrency}
              formatDateTime={formatDateTime}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

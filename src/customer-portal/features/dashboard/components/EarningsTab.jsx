import React, { useState, useEffect } from "react";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Wallet,
  RefreshCcw,
  AlertCircle,
  Download,
  Filter,
  ChevronDown,
  ChevronUp,
  BarChart3,
  PieChart,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const EarningsTab = ({
  earningsSummary,
  earningsByType,
  walletDetails,
  earningsHistory,
  pagination,
  isLoading,
  errors,
  onRefresh,
  formatCurrency,
  formatDateTime,
  getStatusColor,
  getStatusIcon,
}) => {
  const [viewMode, setViewMode] = useState("overview"); // "overview", "history", "analytics"
  const [dateRange, setDateRange] = useState("30"); // "7", "30", "90", "365", "all"
  const [earningsFilter, setEarningsFilter] = useState("all"); // "all", "referral", "bonus", "commission"
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("date"); // "date", "amount", "type"

  // Calculate earnings statistics
  const calculateEarningsStats = () => {
    if (!earningsSummary) return null;

    const total = earningsSummary.total_earnings || 0;
    const currentMonth = earningsSummary.monthly_earnings?.current_month || 0;
    const lastMonth = earningsSummary.monthly_earnings?.last_month || 0;
    const change =
      lastMonth > 0 ? ((currentMonth - lastMonth) / lastMonth) * 100 : 0;

    return {
      total,
      currentMonth,
      lastMonth,
      change,
      isPositive: change >= 0,
    };
  };

  const earningsStats = calculateEarningsStats();

  // Filter earnings history based on selected filters
  const filteredEarningsHistory = () => {
    if (!earningsHistory || earningsHistory.length === 0) return [];

    let filtered = [...earningsHistory];

    // Filter by type
    if (earningsFilter !== "all") {
      filtered = filtered.filter((earning) =>
        earning.type?.toLowerCase().includes(earningsFilter.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "amount":
          return (b.amount || 0) - (a.amount || 0);
        case "type":
          return (a.type || "").localeCompare(b.type || "");
        case "date":
        default:
          return new Date(b.date || 0) - new Date(a.date || 0);
      }
    });

    return filtered;
  };

  const filteredHistory = filteredEarningsHistory();

  return (
    <div className="space-y-6">
      {/* Header with View Toggle */}
      <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-customer-ui-text-primary">
            Your Earnings Overview
          </h2>
          <div className="flex items-center space-x-3">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-customer-ui-background rounded-lg p-1">
              <button
                onClick={() => setViewMode("overview")}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  viewMode === "overview"
                    ? "bg-customer-brand-500 text-white"
                    : "text-customer-ui-text-secondary hover:text-customer-ui-text-primary"
                }`}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </button>
              <button
                onClick={() => setViewMode("history")}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  viewMode === "history"
                    ? "bg-customer-brand-500 text-white"
                    : "text-customer-ui-text-secondary hover:text-customer-ui-text-primary"
                }`}
              >
                <Calendar className="w-4 h-4 mr-2" />
                History
              </button>
              <button
                onClick={() => setViewMode("analytics")}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  viewMode === "analytics"
                    ? "bg-customer-brand-500 text-white"
                    : "text-customer-ui-text-secondary hover:text-customer-ui-text-primary"
                }`}
              >
                <PieChart className="w-4 h-4 mr-2" />
                Analytics
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                showFilters
                  ? "bg-customer-brand-500 text-white"
                  : "bg-customer-ui-background text-customer-ui-text-primary hover:bg-customer-ui-border"
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {showFilters ? (
                <ChevronUp className="w-4 h-4 ml-2" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-2" />
              )}
            </button>

            <button
              onClick={onRefresh}
              disabled={isLoading.earnings}
              className="flex items-center px-4 py-2 text-customer-brand-500 hover:text-customer-brand-600 transition-colors duration-200 disabled:opacity-50"
            >
              <RefreshCcw
                className={`w-4 h-4 mr-2 ${
                  isLoading.earnings ? "animate-spin" : ""
                }`}
              />
              {isLoading.earnings ? "Loading..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-customer-ui-background rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                  Date Range
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 border border-customer-ui-border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                  <option value="365">Last year</option>
                  <option value="all">All time</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                  Earnings Type
                </label>
                <select
                  value={earningsFilter}
                  onChange={(e) => setEarningsFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-customer-ui-border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="referral">Referral</option>
                  <option value="bonus">Bonus</option>
                  <option value="commission">Commission</option>
                  <option value="reward">Reward</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-customer-ui-border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
                >
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                  <option value="type">Type</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setDateRange("30");
                    setEarningsFilter("all");
                    setSortBy("date");
                  }}
                  className="w-full px-4 py-2 border border-customer-ui-border text-customer-ui-text-primary rounded-lg hover:bg-customer-ui-background transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {errors.earnings && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700">{errors.earnings}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading.earnings && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-customer-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-customer-ui-text-primary">
                Loading earnings data...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Overview View */}
      {viewMode === "overview" && (
        <div className="space-y-6">
          {/* Enhanced Earnings Summary */}
          <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6">
            <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-4">
              Earnings Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-customer-brand-50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-customer-brand-700">
                    Total Earnings
                  </p>
                  <p className="text-xl font-bold text-customer-brand-800">
                    {formatCurrency(earningsStats?.total || 0)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-customer-brand-500" />
              </div>
              <div className="bg-green-50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700">This Month</p>
                  <p className="text-xl font-bold text-green-800">
                    {formatCurrency(earningsStats?.currentMonth || 0)}
                  </p>
                  <div className="flex items-center text-xs">
                    {earningsStats?.isPositive ? (
                      <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-600 mr-1" />
                    )}
                    <span
                      className={
                        earningsStats?.isPositive
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {Math.abs(earningsStats?.change || 0).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
              <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700">Last Month</p>
                  <p className="text-xl font-bold text-blue-800">
                    {formatCurrency(earningsStats?.lastMonth || 0)}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
              <div className="bg-purple-50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700">Avg. Daily</p>
                  <p className="text-xl font-bold text-purple-800">
                    {formatCurrency((earningsStats?.currentMonth || 0) / 30)}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Earnings by Type */}
          <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6">
            <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-4">
              Earnings by Type
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {earningsByType && Object.keys(earningsByType).length > 0 ? (
                Object.entries(earningsByType).map(([type, amount]) => (
                  <div
                    key={type}
                    className="bg-customer-ui-background rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition-shadow duration-200"
                  >
                    <div>
                      <p className="text-sm text-customer-ui-text-secondary capitalize">
                        {type.replace(/_/g, " ")} Income
                      </p>
                      <p className="text-lg font-semibold text-customer-ui-text-primary">
                        {formatCurrency(amount || 0)}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-customer-brand-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-customer-brand-500" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <DollarSign className="w-12 h-12 text-customer-ui-text-tertiary mx-auto mb-2" />
                  <p className="text-customer-ui-text-secondary">
                    No earnings data available
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Earnings */}
          <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6">
            <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-4">
              Recent Earnings
            </h3>
            {earningsSummary?.recent_earnings &&
            earningsSummary.recent_earnings.length > 0 ? (
              <div className="space-y-3">
                {earningsSummary.recent_earnings
                  .slice(0, 5)
                  .map((earning, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-customer-ui-background rounded-lg hover:shadow-sm transition-shadow duration-200"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                          <DollarSign className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                          <p className="font-medium text-customer-ui-text-primary">
                            {earning.description || "Earning"}
                          </p>
                          <p className="text-sm text-customer-ui-text-secondary capitalize">
                            {earning.type?.replace(/_/g, " ")} Income
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">
                          {formatCurrency(earning.amount || 0)}
                        </p>
                        <div className="flex items-center justify-end">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              earning.status
                            )}`}
                          >
                            {earning.status || "Pending"}
                          </span>
                          {getStatusIcon(earning.status)}
                        </div>
                        <p className="text-xs text-customer-ui-text-tertiary">
                          {formatDateTime(earning.date)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <DollarSign className="w-12 h-12 text-customer-ui-text-tertiary mx-auto mb-2" />
                <p className="text-customer-ui-text-secondary">
                  No recent earnings
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* History View */}
      {viewMode === "history" && (
        <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-customer-ui-text-primary">
              Earnings History
            </h3>
            <button className="flex items-center px-4 py-2 text-customer-brand-500 hover:text-customer-brand-600 transition-colors duration-200">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>

          {filteredHistory.length > 0 ? (
            <div className="space-y-3">
              {filteredHistory.map((earning, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-customer-ui-background rounded-lg hover:shadow-sm transition-shadow duration-200"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <DollarSign className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium text-customer-ui-text-primary">
                        {earning.description || "Earning"}
                      </p>
                      <p className="text-sm text-customer-ui-text-secondary capitalize">
                        {earning.type?.replace(/_/g, " ")} Income
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      {formatCurrency(earning.amount || 0)}
                    </p>
                    <div className="flex items-center justify-end">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          earning.status
                        )}`}
                      >
                        {earning.status || "Pending"}
                      </span>
                      {getStatusIcon(earning.status)}
                    </div>
                    <p className="text-xs text-customer-ui-text-tertiary">
                      {formatDateTime(earning.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-customer-ui-text-tertiary mx-auto mb-4" />
              <p className="text-customer-ui-text-secondary text-lg mb-2">
                No earnings history found
              </p>
              <p className="text-customer-ui-text-tertiary text-sm">
                Try adjusting your filters or check back later
              </p>
            </div>
          )}
        </div>
      )}

      {/* Analytics View */}
      {viewMode === "analytics" && (
        <div className="space-y-6">
          <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6">
            <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-4">
              Earnings Analytics
            </h3>
            <div className="text-center py-12">
              <PieChart className="w-16 h-16 text-customer-ui-text-tertiary mx-auto mb-4" />
              <p className="text-customer-ui-text-secondary text-lg mb-2">
                Analytics Coming Soon
              </p>
              <p className="text-customer-ui-text-tertiary text-sm">
                Advanced charts and analytics will be available here
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Wallet Details */}
      {walletDetails && walletDetails.length > 0 && (
        <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6">
          <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-4">
            Wallet Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {walletDetails.map((wallet, index) => (
              <div
                key={index}
                className="bg-customer-ui-background rounded-lg p-4 hover:shadow-sm transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-customer-ui-text-primary capitalize">
                    {wallet.wallet_type?.replace(/_/g, " ")} Wallet
                  </h4>
                  <Wallet className="w-5 h-5 text-customer-brand-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-customer-ui-text-secondary">
                      Balance:
                    </span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(wallet.balance || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-customer-ui-text-secondary">
                      Pending:
                    </span>
                    <span className="font-medium text-yellow-600">
                      {formatCurrency(wallet.pending_balance || 0)}
                    </span>
                  </div>
                  {wallet.available_balance !== undefined && (
                    <div className="flex justify-between text-sm">
                      <span className="text-customer-ui-text-secondary">
                        Available:
                      </span>
                      <span className="font-medium text-blue-600">
                        {formatCurrency(wallet.available_balance)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EarningsTab;

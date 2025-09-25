import React, { useState, useEffect } from "react";
import { useInvestmentPlansStore } from "../../../store/investmentPlansStore";
import { api } from "../../../../app/apiClient";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Filter,
  Download,
} from "lucide-react";

const InvestmentPlansTab = ({
  formatCurrency,
  formatDate,
  formatDateTime,
  getStatusColor,
  getStatusIcon,
}) => {
  const {
    userInvestments,
    isLoading,
    error,
    fetchUserInvestments,
    getTotalInvested,
    getTotalEarnings,
    getActiveInvestments,
    getCompletedInvestments,
    getPendingInvestments,
  } = useInvestmentPlansStore();

  const [transactions, setTransactions] = useState([]);
  const [earningsSummary, setEarningsSummary] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [filters, setFilters] = useState({
    status: "",
    plan_id: "",
    from_date: "",
    to_date: "",
    min_amount: "",
    max_amount: "",
    order_by: "invested_at",
    order_direction: "desc",
  });
  const [pagination, setPagination] = useState({
    total: 0,
    count: 0,
    per_page: 20,
    current_page: 1,
    total_pages: 1,
  });
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [loadingEarnings, setLoadingEarnings] = useState(false);

  useEffect(() => {
    fetchTransactions();
    fetchEarnings();
  }, []);

  const fetchTransactions = async (params = {}) => {
    setLoadingTransactions(true);
    try {
      const queryParams = new URLSearchParams();

      // Add filters
      Object.entries({ ...filters, ...params }).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await api.get(
        `/user/investments/transactions?${queryParams.toString()}`
      );

      if (response.data.status === "success") {
        setTransactions(response.data.data);
        setPagination(
          response.data.meta?.pagination || {
            total: response.data.data.length,
            count: response.data.data.length,
            per_page: 20,
            current_page: 1,
            total_pages: 1,
          }
        );
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoadingTransactions(false);
    }
  };

  const fetchEarnings = async (period = selectedPeriod) => {
    setLoadingEarnings(true);
    try {
      const response = await api.get(
        `/user/investments/earnings?period=${period}`
      );

      if (response.data.status === "success") {
        setEarningsSummary(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch earnings:", error);
    } finally {
      setLoadingEarnings(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyFilters = () => {
    setPagination((prev) => ({ ...prev, current_page: 1 }));
    fetchTransactions({ page: 1 });
  };

  const handleClearFilters = () => {
    setFilters({
      status: "",
      plan_id: "",
      from_date: "",
      to_date: "",
      min_amount: "",
      max_amount: "",
      order_by: "invested_at",
      order_direction: "desc",
    });
    fetchTransactions();
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, current_page: newPage }));
    fetchTransactions({ page: newPage });
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    fetchEarnings(period);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <Clock className="w-4 h-4" />,
      },
      active: {
        color: "bg-green-100 text-green-800",
        icon: <TrendingUp className="w-4 h-4" />,
      },
      completed: {
        color: "bg-blue-100 text-blue-800",
        icon: <CheckCircle className="w-4 h-4" />,
      },
      cancelled: {
        color: "bg-red-100 text-red-800",
        icon: <XCircle className="w-4 h-4" />,
      },
      withdrawn: {
        color: "bg-gray-100 text-gray-800",
        icon: <DollarSign className="w-4 h-4" />,
      },
    };

    const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.icon}
        <span className="ml-1 capitalize">{status}</span>
      </span>
    );
  };

  const getProgressPercentage = (elapsedDays, durationDays) => {
    if (!elapsedDays || !durationDays) return 0;
    return Math.min((elapsedDays / durationDays) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-customer-ui-text-primary">
            Investment Plans
          </h3>
          <p className="text-sm text-customer-ui-text-secondary">
            Manage your investment portfolio and track earnings
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => fetchTransactions()}
            disabled={loadingTransactions}
            className="flex items-center px-3 py-2 text-sm bg-customer-brand-500 hover:bg-customer-brand-600 text-white rounded-lg transition-colors"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${
                loadingTransactions ? "animate-spin" : ""
              }`}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* Earnings Summary Cards */}
      {earningsSummary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-customer-ui-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-customer-ui-text-secondary">
                  Total Invested
                </p>
                <p className="text-2xl font-semibold text-customer-ui-text-primary">
                  {earningsSummary.total_invested_formatted}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-customer-brand-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-customer-ui-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-customer-ui-text-secondary">
                  Accrued Interest
                </p>
                <p className="text-2xl font-semibold text-green-600">
                  {earningsSummary.total_accrued_interest_formatted}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-customer-ui-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-customer-ui-text-secondary">
                  Total Payout
                </p>
                <p className="text-2xl font-semibold text-blue-600">
                  {earningsSummary.total_payout_formatted}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-customer-ui-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-customer-ui-text-secondary">
                  Net Earnings
                </p>
                <p className="text-2xl font-semibold text-purple-600">
                  {earningsSummary.net_earnings_formatted}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>
      )}

      {/* Period Selector */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-customer-ui-border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-semibold text-customer-ui-text-primary">
            Earnings Summary
          </h4>
          <div className="flex space-x-2">
            {["today", "week", "month", "year", "all"].map((period) => (
              <button
                key={period}
                onClick={() => handlePeriodChange(period)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  selectedPeriod === period
                    ? "bg-customer-brand-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {earningsSummary?.by_status && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(earningsSummary.by_status).map(([status, data]) => (
              <div key={status} className="text-center">
                <div className="text-2xl font-bold text-customer-ui-text-primary">
                  {data.count}
                </div>
                <div className="text-sm text-customer-ui-text-secondary capitalize">
                  {status}
                </div>
                <div className="text-xs text-customer-ui-text-secondary">
                  {formatCurrency(data.amount || 0)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-customer-ui-border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-semibold text-customer-ui-text-primary">
            Filters
          </h4>
          <div className="flex space-x-2">
            <button
              onClick={handleApplyFilters}
              className="flex items-center px-3 py-2 text-sm bg-customer-brand-500 hover:bg-customer-brand-600 text-white rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Apply
            </button>
            <button
              onClick={handleClearFilters}
              className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-customer-ui-text-primary mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full px-3 py-2 border border-customer-ui-border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-customer-ui-text-primary mb-1">
              From Date
            </label>
            <input
              type="date"
              value={filters.from_date}
              onChange={(e) => handleFilterChange("from_date", e.target.value)}
              className="w-full px-3 py-2 border border-customer-ui-border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-customer-ui-text-primary mb-1">
              To Date
            </label>
            <input
              type="date"
              value={filters.to_date}
              onChange={(e) => handleFilterChange("to_date", e.target.value)}
              className="w-full px-3 py-2 border border-customer-ui-border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-customer-ui-text-primary mb-1">
              Min Amount
            </label>
            <input
              type="number"
              value={filters.min_amount}
              onChange={(e) => handleFilterChange("min_amount", e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-customer-ui-border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-customer-ui-text-primary mb-1">
              Max Amount
            </label>
            <input
              type="number"
              value={filters.max_amount}
              onChange={(e) => handleFilterChange("max_amount", e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-customer-ui-border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-customer-ui-text-primary mb-1">
              Sort By
            </label>
            <select
              value={filters.order_by}
              onChange={(e) => handleFilterChange("order_by", e.target.value)}
              className="w-full px-3 py-2 border border-customer-ui-border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
            >
              <option value="invested_at">Investment Date</option>
              <option value="amount_invested">Amount</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-customer-ui-border">
        <div className="px-4 py-3 border-b border-customer-ui-border">
          <h4 className="text-md font-semibold text-customer-ui-text-primary">
            Investment Transactions
          </h4>
        </div>

        {loadingTransactions ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin text-customer-brand-500 mr-2" />
            <span className="text-customer-ui-text-secondary">
              Loading transactions...
            </span>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-customer-ui-text-primary mb-2">
              No Investments Found
            </h3>
            <p className="text-customer-ui-text-secondary text-center">
              You haven't made any investments yet. Start investing to see your
              transactions here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-customer-ui-text-secondary uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-customer-ui-text-secondary uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-customer-ui-text-secondary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-customer-ui-text-secondary uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-customer-ui-text-secondary uppercase tracking-wider">
                    Earnings
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-customer-ui-text-secondary uppercase tracking-wider">
                    Invested Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-customer-ui-border">
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.transaction_id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-sm font-medium text-customer-ui-text-primary">
                          {transaction.investment_plan.name}
                        </div>
                        <div className="text-sm text-customer-ui-text-secondary">
                          {transaction.investment_plan.code}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-customer-ui-text-primary">
                        {
                          transaction.transaction_details
                            .amount_invested_formatted
                        }
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {getStatusBadge(transaction.transaction_details.status)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-customer-brand-500 h-2 rounded-full"
                            style={{
                              width: `${getProgressPercentage(
                                transaction.earnings_details.elapsed_days,
                                transaction.transaction_details.duration_days
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-customer-ui-text-secondary">
                          {Math.round(
                            getProgressPercentage(
                              transaction.earnings_details.elapsed_days,
                              transaction.transaction_details.duration_days
                            )
                          )}
                          %
                        </span>
                      </div>
                      <div className="text-xs text-customer-ui-text-secondary mt-1">
                        {transaction.earnings_details.remaining_days} days
                        remaining
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-sm font-medium text-green-600">
                          {
                            transaction.earnings_details
                              .accrued_interest_formatted
                          }
                        </div>
                        <div className="text-xs text-customer-ui-text-secondary">
                          of{" "}
                          {
                            transaction.earnings_details
                              .total_expected_return_formatted
                          }
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-customer-ui-text-primary">
                        {formatDateTime(
                          transaction.transaction_details.invested_at
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.total_pages > 1 && (
          <div className="px-4 py-3 border-t border-customer-ui-border">
            <div className="flex items-center justify-between">
              <div className="text-sm text-customer-ui-text-secondary">
                Showing {pagination.count} of {pagination.total} transactions
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.current_page - 1)}
                  disabled={pagination.current_page === 1}
                  className="px-3 py-1 text-sm border border-customer-ui-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm bg-customer-brand-500 text-white rounded-lg">
                  {pagination.current_page}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.current_page + 1)}
                  disabled={pagination.current_page === pagination.total_pages}
                  className="px-3 py-1 text-sm border border-customer-ui-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentPlansTab;

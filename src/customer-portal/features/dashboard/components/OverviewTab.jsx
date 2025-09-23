import React from "react";
import {
  DollarSign,
  Users,
  TrendingUp,
  Award,
  Activity,
  User,
  Network,
  Wallet,
  BarChart3,
  RefreshCcw,
  AlertCircle,
} from "lucide-react";

const OverviewTab = ({
  dashboardSummary,
  quickStats,
  recentActivity,
  dashboardWidgets,
  isLoading,
  errors,
  onRefresh,
  onTabChange,
  formatCurrency,
  formatDateTime,
  getStatusColor,
  getStatusIcon,
}) => {
  return (
    <div className="space-y-8">
      {/* Loading State */}
      {isLoading.summary && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-customer-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-customer-ui-text-primary">
              Loading dashboard data...
            </p>
          </div>
        </div>
      )}

      {/* Error Display */}
      {errors.summary && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-700">{errors.summary}</p>
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6 flex items-center">
          <DollarSign className="w-8 h-8 text-customer-brand-500 mr-4" />
          <div>
            <p className="text-sm text-customer-ui-text-secondary">
              Total Earnings
            </p>
            <p className="text-xl font-bold text-customer-ui-text-primary">
              {formatCurrency(
                dashboardSummary?.overview_stats?.total_earnings ||
                  quickStats?.total_earnings ||
                  0
              )}
            </p>
            <p className="text-xs text-green-600">
              {dashboardSummary?.overview_stats?.earnings_change ||
                (quickStats?.earnings_change_percentage
                  ? `+${quickStats.earnings_change_percentage}%`
                  : "+0.0%")}
            </p>
          </div>
        </div>
        <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6 flex items-center">
          <Users className="w-8 h-8 text-customer-accent-500 mr-4" />
          <div>
            <p className="text-sm text-customer-ui-text-secondary">
              Team Members
            </p>
            <p className="text-xl font-bold text-customer-ui-text-primary">
              {dashboardSummary?.overview_stats?.team_members ||
                quickStats?.total_referrals ||
                0}
            </p>
            <p className="text-xs text-green-600">
              {dashboardSummary?.overview_stats?.team_change ||
                `${quickStats?.active_referrals || 0} active`}
            </p>
          </div>
        </div>
        <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6 flex items-center">
          <TrendingUp className="w-8 h-8 text-green-500 mr-4" />
          <div>
            <p className="text-sm text-customer-ui-text-secondary">
              Direct Referrals
            </p>
            <p className="text-xl font-bold text-customer-ui-text-primary">
              {dashboardSummary?.overview_stats?.direct_referrals ||
                quickStats?.active_referrals ||
                0}
            </p>
            <p className="text-xs text-green-600">
              {dashboardSummary?.overview_stats?.referrals_change ||
                "This month"}
            </p>
          </div>
        </div>
        <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6 flex items-center">
          <Award className="w-8 h-8 text-purple-500 mr-4" />
          <div>
            <p className="text-sm text-customer-ui-text-secondary">
              Current Rank
            </p>
            <p className="text-xl font-bold text-customer-ui-text-primary">
              {dashboardSummary?.overview_stats?.current_rank ||
                dashboardSummary?.user?.current_rank ||
                "N/A"}
            </p>
            <p className="text-xs text-customer-ui-text-tertiary">
              Level{" "}
              {dashboardSummary?.overview_stats?.level ||
                dashboardSummary?.user?.level ||
                0}
            </p>
          </div>
        </div>
      </div>

      {/* Wallet Summary */}
      {dashboardSummary?.wallet_summary && (
        <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6">
          <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-4">
            Wallet Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-customer-brand-500">
                {formatCurrency(dashboardSummary.wallet_summary.total_balance)}
              </p>
              <p className="text-customer-ui-text-secondary">Total Balance</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-500">
                {formatCurrency(dashboardSummary.wallet_summary.total_pending)}
              </p>
              <p className="text-customer-ui-text-secondary">Pending</p>
            </div>
            <div className="space-y-2">
              {dashboardSummary.wallet_summary.wallets?.map((wallet, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-customer-ui-text-secondary capitalize">
                    {wallet.wallet_type}:
                  </span>
                  <span className="font-medium">
                    {formatCurrency(wallet.balance)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <h2 className="text-2xl font-bold text-customer-ui-text-primary mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button
          onClick={() => onTabChange("profile")}
          className="bg-customer-ui-surface rounded-xl shadow-soft p-6 flex flex-col items-center justify-center text-center hover:shadow-medium transition-all duration-300"
        >
          <User className="w-8 h-8 text-customer-brand-500 mb-3" />
          <p className="text-lg font-semibold text-customer-ui-text-primary">
            View Profile
          </p>
          <p className="text-sm text-customer-ui-text-secondary">
            Account details
          </p>
        </button>
        <button
          onClick={() => onTabChange("network")}
          className="bg-customer-ui-surface rounded-xl shadow-soft p-6 flex flex-col items-center justify-center text-center hover:shadow-medium transition-all duration-300"
        >
          <Network className="w-8 h-8 text-customer-brand-500 mb-3" />
          <p className="text-lg font-semibold text-customer-ui-text-primary">
            Network Tree
          </p>
          <p className="text-sm text-customer-ui-text-secondary">
            View your team
          </p>
        </button>
        <button
          onClick={() => onTabChange("earnings")}
          className="bg-customer-ui-surface rounded-xl shadow-soft p-6 flex flex-col items-center justify-center text-center hover:shadow-medium transition-all duration-300"
        >
          <Wallet className="w-8 h-8 text-customer-brand-500 mb-3" />
          <p className="text-lg font-semibold text-customer-ui-text-primary">
            Earnings
          </p>
          <p className="text-sm text-customer-ui-text-secondary">
            Income details
          </p>
        </button>
        <button className="bg-customer-ui-surface rounded-xl shadow-soft p-6 flex flex-col items-center justify-center text-center hover:shadow-medium transition-all duration-300">
          <BarChart3 className="w-8 h-8 text-customer-brand-500 mb-3" />
          <p className="text-lg font-semibold text-customer-ui-text-primary">
            Analytics
          </p>
          <p className="text-sm text-customer-ui-text-secondary">
            Performance metrics
          </p>
        </button>
      </div>

      {/* Monthly Earnings Comparison */}
      {quickStats && (
        <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6">
          <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-4">
            Monthly Earnings Comparison
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-customer-brand-500">
                {formatCurrency(quickStats.this_month_earnings || 0)}
              </p>
              <p className="text-sm text-customer-ui-text-secondary">
                This Month
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-500">
                {formatCurrency(quickStats.last_month_earnings || 0)}
              </p>
              <p className="text-sm text-customer-ui-text-secondary">
                Last Month
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">
                {quickStats.earnings_change_percentage > 0 ? "+" : ""}
                {quickStats.earnings_change_percentage || 0}%
              </p>
              <p className="text-sm text-customer-ui-text-secondary">Change</p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6">
          <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.slice(0, 5).map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-customer-ui-border last:border-b-0"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-customer-brand-100 rounded-full flex items-center justify-center mr-3">
                    <Activity className="w-4 h-4 text-customer-brand-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-customer-ui-text-primary">
                      {activity.title}
                    </p>
                    <p className="text-xs text-customer-ui-text-secondary capitalize">
                      {activity.type} • {activity.status}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-customer-ui-text-tertiary">
                    {formatDateTime(activity.date)}
                  </p>
                  {activity.amount && (
                    <p className="text-sm font-medium text-green-600">
                      {formatCurrency(activity.amount)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dashboard Widgets - Charts and Analytics */}
      {dashboardWidgets && (
        <div className="space-y-6">
          {/* Earnings Chart */}
          {dashboardWidgets.earnings_chart && (
            <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-4">
                Earnings Trend (Last 12 Months)
              </h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {dashboardWidgets.earnings_chart.map((data, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className="w-full bg-customer-brand-500 rounded-t"
                      style={{
                        height: `${Math.max(
                          (data.earnings /
                            Math.max(
                              ...dashboardWidgets.earnings_chart.map(
                                (d) => d.earnings
                              )
                            )) *
                            200,
                          4
                        )}px`,
                      }}
                    ></div>
                    <p className="text-xs text-customer-ui-text-tertiary mt-2 transform -rotate-45 origin-left">
                      {data.month.split(" ")[0]}
                    </p>
                    <p className="text-xs text-customer-ui-text-secondary mt-1">
                      {formatCurrency(data.earnings)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Referral Chart */}
          {dashboardWidgets.referral_chart && (
            <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-4">
                Referrals Trend (Last 12 Months)
              </h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {dashboardWidgets.referral_chart.map((data, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className="w-full bg-green-500 rounded-t"
                      style={{
                        height: `${Math.max(
                          (data.referrals /
                            Math.max(
                              ...dashboardWidgets.referral_chart.map(
                                (d) => d.referrals
                              )
                            )) *
                            200,
                          4
                        )}px`,
                      }}
                    ></div>
                    <p className="text-xs text-customer-ui-text-tertiary mt-2 transform -rotate-45 origin-left">
                      {data.month.split(" ")[0]}
                    </p>
                    <p className="text-xs text-customer-ui-text-secondary mt-1">
                      {data.referrals} refs
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Earners and Recent Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Earners */}
            {dashboardWidgets.top_earners && (
              <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-4">
                  Top Team Earners
                </h3>
                <div className="space-y-3">
                  {dashboardWidgets.top_earners.map((earner, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-customer-ui-background rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-customer-brand-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-bold text-customer-brand-500">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-customer-ui-text-primary">
                            {earner.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">
                          {formatCurrency(earner.earnings)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Transactions */}
            {dashboardWidgets.recent_transactions && (
              <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-4">
                  Recent Transactions
                </h3>
                <div className="space-y-3">
                  {dashboardWidgets.recent_transactions.map(
                    (transaction, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-customer-ui-background rounded-lg"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <DollarSign className="w-4 h-4 text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium text-customer-ui-text-primary capitalize">
                              {transaction.type.replace("_", " ")}
                            </p>
                            <p className="text-xs text-customer-ui-text-secondary">
                              from {transaction.from}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">
                            {formatCurrency(transaction.amount)}
                          </p>
                          <p className="text-xs text-customer-ui-text-tertiary">
                            {formatDateTime(transaction.date)}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewTab;

import React, { useState } from "react";
import {
  Network,
  Users,
  User,
  RefreshCcw,
  AlertCircle,
  List,
  TreePine,
} from "lucide-react";
import MLMTree from "./MLMTree";

const NetworkTab = ({
  networkStats,
  networkMembers,
  pagination,
  isLoading,
  errors,
  networkFilters,
  onFilterChange,
  onPageChange,
  onApplyFilters,
  onClearFilters,
  onRefresh,
  formatDate,
  getStatusColor,
}) => {
  const [viewMode, setViewMode] = useState("tree"); // "tree" or "list"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-customer-ui-text-primary">
            Your Network Tree
          </h2>
          <div className="flex items-center space-x-3">
            {/* View Toggle Buttons */}
            <div className="flex items-center bg-customer-ui-background rounded-lg p-1">
              <button
                onClick={() => setViewMode("tree")}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  viewMode === "tree"
                    ? "bg-customer-brand-500 text-white"
                    : "text-customer-ui-text-secondary hover:text-customer-ui-text-primary"
                }`}
              >
                <TreePine className="w-4 h-4 mr-2" />
                Tree View
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  viewMode === "list"
                    ? "bg-customer-brand-500 text-white"
                    : "text-customer-ui-text-secondary hover:text-customer-ui-text-primary"
                }`}
              >
                <List className="w-4 h-4 mr-2" />
                List View
              </button>
            </div>
            <button
              onClick={onRefresh}
              disabled={isLoading.network}
              className="flex items-center px-4 py-2 text-customer-brand-500 hover:text-customer-brand-600 transition-colors duration-200 disabled:opacity-50"
            >
              <RefreshCcw
                className={`w-4 h-4 mr-2 ${
                  isLoading.network ? "animate-spin" : ""
                }`}
              />
              {isLoading.network ? "Loading..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {errors.network && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700">{errors.network}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading.network && !networkStats && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-customer-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-customer-ui-text-primary">
                Loading network data...
              </p>
            </div>
          </div>
        )}

        {/* Network Stats */}
        {networkStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-customer-brand-500">
                {networkStats.tree_stats?.total_members || 0}
              </p>
              <p className="text-sm text-customer-ui-text-secondary">
                Total Members
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">
                {networkStats.tree_stats?.direct_referrals || 0}
              </p>
              <p className="text-sm text-customer-ui-text-secondary">
                Direct Referrals
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-500">
                {networkStats.tree_stats?.levels_deep || 0}
              </p>
              <p className="text-sm text-customer-ui-text-secondary">
                Levels Deep
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-500">
                {networkStats.tree_stats?.left_leg || 0} /{" "}
                {networkStats.tree_stats?.right_leg || 0}
              </p>
              <p className="text-sm text-customer-ui-text-secondary">
                Left / Right Leg
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Network Tree Visualization */}
      {viewMode === "tree" && (
        <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6">
          <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-4">
            Network Tree Visualization
          </h3>
          <div className="h-[500px] bg-customer-ui-background rounded-lg overflow-hidden">
            <MLMTree className="w-full h-full" networkData={networkMembers} />
          </div>
        </div>
      )}

      {/* Team Members Section */}
      {viewMode === "list" && (
        <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-customer-ui-text-primary">
              Team Members
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-customer-ui-text-secondary">
                {pagination.networkMembers.total || 0} total members
              </span>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                Level
              </label>
              <select
                value={networkFilters.level}
                onChange={(e) => onFilterChange("level", e.target.value)}
                className="w-full px-3 py-2 border border-customer-ui-border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
              >
                <option value="">All Levels</option>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
                <option value="4">Level 4</option>
                <option value="5">Level 5</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                Status
              </label>
              <select
                value={networkFilters.status}
                onChange={(e) => onFilterChange("status", e.target.value)}
                className="w-full px-3 py-2 border border-customer-ui-border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                Per Page
              </label>
              <select
                value={networkFilters.per_page}
                onChange={(e) =>
                  onFilterChange("per_page", parseInt(e.target.value))
                }
                className="w-full px-3 py-2 border border-customer-ui-border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
            <div className="flex items-end space-x-2">
              <button
                onClick={onApplyFilters}
                disabled={isLoading.network}
                className="px-4 py-2 bg-customer-brand-500 hover:bg-customer-brand-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                Apply Filters
              </button>
              <button
                onClick={onClearFilters}
                className="px-4 py-2 border border-customer-ui-border text-customer-ui-text-primary rounded-lg hover:bg-customer-ui-background transition-colors duration-200"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Team Members List */}
          {isLoading.network ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-customer-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-customer-ui-text-primary">
                  Loading members...
                </p>
              </div>
            </div>
          ) : networkMembers.length > 0 ? (
            <div className="space-y-3">
              {networkMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-customer-ui-background rounded-lg hover:shadow-sm transition-shadow duration-200"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-customer-brand-100 rounded-full flex items-center justify-center mr-4">
                      <User className="w-5 h-5 text-customer-brand-500" />
                    </div>
                    <div>
                      <p className="font-medium text-customer-ui-text-primary">
                        {member.name || "Unknown Member"}
                      </p>
                      <p className="text-sm text-customer-ui-text-secondary">
                        {member.referral_code || "N/A"} • Level{" "}
                        {member.level || 0}
                      </p>
                      {member.email && (
                        <p className="text-xs text-customer-ui-text-tertiary">
                          {member.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        member.status
                      )}`}
                    >
                      {member.status || "Unknown"}
                    </span>
                    {member.joined_at && (
                      <p className="text-xs text-customer-ui-text-tertiary mt-1">
                        Joined {formatDate(member.joined_at)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-customer-ui-text-tertiary mx-auto mb-4" />
              <p className="text-customer-ui-text-secondary text-lg mb-2">
                No team members found
              </p>
              <p className="text-customer-ui-text-tertiary text-sm">
                Try adjusting your filters or check back later
              </p>
            </div>
          )}

          {/* Pagination */}
          {pagination.networkMembers.total_pages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-customer-ui-border">
              <div className="text-sm text-customer-ui-text-secondary">
                Showing{" "}
                {(pagination.networkMembers.page - 1) *
                  pagination.networkMembers.per_page +
                  1}{" "}
                to{" "}
                {Math.min(
                  pagination.networkMembers.page *
                    pagination.networkMembers.per_page,
                  pagination.networkMembers.total
                )}{" "}
                of {pagination.networkMembers.total} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    onPageChange(pagination.networkMembers.page - 1)
                  }
                  disabled={
                    pagination.networkMembers.page <= 1 || isLoading.network
                  }
                  className="px-3 py-1 border border-customer-ui-border text-customer-ui-text-primary rounded hover:bg-customer-ui-background transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm text-customer-ui-text-primary">
                  Page {pagination.networkMembers.page} of{" "}
                  {pagination.networkMembers.total_pages}
                </span>
                <button
                  onClick={() =>
                    onPageChange(pagination.networkMembers.page + 1)
                  }
                  disabled={
                    pagination.networkMembers.page >=
                      pagination.networkMembers.total_pages || isLoading.network
                  }
                  className="px-3 py-1 border border-customer-ui-border text-customer-ui-text-primary rounded hover:bg-customer-ui-background transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NetworkTab;

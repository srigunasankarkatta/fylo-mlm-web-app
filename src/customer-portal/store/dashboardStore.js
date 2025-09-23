import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../../app/apiClient";

// Dashboard Store for Customer Portal
export const useDashboardStore = create(
  persist(
    (set, get) => ({
      // State
      dashboardSummary: null,
      userProfile: null,
      networkTree: null,
      networkStats: null,
      networkMembers: [],
      earningsSummary: null,
      earningsHistory: [],
      earningsByType: null,
      walletDetails: [],
      ledgerTransactions: [],
      recentActivity: [],
      quickStats: null,
      performanceAnalytics: null,
      dashboardWidgets: null,

      // Loading states
      isLoading: {
        summary: false,
        profile: false,
        network: false,
        earnings: false,
        wallets: false,
        activity: false,
        widgets: false,
      },

      // Error states
      errors: {
        summary: null,
        profile: null,
        network: null,
        earnings: null,
        wallets: null,
        activity: null,
        widgets: null,
      },

      // Pagination
      pagination: {
        networkMembers: { page: 1, per_page: 20, total: 0, total_pages: 0 },
        earningsHistory: { page: 1, per_page: 20, total: 0, total_pages: 0 },
        ledgerTransactions: { page: 1, per_page: 20, total: 0, total_pages: 0 },
      },

      // Actions
      setLoading: (key, isLoading) =>
        set((state) => ({
          isLoading: { ...state.isLoading, [key]: isLoading },
        })),

      setError: (key, error) =>
        set((state) => ({
          errors: { ...state.errors, [key]: error },
        })),

      clearError: (key) =>
        set((state) => ({
          errors: { ...state.errors, [key]: null },
        })),

      // Dashboard Summary
      fetchDashboardSummary: async () => {
        set((state) => ({
          isLoading: { ...state.isLoading, summary: true },
          errors: { ...state.errors, summary: null },
        }));

        try {
          const response = await api.get("/user/dashboard/summary");

          if (response.data.status === "success") {
            set({
              dashboardSummary: response.data.data,
              isLoading: { ...get().isLoading, summary: false },
              errors: { ...get().errors, summary: null },
            });
            return { success: true, data: response.data.data };
          } else {
            throw new Error(
              response.data.message || "Failed to fetch dashboard summary"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch dashboard summary";

          // If it's a 401 error, don't set error state as it will be handled by auth interceptor
          if (error.response?.status !== 401) {
            set({
              isLoading: { ...get().isLoading, summary: false },
              errors: { ...get().errors, summary: errorMessage },
            });
          } else {
            set({
              isLoading: { ...get().isLoading, summary: false },
            });
          }

          return { success: false, error: errorMessage };
        }
      },

      // Quick Stats
      fetchQuickStats: async () => {
        set((state) => ({
          isLoading: { ...state.isLoading, activity: true },
          errors: { ...state.errors, activity: null },
        }));

        try {
          const response = await api.get("/user/dashboard/quick-stats");

          if (response.data.status === "success") {
            set({
              quickStats: response.data.data,
              isLoading: { ...get().isLoading, activity: false },
              errors: { ...get().errors, activity: null },
            });
            return { success: true, data: response.data.data };
          } else {
            throw new Error(
              response.data.message || "Failed to fetch quick stats"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch quick stats";

          // If it's a 401 error, don't set error state as it will be handled by auth interceptor
          if (error.response?.status !== 401) {
            set({
              isLoading: { ...get().isLoading, activity: false },
              errors: { ...get().errors, activity: errorMessage },
            });
          } else {
            set({
              isLoading: { ...get().isLoading, activity: false },
            });
          }

          return { success: false, error: errorMessage };
        }
      },

      // Recent Activity
      fetchRecentActivity: async () => {
        set((state) => ({
          isLoading: { ...state.isLoading, activity: true },
          errors: { ...state.errors, activity: null },
        }));

        try {
          const response = await api.get("/user/dashboard/recent-activity");

          if (response.data.status === "success") {
            set({
              recentActivity: response.data.data,
              isLoading: { ...get().isLoading, activity: false },
              errors: { ...get().errors, activity: null },
            });
            return { success: true, data: response.data.data };
          } else {
            throw new Error(
              response.data.message || "Failed to fetch recent activity"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch recent activity";
          set({
            isLoading: { ...get().isLoading, activity: false },
            errors: { ...get().errors, activity: errorMessage },
          });
          return { success: false, error: errorMessage };
        }
      },

      // Dashboard Widgets
      fetchDashboardWidgets: async () => {
        set((state) => ({
          isLoading: { ...state.isLoading, widgets: true },
          errors: { ...state.errors, widgets: null },
        }));

        try {
          const response = await api.get("/user/dashboard/widgets");

          if (response.data.status === "success") {
            set({
              dashboardWidgets: response.data.data,
              isLoading: { ...get().isLoading, widgets: false },
              errors: { ...get().errors, widgets: null },
            });
            return { success: true, data: response.data.data };
          } else {
            throw new Error(
              response.data.message || "Failed to fetch dashboard widgets"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch dashboard widgets";
          set({
            isLoading: { ...get().isLoading, widgets: false },
            errors: { ...get().errors, widgets: errorMessage },
          });
          return { success: false, error: errorMessage };
        }
      },

      // User Profile
      fetchUserProfile: async () => {
        set((state) => ({
          isLoading: { ...state.isLoading, profile: true },
          errors: { ...state.errors, profile: null },
        }));

        try {
          const response = await api.get("/user/profile");

          if (response.data.status === "success") {
            set({
              userProfile: response.data.data,
              isLoading: { ...get().isLoading, profile: false },
              errors: { ...get().errors, profile: null },
            });
            return { success: true, data: response.data.data };
          } else {
            throw new Error(
              response.data.message || "Failed to fetch user profile"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch user profile";
          set({
            isLoading: { ...get().isLoading, profile: false },
            errors: { ...get().errors, profile: errorMessage },
          });
          return { success: false, error: errorMessage };
        }
      },

      updateUserProfile: async (profileData) => {
        set((state) => ({
          isLoading: { ...state.isLoading, profile: true },
          errors: { ...state.errors, profile: null },
        }));

        try {
          const response = await api.put("/user/profile", profileData);

          if (response.data.status === "success") {
            set({
              userProfile: response.data.data,
              isLoading: { ...get().isLoading, profile: false },
              errors: { ...get().errors, profile: null },
            });
            return { success: true, data: response.data.data };
          } else {
            throw new Error(
              response.data.message || "Failed to update profile"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to update profile";
          set({
            isLoading: { ...get().isLoading, profile: false },
            errors: { ...get().errors, profile: errorMessage },
          });
          return { success: false, error: errorMessage };
        }
      },

      changePassword: async (passwordData) => {
        set((state) => ({
          isLoading: { ...state.isLoading, profile: true },
          errors: { ...state.errors, profile: null },
        }));

        try {
          const response = await api.post(
            "/user/change-password",
            passwordData
          );

          if (response.data.status === "success") {
            set({
              isLoading: { ...get().isLoading, profile: false },
              errors: { ...get().errors, profile: null },
            });
            return { success: true, data: response.data.data };
          } else {
            throw new Error(
              response.data.message || "Failed to change password"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to change password";
          set({
            isLoading: { ...get().isLoading, profile: false },
            errors: { ...get().errors, profile: errorMessage },
          });
          return { success: false, error: errorMessage };
        }
      },

      // Network Tree
      fetchNetworkTree: async () => {
        set((state) => ({
          isLoading: { ...state.isLoading, network: true },
          errors: { ...state.errors, network: null },
        }));

        try {
          const response = await api.get("/user/network/tree");

          if (response.data.status === "success") {
            set({
              networkTree: response.data.data,
              isLoading: { ...get().isLoading, network: false },
              errors: { ...get().errors, network: null },
            });
            return { success: true, data: response.data.data };
          } else {
            throw new Error(
              response.data.message || "Failed to fetch network tree"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch network tree";
          set({
            isLoading: { ...get().isLoading, network: false },
            errors: { ...get().errors, network: errorMessage },
          });
          return { success: false, error: errorMessage };
        }
      },

      fetchNetworkStats: async () => {
        try {
          const response = await api.get("/user/network/stats");

          if (response.data.status === "success") {
            set({ networkStats: response.data.data });
            return { success: true, data: response.data.data };
          } else {
            throw new Error(
              response.data.message || "Failed to fetch network stats"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch network stats";
          return { success: false, error: errorMessage };
        }
      },

      fetchNetworkMembers: async (params = {}) => {
        set((state) => ({
          isLoading: { ...state.isLoading, network: true },
          errors: { ...state.errors, network: null },
        }));

        try {
          const queryParams = new URLSearchParams();
          if (params.level) queryParams.append("level", params.level);
          if (params.status) queryParams.append("status", params.status);
          if (params.per_page) queryParams.append("per_page", params.per_page);
          if (params.page) queryParams.append("page", params.page);

          const response = await api.get(
            `/user/network/members?${queryParams.toString()}`
          );

          if (response.data.status === "success") {
            set({
              networkMembers: response.data.data,
              pagination: {
                ...get().pagination,
                networkMembers:
                  response.data.meta?.pagination ||
                  get().pagination.networkMembers,
              },
              isLoading: { ...get().isLoading, network: false },
              errors: { ...get().errors, network: null },
            });
            return { success: true, data: response.data.data };
          } else {
            throw new Error(
              response.data.message || "Failed to fetch network members"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch network members";
          set({
            isLoading: { ...get().isLoading, network: false },
            errors: { ...get().errors, network: errorMessage },
          });
          return { success: false, error: errorMessage };
        }
      },

      // Earnings
      fetchEarningsSummary: async () => {
        set((state) => ({
          isLoading: { ...state.isLoading, earnings: true },
          errors: { ...state.errors, earnings: null },
        }));

        try {
          const response = await api.get("/user/earnings/summary");

          if (response.data.status === "success") {
            set({
              earningsSummary: response.data.data,
              isLoading: { ...get().isLoading, earnings: false },
              errors: { ...get().errors, earnings: null },
            });
            return { success: true, data: response.data.data };
          } else {
            throw new Error(
              response.data.message || "Failed to fetch earnings summary"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch earnings summary";
          set({
            isLoading: { ...get().isLoading, earnings: false },
            errors: { ...get().errors, earnings: errorMessage },
          });
          return { success: false, error: errorMessage };
        }
      },

      fetchEarningsHistory: async (params = {}) => {
        try {
          const queryParams = new URLSearchParams();
          if (params.type) queryParams.append("type", params.type);
          if (params.status) queryParams.append("status", params.status);
          if (params.start_date)
            queryParams.append("start_date", params.start_date);
          if (params.end_date) queryParams.append("end_date", params.end_date);
          if (params.per_page) queryParams.append("per_page", params.per_page);
          if (params.page) queryParams.append("page", params.page);

          const response = await api.get(
            `/user/earnings/history?${queryParams.toString()}`
          );

          if (response.data.status === "success") {
            set({
              earningsHistory: response.data.data,
              pagination: {
                ...get().pagination,
                earningsHistory:
                  response.data.meta?.pagination ||
                  get().pagination.earningsHistory,
              },
            });
            return { success: true, data: response.data.data };
          } else {
            throw new Error(
              response.data.message || "Failed to fetch earnings history"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch earnings history";
          return { success: false, error: errorMessage };
        }
      },

      fetchEarningsByType: async () => {
        try {
          const response = await api.get("/user/earnings/by-type");

          if (response.data.status === "success") {
            set({ earningsByType: response.data.data });
            return { success: true, data: response.data.data };
          } else {
            throw new Error(
              response.data.message || "Failed to fetch earnings by type"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch earnings by type";
          return { success: false, error: errorMessage };
        }
      },

      // Wallets
      fetchWalletDetails: async () => {
        set((state) => ({
          isLoading: { ...state.isLoading, wallets: true },
          errors: { ...state.errors, wallets: null },
        }));

        try {
          const response = await api.get("/user/wallets");

          if (response.data.status === "success") {
            set({
              walletDetails: response.data.data,
              isLoading: { ...get().isLoading, wallets: false },
              errors: { ...get().errors, wallets: null },
            });
            return { success: true, data: response.data.data };
          } else {
            throw new Error(
              response.data.message || "Failed to fetch wallet details"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch wallet details";
          set({
            isLoading: { ...get().isLoading, wallets: false },
            errors: { ...get().errors, wallets: errorMessage },
          });
          return { success: false, error: errorMessage };
        }
      },

      fetchLedgerTransactions: async (params = {}) => {
        try {
          const queryParams = new URLSearchParams();
          if (params.per_page) queryParams.append("per_page", params.per_page);
          if (params.page) queryParams.append("page", params.page);

          const response = await api.get(
            `/user/ledger/transactions?${queryParams.toString()}`
          );

          if (response.data.status === "success") {
            set({
              ledgerTransactions: response.data.data,
              pagination: {
                ...get().pagination,
                ledgerTransactions:
                  response.data.meta?.pagination ||
                  get().pagination.ledgerTransactions,
              },
            });
            return { success: true, data: response.data.data };
          } else {
            throw new Error(
              response.data.message || "Failed to fetch ledger transactions"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch ledger transactions";
          return { success: false, error: errorMessage };
        }
      },

      // Performance Analytics
      fetchPerformanceAnalytics: async () => {
        try {
          const response = await api.get("/user/analytics/performance");

          if (response.data.status === "success") {
            set({ performanceAnalytics: response.data.data });
            return { success: true, data: response.data.data };
          } else {
            throw new Error(
              response.data.message || "Failed to fetch performance analytics"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch performance analytics";
          return { success: false, error: errorMessage };
        }
      },

      // Reset store
      reset: () => {
        set({
          dashboardSummary: null,
          userProfile: null,
          networkTree: null,
          networkStats: null,
          networkMembers: [],
          earningsSummary: null,
          earningsHistory: [],
          earningsByType: null,
          walletDetails: [],
          ledgerTransactions: [],
          recentActivity: [],
          quickStats: null,
          performanceAnalytics: null,
          dashboardWidgets: null,
          isLoading: {
            summary: false,
            profile: false,
            network: false,
            earnings: false,
            wallets: false,
            activity: false,
            widgets: false,
          },
          errors: {
            summary: null,
            profile: null,
            network: null,
            earnings: null,
            wallets: null,
            activity: null,
            widgets: null,
          },
          pagination: {
            networkMembers: { page: 1, per_page: 20, total: 0, total_pages: 0 },
            earningsHistory: {
              page: 1,
              per_page: 20,
              total: 0,
              total_pages: 0,
            },
            ledgerTransactions: {
              page: 1,
              per_page: 20,
              total: 0,
              total_pages: 0,
            },
          },
        });
      },
    }),
    {
      name: "dashboard-storage",
      partialize: (state) => ({
        dashboardSummary: state.dashboardSummary,
        userProfile: state.userProfile,
        networkStats: state.networkStats,
        earningsSummary: state.earningsSummary,
        walletDetails: state.walletDetails,
        quickStats: state.quickStats,
        dashboardWidgets: state.dashboardWidgets,
      }),
    }
  )
);

// Export individual selectors for better performance
export const useDashboardSummary = () =>
  useDashboardStore((state) => state.dashboardSummary);
export const useUserProfile = () =>
  useDashboardStore((state) => state.userProfile);
export const useNetworkTree = () =>
  useDashboardStore((state) => state.networkTree);
export const useNetworkStats = () =>
  useDashboardStore((state) => state.networkStats);
export const useNetworkMembers = () =>
  useDashboardStore((state) => state.networkMembers);
export const useEarningsSummary = () =>
  useDashboardStore((state) => state.earningsSummary);
export const useEarningsHistory = () =>
  useDashboardStore((state) => state.earningsHistory);
export const useEarningsByType = () =>
  useDashboardStore((state) => state.earningsByType);
export const useWalletDetails = () =>
  useDashboardStore((state) => state.walletDetails);
export const useLedgerTransactions = () =>
  useDashboardStore((state) => state.ledgerTransactions);
export const useRecentActivity = () =>
  useDashboardStore((state) => state.recentActivity);
export const useQuickStats = () =>
  useDashboardStore((state) => state.quickStats);
export const usePerformanceAnalytics = () =>
  useDashboardStore((state) => state.performanceAnalytics);
export const useDashboardWidgets = () =>
  useDashboardStore((state) => state.dashboardWidgets);
export const useDashboardLoading = () =>
  useDashboardStore((state) => state.isLoading);
export const useDashboardErrors = () =>
  useDashboardStore((state) => state.errors);
export const useDashboardPagination = () =>
  useDashboardStore((state) => state.pagination);

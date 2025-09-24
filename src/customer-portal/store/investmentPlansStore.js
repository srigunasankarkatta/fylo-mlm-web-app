import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../../app/apiClient";

// Investment Plans Store for Customer Portal
export const useInvestmentPlansStore = create(
  persist(
    (set, get) => ({
      // State
      plans: [],
      userInvestments: [],
      selectedPlan: null,
      selectedInvestment: null,
      isLoading: false,
      error: null,
      pagination: {
        total: 0,
        count: 0,
        per_page: 20,
        current_page: 1,
        total_pages: 1,
      },

      // Actions
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      // Fetch all available investment plans
      fetchPlans: async (params = {}) => {
        set({ isLoading: true, error: null });
        try {
          const queryParams = new URLSearchParams();
          if (params.status) queryParams.append("status", params.status);
          if (params.min_amount)
            queryParams.append("min_amount", params.min_amount);
          if (params.max_amount)
            queryParams.append("max_amount", params.max_amount);
          if (params.per_page) queryParams.append("per_page", params.per_page);
          if (params.page) queryParams.append("page", params.page);

          const response = await api.get(
            `/investment-plans?${queryParams.toString()}`
          );

          if (response.data.status === "success") {
            set({
              plans: response.data.data,
              pagination: response.data.meta?.pagination || {
                total: response.data.data.length,
                count: response.data.data.length,
                per_page: 20,
                current_page: 1,
                total_pages: 1,
              },
              isLoading: false,
              error: null,
            });
            return { success: true, data: response.data.data };
          } else {
            set({
              error: "Failed to fetch investment plans",
              isLoading: false,
            });
            return {
              success: false,
              error: "Failed to fetch investment plans",
            };
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Failed to fetch investment plans";
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      // Fetch user's investments
      fetchUserInvestments: async (params = {}) => {
        set({ isLoading: true, error: null });
        try {
          const queryParams = new URLSearchParams();
          if (params.status) queryParams.append("status", params.status);
          if (params.per_page) queryParams.append("per_page", params.per_page);
          if (params.page) queryParams.append("page", params.page);

          const response = await api.get(
            `/user/investments?${queryParams.toString()}`
          );

          if (response.data.status === "success") {
            set({
              userInvestments: response.data.data,
              pagination: response.data.meta?.pagination || {
                total: response.data.data.length,
                count: response.data.data.length,
                per_page: 20,
                current_page: 1,
                total_pages: 1,
              },
              isLoading: false,
              error: null,
            });
            return { success: true, data: response.data.data };
          } else {
            set({
              error: "Failed to fetch user investments",
              isLoading: false,
            });
            return {
              success: false,
              error: "Failed to fetch user investments",
            };
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Failed to fetch user investments";
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      // Get investment plan by ID
      getPlanById: (planId) => {
        const { plans } = get();
        return plans.find((plan) => plan.id === planId);
      },

      // Get user investment by ID
      getInvestmentById: (investmentId) => {
        const { userInvestments } = get();
        return userInvestments.find(
          (investment) => investment.id === investmentId
        );
      },

      // Purchase investment plan
      purchaseInvestment: async (investmentData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post("/user/investments", investmentData);

          if (response.data.status === "success") {
            // Add the new investment to user investments
            const { userInvestments } = get();
            set({
              userInvestments: [response.data.data, ...userInvestments],
              isLoading: false,
              error: null,
            });
            return { success: true, data: response.data.data };
          } else {
            set({ error: "Failed to create investment", isLoading: false });
            return { success: false, error: "Failed to create investment" };
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Failed to create investment";
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      // Update investment
      updateInvestment: async (investmentId, updateData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.put(
            `/user/investments/${investmentId}`,
            updateData
          );

          if (response.data.status === "success") {
            // Update the investment in user investments
            const { userInvestments } = get();
            const updatedInvestments = userInvestments.map((investment) =>
              investment.id === investmentId ? response.data.data : investment
            );
            set({
              userInvestments: updatedInvestments,
              isLoading: false,
              error: null,
            });
            return { success: true, data: response.data.data };
          } else {
            set({ error: "Failed to update investment", isLoading: false });
            return { success: false, error: "Failed to update investment" };
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Failed to update investment";
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      // Cancel investment
      cancelInvestment: async (investmentId) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.delete(
            `/user/investments/${investmentId}`
          );

          if (response.data.status === "success") {
            // Remove the investment from user investments
            const { userInvestments } = get();
            const filteredInvestments = userInvestments.filter(
              (investment) => investment.id !== investmentId
            );
            set({
              userInvestments: filteredInvestments,
              isLoading: false,
              error: null,
            });
            return { success: true, data: response.data.data };
          } else {
            set({ error: "Failed to cancel investment", isLoading: false });
            return { success: false, error: "Failed to cancel investment" };
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Failed to cancel investment";
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      // Get investment statistics
      getInvestmentStats: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.get("/user/investments/stats");

          if (response.data.status === "success") {
            set({ isLoading: false, error: null });
            return { success: true, data: response.data.data };
          } else {
            set({
              error: "Failed to fetch investment statistics",
              isLoading: false,
            });
            return {
              success: false,
              error: "Failed to fetch investment statistics",
            };
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            "Failed to fetch investment statistics";
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      // Set selected plan
      setSelectedPlan: (plan) => set({ selectedPlan: plan }),

      // Set selected investment
      setSelectedInvestment: (investment) =>
        set({ selectedInvestment: investment }),

      // Clear selected plan
      clearSelectedPlan: () => set({ selectedPlan: null }),

      // Clear selected investment
      clearSelectedInvestment: () => set({ selectedInvestment: null }),

      // Reset store
      reset: () =>
        set({
          plans: [],
          userInvestments: [],
          selectedPlan: null,
          selectedInvestment: null,
          isLoading: false,
          error: null,
          pagination: {
            total: 0,
            count: 0,
            per_page: 20,
            current_page: 1,
            total_pages: 1,
          },
        }),

      // Helper functions
      getActivePlans: () => {
        const { plans } = get();
        return plans.filter((plan) => plan.is_active);
      },

      getPlansByAmount: (amount) => {
        const { plans } = get();
        return plans.filter(
          (plan) =>
            plan.is_active &&
            amount >= plan.min_amount &&
            amount <= plan.max_amount
        );
      },

      getTotalInvested: () => {
        const { userInvestments } = get();
        return userInvestments.reduce((total, investment) => {
          if (
            investment.status === "active" ||
            investment.status === "completed"
          ) {
            return total + parseFloat(investment.amount);
          }
          return total;
        }, 0);
      },

      getTotalEarnings: () => {
        const { userInvestments } = get();
        return userInvestments.reduce((total, investment) => {
          if (
            investment.status === "active" ||
            investment.status === "completed"
          ) {
            return total + parseFloat(investment.total_expected_return || 0);
          }
          return total;
        }, 0);
      },

      getActiveInvestments: () => {
        const { userInvestments } = get();
        return userInvestments.filter(
          (investment) => investment.status === "active"
        );
      },

      getCompletedInvestments: () => {
        const { userInvestments } = get();
        return userInvestments.filter(
          (investment) => investment.status === "completed"
        );
      },

      getPendingInvestments: () => {
        const { userInvestments } = get();
        return userInvestments.filter(
          (investment) => investment.status === "pending"
        );
      },
    }),
    {
      name: "customer-investment-plans-store",
      partialize: (state) => ({
        plans: state.plans,
        userInvestments: state.userInvestments,
        selectedPlan: state.selectedPlan,
        selectedInvestment: state.selectedInvestment,
      }),
    }
  )
);

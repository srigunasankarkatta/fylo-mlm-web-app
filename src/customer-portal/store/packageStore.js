import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../../app/apiClient";

// Package Store for Customer Portal
export const usePackageStore = create(
  persist(
    (set, get) => ({
      // State
      packages: [],
      userPackages: [],
      selectedPackage: null,
      selectedUserPackage: null,
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

      // Fetch all available packages
      fetchPackages: async (params = {}) => {
        set({ isLoading: true, error: null });
        try {
          const queryParams = new URLSearchParams();
          if (params.min_price)
            queryParams.append("min_price", params.min_price);
          if (params.max_price)
            queryParams.append("max_price", params.max_price);
          if (params.per_page) queryParams.append("per_page", params.per_page);

          const response = await api.get(`/packages?${queryParams.toString()}`);

          if (response.data.status === "success") {
            set({
              packages: response.data.data,
              pagination: response.data.meta.pagination,
              isLoading: false,
              error: null,
            });
            return { success: true, data: response.data.data };
          } else {
            throw new Error(
              response.data.message || "Failed to fetch packages"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch packages";
          set({
            packages: [],
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, error: errorMessage };
        }
      },

      // Fetch single package details
      fetchPackageById: async (packageId) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.get(`/packages/${packageId}`);

          if (response.data.status === "success") {
            set({
              selectedPackage: response.data.data,
              isLoading: false,
              error: null,
            });
            return { success: true, data: response.data.data };
          } else {
            throw new Error(response.data.message || "Package not found");
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch package";
          set({
            selectedPackage: null,
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, error: errorMessage };
        }
      },

      // Initiate package purchase
      initiatePurchase: async (purchaseData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post("/user/packages", purchaseData);

          if (response.data.status === "success") {
            set({ isLoading: false, error: null });
            return { success: true, data: response.data.data };
          } else {
            throw new Error(
              response.data.message || "Failed to initiate purchase"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to initiate purchase";
          set({
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, error: errorMessage };
        }
      },

      // Confirm package purchase
      confirmPurchase: async (confirmationData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post(
            "/user/packages/confirm",
            confirmationData
          );

          if (response.data.status === "success") {
            set({ isLoading: false, error: null });
            // Refresh user packages after successful confirmation
            get().fetchUserPackages();
            return { success: true, data: response.data.data };
          } else {
            throw new Error(
              response.data.message || "Failed to confirm purchase"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to confirm purchase";
          set({
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, error: errorMessage };
        }
      },

      // Fetch user's purchased packages
      fetchUserPackages: async (params = {}) => {
        set({ isLoading: true, error: null });
        try {
          const queryParams = new URLSearchParams();
          if (params.per_page) queryParams.append("per_page", params.per_page);

          const response = await api.get(
            `/user/packages?${queryParams.toString()}`
          );

          if (response.data.status === "success") {
            set({
              userPackages: response.data.data,
              pagination: response.data.meta.pagination,
              isLoading: false,
              error: null,
            });
            return { success: true, data: response.data.data };
          } else {
            throw new Error(
              response.data.message || "Failed to fetch user packages"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch user packages";
          set({
            userPackages: [],
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, error: errorMessage };
        }
      },

      // Fetch single user package details
      fetchUserPackageById: async (userPackageId) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.get(`/user/packages/${userPackageId}`);

          if (response.data.status === "success") {
            set({
              selectedUserPackage: response.data.data,
              isLoading: false,
              error: null,
            });
            return { success: true, data: response.data.data };
          } else {
            throw new Error(response.data.message || "User package not found");
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch user package";
          set({
            selectedUserPackage: null,
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, error: errorMessage };
        }
      },

      // Helper function to generate idempotency key
      generateIdempotencyKey: () => {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 15);
        return `purchase-${timestamp}-${random}`;
      },

      // Helper function to get package by ID from local state
      getPackageById: (packageId) => {
        const { packages } = get();
        return packages.find((pkg) => pkg.id === packageId);
      },

      // Helper function to get user package by ID from local state
      getUserPackageById: (userPackageId) => {
        const { userPackages } = get();
        return userPackages.find((userPkg) => userPkg.id === userPackageId);
      },

      // Reset store
      reset: () => {
        set({
          packages: [],
          userPackages: [],
          selectedPackage: null,
          selectedUserPackage: null,
          isLoading: false,
          error: null,
          pagination: {
            total: 0,
            count: 0,
            per_page: 20,
            current_page: 1,
            total_pages: 1,
          },
        });
      },
    }),
    {
      name: "package-storage",
      partialize: (state) => ({
        packages: state.packages,
        userPackages: state.userPackages,
        pagination: state.pagination,
      }),
    }
  )
);

// Export individual selectors for better performance
export const usePackages = () => usePackageStore((state) => state.packages);
export const useUserPackages = () =>
  usePackageStore((state) => state.userPackages);
export const useSelectedPackage = () =>
  usePackageStore((state) => state.selectedPackage);
export const useSelectedUserPackage = () =>
  usePackageStore((state) => state.selectedUserPackage);
export const usePackageLoading = () =>
  usePackageStore((state) => state.isLoading);
export const usePackageError = () => usePackageStore((state) => state.error);
export const usePackagePagination = () =>
  usePackageStore((state) => state.pagination);

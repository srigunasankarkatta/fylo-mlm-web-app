import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "./apiClient";

// Auth store
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post("/login", credentials);
          const data = response.data;

          if (data.status === "success") {
            set({
              user: data.data.user,
              accessToken: data.data.access_token,
              refreshToken: data.data.refresh_token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            return { success: true, data: data.data };
          } else {
            throw new Error(data.message || "Login failed");
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || error.message || "Login failed";
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, error: errorMessage };
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post("/register", userData);
          const data = response.data;

          if (data.status === "success") {
            set({
              user: data.data.user,
              accessToken: data.data.access_token,
              refreshToken: data.data.refresh_token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            return { success: true, data: data.data };
          } else {
            throw new Error(data.message || "Registration failed");
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Registration failed";
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, error: errorMessage };
        }
      },

      logout: async () => {
        const { accessToken } = get();

        try {
          // Call logout API if token exists
          if (accessToken) {
            await api.post("/logout");
          }
        } catch (error) {
          console.error("Logout API call failed:", error);
        } finally {
          // Clear all localStorage items
          localStorage.clear();

          // Clear local state regardless of API call result
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      refreshToken: async () => {
        const { refreshToken } = get();

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        try {
          const response = await api.post(
            "/refresh",
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          const data = response.data;

          if (data.status === "success") {
            set({
              accessToken: data.data.access_token,
              refreshToken: data.data.refresh_token,
              error: null,
            });

            return { success: true, data: data.data };
          } else {
            throw new Error(data.message || "Token refresh failed");
          }
        } catch (error) {
          // If refresh fails, logout user
          get().logout();
          throw error;
        }
      },

      getProfile: async () => {
        const { accessToken } = get();

        if (!accessToken) {
          throw new Error("No access token available");
        }

        try {
          const response = await api.get("/me");
          const data = response.data;

          if (data.status === "success") {
            set({
              user: data.data,
              error: null,
            });

            return { success: true, data: data.data };
          } else {
            throw new Error(data.message || "Failed to get profile");
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to get profile";
          set({ error: errorMessage });
          throw error;
        }
      },

      updateUser: (userData) => {
        set({ user: userData });
      },

      clearError: () => set({ error: null }),

      // Helper to get auth headers
      getAuthHeaders: () => {
        const { accessToken } = get();
        return {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        };
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// App settings store
export const useAppStore = create((set) => ({
  theme: "light",
  language: "en",
  isLoading: false,

  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  setLoading: (isLoading) => set({ isLoading }),
}));

// Customer portal store
export const useCustomerStore = create((set) => ({
  customers: [],
  selectedCustomer: null,

  setCustomers: (customers) => set({ customers }),
  setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),
  addCustomer: (customer) =>
    set((state) => ({
      customers: [...state.customers, customer],
    })),
  updateCustomer: (id, updates) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === id ? { ...customer, ...updates } : customer
      ),
    })),
  removeCustomer: (id) =>
    set((state) => ({
      customers: state.customers.filter((customer) => customer.id !== id),
    })),
}));

// Authority portal store
export const useAuthorityStore = create((set) => ({
  authorities: [],
  selectedAuthority: null,

  setAuthorities: (authorities) => set({ authorities }),
  setSelectedAuthority: (authority) => set({ selectedAuthority: authority }),
  addAuthority: (authority) =>
    set((state) => ({
      authorities: [...state.authorities, authority],
    })),
  updateAuthority: (id, updates) =>
    set((state) => ({
      authorities: state.authorities.map((authority) =>
        authority.id === id ? { ...authority, ...updates } : authority
      ),
    })),
  removeAuthority: (id) =>
    set((state) => ({
      authorities: state.authorities.filter((authority) => authority.id !== id),
    })),
}));

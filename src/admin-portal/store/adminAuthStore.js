import { create } from "zustand";
import { persist } from "zustand/middleware";
import { adminApi } from "../apiClient";

const useAdminAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      // Actions
      login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          const response = await adminApi.post("/admin/login", {
            email,
            password,
          });

          if (response.data.status === "success") {
            const { access_token, user } = response.data.data;

            set({
              user,
              token: access_token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            // Store token in localStorage for API requests
            localStorage.setItem("admin_token", access_token);
            console.log("Admin login successful, token stored:", access_token);
            console.log("Admin user data:", user);

            return response.data;
          } else {
            throw new Error(response.data.message || "Login failed");
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Login failed. Please check your credentials.";

          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
            user: null,
            token: null,
          });

          throw error;
        }
      },

      logout: () => {
        console.log("Logout function called");

        // Clear token from localStorage
        localStorage.removeItem("admin_token");
        console.log("Admin token cleared from localStorage");

        // Clear auth state
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
          isLoading: false,
        });
        console.log("Admin logout completed");
      },

      clearError: () => {
        set({ error: null });
      },

      // Initialize auth state from localStorage
      initializeAuth: () => {
        const token = localStorage.getItem("admin_token");
        if (token) {
          // You might want to validate the token here
          set({ token, isAuthenticated: true });
          console.log("Admin auth initialized with token:", token);
        } else {
          console.log("No admin token found in localStorage");
        }
      },

      // Update user profile
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      // Check if user has specific permission
      hasPermission: (permission) => {
        const { user } = get();
        return user?.permissions?.includes(permission) || false;
      },

      // Check if user has specific role
      hasRole: (role) => {
        const { user } = get();
        return user?.roles?.includes(role) || false;
      },

      // Check if user is super admin
      isSuperAdmin: () => {
        const { user } = get();
        return user?.role_hint === "super-admin" || false;
      },
    }),
    {
      name: "admin-auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export { useAdminAuthStore };

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Auth store
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (userData, token) => {
        set({
          user: userData,
          token: token,
          isAuthenticated: true,
        });
        localStorage.setItem("authToken", token);
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        localStorage.removeItem("authToken");
      },

      updateUser: (userData) => {
        set({ user: userData });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
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

import axios from "axios";

// Create axios instance for admin API
const adminApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to add admin auth token
adminApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
adminApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Clear all localStorage and redirect to login
      localStorage.clear();
      window.location.href = "/admin/login";
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error("Access forbidden: Insufficient permissions");
    }

    // Handle 500 Internal Server Error
    if (error.response?.status === 500) {
      console.error("Internal server error");
    }

    return Promise.reject(error);
  }
);

// API methods for admin
export const adminApi = {
  // GET request
  get: (url, config = {}) => adminApiClient.get(url, config),

  // POST request
  post: (url, data = {}, config = {}) => adminApiClient.post(url, data, config),

  // PUT request
  put: (url, data = {}, config = {}) => adminApiClient.put(url, data, config),

  // PATCH request
  patch: (url, data = {}, config = {}) =>
    adminApiClient.patch(url, data, config),

  // DELETE request
  delete: (url, config = {}) => adminApiClient.delete(url, config),
};

export default adminApiClient;

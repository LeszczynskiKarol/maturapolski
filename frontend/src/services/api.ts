// frontend/src/services/api.ts
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 second timeout for AI assessment
});

// Request interceptor - dodaje token do każdego request
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    // Debug logging
    console.log("API Request:", {
      url: config.url,
      token: token ? `Bearer ${token.substring(0, 10)}...` : "No token",
      authState: useAuthStore.getState().isAuthenticated,
    });

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - obsługuje błędy autoryzacji
api.interceptors.response.use(
  (response) => {
    // Debug logging dla sukcesu
    console.log("API Response success:", {
      url: response.config.url,
      status: response.status,
    });
    return response;
  },
  async (error) => {
    console.error("API Response error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.error || error.message,
    });

    // Jeśli otrzymamy 401, to znaczy że token jest nieprawidłowy
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;

      // Nie przekierowuj jeśli jesteśmy już na stronie logowania
      if (currentPath !== "/login" && currentPath !== "/register") {
        console.log(
          "401 Unauthorized - clearing auth and redirecting to login"
        );
        useAuthStore.getState().logout();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;

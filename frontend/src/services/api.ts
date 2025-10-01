// frontend/src/services/api.ts
import axios from "axios";
import { useAuthStore } from "../store/authStore";

console.log("=== ENV VARIABLES ===");
console.log("import.meta.env.VITE_API_URL:", import.meta.env.VITE_API_URL);
console.log("import.meta.env.MODE:", import.meta.env.MODE);
console.log("import.meta.env.DEV:", import.meta.env.DEV);
console.log("All env:", import.meta.env);
console.log("=====================");

const API_URL =
  import.meta.env.VITE_API_URL || "https://server-reactapp.ngrok.app/";
console.log("FINAL API_URL:", API_URL);

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

    const originalRequest = error.config;

    // Jeśli otrzymamy 401 i nie jest to retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Sprawdź czy to nie jest publiczny endpoint
      const publicEndpoints = [
        "/api/auth/login",
        "/api/auth/register",
        "/api/materials",
        "/api/materials/works",
        "/api/materials/epochs",
        "/api/materials/terms",
        "/api/materials/quotes",
      ];

      const isPublicEndpoint = publicEndpoints.some((endpoint) =>
        originalRequest.url?.includes(endpoint)
      );

      // Jeśli to publiczny endpoint, po prostu zwróć błąd
      if (isPublicEndpoint) {
        return Promise.reject(error);
      }

      // Spróbuj odświeżyć token
      const refreshToken = useAuthStore.getState().refreshToken;

      if (refreshToken && !originalRequest.url?.includes("/api/auth/refresh")) {
        try {
          console.log("Attempting to refresh token...");
          const response = await axios.post(`${API_URL}/api/auth/refresh`, {
            refreshToken,
          });

          const { token, refreshToken: newRefreshToken } = response.data;

          // Zaktualizuj tokeny w store
          useAuthStore.getState().setTokens({
            token,
            refreshToken: newRefreshToken,
          });

          console.log("Token refreshed successfully");

          // Powtórz oryginalne żądanie z nowym tokenem
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // Refresh się nie udał - wyloguj użytkownika
          const currentPath = window.location.pathname;
          if (currentPath !== "/login" && currentPath !== "/register") {
            console.log("Logging out due to failed refresh");
            useAuthStore.getState().logout();
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        }
      } else {
        // Nie mamy refresh tokena - wyloguj jeśli to nie strona logowania
        const currentPath = window.location.pathname;
        if (currentPath !== "/login" && currentPath !== "/register") {
          console.log("401 Unauthorized - no refresh token, logging out");
          useAuthStore.getState().logout();
          window.location.href = "/login";
        }
      }
    }

    // Dla innych błędów po prostu zwróć błąd
    return Promise.reject(error);
  }
);

export default api;

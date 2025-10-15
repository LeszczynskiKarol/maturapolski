// frontend/src/services/api.ts

import axios from "axios";
import { useAuthStore } from "../store/authStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://server-reactapp.ngrok.app",
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// ✅ Request interceptor - dodaj token do każdego żądania
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response interceptor - automatyczne odświeżanie tokenu
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Jeśli błąd 401 i to nie jest retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Jeśli już odświeżamy token, dodaj żądanie do kolejki
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = useAuthStore.getState().refreshToken;

      if (!refreshToken) {
        // Brak refresh tokenu - wyloguj
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        // Odśwież token
        const response = await axios.post(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:3001"
          }/api/auth/refresh`,
          { refreshToken }
        );

        const { token: newToken, refreshToken: newRefreshToken } =
          response.data;

        // Zapisz nowe tokeny
        useAuthStore.getState().setTokens({
          token: newToken,
          refreshToken: newRefreshToken,
        });

        // Przetwórz kolejkę oczekujących żądań
        processQueue(null, newToken);

        // Ponów oryginalne żądanie z nowym tokenem
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token jest nieprawidłowy - wyloguj
        processQueue(refreshError, null);
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

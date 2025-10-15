// frontend/src/hooks/useTokenRefresh.ts

import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { api } from "../services/api";
import { jwtDecode } from "jwt-decode";

export const useTokenRefresh = () => {
  const { token, refreshToken, setTokens, logout } = useAuthStore();

  useEffect(() => {
    if (!token || !refreshToken) return;

    try {
      const decoded: any = jwtDecode(token); // ✅ Użyj jwtDecode zamiast jwt_decode
      const expiresAt = decoded.exp * 1000;
      const now = Date.now();
      const timeUntilExpiry = expiresAt - now;

      // Odśwież token 5 minut przed wygaśnięciem
      const refreshTime = timeUntilExpiry - 5 * 60 * 1000;

      if (refreshTime > 0) {
        const timerId = setTimeout(async () => {
          try {
            const response = await api.post("/api/auth/refresh", {
              refreshToken,
            });

            setTokens({
              token: response.data.token,
              refreshToken: response.data.refreshToken,
            });
          } catch (error) {
            console.error("Failed to refresh token:", error);
            logout();
          }
        }, refreshTime);

        return () => clearTimeout(timerId);
      } else {
        // Token już wygasł - spróbuj od razu odświeżyć
        api
          .post("/api/auth/refresh", { refreshToken })
          .then((response) => {
            setTokens({
              token: response.data.token,
              refreshToken: response.data.refreshToken,
            });
          })
          .catch(() => logout());
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, [token, refreshToken, setTokens, logout]);
};

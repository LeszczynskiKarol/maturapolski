// frontend/src/store/authStore.ts

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  emailVerified?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  setUser: (user: User) => void;
  setTokens: (tokens: { token: string; refreshToken: string }) => void;
  setAuth: (data: { user: User; token: string; refreshToken: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,

      setUser: (user) => {
        console.log("Setting user:", user);
        set({ user, isAuthenticated: true });
      },

      setTokens: (tokens) => {
        console.log("Setting tokens:", tokens);
        set({
          token: tokens.token,
          refreshToken: tokens.refreshToken,
          isAuthenticated: true,
        });
      },

      // Nowa metoda - ustaw wszystko na raz
      setAuth: (data) => {
        console.log("Setting complete auth data:", data);
        set({
          user: data.user,
          token: data.token,
          refreshToken: data.refreshToken,
          isAuthenticated: true,
        });
      },

      logout: () => {
        console.log("Logging out...");
        // Najpierw wyczyść stan
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        });
        // Potem wyczyść localStorage
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        console.log("Rehydrated auth state:", state);
      },
    }
  )
);

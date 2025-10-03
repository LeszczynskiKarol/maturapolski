// frontend/src/store/themeStore.ts

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  effectiveTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
  applyTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "system",
      effectiveTheme: "light",

      setTheme: (theme: Theme) => {
        set({ theme });
        get().applyTheme(theme);
      },

      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === "light" ? "dark" : "light";
        get().setTheme(newTheme);
      },

      initializeTheme: () => {
        const theme = get().theme;
        get().applyTheme(theme);
      },

      applyTheme: (theme: Theme) => {
        let effectiveTheme: "light" | "dark";

        if (theme === "system") {
          effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";
        } else {
          effectiveTheme = theme;
        }

        // Dodaj/usuń klasę 'dark' z elementu html
        if (effectiveTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }

        set({ effectiveTheme });
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
      }),
      onRehydrateStorage: () => (state) => {
        // Po wczytaniu z localStorage, zastosuj temat
        state?.initializeTheme();
      },
    }
  )
);

// Nasłuchuj zmian preferencji systemowych
if (typeof window !== "undefined") {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const state = useThemeStore.getState();
      if (state.theme === "system") {
        state.applyTheme("system");
      }
    });
}

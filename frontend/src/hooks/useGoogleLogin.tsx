// frontend/src/hooks/useGoogleLogin.tsx

import { useCallback, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuthStore } from "../store/authStore";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleInitConfig) => void;
          renderButton: (
            parent: HTMLElement,
            options: GoogleButtonConfig
          ) => void;
          prompt: () => void;
        };
      };
    };
  }
}

interface GoogleInitConfig {
  client_id: string;
  callback: (response: GoogleCredentialResponse) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
}

interface GoogleButtonConfig {
  theme?: "outline" | "filled_blue" | "filled_black";
  size?: "large" | "medium" | "small";
  text?: "signin_with" | "signup_with" | "continue_with";
  shape?: "rectangular" | "pill" | "circle" | "square";
  logo_alignment?: "left" | "center";
  width?: number;
}

interface GoogleCredentialResponse {
  credential: string;
  select_by?: string;
}

export const useGoogleLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const isInitialized = useRef(false);
  const initAttempts = useRef(0);
  const resizeListenerRef = useRef<(() => void) | null>(null);
  const mountedRef = useRef(true);

  const handleGoogleResponse = useCallback(
    async (response: GoogleCredentialResponse) => {
      try {
        console.log("Google login success, sending to backend...");

        const result = await api.post("/api/auth/google", {
          credential: response.credential,
        });

        if (result.data.user && result.data.token) {
          setAuth({
            user: result.data.user,
            token: result.data.token,
            refreshToken: result.data.refreshToken || "",
          });

          toast.success("Zalogowano przez Google!");

          setTimeout(() => {
            if (result.data.user.role === "ADMIN") {
              navigate("/admin");
            } else {
              navigate("/dashboard");
            }
          }, 100);
        }
      } catch (error: any) {
        console.error("Google login error:", error);
        const errorMessage =
          error.response?.data?.message ||
          "Logowanie przez Google nie powiodło się";
        toast.error(errorMessage);
      }
    },
    [navigate, setAuth]
  );

  // Inicjalizacja Google Sign-In z retry logic
  useEffect(() => {
    mountedRef.current = true;

    const initializeGoogleSignIn = () => {
      if (!mountedRef.current) return;
      if (isInitialized.current) return;

      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

      if (!clientId) {
        console.error("VITE_GOOGLE_CLIENT_ID not configured");
        return;
      }

      if (window.google?.accounts?.id) {
        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          isInitialized.current = true;
          console.log("Google Sign-In initialized successfully");
        } catch (error) {
          console.error("Failed to initialize Google Sign-In:", error);
        }
      } else {
        // Retry with exponential backoff
        initAttempts.current++;
        if (initAttempts.current < 10) {
          const delay = Math.min(
            1000 * Math.pow(1.5, initAttempts.current),
            5000
          );
          console.log(
            `Google API not ready, retrying in ${delay}ms (attempt ${initAttempts.current})`
          );
          setTimeout(initializeGoogleSignIn, delay);
        } else {
          console.error(
            "Failed to load Google Sign-In after multiple attempts"
          );
        }
      }
    };

    // Start initialization
    initializeGoogleSignIn();

    return () => {
      mountedRef.current = false;
    };
  }, [handleGoogleResponse]);

  // Renderowanie przycisku z retry logic
  const renderGoogleButton = useCallback(
    (elementId: string, options?: GoogleButtonConfig) => {
      const getResponsiveWidth = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 640) return Math.min(screenWidth - 64, 320);
        if (screenWidth < 1024) return 380;
        return 400;
      };

      const defaultOptions: GoogleButtonConfig = {
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "rectangular",
        width: getResponsiveWidth(),
        ...options,
      };

      // Remove previous resize listener
      if (resizeListenerRef.current) {
        window.removeEventListener("resize", resizeListenerRef.current);
        resizeListenerRef.current = null;
      }

      let attempts = 0;
      const maxAttempts = 20;

      const tryRenderButton = () => {
        attempts++;
        const element = document.getElementById(elementId);

        if (!element) {
          if (attempts < maxAttempts) {
            setTimeout(tryRenderButton, 200);
          } else {
            console.error(
              `Element #${elementId} not found after ${maxAttempts} attempts`
            );
          }
          return;
        }

        if (!window.google?.accounts?.id || !isInitialized.current) {
          if (attempts < maxAttempts) {
            console.log(
              `Google API not ready, retrying... (attempt ${attempts}/${maxAttempts})`
            );
            setTimeout(tryRenderButton, 200);
          } else {
            console.error(
              "Google Sign-In not initialized after multiple attempts"
            );
          }
          return;
        }

        try {
          element.innerHTML = "";
          window.google.accounts.id.renderButton(element, defaultOptions);
          console.log(`Google button rendered successfully in #${elementId}`);

          // Setup resize handling
          let lastWidth = window.innerWidth;
          let resizeTimeout: number;

          const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = window.setTimeout(() => {
              const currentWidth = window.innerWidth;
              if (currentWidth !== lastWidth) {
                lastWidth = currentWidth;
                const el = document.getElementById(elementId);
                if (el && window.google && isInitialized.current) {
                  el.innerHTML = "";
                  window.google.accounts.id.renderButton(el, {
                    ...defaultOptions,
                    width: getResponsiveWidth(),
                  });
                }
              }
            }, 250);
          };

          window.addEventListener("resize", handleResize);
          resizeListenerRef.current = handleResize;
        } catch (error) {
          console.error("Failed to render Google button:", error);
        }
      };

      tryRenderButton();
    },
    []
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (resizeListenerRef.current) {
        window.removeEventListener("resize", resizeListenerRef.current);
        resizeListenerRef.current = null;
      }
    };
  }, []);

  return { renderGoogleButton, isInitialized: isInitialized.current };
};

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
  const resizeListenerRef = useRef<(() => void) | null>(null);

  const handleGoogleResponse = async (response: GoogleCredentialResponse) => {
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
  };

  useEffect(() => {
    if (isInitialized.current) return;

    const initializeGoogleSignIn = () => {
      if (!window.google) {
        console.error("Google Sign-In script not loaded");
        return;
      }

      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

      if (!clientId) {
        console.error("VITE_GOOGLE_CLIENT_ID not configured");
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      isInitialized.current = true;
    };

    if (window.google) {
      initializeGoogleSignIn();
    } else {
      window.addEventListener("load", initializeGoogleSignIn);
      return () => window.removeEventListener("load", initializeGoogleSignIn);
    }
  }, []);

  // Memoize renderGoogleButton to prevent recreation on every render
  const renderGoogleButton = useCallback(
    (elementId: string, options?: GoogleButtonConfig) => {
      const getResponsiveWidth = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth < 640) {
          return Math.min(screenWidth - 64, 320);
        }
        if (screenWidth < 1024) {
          return 380;
        }
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

      // Remove previous resize listener if exists
      if (resizeListenerRef.current) {
        window.removeEventListener("resize", resizeListenerRef.current);
        resizeListenerRef.current = null;
      }

      // Render button
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element && window.google && isInitialized.current) {
          element.innerHTML = ""; // Clear any existing content
          window.google.accounts.id.renderButton(element, defaultOptions);
        }
      }, 100);

      // Setup resize handling
      let lastWidth = window.innerWidth;
      let resizeTimeout: number;

      const handleResize = () => {
        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(() => {
          const currentWidth = window.innerWidth;

          // Only re-render if width changed (ignore height changes from mobile keyboard)
          if (currentWidth !== lastWidth) {
            lastWidth = currentWidth;

            const element = document.getElementById(elementId);
            if (element && window.google && isInitialized.current) {
              element.innerHTML = "";
              window.google.accounts.id.renderButton(element, {
                ...defaultOptions,
                width: getResponsiveWidth(),
              });
            }
          }
        }, 250);
      };

      window.addEventListener("resize", handleResize);
      resizeListenerRef.current = handleResize;
    },
    []
  ); // Empty deps - function is stable

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (resizeListenerRef.current) {
        window.removeEventListener("resize", resizeListenerRef.current);
      }
    };
  }, []);

  return { renderGoogleButton };
};

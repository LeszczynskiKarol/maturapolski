// frontend/src/hooks/useSessionExit.ts

import { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface UseSessionExitProps {
  isActive: boolean;
  onExit: () => Promise<void>;
  shouldBlock?: boolean;
}

/**
 * Hook obsługujący wyjście z aktywnej sesji
 * - Przechwytuje kliknięcia w linki i pokazuje dialog
 * - Obsługuje zamykanie karty/okna przeglądarki
 * - Działa z BrowserRouter (nie wymaga data router)
 */
export const useSessionExit = ({
  isActive,
  onExit,
  shouldBlock = true,
}: UseSessionExitProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isExitingRef = useRef(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null
  );
  const [isBlocked, setIsBlocked] = useState(false);

  // Obsługa zamykania karty/okna przeglądarki
  useEffect(() => {
    if (!isActive || !shouldBlock) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isActive, shouldBlock]);

  // Przechwytywanie kliknięć w linki <a> i <Link>
  useEffect(() => {
    if (!isActive || !shouldBlock || isExitingRef.current) return;

    const handleClick = (e: MouseEvent) => {
      // Sprawdź czy kliknięto w link
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");

      // Ignoruj zewnętrzne linki i akcje specjalne
      if (!href || href.startsWith("http") || href.startsWith("#")) return;

      // Sprawdź czy to nawigacja do innej strony
      const currentPath = location.pathname;
      const targetPath = href;

      if (targetPath !== currentPath) {
        console.log("=== NAVIGATION BLOCKED ===");
        console.log("From:", currentPath, "To:", targetPath);

        e.preventDefault();
        e.stopPropagation();

        setPendingNavigation(targetPath);
        setIsBlocked(true);
      }
    };

    // Dodaj listener z capture: true aby przechwycić przed React Router
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [isActive, shouldBlock, location.pathname]);

  // Funkcja do wykonania wyjścia
  const executeExit = useCallback(async () => {
    isExitingRef.current = true;
    try {
      await onExit();
    } finally {
      isExitingRef.current = false;
    }
  }, [onExit]);

  // Funkcja do potwierdzenia wyjścia i nawigacji
  const confirmAndExit = useCallback(
    async (destination?: string) => {
      console.log("=== CONFIRM EXIT ===");
      console.log("Destination:", destination || pendingNavigation);

      await executeExit();

      const target = destination || pendingNavigation;
      if (target) {
        setIsBlocked(false);
        setPendingNavigation(null);
        navigate(target);
      }
    },
    [executeExit, navigate, pendingNavigation]
  );

  // Funkcja do anulowania wyjścia
  const cancelExit = useCallback(() => {
    console.log("=== CANCEL EXIT ===");
    setIsBlocked(false);
    setPendingNavigation(null);
  }, []);

  return {
    isBlocked,
    nextLocation: pendingNavigation,
    confirmAndExit,
    cancelExit,
    pendingNavigation,
  };
};

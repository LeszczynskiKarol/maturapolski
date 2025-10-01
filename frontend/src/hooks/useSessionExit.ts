// frontend/src/hooks/useSessionExit.ts

import { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface UseSessionExitProps {
  isActive: boolean;
  onExit: () => Promise<void>;
  shouldBlock?: boolean;
}

// ✅ DODAJ TO NA GÓRZE - ścieżki bez potwierdzenia
const ALLOWED_PATHS = ["/subscription"];

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
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");

      if (!href || href.startsWith("http") || href.startsWith("#")) return;

      const currentPath = location.pathname;
      const targetPath = href;

      if (targetPath !== currentPath) {
        // ✅ DODAJ TO - sprawdź whitelist
        if (ALLOWED_PATHS.some((path) => targetPath.startsWith(path))) {
          console.log("=== NAVIGATION ALLOWED (whitelist) ===");
          console.log("To:", targetPath);
          // Nie blokuj - pozwól na normalną nawigację
          return;
        }

        console.log("=== NAVIGATION BLOCKED ===");
        console.log("From:", currentPath, "To:", targetPath);

        e.preventDefault();
        e.stopPropagation();

        setPendingNavigation(targetPath);
        setIsBlocked(true);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [isActive, shouldBlock, location.pathname]);

  const executeExit = useCallback(async () => {
    isExitingRef.current = true;
    try {
      await onExit();
    } finally {
      isExitingRef.current = false;
    }
  }, [onExit]);

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

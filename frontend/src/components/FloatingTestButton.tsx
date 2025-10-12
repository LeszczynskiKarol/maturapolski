// frontend/src/components/FloatingTestButton.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, X } from "lucide-react";
import { useAuthStore } from "../store/authStore";

interface FloatingTestButtonProps {
  hubSlug: string;
  hubTitle: string;
  hubType: string;
}

export function FloatingTestButton({
  hubSlug,
  hubTitle,
  hubType,
}: FloatingTestButtonProps) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;

  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Wyświetlaj tylko dla lektur i epok
  if (hubType !== "LITERARY_WORK" && hubType !== "EPOCH") {
    return null;
  }

  useEffect(() => {
    const dismissed = sessionStorage.getItem(`test-fab-dismissed-${hubSlug}`);
    if (dismissed) {
      setIsDismissed(true);
    }
  }, [hubSlug]);

  // Pokaż po przewinięciu 300px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-expand po 2 sekundach
  useEffect(() => {
    if (isVisible && !isDismissed) {
      const timer = setTimeout(() => {
        setIsExpanded(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isDismissed]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    sessionStorage.setItem(`test-fab-dismissed-${hubSlug}`, "true");
  };

  const handleClick = () => {
    navigate("/register");
  };

  if (isDismissed) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <div
        className={`relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 ${
          isExpanded ? "pr-6" : ""
        }`}
        onClick={handleClick}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Close button */}
        {isExpanded && (
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              isExpanded ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
            }`}
          >
            <p className="text-sm font-semibold text-white whitespace-nowrap">
              Test z {hubTitle}
            </p>
            <p className="text-xs text-blue-100 whitespace-nowrap">
              {isLoggedIn ? "Rozpocznij teraz" : "Zacznij za darmo"}
            </p>
          </div>
        </div>

        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
      </div>
    </div>
  );
}

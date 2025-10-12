// frontend/src/components/StickyTestCTA.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, X, Sparkles } from "lucide-react";
import { useAuthStore } from "../store/authStore";

interface StickyTestCTAProps {
  hubSlug: string;
  hubTitle: string;
  hubType: string;
}

export function StickyTestCTA({
  hubSlug,
  hubTitle,
  hubType,
}: StickyTestCTAProps) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;

  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Wyświetlaj tylko dla lektur i epok
  if (hubType !== "LITERARY_WORK" && hubType !== "EPOCH") {
    return null;
  }

  // Sprawdź czy użytkownik już zamknął banner w tej sesji
  useEffect(() => {
    const dismissed = sessionStorage.getItem(`test-cta-dismissed-${hubSlug}`);
    if (dismissed) {
      setIsDismissed(true);
    }
  }, [hubSlug]);

  // Pokaż po przewinięciu 200px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem(`test-cta-dismissed-${hubSlug}`, "true");
  };

  const handleClick = () => {
    navigate("/register");
  };

  if (isDismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-500 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative border-t border-gray-200 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left side - info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="hidden sm:flex w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg items-center justify-center flex-shrink-0">
                <Trophy className="w-5 h-5 text-white" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {hubTitle} - załóż konto i sprawdź się na teście
                </p>
                <p className="text-xs text-gray-600 hidden md:block">
                  Pytania maturalne + ocena wypracowań przez AI
                </p>
              </div>
            </div>

            {/* Right side - CTA */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleClick}
                className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all text-sm sm:text-base whitespace-nowrap flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {isLoggedIn ? "Rozwiąż test" : "Załóż konto"}
              </button>

              <button
                onClick={handleDismiss}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Zamknij"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

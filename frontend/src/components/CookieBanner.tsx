// frontend/src/components/CookieBanner.tsx

import React, { useState } from "react";
import { Cookie, Settings, Shield, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useCookieConsent } from "../hooks/useCookieConsent";
import { CookieSettings } from "./CookieSettings";

export const CookieBanner: React.FC = () => {
  const location = useLocation();
  const { acceptAll, acceptNecessary } = useCookieConsent();
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // NIE pokazuj banera w zalogowanej części aplikacji
  const protectedRoutes = [
    "/dashboard",
    "/learn",
    "/sessions",
    "/progress",
    "/subscription",
    "/exercises",
    "/exams",
    "/epoch-review",
    "/leaderboard",
  ];
  const isProtectedRoute = protectedRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    return null;
  }

  // NIE pokazuj banera na stronach legal
  const legalPages = ["/privacy", "/terms", "/cookies", "/rodo"];
  if (legalPages.includes(location.pathname)) {
    return null;
  }

  // USUNIĘTE: if (hasConsent) return null;

  // Modal z ustawieniami
  if (showSettings) {
    return (
      <CookieSettings
        onClose={() => {
          setShowSettings(false);
          setIsMinimized(true);
        }}
      />
    );
  }

  // Zminimalizowana wersja - ZAWSZE widoczna po akceptacji
  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="hidden lg:flex fixed bottom-4 left-4 z-[9999] items-center gap-2 
                   bg-blue-600 hover:bg-blue-700 text-white 
                   px-4 py-3 rounded-full shadow-2xl 
                   transition-all hover:scale-105"
        aria-label="Pokaż ustawienia cookies"
      >
        <Cookie className="w-4 h-4" />
      </button>
    );
  }

  // Pełny baner
  return (
    <div className="hidden lg:block fixed bottom-4 left-4 z-[9999] max-w-md">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden ring-1 ring-black/5">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ring-2 ring-white/30">
              <Cookie className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">
                Prywatność i Cookies
              </h3>
              <p className="text-blue-100 text-xs">
                Szanujemy Twoją prywatność
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsMinimized(true)}
            className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            aria-label="Minimalizuj"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 bg-white">
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Używamy plików cookies i podobnych technologii, aby zapewnić
            prawidłowe działanie strony, analizować ruch oraz personalizować
            treści i reklamy.
          </p>
          {/* Info box */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-800 font-medium mb-1">
                  Twoje dane są bezpieczne
                </p>
                <p className="text-xs text-gray-600">
                  Nigdy nie sprzedajemy Twoich danych osobowych. Przeczytaj
                  naszą{" "}
                  <a
                    href="/privacy"
                    className="text-blue-600 hover:text-blue-700 underline underline-offset-2 font-medium transition-colors"
                  >
                    Politykę Prywatności
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => {
                acceptAll();
                setIsMinimized(true);
              }}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Akceptuj wszystkie
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  acceptNecessary();
                  setIsMinimized(true); // ← DODAJ TO Z POWROTEM
                }}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Tylko niezbędne
              </button>

              <button
                onClick={() => setShowSettings(true)}
                className="flex-1 py-2.5 border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 text-gray-700 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Settings className="w-4 h-4" />
                Dostosuj
              </button>
            </div>
          </div>
          {/* Footer text */}
          <p className="text-xs text-gray-500 mt-4 text-center">
            Korzystając z witryny, zgadzasz się na{" "}
            <a
              href="/terms"
              className="text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors"
            >
              Regulamin
            </a>{" "}
            i{" "}
            <a
              href="/privacy"
              className="text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors"
            >
              Politykę Cookies
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

// frontend/src/components/CookieBanner.tsx

import React, { useState } from "react";
import { Cookie, Settings, Shield, ChevronDown } from "lucide-react";
import { useCookieConsent } from "../hooks/useCookieConsent";
import { CookieSettings } from "./CookieSettings";

export const CookieBanner: React.FC = () => {
  const { showBanner, acceptAll, acceptNecessary, hasConsent } =
    useCookieConsent();
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Nie pokazuj banera jeśli użytkownik już wyraził zgodę
  if (hasConsent) {
    return null;
  }

  // Nie pokazuj banera na mobile
  if (!showBanner) {
    return null;
  }

  // Modal z ustawieniami
  if (showSettings) {
    return <CookieSettings onClose={() => setShowSettings(false)} />;
  }

  // Zminimalizowana wersja (tylko desktop) - LIGHT THEME DEFAULT
  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="hidden lg:flex fixed bottom-4 left-4 z-50 items-center gap-2 
                   bg-blue-600 hover:bg-blue-700 text-white 
                   dark:bg-blue-700 dark:hover:bg-blue-800 
                   px-4 py-3 rounded-full shadow-lg 
                   dark:shadow-blue-900/30 transition-all hover:scale-105"
        aria-label="Pokaż ustawienia cookies"
      >
        <Cookie className="w-3 h-3" />
      </button>
    );
  }

  // Pełny baner (tylko desktop) - LIGHT THEME DEFAULT
  return (
    <div className="hidden lg:block fixed bottom-4 left-4 z-50 max-w-md">
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl 
                      border border-gray-200 dark:border-gray-700 
                      overflow-hidden transition-colors duration-200"
      >
        {/* Header - jasny gradient domyślnie */}
        <div
          className="bg-gradient-to-r from-blue-600 to-purple-600 
                        dark:from-blue-700 dark:to-purple-700 
                        px-6 py-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 bg-white/20 dark:bg-white/10 
                            backdrop-blur-sm rounded-full flex items-center 
                            justify-center ring-2 ring-white/30"
            >
              <Cookie className="w-3 h-3 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">
                Prywatność i Cookies
              </h3>
              <p className="text-blue-100 dark:text-blue-200 text-xs">
                Szanujemy Twoją prywatność
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsMinimized(true)}
            className="text-white/80 hover:text-white 
                       transition-colors p-1 rounded-lg
                       hover:bg-white/10"
            aria-label="Minimalizuj"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Content - jasne tło domyślnie */}
        <div className="p-6 bg-white dark:bg-gray-800">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
            Używamy plików cookies i podobnych technologii, aby zapewnić
            prawidłowe działanie strony, analizować ruch oraz personalizować
            treści i reklamy.
          </p>

          {/* Info box - jasne tło domyślnie */}
          <div
            className="bg-blue-50 dark:bg-blue-950/30 
                          border border-blue-100 dark:border-blue-900/50 
                          rounded-lg p-4 mb-4 transition-colors duration-200"
          >
            <div className="flex items-start gap-3">
              <Shield
                className="w-5 h-5 text-blue-600 dark:text-blue-400 
                                 flex-shrink-0 mt-0.5"
              />
              <div>
                <p
                  className="text-sm text-gray-800 dark:text-gray-300 
                              font-medium mb-1"
                >
                  Twoje dane są bezpieczne
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Nigdy nie sprzedajemy Twoich danych osobowych. Przeczytaj
                  naszą{" "}
                  <a
                    href="/privacy"
                    className="text-blue-600 dark:text-blue-400 
                               hover:text-blue-700 dark:hover:text-blue-300 
                               underline underline-offset-2 font-medium 
                               transition-colors"
                  >
                    Politykę Prywatności
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Buttons - jasne przyciski domyślnie */}
          <div className="space-y-2">
            <button
              onClick={acceptAll}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                         hover:from-blue-700 hover:to-purple-700 
                         dark:from-blue-600 dark:to-purple-600
                         dark:hover:from-blue-700 dark:hover:to-purple-700
                         text-white rounded-lg font-semibold 
                         transition-all hover:shadow-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         dark:focus:ring-blue-400 focus:ring-offset-2
                         dark:focus:ring-offset-gray-800"
            >
              Akceptuj wszystkie
            </button>

            <div className="flex gap-2">
              <button
                onClick={acceptNecessary}
                className="flex-1 py-2.5 
                           bg-gray-100 hover:bg-gray-200 
                           dark:bg-gray-700 dark:hover:bg-gray-600 
                           text-gray-700 dark:text-gray-300 
                           rounded-lg font-medium transition-colors text-sm
                           focus:outline-none focus:ring-2 focus:ring-gray-400 
                           dark:focus:ring-gray-500 focus:ring-offset-2
                           dark:focus:ring-offset-gray-800"
              >
                Tylko niezbędne
              </button>

              <button
                onClick={() => setShowSettings(true)}
                className="flex-1 py-2.5 
                           border-2 border-gray-300 hover:border-blue-600 
                           dark:border-gray-600 dark:hover:border-blue-400 
                           hover:bg-blue-50 dark:hover:bg-blue-950/20
                           text-gray-700 dark:text-gray-300 
                           rounded-lg font-medium transition-all
                           flex items-center justify-center gap-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           dark:focus:ring-blue-400 focus:ring-offset-2
                           dark:focus:ring-offset-gray-800"
              >
                <Settings className="w-4 h-4" />
                Dostosuj
              </button>
            </div>
          </div>

          {/* Footer text - jasny tekst domyślnie */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
            Korzystając z witryny, zgadzasz się na{" "}
            <a
              href="/terms"
              className="text-blue-600 dark:text-blue-400 
                         hover:text-blue-700 dark:hover:text-blue-300 
                         underline underline-offset-2 transition-colors"
            >
              Regulamin
            </a>{" "}
            i{" "}
            <a
              href="/privacy"
              className="text-blue-600 dark:text-blue-400 
                         hover:text-blue-700 dark:hover:text-blue-300 
                         underline underline-offset-2 transition-colors"
            >
              Politykę Cookies
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

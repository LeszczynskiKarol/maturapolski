// frontend/src/components/CookieSettings.tsx

import React, { useState, useEffect } from "react";
import {
  X,
  Shield,
  BarChart3,
  Target,
  Sparkles,
  Lock,
  User,
} from "lucide-react";
import { useCookieConsent, CookieConsent } from "../hooks/useCookieConsent";

interface CookieSettingsProps {
  onClose: () => void;
}

interface CookieCategory {
  id: keyof CookieConsent;
  title: string;
  description: string;
  icon: React.ReactNode;
  required: boolean;
  examples: string[];
}

const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: "security_storage",
    title: "Bezpieczeństwo",
    description:
      "Niezbędne do ochrony przed atakami i zapewnienia bezpiecznego logowania.",
    icon: <Shield className="w-5 h-5" />,
    required: true,
    examples: ["Tokeny sesji", "Ochrona CSRF", "Szyfrowanie danych"],
  },
  {
    id: "functionality_storage",
    title: "Funkcjonalność",
    description:
      "Umożliwiają podstawowe funkcje strony, takie jak nawigacja i zapamiętywanie preferencji.",
    icon: <Lock className="w-5 h-5" />,
    required: true,
    examples: [
      "Preferencje językowe",
      "Motyw (jasny/ciemny)",
      "Zapisane ustawienia",
    ],
  },
  {
    id: "analytics_storage",
    title: "Analityka",
    description:
      "Pomagają nam zrozumieć, jak korzystasz ze strony, abyśmy mogli ją ulepszać.",
    icon: <BarChart3 className="w-5 h-5" />,
    required: false,
    examples: [
      "Google Analytics",
      "Statystyki wizyt",
      "Czas spędzony na stronie",
    ],
  },
  {
    id: "ad_storage",
    title: "Reklamy",
    description:
      "Służą do wyświetlania odpowiednich reklam i mierzenia ich skuteczności.",
    icon: <Target className="w-5 h-5" />,
    required: false,
    examples: ["Google Ads", "Częstotliwość reklam", "Konwersje"],
  },
  {
    id: "ad_user_data",
    title: "Dane użytkownika (reklamy)",
    description: "Dane użytkownika wykorzystywane do celów reklamowych.",
    icon: <User className="w-5 h-5" />,
    required: false,
    examples: ["Dane demograficzne", "Zainteresowania", "Historia działań"],
  },
  {
    id: "ad_personalization",
    title: "Personalizacja reklam",
    description: "Pozwala na dostosowanie reklam do Twoich zainteresowań.",
    icon: <Sparkles className="w-5 h-5" />,
    required: false,
    examples: ["Spersonalizowane reklamy", "Remarketingu", "Targetowanie"],
  },
  {
    id: "personalization_storage",
    title: "Personalizacja treści",
    description: "Dostosowuje treści strony do Twoich preferencji i zachowań.",
    icon: <Sparkles className="w-5 h-5" />,
    required: false,
    examples: ["Rekomendacje", "Spersonalizowana zawartość", "Ulubione"],
  },
];

const DEFAULT_CONSENT: CookieConsent = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  functionality_storage: "granted",
  personalization_storage: "denied",
  security_storage: "granted",
};

export const CookieSettings: React.FC<CookieSettingsProps> = ({ onClose }) => {
  const { consent, updateConsent, acceptAll, acceptNecessary } =
    useCookieConsent();

  // Inicjalizuj tempConsent z aktualnego consent lub domyślnego
  const [tempConsent, setTempConsent] = useState<CookieConsent>(
    consent || DEFAULT_CONSENT
  );

  // WAŻNE: Aktualizuj tempConsent gdy consent się zmieni
  useEffect(() => {
    if (consent) {
      console.log("🔄 Updating tempConsent from context:", consent);
      setTempConsent(consent);
    }
  }, [consent]);

  const handleToggle = (id: keyof CookieConsent) => {
    setTempConsent((prev) => ({
      ...prev,
      [id]: prev[id] === "granted" ? "denied" : "granted",
    }));
  };

  const handleSave = () => {
    console.log("💾 Saving custom consent:", tempConsent);
    updateConsent(tempConsent);
    onClose();
  };

  const handleAcceptAll = () => {
    console.log("✅ Accept all from settings");
    acceptAll();
    onClose();
  };

  const handleNecessaryOnly = () => {
    console.log("⚠️ Accept necessary only from settings");
    acceptNecessary();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-xl">Ustawienia Cookies</h2>
            <p className="text-blue-100 text-sm mt-1">
              Dostosuj preferencje dotyczące plików cookies
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Zamknij"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Używamy różnych rodzajów plików cookies, aby zapewnić najlepsze
              doświadczenie na naszej stronie. Poniżej możesz wybrać, które
              kategorie chcesz zaakceptować.
            </p>
          </div>

          {/* Cookie Categories */}
          <div className="space-y-4">
            {COOKIE_CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {category.title}
                        </h3>
                        {category.required && (
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded">
                            Wymagane
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Toggle */}
                  <button
                    onClick={() =>
                      !category.required && handleToggle(category.id)
                    }
                    disabled={category.required}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      category.required
                        ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                        : tempConsent[category.id] === "granted"
                        ? "bg-blue-600"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                    aria-label={`Toggle ${category.title}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        tempConsent[category.id] === "granted"
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Examples */}
                <div className="ml-13 mt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                    Przykłady:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {category.examples.map((example, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Więcej informacji:</strong> Szczegółowe informacje o tym,
              jak wykorzystujemy pliki cookies, znajdziesz w naszej{" "}
              <a
                href="/privacy"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Polityce Prywatności
              </a>{" "}
              i{" "}
              <a
                href="/rodo"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                informacji o RODO
              </a>
              .
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAcceptAll}
              className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all"
            >
              Akceptuj wszystkie
            </button>

            <button
              onClick={handleNecessaryOnly}
              className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold transition-colors"
            >
              Tylko niezbędne
            </button>

            <button
              onClick={handleSave}
              className="flex-1 py-3 border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg font-semibold transition-colors"
            >
              Zapisz wybrane
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

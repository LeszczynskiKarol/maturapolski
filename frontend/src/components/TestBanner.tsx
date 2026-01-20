// frontend/src/components/TestBanner.tsx

import { Link } from "react-router-dom";
import { Trophy, ArrowRight, Zap, CheckCircle } from "lucide-react";
import { useAuthStore } from "../store/authStore";

interface TestBannerProps {
  hubSlug: string;
  hubTitle: string;
  hubType: string;
  variant?: "compact" | "full"; // compact dla PageViewer, full dla HubDetail
}

export function TestBanner({
  hubTitle,
  hubType,
  variant = "full",
}: TestBannerProps) {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;

  // Wyświetlaj tylko dla lektur i epok
  if (hubType !== "LITERARY_WORK" && hubType !== "EPOCH") {
    return null;
  }

  const typeLabel = hubType === "LITERARY_WORK" ? "lektury" : "epoki";

  // Compact variant - mniejszy, subtelny banner
  if (variant === "compact") {
    return (
      <div className="my-8 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">
                Sprawdź swoją wiedzę!
              </h3>
              <p className="text-sm text-gray-600">
                <strong>{hubTitle}</strong> - pytania maturalne i wypracowania
                oceniane przez AI
              </p>
            </div>
          </div>
          <Link
            to={`/register`}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 text-center"
          >
            <span>Załóż darmowe konto i rozwiąż test</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Full variant - pełny, bardziej przekonujący banner
  return (
    <div className="my-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
      {/* Dekoracyjny gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50 opacity-50"></div>

      <div className="relative z-10">
        <div className="flex items-start gap-6">
          <div className="hidden md:flex w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl items-center justify-center flex-shrink-0">
            <Trophy className="w-10 h-10 text-white" />
          </div>

          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">Test maturalny</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              {hubTitle} - sprawdź się na teście z lektury
            </h3>

            <p className="text-blue-100 mb-6 max-w-2xl">
              Profesjonalny quiz {typeLabel} według kryteriów CKE. Pytania
              zamknięte, otwarte i wypracowania oceniane przez AI w 30 sekund.
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Setki pytań maturalnych</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Wypracowania oceniane przez AI w 30 s</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>{isLoggedIn ? "Masz dostęp!" : "Tylko 39 zł/mies"}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={`/register`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Trophy className="w-5 h-5" />
                {isLoggedIn
                  ? "Wróć do panelu i rozpocznij test"
                  : "Załóż darmowe konto i rozpocznij test"}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

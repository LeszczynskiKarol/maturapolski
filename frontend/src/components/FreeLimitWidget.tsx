// frontend/src/components/FreeLimitWidget.tsx

import { useState, useEffect } from "react";
import { Clock, Zap, Lock, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface FreeLimitStatus {
  isPremium: boolean;
  canSolve: boolean;
  used: number;
  remaining: number;
  limit: number;
  allowedTypes: string[];
  resetAt: string;
  message?: string;
}

interface FreeLimitWidgetProps {
  onLimitExceeded?: () => void;
  compact?: boolean;
}

export function FreeLimitWidget({
  onLimitExceeded,
  compact = false,
}: FreeLimitWidgetProps) {
  const [status, setStatus] = useState<FreeLimitStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeToReset, setTimeToReset] = useState("");
  const navigate = useNavigate();

  // ✅ Pobierz token z authStore zamiast localStorage
  const { token, isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchStatus();
  }, [token]); // ✅ Reaguj na zmiany tokena

  useEffect(() => {
    if (!status?.resetAt) return;

    const updateTimer = () => {
      const now = new Date();
      const reset = new Date(status.resetAt);
      const diff = reset.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeToReset("Odśwież stronę");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (hours > 0) {
        setTimeToReset(`${hours}h ${minutes}m`);
      } else {
        setTimeToReset(`${minutes}m`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [status?.resetAt]);

  const fetchStatus = async () => {
    try {
      // ✅ Użyj tokena z authStore
      if (!token || !isAuthenticated) {
        console.log("No token or not authenticated, skipping free limit fetch");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/learning/free-limit-status", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Sprawdź Content-Type przed parsowaniem
      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        console.error(`Free limit API error: ${response.status}`);
        setLoading(false);
        return;
      }

      if (!contentType || !contentType.includes("application/json")) {
        console.error("Response is not JSON:", contentType);
        setLoading(false);
        return;
      }

      const text = await response.text();

      // Dodatkowe zabezpieczenie - sprawdź czy text nie jest pusty
      if (!text || text.trim() === "") {
        console.error("Empty response from free-limit-status");
        setLoading(false);
        return;
      }

      const data = JSON.parse(text);
      setStatus(data);

      if (!data.canSolve && onLimitExceeded) {
        onLimitExceeded();
      }
    } catch (error) {
      console.error("Failed to fetch free limit status:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse bg-gray-100 rounded-lg h-16"></div>;
  }

  // Premium user - nie pokazuj widgetu
  if (status?.isPremium) {
    return null;
  }

  // Brak statusu lub niezalogowany
  if (!status || !isAuthenticated) {
    return null;
  }

  const percentage = (status.used / status.limit) * 100;
  const isLow = status.remaining <= 2;
  const isExhausted = status.remaining === 0;

  // Kompaktowa wersja (do nagłówka sesji)
  if (compact) {
    return (
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
          isExhausted
            ? "bg-red-100 text-red-700"
            : isLow
              ? "bg-amber-100 text-amber-700"
              : "bg-blue-100 text-blue-700"
        }`}
      >
        {isExhausted ? (
          <Lock className="w-4 h-4" />
        ) : (
          <Zap className="w-4 h-4" />
        )}
        <span>
          {isExhausted
            ? "Limit wyczerpany"
            : `${status.remaining}/${status.limit} pytań`}
        </span>
      </div>
    );
  }

  // Pełna wersja (do dashboardu)
  return (
    <div
      className={`rounded-xl p-4 ${
        isExhausted
          ? "bg-gradient-to-r from-red-50 to-orange-50 border border-red-200"
          : isLow
            ? "bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200"
            : "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {isExhausted ? (
              <AlertTriangle className="w-5 h-5 text-red-500" />
            ) : (
              <Zap className="w-5 h-5 text-blue-500" />
            )}
            <h3 className="font-semibold text-gray-800">
              {isExhausted ? "Dzienny limit wyczerpany" : "Darmowy plan"}
            </h3>
          </div>

          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">
                Wykorzystane: {status.used}/{status.limit}
              </span>
              <span className="text-gray-500">
                Pozostało: {status.remaining}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  isExhausted
                    ? "bg-red-500"
                    : isLow
                      ? "bg-amber-500"
                      : "bg-blue-500"
                }`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Info o resecie */}
          <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
            <Clock className="w-4 h-4" />
            <span>Reset limitu za: {timeToReset}</span>
          </div>

          {/* Info o ograniczeniach */}
          <p className="text-sm text-gray-600 mb-3">
            {isExhausted
              ? "Wróć jutro lub wykup Premium, aby kontynuować naukę."
              : "Darmowy plan: tylko pytania zamknięte (jednokrotny i wielokrotny wybór)."}
          </p>

          {/* CTA */}
          <button
            onClick={() => navigate("/premium")}
            className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all ${
              isExhausted
                ? "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
                : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
            }`}
          >
            🚀 Odblokuj Premium - bez limitów!
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook do używania w innych komponentach
export function useFreeLimitStatus() {
  const [status, setStatus] = useState<FreeLimitStatus | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Pobierz token z authStore
  const { token, isAuthenticated } = useAuthStore();

  const fetchStatus = async () => {
    try {
      if (!token || !isAuthenticated) {
        setLoading(false);
        return;
      }

      const response = await fetch("/api/learning/free-limit-status", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const contentType = response.headers.get("content-type");

      if (!response.ok || !contentType?.includes("application/json")) {
        console.error("Free limit API error or invalid content type");
        setLoading(false);
        return;
      }

      const text = await response.text();

      if (!text || text.trim() === "") {
        console.error("Empty response from free-limit-status");
        setLoading(false);
        return;
      }

      const data = JSON.parse(text);
      setStatus(data);
    } catch (error) {
      console.error("Failed to fetch free limit status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [token]); // ✅ Reaguj na zmiany tokena

  return {
    status,
    loading,
    refetch: fetchStatus,
    isPremium: status?.isPremium ?? false,
    canSolve: status?.canSolve ?? false,
    remaining: status?.remaining ?? 0,
    limit: status?.limit ?? 5,
  };
}

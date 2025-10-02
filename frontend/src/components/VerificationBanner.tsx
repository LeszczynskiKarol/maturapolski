// frontend/src/components/VerificationBanner.tsx

import React, { useState } from "react";
import { Mail, X, Loader2 } from "lucide-react";
import { api } from "../services/api";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export const VerificationBanner: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [dismissed, setDismissed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Nie pokazuj jeśli email jest zweryfikowany lub banner został zamknięty
  if (user?.emailVerified || dismissed) {
    return null;
  }

  const handleResend = async () => {
    if (!user?.email) return;

    setLoading(true);
    try {
      await api.post("/api/auth/resend-verification", {
        email: user.email,
      });
      toast.success("Email weryfikacyjny został wysłany ponownie!");
    } catch (error: any) {
      console.error("Resend verification error:", error);
      toast.error(
        error.response?.data?.message ||
          "Nie udało się wysłać emaila. Spróbuj ponownie."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-yellow-50 border-b border-yellow-200">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Mail className="w-5 h-5 text-yellow-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800">
                Zweryfikuj swój adres email
              </p>
              <p className="text-xs text-yellow-700">
                Wysłaliśmy link weryfikacyjny na <strong>{user?.email}</strong>.
                Sprawdź swoją skrzynkę.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResend}
              disabled={loading}
              className="text-sm font-medium text-yellow-800 hover:text-yellow-900 underline disabled:opacity-50 flex items-center gap-1"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Wysyłanie...
                </>
              ) : (
                "Wyślij ponownie"
              )}
            </button>

            <button
              onClick={() => setDismissed(true)}
              className="text-yellow-600 hover:text-yellow-800 p-1"
              aria-label="Zamknij"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

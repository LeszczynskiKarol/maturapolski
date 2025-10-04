// frontend/src/features/auth/ResendVerificationPage.tsx

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import { Mail, Loader2, ArrowLeft, CheckCircle } from "lucide-react";

export const ResendVerificationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const emailFromUrl = searchParams.get("email") || "";
  const autoSend = searchParams.get("auto") === "true"; // nowy parametr

  const [email, setEmail] = useState(emailFromUrl);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const hasAutoSent = useRef(false);

  // Auto-wysyłanie gdy user przychodzi z logowania
  // Auto-wysyłanie gdy user przychodzi z logowania
  useEffect(() => {
    // ✅ ZMIEŃ TEN WARUNEK
    if (emailFromUrl && autoSend && !sent && !hasAutoSent.current) {
      hasAutoSent.current = true; // oznacz że wysłano
      handleResend();
    }
  }, [emailFromUrl, autoSend, sent]); // dodaj wszystkie dependencies

  const handleResend = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!email) {
      toast.error("Podaj adres email");
      return;
    }

    setLoading(true);

    try {
      await api.post("/api/auth/resend-verification", {
        email,
      });

      toast.success("Email wysłany!");
      setSent(true);

      setTimeout(() => {
        navigate(`/verify-email?email=${encodeURIComponent(email)}`);
      }, 1500);
    } catch (error: any) {
      console.error("Resend error:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Nie udało się wysłać emaila. Spróbuj ponownie.";

      toast.error(errorMessage);
      setSent(false);
      hasAutoSent.current = false; // ✅ zresetuj przy błędzie
    } finally {
      setLoading(false);
    }
  };

  // Jeśli wysłano - pokaż sukces
  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Email wysłany!</h2>
          <p className="text-gray-600 mb-6">
            Sprawdź swoją skrzynkę i wprowadź kod weryfikacyjny.
          </p>
          <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
          <p className="text-sm text-gray-500 mt-2">Przekierowywanie...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <Mail className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center mb-2">
          Wyślij email ponownie
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Podaj swój email, aby otrzymać nowy kod weryfikacyjny
        </p>

        <form onSubmit={handleResend} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Adres email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="jan@example.com"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Wysyłanie...
              </>
            ) : (
              "Wyślij kod weryfikacyjny"
            )}
          </button>
        </form>

        <Link
          to="/login"
          className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Wróć do logowania
        </Link>
      </div>
    </div>
  );
};

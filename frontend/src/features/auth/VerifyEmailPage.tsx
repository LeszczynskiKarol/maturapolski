// frontend/src/features/auth/VerifyEmailPage.tsx

import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../services/api";
import { useAuthStore } from "../../store/authStore";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

type VerificationStatus = "loading" | "success" | "error";

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [message, setMessage] = useState("");

  const token = searchParams.get("token");

  useEffect(() => {
    // ✅ Czekaj aż token będzie dostępny
    if (token) {
      verifyEmail();
    }
  }, [token]);

  const verifyEmail = async () => {
    try {
      const response = await api.post("/api/auth/verify-email", {
        token: token!,
      });

      // ✅ Jeśli backend zwrócił tokeny JWT - auto login
      if (response.data.token) {
        setAuth({
          user: response.data.user,
          token: response.data.token,
          refreshToken: response.data.refreshToken,
        });

        setStatus("success");
        setMessage("Email zweryfikowany! Logowanie...");

        // Przekieruj od razu
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        // Stary flow - bez auto-login
        setStatus("success");
        setMessage(response.data.message);
        toast.success("Email został zweryfikowany!");

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error: any) {
      console.error("Email verification error:", error);

      setStatus("error");
      setMessage(
        error.response?.data?.message ||
          "Weryfikacja nie powiodła się. Link może być nieprawidłowy lub wygasł."
      );
      toast.error("Weryfikacja nie powiodła się");
    }
  };

  // ✅ NIE renderuj niczego poza "loading" póki status === "loading"
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {status === "loading" && (
          <>
            <Loader2 className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold mb-2">Weryfikacja email...</h2>
            <p className="text-gray-600">Proszę czekać</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-green-600">
              Email zweryfikowany!
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                Twoje konto jest teraz aktywne. Za chwilę zostaniesz
                przekierowany do panelu.
              </p>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-red-600">
              Weryfikacja nieudana
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                Link weryfikacyjny może być nieprawidłowy lub wygasł. Możesz
                poprosić o nowy email weryfikacyjny.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate("/resend-verification")}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Wyślij ponownie email →
              </button>

              <button
                onClick={() => navigate("/login")}
                className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Wróć do logowania
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

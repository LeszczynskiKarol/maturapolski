// frontend/src/features/auth/LoginPage.tsx

import { ArrowRight, Loader, Lock, Mail } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { PublicLayout } from "../../components/PublicLayout";
import { useGoogleLogin } from "../../hooks/useGoogleLogin";
import { api } from "../../services/api";
import { useAuthStore } from "../../store/authStore";

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth, user } = useAuthStore();
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );

  // Google Login
  const { renderGoogleButton } = useGoogleLogin();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Renderuj przycisk Google z opóźnieniem dla pewności, że DOM jest gotowy
  useEffect(() => {
    // Daj czas na zamontowanie komponentu
    const timer = setTimeout(() => {
      renderGoogleButton("google-signin-button", {
        theme: "outline",
        size: "large",
        text: "signin_with",
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [renderGoogleButton]);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setVerificationError(null);
    try {
      const response = await api.post("/api/auth/login", data);

      if (response.data.user && response.data.token) {
        setAuth({
          user: response.data.user,
          token: response.data.token,
          refreshToken: response.data.refreshToken || "",
        });

        toast.success("Zalogowano pomyślnie!");

        setTimeout(() => {
          if (response.data.user.role === "ADMIN") {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        }, 100);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.response?.data?.error === "EMAIL_NOT_VERIFIED") {
        setVerificationError(data.email);
        return;
      }

      const errorMessage =
        error.response?.data?.message ||
        "Błąd logowania. Sprawdź email i hasło.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="w-full max-w-md">
          {verificationError && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-yellow-900 mb-1">
                    Email niepotwierdzony
                  </h3>
                  <p className="text-sm text-yellow-800 mb-2">
                    Musisz potwierdzić swój adres email przed zalogowaniem.
                  </p>
                  <Link
                    to={`/resend-verification?email=${encodeURIComponent(
                      verificationError
                    )}&auto=true`}
                    className="text-sm text-yellow-900 underline font-medium"
                  >
                    Wyślij ponownie email weryfikacyjny →
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-2">Zaloguj się</h2>
            <p className="text-gray-600 text-center mb-8">
              Kontynuuj naukę do matury
            </p>

            {/* Przycisk Google - responsywny kontener */}
            <div className="mb-6">
              <div
                id="google-signin-button"
                className="flex justify-center w-full min-h-[44px]"
              ></div>
            </div>

            {/* Separator */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">lub</span>
              </div>
            </div>

            {/* Formularz email/hasło */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    {...register("email", {
                      required: "Email jest wymagany",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Nieprawidłowy adres email",
                      },
                    })}
                    type="email"
                    className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="jan.kowalski@example.com"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Hasło</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    {...register("password", {
                      required: "Hasło jest wymagane",
                    })}
                    type="password"
                    className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:underline"
                >
                  Zapomniałeś hasła?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Logowanie...
                  </>
                ) : (
                  <>
                    Zaloguj się
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center mt-6 text-sm">
              Nie masz konta?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:underline font-medium"
              >
                Załóż konto
              </Link>
            </p>

            <p className="text-xs text-center text-gray-500 mt-4">
              Ta strona jest chroniona przez reCAPTCHA. Obowiązują{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Polityka prywatności
              </a>{" "}
              i{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Warunki korzystania
              </a>{" "}
              Google.
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

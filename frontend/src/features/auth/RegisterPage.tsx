// frontend/src/features/auth/RegisterPage.tsx

import { CheckCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { PublicLayout } from "../../components/PublicLayout";
import { useGoogleLogin } from "../../hooks/useGoogleLogin";
import { useRecaptcha } from "../../hooks/useRecaptcha";
import { api } from "../../services/api";
import { useAuthStore } from "../../store/authStore";

interface RegisterForm {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

export const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const navigate = useNavigate();
  const { isReady, executeRecaptcha } = useRecaptcha(RECAPTCHA_SITE_KEY);
  const user = useAuthStore((state) => state.user);

  // Google Login
  const { renderGoogleButton } = useGoogleLogin();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const password = watch("password");

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Renderuj przycisk Google - wywołaj tylko raz
  useEffect(() => {
    renderGoogleButton("google-signup-button", {
      theme: "outline",
      size: "large",
      text: "signup_with",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Pusta tablica - render tylko raz przy montowaniu

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, text: "", color: "" };

    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) score++;

    if (score <= 2)
      return { score, text: "Słabe", color: "text-red-500 bg-red-100" };
    if (score <= 3)
      return { score, text: "Średnie", color: "text-yellow-500 bg-yellow-100" };
    if (score <= 4)
      return { score, text: "Dobre", color: "text-blue-500 bg-blue-100" };
    return {
      score,
      text: "Bardzo dobre",
      color: "text-green-500 bg-green-100",
    };
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Hasła nie są identyczne");
      return;
    }

    if (passwordStrength.score < 3) {
      toast.error("Hasło jest zbyt słabe. Użyj mocniejszego hasła.");
      return;
    }

    setLoading(true);

    try {
      const recaptchaToken = await executeRecaptcha("register");

      await api.post("/api/auth/register", {
        email: data.email,
        username: data.username,
        password: data.password,
        recaptchaToken,
      });

      toast.success("Konto utworzone! Sprawdź swoją skrzynkę email.");
      navigate(`/check-email?email=${encodeURIComponent(data.email)}`);
    } catch (error: any) {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data?.message || "Błąd rejestracji. Spróbuj ponownie.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Załóż konto</h2>
            <p className="text-gray-600 mt-2">...i zdaj na 100%!</p>
          </div>

          {/* Przycisk Google - responsywny kontener */}
          <div className="mb-6">
            <div
              id="google-signup-button"
              className="flex justify-center w-full"
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

          {/* Formularz */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Twoje imię
              </label>
              <input
                {...register("username", {
                  required: "Nazwa użytkownika jest wymagana",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 znaki",
                  },
                  maxLength: {
                    value: 20,
                    message: "Maksimum 20 znaków",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_-]+$/,
                    message: "Tylko litery, cyfry, _ i -",
                  },
                })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Twoje imię"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                {...register("email", {
                  required: "Email jest wymagany",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Nieprawidłowy adres email",
                  },
                })}
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="jan@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Hasło */}
            <div>
              <label className="block text-sm font-medium mb-1">Hasło</label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Hasło jest wymagane",
                    minLength: {
                      value: 8,
                      message: "Hasło musi mieć minimum 8 znaków",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}

              {/* Wskaźnik siły hasła */}
              {password && password.length > 0 && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-full rounded-full transition-all ${
                          passwordStrength.score <= 2
                            ? "bg-red-500"
                            : passwordStrength.score <= 3
                            ? "bg-yellow-500"
                            : passwordStrength.score <= 4
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }`}
                        style={{
                          width: `${(passwordStrength.score / 5) * 100}%`,
                        }}
                      />
                    </div>
                    <span
                      className={`font-medium ${
                        passwordStrength.color.split(" ")[0]
                      }`}
                    >
                      {passwordStrength.text}
                    </span>
                  </div>
                  <ul className="mt-2 text-xs text-gray-600 space-y-1">
                    <li className="flex items-center gap-1">
                      {/[a-z]/.test(password) && /[A-Z]/.test(password) ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-gray-300" />
                      )}
                      Duże i małe litery
                    </li>
                    <li className="flex items-center gap-1">
                      {/\d/.test(password) ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-gray-300" />
                      )}
                      Przynajmniej jedna cyfra
                    </li>
                    <li className="flex items-center gap-1">
                      {password.length >= 8 ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-gray-300" />
                      )}
                      Minimum 8 znaków
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Potwierdzenie hasła */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Potwierdź hasło
              </label>
              <div className="relative">
                <input
                  {...register("confirmPassword", {
                    required: "Potwierdź hasło",
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Regulamin */}
            <div className="text-xs text-gray-600">
              Rejestrując się, akceptujesz{" "}
              <Link to="/terms" className="text-blue-600 hover:underline">
                Regulamin
              </Link>{" "}
              i{" "}
              <Link to="/privacy" className="text-blue-600 hover:underline">
                Politykę prywatności
              </Link>
            </div>

            {/* Przycisk rejestracji */}
            <button
              type="submit"
              disabled={loading || !isReady}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Tworzenie konta...
                </>
              ) : (
                "Załóż konto"
              )}
            </button>

            <p className="text-xs text-center text-gray-500 mt-6">
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
          </form>

          <p className="text-center mt-6 text-sm">
            Masz już konto?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Zaloguj się
            </Link>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

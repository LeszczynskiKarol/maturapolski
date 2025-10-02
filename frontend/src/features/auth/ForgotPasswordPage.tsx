// frontend/src/features/auth/ForgotPasswordPage.tsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { useRecaptcha } from "../../hooks/useRecaptcha";
import toast from "react-hot-toast";
import { Mail, Loader2, CheckCircle, ArrowLeft } from "lucide-react";

interface ForgotPasswordForm {
  email: string;
}

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

export const ForgotPasswordPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ForgotPasswordForm>();

  const { isReady, executeRecaptcha } = useRecaptcha(RECAPTCHA_SITE_KEY);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const email = watch("email");

  const onSubmit = async (data: ForgotPasswordForm) => {
    setLoading(true);

    try {
      // Wykonaj reCAPTCHA
      const recaptchaToken = await executeRecaptcha("password_reset");

      // Wyślij żądanie resetu hasła
      await api.post("/api/auth/request-password-reset", {
        email: data.email,
        recaptchaToken,
      });

      setSuccess(true);
      toast.success("Email z instrukcją został wysłany!");
    } catch (error: any) {
      console.error("Password reset request error:", error);

      // Zawsze pokazuj sukces dla bezpieczeństwa
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Sprawdź swoją skrzynkę!</h2>
          <p className="text-gray-600 mb-4">
            Jeśli konto o adresie <strong>{email}</strong> istnieje, wysłaliśmy
            instrukcję resetu hasła.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              Email może trafić do folderu spam. Link będzie ważny przez 1
              godzinę.
            </p>
          </div>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Wróć do logowania
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold">Zapomniałeś hasła?</h2>
          <p className="text-gray-600 mt-2">
            Wyślemy Ci link do zresetowania hasła
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Adres email
            </label>
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
              placeholder="jan.kowalski@example.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !isReady}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Wysyłanie...
              </>
            ) : (
              "Wyślij link resetujący"
            )}
          </button>

          <p className="text-xs text-center text-gray-500">
            Chronione przez reCAPTCHA
          </p>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Wróć do logowania
          </Link>
        </div>
      </div>
    </div>
  );
};

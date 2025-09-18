// frontend/src/features/auth/LoginPage.tsx

import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../services/api";
import { useAuthStore } from "../../store/authStore";
import { AuthLayout } from "../../components/AuthLayout";
import toast from "react-hot-toast";
import { Mail, Lock, ArrowRight } from "lucide-react";

export const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const setTokens = useAuthStore((state) => state.setTokens);

  // frontend/src/features/auth/LoginPage.tsx
  // Zmień funkcję onSubmit:

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post("/api/auth/login", data);
      setUser(response.data.user);
      setTokens({
        accessToken: response.data.token, // WAŻNE: backend zwraca 'token', nie 'accessToken'
        refreshToken: response.data.refreshToken,
      });
      toast.success("Zalogowano pomyślnie!");

      // DODAJ sprawdzanie roli:
      if (response.data.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Błąd logowania");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-2">Zaloguj się</h2>
          <p className="text-gray-600 text-center mb-8">
            Kontynuuj naukę do matury
          </p>

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
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Hasło</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  {...register("password", { required: "Hasło jest wymagane" })}
                  type="password"
                  className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Zapamiętaj mnie</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Zapomniałeś hasła?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2"
            >
              Zaloguj się
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">lub</span>
              </div>
            </div>

            <button className="mt-4 w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5"
              />
              Zaloguj przez Google
            </button>
          </div>

          <p className="text-center mt-6 text-sm">
            Nie masz konta?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Zarejestruj się za darmo
            </Link>
          </p>
        </div>

        {/* Demo credentials */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 font-medium mb-2">
            Dane testowe:
          </p>
          <p className="text-xs text-blue-700">
            Admin: admin@matura-polski.pl / Admin123!
          </p>
          <p className="text-xs text-blue-700">
            Student: student@example.com / Student123!
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

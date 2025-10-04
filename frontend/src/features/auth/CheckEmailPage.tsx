// frontend/src/features/auth/CheckEmailPage.tsx

import React from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";

export const CheckEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <Mail className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Sprawdź swoją skrzynkę!</h2>
        <p className="text-gray-600 mb-4">
          Wysłaliśmy 6-cyfrowy kod weryfikacyjny na adres:
        </p>
        <p className="font-medium text-gray-900 mb-6 break-all">{email}</p>

        <button
          onClick={() => navigate(`/verify-email?email=${email}`)}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2 mb-4"
        >
          Wprowadź kod weryfikacyjny
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            Skopiuj 6-cyfrowy kod z emaila i wklej go na następnej stronie.
          </p>
        </div>

        <p className="text-sm text-gray-500">
          Nie dostałeś emaila?{" "}
          <Link
            to={`/resend-verification?email=${email}`}
            className="text-blue-600 hover:underline"
          >
            Wyślij ponownie
          </Link>
        </p>

        <Link
          to="/login"
          className="block mt-6 text-sm text-gray-500 hover:text-gray-700"
        >
          Wróć do logowania
        </Link>
      </div>
    </div>
  );
};

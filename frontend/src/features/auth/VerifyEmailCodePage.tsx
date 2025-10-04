// frontend/src/features/auth/VerifyEmailCodePage.tsx

import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../services/api";
import { useAuthStore } from "../../store/authStore";
import { XCircle, Loader2, Mail } from "lucide-react";
import toast from "react-hot-toast";

export const VerifyEmailCodePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const email = searchParams.get("email") || "";
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-submit po wpisaniu 6 cyfr
  useEffect(() => {
    const fullCode = code.join("");
    if (fullCode.length === 6 && !isVerifying) {
      handleVerify(fullCode);
    }
  }, [code]);

  const handleVerify = async (verificationCode: string) => {
    setIsVerifying(true);
    setError("");

    try {
      const response = await api.post("/api/auth/verify-email", {
        token: verificationCode,
      });

      if (response.data.token) {
        setAuth({
          user: response.data.user,
          token: response.data.token,
          refreshToken: response.data.refreshToken,
        });

        toast.success("Email zweryfikowany! Witaj!");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      setError(
        error.response?.data?.message || "Nieprawidłowy kod weryfikacyjny"
      );
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      toast.error("Nieprawidłowy kod");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleChange = (index: number, value: string) => {
    // Tylko cyfry
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError("");

    // Przesuń focus do następnego pola
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");

    if (pastedData.length === 6) {
      const newCode = pastedData.split("");
      setCode(newCode);
      inputRefs.current[5]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <Mail className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Wpisz kod weryfikacyjny</h2>
          <p className="text-gray-600">Wysłaliśmy 6-cyfrowy kod na adres:</p>
          <p className="font-medium text-gray-900 mt-1">{email}</p>
        </div>

        {/* Pola na kod */}
        <div className="flex justify-center gap-2 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={isVerifying}
              className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                transition-all
                ${error ? "border-red-500" : "border-gray-300"}
                ${isVerifying ? "opacity-50 cursor-not-allowed" : ""}
              `}
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Loading */}
        {isVerifying && (
          <div className="text-center mb-4">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
            <p className="text-sm text-gray-600 mt-2">Weryfikacja...</p>
          </div>
        )}

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            💡 Możesz skopiować kod z emaila i wkleić go (Ctrl+V)
          </p>
        </div>

        {/* Wyślij ponownie */}
        <p className="text-center text-sm text-gray-600">
          Nie dostałeś kodu?{" "}
          <button
            onClick={() => navigate(`/resend-verification?email=${email}`)}
            className="text-blue-600 hover:underline font-medium"
            disabled={isVerifying}
          >
            Wyślij ponownie
          </button>
        </p>
      </div>
    </div>
  );
};

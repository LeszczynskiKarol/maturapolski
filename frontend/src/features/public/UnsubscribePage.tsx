// frontend/src/features/public/UnsubscribePage.tsx
//
// Ta strona jest REDIRECTEM na backend API.
// Użytkownik klika link w emailu np:
//   https://maturapolski.pl/wypisz-sie?token=abc123&category=all
// React Router łapie /wypisz-sie i przekierowuje na:
//   https://api.maturapolski.pl/api/email/unsubscribe?token=abc123&category=all
// 
// Backend zwraca pełną stronę HTML (nie wymaga auth).

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "https://api.maturapolski.pl";

export const UnsubscribePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const category = searchParams.get("category") || "all";
  const manage = searchParams.get("manage");

  useEffect(() => {
    if (!token) return;

    if (manage === "true") {
      // Przekieruj na stronę zarządzania preferencjami
      window.location.href = `${API_URL}/api/email/preferences?token=${token}`;
    } else {
      // Przekieruj na endpoint wypisania
      window.location.href = `${API_URL}/api/email/unsubscribe?token=${token}&category=${category}`;
    }
  }, [token, category, manage]);

  if (!token) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
        background: "#f5f5f5",
      }}>
        <div style={{
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
          textAlign: "center",
          maxWidth: "400px",
        }}>
          <p style={{ fontSize: "48px", marginBottom: "15px" }}>❌</p>
          <p style={{ fontSize: "16px", color: "#666" }}>
            Nieprawidłowy link do wypisania się. Sprawdź czy link w emailu nie został uszkodzony.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      fontFamily: "system-ui, sans-serif",
      background: "#f5f5f5",
    }}>
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
        textAlign: "center",
        maxWidth: "400px",
      }}>
        <p style={{ fontSize: "48px", marginBottom: "15px" }}>⏳</p>
        <p style={{ fontSize: "16px", color: "#666" }}>Przekierowywanie...</p>
      </div>
    </div>
  );
};


// ============================================================
// DODAJ ROUTE w React Router (np. w App.tsx lub routes config):
// ============================================================
//
// import { UnsubscribePage } from "./features/public/UnsubscribePage";
//
// <Route path="/wypisz-sie" element={<UnsubscribePage />} />
//
// Ten route musi być PUBLICZNY (bez ProtectedRoute wrapper).

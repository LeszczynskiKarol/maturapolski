// frontend/src/hooks/useRecaptcha.ts

import { useEffect, useState } from "react";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export const useRecaptcha = (siteKey: string) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Sprawdź czy skrypt już istnieje
    const existingScript = document.querySelector(
      `script[src*="recaptcha/api.js"]`
    );

    if (existingScript) {
      setIsReady(true);
      return;
    }

    // Dodaj skrypt Google reCAPTCHA
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setIsReady(true);
    };

    script.onerror = () => {
      console.error("Failed to load reCAPTCHA script");
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup nie jest konieczny, bo skrypt może być współdzielony
    };
  }, [siteKey]);

  const executeRecaptcha = async (action: string): Promise<string> => {
    if (!isReady || !window.grecaptcha) {
      throw new Error("reCAPTCHA not ready");
    }

    try {
      const token = await window.grecaptcha.execute(siteKey, { action });
      return token;
    } catch (error) {
      console.error("reCAPTCHA execution error:", error);
      throw error;
    }
  };

  return { isReady, executeRecaptcha };
};

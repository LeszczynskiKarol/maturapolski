// frontend/src/hooks/useCookieConsent.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

export type ConsentState = "granted" | "denied";

export interface CookieConsent {
  analytics_storage: ConsentState;
  ad_storage: ConsentState;
  ad_user_data: ConsentState;
  ad_personalization: ConsentState;
  functionality_storage: ConsentState;
  personalization_storage: ConsentState;
  security_storage: ConsentState;
}

const CONSENT_KEY = "cookie_consent";
const CONSENT_TIMESTAMP_KEY = "cookie_consent_timestamp";
const CONSENT_EXPIRY_DAYS = 365;

const DEFAULT_CONSENT: CookieConsent = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  functionality_storage: "granted",
  personalization_storage: "denied",
  security_storage: "granted",
};

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

interface CookieConsentContextType {
  consent: CookieConsent | null;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
  acceptAll: () => void;
  acceptNecessary: () => void;
  updateConsent: (updates: Partial<CookieConsent>) => void;
  resetConsent: () => void;
  hasConsent: boolean;
}

const CookieConsentContext = createContext<
  CookieConsentContextType | undefined
>(undefined);

export const CookieConsentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  const updateGoogleConsent = useCallback((newConsent: CookieConsent) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: newConsent.analytics_storage,
        ad_storage: newConsent.ad_storage,
        ad_user_data: newConsent.ad_user_data,
        ad_personalization: newConsent.ad_personalization,
        functionality_storage: newConsent.functionality_storage,
        personalization_storage: newConsent.personalization_storage,
        security_storage: newConsent.security_storage,
      });

      if (newConsent.analytics_storage === "granted") {
        window.gtag("event", "page_view");
      }
    }
  }, []);

  const initializeDefaultConsent = useCallback(() => {
    setConsent(DEFAULT_CONSENT);

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        functionality_storage: "granted",
        personalization_storage: "denied",
        security_storage: "granted",
        region: ["PL"],
        wait_for_update: 500,
      });
    }
  }, []);

  // Initialize consent on mount
  useEffect(() => {
    const savedConsent = localStorage.getItem(CONSENT_KEY);
    const timestamp = localStorage.getItem(CONSENT_TIMESTAMP_KEY);

    if (savedConsent && timestamp) {
      const consentAge = Date.now() - parseInt(timestamp);
      const daysOld = consentAge / (1000 * 60 * 60 * 24);

      if (daysOld < CONSENT_EXPIRY_DAYS) {
        const parsed = JSON.parse(savedConsent);
        setConsent(parsed);
        updateGoogleConsent(parsed);
        setShowBanner(false);
      } else {
        setShowBanner(true);
        initializeDefaultConsent();
      }
    } else {
      setShowBanner(true);
      initializeDefaultConsent();
    }
  }, [initializeDefaultConsent, updateGoogleConsent]);

  const saveConsent = useCallback(
    (newConsent: CookieConsent) => {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
      localStorage.setItem(CONSENT_TIMESTAMP_KEY, Date.now().toString());
      setConsent(newConsent);
      updateGoogleConsent(newConsent);
      setShowBanner(false);
    },
    [updateGoogleConsent]
  );

  const acceptAll = useCallback(() => {
    const allGranted: CookieConsent = {
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      functionality_storage: "granted",
      personalization_storage: "granted",
      security_storage: "granted",
    };
    saveConsent(allGranted);
  }, [saveConsent]);

  const acceptNecessary = useCallback(() => {
    const necessaryOnly: CookieConsent = {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      functionality_storage: "granted",
      personalization_storage: "denied",
      security_storage: "granted",
    };
    saveConsent(necessaryOnly);
  }, [saveConsent]);

  const updateConsent = useCallback(
    (updates: Partial<CookieConsent>) => {
      const newConsent = { ...DEFAULT_CONSENT, ...consent, ...updates };
      saveConsent(newConsent);
    },
    [consent, saveConsent]
  );

  const resetConsent = useCallback(() => {
    localStorage.removeItem(CONSENT_KEY);
    localStorage.removeItem(CONSENT_TIMESTAMP_KEY);
    setConsent(null);
    setShowBanner(true);
    initializeDefaultConsent();
  }, [initializeDefaultConsent]);

  const value = {
    consent,
    showBanner,
    setShowBanner,
    acceptAll,
    acceptNecessary,
    updateConsent,
    resetConsent,
    hasConsent: consent !== null && !showBanner,
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = (): CookieConsentContextType => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider"
    );
  }
  return context;
};

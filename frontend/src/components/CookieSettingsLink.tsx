// frontend/src/components/CookieSettingsLink.tsx

import React, { useState } from "react";
import { Cookie } from "lucide-react";
import { CookieSettings } from "./CookieSettings";

export const CookieSettingsLink: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowSettings(true)}
        className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5"
      >
        <Cookie className="w-4 h-4" />
        <span>Ustawienia cookies</span>
      </button>

      {showSettings && (
        <CookieSettings onClose={() => setShowSettings(false)} />
      )}
    </>
  );
};

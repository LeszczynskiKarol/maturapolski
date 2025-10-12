// frontend/src/components/StickyTestTab.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, ChevronRight } from "lucide-react";
import { useAuthStore } from "../store/authStore";

interface StickyTestTabProps {
  hubSlug: string;
  hubTitle: string;
  hubType: string;
}

export function StickyTestTab({ hubType }: StickyTestTabProps) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;

  const [isVisible, setIsVisible] = useState(false);

  // Wyświetlaj tylko dla lektur i epok
  if (hubType !== "LITERARY_WORK" && hubType !== "EPOCH") {
    return null;
  }

  // Pokaż po przewinięciu 400px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 transition-transform duration-500 ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="bg-gradient-to-l from-blue-600 to-purple-600 text-white rounded-l-xl shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105 group">
        <div className="flex items-center gap-2 px-4 py-6">
          <div className="flex flex-col items-start gap-1 min-w-0">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-bold whitespace-nowrap">Test</span>
            </div>
            <span className="text-xs text-blue-100 whitespace-nowrap">
              {isLoggedIn ? "Rozwiąż" : "Zacznij"}
            </span>
          </div>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </div>
      </div>
    </button>
  );
}

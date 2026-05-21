// frontend/src/components/MaturyOnlinePromo.tsx
//
// Kontekstowe linki do matury-online.pl — wpięte na końcu stron treści
// (PageViewer, HubDetailPage, HubTestLandingPage, GuideArticlePage).
//
// Cel: przekazać link-equity z maturapolski.pl (rankuje na top 5-10
// dla fraz lekturowych) do indeksowalnych stron tematycznych
// matury-online.pl — NIE do /auth/register (zablokowane w robots.txt).
//
// 3 linki na różne strony docelowe, zróżnicowane anchory zależne
// od kontekstu (artykuł / hub lektury / landing testu / poradnik).

import { ArrowRight, ExternalLink } from "lucide-react";
import React from "react";

interface MaturyOnlinePromoProps {
  context: "page" | "hub" | "test" | "guide";
  lekturaTitle?: string;
}

const MO = "https://www.matury-online.pl";

export const MaturyOnlinePromo: React.FC<MaturyOnlinePromoProps> = ({
  context,
  lekturaTitle,
}) => {
  const lekturaSuffix = lekturaTitle ? ` — ${lekturaTitle}` : "";

  const primaryAnchor = (() => {
    switch (context) {
      case "test":
        return lekturaTitle
          ? `Pełna matura z polskiego — nie tylko ${lekturaTitle}`
          : "Pełna matura z polskiego — wszystkie lektury i epoki";
      case "guide":
        return "Cała baza zadań maturalnych z polskiego";
      case "hub":
        return `Zadania maturalne z polskiego${lekturaSuffix}`;
      case "page":
      default:
        return `Sprawdź zadania maturalne z polskiego${lekturaSuffix}`;
    }
  })();

  const secondaryAnchor =
    context === "test"
      ? "Symulacja Egzaminu Live — polski, poziom podstawowy"
      : "Symulacja matury z polskiego — poziom podstawowy";

  const tertiaryAnchor = "Arkusze CKE z polskiego — 2002–2026 z odpowiedziami";

  return (
    <aside
      className="mt-10 rounded-2xl border border-blue-200 dark:border-blue-900/40 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-6 md:p-8"
      aria-label="Polecane zasoby — matury-online.pl"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          <ExternalLink className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Idź dalej z polskim — i pozostałymi przedmiotami
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Na <strong>matury-online.pl</strong> znajdziesz interaktywne
            zadania, symulacje egzaminu i ocenę wypracowań przez AI wg
            kryteriów CKE.
          </p>
        </div>
      </div>

      <ul className="space-y-2.5 mt-5">
        <li>
          <a
            href={`${MO}/polski?from=maturapolski`}
            className="group flex items-center gap-2 text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 font-medium underline decoration-blue-300 hover:decoration-blue-600 underline-offset-4 transition-colors"
          >
            {primaryAnchor}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </li>
        <li>
          <a
            href={`${MO}/egzamin/polski-podstawowy?from=maturapolski`}
            className="group flex items-center gap-2 text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 font-medium underline decoration-blue-300 hover:decoration-blue-600 underline-offset-4 transition-colors"
          >
            {secondaryAnchor}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </li>
        <li>
          <a
            href={`${MO}/arkusze?from=maturapolski`}
            className="group flex items-center gap-2 text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 font-medium underline decoration-blue-300 hover:decoration-blue-600 underline-offset-4 transition-colors"
          >
            {tertiaryAnchor}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </li>
      </ul>
    </aside>
  );
};

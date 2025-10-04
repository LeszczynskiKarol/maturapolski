// frontend/src/features/legal/CookiePolicyPage.tsx

import React from "react";
import { PublicLayout } from "../../components/PublicLayout";
import { Cookie, Shield, Eye, Target, BarChart3, Settings } from "lucide-react";

export const CookiePolicyPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Cookie className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold">Polityka Cookies</h1>
          </div>
          <p className="text-gray-600">
            Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL")}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Czym są pliki cookies?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Pliki cookies to małe pliki tekstowe zapisywane na Twoim
              urządzeniu (komputerze, tablecie, smartfonie) podczas odwiedzania
              stron internetowych. Umożliwiają one stronom zapamiętywanie
              informacji o Twojej wizycie, takich jak preferowany język czy inne
              ustawienia.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Używamy plików cookies, aby zapewnić prawidłowe działanie naszej
              strony, analizować ruch, personalizować treści oraz wyświetlać
              odpowiednie reklamy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Jakie rodzaje cookies używamy?
            </h2>

            <div className="space-y-6">
              {/* Niezbędne */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Niezbędne pliki cookies
                    </h3>
                    <p className="text-gray-700 mb-2">
                      <strong>Wymagane:</strong> Tak - nie można ich wyłączyć
                    </p>
                    <p className="text-gray-700 mb-3">
                      Te pliki cookies są niezbędne do prawidłowego działania
                      strony. Umożliwiają podstawowe funkcje, takie jak
                      bezpieczne logowanie, zapamiętywanie preferencji czy
                      ochrona przed atakami.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Przykłady:</strong> Sesja użytkownika,
                      zabezpieczenia CSRF, preferencje językowe, motyw
                      (jasny/ciemny)
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Okres przechowywania:</strong> Do zakończenia
                      sesji lub 12 miesięcy
                    </p>
                  </div>
                </div>
              </div>

              {/* Analityczne */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Pliki cookies analityczne
                    </h3>
                    <p className="text-gray-700 mb-2">
                      <strong>Wymagane:</strong> Nie - możesz je wyłączyć
                    </p>
                    <p className="text-gray-700 mb-3">
                      Pomagają nam zrozumieć, jak odwiedzający korzystają z
                      naszej strony. Zbieramy anonimowe informacje o liczbie
                      wizyt, źródłach ruchu, najpopularniejszych stronach i
                      czasie spędzonym na stronie.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Dostawcy:</strong> Google Analytics (GA4)
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Przykłady:</strong> _ga, _gid, _gat (Google
                      Analytics)
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Okres przechowywania:</strong> Do 2 lat
                    </p>
                  </div>
                </div>
              </div>

              {/* Reklamowe */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Pliki cookies reklamowe
                    </h3>
                    <p className="text-gray-700 mb-2">
                      <strong>Wymagane:</strong> Nie - możesz je wyłączyć
                    </p>
                    <p className="text-gray-700 mb-3">
                      Używane do wyświetlania odpowiednich reklam dla Ciebie na
                      naszej stronie i w sieci. Mogą być wykorzystywane do
                      budowania profilu Twoich zainteresowań oraz wyświetlania
                      spersonalizowanych reklam.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Dostawcy:</strong> Google Ads, Facebook Pixel
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Przykłady:</strong> _gcl_au, fr (Facebook), IDE
                      (Google)
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Okres przechowywania:</strong> Do 2 lat
                    </p>
                  </div>
                </div>
              </div>

              {/* Personalizacja */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Pliki cookies personalizacji
                    </h3>
                    <p className="text-gray-700 mb-2">
                      <strong>Wymagane:</strong> Nie - możesz je wyłączyć
                    </p>
                    <p className="text-gray-700 mb-3">
                      Pozwalają na personalizację treści i funkcji strony na
                      podstawie Twoich preferencji i zachowań. Mogą być używane
                      do zapamiętywania Twoich wyborów i dostosowywania
                      doświadczenia użytkownika.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Przykłady:</strong> Rekomendowane zadania,
                      ulubione epoki, spersonalizowany plan nauki
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Okres przechowywania:</strong> Do 12 miesięcy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Jak zarządzać cookies?</h2>
            <div className="bg-blue-50 rounded-xl p-6 mb-4">
              <div className="flex items-start gap-4">
                <Settings className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 mb-3">
                    Możesz w każdej chwili zmienić swoje preferencje dotyczące
                    plików cookies, klikając przycisk poniżej lub w stopce
                    strony.
                  </p>
                  <button
                    onClick={() => {
                      // To będzie działać bo CookieSettingsLink jest globalny
                      const event = new CustomEvent("openCookieSettings");
                      window.dispatchEvent(event);
                    }}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Zarządzaj ustawieniami cookies
                  </button>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              Możesz również zarządzać cookies w ustawieniach swojej
              przeglądarki:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/pl/kb/wzmocniona-ochrona-przed-sledzeniem-firefox-desktop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/pl-pl/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Safari
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/pl-pl/microsoft-edge/usuwanie-plik%C3%B3w-cookie-w-przegl%C4%85darce-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>
            <p className="text-gray-600 text-sm mt-4">
              Uwaga: Wyłączenie niektórych plików cookies może wpłynąć na
              funkcjonalność strony.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Cookies stron trzecich</h2>
            <p className="text-gray-700 mb-4">
              Niektóre pliki cookies na naszej stronie są ustawiane przez strony
              trzecie, takie jak:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                <strong>Google Analytics:</strong> Do analizy ruchu i zachowań
                użytkowników (
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Polityka prywatności Google
                </a>
                )
              </li>
              <li>
                <strong>Google Ads:</strong> Do wyświetlania spersonalizowanych
                reklam (
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Informacje o reklamach Google
                </a>
                )
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Google Consent Mode v2</h2>
            <p className="text-gray-700 mb-4">
              Nasza strona wykorzystuje <strong>Google Consent Mode v2</strong>{" "}
              - zaawansowany mechanizm zarządzania zgodami, który zapewnia:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Respektowanie Twoich wyborów dotyczących cookies</li>
              <li>Ograniczenie zbierania danych jeśli nie wyrazisz zgody</li>
              <li>
                Możliwość analizy zachowań użytkowników z poszanowaniem
                prywatności
              </li>
              <li>
                Zgodność z RODO i innymi regulacjami dotyczącymi prywatności
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Twoje prawa</h2>
            <p className="text-gray-700 mb-4">Zgodnie z RODO masz prawo do:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                Wycofania zgody na przetwarzanie danych w dowolnym momencie
              </li>
              <li>Dostępu do swoich danych osobowych</li>
              <li>Sprostowania nieprawidłowych danych</li>
              <li>Usunięcia danych (prawo do bycia zapomnianym)</li>
              <li>Ograniczenia przetwarzania danych</li>
              <li>Przenoszenia danych</li>
              <li>Wniesienia sprzeciwu wobec przetwarzania</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
            <p className="text-gray-700 mb-4">
              Jeśli masz pytania dotyczące naszej polityki cookies, skontaktuj
              się z nami:
            </p>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700">
                <strong>Email:</strong> kontakt@maturapolski.pl
                <br />
                <strong>Adres:</strong> [Twój adres firmy]
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Zmiany w polityce</h2>
            <p className="text-gray-700">
              Możemy okresowo aktualizować naszą politykę cookies. O wszelkich
              istotnych zmianach poinformujemy Cię poprzez widoczne
              powiadomienie na naszej stronie lub email.
            </p>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
};

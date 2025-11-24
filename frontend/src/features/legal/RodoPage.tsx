// frontend/src/features/legal/RodoPage.tsx

import React from "react";
import { PublicLayout } from "../../components/PublicLayout";
import { Shield, Lock, Eye, FileText, Mail, AlertCircle } from "lucide-react";

export const RodoPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold">
              Informacja o przetwarzaniu danych osobowych (RODO)
            </h1>
          </div>
          <p className="text-gray-600">
            Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL")}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <p className="text-gray-700">
                Zgodnie z art. 13 i 14 Rozporządzenia Parlamentu Europejskiego i
                Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO),
                informujemy o zasadach przetwarzania Twoich danych osobowych.
              </p>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              1. Administrator danych osobowych
            </h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-2">
                <strong>Administratorem Twoich danych osobowych jest:</strong>
              </p>
              <p className="text-gray-700">
                eCopywriting.pl Karol Leszczyński
                <br />
                86-221 Papowo Biskupie 119/18
                <br />
                NIP: 9562203948
                <br />
                Email: kontakt@maturapolski.pl
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              2. Cel i podstawa prawna przetwarzania danych
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">
                  Rejestracja i świadczenie usług
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Cel:</strong> Utworzenie konta, świadczenie usług
                  edukacyjnych, komunikacja
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Podstawa prawna:</strong> Wykonanie umowy (art. 6 ust.
                  1 lit. b RODO)
                </p>
                <p className="text-gray-700">
                  <strong>Dane:</strong> Email, imię (username), hasło
                  (zaszyfrowane), postępy w nauce, wypracowania, wyniki testów
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">
                  Marketing i newsletter
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Cel:</strong> Wysyłka informacji o nowych funkcjach,
                  promocjach, materiałach
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Podstawa prawna:</strong> Zgoda (art. 6 ust. 1 lit. a
                  RODO)
                </p>
                <p className="text-gray-700">
                  <strong>Dane:</strong> Email, imię
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">
                  Analityka i usprawnienia
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Cel:</strong> Analiza korzystania z serwisu,
                  usprawnienie funkcjonalności
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Podstawa prawna:</strong> Prawnie uzasadniony interes
                  (art. 6 ust. 1 lit. f RODO)
                </p>
                <p className="text-gray-700">
                  <strong>Dane:</strong> Dane analityczne (cookies), adres IP,
                  dane techniczne urządzenia
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Płatności</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Cel:</strong> Realizacja płatności za subskrypcję
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Podstawa prawna:</strong> Wykonanie umowy (art. 6 ust.
                  1 lit. b RODO)
                </p>
                <p className="text-gray-700">
                  <strong>Dane:</strong> Dane płatnicze (obsługiwane przez
                  Stripe - nie przechowujemy danych kart płatniczych)
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Odbiorcy danych</h2>
            <p className="text-gray-700 mb-4">
              Twoje dane mogą być przekazywane następującym podmiotom:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                <strong>Stripe:</strong> Procesor płatności (zgodny z PCI DSS)
              </li>
              <li>
                <strong>Google (Google Analytics, Google Ads):</strong>{" "}
                Analityka i reklamy
              </li>
              <li>
                <strong>Anthropic:</strong> Ocena wypracowań przez AI (dane
                anonimizowane)
              </li>
              <li>
                <strong>AWS/DigitalOcean:</strong> Hosting serwera
              </li>
              <li>
                <strong>Dostawcy usług IT:</strong> Wsparcie techniczne i
                utrzymanie
              </li>
            </ul>
            <p className="text-gray-600 text-sm mt-4">
              Wszyscy odbiorcy są zobowiązani do zachowania poufności i
              przetwarzają dane zgodnie z RODO.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              4. Przekazywanie danych poza EOG
            </h2>
            <p className="text-gray-700 mb-4">
              Niektóre dane mogą być przekazywane do państw poza Europejskim
              Obszarem Gospodarczym:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                <strong>USA (Google, Anthropic, Stripe):</strong> Na podstawie
                odpowiednich zabezpieczeń (Standard Contractual Clauses,
                certyfikacje zgodności)
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              5. Okres przechowywania danych
            </h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>Dane konta:</strong> Do czasu usunięcia konta lub
                  wycofania zgody
                </li>
                <li>
                  <strong>Dane rozliczeniowe:</strong> 5 lat (wymogi księgowe)
                </li>
                <li>
                  <strong>Cookies analityczne:</strong> Do 2 lat lub wycofania
                  zgody
                </li>
                <li>
                  <strong>Logi systemowe:</strong> Do 90 dni
                </li>
                <li>
                  <strong>Backupy:</strong> Do 30 dni (automatyczne usuwanie)
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Twoje prawa</h2>
            <p className="text-gray-700 mb-4">
              Zgodnie z RODO przysługują Ci następujące prawa:
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                <Eye className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">
                    Prawo dostępu (art. 15 RODO)
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Możesz uzyskać kopię swoich danych osobowych oraz informacje
                    o przetwarzaniu
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">
                    Prawo do sprostowania (art. 16 RODO)
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Możesz poprosić o poprawienie nieprawidłowych lub
                    niekompletnych danych
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">
                    Prawo do usunięcia (art. 17 RODO)
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Możesz żądać usunięcia swoich danych w określonych
                    przypadkach
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">
                    Prawo do ograniczenia przetwarzania (art. 18 RODO)
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Możesz żądać ograniczenia przetwarzania w określonych
                    sytuacjach
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">
                    Prawo do przenoszenia danych (art. 20 RODO)
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Możesz otrzymać swoje dane w ustrukturyzowanym formacie
                    (JSON)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">
                    Prawo do sprzeciwu (art. 21 RODO)
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Możesz wnieść sprzeciw wobec przetwarzania danych w celach
                    marketingowych
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">
                    Prawo do wycofania zgody
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Możesz w każdej chwili wycofać zgodę na przetwarzanie danych
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              7. Jak skorzystać z praw?
            </h2>
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 mb-3">
                    Aby skorzystać z powyższych praw, skontaktuj się z nami:
                  </p>
                  <p className="text-gray-700">
                    <strong>Email:</strong> kontakt@maturapolski.pl
                    <br />
                    <strong>W temacie wpisz:</strong> "RODO - [Twoje żądanie]"
                  </p>
                  <p className="text-gray-600 text-sm mt-3">
                    Odpowiemy w ciągu <strong>30 dni</strong> od otrzymania
                    żądania.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Prawo do skargi</h2>
            <p className="text-gray-700 mb-4">
              Masz prawo wnieść skargę do organu nadzorczego:
            </p>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700">
                <strong>Urząd Ochrony Danych Osobowych (UODO)</strong>
                <br />
                ul. Stawki 2, 00-193 Warszawa
                <br />
                Email: kancelaria@uodo.gov.pl
                <br />
                Tel.: 22 531 03 00
                <br />
                <a
                  href="https://uodo.gov.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  uodo.gov.pl
                </a>
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              9. Bezpieczeństwo danych
            </h2>
            <p className="text-gray-700 mb-4">
              Stosujemy odpowiednie środki techniczne i organizacyjne
              zapewniające bezpieczeństwo danych:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Szyfrowanie połączeń (SSL/TLS)</li>
              <li>Szyfrowanie haseł (bcrypt)</li>
              <li>
                Bezpieczne przechowywanie danych (bazy danych z ograniczonym
                dostępem)
              </li>
              <li>Regularne kopie zapasowe</li>
              <li>Monitoring i logi dostępu</li>
              <li>Ochrona przed atakami (firewall, DDoS protection)</li>
              <li>Regularne aktualizacje zabezpieczeń</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              10. Zautomatyzowane podejmowanie decyzji
            </h2>
            <p className="text-gray-700">
              Używamy AI do oceny wypracowań, ale ostateczna decyzja (np. o
              wynikach egzaminu) zawsze należy do Ciebie i nauczyciela. Nie
              podejmujemy w pełni zautomatyzowanych decyzji wywołujących skutki
              prawne.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Zmiany w polityce</h2>
            <p className="text-gray-700">
              O istotnych zmianach w zasadach przetwarzania danych poinformujemy
              Cię przez email lub widoczne powiadomienie na stronie.
            </p>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
};

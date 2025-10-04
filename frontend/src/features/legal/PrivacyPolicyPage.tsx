// frontend/src/features/legal/PrivacyPolicyPage.tsx

import React from "react";
import { PublicLayout } from "../../components/PublicLayout";
import { Shield, Eye, Lock, Database, Mail, UserCheck } from "lucide-react";

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold">Polityka Prywatności</h1>
          </div>
          <p className="text-gray-600">
            Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL")}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <p className="text-gray-700">
                Twoja prywatność jest dla nas najważniejsza. Niniejsza Polityka
                Prywatności wyjaśnia, jakie dane zbieramy, jak je wykorzystujemy
                i jakie masz prawa w związku z przetwarzaniem Twoich danych
                osobowych.
              </p>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Administrator danych</h2>
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
                REGON: 340627879
                <br />
                Email: kontakt@maturapolski.pl
              </p>
              <p className="text-gray-600 text-sm mt-4">
                Szczegółowe informacje o przetwarzaniu danych zgodnie z RODO
                znajdziesz w{" "}
                <a href="/rodo" className="text-blue-600 hover:underline">
                  informacji RODO
                </a>
                .
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Jakie dane zbieramy?</h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <UserCheck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Dane rejestracyjne
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Podczas rejestracji zbieramy:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>Adres email</li>
                      <li>Nazwa użytkownika (imię)</li>
                      <li>Hasło (przechowywane w formie zaszyfrowanej)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Database className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Dane o korzystaniu z platformy
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Automatycznie zbieramy:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>Historia rozwiązanych zadań i wyniki</li>
                      <li>Napisane wypracowania</li>
                      <li>Postępy w nauce (punkty, poziomy, osiągnięcia)</li>
                      <li>Preferencje (motyw, epoki, trudność zadań)</li>
                      <li>Data i godzina ostatniego logowania</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Eye className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Dane techniczne
                    </h3>
                    <p className="text-gray-700 mb-2">
                      W celach analitycznych i bezpieczeństwa zbieramy:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>Adres IP</li>
                      <li>Typ przeglądarki i system operacyjny</li>
                      <li>Dane o urządzeniu (rozdzielczość ekranu, itp.)</li>
                      <li>Strony odwiedzane w serwisie</li>
                      <li>Źródło ruchu (skąd trafiłeś na stronę)</li>
                      <li>
                        Cookies (szczegóły w{" "}
                        <a
                          href="/cookies"
                          className="text-blue-600 hover:underline"
                        >
                          Polityce Cookies
                        </a>
                        )
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Dane płatnicze
                    </h3>
                    <p className="text-gray-700 mb-2">
                      W przypadku subskrypcji Premium:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>
                        Dane płatności są obsługiwane przez Stripe (procesor
                        płatności)
                      </li>
                      <li>
                        NIE przechowujemy danych kart płatniczych na naszych
                        serwerach
                      </li>
                      <li>
                        Zachowujemy informacje o transakcjach (data, kwota,
                        status)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Dane komunikacyjne
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Jeśli się z nami skontaktujesz:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>Treść wiadomości</li>
                      <li>Załączniki (jeśli wyślesz)</li>
                      <li>Adres email</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              3. Dlaczego zbieramy te dane?
            </h2>
            <p className="text-gray-700 mb-4">
              Przetwarzamy Twoje dane w następujących celach:
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Świadczenie usług</h3>
                  <p className="text-gray-700 text-sm">
                    Utworzenie konta, dostęp do platformy, zapisywanie postępów,
                    ocena wypracowań przez AI
                  </p>
                  <p className="text-gray-600 text-xs mt-1">
                    <strong>Podstawa prawna:</strong> Wykonanie umowy (art. 6
                    ust. 1 lit. b RODO)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Personalizacja</h3>
                  <p className="text-gray-700 text-sm">
                    Dostosowanie trudności zadań, rekomendacje materiałów,
                    spersonalizowany plan nauki
                  </p>
                  <p className="text-gray-600 text-xs mt-1">
                    <strong>Podstawa prawna:</strong> Zgoda (art. 6 ust. 1 lit.
                    a RODO)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    Analityka i usprawnienia
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Analiza korzystania z serwisu, wykrywanie błędów,
                    optymalizacja wydajności
                  </p>
                  <p className="text-gray-600 text-xs mt-1">
                    <strong>Podstawa prawna:</strong> Prawnie uzasadniony
                    interes (art. 6 ust. 1 lit. f RODO)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Marketing</h3>
                  <p className="text-gray-700 text-sm">
                    Wysyłka newslettera, informacje o nowych funkcjach i
                    promocjach
                  </p>
                  <p className="text-gray-600 text-xs mt-1">
                    <strong>Podstawa prawna:</strong> Zgoda (art. 6 ust. 1 lit.
                    a RODO)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">5</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Bezpieczeństwo</h3>
                  <p className="text-gray-700 text-sm">
                    Ochrona przed nadużyciami, spam, fraud, zapewnienie
                    bezpieczeństwa danych
                  </p>
                  <p className="text-gray-600 text-xs mt-1">
                    <strong>Podstawa prawna:</strong> Prawnie uzasadniony
                    interes (art. 6 ust. 1 lit. f RODO)
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              4. Z kim udostępniamy dane?
            </h2>
            <p className="text-gray-700 mb-4">
              Twoje dane mogą być udostępniane następującym podmiotom:
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold mb-2">
                  Stripe (procesor płatności)
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  Obsługa płatności za subskrypcję Premium. Stripe jest
                  certyfikowany zgodnie z PCI DSS Level 1.
                </p>
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Polityka prywatności Stripe →
                </a>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold mb-2">
                  OpenAI (ocena wypracowań)
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  Wypracowania są wysyłane do API OpenAI w celu oceny przez AI.
                  Dane są anonimizowane (nie przesyłamy danych
                  identyfikujących).
                </p>
                <a
                  href="https://openai.com/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Polityka prywatności OpenAI →
                </a>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold mb-2">Google Analytics</h3>
                <p className="text-gray-700 text-sm mb-2">
                  Analiza ruchu i zachowań użytkowników (tylko za Twoją zgodą).
                </p>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Polityka prywatności Google →
                </a>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold mb-2">
                  Hosting (AWS / DigitalOcean)
                </h3>
                <p className="text-gray-700 text-sm">
                  Dane są przechowywane na bezpiecznych serwerach w Europie.
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mt-4">
              <strong>Ważne:</strong> Nigdy nie sprzedajemy Twoich danych
              osobowych podmiotom trzecim. Wszystkie podmioty przetwarzające
              dane działają na naszym zleceniu i są zobowiązane do zachowania
              poufności.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              5. Jak długo przechowujemy dane?
            </h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="font-semibold min-w-[180px]">
                    Dane konta:
                  </span>
                  <span>Do momentu usunięcia konta przez Ciebie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold min-w-[180px]">
                    Dane rozliczeniowe:
                  </span>
                  <span>
                    5 lat (wymogi księgowe zgodnie z ustawą o rachunkowości)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold min-w-[180px]">
                    Cookies analityczne:
                  </span>
                  <span>Do 2 lat lub wycofania zgody</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold min-w-[180px]">
                    Logi systemowe:
                  </span>
                  <span>Do 90 dni (bezpieczeństwo i diagnostyka)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold min-w-[180px]">
                    Kopie zapasowe:
                  </span>
                  <span>Do 30 dni (automatyczne usuwanie)</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Twoje prawa</h2>
            <p className="text-gray-700 mb-4">
              Zgodnie z RODO masz następujące prawa:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="font-semibold mb-2">Prawo dostępu</h3>
                <p className="text-gray-700 text-sm">
                  Możesz uzyskać kopię swoich danych osobowych
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="font-semibold mb-2">Prawo do sprostowania</h3>
                <p className="text-gray-700 text-sm">
                  Możesz poprawić nieprawidłowe dane
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="font-semibold mb-2">Prawo do usunięcia</h3>
                <p className="text-gray-700 text-sm">
                  Możesz żądać usunięcia swoich danych (z wyjątkami prawnymi)
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="font-semibold mb-2">Prawo do ograniczenia</h3>
                <p className="text-gray-700 text-sm">
                  Możesz ograniczyć przetwarzanie danych w określonych
                  przypadkach
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="font-semibold mb-2">Prawo do przenoszenia</h3>
                <p className="text-gray-700 text-sm">
                  Możesz otrzymać dane w formacie JSON i przenieść je
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="font-semibold mb-2">Prawo do sprzeciwu</h3>
                <p className="text-gray-700 text-sm">
                  Możesz wnieść sprzeciw wobec przetwarzania w celach
                  marketingowych
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="font-semibold mb-2">Prawo do wycofania zgody</h3>
                <p className="text-gray-700 text-sm">
                  Możesz w każdej chwili wycofać zgodę (np. na cookies)
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="font-semibold mb-2">Prawo do skargi</h3>
                <p className="text-gray-700 text-sm">
                  Możesz wnieść skargę do UODO (uodo.gov.pl)
                </p>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold mb-2">Jak skorzystać z praw?</h3>
              <p className="text-gray-700 mb-2">
                Aby skorzystać z powyższych praw, napisz do nas:
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> kontakt@maturapolski.pl
                <br />
                <strong>Temat:</strong> "RODO - [Twoje żądanie]"
              </p>
              <p className="text-gray-600 text-sm mt-3">
                Odpowiemy w ciągu 30 dni od otrzymania żądania.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              7. Bezpieczeństwo danych
            </h2>
            <p className="text-gray-700 mb-4">
              Stosujemy następujące środki bezpieczeństwa:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm mb-1">Szyfrowanie</h3>
                  <p className="text-gray-700 text-xs">
                    Połączenia SSL/TLS, hasła zaszyfrowane algorytmem bcrypt
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm mb-1">
                    Ochrona przed atakami
                  </h3>
                  <p className="text-gray-700 text-xs">
                    Firewall, ochrona DDoS, monitoring bezpieczeństwa
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                <Database className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm mb-1">Kopie zapasowe</h3>
                  <p className="text-gray-700 text-xs">
                    Regularne backupy, szyfrowane przechowywanie
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                <Eye className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm mb-1">
                    Kontrola dostępu
                  </h3>
                  <p className="text-gray-700 text-xs">
                    Ograniczony dostęp do danych, logi dostępu
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              8. Cookies i technologie śledzące
            </h2>
            <p className="text-gray-700 mb-4">
              Szczegółowe informacje o plikach cookies znajdziesz w naszej{" "}
              <a
                href="/cookies"
                className="text-blue-600 hover:underline font-semibold"
              >
                Polityce Cookies
              </a>
              .
            </p>
            <p className="text-gray-700">
              Możesz zarządzać ustawieniami cookies w{" "}
              <button
                onClick={() => {
                  const event = new CustomEvent("openCookieSettings");
                  window.dispatchEvent(event);
                }}
                className="text-blue-600 hover:underline font-semibold"
              >
                ustawieniach cookies
              </button>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Dzieci</h2>
            <p className="text-gray-700">
              Nasza platforma może być używana przez osoby od 13 roku życia.
              Osoby poniżej 18 roku życia powinny korzystać z serwisu za zgodą
              rodzica lub opiekuna prawnego. Nie zbieramy świadomie danych
              dzieci poniżej 13 roku życia.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              10. Zmiany w polityce prywatności
            </h2>
            <p className="text-gray-700">
              Możemy okresowo aktualizować naszą Politykę Prywatności. O
              istotnych zmianach poinformujemy Cię przez email oraz widoczne
              powiadomienie na stronie, z wyprzedzeniem 30 dni.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Kontakt</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                Jeśli masz pytania dotyczące przetwarzania danych osobowych,
                skontaktuj się z nami:
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> kontakt@maturapolski.pl
                <br />
                <strong>Adres:</strong> 86-221 Papowo Biskupie 119/18
                <br />
                <strong>NIP:</strong> 9562203948
              </p>
              <p className="text-gray-600 text-sm mt-4">
                Więcej informacji:{" "}
                <a href="/rodo" className="text-blue-600 hover:underline">
                  Informacja RODO
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
};

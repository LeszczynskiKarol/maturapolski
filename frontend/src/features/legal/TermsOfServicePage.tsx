// frontend/src/features/legal/TermsOfServicePage.tsx

import React from "react";
import { PublicLayout } from "../../components/PublicLayout";
import { FileText, AlertCircle, Shield, CreditCard, UserX } from "lucide-react";

export const TermsOfServicePage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold">Regulamin</h1>
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
                Korzystając z platformy Matura Polski, akceptujesz niniejszy
                regulamin. Prosimy o uważne zapoznanie się z jego treścią.
              </p>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Definicje</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>Platforma / Serwis:</strong> Matura Polski dostępna
                  pod adresem maturapolski.pl
                </li>
                <li>
                  <strong>Usługodawca:</strong> [Nazwa firmy], NIP: [NIP],
                  Adres: [Adres]
                </li>
                <li>
                  <strong>Użytkownik:</strong> Osoba korzystająca z platformy
                </li>
                <li>
                  <strong>Konto:</strong> Indywidualne konto użytkownika w
                  serwisie
                </li>
                <li>
                  <strong>Subskrypcja:</strong> Płatny dostęp do funkcji Premium
                </li>
                <li>
                  <strong>Treści:</strong> Wszystkie materiały edukacyjne,
                  zadania, testy dostępne w serwisie
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Postanowienia ogólne</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>2.1.</strong> Regulamin określa zasady korzystania z
                platformy Matura Polski, warunki zawierania i rozwiązywania umów
                o świadczenie usług drogą elektroniczną, a także prawa i
                obowiązki Użytkowników.
              </p>
              <p className="text-gray-700">
                <strong>2.2.</strong> Serwis przeznaczony jest dla osób
                przygotowujących się do egzaminu maturalnego z języka polskiego.
              </p>
              <p className="text-gray-700">
                <strong>2.3.</strong> Korzystanie z platformy wymaga akceptacji
                niniejszego Regulaminu oraz Polityki Prywatności.
              </p>
              <p className="text-gray-700">
                <strong>2.4.</strong> Usługodawca zastrzega sobie prawo do
                zmiany Regulaminu. O zmianach Użytkownicy zostaną poinformowani
                z wyprzedzeniem 14 dni.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Wymagania techniczne</h2>
            <p className="text-gray-700 mb-4">
              Do korzystania z platformy niezbędne są:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Dostęp do Internetu</li>
              <li>
                Przeglądarka internetowa: Chrome, Firefox, Safari, Edge
                (najnowsze wersje)
              </li>
              <li>Włączona obsługa JavaScript i cookies</li>
              <li>Adres email do rejestracji i komunikacji</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              4. Rejestracja i konto użytkownika
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>4.1.</strong> Rejestracja w serwisie jest bezpłatna i
                wymaga podania adresu email, nazwy użytkownika oraz hasła.
              </p>
              <p className="text-gray-700">
                <strong>4.2.</strong> Użytkownik zobowiązuje się do podania
                prawdziwych danych.
              </p>
              <p className="text-gray-700">
                <strong>4.3.</strong> Użytkownik ponosi odpowiedzialność za
                bezpieczeństwo swojego hasła i nie może udostępniać go osobom
                trzecim.
              </p>
              <p className="text-gray-700">
                <strong>4.4.</strong> Jedno konto może być używane tylko przez
                jedną osobę. Zabronione jest udostępnianie konta innym osobom.
              </p>
              <p className="text-gray-700">
                <strong>4.5.</strong> Rejestracja dostępna jest dla osób, które
                ukończyły 13 lat. Osoby między 13 a 18 rokiem życia wymagają
                zgody rodzica/opiekuna.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Rodzaje usług</h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      5.1. Konto darmowe (Free)
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Darmowe konto umożliwia:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>
                        Ograniczony dostęp do zadań (20 punktów AI miesięcznie)
                      </li>
                      <li>Przeglądanie materiałów podstawowych</li>
                      <li>Rozwiązywanie testów z poziomem trudności 1-2</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
                <div className="flex items-start gap-4">
                  <CreditCard className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      5.2. Subskrypcja Premium
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Subskrypcja Premium (49 zł/miesiąc) zapewnia:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>Nielimitowany dostęp do wszystkich zadań</li>
                      <li>300 punktów AI miesięcznie na ocenę wypracowań</li>
                      <li>Dostęp do wszystkich poziomów trudności (1-5)</li>
                      <li>Szczegółowe statystyki i analiza postępów</li>
                      <li>System spaced repetition dla epok literackich</li>
                      <li>Tryb egzaminacyjny</li>
                      <li>Wszystkie materiały i kursy</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              6. Płatności i subskrypcje
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>6.1.</strong> Płatności są obsługiwane przez Stripe,
                certyfikowany procesor płatności zgodny z PCI DSS.
              </p>
              <p className="text-gray-700">
                <strong>6.2.</strong> Subskrypcja jest odnawiana automatycznie
                co miesiąc, chyba że Użytkownik ją anuluje.
              </p>
              <p className="text-gray-700">
                <strong>6.3.</strong> Użytkownik może anulować subskrypcję w
                dowolnym momencie w ustawieniach konta. Dostęp Premium jest
                zachowany do końca opłaconego okresu.
              </p>
              <p className="text-gray-700">
                <strong>6.4.</strong> Ceny mogą ulec zmianie. O zmianie cen
                Użytkownicy zostaną poinformowani z wyprzedzeniem 30 dni.
              </p>
              <p className="text-gray-700">
                <strong>6.5.</strong>{" "}
                <strong>Gwarancja zwrotu pieniędzy:</strong> Użytkownik może
                żądać zwrotu środków w ciągu 30 dni od pierwszej płatności, bez
                podania przyczyny.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              7. Prawa autorskie i własność intelektualna
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>7.1.</strong> Wszystkie treści dostępne w serwisie
                (zadania, materiały, testy, grafiki, interfejs) są chronione
                prawem autorskim i stanowią własność Usługodawcy lub podmiotów
                trzecich.
              </p>
              <p className="text-gray-700">
                <strong>7.2.</strong> Zabronione jest:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Kopiowanie, rozpowszechnianie lub modyfikowanie treści bez
                  zgody
                </li>
                <li>Sprzedaż lub komercyjne wykorzystanie treści</li>
                <li>Automatyczne pobieranie treści (scraping)</li>
                <li>Inżynieria wsteczna platformy</li>
              </ul>
              <p className="text-gray-700">
                <strong>7.3.</strong> Użytkownik zachowuje prawa autorskie do
                swoich wypracowań. Udzielając Usługodawcy niewyłącznej licencji
                na ich użycie w celu świadczenia usług (np. ocena przez AI,
                przechowywanie).
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              8. Zasady korzystania z platformy
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>8.1.</strong> Użytkownik zobowiązuje się do korzystania
                z platformy zgodnie z jej przeznaczeniem i obowiązującym prawem.
              </p>
              <p className="text-gray-700">
                <strong>8.2.</strong> Zabronione jest:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Próby nieuprawnionego dostępu do systemów</li>
                <li>Przesyłanie złośliwego oprogramowania</li>
                <li>Zakłócanie działania platformy</li>
                <li>Wykorzystywanie luk w zabezpieczeniach</li>
                <li>Tworzenie wielu kont w celu obejścia limitów</li>
                <li>Spamowanie lub rozsyłanie niechcianych wiadomości</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Odpowiedzialność</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>9.1.</strong> Usługodawca dołoży starań, aby platforma
                działała nieprzerwanie, jednak nie gwarantuje 100% dostępności.
              </p>
              <p className="text-gray-700">
                <strong>9.2.</strong> Materiały edukacyjne mają charakter
                pomocniczy i nie zastępują profesjonalnej nauki z nauczycielem.
              </p>
              <p className="text-gray-700">
                <strong>9.3.</strong> Oceny AI mają charakter orientacyjny i
                mogą zawierać błędy. Nie gwarantujemy 100% zgodności z oceną
                egzaminatora CKE.
              </p>
              <p className="text-gray-700">
                <strong>9.4.</strong> Usługodawca nie ponosi odpowiedzialności
                za wyniki egzaminu maturalnego Użytkownika.
              </p>
              <p className="text-gray-700">
                <strong>9.5.</strong> Usługodawca nie ponosi odpowiedzialności
                za szkody wynikające z działania siły wyższej, przerw w dostawie
                energii, awarii sprzętu, ataków DDoS itp.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              10. Prawo odstąpienia od umowy
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>10.1.</strong> Konsument ma prawo odstąpić od umowy w
                ciągu 14 dni od dnia jej zawarcia bez podania przyczyny.
              </p>
              <p className="text-gray-700">
                <strong>10.2.</strong> W przypadku subskrypcji cyfrowej, prawo
                odstąpienia wygasa po rozpoczęciu świadczenia usługi za wyraźną
                zgodą Użytkownika.
              </p>
              <p className="text-gray-700">
                <strong>10.3.</strong> Dodatkowo oferujemy 30-dniową gwarancję
                zwrotu pieniędzy dla nowych subskrybentów (patrz punkt 6.5).
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">11. Reklamacje</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>11.1.</strong> Reklamacje można składać:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Email: kontakt@maturapolski.pl</li>
                <li>Formularz kontaktowy na stronie</li>
              </ul>
              <p className="text-gray-700">
                <strong>11.2.</strong> Reklamacja powinna zawierać opis problemu
                i adres email do kontaktu.
              </p>
              <p className="text-gray-700">
                <strong>11.3.</strong> Usługodawca rozpatrzy reklamację w ciągu
                14 dni i poinformuje o wyniku.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">12. Usunięcie konta</h2>
            <div className="bg-red-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <UserX className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 mb-2">
                    <strong>12.1.</strong> Użytkownik może w każdej chwili
                    usunąć swoje konto w ustawieniach profilu.
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>12.2.</strong> Usunięcie konta powoduje:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li>Trwałe usunięcie danych osobowych</li>
                    <li>Anulowanie aktywnej subskrypcji</li>
                    <li>Utratę dostępu do historii nauki</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    <strong>12.3.</strong> Dane rozliczeniowe będą przechowywane
                    przez 5 lat ze względów księgowych.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              13. Zmiany w regulaminie
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>13.1.</strong> Usługodawca zastrzega sobie prawo do
                zmiany Regulaminu.
              </p>
              <p className="text-gray-700">
                <strong>13.2.</strong> O zmianach Użytkownicy zostaną
                poinformowani przez email oraz powiadomienie na stronie, z
                wyprzedzeniem 14 dni.
              </p>
              <p className="text-gray-700">
                <strong>13.3.</strong> Kontynuowanie korzystania z platformy po
                wprowadzeniu zmian oznacza akceptację nowego Regulaminu.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              14. Postanowienia końcowe
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>14.1.</strong> W sprawach nieuregulowanych Regulaminem
                zastosowanie mają przepisy prawa polskiego.
              </p>
              <p className="text-gray-700">
                <strong>14.2.</strong> Spory będą rozstrzygane przez sąd
                właściwy dla siedziby Usługodawcy, z zastrzeżeniem przepisów o
                właściwości sądów konsumenckich.
              </p>
              <p className="text-gray-700">
                <strong>14.3.</strong> Konsument ma prawo do skorzystania z
                pozasądowych sposobów rozpatrywania sporów:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Rzecznik Finansowy: www.rf.gov.pl</li>
                <li>Platforma ODR UE: ec.europa.eu/consumers/odr</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">15. Kontakt</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-2">
                <strong>Dane kontaktowe:</strong>
              </p>
              <p className="text-gray-700">
                Email: kontakt@maturapolski.pl
                <br />
                Adres: [Adres firmy]
                <br />
                NIP: [NIP]
              </p>
            </div>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
};

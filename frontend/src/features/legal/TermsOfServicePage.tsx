// frontend/src/features/legal/TermsOfServicePage.tsx

import React from "react";
import { PublicLayout } from "../../components/PublicLayout";
import {
  FileText,
  AlertCircle,
  Shield,
  CreditCard,
  UserX,
  Zap,
  Crown,
  ShoppingCart,
} from "lucide-react";

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
          <p className="text-gray-600">Ostatnia aktualizacja: 04.10.2025</p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <p className="text-gray-700">
                Korzystając z platformy Matura Polski, akceptujesz niniejszy
                regulamin. Prosimy o uważne zapoznanie się z jego treścią.
              </p>
            </div>
          </div>

          {/* § 1 - POSTANOWIENIA OGÓLNE */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              § 1. POSTANOWIENIA OGÓLNE I DEFINICJE
            </h2>

            <div className="bg-gray-50 rounded-xl p-6 mb-4">
              <h3 className="font-bold text-lg mb-3">
                1.1. Postanowienia wstępne
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>1.</strong> Niniejszy Regulamin określa zasady i
                  warunki korzystania z platformy edukacyjnej „Matura Polski"
                  dostępnej pod adresem www.maturapolski.pl (zwanej dalej
                  „Platformą" lub „Serwisem").
                </p>
                <p>
                  <strong>2.</strong> Usługodawcą i administratorem Platformy
                  jest:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>
                    <strong>eCopywriting.pl Karol Leszczyński</strong>
                  </li>
                  <li>Adres: 86-221 Papowo Biskupie</li>
                  <li>NIP: 9562203948</li>
                  <li>REGON: 340627879</li>
                  <li>Email: kontakt@ecopywriting.pl</li>
                </ul>
                <p>
                  <strong>3.</strong> Korzystanie z Platformy jest równoznaczne
                  z akceptacją niniejszego Regulaminu, Polityki Prywatności oraz
                  Polityki Cookies.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-3">1.2. Definicje</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <p>
                  <strong>Platforma/Serwis</strong> – platforma edukacyjna
                  „Matura Polski" dostępna pod adresem www.maturapolski.pl
                </p>
                <p>
                  <strong>Użytkownik</strong> – osoba fizyczna korzystająca z
                  Platformy
                </p>
                <p>
                  <strong>Konsument</strong> – Użytkownik będący osobą fizyczną
                  dokonującą czynności niezwiązanej z działalnością gospodarczą
                </p>
                <p>
                  <strong>Konto</strong> – indywidualne konto Użytkownika w
                  Serwisie
                </p>
                <p>
                  <strong>Plan FREE</strong> – darmowy plan z ograniczonymi
                  funkcjonalnościami (20 Punktów AI/miesiąc)
                </p>
                <p>
                  <strong>Plan PREMIUM</strong> – płatny plan subskrypcyjny (39
                  zł/miesiąc, 200 Punktów AI/miesiąc)
                </p>
                <p>
                  <strong>Subskrypcja</strong> – umowa o charakterze ciągłym,
                  odnawiana automatycznie miesięcznie
                </p>
                <p>
                  <strong>Punkty AI</strong> – wirtualna waluta do korzystania z
                  automatycznej oceny przez algorytmy AI
                </p>
                <p>
                  <strong>Zadania zamknięte</strong> – pytania testowe (0
                  Punktów AI)
                </p>
                <p>
                  <strong>Zadania otwarte</strong> – krótkie odpowiedzi tekstowe
                  (1 Punkt AI)
                </p>
                <p>
                  <strong>Wypracowania</strong> – eseje, rozprawki oceniane
                  przez AI (3 Punkty AI)
                </p>
              </div>
            </div>
          </section>

          {/* § 2 - WYMAGANIA TECHNICZNE */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              § 2. WYMAGANIA TECHNICZNE
            </h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-3">
                Do prawidłowego korzystania z Platformy niezbędne są:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Urządzenie z dostępem do Internetu (komputer, tablet,
                  smartfon)
                </li>
                <li>
                  Przeglądarka: Chrome, Firefox, Safari, Edge (najnowsze wersje)
                </li>
                <li>Włączona obsługa JavaScript i cookies</li>
                <li>Aktywny adres email</li>
                <li>Minimalna prędkość łącza: 2 Mb/s</li>
              </ul>
            </div>
          </section>

          {/* § 3 - REJESTRACJA */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              § 3. REJESTRACJA I KONTO UŻYTKOWNIKA
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold mb-3">3.1. Zasady rejestracji</h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>1.</strong> Rejestracja w Serwisie jest dobrowolna i
                    bezpłatna.
                  </p>
                  <p>
                    <strong>2.</strong> Warunkiem rejestracji jest:
                  </p>
                  <ul className="list-disc list-inside ml-4">
                    <li>Ukończenie 13. roku życia</li>
                    <li>Podanie prawdziwych danych osobowych</li>
                    <li>Akceptacja Regulaminu i Polityki Prywatności</li>
                    <li>Podanie unikalnego adresu email i nazwy użytkownika</li>
                  </ul>
                  <p>
                    <strong>3.</strong> Osoby między 13. a 18. rokiem życia
                    wymagają zgody rodzica/opiekuna.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-yellow-600" />
                  3.2. Bezpieczeństwo Konta
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>1.</strong> Użytkownik zobowiązany jest do:
                  </p>
                  <ul className="list-disc list-inside ml-4">
                    <li>Zachowania poufności danych logowania</li>
                    <li>
                      Używania bezpiecznego hasła (min. 8 znaków, w tym min.
                      jedna wielka litera, jedna cyfra i jeden znak specjalny)
                    </li>
                    <li>Nieudostępniania Konta osobom trzecim</li>
                  </ul>
                  <p>
                    <strong>2.</strong> Wykrycie współdzielenia Konta może
                    skutkować jego zawieszeniem bez zwrotu środków.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* § 4 - RODZAJE USŁUG */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              § 4. RODZAJE USŁUG I FUNKCJONALNOŚCI
            </h2>

            {/* Plan FREE */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6 border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-gray-600" />
                <h3 className="text-xl font-bold">4.1. Plan FREE (Darmowy)</h3>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Brak dostępu do ćwiczeń</strong>
                </p>
              </div>
            </div>

            {/* Plan PREMIUM */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border-2 border-blue-300">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-8 h-8 text-blue-600" />
                <h3 className="text-xl font-bold">
                  4.2. Plan PREMIUM (39 zł/miesiąc)
                </h3>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Pełen dostęp do wszystkich funkcji:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>
                    <strong>Nielimitowany dostęp</strong> do wszystkich zadań
                    (zamknięte, otwarte, wypracowania)
                  </li>
                  <li>
                    <strong>200 Punktów AI miesięcznie</strong> (automatyczna
                    ocena przez AI)
                  </li>
                  <li>
                    <strong>Sesje nauki</strong> – 20 inteligentnie dobranych
                    zadań
                  </li>
                  <li>
                    <strong>System Spaced Repetition</strong> – inteligentne
                    powtórki z epok
                  </li>
                  <li>
                    <strong>Wszystkie poziomy trudności</strong> (1-5)
                  </li>
                  <li>
                    <strong>Pełne materiały edukacyjne</strong> – streszczenia,
                    analizy, poradniki
                  </li>
                  <li>
                    <strong>Zaawansowane statystyki</strong> – wykresy, analiza
                    postępów
                  </li>

                  <li>
                    <strong>System motywacji</strong> – XP, poziomy,
                    osiągnięcia, streaki
                  </li>
                  <li>
                    <strong>Wsparcie priorytetowe</strong>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pakiety punktów */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-300">
              <div className="flex items-center gap-3 mb-4">
                <ShoppingCart className="w-8 h-8 text-orange-600" />
                <h3 className="text-xl font-bold">
                  4.3. Dokup Punktów AI (jednorazowo)
                </h3>
              </div>
              <p className="text-gray-700 mb-4">
                Użytkownicy mogą dokupić dodatkowe Punkty AI:
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="font-bold text-lg mb-2">Pakiet SMALL</p>
                  <p className="text-2xl font-bold text-blue-600 mb-2">19 zł</p>
                  <p className="text-gray-700 text-sm">50 Punktów AI</p>
                  <p className="text-gray-500 text-xs">0,38 zł/punkt</p>
                </div>

                <div className="bg-white rounded-lg p-4 border-2 border-blue-500 relative">
                  <p className="font-bold text-lg mb-2">Pakiet MEDIUM</p>
                  <p className="text-2xl font-bold text-blue-600 mb-2">49 zł</p>
                  <p className="text-gray-700 text-sm">150 Punktów AI</p>
                  <p className="text-gray-500 text-xs">0,33 zł/punkt</p>
                </div>

                <div className="bg-white rounded-lg p-4 border-2 border-green-500 relative">
                  <p className="font-bold text-lg mb-2">Pakiet LARGE</p>
                  <p className="text-2xl font-bold text-blue-600 mb-2">79 zł</p>
                  <p className="text-gray-700 text-sm">300 Punktów AI</p>
                  <p className="text-gray-500 text-xs">0,26 zł/punkt</p>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-gray-700 text-sm">
                <p>
                  <strong>Zasady:</strong>
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>Dokupione punkty są dodawane do aktualnego limitu</li>
                  <li>Punkty nie wygasają i nie podlegają resetowi</li>
                  <li>Brak możliwości zwrotu lub przeniesienia punktów</li>
                </ul>
              </div>
            </div>

            {/* Zużycie punktów */}
            <div className="bg-gray-50 rounded-xl p-6 mt-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-yellow-500" />
                <h3 className="text-lg font-bold">4.4. Zużycie Punktów AI</h3>
              </div>
              <div className="space-y-2 text-gray-700">
                <p>
                  ✅ <strong>Zadania zamknięte (pytania testowe):</strong> 0
                  Punktów AI (nielimitowane)
                </p>
                <p>
                  ⚡ <strong>Zadania otwarte (krótkie odpowiedzi):</strong> 1
                  Punkt AI za zadanie
                </p>
                <p>
                  📝 <strong>Wypracowania (eseje, rozprawki):</strong> 2-3
                  Punkty AI za pracę
                </p>
              </div>
            </div>
          </section>

          {/* § 5 - PŁATNOŚCI */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              § 5. PŁATNOŚCI I ROZLICZENIA
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold mb-3">5.1. Procesor płatności</h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>1.</strong> Wszystkie płatności obsługiwane są przez{" "}
                    <strong>Stripe, Inc.</strong>, certyfikowanego procesora
                    płatności zgodnego z PCI DSS Level 1.
                  </p>
                  <p>
                    <strong>2.</strong> Usługodawca nie przechowuje danych kart
                    płatniczych.
                  </p>
                  <p>
                    <strong>3.</strong> Transakcje są szyfrowane protokołem
                    SSL/TLS.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  5.2. Ceny i waluta
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>1.</strong> Wszystkie ceny podawane są w złotych
                    polskich (PLN) i zawierają podatek VAT.
                  </p>
                  <p>
                    <strong>2.</strong> Aktualne ceny:
                  </p>
                  <ul className="list-disc list-inside ml-4">
                    <li>
                      <strong>Plan PREMIUM:</strong> 39 zł/miesiąc
                    </li>
                    <li>
                      <strong>Pakiet SMALL:</strong> 19 zł (50 Punktów AI)
                    </li>
                    <li>
                      <strong>Pakiet MEDIUM:</strong> 49 zł (150 Punktów AI)
                    </li>
                    <li>
                      <strong>Pakiet LARGE:</strong> 79 zł (300 Punktów AI)
                    </li>
                  </ul>
                  <p>
                    <strong>3.</strong> Subskrypcja jest odnawiana automatycznie
                    co miesiąc.
                  </p>
                  <p>
                    <strong>4.</strong> O zmianach cen Użytkownicy zostaną
                    powiadomieni z wyprzedzeniem 30 dni.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold mb-3">5.3. Faktury VAT</h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>1.</strong> Użytkownik może żądać wystawienia
                    faktury VAT, kontaktując się na adres:{" "}
                    <strong>kontakt@ecopywriting.pl</strong>
                  </p>
                  <p>
                    <strong>2.</strong> Żądanie należy zgłosić w ciągu 7 dni od
                    płatności, podając dane do faktury (imię i nazwisko/nazwa
                    firmy, adres, NIP).
                  </p>
                  <p>
                    <strong>3.</strong> Faktury wysyłane są w formie
                    elektronicznej na adres email.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* § 6 - PRAWO ODSTĄPIENIA */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              § 6. PRAWO ODSTĄPIENIA OD UMOWY
            </h2>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold mb-3">
                6.1. Dla konsumentów (Plan PREMIUM)
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>1.</strong> Konsument ma prawo odstąpić od umowy w
                  ciągu <strong>14 dni</strong> od dnia jej zawarcia bez podania
                  przyczyny.
                </p>
                <p>
                  <strong>2.</strong> Dokonując pierwszej płatności za
                  Subskrypcję, Użytkownik{" "}
                  <strong>
                    wyraża zgodę na natychmiastowe rozpoczęcie świadczenia usług
                    cyfrowych
                  </strong>{" "}
                  przed upływem terminu odstąpienia.
                </p>
                <p>
                  <strong>3.</strong> W związku z powyższym, Użytkownik{" "}
                  <strong>traci prawo odstąpienia</strong> w zakresie już
                  zrealizowanych świadczeń cyfrowych (dostęp do treści Premium).
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 mt-4 border border-yellow-200">
              <h3 className="font-bold mb-3">
                6.2. Zakup Punktów AI (brak prawa odstąpienia)
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>1.</strong> Zgodnie z art. 38 pkt 13 ustawy o prawach
                  konsumenta, prawo odstąpienia <strong>nie przysługuje</strong>{" "}
                  w przypadku dostarczania treści cyfrowych, które nie są
                  zapisane na nośniku materialnym, jeżeli spełnianie świadczenia
                  rozpoczęło się za zgodą konsumenta przed upływem terminu
                  odstąpienia.
                </p>
                <p>
                  <strong>2.</strong> Kupując Punkty AI, Użytkownik wyraża zgodę
                  na natychmiastowe dodanie punktów do Konta i tym samym{" "}
                  <strong>traci prawo odstąpienia</strong>.
                </p>
                <p>
                  <strong>3.</strong> Punkty są dodawane automatycznie po
                  płatności i nie podlegają zwrotowi.
                </p>
              </div>
            </div>
          </section>

          {/* § 7 - ANULOWANIE SUBSKRYPCJI */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              § 7. ANULOWANIE SUBSKRYPCJI
            </h2>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>1.</strong> Użytkownik może anulować Subskrypcję w
                  dowolnym momencie w ustawieniach Konta lub poprzez Customer
                  Portal Stripe.
                </p>
                <p>
                  <strong>2.</strong> Anulowanie Subskrypcji skutkuje:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>Zaprzestaniem automatycznego odnawiania Subskrypcji</li>
                  <li>
                    Zachowaniem dostępu Premium do końca opłaconego okresu
                  </li>
                  <li>
                    Automatycznym przejściem na Plan FREE po zakończeniu okresu
                  </li>
                </ul>
                <p>
                  <strong>3.</strong> Niewykorzystane Punkty AI z Planu PREMIUM
                  przepadają po zakończeniu Subskrypcji.
                </p>
                <p>
                  <strong>4.</strong> Dokupione Punkty AI (pakiety) pozostają na
                  Koncie i nie przepadają.
                </p>
                <p>
                  <strong>5.</strong> Użytkownik może w każdej chwili wznowić
                  Subskrypcję.
                </p>
              </div>
            </div>
          </section>

          {/* § 8 - PRAWA AUTORSKIE */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              § 8. PRAWA AUTORSKIE I WŁASNOŚĆ INTELEKTUALNA
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>1.</strong> Wszystkie treści dostępne w Serwisie
                    (zadania, materiały, testy, grafiki, interfejs, kod
                    źródłowy) są chronione prawem autorskim i stanowią własność
                    Usługodawcy lub podmiotów trzecich.
                  </p>
                  <p>
                    <strong>2.</strong> Zabronione jest:
                  </p>
                  <ul className="list-disc list-inside ml-4">
                    <li>
                      Kopiowanie, rozpowszechnianie lub modyfikowanie treści bez
                      zgody
                    </li>
                    <li>Sprzedaż lub komercyjne wykorzystanie treści</li>
                    <li>Automatyczne pobieranie treści (scraping, crawling)</li>
                    <li>Inżynieria wsteczna Platformy</li>
                    <li>Udostępnianie dostępu do Konta osobom trzecim</li>
                  </ul>
                  <p>
                    <strong>3.</strong> Użytkownik zachowuje prawa autorskie do
                    swoich wypracowań, jednocześnie udzielając Usługodawcy
                    niewyłącznej licencji na ich użycie w celu świadczenia usług
                    (ocena przez AI, przechowywanie, analiza).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* § 9 - ZASADY KORZYSTANIA */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              § 9. ZASADY KORZYSTANIA Z PLATFORMY
            </h2>

            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                9.1. Zabronione działania
              </h3>
              <p className="text-gray-700 mb-2">Zabronione jest:</p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
                <li>Próby nieuprawnionego dostępu do systemów</li>
                <li>Przesyłanie złośliwego oprogramowania</li>
                <li>Zakłócanie działania Platformy lub innych Użytkowników</li>
                <li>Wykorzystywanie luk w zabezpieczeniach</li>
                <li>Tworzenie wielu Kont w celu obejścia limitów</li>
                <li>Spamowanie lub rozsyłanie niechcianych wiadomości</li>
                <li>Podszywanie się pod inne osoby</li>
                <li>
                  Publikowanie treści niezgodnych z prawem lub dobrymi
                  obyczajami
                </li>
              </ul>
              <p className="text-gray-700 mt-3">
                <strong>
                  Naruszenie powyższych zasad może skutkować natychmiastowym
                  zawieszeniem lub usunięciem Konta bez zwrotu środków.
                </strong>
              </p>
            </div>
          </section>

          {/* § 10 - ODPOWIEDZIALNOŚĆ */}
          <section>
            <h2 className="text-2xl font-bold mb-4">§ 10. ODPOWIEDZIALNOŚĆ</h2>

            <div className="space-y-4">
              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  10.1. Ograniczenie odpowiedzialności za AI
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>1.</strong>{" "}
                    <strong>
                      Oceny AI mają charakter orientacyjny i pomocniczy.
                    </strong>{" "}
                    Algorytmy sztucznej inteligencji służą jako narzędzie
                    edukacyjne i nie zastępują profesjonalnej oceny nauczyciela
                    lub egzaminatora CKE.
                  </p>
                  <p>
                    <strong>2.</strong> Usługodawca{" "}
                    <strong>nie gwarantuje</strong> 100% zgodności ocen AI z
                    oceną egzaminatora CKE podczas rzeczywistego egzaminu
                    maturalnego.
                  </p>
                  <p>
                    <strong>3.</strong> Oceny AI mogą zawierać błędy lub
                    nieścisłości. Użytkownik korzysta z nich na własną
                    odpowiedzialność.
                  </p>
                  <p>
                    <strong>4.</strong> Usługodawca{" "}
                    <strong>nie ponosi odpowiedzialności</strong> za wyniki
                    egzaminu maturalnego Użytkownika ani za decyzje podjęte na
                    podstawie ocen AI.
                  </p>
                  <p>
                    <strong>5.</strong> Feedback AI nie stanowi porady prawnej,
                    medycznej ani zawodowej.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold mb-3">10.2. Dostępność Platformy</h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>1.</strong> Usługodawca dołoży starań, aby Platforma
                    działała nieprzerwanie 24/7, jednak{" "}
                    <strong>nie gwarantuje</strong> 100% dostępności.
                  </p>
                  <p>
                    <strong>2.</strong> Platforma może być czasowo niedostępna z
                    powodu:
                  </p>
                  <ul className="list-disc list-inside ml-4">
                    <li>Prac konserwacyjnych i aktualizacji</li>
                    <li>Awarii serwera lub infrastruktury</li>
                    <li>Działania siły wyższej</li>
                    <li>Ataków DDoS lub innych zagrożeń bezpieczeństwa</li>
                  </ul>
                  <p>
                    <strong>3.</strong> O planowanych pracach konserwacyjnych
                    Użytkownicy zostaną poinformowani z wyprzedzeniem.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold mb-3">
                  10.3. Charakter materiałów edukacyjnych
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>1.</strong> Materiały edukacyjne dostępne na
                    Platformie mają charakter <strong>pomocniczy</strong> i nie
                    zastępują profesjonalnej nauki z nauczycielem.
                  </p>
                  <p>
                    <strong>2.</strong> Treści są przygotowywane z najwyższą
                    starannością, jednak Usługodawca nie gwarantuje
                    kompletności, aktualności ani bezbłędności wszystkich
                    informacji.
                  </p>
                  <p>
                    <strong>3.</strong> Użytkownik powinien weryfikować
                    informacje w oficjalnych źródłach (CKE, podręczniki).
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold mb-3">
                  10.4. Wyłączenie odpowiedzialności
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    Usługodawca <strong>nie ponosi odpowiedzialności</strong>{" "}
                    za:
                  </p>
                  <ul className="list-disc list-inside ml-4">
                    <li>
                      Szkody wynikające z nieprawidłowego korzystania z
                      Platformy
                    </li>
                    <li>
                      Utratę danych z powodu awarii urządzenia Użytkownika
                    </li>
                    <li>
                      Szkody wynikłe z działania wirusów lub złośliwego
                      oprogramowania na urządzeniu Użytkownika
                    </li>
                    <li>
                      Decyzje podjęte przez Użytkownika na podstawie treści z
                      Platformy
                    </li>
                    <li>Szkody pośrednie, w tym utracone korzyści</li>
                  </ul>
                  <p>
                    <strong>
                      Odpowiedzialność Usługodawcy wobec Konsumentów jest
                      ograniczona do wysokości zapłaconej przez Konsumenta kwoty
                      za Subskrypcję w okresie ostatnich 12 miesięcy.
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* § 11 - REKLAMACJE */}
          <section>
            <h2 className="text-2xl font-bold mb-4">§ 11. REKLAMACJE</h2>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>1.</strong> Reklamacje dotyczące usług świadczonych
                  przez Platformę można składać:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>
                    <strong>Email:</strong> kontakt@ecopywriting.pl
                  </li>
                  <li>
                    <strong>Formularz kontaktowy</strong> dostępny na stronie
                  </li>
                </ul>
                <p>
                  <strong>2.</strong> Reklamacja powinna zawierać:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>Imię i nazwisko oraz adres email Użytkownika</li>
                  <li>Szczegółowy opis problemu</li>
                  <li>Datę wystąpienia problemu</li>
                  <li>Oczekiwany sposób rozpatrzenia reklamacji</li>
                </ul>
                <p>
                  <strong>3.</strong> Usługodawca rozpatrzy reklamację w ciągu{" "}
                  <strong>14 dni</strong> od jej otrzymania i poinformuje o
                  wyniku.
                </p>
                <p>
                  <strong>4.</strong> W przypadku reklamacji uzasadnionej,
                  Usługodawca może:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>Naprawić usterkę</li>
                  <li>Przedłużyć okres Subskrypcji bez dodatkowych opłat</li>
                  <li>
                    Zwrócić proporcjonalną część opłaty za okres niedostępności
                    usługi
                  </li>
                  <li>Dodać dodatkowe Punkty AI jako rekompensatę</li>
                </ul>
              </div>
            </div>
          </section>

          {/* § 12 - USUNIĘCIE KONTA */}
          <section>
            <h2 className="text-2xl font-bold mb-4">§ 12. USUNIĘCIE KONTA</h2>

            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <div className="flex items-start gap-4">
                <UserX className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>1.</strong> Użytkownik może zażądać usunięcia Konta,
                    kontaktując się z Usługodawcą na adres:{" "}
                    <strong>kontakt@ecopywriting.pl</strong>
                  </p>
                  <p>
                    <strong>2.</strong>{" "}
                    <strong>Usunięcie Konta wymaga kontaktu email.</strong>{" "}
                    Opcja automatycznego usunięcia nie jest dostępna w panelu
                    użytkownika ze względów bezpieczeństwa.
                  </p>
                  <p>
                    <strong>3.</strong> Usunięcie Konta powoduje:
                  </p>
                  <ul className="list-disc list-inside ml-4">
                    <li>Trwałe usunięcie danych osobowych (zgodnie z RODO)</li>
                    <li>
                      Anulowanie aktywnej Subskrypcji bez zwrotu środków za
                      niewykorzystany okres
                    </li>
                    <li>Utratę dostępu do historii nauki i statystyk</li>
                    <li>Utratę niewykorzystanych Punktów AI</li>
                    <li>Utratę wszystkich osiągnięć i postępów</li>
                  </ul>
                  <p>
                    <strong>4.</strong> Dane rozliczeniowe (faktury) będą
                    przechowywane przez <strong>5 lat</strong> ze względów
                    księgowych i podatkowych (obowiązek prawny).
                  </p>
                  <p>
                    <strong>5.</strong> Usunięcie Konta jest{" "}
                    <strong>nieodwracalne</strong>. Po usunięciu nie ma
                    możliwości odzyskania danych.
                  </p>
                  <p>
                    <strong>6.</strong> Usługodawca przetworzy żądanie usunięcia
                    w ciągu <strong>30 dni</strong> od otrzymania wniosku.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* § 13 - ZMIANY W REGULAMINIE */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              § 13. ZMIANY W REGULAMINIE
            </h2>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>1.</strong> Usługodawca zastrzega sobie prawo do
                  zmiany Regulaminu z ważnych przyczyn, takich jak:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>Zmiany w przepisach prawa</li>
                  <li>Zmiany w funkcjonalnościach Platformy</li>
                  <li>Zmiany techniczne lub organizacyjne</li>
                  <li>Zwiększenie bezpieczeństwa Użytkowników</li>
                </ul>
                <p>
                  <strong>2.</strong> O zmianach w Regulaminie Użytkownicy
                  zostaną poinformowani przez email oraz powiadomienie na
                  stronie, z wyprzedzeniem <strong>14 dni</strong> przed
                  wejściem w życie zmian.
                </p>
                <p>
                  <strong>3.</strong> Jeśli Użytkownik nie akceptuje zmian, może
                  rozwiązać umowę (anulować Subskrypcję) przed datą wejścia w
                  życie nowego Regulaminu.
                </p>
                <p>
                  <strong>4.</strong> Kontynuowanie korzystania z Platformy po
                  wejściu w życie zmian oznacza akceptację nowego Regulaminu.
                </p>
                <p>
                  <strong>5.</strong> Historia wersji Regulaminu dostępna jest
                  na żądanie pod adresem: kontakt@ecopywriting.pl
                </p>
              </div>
            </div>
          </section>

          {/* § 14 - POSTANOWIENIA KOŃCOWE */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              § 14. POSTANOWIENIA KOŃCOWE
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold mb-3">14.1. Prawo właściwe</h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>1.</strong> W sprawach nieuregulowanych Regulaminem
                    zastosowanie mają przepisy <strong>prawa polskiego</strong>,
                    w szczególności:
                  </p>
                  <ul className="list-disc list-inside ml-4">
                    <li>
                      Ustawa z dnia 18 lipca 2002 r. o świadczeniu usług drogą
                      elektroniczną
                    </li>
                    <li>Ustawa z dnia 30 maja 2014 r. o prawach konsumenta</li>
                    <li>Kodeks cywilny</li>
                  </ul>
                  <p>
                    <strong>2.</strong> Spory będą rozstrzygane przez sąd
                    właściwy dla siedziby Usługodawcy, z zastrzeżeniem przepisów
                    o właściwości sądów konsumenckich.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-bold mb-3">
                  14.2. Pozasądowe rozwiązywanie sporów
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    Konsument ma prawo do skorzystania z pozasądowych sposobów
                    rozpatrywania sporów:
                  </p>
                  <ul className="list-disc list-inside ml-4">
                    <li>
                      <strong>Rzecznik Finansowy:</strong>{" "}
                      <a
                        href="https://www.rf.gov.pl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        www.rf.gov.pl
                      </a>
                    </li>
                    <li>
                      <strong>Platforma ODR UE:</strong>{" "}
                      <a
                        href="https://ec.europa.eu/consumers/odr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        ec.europa.eu/consumers/odr
                      </a>
                    </li>
                    <li>
                      <strong>
                        Wojewódzkie Inspektoraty Inspekcji Handlowej
                      </strong>
                    </li>
                    <li>
                      <strong>
                        Powiatowe (miejskie) rzecznicy konsumentów
                      </strong>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold mb-3">14.3. Dane kontaktowe</h3>
                <div className="space-y-1 text-gray-700">
                  <p>
                    <strong>eCopywriting.pl Karol Leszczyński</strong>
                  </p>
                  <p>Adres: 86-221 Papowo Biskupie</p>
                  <p>NIP: 9562203948</p>
                  <p>REGON: 340627879</p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:kontakt@ecopywriting.pl"
                      className="text-blue-600 hover:underline"
                    >
                      kontakt@ecopywriting.pl
                    </a>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold mb-3">14.4. Wejście w życie</h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>1.</strong> Niniejszy Regulamin wchodzi w życie z
                    dniem <strong>04.10.2025</strong>.
                  </p>
                  <p>
                    <strong>2.</strong> Regulamin dostępny jest nieodpłatnie na
                    stronie <strong>www.maturapolski.pl/terms</strong> w formie
                    umożliwiającej jego pobranie, utrwalenie i wydrukowanie.
                  </p>
                  <p>
                    <strong>3.</strong> W przypadku sprzeczności między różnymi
                    wersjami językowymi Regulaminu, wiążąca jest wersja polska.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Zakończenie */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mt-8">
            <p className="text-center font-semibold">
              Dziękujemy za korzystanie z platformy Matura Polski!
              <br />
              Życzymy sukcesów w nauce i powodzenia na egzaminie maturalnym.
            </p>
            <p className="text-center text-sm mt-3 text-blue-100">
              W razie pytań dotyczących Regulaminu, skontaktuj się z nami:
              kontakt@ecopywriting.pl
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

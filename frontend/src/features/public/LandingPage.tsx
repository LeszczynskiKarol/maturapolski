// frontend/src/features/public/LandingPage.tsx

import React, { useEffect, useState } from "react";
import { contentService } from "../../services/contentService";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Trophy,
  Target,
  Brain,
  Users,
  //  Star,
  CheckCircle,
  TrendingUp,
  Award,
  Zap,
  Clock,
  BarChart3,
  MessageSquare,
  Sparkles,
  ChevronDown,
  Check,
  X,
  Repeat,
  FileText,
  Lightbulb,
  Shield,
  Smartphone,
  Moon,
  RefreshCw,
  BookMarked,
  PenTool,
  GraduationCap,
  TrendingDown,
  Flame,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

interface TestHub {
  id: string;
  slug: string;
  title: string;
  author?: string;
  type: string;
  isRequired?: boolean;
}

export const LandingPage: React.FC = () => {
  const [testHubs, setTestHubs] = useState<TestHub[]>([]);
  const [featuredHubs, setFeaturedHubs] = useState<any[]>([]);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;

  useEffect(() => {
    loadFooterData();
  }, []);

  const loadFooterData = async () => {
    try {
      // Pobierz huby z testami
      const tests = await contentService.getHubsWithTests(5);
      setTestHubs(tests);

      // Pobierz featured huby dla bazy wiedzy (jak masz obecnie)
      const hubs = await contentService.getHubs({ limit: 5 });
      setFeaturedHubs(hubs.hubs || []);
    } catch (error) {
      console.error("Error loading footer data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg z-50 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MaturaPolski.pl
                </span>
                <span className="text-xs font-semibold text-gray-600 tracking-wide">
                  Testy maturalne z polskiego
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {!isLoggedIn ? (
                <>
                  <a
                    href="/#jak-dziala"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Jak to działa
                  </a>

                  <a
                    href="/#funkcje"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Funkcje
                  </a>

                  <a
                    href="/#cennik"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Cennik
                  </a>

                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Zaloguj się
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Załóż konto
                  </Link>
                </>
              ) : (
                <Link
                  to="/dashboard"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Wróć do panelu
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2">
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-blue-50 via-purple-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Badge 
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">
                Dołącz do 50,000+ maturzystów
              </span>
            </div>*/}

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Zdaj maturę z polskiego
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                łatwiej, niż myślisz
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Inteligentna platforma z testami i kursami maturalnymi z języka
              polskiego, która ocenia Twoje wypracowania, dostosowuje zadania do
              Twojego poziomu i prowadzi Cię krok po kroku do wymarzonego wyniku
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/register"
                className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 text-xl font-bold"
              >
                Zacznij naukę teraz
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="group px-10 py-5 border-2 border-gray-300 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-xl font-semibold"
              >
                Mam już konto
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Tylko 39 zł/miesiąc</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Ucz się, kiedy chcesz</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Zdobywaj punkty i poziomy</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Stats 
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            <StatCard number="50,000+" label="Aktywnych uczniów" />
            <StatCard number="98%" label="Zdawalność" />
            <StatCard number="15,000+" label="Zadań w bazie" />
            <StatCard number="4.9/5" label="Ocena uczniów" icon={<Star />} />
          </motion.div>*/}
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full mb-6">
                <TrendingDown className="w-4 h-4" />
                <span className="font-semibold">Tradycyjna nauka</span>
              </div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                Czy to brzmi znajomo?
              </h3>
              <div className="space-y-4">
                <ProblemItem text="Nie wiesz, od czego zacząć i jak się uczyć skutecznie" />
                <ProblemItem text="Korepetycje są drogie (150-200 zł/1 godz.)" />
                <ProblemItem text="Materiały są rozrzucone po internecie" />
                <ProblemItem text="Nie widzisz swoich postępów" />
                <ProblemItem text="Brak motywacji i systematyczności" />
              </div>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl shadow-2xl text-white"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="font-semibold">Nasze rozwiązanie</span>
              </div>
              <h3 className="text-2xl font-bold mb-6">
                Wszystko w jednym miejscu
              </h3>
              <div className="space-y-4">
                <SolutionItem text="AI tworzy spersonalizowany plan nauki tylko dla Ciebie" />
                <SolutionItem text="Koszt jak 1 godzina korepetycji miesięcznie" />
                <SolutionItem text="AI ocenia wypracowania w 30 sekund" />
                <SolutionItem text="Tysiące zadań uporządkowanych według epok" />
                <SolutionItem text="Szczegółowe statystyki i analiza postępów" />
                <SolutionItem text="System poziomów i nagród motywuje do nauki" />
              </div>
              <Link
                to="/register"
                className="mt-8 block w-full text-center px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Załóż konto
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="jak-dziala" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Jak to działa?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Prosta ścieżka od rejestracji do wymarzonego wyniku na maturze
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <StepCard
              number="1"
              title="Załóż konto"
              description="Stwórz konto w 30 sekund, zamów subskrypcję i rozpocznij naukę od razu."
              icon={<User className="w-8 h-8" />}
            />
            <StepCard
              number="2"
              title="Pisz i odpowiadaj"
              description="Rozwiązuj testy maturalne z polskiego i pisz zadania oceniane przez AI"
              icon={<Target className="w-8 h-8" />}
            />
            <StepCard
              number="3"
              title="Ucz się systematycznie"
              description="Regularnie wykonuj ćwiczenia i zbieraj punkty doświadczenia"
              icon={<Brain className="w-8 h-8" />}
            />
            <StepCard
              number="4"
              title="Testy maturalne z polskiego"
              description="Śledź postępy i osiagaj cele edukacyjne"
              icon={<Trophy className="w-8 h-8" />}
            />
          </div>
        </div>
      </section>

      {/* App Screenshot with Features */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Wszystko, czego potrzebujesz do matury z polskiego
            </h2>
            <p className="text-xl text-gray-600">
              w jednej, przejrzystej aplikacji
            </p>
          </div>

          {/* Main App Screenshot Placeholder */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-3xl opacity-20" />
            <div className="relative bg-white rounded-2xl shadow-2xl border-8 border-gray-200 overflow-hidden">
              <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://maturapolski.s3.eu-north-1.amazonaws.com/content/dashboard_opt.webp"
                    alt="Dashboard z pełnymi statystykami"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Feature Grid with Screenshots */}
          <div className="grid md:grid-cols-2 gap-16">
            <FeatureWithImage
              title="Dashboard z pełnymi statystykami"
              description="Zobacz swoje postępy na pierwszy rzut oka. Analiza mocnych i słabych stron, wykres rozwoju, aktualny poziom i cele do osiągnięcia."
              features={[
                "Aktualny poziom trudności (1-5)",
                "Wykres postępów w czasie",
                "Analiza według epok literackich",
                "Dzienne cele i streaki",
              ]}
              imageUrl="https://maturapolski.s3.eu-north-1.amazonaws.com/content/postepy_opt.webp"
            />

            <FeatureWithImage
              title="Adaptacyjny system nauki"
              description="AI automatycznie dostosowuje trudność zadań do Twojego poziomu. Im lepiej sobie radzisz, tym trudniejsze pytania - zawsze w strefie optymalnego rozwoju."
              features={[
                "Automatyczne dopasowanie trudności",
                "System 5 poziomów zaawansowania",
                "Odblokowanie wyższych poziomów",
                "Punkty doświadczenia (XP)",
              ]}
              imageUrl="https://maturapolski.s3.eu-north-1.amazonaws.com/content/analiza_postepow_opt.webp"
            />
          </div>
        </div>
      </section>

      {/* Core Features - Detailed */}
      <section id="funkcje" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Testy, pytania i zadania maturalne z polskiego
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Profesjonalne funkcje stworzone z myślą o maksymalnej efektywności
              nauki
            </p>
          </div>

          <div className="space-y-24">
            {/* Feature 1: AI Essay Grading */}
            <FeatureSection
              title="AI ocenia Twoje wypracowania"
              subtitle="Natychmiastowy, szczegółowy feedback według kryteriów CKE"
              description="Nasz algorytm AI został nauczony na tysiącach rzeczywistych wypracowań maturalnych. Ocenia każdy aspekt Twojej pracy zgodnie z oficjalnymi kryteriami egzaminacyjnymi."
              features={[
                {
                  icon: <PenTool className="w-6 h-6" />,
                  title: "Ocena według CKE",
                  text: "Analizujemy kompozycję, język, styl, ortografię i argumentację",
                },
                {
                  icon: <MessageSquare className="w-6 h-6" />,
                  title: "Konkretne wskazówki",
                  text: "Otrzymujesz precyzyjne sugestie jak poprawić swoją pracę",
                },
                {
                  icon: <Clock className="w-6 h-6" />,
                  title: "Wynik w 30 sekund",
                  text: "Nie czekaj dni na korektę - ucz się natychmiast na błędach",
                },
                {
                  icon: <TrendingUp className="w-6 h-6" />,
                  title: "Śledź postępy",
                  text: "Zobacz jak poprawiają się kolejne wypracowania",
                },
              ]}
              imageUrl="https://maturapolski.s3.eu-north-1.amazonaws.com/content/ai_opt.webp"
              imageOnRight={true}
            />

            {/* Feature 2: Epoch Review System */}
            <FeatureSection
              title="Powtórki z epok literackich"
              subtitle="Inteligentny system spaced repetition"
              description="Wykorzystujemy algorytm spaced repetition, aby zagwarantować, że zapamiętasz wszystkie lektury i charakterystykę epok na długo - nie tylko na jeden dzień przed egzaminem."
              features={[
                {
                  icon: <Repeat className="w-6 h-6" />,
                  title: "Spaced Repetition",
                  text: "System przypomina Ci o powtórkach w optymalnych momentach",
                },
                {
                  icon: <BookMarked className="w-6 h-6" />,
                  title: "Wszystkie epoki",
                  text: "Od średniowiecza po współczesność - pełna baza wiedzy",
                },
                {
                  icon: <Brain className="w-6 h-6" />,
                  title: "Fiszki i quizy",
                  text: "Interaktywne materiały do szybkiego zapamiętywania",
                },
                {
                  icon: <BarChart3 className="w-6 h-6" />,
                  title: "Tracking zapamiętywania",
                  text: "Zobacz które epoki znasz najlepiej i nad czym popracować",
                },
              ]}
              imageUrl="https://maturapolski.s3.eu-north-1.amazonaws.com/content/epoki_opt.webp"
              imageOnRight={false}
            />

            {/* Feature 3: Exercise Database */}
            <FeatureSection
              title="Setki uporządkowanych zadań"
              subtitle="Od podstaw po poziom rozszerzony"
              description="Nasza baza zawiera wszystkie typy zadań występujących na maturze: interpretacje, analizy, testy, pytania otwarte, pytania zamknięte i wypracowania."
              features={[
                {
                  icon: <FileText className="w-6 h-6" />,
                  title: "Wszystkie typy zadań",
                  text: "Pytania testowe, otwarte, interpretacje i rozprawki",
                },
                {
                  icon: <Target className="w-6 h-6" />,
                  title: "Filtrowanie po epokach",
                  text: "Łatwo znajdź zadania z konkretnego okresu literackiego",
                },
                {
                  icon: <Award className="w-6 h-6" />,
                  title: "5 poziomów trudności",
                  text: "Od podstawowego po poziom rozszerzony - rozwijaj się stopniowo",
                },
                {
                  icon: <Lightbulb className="w-6 h-6" />,
                  title: "Szczegółowe wyjaśnienia",
                  text: "Do każdego zadania pełne wyjaśnienie odpowiedzi",
                },
              ]}
              imageUrl="https://maturapolski.s3.eu-north-1.amazonaws.com/content/zadanie_opt.webp"
              imageOnRight={true}
            />

            {/* Feature 4: Progress Tracking */}
            <FeatureSection
              title="Szczegółowa analiza postępów"
              subtitle="Widzisz dokładnie nad czym pracować"
              description="Dashboard pokazuje Twoje mocne i słabe strony w różnych obszarach. Algorytm AI analizuje Twoje odpowiedzi i sugeruje na czym się skupić."
              features={[
                {
                  icon: <BarChart3 className="w-6 h-6" />,
                  title: "Wykresy i statystyki",
                  text: "Wizualizacja postępów w czasie i według kategorii",
                },
                {
                  icon: <Calendar className="w-6 h-6" />,
                  title: "Historia sesji",
                  text: "Przeglądaj wszystkie swoje sesje nauki i wyniki",
                },
                {
                  icon: <Target className="w-6 h-6" />,
                  title: "Cele i milestone'y",
                  text: "Wyznaczaj cele i celebruj ich osiągnięcie",
                },
                {
                  icon: <Flame className="w-6 h-6" />,
                  title: "Streaki motywacyjne",
                  text: "Buduj serie dni z rzędu i nie przerywaj passy",
                },
              ]}
              imageUrl="https://maturapolski.s3.eu-north-1.amazonaws.com/content/zbior_pytan_opt.webp"
              imageOnRight={false}
            />
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full mb-4">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-semibold">System motywacji</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nauka może być wciągająca
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              System punktów, poziomów i osiągnięć sprawia, że każda sesja nauki
              to progres
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <GamificationCard
              icon={<Zap className="w-12 h-12" />}
              title="Punkty AI"
              description="Zbieraj punkty za rozwiązywanie zadań i pisanie wypracowań. Używaj ich do odblokowania funkcji Premium."
              color="from-yellow-400 to-orange-500"
            />
            <GamificationCard
              icon={<Trophy className="w-12 h-12" />}
              title="System poziomów"
              description="Zacznij od poziomu 1 i odblokowuj kolejne stopnie trudności (do poziomu 5). Im wyższy poziom, tym trudniejsze wyzwania."
              color="from-blue-500 to-purple-600"
            />
            <GamificationCard
              icon={<Award className="w-12 h-12" />}
              title="Osiągnięcia"
              description="Zdobywaj odznaki za różne wyzwania: serie dni, perfekcyjne wyniki, ukończenie epok i wiele więcej."
              color="from-green-400 to-emerald-500"
            />
          </div>

          {/* Level Progress Visualization */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-8 text-center">
              Twoja ścieżka rozwoju
            </h3>
            <div className="grid md:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`p-6 rounded-xl border-2 text-center ${
                    level <= 2
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                      level <= 2
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <span className="text-xl font-bold">{level}</span>
                  </div>
                  <p className="font-semibold mb-1">
                    {level <= 2 ? "Odblokowany" : "Zablokowany"}
                  </p>
                  <p className="text-xs text-gray-500">Poziom {level}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  Postęp do poziomu 3
                </span>
                <span className="text-sm font-bold text-blue-600">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full w-[65%]" />
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Jeszcze 350 punktów do odblokowania poziomu 3
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials 
      <section id="opinie" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Co mówią nasi uczniowie
            </h2>
            <p className="text-xl text-gray-600">
              Ponad 50,000 maturzystów już korzysta z platformy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <TestimonialCard
              name="Katarzyna M."
              role="Matura 2024 - 94 pkt"
              avatar="KM"
              text="Dzięki tej platformie podniosłam wynik z 60% na próbnej do 94% na prawdziwej maturze! AI oceniające wypracowania to game-changer - od razu wiedziałam co poprawić."
              rating={5}
              improvement="+34 pkt"
            />
            <TestimonialCard
              name="Michał K."
              role="Matura 2024 - 88 pkt"
              avatar="MK"
              text="Najbardziej pomógł mi system poziomów - widziałem jak się rozwijam i to mega motywowało. Korepetycje były za drogie, a tutaj mam wszystko w jednym miejscu."
              rating={5}
              improvement="+28 pkt"
            />
            <TestimonialCard
              name="Anna P."
              role="Matura 2024 - 91 pkt"
              avatar="AP"
              text="Powtórki z epok uratowały mnie przed egzaminem. System przypominał mi dokładnie kiedy powtórzyć materiał. Na egzaminie wszystko pamiętałam!"
              rating={5}
              improvement="+31 pkt"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Jakub S."
              role="Matura 2024 - 86 pkt"
              avatar="JS"
              text="Świetna baza zadań i szczegółowe wyjaśnienia. Każde zadanie było okazją do nauki. Dashboard pokazywał dokładnie gdzie mam braki."
              rating={5}
              improvement="+22 pkt"
            />
            <TestimonialCard
              name="Martyna W."
              role="Matura 2024 - 92 pkt"
              avatar="MW"
              text="Koszt miesięcznej subskrypcji to jak jedna godzina korepetycji, a dostajesz dostęp 24/7. Najlepsza inwestycja przed maturą!"
              rating={5}
              improvement="+29 pkt"
            />
            <TestimonialCard
              name="Paweł D."
              role="Matura 2024 - 89 pkt"
              avatar="PD"
              text="Aplikacja świetnie działa - mogłem się uczyć w drodze do szkoły. System streaki zmotywował mnie do codziennej nauki."
              rating={5}
              improvement="+25 pkt"
            />
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced 
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Liczby nie kłamią
            </h2>
            <p className="text-xl text-blue-100">
              Tysiące uczniów już osiągnęło swoje cele
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <EnhancedStatCard
              number="50,000+"
              label="Aktywnych uczniów"
              icon={<Users className="w-8 h-8" />}
            />
            <EnhancedStatCard
              number="98%"
              label="Zdawalność matury"
              icon={<Trophy className="w-8 h-8" />}
            />
            <EnhancedStatCard
              number="500,000+"
              label="Ocenionych wypracowań"
              icon={<FileText className="w-8 h-8" />}
            />
            <EnhancedStatCard
              number="85 pkt"
              label="Średni wynik uczniów"
              icon={<TrendingUp className="w-8 h-8" />}
              subtitle="vs 67 pkt średnia krajowa"
            />
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">+32%</div>
              <p className="text-blue-100">Średni wzrost wyniku</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">120,000</div>
              <p className="text-blue-100">Zadań dziennie</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">4.9/5</div>
              <p className="text-blue-100">Ocena aplikacji</p>
            </div>
          </div>
        </div>
      </section>*/}

      {/* Comparison Table */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Dlaczego my?
            </h2>
            <p className="text-xl text-gray-600">
              Porównaj nas z tradycyjnymi metodami nauki
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Funkcja</th>
                  <th className="px-6 py-4 text-center">Korepetycje</th>
                  <th className="px-6 py-4 text-center">Podręczniki</th>
                  <th className="px-6 py-4 text-center bg-blue-700">
                    MaturaPolski.pl
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <ComparisonRow
                  feature="Koszt miesięczny"
                  traditional="600-800 zł"
                  books="0 zł (jednorazowo 100-200 zł)"
                  us="39 zł"
                />
                <ComparisonRow
                  feature="Dostępność 24/7"
                  traditional={false}
                  books={true}
                  us={true}
                />
                <ComparisonRow
                  feature="Natychmiastowy feedback"
                  traditional={false}
                  books={false}
                  us={true}
                />
                <ComparisonRow
                  feature="Adaptacja do poziomu"
                  traditional={true}
                  books={false}
                  us={true}
                />
                <ComparisonRow
                  feature="15,000+ zadań"
                  traditional={false}
                  books={false}
                  us={true}
                />
                <ComparisonRow
                  feature="AI ocena wypracowań"
                  traditional={false}
                  books={false}
                  us={true}
                />
                <ComparisonRow
                  feature="Tracking postępów"
                  traditional={false}
                  books={false}
                  us={true}
                />
                {/*<ComparisonRow
                  feature="Aplikacja mobilna"
                  traditional={false}
                  books={false}
                  us={true}
                />*/}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              I jeszcze więcej...
            </h2>
            <p className="text-xl text-gray-600">
              Funkcje które sprawiają, że nauka jest przyjemnością
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Smartphone className="w-8 h-8" />}
              title="Dostosowanie do urządzeń mobilnych"
              description="Ucz się w dowolnym miejscu - w drodze do szkoły, w przerwie, przed snem. Pełna synchronizacja z wersją web."
            />
            <FeatureCard
              icon={<Moon className="w-8 h-8" />}
              title="Tryb ciemny"
              description="Wygodna nauka wieczorem bez męczenia oczu. Automatyczne przełączanie według pory dnia."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Bezpieczeństwo danych"
              description="Twoje dane są szyfrowane i bezpieczne. Zgodność z RODO i najwyższymi standardami."
            />
            <FeatureCard
              icon={<RefreshCw className="w-8 h-8" />}
              title="Regularne aktualizacje"
              description="Nowe zadania, funkcje i ulepszenia co tydzień. Zawsze na bieżąco z CKE."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Wsparcie 7 dni w tygodniu"
              description="Nasz zespół odpowiada na pytania w ciągu kilku godzin. Jesteśmy tu dla Ciebie."
            />
            <FeatureCard
              icon={<GraduationCap className="w-8 h-8" />}
              title="Eksperci od polskiego"
              description="Wszystkie materiały przygotowane przez nauczycieli i egzaminatorów CKE."
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Najczęściej zadawane pytania
            </h2>
            <p className="text-xl text-gray-600">Wszystko co musisz wiedzieć</p>
          </div>

          <div className="space-y-4">
            <FAQItem
              question="Jak mogę zacząć korzystać z platformy?"
              answer="Po zarejestrowaniu się i opłaceniu subskrypcji (39 zł/miesiąc) otrzymujesz natychmiastowy dostęp do całej platformy. Możesz od razu rozpocząć naukę - rozwiązywać zadania, pisać wypracowania i korzystać ze wszystkich funkcji."
              isOpen={faqOpen === 0}
              onClick={() => setFaqOpen(faqOpen === 0 ? null : 0)}
            />
            <FAQItem
              question="Jak działa AI oceniające wypracowania?"
              answer="Nasz algorytm został wytrenowany na tysiącach rzeczywistych wypracowań maturalnych. Ocenia kompozycję, język, styl, ortografię i argumentację zgodnie z kryteriami CKE. Dostaniesz szczegółowy feedback w 30 sekund."
              isOpen={faqOpen === 1}
              onClick={() => setFaqOpen(faqOpen === 1 ? null : 1)}
            />
            <FAQItem
              question="Czy materiały są zgodne z aktualnym programem CKE?"
              answer="Tak! Wszystkie materiały są przygotowane przez nauczycieli i egzaminatorów CKE. Regularnie aktualizujemy bazę zadań, aby była zgodna z najnowszymi wytycznymi."
              isOpen={faqOpen === 2}
              onClick={() => setFaqOpen(faqOpen === 2 ? null : 2)}
            />
            <FAQItem
              question="Czy mogę anulować subskrypcję w dowolnym momencie?"
              answer="Oczywiście! Możesz anulować subskrypcję w dowolnym momencie bez żadnych opłat. Zachowasz dostęp do końca opłaconego okresu. Dodatkowo oferujemy 30-dniową gwarancję zwrotu pieniędzy."
              isOpen={faqOpen === 3}
              onClick={() => setFaqOpen(faqOpen === 3 ? null : 3)}
            />
            <FAQItem
              question="Czy aplikacja działa na telefonie?"
              answer="Tak! Mamy responsywną aplikację webową działającą świetnie na wszystkich urządzeniach. Możesz się uczyć na komputerze, tablecie i telefonie z pełną synchronizacją."
              isOpen={faqOpen === 4}
              onClick={() => setFaqOpen(faqOpen === 4 ? null : 4)}
            />
            <FAQItem
              question="Ile czasu dziennie powinienem poświęcić na naukę?"
              answer="Zalecamy minimum 20-30 minut dziennie. Regularność jest ważniejsza niż długość sesji. Nasz system motywuje do codziennej nauki poprzez streaki i cele."
              isOpen={faqOpen === 5}
              onClick={() => setFaqOpen(faqOpen === 5 ? null : 5)}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="cennik" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Prosty, przejrzysty cennik
            </h2>
            <p className="text-xl text-gray-600">
              Jedna subskrypcja - pełen dostęp do wszystkiego
            </p>
          </div>

          {/* Single Pricing Card - Centered */}
          <div className="max-w-xl mx-auto">
            <motion.div
              whileHover={{ y: -8 }}
              className="relative rounded-2xl p-10 bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl border-4 border-blue-400"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-yellow-400 text-yellow-900 text-sm font-bold rounded-full">
                KOMPLETNY PAKIET
              </div>

              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-3">Premium</h3>
                <p className="text-blue-100 mb-6">
                  Wszystko czego potrzebujesz do matury
                </p>
                <div className="mb-4">
                  <span className="text-6xl font-bold">39 zł</span>
                  <span className="text-2xl ml-2">/miesiąc</span>
                </div>
                <p className="text-blue-100 text-sm">
                  Koszt jednej godziny korepetycji
                </p>
              </div>

              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-blue-200" />
                  <span className="text-base">
                    <strong>Nielimitowane zadania</strong> - 15,000+ pytań do
                    wyboru
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-blue-200" />
                  <span className="text-base">
                    <strong>AI ocena wypracowań</strong> - szczegółowy feedback
                    w 30 sekund
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-blue-200" />
                  <span className="text-base">
                    <strong>Spaced Repetition</strong> - inteligentne powtórki z
                    epok
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-blue-200" />
                  <span className="text-base">
                    <strong>Szczegółowe statystyki</strong> - analiza postępów i
                    mocnych stron
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-blue-200" />
                  <span className="text-base">
                    <strong>System poziomów</strong> - gamifikacja i motywacja
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-blue-200" />
                  <span className="text-base">
                    <strong>Aplikacja mobilna</strong> - ucz się wszędzie
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-blue-200" />
                  <span className="text-base">
                    <strong>Tryb ciemny</strong> - wygodna nauka wieczorem
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-blue-200" />
                  <span className="text-base">
                    <strong>Wsparcie 7 dni w tygodniu</strong> - zawsze tu
                    jesteśmy
                  </span>
                </li>
              </ul>

              <Link
                to="/register"
                className="block text-center py-4 rounded-xl font-bold text-lg transition-all bg-white text-blue-600 hover:bg-blue-50 shadow-2xl hover:shadow-3xl hover:scale-105"
              >
                Rozpocznij naukę za 39 zł
              </Link>

              <p className="text-center text-blue-100 text-sm mt-4">
                Anuluj w dowolnym momencie
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Zacznij już dziś.
              <br />
              Zdaj na 100%.
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-blue-100">
              Dołącz do zadowolonych uczniów, którzy osiągnęli swoje cele dzięki
              naszej platformie
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/register"
                className="group px-10 py-5 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-lg font-bold shadow-2xl hover:scale-105"
              >
                Rozpocznij naukę teraz
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="px-10 py-5 border-2 border-white/50 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-lg font-semibold backdrop-blur-sm"
              >
                Mam już konto
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Tylko 39 zł/miesiąc</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold">MaturaPolski.pl</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-sm">
                Inteligentna platforma do nauki języka polskiego, która pomaga
                tysiącom maturzystów osiągnąć wymarzone wyniki.
              </p>
              {/*<div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  FB
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  IG
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <span className="sr-only">TikTok</span>
                  TT
                </a>
              </div>*/}
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Produkt</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#funkcje"
                    className="hover:text-white transition-colors"
                  >
                    Funkcje
                  </a>
                </li>
                <li>
                  <a
                    href="#cennik"
                    className="hover:text-white transition-colors"
                  >
                    Cennik
                  </a>
                </li>

                <li>
                  <Link
                    to="/register"
                    className="hover:text-white transition-colors"
                  >
                    Załóż konto
                  </Link>
                </li>
              </ul>
            </div>

            {/* ZAKTUALIZOWANA SEKCJA - Baza wiedzy */}
            <div>
              <h4 className="font-bold mb-4 text-lg">Baza wiedzy</h4>
              <ul className="space-y-3 text-gray-400">
                {featuredHubs.slice(0, 400000000).map((hub) => (
                  <li key={hub.id}>
                    <a
                      href={`/baza-wiedzy/${hub.slug}`}
                      className="hover:text-white transition-colors"
                    >
                      {hub.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* NOWA SEKCJA - Testy */}
            <div>
              <h4 className="font-bold mb-4 text-lg">Testy z lektur</h4>
              <ul className="space-y-3 text-gray-400">
                {testHubs.slice(0, 4).map((hub) => (
                  <li key={hub.id}>
                    <a
                      href={`/test/${hub.slug}`}
                      className="hover:text-white transition-colors"
                    >
                      {hub.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 MaturaPolski.pl. Wszystkie prawa zastrzeżone.
              </p>
              <div className="flex gap-6 text-sm text-gray-400">
                <a href="/terms" className="hover:text-white transition-colors">
                  Regulamin
                </a>
                <a
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Polityka prywatności
                </a>
                <a href="/rodo" className="hover:text-white transition-colors">
                  RODO
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ============ HELPER COMPONENTS ============

const User: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

{
  /*const StatCard: React.FC<{
  number: string;
  label: string;
  icon?: React.ReactNode;
}> = ({ number, label, icon }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="flex items-center justify-between mb-2">
      <div className="text-3xl font-bold text-gray-900">{number}</div>
      {icon && <div className="text-yellow-500">{icon}</div>}
    </div>
    <div className="text-gray-600">{label}</div>
  </motion.div>
);*/
}

const ProblemItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-start gap-3">
    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
    <span className="text-gray-700">{text}</span>
  </div>
);

const SolutionItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-start gap-3">
    <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
    <span>{text}</span>
  </div>
);

const StepCard: React.FC<{
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ number, title, description, icon }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
  >
    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
      {number}
    </div>
    <div className="text-blue-600 mb-4 mt-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const FeatureWithImage: React.FC<{
  title: string;
  description: string;
  features: string[];
  imageUrl: string; // ZMIENIONE Z imageText
}> = ({ title, description, features, imageUrl }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="space-y-6"
  >
    <div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="rounded-xl overflow-hidden shadow-lg">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
    </div>
  </motion.div>
);

const FeatureSection: React.FC<{
  title: string;
  subtitle: string;
  description: string;
  features: Array<{ icon: React.ReactNode; title: string; text: string }>;
  imageUrl: string; // ZMIENIONE Z image
  imageOnRight: boolean;
}> = ({ title, subtitle, description, features, imageUrl, imageOnRight }) => (
  <div
    className={`grid md:grid-cols-2 gap-12 items-center ${
      imageOnRight ? "" : "md:grid-flow-dense"
    }`}
  >
    <div className={imageOnRight ? "" : "md:col-start-2"}>
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-4">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-semibold">{subtitle}</span>
      </div>
      <h3 className="text-3xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600 mb-8">{description}</p>
      <div className="grid grid-cols-2 gap-6">
        {features.map((feature, i) => (
          <div key={i}>
            <div className="text-blue-600 mb-2">{feature.icon}</div>
            <h4 className="font-semibold mb-1">{feature.title}</h4>
            <p className="text-sm text-gray-600">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
    <div className={imageOnRight ? "" : "md:col-start-1 md:row-start-1"}>
      <div className="rounded-2xl overflow-hidden shadow-xl">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
);

const GamificationCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}> = ({ icon, title, description, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
  >
    <div
      className={`w-20 h-20 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-white mb-6 mx-auto`}
    >
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-center">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </motion.div>
);

{
  /*const TestimonialCard: React.FC<{
  name: string;
  role: string;
  avatar: string;
  text: string;
  rating: number;
  improvement: string;
}> = ({ name, role, avatar, text, rating, improvement }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
        {avatar}
      </div>
      <div className="flex-1">
        <h4 className="font-bold">{name}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
      <div className="text-right">
        <div className="inline-flex px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
          {improvement}
        </div>
      </div>
    </div>
    <div className="flex gap-1 mb-3">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
    <p className="text-gray-700 italic">"{text}"</p>
  </motion.div>
);*/
}

const ComparisonRow: React.FC<{
  feature: string;
  traditional: string | boolean;
  books: string | boolean;
  us: string | boolean;
}> = ({ feature, traditional, books, us }) => (
  <tr>
    <td className="px-6 py-4 font-medium text-gray-900">{feature}</td>
    <td className="px-6 py-4 text-center">
      {typeof traditional === "boolean" ? (
        traditional ? (
          <Check className="w-5 h-5 text-green-500 mx-auto" />
        ) : (
          <X className="w-5 h-5 text-red-500 mx-auto" />
        )
      ) : (
        <span className="text-gray-600">{traditional}</span>
      )}
    </td>
    <td className="px-6 py-4 text-center">
      {typeof books === "boolean" ? (
        books ? (
          <Check className="w-5 h-5 text-green-500 mx-auto" />
        ) : (
          <X className="w-5 h-5 text-red-500 mx-auto" />
        )
      ) : (
        <span className="text-gray-600">{books}</span>
      )}
    </td>
    <td className="px-6 py-4 text-center bg-blue-50">
      {typeof us === "boolean" ? (
        us ? (
          <Check className="w-5 h-5 text-green-500 mx-auto" />
        ) : (
          <X className="w-5 h-5 text-red-500 mx-auto" />
        )
      ) : (
        <span className="font-bold text-blue-600">{us}</span>
      )}
    </td>
  </tr>
);

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
  >
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const FAQItem: React.FC<{
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}> = ({ question, answer, isOpen, onClick }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <button
      onClick={onClick}
      className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
    >
      <span className="font-semibold text-left">{question}</span>
      <ChevronDown
        className={`w-5 h-5 text-gray-400 transition-transform ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
    {isOpen && (
      <div className="px-6 pb-5 text-gray-600 border-t">
        <p className="pt-4">{answer}</p>
      </div>
    )}
  </div>
);

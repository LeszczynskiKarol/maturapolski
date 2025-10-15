// frontend/src/features/content/HubTestLandingPage.tsx

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Trophy,
  Target,
  Clock,
  Brain,
  Zap,
  FileText,
  TrendingUp,
} from "lucide-react";
import { PublicLayout } from "../../components/PublicLayout";
import { contentService } from "../../services/contentService";
import { useAuthStore } from "../../store/authStore";

interface HubTestLandingData {
  hub: {
    id: string;
    slug: string;
    title: string;
    type: string;
    description?: string;
    author?: string;
    epoch?: string;
    imageUrl?: string;
    year?: number;
    genre?: string;
    isRequired?: boolean;
    metaTitle?: string;
    metaDescription?: string;
    pages: Array<{
      id: string;
      title: string;
      slug: string;
    }>;
  };
  stats: {
    exerciseCount: number;
    avgRating: number;
    ratingsCount: number;
    pagesCount: number;
  };
}

export function HubTestLandingPage() {
  const { hubSlug } = useParams<{ hubSlug: string }>();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;

  const [data, setData] = useState<HubTestLandingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hubSlug) {
      loadData();
    }
  }, [hubSlug]);

  const loadData = async () => {
    try {
      const response = await contentService.getHubTestLandingData(hubSlug!);
      setData(response);
    } catch (error) {
      console.error("Error loading hub test landing data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartTest = () => {
    if (isLoggedIn) {
      // Przekieruj do sesji nauki z filtrem na tę lekturę
      navigate(`/learning?work=${encodeURIComponent(data?.hub.title || "")}`);
    } else {
      navigate("/register");
    }
  };

  if (loading) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Ładowanie...</p>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (!data) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Nie znaleziono</h2>
            <Link
              to="/baza-wiedzy"
              className="text-blue-600 hover:text-blue-800"
            >
              Wróć do bazy wiedzy
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const { hub, stats } = data;

  // Typy tekstów
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "LITERARY_WORK":
        return "lektury";
      case "EPOCH":
        return "epoki";
      case "AUTHOR":
        return "autora";
      case "THEME":
        return "motywu";
      default:
        return "tematu";
    }
  };

  const typeLabel = getTypeLabel(hub.type);

  const shouldShowTest = hub.type === "LITERARY_WORK" || hub.type === "EPOCH";

  return (
    <PublicLayout>
      <Helmet>
        <title>
          {hub.metaTitle ||
            `${hub.title} - test: powtórka i sprawdzian wiedzy na maturę`}
        </title>
        <meta
          name="description"
          content={
            hub.metaDescription ||
            `Sprawdź swoją wiedzę z ${hub.title}${
              hub.author ? ` (${hub.author})` : ""
            }. Profesjonalny test maturalny z ${typeLabel} - pytania zamknięte, otwarte i wypracowania. Natychmiastowa ocena AI.`
          }
        />
      </Helmet>

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

              <div className="flex items-center gap-4">
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors hidden sm:block"
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
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Mój panel
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-16 pb-20 px-4 bg-gradient-to-b from-blue-50 via-purple-50 to-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
                <Target className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  Sprawdzian z {typeLabel} przed maturą
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-blue-600">{hub.title}</span> - test wiedzy
                <br />
              </h1>

              {hub.author && (
                <p className="text-2xl text-gray-600 mb-4">{hub.author}</p>
              )}

              <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Profesjonalny quiz i sprawdzian z lektury przygotowany według
                kryteriów CKE. Pytania zamknięte, otwarte i wypracowania
                oceniane przez AI w 30 sekund.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                {shouldShowTest && (
                  <button
                    onClick={handleStartTest}
                    className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 text-xl font-bold"
                  >
                    {isLoggedIn ? (
                      <>
                        Rozpocznij test
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    ) : (
                      <>
                        Załóż konto i zacznij
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
                {stats.exerciseCount > 0 && (
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <span>{stats.exerciseCount} zadań</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span>Wynik w 30 sekund</span>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              <StatCard
                icon={<FileText className="w-6 h-6" />}
                number={
                  stats.exerciseCount > 0 ? `${stats.exerciseCount}+` : "100+"
                }
                label="Pytań"
              />
              <StatCard
                icon={<Brain className="w-6 h-6" />}
                number="AI"
                label="Ocena wypracowań"
              />
              <StatCard
                icon={<Trophy className="w-6 h-6" />}
                number="98%"
                label="Zdawalność"
              />
              <StatCard
                icon={<Clock className="w-6 h-6" />}
                number="30s"
                label="Czas oceny"
              />
            </motion.div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Co zawiera test?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Kompleksowe przygotowanie do matury i sprawdzianu z języka
                polskiego
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Target className="w-8 h-8" />}
                title="Pytania zamknięte"
                description="Jednokrotnego i wielokrotnego wyboru - sprawdź znajomość faktów, postaci, motywów i kontekstu historycznoliterackiego."
                color="from-blue-500 to-blue-600"
              />
              <FeatureCard
                icon={<FileText className="w-8 h-8" />}
                title="Pytania otwarte"
                description="Krótkie odpowiedzi wymagające interpretacji i analizy. Rozwijaj umiejętność precyzyjnego formułowania myśli."
                color="from-purple-500 to-purple-600"
              />
              <FeatureCard
                icon={<Brain className="w-8 h-8" />}
                title="Wypracowania"
                description="Pełne rozprawki i interpretacje oceniane przez AI według kryteriów CKE. Feedback w 30 sekund."
                color="from-pink-500 to-pink-600"
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Jak to działa?
              </h2>
              <p className="text-xl text-gray-600">3 proste kroki do sukcesu</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <StepCard
                number="1"
                title="Rozpocznij test"
                description={`${
                  isLoggedIn ? "Kliknij 'Rozpocznij test'" : "Załóż konto"
                }, zamów subskrypcję i rozpocznij naukę w ramach powtórki z lektury. Odpowiadaj na pytania i przygotuj się do matury.`}
                icon={<Zap className="w-8 h-8" />}
              />
              <StepCard
                number="2"
                title="Odpowiadaj i ucz się"
                description="Rozwiązuj pytania, pisz wypracowania. Po każdym zadaniu otrzymujesz szczegółową ocenę wraz z wyjaśnieniami."
                icon={<Brain className="w-8 h-8" />}
              />
              <StepCard
                number="3"
                title="Zobacz postępy"
                description="Śledź swoje wyniki, mocne i słabe strony. Algorytm AI dostosowuje trudność do Twojego poziomu."
                icon={<TrendingUp className="w-8 h-8" />}
              />
            </div>
          </div>
        </section>

        {/* Why This Test */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Dlaczego nasz test?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <BenefitItem
                  icon={<CheckCircle className="w-6 h-6 text-green-500" />}
                  title="Zgodność z CKE"
                  text="Wszystkie pytania przygotowane według aktualnych wytycznych Centralnej Komisji Egzaminacyjnej"
                />
                <BenefitItem
                  icon={<CheckCircle className="w-6 h-6 text-green-500" />}
                  title="AI feedback w 30 sekund"
                  text="Nie czekaj dni na korektę wypracowań - ucz się natychmiast na błędach"
                />
                <BenefitItem
                  icon={<CheckCircle className="w-6 h-6 text-green-500" />}
                  title="Adaptacyjny system"
                  text="Im lepiej sobie radzisz, tym trudniejsze pytania - zawsze w strefie rozwoju"
                />
                <BenefitItem
                  icon={<CheckCircle className="w-6 h-6 text-green-500" />}
                  title="Dostęp 24/7"
                  text="Ucz się, kiedy chcesz - rano, wieczorem, w drodze do szkoły"
                />
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Tylko 39 zł/miesiąc</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Nielimitowany dostęp do wszystkich testów</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>AI ocena wypracowań</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Szczegółowe statystyki</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>System poziomów i nagród</span>
                  </li>
                </ul>

                {shouldShowTest && (
                  <button
                    onClick={handleStartTest}
                    className="w-full py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                  >
                    {isLoggedIn ? "Rozpocznij test" : "Załóż konto"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Materials 
        {hub.pages && hub.pages.length > 0 && (
          <section className="py-20 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Materiały pomocnicze
                </h2>
                <p className="text-gray-600">
                  Przygotuj się jeszcze lepiej z naszymi opracowaniami
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {hub.pages.slice(0, 6).map((page) => (
                  <Link
                    key={page.id}
                    to={`/baza-wiedzy/${hub.slug}/${page.slug}`}
                    className="block bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">{page.title}</h3>
                        <span className="text-sm text-blue-600 hover:text-blue-800">
                          Czytaj więcej →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link
                  to={`/baza-wiedzy/${hub.slug}`}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Zobacz wszystkie materiały
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}*/}

        {/* Final CTA */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                {hub.title} - powtórka z lektury
              </h2>
              <p className="text-xl md:text-2xl mb-10 text-blue-100">
                {isLoggedIn
                  ? "Rozpocznij test teraz"
                  : "Załóż konto i rozpocznij test"}
              </p>

              {shouldShowTest && (
                <button
                  onClick={handleStartTest}
                  className="px-12 py-6 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all text-xl font-bold shadow-2xl hover:scale-105 inline-flex items-center gap-3"
                >
                  {isLoggedIn ? "Rozpocznij test" : "Zacznij za 39 zł/mies"}
                  <ArrowRight className="w-6 h-6" />
                </button>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}

// ============ HELPER COMPONENTS ============

const StatCard: React.FC<{
  icon: React.ReactNode;
  number: string;
  label: string;
}> = ({ icon, number, label }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="text-blue-600 mb-3 flex justify-center">{icon}</div>
    <div className="text-3xl font-bold text-gray-900 mb-1 text-center">
      {number}
    </div>
    <div className="text-gray-600 text-center">{label}</div>
  </motion.div>
);

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}> = ({ icon, title, description, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all"
  >
    <div
      className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-white mb-6`}
    >
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const StepCard: React.FC<{
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ number, title, description, icon }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all"
  >
    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
      {number}
    </div>
    <div className="text-blue-600 mb-4 mt-4">{icon}</div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const BenefitItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  text: string;
}> = ({ icon, title, text }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  </div>
);

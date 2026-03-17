// frontend/src/features/content/HubTestLandingPage.tsx

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Target,
  Clock,
  Brain,
  FileText,
  TrendingUp,
  ShieldCheck,
  BarChart3,
  Sparkles,
  GraduationCap,
  ListChecks,
  PenTool,
  MessageSquare,
  Layers,
  Award,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import { PublicLayout } from "../../components/PublicLayout";
import { contentService } from "../../services/contentService";
import { useAuthStore } from "../../store/authStore";

interface TestLandingData {
  id: string;
  slug: string;
  work: string;
  title: string;
  description?: string;
  imageUrl?: string;
  author?: string;
  epoch?: string;
  isRequired?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  views: number;
  stats: {
    exerciseCount: number;
    difficultyBreakdown: Array<{ difficulty: number; count: number }>;
    typeBreakdown: Array<{ type: string; count: number }>;
  };
  relatedKnowledgeBase?: {
    slug: string;
    title: string;
  } | null;
}

// Mapowanie typów ćwiczeń na polskie nazwy
const exerciseTypeLabels: Record<string, string> = {
  CLOSED_SINGLE: "Jednokrotnego wyboru",
  CLOSED_MULTIPLE: "Wielokrotnego wyboru",
  SHORT_ANSWER: "Krótka odpowiedź",
  ESSAY: "Wypracowanie",
  SYNTHESIS_NOTE: "Notatka syntetyzująca",
};

const exerciseTypeDescriptions: Record<string, string> = {
  CLOSED_SINGLE:
    "Wybierz jedną poprawną odpowiedź spośród czterech propozycji. Sprawdź znajomość faktów, postaci i wydarzeń.",
  CLOSED_MULTIPLE:
    "Zaznacz wszystkie poprawne odpowiedzi. Ćwicz umiejętność analizy wieloaspektowych zagadnień literackich.",
  SHORT_ANSWER:
    "Sformułuj zwięzłą odpowiedź własnymi słowami. Rozwijaj umiejętność precyzyjnego wyrażania myśli.",
  ESSAY:
    "Napisz pełne wypracowanie oceniane przez AI według kryteriów CKE. Otrzymaj szczegółowy feedback w 30 sekund.",
  SYNTHESIS_NOTE:
    "Połącz informacje z różnych źródeł w spójną notatkę. Ćwicz umiejętność syntezy wymaganą na maturze.",
};

const exerciseTypeIcons: Record<string, React.ReactNode> = {
  CLOSED_SINGLE: <ListChecks className="w-6 h-6" />,
  CLOSED_MULTIPLE: <Layers className="w-6 h-6" />,
  SHORT_ANSWER: <PenTool className="w-6 h-6" />,
  ESSAY: <FileText className="w-6 h-6" />,
  SYNTHESIS_NOTE: <MessageSquare className="w-6 h-6" />,
};

// Mapowanie trudności
const difficultyLabels: Record<number, string> = {
  1: "Podstawowy",
  2: "Łatwy",
  3: "Średni",
  4: "Trudny",
  5: "Ekspert",
};

const difficultyColors: Record<number, string> = {
  1: "bg-green-100 text-green-700",
  2: "bg-blue-100 text-blue-700",
  3: "bg-yellow-100 text-yellow-700",
  4: "bg-orange-100 text-orange-700",
  5: "bg-red-100 text-red-700",
};

// Epoki literackie
const epochLabels: Record<string, string> = {
  ANTIQUITY: "Starożytność",
  MIDDLE_AGES: "Średniowiecze",
  RENAISSANCE: "Renesans",
  BAROQUE: "Barok",
  ENLIGHTENMENT: "Oświecenie",
  ROMANTICISM: "Romantyzm",
  POSITIVISM: "Pozytywizm",
  YOUNG_POLAND: "Młoda Polska",
  INTERWAR: "Dwudziestolecie międzywojenne",
  CONTEMPORARY: "Współczesność",
};

export function HubTestLandingPage() {
  const { hubSlug } = useParams<{ hubSlug: string }>();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;

  const [data, setData] = useState<TestLandingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (hubSlug) {
      loadData();
    }
  }, [hubSlug]);

  const loadData = async () => {
    try {
      const response = await contentService.getTestLanding(hubSlug!);
      setData(response);
    } catch (error) {
      console.error("Error loading test landing data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartTest = () => {
    if (isLoggedIn) {
      navigate(`/learning?work=${encodeURIComponent(data?.work || "")}`);
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
            <h2 className="text-2xl font-bold mb-4">Nie znaleziono testu</h2>
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              Wróć na stronę główną
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const epochLabel = data.epoch ? epochLabels[data.epoch] || data.epoch : null;

  // Dynamiczne SEO
  const seoTitle =
    data.metaTitle ||
    `${data.title} - Test z Lektury Online | Quiz, Pytania i Sprawdzian Wiedzy`;

  const seoDescription =
    data.metaDescription ||
    `✓ Test z lektury ${data.title}${data.author ? ` (${data.author})` : ""} online ✓ ${data.stats.exerciseCount}+ pytań ✓ Pytania zamknięte, otwarte i wypracowania ✓ Ocena AI w 30 sekund ✓ Przygotuj się do matury 2025/2026!`;

  const seoKeywords = [
    `test ${data.title}`,
    `quiz ${data.title}`,
    `${data.title} pytania`,
    `${data.title} sprawdzian`,
    `${data.title} test wiedzy`,
    `test z lektury ${data.title}`,
    `${data.title} matura`,
    `${data.title} pytania i odpowiedzi`,
    data.author ? `${data.author} test` : "",
    "test maturalny z polskiego",
    "quiz z lektury online",
  ]
    .filter(Boolean)
    .join(", ");

  // Structured data JSON-LD
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: `Test z lektury: ${data.title}`,
    description: seoDescription,
    educationalLevel: "Szkoła średnia / Matura",
    about: {
      "@type": "Book",
      name: data.title,
      ...(data.author
        ? { author: { "@type": "Person", name: data.author } }
        : {}),
    },
    provider: {
      "@type": "Organization",
      name: "MaturaPolski.pl",
      url: "https://www.maturapolski.pl",
    },
    numberOfQuestions: data.stats.exerciseCount,
    educationalUse: "Przygotowanie do matury",
    inLanguage: "pl",
    isAccessibleForFree: false,
    url: `https://www.maturapolski.pl/test/${data.slug}`,
  };

  // FAQ structured data
  const faqItems = [
    {
      q: `Ile pytań zawiera test z lektury?`,
      a: `Test zawiera ${data.stats.exerciseCount}+ starannie przygotowanych pytań o różnym poziomie trudności — od podstawowego po ekspercki. Pytania obejmują zagadnienia wymagane na maturze z języka polskiego.`,
    },
    {
      q: `Jakie rodzaje pytań znajdę w teście?`,
      a: `Test zawiera pytania zamknięte jednokrotnego i wielokrotnego wyboru, pytania otwarte wymagające krótkiej odpowiedzi oraz pełne wypracowania (rozprawki i interpretacje) oceniane przez sztuczną inteligencję.`,
    },
    {
      q: `Czy test jest zgodny z wymaganiami CKE?`,
      a: `Tak. Wszystkie pytania są przygotowane zgodnie z aktualnymi wymaganiami egzaminacyjnymi Centralnej Komisji Egzaminacyjnej. Typy zadań i kryteria oceny odpowiadają tym stosowanym na maturze z języka polskiego.`,
    },
    {
      q: `Jak działa ocena wypracowań przez AI?`,
      a: `Sztuczna inteligencja analizuje Twoje wypracowanie według 4 kryteriów CKE: treść, kompozycja, język i zapis. Otrzymujesz szczegółowy feedback z oceną punktową i konkretnymi wskazówkami do poprawy — wszystko w ciągu 30 sekund.`,
    },
    {
      q: `Czy mogę korzystać z testu za darmo?`,
      a: `Rejestracja jest darmowa i daje dostęp do wybranych pytań zamkniętych. Pełny dostęp do wszystkich pytań, wypracowań z oceną AI i szczegółowych statystyk wymaga subskrypcji Premium za 39 zł/miesiąc.`,
    },
    {
      q: `Czy test dostosowuje się do mojego poziomu?`,
      a: `Tak. Adaptacyjny algorytm analizuje Twoje odpowiedzi i automatycznie dobiera trudność pytań. Im lepiej sobie radzisz, tym trudniejsze zadania otrzymujesz — dzięki temu zawsze uczysz się w swojej strefie rozwoju.`,
    },
  ];

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <PublicLayout
      title={seoTitle}
      description={seoDescription}
      keywords={seoKeywords}
      canonicalUrl={`https://www.maturapolski.pl/test/${data.slug}`}
    >
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="bg-white">
        {/* ===================== HERO ===================== */}
        <section className="pt-4 pb-20 px-4 bg-gradient-to-b from-blue-50 via-purple-50 to-white relative overflow-hidden">
          {/* Dekoracyjne tło */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          </div>

          <div className="max-w-7xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              {/* Breadcrumbs SEO */}
              <nav aria-label="breadcrumb" className="mb-6">
                <ol className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <li>
                    <Link to="/" className="hover:text-blue-600">
                      Strona główna
                    </Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link to="/test" className="hover:text-blue-600">
                      Testy z lektur
                    </Link>
                  </li>
                  <li>/</li>
                  <li className="text-gray-700 font-medium">{data.title}</li>
                </ol>
              </nav>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  <Target className="w-4 h-4" />
                  Test maturalny
                </span>
                {data.isRequired && (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    Lektura obowiązkowa
                  </span>
                )}
                {epochLabel && (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    <BookOpen className="w-4 h-4" />
                    {epochLabel}
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
                Test z lektury:{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {data.title}
                </span>
              </h1>

              {data.author && (
                <p className="text-xl md:text-2xl text-gray-500 mb-2">
                  {data.author}
                  {epochLabel && (
                    <span className="text-gray-400"> · {epochLabel}</span>
                  )}
                </p>
              )}

              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Sprawdź swoją wiedzę z lektury przed maturą.{" "}
                {data.stats.exerciseCount > 0
                  ? `${data.stats.exerciseCount}+ pytań`
                  : "Setki pytań"}{" "}
                — zamkniętych, otwartych i wypracowań — ocenianych natychmiast
                przez sztuczną inteligencję zgodnie z kryteriami CKE.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button
                  onClick={handleStartTest}
                  className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 text-xl font-bold"
                >
                  {isLoggedIn
                    ? "Rozpocznij test"
                    : "Załóż darmowe konto i zacznij"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                {data.relatedKnowledgeBase && (
                  <Link
                    to={`/baza-wiedzy/${data.relatedKnowledgeBase.slug}`}
                    className="px-10 py-5 border-2 border-gray-200 text-gray-700 rounded-2xl hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center justify-center gap-3 text-xl font-medium"
                  >
                    <BookOpen className="w-5 h-5" />
                    Najpierw powtórz materiał
                  </Link>
                )}
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <span>
                    <strong>{data.stats.exerciseCount}+</strong> pytań
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <span>Ocena AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span>Wynik w 30 sekund</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-orange-500" />
                  <span>Zgodne z CKE</span>
                </div>
              </div>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
            >
              <StatCard
                icon={<FileText className="w-6 h-6" />}
                number={
                  data.stats.exerciseCount > 0
                    ? `${data.stats.exerciseCount}+`
                    : "100+"
                }
                label="Pytań w bazie"
              />
              <StatCard
                icon={<Brain className="w-6 h-6" />}
                number={`${data.stats.typeBreakdown.length}`}
                label="Typów zadań"
              />
              <StatCard
                icon={<BarChart3 className="w-6 h-6" />}
                number={`${data.stats.difficultyBreakdown.length}`}
                label="Poziomów trudności"
              />
              <StatCard
                icon={<Clock className="w-6 h-6" />}
                number="30s"
                label="Czas oceny AI"
              />
            </motion.div>
          </div>
        </section>

        {/* ===================== RODZAJE PYTAŃ ===================== */}
        {data.stats.typeBreakdown.length > 0 && (
          <section className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                  Rodzaje zadań
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Jakie pytania znajdziesz w teście?
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Test obejmuje różne typy zadań — takie same jak na prawdziwej
                  maturze z języka polskiego
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.stats.typeBreakdown.map((tb) => (
                  <motion.div
                    key={tb.type}
                    whileHover={{ y: -4 }}
                    className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                        {exerciseTypeIcons[tb.type] || (
                          <FileText className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg">
                            {exerciseTypeLabels[tb.type] || tb.type}
                          </h3>
                          <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                            {tb.count} pytań
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {exerciseTypeDescriptions[tb.type] ||
                            "Zadanie sprawdzające wiedzę z lektury."}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===================== POZIOMY TRUDNOŚCI ===================== */}
        {data.stats.difficultyBreakdown.length > 1 && (
          <section className="py-20 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                  Adaptacyjna trudność
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Pytania na każdym poziomie
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  System automatycznie dopasowuje trudność pytań do Twojego
                  poziomu — zaczynasz łatwo i stopniowo przechodzisz do
                  najtrudniejszych zagadnień
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="space-y-4">
                  {data.stats.difficultyBreakdown.map((db) => {
                    const maxCount = Math.max(
                      ...data.stats.difficultyBreakdown.map((d) => d.count),
                    );
                    const percentage = Math.round((db.count / maxCount) * 100);

                    return (
                      <motion.div
                        key={db.difficulty}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4"
                      >
                        <span
                          className={`px-3 py-1.5 rounded-lg text-sm font-semibold w-32 text-center ${
                            difficultyColors[db.difficulty] ||
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {difficultyLabels[db.difficulty] ||
                            `Poziom ${db.difficulty}`}
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-600 w-20 text-right">
                          {db.count} pytań
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===================== JAK DZIAŁA TEST ===================== */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                Jak to działa?
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Od rejestracji do wyniku w 3 krokach
              </h2>
              <p className="text-xl text-gray-600">
                Rozpocznij naukę w kilka minut
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <StepCard
                number="1"
                title="Załóż konto"
                description="Darmowa rejestracja w 30 sekund. Potrzebujesz tylko adresu e-mail. Możesz też zalogować się przez Google."
                icon={<GraduationCap className="w-8 h-8" />}
              />
              <StepCard
                number="2"
                title="Rozwiązuj pytania"
                description="Odpowiadaj na pytania zamknięte i otwarte, pisz wypracowania. Po każdym zadaniu otrzymujesz natychmiastową ocenę i wyjaśnienie."
                icon={<Brain className="w-8 h-8" />}
              />
              <StepCard
                number="3"
                title="Śledź postępy"
                description="Analizuj swoje mocne i słabe strony. System automatycznie dobiera trudność pytań i wskazuje obszary do powtórki."
                icon={<TrendingUp className="w-8 h-8" />}
              />
            </div>
          </div>
        </section>

        {/* ===================== CO SPRAWDZA TEST (SEO) ===================== */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4">
                Zakres materiału
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Co sprawdza ten test?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Pytania obejmują wszystkie zagadnienia wymagane na maturze z
                języka polskiego
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <BookOpen className="w-6 h-6" />,
                  title: "Znajomość treści",
                  desc: "Fabuła, bohaterowie, wydarzenia kluczowe, relacje między postaciami, szczegóły świata przedstawionego",
                },
                {
                  icon: <Layers className="w-6 h-6" />,
                  title: "Problematyka",
                  desc: "Motywy literackie, główne tematy, konflikty moralne, przesłanie autora i wymowa ideowa utworu",
                },
                {
                  icon: <Sparkles className="w-6 h-6" />,
                  title: "Środki artystyczne",
                  desc: "Język i styl, narracja, kompozycja, środki stylistyczne, gatunek literacki i jego cechy",
                },
                {
                  icon: <GraduationCap className="w-6 h-6" />,
                  title: "Kontekst",
                  desc: "Epoka literacka, kontekst historyczny i biograficzny, nawiązania do innych utworów i nurtów",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== DLACZEGO NASZ TEST ===================== */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                Przewaga
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Dlaczego warto wybrać nasz test?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-5">
                <BenefitItem
                  icon={<ShieldCheck className="w-6 h-6 text-green-500" />}
                  title="Pytania zgodne z wymaganiami CKE"
                  text="Każde pytanie przygotowane według aktualnych wytycznych Centralnej Komisji Egzaminacyjnej — rozwiązujesz dokładnie takie zadania, jakie czekają na maturze."
                />
                <BenefitItem
                  icon={<Sparkles className="w-6 h-6 text-purple-500" />}
                  title="Natychmiastowa ocena AI"
                  text="Sztuczna inteligencja ocenia wypracowania według 4 kryteriów CKE: treść, kompozycja, język i zapis. Szczegółowy feedback z konkretnymi wskazówkami do poprawy."
                />
                <BenefitItem
                  icon={<RefreshCw className="w-6 h-6 text-blue-500" />}
                  title="Adaptacyjny system uczenia"
                  text="Algorytm analizuje Twoje odpowiedzi i automatycznie dobiera trudność. Zaczynasz od pytań podstawowych i stopniowo przechodzisz do poziomu eksperckiego."
                />
                <BenefitItem
                  icon={<BarChart3 className="w-6 h-6 text-orange-500" />}
                  title="Szczegółowe statystyki"
                  text="Śledź postępy, identyfikuj słabe strony, analizuj trendy w wynikach. Wiesz dokładnie, nad czym jeszcze popracować przed maturą."
                />
                <BenefitItem
                  icon={<Award className="w-6 h-6 text-yellow-500" />}
                  title="System motywacji"
                  text="Zdobywaj punkty, awansuj na kolejne poziomy, utrzymuj passę nauki. Gamifikacja sprawia, że nauka przed maturą staje się wciągająca."
                />
                <BenefitItem
                  icon={<Clock className="w-6 h-6 text-teal-500" />}
                  title="Dostęp zawsze i wszędzie"
                  text="Ucz się na komputerze, tablecie lub telefonie. Test działa w przeglądarce — nie musisz niczego instalować."
                />
              </div>

              {/* Pricing card */}
              <div className="sticky top-28">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-extrabold">39 zł</span>
                    <span className="text-blue-200 text-lg">/miesiąc</span>
                  </div>
                  <p className="text-blue-200 mb-8">
                    Pełny dostęp do wszystkich testów i funkcji
                  </p>

                  <ul className="space-y-4 mb-8">
                    {[
                      "Nielimitowany dostęp do wszystkich testów",
                      "Wszystkie lektury obowiązkowe",
                      "AI ocena wypracowań",
                      "Szczegółowe statystyki i analiza",
                      "System adaptacyjnej trudności",
                      "System poziomów i nagród",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 text-blue-200" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={handleStartTest}
                    className="w-full py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors"
                  >
                    {isLoggedIn ? "Rozpocznij test" : "Załóż darmowe konto"}
                  </button>

                  <p className="text-center text-blue-200 text-sm mt-4">
                    Rejestracja jest darmowa. Bez zobowiązań.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== DLA KOGO ===================== */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Dla kogo jest ten test?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  emoji: "🎓",
                  title: "Maturzyści",
                  desc: "Przygotowujesz się do matury z polskiego? Ten test to idealne narzędzie do systematycznej powtórki. Rozwiązuj pytania codziennie i śledź swoje postępy.",
                },
                {
                  emoji: "📚",
                  title: "Uczniowie liceum",
                  desc: "Masz sprawdzian z lektury? Przetestuj swoją wiedzę przed klasówką. Pytania pokrywają wszystkie wymagane zagadnienia z programu nauczania.",
                },
                {
                  emoji: "🔄",
                  title: "Powtarzający materiał",
                  desc: "Dawno czytałeś lekturę i chcesz odświeżyć wiedzę? Test pomoże Ci szybko zidentyfikować luki i skoncentrować się na najważniejszych zagadnieniach.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <div className="text-5xl mb-4">{item.emoji}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== FAQ (SEO) ===================== */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold mb-4">
                FAQ
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Najczęściej zadawane pytania
              </h2>
            </div>

            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== POWIĄZANA BAZA WIEDZY ===================== */}
        {data.relatedKnowledgeBase && (
          <section className="py-12 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-gray-600 mb-4">
                Chcesz najpierw powtórzyć materiał?
              </p>
              <Link
                to={`/baza-wiedzy/${data.relatedKnowledgeBase.slug}`}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-lg"
              >
                <BookOpen className="w-5 h-5" />
                Otwórz opracowanie: {data.relatedKnowledgeBase.title}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        )}

        {/* ===================== FINAL CTA ===================== */}
        <section className="py-24 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="max-w-4xl mx-auto text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6">
                Rozpocznij sprawdzian z lektury
              </h2>
              <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-2xl mx-auto">
                Dołącz do tysięcy maturzystów, którzy przygotowują się do
                egzaminu z języka polskiego na MaturaPolski.pl
              </p>

              <button
                onClick={handleStartTest}
                className="px-12 py-6 bg-white text-blue-600 rounded-2xl hover:bg-blue-50 transition-all text-xl font-bold shadow-2xl hover:scale-105 inline-flex items-center gap-3"
              >
                {isLoggedIn ? "Rozpocznij test teraz" : "Załóż darmowe konto"}
                <ArrowRight className="w-6 h-6" />
              </button>

              <p className="text-blue-200 mt-6 text-sm">
                Darmowa rejestracja · Bez zobowiązań · Dostęp 24/7
              </p>
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
    className="bg-white rounded-xl p-5 md:p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
  >
    <div className="text-blue-600 mb-2 flex justify-center">{icon}</div>
    <div className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">
      {number}
    </div>
    <div className="text-gray-500 text-sm">{label}</div>
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
    className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
  >
    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
      {number}
    </div>
    <div className="text-blue-600 mb-4 mt-4">{icon}</div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

const BenefitItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  text: string;
}> = ({ icon, title, text }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 mt-0.5">{icon}</div>
    <div>
      <h4 className="font-bold mb-1">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
    </div>
  </div>
);

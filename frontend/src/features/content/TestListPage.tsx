// frontend/src/features/content/TestListPage.tsx

import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  FileText,
  Search,
  Target,
  ShieldCheck,
  Sparkles,
  Filter,
} from "lucide-react";
import { PublicLayout } from "../../components/PublicLayout";
import { contentService } from "../../services/contentService";
import { useAuthStore } from "../../store/authStore";

interface TestLandingItem {
  id: string;
  slug: string;
  title: string;
  work: string;
  author?: string;
  epoch?: string;
  isRequired?: boolean;
  exerciseCount: number;
}

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

const epochOrder = [
  "ANTIQUITY",
  "MIDDLE_AGES",
  "RENAISSANCE",
  "BAROQUE",
  "ENLIGHTENMENT",
  "ROMANTICISM",
  "POSITIVISM",
  "YOUNG_POLAND",
  "INTERWAR",
  "CONTEMPORARY",
];

export function TestListPage() {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;

  const [tests, setTests] = useState<TestLandingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEpoch, setSelectedEpoch] = useState<string | null>(null);
  const [showRequiredOnly, setShowRequiredOnly] = useState(false);

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      const response = await contentService.getTestLandings(100);
      setTests(response);
    } catch (error) {
      console.error("Error loading tests:", error);
    } finally {
      setLoading(false);
    }
  };

  // Dostępne epoki (tylko te, które mają testy)
  const availableEpochs = useMemo(() => {
    const epochSet = new Set(tests.map((t) => t.epoch).filter(Boolean));
    return epochOrder.filter((e) => epochSet.has(e));
  }, [tests]);

  // Filtrowanie
  const filteredTests = useMemo(() => {
    let result = tests;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.author && t.author.toLowerCase().includes(q)),
      );
    }

    if (selectedEpoch) {
      result = result.filter((t) => t.epoch === selectedEpoch);
    }

    if (showRequiredOnly) {
      result = result.filter((t) => t.isRequired);
    }

    return result;
  }, [tests, searchQuery, selectedEpoch, showRequiredOnly]);

  // Grupowanie po epokach
  const groupedByEpoch = useMemo(() => {
    if (selectedEpoch || searchQuery.trim()) return null; // Nie grupuj przy filtrach

    const groups: Record<string, TestLandingItem[]> = {};
    filteredTests.forEach((t) => {
      const epoch = t.epoch || "OTHER";
      if (!groups[epoch]) groups[epoch] = [];
      groups[epoch].push(t);
    });

    return epochOrder
      .filter((e) => groups[e] && groups[e].length > 0)
      .map((e) => ({ epoch: e, label: epochLabels[e] || e, tests: groups[e] }));
  }, [filteredTests, selectedEpoch, searchQuery]);

  // Statystyki
  const totalQuestions = tests.reduce((sum, t) => sum + t.exerciseCount, 0);
  const requiredCount = tests.filter((t) => t.isRequired).length;

  // SEO
  const seoTitle =
    "Testy z Lektur Online - Quizy i Sprawdziany na Maturę z Polskiego | MaturaPolski.pl";
  const seoDescription = `✓ ${tests.length} testów z lektur obowiązkowych i uzupełniających ✓ ${totalQuestions}+ pytań ✓ Pytania zamknięte, otwarte i wypracowania ✓ Ocena AI w 30 sekund ✓ Przygotuj się do matury 2025/2026!`;
  const seoKeywords =
    "testy z lektur, quiz z lektury online, test maturalny z polskiego, sprawdzian z lektury, pytania z lektur matura, testy maturalne polski";

  // JSON-LD
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Testy z lektur - MaturaPolski.pl",
    description: seoDescription,
    url: "https://www.maturapolski.pl/test",
    provider: {
      "@type": "Organization",
      name: "MaturaPolski.pl",
      url: "https://www.maturapolski.pl",
    },
    about: {
      "@type": "EducationalOccupationalProgram",
      name: "Przygotowanie do matury z języka polskiego",
      educationalProgramMode: "online",
    },
    numberOfItems: tests.length,
  };

  return (
    <PublicLayout
      title={seoTitle}
      description={seoDescription}
      keywords={seoKeywords}
      canonicalUrl="https://www.maturapolski.pl/test"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="bg-white">
        {/* ===================== HERO ===================== */}
        <section className="pt-4 pb-16 px-4 bg-gradient-to-b from-blue-50 via-purple-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          </div>

          <div className="max-w-7xl mx-auto relative">
            {/* Breadcrumbs */}
            <nav aria-label="breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-gray-500">
                <li>
                  <Link to="/" className="hover:text-blue-600">
                    Strona główna
                  </Link>
                </li>
                <li>/</li>
                <li className="text-gray-700 font-medium">Testy z lektur</li>
              </ol>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
                <Target className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  Przygotowanie do matury 2025/2026
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                Testy z lektur{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  na maturę
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Sprawdź swoją wiedzę z lektur obowiązkowych i uzupełniających.
                Pytania zamknięte, otwarte i wypracowania oceniane przez AI
                zgodnie z kryteriami CKE.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-sm text-gray-500 mb-10">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <span>
                    <strong>{tests.length}</strong> lektur
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-500" />
                  <span>
                    <strong>{totalQuestions}+</strong> pytań
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  <span>
                    <strong>{requiredCount}</strong> lektur obowiązkowych
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                  <span>Ocena AI w 30s</span>
                </div>
              </div>
            </motion.div>

            {/* ===================== FILTROWANIE ===================== */}
            <div className="max-w-4xl mx-auto mb-12">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Szukaj lektury lub autora..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
              </div>

              {/* Filter chips */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-500 mr-1">
                  <Filter className="w-4 h-4 inline mr-1" />
                  Filtruj:
                </span>

                <button
                  onClick={() => setShowRequiredOnly(!showRequiredOnly)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    showRequiredOnly
                      ? "bg-green-100 text-green-700 ring-2 ring-green-300"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 inline mr-1" />
                  Obowiązkowe
                </button>

                {availableEpochs.map((epoch) => (
                  <button
                    key={epoch}
                    onClick={() =>
                      setSelectedEpoch(selectedEpoch === epoch ? null : epoch)
                    }
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedEpoch === epoch
                        ? "bg-purple-100 text-purple-700 ring-2 ring-purple-300"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {epochLabels[epoch] || epoch}
                  </button>
                ))}

                {(selectedEpoch || showRequiredOnly || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedEpoch(null);
                      setShowRequiredOnly(false);
                      setSearchQuery("");
                    }}
                    className="px-4 py-2 rounded-full text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-all"
                  >
                    Wyczyść filtry
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ===================== LISTA TESTÓW ===================== */}
        <section className="pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Ładowanie testów...</p>
              </div>
            ) : filteredTests.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">
                  Nie znaleziono testów
                </h3>
                <p className="text-gray-500">
                  Spróbuj zmienić kryteria wyszukiwania
                </p>
              </div>
            ) : groupedByEpoch ? (
              // Widok grupowany po epokach
              <div className="space-y-16">
                {groupedByEpoch.map((group, gi) => (
                  <motion.div
                    key={group.epoch}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.05 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{group.label}</h2>
                        <p className="text-sm text-gray-500">
                          {group.tests.length}{" "}
                          {group.tests.length === 1
                            ? "lektura"
                            : group.tests.length < 5
                              ? "lektury"
                              : "lektur"}
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {group.tests.map((test, ti) => (
                        <TestCard key={test.id} test={test} index={ti} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              // Widok płaski (przy filtrach)
              <div>
                <p className="text-sm text-gray-500 mb-6">
                  Znaleziono {filteredTests.length}{" "}
                  {filteredTests.length === 1
                    ? "test"
                    : filteredTests.length < 5
                      ? "testy"
                      : "testów"}
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredTests.map((test, i) => (
                    <TestCard key={test.id} test={test} index={i} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ===================== SEO CONTENT ===================== */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Jak przygotować się do matury z polskiego?
              </h2>
              <p className="text-xl text-gray-600">
                Systematyczna powtórka lektur to klucz do sukcesu na egzaminie
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                Matura z języka polskiego wymaga dogłębnej znajomości lektur
                obowiązkowych i umiejętności ich interpretacji. Nasze testy
                maturalne online pozwalają sprawdzić wiedzę z każdej lektury —
                od treści i bohaterów, przez problematykę i motywy literackie,
                po środki artystyczne i kontekst epoki.
              </p>
              <p>
                Każdy test zawiera pytania zamknięte (jednokrotnego i
                wielokrotnego wyboru), pytania otwarte wymagające krótkiej
                odpowiedzi oraz pełne wypracowania — rozprawki i interpretacje —
                oceniane natychmiast przez sztuczną inteligencję według
                kryteriów CKE.
              </p>
              <p>
                System adaptacyjnej trudności automatycznie dopasowuje poziom
                pytań do Twoich umiejętności. Zaczynasz od pytań podstawowych i
                stopniowo przechodzisz do poziomu eksperckiego. Szczegółowe
                statystyki pokazują Twoje mocne i słabe strony, abyś wiedział
                dokładnie, nad czym jeszcze popracować.
              </p>
            </div>
          </div>
        </section>

        {/* ===================== CTA ===================== */}
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                Gotowy na powtórkę przed maturą?
              </h2>
              <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
                {tests.length} lektur, {totalQuestions}+ pytań, natychmiastowa
                ocena AI. Zacznij się uczyć już teraz.
              </p>

              <Link
                to={isLoggedIn ? "/learning" : "/register"}
                className="inline-flex items-center gap-3 px-12 py-6 bg-white text-blue-600 rounded-2xl hover:bg-blue-50 transition-all text-xl font-bold shadow-2xl hover:scale-105"
              >
                {isLoggedIn ? "Rozpocznij naukę" : "Załóż darmowe konto"}
                <ArrowRight className="w-6 h-6" />
              </Link>

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

// ============ TEST CARD ============

const TestCard: React.FC<{ test: TestLandingItem; index: number }> = ({
  test,
  index,
}) => {
  const epochLabel = test.epoch ? epochLabels[test.epoch] || test.epoch : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
    >
      <Link
        to={`/test/${test.slug}`}
        className="group block bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-blue-200 transition-all h-full"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
              {test.title}
            </h3>
            {test.author && (
              <p className="text-sm text-gray-500 mt-0.5">{test.author}</p>
            )}
          </div>

          {test.isRequired && (
            <span className="flex-shrink-0 ml-3 px-2.5 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-lg">
              Obowiązkowa
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          {epochLabel && (
            <span className="px-2.5 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-lg">
              {epochLabel}
            </span>
          )}
          <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg flex items-center gap-1">
            <FileText className="w-3 h-3" />
            {test.exerciseCount} pytań
          </span>
        </div>

        <div className="flex items-center text-sm text-blue-600 font-semibold group-hover:gap-2 transition-all gap-1">
          Rozpocznij test
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
};

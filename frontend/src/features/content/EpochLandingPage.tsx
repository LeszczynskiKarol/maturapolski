// frontend/src/features/content/EpochLandingPage.tsx

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  GraduationCap,
  Layers,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { PublicLayout } from "../../components/PublicLayout";
import { useAuthStore } from "../../store/authStore";
import { api } from "../../services/api";

interface EpochLanding {
  epoch: string;
  slug: string;
  name: string;
  period: string;
  description: string;
  shortDescription: string;
  keyFeatures: string[];
  keyAuthors: string[];
  metaTitle: string;
  metaDescription: string;
  stats: {
    exerciseCount: number;
    difficultyBreakdown: { difficulty: number; count: number }[];
    typeBreakdown: { type: string; count: number }[];
    workBreakdown: { work: string; count: number }[];
  };
  relatedTestLandings: {
    id: string;
    slug: string;
    title: string;
    author?: string;
    isRequired?: boolean;
  }[];
  relatedKnowledgeBase?: { slug: string; title: string } | null;
}

const typeLabels: Record<string, string> = {
  CLOSED_SINGLE: "Jednokrotnego wyboru",
  CLOSED_MULTIPLE: "Wielokrotnego wyboru",
  SHORT_ANSWER: "Krótka odpowiedź",
  SYNTHESIS_NOTE: "Notatka syntetyzująca",
  ESSAY: "Wypracowanie",
};

const difficultyLabels: Record<number, string> = {
  1: "Podstawowy",
  2: "Łatwy",
  3: "Średni",
  4: "Trudny",
  5: "Ekspercki",
};

const difficultyColors: Record<number, string> = {
  1: "bg-green-500",
  2: "bg-lime-500",
  3: "bg-yellow-500",
  4: "bg-orange-500",
  5: "bg-red-500",
};

export function EpochLandingPage() {
  const { slug } = useParams<{ slug: string }>();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;
  const [data, setData] = useState<EpochLanding | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data: resp } = await api.get(`/api/epochs/${slug}`);
        setData(resp);
      } catch (err: any) {
        setError(err?.response?.data?.error || "Nie znaleziono epoki");
      } finally {
        setLoading(false);
      }
    };
    if (slug) load();
  }, [slug]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
        </div>
      </PublicLayout>
    );
  }

  if (error || !data) {
    return (
      <PublicLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <BookOpen className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">
            Nie znaleziono epoki
          </h2>
          <Link to="/epoki" className="text-blue-600 hover:underline mt-4">
            ← Wróć do listy epok
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const canonicalUrl = `https://www.maturapolski.pl/epoki/${data.slug}`;
  const maxDiffCount = Math.max(
    ...data.stats.difficultyBreakdown.map((d) => d.count),
    1,
  );
  const worksText = data.stats.workBreakdown.map((w) => w.work).join(", ");

  // === STRUCTURED DATA ===

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `Test z epoki: ${data.name}`,
    description: data.metaDescription,
    url: canonicalUrl,
    inLanguage: "pl-PL",
    provider: {
      "@type": "Organization",
      name: "MaturaPolski.pl",
      url: "https://www.maturapolski.pl",
    },
    educationalLevel: "Szkoła ponadpodstawowa / Matura",
    about: {
      "@type": "Thing",
      name: data.name,
      description: data.description,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `${data.stats.exerciseCount} pytań testowych`,
    },
    teaches: data.keyFeatures.join(", "),
    numberOfCredits: data.stats.exerciseCount,
  };

  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: `Quiz z epoki ${data.name} — ${data.stats.exerciseCount} pytań`,
    description: `Sprawdź wiedzę z epoki ${data.name} (${data.period}). ${data.stats.exerciseCount} pytań z ${data.stats.workBreakdown.length} lektur.`,
    url: canonicalUrl,
    educationalLevel: "Matura z języka polskiego",
    about: { "@type": "Thing", name: `Epoka literacka: ${data.name}` },
    provider: { "@type": "Organization", name: "MaturaPolski.pl" },
    typicalAgeRange: "16-20",
    numberOfQuestions: data.stats.exerciseCount,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Strona główna",
        item: "https://www.maturapolski.pl",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Epoki literackie",
        item: "https://www.maturapolski.pl/epoki",
      },
      { "@type": "ListItem", position: 3, name: data.name, item: canonicalUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Jakie są cechy charakterystyczne epoki ${data.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Najważniejsze cechy epoki ${data.name} (${data.period}) to: ${data.keyFeatures.join(", ")}. Kluczowi twórcy: ${data.keyAuthors.join(", ")}.`,
        },
      },
      {
        "@type": "Question",
        name: `Jakie lektury z epoki ${data.name} obowiązują na maturze?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Na platformie MaturaPolski.pl dostępne są testy z ${data.stats.workBreakdown.length} lektur epoki ${data.name}: ${worksText}. Łącznie ${data.stats.exerciseCount} pytań testowych.`,
        },
      },
      {
        "@type": "Question",
        name: `Ile pytań z epoki ${data.name} jest na MaturaPolski.pl?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Dostępnych jest ${data.stats.exerciseCount} pytań z epoki ${data.name}, w tym: ${data.stats.typeBreakdown.map((t) => `${t.count} ${typeLabels[t.type] || t.type}`).join(", ")}. Pytania obejmują ${data.stats.difficultyBreakdown.length} poziomów trudności.`,
        },
      },
    ],
  };

  // ItemList for related works
  const worksListSchema =
    data.stats.workBreakdown.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Lektury z epoki ${data.name}`,
          url: canonicalUrl,
          numberOfItems: data.stats.workBreakdown.length,
          itemListElement: data.stats.workBreakdown.map((w, i) => {
            const landing = data.relatedTestLandings.find(
              (t) => t.title === w.work,
            );
            return {
              "@type": "ListItem",
              position: i + 1,
              name: w.work,
              ...(landing
                ? { url: `https://www.maturapolski.pl/test/${landing.slug}` }
                : {}),
              description: `${w.count} pytań testowych z lektury "${w.work}"`,
            };
          }),
        }
      : null;

  return (
    <PublicLayout
      title={data.metaTitle}
      description={data.metaDescription}
      keywords={`test ${data.name.toLowerCase()}, quiz ${data.name.toLowerCase()}, epoka ${data.name.toLowerCase()} matura, sprawdzian ${data.name.toLowerCase()}, ${data.keyAuthors.join(", ").toLowerCase()}`}
      canonicalUrl={canonicalUrl}
    >
      <Helmet>
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:site_name" content="MaturaPolski.pl" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large"
        />
      </Helmet>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {worksListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(worksListSchema) }}
        />
      )}

      <div className="bg-white">
        {/* HERO */}
        <section className="pt-4 pb-16 px-4 bg-gradient-to-b from-purple-50 via-blue-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
            <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          </div>
          <div className="max-w-7xl mx-auto relative">
            <nav aria-label="breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-gray-500">
                <li>
                  <Link to="/" className="hover:text-blue-600">
                    Strona główna
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link to="/epoki" className="hover:text-blue-600">
                    Epoki literackie
                  </Link>
                </li>
                <li>/</li>
                <li className="text-gray-700 font-medium">{data.name}</li>
              </ol>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Link
                  to="/epoki"
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-500" />
                </Link>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full">
                  {data.period}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight">
                Testy z epoki:{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {data.name}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl leading-relaxed">
                {data.shortDescription}
              </p>

              <div className="flex flex-wrap gap-4 md:gap-6 mb-8">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-sm border border-gray-100">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <span className="text-sm">
                    <strong>{data.stats.exerciseCount}</strong> pytań
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-sm border border-gray-100">
                  <BookOpen className="w-5 h-5 text-green-500" />
                  <span className="text-sm">
                    <strong>{data.stats.workBreakdown.length}</strong> lektur
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Layers className="w-5 h-5 text-purple-500" />
                  <span className="text-sm">
                    <strong>{data.stats.difficultyBreakdown.length}</strong>{" "}
                    poziomów
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                  <span className="text-sm">Ocena AI w 30s</span>
                </div>
              </div>

              <Link
                to={isLoggedIn ? "/learning" : "/register"}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-bold text-lg"
              >
                {isLoggedIn
                  ? "Rozpocznij test z tej epoki"
                  : "Załóż konto i zacznij test"}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    O epoce: {data.name}
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {data.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    Cechy charakterystyczne
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {data.keyFeatures.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Najważniejsi twórcy
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.keyAuthors.map((a) => (
                      <span
                        key={a}
                        className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                {data.stats.workBreakdown.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-green-600" />
                      Lektury z tej epoki ({data.stats.workBreakdown.length})
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {data.stats.workBreakdown.map((w) => {
                        const landing = data.relatedTestLandings.find(
                          (t) => t.title === w.work,
                        );
                        return (
                          <div
                            key={w.work}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {landing?.isRequired && (
                                <ShieldCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                              )}
                              {landing ? (
                                <Link
                                  to={`/test/${landing.slug}`}
                                  className="text-sm font-medium text-blue-600 hover:underline truncate"
                                >
                                  {w.work}
                                </Link>
                              ) : (
                                <span className="text-sm font-medium text-gray-700 truncate">
                                  {w.work}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                              {w.count} pytań
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* SIDEBAR */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-bold mb-4 text-lg">Poziomy trudności</h3>
                  <div className="space-y-3">
                    {data.stats.difficultyBreakdown.map((d) => (
                      <div key={d.difficulty}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">
                            {difficultyLabels[d.difficulty] ||
                              `Poziom ${d.difficulty}`}
                          </span>
                          <span className="font-semibold">{d.count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`${difficultyColors[d.difficulty] || "bg-gray-500"} h-2.5 rounded-full transition-all`}
                            style={{
                              width: `${(d.count / maxDiffCount) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-bold mb-4 text-lg">Typy pytań</h3>
                  <div className="space-y-2">
                    {data.stats.typeBreakdown.map((t) => (
                      <div
                        key={t.type}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-600">
                          {typeLabels[t.type] || t.type}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {t.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {data.relatedKnowledgeBase && (
                  <Link
                    to={`/baza-wiedzy/${data.relatedKnowledgeBase.slug}`}
                    className="block bg-blue-50 border border-blue-200 rounded-2xl p-6 hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-blue-900">Baza wiedzy</h3>
                    </div>
                    <p className="text-sm text-blue-700">
                      Przeczytaj materiały o epoce:{" "}
                      {data.relatedKnowledgeBase.title}
                    </p>
                    <span className="text-blue-600 text-sm font-semibold mt-2 inline-flex items-center gap-1">
                      Przejdź <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                )}

                <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
                  <h3 className="font-bold text-lg mb-2">
                    Sprawdź swoją wiedzę
                  </h3>
                  <p className="text-blue-100 text-sm mb-4">
                    {data.stats.exerciseCount} pytań z epoki {data.name}
                  </p>
                  <Link
                    to={isLoggedIn ? "/learning" : "/register"}
                    className="block w-full py-3 bg-white text-purple-600 rounded-xl text-center font-bold hover:bg-purple-50 transition-colors"
                  >
                    {isLoggedIn ? "Rozpocznij test" : "Załóż darmowe konto"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ rendered as HTML */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Najczęściej zadawane pytania — {data.name}
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-lg mb-2">
                  Jakie są cechy charakterystyczne epoki {data.name}?
                </h3>
                <p className="text-gray-600">
                  Najważniejsze cechy to: {data.keyFeatures.join(", ")}.
                  Kluczowi twórcy: {data.keyAuthors.join(", ")}.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-lg mb-2">
                  Jakie lektury z epoki {data.name} obowiązują na maturze?
                </h3>
                <p className="text-gray-600">
                  Dostępne testy z {data.stats.workBreakdown.length} lektur:{" "}
                  {worksText}. Łącznie {data.stats.exerciseCount} pytań.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-lg mb-2">
                  Ile pytań z epoki {data.name} jest dostępnych?
                </h3>
                <p className="text-gray-600">
                  {data.stats.exerciseCount} pytań na{" "}
                  {data.stats.difficultyBreakdown.length} poziomach trudności:{" "}
                  {data.stats.typeBreakdown
                    .map((t) => `${t.count} ${typeLabels[t.type] || t.type}`)
                    .join(", ")}
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related tests */}
        {data.relatedTestLandings.length > 0 && (
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">
                Testy z lektur epoki: {data.name}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.relatedTestLandings.map((test) => (
                  <Link
                    key={test.id}
                    to={`/test/${test.slug}`}
                    className="group bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-blue-200 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {test.title}
                      </h3>
                      {test.isRequired && (
                        <ShieldCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                      )}
                    </div>
                    {test.author && (
                      <p className="text-sm text-gray-500 mb-3">
                        {test.author}
                      </p>
                    )}
                    <span className="text-sm text-blue-600 font-semibold flex items-center gap-1">
                      Rozpocznij test{" "}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* BOTTOM CTA */}
        <section className="py-24 px-4 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 text-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
                Gotowy na test z epoki {data.name}?
              </h2>
              <p className="text-xl mb-10 text-blue-100">
                {data.stats.exerciseCount} pytań,{" "}
                {data.stats.workBreakdown.length} lektur, natychmiastowa ocena
                AI.
              </p>
              <Link
                to={isLoggedIn ? "/learning" : "/register"}
                className="inline-flex items-center gap-3 px-12 py-6 bg-white text-purple-600 rounded-2xl hover:bg-purple-50 transition-all text-xl font-bold shadow-2xl hover:scale-105"
              >
                {isLoggedIn ? "Rozpocznij test" : "Załóż darmowe konto"}
                <ArrowRight className="w-6 h-6" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}

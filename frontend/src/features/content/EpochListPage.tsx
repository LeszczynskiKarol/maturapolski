// frontend/src/features/content/EpochListPage.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Clock,
  FileText,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { PublicLayout } from "../../components/PublicLayout";
import { useAuthStore } from "../../store/authStore";
import { api } from "../../services/api";

interface EpochItem {
  epoch: string;
  slug: string;
  name: string;
  period: string;
  shortDescription: string;
  exerciseCount: number;
  workCount: number;
  keyAuthors: string[];
}

const epochColors: Record<
  string,
  { bg: string; border: string; text: string; gradient: string }
> = {
  ANTIQUITY: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    gradient: "from-amber-500 to-orange-600",
  },
  MIDDLE_AGES: {
    bg: "bg-stone-50",
    border: "border-stone-200",
    text: "text-stone-700",
    gradient: "from-stone-500 to-stone-700",
  },
  RENAISSANCE: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    gradient: "from-emerald-500 to-teal-600",
  },
  BAROQUE: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    gradient: "from-red-500 to-rose-700",
  },
  ENLIGHTENMENT: {
    bg: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-700",
    gradient: "from-sky-500 to-blue-600",
  },
  ROMANTICISM: {
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-700",
    gradient: "from-violet-500 to-purple-700",
  },
  POSITIVISM: {
    bg: "bg-teal-50",
    border: "border-teal-200",
    text: "text-teal-700",
    gradient: "from-teal-500 to-cyan-700",
  },
  YOUNG_POLAND: {
    bg: "bg-fuchsia-50",
    border: "border-fuchsia-200",
    text: "text-fuchsia-700",
    gradient: "from-fuchsia-500 to-pink-700",
  },
  INTERWAR: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    gradient: "from-orange-500 to-amber-700",
  },
  CONTEMPORARY: {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-700",
    gradient: "from-indigo-500 to-blue-700",
  },
};

export function EpochListPage() {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;
  const [epochs, setEpochs] = useState<EpochItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/api/epochs");
        setEpochs(data);
      } catch (err) {
        console.error("Error loading epochs:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalQuestions = epochs.reduce((s, e) => s + e.exerciseCount, 0);
  const totalWorks = epochs.reduce((s, e) => s + e.workCount, 0);
  const epochNames = epochs.map((e) => e.name).join(", ");

  const seoTitle =
    "Testy z epok literackich — quiz online, sprawdzian wiedzy | MaturaPolski.pl";
  const seoDescription = `✓ ${epochs.length} epok literackich ✓ ${totalQuestions}+ pytań testowych ✓ ${totalWorks} lektur ✓ Starożytność, Romantyzm, Pozytywizm i inne ✓ Ocena AI w 30 sekund ✓ Przygotuj się do matury z polskiego 2025/2026!`;
  const seoKeywords = `epoki literackie test, quiz z epok literackich, sprawdzian z epok, testy maturalne epoki, ${epochNames.toLowerCase()}, matura z polskiego epoki`;
  const canonicalUrl = "https://www.maturapolski.pl/epoki";

  // === STRUCTURED DATA ===

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Testy z epok literackich — matura z polskiego",
    description: seoDescription,
    url: canonicalUrl,
    inLanguage: "pl-PL",
    isPartOf: {
      "@type": "WebSite",
      name: "MaturaPolski.pl",
      url: "https://www.maturapolski.pl",
    },
    provider: {
      "@type": "Organization",
      name: "MaturaPolski.pl",
      url: "https://www.maturapolski.pl",
    },
    about: {
      "@type": "EducationalOccupationalProgram",
      name: "Przygotowanie do matury z języka polskiego — epoki literackie",
      educationalProgramMode: "online",
    },
    numberOfItems: epochs.length,
    keywords: seoKeywords,
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Epoki literackie — testy maturalne",
    url: canonicalUrl,
    numberOfItems: epochs.length,
    itemListElement: epochs.map((epoch, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${epoch.name} (${epoch.period})`,
      url: `https://www.maturapolski.pl/epoki/${epoch.slug}`,
      description: `${epoch.shortDescription} ${epoch.exerciseCount} pytań z ${epoch.workCount} lektur.`,
    })),
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
        item: canonicalUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Jakie epoki literackie obowiązują na maturze z polskiego?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Na maturze obowiązuje znajomość epok: ${epochNames}. Każda wymaga znajomości cech, twórców, dzieł i kontekstu historycznego.`,
        },
      },
      {
        "@type": "Question",
        name: "Ile pytań z epok literackich jest dostępnych na MaturaPolski.pl?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Ponad ${totalQuestions} pytań z ${epochs.length} epok i ${totalWorks} lektur. Testy zamknięte, pytania otwarte i wypracowania oceniane przez AI.`,
        },
      },
      {
        "@type": "Question",
        name: "Dlaczego znajomość epok literackich jest ważna na maturze?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pozwala osadzić dzieło w kontekście, trafnie interpretować teksty, porównywać utwory i budować argumentację w wypracowaniach maturalnych.",
        },
      },
    ],
  };

  return (
    <PublicLayout
      title={seoTitle}
      description={seoDescription}
      keywords={seoKeywords}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
                <li className="text-gray-700 font-medium">Epoki literackie</li>
              </ol>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full mb-6">
                <GraduationCap className="w-4 h-4" />
                <span className="text-sm font-semibold">Matura 2025/2026</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                Testy z{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  epok literackich
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Powtórz wiedzę z każdej epoki — od Starożytności po
                Współczesność. Pytania o cechy epok, twórców, dzieła i konteksty
                historyczne.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-500" />
                  <span>
                    <strong>{epochs.length}</strong> epok
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <span>
                    <strong>{totalQuestions}+</strong> pytań
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-500" />
                  <span>
                    <strong>{totalWorks}</strong> lektur
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                  <span>Ocena AI w 30s</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* EPOCH CARDS */}
        <section className="pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4" />
                <p className="text-gray-600">Ładowanie epok...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {epochs.map((epoch, i) => {
                  const colors =
                    epochColors[epoch.epoch] || epochColors.CONTEMPORARY;
                  return (
                    <motion.article
                      key={epoch.epoch}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={`/epoki/${epoch.slug}`}
                        className={`group block ${colors.bg} border ${colors.border} rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                          <div className="flex items-start gap-4 md:w-1/3">
                            <div
                              className={`w-12 h-12 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
                            >
                              {i + 1}
                            </div>
                            <div>
                              <h2 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {epoch.name}
                              </h2>
                              <p
                                className={`text-sm font-medium ${colors.text}`}
                              >
                                {epoch.period}
                              </p>
                            </div>
                          </div>
                          <div className="md:w-1/3">
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {epoch.shortDescription}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {epoch.keyAuthors.slice(0, 3).map((a) => (
                                <span
                                  key={a}
                                  className="px-2 py-0.5 bg-white/70 text-gray-600 text-xs rounded-md border border-gray-200/50"
                                >
                                  {a}
                                </span>
                              ))}
                              {epoch.keyAuthors.length > 3 && (
                                <span className="px-2 py-0.5 text-gray-400 text-xs">
                                  +{epoch.keyAuthors.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-6 md:w-1/3 md:justify-end">
                            <div className="flex gap-4 text-sm">
                              <div className="text-center">
                                <div className="font-bold text-gray-900 text-lg">
                                  {epoch.exerciseCount}
                                </div>
                                <div className="text-gray-500 text-xs">
                                  pytań
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="font-bold text-gray-900 text-lg">
                                  {epoch.workCount}
                                </div>
                                <div className="text-gray-500 text-xs">
                                  lektur
                                </div>
                              </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* SEO + FAQ */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Dlaczego warto znać epoki literackie?
              </h2>
              <p className="text-xl text-gray-600">
                Znajomość epok to fundament każdej odpowiedzi maturalnej
              </p>
            </div>
            <div className="prose prose-lg max-w-none text-gray-600 mb-16">
              <p>
                Matura z języka polskiego wymaga umiejętności osadzenia dzieła w
                kontekście epoki. Znajomość cech poszczególnych okresów
                literackich pozwala na głębszą interpretację tekstu, trafne
                porównania i odwołania do kontekstu historycznego.
              </p>
              <p>
                Nasze testy obejmują pytania o cechy każdej epoki,
                najważniejszych twórców, kluczowe dzieła, idee filozoficzne i
                prądy artystyczne. System adaptacyjnej trudności dopasowuje
                pytania do Twojego poziomu — od podstaw po zagadnienia
                eksperckie.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-8 text-center">
              Najczęściej zadawane pytania
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-lg mb-2">
                  Jakie epoki literackie obowiązują na maturze z polskiego?
                </h3>
                <p className="text-gray-600">
                  Na maturze obowiązuje znajomość epok: {epochNames}. Każda
                  wymaga znajomości cech, twórców, dzieł i kontekstu
                  historycznego.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-lg mb-2">
                  Ile pytań z epok literackich jest dostępnych?
                </h3>
                <p className="text-gray-600">
                  Ponad {totalQuestions} pytań z {epochs.length} epok i{" "}
                  {totalWorks} lektur — testy zamknięte, pytania otwarte i
                  wypracowania oceniane przez AI.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-lg mb-2">
                  Dlaczego znajomość epok jest ważna na maturze?
                </h3>
                <p className="text-gray-600">
                  Pozwala osadzić dzieło w kontekście, trafnie interpretować
                  teksty, porównywać utwory i budować argumentację w
                  wypracowaniach.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 text-white relative overflow-hidden">
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
                Powtórz wszystkie epoki przed maturą
              </h2>
              <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
                {epochs.length} epok, {totalQuestions}+ pytań, natychmiastowa
                ocena AI.
              </p>
              <a
                href={
                  isLoggedIn
                    ? "/learning"
                    : "https://www.matury-online.pl/auth/register?from=maturapolski"
                }
                className="inline-flex items-center gap-3 px-12 py-6 bg-white text-purple-600 rounded-2xl hover:bg-purple-50 transition-all text-xl font-bold shadow-2xl hover:scale-105"
              >
                {isLoggedIn ? "Rozpocznij naukę" : "Załóż darmowe konto"}
                <ArrowRight className="w-6 h-6" />
              </a>
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

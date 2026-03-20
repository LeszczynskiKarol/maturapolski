// frontend/src/components/FeaturedTestsSection.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  FileText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { contentService } from "../services/contentService";

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
  INTERWAR: "Dwudziestolecie",
  CONTEMPORARY: "Współczesność",
};

export const FeaturedTestsSection: React.FC = () => {
  const [tests, setTests] = useState<TestLandingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await contentService.getTestLandings(100);
        setTests(data);
      } catch (err) {
        console.error("Error loading featured tests:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading || tests.length === 0) return null;

  const totalQuestions = tests.reduce((sum, t) => sum + t.exerciseCount, 0);
  const requiredTests = tests.filter((t) => t.isRequired);
  const supplementaryTests = tests.filter((t) => !t.isRequired);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full mb-5">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-semibold">
              {tests.length} lektur · {totalQuestions}+ pytań
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Testy z lektur{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              maturalnych
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pytania zamknięte, otwarte i wypracowania z każdej lektury —
            oceniane natychmiast przez AI zgodnie z kryteriami CKE.
          </p>
        </motion.div>

        {/* Lektury obowiązkowe */}
        {requiredTests.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">
                Lektury obowiązkowe
              </h3>
              <span className="text-sm text-gray-500">
                ({requiredTests.length})
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {requiredTests.map((test, i) => (
                <TestMiniCard key={test.id} test={test} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Lektury uzupełniające */}
        {supplementaryTests.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-900">
                Lektury uzupełniające
              </h3>
              <span className="text-sm text-gray-500">
                ({supplementaryTests.length})
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {supplementaryTests.map((test, i) => (
                <TestMiniCard key={test.id} test={test} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/test"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-bold text-lg"
          >
            Zobacz wszystkie testy
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// ============ MINI CARD ============

const TestMiniCard: React.FC<{ test: TestLandingItem; index: number }> = ({
  test,
  index,
}) => {
  const epochLabel = test.epoch ? epochLabels[test.epoch] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
    >
      <Link
        to={`/test/${test.slug}`}
        className="group block bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-blue-200 transition-all h-full"
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-sm leading-snug">
            {test.title}
          </h4>
          {test.isRequired && (
            <ShieldCheck className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
          )}
        </div>

        {test.author && (
          <p className="text-xs text-gray-500 mb-2">{test.author}</p>
        )}

        <div className="flex flex-wrap items-center gap-1.5">
          {epochLabel && (
            <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-[11px] font-medium rounded-md">
              {epochLabel}
            </span>
          )}
          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[11px] font-medium rounded-md flex items-center gap-0.5">
            <FileText className="w-2.5 h-2.5" />
            {test.exerciseCount}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

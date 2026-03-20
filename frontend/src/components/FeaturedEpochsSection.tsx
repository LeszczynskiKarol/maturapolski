// frontend/src/components/FeaturedEpochsSection.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, FileText, GraduationCap } from "lucide-react";
import { api } from "../services/api";

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

export const FeaturedEpochsSection: React.FC = () => {
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

  if (loading || epochs.length === 0) return null;

  const totalQuestions = epochs.reduce((s, e) => s + e.exerciseCount, 0);
  const totalWorks = epochs.reduce((s, e) => s + e.workCount, 0);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white via-purple-50/30 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-5">
            <GraduationCap className="w-4 h-4" />
            <span className="text-sm font-semibold">
              {epochs.length} epok · {totalQuestions}+ pytań · {totalWorks}{" "}
              lektur
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Testy z{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              epok literackich
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Od Starożytności po Współczesność — sprawdź wiedzę z cech epok,
            twórców i kontekstów historycznych wymaganych na maturze.
          </p>
        </motion.div>

        {/* Epoch cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {epochs.map((epoch, i) => {
            const colors = epochColors[epoch.epoch] || epochColors.CONTEMPORARY;

            return (
              <motion.div
                key={epoch.epoch}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to={`/epoki/${epoch.slug}`}
                  className={`group block ${colors.bg} border ${colors.border} rounded-xl p-4 hover:shadow-md transition-all h-full`}
                >
                  {/* Number + Name */}
                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className={`w-8 h-8 bg-gradient-to-br ${colors.gradient} rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}
                    >
                      {i + 1}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-sm leading-snug truncate">
                        {epoch.name}
                      </h3>
                      <p className={`text-[11px] font-medium ${colors.text}`}>
                        {epoch.period}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="flex items-center gap-1 text-[11px] text-gray-500">
                      <FileText className="w-3 h-3" />
                      {epoch.exerciseCount} pytań
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-gray-500">
                      <BookOpen className="w-3 h-3" />
                      {epoch.workCount} lektur
                    </span>
                  </div>

                  {/* Authors */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {epoch.keyAuthors.slice(0, 2).map((a) => (
                      <span
                        key={a}
                        className="px-1.5 py-0.5 bg-white/60 text-gray-500 text-[10px] rounded border border-gray-200/50 truncate max-w-[120px]"
                      >
                        {a}
                      </span>
                    ))}
                    {epoch.keyAuthors.length > 2 && (
                      <span className="px-1.5 py-0.5 text-gray-400 text-[10px]">
                        +{epoch.keyAuthors.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Link */}
                  <span className="text-xs text-blue-600 font-semibold flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    Rozpocznij test
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/epoki"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-bold text-lg"
          >
            Zobacz wszystkie epoki
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

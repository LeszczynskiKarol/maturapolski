// frontend/src/features/learning/SessionSummary.tsx

import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  TrendingUp,
  Target,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Clock,
  Flame,
} from "lucide-react";

interface SessionSummaryProps {
  summary: {
    headline: string;
    celebrationEmoji: string;
    overallFeedback: string;
    sessionMetrics: {
      completed: number;
      correct: number;
      accuracy: number;
      points: number;
      timeSpent: number;
      streak: number;
    };
    comparison: {
      accuracyChange: number;
      isImprovement: boolean;
    };
    highlights: string[];
    improvements: string[];
    areasToFocus: string[];
    motivationalMessage: string;
    comparisonToPrevious: string;
    nextSteps: string[];
  };
  onClose: () => void;
}

export const SessionSummary: React.FC<SessionSummaryProps> = ({
  summary,
  onClose,
}) => {
  const { sessionMetrics, comparison } = summary;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header z emoji i tytułem */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white rounded-t-2xl">
          <div className="text-6xl mb-4 text-center">
            {summary.celebrationEmoji}
          </div>
          <h2 className="text-3xl font-bold text-center mb-2">
            {summary.headline}
          </h2>
          <p className="text-blue-100 text-center text-lg">
            {summary.overallFeedback}
          </p>
        </div>

        <div className="p-8 space-y-6">
          {/* Metryki sesji */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard
              icon={<CheckCircle className="w-5 h-5" />}
              label="Ukończone"
              value={`${sessionMetrics.correct}/${sessionMetrics.completed}`}
              color="green"
            />
            <MetricCard
              icon={<Target className="w-5 h-5" />}
              label="Dokładność"
              value={`${sessionMetrics.accuracy}%`}
              color={sessionMetrics.accuracy >= 70 ? "green" : "yellow"}
              badge={
                comparison.isImprovement
                  ? `+${comparison.accuracyChange}%`
                  : `${comparison.accuracyChange}%`
              }
            />
            <MetricCard
              icon={<Award className="w-5 h-5" />}
              label="Punkty"
              value={`+${sessionMetrics.points}`}
              color="purple"
            />
            <MetricCard
              icon={<Clock className="w-5 h-5" />}
              label="Czas"
              value={`${sessionMetrics.timeSpent} min`}
              color="blue"
            />
          </div>

          {/* Najdłuższa seria */}
          {sessionMetrics.streak >= 3 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-xl text-white"
            >
              <div className="flex items-center gap-3">
                <Flame className="w-8 h-8" />
                <div>
                  <p className="font-bold text-lg">Świetna passa!</p>
                  <p className="text-sm text-orange-100">
                    Najdłuższa seria poprawnych odpowiedzi:{" "}
                    {sessionMetrics.streak}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Porównanie z poprzednimi sesjami */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Porównanie z poprzednimi sesjami
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {summary.comparisonToPrevious}
                </p>
              </div>
            </div>
          </div>

          {/* Osiągnięcia */}
          {summary.highlights.length > 0 && (
            <Section
              title="🌟 Twoje osiągnięcia w tej sesji"
              items={summary.highlights}
              color="green"
            />
          )}

          {/* Postępy */}
          {summary.improvements.length > 0 && (
            <Section
              title="📈 Widoczny postęp"
              items={summary.improvements}
              color="purple"
            />
          )}

          {/* Obszary do pracy */}
          {summary.areasToFocus.length > 0 && (
            <Section
              title="🎯 Na co warto zwrócić uwagę"
              items={summary.areasToFocus}
              color="blue"
              icon={<Lightbulb className="w-5 h-5" />}
            />
          )}

          {/* Następne kroki */}
          {summary.nextSteps.length > 0 && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
              <h3 className="font-bold text-lg text-purple-900 dark:text-purple-100 mb-3 flex items-center gap-2">
                <ArrowRight className="w-5 h-5" />
                Następne kroki
              </h3>
              <ul className="space-y-2">
                {summary.nextSteps.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-purple-800 dark:text-purple-200"
                  >
                    <span className="text-purple-600 dark:text-purple-400 mt-1">
                      •
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Wiadomość motywacyjna */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl text-white text-center">
            <p className="text-lg font-medium leading-relaxed">
              {summary.motivationalMessage}
            </p>
          </div>

          {/* Przycisk zamknięcia */}
          <button
            onClick={onClose}
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
                     text-white rounded-xl hover:from-blue-700 hover:to-purple-700 
                     font-bold text-lg transition-all transform hover:scale-105
                     shadow-lg hover:shadow-xl"
          >
            Wróć do dashboardu
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Komponenty pomocnicze
const MetricCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  color: "green" | "yellow" | "purple" | "blue";
  badge?: string;
}> = ({ icon, label, value, color, badge }) => {
  const colorClasses = {
    green:
      "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300",
    yellow:
      "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300",
    purple:
      "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
  };

  const badgeColors = {
    green:
      "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
    yellow:
      "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300",
    purple:
      "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300",
    blue: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
  };

  return (
    <div className={`p-4 rounded-xl ${colorClasses[color]}`}>
      <div className="flex items-center gap-2 mb-1">{icon}</div>
      <p className="text-xs opacity-80 mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <p className="text-2xl font-bold">{value}</p>
        {badge && (
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${badgeColors[color]}`}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};

const Section: React.FC<{
  title: string;
  items: string[];
  color: "green" | "purple" | "blue";
  icon?: React.ReactNode;
}> = ({ title, items, color, icon }) => {
  const colorClasses = {
    green:
      "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100",
    purple:
      "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-100",
    blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
  };

  const bulletColors = {
    green: "text-green-600 dark:text-green-400",
    purple: "text-purple-600 dark:text-purple-400",
    blue: "text-blue-600 dark:text-blue-400",
  };

  return (
    <div className={`p-4 rounded-xl border ${colorClasses[color]}`}>
      <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className={`mt-1 ${bulletColors[color]}`}>•</span>
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

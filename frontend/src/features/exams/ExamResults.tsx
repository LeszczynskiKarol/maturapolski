// frontend/src/features/exams/ExamResults.tsx

import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import { motion } from "framer-motion";
import {
  Trophy,
  Download,
  Share2,
  Home,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Clock,
  Target,
  Award,
  FileText,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Lightbulb,
} from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

interface ExamResult {
  sessionId: string;
  totalScore: number;
  maxScore: number;
  percentScore: number;
  grade: string;
  assessment: QuestionAssessment[];
  summary: {
    level: string;
    message: string;
    strengths: string[];
    improvements: string[];
  };
}

interface QuestionAssessment {
  questionId: string;
  questionOrder: number;
  score: number;
  maxScore: number;
  feedback: any;
}

export const ExamResults: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedQuestions, setExpandedQuestions] = React.useState<Set<string>>(
    new Set()
  );

  // Wyniki mogą być przekazane przez navigate state lub pobrane z API
  const initialResults = location.state?.results as ExamResult | undefined;

  const { data: results, isLoading } = useQuery<ExamResult>({
    queryKey: ["exam-results", sessionId],
    queryFn: async () => {
      if (initialResults) return initialResults;
      const response = await api.get(`/api/exams/session/${sessionId}/results`);
      return response.data;
    },
    initialData: initialResults,
  });

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const getScoreColor = (percent: number) => {
    if (percent >= 90) return "text-green-600";
    if (percent >= 75) return "text-blue-600";
    if (percent >= 60) return "text-yellow-600";
    if (percent >= 30) return "text-orange-600";
    return "text-red-600";
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes("Celujący")) return "from-green-500 to-emerald-500";
    if (grade.includes("Bardzo dobry")) return "from-blue-500 to-indigo-500";
    if (grade.includes("Dobry")) return "from-yellow-500 to-orange-500";
    if (grade.includes("Dostateczny")) return "from-purple-500 to-pink-500";
    if (grade.includes("Dopuszczający")) return "from-gray-500 to-gray-600";
    return "from-red-500 to-red-600";
  };

  if (isLoading || !results) {
    return <ResultsLoader />;
  }

  // Statystyki
  const correctAnswers = results.assessment.filter(
    (a) => a.score === a.maxScore
  ).length;
  const partialAnswers = results.assessment.filter(
    (a) => a.score > 0 && a.score < a.maxScore
  ).length;
  const wrongAnswers = results.assessment.filter((a) => a.score === 0).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header z wynikiem */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block mb-4"
            >
              <Trophy className="w-20 h-20 text-yellow-500" />
            </motion.div>

            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              Egzamin zakończony!
            </h1>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`inline-block px-6 py-3 rounded-full text-white font-bold text-xl 
                        bg-gradient-to-r ${getGradeColor(results.grade)} mt-4`}
            >
              {results.grade}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ScoreCard
              title="Wynik"
              value={`${results.totalScore}/${results.maxScore}`}
              subtitle={`${results.percentScore}%`}
              icon={<Target className="w-6 h-6" />}
              color="purple"
            />
            <ScoreCard
              title="Poprawne"
              value={correctAnswers}
              subtitle={`z ${results.assessment.length} zadań`}
              icon={<CheckCircle className="w-6 h-6" />}
              color="green"
            />
            <ScoreCard
              title="Do poprawy"
              value={wrongAnswers + partialAnswers}
              subtitle="zadań z błędami"
              icon={<TrendingUp className="w-6 h-6" />}
              color="orange"
            />
          </div>

          {/* Wykres kołowy */}
          <div className="flex justify-center mb-8">
            <PieChart
              correct={correctAnswers}
              partial={partialAnswers}
              wrong={wrongAnswers}
            />
          </div>

          {/* Podsumowanie */}
          {results.summary && (
            <div className="border-t pt-6">
              <div
                className={`p-4 rounded-lg mb-4 ${
                  results.percentScore >= 30
                    ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                    : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                }`}
              >
                <p className="font-medium text-center">
                  {results.summary.message}
                </p>
              </div>

              {results.summary.strengths.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Mocne strony:
                  </h3>
                  <ul className="space-y-1">
                    {results.summary.strengths.map((strength, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                      >
                        <span className="text-green-500 mt-0.5">•</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {results.summary.improvements.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    Obszary do rozwoju:
                  </h3>
                  <ul className="space-y-1">
                    {results.summary.improvements.map((improvement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                      >
                        <span className="text-yellow-500 mt-0.5">•</span>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Szczegółowe odpowiedzi */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Szczegółowa analiza odpowiedzi
          </h2>

          <div className="space-y-4">
            {results.assessment.map((question, index) => {
              const isExpanded = expandedQuestions.has(question.questionId);
              const isCorrect = question.score === question.maxScore;
              const isPartial =
                question.score > 0 && question.score < question.maxScore;

              return (
                <motion.div
                  key={question.questionId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="border dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleQuestion(question.questionId)}
                    className="w-full px-6 py-4 flex items-center justify-between 
                             hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCorrect
                            ? "bg-green-100 dark:bg-green-900/30"
                            : isPartial
                            ? "bg-yellow-100 dark:bg-yellow-900/30"
                            : "bg-red-100 dark:bg-red-900/30"
                        }`}
                      >
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        ) : isPartial ? (
                          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                        )}
                      </div>

                      <div className="text-left">
                        <p className="font-medium text-gray-900 dark:text-white">
                          Zadanie {question.questionOrder}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {question.score}/{question.maxScore} pkt
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-right mr-4">
                        <span
                          className={`font-semibold ${getScoreColor(
                            (question.score / question.maxScore) * 100
                          )}`}
                        >
                          {Math.round(
                            (question.score / question.maxScore) * 100
                          )}
                          %
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {isExpanded && question.feedback && (
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/30 border-t dark:border-gray-700">
                      <QuestionFeedback feedback={question.feedback} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Przyciski akcji */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate("/exams")}
            className="px-6 py-3 bg-white dark:bg-gray-800 border dark:border-gray-700 
                     rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 
                     transition-colors flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Powrót do egzaminów
          </button>

          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg 
                     hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Pobierz wyniki
          </button>
        </div>
      </div>
    </div>
  );
};

// Komponenty pomocnicze
const ScoreCard: React.FC<{
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, subtitle, icon, color }) => {
  const colors = {
    purple:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    green:
      "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    orange:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  };

  return (
    <div className={`p-4 rounded-xl ${colors[color as keyof typeof colors]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium opacity-80">{title}</span>
        {icon}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs opacity-70">{subtitle}</p>
    </div>
  );
};

const PieChart: React.FC<{
  correct: number;
  partial: number;
  wrong: number;
}> = ({ correct, partial, wrong }) => {
  const total = correct + partial + wrong;
  const correctAngle = (correct / total) * 360;
  const partialAngle = (partial / total) * 360;

  return (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="96"
          cy="96"
          r="80"
          stroke="#10b981"
          strokeWidth="32"
          fill="none"
          strokeDasharray={`${(correctAngle / 360) * 502.4} 502.4`}
          className="opacity-80"
        />
        <circle
          cx="96"
          cy="96"
          r="80"
          stroke="#f59e0b"
          strokeWidth="32"
          fill="none"
          strokeDasharray={`${(partialAngle / 360) * 502.4} 502.4`}
          strokeDashoffset={`-${(correctAngle / 360) * 502.4}`}
          className="opacity-80"
        />
        <circle
          cx="96"
          cy="96"
          r="80"
          stroke="#ef4444"
          strokeWidth="32"
          fill="none"
          strokeDasharray={`${
            ((360 - correctAngle - partialAngle) / 360) * 502.4
          } 502.4`}
          strokeDashoffset={`-${((correctAngle + partialAngle) / 360) * 502.4}`}
          className="opacity-80"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {total}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">zadań</p>
        </div>
      </div>
    </div>
  );
};

const QuestionFeedback: React.FC<{ feedback: any }> = ({ feedback }) => {
  if (!feedback) return null;

  // Dla zadań zamkniętych
  if (feedback.correct !== undefined) {
    return (
      <div className="space-y-2">
        {!feedback.correct && feedback.correctAnswerText && (
          <p className="text-sm">
            <strong>Poprawna odpowiedź:</strong> {feedback.correctAnswerText}
          </p>
        )}
        {feedback.explanation && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Wyjaśnienie:</strong> {feedback.explanation}
          </p>
        )}
      </div>
    );
  }

  // Dla krótkich odpowiedzi
  if (feedback.feedback) {
    return (
      <div className="space-y-3">
        <p className="text-sm">{feedback.feedback}</p>

        {feedback.correctAnswer && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Przykładowa poprawna odpowiedź:
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              {feedback.correctAnswer}
            </p>
          </div>
        )}

        {feedback.suggestions?.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-1">Sugestie:</p>
            <ul className="space-y-1">
              {feedback.suggestions.map((suggestion: string, i: number) => (
                <li
                  key={i}
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  • {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // Dla wypracowań
  if (feedback.detailedFeedback) {
    return (
      <div className="space-y-3">
        {feedback.detailedFeedback.strengths?.length > 0 && (
          <div>
            <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
              Mocne strony:
            </p>
            <ul className="space-y-1">
              {feedback.detailedFeedback.strengths.map(
                (s: string, i: number) => (
                  <li
                    key={i}
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    • {s}
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        {feedback.detailedFeedback.weaknesses?.length > 0 && (
          <div>
            <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">
              Do poprawy:
            </p>
            <ul className="space-y-1">
              {feedback.detailedFeedback.weaknesses.map(
                (w: string, i: number) => (
                  <li
                    key={i}
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    • {w}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return null;
};

const ResultsLoader: React.FC = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <BarChart3 className="w-12 h-12 animate-pulse text-purple-600 mx-auto mb-4" />
      <p className="text-gray-600 dark:text-gray-400">Ładowanie wyników...</p>
    </div>
  </div>
);

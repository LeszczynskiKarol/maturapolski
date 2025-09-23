// frontend/src/features/exams/LiveExam.tsx

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Save,
  Send,
  AlertCircle,
  CheckCircle,
  Circle,
  HelpCircle,
  Flag,
  Menu,
  X,
  FileText,
  AlertTriangle,
  Loader2,
  Home,
} from "lucide-react";
import { toast } from "react-hot-toast";
import confetti from "canvas-confetti";

interface ExamSession {
  id: string;
  exam: {
    title: string;
    duration: number;
    sections: Section[];
  };
  answers: Answer[];
  remainingMinutes: number;
  status: string;
}

interface Section {
  id: string;
  title: string;
  instruction: string;
  questions: Question[];
  order: number;
}

interface Question {
  id: string;
  order: number;
  type: string;
  question: string;
  content?: any;
  points: number;
  exercise?: any;
}

interface Answer {
  questionId: string;
  answer: any;
}

export const LiveExam: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, any>>(new Map());
  const [showSidebar, setShowSidebar] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false); // PRZENIESIONE TUTAJ!
  const [autoSaveStatus, setAutoSaveStatus] = useState<
    "saved" | "saving" | "error"
  >("saved");

  const autoSaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null); // POPRAWIONY TYP!
  const lastSavedAnswer = useRef<string>("");

  // Pobierz sesję
  const {
    data: session,
    isLoading,
    error,
  } = useQuery<ExamSession>({
    queryKey: ["exam-session", sessionId],
    queryFn: () =>
      api.get(`/api/exams/session/${sessionId}`).then((r) => r.data),
    refetchInterval: 60000, // Odśwież co minutę (dla czasu)
  });

  // Zapisz odpowiedź
  const saveAnswerMutation = useMutation({
    mutationFn: (data: { questionId: string; answer: any }) =>
      api.post(`/api/exams/session/${sessionId}/answer`, data),
    onSuccess: () => {
      setAutoSaveStatus("saved");
    },
    onError: () => {
      setAutoSaveStatus("error");
      toast.error("Błąd zapisu odpowiedzi");
    },
  });

  // Zakończ egzamin
  const finishExamMutation = useMutation({
    mutationFn: () => api.post(`/api/exams/session/${sessionId}/finish`),
    onSuccess: (data) => {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
      });
      navigate(`/exam/results/${sessionId}`, {
        state: { results: data.data },
      });
    },
  });

  // Wszystkie pytania
  const allQuestions =
    session?.exam.sections
      .sort((a, b) => a.order - b.order)
      .flatMap((section) =>
        section.questions.sort((a, b) => a.order - b.order)
      ) || [];

  const currentQuestion = allQuestions[currentQuestionIndex];
  const currentSection = session?.exam.sections.find((s) =>
    s.questions.some((q) => q.id === currentQuestion?.id)
  );

  // Auto-save odpowiedzi
  const handleAnswerChange = useCallback(
    (answer: any) => {
      if (!currentQuestion) return;

      setAnswers((prev) => new Map(prev).set(currentQuestion.id, answer));
      setAutoSaveStatus("saving");

      // Debounce auto-save
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current);
      }

      autoSaveTimeout.current = setTimeout(() => {
        const answerString = JSON.stringify(answer);
        if (answerString !== lastSavedAnswer.current) {
          saveAnswerMutation.mutate({
            questionId: currentQuestion.id,
            answer,
          });
          lastSavedAnswer.current = answerString;
        }
      }, 2000);
    },
    [currentQuestion, saveAnswerMutation]
  );

  // Timer
  useEffect(() => {
    if (
      session?.remainingMinutes &&
      session.remainingMinutes <= 5 &&
      !showWarning
    ) {
      setShowWarning(true);
      toast.error("Pozostało mniej niż 5 minut!", { duration: 5000 });
    }

    if (session?.remainingMinutes === 0) {
      finishExamMutation.mutate();
    }
  }, [session?.remainingMinutes]);

  // Załaduj zapisane odpowiedzi
  useEffect(() => {
    if (session?.answers) {
      const savedAnswers = new Map();
      session.answers.forEach((a) => {
        savedAnswers.set(a.questionId, a.answer);
      });
      setAnswers(savedAnswers);
    }
  }, [session?.answers]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "s":
            e.preventDefault();
            // Force save current answer
            if (currentQuestion && answers.has(currentQuestion.id)) {
              saveAnswerMutation.mutate({
                questionId: currentQuestion.id,
                answer: answers.get(currentQuestion.id),
              });
            }
            break;
          case "Enter":
            if (currentQuestionIndex < allQuestions.length - 1) {
              setCurrentQuestionIndex((i) => i + 1);
            }
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    currentQuestionIndex,
    allQuestions.length,
    currentQuestion,
    answers,
    saveAnswerMutation,
  ]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current);
      }
    };
  }, []);

  if (isLoading) {
    return <ExamLoader />;
  }

  if (error || !session) {
    return <ExamError />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <ExamHeader
        title={session.exam.title}
        remainingMinutes={session.remainingMinutes}
        onToggleSidebar={() => setShowSidebar(!showSidebar)}
        onExit={() => navigate("/exams")}
        showWarning={showWarning}
      />

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <ExamSidebar
              sections={session.exam.sections}
              allQuestions={allQuestions}
              answers={answers}
              currentQuestionIndex={currentQuestionIndex}
              onQuestionSelect={setCurrentQuestionIndex}
              onClose={() => setShowSidebar(false)}
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 max-w-4xl mx-auto p-6">
          {/* Progress Bar */}
          <ExamProgress
            current={currentQuestionIndex + 1}
            total={allQuestions.length}
            answered={answers.size}
          />

          {/* Question */}
          {currentQuestion && currentSection && (
            <QuestionCard
              question={currentQuestion}
              section={currentSection}
              answer={answers.get(currentQuestion.id)}
              onAnswerChange={handleAnswerChange}
              autoSaveStatus={autoSaveStatus}
              questionNumber={currentQuestionIndex + 1}
            />
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => setCurrentQuestionIndex((i) => Math.max(0, i - 1))}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 
                       hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Poprzednie
            </button>

            <div className="flex gap-2">
              {allQuestions
                .map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`w-10 h-10 rounded-lg transition-all ${
                      index === currentQuestionIndex
                        ? "bg-purple-600 text-white"
                        : answers.has(allQuestions[index].id)
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))
                .slice(
                  Math.max(0, currentQuestionIndex - 5),
                  Math.min(allQuestions.length, currentQuestionIndex + 6)
                )}
            </div>

            {currentQuestionIndex < allQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex((i) => i + 1)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 
                         text-white rounded-lg hover:bg-purple-700"
              >
                Następne
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => setShowFinishModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 
                         text-white rounded-lg hover:bg-green-700"
              >
                <Send className="w-5 h-5" />
                Zakończ egzamin
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Finish Modal */}
      <FinishExamModal
        show={showFinishModal}
        onClose={() => setShowFinishModal(false)}
        onConfirm={() => finishExamMutation.mutate()}
        answeredCount={answers.size}
        totalCount={allQuestions.length}
        isLoading={finishExamMutation.isPending}
      />
    </div>
  );
};

// Reszta komponentów pozostaje bez zmian...
// (QuestionCard, AnswerInput, ExamHeader, ExamProgress, ExamSidebar, FinishExamModal, ExamLoader, ExamError)

// Komponent pytania
const QuestionCard: React.FC<{
  question: Question;
  section: Section;
  answer: any;
  onAnswerChange: (answer: any) => void;
  autoSaveStatus: "saved" | "saving" | "error";
  questionNumber: number;
}> = ({
  question,
  section,
  answer,
  onAnswerChange,
  autoSaveStatus,
  questionNumber,
}) => {
  const exercise = question.exercise || question;

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span
              className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 
                         text-purple-700 dark:text-purple-300 rounded-full text-sm"
            >
              {section.title}
            </span>
            <span className="text-sm text-gray-500">
              Zadanie {questionNumber} / {question.points} pkt
            </span>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {exercise.question}
          </h3>
        </div>

        {/* Auto-save indicator */}
        <div className="flex items-center gap-2 text-sm">
          {autoSaveStatus === "saving" && (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
              <span className="text-gray-500">Zapisywanie...</span>
            </>
          )}
          {autoSaveStatus === "saved" && (
            <>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-green-600">Zapisano</span>
            </>
          )}
          {autoSaveStatus === "error" && (
            <>
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-red-600">Błąd zapisu</span>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      {exercise.content?.text && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
            {exercise.content.text}
          </p>
        </div>
      )}

      {/* Answer Input */}
      <AnswerInput
        type={exercise.type}
        exercise={exercise}
        value={answer}
        onChange={onAnswerChange}
      />
    </motion.div>
  );
};

// Komponent inputu odpowiedzi
const AnswerInput: React.FC<{
  type: string;
  exercise: any;
  value: any;
  onChange: (value: any) => void;
}> = ({ type, exercise, value, onChange }) => {
  switch (type) {
    case "CLOSED_SINGLE":
      return (
        <div className="space-y-2">
          {exercise.content?.options?.map((option: string, index: number) => (
            <label
              key={index}
              className="flex items-center gap-3 p-4 border rounded-lg 
                       hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
            >
              <input
                type="radio"
                checked={value === index}
                onChange={() => onChange(index)}
                className="w-4 h-4 text-purple-600"
              />
              <span className="flex-1 text-gray-700 dark:text-gray-300">
                {option}
              </span>
            </label>
          ))}
        </div>
      );

    case "CLOSED_MULTIPLE":
      return (
        <div className="space-y-2">
          {exercise.content?.options?.map((option: string, index: number) => (
            <label
              key={index}
              className="flex items-center gap-3 p-4 border rounded-lg 
                       hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={value?.includes(index)}
                onChange={(e) => {
                  const current = value || [];
                  if (e.target.checked) {
                    onChange([...current, index]);
                  } else {
                    onChange(current.filter((i: number) => i !== index));
                  }
                }}
                className="w-4 h-4 text-purple-600"
              />
              <span className="flex-1 text-gray-700 dark:text-gray-300">
                {option}
              </span>
            </label>
          ))}
        </div>
      );

    case "SHORT_ANSWER":
      return (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 
                   focus:ring-purple-500 resize-none"
          rows={6}
          placeholder="Wpisz swoją odpowiedź..."
        />
      );

    case "ESSAY":
      return (
        <div>
          <div className="mb-2 flex justify-between text-sm text-gray-600">
            <span>Wypracowanie</span>
            <span>
              {value ? value.split(/\s+/).filter(Boolean).length : 0} słów
              {value && value.split(/\s+/).filter(Boolean).length < 400 && (
                <span className="text-red-500 ml-1">(min. 400)</span>
              )}
            </span>
          </div>
          <textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 
                     focus:ring-purple-500 resize-none font-serif"
            rows={20}
            placeholder="Napisz wypracowanie..."
          />
        </div>
      );

    default:
      return <div>Nieobsługiwany typ zadania</div>;
  }
};

// Pozostałe komponenty pomocnicze
const ExamHeader: React.FC<{
  title: string;
  remainingMinutes: number;
  onToggleSidebar: () => void;
  onExit: () => void;
  showWarning: boolean;
}> = ({ title, remainingMinutes, onToggleSidebar, onExit, showWarning }) => {
  const hours = Math.floor(remainingMinutes / 60);
  const minutes = remainingMinutes % 60;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>

            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                showWarning
                  ? "bg-red-100 text-red-700 animate-pulse"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <Clock className="w-5 h-5" />
              <span className="font-mono font-semibold">
                {hours.toString().padStart(2, "0")}:
                {minutes.toString().padStart(2, "0")}
              </span>
            </div>

            <button
              onClick={onExit}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <Home className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExamProgress: React.FC<{
  current: number;
  total: number;
  answered: number;
}> = ({ current, total, answered }) => (
  <div className="mb-6">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm text-gray-600">
        Pytanie {current} z {total}
      </span>
      <span className="text-sm text-gray-600">
        Odpowiedzi: {answered}/{total}
      </span>
    </div>
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all"
        style={{ width: `${(answered / total) * 100}%` }}
      />
    </div>
  </div>
);

const ExamSidebar: React.FC<{
  sections: Section[];
  allQuestions: Question[];
  answers: Map<string, any>;
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
  onClose: () => void;
}> = ({
  sections,
  allQuestions,
  answers,
  currentQuestionIndex,
  onQuestionSelect,
  onClose,
}) => (
  <motion.div
    initial={{ x: -320 }}
    animate={{ x: 0 }}
    exit={{ x: -320 }}
    className="w-80 bg-white dark:bg-gray-800 h-[calc(100vh-73px)] 
             border-r dark:border-gray-700 overflow-y-auto"
  >
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Nawigacja</h2>
        <button onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>

      {sections.map((section) => (
        <div key={section.id} className="mb-6">
          <h3 className="font-medium text-sm text-gray-600 mb-2">
            {section.title}
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {section.questions.map((q, localIndex) => {
              const globalIndex = allQuestions.findIndex(
                (aq) => aq.id === q.id
              );
              const isAnswered = answers.has(q.id);
              const isCurrent = globalIndex === currentQuestionIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => onQuestionSelect(globalIndex)}
                  className={`p-2 rounded-lg text-sm font-medium transition-all ${
                    isCurrent
                      ? "bg-purple-600 text-white"
                      : isAnswered
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {q.order}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <h3 className="font-medium mb-2">Legenda</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-600 rounded" />
            <span>Obecne pytanie</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded" />
            <span>Odpowiedziane</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded" />
            <span>Bez odpowiedzi</span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const FinishExamModal: React.FC<{
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  answeredCount: number;
  totalCount: number;
  isLoading: boolean;
}> = ({ show, onClose, onConfirm, answeredCount, totalCount, isLoading }) => {
  if (!show) return null;

  const unanswered = totalCount - answeredCount;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Zakończ egzamin?</h2>

        {unanswered > 0 && (
          <div
            className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 
                        border border-yellow-200 dark:border-yellow-700 rounded-lg"
          >
            <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
              <AlertTriangle className="w-5 h-5" />
              <span>Masz {unanswered} pytań bez odpowiedzi!</span>
            </div>
          </div>
        )}

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Po zakończeniu egzaminu nie będzie możliwości powrotu do pytań. Czy na
          pewno chcesz zakończyć?
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg 
                     hover:bg-gray-50 disabled:opacity-50"
          >
            Wróć do egzaminu
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg 
                     hover:bg-green-700 disabled:opacity-50 flex items-center 
                     justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Ocenianie...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Zakończ i oceń
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const ExamLoader: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
      <p className="text-gray-600">Ładowanie egzaminu...</p>
    </div>
  </div>
);

const ExamError: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Błąd ładowania egzaminu</h2>
        <p className="text-gray-600 mb-4">
          Nie udało się załadować sesji egzaminacyjnej.
        </p>
        <button
          onClick={() => navigate("/exams")}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Powrót do listy egzaminów
        </button>
      </div>
    </div>
  );
};

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
  SkipForward,
  Eye,
  List,
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
  const [skippedQuestions, setSkippedQuestions] = useState<Set<string>>(
    new Set()
  );
  const [showSidebar, setShowSidebar] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [showQuestionPreview, setShowQuestionPreview] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<
    "saved" | "saving" | "error"
  >("saved");

  const autoSaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedAnswer = useRef<string>("");
  const hasInitialized = useRef(false);

  // Pobierz sesję
  const {
    data: session,
    isLoading,
    error,
  } = useQuery<ExamSession>({
    queryKey: ["exam-session", sessionId],
    queryFn: () =>
      api.get(`/api/exams/session/${sessionId}`).then((r) => r.data),
    refetchInterval: 60000,
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
    onError: () => {
      toast.error("Błąd podczas kończenia egzaminu");
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

  // Znajdź pierwsze nierozwiązane zadanie przy wznowieniu
  useEffect(() => {
    if (session && allQuestions.length > 0 && !hasInitialized.current) {
      hasInitialized.current = true;

      // Załaduj zapisane odpowiedzi
      const savedAnswers = new Map<string, any>();
      session.answers.forEach((a) => {
        savedAnswers.set(a.questionId, a.answer);
      });
      setAnswers(savedAnswers);

      // Znajdź pierwsze pytanie bez odpowiedzi
      const firstUnansweredIndex = allQuestions.findIndex(
        (q) =>
          !session.answers.some(
            (a) => a.questionId === q.id && a.answer !== null
          )
      );

      if (firstUnansweredIndex !== -1) {
        setCurrentQuestionIndex(firstUnansweredIndex);
        toast.success(`Kontynuujesz od zadania ${firstUnansweredIndex + 1}`);
      }
    }
  }, [session, allQuestions]);

  // Auto-save odpowiedzi
  const handleAnswerChange = useCallback(
    (answer: any) => {
      if (!currentQuestion) return;

      setAnswers((prev) => {
        const newAnswers = new Map(prev);
        newAnswers.set(currentQuestion.id, answer);
        return newAnswers;
      });

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
      }, 1500);
    },
    [currentQuestion, saveAnswerMutation]
  );

  // Pomiń pytanie
  const skipQuestion = () => {
    if (currentQuestion) {
      setSkippedQuestions((prev) => new Set(prev).add(currentQuestion.id));
      toast("Pytanie pominięte - możesz wrócić do niego później");

      // Przejdź do następnego
      if (currentQuestionIndex < allQuestions.length - 1) {
        setCurrentQuestionIndex((i) => i + 1);
      }
    }
  };

  // Przejdź do następnego nierozwiązanego
  const goToNextUnanswered = () => {
    for (let i = currentQuestionIndex + 1; i < allQuestions.length; i++) {
      if (
        !answers.has(allQuestions[i].id) ||
        answers.get(allQuestions[i].id) === null
      ) {
        setCurrentQuestionIndex(i);
        return;
      }
    }
    // Jeśli nie ma następnych, sprawdź od początku
    for (let i = 0; i < currentQuestionIndex; i++) {
      if (
        !answers.has(allQuestions[i].id) ||
        answers.get(allQuestions[i].id) === null
      ) {
        setCurrentQuestionIndex(i);
        return;
      }
    }
    toast("Wszystkie pytania zostały rozwiązane!");
  };

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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "s":
            e.preventDefault();
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
          case "k":
            e.preventDefault();
            skipQuestion();
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentQuestionIndex, allQuestions.length, currentQuestion, answers]);

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
        onTogglePreview={() => setShowQuestionPreview(!showQuestionPreview)}
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
              skippedQuestions={skippedQuestions}
              currentQuestionIndex={currentQuestionIndex}
              onQuestionSelect={setCurrentQuestionIndex}
              onClose={() => setShowSidebar(false)}
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 max-w-4xl mx-auto p-6">
          {/* Action Bar */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <button
                onClick={skipQuestion}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-yellow-100 
                         text-yellow-700 rounded-lg hover:bg-yellow-200"
              >
                <SkipForward className="w-4 h-4" />
                Pomiń zadanie
              </button>

              <button
                onClick={goToNextUnanswered}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-100 
                         text-blue-700 rounded-lg hover:bg-blue-200"
              >
                <Eye className="w-4 h-4" />
                Następne nierozwiązane
              </button>

              <button
                onClick={() => setShowQuestionPreview(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 
                         text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <List className="w-4 h-4" />
                Podgląd wszystkich
              </button>
            </div>

            <button
              onClick={() => setShowFinishModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-red-100 
                       text-red-700 rounded-lg hover:bg-red-200"
            >
              <Send className="w-4 h-4" />
              Zakończ egzamin
            </button>
          </div>

          {/* Progress Bar */}
          <ExamProgress
            current={currentQuestionIndex + 1}
            total={allQuestions.length}
            answered={answers.size}
            skipped={skippedQuestions.size}
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
              isSkipped={skippedQuestions.has(currentQuestion.id)}
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
                .map((q, index) => {
                  const isAnswered =
                    answers.has(q.id) && answers.get(q.id) !== null;
                  const isSkipped = skippedQuestions.has(q.id);
                  const isCurrent = index === currentQuestionIndex;

                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`w-10 h-10 rounded-lg transition-all text-sm font-medium ${
                        isCurrent
                          ? "bg-purple-600 text-white"
                          : isAnswered
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : isSkipped
                          ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                      title={`Zadanie ${index + 1}${
                        isSkipped ? " (pominięte)" : ""
                      }${isAnswered ? " (rozwiązane)" : ""}`}
                    >
                      {index + 1}
                    </button>
                  );
                })
                .slice(
                  Math.max(0, currentQuestionIndex - 5),
                  Math.min(allQuestions.length, currentQuestionIndex + 6)
                )}
            </div>

            <button
              onClick={() => {
                if (currentQuestionIndex < allQuestions.length - 1) {
                  setCurrentQuestionIndex((i) => i + 1);
                } else {
                  setCurrentQuestionIndex(0); // Wróć do początku
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 
                       text-white rounded-lg hover:bg-purple-700"
            >
              Następne
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Question Preview Modal */}
      {showQuestionPreview && (
        <QuestionPreviewModal
          questions={allQuestions}
          sections={session.exam.sections}
          answers={answers}
          skippedQuestions={skippedQuestions}
          onSelectQuestion={(index) => {
            setCurrentQuestionIndex(index);
            setShowQuestionPreview(false);
          }}
          onClose={() => setShowQuestionPreview(false)}
        />
      )}

      {/* Finish Modal */}
      <FinishExamModal
        show={showFinishModal}
        onClose={() => setShowFinishModal(false)}
        onConfirm={() => finishExamMutation.mutate()}
        answeredCount={
          Array.from(answers.values()).filter((a) => a !== null).length
        }
        totalCount={allQuestions.length}
        skippedCount={skippedQuestions.size}
        isLoading={finishExamMutation.isPending}
      />
    </div>
  );
};

// Nowy komponent - Podgląd wszystkich pytań
const QuestionPreviewModal: React.FC<{
  questions: Question[];
  sections: Section[];
  answers: Map<string, any>;
  skippedQuestions: Set<string>;
  onSelectQuestion: (index: number) => void;
  onClose: () => void;
}> = ({
  questions,
  sections,
  answers,
  skippedQuestions,
  onSelectQuestion,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Podgląd wszystkich zadań</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id}>
              <h3 className="font-medium text-lg mb-2">{section.title}</h3>
              <div className="space-y-2">
                {section.questions.map((question, idx) => {
                  const globalIndex = questions.findIndex(
                    (q) => q.id === question.id
                  );
                  const isAnswered =
                    answers.has(question.id) &&
                    answers.get(question.id) !== null;
                  const isSkipped = skippedQuestions.has(question.id);

                  return (
                    <div
                      key={question.id}
                      onClick={() => onSelectQuestion(globalIndex)}
                      className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 
                                dark:hover:bg-gray-700 ${
                                  isAnswered
                                    ? "border-green-300 bg-green-50"
                                    : isSkipped
                                    ? "border-yellow-300 bg-yellow-50"
                                    : "border-gray-300"
                                }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <span className="font-medium">
                            Zadanie {question.order}
                          </span>
                          <span className="ml-2 text-sm text-gray-600">
                            ({question.points} pkt)
                          </span>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 truncate">
                            {question.question ||
                              question.exercise?.question ||
                              "Brak treści"}
                          </p>
                        </div>
                        <div className="ml-4">
                          {isAnswered && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                          {isSkipped && !isAnswered && (
                            <SkipForward className="w-5 h-5 text-yellow-500" />
                          )}
                          {!isAnswered && !isSkipped && (
                            <Circle className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// Zaktualizowany QuestionCard
const QuestionCard: React.FC<{
  question: Question;
  section: Section;
  answer: any;
  onAnswerChange: (answer: any) => void;
  autoSaveStatus: "saved" | "saving" | "error";
  questionNumber: number;
  isSkipped: boolean;
}> = ({
  question,
  section,
  answer,
  onAnswerChange,
  autoSaveStatus,
  questionNumber,
  isSkipped,
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
            {isSkipped && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                Pominięte
              </span>
            )}
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
          {autoSaveStatus === "saved" &&
            answer !== null &&
            answer !== undefined && (
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

      {/* Answer Input - pokazuje aktualną wartość */}
      <AnswerInput
        type={exercise.type}
        exercise={exercise}
        value={answer}
        onChange={onAnswerChange}
      />

      {/* Debug info - usuń w produkcji */}
      <div className="mt-4 text-xs text-gray-400">
        Debug: answer = {JSON.stringify(answer)}
      </div>
    </motion.div>
  );
};

// Zaktualizowany ExamProgress
const ExamProgress: React.FC<{
  current: number;
  total: number;
  answered: number;
  skipped: number;
}> = ({ current, total, answered, skipped }) => (
  <div className="mb-6">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm text-gray-600">
        Pytanie {current} z {total}
      </span>
      <span className="text-sm text-gray-600">
        Rozwiązane: {answered}/{total} | Pominięte: {skipped}
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

// Zaktualizowany ExamHeader
const ExamHeader: React.FC<{
  title: string;
  remainingMinutes: number;
  onToggleSidebar: () => void;
  onTogglePreview: () => void;
  onExit: () => void;
  showWarning: boolean;
}> = ({
  title,
  remainingMinutes,
  onToggleSidebar,
  onTogglePreview,
  onExit,
  showWarning,
}) => {
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
              title="Nawigacja"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              onClick={onTogglePreview}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              title="Podgląd wszystkich zadań"
            >
              <List className="w-5 h-5" />
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
              title="Wyjdź"
            >
              <Home className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Zaktualizowany FinishExamModal
const FinishExamModal: React.FC<{
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  answeredCount: number;
  totalCount: number;
  skippedCount: number;
  isLoading: boolean;
}> = ({
  show,
  onClose,
  onConfirm,
  answeredCount,
  totalCount,
  skippedCount,
  isLoading,
}) => {
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

        <div className="space-y-2 mb-4">
          <p className="text-sm">
            <span className="font-medium">Rozwiązane zadania:</span>{" "}
            {answeredCount}/{totalCount}
          </p>
          {skippedCount > 0 && (
            <p className="text-sm text-yellow-600">
              <span className="font-medium">Pominięte zadania:</span>{" "}
              {skippedCount}
            </p>
          )}
          {unanswered > 0 && (
            <p className="text-sm text-red-600">
              <span className="font-medium">Nierozwiązane zadania:</span>{" "}
              {unanswered}
            </p>
          )}
        </div>

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
          Egzamin zostanie oceniony na podstawie udzielonych odpowiedzi. Czy na
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
              className={`flex items-center gap-3 p-4 border rounded-lg 
                       hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer
                       ${
                         value === index
                           ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                           : "border-gray-300"
                       }`}
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
              className={`flex items-center gap-3 p-4 border rounded-lg 
                       hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer
                       ${
                         value?.includes(index)
                           ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                           : "border-gray-300"
                       }`}
            >
              <input
                type="checkbox"
                checked={value?.includes(index) || false}
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
                   focus:ring-purple-500 resize-none dark:bg-gray-700 
                   dark:border-gray-600 dark:text-gray-200"
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
                     focus:ring-purple-500 resize-none font-serif
                     dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            rows={20}
            placeholder="Napisz wypracowanie..."
          />
        </div>
      );

    default:
      return <div>Nieobsługiwany typ zadania: {type}</div>;
  }
};

// Komponent Sidebar
const ExamSidebar: React.FC<{
  sections: Section[];
  allQuestions: Question[];
  answers: Map<string, any>;
  skippedQuestions: Set<string>;
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
  onClose: () => void;
}> = ({
  sections,
  allQuestions,
  answers,
  skippedQuestions,
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
          <h3 className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-2">
            {section.title}
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {section.questions.map((q) => {
              const globalIndex = allQuestions.findIndex(
                (aq) => aq.id === q.id
              );
              const isAnswered =
                answers.has(q.id) && answers.get(q.id) !== null;
              const isSkipped = skippedQuestions.has(q.id);
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
                      : isSkipped
                      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                  }`}
                  title={`Zadanie ${q.order}${isSkipped ? " (pominięte)" : ""}${
                    isAnswered ? " (rozwiązane)" : ""
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
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded" />
            <span>Pominięte</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded" />
            <span>Bez odpowiedzi</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-sm mb-2">Skróty klawiszowe</h4>
        <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
          <li>
            <kbd>Ctrl+S</kbd> - Zapisz odpowiedź
          </li>
          <li>
            <kbd>Ctrl+K</kbd> - Pomiń zadanie
          </li>
          <li>
            <kbd>Ctrl+Enter</kbd> - Następne zadanie
          </li>
        </ul>
      </div>
    </div>
  </motion.div>
);

// Komponenty loaderów
const ExamLoader: React.FC = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
      <p className="text-gray-600 dark:text-gray-400">Ładowanie egzaminu...</p>
    </div>
  </div>
);

const ExamError: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Błąd ładowania egzaminu</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
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

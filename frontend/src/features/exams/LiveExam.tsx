// frontend/src/features/exams/LiveExam.tsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import {
  Clock,
  ChevronRight,
  ChevronLeft,
  Send,
  FileText,
  Home,
  Brain,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { toast } from "react-hot-toast";

export const LiveExam: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const { data: session, isLoading } = useQuery({
    queryKey: ["exam-session", sessionId],
    queryFn: () =>
      api.get(`/api/exams/session/${sessionId}`).then((r) => r.data),
    refetchInterval: 60000, // Odświeżaj co minutę dla timera
  });

  // Timer
  useEffect(() => {
    if (session?.remainingMinutes) {
      setTimeLeft(session.remainingMinutes * 60);
    }
  }, [session?.remainingMinutes]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev && prev <= 1) {
          handleFinish(); // Auto-finish gdy czas się skończy
          return 0;
        }
        return prev ? prev - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const saveAnswerMutation = useMutation({
    mutationFn: (data: { questionId: string; answer: any }) =>
      api.post(`/api/exams/session/${sessionId}/answer`, data),
    onSuccess: () => {
      // Cichy zapis
    },
  });

  const finishMutation = useMutation({
    mutationFn: () => api.post(`/api/exams/session/${sessionId}/finish`),
    onSuccess: (response) => {
      toast.success("Egzamin zakończony! Oceniamy odpowiedzi...");
      navigate(`/exam/results/${sessionId}`);
    },
    onError: () => {
      toast.error("Błąd podczas kończenia egzaminu");
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!session) return null;

  // Sprawdź czy to egzamin dynamiczny
  const isDynamic = session.isIntelligent || false;

  // Pobierz pytania
  let allQuestions: any[] = [];

  if (isDynamic && session.assessment?.questionsMetadata) {
    // Dla dynamicznych egzaminów - pobierz pytania z metadanych
    allQuestions = session.assessment.questionsMetadata.map(
      (meta: any, idx: number) => ({
        id: `dynamic-${idx}`,
        exerciseId: meta.exerciseId,
        type: meta.type,
        points: meta.points,
        section: meta.section,
        order: idx + 1,
        // Pobierz treść z exercises jeśli dostępne
        question: meta.question || `Zadanie ${idx + 1}`,
        content: meta.content || {},
      })
    );
  } else {
    // Dla statycznych egzaminów
    allQuestions = session.exam.sections
      .sort((a: any, b: any) => a.order - b.order)
      .flatMap((s: any) =>
        s.questions
          .sort((a: any, b: any) => a.order - b.order)
          .map((q: any) => ({ ...q, section: s.title }))
      );
  }

  const currentQuestion = allQuestions[currentQuestionIndex];
  const progressPercent =
    ((currentQuestionIndex + 1) / allQuestions.length) * 100;

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswer = (answer: any) => {
    const questionId = currentQuestion.exerciseId || currentQuestion.id;
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));

    // Auto-save
    saveAnswerMutation.mutate({
      questionId,
      answer,
    });
  };

  const handleFinish = () => {
    if (confirm("Czy na pewno chcesz zakończyć egzamin?")) {
      finishMutation.mutate();
    }
  };

  const renderQuestion = () => {
    const questionType = currentQuestion.type;
    const content = currentQuestion.content || {};
    const currentAnswer =
      answers[currentQuestion.exerciseId || currentQuestion.id];

    switch (questionType) {
      case "CLOSED_SINGLE":
        return (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-lg font-medium mb-4">
                {currentQuestion.question}
              </p>
              <div className="space-y-2">
                {(
                  content.options || [
                    "Opcja A",
                    "Opcja B",
                    "Opcja C",
                    "Opcja D",
                  ]
                ).map((option: string, idx: number) => (
                  <label
                    key={idx}
                    className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={idx}
                      checked={currentAnswer === idx}
                      onChange={() => handleAnswer(idx)}
                      className="mr-3"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case "CLOSED_MULTIPLE":
        return (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-lg font-medium mb-4">
                {currentQuestion.question}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Zaznacz wszystkie poprawne odpowiedzi
              </p>
              <div className="space-y-2">
                {(content.options || []).map((option: string, idx: number) => (
                  <label
                    key={idx}
                    className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={(currentAnswer || []).includes(idx)}
                      onChange={(e) => {
                        const current = currentAnswer || [];
                        if (e.target.checked) {
                          handleAnswer([...current, idx]);
                        } else {
                          handleAnswer(
                            current.filter((i: number) => i !== idx)
                          );
                        }
                      }}
                      className="mr-3"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case "SHORT_ANSWER":
        return (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-lg font-medium mb-4">
                {currentQuestion.question}
              </p>
              <textarea
                value={currentAnswer || ""}
                onChange={(e) => handleAnswer(e.target.value)}
                className="w-full h-32 p-4 border rounded-lg resize-none"
                placeholder="Wpisz swoją odpowiedź..."
              />
            </div>
          </div>
        );

      case "SYNTHESIS_NOTE":
        const text = currentAnswer || "";
        const wordCount = text.split(/\s+/).filter(Boolean).length;

        return (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-lg font-medium mb-4">
                {currentQuestion.question}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Wymagania: 60-90 słów
              </p>
              <textarea
                value={text}
                onChange={(e) => handleAnswer(e.target.value)}
                className="w-full h-40 p-4 border rounded-lg resize-none"
                placeholder="Napisz notatkę syntetyzującą..."
              />
              <div
                className={`text-sm mt-2 ${
                  wordCount < 60
                    ? "text-red-500"
                    : wordCount > 90
                    ? "text-orange-500"
                    : "text-green-500"
                }`}
              >
                Liczba słów: {wordCount}/60-90
              </div>
            </div>
          </div>
        );

      case "ESSAY":
        const essayText = currentAnswer || "";
        const essayWordCount = essayText.split(/\s+/).filter(Boolean).length;

        return (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-lg font-medium mb-4">
                {currentQuestion.question}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Minimalna liczba słów: 400
              </p>
              <textarea
                value={essayText}
                onChange={(e) => handleAnswer(e.target.value)}
                className="w-full h-96 p-4 border rounded-lg resize-none"
                placeholder="Napisz wypracowanie..."
              />
              <div
                className={`text-sm mt-2 ${
                  essayWordCount < 400 ? "text-red-500" : "text-green-500"
                }`}
              >
                Liczba słów: {essayWordCount}/400
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-lg font-medium mb-4">
              {currentQuestion.question}
            </p>
            <textarea
              value={currentAnswer || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full h-32 p-4 border rounded-lg resize-none"
              placeholder="Twoja odpowiedź..."
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                {session.exam.title.replace(" (Dynamiczny)", "")}
                {isDynamic && (
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                    <Brain className="w-3 h-3 inline mr-1" />
                    AI
                  </span>
                )}
              </h1>
              <p className="text-sm text-gray-600">
                {currentQuestion?.section}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {timeLeft !== null && (
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded ${
                    timeLeft < 600
                      ? "bg-red-50 text-red-600"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span className="font-mono">{formatTime(timeLeft)}</span>
                </div>
              )}

              <button
                onClick={() => {
                  if (confirm("Czy na pewno chcesz opuścić egzamin?")) {
                    navigate("/exams");
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <Home className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between text-sm mb-1">
            <span>
              Pytanie {currentQuestionIndex + 1} z {allQuestions.length}
            </span>
            <span className="font-medium">{currentQuestion?.points} pkt</span>
          </div>
          <div className="w-full bg-gray-200 rounded h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Alert dla dynamicznego egzaminu */}
      {isDynamic && currentQuestionIndex === 0 && (
        <div className="max-w-4xl mx-auto mt-4 px-4">
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-start gap-2">
              <Brain className="w-4 h-4 text-purple-600 mt-0.5" />
              <p className="text-sm text-purple-800">
                <strong>Egzamin z inteligentnym doborem pytań!</strong> Zestaw
                został spersonalizowany na podstawie Twojej historii odpowiedzi.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-700">
            Zadanie {currentQuestionIndex + 1}
          </h2>
        </div>

        {renderQuestion()}

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() =>
              setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))
            }
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg 
                     hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Poprzednie
          </button>

          {currentQuestionIndex === allQuestions.length - 1 ? (
            <button
              onClick={handleFinish}
              disabled={finishMutation.isPending}
              className="flex items-center gap-2 px-6 py-2 
                       bg-gradient-to-r from-green-600 to-emerald-600 
                       text-white rounded-lg hover:from-green-700 hover:to-emerald-700
                       disabled:opacity-50"
            >
              {finishMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Ocenianie odpowiedzi...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Zakończ egzamin
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              className="flex items-center gap-2 px-4 py-2 
                       bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Następne
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Question navigator */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-600 mb-3">Nawigacja po pytaniach:</p>
          <div className="grid grid-cols-10 gap-2">
            {allQuestions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`p-2 text-sm rounded ${
                  idx === currentQuestionIndex
                    ? "bg-purple-600 text-white"
                    : answers[
                        allQuestions[idx]?.exerciseId || allQuestions[idx]?.id
                      ]
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <div className="mt-3 flex gap-4 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-purple-600 rounded"></span>
              Aktualne
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-100 rounded"></span>
              Odpowiedziane
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-gray-100 rounded"></span>
              Bez odpowiedzi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveExam;

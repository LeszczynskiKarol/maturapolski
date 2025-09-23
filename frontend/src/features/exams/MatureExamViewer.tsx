// frontend/src/features/exams/MatureExamViewer.tsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import { Clock, ChevronRight, Send, FileText, Home } from "lucide-react";
import { toast } from "react-hot-toast";

export const MatureExamViewer: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const { data: session, isLoading } = useQuery({
    queryKey: ["mature-session", sessionId],
    queryFn: () =>
      api.get(`/api/exams/session/${sessionId}`).then((r) => r.data),
  });

  const saveAnswerMutation = useMutation({
    mutationFn: (data: { questionId: string; answer: any }) =>
      api.post(`/api/exams/session/${sessionId}/answer`, data),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Ładowanie egzaminu maturalnego...</p>
      </div>
    );
  }

  if (!session) return null;

  // Pobierz wszystkie zadania
  const allTasks = session.exam.sections
    .sort((a: any, b: any) => a.order - b.order)
    .flatMap((s: any) =>
      s.questions
        .sort((a: any, b: any) => a.order - b.order)
        .map((q: any) => ({ ...q, section: s.title }))
    );

  const currentTask = allTasks[currentTaskIndex];

  const handleAnswer = (answer: any) => {
    setAnswers((prev) => ({ ...prev, [currentTask.id]: answer }));

    // Auto-save
    saveAnswerMutation.mutate({
      questionId: currentTask.id,
      answer,
    });
  };

  const renderTask = () => {
    const content = currentTask.content || {};
    const taskType = content.taskType;

    // Dla zadania 1 - Wyjaśnienie sensu
    if (taskType === "WYJASNIENIE_SENSU") {
      return (
        <div className="space-y-4">
          {content.tekstZrodlowy && (
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-sm text-gray-600 mb-2">
                {content.tekstZrodlowy.autor} - {content.tekstZrodlowy.tytul}
              </div>
              <div className="whitespace-pre-wrap text-gray-800">
                {content.tekstZrodlowy.fragment}
              </div>
            </div>
          )}

          <div className="bg-yellow-50 p-4 rounded">
            <p className="font-medium">{currentTask.question}</p>
          </div>

          <textarea
            value={answers[currentTask.id] || ""}
            onChange={(e) => handleAnswer(e.target.value)}
            className="w-full h-32 p-4 border rounded-lg"
            placeholder="Wyjaśnij sens zdania..."
          />
        </div>
      );
    }

    // Dla zadania 2 - Rozstrzygnięcie
    if (taskType === "ROZSTRZYGNIECIE") {
      return (
        <div className="space-y-4">
          {content.tekstyZrodlowe?.map((tekst: any, idx: number) => (
            <div key={idx} className="bg-blue-50 p-4 rounded">
              <div className="text-sm text-gray-600 mb-1">
                Tekst {idx + 1}: {tekst.autor}
              </div>
              <p>{tekst.fragment}</p>
            </div>
          ))}

          <div className="bg-yellow-50 p-4 rounded">
            <p className="font-medium">{currentTask.question}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Rozstrzygnięcie:</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="decision"
                    value="tak"
                    checked={answers[currentTask.id]?.rozstrzygniecie === "tak"}
                    onChange={() =>
                      handleAnswer({
                        ...answers[currentTask.id],
                        rozstrzygniecie: "tak",
                      })
                    }
                    className="mr-2"
                  />
                  TAK
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="decision"
                    value="nie"
                    checked={answers[currentTask.id]?.rozstrzygniecie === "nie"}
                    onChange={() =>
                      handleAnswer({
                        ...answers[currentTask.id],
                        rozstrzygniecie: "nie",
                      })
                    }
                    className="mr-2"
                  />
                  NIE
                </label>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">Uzasadnienie:</label>
              <textarea
                value={answers[currentTask.id]?.uzasadnienie || ""}
                onChange={(e) =>
                  handleAnswer({
                    ...answers[currentTask.id],
                    uzasadnienie: e.target.value,
                  })
                }
                className="w-full h-32 p-4 border rounded"
                placeholder="Uzasadnij swoją odpowiedź..."
              />
            </div>
          </div>
        </div>
      );
    }

    // Dla zadania 3 - Prawda/Fałsz
    if (taskType === "PRAWDA_FALSZ") {
      return (
        <div className="space-y-4">
          <div className="bg-yellow-50 p-4 rounded">
            <p className="font-medium">{currentTask.question}</p>
          </div>

          {content.stwierdzenia?.map((stw: any, idx: number) => (
            <div key={idx} className="border p-4 rounded">
              <p className="mb-3">
                {idx + 1}. {stw.tekst}
              </p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`stw-${idx}`}
                    checked={answers[currentTask.id]?.[idx] === true}
                    onChange={() => {
                      const newAnswers = { ...answers[currentTask.id] };
                      newAnswers[idx] = true;
                      handleAnswer(newAnswers);
                    }}
                    className="mr-2"
                  />
                  Prawda
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`stw-${idx}`}
                    checked={answers[currentTask.id]?.[idx] === false}
                    onChange={() => {
                      const newAnswers = { ...answers[currentTask.id] };
                      newAnswers[idx] = false;
                      handleAnswer(newAnswers);
                    }}
                    className="mr-2"
                  />
                  Fałsz
                </label>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Dla notatki syntetyzującej
    if (taskType === "NOTATKA_SYNTETYZUJACA") {
      const text = answers[currentTask.id] || "";
      const wordCount = text.split(/\s+/).filter(Boolean).length;
      const { minSlow = 60, maxSlow = 90 } = content.wymagania || {};

      return (
        <div className="space-y-4">
          <div className="bg-yellow-50 p-4 rounded">
            <p className="font-medium">{currentTask.question}</p>
            <p className="text-sm mt-1">
              Wymagania: {minSlow}-{maxSlow} wyrazów
            </p>
          </div>

          <textarea
            value={text}
            onChange={(e) => handleAnswer(e.target.value)}
            className="w-full h-40 p-4 border rounded"
            placeholder="Napisz notatkę syntetyzującą..."
          />

          <div
            className={`text-sm ${
              wordCount < minSlow
                ? "text-red-500"
                : wordCount > maxSlow
                ? "text-orange-500"
                : "text-green-500"
            }`}
          >
            Liczba słów: {wordCount}/{minSlow}-{maxSlow}
          </div>
        </div>
      );
    }

    // Dla pozostałych - domyślny widok
    return (
      <div className="space-y-4">
        <div className="bg-yellow-50 p-4 rounded">
          <p className="font-medium">{currentTask.question}</p>
        </div>

        <textarea
          value={answers[currentTask.id] || ""}
          onChange={(e) => handleAnswer(e.target.value)}
          className="w-full h-32 p-4 border rounded"
          placeholder="Twoja odpowiedź..."
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">{session.exam.title}</h1>
              <p className="text-sm text-gray-600">{currentTask.section}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded">
                <Clock className="w-4 h-4" />
                <span>{session.remainingMinutes} min</span>
              </div>

              <button
                onClick={() => navigate("/exams")}
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
              Zadanie {currentTaskIndex + 1} z {allTasks.length}
            </span>
            <span>{currentTask.points} pkt</span>
          </div>
          <div className="w-full bg-gray-200 rounded h-2">
            <div
              className="bg-blue-600 h-2 rounded"
              style={{
                width: `${((currentTaskIndex + 1) / allTasks.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="mb-6">
            <h2 className="text-lg font-medium">Zadanie {currentTask.order}</h2>
          </div>

          {renderTask()}

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() =>
                setCurrentTaskIndex(Math.max(0, currentTaskIndex - 1))
              }
              disabled={currentTaskIndex === 0}
              className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50"
            >
              Poprzednie
            </button>

            {currentTaskIndex === allTasks.length - 1 ? (
              <button
                onClick={() => {
                  api
                    .post(`/api/exams/session/${sessionId}/finish`)
                    .then(() => {
                      toast.success("Egzamin zakończony!");
                      navigate(`/exam/results/${sessionId}`);
                    });
                }}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                <Send className="w-4 h-4 inline mr-2" />
                Zakończ egzamin
              </button>
            ) : (
              <button
                onClick={() => setCurrentTaskIndex(currentTaskIndex + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Następne
                <ChevronRight className="w-4 h-4 inline ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

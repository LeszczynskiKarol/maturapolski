// frontend/src/features/exams/ExamSimulator.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import {
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Flag,
  Grid,
} from "lucide-react";
import toast from "react-hot-toast";

export const ExamSimulator: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState(10800); // 3 hours in seconds
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(
    new Set()
  );
  const [showOverview, setShowOverview] = useState(false);

  const { data: exam } = useQuery({
    queryKey: ["exam-simulation"],
    queryFn: () => api.get("/api/exams/generate").then((r) => r.data),
  });

  const submitMutation = useMutation({
    mutationFn: (data: any) => api.post("/api/exams/submit", data),
    onSuccess: (response) => {
      navigate(`/exams/results/${response.data.id}`);
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    if (confirm("Czy na pewno chcesz zakończyć egzamin?")) {
      submitMutation.mutate({
        examId: exam?.id,
        answers,
        timeSpent: 10800 - timeLeft,
      });
    }
  };

  const toggleFlag = (index: number) => {
    const newFlags = new Set(flaggedQuestions);
    if (newFlags.has(index)) {
      newFlags.delete(index);
    } else {
      newFlags.add(index);
    }
    setFlaggedQuestions(newFlags);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (!exam) return <div>Ładowanie egzaminu...</div>;

  const question = exam.questions[currentQuestion];
  const progress = (Object.keys(answers).length / exam.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">Egzamin próbny</h1>
              <div className="text-sm text-gray-600">
                Pytanie {currentQuestion + 1} z {exam.questions.length}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
                  timeLeft < 600 ? "bg-red-100 text-red-700" : "bg-gray-100"
                }`}
              >
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>

              <button
                onClick={() => setShowOverview(!showOverview)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Grid className="w-5 h-5" />
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Zakończ egzamin
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Main content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-8">
            {/* Question header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {question.category}
                  </span>
                  <span className="text-sm text-gray-600">
                    {question.points} pkt
                  </span>
                </div>
                <h2 className="text-lg font-semibold">{question.text}</h2>
              </div>

              <button
                onClick={() => toggleFlag(currentQuestion)}
                className={`p-2 rounded-lg ${
                  flaggedQuestions.has(currentQuestion)
                    ? "bg-yellow-100 text-yellow-600"
                    : "hover:bg-gray-100"
                }`}
              >
                <Flag className="w-5 h-5" />
              </button>
            </div>

            {/* Question content */}
            {question.content && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="prose max-w-none">{question.content}</div>
              </div>
            )}

            {/* Answer area */}
            <div className="space-y-4">
              {question.type === "CLOSED_SINGLE" && (
                <RadioAnswers
                  options={question.options}
                  value={answers[question.id]}
                  onChange={(value) =>
                    setAnswers({
                      ...answers,
                      [question.id]: value,
                    })
                  }
                />
              )}

              {question.type === "CLOSED_MULTIPLE" && (
                <CheckboxAnswers
                  options={question.options}
                  value={answers[question.id] || []}
                  onChange={(value) =>
                    setAnswers({
                      ...answers,
                      [question.id]: value,
                    })
                  }
                />
              )}

              {question.type === "SHORT_ANSWER" && (
                <textarea
                  value={answers[question.id] || ""}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [question.id]: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={6}
                  placeholder="Wpisz swoją odpowiedź..."
                />
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <button
                onClick={() =>
                  setCurrentQuestion(Math.max(0, currentQuestion - 1))
                }
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
                Poprzednie
              </button>

              <div className="flex gap-2">
                {[...Array(Math.min(5, exam.questions.length))].map((_, i) => {
                  const index = Math.max(
                    0,
                    Math.min(currentQuestion - 2 + i, exam.questions.length - 1)
                  );
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`w-10 h-10 rounded-lg ${
                        index === currentQuestion
                          ? "bg-blue-600 text-white"
                          : answers[exam.questions[index].id]
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100"
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() =>
                  setCurrentQuestion(
                    Math.min(exam.questions.length - 1, currentQuestion + 1)
                  )
                }
                disabled={currentQuestion === exam.questions.length - 1}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Następne
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Question overview sidebar */}
        {showOverview && (
          <div className="w-80">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <h3 className="font-semibold mb-4">Przegląd pytań</h3>
              <div className="grid grid-cols-5 gap-2">
                {exam.questions.map((q: any, index: number) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestion(index)}
                    className={`
                      h-10 rounded-lg text-sm font-medium
                      ${index === currentQuestion ? "ring-2 ring-blue-600" : ""}
                      ${
                        answers[q.id]
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100"
                      }
                      ${
                        flaggedQuestions.has(index)
                          ? "ring-2 ring-yellow-400"
                          : ""
                      }
                    `}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 rounded" />
                  <span>Odpowiedziane ({Object.keys(answers).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 rounded" />
                  <span>
                    Bez odpowiedzi (
                    {exam.questions.length - Object.keys(answers).length})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-100 rounded ring-2 ring-yellow-400" />
                  <span>Oznaczone ({flaggedQuestions.size})</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RadioAnswers: React.FC<{
  options: string[];
  value: number;
  onChange: (value: number) => void;
}> = ({ options, value, onChange }) => (
  <div className="space-y-3">
    {options.map((option, index) => (
      <label
        key={index}
        className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
      >
        <input
          type="radio"
          checked={value === index}
          onChange={() => onChange(index)}
          className="mt-1 w-4 h-4 text-blue-600"
        />
        <span className="ml-3">{option}</span>
      </label>
    ))}
  </div>
);

const CheckboxAnswers: React.FC<{
  options: string[];
  value: number[];
  onChange: (value: number[]) => void;
}> = ({ options, value, onChange }) => (
  <div className="space-y-3">
    {options.map((option, index) => (
      <label
        key={index}
        className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
      >
        <input
          type="checkbox"
          checked={value.includes(index)}
          onChange={(e) => {
            if (e.target.checked) {
              onChange([...value, index]);
            } else {
              onChange(value.filter((v) => v !== index));
            }
          }}
          className="mt-1 w-4 h-4 text-blue-600"
        />
        <span className="ml-3">{option}</span>
      </label>
    ))}
  </div>
);

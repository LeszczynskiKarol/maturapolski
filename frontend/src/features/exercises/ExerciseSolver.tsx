// frontend/src/features/exercises/ExerciseSolver.tsx

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import { Clock, Send, ChevronLeft, Award, BookOpen } from "lucide-react";
import toast from "react-hot-toast";
import { AIFeedback } from "../../components/AIFeedback";

export const ExerciseSolver: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState<any>(undefined);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<any>(null);

  const { data: exercise, isLoading } = useQuery({
    queryKey: ["exercise", id],
    queryFn: () => api.get(`/api/exercises/${id}`).then((r) => r.data),
  });

  const submitMutation = useMutation({
    mutationFn: (data: any) => api.post(`/api/exercises/${id}/submit`, data),
    onSuccess: (response) => {
      const result = response.data;

      if (result.assessment) {
        // ESSAY with AI assessment
        setAssessmentResult(result);
        setShowResults(true);
        toast.success(
          result.message || `Wypracowanie ocenione na ${result.score} punktów!`
        );
      } else if (result.score !== undefined && result.score !== null) {
        // Closed questions with immediate score
        toast.success(`Zdobyłeś ${result.score} punktów!`);
        setTimeout(() => navigate("/exercises"), 1500);
      } else {
        // Other cases
        toast.success(result.message || "Odpowiedź została zapisana");
        setTimeout(() => navigate("/exercises"), 1500);
      }
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          "Wystąpił błąd podczas wysyłania odpowiedzi"
      );
    },
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    if (!answer && exercise?.type !== "ESSAY") {
      toast.error("Wybierz odpowiedź");
      return;
    }

    if (exercise?.type === "ESSAY") {
      const wordCount = (answer || "").split(/\s+/).filter(Boolean).length;
      const minWords = exercise.metadata?.wordLimit?.min || 400;

      if (wordCount < minWords) {
        toast.error(
          `Wypracowanie musi liczyć minimum ${minWords} słów (obecnie: ${wordCount})`
        );
        return;
      }
    }

    submitMutation.mutate({
      answer,
      timeSpent,
    });
  };

  const handleBackToExercises = () => {
    navigate("/exercises");
  };

  if (isLoading) return <div className="p-8">Ładowanie...</div>;

  // Show results page for AI-assessed exercises
  if (showResults && assessmentResult) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b p-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Award className="w-8 h-8 text-yellow-500" />
              <div>
                <h2 className="text-2xl font-bold">Wynik wypracowania</h2>
                <p className="text-gray-600">{exercise?.question}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                {assessmentResult.score}/35 pkt
              </div>
              <div className="text-sm text-gray-500">
                {Math.round((assessmentResult.score / 35) * 100)}%
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Assessment Details */}
              <div className="lg:col-span-2">
                <AIFeedback
                  assessment={{
                    totalScore: Math.round((assessmentResult.score / 35) * 100),
                    formalScore: assessmentResult.assessment?.formalScore,
                    literaryScore: assessmentResult.assessment?.literaryScore,
                    compositionScore:
                      assessmentResult.assessment?.compositionScore,
                    languageScore: assessmentResult.assessment?.languageScore,
                    detailedFeedback: assessmentResult.assessment
                      ?.detailedFeedback || {
                      strengths: assessmentResult.feedback?.strengths || [],
                      weaknesses: assessmentResult.feedback?.weaknesses || [],
                      suggestions: assessmentResult.feedback?.suggestions || [],
                    },
                    improvements: assessmentResult.feedback?.improvements || [],
                  }}
                />
              </div>

              {/* Your Answer */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Twoje wypracowanie
                  </h3>
                  <div className="text-sm text-gray-700 max-h-60 overflow-y-auto">
                    {answer
                      ?.split("\n")
                      .map((paragraph: string, idx: number) => (
                        <p key={idx} className="mb-2">
                          {paragraph}
                        </p>
                      ))}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Słów: {(answer || "").split(/\s+/).filter(Boolean).length} |
                    Czas: {Math.floor(timeSpent / 60)}:
                    {(timeSpent % 60).toString().padStart(2, "0")}
                  </div>
                </div>

                <button
                  onClick={handleBackToExercises}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Powrót do zadań
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b p-6 flex justify-between items-center">
          <button
            onClick={() => navigate("/exercises")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
            Powrót
          </button>

          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>
              {Math.floor(timeSpent / 60)}:
              {(timeSpent % 60).toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">{exercise?.question}</h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {exercise?.points} pkt
              </span>
            </div>

            {exercise?.content?.text && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="whitespace-pre-wrap">{exercise.content.text}</p>
              </div>
            )}
          </div>

          {/* Answer Input */}
          <div className="space-y-4">
            {exercise?.type === "CLOSED_SINGLE" && (
              <RadioOptions
                options={exercise.content.options || []}
                value={answer}
                onChange={setAnswer}
              />
            )}

            {exercise?.type === "CLOSED_MULTIPLE" && (
              <CheckboxOptions
                options={exercise.content.options || []}
                value={answer || []}
                onChange={setAnswer}
              />
            )}

            {exercise?.type === "SHORT_ANSWER" && (
              <textarea
                value={answer || ""}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Wpisz swoją odpowiedź..."
              />
            )}

            {exercise?.type === "ESSAY" && (
              <EssayEditor
                value={answer}
                onChange={setAnswer}
                requirements={exercise.metadata || {}}
              />
            )}
          </div>

          {/* Submit */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={submitMutation.isPending}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 
                       flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              {submitMutation.isPending ? "Wysyłam..." : "Wyślij odpowiedź"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RadioOptions: React.FC<{
  options: string[];
  value: number;
  onChange: (value: number) => void;
}> = ({ options, value, onChange }) => (
  <div className="space-y-3">
    {options.map((option, index) => (
      <label
        key={index}
        className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
      >
        <input
          type="radio"
          checked={value === index}
          onChange={() => onChange(index)}
          className="w-4 h-4 text-blue-600"
        />
        <span className="ml-3">{option}</span>
      </label>
    ))}
  </div>
);

const CheckboxOptions: React.FC<{
  options: string[];
  value: number[];
  onChange: (value: number[]) => void;
}> = ({ options, value, onChange }) => (
  <div className="space-y-3">
    {options.map((option, index) => (
      <label
        key={index}
        className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
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
          className="w-4 h-4 text-blue-600"
        />
        <span className="ml-3">{option}</span>
      </label>
    ))}
  </div>
);

const EssayEditor: React.FC<{
  value: string;
  onChange: (value: string) => void;
  requirements: any;
}> = ({ value, onChange, requirements }) => {
  const wordCount = (value || "").split(/\s+/).filter(Boolean).length;
  const minWords = requirements.wordLimit?.min || 400;

  return (
    <div>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 font-serif"
        rows={20}
        placeholder="Napisz wypracowanie..."
      />
      <div className="mt-2 flex justify-between text-sm text-gray-600">
        <span>
          Słów: {wordCount} / min. {minWords}
        </span>
        <span
          className={wordCount >= minWords ? "text-green-600" : "text-red-600"}
        >
          {wordCount >= minWords ? "✓ Minimum spełnione" : "⚠ Za mało słów"}
        </span>
      </div>
    </div>
  );
};

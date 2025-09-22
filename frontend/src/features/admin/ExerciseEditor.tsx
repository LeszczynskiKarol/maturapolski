// frontend/src/features/admin/ExerciseEditor.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Plus, Trash } from "lucide-react";
import { api } from "../../services/api";

interface ExerciseEditorProps {
  exercise?: any;
  onClose: () => void;
  onSave: () => void;
}

export const ExerciseEditor: React.FC<ExerciseEditorProps> = ({
  exercise,
  onClose,
  onSave,
}) => {
  const [options, setOptions] = useState<string[]>(
    exercise?.content?.options || ["", "", "", ""]
  );
  const [correctAnswer, setCorrectAnswer] = useState<number | number[]>(
    exercise?.correctAnswer ?? 0
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: exercise || {
      type: "CLOSED_SINGLE",
      category: "LANGUAGE_USE",
      difficulty: 2,
      points: 1,
      tags: [],
    },
  });

  const exerciseType = watch("type");

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        difficulty: Number(data.difficulty),
        points: Number(data.points),
        tags: data.tags
          ? data.tags.split(",").map((t: string) => t.trim())
          : [],
        content: {
          ...data.content,
          options: exerciseType.includes("CLOSED") ? options : undefined,
          text: data.content?.text || "",
        },
        correctAnswer: exerciseType.includes("CLOSED")
          ? correctAnswer
          : undefined,
        metadata: {
          explanation: data.metadata?.explanation || "",
          ...data.metadata,
        },
      };

      if (exercise?.id) {
        await api.put(`/api/admin/exercises/${exercise.id}`, payload);
      } else {
        await api.post("/api/admin/exercises", payload);
      }

      onSave();
    } catch (error) {
      console.error("Error saving exercise:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {exercise ? "Edytuj zadanie" : "Nowe zadanie"}
          </h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Pytanie */}
          <div>
            <label className="block text-sm font-medium mb-1">Pytanie*</label>
            <textarea
              {...register("question", { required: true })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
            />
          </div>

          {/* Typ i kategoria */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Typ</label>
              <select
                {...register("type")}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="CLOSED_SINGLE">Jednokrotny wybór</option>
                <option value="CLOSED_MULTIPLE">Wielokrotny wybór</option>
                <option value="SHORT_ANSWER">Krótka odpowiedź</option>
                <option value="ESSAY">Wypracowanie</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Kategoria
              </label>
              <select
                {...register("category")}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="LANGUAGE_USE">Język w użyciu</option>
                <option value="HISTORICAL_LITERARY">
                  Test historycznoliteracki
                </option>
                <option value="WRITING">Pisanie</option>
              </select>
            </div>
          </div>

          {/* Trudność i punkty */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Poziom trudności
              </label>
              <select
                {...register("difficulty")}
                className="w-full px-3 py-2 border rounded-lg"
              >
                {[1, 2, 3, 4, 5].map((level) => (
                  <option key={level} value={level}>
                    {"⭐".repeat(level)} - Poziom {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Punkty</label>
              <input
                type="number"
                {...register("points", { min: 1, max: 35 })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Treść zadania */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Treść zadania (opcjonalna)
            </label>
            <textarea
              {...register("content.text")}
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
              placeholder="Np. fragment tekstu do analizy"
            />
          </div>

          {/* Opcje dla zadań zamkniętych */}
          {exerciseType.includes("CLOSED") && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Opcje odpowiedzi
              </label>
              {options.map((option, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type={
                      exerciseType === "CLOSED_SINGLE" ? "radio" : "checkbox"
                    }
                    checked={
                      exerciseType === "CLOSED_SINGLE"
                        ? correctAnswer === index
                        : Array.isArray(correctAnswer) &&
                          correctAnswer.includes(index)
                    }
                    onChange={() => {
                      if (exerciseType === "CLOSED_SINGLE") {
                        setCorrectAnswer(index);
                      } else {
                        const current = Array.isArray(correctAnswer)
                          ? correctAnswer
                          : [];
                        setCorrectAnswer(
                          current.includes(index)
                            ? current.filter((i) => i !== index)
                            : [...current, index]
                        );
                      }
                    }}
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index] = e.target.value;
                      setOptions(newOptions);
                    }}
                    className="flex-1 px-3 py-2 border rounded-lg"
                    placeholder={`Opcja ${index + 1}`}
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() =>
                        setOptions(options.filter((_, i) => i !== index))
                      }
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => setOptions([...options, ""])}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
                Dodaj opcję
              </button>
            </div>
          )}

          {/* Wyjaśnienie */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Wyjaśnienie odpowiedzi
            </label>
            <textarea
              {...register("metadata.explanation")}
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
              placeholder="Wyjaśnienie pokazywane po udzieleniu odpowiedzi"
            />
          </div>

          {/* Tagi */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tagi (oddzielone przecinkami)
            </label>
            <input
              type="text"
              {...register("tags")}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="np. środki stylistyczne, epitet, metafora"
            />
          </div>

          {/* Przyciski akcji */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {exercise ? "Zapisz zmiany" : "Utwórz zadanie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

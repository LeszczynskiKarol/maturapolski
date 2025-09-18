// frontend/src/features/admin/AdminPanel.tsx

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import { Plus, Edit, Trash, X } from "lucide-react";
import toast from "react-hot-toast";

interface Exercise {
  id: string;
  type: string;
  category: string;
  difficulty: number;
  points: number;
  question: string;
  content: any;
  correctAnswer?: any;
  tags: string[];
}

export const AdminPanel: React.FC = () => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const queryClient = useQueryClient();

  const { data: exercises = [], isLoading } = useQuery({
    queryKey: ["admin-exercises"],
    queryFn: () => api.get("/api/admin/exercises").then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/admin/exercises/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-exercises"] });
      toast.success("Zadanie usunięte");
    },
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panel Administratora</h1>
        <button
          onClick={() => setIsAddingNew(true)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <Plus className="w-5 h-5" />
          Dodaj nowe zadanie
        </button>
      </div>

      {/* Lista zadań */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Pytanie</th>
              <th className="px-4 py-3 text-left">Typ</th>
              <th className="px-4 py-3 text-left">Kategoria</th>
              <th className="px-4 py-3 text-left">Trudność</th>
              <th className="px-4 py-3 text-left">Punkty</th>
              <th className="px-4 py-3 text-left">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise: Exercise) => (
              <tr key={exercise.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{exercise.question}</td>
                <td className="px-4 py-3">{exercise.type}</td>
                <td className="px-4 py-3">{exercise.category}</td>
                <td className="px-4 py-3">{exercise.difficulty}/5</td>
                <td className="px-4 py-3">{exercise.points}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingExercise(exercise)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Czy na pewno chcesz usunąć to zadanie?")) {
                          deleteMutation.mutate(exercise.id);
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formularz dodawania/edycji */}
      {(isAddingNew || editingExercise) && (
        <ExerciseForm
          exercise={editingExercise}
          onClose={() => {
            setIsAddingNew(false);
            setEditingExercise(null);
          }}
          onSave={() => {
            queryClient.invalidateQueries({ queryKey: ["admin-exercises"] });
            setIsAddingNew(false);
            setEditingExercise(null);
          }}
        />
      )}
    </div>
  );
};

const ExerciseForm: React.FC<{
  exercise?: Exercise | null;
  onClose: () => void;
  onSave: () => void;
}> = ({ exercise, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    type: exercise?.type || "CLOSED_SINGLE",
    category: exercise?.category || "LANGUAGE_USE",
    difficulty: exercise?.difficulty || 3,
    points: exercise?.points || 1,
    question: exercise?.question || "",
    content: exercise?.content || {},
    correctAnswer: exercise?.correctAnswer,
    tags: exercise?.tags || [],
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (exercise) {
        return api.put(`/api/admin/exercises/${exercise.id}`, data);
      } else {
        return api.post("/api/admin/exercises", data);
      }
    },
    onSuccess: () => {
      toast.success(exercise ? "Zadanie zaktualizowane" : "Zadanie dodane");
      onSave();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {exercise ? "Edytuj zadanie" : "Dodaj nowe zadanie"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Pytanie</label>
            <textarea
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Typ</label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
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
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Trudność (1-5)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    difficulty: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Punkty</label>
              <input
                type="number"
                min="1"
                value={formData.points}
                onChange={(e) =>
                  setFormData({ ...formData, points: parseInt(e.target.value) })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Opcje dla zadań zamkniętych */}
          {(formData.type === "CLOSED_SINGLE" ||
            formData.type === "CLOSED_MULTIPLE") && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Opcje odpowiedzi
              </label>
              <OptionsEditor
                options={formData.content.options || []}
                correctAnswer={formData.correctAnswer}
                onChange={(options, correct) => {
                  setFormData({
                    ...formData,
                    content: { ...formData.content, options },
                    correctAnswer: correct,
                  });
                }}
                multiple={formData.type === "CLOSED_MULTIPLE"}
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
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
              {exercise ? "Zapisz zmiany" : "Dodaj zadanie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const OptionsEditor: React.FC<{
  options: string[];
  correctAnswer: any;
  onChange: (options: string[], correct: any) => void;
  multiple: boolean;
}> = ({ options, correctAnswer, onChange, multiple }) => {
  const [localOptions, setLocalOptions] = useState(
    options.length > 0 ? options : ["", "", "", ""]
  );

  const updateOption = (index: number, value: string) => {
    const newOptions = [...localOptions];
    newOptions[index] = value;
    setLocalOptions(newOptions);
    onChange(newOptions, correctAnswer);
  };

  const setCorrect = (index: number) => {
    if (multiple) {
      const current = Array.isArray(correctAnswer) ? correctAnswer : [];
      const newCorrect = current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index];
      onChange(localOptions, newCorrect);
    } else {
      onChange(localOptions, index);
    }
  };

  return (
    <div className="space-y-2">
      {localOptions.map((option, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type={multiple ? "checkbox" : "radio"}
            checked={
              multiple
                ? Array.isArray(correctAnswer) && correctAnswer.includes(index)
                : correctAnswer === index
            }
            onChange={() => setCorrect(index)}
            className="w-4 h-4"
          />
          <input
            type="text"
            value={option}
            onChange={(e) => updateOption(index, e.target.value)}
            placeholder={`Opcja ${index + 1}`}
            className="flex-1 px-3 py-2 border rounded-lg"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          setLocalOptions([...localOptions, ""]);
          onChange([...localOptions, ""], correctAnswer);
        }}
        className="text-sm text-blue-600 hover:underline"
      >
        + Dodaj opcję
      </button>
    </div>
  );
};

// frontend/src/features/admin/ExerciseManager.tsx

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash,
  X,
  Search,
  Upload,
  Download,
  Copy,
  Eye,
  AlertCircle,
  Save,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  CheckCircle,
  Info,
  Hash,
  BarChart,
  FileText,
} from "lucide-react";
import { api } from "../../services/api";

// Type definitions
interface Exercise {
  id: string;
  type:
    | "CLOSED_SINGLE"
    | "CLOSED_MULTIPLE"
    | "SHORT_ANSWER"
    | "SYNTHESIS_NOTE"
    | "ESSAY";
  category: "LANGUAGE_USE" | "HISTORICAL_LITERARY" | "WRITING";
  epoch?: string;
  difficulty: number;
  points: number;
  question: string;
  content: {
    options?: string[];
    text?: string;
    fragments?: Array<{
      author: string;
      title: string;
      content: string;
    }>;
  };
  correctAnswer?: number | number[];
  tags: string[];
  metadata?: {
    wordLimit?: {
      min?: number;
      max?: number;
    };
    requiredReadings?: string[];
    expectedConcepts?: string[];
    sampleAnswer?: string;
    explanation?: string;
  };
  createdAt: string;
  submissions: number;
}

interface ExerciseFormData {
  type: Exercise["type"];
  category: Exercise["category"];
  epoch?: string;
  difficulty: number;
  points: number;
  question: string;
  content: Exercise["content"];
  correctAnswer?: Exercise["correctAnswer"];
  tags: string[];
  metadata: Exercise["metadata"];
}

interface Filters {
  type: string;
  category: string;
  difficulty: string;
  epoch: string;
}

// Main Component
const ExerciseManager: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({
    type: "",
    category: "",
    difficulty: "",
    epoch: "",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showPreview, setShowPreview] = useState<Exercise | null>(null);
  const [showBulkImport, setShowBulkImport] = useState<boolean>(false);
  const itemsPerPage = 10;

  useEffect(() => {
    loadExercises();
  }, []);

  useEffect(() => {
    filterExercises();
  }, [exercises, searchTerm, filters]);

  const loadExercises = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Pobierz WSZYSTKIE zadania zwiększając limit
      const response = await api.get("/api/admin/exercises?limit=10000000000");
      console.log("API Response:", response.data);

      if (response.data.exercises) {
        setExercises(response.data.exercises);
      } else if (Array.isArray(response.data)) {
        setExercises(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setExercises([]);
      }
    } catch (error) {
      console.error("Error loading exercises:", error);
      setExercises([]);
    }
    setIsLoading(false);
  };

  const filterExercises = (): void => {
    let filtered = [...exercises];

    if (searchTerm) {
      filtered = filtered.filter(
        (ex) =>
          ex.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ex.tags.some((tag: string) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (filters.type) {
      filtered = filtered.filter((ex) => ex.type === filters.type);
    }
    if (filters.category) {
      filtered = filtered.filter((ex) => ex.category === filters.category);
    }
    if (filters.difficulty) {
      filtered = filtered.filter(
        (ex) => ex.difficulty === parseInt(filters.difficulty)
      );
    }

    setFilteredExercises(filtered);
    setCurrentPage(1);
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (window.confirm("Czy na pewno chcesz usunąć to zadanie?")) {
      try {
        await api.delete(`/api/admin/exercises/${id}`);
        setExercises(exercises.filter((ex) => ex.id !== id));
      } catch (error) {
        console.error("Error deleting exercise:", error);
      }
    }
  };

  const handleDuplicate = (exercise: Exercise): void => {
    const duplicate: Exercise = {
      ...exercise,
      id: "",
      question: `${exercise.question} (kopia)`,
    };
    setEditingExercise(duplicate);
    setShowForm(true);
  };

  const exportExercises = (): void => {
    const dataStr = JSON.stringify(filteredExercises, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `exercises_${new Date().toISOString()}.json`;
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const totalPages = Math.ceil(filteredExercises.length / itemsPerPage);
  const paginatedExercises = filteredExercises.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Zarządzanie Ćwiczeniami
            </h1>
            <p className="text-gray-600 mt-2">
              Łącznie: {exercises.length} zadań | Wyświetlane:{" "}
              {filteredExercises.length}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowBulkImport(true)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Import
            </button>
            <button
              onClick={exportExercises}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Eksport
            </button>
            <button
              onClick={() => {
                setEditingExercise(null);
                setShowForm(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nowe Zadanie
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Szukaj po pytaniu lub tagach..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">Wszystkie typy</option>
            <option value="CLOSED_SINGLE">Jednokrotny wybór</option>
            <option value="CLOSED_MULTIPLE">Wielokrotny wybór</option>
            <option value="SHORT_ANSWER">Krótka odpowiedź</option>
            <option value="SYNTHESIS_NOTE">Notatka syntetyczna</option>
            <option value="ESSAY">Wypracowanie</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">Wszystkie kategorie</option>
            <option value="LANGUAGE_USE">Język w użyciu</option>
            <option value="HISTORICAL_LITERARY">
              Test historycznoliteracki
            </option>
            <option value="WRITING">Pisanie</option>
          </select>

          <select
            value={filters.difficulty}
            onChange={(e) =>
              setFilters({ ...filters, difficulty: e.target.value })
            }
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">Każda trudność</option>
            <option value="1">⭐ Bardzo łatwe</option>
            <option value="2">⭐⭐ Łatwe</option>
            <option value="3">⭐⭐⭐ Średnie</option>
            <option value="4">⭐⭐⭐⭐ Trudne</option>
            <option value="5">⭐⭐⭐⭐⭐ Bardzo trudne</option>
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={BookOpen}
          title="Zadania zamknięte"
          value={exercises.filter((ex) => ex.type.startsWith("CLOSED")).length}
          color="blue"
        />
        <StatCard
          icon={FileText}
          title="Zadania otwarte"
          value={
            exercises.filter(
              (ex) => ex.type === "SHORT_ANSWER" || ex.type === "SYNTHESIS_NOTE"
            ).length
          }
          color="green"
        />
        <StatCard
          icon={Hash}
          title="Wypracowania"
          value={exercises.filter((ex) => ex.type === "ESSAY").length}
          color="purple"
        />
        <StatCard
          icon={BarChart}
          title="Średnia trudność"
          value={(
            exercises.reduce((acc, ex) => acc + ex.difficulty, 0) /
              exercises.length || 0
          ).toFixed(1)}
          color="orange"
        />
      </div>

      {/* Exercises Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pytanie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Typ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trudność
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Punkty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rozwiązań
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Akcje
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedExercises.map((exercise) => (
                  <tr key={exercise.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {exercise.question.substring(0, 80)}
                        {exercise.question.length > 80 && "..."}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {exercise.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <TypeBadge type={exercise.type} />
                    </td>
                    <td className="px-6 py-4">
                      <CategoryBadge category={exercise.category} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < exercise.difficulty
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {exercise.points} pkt
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {exercise.submissions || 0}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setShowPreview(exercise)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                          title="Podgląd"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDuplicate(exercise)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                          title="Duplikuj"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingExercise(exercise);
                            setShowForm(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          title="Edytuj"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(exercise.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                          title="Usuń"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-3 bg-gray-50 border-t flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Strona {currentPage} z {totalPages}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 border rounded ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Forms and Modals */}
      {showForm && (
        <ExerciseForm
          exercise={editingExercise}
          onClose={() => {
            setShowForm(false);
            setEditingExercise(null);
          }}
          onSave={(savedExercise: Exercise) => {
            if (editingExercise?.id) {
              setExercises(
                exercises.map((ex) =>
                  ex.id === editingExercise.id ? savedExercise : ex
                )
              );
            } else {
              setExercises([savedExercise, ...exercises]);
            }
            setShowForm(false);
            setEditingExercise(null);
          }}
        />
      )}

      {showPreview && (
        <ExercisePreview
          exercise={showPreview}
          onClose={() => setShowPreview(null)}
        />
      )}

      {showBulkImport && (
        <BulkImportModal
          onClose={() => setShowBulkImport(false)}
          onImport={(importedExercises: Exercise[]) => {
            setExercises([...exercises, ...importedExercises]);
            setShowBulkImport(false);
          }}
        />
      )}
    </div>
  );
};

// Exercise Form Component
interface ExerciseFormProps {
  exercise: Exercise | null;
  onClose: () => void;
  onSave: (exercise: Exercise) => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({
  exercise,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<ExerciseFormData>({
    type: exercise?.type || "CLOSED_SINGLE",
    category: exercise?.category || "LANGUAGE_USE",
    epoch: exercise?.epoch || "",
    difficulty: exercise?.difficulty || 3,
    points: exercise?.points || 1,
    question: exercise?.question || "",
    content: exercise?.content || {},
    correctAnswer: exercise?.correctAnswer,
    tags: exercise?.tags || [],
    metadata: exercise?.metadata || {},
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!formData.question.trim()) newErrors.question = "Pytanie jest wymagane";
    if (formData.points < 1) newErrors.points = "Punkty muszą być większe od 0";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Przygotuj dane do wysłania - usuń puste epoch
      const dataToSend = {
        ...formData,
        epoch: formData.epoch || undefined, // Zamień pusty string na undefined
        content: formData.content || {},
        metadata: formData.metadata || {},
      };

      // Usuń undefined values
      if (!dataToSend.epoch) delete dataToSend.epoch;
      if (!dataToSend.correctAnswer) delete dataToSend.correctAnswer;

      const response = exercise?.id
        ? await api.put(`/api/admin/exercises/${exercise.id}`, dataToSend)
        : await api.post("/api/admin/exercises", dataToSend);

      onSave(response.data);
    } catch (error) {
      console.error("Error saving exercise:", error);
      // Dodaj toast z błędem
    }
  };

  const addTag = (): void => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string): void => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {exercise ? "Edytuj zadanie" : "Nowe zadanie"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Pytanie/Polecenie *
              </label>
              <textarea
                value={formData.question}
                onChange={(e) =>
                  setFormData({ ...formData, question: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.question ? "border-red-500" : ""
                }`}
                rows={4}
                placeholder="Wprowadź treść pytania..."
              />
              {errors.question && (
                <p className="text-red-500 text-sm mt-1">{errors.question}</p>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Typ zadania
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as Exercise["type"],
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="CLOSED_SINGLE">Jednokrotny wybór</option>
                  <option value="CLOSED_MULTIPLE">Wielokrotny wybór</option>
                  <option value="SHORT_ANSWER">Krótka odpowiedź</option>
                  <option value="SYNTHESIS_NOTE">Notatka syntetyczna</option>
                  <option value="ESSAY">Wypracowanie</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Kategoria
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as Exercise["category"],
                    })
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

              <div>
                <label className="block text-sm font-medium mb-2">
                  Trudność
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      difficulty: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="1">⭐ Bardzo łatwe</option>
                  <option value="2">⭐⭐ Łatwe</option>
                  <option value="3">⭐⭐⭐ Średnie</option>
                  <option value="4">⭐⭐⭐⭐ Trudne</option>
                  <option value="5">⭐⭐⭐⭐⭐ Bardzo trudne</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Punkty *
                </label>
                <input
                  type="number"
                  min="1"
                  max="35"
                  value={formData.points}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      points: parseInt(e.target.value),
                    })
                  }
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.points ? "border-red-500" : ""
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Type-specific content */}
          {(formData.type === "CLOSED_SINGLE" ||
            formData.type === "CLOSED_MULTIPLE") && (
            <OptionsEditor
              options={formData.content.options || ["", "", "", ""]}
              correctAnswer={formData.correctAnswer}
              multiple={formData.type === "CLOSED_MULTIPLE"}
              onChange={(options, correct) => {
                setFormData({
                  ...formData,
                  content: { ...formData.content, options },
                  correctAnswer: correct,
                });
              }}
            />
          )}

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Tagi</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {formData.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="hover:text-blue-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                className="flex-1 px-3 py-2 border rounded-lg"
                placeholder="Dodaj tag..."
              />
              <button
                onClick={addTag}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Dodaj
              </button>
            </div>
          </div>

          {/* Wyjaśnienie odpowiedzi */}
          {(formData.type === "CLOSED_SINGLE" ||
            formData.type === "CLOSED_MULTIPLE") && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Wyjaśnienie prawidłowej odpowiedzi
              </label>
              <textarea
                value={formData.metadata?.explanation || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    metadata: {
                      ...formData.metadata,
                      explanation: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
                placeholder="Dlaczego ta odpowiedź jest prawidłowa? To pole pojawi się uczniowi po udzieleniu odpowiedzi..."
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Anuluj
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {exercise ? "Zapisz zmiany" : "Dodaj zadanie"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Options Editor
interface OptionsEditorProps {
  options: string[];
  correctAnswer?: number | number[];
  multiple: boolean;
  onChange: (options: string[], correct?: number | number[]) => void;
}

const OptionsEditor: React.FC<OptionsEditorProps> = ({
  options,
  correctAnswer,
  multiple,
  onChange,
}) => {
  const [localOptions, setLocalOptions] = useState<string[]>(options);

  const updateOption = (index: number, value: string): void => {
    const newOptions = [...localOptions];
    newOptions[index] = value;
    setLocalOptions(newOptions);
    onChange(newOptions, correctAnswer);
  };

  const setCorrect = (index: number): void => {
    if (multiple) {
      const current = Array.isArray(correctAnswer) ? correctAnswer : [];
      const newCorrect = current.includes(index)
        ? current.filter((i: number) => i !== index)
        : [...current, index];
      onChange(localOptions, newCorrect);
    } else {
      onChange(localOptions, index);
    }
  };

  const addOption = (): void => {
    const newOptions = [...localOptions, ""];
    setLocalOptions(newOptions);
    onChange(newOptions, correctAnswer);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Opcje odpowiedzi {multiple && "(możliwy wielokrotny wybór)"}
      </label>
      <div className="space-y-2">
        {localOptions.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type={multiple ? "checkbox" : "radio"}
              checked={
                multiple
                  ? Array.isArray(correctAnswer) &&
                    correctAnswer.includes(index)
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
      </div>
      <button
        onClick={addOption}
        className="mt-3 text-sm text-blue-600 hover:underline"
      >
        + Dodaj opcję
      </button>
    </div>
  );
};

// Preview Modal
interface ExercisePreviewProps {
  exercise: Exercise;
  onClose: () => void;
}

const ExercisePreview: React.FC<ExercisePreviewProps> = ({
  exercise,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">Podgląd zadania</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <TypeBadge type={exercise.type} />
              <span className="text-sm font-medium text-gray-600">
                {exercise.points} pkt
              </span>
            </div>
            <h3 className="text-lg font-medium mb-4">{exercise.question}</h3>

            {exercise.content?.options && (
              <div className="space-y-2">
                {exercise.content.options.map((option, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm ${
                        (
                          Array.isArray(exercise.correctAnswer)
                            ? exercise.correctAnswer.includes(idx)
                            : exercise.correctAnswer === idx
                        )
                          ? "bg-green-100 border-green-600 text-green-600"
                          : "border-gray-300"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span
                      className={`${
                        (
                          Array.isArray(exercise.correctAnswer)
                            ? exercise.correctAnswer.includes(idx)
                            : exercise.correctAnswer === idx
                        )
                          ? "font-medium text-green-700"
                          : ""
                      }`}
                    >
                      {option}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {exercise.tags.length > 0 && (
            <div>
              <span className="text-sm text-gray-600">Tagi:</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {exercise.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Bulk Import Modal
interface BulkImportModalProps {
  onClose: () => void;
  onImport: (exercises: Exercise[]) => void;
}

const BulkImportModal: React.FC<BulkImportModalProps> = ({
  onClose,
  onImport,
}) => {
  const [importData, setImportData] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [showExample, setShowExample] = useState<boolean>(false);

  const exampleData = `[
  {
    "type": "CLOSED_SINGLE",
    "category": "HISTORICAL_LITERARY",
    "difficulty": 1,
    "points": 1,
    "epoch": "REALISM",
    "work": "Zbrodnia i kara",
    "question": "Kto jest autorem powieści „Zbrodnia i kara"?",
    "content": {
      "options": [
        "Lew Tołstoj",
        "Fiodor Dostojewski",
        "Anton Czechow",
        "Iwan Turgieniew"
      ]
    },
    "correctAnswer": 1,
    "tags": ["Dostojewski", "Realizm"],
    "metadata": {
      "explanation": "„Zbrodnia i kara" to najsłynniejsza powieść Fiodora Dostojewskiego, opublikowana w 1866 roku."
    }
  }
]`;

  const handleImport = async (): Promise<void> => {
    const newErrors: string[] = [];

    try {
      // Sprawdź czy JSON jest pusty
      if (!importData.trim()) {
        setErrors(["Proszę wkleić dane JSON"]);
        return;
      }

      // Sprawdź podstawowe błędy składni
      const trimmed = importData.trim();
      if (trimmed.startsWith("{ {")) {
        setErrors([
          "❌ Błąd składni: Podwójny nawias otwierający '{ {'",
          "",
          "JSON powinien zaczynać się od:",
          "• '[{' dla tablicy obiektów (zalecane)",
          "• '{' dla pojedynczego obiektu",
        ]);
        return;
      }

      // Próba naprawy pojedynczego obiektu
      let dataToP = trimmed;
      if (trimmed.startsWith("{") && !trimmed.startsWith("[")) {
        dataToP = "[" + trimmed + "]";
        console.log("Auto-wrapping single object in array");
      }

      let exercises: any;
      try {
        exercises = JSON.parse(dataToP);
      } catch (parseError: any) {
        const errorMsg = parseError.message;
        const position = errorMsg.match(/position (\d+)/)?.[1];

        setErrors([
          "❌ Błąd parsowania JSON:",
          errorMsg,
          "",
          "Sprawdź czy:",
          "• JSON zaczyna się od '[' i kończy na ']'",
          '• Wszystkie klucze są w cudzysłowach: "type", "question"',
          "• Nie ma dodatkowych przecinków na końcu",
          "• Wszystkie nawiasy są zamknięte",
          "• Znaki specjalne (np. ą, ę) są poprawnie zapisane",
          "",
          position
            ? `Problem występuje około pozycji ${position}`
            : "Użyj walidatora JSON online, aby znaleźć błąd",
        ]);
        return;
      }

      if (!Array.isArray(exercises)) {
        setErrors([
          "❌ Dane muszą być tablicą zadań",
          "",
          "Poprawny format:",
          "[",
          '  { "type": "CLOSED_SINGLE", ... },',
          '  { "type": "CLOSED_MULTIPLE", ... }',
          "]",
        ]);
        return;
      }

      if (exercises.length === 0) {
        setErrors(["Tablica jest pusta - dodaj przynajmniej jedno zadanie"]);
        return;
      }

      // Walidacja każdego zadania
      const validExercises: any[] = [];
      exercises.forEach((ex, index) => {
        const exerciseErrors: string[] = [];

        if (!ex.question) exerciseErrors.push("brak 'question'");
        if (!ex.type) exerciseErrors.push("brak 'type'");
        if (!ex.category) exerciseErrors.push("brak 'category'");
        if (ex.points === undefined || ex.points === null)
          exerciseErrors.push("brak 'points'");
        if (!ex.content) exerciseErrors.push("brak 'content'");

        // Auto-fix: dodaj puste tagi jeśli brak
        if (!ex.tags) ex.tags = [];

        // Walidacja typu
        const validTypes = [
          "CLOSED_SINGLE",
          "CLOSED_MULTIPLE",
          "SHORT_ANSWER",
          "SYNTHESIS_NOTE",
          "ESSAY",
        ];
        if (ex.type && !validTypes.includes(ex.type)) {
          exerciseErrors.push(`nieprawidłowy 'type': ${ex.type}`);
        }

        // Walidacja kategorii
        const validCategories = [
          "LANGUAGE_USE",
          "HISTORICAL_LITERARY",
          "WRITING",
        ];
        if (ex.category && !validCategories.includes(ex.category)) {
          exerciseErrors.push(`nieprawidłowa 'category': ${ex.category}`);
        }

        if (exerciseErrors.length > 0) {
          newErrors.push(`Zadanie ${index + 1}: ${exerciseErrors.join(", ")}`);
        } else {
          validExercises.push(ex);
        }
      });

      if (validExercises.length === 0) {
        setErrors([
          "❌ Brak poprawnych zadań do zaimportowania",
          "",
          "Problemy:",
          ...newErrors,
        ]);
        return;
      }

      // Informacja o pominiętych zadaniach
      if (newErrors.length > 0) {
        console.warn("Pominięte zadania:", newErrors);
      }

      // Wyślij do API
      const response = await api.post(
        "/api/admin/exercises/bulk",
        validExercises
      );

      if (response.data.exercises) {
        onImport(response.data.exercises);
        if (newErrors.length > 0) {
          alert(
            `⚠️ Zaimportowano ${validExercises.length} z ${exercises.length} zadań.\nPominięto ${newErrors.length} zadań z błędami.`
          );
        }
      }
    } catch (error: any) {
      console.error("Import error:", error);
      setErrors([
        "❌ Błąd importu:",
        error.response?.data?.message || error.message || "Nieznany błąd",
        "",
        "Sprawdź:",
        "• Połączenie z serwerem",
        "• Uprawnienia admina",
        "• Konsolę przeglądarki dla szczegółów",
      ]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="border-b p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Import zadań (JSON)</h2>
            <p className="text-sm text-gray-600 mt-1">
              Wklej tablicę JSON z zadaniami
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Example toggle */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowExample(!showExample)}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <Info className="w-4 h-4" />
              {showExample ? "Ukryj" : "Pokaż"} przykład formatu
            </button>
            {showExample && (
              <button
                onClick={() => setImportData(exampleData)}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Użyj przykładu
              </button>
            )}
          </div>

          {/* Example */}
          {showExample && (
            <div className="bg-gray-50 rounded-lg p-4 border">
              <pre className="text-xs text-gray-700 overflow-x-auto">
                {exampleData}
              </pre>
            </div>
          )}

          {/* Format tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">Wymagany format:</p>
                <ul className="space-y-1 text-blue-800">
                  <li>
                    • Tablica obiektów:{" "}
                    <code className="bg-blue-100 px-1 rounded">
                      [{"{...}"}, {"{...}"}]
                    </code>
                  </li>
                  <li>• Wszystkie klucze w cudzysłowach</li>
                  <li>
                    • Pola wymagane: type, category, question, content, points
                  </li>
                  <li>
                    • Pole tags może być puste:{" "}
                    <code className="bg-blue-100 px-1 rounded">[]</code>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* JSON input */}
          <div>
            <label className="block text-sm font-medium mb-2">Dane JSON</label>
            <textarea
              value={importData}
              onChange={(e) => {
                setImportData(e.target.value);
                setErrors([]); // Clear errors on change
              }}
              className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
              rows={12}
              placeholder='[{"type": "CLOSED_SINGLE", "question": "...", ...}]'
            />
            <div className="mt-1 text-xs text-gray-500">
              {importData.trim().length > 0 && (
                <>
                  Znaki: {importData.length} |{" "}
                  {importData.trim().startsWith("[")
                    ? "✓ Tablica"
                    : "⚠️ Nie tablica"}
                </>
              )}
            </div>
          </div>

          {/* Errors display */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div className="flex-1">
                  {errors.map((error, idx) => (
                    <div
                      key={idx}
                      className={`text-sm ${
                        error === "" ? "h-2" : "text-red-700"
                      }`}
                    >
                      {error}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Anuluj
            </button>
            <button
              onClick={handleImport}
              disabled={!importData.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Importuj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
interface TypeBadgeProps {
  type: Exercise["type"];
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const config = {
    CLOSED_SINGLE: { label: "Jednokrotny", color: "bg-blue-100 text-blue-700" },
    CLOSED_MULTIPLE: {
      label: "Wielokrotny",
      color: "bg-indigo-100 text-indigo-700",
    },
    SHORT_ANSWER: {
      label: "Krótka odp.",
      color: "bg-green-100 text-green-700",
    },
    SYNTHESIS_NOTE: {
      label: "Notatka",
      color: "bg-purple-100 text-purple-700",
    },
    ESSAY: { label: "Wypracowanie", color: "bg-pink-100 text-pink-700" },
  };

  const { label, color } = config[type];

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded ${color}`}>
      {label}
    </span>
  );
};

interface CategoryBadgeProps {
  category: Exercise["category"];
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  const config = {
    LANGUAGE_USE: { label: "Język", color: "bg-blue-100 text-blue-700" },
    HISTORICAL_LITERARY: {
      label: "Historia lit.",
      color: "bg-purple-100 text-purple-700",
    },
    WRITING: { label: "Pisanie", color: "bg-green-100 text-green-700" },
  };

  const { label, color } = config[category];

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded ${color}`}>
      {label}
    </span>
  );
};

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string | number;
  color: "blue" | "green" | "purple" | "orange";
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  title,
  value,
  color,
}) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
    orange: "bg-orange-100 text-orange-700",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default ExerciseManager;

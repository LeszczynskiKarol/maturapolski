// frontend/src/features/admin/ExamQuestionsManager.tsx

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Save,
  X,
  BookOpen,
  Hash,
  Tag,
  AlertCircle,
  Brain,
  Sparkles,
  FileQuestion,
} from "lucide-react";
import { toast } from "react-hot-toast";

interface ExamQuestion {
  id: string;
  type: string;
  category: string;
  epoch?: string;
  difficulty: number;
  question: string;
  content: any;
  correctAnswer: any;
  tags: string[];
  metadata?: any;
  createdAt: string;
  _count?: {
    submissions: number;
    usageHistory: number;
  };
}

export const ExamQuestionsManager: React.FC = () => {
  const queryClient = useQueryClient();
  const [showEditor, setShowEditor] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<ExamQuestion | null>(
    null
  );
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    difficulty: "",
    search: "",
  });

  // POBIERAMY TYLKO PYTANIA EGZAMINACYJNE!
  const { data: questions, isLoading } = useQuery<ExamQuestion[]>({
    queryKey: ["exam-questions-pool", filters],
    queryFn: () =>
      api
        .get("/api/admin/exam-questions", { params: filters })
        .then((r) => r.data),
  });

  const { data: stats } = useQuery({
    queryKey: ["exam-questions-stats"],
    queryFn: () =>
      api.get("/api/admin/exam-questions/stats").then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/admin/exam-questions/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam-questions-pool"] });
      toast.success("Pytanie egzaminacyjne usunięte");
    },
  });

  return (
    <div className="p-6">
      {/* Header z gradientem */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 mb-6 text-white">
        <div className="flex items-start gap-4">
          <Brain className="w-10 h-10 mt-1" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">
              Pula Pytań Egzaminacyjnych
            </h1>
            <p className="text-purple-100">
              Zarządzaj pytaniami używanymi w dynamicznym systemie egzaminów. Te
              pytania są automatycznie dobierane przez algorytm AI dla każdego
              studenta.
            </p>
          </div>
        </div>
      </div>

      {/* Statystyki */}
      {stats && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <FileQuestion className="w-5 h-5 text-purple-500" />
              <p className="text-sm text-gray-600">Pula egzaminacyjna</p>
            </div>
            <p className="text-2xl font-bold text-purple-600">{stats.total}</p>
            <p className="text-xs text-gray-500 mt-1">pytań w puli</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600">Zamknięte</p>
            <p className="text-2xl font-bold text-blue-600">{stats.closed}</p>
            <p className="text-xs text-gray-500 mt-1">
              jednokrotny/wielokrotny
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600">Krótkie odp.</p>
            <p className="text-2xl font-bold text-green-600">
              {stats.shortAnswer}
            </p>
            <p className="text-xs text-gray-500 mt-1">otwarte pytania</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600">Wypracowania</p>
            <p className="text-2xl font-bold text-purple-600">{stats.essays}</p>
            <p className="text-xs text-gray-500 mt-1">zadania rozszerzone</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600">Użyte ostatnio</p>
            <p className="text-2xl font-bold text-orange-600">
              {stats.recentlyUsed}
            </p>
            <p className="text-xs text-gray-500 mt-1">w ostatnich 7 dniach</p>
          </div>
        </div>
      )}

      {/* Alert - Ważna informacja */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-300">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
          <div className="text-sm text-purple-800">
            <p className="font-semibold mb-1">
              Inteligentny System Doboru Pytań
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                To są TYLKO pytania używane w egzaminach (nie zadania do nauki)
              </li>
              <li>
                System AI automatycznie wybiera optymalne pytania dla każdego
                studenta
              </li>
              <li>Algorytm analizuje historię odpowiedzi i unika powtórzeń</li>
              <li>
                Każdy student dostaje unikalny zestaw dostosowany do jego
                poziomu
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Filtry */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-4">
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">Wszystkie typy</option>
            <option value="CLOSED_SINGLE">Jednokrotny wybór</option>
            <option value="CLOSED_MULTIPLE">Wielokrotny wybór</option>
            <option value="SHORT_ANSWER">Krótka odpowiedź</option>
            <option value="SYNTHESIS_NOTE">Notatka syntetyzująca</option>
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
            <option value="HISTORICAL_LITERARY">Historycznoliteracka</option>
            <option value="LANGUAGE_USE">Język w użyciu</option>
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

          <div className="flex-1">
            <input
              type="text"
              placeholder="Szukaj w pytaniach egzaminacyjnych..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <button
            onClick={() => setShowEditor(true)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700"
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Dodaj pytanie egzaminacyjne
          </button>
        </div>
      </div>

      {/* Lista pytań */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              Ładowanie pytań egzaminacyjnych...
            </p>
          </div>
        ) : questions && questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onEdit={() => {
                setEditingQuestion(question);
                setShowEditor(true);
              }}
              onDelete={() => {
                if (
                  confirm(
                    "Czy na pewno usunąć to pytanie z puli egzaminacyjnej?"
                  )
                ) {
                  deleteMutation.mutate(question.id);
                }
              }}
            />
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <FileQuestion className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Brak pytań egzaminacyjnych w puli</p>
            <p className="text-sm text-gray-500 mt-1">
              Dodaj pierwsze pytanie używając przycisku powyżej
            </p>
          </div>
        )}
      </div>

      {/* Editor */}
      {showEditor && (
        <QuestionEditor
          question={editingQuestion}
          onClose={() => {
            setShowEditor(false);
            setEditingQuestion(null);
          }}
          onSave={() => {
            queryClient.invalidateQueries({
              queryKey: ["exam-questions-pool"],
            });
            setShowEditor(false);
            setEditingQuestion(null);
          }}
        />
      )}
    </div>
  );
};

// Karta pytania egzaminacyjnego
const QuestionCard: React.FC<{
  question: ExamQuestion;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ question, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-4 hover:border-purple-300 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`px-2 py-1 rounded text-xs font-medium
                          ${
                            question.type === "ESSAY"
                              ? "bg-purple-100 text-purple-700"
                              : question.type === "SHORT_ANSWER"
                              ? "bg-green-100 text-green-700"
                              : question.type === "SYNTHESIS_NOTE"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
            >
              {question.type}
            </span>

            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
              {question.category}
            </span>

            <span className="text-xs text-gray-500">
              {"⭐".repeat(question.difficulty)}
            </span>

            <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium">
              EGZAMIN
            </span>
          </div>

          <p className="font-medium text-gray-900 mb-2">{question.question}</p>

          {question.tags && question.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-purple-50 text-purple-600 
                           rounded text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>Użyte: {question._count?.usageHistory || 0} razy</span>
            <span>Odpowiedzi: {question._count?.submissions || 0}</span>
            {question.epoch && (
              <span className="text-purple-600">Epoka: {question.epoch}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={onEdit} className="p-2 hover:bg-purple-50 rounded">
            <Edit className="w-4 h-4 text-gray-600" />
          </button>
          <button onClick={onDelete} className="p-2 hover:bg-red-50 rounded">
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Editor pytania egzaminacyjnego
const QuestionEditor: React.FC<{
  question: ExamQuestion | null;
  onClose: () => void;
  onSave: () => void;
}> = ({ question, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    type: question?.type || "CLOSED_SINGLE",
    category: question?.category || "HISTORICAL_LITERARY",
    difficulty: question?.difficulty || 3,
    question: question?.question || "",
    content: question?.content || {},
    correctAnswer: question?.correctAnswer || null,
    tags: question?.tags || [],
    epoch: question?.epoch || "",
  });

  const saveMutation = useMutation({
    mutationFn: (data: any) => {
      if (question) {
        return api.put(`/api/admin/exam-questions/${question.id}`, data);
      } else {
        return api.post("/api/admin/exam-questions", data);
      }
    },
    onSuccess: () => {
      toast.success(
        question
          ? "Pytanie zaktualizowane"
          : "Pytanie dodane do puli egzaminacyjnej"
      );
      onSave();
    },
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {question
              ? "Edytuj pytanie egzaminacyjne"
              : "Nowe pytanie egzaminacyjne"}
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Alert */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <p className="text-sm text-purple-700">
              To pytanie będzie używane TYLKO w egzaminach z dynamicznym
              doborem.
            </p>
          </div>

          {/* Reszta formularza taka sama jak wcześniej... */}
          {/* Typ i kategoria */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Typ pytania
              </label>
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
                <option value="SYNTHESIS_NOTE">Notatka syntetyzująca</option>
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
                <option value="HISTORICAL_LITERARY">
                  Historycznoliteracka
                </option>
                <option value="LANGUAGE_USE">Język w użyciu</option>
                <option value="WRITING">Pisanie</option>
              </select>
            </div>
          </div>

          {/* Trudność */}
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

          {/* Treść pytania */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Treść pytania
            </label>
            <textarea
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
              rows={4}
              placeholder="Wprowadź treść pytania egzaminacyjnego..."
            />
          </div>

          {/* Opcje dla pytań zamkniętych */}
          {(formData.type === "CLOSED_SINGLE" ||
            formData.type === "CLOSED_MULTIPLE") && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Opcje odpowiedzi (JSON)
              </label>
              <textarea
                value={JSON.stringify(
                  formData.content.options || ["A", "B", "C", "D"],
                  null,
                  2
                )}
                onChange={(e) => {
                  try {
                    const options = JSON.parse(e.target.value);
                    setFormData({
                      ...formData,
                      content: { ...formData.content, options },
                    });
                  } catch {}
                }}
                className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
                rows={4}
              />

              <label className="block text-sm font-medium mb-1 mt-2">
                Poprawna odpowiedź (indeks lub tablica)
              </label>
              <input
                type="text"
                value={formData.correctAnswer || "0"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    correctAnswer: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          )}

          {/* Tagi */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tagi (oddzielone przecinkami)
            </label>
            <input
              type="text"
              value={formData.tags.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tags: e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                })
              }
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="np. romantyzm, mickiewicz, dziady"
            />
          </div>

          {/* Epoka (opcjonalne) */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Epoka (opcjonalne)
            </label>
            <select
              value={formData.epoch}
              onChange={(e) =>
                setFormData({ ...formData, epoch: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">-- Brak --</option>
              <option value="ANTIQUITY">Starożytność</option>
              <option value="MIDDLE_AGES">Średniowiecze</option>
              <option value="RENAISSANCE">Renesans</option>
              <option value="BAROQUE">Barok</option>
              <option value="ENLIGHTENMENT">Oświecenie</option>
              <option value="ROMANTICISM">Romantyzm</option>
              <option value="POSITIVISM">Pozytywizm</option>
              <option value="YOUNG_POLAND">Młoda Polska</option>
              <option value="INTERWAR">Dwudziestolecie</option>
              <option value="CONTEMPORARY">Współczesność</option>
            </select>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t p-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Anuluj
          </button>
          <button
            onClick={() => saveMutation.mutate(formData)}
            disabled={saveMutation.isPending}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg 
                     hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50"
          >
            {saveMutation.isPending
              ? "Zapisywanie..."
              : "Zapisz pytanie egzaminacyjne"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamQuestionsManager;

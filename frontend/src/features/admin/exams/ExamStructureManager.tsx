// frontend/src/features/admin/exams/ExamStructureManager.tsx

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../services/api";
import {
  Plus,
  Edit,
  Trash2,
  Copy,
  Power,
  Users,
  Calendar,
  Clock,
  ChevronDown,
  ChevronRight,
  Brain,
  Sparkles,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { ExamStructureEditor } from "./ExamStructureEditor";

interface ExamStructure {
  id: string;
  title: string;
  year: number;
  type: string;
  duration: number;
  isActive: boolean;
  sections: any[];
  _count: { sessions: number };
}

export const ExamStructureManager: React.FC = () => {
  const queryClient = useQueryClient();
  const [showEditor, setShowEditor] = useState(false);
  const [editingExam, setEditingExam] = useState<ExamStructure | null>(null);
  const [expandedExams, setExpandedExams] = useState<Set<string>>(new Set());

  const { data: exams, isLoading } = useQuery<ExamStructure[]>({
    queryKey: ["exam-structures"],
    queryFn: () => api.get("/api/admin/exam-structures").then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/admin/exam-structures/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam-structures"] });
      toast.success("Struktura usunięta");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Błąd usuwania");
    },
  });

  const duplicateMutation = useMutation({
    mutationFn: (id: string) =>
      api.post(`/api/admin/exam-structures/${id}/duplicate`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam-structures"] });
      toast.success("Struktura zduplikowana");
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (id: string) =>
      api.patch(`/api/admin/exam-structures/${id}/toggle`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam-structures"] });
      toast.success("Status zmieniony");
    },
  });

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedExams);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedExams(newExpanded);
  };

  if (showEditor) {
    return (
      <ExamStructureEditor
        exam={editingExam}
        onClose={() => {
          setShowEditor(false);
          setEditingExam(null);
        }}
        onSave={() => {
          queryClient.invalidateQueries({ queryKey: ["exam-structures"] });
          setShowEditor(false);
          setEditingExam(null);
        }}
      />
    );
  }

  return (
    <div className="p-6">
      {/* Header z gradientem */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 mb-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Brain className="w-8 h-8" />
              Inteligentne Struktury Egzaminów
            </h1>
            <p className="text-purple-100 mt-2">
              System automatycznego dobierania unikalnych pytań dla każdego
              studenta
            </p>
          </div>
          <button
            onClick={() => setShowEditor(true)}
            className="flex items-center gap-2 px-5 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 font-medium"
          >
            <Sparkles className="w-5 h-5" />
            Nowa struktura
          </button>
        </div>
      </div>

      {/* Alert info */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Jak to działa?</strong> Definiujesz tylko strukturę egzaminu
          (ile pytań każdego typu). System automatycznie dobierze optymalne
          pytania dla każdego studenta, unikając powtórzeń i analizując historię
          odpowiedzi.
        </p>
      </div>

      {isLoading ? (
        <div>Ładowanie struktur...</div>
      ) : (
        <div className="space-y-4">
          {exams?.map((exam) => (
            <div key={exam.id} className="bg-white rounded-lg shadow">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleExpanded(exam.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      {expandedExams.has(exam.id) ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>

                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        {exam.title}
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          Dynamiczny
                        </span>
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exam.year}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {exam.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {exam._count.sessions} sesji
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            exam.type === "PODSTAWOWY"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {exam.type}
                        </span>
                        {exam.isActive ? (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                            Aktywny
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            Nieaktywny
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleMutation.mutate(exam.id)}
                      className="p-2 hover:bg-gray-100 rounded"
                      title={exam.isActive ? "Dezaktywuj" : "Aktywuj"}
                    >
                      <Power
                        className={`w-4 h-4 ${
                          exam.isActive ? "text-green-600" : "text-gray-400"
                        }`}
                      />
                    </button>

                    <button
                      onClick={() => duplicateMutation.mutate(exam.id)}
                      className="p-2 hover:bg-gray-100 rounded"
                      title="Duplikuj"
                    >
                      <Copy className="w-4 h-4 text-blue-600" />
                    </button>

                    <button
                      onClick={() => {
                        setEditingExam(exam);
                        setShowEditor(true);
                      }}
                      className="p-2 hover:bg-gray-100 rounded"
                      title="Edytuj"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm("Czy na pewno usunąć strukturę?")) {
                          deleteMutation.mutate(exam.id);
                        }
                      }}
                      className="p-2 hover:bg-gray-100 rounded"
                      title="Usuń"
                      disabled={exam._count.sessions > 0}
                    >
                      <Trash2
                        className={`w-4 h-4 ${
                          exam._count.sessions > 0
                            ? "text-gray-300"
                            : "text-red-600"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {expandedExams.has(exam.id) && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-2">Struktura dynamiczna:</h4>
                    {exam.sections.map((section, idx) => (
                      <div key={idx} className="ml-4 mb-2">
                        <div className="font-medium text-sm">
                          {idx + 1}. {section.title}
                        </div>
                        <div className="ml-4 text-sm text-gray-600">
                          Pytania będą dobierane dynamicznie
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// frontend/src/features/admin/ExerciseManager.tsx

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash, Copy, Search } from "lucide-react";
import { ExerciseEditor } from "./ExerciseEditor";
import { DataTable } from "../../components/DataTable";
import { api } from "../../services/api";
import toast from "react-hot-toast";

export const ExerciseManager: React.FC = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    epoch: "",
    difficulty: "",
    search: "",
  });

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-exercises", filters],
    queryFn: () =>
      api.get("/admin/exercises", { params: filters }).then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/exercises/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-exercises"] });
      toast.success("Zadanie usunięte");
    },
  });

  const handleDuplicate = async (id: string) => {
    try {
      await api.post(`/admin/exercises/${id}/duplicate`);
      queryClient.invalidateQueries({ queryKey: ["admin-exercises"] });
      toast.success("Zadanie zduplikowane");
    } catch (error) {
      toast.error("Błąd podczas duplikowania");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Czy na pewno chcesz usunąć to zadanie?")) {
      deleteMutation.mutate(id);
    }
  };

  const columns = [
    {
      key: "question",
      label: "Pytanie",
      render: (value: string) => (
        <div className="max-w-md truncate">{value}</div>
      ),
    },
    {
      key: "type",
      label: "Typ",
      render: (value: string) => (
        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
          {value}
        </span>
      ),
    },
    {
      key: "category",
      label: "Kategoria",
    },
    {
      key: "difficulty",
      label: "Trudność",
      render: (value: number) => (
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full mr-1 ${
                i < value ? "bg-yellow-400" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      ),
    },
    {
      key: "points",
      label: "Punkty",
    },
    {
      key: "actions",
      label: "Akcje",
      render: (_: any, row: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedExercise(row);
              setIsEditorOpen(true);
            }}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDuplicate(row.id)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-1 hover:bg-red-100 rounded text-red-600"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Zarządzanie zadaniami</h1>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="grid grid-cols-6 gap-4">
          {/* Filters... */}
          <button
            onClick={() => setIsEditorOpen(true)}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center justify-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nowe zadanie
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data?.exercises || []}
        loading={isLoading}
      />

      {isEditorOpen && (
        <ExerciseEditor
          exercise={selectedExercise}
          onClose={() => {
            setIsEditorOpen(false);
            setSelectedExercise(null);
          }}
          onSave={() => {
            queryClient.invalidateQueries({ queryKey: ["admin-exercises"] });
            setIsEditorOpen(false);
            setSelectedExercise(null);
          }}
        />
      )}
    </div>
  );
};

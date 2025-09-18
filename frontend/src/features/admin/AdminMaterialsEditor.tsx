// frontend/src/features/admin/AdminMaterialsEditor.tsx
import React, { useState, useEffect } from "react";
import { materialsService } from "../../services/materialsService";
import {
  Plus,
  Save,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  BookOpen,
  FileText,
  Upload,
  X,
  Check,
  ChevronDown,
  ChevronRight,
  Tag,
  Clock,
} from "lucide-react";

// Types
interface Material {
  id?: string;
  title: string;
  slug?: string;
  type: MaterialType;
  category: MaterialCategory;
  content: any;
  summary: string;
  epoch?: string;
  workId?: string;
  tags: string[];
  difficulty: number;
  readingTime?: number;
  isPremium: boolean;
  isPublished: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

interface LiteraryWork {
  id: string;
  title: string;
  author: string;
  epoch: string;
  isRequired: boolean;
}

type MaterialType =
  | "EPOCH_OVERVIEW"
  | "WORK_ANALYSIS"
  | "CHARACTER_ANALYSIS"
  | "THEME_ANALYSIS"
  | "WRITING_GUIDE"
  | "THEORY"
  | "SUMMARY"
  | "INTERPRETATION"
  | "CONTEXT"
  | "BIOGRAPHY";

type MaterialCategory =
  | "EPOCHS"
  | "LITERATURE"
  | "THEORY"
  | "WRITING"
  | "EXAM_PREP"
  | "QUICK_REVIEW";

const MATERIAL_TYPES = [
  { value: "EPOCH_OVERVIEW", label: "Przegląd epoki" },
  { value: "WORK_ANALYSIS", label: "Analiza dzieła" },
  { value: "CHARACTER_ANALYSIS", label: "Analiza postaci" },
  { value: "THEME_ANALYSIS", label: "Analiza motywów" },
  { value: "WRITING_GUIDE", label: "Poradnik pisania" },
  { value: "THEORY", label: "Teoria" },
  { value: "SUMMARY", label: "Streszczenie" },
  { value: "INTERPRETATION", label: "Interpretacja" },
  { value: "CONTEXT", label: "Kontekst" },
  { value: "BIOGRAPHY", label: "Biografia" },
];

const CATEGORIES = [
  { value: "EPOCHS", label: "Epoki literackie" },
  { value: "LITERATURE", label: "Lektury" },
  { value: "THEORY", label: "Teoria literatury" },
  { value: "WRITING", label: "Pisanie" },
  { value: "EXAM_PREP", label: "Przygotowanie do matury" },
  { value: "QUICK_REVIEW", label: "Szybka powtórka" },
];

const EPOCHS = [
  { value: "ANTIQUITY", label: "Starożytność" },
  { value: "MIDDLE_AGES", label: "Średniowiecze" },
  { value: "RENAISSANCE", label: "Renesans" },
  { value: "BAROQUE", label: "Barok" },
  { value: "ENLIGHTENMENT", label: "Oświecenie" },
  { value: "ROMANTICISM", label: "Romantyzm" },
  { value: "POSITIVISM", label: "Pozytywizm" },
  { value: "YOUNG_POLAND", label: "Młoda Polska" },
  { value: "INTERWAR", label: "Dwudziestolecie" },
  { value: "CONTEMPORARY", label: "Współczesność" },
];

// Mock data
const mockWorks: LiteraryWork[] = [
  {
    id: "1",
    title: "Pan Tadeusz",
    author: "Adam Mickiewicz",
    epoch: "ROMANTICISM",
    isRequired: true,
  },
  {
    id: "2",
    title: "Lalka",
    author: "Bolesław Prus",
    epoch: "POSITIVISM",
    isRequired: true,
  },
  {
    id: "3",
    title: "Wesele",
    author: "Stanisław Wyspiański",
    epoch: "YOUNG_POLAND",
    isRequired: true,
  },
];

export default function AdminMaterialsEditor() {
  const [activeTab, setActiveTab] = useState<"list" | "create" | "works">(
    "list"
  );
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [works, setWorks] = useState<LiteraryWork[]>([]);

  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Material>({
    title: "",
    type: "WORK_ANALYSIS",
    category: "LITERATURE",
    content: { blocks: [] },
    summary: "",
    tags: [],
    difficulty: 1,
    isPremium: false,
    isPublished: false,
  });

  const [contentBlocks, setContentBlocks] = useState<any[]>([]);
  const [tagInput, setTagInput] = useState("");
  const handleSaveMaterial = async () => {
    try {
      const dataToSave = {
        ...formData,
        workId: null, // tymczasowo usuń workId
      };

      let saved;
      if (isEditing && selectedMaterial?.id) {
        // Edycja istniejącego
        saved = await materialsService.updateMaterial(
          selectedMaterial.id,
          dataToSave
        );
        setIsEditing(false);
        setSelectedMaterial(null);
      } else {
        // Tworzenie nowego
        saved = await materialsService.createMaterial(dataToSave);
      }

      alert(isEditing ? "Materiał zaktualizowany!" : "Materiał zapisany!");

      // Reset formularza
      setFormData({
        title: "",
        type: "WORK_ANALYSIS",
        category: "LITERATURE",
        content: { blocks: [] },
        summary: "",
        tags: [],
        difficulty: 1,
        isPremium: false,
        isPublished: false,
      });

      setActiveTab("list");
      await loadMaterials();
    } catch (error) {
      console.error("Error saving:", error);
      alert("Błąd: " + (error as any)?.response?.data?.error);
    }
  };

  useEffect(() => {
    if (activeTab === "list") {
      loadMaterials();
    }
  }, [activeTab]);

  useEffect(() => {
    loadWorks();
  }, []);

  const loadWorks = async () => {
    try {
      const response = await materialsService.getWorks();
      setWorks(response);
    } catch (error) {
      console.error("Error loading works:", error);
      setWorks([]); // Jeśli błąd, użyj pustej listy
    }
  };

  // DODAJ funkcję do pobierania materiałów
  const loadMaterials = async () => {
    setLoading(true);
    try {
      const response = await materialsService.getMaterials();
      console.log("Loaded materials:", response);
      setMaterials(response.materials || []);
    } catch (error) {
      console.error("Error loading materials:", error);
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditMaterial = (material: Material) => {
    setFormData(material);
    setIsEditing(true);
    setSelectedMaterial(material);
    setActiveTab("create");
  };

  // Rich Text Editor Component
  const RichTextEditor = ({ content, onChange }: any) => {
    const [blocks, setBlocks] = useState(content.blocks || []);

    const addBlock = (type: string) => {
      const newBlock = {
        id: Date.now().toString(),
        type,
        content: "",
      };
      const updatedBlocks = [...blocks, newBlock];
      setBlocks(updatedBlocks);
      onChange({ blocks: updatedBlocks });
    };

    const updateBlock = (id: string, content: string) => {
      const updatedBlocks = blocks.map((block: any) =>
        block.id === id ? { ...block, content } : block
      );
      setBlocks(updatedBlocks);
      onChange({ blocks: updatedBlocks });
    };

    const removeBlock = (id: string) => {
      const updatedBlocks = blocks.filter((block: any) => block.id !== id);
      setBlocks(updatedBlocks);
      onChange({ blocks: updatedBlocks });
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-2 p-2 bg-gray-50 rounded-lg">
          <button
            type="button"
            onClick={() => addBlock("heading")}
            className="px-3 py-1 bg-white border rounded hover:bg-gray-50"
          >
            Nagłówek
          </button>
          <button
            type="button"
            onClick={() => addBlock("paragraph")}
            className="px-3 py-1 bg-white border rounded hover:bg-gray-50"
          >
            Akapit
          </button>
          <button
            type="button"
            onClick={() => addBlock("list")}
            className="px-3 py-1 bg-white border rounded hover:bg-gray-50"
          >
            Lista
          </button>
          <button
            type="button"
            onClick={() => addBlock("quote")}
            className="px-3 py-1 bg-white border rounded hover:bg-gray-50"
          >
            Cytat
          </button>
        </div>

        <div className="space-y-3">
          {blocks.map((block: any) => (
            <div key={block.id} className="relative group">
              {block.type === "heading" && (
                <input
                  type="text"
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, e.target.value)}
                  placeholder="Wpisz nagłówek..."
                  className="w-full px-4 py-2 text-xl font-bold border rounded-lg"
                />
              )}
              {block.type === "paragraph" && (
                <textarea
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, e.target.value)}
                  placeholder="Wpisz treść akapitu..."
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              )}
              {block.type === "list" && (
                <textarea
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, e.target.value)}
                  placeholder="Wpisz elementy listy (każdy w nowej linii)..."
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              )}
              {block.type === "quote" && (
                <textarea
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, e.target.value)}
                  placeholder="Wpisz cytat..."
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 italic"
                />
              )}
              <button
                type="button"
                onClick={() => removeBlock(block.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>

        {blocks.length === 0 && (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
            Dodaj pierwszy blok treści używając przycisków powyżej
          </div>
        )}
      </div>
    );
  };

  // Material Form Component
  const MaterialForm = () => (
    <form className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tytuł materiału
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="np. Pan Tadeusz - Kompleksowe opracowanie"
        />
      </div>

      {/* Type and Category */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Typ materiału
          </label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value as MaterialType })
            }
            className="w-full px-4 py-2 border rounded-lg"
          >
            {MATERIAL_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategoria
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value as MaterialCategory,
              })
            }
            className="w-full px-4 py-2 border rounded-lg"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Epoch and Work */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Epoka (opcjonalne)
          </label>
          <select
            value={formData.epoch || ""}
            onChange={(e) =>
              setFormData({ ...formData, epoch: e.target.value || undefined })
            }
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">-- Wybierz --</option>
            {EPOCHS.map((epoch) => (
              <option key={epoch.value} value={epoch.value}>
                {epoch.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Powiązane dzieło (opcjonalne)
          </label>
          <select
            value={formData.workId || ""}
            onChange={(e) =>
              setFormData({ ...formData, workId: e.target.value || undefined })
            }
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">-- Wybierz --</option>
            {works.map(
              (
                work // używaj 'works' zamiast 'mockWorks'
              ) => (
                <option key={work.id} value={work.id}>
                  {work.author} - {work.title}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* Summary */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Podsumowanie
        </label>
        <textarea
          value={formData.summary}
          onChange={(e) =>
            setFormData({ ...formData, summary: e.target.value })
          }
          rows={3}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Krótki opis materiału (max 200 znaków)"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Treść materiału
        </label>
        <RichTextEditor
          content={formData.content}
          onChange={(content: any) => setFormData({ ...formData, content })}
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tagi
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (tagInput.trim()) {
                  setFormData({
                    ...formData,
                    tags: [...formData.tags, tagInput.trim()],
                  });
                  setTagInput("");
                }
              }
            }}
            className="flex-1 px-4 py-2 border rounded-lg"
            placeholder="Wpisz tag i naciśnij Enter"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    ...formData,
                    tags: formData.tags.filter((_, i) => i !== index),
                  });
                }}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Poziom trudności
          </label>
          <select
            value={formData.difficulty}
            onChange={(e) =>
              setFormData({ ...formData, difficulty: parseInt(e.target.value) })
            }
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value={1}>Łatwy</option>
            <option value={2}>Średni</option>
            <option value={3}>Trudny</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Czas czytania (min)
          </label>
          <input
            type="number"
            value={formData.readingTime || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                readingTime: parseInt(e.target.value) || undefined,
              })
            }
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="np. 15"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isPremium}
              onChange={(e) =>
                setFormData({ ...formData, isPremium: e.target.checked })
              }
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700">
              Materiał Premium
            </span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isPublished}
              onChange={(e) =>
                setFormData({ ...formData, isPublished: e.target.checked })
              }
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700">
              Opublikowany
            </span>
          </label>
        </div>
      </div>

      {/* SEO */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">SEO</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta tytuł
            </label>
            <input
              type="text"
              value={formData.metaTitle || ""}
              onChange={(e) =>
                setFormData({ ...formData, metaTitle: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Tytuł w wynikach wyszukiwania"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta opis
            </label>
            <textarea
              value={formData.metaDescription || ""}
              onChange={(e) =>
                setFormData({ ...formData, metaDescription: e.target.value })
              }
              rows={2}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Opis w wynikach wyszukiwania"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <button
          type="button"
          onClick={() => {
            setFormData({
              title: "",
              type: "WORK_ANALYSIS",
              category: "LITERATURE",
              content: { blocks: [] },
              summary: "",
              tags: [],
              difficulty: 1,
              isPremium: false,
              isPublished: false,
            });
            setActiveTab("list");
          }}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Anuluj
        </button>
        <button
          type="button"
          onClick={handleSaveMaterial}
          disabled={!formData.title || !formData.summary}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isEditing ? "Zaktualizuj materiał" : "Zapisz materiał"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setSelectedMaterial(null);
              setFormData({
                title: "",
                type: "WORK_ANALYSIS",
                category: "LITERATURE",
                content: { blocks: [] },
                summary: "",
                tags: [],
                difficulty: 1,
                isPremium: false,
                isPublished: false,
              });
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          >
            Anuluj edycję
          </button>
        )}
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Zarządzanie materiałami edukacyjnymi
              </h1>
              <p className="text-gray-600 mt-1">
                Twórz i edytuj materiały dla uczniów
              </p>
            </div>
            <button
              onClick={() => setActiveTab("create")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Nowy materiał
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-6 border-b">
            <button
              onClick={() => setActiveTab("list")}
              className={`pb-3 px-1 border-b-2 transition-colors ${
                activeTab === "list"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Lista materiałów
            </button>
            <button
              onClick={() => setActiveTab("create")}
              className={`pb-3 px-1 border-b-2 transition-colors ${
                activeTab === "create"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Utwórz materiał
            </button>
            <button
              onClick={() => setActiveTab("works")}
              className={`pb-3 px-1 border-b-2 transition-colors ${
                activeTab === "works"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Lektury
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === "list" && (
            <div>
              {loading ? (
                <div className="text-center py-12">
                  <div className="text-gray-500">Ładowanie materiałów...</div>
                </div>
              ) : materials.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>Brak materiałów do wyświetlenia</p>
                  <button
                    onClick={() => setActiveTab("create")}
                    className="mt-4 text-blue-600 hover:text-blue-700"
                  >
                    Utwórz pierwszy materiał
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {materials.map((material) => (
                    <div
                      key={material.id || material.slug}
                      className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            {material.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {material.summary}
                          </p>
                          <div className="flex gap-2 mt-3">
                            {material.isPremium && (
                              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                Premium
                              </span>
                            )}
                            {material.isPublished ? (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Opublikowany
                              </span>
                            ) : (
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                Szkic
                              </span>
                            )}
                            {material.epoch && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {
                                  EPOCHS.find((e) => e.value === material.epoch)
                                    ?.label
                                }
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEditMaterial(material)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={async () => {
                              if (
                                confirm(
                                  "Czy na pewno chcesz usunąć ten materiał?"
                                )
                              ) {
                                try {
                                  await materialsService.deleteMaterial(
                                    material.id!
                                  );
                                  await loadMaterials();
                                } catch (error) {
                                  alert("Błąd podczas usuwania");
                                }
                              }
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "create" && <MaterialForm />}

          {activeTab === "works" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Zarządzanie lekturami
              </h2>
              <div className="space-y-4">
                {mockWorks.map((work) => (
                  <div
                    key={work.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold">{work.title}</h3>
                      <p className="text-sm text-gray-600">{work.author}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {EPOCHS.find((e) => e.value === work.epoch)?.label}
                        </span>
                        {work.isRequired && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            Lektura obowiązkowa
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400">
                + Dodaj lekturę
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

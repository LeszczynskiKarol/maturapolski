// frontend/src/features/admin/ContentManager.tsx
import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit,
  FileText,
  BookOpen,
  Calendar,
  User,
  GripVertical,
  X,
  ArrowLeft,
} from "lucide-react";
import { contentService } from "../../services/contentService";

interface Hub {
  id: string;
  slug: string;
  title: string;
  type: "LITERARY_WORK" | "EPOCH" | "AUTHOR";
  description?: string;
  author?: string;
  epoch?: string;
  pages?: ContentPage[];
}

interface ContentPage {
  id: string;
  slug: string;
  title: string;
  content: any;
  order: number;
  readingTime?: number;
}

const HUB_TYPES = [
  { value: "LITERARY_WORK", label: "Lektura", icon: BookOpen },
  { value: "EPOCH", label: "Epoka", icon: Calendar },
  { value: "AUTHOR", label: "Autor/Twórca", icon: User },
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

export default function ContentManager() {
  const [view, setView] = useState<"hubs" | "hub-detail" | "page-editor">(
    "hubs"
  );
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [selectedHub, setSelectedHub] = useState<Hub | null>(null);
  const [selectedPage, setSelectedPage] = useState<ContentPage | null>(null);
  const [, setLoading] = useState(false);

  // Form states
  const [hubForm, setHubForm] = useState({
    title: "",
    type: "LITERARY_WORK" as any,
    description: "",
    author: "",
    epoch: "",
    year: "",
  });

  const [pageForm, setPageForm] = useState({
    title: "",
    customSlug: "", // WAŻNE: Użytkownik sam wpisuje slug!
    content: { blocks: [] },
    readingTime: "",
  });

  const [showHubModal, setShowHubModal] = useState(false);
  const [showPageModal, setShowPageModal] = useState(false);

  useEffect(() => {
    loadHubs();
  }, []);

  const loadHubs = async () => {
    setLoading(true);
    try {
      const response = await contentService.getHubs();
      setHubs(response.hubs || []);
    } catch (error) {
      console.error("Error loading hubs:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadHubDetail = async (hubSlug: string) => {
    try {
      const hub = await contentService.getHub(hubSlug);
      setSelectedHub(hub);
      setView("hub-detail");
    } catch (error) {
      console.error("Error loading hub:", error);
    }
  };

  // ==========================================
  // HUB - Tworzenie i edycja
  // ==========================================

  const handleSaveHub = async () => {
    try {
      if (selectedHub) {
        await contentService.updateHub(selectedHub.id, hubForm);
      } else {
        await contentService.createHub(hubForm);
      }
      setShowHubModal(false);
      resetHubForm();
      loadHubs();
    } catch (error) {
      alert("Błąd zapisu: " + (error as any).message);
    }
  };

  const handleDeleteHub = async (id: string) => {
    if (!confirm("Usunąć ten hub wraz ze wszystkimi jego stronami?")) return;

    try {
      await contentService.deleteHub(id);
      loadHubs();
    } catch (error) {
      alert("Błąd usuwania");
    }
  };

  const resetHubForm = () => {
    setHubForm({
      title: "",
      type: "LITERARY_WORK",
      description: "",
      author: "",
      epoch: "",
      year: "",
    });
    setSelectedHub(null);
  };

  // ==========================================
  // PAGE - Tworzenie i edycja
  // ==========================================

  const handleSavePage = async () => {
    if (!selectedHub) return;

    try {
      const pageData = {
        title: pageForm.title,
        slug: pageForm.customSlug, // Użytkownik wpisał własny slug!
        content: pageForm.content,
        readingTime: pageForm.readingTime
          ? parseInt(pageForm.readingTime)
          : null,
      };

      if (selectedPage) {
        await contentService.updatePage(selectedPage.id, pageData);
      } else {
        await contentService.createPage(selectedHub.id, pageData);
      }

      setShowPageModal(false);
      resetPageForm();
      loadHubDetail(selectedHub.slug); // Odśwież
    } catch (error) {
      alert("Błąd zapisu: " + (error as any).message);
    }
  };

  const handleDeletePage = async (id: string) => {
    if (!confirm("Usunąć tę stronę?")) return;

    try {
      await contentService.deletePage(id);
      if (selectedHub) {
        loadHubDetail(selectedHub.slug);
      }
    } catch (error) {
      alert("Błąd usuwania");
    }
  };

  const resetPageForm = () => {
    setPageForm({
      title: "",
      customSlug: "",
      content: { blocks: [] },
      readingTime: "",
    });
    setSelectedPage(null);
  };

  // ==========================================
  // RICH TEXT EDITOR
  // ==========================================

  const RichTextEditor = ({ content, onChange }: any) => {
    const [blocks, setBlocks] = useState(content.blocks || []);

    const addBlock = (type: string) => {
      const newBlock = {
        id: Date.now().toString(),
        type,
        content: "",
      };
      const updated = [...blocks, newBlock];
      setBlocks(updated);
      onChange({ blocks: updated });
    };

    const updateBlock = (id: string, content: string) => {
      const updated = blocks.map((b: any) =>
        b.id === id ? { ...b, content } : b
      );
      setBlocks(updated);
      onChange({ blocks: updated });
    };

    const removeBlock = (id: string) => {
      const updated = blocks.filter((b: any) => b.id !== id);
      setBlocks(updated);
      onChange({ blocks: updated });
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-2 p-2 bg-gray-50 rounded">
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
                  className="w-full px-4 py-2 text-xl font-bold border rounded"
                />
              )}
              {block.type === "paragraph" && (
                <textarea
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, e.target.value)}
                  placeholder="Wpisz treść..."
                  rows={4}
                  className="w-full px-4 py-2 border rounded"
                />
              )}
              {block.type === "list" && (
                <textarea
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, e.target.value)}
                  placeholder="Każdy element w nowej linii..."
                  rows={4}
                  className="w-full px-4 py-2 border rounded"
                />
              )}
              {block.type === "quote" && (
                <textarea
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, e.target.value)}
                  placeholder="Wpisz cytat..."
                  rows={3}
                  className="w-full px-4 py-2 border rounded bg-gray-50 italic"
                />
              )}
              <button
                type="button"
                onClick={() => removeBlock(block.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ==========================================
  // VIEWS
  // ==========================================

  // VIEW 1: Lista HUB-ów
  if (view === "hubs") {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Zarządzanie treścią</h1>
                <p className="text-gray-600 mt-1">
                  Lektury, epoki, autorzy - dodaj i zarządzaj treścią
                </p>
              </div>
              <button
                onClick={() => {
                  resetHubForm();
                  setShowHubModal(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Nowy Hub
              </button>
            </div>
          </div>

          {/* Lista HUB-ów */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hubs.map((hub) => {
              const Icon =
                HUB_TYPES.find((t) => t.value === hub.type)?.icon || BookOpen;

              return (
                <div
                  key={hub.id}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Icon className="w-8 h-8 text-blue-600" />
                    <div className="flex gap-2">
                      <button
                        onClick={() => loadHubDetail(hub.slug)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteHub(hub.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg mb-1">{hub.title}</h3>
                  {hub.author && (
                    <p className="text-sm text-gray-600 mb-2">{hub.author}</p>
                  )}

                  <div className="text-sm text-gray-500 mt-4">
                    {hub.pages?.length || 0} stron(y)
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MODAL: Tworzenie/Edycja HUB-a */}
        {showHubModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <h2 className="text-xl font-bold mb-4">
                {selectedHub ? "Edytuj Hub" : "Nowy Hub"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tytuł
                  </label>
                  <input
                    type="text"
                    value={hubForm.title}
                    onChange={(e) =>
                      setHubForm({ ...hubForm, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded"
                    placeholder="np. Lalka, Romantyzm, Adam Mickiewicz"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Typ</label>
                  <select
                    value={hubForm.type}
                    onChange={(e) =>
                      setHubForm({ ...hubForm, type: e.target.value as any })
                    }
                    className="w-full px-4 py-2 border rounded"
                  >
                    {HUB_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {hubForm.type === "LITERARY_WORK" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Autor
                      </label>
                      <input
                        type="text"
                        value={hubForm.author}
                        onChange={(e) =>
                          setHubForm({ ...hubForm, author: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Epoka
                      </label>
                      <select
                        value={hubForm.epoch}
                        onChange={(e) =>
                          setHubForm({ ...hubForm, epoch: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded"
                      >
                        <option value="">-- Wybierz --</option>
                        {EPOCHS.map((e) => (
                          <option key={e.value} value={e.value}>
                            {e.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Rok
                      </label>
                      <input
                        type="number"
                        value={hubForm.year}
                        onChange={(e) =>
                          setHubForm({ ...hubForm, year: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Opis</label>
                  <textarea
                    value={hubForm.description}
                    onChange={(e) =>
                      setHubForm({ ...hubForm, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setShowHubModal(false)}
                  className="flex-1 px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Anuluj
                </button>
                <button
                  onClick={handleSaveHub}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Zapisz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // VIEW 2: Szczegóły HUB-a + Lista stron
  if (view === "hub-detail" && selectedHub) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => {
              setView("hubs");
              setSelectedHub(null);
            }}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Powrót do listy
          </button>

          {/* Header HUB-a */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{selectedHub.title}</h1>
                {selectedHub.author && (
                  <p className="text-gray-600 mt-1">{selectedHub.author}</p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  URL:{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    /{selectedHub.slug}
                  </code>
                </p>
              </div>
              <button
                onClick={() => {
                  resetPageForm();
                  setShowPageModal(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Dodaj stronę
              </button>
            </div>
          </div>

          {/* Lista stron */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Strony tego HUB-a</h2>

            {!selectedHub.pages || selectedHub.pages.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Brak stron. Dodaj pierwszą stronę!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedHub.pages.map((page) => (
                  <div
                    key={page.id}
                    className="flex items-center justify-between p-4 border rounded hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-gray-400" />
                      <div>
                        <h3 className="font-medium">{page.title}</h3>
                        <p className="text-sm text-gray-500">
                          URL:{" "}
                          <code className="bg-gray-100 px-2 py-1 rounded">
                            /{selectedHub.slug}/{page.slug}
                          </code>
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedPage(page);
                          setPageForm({
                            title: page.title,
                            customSlug: page.slug,
                            content: page.content,
                            readingTime: page.readingTime?.toString() || "",
                          });
                          setShowPageModal(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePage(page.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* MODAL: Tworzenie/Edycja strony */}
        {showPageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg max-w-4xl w-full my-8 p-6">
              <h2 className="text-xl font-bold mb-4">
                {selectedPage ? "Edytuj stronę" : "Nowa strona"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tytuł strony
                  </label>
                  <input
                    type="text"
                    value={pageForm.title}
                    onChange={(e) =>
                      setPageForm({ ...pageForm, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded"
                    placeholder="np. Streszczenie szczegółowe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    URL (slug) - wpisz własny!
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">/{selectedHub.slug}/</span>
                    <input
                      type="text"
                      value={pageForm.customSlug}
                      onChange={(e) =>
                        setPageForm({ ...pageForm, customSlug: e.target.value })
                      }
                      className="flex-1 px-4 py-2 border rounded"
                      placeholder="np. streszczenie-szczegolowe"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Pełny URL: /{selectedHub.slug}/{pageForm.customSlug}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Czas czytania (minuty)
                  </label>
                  <input
                    type="number"
                    value={pageForm.readingTime}
                    onChange={(e) =>
                      setPageForm({ ...pageForm, readingTime: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Treść
                  </label>
                  <RichTextEditor
                    content={pageForm.content}
                    onChange={(content: any) =>
                      setPageForm({ ...pageForm, content })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => {
                    setShowPageModal(false);
                    resetPageForm();
                  }}
                  className="flex-1 px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Anuluj
                </button>
                <button
                  onClick={handleSavePage}
                  disabled={!pageForm.title || !pageForm.customSlug}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  Zapisz stronę
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

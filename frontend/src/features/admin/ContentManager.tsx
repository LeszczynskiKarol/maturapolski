// frontend/src/features/admin/ContentManager.tsx
import { useRef, useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit,
  FileText,
  BookOpen,
  ImageIcon,
  Calendar,
  User,
  GripVertical,
  X,
  ArrowLeft,
  Scissors,
  Settings,
} from "lucide-react";
import { contentService } from "../../services/contentService";
import { ImageUpload } from "../../components/ImageUpload";

interface Hub {
  id: string;
  slug: string;
  title: string;
  type: "LITERARY_WORK" | "EPOCH" | "AUTHOR";
  description?: string;
  author?: string;
  epoch?: string;
  year?: number;
  birthYear?: number;
  deathYear?: number;
  imageUrl?: string;
  imageAlignment?: string;
  imageWidth?: string;
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

// ==========================================
// RICH TEXT EDITOR
// ==========================================

const RichTextEditor = ({ content, onChange }: any) => {
  const [blocks, setBlocks] = useState(content.blocks || []);
  const textareaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>(
    {}
  );

  // Handler dla Ctrl+B i Ctrl+I
  const handleKeyDown = (e: React.KeyboardEvent, blockId: string) => {
    if (e.ctrlKey || e.metaKey) {
      const textarea = textareaRefs.current[blockId];
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      if (start === end) return;

      const selectedText = textarea.value.substring(start, end);

      if (e.key === "b" || e.key === "B") {
        e.preventDefault();
        const newText = `**${selectedText}**`;
        const before = textarea.value.substring(0, start);
        const after = textarea.value.substring(end);
        updateBlock(blockId, before + newText + after);
      } else if (e.key === "i" || e.key === "I") {
        e.preventDefault();
        const newText = `*${selectedText}*`;
        const before = textarea.value.substring(0, start);
        const after = textarea.value.substring(end);
        updateBlock(blockId, before + newText + after);
      }
    }
  };

  const addBlock = (type: string) => {
    const newBlock = {
      id: Date.now().toString(),
      type,
      content: type === "image" ? { url: "", alt: "", caption: "" } : "",
    };
    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    onChange({ blocks: newBlocks });
  };

  const updateBlock = (id: string, newContent: string | any) => {
    const newBlocks = blocks.map((b: any) =>
      b.id === id ? { ...b, content: newContent } : b
    );
    setBlocks(newBlocks);
    onChange({ blocks: newBlocks });
  };

  const removeBlock = (id: string) => {
    const newBlocks = blocks.filter((b: any) => b.id !== id);
    setBlocks(newBlocks);
    onChange({ blocks: newBlocks });
  };

  const moveBlockUp = (index: number) => {
    if (index === 0) return;
    const newBlocks = [...blocks];
    [newBlocks[index - 1], newBlocks[index]] = [
      newBlocks[index],
      newBlocks[index - 1],
    ];
    setBlocks(newBlocks);
    onChange({ blocks: newBlocks });
  };

  const moveBlockDown = (index: number) => {
    if (index === blocks.length - 1) return;
    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[index + 1]] = [
      newBlocks[index + 1],
      newBlocks[index],
    ];
    setBlocks(newBlocks);
    onChange({ blocks: newBlocks });
  };

  return (
    <div className="space-y-4">
      {/* Toolbar z przyciskami */}
      <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border">
        <button
          type="button"
          onClick={() => addBlock("h2")}
          className="px-3 py-1.5 bg-white border rounded hover:bg-gray-50 font-semibold"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => addBlock("h3")}
          className="px-3 py-1.5 bg-white border rounded hover:bg-gray-50 font-semibold text-sm"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => addBlock("h4")}
          className="px-3 py-1.5 bg-white border rounded hover:bg-gray-50 font-semibold text-xs"
        >
          H4
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => addBlock("paragraph")}
          className="px-3 py-1.5 bg-white border rounded hover:bg-gray-50"
        >
          Akapit
        </button>
        <button
          type="button"
          onClick={() => addBlock("list")}
          className="px-3 py-1.5 bg-white border rounded hover:bg-gray-50"
        >
          Lista
        </button>
        <button
          type="button"
          onClick={() => addBlock("quote")}
          className="px-3 py-1.5 bg-white border rounded hover:bg-gray-50"
        >
          Cytat
        </button>
        <button
          type="button"
          onClick={() => addBlock("image")}
          className="px-3 py-1.5 bg-green-500 text-white border rounded hover:bg-green-600 flex items-center gap-1"
        >
          <ImageIcon className="w-4 h-4" />
          Obraz
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => addBlock("page_break")}
          className="px-3 py-1.5 bg-orange-500 text-white border rounded hover:bg-orange-600 flex items-center gap-1"
          title="Dodaj podział strony - dla długich tekstów"
        >
          <Scissors className="w-4 h-4" />
          Podział strony
        </button>
      </div>

      {/* Bloki treści */}
      <div className="space-y-3">
        {blocks.map((block: any, index: number) => (
          <div
            key={block.id}
            className="relative group border rounded-lg p-3 bg-white"
          >
            {/* Kontrolki przesuwania */}
            {block.type !== "page_break" && (
              <div className="absolute -left-2 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => moveBlockUp(index)}
                  disabled={index === 0}
                  className="p-1 bg-white border rounded shadow-sm hover:bg-gray-50 disabled:opacity-30"
                  title="Przesuń w górę"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => moveBlockDown(index)}
                  disabled={index === blocks.length - 1}
                  className="p-1 bg-white border rounded shadow-sm hover:bg-gray-50 disabled:opacity-30"
                  title="Przesuń w dół"
                >
                  ▼
                </button>
              </div>
            )}

            {block.type === "paragraph" && (
              <textarea
                ref={(el) => (textareaRefs.current[block.id] = el)}
                value={block.content}
                onChange={(e) => updateBlock(block.id, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, block.id)}
                placeholder="**pogrubienie** *pochylenie*"
                rows={8}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y font-mono text-sm"
              />
            )}

            {/* Przycisk usuń */}
            <button
              type="button"
              onClick={() => removeBlock(block.id)}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              title="Usuń blok"
            >
              <X className="w-3 h-3" />
            </button>

            {/* PAGE BREAK - specjalny typ */}
            {block.type === "page_break" && (
              <div className="flex items-center justify-center py-4 border-2 border-dashed border-orange-400 bg-orange-50 rounded">
                <Scissors className="w-5 h-5 text-orange-600 mr-2" />
                <span className="font-medium text-orange-700">
                  PODZIAŁ STRONY
                </span>
                <span className="ml-2 text-xs text-orange-600">
                  (na stronie pojawi się przycisk "Następna strona")
                </span>
              </div>
            )}

            {block.type === "image" && (
              <div className="space-y-3">
                <div className="text-xs text-gray-500 mb-2 font-medium uppercase">
                  Obraz
                </div>

                {block.content.url ? (
                  <div className="space-y-3">
                    {/* NOWE: Kontrolki wyrównania i szerokości */}
                    <div className="flex gap-4 p-3 bg-gray-50 rounded border">
                      <div className="flex-1">
                        <label className="block text-xs font-medium mb-1">
                          Wyrównanie
                        </label>
                        <select
                          value={block.content.alignment || "full"}
                          onChange={(e) =>
                            updateBlock(block.id, {
                              ...block.content,
                              alignment: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 text-sm border rounded"
                        >
                          <option value="full">
                            Pełna szerokość (osobny wiersz)
                          </option>
                          <option value="left">
                            Z lewej (tekst opływa z prawej)
                          </option>
                          <option value="right">
                            Z prawej (tekst opływa z lewej)
                          </option>
                          <option value="center">Wyśrodkowane</option>
                        </select>
                      </div>

                      <div className="flex-1">
                        <label className="block text-xs font-medium mb-1">
                          Szerokość
                        </label>
                        <select
                          value={block.content.width || "100%"}
                          onChange={(e) =>
                            updateBlock(block.id, {
                              ...block.content,
                              width: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 text-sm border rounded"
                        >
                          <option value="100%">100% (pełna)</option>
                          <option value="75%">75%</option>
                          <option value="50%">50%</option>
                          <option value="33%">33%</option>
                          <option value="25%">25%</option>
                          <option value="300px">300px (małe)</option>
                          <option value="500px">500px (średnie)</option>
                        </select>
                      </div>
                    </div>

                    {/* Podgląd */}
                    <div
                      className={`
          ${block.content.alignment === "left" ? "float-left mr-4 mb-2" : ""}
          ${block.content.alignment === "right" ? "float-right ml-4 mb-2" : ""}
          ${block.content.alignment === "center" ? "mx-auto" : ""}
        `}
                      style={{ width: block.content.width || "100%" }}
                    >
                      <img
                        src={block.content.url}
                        alt={block.content.alt || ""}
                        className="w-full rounded-lg border"
                      />
                    </div>

                    {/* Clearfix jeśli float */}
                    {(block.content.alignment === "left" ||
                      block.content.alignment === "right") && (
                      <div className="clear-both"></div>
                    )}

                    <input
                      type="text"
                      value={block.content.alt}
                      onChange={(e) =>
                        updateBlock(block.id, {
                          ...block.content,
                          alt: e.target.value,
                        })
                      }
                      placeholder="Tekst alternatywny (ALT)"
                      className="w-full px-3 py-2 text-sm border rounded"
                    />
                    <input
                      type="text"
                      value={block.content.caption}
                      onChange={(e) =>
                        updateBlock(block.id, {
                          ...block.content,
                          caption: e.target.value,
                        })
                      }
                      placeholder="Podpis obrazu (opcjonalny)"
                      className="w-full px-3 py-2 text-sm border rounded"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateBlock(block.id, {
                          url: "",
                          alt: "",
                          caption: "",
                          alignment: "full",
                          width: "100%",
                        })
                      }
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Usuń obraz
                    </button>
                  </div>
                ) : (
                  <ImageUpload
                    onImageUploaded={(url) =>
                      updateBlock(block.id, {
                        ...block.content,
                        url,
                        alignment: "full",
                        width: "100%",
                      })
                    }
                    folder="content"
                  />
                )}
              </div>
            )}

            {/* Label typu bloku */}
            {block.type !== "page_break" && (
              <div className="text-xs text-gray-500 mb-2 font-medium uppercase">
                {block.type === "h2" && "Nagłówek H2"}
                {block.type === "h3" && "Nagłówek H3"}
                {block.type === "h4" && "Nagłówek H4"}
                {block.type === "paragraph" && "Akapit"}
                {block.type === "list" && "Lista"}
                {block.type === "quote" && "Cytat"}
              </div>
            )}

            {/* Pole edycji */}
            {block.type === "h2" && (
              <input
                type="text"
                value={block.content}
                onChange={(e) => updateBlock(block.id, e.target.value)}
                placeholder="Wpisz nagłówek H2..."
                className="w-full px-4 py-2 text-2xl font-bold border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
            {block.type === "h3" && (
              <input
                type="text"
                value={block.content}
                onChange={(e) => updateBlock(block.id, e.target.value)}
                placeholder="Wpisz nagłówek H3..."
                className="w-full px-4 py-2 text-xl font-bold border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
            {block.type === "h4" && (
              <input
                type="text"
                value={block.content}
                onChange={(e) => updateBlock(block.id, e.target.value)}
                placeholder="Wpisz nagłówek H4..."
                className="w-full px-4 py-2 text-lg font-semibold border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}

            {block.type === "list" && (
              <textarea
                value={block.content}
                onChange={(e) => updateBlock(block.id, e.target.value)}
                placeholder="Wpisz elementy listy (każdy w nowej linii)..."
                rows={6}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
              />
            )}
            {block.type === "quote" && (
              <textarea
                value={block.content}
                onChange={(e) => updateBlock(block.id, e.target.value)}
                placeholder="Wpisz cytat..."
                rows={4}
                className="w-full px-4 py-2 border rounded-lg bg-blue-50 italic focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
              />
            )}
          </div>
        ))}
      </div>

      {blocks.length === 0 && (
        <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-lg bg-gray-50">
          <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p className="font-medium mb-1">Dodaj pierwszy blok treści</p>
          <p className="text-sm">Użyj przycisków powyżej aby zacząć pisać</p>
        </div>
      )}
    </div>
  );
};

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
    birthYear: "",
    deathYear: "",
    imageUrl: "",
    imageAlignment: "full",
    imageWidth: "100%",
  });

  const [pageForm, setPageForm] = useState({
    title: "",
    customSlug: "",
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

  // ✅ NOWA FUNKCJA: Otwórz modal edycji huba
  const openHubEditModal = (hub: Hub) => {
    setSelectedHub(hub);
    setHubForm({
      title: hub.title,
      type: hub.type as any,
      description: hub.description || "",
      author: hub.author || "",
      epoch: hub.epoch || "",
      year: hub.year?.toString() || "",
      birthYear: hub.birthYear?.toString() || "",
      deathYear: hub.deathYear?.toString() || "",
      imageUrl: hub.imageUrl || "",
      imageAlignment: hub.imageAlignment || "full",
      imageWidth: hub.imageWidth || "100%",
    });
    setShowHubModal(true);
  };

  const handleSaveHub = async () => {
    try {
      const dataToSend = {
        ...hubForm,
        year: hubForm.year ? parseInt(hubForm.year) : null,
        birthYear: hubForm.birthYear ? parseInt(hubForm.birthYear) : null,
        deathYear: hubForm.deathYear ? parseInt(hubForm.deathYear) : null,
      };

      if (selectedHub) {
        await contentService.updateHub(selectedHub.id, dataToSend);
      } else {
        await contentService.createHub(dataToSend);
      }

      setShowHubModal(false);
      resetHubForm();

      // Odśwież listę lub widok szczegółów
      if (view === "hub-detail" && selectedHub) {
        loadHubDetail(selectedHub.slug);
      } else {
        loadHubs();
      }
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
      birthYear: "",
      deathYear: "",
      imageUrl: "",
      imageAlignment: "full",
      imageWidth: "100%",
    });
    setSelectedHub(null);
  };

  const handleSavePage = async () => {
    if (!selectedHub) return;

    try {
      const pageData = {
        title: pageForm.title,
        slug: pageForm.customSlug,
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
      loadHubDetail(selectedHub.slug);
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

  // VIEW 1: Lista HUB-ów
  if (view === "hubs") {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
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
                      {/* ✅ ZMIENIONY: Teraz otwiera modal edycji */}
                      <button
                        onClick={() => openHubEditModal(hub)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edytuj hub"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => loadHubDetail(hub.slug)}
                        className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                        title="Zarządzaj stronami"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteHub(hub.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Usuń hub"
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

                {hubForm.type === "AUTHOR" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Rok urodzenia
                      </label>
                      <input
                        type="number"
                        value={hubForm.birthYear}
                        onChange={(e) =>
                          setHubForm({ ...hubForm, birthYear: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Rok śmierci
                      </label>
                      <input
                        type="number"
                        value={hubForm.deathYear}
                        onChange={(e) =>
                          setHubForm({ ...hubForm, deathYear: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded"
                      />
                    </div>
                  </>
                )}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Zdjęcie główne (opcjonalne)
                  </label>

                  {hubForm.imageUrl ? (
                    <div className="space-y-3">
                      <div className="flex gap-4 p-3 bg-gray-50 rounded border">
                        <div className="flex-1">
                          <label className="block text-xs font-medium mb-1">
                            Wyrównanie
                          </label>
                          <select
                            value={hubForm.imageAlignment || "full"}
                            onChange={(e) =>
                              setHubForm({
                                ...hubForm,
                                imageAlignment: e.target.value,
                              })
                            }
                            className="w-full px-2 py-1 text-sm border rounded"
                          >
                            <option value="full">Pełna szerokość</option>
                            <option value="left">
                              Z lewej (tekst z prawej)
                            </option>
                            <option value="right">
                              Z prawej (tekst z lewej)
                            </option>
                            <option value="center">Wyśrodkowane</option>
                          </select>
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-medium mb-1">
                            Szerokość
                          </label>
                          <select
                            value={hubForm.imageWidth || "100%"}
                            onChange={(e) =>
                              setHubForm({
                                ...hubForm,
                                imageWidth: e.target.value,
                              })
                            }
                            className="w-full px-2 py-1 text-sm border rounded"
                          >
                            <option value="100%">100%</option>
                            <option value="50%">50%</option>
                            <option value="300px">300px</option>
                            <option value="500px">500px</option>
                          </select>
                        </div>
                      </div>
                      <div
                        className={`${
                          hubForm.imageAlignment === "left"
                            ? "float-left mr-4"
                            : ""
                        }${
                          hubForm.imageAlignment === "right"
                            ? "float-right ml-4"
                            : ""
                        }${
                          hubForm.imageAlignment === "center" ? "mx-auto" : ""
                        }`}
                        style={{
                          width: hubForm.imageWidth || "100%",
                          maxWidth: "100%",
                        }}
                      >
                        <img
                          src={hubForm.imageUrl}
                          alt="Hub"
                          className="w-full rounded-lg border"
                        />
                      </div>
                      {(hubForm.imageAlignment === "left" ||
                        hubForm.imageAlignment === "right") && (
                        <div className="clear-both"></div>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setHubForm({
                            ...hubForm,
                            imageUrl: "",
                            imageAlignment: "full",
                            imageWidth: "100%",
                          })
                        }
                        className="text-sm text-red-600"
                      >
                        Usuń zdjęcie
                      </button>
                    </div>
                  ) : (
                    <ImageUpload
                      onImageUploaded={(url) =>
                        setHubForm({
                          ...hubForm,
                          imageUrl: url,
                          imageAlignment: "full",
                          imageWidth: "100%",
                        })
                      }
                      folder="hubs"
                    />
                  )}
                </div>
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
                  onClick={() => {
                    setShowHubModal(false);
                    resetHubForm();
                  }}
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
              <div className="flex gap-2">
                {/* ✅ NOWY PRZYCISK: Edytuj hub */}
                <button
                  onClick={() => openHubEditModal(selectedHub)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edytuj hub
                </button>
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
          </div>

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

        {/* MODAL: Tworzenie/Edycja strony - WIĘKSZY MODAL! */}
        {showPageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto pt-8">
            <div className="bg-white rounded-lg max-w-6xl w-full mb-8 p-6">
              <h2 className="text-xl font-bold mb-4">
                {selectedPage ? "Edytuj stronę" : "Nowa strona"}
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                      Czas czytania (minuty)
                    </label>
                    <input
                      type="number"
                      value={pageForm.readingTime}
                      onChange={(e) =>
                        setPageForm({
                          ...pageForm,
                          readingTime: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
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

              <div className="flex gap-4 mt-6 sticky bottom-0 bg-white pt-4 border-t">
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

        {/* MODAL: Edycja huba - DODANY */}
        {showHubModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <h2 className="text-xl font-bold mb-4">Edytuj Hub</h2>

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

                {hubForm.type === "AUTHOR" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Rok urodzenia
                      </label>
                      <input
                        type="number"
                        value={hubForm.birthYear}
                        onChange={(e) =>
                          setHubForm({ ...hubForm, birthYear: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Rok śmierci
                      </label>
                      <input
                        type="number"
                        value={hubForm.deathYear}
                        onChange={(e) =>
                          setHubForm({ ...hubForm, deathYear: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded"
                      />
                    </div>
                  </>
                )}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Zdjęcie główne (opcjonalne)
                  </label>

                  {hubForm.imageUrl ? (
                    <div className="space-y-3">
                      <div className="flex gap-4 p-3 bg-gray-50 rounded border">
                        <div className="flex-1">
                          <label className="block text-xs font-medium mb-1">
                            Wyrównanie
                          </label>
                          <select
                            value={hubForm.imageAlignment || "full"}
                            onChange={(e) =>
                              setHubForm({
                                ...hubForm,
                                imageAlignment: e.target.value,
                              })
                            }
                            className="w-full px-2 py-1 text-sm border rounded"
                          >
                            <option value="full">Pełna szerokość</option>
                            <option value="left">
                              Z lewej (tekst z prawej)
                            </option>
                            <option value="right">
                              Z prawej (tekst z lewej)
                            </option>
                            <option value="center">Wyśrodkowane</option>
                          </select>
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-medium mb-1">
                            Szerokość
                          </label>
                          <select
                            value={hubForm.imageWidth || "100%"}
                            onChange={(e) =>
                              setHubForm({
                                ...hubForm,
                                imageWidth: e.target.value,
                              })
                            }
                            className="w-full px-2 py-1 text-sm border rounded"
                          >
                            <option value="100%">100%</option>
                            <option value="50%">50%</option>
                            <option value="300px">300px</option>
                            <option value="500px">500px</option>
                          </select>
                        </div>
                      </div>
                      <div
                        className={`${
                          hubForm.imageAlignment === "left"
                            ? "float-left mr-4"
                            : ""
                        }${
                          hubForm.imageAlignment === "right"
                            ? "float-right ml-4"
                            : ""
                        }${
                          hubForm.imageAlignment === "center" ? "mx-auto" : ""
                        }`}
                        style={{
                          width: hubForm.imageWidth || "100%",
                          maxWidth: "100%",
                        }}
                      >
                        <img
                          src={hubForm.imageUrl}
                          alt="Hub"
                          className="w-full rounded-lg border"
                        />
                      </div>
                      {(hubForm.imageAlignment === "left" ||
                        hubForm.imageAlignment === "right") && (
                        <div className="clear-both"></div>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setHubForm({
                            ...hubForm,
                            imageUrl: "",
                            imageAlignment: "full",
                            imageWidth: "100%",
                          })
                        }
                        className="text-sm text-red-600"
                      >
                        Usuń zdjęcie
                      </button>
                    </div>
                  ) : (
                    <ImageUpload
                      onImageUploaded={(url) =>
                        setHubForm({
                          ...hubForm,
                          imageUrl: url,
                          imageAlignment: "full",
                          imageWidth: "100%",
                        })
                      }
                      folder="hubs"
                    />
                  )}
                </div>
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
                  onClick={() => {
                    setShowHubModal(false);
                    resetHubForm();
                  }}
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

  return null;
}

// frontend/src/features/admin/ContentManager.tsx

import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Download,
  Edit,
  ExternalLink,
  FileText,
  GraduationCap,
  GripVertical,
  ImageIcon,
  Lightbulb,
  Plus,
  Scissors,
  Settings,
  Star,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ImageUpload } from "../../components/ImageUpload";
import { contentService } from "../../services/contentService";
import { RatingsManager } from "./RatingsManager";

interface Hub {
  id: string;
  slug: string;
  title: string;
  type: "LITERARY_WORK" | "EPOCH" | "AUTHOR" | "THEME" | "GUIDE" | "EXAM_SHEET";
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
  metaTitle: string;
  metaDescription: string;
}

interface ContentPage {
  id: string;
  slug: string;
  title: string;
  content: any;
  order: number;
  readingTime?: number;
  metaTitle: string;
  metaDescription: string;
}

// ✅ ZAKTUALIZOWANE - dodany typ GUIDE
const HUB_TYPES = [
  { value: "LITERARY_WORK", label: "Lektura", icon: BookOpen },
  { value: "EPOCH", label: "Epoka", icon: Calendar },
  { value: "AUTHOR", label: "Autor/Twórca", icon: User },
  { value: "THEME", label: "Motyw literacki", icon: Lightbulb },
  { value: "GUIDE", label: "Poradnik maturalny", icon: GraduationCap },
  { value: "EXAM_SHEET", label: "Arkusz maturalny", icon: FileText },
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
// HELPER - Generuj URL na podstawie typu huba
// ==========================================
function getHubUrl(hub: { type: string; slug: string }) {
  switch (hub.type) {
    case "GUIDE":
      return `/poradnik/${hub.slug}`;
    case "EXAM_SHEET":
      return `/arkusze/${hub.slug}`;
    default:
      return `/baza-wiedzy/${hub.slug}`;
  }
}

// ==========================================
// RICH TEXT EDITOR
// ==========================================

const RichTextEditor = ({ content, onChange }: any) => {
  const blockRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
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
      } else if (e.key === "k" || e.key === "K") {
        e.preventDefault();
        const newText = `[${selectedText}](https://)`;
        const before = textarea.value.substring(0, start);
        const after = textarea.value.substring(end);
        updateBlock(blockId, before + newText + after);

        setTimeout(() => {
          const newCursorPos = start + selectedText.length + 3;
          textarea.setSelectionRange(newCursorPos, newCursorPos + 8);
          textarea.focus();
        }, 0);
      }
    }
  };

  const addBlock = (type: string) => {
    const newBlock = {
      id: Date.now().toString(),
      type: type === "link_template" ? "paragraph" : type,
      content:
        type === "image"
          ? { url: "", alt: "", caption: "" }
          : type === "volume_break"
          ? { volumeTitle: "Tom 1" }
          : type === "link_template"
          ? "[tekst linku](https://example.com)"
          : "",
    };
    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    onChange({ blocks: newBlocks });

    setTimeout(() => {
      const newBlockElement = blockRefs.current[newBlock.id];
      if (newBlockElement) {
        newBlockElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
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

  const moveBlockToStart = (index: number) => {
    if (index === 0) return;
    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(index, 1);
    newBlocks.unshift(movedBlock);
    setBlocks(newBlocks);
    onChange({ blocks: newBlocks });
  };

  const moveBlockToEnd = (index: number) => {
    if (index === blocks.length - 1) return;
    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(index, 1);
    newBlocks.push(movedBlock);
    setBlocks(newBlocks);
    onChange({ blocks: newBlocks });
  };

  return (
    <div className="space-y-4">
      {/* Toolbar z przyciskami */}
      <div className="sticky top-0 z-10 flex flex-wrap gap-2 p-0 bg-gray-50 rounded-lg border shadow-sm">
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
          onClick={() => addBlock("link_template")}
          className="px-3 py-1.5 bg-indigo-500 text-white border rounded hover:bg-indigo-600 flex items-center gap-1"
          title="Wstaw szablon linku"
        >
          🔗 Link
        </button>
        <button
          type="button"
          onClick={() => addBlock("html")}
          className="px-3 py-1.5 bg-red-500 text-white border rounded hover:bg-red-600 flex items-center gap-1"
          title="Wstaw kod HTML"
        >
          &lt;/&gt; HTML
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
        <button
          type="button"
          onClick={() => addBlock("volume_break")}
          className="px-3 py-1.5 bg-purple-500 text-white border rounded hover:bg-purple-600 flex items-center gap-1"
          title="Dodaj oznaczenie tomu (Tom 1, Tom 2, etc.)"
        >
          <BookOpen className="w-4 h-4" />
          Tom
        </button>
      </div>

      {/* Bloki treści */}
      <div className="space-y-3">
        {blocks.map((block: any, index: number) => (
          <div
            key={block.id}
            ref={(el) => (blockRefs.current[block.id] = el)}
            className="relative group border rounded-lg p-3 bg-white"
          >
            {/* Kontrolki przesuwania */}
            <div className="absolute -left-2 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => moveBlockToStart(index)}
                disabled={index === 0}
                className="p-1 bg-white border rounded shadow-sm hover:bg-blue-50 disabled:opacity-30 text-xs font-bold"
                title="Przesuń na początek"
              >
                ⇈
              </button>
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
              <button
                type="button"
                onClick={() => moveBlockToEnd(index)}
                disabled={index === blocks.length - 1}
                className="p-1 bg-white border rounded shadow-sm hover:bg-blue-50 disabled:opacity-30 text-xs font-bold"
                title="Przesuń na koniec"
              >
                ⇊
              </button>
            </div>
            {block.type === "paragraph" && (
              <textarea
                ref={(el) => (textareaRefs.current[block.id] = el)}
                value={block.content}
                onChange={(e) => updateBlock(block.id, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, block.id)}
                placeholder="**pogrubienie** *pochylenie* [link](url)"
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

            {/* VOLUME BREAK */}
            {block.type === "volume_break" && (
              <div className="flex items-center justify-center py-4 border-2 border-dashed border-purple-400 bg-purple-50 rounded">
                <BookOpen className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-medium text-purple-700 mr-3">TOM:</span>
                <input
                  type="text"
                  value={block.content.volumeTitle || ""}
                  onChange={(e) =>
                    updateBlock(block.id, {
                      ...block.content,
                      volumeTitle: e.target.value,
                    })
                  }
                  placeholder="np. Tom 1"
                  className="px-3 py-1 text-sm border rounded w-40"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            {block.type === "image" && (
              <div className="space-y-3">
                <div className="text-xs text-gray-500 mb-2 font-medium uppercase">
                  Obraz
                </div>

                {block.content.url ? (
                  <div className="space-y-3">
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
            {block.type !== "page_break" && block.type !== "volume_break" && (
              <div className="text-xs text-gray-500 mb-2 font-medium uppercase">
                {block.type === "h2" && "Nagłówek H2"}
                {block.type === "h3" && "Nagłówek H3"}
                {block.type === "h4" && "Nagłówek H4"}
                {block.type === "paragraph" && "Akapit"}
                {block.type === "list" && "Lista"}
                {block.type === "quote" && "Cytat"}
                {block.type === "html" && "⚠️ Kod HTML"}
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
            {block.type === "html" && (
              <div className="space-y-2">
                <textarea
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, e.target.value)}
                  placeholder="<div>Twój kod HTML...</div>"
                  rows={8}
                  className="w-full px-4 py-2 border rounded-lg bg-blue-20 text-green-800 font-mono text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-y"
                />
                {block.content && (
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="text-xs text-gray-500 mb-2 font-semibold">
                      PODGLĄD:
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: block.content }} />
                  </div>
                )}
              </div>
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

// ==========================================
// EXAM SHEET EDITOR - Edytor arkuszy maturalnych
// ==========================================

interface ExamSheetPdf {
  id: string;
  title: string;
  url: string;
  type: "main" | "answers" | "formula_2015" | "other";
  fileSize?: string;
}

interface ExamSheetMetadata {
  level?: string;
  month?: string;
  formula?: string;
}

interface ExamSheetContent {
  metadata: ExamSheetMetadata;
  pdfs: ExamSheetPdf[];
  blocks: any[];
}

const PDF_TYPES = [
  { value: "main", label: "Arkusz główny", color: "bg-blue-100 text-blue-700" },
  {
    value: "answers",
    label: "Odpowiedzi / Klucz",
    color: "bg-green-100 text-green-700",
  },
  {
    value: "formula_2015",
    label: "Formuła 2015",
    color: "bg-yellow-100 text-yellow-700",
  },
  { value: "other", label: "Inne", color: "bg-gray-100 text-gray-700" },
];

const EXAM_LEVELS = [
  { value: "PODSTAWOWY", label: "Poziom podstawowy" },
  { value: "ROZSZERZONY", label: "Poziom rozszerzony" },
];

const EXAM_MONTHS = [
  { value: "maj", label: "Maj" },
  { value: "czerwiec", label: "Czerwiec" },
  { value: "styczeń", label: "Styczeń (poprawkowa)" },
  { value: "sierpień", label: "Sierpień (poprawkowa)" },
];

const ExamSheetEditor = ({
  content,
  onChange,
}: {
  content: ExamSheetContent;
  onChange: (content: ExamSheetContent) => void;
}) => {
  const [metadata, setMetadata] = useState<ExamSheetMetadata>(
    content.metadata || { level: "PODSTAWOWY", month: "maj", formula: "2023" }
  );
  const [pdfs, setPdfs] = useState<ExamSheetPdf[]>(content.pdfs || []);
  const [newPdf, setNewPdf] = useState<Partial<ExamSheetPdf>>({
    title: "",
    url: "",
    type: "main",
    fileSize: "",
  });

  // Sync z parent
  useEffect(() => {
    onChange({ metadata, pdfs, blocks: content.blocks || [] });
  }, [metadata, pdfs]);

  const addPdf = () => {
    if (!newPdf.title || !newPdf.url) {
      alert("Podaj tytuł i URL pliku PDF");
      return;
    }

    const pdf: ExamSheetPdf = {
      id: Date.now().toString(),
      title: newPdf.title!,
      url: newPdf.url!,
      type: (newPdf.type as any) || "main",
      fileSize: newPdf.fileSize || undefined,
    };

    setPdfs([...pdfs, pdf]);
    setNewPdf({ title: "", url: "", type: "main", fileSize: "" });
  };

  const removePdf = (id: string) => {
    setPdfs(pdfs.filter((p) => p.id !== id));
  };

  const updatePdf = (id: string, updates: Partial<ExamSheetPdf>) => {
    setPdfs(pdfs.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const movePdfUp = (index: number) => {
    if (index === 0) return;
    const newPdfs = [...pdfs];
    [newPdfs[index - 1], newPdfs[index]] = [newPdfs[index], newPdfs[index - 1]];
    setPdfs(newPdfs);
  };

  const movePdfDown = (index: number) => {
    if (index === pdfs.length - 1) return;
    const newPdfs = [...pdfs];
    [newPdfs[index], newPdfs[index + 1]] = [newPdfs[index + 1], newPdfs[index]];
    setPdfs(newPdfs);
  };

  return (
    <div className="space-y-6">
      {/* Metadata */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h3 className="font-semibold text-orange-800 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Informacje o arkuszu
        </h3>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Poziom</label>
            <select
              value={metadata.level || ""}
              onChange={(e) =>
                setMetadata({ ...metadata, level: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">-- Wybierz --</option>
              {EXAM_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Miesiąc</label>
            <select
              value={metadata.month || ""}
              onChange={(e) =>
                setMetadata({ ...metadata, month: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">-- Wybierz --</option>
              {EXAM_MONTHS.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Formuła</label>
            <select
              value={metadata.formula || ""}
              onChange={(e) =>
                setMetadata({ ...metadata, formula: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">-- Wybierz --</option>
              <option value="2023">Formuła 2023</option>
              <option value="2015">Formuła 2015</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista PDFów */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Pliki PDF ({pdfs.length})
        </h3>

        {pdfs.length > 0 ? (
          <div className="space-y-3 mb-6">
            {pdfs.map((pdf, index) => (
              <div
                key={pdf.id}
                className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50 group"
              >
                {/* Kontrolki kolejności */}
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => movePdfUp(index)}
                    disabled={index === 0}
                    className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => movePdfDown(index)}
                    disabled={index === pdfs.length - 1}
                    className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                  >
                    ▼
                  </button>
                </div>

                {/* Ikona typu */}
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>

                {/* Edycja */}
                <div className="flex-1 grid grid-cols-4 gap-2">
                  <input
                    type="text"
                    value={pdf.title}
                    onChange={(e) =>
                      updatePdf(pdf.id, { title: e.target.value })
                    }
                    className="col-span-2 px-2 py-1 text-sm border rounded"
                    placeholder="Tytuł"
                  />
                  <select
                    value={pdf.type}
                    onChange={(e) =>
                      updatePdf(pdf.id, { type: e.target.value as any })
                    }
                    className="px-2 py-1 text-sm border rounded"
                  >
                    {PDF_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={pdf.fileSize || ""}
                    onChange={(e) =>
                      updatePdf(pdf.id, { fileSize: e.target.value })
                    }
                    className="px-2 py-1 text-sm border rounded"
                    placeholder="Rozmiar (np. 2.4 MB)"
                  />
                </div>

                {/* URL */}
                <input
                  type="text"
                  value={pdf.url}
                  onChange={(e) => updatePdf(pdf.id, { url: e.target.value })}
                  className="flex-1 px-2 py-1 text-sm border rounded font-mono text-xs"
                  placeholder="https://s3.amazonaws.com/..."
                />

                {/* Link do podglądu */}

                <a
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  title="Otwórz PDF"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Usuń */}
                <button
                  type="button"
                  onClick={() => removePdf(pdf.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg mb-6">
            <FileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p>Brak plików PDF. Dodaj pierwszy poniżej.</p>
          </div>
        )}

        {/* Formularz dodawania */}
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-700 mb-3">Dodaj nowy PDF</h4>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={newPdf.title}
              onChange={(e) => setNewPdf({ ...newPdf, title: e.target.value })}
              className="px-3 py-2 border rounded-lg"
              placeholder="Tytuł (np. Matura polski – maj 2024 – podstawowy)"
            />
            <input
              type="text"
              value={newPdf.url}
              onChange={(e) => setNewPdf({ ...newPdf, url: e.target.value })}
              className="px-3 py-2 border rounded-lg font-mono text-sm"
              placeholder="URL do PDF na S3 (https://...)"
            />
            <select
              value={newPdf.type}
              onChange={(e) =>
                setNewPdf({ ...newPdf, type: e.target.value as any })
              }
              className="px-3 py-2 border rounded-lg"
            >
              {PDF_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <input
                type="text"
                value={newPdf.fileSize}
                onChange={(e) =>
                  setNewPdf({ ...newPdf, fileSize: e.target.value })
                }
                className="flex-1 px-3 py-2 border rounded-lg"
                placeholder="Rozmiar (opcjonalnie)"
              />
              <button
                type="button"
                onClick={addPdf}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Dodaj
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Podpowiedź */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <strong>💡 Wskazówka:</strong> Najpierw prześlij pliki PDF na S3, a
        potem wklej tutaj ich URL-e. Typowa struktura:
        <code className="block mt-2 bg-blue-100 px-2 py-1 rounded text-xs">
          https://twoj-bucket.s3.eu-central-1.amazonaws.com/arkusze/matura-2024-podstawowy.pdf
        </code>
      </div>
    </div>
  );
};

export default function ContentManager() {
  const [view, setView] = useState<"hubs" | "hub-detail" | "page-editor">(
    "hubs"
  );
  const [showRatingsModal, setShowRatingsModal] = useState(false);
  const [selectedPageForRatings, setSelectedPageForRatings] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [selectedHub, setSelectedHub] = useState<Hub | null>(null);
  const [selectedPage, setSelectedPage] = useState<ContentPage | null>(null);
  const [, setLoading] = useState(false);
  const [filterType, setFilterType] = useState<string>("all"); // ✅ NOWE - filtr typu

  // Form states
  const [hubForm, setHubForm] = useState({
    title: "",
    customSlug: "",
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
    metaTitle: "",
    metaDescription: "",
  });

  const [pageForm, setPageForm] = useState<{
    title: string;
    customSlug: string;
    content: any; // ✅ Elastyczny typ dla różnych edytorów
    readingTime: string;
    metaTitle: string;
    metaDescription: string;
  }>({
    title: "",
    customSlug: "",
    content: { blocks: [] },
    readingTime: "",
    metaTitle: "",
    metaDescription: "",
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

  const openHubEditModal = (hub: Hub) => {
    setSelectedHub(hub);
    setHubForm({
      title: hub.title,
      customSlug: hub.slug || "",
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
      metaTitle: hub.metaTitle || "",
      metaDescription: hub.metaDescription || "",
    });
    setShowHubModal(true);
  };

  const handleSaveHub = async () => {
    try {
      const dataToSend = {
        ...hubForm,
        slug: hubForm.customSlug || undefined,
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
      customSlug: "",
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
      metaTitle: "",
      metaDescription: "",
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
        metaTitle: pageForm.metaTitle || null,
        metaDescription: pageForm.metaDescription || null,
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
      metaTitle: "",
      metaDescription: "",
    });
    setSelectedPage(null);
  };

  // ✅ FILTROWANIE HUBÓW
  const filteredHubs =
    filterType === "all" ? hubs : hubs.filter((hub) => hub.type === filterType);

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
                  Lektury, epoki, autorzy, poradniki - dodaj i zarządzaj treścią
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

            {/* ✅ NOWE - Filtry typu */}
            <div className="mt-4 flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterType("all")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterType === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Wszystkie ({hubs.length})
              </button>
              {HUB_TYPES.map((type) => {
                const count = hubs.filter((h) => h.type === type.value).length;
                return (
                  <button
                    key={type.value}
                    onClick={() => setFilterType(type.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      filterType === type.value
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <type.icon className="w-4 h-4" />
                    {type.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHubs.map((hub) => {
              const Icon =
                HUB_TYPES.find((t) => t.value === hub.type)?.icon || BookOpen;

              return (
                <div
                  key={hub.id}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`p-2 rounded-lg ${
                        hub.type === "GUIDE" ? "bg-green-100" : "bg-blue-100"
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 ${
                          hub.type === "GUIDE"
                            ? "text-green-600"
                            : "text-blue-600"
                        }`}
                      />
                    </div>
                    <div className="flex gap-2">
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

                  <div className="mb-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        hub.type === "GUIDE"
                          ? "bg-green-100 text-green-700"
                          : hub.type === "EXAM_SHEET"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {HUB_TYPES.find((t) => t.value === hub.type)?.label ||
                        hub.type}
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg mb-1">{hub.title}</h3>
                  {hub.author && (
                    <p className="text-sm text-gray-600 mb-2">{hub.author}</p>
                  )}

                  {/* Pokaż URL */}
                  <p className="text-xs text-gray-400 mb-2">
                    <code>{getHubUrl(hub)}</code>
                  </p>

                  <div className="text-sm text-gray-500 mt-4">
                    {hub.type === "EXAM_SHEET" ? (
                      <span className="text-orange-600">
                        {(hub.pages?.[0]?.content as any)?.pdfs?.length || 0}{" "}
                        plików PDF
                      </span>
                    ) : (
                      <span>{hub.pages?.length || 0} stron(y)</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredHubs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600">
                Brak hubów tego typu. Dodaj pierwszy!
              </p>
            </div>
          )}
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
                    placeholder="np. Lalka, Romantyzm, Adam Mickiewicz, Jak zdać maturę"
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

                {/* ✅ NOWE - Pole slug dla wszystkich typów */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    URL (slug) - opcjonalnie własny
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">
                      /
                      {hubForm.type === "GUIDE"
                        ? "poradnik"
                        : hubForm.type === "EXAM_SHEET"
                        ? "arkusze"
                        : "baza-wiedzy"}
                      /
                    </span>
                    <input
                      type="text"
                      value={hubForm.customSlug}
                      onChange={(e) =>
                        setHubForm({ ...hubForm, customSlug: e.target.value })
                      }
                      className="flex-1 px-4 py-2 border rounded"
                      placeholder="zostaw puste = automatyczny z tytułu"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Wpisz własny slug lub zostaw puste. Używaj tylko małych
                    liter, cyfr i myślników.
                  </p>
                </div>

                {/* ✅ NOWE - Pola dla typu GUIDE */}
                {hubForm.type === "GUIDE" && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700 mb-2">
                      <GraduationCap className="w-4 h-4 inline mr-1" />
                      <strong>Poradnik maturalny</strong> - artykuły o egzaminie
                      maturalnym, techniki pisania, porady dla uczniów.
                    </p>
                    <p className="text-xs text-green-600">
                      URL: /poradnik/
                      {hubForm.title
                        ? hubForm.title.toLowerCase().replace(/\s+/g, "-")
                        : "slug"}
                    </p>
                  </div>
                )}

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

                {hubForm.type === "THEME" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Epoka (opcjonalnie)
                      </label>
                      <select
                        value={hubForm.epoch}
                        onChange={(e) =>
                          setHubForm({ ...hubForm, epoch: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded"
                      >
                        <option value="">-- Wszystkie epoki --</option>
                        {EPOCHS.map((e) => (
                          <option key={e.value} value={e.value}>
                            {e.label}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        Możesz przypisać motyw do konkretnej epoki lub zostawić
                        ogólnym
                      </p>
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
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3 text-gray-700">
                    SEO (opcjonalne)
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Meta Title
                        <span className="text-xs text-gray-500 ml-2">
                          (max 60 znaków)
                        </span>
                      </label>
                      <input
                        type="text"
                        value={hubForm.metaTitle}
                        onChange={(e) =>
                          setHubForm({ ...hubForm, metaTitle: e.target.value })
                        }
                        maxLength={60}
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Tytuł dla Google (zostaw puste = użyje tytułu)"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {hubForm.metaTitle.length}/60 znaków
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Meta Description
                        <span className="text-xs text-gray-500 ml-2">
                          (max 160 znaków)
                        </span>
                      </label>
                      <textarea
                        value={hubForm.metaDescription}
                        onChange={(e) =>
                          setHubForm({
                            ...hubForm,
                            metaDescription: e.target.value,
                          })
                        }
                        maxLength={160}
                        rows={3}
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Opis dla Google (zostaw puste = użyje opisu)"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {hubForm.metaDescription.length}/160 znaków
                      </p>
                    </div>
                  </div>
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
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedHub.type === "GUIDE"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {HUB_TYPES.find((t) => t.value === selectedHub.type)
                      ?.label || selectedHub.type}
                  </span>
                </div>
                <h1 className="text-2xl font-bold">{selectedHub.title}</h1>
                {selectedHub.author && (
                  <p className="text-gray-600 mt-1">{selectedHub.author}</p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  URL:{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    {getHubUrl(selectedHub)}
                  </code>
                </p>
              </div>
              <div className="flex gap-2">
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
                  Dodaj {selectedHub.type === "GUIDE" ? "artykuł" : "stronę"}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">
              {selectedHub.type === "GUIDE"
                ? "Artykuły poradnika"
                : "Strony tego HUB-a"}
            </h2>

            {!selectedHub.pages || selectedHub.pages.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>
                  Brak {selectedHub.type === "GUIDE" ? "artykułów" : "stron"}.
                  Dodaj{" "}
                  {selectedHub.type === "GUIDE"
                    ? "pierwszy artykuł"
                    : "pierwszą stronę"}
                  !
                </p>
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
                            {selectedHub.type === "GUIDE"
                              ? `/poradnik/${page.slug}`
                              : selectedHub.type === "EXAM_SHEET"
                              ? `/arkusze/${selectedHub.slug}`
                              : `/baza-wiedzy/${selectedHub.slug}/${page.slug}`}
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
                            metaTitle: page.metaTitle || "",
                            metaDescription: page.metaDescription || "",
                          });
                          setShowPageModal(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedPageForRatings({
                            id: page.id,
                            title: page.title,
                          });
                          setShowRatingsModal(true);
                        }}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded"
                        title="Zarządzaj ocenami"
                      >
                        <Star className="w-4 h-4" />
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto pt-8">
            <div className="bg-white rounded-lg max-w-6xl w-full mb-8 flex flex-col max-h-[90vh]">
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Tytuł{" "}
                        {selectedHub.type === "GUIDE" ? "artykułu" : "strony"}
                      </label>
                      <input
                        type="text"
                        value={pageForm.title}
                        onChange={(e) =>
                          setPageForm({ ...pageForm, title: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded"
                        placeholder={
                          selectedHub.type === "GUIDE"
                            ? "np. Jak napisać rozprawkę na maturze"
                            : "np. Streszczenie szczegółowe"
                        }
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
                      <span className="text-gray-500">
                        {selectedHub.type === "GUIDE"
                          ? "/poradnik/"
                          : selectedHub.type === "EXAM_SHEET"
                          ? `/arkusze/${selectedHub.slug}/`
                          : `/baza-wiedzy/${selectedHub.slug}/`}
                      </span>

                      <input
                        type="text"
                        value={pageForm.customSlug}
                        onChange={(e) =>
                          setPageForm({
                            ...pageForm,
                            customSlug: e.target.value,
                          })
                        }
                        className="flex-1 px-4 py-2 border rounded"
                        placeholder={
                          selectedHub.type === "GUIDE"
                            ? "np. jak-napisac-rozprawke"
                            : "np. streszczenie-szczegolowe"
                        }
                      />
                    </div>
                    {selectedHub.type === "GUIDE" ? (
                      <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                        ⚠️ <strong>Uwaga:</strong> Dla poradników slug musi być
                        unikalny globalnie!
                        <br />
                        Pełny URL:{" "}
                        <code className="bg-yellow-100 px-1 rounded">
                          /poradnik/{pageForm.customSlug || "slug-artykulu"}
                        </code>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 mt-1">
                        Pełny URL: /baza-wiedzy/{selectedHub.slug}/
                        {pageForm.customSlug}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Treść
                    </label>
                    {/* ✅ Specjalny edytor dla EXAM_SHEET */}
                    {selectedHub?.type === "EXAM_SHEET" ? (
                      <ExamSheetEditor
                        content={pageForm.content as ExamSheetContent}
                        onChange={(content) =>
                          setPageForm({ ...pageForm, content: content as any })
                        }
                      />
                    ) : (
                      <RichTextEditor
                        content={pageForm.content}
                        onChange={(content: any) =>
                          setPageForm({ ...pageForm, content })
                        }
                      />
                    )}
                  </div>
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-3 text-gray-700">
                      SEO (opcjonalne)
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Meta Title
                          <span className="text-xs text-gray-500 ml-2">
                            (max 60 znaków)
                          </span>
                        </label>
                        <input
                          type="text"
                          value={pageForm.metaTitle}
                          onChange={(e) =>
                            setPageForm({
                              ...pageForm,
                              metaTitle: e.target.value,
                            })
                          }
                          maxLength={60}
                          className="w-full px-4 py-2 border rounded"
                          placeholder="Tytuł dla Google"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {pageForm.metaTitle.length}/60 znaków
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Meta Description
                          <span className="text-xs text-gray-500 ml-2">
                            (max 160 znaków)
                          </span>
                        </label>
                        <textarea
                          value={pageForm.metaDescription}
                          onChange={(e) =>
                            setPageForm({
                              ...pageForm,
                              metaDescription: e.target.value,
                            })
                          }
                          maxLength={160}
                          rows={2}
                          className="w-full px-4 py-2 border rounded"
                          placeholder="Opis dla Google"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {pageForm.metaDescription.length}/160 znaków
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 px-6 py-4 bg-white border-t">
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
                  Zapisz {selectedHub.type === "GUIDE" ? "artykuł" : "stronę"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: Edycja huba */}
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

                {hubForm.type === "EXAM_SHEET" && (
                  <>
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <p className="text-sm text-orange-700 mb-2">
                        <FileText className="w-4 h-4 inline mr-1" />
                        <strong>Arkusz maturalny</strong> - zestaw plików PDF z
                        arkuszami CKE, odpowiedziami i kluczami.
                      </p>
                      <p className="text-xs text-orange-600">
                        URL: /arkusze/
                        {hubForm.title
                          ? hubForm.title.toLowerCase().replace(/\s+/g, "-")
                          : "slug"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Rok matury
                      </label>
                      <input
                        type="number"
                        value={hubForm.year}
                        onChange={(e) =>
                          setHubForm({ ...hubForm, year: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded"
                        placeholder="np. 2024"
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

        {/* Modal zarządzania ocenami */}
        {showRatingsModal && selectedPageForRatings && (
          <RatingsManager
            pageId={selectedPageForRatings.id}
            pageTitle={selectedPageForRatings.title}
            onClose={() => {
              setShowRatingsModal(false);
              setSelectedPageForRatings(null);
            }}
          />
        )}
      </div>
    );
  }

  return null;
}

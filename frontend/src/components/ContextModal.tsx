// frontend/src/components/ContextModal.tsx
import { AnimatePresence, motion } from "framer-motion";
import { Download, X, ZoomIn } from "lucide-react";
import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";

interface ContextModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content?: string;
  image?: string;
  type: "text" | "image";
}

export const ContextModal: React.FC<ContextModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  image,
  type,
}) => {
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Funkcja do formatowania tekstu biblijnego
  const formatBiblicalText = (text: string): string => {
    return (
      text
        // Zamień **X ** na numerację wersów
        .replace(
          /\*\*(\d+)\s?\*\*/g,
          '<sup style="font-weight: bold; color: #8b0000; margin: 0 3px;">$1</sup>'
        )

        // Podtytuły (linie zaczynające się od wielkiej litery i bez numeru)
        .replace(
          /^([A-ZŁŚĆŻŹŃ][^\n]*?)$/gm,
          '<h3 style="font-size: 16px; font-weight: bold; margin: 20px 0 10px 0; color: #4a0e0e;">$1</h3>'
        )

        // Cytaty w «»
        .replace(
          /«([^»]+)»/g,
          '<em style="font-style: italic; color: #555;">«$1»</em>'
        )

        // Przypisy (liczby w **X**)
        .replace(
          /\*\*(\d+)\*\*/g,
          '<sup style="font-size: 10px; color: #999;">[$1]</sup>'
        )

        // Dodaj akapity
        .split("\n\n")
        .map(
          (para) =>
            `<p style="margin: 12px 0; text-indent: 0;">${para.trim()}</p>`
        )
        .join("")
    );
  };

  const downloadAsPDF = () => {
    if (!contentRef.current) return;

    const opt = {
      margin: [15, 15, 15, 15],
      filename: `${title.replace(/[^a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, "_")}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: true,
      },
    };

    html2pdf().set(opt).from(contentRef.current).save();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full ${
                type === "image" ? "max-w-4xl" : "max-w-3xl"
              } max-h-[90vh] flex flex-col`}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white pr-8">
                  {title}
                </h3>
                <div className="flex items-center gap-2">
                  {type === "text" && content && (
                    <button
                      onClick={downloadAsPDF}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 
                               dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 
                               rounded-lg transition-colors"
                      title="Pobierz jako PDF"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  )}
                  {type === "image" && (
                    <button
                      onClick={() => setIsImageZoomed(!isImageZoomed)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 
                               dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 
                               rounded-lg transition-colors"
                      title="Powiększ"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 
                             dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 
                             rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto p-6 flex-1">
                {type === "text" && content && (
                  <div
                    ref={contentRef}
                    className="prose prose-sm dark:prose-invert max-w-none"
                    style={{
                      fontFamily: "'Georgia', 'Times New Roman', serif",
                      fontSize: "14px",
                      lineHeight: "1.8",
                    }}
                  >
                    {/* Nagłówek dla PDF */}
                    <div
                      style={{
                        marginBottom: "20px",
                        borderBottom: "2px solid #333",
                        paddingBottom: "10px",
                      }}
                    >
                      <h1
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          marginBottom: "5px",
                          color: "#1a1a1a",
                        }}
                      >
                        {title}
                      </h1>
                    </div>

                    {/* Treść biblijna */}
                    <div
                      style={{
                        textAlign: "justify",
                        color: "#2d2d2d",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: formatBiblicalText(content),
                      }}
                    />
                  </div>
                )}

                {type === "image" && image && (
                  <div className="flex justify-center">
                    <img
                      src={image}
                      alt={title}
                      className={`rounded-lg transition-all ${
                        isImageZoomed
                          ? "max-w-none w-auto max-h-none cursor-zoom-out"
                          : "max-w-full max-h-[70vh] cursor-zoom-in"
                      }`}
                      onClick={() => setIsImageZoomed(!isImageZoomed)}
                    />
                  </div>
                )}
              </div>

              {/* Footer info */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  {type === "text"
                    ? "💡 Kliknij przycisk pobierania aby zapisać tekst jako PDF"
                    : "💡 Kliknij na obraz aby powiększyć"}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

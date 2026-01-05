// frontend/src/features/exam-sheets/ExamSheetDetailPage.tsx

import {
  ArrowLeft,
  Calendar,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Home,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { PublicLayout } from "../../components/PublicLayout";
import { contentService } from "../../services/contentService";

interface ExamSheetPdf {
  id: string;
  title: string;
  url: string;
  type: "main" | "answers" | "formula_2015" | "other";
  fileSize?: string;
}

interface ExamSheetData {
  id: string;
  slug: string;
  title: string;
  year: number;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  views: number;
  metadata: {
    level?: string;
    month?: string;
    formula?: string;
  };
  pdfs: ExamSheetPdf[];
  additionalContent?: any[];
}

export function ExamSheetDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [sheet, setSheet] = useState<ExamSheetData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadSheet();
    }
  }, [slug]);

  const loadSheet = async () => {
    try {
      setLoading(true);
      const data = await contentService.getExamSheet(slug!);
      setSheet(data);
    } catch (error) {
      console.error("Error loading exam sheet:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      </PublicLayout>
    );
  }

  if (!sheet) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Arkusz nie znaleziony
            </h2>
            <Link
              to="/arkusze"
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              ← Wróć do listy arkuszy
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  // Grupuj PDFy po typie
  const mainPdfs = sheet.pdfs.filter((p) => p.type === "main");
  const answerPdfs = sheet.pdfs.filter((p) => p.type === "answers");
  const formula2015Pdfs = sheet.pdfs.filter((p) => p.type === "formula_2015");
  const otherPdfs = sheet.pdfs.filter((p) => p.type === "other");

  return (
    <PublicLayout>
      <Helmet>
        <title>{sheet.metaTitle || sheet.title} | MaturaPolski.pl</title>
        <meta
          name="description"
          content={
            sheet.metaDescription || `Pobierz arkusz maturalny: ${sheet.title}`
          }
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link
                to="/arkusze"
                className="hover:text-orange-600 flex items-center gap-1"
              >
                <Home className="w-4 h-4" />
                Arkusze
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{sheet.title}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-8 h-8 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {sheet.metadata.level && (
                    <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                      {sheet.metadata.level}
                    </span>
                  )}
                  {sheet.metadata.month && (
                    <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                      {sheet.metadata.month} {sheet.year}
                    </span>
                  )}
                  {sheet.metadata.formula && (
                    <span className="text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                      Formuła {sheet.metadata.formula}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {sheet.title}
                </h1>

                {sheet.description && (
                  <p className="text-gray-600 mb-4">{sheet.description}</p>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {sheet.year}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {sheet.views} wyświetleń
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    {sheet.pdfs.length} plików
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* PDFs - Arkusze główne */}
          {mainPdfs.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Arkusze egzaminacyjne
              </h2>
              <div className="space-y-3">
                {mainPdfs.map((pdf) => (
                  <PdfDownloadRow key={pdf.id} pdf={pdf} />
                ))}
              </div>
            </div>
          )}

          {/* PDFs - Odpowiedzi */}
          {answerPdfs.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                Odpowiedzi i klucze
              </h2>
              <div className="space-y-3">
                {answerPdfs.map((pdf) => (
                  <PdfDownloadRow key={pdf.id} pdf={pdf} />
                ))}
              </div>
            </div>
          )}

          {/* PDFs - Formuła 2015 */}
          {formula2015Pdfs.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-yellow-600" />
                Arkusze z formuły 2015
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Arkusze dla osób zdających maturę według starej formuły
              </p>
              <div className="space-y-3">
                {formula2015Pdfs.map((pdf) => (
                  <PdfDownloadRow key={pdf.id} pdf={pdf} />
                ))}
              </div>
            </div>
          )}

          {/* PDFs - Inne */}
          {otherPdfs.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Dodatkowe materiały
              </h2>
              <div className="space-y-3">
                {otherPdfs.map((pdf) => (
                  <PdfDownloadRow key={pdf.id} pdf={pdf} />
                ))}
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="mt-8">
            <Link
              to="/arkusze"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Wróć do listy arkuszy
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

function PdfDownloadRow({ pdf }: { pdf: ExamSheetPdf }) {
  return (
    <a
      href={pdf.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-4 border rounded-lg hover:bg-orange-50 hover:border-orange-200 transition-colors group"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900 group-hover:text-orange-600">
            {pdf.title}
          </h3>
          {pdf.fileSize && (
            <p className="text-sm text-gray-500">{pdf.fileSize}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-orange-600 font-medium hidden sm:block">
          Pobierz PDF
        </span>
        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-orange-600" />
      </div>
    </a>
  );
}

export default ExamSheetDetailPage;

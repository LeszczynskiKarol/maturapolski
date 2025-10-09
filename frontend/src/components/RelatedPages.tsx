// frontend/src/components/RelatedPages.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Clock, ArrowRight } from "lucide-react";
import { contentService } from "../services/contentService";

interface RelatedPagesProps {
  hubSlug: string;
  currentPageSlug: string;
  maxPages?: number;
}

interface PageInfo {
  id: string;
  slug: string;
  title: string;
  readingTime?: number;
}

export function RelatedPages({
  hubSlug,
  currentPageSlug,
  maxPages = 3,
}: RelatedPagesProps) {
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPages();
  }, [hubSlug, currentPageSlug]);

  const loadPages = async () => {
    try {
      const allPages = await contentService.getHubPages(hubSlug);

      // Odfiltruj aktualną stronę i wybierz losowo
      const otherPages = allPages.filter(
        (p: PageInfo) => p.slug !== currentPageSlug
      );

      // Wybierz losowo maxPages stron
      const shuffled = otherPages.sort(() => Math.random() - 0.5);
      setPages(shuffled.slice(0, maxPages));
    } catch (error) {
      console.error("Error loading related pages:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || pages.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 shadow-sm border border-purple-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <FileText className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Zobacz inne opracowania
          </h3>
          <p className="text-sm text-gray-600">
            Poznaj więcej aspektów tego utworu
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {pages.map((page) => (
          <Link
            key={page.id}
            to={`/baza-wiedzy/${hubSlug}/${page.slug}`}
            className="group block p-4 bg-white rounded-lg hover:shadow-md transition-all border border-purple-100 hover:border-purple-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                  {page.title}
                </h4>
                {page.readingTime && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{page.readingTime} min czytania</span>
                  </div>
                )}
              </div>
              <ArrowRight className="w-5 h-5 text-purple-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-purple-200">
        <Link
          to={`/baza-wiedzy/${hubSlug}`}
          className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center justify-center gap-2 group"
        >
          Zobacz wszystkie opracowania
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

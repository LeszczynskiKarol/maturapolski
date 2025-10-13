// frontend/src/components/RatingWidget.tsx
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { contentService } from "../services/contentService";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

interface RatingWidgetProps {
  pageId: string;
  pageTitle: string;
  hubTitle: string;
}

export function RatingWidget({
  pageId,
  pageTitle,
  hubTitle,
}: RatingWidgetProps) {
  const [averageRating, setAverageRating] = useState(0);
  const [ratingsCount, setRatingsCount] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [fingerprint, setFingerprint] = useState<string>("");

  useEffect(() => {
    // RESET STANU
    setUserRating(0);
    setHasRated(false);
    setHoveredRating(0);
    setAverageRating(0);
    setRatingsCount(0);

    loadRating();
    initFingerprint();
  }, [pageId]);

  const initFingerprint = async () => {
    try {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerprint(result.visitorId);

      // SPRAWDŹ CZY USER JUŻ OCENIŁ
      const check = await contentService.checkIfUserRated(
        pageId,
        result.visitorId
      );
      if (check.hasRated) {
        setHasRated(true);
        setUserRating(check.rating);
      }
    } catch (error) {
      console.error("Error loading fingerprint:", error);
    }
  };

  const loadRating = async () => {
    try {
      const data = await contentService.getPageRating(pageId);
      setAverageRating(data.averageRating || 0);
      setRatingsCount(data.ratingsCount || 0);
    } catch (error) {
      console.error("Error loading rating:", error);
    }
  };

  const handleRate = async (rating: number) => {
    if (isSubmitting || !fingerprint) return;

    setIsSubmitting(true);
    try {
      await contentService.submitRating(pageId, rating, fingerprint);

      setUserRating(rating);
      setHasRated(true);

      // Odśwież ocenę
      await loadRating();
    } catch (error: any) {
      console.error("Error submitting rating:", error);

      if (error.response?.data?.error) {
        alert(error.response.data.error);

        // Jeśli backend mówi że już ocenił, zablokuj
        if (error.response.data.error.includes("already rated")) {
          setHasRated(true);
        }
      } else {
        alert("Wystąpił błąd podczas oceniania. Spróbuj ponownie.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 shadow-sm border border-blue-100">
      {/* Structured Data dla Google */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          name: pageTitle,
          description: hubTitle,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: averageRating.toFixed(1),
            bestRating: "5",
            worstRating: "1",
            ratingCount: ratingsCount,
          },
        })}
      </script>

      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {hasRated ? "Twoja ocena" : "Oceń to opracowanie"}
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          {hasRated
            ? "Dziękujemy za podzielenie się opinią!"
            : "Pomóż innym uczniom - podziel się swoją opinią"}
        </p>

        {/* Gwiazdki */}
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => !hasRated && handleRate(star)}
              onMouseEnter={() => !hasRated && setHoveredRating(star)}
              onMouseLeave={() => !hasRated && setHoveredRating(0)}
              disabled={hasRated || isSubmitting || !fingerprint}
              className={`transition-all ${
                hasRated ? "cursor-default" : "cursor-pointer hover:scale-110"
              }`}
            >
              <Star
                className={`w-10 h-10 ${
                  star <= (hasRated ? userRating : hoveredRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-300"
                } transition-colors`}
              />
            </button>
          ))}
        </div>

        {/* Status - USUŃ BO MAMY JUŻ INFO W NAGŁÓWKU */}
        {/* <div className="text-center mb-4">
    {hasRated ? (
      <p className="text-sm text-green-600 font-medium">
        ✓ Dziękujemy za ocenę! Twoja ocena: {userRating}/5
      </p>
    ) : (
      <p className="text-sm text-gray-500">Kliknij gwiazdki aby ocenić</p>
    )}
  </div> */}

        {/* Statystyki - ZAWSZE widoczne */}
        {ratingsCount > 0 && (
          <div className="pt-4 border-t border-blue-200 mt-4">
            <div className="text-xs text-gray-500 mb-2">Średnia ocena</div>
            <div className="flex items-center justify-center gap-2">
              {/* Małe gwiazdki pokazujące średnią */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-lg text-gray-900">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">5</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              ({ratingsCount} {ratingsCount === 1 ? "ocena" : "ocen"})
            </div>
          </div>
        )}

        {/* Gdy jeszcze nikt nie ocenił */}
        {ratingsCount === 0 && !hasRated && (
          <div className="pt-4 border-t border-blue-200 mt-4">
            <p className="text-sm text-gray-500">
              Bądź pierwszym, który oceni to opracowanie!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

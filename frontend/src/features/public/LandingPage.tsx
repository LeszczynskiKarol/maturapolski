// frontend/src/features/public/LandingPage.tsx

import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Trophy,
  Target,
  Brain,
  Users,
  Star,
  CheckCircle,
  TrendingUp,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold">Matura Polski</span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#features" className="hover:text-blue-600">
                Funkcje
              </a>
              <a href="#stats" className="hover:text-blue-600">
                Statystyki
              </a>
              <a href="#pricing" className="hover:text-blue-600">
                Cennik
              </a>
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-blue-600"
              >
                Zaloguj
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Rozpocznij za darmo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Zdaj maturę z polskiego
              <span className="text-blue-600"> na 100%</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Interaktywna platforma z tysiącami zadań, AI oceniającym
              wypracowania i spersonalizowanym planem nauki
            </p>

            <div className="flex gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2"
              >
                Rozpocznij naukę
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/demo"
                className="px-8 py-4 border-2 border-gray-300 rounded-xl hover:border-blue-600"
              >
                Zobacz demo
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-blue-600">15,000+</div>
                <div className="text-gray-600">Zadań</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">98%</div>
                <div className="text-gray-600">Zdawalność</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">50,000+</div>
                <div className="text-gray-600">Uczniów</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Wszystko czego potrzebujesz do matury
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="AI ocenia wypracowania"
              description="Natychmiastowa ocena z dokładnym feedbackiem według kryteriów CKE"
            />
            <FeatureCard
              icon={<Target className="w-8 h-8" />}
              title="Adaptacyjny system"
              description="Zadania dopasowane do Twojego poziomu i postępów"
            />
            <FeatureCard
              icon={<Trophy className="w-8 h-8" />}
              title="Egzaminy próbne"
              description="Symulacje prawdziwego egzaminu z czasem i oceną"
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8" />}
              title="Baza wiedzy"
              description="Wszystkie lektury, epoki, teoria literatury w jednym miejscu"
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Śledzenie postępów"
              description="Szczegółowe statystyki i analiza słabych punktów"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Społeczność"
              description="Ucz się z innymi, dziel się notatkami, rywalizuj"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Dołącz do tysięcy maturzystów
              </h2>
              <p className="text-gray-600 mb-8">
                Nasza platforma pomogła już tysiącom uczniów osiągnąć sukces na
                maturze. Średni wynik naszych uczniów to 85%, przy średniej
                krajowej 67%.
              </p>

              <div className="space-y-4">
                <StatItem label="Średni wzrost wyniku" value="+32%" />
                <StatItem label="Zadań rozwiązanych dziennie" value="120,000" />
                <StatItem label="Ocenionych wypracowań" value="500,000+" />
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Co mówią uczniowie</h3>
              <div className="space-y-6">
                <TestimonialItem
                  name="Katarzyna M."
                  score="94%"
                  text="Dzięki tej platformie podwyższyłam wynik z 60% na próbnej do 94% na prawdziwej maturze!"
                />
                <TestimonialItem
                  name="Michał K."
                  score="88%"
                  text="System AI świetnie ocenia wypracowania. Wiedziałem dokładnie nad czym pracować."
                />
                <TestimonialItem
                  name="Anna P."
                  score="91%"
                  text="Najlepsza inwestycja przed maturą. Polecam każdemu!"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Wybierz plan dla siebie
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Darmowy"
              price="0 zł"
              features={[
                "100 zadań miesięcznie",
                "Podstawowe statystyki",
                "1 egzamin próbny",
              ]}
              cta="Rozpocznij"
              href="/register"
            />
            <PricingCard
              title="Premium"
              price="49 zł"
              period="/miesiąc"
              featured={true}
              features={[
                "Nieograniczone zadania",
                "AI ocenia wypracowania",
                "Wszystkie egzaminy próbne",
                "Szczegółowe analizy",
                "Plan nauki",
                "Priorytetowe wsparcie",
              ]}
              cta="Wybierz Premium"
              href="/register?plan=premium"
            />
            <PricingCard
              title="Roczny"
              price="399 zł"
              period="/rok"
              features={[
                "Wszystko z Premium",
                "2 miesiące gratis",
                "Konsultacje z ekspertem",
                "Materiały do druku",
                "Dostęp do archiwum",
              ]}
              cta="Oszczędź 20%"
              href="/register?plan=yearly"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">Produkt</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Funkcje
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cennik
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Demo
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Zasoby</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Poradniki
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Firma</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    O nas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Kontakt
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Kariera
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Prawne</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Regulamin
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Prywatność
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    RODO
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            © 2024 Matura Polski. Wszystkie prawa zastrzeżone.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const StatItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between items-center py-3 border-b">
    <span className="text-gray-600">{label}</span>
    <span className="text-2xl font-bold text-blue-600">{value}</span>
  </div>
);

const TestimonialItem: React.FC<{
  name: string;
  score: string;
  text: string;
}> = ({ name, score, text }) => (
  <div className="border-l-4 border-blue-600 pl-4">
    <p className="text-gray-600 mb-2">"{text}"</p>
    <div className="flex justify-between items-center">
      <span className="font-semibold">{name}</span>
      <span className="text-green-600 font-bold">{score}</span>
    </div>
  </div>
);

const PricingCard: React.FC<{
  title: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
}> = ({ title, price, period, features, cta, href, featured }) => (
  <div
    className={`p-8 rounded-2xl ${
      featured
        ? "bg-blue-600 text-white shadow-2xl scale-105"
        : "bg-white shadow-lg"
    }`}
  >
    {featured && (
      <div className="text-sm font-semibold mb-4 text-blue-100">
        NAJPOPULARNIEJSZY
      </div>
    )}
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <div className="mb-6">
      <span className="text-4xl font-bold">{price}</span>
      {period && <span className="text-lg">{period}</span>}
    </div>
    <ul className="space-y-3 mb-8">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-2">
          <CheckCircle
            className={`w-5 h-5 ${
              featured ? "text-blue-100" : "text-green-500"
            }`}
          />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <Link
      to={href}
      className={`block text-center py-3 rounded-lg font-semibold ${
        featured
          ? "bg-white text-blue-600 hover:bg-blue-50"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {cta}
    </Link>
  </div>
);

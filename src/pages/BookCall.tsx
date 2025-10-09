import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n/I18nProvider";
import CalendlyInline from "../components/CalendlyInline";

export default function BookCall() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <section className="pt-40 pb-10">
        <div className="mx-auto w-full max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t("book.title")}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("book.lead")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="full-bleed bookacall">
        <div className="w-full max-w-none px-0">
          <CalendlyInline />
        </div>
      </section>

      <footer className="py-16 border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-6 text-center text-gray-600">
          © {new Date().getFullYear()} thirtythree
        </div>
      </footer>
    </div>
  );
}

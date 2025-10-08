import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n/I18nProvider";

export default function BookCall() {
  const { t } = useI18n();
  const widgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ensureWidgetCss = () => {
      const href = "https://assets.calendly.com/assets/external/widget.css";
      const has = Array.from(document.styleSheets).some(
        // @ts-ignore
        (s) => (s as any).href && String((s as any).href).includes("assets.calendly.com"),
      );
      if (!has) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    };

    const responsiveHeight = () => {
      const w = window.innerWidth;
      if (w <= 767) return 1160; // mobile
      if (w <= 1023) return 1024; // tablet
      if (w <= 1279) return 900; // laptop
      return 840; // desktop
    };

    const applyHeight = () => {
      const h = `${responsiveHeight()}px`;
      if (widgetRef.current) {
        widgetRef.current.style.minHeight = h;
        widgetRef.current.style.height = h;
      }
    };

    const loadCalendlyScript = (cb: () => void) => {
      if ((window as any).Calendly) return cb();
      const existing = document.querySelector<HTMLScriptElement>(
        'script[src*="assets.calendly.com/assets/external/widget.js"]',
      );
      if (existing) {
        existing.addEventListener("load", cb, { once: true });
        return;
      }
      const s = document.createElement("script");
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      s.onload = cb;
      document.head.appendChild(s);
    };

    const init = () => {
      // Ensure container height reflects breakpoint
      applyHeight();
      window.addEventListener("resize", applyHeight, { passive: true });
    };

    ensureWidgetCss();
    // Set initial height and keep it responsive
    const setHeight = () => {
      const w = window.innerWidth;
      const h = w <= 767 ? 1160 : w <= 1023 ? 1024 : w <= 1279 ? 900 : 840;
      if (widgetRef.current) widgetRef.current.style.height = `${h}px`;
    };
    setHeight();
    window.addEventListener("resize", setHeight, { passive: true });

    // Load Calendly script so it auto-initializes inline widget div
    loadCalendlyScript(init);

    return () => {
      window.removeEventListener("resize", applyHeight);
      window.removeEventListener("resize", setHeight);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <section className="pt-40 pb-24">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t("book.title")}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("book.lead")}
            </p>
          </motion.div>
        </div>
        <div className="calendly-section w-full max-w-none px-0">
          <div
            ref={widgetRef}
            className="calendly-inline-widget"
            data-url="https://calendly.com/nemanja3975439/30min?hide_event_type_details=1&hide_gdpr_banner=1"
            style={{ minWidth: 320, height: 840 }}
          />
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

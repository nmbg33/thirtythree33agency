import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n/I18nProvider";

export default function BookCall() {
  const { t } = useI18n();
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadCalendlyScript = (cb: () => void) => {
      if ((window as any).Calendly) return cb();
      const s = document.createElement("script");
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      s.onload = cb;
      document.head.appendChild(s);
    };

    const init = () => {
      const Calendly = (window as any).Calendly;
      if (!Calendly || !hostRef.current) return;
      Calendly.initInlineWidget({
        url: "https://calendly.com/nemanja3975439/30min?hide_event_type_details=1&hide_gdpr_banner=1",
        parentElement: hostRef.current,
      });
      hostRef.current.style.minHeight = "700px";
    };

    if (document.readyState !== "loading") loadCalendlyScript(init);
    else document.addEventListener("DOMContentLoaded", () => loadCalendlyScript(init));
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

          <link
            href="https://assets.calendly.com/assets/external/widget.css"
            rel="stylesheet"
          />
          <div id="calendly-host" ref={hostRef} style={{ minHeight: 700 }}>
            <noscript>
              <p>Please enable JavaScript to book a call.</p>
              <p>
                <a
                  href="https://calendly.com/nemanja3975439/30min"
                  target="_blank"
                  rel="noopener"
                >
                  Open Calendly
                </a>
              </p>
            </noscript>
          </div>
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

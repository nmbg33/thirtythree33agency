import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import ProcessTabs from "../components/ProcessTabs";
import { useI18n } from "../i18n/I18nProvider";

export default function Discover() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-96 h-96 bg-gradient-to-br from-yellow-200/60 to-orange-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-gradient-to-tl from-amber-100/60 to-yellow-200/40 rounded-full blur-3xl" />
      </div>
      <Navbar />
      <section className="pt-36 pb-24 relative">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="mb-6">
            <ProcessTabs t={t} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t("process.discover.title")}
            </h1>
            <p className="text-lg text-gray-600">
              {t("process.discover.lead")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 bg-gray-50 rounded-2xl border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-3">
                {t("process.discover.what")}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• {t("process.discover.what.1")}</li>
                <li>• {t("process.discover.what.2")}</li>
                <li>• {t("process.discover.what.3")}</li>
                <li>• {t("process.discover.what.4")}</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 bg-white rounded-2xl border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-3">
                {t("process.discover.outcomes")}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• {t("process.discover.out.1")}</li>
                <li>• {t("process.discover.out.2")}</li>
                <li>• {t("process.discover.out.3")}</li>
                <li>• {t("process.discover.out.4")}</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

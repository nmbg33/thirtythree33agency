import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import ProcessTabs from "../components/ProcessTabs";
import { useI18n } from "../i18n/I18nProvider";

export default function Design() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -right-10 w-[28rem] h-[28rem] bg-gradient-to-br from-purple-200/60 to-pink-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-gradient-to-tl from-fuchsia-100/60 to-purple-200/40 rounded-full blur-3xl" />
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
              {t("process.design.title")}
            </h1>
            <p className="text-lg text-gray-600">{t("process.design.lead")}</p>
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
                {t("process.design.what")}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• {t("process.design.what.1")}</li>
                <li>• {t("process.design.what.2")}</li>
                <li>• {t("process.design.what.3")}</li>
                <li>• {t("process.design.what.4")}</li>
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
                {t("process.design.outcomes")}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• {t("process.design.out.1")}</li>
                <li>• {t("process.design.out.2")}</li>
                <li>• {t("process.design.out.3")}</li>
                <li>• {t("process.design.out.4")}</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

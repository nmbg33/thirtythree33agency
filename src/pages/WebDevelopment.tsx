import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import ServicesTabs from "../components/ServicesTabs";
import { useI18n } from "../i18n/I18nProvider";

export default function WebDevelopment() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -right-10 w-[28rem] h-[28rem] bg-gradient-to-br from-blue-200/70 to-violet-300/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[26rem] h-[26rem] bg-gradient-to-tl from-indigo-100/70 to-cyan-200/40 rounded-full blur-3xl" />
      </div>
      <Navbar />
      <section className="pt-36 pb-24 relative">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="mb-6">
            <ServicesTabs t={t} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t("services.web.title")}
            </h1>
            <p className="text-lg text-gray-600">{t("services.web.lead")}</p>
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
                {t("services.web.what")}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• {t("services.web.what.1")}</li>
                <li>• {t("services.web.what.2")}</li>
                <li>• {t("services.web.what.3")}</li>
                <li>• {t("services.web.what.4")}</li>
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
                {t("services.web.outcomes")}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• {t("services.web.out.1")}</li>
                <li>• {t("services.web.out.2")}</li>
                <li>• {t("services.web.out.3")}</li>
                <li>• {t("services.web.out.4")}</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

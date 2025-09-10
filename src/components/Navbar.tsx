import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, lang, setLang } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t("nav.services"), id: "services" },
    { label: t("nav.strategy"), id: "strategy" },
    { label: t("nav.about"), id: "about" },
    { label: t("nav.contact"), id: "contact" },
  ];

  const handleNavClick = (id: string) => {
    const go = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(go, 50);
    } else {
      go();
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight cursor-pointer"
            >
              thirtythree
            </Link>
          </motion.div>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-gray-600 hover:text-gray-900 transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-yellow-400 transition-all duration-300" />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-2 text-sm ${lang === "en" ? "bg-gray-900 text-white" : "bg-white text-gray-700"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("sr")}
                className={`px-3 py-2 text-sm border-l border-gray-300 ${lang === "sr" ? "bg-gray-900 text-white" : "bg-white text-gray-700"}`}
              >
                SR
              </button>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/book"
                className="hidden md:block px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t("nav.book")}
              </Link>
            </motion.div>
            <Link
              to="/book"
              className="md:hidden px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              {t("nav.book")}
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

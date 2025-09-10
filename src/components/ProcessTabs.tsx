import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  { to: "/discover", key: "process.nav.discover" },
  { to: "/design", key: "process.nav.design" },
  { to: "/develop", key: "process.nav.develop" },
  { to: "/grow", key: "process.nav.grow" },
];

export default function ProcessTabs({ t }: { t: (k: string) => string }) {
  const { pathname } = useLocation();
  return (
    <div className="w-full flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 bg-white/70 backdrop-blur px-2 py-2">
      {tabs.map((tab) => {
        const active = pathname === tab.to;
        return (
          <Link key={tab.to} to={tab.to} className="relative">
            <motion.span
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              whileHover={{ y: -1 }}
            >
              {t(tab.key)}
            </motion.span>
          </Link>
        );
      })}
    </div>
  );
}

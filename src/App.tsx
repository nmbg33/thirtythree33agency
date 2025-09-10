import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "./components/Navbar";
import { useI18n } from "./i18n/I18nProvider";
import { Link } from "react-router-dom";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useI18n();

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Custom cursor */}
      <motion.div
        className="fixed w-4 h-4 bg-yellow-400/50 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            style={{ y: y1 }}
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-yellow-200/40 to-orange-300/20 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-yellow-100/30 to-orange-200/30 rounded-full blur-3xl"
          />
          <motion.div
            className="absolute top-1/2 left-1/4 w-32 h-32 bg-gray-200/20 rotate-45 blur-xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.div
          style={{ opacity }}
          className="container mx-auto px-6 relative z-10"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="max-w-6xl mx-auto text-center"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block mb-8 text-sm px-4 py-2 bg-gray-100 rounded-full">
                {t("hero.badge")}
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight">
                {t("hero.title.1")}
              </h1>
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight text-gray-500">
                {t("hero.title.2")}
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/book"
                  className="text-lg px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
                >
                  {t("hero.cta.primary")}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              {t("services.title")}
            </h2>
            <p className="text-xl text-gray-600">{t("services.subtitle")}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "⚡",
                title: t("services.0.title"),
                description: t("services.0.desc"),
                color: "from-amber-100 to-orange-200",
                to: "/services/brand",
              },
              {
                icon: "💻",
                title: t("services.1.title"),
                description: t("services.1.desc"),
                color: "from-blue-100 to-purple-200",
                to: "/services/web",
              },
              {
                icon: "📈",
                title: t("services.2.title"),
                description: t("services.2.desc"),
                color: "from-green-100 to-emerald-200",
                to: "/services/growth",
              },
            ].map((service, index) => (
              <Link key={service.title} to={service.to}>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <div className="h-full p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-2xl bg-gradient-to-r ${service.color} group-hover:shadow-lg transition-all duration-300`}
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section id="strategy" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              {t("strategy.title")}
            </h2>
            <p className="text-xl text-gray-600">{t("strategy.subtitle")}</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: "🔎",
                title: t("strategy.0.title"),
                badge: t("strategy.0.badge"),
                description: t("strategy.0.desc"),
                to: "/discover",
              },
              {
                icon: "✏️",
                title: t("strategy.1.title"),
                badge: t("strategy.1.badge"),
                description: t("strategy.1.desc"),
                to: "/design",
              },
              {
                icon: "⚙️",
                title: t("strategy.2.title"),
                badge: t("strategy.2.badge"),
                description: t("strategy.2.desc"),
                to: "/develop",
              },
              {
                icon: "🚀",
                title: t("strategy.3.title"),
                badge: t("strategy.3.badge"),
                description: t("strategy.3.desc"),
                to: "/grow",
              },
            ].map((item, i) => (
              <Link key={item.title} to={item.to}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-6 rounded-2xl bg-gray-50 hover:bg-white border border-gray-200 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl">{item.icon}</div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  {t("about.title.main")}
                  <span className="text-gray-500"> {t("about.title.em")}</span>
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {t("about.p1")}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t("about.p2")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="aspect-square bg-gradient-to-br from-yellow-200 to-orange-300 rounded-3xl relative overflow-hidden"
                >
                  <div className="absolute inset-8 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="relative w-40 h-40 mx-auto">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 opacity-20" />
                        <div className="absolute inset-2 rounded-full bg-white shadow-inner" />
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          viewport={{ once: true }}
                          className="absolute inset-0 rounded-full ring-2 ring-yellow-400/60 animate-pulse"
                        />
                        <div className="relative flex items-center justify-center h-full">
                          <span className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                            50+
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 text-gray-700 font-semibold">
                        {t("about.stats.projects")}
                      </div>
                      <p className="text-gray-500 text-sm mt-1">
                        {t("about.stats.sub")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              {t("contact.title.1")}
              <span className="block mt-2 text-gray-500 tracking-wide">
                {t("contact.title.2")}
              </span>
            </h2>
            <p className="text-xl text-gray-600">{t("contact.subtitle")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="p-8 bg-gray-50 rounded-2xl shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="block text-sm font-medium mb-2">
                      {t("contact.form.name")}
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                    />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="block text-sm font-medium mb-2">
                      {t("contact.form.email")}
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                    />
                  </motion.div>
                </div>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className="block text-sm font-medium mb-2">
                    {t("contact.form.company")}
                  </label>
                  <input
                    type="text"
                    placeholder="Your company"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  />
                </motion.div>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className="block text-sm font-medium mb-2">
                    {t("contact.form.details")}
                  </label>
                  <textarea
                    placeholder="Tell us about your project..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    type="submit"
                    className="w-full text-lg py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
                  >
                    {t("contact.form.submit")}
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold mb-4 md:mb-0"
            >
              thirtythree
            </motion.div>
            <div className="flex items-center space-x-8">
              <span className="text-gray-600">Belgrade, Serbia</span>
              <motion.a
                href="mailto:hello@thirtythree.rs"
                whileHover={{ y: -2 }}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                hello@thirtythree.rs
              </motion.a>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default App;

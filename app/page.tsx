"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

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
    <div className="min-h-screen bg-background text-foreground">
      {/* Custom cursor */}
      <motion.div
        className="fixed w-4 h-4 bg-accent/50 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
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

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold tracking-tight cursor-pointer"
            >
              thirtythree
            </motion.div>
            <div className="hidden md:flex items-center space-x-8">
              {["Services", "Work", "About", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ y: -2 }}
                  className="text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href="/book">
                <Button
                  asChild={false}
                  variant="outline"
                  className="hidden md:block"
                >
                  Book a Call
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            style={{ y: y1 }}
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-accent/20 to-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-accent/10 to-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary/5 rotate-45 blur-xl"
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
              <Badge
                variant="secondary"
                className="mb-8 text-sm px-4 py-2 backdrop-blur-sm"
              >
                Belgrade-based brand agency
              </Badge>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight">
                We build brands
              </h1>
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight text-muted-foreground">
                that grow
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              Strategic brand building, cutting-edge web development, and
              growth-driven ideas that transform businesses into market leaders.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg"
                >
                  Start Your Project
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 backdrop-blur-sm"
                >
                  View Our Work
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">What we do</h2>
            <p className="text-xl text-muted-foreground">
              Three core services that drive exceptional results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "⚡",
                title: "Brand Building",
                description:
                  "Comprehensive brand strategy, visual identity, and positioning that resonates with your target audience and sets you apart from competition.",
                color: "from-amber-400/20 to-orange-600/20",
              },
              {
                icon: "💻",
                title: "Web Development",
                description:
                  "Custom websites and digital experiences that combine stunning design with powerful functionality to drive conversions and engagement.",
                color: "from-blue-400/20 to-purple-600/20",
              },
              {
                icon: "📈",
                title: "Growth Strategy",
                description:
                  "Data-driven growth strategies and innovative ideas that scale your business and maximize ROI across all marketing channels.",
                color: "from-green-400/20 to-emerald-600/20",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full border-0 bg-background/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
                  <CardContent className="p-8">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-2xl bg-gradient-to-r ${service.color} group-hover:shadow-lg transition-all duration-300`}
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section id="work" className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Our work</h2>
            <p className="text-xl text-muted-foreground">
              Award-winning projects that drive results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "TechCorp Rebrand",
                type: "Brand Identity",
                color: "from-purple-400/30 to-pink-600/30",
              },
              {
                name: "Startup Launch",
                type: "Web Design",
                color: "from-blue-400/30 to-cyan-600/30",
              },
              {
                name: "E-commerce Platform",
                type: "Development",
                color: "from-emerald-400/30 to-teal-600/30",
              },
              {
                name: "Growth Campaign",
                type: "Strategy",
                color: "from-orange-400/30 to-red-600/30",
              },
            ].map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <div
                  className={`aspect-video bg-gradient-to-br ${project.color} rounded-2xl overflow-hidden relative backdrop-blur-sm`}
                >
                  <motion.div
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-end"
                    whileHover={{ backdropFilter: "blur(2px)" }}
                  >
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-bold mb-1">{project.name}</h3>
                      <p className="text-white/80">{project.type}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-muted/30">
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
                  Belgrade's creative
                  <span className="text-muted-foreground"> powerhouse</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Founded in Belgrade, thirtythree represents the new wave of
                  Serbian creativity. We combine local insight with global
                  standards to create brands that compete on the world stage.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our team of strategists, designers, and developers work
                  collaboratively to ensure every project exceeds expectations
                  and drives real business results.
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
                  className="aspect-square bg-gradient-to-br from-accent/30 to-primary/20 rounded-3xl relative overflow-hidden backdrop-blur-sm"
                >
                  <div className="absolute inset-8 bg-background/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.3,
                          type: "spring",
                        }}
                        viewport={{ once: true }}
                        className="text-6xl font-bold mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
                      >
                        33
                      </motion.div>
                      <div className="text-muted-foreground font-medium">
                        Projects Delivered
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Let's create something
              <span className="text-muted-foreground">amazing</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Ready to transform your brand? Schedule a consultation and let's
              discuss your project.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Card className="border-0 bg-background/50 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <label className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input
                        placeholder="Your name"
                        className="bg-background/50 border-border/50"
                      />
                    </motion.div>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <label className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        className="bg-background/50 border-border/50"
                      />
                    </motion.div>
                  </div>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="block text-sm font-medium mb-2">
                      Company
                    </label>
                    <Input
                      placeholder="Your company"
                      className="bg-background/50 border-border/50"
                    />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="block text-sm font-medium mb-2">
                      Project Details
                    </label>
                    <Textarea
                      placeholder="Tell us about your project..."
                      className="bg-background/50 border-border/50 min-h-32"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full text-lg py-6 shadow-lg"
                    >
                      Schedule a Meeting
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border bg-muted/30">
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
              <span className="text-muted-foreground">Belgrade, Serbia</span>
              <motion.a
                href="mailto:hello@thirtythree.rs"
                whileHover={{ y: -2, color: "hsl(var(--foreground))" }}
                className="text-muted-foreground transition-colors"
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

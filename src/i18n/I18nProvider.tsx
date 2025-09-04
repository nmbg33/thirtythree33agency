import React, { createContext, useContext, useMemo, useState } from "react";

type Lang = "en" | "sr";

type Dict = Record<string, string>;

type I18nContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

const dictEn: Dict = {
  "nav.services": "Services",
  "nav.strategy": "Strategy",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.book": "Book a Call",

  "hero.badge": "Belgrade-based brand agency",
  "hero.title.1": "We build brands",
  "hero.title.2": "that grow",
  "hero.subtitle":
    "Strategic brand building, cutting-edge web development, and growth-driven ideas that transform businesses into market leaders.",
  "hero.cta.primary": "Start Your Project",

  "services.title": "What we do",
  "services.subtitle": "Three core services that drive exceptional results",
  "services.0.title": "Brand Building",
  "services.0.desc":
    "Comprehensive brand strategy, visual identity, and positioning that resonates with your target audience and sets you apart from competition.",
  "services.1.title": "Web Development",
  "services.1.desc":
    "Custom websites and digital experiences that combine stunning design with powerful functionality to drive conversions and engagement.",
  "services.2.title": "Growth Strategy",
  "services.2.desc":
    "Data-driven growth strategies and innovative ideas that scale your business and maximize ROI across all marketing channels.",

  "strategy.title": "Our Strategy",
  "strategy.subtitle":
    "We follow the latest trends and design styles while balancing usability, accessibility, performance, and bold storytelling.",
  "strategy.0.title": "Discover",
  "strategy.0.badge": "Research-first",
  "strategy.0.desc":
    "Deep research, audits, and market insight to inform every decision.",
  "strategy.1.title": "Design",
  "strategy.1.badge": "Trends 2025",
  "strategy.1.desc":
    "Modern aesthetics, advanced typography, and motion to create desire.",
  "strategy.2.title": "Develop",
  "strategy.2.badge": "Performance",
  "strategy.2.desc":
    "Lightning-fast builds with accessibility and SEO baked in from day one.",
  "strategy.3.title": "Grow",
  "strategy.3.badge": "Iterate",
  "strategy.3.desc":
    "Continuous optimization, content, and campaigns that compound results.",

  "about.title.main": "Belgrade's creative",
  "about.title.em": "powerhouse",
  "about.p1":
    "Founded in Belgrade, thirtythree represents the new wave of Serbian creativity. We combine local insight with global standards to create brands that compete on the world stage.",
  "about.p2":
    "Our team of strategists, designers, and developers work collaboratively to ensure every project exceeds expectations and drives real business results.",
  "about.stats.projects": "Projects delivered",
  "about.stats.sub": "From startups to enterprises across 12 industries",

  "contact.title.1": "Let's create something",
  "contact.title.2": "amazing",
  "contact.subtitle":
    "Ready to transform your brand? Schedule a consultation and let's discuss your project.",
  "contact.form.name": "Name",
  "contact.form.email": "Email",
  "contact.form.company": "Company",
  "contact.form.details": "Project Details",
  "contact.form.submit": "Schedule a Meeting",

  "book.title": "Book a call",
  "book.lead":
    "Reserve a time for an intro call. Pick a day and time — you will receive a confirmation via email.",
  "book.pickDay": "Pick a day",
  "book.pickTime": "Pick a time",
  "book.firstName": "First name",
  "book.lastName": "Last name",
  "book.email": "Email",
  "book.confirm": "Confirm booking",
  "book.success.title": "Your call is booked",
  "book.success.body":
    "Thank you {firstName}! We sent a confirmation to {email}. Please check your inbox (and spam folder).",
};

const dictSr: Dict = {
  "nav.services": "Usluge",
  "nav.strategy": "Strategija",
  "nav.about": "O nama",
  "nav.contact": "Kontakt",
  "nav.book": "Zakaži poziv",

  "hero.badge": "Agencija za brend sa sedištem u Beogradu",
  "hero.title.1": "Gradimo brendove",
  "hero.title.2": "koji rastu",
  "hero.subtitle":
    "Strateška izgradnja brenda, napredan web razvoj i ideje vođene rastom koje pretvaraju biznise u lidere na tržištu.",
  "hero.cta.primary": "Započni projekat",

  "services.title": "Šta radimo",
  "services.subtitle": "Tri ključne usluge koje donose izuzetne rezultate",
  "services.0.title": "Izgradnja brenda",
  "services.0.desc":
    "Sveobuhvatna strategija brenda, vizuelni identitet i pozicioniranje koje odjekuje kod publike i izdvaja vas od konkurencije.",
  "services.1.title": "Web razvoj",
  "services.1.desc":
    "Prilagođeni sajtovi i digitalna iskustva koja spajaju vrhunski dizajn i funkcionalnost radi konverzija i angažmana.",
  "services.2.title": "Strategija rasta",
  "services.2.desc":
    "Strategije rasta zasnovane na podacima i inovativne ideje koje skaliraju biznis i maksimizuju ROI.",

  "strategy.title": "Naša strategija",
  "strategy.subtitle":
    "Pratimo najnovije trendove i stilove dizajna, uz balans upotrebljivosti, pristupačnosti, performansi i smelog pripovedanja.",
  "strategy.0.title": "Istraži",
  "strategy.0.badge": "Istraživanje",
  "strategy.0.desc":
    "Dubinska istraživanja, auditi i uvid u tržište kao osnova za svaku odluku.",
  "strategy.1.title": "Dizajn",
  "strategy.1.badge": "Trendovi 2025",
  "strategy.1.desc":
    "Moderan izgled, napredna tipografija i pokret koji stvaraju želju.",
  "strategy.2.title": "Razvoj",
  "strategy.2.badge": "Performanse",
  "strategy.2.desc":
    "Munjevito brzi sajtovi sa pristupačnošću i SEO-om od prvog dana.",
  "strategy.3.title": "Rast",
  "strategy.3.badge": "Iteracija",
  "strategy.3.desc":
    "Kontinuirana optimizacija, sadržaj i kampanje koje multipliciraju rezultate.",

  "about.title.main": "Beogradska kreativna",
  "about.title.em": "snaga",
  "about.p1":
    "Osnovan u Beogradu, thirtythree predstavlja novi talas srpske kreativnosti. Spajamo lokalni uvid sa globalnim standardima i gradimo brendove koji uspešno nastupaju na svetskoj sceni.",
  "about.p2":
    "Naš tim stratega, dizajnera i developera radi zajedno kako bi svaki projekat premašio očekivanja i doneo merljive rezultate.",
  "about.stats.projects": "Isporučenih projekata",
  "about.stats.sub": "Od startapa do velikih kompanija u 12 industrija",

  "contact.title.1": "Hajde da stvorimo nešto",
  "contact.title.2": "neverovatno",
  "contact.subtitle":
    "Spremni ste da transformišete brend? Zakažite konsultacije da razgovaramo o projektu.",
  "contact.form.name": "Ime",
  "contact.form.email": "Email",
  "contact.form.company": "Kompanija",
  "contact.form.details": "Detalji projekta",
  "contact.form.submit": "Zakaži sastanak",

  "book.title": "Zakaži poziv",
  "book.lead":
    "Rezerviši termin za uvodni poziv. Odaberi dan i vreme — potvrdu ćeš dobiti na email.",
  "book.pickDay": "Odaberi dan",
  "book.pickTime": "Odaberi vreme",
  "book.firstName": "Ime",
  "book.lastName": "Prezime",
  "book.email": "Email",
  "book.confirm": "Potvrdi termin",
  "book.success.title": "Termin je uspešno rezervisan",
  "book.success.body":
    "Hvala {firstName}! Poslali smo potvrdu na {email}. Proveri inbox i spam folder.",
};

const dictionaries: Record<Lang, Dict> = { en: dictEn, sr: dictSr };

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const toggle = () => setLang((l) => (l === "en" ? "sr" : "en"));
  const t = (key: string, params?: Record<string, string | number>) => {
    const d = dictionaries[lang];
    let v = d[key] ?? key;
    if (params) {
      Object.entries(params).forEach(([k, val]) => {
        v = v.replace(new RegExp(`{${k}}`, "g"), String(val));
      });
    }
    return v;
  };
  const value = useMemo(() => ({ lang, setLang, toggle, t }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

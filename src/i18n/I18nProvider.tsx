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

  // Process pages (Discover, Design, Develop, Grow)
  "process.nav.discover": "Discover",
  "process.nav.design": "Design",
  "process.nav.develop": "Develop",
  "process.nav.grow": "Grow",

  // Discover
  "process.discover.title": "Discover",
  "process.discover.lead":
    "We begin with research. Audits, interviews, data, and market signals reveal what matters: opportunities, pain points, and the story only your brand can tell.",
  "process.discover.what": "What we do",
  "process.discover.outcomes": "Outcomes",
  "process.discover.what.1": "Stakeholder interviews & workshops",
  "process.discover.what.2": "Brand, UX and content audits",
  "process.discover.what.3": "Competitive & category mapping",
  "process.discover.what.4": "Analytics, SEO and funnel review",
  "process.discover.out.1": "Clear goals and success metrics",
  "process.discover.out.2": "Audience insights and JTBD",
  "process.discover.out.3": "Brand positioning hypotheses",
  "process.discover.out.4": "Project roadmap and scope",

  // Design
  "process.design.title": "Design",
  "process.design.lead":
    "We craft systems: typography, color, motion, and components that scale. A visual language that is both beautiful and brutally clear.",
  "process.design.what": "What we do",
  "process.design.outcomes": "Outcomes",
  "process.design.what.1": "Brand identity & design systems",
  "process.design.what.2": "UI/UX for web & product",
  "process.design.what.3": "Micro-interactions & motion",
  "process.design.what.4": "Art direction and content guides",
  "process.design.out.1": "High-fidelity prototypes",
  "process.design.out.2": "Design tokens & documentation",
  "process.design.out.3": "Accessible, responsive layouts",
  "process.design.out.4": "Conversion-focused UI patterns",

  // Develop
  "process.develop.title": "Develop",
  "process.develop.lead":
    "Performance-first engineering. Modern stacks, clean architecture, and automation that ships fast without breaking.",
  "process.develop.what": "What we do",
  "process.develop.outcomes": "Outcomes",
  "process.develop.what.1": "Jamstack & headless CMS",
  "process.develop.what.2": "React, TypeScript, accessibility",
  "process.develop.what.3": "Animations and WebGL",
  "process.develop.what.4": "CI/CD, testing, and monitoring",
  "process.develop.out.1": "Lighthouse 90+ scores",
  "process.develop.out.2": "Scalable component libraries",
  "process.develop.out.3": "SEO and schema best practices",
  "process.develop.out.4": "Secure, maintainable codebase",

  // Grow
  "process.grow.title": "Grow",
  "process.grow.lead":
    "Launch is the start. We iterate with content, experiments, and campaigns that compound over time.",
  "process.grow.what": "What we do",
  "process.grow.outcomes": "Outcomes",
  "process.grow.what.1": "Content and SEO programs",
  "process.grow.what.2": "A/B tests and conversion lifts",
  "process.grow.what.3": "Performance marketing",
  "process.grow.what.4": "Analytics and reporting cadence",
  "process.grow.out.1": "Growth roadmap and KPIs",
  "process.grow.out.2": "Content calendar and assets",
  "process.grow.out.3": "Continuous CRO improvements",
  "process.grow.out.4": "Measurable ROI across channels",

  // Services pages
  "services.nav.brand": "Brand Building",
  "services.nav.web": "Web Development",
  "services.nav.growth": "Growth Strategy",

  "services.brand.title": "Brand Building",
  "services.brand.lead":
    "Positioning, identity, and messaging that make your brand unforgettable.",
  "services.brand.what": "What we do",
  "services.brand.outcomes": "Outcomes",
  "services.brand.what.1": "Brand strategy & positioning",
  "services.brand.what.2": "Naming, tone of voice, storytelling",
  "services.brand.what.3": "Visual identity & guidelines",
  "services.brand.what.4": "Messaging framework & brand playbook",
  "services.brand.out.1": "Differentiated market position",
  "services.brand.out.2": "Cohesive identity across touchpoints",
  "services.brand.out.3": "Clear narrative that converts",
  "services.brand.out.4": "Scalable brand system",

  "services.web.title": "Web Development",
  "services.web.lead":
    "High-performance websites and digital products that convert.",
  "services.web.what": "What we do",
  "services.web.outcomes": "Outcomes",
  "services.web.what.1": "React/TypeScript frontends",
  "services.web.what.2": "Headless CMS & Jamstack",
  "services.web.what.3": "Animations, 3D & interactions",
  "services.web.what.4": "Accessibility, SEO & analytics",
  "services.web.out.1": "Fast, responsive experiences",
  "services.web.out.2": "Maintainable, scalable code",
  "services.web.out.3": "Improved conversion rates",
  "services.web.out.4": "Actionable insights & tracking",

  "services.growth.title": "Growth Strategy",
  "services.growth.lead":
    "Programs that compound results across content, SEO, and performance.",
  "services.growth.what": "What we do",
  "services.growth.outcomes": "Outcomes",
  "services.growth.what.1": "Content strategy & production",
  "services.growth.what.2": "Lifecycle & conversion optimization",
  "services.growth.what.3": "Performance marketing & experiments",
  "services.growth.what.4": "Measurement & reporting cadence",
  "services.growth.out.1": "Sustained traffic & demand",
  "services.growth.out.2": "Higher activation & retention",
  "services.growth.out.3": "Efficient CAC & channel mix",
  "services.growth.out.4": "Continuous improvement flywheel",
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

  // Process pages (Discover, Design, Develop, Grow)
  "process.nav.discover": "Istraži",
  "process.nav.design": "Dizajn",
  "process.nav.develop": "Razvoj",
  "process.nav.grow": "Rast",

  // Discover
  "process.discover.title": "Istraži",
  "process.discover.lead":
    "Počinjemo istraživanjem. Auditi, intervjui, podaci i signali sa tržišta otkrivaju prilike, probleme i priču koju samo vaš brend može da ispriča.",
  "process.discover.what": "Šta radimo",
  "process.discover.outcomes": "Ishodi",
  "process.discover.what.1": "Intervjui sa timom i radionice",
  "process.discover.what.2": "Auditi brenda, UX-a i sadržaja",
  "process.discover.what.3": "Mapa konkurencije i kategorije",
  "process.discover.what.4": "Analitika, SEO i pregled levka",
  "process.discover.out.1": "Jasni ciljevi i metrike uspeha",
  "process.discover.out.2": "Uvid u publiku i poslove koji se obavljaju (JTBD)",
  "process.discover.out.3": "Hipoteze o pozicioniranju brenda",
  "process.discover.out.4": "Plan projekta i obim",

  // Design
  "process.design.title": "Dizajn",
  "process.design.lead":
    "Gradimo sisteme: tipografija, boja, pokret i komponente koje skaliraju. Vizuelni jezik koji je i lep i kristalno jasan.",
  "process.design.what": "Šta radimo",
  "process.design.outcomes": "Ishodi",
  "process.design.what.1": "Identitet brenda i dizajn sistemi",
  "process.design.what.2": "UI/UX za web i proizvode",
  "process.design.what.3": "Mikrointerakcije i animacije",
  "process.design.what.4": "Art direkcija i smernice za sadržaj",
  "process.design.out.1": "Prototipovi visoke vernosti",
  "process.design.out.2": "Dizajn tokeni i dokumentacija",
  "process.design.out.3": "Pristupačni, responzivni rasporedi",
  "process.design.out.4": "UI šabloni fokusirani na konverziju",

  // Develop
  "process.develop.title": "Razvoj",
  "process.develop.lead":
    "Inženjering sa performansama na prvom mestu. Moderan stack, čista arhitektura i automatizacija — brzo i stabilno isporučivanje.",
  "process.develop.what": "Šta radimo",
  "process.develop.outcomes": "Ishodi",
  "process.develop.what.1": "Jamstack i headless CMS",
  "process.develop.what.2": "React, TypeScript i pristupačnost",
  "process.develop.what.3": "Animacije i WebGL",
  "process.develop.what.4": "CI/CD, testiranje i nadzor",
  "process.develop.out.1": "Lighthouse 90+ rezultati",
  "process.develop.out.2": "Skalabilne biblioteke komponenti",
  "process.develop.out.3": "SEO i schema najbolje prakse",
  "process.develop.out.4": "Sigurna, održiva baza koda",

  // Grow
  "process.grow.title": "Rast",
  "process.grow.lead":
    "Lansiranje je po��etak. Iteriramo kroz sadržaj, eksperimente i kampanje koje vremenom multipliciraju rezultate.",
  "process.grow.what": "Šta radimo",
  "process.grow.outcomes": "Ishodi",
  "process.grow.what.1": "Sadržaj i SEO programi",
  "process.grow.what.2": "A/B testovi i podizanje konverzija",
  "process.grow.what.3": "Perfomans marketing",
  "process.grow.what.4": "Analitika i ritam izveštavanja",
  "process.grow.out.1": "Mapa rasta i KPI",
  "process.grow.out.2": "Kalendar sadržaja i asseti",
  "process.grow.out.3": "Kontinuirana CRO poboljšanja",
  "process.grow.out.4": "Merljiv ROI kroz kanale",

  // Services pages
  "services.nav.brand": "Izgradnja brenda",
  "services.nav.web": "Web razvoj",
  "services.nav.growth": "Strategija rasta",

  "services.brand.title": "Izgradnja brenda",
  "services.brand.lead":
    "Pozicioniranje, identitet i poruke zbog kojih se brend pamti.",
  "services.brand.what": "Šta radimo",
  "services.brand.outcomes": "Ishodi",
  "services.brand.what.1": "Strategija brenda i pozicioniranje",
  "services.brand.what.2": "Naming, ton komunikacije i storytelling",
  "services.brand.what.3": "Vizuelni identitet i smernice",
  "services.brand.what.4": "Poruke i brand playbook",
  "services.brand.out.1": "Jasno diferencirana pozicija",
  "services.brand.out.2": "Koherentan identitet na svim tačkama",
  "services.brand.out.3": "Jasna naracija koja konvertuje",
  "services.brand.out.4": "Skalabilan brend sistem",

  "services.web.title": "Web razvoj",
  "services.web.lead":
    "Brze, moderne web aplikacije i proizvodi koji konvertuju.",
  "services.web.what": "Šta radimo",
  "services.web.outcomes": "Ishodi",
  "services.web.what.1": "React/TypeScript frontend",
  "services.web.what.2": "Headless CMS i Jamstack",
  "services.web.what.3": "Animacije, 3D i interakcije",
  "services.web.what.4": "Pristupačnost, SEO i analitika",
  "services.web.out.1": "Brza, responzivna iskustva",
  "services.web.out.2": "Održiva i skalabilna baza koda",
  "services.web.out.3": "Bolje stope konverzije",
  "services.web.out.4": "Akcioni uvidi i merenje",

  "services.growth.title": "Strategija rasta",
  "services.growth.lead":
    "Programi koji vremenom multipliciraju rezultate kroz sadržaj, SEO i performanse.",
  "services.growth.what": "Šta radimo",
  "services.growth.outcomes": "Ishodi",
  "services.growth.what.1": "Strategija sadržaja i produkcija",
  "services.growth.what.2": "Optimizacija životnog ciklusa i konverzija",
  "services.growth.what.3": "Performans marketing i eksperimenti",
  "services.growth.what.4": "Merenje i ritam izveštavanja",
  "services.growth.out.1": "Održiv saobraćaj i potražnja",
  "services.growth.out.2": "Veća aktivacija i zadržavanje",
  "services.growth.out.3": "Efikasniji CAC i miks kanala",
  "services.growth.out.4": "Točak kontinuiranog unapređenja",
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
  if (!ctx) {
    if (typeof console !== "undefined") {
      console.warn(
        "useI18n called outside I18nProvider. Falling back to default 'en'.",
      );
    }
    const t = (key: string, params?: Record<string, string | number>) => {
      let v = dictionaries.en[key] ?? key;
      if (params) {
        Object.entries(params).forEach(([k, val]) => {
          v = v.replace(new RegExp(`{${k}}`, "g"), String(val));
        });
      }
      return v;
    };
    return { lang: "en", setLang: () => {}, toggle: () => {}, t };
  }
  return ctx;
}

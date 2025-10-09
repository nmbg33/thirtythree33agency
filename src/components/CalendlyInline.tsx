import { useEffect, useRef } from "react";

type Props = {
  url?: string;
  minHeightBase?: number;
};

function ensureWidgetCss() {
  const href = "https://assets.calendly.com/assets/external/widget.css";
  const has = Array.from(document.styleSheets).some(
    // @ts-ignore
    (s) =>
      (s as any).href &&
      String((s as any).href).includes("assets.calendly.com"),
  );
  if (!has) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }
}

function loadCalendlyScript(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as any).Calendly)
      return resolve();
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="assets.calendly.com/assets/external/widget.js"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      return;
    }
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    s.onload = () => resolve();
    document.head.appendChild(s);
  });
}

function responsiveHeight(): number {
  const w = typeof window === "undefined" ? 1440 : window.innerWidth;
  if (w <= 480) return 1440; // mobile ≤480
  if (w <= 640) return 1340; // small mobile ≤640
  if (w <= 768) return 1260; // tablet portrait ≤768
  if (w <= 900) return 1180; // small laptop ≤900
  if (w <= 1024) return 1100; // tablet landscape ≤1024
  if (w <= 1280) return 1040; // laptop ≤1280
  return 980; // desktop ≥1280
}

export default function CalendlyInline({ url, minHeightBase }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const calendlyUrl = `${url?.trim() || "https://calendly.com/nemanja3975439/30min"}?hide_event_type_details=1&hide_gdpr_banner=1`;

  useEffect(() => {
    let resizeHandler: (() => void) | null = null;
    let destroyed = false;

    async function init() {
      if (!hostRef.current) return;
      ensureWidgetCss();
      await loadCalendlyScript();
      if (destroyed || !hostRef.current) return;

      const Calendly: any = (window as any).Calendly;
      // clear any prior iframe (hot reload)
      hostRef.current.querySelector("iframe")?.remove();

      const h = minHeightBase ?? responsiveHeight();
      hostRef.current.style.minHeight = `${h}px`;
      hostRef.current.style.height = `${h}px`;

      Calendly.initInlineWidget({
        url: calendlyUrl,
        parentElement: hostRef.current,
      });

      resizeHandler = () => {
        if (!hostRef.current) return;
        const rh = minHeightBase ?? responsiveHeight();
        hostRef.current.style.minHeight = `${rh}px`;
        hostRef.current.style.height = `${rh}px`;
      };
      window.addEventListener("resize", resizeHandler, { passive: true });
    }

    init();

    return () => {
      destroyed = true;
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
    };
  }, [calendlyUrl, minHeightBase]);

  return (
    <div
      id="calendly-host"
      ref={hostRef}
      style={{ width: "100%", display: "block" }}
    >
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
  );
}

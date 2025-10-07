import { useMemo } from "react";

type Logo = { src: string; alt: string };

export default function ClientsMarquee({ logos }: { logos: Logo[] }) {
  const items = useMemo(() => [...logos, ...logos], [logos]);
  return (
    <div className="overflow-hidden py-12 border-t border-b border-gray-200 bg-white">
      <div className="relative">
        <div className="flex gap-12 animate-marquee hover:[animation-play-state:paused]">
          {items.map((l, i) => (
            <img
              key={`${l.src}-${i}`}
              src={l.src}
              alt={l.alt}
              className="h-12 sm:h-14 md:h-16 w-auto opacity-80 grayscale hover:grayscale-0 transition duration-300"
              loading="lazy"
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          width: 200%;
          animation: marquee 30s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; transform: none; }
        }
      `}</style>
    </div>
  );
}

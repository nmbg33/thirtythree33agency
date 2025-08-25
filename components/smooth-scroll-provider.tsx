'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from 'react';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenis = useLenis();

  useEffect(() => {
    // GSAP integration
    if (typeof window !== 'undefined' && lenis) {
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }, [lenis]);

  return (
    <ReactLenis 
      root 
      options={{
        lerp: 0.1,
        duration: 1.2,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  );
}

// Hook for programmatic scrolling
export function useScrollTo() {
  const lenis = useLenis();
  
  const scrollTo = (target: string | number, options?: any) => {
    if (lenis) {
      lenis.scrollTo(target, options);
    }
  };

  return { scrollTo };
}

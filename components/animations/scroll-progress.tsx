'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollProgressProps {
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function ScrollProgress({ className = '', position = 'top' }: ScrollProgressProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;

    const element = progressRef.current;

    gsap.set(element, {
      scaleX: position === 'top' || position === 'bottom' ? 0 : 1,
      scaleY: position === 'left' || position === 'right' ? 0 : 1,
      transformOrigin: 'left center'
    });

    gsap.to(element, {
      scaleX: position === 'top' || position === 'bottom' ? 1 : 1,
      scaleY: position === 'left' || position === 'right' ? 1 : 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [position]);

  const positionClasses = {
    top: 'fixed top-0 left-0 w-full h-1 z-50',
    bottom: 'fixed bottom-0 left-0 w-full h-1 z-50',
    left: 'fixed top-0 left-0 w-1 h-full z-50',
    right: 'fixed top-0 right-0 w-1 h-full z-50'
  };

  return (
    <div 
      ref={progressRef}
      className={`bg-accent ${positionClasses[position]} ${className}`}
    />
  );
}

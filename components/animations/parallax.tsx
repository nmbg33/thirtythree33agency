'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  trigger?: string;
}

export function Parallax({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = '',
  trigger
}: ParallaxProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const triggerElement = trigger ? document.querySelector(trigger) : element;

    let xPercent = 0;
    let yPercent = 0;

    if (direction === 'up') yPercent = -100 * speed;
    if (direction === 'down') yPercent = 100 * speed;
    if (direction === 'left') xPercent = -100 * speed;
    if (direction === 'right') xPercent = 100 * speed;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    tl.to(element, {
      xPercent: xPercent,
      yPercent: yPercent,
      ease: 'none'
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [speed, direction, trigger]);

  return (
    <div ref={elementRef} className={`parallax-container ${className}`}>
      {children}
    </div>
  );
}

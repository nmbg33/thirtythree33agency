'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '@/lib/split-text';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animationType?: 'slide' | 'fade' | 'scale';
  trigger?: 'scroll' | 'load';
}

export function TextReveal({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 1,
  animationType = 'slide',
  trigger = 'scroll'
}: TextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;
    
    // Split text into lines and characters
    const splitText = new SplitText(element, { 
      type: 'lines,chars',
      linesClass: 'line',
      charsClass: 'char'
    });

    // Set initial state
    gsap.set(splitText.chars, {
      y: animationType === 'slide' ? '100%' : 0,
      opacity: animationType === 'fade' ? 0 : 1,
      scale: animationType === 'scale' ? 0 : 1,
    });

    const animation = gsap.timeline({
      paused: trigger === 'scroll'
    });

    animation.to(splitText.chars, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: duration,
      ease: 'power3.out',
      stagger: 0.02,
      delay: delay
    });

    if (trigger === 'scroll') {
      ScrollTrigger.create({
        trigger: element,
        start: 'top 80%',
        onEnter: () => animation.play(),
        once: true
      });
    } else {
      animation.play();
    }

    return () => {
      splitText.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [delay, duration, animationType, trigger]);

  return (
    <div ref={textRef} className={`text-reveal ${className}`}>
      {children}
    </div>
  );
}

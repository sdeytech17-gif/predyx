'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/app/hooks/usePrefersReducedMotion';
import styles from './ScrollProgress.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return;

    const bar = barRef.current;
    if (!bar) return;

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.set(bar, {
          scaleX: self.progress,
          transformOrigin: 'left center',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={barRef}
      className={styles.progressBar}
      aria-hidden="true"
    />
  );
};

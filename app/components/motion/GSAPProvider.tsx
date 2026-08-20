'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/app/hooks/usePrefersReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPContextType {
  isReady: boolean;
  prefersReducedMotion: boolean;
}

const GSAPContext = createContext<GSAPContextType>({
  isReady: false,
  prefersReducedMotion: false,
});

export const useGSAPContext = () => useContext(GSAPContext);

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      if (prefersReducedMotion) {
        gsap.globalTimeline.timeScale(0);
        ScrollTrigger.getAll().forEach(trigger => trigger.disable());
      } else {
        gsap.globalTimeline.timeScale(1);
        ScrollTrigger.getAll().forEach(trigger => trigger.enable());
      }

      ScrollTrigger.defaults({
        markers: false,
      });

      const handleLoad = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener('load', handleLoad);

      setIsReady(true);

      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }
  }, [prefersReducedMotion]);

  return (
    <GSAPContext.Provider value={{ isReady, prefersReducedMotion }}>
      {children}
    </GSAPContext.Provider>
  );
}

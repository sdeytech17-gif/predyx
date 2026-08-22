'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CaretRight, Compass, Pulse, Brain, Crosshair } from '@phosphor-icons/react';
import { Button } from '@/app/components/ui/Button/Button';
import { Tag } from '@/app/components/ui/Tag/Tag';
import { usePrefersReducedMotion } from '@/app/hooks/usePrefersReducedMotion';
import styles from './HeroSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const tiltCardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // 1. Multi-Depth GSAP Scroll Parallax
  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return;

    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      // Layer 1: Background Parallax (depth 0.1 - subtle shift)
      const bgLayer = hero.querySelector('[data-parallax-depth="0.1"]');
      if (bgLayer) {
        gsap.to(bgLayer, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Layer 2: Floating HUD Brackets (depth 0.4 - moderate shift)
      const hudLayer = hero.querySelector('[data-parallax-depth="0.4"]');
      if (hudLayer) {
        gsap.to(hudLayer, {
          y: -100,
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: '60% top',
            scrub: true,
          },
        });
      }

      // Layer 3: Main Headline & Title (depth 0.7 - fast shift with scale and fade)
      const headlineLayer = hero.querySelector('[data-parallax-depth="0.7"]');
      if (headlineLayer) {
        gsap.to(headlineLayer, {
          y: -160,
          opacity: 0,
          scale: 0.95,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: '45% top',
            scrub: true,
          },
        });
      }

      // Layer 4: Content CTAs & Telemetry Bar (depth 1.0 - fastest exit)
      const contentLayer = hero.querySelector('[data-parallax-depth="1.0"]');
      if (contentLayer) {
        gsap.to(contentLayer, {
          y: -240,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: '15% top',
            end: '65% top',
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // 2. Interactive Pointer Perspective Tilt on Desktop
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion || !tiltCardRef.current || window.innerWidth < 1024) return;
      const hero = heroRef.current;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(tiltCardRef.current, {
        rotationY: x * 8,
        rotationX: -y * 8,
        transformPerspective: 1000,
        ease: 'power2.out',
        duration: 0.6,
      });
    },
    [prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    if (tiltCardRef.current) {
      gsap.to(tiltCardRef.current, {
        rotationY: 0,
        rotationX: 0,
        ease: 'power2.out',
        duration: 0.8,
      });
    }
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="PREDYX Platform Introduction"
    >
      {/* Layer 1: Background Parallax (depth 0.1) */}
      <div className={styles.bgLayer} data-parallax-depth="0.1">
        <div className={styles.imageContainer}>
          <Image
            src="/images/predyx_hero_marketing_1787037328660.jpg"
            alt="Cinematic athlete preparing for high-performance training with precision biomechanics"
            fill
            priority
            className={styles.heroImage}
            sizes="100vw"
          />
          <div className={styles.overlay} />
        </div>
      </div>

      {/* Layer 2: Grid Pattern HUD Brackets (depth 0.4) */}
      <div className={styles.hudOverlay} data-parallax-depth="0.4" aria-hidden="true">
        <div className={styles.cornerTL} />
        <div className={styles.cornerTR} />
        <div className={styles.cornerBL} />
        <div className={styles.cornerBR} />
        <div className={styles.crosshairCenter}>
          <Crosshair size={24} className={styles.hudCrosshair} />
        </div>
      </div>

      {/* Layer 3 & 4: Interactive Perspective Content Container */}
      <div ref={tiltCardRef} className={`container ${styles.contentWrapper}`}>
        {/* Layer 3: Main Headline & Wordmark (depth 0.7) */}
        <div className={styles.headlineBlock} data-parallax-depth="0.7">
          <div className={styles.metaHeader}>
            <Tag variant="amber">SYSTEM INITIALIZED</Tag>
            <span className={styles.protocolId}>PROTOCOL SPEC // APEX-01</span>
          </div>

          <h1 className={styles.title}>
            PRECISION HUMAN
            <span className={styles.titleAccent}> PERFORMANCE</span>
          </h1>
        </div>

        {/* Layer 4: Subtitle, CTAs, and Telemetry (depth 1.0) */}
        <div className={styles.bodyBlock} data-parallax-depth="1.0">
          <p className={styles.subtitle}>
            A cinematic, technology-driven fitness platform engineered for elite exercise education, interactive 3D biomechanics, and intelligent performance telemetry.
          </p>

          <div className={styles.ctaGroup}>
            <Button
              size="lg"
              variant="primary"
              icon={<CaretRight weight="bold" />}
              onClick={() => scrollToSection('programs')}
            >
              Explore Training Programs
            </Button>
            <Button
              size="lg"
              variant="secondary"
              icon={<Compass weight="bold" />}
              iconPosition="left"
              onClick={() => scrollToSection('anatomy')}
            >
              Interactive 3D Anatomy
            </Button>
          </div>

          {/* System Spec Telemetry Bar */}
          <div className={styles.telemetryBar}>
            <div className={styles.telemetryItem}>
              <Pulse className={styles.telemetryIcon} weight="duotone" />
              <div>
                <div className={styles.telemetryLabel}>TRAINING SYSTEM</div>
                <div className={styles.telemetryValue}>PERIODIZED PROGRESSION</div>
              </div>
            </div>

            <div className={styles.telemetryDivider} />

            <div className={styles.telemetryItem}>
              <Brain className={styles.telemetryIcon} weight="duotone" />
              <div>
                <div className={styles.telemetryLabel}>3D ANATOMY VIEWER</div>
                <div className={styles.telemetryValue}>WEBGL AGONIST SHADER</div>
              </div>
            </div>

            <div className={styles.telemetryDivider} />

            <div className={styles.telemetryItem}>
              <div className={styles.telemetryDot} />
              <div>
                <div className={styles.telemetryLabel}>ENGINE STATE</div>
                <div className={styles.telemetryValue}>APEX PRECISION V1.0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

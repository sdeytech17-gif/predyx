'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CaretRight, Compass, Pulse, Brain } from '@phosphor-icons/react';
import { Button } from '@/app/components/ui/Button/Button';
import { Tag } from '@/app/components/ui/Tag/Tag';
import { usePrefersReducedMotion } from '@/app/hooks/usePrefersReducedMotion';
import styles from './HeroSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return;

    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      // Parallax scroll on multi-depth layers
      const layers = hero.querySelectorAll('[data-parallax-depth]');
      layers.forEach((layer) => {
        const depth = parseFloat((layer as HTMLElement).dataset.parallaxDepth ?? '0.5');
        gsap.to(layer, {
          y: () => -(180 * (1 - depth)),
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Wordmark and headline fade out during scroll exit
      const headlineLayer = hero.querySelector('[data-parallax-depth="0.7"]');
      if (headlineLayer) {
        gsap.to(headlineLayer, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: '45% top',
            scrub: true,
          },
        });
      }

      // Content & CTAs fade out slightly later
      const contentLayer = hero.querySelector('[data-parallax-depth="0.9"]');
      if (contentLayer) {
        gsap.to(contentLayer, {
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className={styles.hero} aria-label="PREDYX Platform Introduction">
      {/* Layer 1: Background Parallax (depth 0.2) */}
      <div className={styles.bgLayer} data-parallax-depth="0.2">
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

      {/* Grid Pattern HUD overlay */}
      <div className={styles.hudOverlay} aria-hidden="true">
        <div className={styles.cornerTL} />
        <div className={styles.cornerTR} />
        <div className={styles.cornerBL} />
        <div className={styles.cornerBR} />
      </div>

      {/* Layer 2: Main Headline & Wordmark (depth 0.7) */}
      <div className={`container ${styles.contentWrapper}`}>
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

        {/* Layer 3: Subtitle, CTAs, and Telemetry (depth 0.9) */}
        <div className={styles.bodyBlock} data-parallax-depth="0.9">
          <p className={styles.subtitle}>
            A cinematic, technology-driven fitness and wellness platform engineered for elite exercise education, dynamic biomechanics, and intelligent performance tracking.
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
              2.5D Anatomy Engine
            </Button>
          </div>

          {/* System Spec Badges */}
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
                <div className={styles.telemetryLabel}>ANATOMY VIEWER</div>
                <div className={styles.telemetryValue}>LAYERED BIOMECHANICS</div>
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


'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Barbell, Gauge, Cpu, CheckCircle } from '@phosphor-icons/react';
import { Tag } from '@/app/components/ui/Tag/Tag';
import { usePrefersReducedMotion } from '@/app/hooks/usePrefersReducedMotion';
import styles from './FeatureSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeatureItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  accent: 'amber' | 'steel';
}

const features: FeatureItem[] = [
  {
    id: 'exercise-education',
    badge: 'PILLAR 01 // BIOMECHANICS',
    title: 'Kinematic Exercise Education',
    subtitle: 'Dynamic anatomical breakdown with primary and synergist muscle targeting.',
    description: 'Master compound and isolation movements through high-fidelity visual instruction, joint plane trajectories, and neuromuscular focus points.',
    bullets: [
      'Layered anatomical muscle group activation',
      'Joint angle and movement plane cues',
      'Tempo and eccentric cadence guidance'
    ],
    image: '/images/predyx_feature_exercise_education_1787037651610.jpg',
    imageAlt: 'High-detail exercise education interface showing muscular activation and movement cues',
    accent: 'amber'
  },
  {
    id: 'training-programs',
    badge: 'PILLAR 02 // ARCHITECTURE',
    title: 'Engineered Training Programs',
    subtitle: 'Periodized meso-cycles tailored for powerbuilding, hypertrophy, and conditioning.',
    description: 'Structured workout protocols built on scientific progression models. Track progressive overload with calibrated volume landmarks.',
    bullets: [
      '4-week to 12-week structured meso-cycles',
      'Autoregulated RPE and percentage-based loading',
      'Targeted recovery and deload frameworks'
    ],
    image: '/images/predyx_feature_programs_1787037725142.jpg',
    imageAlt: 'PREDYX training program selection dashboard with structured workout blocks',
    accent: 'steel'
  },
  {
    id: 'progress-tracking',
    badge: 'PILLAR 03 // TELEMETRY',
    title: 'Precision Performance Telemetry',
    subtitle: 'Frictionless set logging with automated rest intervals and volume analytics.',
    description: 'Log weight, reps, and RPE with touch-optimized controls designed for intense workouts. Visualize historical strength curves and PR milestones.',
    bullets: [
      'In-session set row verification with 56dp targets',
      'Automated synchronized rest countdown HUD',
      'Session persistence with zero-data-loss storage'
    ],
    image: '/images/predyx_feature_progress_1787037995920.jpg',
    imageAlt: 'PREDYX performance telemetry dashboard displaying strength progress and session logs',
    accent: 'amber'
  }
];

export const FeatureSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('[data-feature-card]');
      if (!cards?.length) return;

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="features" ref={sectionRef} className={styles.section} aria-label="Core Feature Pillars">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.tagWrapper}>
            <Tag variant="amber">PLATFORM CAPABILITIES</Tag>
          </div>
          <h2 className={styles.sectionTitle}>
            ENGINEERED FOR <span className={styles.highlight}>PRECISION</span>
          </h2>
          <p className={styles.sectionDesc}>
            Built on a four-tier motion architecture and rigorous biomechanical principles to deliver high-performance athletic training.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((item) => (
            <article
              key={item.id}
              className={`${styles.card} ${prefersReducedMotion ? styles.cardStatic : ''}`}
              data-feature-card
            >
              <div className={styles.imageFrame}>
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={styles.imageOverlay} />
                <div className={styles.cardBadge}>
                  <Tag variant={item.accent === 'amber' ? 'amber' : 'steel'}>
                    {item.badge}
                  </Tag>
                </div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardSubtitle}>{item.subtitle}</p>
                <p className={styles.cardDesc}>{item.description}</p>

                <ul className={styles.bulletList}>
                  {item.bullets.map((bullet, idx) => (
                    <li key={idx} className={styles.bulletItem}>
                      <CheckCircle
                        className={item.accent === 'amber' ? styles.checkAmber : styles.checkSteel}
                        weight="fill"
                        size={16}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};


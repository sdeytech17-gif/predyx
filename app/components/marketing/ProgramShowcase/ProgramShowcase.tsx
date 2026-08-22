'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Calendar, Barbell, Fire, Sparkle, ArrowRight } from '@phosphor-icons/react';
import { Tag } from '@/app/components/ui/Tag/Tag';
import { Button } from '@/app/components/ui/Button/Button';
import { usePrefersReducedMotion } from '@/app/hooks/usePrefersReducedMotion';
import styles from './ProgramShowcase.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProgramData {
  id: string;
  title: string;
  duration: string;
  frequency: string;
  focus: string;
  level: string;
  description: string;
  image: string;
  accent: 'amber' | 'steel';
}

const programsList: ProgramData[] = [
  {
    id: 'powerbuilding',
    title: '12-Week Powerbuilding',
    duration: '12 Weeks',
    frequency: '4 Days / Week',
    focus: 'Peak Strength & Hypertrophy',
    level: 'Advanced',
    description: 'Synchronized compound overload paired with targeted hypertrophy accessory protocols for maximal power output.',
    image: '/images/predyx_cover_powerbuilding_1787038184309.jpg',
    accent: 'amber',
  },
  {
    id: 'hypertrophy',
    title: '6-Week Hypertrophy Foundation',
    duration: '6 Weeks',
    frequency: '5 Days / Week',
    focus: 'Muscle Cross-Sectional Area',
    level: 'Intermediate',
    description: 'High-volume regional hypertrophy targeting high mechanical tension and optimized stimulus-to-fatigue ratios.',
    image: '/images/predyx_cover_hypertrophy_1787038197997.jpg',
    accent: 'amber',
  },
  {
    id: 'conditioning',
    title: '4-Week Conditioning Block',
    duration: '4 Weeks',
    frequency: '3 Days / Week',
    focus: 'Work Capacity & Density',
    level: 'All Levels',
    description: 'High-density metabolic conditioning designed to elevate anaerobic threshold and sustain high-output training capacity.',
    image: '/images/predyx_cover_conditioning_1787038309261.jpg',
    accent: 'steel',
  },
  {
    id: 'strength-foundations',
    title: '8-Week Strength Foundations',
    duration: '8 Weeks',
    frequency: '3 Days / Week',
    focus: 'Kinematic Compound Mechanics',
    level: 'Beginner to Intermediate',
    description: 'Linear progression protocol focused on movement efficiency, core stability, and barbell mechanics mastery.',
    image: '/images/predyx_cover_strength_foundations_1787038665302.jpg',
    accent: 'amber',
  },
  {
    id: 'mobility',
    title: 'Mobility & Joint Architecture',
    duration: 'Ongoing',
    frequency: 'Daily Routine',
    focus: 'Joint Articulation & Tissue Health',
    level: 'All Levels',
    description: 'Active joint mobility protocols and end-range loading to preserve structural health and maximize active range.',
    image: '/images/predyx_cover_mobility_1787038323008.jpg',
    accent: 'steel',
  },
];

export const ProgramShowcase: React.FC = () => {
  const showcaseRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !isDesktop || typeof window === 'undefined') return;

    const track = trackRef.current;
    const showcase = showcaseRef.current;
    if (!track || !showcase) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - showcase.offsetWidth + 64;

      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: showcase,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, showcaseRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, isDesktop]);

  const useHorizontalPin = isDesktop && !prefersReducedMotion;

  return (
    <section
      id="programs"
      ref={showcaseRef}
      className={`${styles.showcase} ${!useHorizontalPin ? styles.showcaseReduced : ''}`}
      aria-label="Training Programs Showcase"
    >
      <div className={styles.introBlock}>
        <div className="container">
          <div className={styles.header}>
            <Tag variant="amber">TRAINING ROSTER</Tag>
            <h2 className={styles.sectionTitle}>
              ENGINEERED <span className={styles.highlight}>PROGRAMS</span>
            </h2>
            <p className={styles.sectionDesc}>
              Scientifically periodized training blueprints constructed with calibrated volume, auto-regulated intensity, and targeted progression.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.viewportWrapper}>
        <div
          ref={trackRef}
          className={`${styles.track} ${!useHorizontalPin ? styles.trackVertical : ''}`}
        >
          {programsList.map((program) => (
            <article
              key={program.id}
              className={styles.card}
              aria-label={`Program: ${program.title}`}
            >
              <div className={styles.cardCover}>
                <Image
                  src={program.image}
                  alt={`Cover artwork for ${program.title}`}
                  fill
                  className={styles.cardImage}
                  sizes="(max-width: 768px) 100vw, 420px"
                />
                <div className={styles.cardCoverOverlay} />
                <div className={styles.cardBadge}>
                  <Tag variant={program.accent === 'amber' ? 'amber' : 'steel'}>
                    {program.level}
                  </Tag>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.metaRow}>
                  <span className={styles.metaItem}>
                    <Clock size={14} className={styles.metaIcon} />
                    {program.duration}
                  </span>
                  <span className={styles.metaDivider}>·······</span>
                  <span className={styles.metaItem}>
                    <Calendar size={14} className={styles.metaIcon} />
                    {program.frequency}
                  </span>
                </div>

                <h3 className={styles.cardTitle}>{program.title}</h3>
                <div className={styles.focusTag}>
                  <span className={styles.focusLabel}>FOCUS:</span> {program.focus}
                </div>
                <p className={styles.cardDesc}>{program.description}</p>

                <div className={styles.cardFooter}>
                  <Button
                    size="sm"
                    variant="amber-outline"
                    icon={<ArrowRight />}
                    fullWidth
                    onClick={() => {
                      alert(`Program selected: ${program.title}`);
                    }}
                  >
                    View Program Specs
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};



'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Crosshair, Shield, Info } from '@phosphor-icons/react';
import { Tag } from '@/app/components/ui/Tag/Tag';
import { Button } from '@/app/components/ui/Button/Button';
import { usePrefersReducedMotion } from '@/app/hooks/usePrefersReducedMotion';
import styles from './EducationPreview.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface MuscleData {
  id: string;
  name: string;
  role: 'PRIMARY' | 'SYNERGIST' | 'STABILIZER';
  movementPlane: string;
  activationCue: string;
  loadProtocol: string;
  relativePosition: { top: string; left: string };
}

const muscleGroups: MuscleData[] = [
  {
    id: 'quads',
    name: 'Quadriceps Femoris',
    role: 'PRIMARY',
    movementPlane: 'Sagittal (Knee Extension)',
    activationCue: 'Drive through midfoot, maintain vertical torso alignment.',
    loadProtocol: 'Hypertrophy / 70-85% 1RM',
    relativePosition: { top: '58%', left: '46%' },
  },
  {
    id: 'glutes',
    name: 'Gluteus Maximus',
    role: 'PRIMARY',
    movementPlane: 'Sagittal (Hip Extension)',
    activationCue: 'Initiate hip hinge with neutral pelvic tilt at lockout.',
    loadProtocol: 'Peak Force / RPE 8-9',
    relativePosition: { top: '50%', left: '56%' },
  },
  {
    id: 'core',
    name: 'Transverse Abdominis & Erector Spinae',
    role: 'STABILIZER',
    movementPlane: 'Multi-Planar Bracing',
    activationCue: 'Intra-abdominal pressure bracing against lumbar spine.',
    loadProtocol: 'Isometric Anti-Flexion',
    relativePosition: { top: '42%', left: '50%' },
  },
  {
    id: 'deltoids',
    name: 'Deltoid Complex & Upper Trapezius',
    role: 'SYNERGIST',
    movementPlane: 'Frontal / Scapular Plane',
    activationCue: 'Pack scapulae and engage serratus anterior throughout press.',
    loadProtocol: 'Auxiliary Stability / RPE 7-8',
    relativePosition: { top: '24%', left: '52%' },
  },
];

export const EducationPreview: React.FC = () => {
  const educationRef = useRef<HTMLElement>(null);
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleData>(muscleGroups[0]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return;

    const education = educationRef.current;
    if (!education) return;

    const ctx = gsap.context(() => {
      const layers = education.querySelectorAll('[data-edu-depth]');
      layers.forEach((layer) => {
        const depth = parseFloat((layer as HTMLElement).dataset.eduDepth ?? '0.5');
        gsap.to(layer, {
          y: () => -(60 * (1 - depth)),
          ease: 'none',
          scrollTrigger: {
            trigger: education,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, educationRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="anatomy"
      ref={educationRef}
      className={styles.section}
      aria-label="2.5D Anatomy Engine Preview"
    >
      <div className="container">
        <div className={styles.header}>
          <Tag variant="steel">ANATOMICAL PRECISION</Tag>
          <h2 className={styles.sectionTitle}>
            2.5D KINEMATIC <span className={styles.highlight}>ANATOMY ENGINE</span>
          </h2>
          <p className={styles.sectionDesc}>
            High-resolution visual biomechanics mapping agonist and synergist force vectors. Understand muscular tension trajectories before initiating movement.
          </p>
        </div>

        <div className={styles.interactiveContainer}>
          {/* Main Visualizer Stage */}
          <div className={styles.stage} data-edu-depth="0.2">
            <div className={styles.imageWrapper} data-edu-depth="0.5">
              <Image
                src="/images/predyx_feature_exercise_education_1787037651610.jpg"
                alt="2.5D Anatomy visualizer display showing muscular highlight overlay"
                fill
                className={styles.stageImage}
                sizes="(max-width: 1024px) 100vw, 720px"
              />
              <div className={styles.stageOverlay} />

              {/* Interactive Muscle Pins */}
              {muscleGroups.map((muscle) => (
                <button
                  key={muscle.id}
                  className={`${styles.pin} ${selectedMuscle.id === muscle.id ? styles.pinActive : ''}`}
                  style={{ top: muscle.relativePosition.top, left: muscle.relativePosition.left }}
                  onClick={() => setSelectedMuscle(muscle)}
                  aria-label={`Select ${muscle.name}`}
                  aria-pressed={selectedMuscle.id === muscle.id}
                >
                  <span className={styles.pinDot} />
                  <span className={styles.pinRipple} />
                </button>
              ))}
            </div>

            {/* Overlaid UI HUD Card */}
            <div className={styles.hudOverlay} data-edu-depth="0.75">
              <div className={styles.hudHeader}>
                <span className={styles.hudLiveDot} />
                <span className={styles.hudStatus}>BIOMECHANIC HUD // LIVE</span>
              </div>
              <div className={styles.hudMuscleName}>{selectedMuscle.name}</div>
              <div className={styles.hudRoleBadge}>
                <Tag variant={selectedMuscle.role === 'PRIMARY' ? 'amber' : 'steel'}>
                  {selectedMuscle.role} DRIVER
                </Tag>
              </div>
            </div>
          </div>

          {/* Telemetry Information Sidebar */}
          <div className={styles.sidebar} data-edu-depth="0.9">
            <div className={styles.sidebarHeader}>
              <Crosshair size={20} className={styles.sidebarIcon} />
              <h3 className={styles.sidebarTitle}>ANALYTICAL BREAKDOWN</h3>
            </div>

            {/* Muscle Selectors */}
            <div className={styles.muscleSelectors} role="tablist" aria-label="Muscle regions">
              {muscleGroups.map((muscle) => (
                <button
                  key={muscle.id}
                  className={`${styles.muscleTab} ${selectedMuscle.id === muscle.id ? styles.muscleTabActive : ''}`}
                  onClick={() => setSelectedMuscle(muscle)}
                  role="tab"
                  aria-selected={selectedMuscle.id === muscle.id}
                >
                  <span className={styles.muscleTabName}>{muscle.name}</span>
                  <span className={styles.muscleTabRole}>{muscle.role}</span>
                </button>
              ))}
            </div>

            {/* Readout Panels */}
            <div className={styles.dataPanel}>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>KINEMATIC PLANE</span>
                <span className={styles.dataValue}>{selectedMuscle.movementPlane}</span>
              </div>

              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>LOAD PROTOCOL</span>
                <span className={styles.dataValue}>{selectedMuscle.loadProtocol}</span>
              </div>

              <div className={styles.dataCueBox}>
                <div className={styles.dataCueHeader}>
                  <Info size={16} className={styles.dataCueIcon} />
                  <span>NEUROMUSCULAR CUE</span>
                </div>
                <p className={styles.dataCueText}>{selectedMuscle.activationCue}</p>
              </div>
            </div>

            <div className={styles.sidebarFooter}>
              <Tag variant="default">WCAG 2.1 AA COMPLIANT TELEMETRY</Tag>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


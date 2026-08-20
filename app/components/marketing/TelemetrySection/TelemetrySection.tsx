'use client';

import React from 'react';
import { ShieldCheck, Cpu, Desktop, Wheelchair, Database, Lightning } from '@phosphor-icons/react';
import { Tag } from '@/app/components/ui/Tag/Tag';
import styles from './TelemetrySection.module.css';

interface ArchitectureItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
  statusTag: string;
  variant: 'amber' | 'steel';
}

const architectureSpecs: ArchitectureItem[] = [
  {
    id: 'rendering',
    icon: <Desktop size={24} />,
    label: 'DELIVERY PIPELINE',
    title: 'Static & Incremental Generation',
    description: 'Marketing and catalog routes rendered via SSG for zero layout shift (CLS < 0.1 target) and instant time-to-first-byte.',
    statusTag: 'NEXT.JS APP ROUTER',
    variant: 'amber',
  },
  {
    id: 'motion',
    icon: <Lightning size={24} />,
    label: 'MOTION ARCHITECTURE',
    title: '4-Tier Escalation Ladder',
    description: 'Hardware-accelerated CSS keyframes and GSAP ScrollTrigger contexts with strict reduced-motion overrides.',
    statusTag: 'CSS + GSAP 3.12',
    variant: 'steel',
  },
  {
    id: 'a11y',
    icon: <Wheelchair size={24} />,
    label: 'COMPLIANCE',
    title: 'WCAG 2.1 Level AA Standard',
    description: 'High-contrast typography ratios (7.2:1 to 18:1), 44dp+ touch targets, and full keyboard navigation focus boundaries.',
    statusTag: 'AA ACCESSIBLE',
    variant: 'amber',
  },
  {
    id: 'data',
    icon: <Database size={24} />,
    label: 'PERSISTENCE',
    title: 'Local-First Session Continuity',
    description: 'Active set logs and rest intervals stored securely on-device, shielding workouts against network dropouts.',
    statusTag: 'CLIENT PERSISTENCE',
    variant: 'steel',
  },
];

export const TelemetrySection: React.FC = () => {
  return (
    <section id="telemetry" className={styles.section} aria-label="System Architecture and Standards">
      <div className="container">
        <div className={styles.header}>
          <Tag variant="amber">ENGINEERING FOUNDATION</Tag>
          <h2 className={styles.sectionTitle}>
            PLATFORM <span className={styles.highlight}>ARCHITECTURE</span>
          </h2>
          <p className={styles.sectionDesc}>
            PREDYX is constructed with uncompromising engineering standards — prioritizing stability, high frame rates, accessibility, and zero-loss session tracking.
          </p>
        </div>

        <div className={styles.grid}>
          {architectureSpecs.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={item.variant === 'amber' ? styles.iconAmber : styles.iconSteel}>
                  {item.icon}
                </div>
                <Tag variant={item.variant}>{item.statusTag}</Tag>
              </div>

              <div className={styles.cardContent}>
                <span className={styles.cardLabel}>{item.label}</span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

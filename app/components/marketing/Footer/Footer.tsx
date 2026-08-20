import React from 'react';
import Link from 'next/link';
import { Tag } from '@/app/components/ui/Tag/Tag';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        {/* Safety Disclaimer Banner */}
        <div className={styles.disclaimerBox}>
          <div className={styles.disclaimerTag}>
            <Tag variant="default">FITNESS SAFETY BOUNDARY</Tag>
          </div>
          <p className={styles.disclaimerText}>
            PREDYX is a fitness and wellness technology platform designed strictly for physical training education and athletic performance tracking. PREDYX does not provide medical diagnosis, clinical advice, or treatment of injuries. Consult a qualified healthcare professional before beginning any intensive training program.
          </p>
        </div>

        {/* Main Footer Content */}
        <div className={styles.mainGrid}>
          <div className={styles.brandCol}>
            <div className={styles.brand}>
              <span className={styles.logoMark}>◆</span>
              <span className={styles.brandText}>PREDYX</span>
            </div>
            <p className={styles.brandTagline}>
              Precision Human Performance. Engineered training, biomechanic education, and dynamic telemetry.
            </p>
            <div className={styles.versionInfo}>
              <span className={styles.versionLabel}>BUILD SPEC:</span>
              <span className={styles.versionVal}>PHASE 7 // PROD-CANDIDATE</span>
            </div>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>SYSTEM</h4>
            <ul className={styles.linkList}>
              <li><Link href="#features" className={styles.link}>Core Pillars</Link></li>
              <li><Link href="#programs" className={styles.link}>Training Roster</Link></li>
              <li><Link href="#anatomy" className={styles.link}>Anatomy Engine</Link></li>
              <li><Link href="#telemetry" className={styles.link}>Architecture</Link></li>
            </ul>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>FRAMEWORK</h4>
            <ul className={styles.linkList}>
              <li><span className={styles.staticLink}>Apex Precision</span></li>
              <li><span className={styles.staticLink}>Next.js 15 App Router</span></li>
              <li><span className={styles.staticLink}>GSAP 3 Motion System</span></li>
              <li><span className={styles.staticLink}>WCAG 2.1 AA Compliant</span></li>
            </ul>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>LEGAL & SAFETY</h4>
            <ul className={styles.linkList}>
              <li><span className={styles.staticLink}>Terms of Service</span></li>
              <li><span className={styles.staticLink}>Privacy Protocol</span></li>
              <li><span className={styles.staticLink}>Accessibility Policy</span></li>
              <li><span className={styles.staticLink}>Safety Advisory</span></li>
            </ul>
          </div>
        </div>

        {/* Subfooter */}
        <div className={styles.subFooter}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} PREDYX. All rights reserved. Precision Fitness Technology.
          </p>
          <div className={styles.subStatus}>
            <span className={styles.statusIndicator} aria-hidden="true" />
            <span className={styles.statusText}>ALL SYSTEMS NOMINAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { List, X, ShieldCheck, Lightning, Eye } from '@phosphor-icons/react';
import { Button } from '@/app/components/ui/Button/Button';
import { Tag } from '@/app/components/ui/Tag/Tag';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.brand} aria-label="PREDYX Home">
          <span className={styles.logoMark}>◆</span>
          <span className={styles.brandText}>PREDYX</span>
          <span className={styles.brandBadge}>V1.0</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <Link href="#features" className={styles.navLink}>
            Pillars
          </Link>
          <Link href="#programs" className={styles.navLink}>
            Programs
          </Link>
          <Link href="#anatomy" className={styles.navLink}>
            Anatomy
          </Link>
          <Link href="#telemetry" className={styles.navLink}>
            Architecture
          </Link>
        </nav>

        <div className={styles.actions}>
          <div className={styles.systemStatus}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span className={styles.statusText}>APEX PRECISION</span>
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              const el = document.getElementById('programs');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Platform
          </Button>

          <button
            className={styles.mobileMenuToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-label="Mobile Navigation">
          <nav className={styles.mobileNavLinks}>
            <Link
              href="#features"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Pillars
            </Link>
            <Link
              href="#programs"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Programs
            </Link>
            <Link
              href="#anatomy"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Anatomy
            </Link>
            <Link
              href="#telemetry"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Architecture
            </Link>
            <div className={styles.mobileMenuCta}>
              <Button
                size="md"
                fullWidth
                variant="primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  const el = document.getElementById('programs');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Platform
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

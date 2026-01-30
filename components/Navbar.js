'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    // Light theme only
    document.documentElement.setAttribute('data-theme', 'light');

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    if (window.location.hash) {
      setActiveHash(window.location.hash);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== '/') {
      setActiveHash('');
    }
  }, [pathname]);

  const handleLinkClick = (href) => {
    setIsMenuOpen(false);
    if (href.startsWith('/#')) {
      setActiveHash(href.replace('/', ''));
    } else {
      setActiveHash('');
    }
  };

  const isLinkActive = (href) => {
    if (href.startsWith('/#')) {
      const hash = href.replace('/', '');
      return pathname === '/' && activeHash === hash;
    }
    if (href === '/') {
      return pathname === '/' && activeHash === '';
    }
    return pathname === href || (href !== '/' && pathname.startsWith(href));
  };

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'How to Use', href: '/#how-to' },
    { name: 'Features', href: '/#features' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Blog', href: '/blog' },
    { name: 'About Us', href: '/about-us' },
  ];

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : styles.transparent}`}>
        <div className={styles.container}>
          <Link href="/" className={styles.logoLink} onClick={() => handleLinkClick('/')}>
            <div className={styles.logoIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
                <path d="M448 209.9a210.1 210.1 0 0 1-122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
              </svg>
            </div>
            <span className={styles.logoText}>T-Downloader</span>
          </Link>

          <div className={styles.centerNav}>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => handleLinkClick(item.href)}
                className={`${styles.navLink} ${isLinkActive(item.href) ? styles.activeLink : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className={styles.rightActions}>
            <div className={styles.desktopActions}>
              <LanguageSelector />
            </div>

            <button
              className={`${styles.mobileMenuBtn} ${isMenuOpen ? styles.menuActive : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`${styles.mobileNavOverlay} ${isMenuOpen ? styles.mobileNavOpen : ''}`}>
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`${styles.mobileNavLink} ${isLinkActive(item.href) ? styles.activeMobileLink : ''}`}
            onClick={() => handleLinkClick(item.href)}
          >
            {item.name}
          </Link>
        ))}
        <div className={styles.mobileActions}>
          <LanguageSelector />
        </div>
      </div>
    </>
  );
}

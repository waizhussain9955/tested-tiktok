'use client';

import { useState } from 'react';
import styles from './LanguageSelector.module.css';

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');

  const languages = ['English', 'Español', 'Urdu'];

  const toggleOpen = () => setIsOpen(!isOpen);

  // Close on blur with delay to allow click event to register
  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={toggleOpen}
        onBlur={handleBlur}
        aria-label="Select Language"
        type="button"
      >
        <span>{currentLang}</span>
        <svg className={styles.icon} viewBox="0 0 10 6" fill="currentColor">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </button>

      <div className={`${styles.dropdown} ${isOpen ? styles.open : ''}`}>
        {languages.map((lang) => (
          <button
            key={lang}
            className={`${styles.option} ${currentLang === lang ? styles.active : ''}`}
            onClick={() => {
              setCurrentLang(lang);
              setIsOpen(false);
            }}
            type="button"
          >
            {lang}
          </button>
        ))}
      </div>
    </div>
  );
}

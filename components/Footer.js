import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.siteFooter}>
      <div className="container">
        <div className={styles.footerContent}>

          <div className="footer-brand">
            <span className={styles.footerLogo}>T-Downloader</span>
            <p className={styles.footerDesc}>
              The fastest way to download TikTok videos without watermark.
              HD quality, secure, and always free.
            </p>
          </div>

          <div className={styles.footerLinksGroup}>
            <h4>Quick Links</h4>
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about-us">About Us</Link>
          </div>

          <div className={styles.footerLinksGroup}>
            <h4>Legal</h4>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/dmca">DMCA</Link>
          </div>

        </div>

        <div className={styles.footerBottom}>
          <p>© {currentYear} Tik-TokDownloader.xyz. All rights reserved.</p>
          <div className="footer-socials">
            {/* Socials removed for cleanliness as requested */}
          </div>
        </div>
      </div>
    </footer>
  );
}

import VideoDownloader from '@/components/VideoDownloader';

export const metadata = {
    title: 'TikTok Video Downloader – Free HD Quality & No Watermark | Tik-TokDownloader.xyz',
    description: 'Free TikTok video downloader to download HD videos without watermark. Fast, safe, and easy TikTok downloader online at Tik-TokDownloader.xyz.',
};

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section className="hero" id="converter">
                <div className="container">
                    <h1 className="hero-title">
                        TikTok Video Downloader
                    </h1>
                    <p className="hero-subtitle">
                        Free HD quality and no watermark. High-speed downloading directly from your browser.
                    </p>

                    <div className="converter-container">
                        <VideoDownloader />
                    </div>

                    <p style={{ marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        Trusted by content creators worldwide. 100% Secure.
                    </p>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="content-section bg-muted">
                <div className="container">
                    <div className="card" style={{ padding: '3rem' }}>
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
                            <div style={{ width: '64px', height: '64px', background: 'var(--primary)', color: '#fff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyCenter: 'center', flexShrink: 0 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="2rem" viewBox="0 0 448 512" fill="currentColor" style={{ margin: 'auto' }}>
                                    <path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z" />
                                </svg>
                            </div>
                            <h2 style={{ fontSize: '2rem', margin: 0 }}>
                                Professional TikTok Download Solution
                            </h2>
                        </div>
                        <div style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                            <p style={{ marginBottom: '1.5rem' }}>
                                TikTok has become a primary hub for global creative content. Whether for marketing, education, or entertainment, the need for high-quality, watermark-free video is essential for creators. Our tool provides a streamlined, professional way to access your favorite content in its original quality.
                            </p>
                            <p>
                                <strong>Tik-TokDownloader.xyz</strong> is engineered for speed and reliability. No registration, no installation, just a clean interface for a seamless workflow.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features & FAQ */}
            <section className="content-section">
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem' }}>Key Platform Benefits</h2>
                    <div className="grid-features">
                        <div className="feature-card">
                            <h3>High Definition</h3>
                            <p>Support for HD, Full HD, and 4K resolutions. Get the best possible version of every video.</p>
                        </div>
                        <div className="feature-card">
                            <h3>No Watermark</h3>
                            <p>Clean videos without the TikTok logo or username, perfect for content repurposing.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Safe & Private</h3>
                            <p>We do not store your data or track your downloads. Your privacy is our top priority.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="content-section bg-muted">
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem' }}>How to Download</h2>
                    <div className="grid-features">
                        <div className="feature-card" style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>01</div>
                            <p>Copy the TikTok video link</p>
                        </div>
                        <div className="feature-card" style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>02</div>
                            <p>Paste URL into the downloader</p>
                        </div>
                        <div className="feature-card" style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>03</div>
                            <p>Select your preferred quality</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="content-section">
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '2rem' }}>Frequently Asked Questions</h2>
                    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="card" style={{ padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Is this service free?</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Yes, our TikTok video downloader is 100% free to use for everyone with no hidden charges.</p>
                        </div>
                        <div className="card" style={{ padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Do I need to install anything?</h3>
                            <p style={{ color: 'var(--text-muted)' }}>No installation is required. The tool works directly in your web browser on mobile and desktop.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="hero" style={{ padding: '6rem 0' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Start Downloading Now</h2>
                    <p className="hero-subtitle">The fastest way to download TikTok videos in HD.</p>
                    <a href="#converter" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}>
                        Go to Tool
                    </a>
                </div>
            </section>
        </>
    );
}

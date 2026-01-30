import VideoDownloader from '@/components/VideoDownloader';

export const metadata = {
    title: 'TTK – Fast & Free TikTok Video Downloader Online by Link',
    description: 'Fast and free TikTok video downloader to save HD videos without watermark. Download TikTok videos online by link in seconds.',
    alternates: {
        canonical: 'https://tik-tokdownloader.xyz',
    }
};

export default function Home() {
    return (
        <>
            {/* Hero Section: Properly Centered and Balanced */}
            <section className="hero" id="converter">
                <div className="container hero-content">
                    <span className="badge">100% Free & Secure</span>
                    <h1 className="hero-title">
                        Free TikTok Video Downloader <br />
                        <span style={{ color: 'var(--primary)' }}>Fast, HD & No Watermark</span>
                    </h1>
                    <p className="hero-subtitle mx-auto">
                        A reliable TikTok video downloader online that helps you save TikTok videos in high quality, without watermarks, and without requiring a login.
                    </p>

                    <div className="converter-container text-left">
                        <VideoDownloader />
                    </div>

                    <p className="mt-4" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '2rem' }}>
                        Trusted by content creators. No software installation needed.
                    </p>
                </div>
            </section>

            {/* Intro Section: Clear starting point, consistent padding */}
            <section className="section section-bg">
                <div className="container">
                    <div className="card" style={{ border: 'none', boxShadow: 'var(--shadow)' }}>
                        <p>
                            If you've ever tried to save a TikTok video for later, you've probably noticed that annoying watermark stamped across the screen. Whether you're a content creator looking to repurpose videos, a marketer building a portfolio, or simply someone who wants to save memorable moments without that distracting logo, you're in the right place.
                        </p>
                        <p className="mb-0">
                            TikTok does not provide a built-in option to download videos without a watermark, and that’s where a powerful TikTok video downloader like TTK Downloader becomes essential. Our tool is engineered for precision, speed, and ease of use.
                        </p>
                    </div>
                </div>
            </section>

            {/* What is Section: Balanced Grid */}
            <section className="section">
                <div className="container">
                    <div style={{ maxWidth: '800px' }}>
                        <h2>What Is a TikTok Video Downloader?</h2>
                        <p>
                            A TikTok video downloader is an online tool that allows users to download TikTok videos directly to their device using a video link. Instead of saving videos with TikTok branding, a high-quality downloader removes the watermark and preserves the original resolution.
                        </p>
                    </div>

                    <div className="grid grid-2" style={{ marginTop: '3rem' }}>
                        <div className="card">
                            <h3>Key Capabilities</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                <li className="mb-3">✓ Pro-quality TikTok downloads without watermarks</li>
                                <li className="mb-3">✓ Original HD resolution preserved for all files</li>
                                <li className="mb-3">✓ Instant processing via video link</li>
                                <li className="mb-3">✓ Native support for mobile, tablet, and desktop</li>
                                <li className="mb-3">✓ Automatic profile data retrieval (likes & followers)</li>
                            </ul>
                        </div>
                        <div className="card" style={{ background: 'var(--primary-soft)', border: 'none' }}>
                            <p style={{ margin: 0, fontWeight: 500, color: 'var(--primary)' }}>
                                TTK Downloader is designed to bridge the gap between TikTok's limited in-app functions and the high-standard assets professionals require.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Section: Row 1 (3 items), Row 2 (2 items) CENTERED */}
            <section className="section section-bg">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '4rem' }}>
                        <h2>Why Choose TTK Downloader?</h2>
                        <p className="mx-auto">
                            Built to outperform competitors by focusing on speed, simplicity, and quality. Here’s why users prefer our professional toolkit:
                        </p>
                    </div>

                    <div className="why-choose-grid">
                        {/* Row 1: 3 Boxes */}
                        <div className="grid-item-3">
                            <div className="card text-center">
                                <h3>No Watermark</h3>
                                <p className="mx-auto" style={{ fontSize: '0.9rem' }}>Clean branding-free videos, perfect for professional distribution.</p>
                            </div>
                        </div>
                        <div className="grid-item-3">
                            <div className="card text-center">
                                <h3>HD Quality</h3>
                                <p className="mx-auto" style={{ fontSize: '0.9rem' }}>We extract the original clear stream to maintain high visual fidelity.</p>
                            </div>
                        </div>
                        <div className="grid-item-3">
                            <div className="card text-center">
                                <h3>No Login Required</h3>
                                <p className="mx-auto" style={{ fontSize: '0.9rem' }}>Your data stays with you. No sign-up or TikTok login needed.</p>
                            </div>
                        </div>

                        {/* Row 2: 2 Boxes (using the same grid system) */}
                        <div className="grid-item-2">
                            <div className="card text-center">
                                <h3>Fast & Secure</h3>
                                <p className="mx-auto" style={{ fontSize: '0.9rem' }}>Instant server-side processing with zero data storage logs.</p>
                            </div>
                        </div>
                        <div className="grid-item-2">
                            <div className="card text-center">
                                <h3>Cross-Device</h3>
                                <p className="mx-auto" style={{ fontSize: '0.9rem' }}>Seamless performance across iOS, Android, Windows, and macOS.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Step-by-Step Section */}
            <section className="section">
                <div className="container">
                    <h2 style={{ marginBottom: '3rem' }}>How to Use (Step-by-Step)</h2>
                    <div className="grid grid-2">
                        <div className="card" style={{ border: 'none', padding: 0 }}>
                            <div style={{ marginBottom: '2.5rem' }}>
                                <h3 style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--primary)', marginRight: '1rem' }}>01.</span> Find Your Video
                                </h3>
                                <p style={{ fontSize: '0.95rem' }}>Open TikTok on your web browser or mobile app and locate the clip you want.</p>
                            </div>
                            <div style={{ marginBottom: '2.5rem' }}>
                                <h3 style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--primary)', marginRight: '1rem' }}>02.</span> Copy the Link
                                </h3>
                                <p style={{ fontSize: '0.95rem' }}>Select "Copy Link" from the Share menu or copy the address bar URL.</p>
                            </div>
                            <div style={{ marginBottom: '2.5rem' }}>
                                <h3 style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--primary)', marginRight: '1rem' }}>03.</span> Paste & Save
                                </h3>
                                <p style={{ fontSize: '0.95rem' }}>Paste the link into TTK Downloader and hit the download button to finish.</p>
                            </div>
                        </div>
                        <div className="card bg-subtle" style={{ border: 'none', justifyContent: 'center' }}>
                            <h3 className="text-center">No App Needed</h3>
                            <p className="mx-auto text-center" style={{ fontSize: '0.9rem' }}>
                                Unlike most tools, we work entirely online. No installations, no risk, no hassle. Directly in your browser.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="section section-bg">
                <div className="container text-center">
                    <h2>Ready to Experience Clean TikTok Downloads?</h2>
                    <p className="mx-auto" style={{ marginBottom: '2.5rem' }}>
                        Searching for a reliable and fast TikTok video downloader? TTK Downloader is the best choice for speed, quality, and complete freedom.
                    </p>
                    <a href="#converter" className="btn">Get Started Now</a>
                </div>
            </section>

            {/* FAQ: Balanced list */}
            <section className="section" id="faq">
                <div className="container">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-group">
                        <div className="faq-item">
                            <h3>How do I use TTK Downloader?</h3>
                            <p style={{ fontSize: '0.95rem', margin: 0 }}>Simply copy the TikTok video link, paste it into our search bar, and select your preferred download quality.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Is it possible to download without watermark?</h3>
                            <p style={{ fontSize: '0.95rem', margin: 0 }}>Yes. TTK Downloader specifically removes the TikTok watermark automatically during processing.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Do you support HD 1080p?</h3>
                            <p style={{ fontSize: '0.95rem', margin: 0 }}>We always strive to provide the highest resolution available from the original source, including Full HD 1080p.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Is this tool safe to use?</h3>
                            <p style={{ fontSize: '0.95rem', margin: 0 }}>Completely. We do not store videos, track downloads, or require any personal information/login.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

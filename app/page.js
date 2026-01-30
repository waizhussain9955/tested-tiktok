import VideoDownloader from '@/components/VideoDownloader';

export const metadata = {
    title: 'TTK – Premium TikTok Video Downloader (No Watermark)',
    description: 'The professional high-speed tool to download TikTok videos in HD without watermark. No login, 100% free, and secured for creators.',
    alternates: {
        canonical: 'https://tik-tokdownloader.xyz',
    },
    openGraph: {
        title: 'TTK – Premium TikTok Video Downloader (No Watermark)',
        description: 'The professional high-speed tool to download TikTok videos in HD without watermark. No login, 100% free, and secured for creators.',
        url: 'https://tik-tokdownloader.xyz',
        siteName: 'TTK Downloader',
        type: 'website',
    },
};

export default function Home() {
    return (
        <main>
            {/* Hero: The Statement Section */}
            <section className="hero" id="home">
                <div className="container hero-content">
                    <span className="badge">Professional Tool 2026</span>
                    <h1 className="hero-title">
                        TikTok Downloader <br />
                        <span>HD & No Watermark</span>
                    </h1>
                    <p className="hero-subtitle mx-auto">
                        A precision-engineered platform designed for creators, marketers, and enthusiasts. Save high-fidelity content instantly with no branding and zero friction.
                    </p>

                    <div className="converter-mount" style={{ position: 'relative', zIndex: 50 }}>
                        <VideoDownloader />
                    </div>

                    <p style={{ marginTop: '3.5rem', fontWeight: 700, opacity: 0.6, fontSize: '0.95rem', maxWidth: '1100px' }}>
                        TRUSTED BY 10,000+ CREATORS • NO INSTALLATION REQUIRED
                    </p>
                </div>
            </section>

            {/* Section 1: Strategic Context */}
            <section className="section">
                <div className="container">
                    <div className="section-title">
                        <h2>Why Pro-Quality Content Matters</h2>
                        <p>In 2026, content is the currency of the internet. Watermarks shouldn't stand in the way of your creativity or brand presentation.</p>
                    </div>

                    <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
                        <p className="mx-auto" style={{ marginBottom: '2rem' }}>
                            If you've ever tried to save a TikTok video for later, you've probably noticed that annoying watermark stamped across the screen. Whether you're a content creator looking to repurpose videos, a marketer building a portfolio, or simply someone who wants to save memorable moments without that distracting logo, you're in the right place.
                        </p>
                        <p className="mx-auto">
                            TikTok does not provide a built-in option to download videos without a watermark, and that’s where a powerful TikTok video downloader like TTK Downloader becomes essential. Our tool is engineered for precision, speed, and absolute ease of use.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 2: Feature Excellence (Feature Grid) */}
            <section className="section section-rounded">
                <div className="container">
                    <div className="section-title">
                        <h2>The Gold Standard Tools</h2>
                        <p>Everything you need for clean, professional video archiving in one intuitive interface.</p>
                    </div>

                    <div className="feat-grid">
                        <div className="feat-item">
                            <h3>No Watermark</h3>
                            <p>Our intelligent extraction engine removes TikTok branding while preserving every pixel of the original content.</p>
                        </div>
                        <div className="feat-item">
                            <h3>HD Fidelity</h3>
                            <p>We don't compress. Get your videos in the highest resolution TikTok provides—720p, 1080p, and even 4K where available.</p>
                        </div>
                        <div className="feat-item">
                            <h3>Private & Secure</h3>
                            <p>No login, no cookies, no tracking. We process everything server-side and never store your download history.</p>
                        </div>
                        <div className="feat-item">
                            <h3>Universal Access</h3>
                            <p>Optimized for iOS, Android, macOS, and PC. One tool, every device, zero app installations required.</p>
                        </div>
                        <div className="feat-item">
                            <h3>Link Processing</h3>
                            <p>No complex steps. Just copy the TikTok video link and let our cloud system handle the heavy lifting instantly.</p>
                        </div>
                        <div className="feat-item">
                            <h3>Profile Insights</h3>
                            <p>Unlike basic tools, TTK provides integrated profile analytics including likes and follower counts before you download.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Visual Guide (How to Use) */}
            <section className="section" id="how-to">
                <div className="container">
                    <div className="section-title">
                        <h2>How to Save Videos in Seconds</h2>
                        <p>Three simple steps to bridge the gap between TikTok and your content library.</p>
                    </div>

                    <div className="step-container">
                        <div className="step-card">
                            <div className="step-num">01</div>
                            <div>
                                <h3>Copy Video URL</h3>
                                <p>Locate the TikTok you want to save. Tap "Share" and select "Copy Link". On your computer, just copy the browser's address bar URL.</p>
                            </div>
                        </div>
                        <div className="step-card">
                            <div className="step-num">02</div>
                            <div>
                                <h3>Paste into TTK</h3>
                                <p>Return to tik-tokdownloader.xyz and paste the link into the professional input box at the top of the page.</p>
                            </div>
                        </div>
                        <div className="step-card">
                            <div className="step-num">03</div>
                            <div>
                                <h3>Select & Download</h3>
                                <p>Hit the download button. Our system will immediately present you with direct HD download options—pure and watermark-free.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: Deep Content Dive (About) */}
            <section className="section-bg" style={{ borderRadius: 0, paddingTop: '100px', paddingBottom: '100px' }}>
                <div className="container">
                    <div className="section-title">
                        <h2>TikTok Video Downloader Online – No App Needed</h2>
                        <p>The safest, fastest way to archive content is right in your browser.</p>
                    </div>

                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <p className="mx-auto" style={{ marginBottom: '2.5rem' }}>
                            Unlike many apps that require installation and invasive permissions, TTK Downloader works entirely online through your browser. This approach is faster, safer, and saves your valuable storage space. Simply paste your link and get your video in seconds.
                        </p>
                        <a href="#home" className="btn">Download Your First Video</a>
                    </div>
                </div>
            </section>

            {/* Section 5: Intelligence (FAQ) */}
            <section className="section" id="faq">
                <div className="container">
                    <div className="section-title">
                        <h2>Precision Answers</h2>
                        <p>Everything you need to know about the best TikTok downloader of 2026.</p>
                    </div>

                    <div className="faq-grid">
                        <div className="faq-card">
                            <h3>How do I use the TTK Downloader?</h3>
                            <p>The process is built for speed: copy the TikTok video link, paste it into our platform, and click download. No technical knowledge required.</p>
                        </div>
                        <div className="faq-card">
                            <h3>Is it legal to download without watermark?</h3>
                            <p>Downloading for personal use or creative inspiration is generally accepted. Always respect creators' rights and platform terms of service.</p>
                        </div>
                        <div className="faq-card">
                            <h3>Does it support 1080p and 4K?</h3>
                            <p>Yes. We always extract the highest available quality from TikTok's servers, up to Full HD and 4K where supported by the source.</p>
                        </div>
                        <div className="faq-card">
                            <h3>Is the service really 100% free?</h3>
                            <p>Absolutely. There are no subscriptions, no credit card requirements, and no daily limits. Professional tools should be accessible to everyone.</p>
                        </div>
                        <div className="faq-card">
                            <h3>Why is my video quality sometimes lower?</h3>
                            <p>Final quality depends on the original upload. We provide the highest possible version available on the platform without further compression.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

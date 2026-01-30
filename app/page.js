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

                    <p className="mt-3 text-muted" style={{ fontSize: '0.8125rem' }}>
                        Trusted by content creators worldwide. 100% Secure.
                    </p>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="section bg-muted">
                <div className="container">
                    <div className="card">
                        <div className="grid" style={{ alignItems: 'center' }}>
                            <div className="h2 mb-2">
                                Professional TikTok Download Solution
                            </div>
                            <div className="text-muted" style={{ lineHeight: 1.6 }}>
                                <p>
                                    TikTok has become a primary hub for global creative content. Whether for marketing, education, or entertainment, the need for high-quality, watermark-free video is essential for creators. Our tool provides a streamlined, professional way to access your favorite content in its original quality.
                                </p>
                                <p>
                                    <strong>Tik-TokDownloader.xyz</strong> is engineered for speed and reliability. No registration, no installation, just a clean interface for a seamless workflow.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Case */}
            <section className="section">
                <div className="container">
                    <h2 className="text-center mb-3">Key Platform Benefits</h2>
                    <div className="grid grid-3">
                        <div className="card">
                            <h3 className="mb-1">High Definition</h3>
                            <p className="text-muted">Support for HD, Full HD, and 4K resolutions. Get the best possible version of every video.</p>
                        </div>
                        <div className="card">
                            <h3 className="mb-1">No Watermark</h3>
                            <p className="text-muted">Clean videos without the TikTok logo or username, perfect for content repurposing.</p>
                        </div>
                        <div className="card">
                            <h3 className="mb-1">Safe & Private</h3>
                            <p className="text-muted">We do not store your data or track your downloads. Your privacy is our top priority.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="section bg-muted">
                <div className="container">
                    <h2 className="text-center mb-3">How to Download</h2>
                    <div className="grid grid-3">
                        <div className="card text-center">
                            <div className="h3 mb-2" style={{ color: 'var(--primary)' }}>01</div>
                            <h4 className="mb-1">Copy Link</h4>
                            <p className="text-muted">Open TikTok and copy the video URL you want to download.</p>
                        </div>
                        <div className="card text-center">
                            <div className="h3 mb-2" style={{ color: 'var(--primary)' }}>02</div>
                            <h4 className="mb-1">Paste URL</h4>
                            <p className="text-muted">Paste the link into the input field above and hit download.</p>
                        </div>
                        <div className="card text-center">
                            <div className="h3 mb-2" style={{ color: 'var(--primary)' }}>03</div>
                            <h4 className="mb-1">Save Video</h4>
                            <p className="text-muted">Choose your preferred quality and save the file to your device.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section">
                <div className="container">
                    <h2 className="text-center mb-3">Frequently Asked Questions</h2>
                    <div className="grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div className="card">
                            <h3 className="h4 mb-1">Is this service free?</h3>
                            <p className="text-muted">Yes, our TikTok video downloader is 100% free to use for everyone with no hidden charges or subscriptions required.</p>
                        </div>
                        <div className="card">
                            <h3 className="h4 mb-1">Do I need to install anything?</h3>
                            <p className="text-muted">No installation is required. Our platform is a web-based utility that works directly in any modern mobile or desktop browser.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="section" style={{ textAlign: 'center' }}>
                <div className="container">
                    <h2 className="mb-2">Start Downloading Now</h2>
                    <p className="hero-subtitle mb-3">The fastest and most reliable way to download TikTok videos in HD.</p>
                    <a href="#converter" className="btn btn-primary">
                        Go to Downloader
                    </a>
                </div>
            </section>

            <style jsx>{`
                .text-muted { color: var(--text-muted); }
            `}</style>
        </>
    );
}

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setUrl(text);
        } catch (err) {
            setError("Unable to paste. Please allow clipboard access.");
        }
    };

    const handleDownload = async () => {
        if (!url) {
            setError("Please paste a TikTok URL first!");
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        // Using relative path for API - assumes backend is on same domain in production
        // or proxy is set up in vite.config.js for dev
        try {
            const response = await fetch('/api/v1/tiktok/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: url })
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMsg = data.detail ? (typeof data.detail === 'string' ? data.detail : data.detail.message) : 'Failed to extract video';
                throw new Error(errorMsg);
            }

            setResult(data.video);
        } catch (err) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num;
    };

    return (
        <main>
            <Helmet>
                <title>TikTok Video Downloader – Free HD Quality & No Watermark | Tik-TokDownloader.xyz</title>
                <meta name="description" content="Free TikTok video downloader to download HD videos without watermark. Fast, safe, and easy TikTok downloader online at Tik-TokDownloader.xyz." />
                <link rel="canonical" href="https://tik-tokdownloader.xyz" />
            </Helmet>

            {/* Hero Section */}
            <section className="hero" id="converter">
                <div className="container">
                    <h1 className="hero-title">TikTok <span className="gradient-text">Video Downloader</span></h1>
                    <p className="hero-subtitle">Free HD Quality & No Watermark. Fast, secure, and easy to use directly from your browser.</p>

                    <div className="converter-card">
                        <div className="input-group">
                            <div className="input-wrapper">
                                <i className="fas fa-link input-icon"></i>
                                <input
                                    type="text"
                                    id="tiktok-url"
                                    placeholder="Paste TikTok video link here..."
                                    autoComplete="off"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                                <button id="paste-btn" className="paste-btn" title="Paste from clipboard" onClick={handlePaste}>
                                    <i className="fas fa-paste"></i>
                                    <span>Paste</span>
                                </button>
                            </div>
                            <button
                                id="download-btn"
                                className={`primary-btn ${loading ? 'btn-loading' : ''}`}
                                onClick={handleDownload}
                                disabled={loading}
                            >
                                <span className="btn-text">Download Now</span>
                                <div className="loader"></div>
                            </button>
                        </div>

                        {error && (
                            <div className="error-msg" style={{ display: 'flex' }}>
                                <i className="fas fa-exclamation-circle"></i>
                                <span id="error-text">{error}</span>
                            </div>
                        )}

                    </div>
                    <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Clean, professional-looking videos without watermark.</p>

                    {/* Result Container */}
                    {result && (
                        <div className="result-container" id="result-container">
                            <div className="video-card">
                                <div className="card-header">
                                    <div className="author-avatar">{result.author.charAt(0).toUpperCase()}</div>
                                    <div className="author-info">
                                        <h4>@{result.author}</h4>
                                        <p>TikTok Creator</p>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="caption">{result.caption || 'No caption provided.'}</div>

                                    <div className="stats-grid">
                                        <div className="stat-item">
                                            <i className="fas fa-play" style={{ color: 'var(--secondary)', fontSize: '0.8rem', marginBottom: '0.5rem', display: 'block' }}></i>
                                            <span>{formatNumber(result.play_count || 0)}</span>
                                            <label>Plays</label>
                                        </div>
                                        <div className="stat-item">
                                            <i className="fas fa-heart" style={{ color: 'var(--primary)', fontSize: '0.8rem', marginBottom: '0.5rem', display: 'block' }}></i>
                                            <span>{formatNumber(result.like_count || 0)}</span>
                                            <label>Likes</label>
                                        </div>
                                        <div className="stat-item">
                                            <i className="fas fa-share" style={{ color: '#7c3aed', fontSize: '0.8rem', marginBottom: '0.5rem', display: 'block' }}></i>
                                            <span>{formatNumber(result.share_count || 0)}</span>
                                            <label>Shares</label>
                                        </div>
                                    </div>

                                    <a href={result.mp4_url} className="download-link" target="_blank" rel="noopener noreferrer">
                                        <i className="fas fa-download"></i> Download Video
                                    </a>
                                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '1rem' }}>
                                        High quality MP4 ready for download.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </section>

            {/* Introduction Section */}
            <section className="content-section" style={{ padding: '4rem 0' }}>
                <div className="container text-center" style={{ textAlign: 'center' }}>
                    <article>
                        <h2 style={{ marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>Download TikTok Videos Without Watermark Easily</h2>
                        <p style={{ maxWidth: '800px', margin: '0 auto 1.5rem', color: 'var(--text-muted)' }}>TikTok has become one of the most popular social media platforms in the world, with millions of users creating and sharing short videos every day. From entertainment and education to marketing and creativity, TikTok content is everywhere. However, one common problem users face is downloading videos in HD quality without a watermark. That’s where a reliable TikTok video downloader comes in.</p>
                        <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-muted)' }}>If you are looking for the <strong>best free TikTok video downloader without watermark</strong>, a fast TikTok video downloader online, or simply want to learn <strong>how to download TikTok video without logo</strong>, then <strong>https://tik-tokdownloader.xyz</strong> is the perfect solution. This guide explains everything you need to know about downloading TikTok videos safely, easily, and in the highest quality possible.</p>
                    </article>
                </div>
            </section>

            {/* What Is Section */}
            <section className="features" style={{ background: 'rgba(0,0,0,0.1)' }}>
                <div className="container grid-features">
                    <div className="feature-card">
                        <i className="fas fa-question-circle"></i>
                        <h3>What Is a TikTok Video Downloader?</h3>
                        <p>A TikTok video downloader is an online tool or app that allows users to download TikTok videos directly to their device. With <strong>Tik-TokDownloader.xyz</strong>, you can download videos in MP4 format, HD quality, and even Full HD or 4K, all without watermark or logo.</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-magic"></i>
                        <h3>Why Use a No Watermark Downloader?</h3>
                        <p>The TikTok watermark can be distracting. A no watermark TikTok video downloader removes the TikTok logo and username, giving you a clean and high-quality video for offline viewing, presentations, or your own projects.</p>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="features" id="features">
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '4rem', fontFamily: 'var(--font-heading)' }}>Key Benefits of Our Platform</h2>
                    <div className="grid-features">
                        <div className="feature-card">
                            <i className="fas fa-check-circle"></i>
                            <h3>Free & Online</h3>
                            <p>No registration, no payment, and no installation required. This is a 100% free TikTok video downloader online tool.</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-hv"></i>
                            <h3>HD & 4K Quality</h3>
                            <p>Download videos in HD TikTok video downloader quality. We support Full HD and 4K resolutions when available.</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-shield-alt"></i>
                            <h3>Safe & Secure</h3>
                            <p>We provide a TikTok video downloader safe environment. No malware, no tracking, and no data storage.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Download Section */}
            <section className="content-section" id="how-to" style={{ padding: '6rem 0', background: 'var(--glass)' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontFamily: 'var(--font-heading)' }}>How to Download TikTok Videos Without Watermark</h2>
                    <div className="grid-features" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                        <div className="feature-card" style={{ textAlign: 'center', padding: '2rem' }}>
                            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', display: 'block', marginBottom: '1rem' }}>1</span>
                            <p>Open TikTok and <strong>copy the video link</strong></p>
                        </div>
                        <div className="feature-card" style={{ textAlign: 'center', padding: '2rem' }}>
                            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', display: 'block', marginBottom: '1rem' }}>2</span>
                            <p>Visit <strong>tik-tokdownloader.xyz</strong></p>
                        </div>
                        <div className="feature-card" style={{ textAlign: 'center', padding: '2rem' }}>
                            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', display: 'block', marginBottom: '1rem' }}>3</span>
                            <p>Paste the link and <strong>click download</strong></p>
                        </div>
                        <div className="feature-card" style={{ textAlign: 'center', padding: '2rem' }}>
                            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', display: 'block', marginBottom: '1rem' }}>4</span>
                            <p>Save video in <strong>MP4 HD quality</strong></p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="features" id="faq">
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '4rem', fontFamily: 'var(--font-heading)' }}>Frequently Asked Questions</h2>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <article className="feature-card" style={{ marginBottom: '1.5rem', textAlign: 'left', padding: '2rem' }}>
                            <h3 style={{ color: 'var(--secondary-fixed)', marginBottom: '1rem' }}>Can you download TikTok without watermark?</h3>
                            <p>Yes. With the right tool, you can download TikTok without watermark easily using our online platform.</p>
                        </article>
                        <article className="feature-card" style={{ marginBottom: '1.5rem', textAlign: 'left', padding: '2rem' }}>
                            <h3 style={{ color: 'var(--secondary-fixed)', marginBottom: '1rem' }}>How to download TikTok video without logo?</h3>
                            <p>Simply paste the link into our <strong>TikTok video downloader without logo</strong> tool, and we will remove the watermark for you automatically.</p>
                        </article>
                        <article className="feature-card" style={{ marginBottom: '1.5rem', textAlign: 'left', padding: '2rem' }}>
                            <h3 style={{ color: 'var(--secondary-fixed)', marginBottom: '1rem' }}>Can you download your own TikTok without watermark?</h3>
                            <p>Absolutely. Our tool supports downloading your own content for repurposing on other social media platforms.</p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Devices & Formats */}
            <section className="features" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <div className="container grid-features">
                    <div className="feature-card">
                        <h3>Best for All Devices</h3>
                        <p>Our tool works perfectly on Android, iPhone (via browser), Windows, macOS, and Tablets. No app installation needed.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Supported Formats</h3>
                        <p>We support TikTok video downloader MP4, HD & Full HD video, high-quality audio, and original resolution with no logo.</p>
                    </div>
                </div>
            </section>

            {/* Creators & Legal */}
            <section className="features">
                <div className="container">
                    <div className="grid-features">
                        <div className="feature-card">
                            <h3>For Creators & Marketers</h3>
                            <p>Repurpose content for Instagram Reels, YouTube Shorts, and Facebook videos with professional, no-watermark quality.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Legal & Ethical Use</h3>
                            <p>Always credit original creators and follow copyright rules. Our tool is designed for personal and ethical download use.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="hero" style={{ padding: '4rem 0' }}>
                <div className="container">
                    <h2 className="hero-title" style={{ fontSize: '2.5rem' }}>Ready to Download?</h2>
                    <p className="hero-subtitle">Fast, free, and secure TikTok video downloader at your fingertips.</p>
                    <a href="#converter" className="primary-btn" style={{ margin: '0 auto', textDecoration: 'none' }}>Go to Downloader</a>
                </div>
            </section>
        </main>
    );
};

export default Home;

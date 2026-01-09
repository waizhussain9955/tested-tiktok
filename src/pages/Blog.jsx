import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
    return (
        <main>
            <Helmet>
                <title>Blog – Tik-TokDownloader.xyz</title>
                <meta name="description" content="Read the latest updates, guides, and tips about downloading TikTok videos without watermark." />
                <link rel="canonical" href="https://tik-tokdownloader.xyz/blog" />
            </Helmet>

            <section className="content-section" style={{ paddingTop: '8rem', minHeight: '60vh' }}>
                <div className="container">
                    <h1 className="hero-title" style={{ marginBottom: '3rem' }}>Latest <span className="gradient-text">Articles</span></h1>

                    <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>

                        {/* Blog Post 1 */}
                        <Link to="/tiktok-video-downloader-apk-android.html" className="feature-card" style={{ textDecoration: 'none', display: 'block', padding: '2rem', transition: 'transform 0.3s ease' }}>
                            <span style={{ color: 'var(--secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Guide</span>
                            <h2 style={{ fontFamily: 'var(--font-heading)', margin: '1rem 0', fontSize: '1.5rem', color: 'var(--text-white)' }}>
                                TikTok Video Downloader APK – Download for Android (No Watermark)
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Download TikTok videos on Android using the best TikTok video downloader APK. Free, fast, HD quality, and no watermark.</p>
                            <div style={{ marginTop: '1.5rem', color: 'var(--primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Read More <i className="fas fa-arrow-right"></i>
                            </div>
                        </Link>

                        {/* Blog Post 2 */}
                        <Link to="/tiktok-video-downloader-4k-hd.html" className="feature-card" style={{ textDecoration: 'none', display: 'block', padding: '2rem', transition: 'transform 0.3s ease' }}>
                            <span style={{ color: 'var(--secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Quality</span>
                            <h2 style={{ fontFamily: 'var(--font-heading)', margin: '1rem 0', fontSize: '1.5rem', color: 'var(--text-white)' }}>
                                TikTok Video Downloader 4K HD – Ultra Quality Downloads
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Download TikTok videos in HD, 1080p, 4K, and 8K quality without watermark. Free, fast, and ultra‑quality TikTok video downloader online.</p>
                            <div style={{ marginTop: '1.5rem', color: 'var(--primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Read More <i className="fas fa-arrow-right"></i>
                            </div>
                        </Link>

                        {/* Blog Post 3 */}
                        <Link to="/tiktok-video-downloader-for-pc.html" className="feature-card" style={{ textDecoration: 'none', display: 'block', padding: '2rem', transition: 'transform 0.3s ease' }}>
                            <span style={{ color: 'var(--secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Platform</span>
                            <h2 style={{ fontFamily: 'var(--font-heading)', margin: '1rem 0', fontSize: '1.5rem', color: 'var(--text-white)' }}>
                                TikTok Video Downloader for PC – Windows & Mac
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Download TikTok videos on PC, Windows 10, Windows 11, and laptops for free. Easy, fast, and secure TikTok video downloader for PC and Mac.</p>
                            <div style={{ marginTop: '1.5rem', color: 'var(--primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Read More <i className="fas fa-arrow-right"></i>
                            </div>
                        </Link>

                        {/* Blog Post 4 */}
                        <Link to="/tiktok-video-downloader-iphone-ios.html" className="feature-card" style={{ textDecoration: 'none', display: 'block', padding: '2rem', transition: 'transform 0.3s ease' }}>
                            <span style={{ color: 'var(--secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Platform</span>
                            <h2 style={{ fontFamily: 'var(--font-heading)', margin: '1rem 0', fontSize: '1.5rem', color: 'var(--text-white)' }}>
                                TikTok Video Downloader iPhone & iOS – Free App
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Download TikTok videos on iPhone & iOS without watermark. Free TikTok video downloader for iPhone, no App Store needed. Fast & secure.</p>
                            <div style={{ marginTop: '1.5rem', color: 'var(--primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Read More <i className="fas fa-arrow-right"></i>
                            </div>
                        </Link>

                        {/* Blog Post 5 */}
                        <Link to="/download-tiktok-videos-by-username.html" className="feature-card" style={{ textDecoration: 'none', display: 'block', padding: '2rem', transition: 'transform 0.3s ease' }}>
                            <span style={{ color: 'var(--secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Feature</span>
                            <h2 style={{ fontFamily: 'var(--font-heading)', margin: '1rem 0', fontSize: '1.5rem', color: 'var(--text-white)' }}>
                                Download TikTok Videos by Username – Profile Downloader
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Download TikTok videos easily by username using our free profile downloader. Save HD TikTok videos without watermark, even after ban, with fast and secure access.</p>
                            <div style={{ marginTop: '1.5rem', color: 'var(--primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Read More <i className="fas fa-arrow-right"></i>
                            </div>
                        </Link>

                    </div>
                </div>
            </section>
        </main>
    );
};

export default Blog;

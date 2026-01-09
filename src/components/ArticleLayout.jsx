import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const ArticleLayout = ({ title, description, keywords, canonical, children }) => {
    return (
        <main>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                {keywords && <meta name="keywords" content={keywords} />}
                {canonical && <link rel="canonical" href={canonical} />}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="article" />
            </Helmet>

            <section className="content-section" style={{ paddingTop: '8rem' }}>
                <div className="container">
                    <article className="feature-card" style={{ textAlign: 'left', padding: '3rem', maxWidth: '900px', margin: '0 auto' }}>
                        {children}
                    </article>
                </div>
            </section>

            <section className="hero" style={{ padding: '4rem 0' }}>
                <div className="container">
                    <h2 className="hero-title" style={{ fontSize: '2.5rem' }}>Start Downloading Now</h2>
                    <p className="hero-subtitle">Fast, free, and secure TikTok video downloader.</p>
                    <Link to="/" className="primary-btn" style={{ margin: '0 auto', textDecoration: 'none' }}>Go to Downloader</Link>
                </div>
            </section>
        </main>
    );
};

export default ArticleLayout;

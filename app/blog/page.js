import Link from 'next/link';
import { blogPosts } from '@/lib/blogData';

export const metadata = {
    title: 'Blog - TikTok Downloader Guides | Tik-TokDownloader.xyz',
    description: 'Latest articles and guides about downloading TikTok videos without watermark. Learn how to use TikTok downloader on different devices and platforms.',
};

export default function BlogPage() {
    // Convert object to array for mapping
    const posts = Object.entries(blogPosts).map(([slug, data]) => ({
        slug,
        ...data
    }));

    return (
        <section className="content-section" style={{ paddingTop: '8rem', minHeight: '80vh' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="hero-title">
                        Latest <span className="gradient-text">Articles</span>
                    </h1>
                    <p className="hero-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        Tips, tricks, and guides to help you get the most out of TikTok and our downloading tools.
                    </p>
                </div>

                <div
                    className="blog-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: '2.5rem',
                    }}
                >
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="feature-card"
                            style={{
                                textDecoration: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '2.5rem',
                                border: '1px solid var(--border)',
                                background: 'var(--card-bg)',
                                borderRadius: '24px',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                height: '100%',
                            }}
                        >
                            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span
                                    style={{
                                        color: 'var(--primary)',
                                        fontSize: '0.8rem',
                                        padding: '0.4rem 0.8rem',
                                        background: 'rgba(222, 27, 67, 0.1)',
                                        borderRadius: '100px',
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    {post.category}
                                </span>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{post.date}</span>
                            </div>

                            <h2
                                style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '1.4rem',
                                    color: 'var(--text-white)',
                                    lineHeight: '1.4',
                                    marginBottom: '1rem',
                                    flex: 1, // Pushes footer down
                                }}
                            >
                                {post.heading}
                            </h2>

                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {post.description}
                            </p>

                            <div
                                style={{
                                    color: 'var(--text-white)',
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    marginTop: 'auto', // Ensures alignment at bottom
                                    fontSize: '0.95rem'
                                }}
                            >
                                Read Article
                                <svg xmlns="http://www.w3.org/2000/svg" height="0.9em" viewBox="0 0 448 512" fill="currentColor" style={{ transition: 'transform 0.3s' }}>
                                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

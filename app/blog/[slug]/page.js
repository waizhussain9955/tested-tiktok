import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/blogData';
import Link from 'next/link';

export async function generateMetadata(props) {
    const params = await props.params;
    const post = blogPosts[params.slug];

    if (!post) {
        return {
            title: 'Article Not Found | Tik-TokDownloader.xyz',
        };
    }

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.date,
        },
    };
}

export default async function BlogPost(props) {
    const params = await props.params;
    const post = blogPosts[params.slug];

    if (!post) {
        notFound();
    }

    return (
        <article className="content-section" style={{ paddingTop: '8rem', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '800px' }}>

                {/* Breadcrumb */}
                <div style={{ marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
                    <span style={{ margin: '0 0.5rem' }}>/</span>
                    <Link href="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Blog</Link>
                    <span style={{ margin: '0 0.5rem' }}>/</span>
                    <span style={{ color: 'var(--primary)' }}>{post.category}</span>
                </div>

                {/* Article Header */}
                <header style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
                    <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textAlign: 'left', marginBottom: '1.5rem' }}>
                        {post.heading}
                    </h1>

                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        <span>📅 {post.date}</span>
                        <span>📂 {post.category}</span>
                    </div>
                </header>

                {/* Article Content */}
                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        color: 'var(--text-white)'
                    }}
                />


                {/* Back to Blog Button */}
                <div style={{ marginTop: '4rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
                    <Link href="/blog" className="primary-btn" style={{ display: 'inline-flex', padding: '1rem 2rem', textDecoration: 'none', minWidth: 'auto', fontSize: '1rem' }}>
                        ← Back to Blog
                    </Link>
                </div>

            </div>
        </article>
    );
}

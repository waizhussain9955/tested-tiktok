import VideoDownloader from '@/components/VideoDownloader';
import { notFound } from 'next/navigation';

// Feature pages data mapping
const features = {
    'tiktok-video-downloader-apk-android': {
        title: 'TikTok Video Downloader APK – Download for Android (No Watermark)',
        description: 'Download TikTok videos on Android using the best TikTok video downloader APK. Free, fast, HD quality, and no watermark.',
        heading: 'TikTok Video Downloader for Android (APK)',
        content: 'Our Android-optimized downloader is the perfect solution for saving TikTok videos directly to your smartphone or tablet. Works perfectly in Chrome, Firefox, and other Android browsers without installing any suspicious APKs.'
    },
    'tiktok-video-downloader-4k-hd': {
        title: 'TikTok Video Downloader 4K HD – Ultra Quality Downloads',
        description: 'Download TikTok videos in HD, 1080p, 4K, and 8K quality without watermark. Free, fast, and high-quality TikTok video downloader online.',
        heading: 'Download TikTok Videos in 4K & HD',
        content: 'Experience the highest quality downloads available. We support up to 4K resolution downloads when the source video allows it. Get crystal clear videos without the watermark.'
    },
    'tiktok-video-downloader-for-pc': {
        title: 'TikTok Video Downloader for PC – Windows & Mac',
        description: 'Download TikTok videos on PC, Windows 10, Windows 11, and laptops for free. Easy, fast, and secure TikTok video downloader for PC and Mac.',
        heading: 'TikTok Video Downloader for PC (Windows & Mac)',
        content: 'Save your favorite TikToks directly to your computer. Perfect for content creators who need to edit videos on desktop software. Compatible with all major desktop browsers.'
    },
    'tiktok-video-downloader-iphone-ios': {
        title: 'TikTok Video Downloader iPhone & iOS – Free App',
        description: 'Download TikTok videos on iPhone & iOS without watermark. Free TikTok video downloader for iPhone, no App Store needed. Fast & secure.',
        heading: 'TikTok Downloader for iPhone & iPad (iOS)',
        content: 'Download videos directly to your iPhone or iPad. Since iOS 13, you can download files directly in Safari. Just paste the link and save directly to your Files or Photos app.'
    },
    'download-tiktok-videos-by-username': {
        title: 'Download TikTok Videos by Username – Profile Downloader',
        description: 'Download TikTok videos easily by username using our free profile downloader. Save HD TikTok videos without watermark.',
        heading: 'Download TikTok Videos by Username',
        content: 'Found a creator you love? You can easily download videos from their profile. Just copy the link to any specific video and our tool will handle the rest.'
    }
};

export async function generateMetadata(props) {
    const params = await props.params;
    const feature = features[params.slug];

    if (!feature) {
        return {
            title: 'Page Not Found | Tik-TokDownloader.xyz',
        };
    }

    return {
        title: feature.title,
        description: feature.description,
        openGraph: {
            title: feature.title,
            description: feature.description,
        },
    };
}

export default async function FeaturePage(props) {
    const params = await props.params;
    const feature = features[params.slug];

    if (!feature) {
        notFound();
    }

    return (
        <>
            <section className="hero">
                <div className="container">
                    <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                        <span className="gradient-text">{feature.heading}</span>
                    </h1>
                    <p className="hero-subtitle">
                        {feature.description}
                    </p>

                    <VideoDownloader />

                    <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Clean, professional-looking videos without watermark.
                    </p>
                </div>
            </section>

            <section className="content-section">
                <div className="container">
                    <div className="intro-container">
                        <div className="intro-header">
                            <h2 className="intro-title">About This Feature</h2>
                        </div>
                        <div className="intro-content">
                            <p>{feature.content}</p>
                            <p>
                                Our tool is designed to provide the best experience for this specific use case.
                                Whether you are using an Android device, iPhone, PC, or looking for 4K quality,
                                we ensure fast and secure downloads every time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features" style={{ background: 'rgba(0,0,0,0.1)' }}>
                <div className="container grid-features">
                    <div className="feature-card">
                        <h3>Fast & Free</h3>
                        <p>Enjoy unlimited free downloads at lightning speeds.</p>
                    </div>
                    <div className="feature-card">
                        <h3>No Watermark</h3>
                        <p>Get clean videos without any logos or usernames.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Secure</h3>
                        <p>We don't store your history or personal data.</p>
                    </div>
                </div>
            </section>
        </>
    );
}

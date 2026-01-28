import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackgroundBlobs from '@/components/BackgroundBlobs';

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-heading',
    display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-main',
    display: 'swap',
});

export const metadata = {
    metadataBase: new URL('https://tik-tokdownloader.xyz'),
    title: 'TikTok Video Downloader – Free HD Quality & No Watermark | Tik-TokDownloader.xyz',
    description: 'Free TikTok video downloader to download HD videos without watermark. Fast, safe, and easy TikTok downloader online at Tik-TokDownloader.xyz.',
    keywords: 'TikTok video downloader, TikTok video downloader without watermark, TikTok video downloader HD, TikTok downloader online free, TikTok downloader no watermark, Download TikTok videos MP4',
    authors: [{ name: 'Waiz-Hussain' }],
    creator: 'Waiz-Hussain',
    publisher: 'Tik-TokDownloader.xyz',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: 'TikTok Video Downloader – Free HD Quality & No Watermark',
        description: 'Download TikTok videos in HD quality without watermark using Tik-TokDownloader.xyz. Fast, free, and secure TikTok video downloader online.',
        url: 'https://tik-tokdownloader.xyz',
        siteName: 'Tik-TokDownloader.xyz',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'TikTok Video Downloader – Free HD Quality & No Watermark',
        description: 'Free TikTok video downloader to download HD videos without watermark. Fast, safe, and easy to use.',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'G-SVDCDJZ6CM',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" type="image/x-icon" href="/img/favicon.ico" />
                <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png" />
                <link rel="apple-touch-icon" href="/img/apple-touch-icon.png" />
                <meta name="theme-color" content="#0a0a0a" />
            </head>
            <body className={`${outfit.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
                <BackgroundBlobs />
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}

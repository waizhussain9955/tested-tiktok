'use client';

import { useState } from 'react';
import { downloadTikTokVideo, formatNumber, isValidTikTokUrl } from '@/lib/api';

export default function VideoDownloader() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [videoData, setVideoData] = useState(null);

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setUrl(text);
        } catch (err) {
            setError('Clipboard error. Please paste manually.');
        }
    };

    const handleDownload = async () => {
        if (!url.trim() || !isValidTikTokUrl(url)) {
            setError('Paste a valid TikTok video link first!');
            return;
        }

        setLoading(true);
        setError('');
        setVideoData(null);

        try {
            const result = await downloadTikTokVideo(url);
            if (!result.success) throw new Error(result.error || 'Download failed');
            setVideoData(result.video);
        } catch (err) {
            setError(err.message || 'Error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const downloadResource = async (e, item) => {
        e.preventDefault();
        const btn = e.currentTarget;
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<div class="btn-loader"></div> Processing...';
        btn.style.pointerEvents = "none";

        try {
            const response = await fetch(item.url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', `tiktok_${videoData.video_id}_${item.quality || 'video'}.mp4`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            window.open(item.url, '_blank');
        } finally {
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.pointerEvents = "auto";
            }, 1000);
        }
    };

    return (
        <div className="downloader-container">
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Paste TikTok video link here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleDownload()}
                />
                <div className="search-actions">
                    <button className="paste-btn" onClick={handlePaste}>Paste</button>
                    <button
                        className={`download-main-btn ${loading ? 'loading' : ''}`}
                        onClick={handleDownload}
                        disabled={loading}
                    >
                        {loading ? '' : 'Download Now'}
                        <div className="loader"></div>
                    </button>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {videoData && (
                <div className="results-card animate-slide">
                    <div className="video-info">
                        <div className="author-meta">
                            <div className="profile-pic">{videoData.author.charAt(0).toUpperCase()}</div>
                            <h3>@{videoData.author}</h3>
                        </div>
                        <div className="quick-stats">
                            <span>❤️ {formatNumber(videoData.like_count)}</span>
                            <span>👁️ {formatNumber(videoData.play_count)}</span>
                        </div>
                    </div>

                    <div className="download-options">
                        {videoData.downloads.map((item, index) => (
                            <button key={index} className="dl-variant-btn" onClick={(e) => downloadResource(e, item)}>
                                <span className="dl-label">{item.label}</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <style jsx>{`
                .downloader-container { width: 100%; max-width: 850px; margin: 0 auto; }
                
                .search-box {
                    background: #fff;
                    border: 2px solid var(--border);
                    border-radius: 999px;
                    padding: 10px 10px 10px 30px;
                    display: flex;
                    align-items: center;
                    box-shadow: var(--shadow-premium);
                    transition: var(--transition);
                }

                .search-box:focus-within { border-color: var(--primary); transform: translateY(-3px); }

                input {
                    flex: 1;
                    border: none;
                    background: transparent;
                    font-size: 1.2rem;
                    font-family: inherit;
                    color: var(--text-main);
                    outline: none;
                    font-weight: 500;
                }

                .search-actions { display: flex; align-items: center; gap: 12px; }

                .paste-btn {
                    background: var(--primary-soft);
                    color: var(--primary);
                    border: none;
                    padding: 12px 24px;
                    border-radius: 999px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: var(--transition);
                }

                .download-main-btn {
                    background: var(--primary);
                    color: #fff;
                    border: none;
                    padding: 12px 40px;
                    border-radius: 999px;
                    font-weight: 900;
                    font-size: 1.1rem;
                    cursor: pointer;
                    transition: var(--transition);
                    min-width: 180px;
                    height: 56px;
                    position: relative;
                }

                .download-main-btn:hover { background: var(--primary-dark); }

                .error-message {
                    background: #fff1f2;
                    color: #e11d48;
                    padding: 1.25rem;
                    border-radius: 20px;
                    margin-top: 1.5rem;
                    text-align: center;
                    font-weight: 700;
                    border: 1px solid #ffe4e6;
                }

                .results-card {
                    background: #fff;
                    margin-top: 50px;
                    border-radius: 32px;
                    padding: 2.5rem;
                    box-shadow: var(--shadow-premium);
                    border: 1px solid var(--border);
                }

                .video-info { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; border-bottom: 2px solid var(--bg-subtle); padding-bottom: 1.5rem; }
                .author-meta { display: flex; align-items: center; gap: 1rem; }
                .profile-pic { width: 48px; height: 48px; background: var(--primary); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.25rem; }
                .quick-stats { display: flex; gap: 1.5rem; font-weight: 700; color: var(--text-muted); }

                .download-options { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }

                .dl-variant-btn {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.5rem 2rem;
                    background: var(--bg-subtle);
                    border: 2px solid var(--border);
                    border-radius: 24px;
                    font-weight: 800;
                    color: var(--text-main);
                    cursor: pointer;
                    transition: var(--transition);
                }

                .dl-variant-btn:hover { background: #fff; border-color: var(--primary); transform: translateX(8px); }

                .loader { display: none; width: 24px; height: 24px; border: 3px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite; position: absolute; left: 50%; top: 50%; margin-left: -12px; margin-top: -12px; }
                @keyframes spin { to { transform: rotate(360deg); } }
                .loading .loader { display: block; }

                .animate-slide { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
                @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

                @media (max-width: 768px) {
                    .search-box { flex-direction: column; border-radius: 32px; padding: 20px; gap: 20px; }
                    .search-actions { width: 100%; }
                    .download-main-btn { flex: 1; }
                    .download-options { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}

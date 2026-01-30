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
            setError('Unable to paste. Please allow clipboard access.');
        }
    };

    const handleDownload = async () => {
        if (!url.trim()) {
            setError('Please paste a valid TikTok video URL first!');
            return;
        }

        if (!isValidTikTokUrl(url)) {
            setError('Invalid TikTok URL. Please paste a valid TikTok video link.');
            return;
        }

        setLoading(true);
        setError('');
        setVideoData(null);

        try {
            const result = await downloadTikTokVideo(url);

            if (!result.success) {
                throw new Error(result.error || 'Failed to download video');
            }

            setVideoData(result.video);
        } catch (err) {
            console.error('Download Error:', err);
            setError(err.message || 'Failed to download video. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleDownload();
        }
    };

    const downloadResource = async (e, item) => {
        e.preventDefault();
        const btn = e.currentTarget;
        const originalContent = btn.innerHTML;

        btn.innerHTML = '<div class="btn-loader"></div> Downloading...';
        btn.style.opacity = "0.8";
        btn.style.pointerEvents = "none";

        try {
            const response = await fetch(item.url);
            if (!response.ok) throw new Error('Network response was not ok');

            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const ext = item.format || 'mp4';
            const filename = `tiktok_${videoData.video_id}_${item.quality || 'video'}.${ext}`;

            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (err) {
            console.error("Direct download failed, falling back to link", err);
            const link = document.createElement('a');
            link.href = item.url;
            link.setAttribute('download', `tiktok_${videoData.video_id}.${item.format || 'mp4'}`);
            link.setAttribute('target', '_blank');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } finally {
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.opacity = "1";
                btn.style.pointerEvents = "auto";
            }, 1000);
        }
    };

    return (
        <div className="downloader-wrapper">
            <div className="search-card">
                <div className="input-row">
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Paste link here..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button className="small-paste-btn" onClick={handlePaste}>
                            Paste
                        </button>
                    </div>
                    <button
                        className={`action-btn ${loading ? 'loading' : ''}`}
                        onClick={handleDownload}
                        disabled={loading}
                    >
                        <span>Download</span>
                        <div className="loader"></div>
                    </button>
                </div>
            </div>

            {error && <div className="error-box">{error}</div>}

            {videoData && (
                <div className="result-area">
                    <div className="card">
                        <div className="author-row">
                            <div className="avatar">{videoData.author.charAt(0).toUpperCase()}</div>
                            <div>
                                <h4 className="m-0">@{videoData.author}</h4>
                                <p className="m-0 text-muted">Author</p>
                            </div>
                        </div>

                        <p className="caption-text">{videoData.caption || 'No caption'}</p>

                        <div className="stats-row">
                            <div className="stat">
                                <strong>{formatNumber(videoData.like_count || 0)}</strong>
                                <label>Likes</label>
                            </div>
                            <div className="stat">
                                <strong>{formatNumber(videoData.follower_count || 0)}</strong>
                                <label>Followers</label>
                            </div>
                            <div className="stat">
                                <strong>{formatNumber(videoData.play_count || 0)}</strong>
                                <label>Plays</label>
                            </div>
                            <div className="stat">
                                <strong>{formatNumber(videoData.share_count || 0)}</strong>
                                <label>Shares</label>
                            </div>
                        </div>

                        <div className="dl-list">
                            {videoData.downloads.map((item, index) => (
                                <button
                                    key={index}
                                    className="dl-button"
                                    onClick={(e) => downloadResource(e, item)}
                                >
                                    <div className="dl-meta">
                                        <span className="dl-name">{item.label}</span>
                                        {item.size && <span className="dl-size">{formatNumber(item.size)}</span>}
                                    </div>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4M7 10l5 5 5-5M12 15V3" /></svg>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .downloader-wrapper { width: 100%; }
                
                .search-card {
                    background: #fff;
                    border: 1px solid var(--border);
                    border-radius: var(--radius-lg);
                    padding: 0.5rem;
                    box-shadow: var(--shadow-md);
                }

                .input-row {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                @media (min-width: 640px) {
                    .input-row { flex-direction: row; padding: 0.25rem; border-radius: 999px; }
                    .search-card { border-radius: 999px; }
                }

                .input-container {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    background: #f1f5f9;
                    border-radius: var(--radius-md);
                    padding: 0 0.5rem;
                }

                @media (min-width: 640px) { .input-container { background: transparent; } }

                input {
                    flex: 1;
                    border: none;
                    background: transparent;
                    padding: 0.875rem 0.5rem;
                    font-size: 14px;
                    outline: none;
                    width: 100%;
                }

                .small-paste-btn {
                    background: #fff;
                    border: 1px solid var(--border);
                    border-radius: var(--radius-sm);
                    padding: 0.4rem 0.8rem;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    white-space: nowrap;
                }

                .action-btn {
                    background: var(--primary);
                    color: #fff;
                    border: none;
                    border-radius: var(--radius-md);
                    padding: 0.875rem 1.5rem;
                    font-weight: 700;
                    cursor: pointer;
                    font-size: 14px;
                    transition: all 0.2s;
                    position: relative;
                }

                @media (min-width: 640px) { .action-btn { border-radius: 999px; } }

                .action-btn:hover { background: var(--primary-hover); }

                .error-box {
                    margin-top: 1rem;
                    padding: 0.75rem 1rem;
                    background: #fef2f2;
                    border: 1px solid #fee2e2;
                    color: #b91c1c;
                    border-radius: var(--radius-md);
                    font-size: 13px;
                }

                .result-area { margin-top: 32px; animation: slideUp 0.3s ease; }

                .author-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; overflow: hidden; }
                .avatar { width: 40px; height: 40px; background: #eef2ff; color: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; border: 1px solid var(--border); flex-shrink: 0; }
                .m-0 { margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .text-muted { color: var(--text-muted); font-size: 13px; }
                .caption-text { font-size: 14px; margin-bottom: 1.5rem; word-break: break-word; }

                .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.375rem; margin-bottom: 1.5rem; }
                .stat { background: #f8fafc; padding: 0.5rem 0.25rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border); min-width: 0; }
                .stat strong { display: block; font-size: 13px; overflow: hidden; text-overflow: ellipsis; }
                .stat label { font-size: 9px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.02em; }

                .dl-list { display: flex; flex-direction: column; gap: 0.5rem; }
                .dl-button { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; background: #fff; border: 1px solid var(--border); border-radius: var(--radius-md); cursor: pointer; transition: 0.2s; color: var(--text-main); }
                .dl-button:hover { border-color: var(--primary); background: #f5f3ff; }
                .dl-meta { display: flex; flex-direction: column; align-items: flex-start; }
                .dl-name { font-weight: 700; font-size: 14px; }
                .dl-size { font-size: 11px; color: var(--text-muted); }

                .loader { display: none; width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite; position: absolute; left: 50%; top: 50%; margin-left: -8px; margin-top: -8px; }
                @keyframes spin { to { transform: rotate(360deg); } }
                .loading span { opacity: 0; }
                .loading .loader { display: block; }

                @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                .btn-loader { width: 14px; height: 14px; border: 2px solid rgba(0,0,0,0.1); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; display: inline-block; vertical-align: middle; margin-right: 8px; }
            `}</style>
        </div>
    );
}

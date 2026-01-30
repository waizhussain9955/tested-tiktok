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
        <>
            <div className="converter-card">
                <div className="input-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1.1em" viewBox="0 0 640 512" fill="currentColor" className="input-icon" style={{ marginLeft: '0.75rem', color: 'var(--text-muted)' }}>
                        <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Paste TikTok video link here..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyPress={handleKeyPress}
                        autoComplete="off"
                    />
                    <button className="paste-btn" onClick={handlePaste} title="Paste from clipboard">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="currentColor">
                            <path d="M384 32H320V.5c0-10.7-18.7-22.5-33.9-22.5H161.9c-15.2 0-33.9 11.8-33.9 22.5V32H64C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zM176 35.2V76.8h96V35.2c0-1.8.7-3.2 1.6-3.2h-99.2c.9 0 1.6 1.4 1.6 3.2zM400 416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16h48v51.2c0 15.9 12.9 28.8 28.8 28.8h115.2c15.9 0 28.8-12.9 28.8-28.8V80h48c8.8 0 16 7.2 16 16v320z" />
                        </svg>
                        <span>Paste</span>
                    </button>
                </div>
                <button
                    className={`primary-btn ${loading ? 'btn-loading' : ''}`}
                    onClick={handleDownload}
                    disabled={loading}
                >
                    <span className="btn-text">Download</span>
                    <div className="loader"></div>
                </button>
            </div>

            {error && (
                <div className="error-msg">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#ef4444">
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}

            {videoData && (
                <div className="result-container">
                    <div className="video-card">
                        <div className="card-header">
                            <div className="author-avatar">{videoData.author.charAt(0).toUpperCase()}</div>
                            <div className="author-info">
                                <h4>@{videoData.author}</h4>
                                <p>TikTok Creator</p>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="caption">{videoData.caption || 'No caption'}</p>

                            <div className="stats-grid">
                                <div className="stat-item">
                                    <span>{formatNumber(videoData.play_count || 0)}</span>
                                    <label>Plays</label>
                                </div>
                                <div className="stat-item">
                                    <span>{formatNumber(videoData.like_count || 0)}</span>
                                    <label>Likes</label>
                                </div>
                                <div className="stat-item">
                                    <span>{formatNumber(videoData.share_count || 0)}</span>
                                    <label>Shares</label>
                                </div>
                            </div>

                            <div className="downloads-list">
                                {videoData.downloads.map((item, index) => (
                                    <button
                                        key={index}
                                        className="saas-download-btn"
                                        onClick={(e) => downloadResource(e, item)}
                                    >
                                        <div className="dl-info">
                                            <span className="dl-label">{item.label}</span>
                                            {item.size && <span className="dl-size">{formatNumber(item.size)}</span>}
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="currentColor">
                                            <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .error-msg {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-top: 1.5rem;
                    padding: 1rem;
                    background: #fef2f2;
                    border: 1px solid #fee2e2;
                    border-radius: var(--radius-md);
                    color: #991b1b;
                    font-size: 0.875rem;
                }
                .caption {
                    font-size: 0.9375rem;
                    color: var(--text-main);
                    margin-bottom: 1rem;
                }
                .author-avatar {
                    width: 44px;
                    height: 44px;
                    background: #f1f5f9;
                    color: var(--primary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    border: 1px solid var(--border);
                }
                .author-info h4 { margin: 0; font-size: 1rem; }
                .author-info p { margin: 0; font-size: 0.8125rem; color: var(--text-muted); }
                
                .downloads-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.625rem;
                }

                .saas-download-btn {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0.875rem 1.25rem;
                    background: #fff;
                    border: 1px solid var(--border);
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    transition: all 0.2s ease;
                    color: var(--text-main);
                }

                .saas-download-btn:hover {
                    border-color: var(--primary);
                    background: #f5f3ff;
                }

                .dl-info {
                    display: flex;
                    flex-direction: column;
                    text-align: left;
                }

                .dl-label {
                    font-weight: 600;
                    font-size: 0.9375rem;
                }

                .dl-size {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                }

                .btn-loader {
                    width: 14px;
                    height: 14px;
                    border: 2px solid rgba(0,0,0,0.1);
                    border-top-color: currentColor;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                    display: inline-block;
                    margin-right: 8px;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </>
    );
}

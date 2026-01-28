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

    return (
        <>
            <div className="converter-card">
                <div className="input-group">
                    <div className="input-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" fill="currentColor" className="input-icon">
                            <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
                        </svg>
                        <input
                            type="text"
                            id="tiktok-url"
                            placeholder="Paste TikTok video link here..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyPress={handleKeyPress}
                            autoComplete="off"
                        />
                        <button
                            id="paste-btn"
                            className="paste-btn"
                            onClick={handlePaste}
                            title="Paste from clipboard"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="currentColor">
                                <path d="M384 32H320V.5c0-10.7-18.7-22.5-33.9-22.5H161.9c-15.2 0-33.9 11.8-33.9 22.5V32H64C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zM176 35.2V76.8h96V35.2c0-1.8.7-3.2 1.6-3.2h-99.2c.9 0 1.6 1.4 1.6 3.2zM400 416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16h48v51.2c0 15.9 12.9 28.8 28.8 28.8h115.2c15.9 0 28.8-12.9 28.8-28.8V80h48c8.8 0 16 7.2 16 16v320z" />
                            </svg>
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
            </div>

            {/* Error Message */}
            {error && (
                <div className="error-msg" style={{ display: 'flex' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="currentColor">
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}

            {/* Result Container */}
            {videoData && (
                <div className="result-container">
                    <div className="video-card">
                        <div className="card-header">
                            <div className="author-avatar">
                                {videoData.author.charAt(0).toUpperCase()}
                            </div>
                            <div className="author-info">
                                <h4>@{videoData.author}</h4>
                                <p>TikTok Creator</p>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="caption">{videoData.caption || 'No caption provided.'}</div>

                            <div className="stats-grid">
                                <div className="stat-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="0.8rem" viewBox="0 0 384 512" fill="var(--secondary)" style={{ marginBottom: '0.5rem', display: 'block' }}>
                                        <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                                    </svg>
                                    <span>{formatNumber(videoData.play_count || 0)}</span>
                                    <label>Plays</label>
                                </div>
                                <div className="stat-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="0.8rem" viewBox="0 0 512 512" fill="var(--primary)" style={{ marginBottom: '0.5rem', display: 'block' }}>
                                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                                    </svg>
                                    <span>{formatNumber(videoData.like_count || 0)}</span>
                                    <label>Likes</label>
                                </div>
                                <div className="stat-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="0.8rem" viewBox="0 0 576 512" fill="#7c3aed" style={{ marginBottom: '0.5rem', display: 'block' }}>
                                        <path d="M352 224H305.5c-45 0-81.5 36.5-81.5 81.5c0 22.3 10.3 34.3 19.2 40.5c6.8 4.7 12.8 12 12.8 20.3c0 9.8-8 17.8-17.8 17.8h-2.5c-2.4 0-4.8-.4-7.1-1.4C210.8 374.8 128 333.4 128 240c0-79.5 64.5-144 144-144h80V34.7C352 15.5 367.5 0 386.7 0c8.6 0 16.8 3.2 23.2 8.9L548.1 133.3c7.6 6.8 11.9 16.5 11.9 26.7s-4.3 19.9-11.9 26.7l-139 125.1c-5.9 5.3-13.5 8.2-21.4 8.2H384c-17.7 0-32-14.3-32-32V224zM80 96c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16H400c8.8 0 16-7.2 16-16V384c0-17.7 14.3-32 32-32s32 14.3 32 32v48c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V112C0 67.8 35.8 32 80 32h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H80z" />
                                    </svg>
                                    <span>{formatNumber(videoData.share_count || 0)}</span>
                                    <label>Shares</label>
                                </div>
                            </div>

                            <button
                                className="download-link"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    const btn = e.currentTarget;
                                    const originalText = btn.innerText;
                                    const originalContent = btn.innerHTML;

                                    // Visual feedback
                                    btn.innerHTML = '<div class="loader" style="display:inline-block; vertical-align:middle; margin-right:8px; width:16px; height:16px; border-width:2px;"></div> Downloading...';
                                    btn.style.opacity = "0.8";
                                    btn.style.pointerEvents = "none";

                                    try {
                                        // Fetch as blob to force download (prevents playing in browser)
                                        const response = await fetch(videoData.mp4_url);
                                        if (!response.ok) throw new Error('Network response was not ok');

                                        const blob = await response.blob();
                                        const url = window.URL.createObjectURL(blob);

                                        const link = document.createElement('a');
                                        link.href = url;
                                        link.setAttribute('download', `tiktok_${videoData.video_id}.mp4`);
                                        document.body.appendChild(link);
                                        link.click();

                                        // Cleanup
                                        document.body.removeChild(link);
                                        window.URL.revokeObjectURL(url);
                                    } catch (err) {
                                        console.error("Direct download failed, falling back to link", err);
                                        // Fallback: Open in new tab which usually triggers download/play
                                        const link = document.createElement('a');
                                        link.href = videoData.mp4_url;
                                        link.setAttribute('download', `tiktok_${videoData.video_id}.mp4`);
                                        link.setAttribute('target', '_blank');
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    } finally {
                                        // Reset button state
                                        setTimeout(() => {
                                            btn.innerHTML = originalContent;
                                            btn.style.opacity = "1";
                                            btn.style.pointerEvents = "auto";
                                        }, 1000);
                                    }
                                }}
                                style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    background: 'var(--secondary)',
                                    color: 'var(--dark)',
                                    textDecoration: 'none',
                                    padding: '1.2rem',
                                    borderRadius: '16px',
                                    fontWeight: '800',
                                    fontSize: '1.1rem',
                                    transition: 'transform 0.3s',
                                    border: 'none',
                                    width: '100%',
                                    cursor: 'pointer',
                                    marginTop: '1.5rem'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', pointerEvents: 'none' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="currentColor">
                                        <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                                    </svg>
                                    Download Video
                                </div>
                            </button>
                            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '1rem' }}>
                                High quality MP4 ready for download.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

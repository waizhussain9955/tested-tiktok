// API Service Layer - Abstracted for easy replacement
"use client";

const TIKWM_API_URL = 'https://www.tikwm.com/api/';

/**
 * Download TikTok video using external API
 * This function is abstracted to make it easy to replace with your own backend later
 */
export async function downloadTikTokVideo(url) {
    try {
        const response = await fetch(TIKWM_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: url,
                hd: 1
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch video data from API');
        }

        const data = await response.json();

        if (data.code !== 0 || !data.data) {
            throw new Error(data.msg || 'Invalid video URL or video not found');
        }

        // Transform API response to our standard format
        return {
            success: true,
            video: {
                video_id: data.data.id || '',
                author: data.data.author?.unique_id || data.data.author?.nickname || 'Unknown',
                caption: data.data.title || '',
                play_count: data.data.play_count || 0,
                like_count: data.data.digg_count || 0,
                share_count: data.data.share_count || 0,
                comment_count: data.data.comment_count || 0,
                mp4_url: data.data.hdplay || data.data.play || '', // Keep for backward compatibility/fallback
                downloads: [
                    // HD Video (Usually 1080p source or High Quality)
                    ...(data.data.hdplay ? [{
                        type: 'video',
                        label: '1080p (HD)',
                        quality: '1080p',
                        format: 'mp4',
                        url: data.data.hdplay,
                        size: data.data.hd_size
                    }] : []),
                    // Standard Video (720p or Original Watermarked sometimes, but usually clean on tikwm)
                    ...(data.data.play && data.data.play !== data.data.hdplay ? [{
                        type: 'video',
                        label: '720p (Standard)',
                        quality: '720p',
                        format: 'mp4',
                        url: data.data.play,
                        size: data.data.size
                    }] : []),
                    // Audio
                    ...(data.data.music ? [{
                        type: 'audio',
                        label: 'MP3 - Audio Only',
                        quality: 'audio',
                        format: 'mp3',
                        url: data.data.music,
                        size: data.data.music_info?.size
                    }] : [])
                ],
                duration: data.data.duration || 0,
                cover: data.data.cover || data.data.origin_cover || '',
            }
        };
    } catch (error) {
        console.error('API Error:', error);
        return {
            success: false,
            error: error.message || 'Failed to download video'
        };
    }
}

/**
 * Format numbers for display (e.g., 1000 -> 1K)
 */
export function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

/**
 * Validate TikTok URL
 */
export function isValidTikTokUrl(url) {
    const tiktokPatterns = [
        /tiktok\.com\/@[\w.-]+\/video\/\d+/,
        /vm\.tiktok\.com\/[\w]+/,
        /vt\.tiktok\.com\/[\w]+/,
        /tiktok\.com\/t\/[\w]+/,
        /m\.tiktok\.com\/v\/\d+/
    ];

    return tiktokPatterns.some(pattern => pattern.test(url));
}

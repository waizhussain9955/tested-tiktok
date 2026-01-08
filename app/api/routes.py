"""
API routes for TikTok downloader.
"""

from fastapi import APIRouter, HTTPException, status
from app.models.schemas import (
    TikTokDownloadRequest,
    TikTokDownloadResponse,
    ErrorResponse,
    VideoData
)
import hashlib
import logging
from typing import Optional
import httpx
from fastapi import APIRouter, HTTPException, status
from fastapi.responses import StreamingResponse
from app.models.schemas import (
    TikTokDownloadRequest,
    TikTokDownloadResponse,
    ErrorResponse,
    VideoData
)
from app.services.tiktok_extractor import TikTokExtractor
from app.cache.memory_cache import get_cache
from app.config import settings

logger = logging.getLogger(__name__)

router = APIRouter()
extractor = TikTokExtractor()
cache = get_cache()


@router.get("/tiktok/proxy")
async def proxy_video(
    url: str, 
    filename: str = "tiktok_video.mp4", 
    cookies: Optional[str] = None,
    alt_urls: Optional[str] = None
):
    """
    Enhanced Proxy with Fallback.
    Tries multiple URLs if the primary one fails.
    """
    if not url:
        raise HTTPException(status_code=400, detail="Missing video URL")

    # Prepare URL list
    target_urls = [url]
    if alt_urls:
        target_urls.extend([u.strip() for u in alt_urls.split(",") if u.strip()])

    # Identity Synchronization (Must match extractor)
    user_agent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
    
    headers = {
        'User-Agent': user_agent,
        'Referer': 'https://www.tiktok.com/',
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'Range': 'bytes=0-',
    }
    if cookies:
        headers['Cookie'] = cookies

    async def stream_video():
        async with httpx.AsyncClient(headers=headers, follow_redirects=True, timeout=120.0, http2=False) as client:
            for current_url in target_urls:
                if current_url.startswith('//'): current_url = 'https:' + current_url
                
                logger.info(f"Proxying from: {current_url[:60]}...")
                try:
                    async with client.stream("GET", current_url) as response:
                        if response.status_code in (200, 206):
                            async for chunk in response.aiter_bytes(chunk_size=1024*512):
                                yield chunk
                            return # Success
                        else:
                            logger.warning(f"CDN {current_url[:30]} fail ({response.status_code}), trying next...")
                except Exception as e:
                    logger.error(f"Failed to stream from {current_url[:30]}: {str(e)}")
                    continue

    return StreamingResponse(
        stream_video(),
        media_type="video/mp4",
        headers={
            "Content-Disposition": f'attachment; filename="{filename}"',
            "Accept-Ranges": "bytes",
            "Cache-Control": "public, max-age=3600"
        }
    )


def generate_cache_key(url: str) -> str:
    """
    Generate a cache key from URL.
    
    Args:
        url: TikTok video URL
        
    Returns:
        MD5 hash of the URL
    """
    return f"tiktok:{hashlib.md5(url.encode()).hexdigest()}"


@router.post(
    "/tiktok/download",
    response_model=TikTokDownloadResponse,
    responses={
        400: {"model": ErrorResponse, "description": "Invalid request"},
        404: {"model": ErrorResponse, "description": "Video not found"},
        500: {"model": ErrorResponse, "description": "Server error"},
    },
    summary="Download TikTok video",
    description="Extract video data and download URL from a TikTok video link",
)
async def download_video(request: TikTokDownloadRequest):
    """
    Download TikTok video endpoint.
    
    This endpoint:
    1. Validates the TikTok URL
    2. Checks cache for existing data
    3. If not cached, extracts from TikTok
    4. Returns video URL and metadata
    5. Stores result in cache
    
    Args:
        request: TikTokDownloadRequest with video URL
        
    Returns:
        TikTokDownloadResponse with video data
        
    Raises:
        HTTPException: On validation or extraction errors
    """
    url = request.url
    logger.info(f"Download request received: {url}")
    
    try:
        # Generate cache key
        cache_key = generate_cache_key(url)
        
        # Check cache first
        cached_data = await cache.get(cache_key)
        if cached_data:
            logger.info(f"Returning cached data for: {url}")
            return TikTokDownloadResponse(
                status="success",
                video=VideoData(**cached_data),
                cached=True
            )
        
        # Extract from TikTok
        logger.info(f"Extracting fresh data for: {url}")
        video_data = await extractor.extract_video_data(url)
        
        # Store in cache
        await cache.set(cache_key, video_data, ttl=settings.cache_ttl)
        
        # Return response
        return TikTokDownloadResponse(
            status="success",
            video=VideoData(**video_data),
            cached=False
        )
        
    except ValueError as e:
        # Validation or extraction errors
        logger.warning(f"Extraction failed for {url}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "status": "error",
                "error": "extraction_failed",
                "message": str(e)
            }
        )
    except Exception as e:
        # Unexpected errors
        logger.error(f"Unexpected error for {url}: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "status": "error",
                "error": "internal_error",
                "message": "An unexpected error occurred. Please try again later."
            }
        )


@router.get(
    "/health",
    summary="Health check",
    description="Check if the API is running",
)
async def health_check():
    """
    Health check endpoint.
    
    Returns:
        Status information
    """
    return {
        "status": "healthy",
        "service": settings.app_name,
        "version": settings.app_version,
        "environment": settings.environment
    }


@router.post(
    "/cache/clear",
    summary="Clear cache",
    description="Clear all cached video data (admin endpoint)",
)
async def clear_cache():
    """
    Clear all cache entries.
    
    Note: In production, protect this with authentication.
    
    Returns:
        Success message
    """
    await cache.clear()
    logger.info("Cache cleared via API")
    return {
        "status": "success",
        "message": "Cache cleared successfully"
    }

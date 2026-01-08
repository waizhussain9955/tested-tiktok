"""
In-memory cache implementation with TTL support.
Thread-safe and production-ready for single-server deployments.
"""

import asyncio
import time
import json
from typing import Optional, Any, Dict
from .base import BaseCache
import logging

logger = logging.getLogger(__name__)


class MemoryCache(BaseCache):
    """
    In-memory cache with TTL support.
    
    Uses a dictionary with expiration timestamps.
    Suitable for single-server deployments or development.
    For multi-server production, swap with RedisCache.
    """
    
    def __init__(self):
        self._cache: Dict[str, tuple[Any, float]] = {}
        self._lock = asyncio.Lock()
        logger.info("MemoryCache initialized")
    
    async def get(self, key: str) -> Optional[Any]:
        """Retrieve from cache if not expired."""
        async with self._lock:
            if key not in self._cache:
                logger.debug(f"Cache MISS: {key}")
                return None
            
            value, expiry = self._cache[key]
            
            # Check if expired
            if time.time() > expiry:
                logger.debug(f"Cache EXPIRED: {key}")
                del self._cache[key]
                return None
            
            logger.debug(f"Cache HIT: {key}")
            return value
    
    async def set(self, key: str, value: Any, ttl: int) -> None:
        """Store in cache with expiration time."""
        async with self._lock:
            expiry = time.time() + ttl
            # Store as JSON to simulate Redis behavior (ensures serializability)
            serialized = json.loads(json.dumps(value))
            self._cache[key] = (serialized, expiry)
            logger.debug(f"Cache SET: {key} (TTL: {ttl}s)")
    
    async def delete(self, key: str) -> None:
        """Remove from cache."""
        async with self._lock:
            if key in self._cache:
                del self._cache[key]
                logger.debug(f"Cache DELETE: {key}")
    
    async def clear(self) -> None:
        """Clear all cache."""
        async with self._lock:
            count = len(self._cache)
            self._cache.clear()
            logger.info(f"Cache CLEARED: {count} items removed")
    
    async def cleanup_expired(self) -> None:
        """Remove expired entries (optional maintenance)."""
        async with self._lock:
            now = time.time()
            expired_keys = [
                key for key, (_, expiry) in self._cache.items()
                if now > expiry
            ]
            for key in expired_keys:
                del self._cache[key]
            
            if expired_keys:
                logger.info(f"Cleaned up {len(expired_keys)} expired cache entries")


# Singleton instance
_cache_instance: Optional[MemoryCache] = None


def get_cache() -> MemoryCache:
    """
    Get cache singleton instance.
    
    Returns:
        Cache instance
    """
    global _cache_instance
    if _cache_instance is None:
        _cache_instance = MemoryCache()
    return _cache_instance

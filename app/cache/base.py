"""
Abstract base cache interface.
Allows easy swapping between memory cache and Redis.
"""

from abc import ABC, abstractmethod
from typing import Optional, Any


class BaseCache(ABC):
    """Abstract cache interface for dependency injection."""
    
    @abstractmethod
    async def get(self, key: str) -> Optional[Any]:
        """
        Retrieve value from cache.
        
        Args:
            key: Cache key
            
        Returns:
            Cached value or None if not found/expired
        """
        pass
    
    @abstractmethod
    async def set(self, key: str, value: Any, ttl: int) -> None:
        """
        Store value in cache with TTL.
        
        Args:
            key: Cache key
            value: Value to store (must be JSON-serializable)
            ttl: Time to live in seconds
        """
        pass
    
    @abstractmethod
    async def delete(self, key: str) -> None:
        """
        Delete value from cache.
        
        Args:
            key: Cache key
        """
        pass
    
    @abstractmethod
    async def clear(self) -> None:
        """Clear all cache entries."""
        pass

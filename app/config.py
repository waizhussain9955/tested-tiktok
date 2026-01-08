"""
Configuration management using pydantic-settings.
Loads from environment variables with sensible defaults.
"""

from pydantic_settings import BaseSettings
from typing import Literal


class Settings(BaseSettings):
    """Application settings with environment variable support."""
    
    # App Info
    app_name: str = "TikTok Downloader API"
    app_version: str = "1.0.0"
    environment: Literal["development", "production"] = "development"
    
    # Server
    host: str = "0.0.0.0"
    port: int = 8000
    
    # Cache
    cache_ttl: int = 3600  # 1 hour
    cache_type: Literal["memory", "redis"] = "memory"
    
    # API
    api_prefix: str = "/api/v1"
    
    # Rate Limiting
    rate_limit_per_minute: int = 30
    
    # Redis (optional, for production)
    redis_host: str = "localhost"
    redis_port: int = 6379
    redis_db: int = 0
    
    class Config:
        env_file = ".env"
        case_sensitive = False


# Global settings instance
settings = Settings()

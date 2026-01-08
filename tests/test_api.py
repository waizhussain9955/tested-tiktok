"""
Test cases for TikTok Downloader API.
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


class TestHealthEndpoint:
    """Test health check endpoint."""
    
    def test_health_check(self):
        """Test that health check returns 200 OK."""
        response = client.get("/api/v1/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "version" in data


class TestTikTokDownload:
    """Test TikTok download endpoint."""
    
    def test_invalid_url_format(self):
        """Test that invalid URL format returns 422."""
        response = client.post(
            "/api/v1/tiktok/download",
            json={"url": "https://youtube.com/watch?v=123"}
        )
        assert response.status_code == 422
    
    def test_missing_url(self):
        """Test that missing URL returns 422."""
        response = client.post(
            "/api/v1/tiktok/download",
            json={}
        )
        assert response.status_code == 422
    
    def test_valid_url_structure(self):
        """Test request with valid URL structure."""
        # Note: This will fail extraction (video doesn't exist)
        # but should pass URL validation
        response = client.post(
            "/api/v1/tiktok/download",
            json={"url": "https://www.tiktok.com/@test/video/1234567890"}
        )
        # Will return 400 because video doesn't exist, but URL is valid
        assert response.status_code in [400, 500]


class TestCacheManagement:
    """Test cache management."""
    
    def test_cache_clear(self):
        """Test cache clear endpoint."""
        response = client.post("/api/v1/cache/clear")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])

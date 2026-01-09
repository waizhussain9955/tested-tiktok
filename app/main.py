"""
FastAPI application entry point.
"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.api.routes import router
from app.config import settings
import os
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)


def create_app() -> FastAPI:
    """
    Create and configure FastAPI application.
    """
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        docs_url="/api/docs",
        redoc_url="/api/redoc",
    )
    
    # CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Include API routes
    app.include_router(router, prefix=settings.api_prefix)
    
    # Create static directory if it doesn't exist
    if not os.path.exists("public/static"):
        os.makedirs("public/static")
    
    # Mount static files
    app.mount("/static", StaticFiles(directory="public/static"), name="static")

    @app.get("/")
    async def read_index():
        """Serve the frontend index.html."""
        return FileResponse("public/static/index.html")
    
    @app.on_event("startup")
    async def startup_event():
        """Run on application startup."""
        logger.info(f"🚀 {settings.app_name} v{settings.app_version} starting...")
        logger.info(f"📝 Environment: {settings.environment}")
        logger.info(f"💾 Cache type: {settings.cache_type}")
        logger.info(f"⏱️  Cache TTL: {settings.cache_ttl}s")
    
    @app.on_event("shutdown")
    async def shutdown_event():
        """Run on application shutdown."""
        logger.info("👋 Application shutting down...")
    
    return app


# Create app instance
app = create_app()


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.environment == "development",
        log_level="info"
    )

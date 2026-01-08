# TikTok Downloader API

A high-performance, production-ready FastAPI backend for extracting TikTok video data using public info only.

## 🚀 Features
- **No API Key Required**: Uses public data extraction.
- **Fast**: Built with FastAPI and `httpx` (fully async).
- **Metadata Rich**: Returns author, caption, music, and stats.
- **Cache-Enabled**: Includes an in-memory cache, Redis-ready.
- **Dockerized**: One-click deployment with Docker.

## 🛠️ Tech Stack
- **Framework**: FastAPI
- **Client**: httpx (Async)
- **Cache**: In-memory (Default) / Redis
- **Container**: Docker + Docker Compose

## 📦 Installation

### Local Setup
1. Clone the repository
2. Create a virtual environment: `python -m venv venv`
3. Activate it: `source venv/bin/activate` (or `venv\Scripts\activate` on Windows)
4. Install dependencies: `pip install -r requirements.txt`
5. Run the server: `uvicorn app.main:app --reload`

### Running with Docker
```bash
docker-compose up -d --build
```

## 🔌 API Reference

### POST `/api/v1/tiktok/download`
**Request Body:**
```json
{
  "url": "https://www.tiktok.com/@username/video/123456789"
}
```

**Response:**
```json
{
  "status": "success",
  "video": {
    "video_id": "123456789",
    "mp4_url": "https://...",
    "author": "username",
    "caption": "Video description",
    "music": "Music title",
    "play_count": 1000,
    ...
  },
  "cached": false
}
```

## 🛡️ License
MIT License - Extracts public data only. No private API usage.

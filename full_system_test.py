
import asyncio
import httpx
import json

async def full_test():
    base_url = "http://localhost:8000"
    tiktok_url = "https://www.tiktok.com/@mahi_writes714/video/7591810982763040022"
    
    print(f"1. Testing Extraction for: {tiktok_url}")
    async with httpx.AsyncClient(timeout=60.0) as client:
        try:
            resp = await client.post(
                f"{base_url}/api/v1/tiktok/download",
                json={"url": tiktok_url}
            )
            data = resp.json()
            if data.get("status") == "success":
                mp4_url = data["video"]["mp4_url"]
                with open("mp4_url.txt", "w") as f: f.write(mp4_url)
                print(f"   SUCCESS: Saved MP4 URL to mp4_url.txt")
                
                # Now test proxy with fallback
                cookies = data["video"].get("cookies")
                alt_urls = data["video"].get("alternative_urls", [])
                
                params = f"&url={mp4_url}"
                if cookies: params += f"&cookies={cookies}"
                if alt_urls: 
                    params += f"&alt_urls={','.join(alt_urls)}"
                    print(f"   Alternative URLs count: {len(alt_urls)}")
                
                proxy_url = f"{base_url}/api/v1/tiktok/proxy?{params}"
                print(f"2. Testing Proxy Download with Fallback Support...")
                
                proxy_resp = await client.get(proxy_url, follow_redirects=True, timeout=60.0)
                print(f"   Proxy Status: {proxy_resp.status_code}")
                print(f"   File Size Received: {len(proxy_resp.content)} bytes")
                
                # Test Direct with spoofed headers
                print(f"3. Testing DIRECT Download with spoofed headers and cookies...")
                direct_headers = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Referer': 'https://www.tiktok.com/'
                }
                if cookies:
                    direct_headers['Cookie'] = cookies
                    
                try:
                    direct_resp = await client.get(mp4_url, headers=direct_headers, follow_redirects=True, timeout=30.0)
                    print(f"   Direct Status: {direct_resp.status_code}")
                    print(f"   Direct Size: {len(direct_resp.content)} bytes")
                except Exception as de:
                    print(f"   Direct Failed: {de}")

                if proxy_resp.status_code == 200 and len(proxy_resp.content) > 1000:
                    print("✅ FULL SYSTEM WORKING")
                else:
                    print("❌ PROXY FAILED OR RETURNED EMPTY")
            else:
                print(f"❌ EXTRACTION FAILED: {data}")
        except Exception as e:
            import traceback
            print(f"❌ TEST ERROR: {type(e).__name__}: {str(e)}")
            traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(full_test())

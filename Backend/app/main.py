# Author: Kyle Angeles
# File-Name: main.py
# This components handles everything for the backend -> rate limit, security, and more 
from fastapi import FastAPI, Request
# from .routes import auth
from fastapi.responses import JSONResponse
from .middleware.rateLimit import RateLimiterStore
import time

app = FastAPI()
# app.include_router(auth.router)



# Rate Limiter Module
limiter = RateLimiterStore(max_tokens=10, refill_rate=2, interval=1.0)

@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    """  
        Middleware that enfoces per IP rate limiting on every request.
        Adds standard rate limit headers to every response
    """
    
    client_ip = request.client.host
    bucket = limiter.get_bucket(client_ip)
    
    if not bucket.allow_request():
        retry_after = bucket.get_reset_time() - time.time()
        return JSONResponse(
            status_code=429,
            content={"detail": "Too many requests. Try again please"},
            headers={
                "Retry-After": str(max(1, int(retry_after))),
                "X-RateLimit-Limit": str(bucket.max_tokens),
                "X-RateLimit-Remaining": str(bucket.get_remaining()),
                "X-RateLimit-Reset": str(int(bucket.get_reset_time())),
            },
        )
        
    # Request is allowed. Process it and add rate limit headers to the response
    response = await call_next(request)
    response.headers["X-RateLimit-Limit"] = str(bucket.max_tokens)
    response.headers["X-RateLimit-Remaining"] = str(bucket.get_remaining())
    response.headers["X-RateLimit-Reset"] = str(int(bucket.get_reset_time()))
    return response
    
@app.get("/")
async def root():
    return {"message": "Testing"}

@app.get("/data")
async def get_data():
    return {"data": "Some important information"}

@app.get("/health")
async def health():
    return {"status": "ok"}
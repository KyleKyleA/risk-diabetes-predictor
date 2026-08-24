import time
import logging
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

logger = logging.getLogger("api")

class RequestLogginMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        start_time = time.perf_counter()
        
        # Log Request
        logger.info(
            f"Request: {request.method} {request.url.path} from {request.client.host}"
        )
        
        # Process
        response = await call_next(request)
        
        # lg response 
        duration_ms = (time.perf_counter() - start_time) * 1000
        logger.info(
            f"Response: {request.method} {request.url.path} - {response.status_code} ({duration_ms:.2f}ms)"
        )
        
        return response

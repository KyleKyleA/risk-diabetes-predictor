# Author: Kyle Angeles 
# File-Name: rateLimit.py
# Description: This middleware component handles the amount of users requests the system can intake


import time 
import threading
from collections import defaultdict


class TokenBucket:
    """
        Using the token bucket algorithm 
        and referring back to web development enterprise code
        comparing express javascript to python

        :params max -> holds max number of tokens the bucket can hold
        :params refill -> number of tokens needed to be refill per each user session or request
        :params interval => time it takes to refill tokens
    """
    
    def __init__(self, max_tokens: int, refill_rate: int, interval: float):
        
        assert max_tokens > 0, "max_tokens always must be positive"
        assert refill_rate > 0
        assert interval > 0
        
        self.max_tokens = max_tokens
        self.refill_rate = refill_rate
        self.interval = interval
        
        self.tokens = max_tokens
        self.refilled_at = time.time()
        self.lock = threading.Lock()
        

    def _refill(self):
        now = time.time()
        elapsed = now - self.refilled_at
        
        if elapsed >= self.interval:
            num_refills = int(elapsed // self.interval)
            self.tokens = min(
                self.max_tokens,
                self.tokens + num_refills * self.refill_rate
            )
            self.refilled_at += num_refills * self.interval
        

    def allow_request(self, tokens: int = 1) -> bool:
        """
            Attempt to consume tokens from the bucket
            
            return true if the request is allowed
            otherwise returned false if the request does not have enough token
        """
        
        with self.lock:
            self._refill()
            
            if self.tokens >= tokens:
                self.tokens -= tokens 
                return True 
            return False 
    
    def get_remaining(self) -> int:
        """
            Return the number of available tokens
        """
        with self.lock:
            self._refill()
            return self.tokens
        
    def get_reset_time(self) -> float:
        """
            Return the univx timestamp when the next refill occurs
        """
        with self.lock: 
            return self.refilled_at + self.interval
        
    
    
    
class RateLimiterStore:
    """
        Manages per user Token buckets 
        
        each client key trackers per IP address or per authenticated user
    """
    
    def __init__(self, max_tokens: int, refill_rate: int, interval: float):
        self.max_tokens = max_tokens
        self.refill_rate = refill_rate
        self.interval = interval
        self._buckets: dict[str, TokenBucket] = {}
        self._lock = threading.Lock()
        
    def get_bucket(self, key: str) -> TokenBucket:
        """
            Return the token bucket for a given client key.
            create new bucket if one doesn't exist
        """
        
        with self._lock:
            if key not in self._buckets:
                self._buckets[key] = TokenBucket(
                    max_tokens=self.max_tokens,
                    refill_rate=self.refill_rate,
                    interval=self.interval,
                )
            return self._buckets[key]
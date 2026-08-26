from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.responses import JSONResponse
from starlette.middleware.authentication import AuthenticationMiddleware
from starlette.authentication import AuthCredentials, AuthenticationBackend, SimpleUser, UnauthenticatedUser
from starlette.middleware.base import BaseHTTPMiddleware

app = FastAPI()

class SimpleAuthBackend(AuthenticationBackend):
    async def authenticate(self, request: Request):
        api_key = request.headers.get("X-API-KEY") 
        
        if api_key == "SECRET_KEY":
            return AuthCredentials(["admin", "user"]), SimpleUser("admin_user")
        
        return AuthCredentials([]), UnauthenticatedUser() 

app.add_middleware(AuthenticationMiddleware, backend=SimpleAuthBackend())


# Sample users but when we build the db it will have users
# This is only used in the backend and for functional testing using docker
@app.get("/admin")
async def admin_endpoint(request: Request):
    if not request.user.is_authenticated:
        raise HTTPException(status_code=401, detail="Authentication is required")
    if "admin" not in request.auth.scopes:
        raise HTTPException(status_code=403, detail="Admin access required")
    return {"message": "Welcome, admin!"}

@app.get("/public")
async def public_endpoint():
    return {"message": "Public access"}
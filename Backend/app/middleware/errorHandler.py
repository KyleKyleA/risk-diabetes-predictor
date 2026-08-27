#Author: Kyle Angeles
#File-Name: errorHandler.py 
# Description: This component handles the error of the app but in the backend side of the app it will give a status 500 code
# through requests 
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

app = FastAPI()

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server error"}
    )
    

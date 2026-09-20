# Author: Kyle Angeles
# File-Name: auth.py
# Description: This component is used for the endpoints for the signup and login
# Basic API structure through FashAPI
from fastapi import APIRouter, HTTPException, Depends, status

from .. import schema
from ..database import supabase
from fastapi.security import OAuth2PasswordRequestForm


router = APIRouter(tags=["auth"])




            
        
# TODO:
# FIX THIS LINE OF CODE      
@router.post("/signup", response_model=schema.UserResponse)
def signup(user: schema.UserCreate):
    # checks if the user has already signed up for the app
    try:
        response = supabase.auth.sign_up(
            {
                "email": user.email,
                "password": user.password,
                "options": {
                    "data": {
                        # Your SQL trigger expects metadata named "name".
                        "name": user.username,
                        "phone": user.phone or "",
                        "dob": str(user.dob) if user.dob else None,
                    }
                },
            }
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not create account. That email may already be registered.",
        )

    if not response.user:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Supabase did not create the account.",
        )

    return {
        "message": "Account created successfully.",
        "user_id": response.user.id,
        "email": response.user.email,
    }
    
 


# Login endpoint api
@router.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    # database 
    try:
        response = supabase.auth.sign_in_with_password({
            
            "email": form_data.username,
            "password": form_data.password
        }
        )
    
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail= "Incorrect password or email",
            headers={"WWW-Authenticate": "Bearer"}
    )
        
    if not response.session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail= "Incorrect password or email",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
   
        
    return {
        "access_token": response.session.access_token,
        "token_type": "bearer",
    }
        

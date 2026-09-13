# Author: Kyle Angeles
# File-Name: auth.py
# Description: This component is used for the endpoints for the signup and login
# Basic API structure through FashAPI
from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from passlib.context import CryptContext
from .. import schema
from ..database import supabase
from .security import create_access_token
from fastapi.security import OAuth2PasswordRequestForm


router = APIRouter(tags=["auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



            
        
# TODO:
# FIX THIS LINE OF CODE      
@router.post("/signup", response_model=schema.UserResponse)
def signup(user: schema.UserCreate):
    # checks if the user has already signed up for the app
    existing_user = (
        supabase.table("users")
        .select("*")
        .or_(f"email.eq.{user.email},username.eq.{user.username}")
        .execute()
        

    )
    if existing_user.data:
        first_match = existing_user.data[0]
        detail = (
            "Email is already registered"
            if first_match.get("email") == user.email
            else "Username is already taken"
            
        )
        raise HTTPException(status_code=400, detail=detail)
    
    # hash password to prevent any hacking
    hashed_password = pwd_context.hash(user.password)
    
    # create new user in the database
    # Name, Email, Phone, Date of birth, password
   
    
    new_user_payload = {
        "username": user.username,
        "email": user.email,
        "phone": user.phone,
        "dob": str(user.dob) if user.dob else None,
        "hashed_password": hashed_password,
    }
    
    response = supabase.table("users").insert(new_user_payload).execute()
    
    if not response.data:
                raise HTTPException(status_code=500, detail="Failed to create user in database")
    return response.data[0]
    
 


# Login endpoint api
@router.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    # database 
    response = (
        supabase.table("users")
        .select("*")
        .eq("username", form_data.username)
        .execute()
    )
    
    user = response.data[0] if response.data else None
    
    
    if not user or not pwd_context.verify(form_data.password, user.get("hashed_password")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
            
        )
        
        
    access_token = create_access_token(data={"sub": user["username"]})
    return {"access_token": access_token, "token_type": "bearer"}
        
        

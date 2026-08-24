# Author: Kyle Angeles
# File-Name: auth.py
# Description: This component is used for the endpoints for the signup and login
# Basic API structure through FashAPI
from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from . import models, schemas
from ..database import SessionLocal
import bcrypt
from ..security import create_access_token
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt, JWTError
from datetime import datetime, timedelta

router = APIRouter(tags=["auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8")[:72], bcrypt.gensalt()).decode("utf-8")


def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode("utf8")[:72], hashed.encode("utf-8"))

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
        
@router.post("/signup/", response_model=schemas.UserResponse)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # checks if the user has already signed up for the app
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email is already registered")
    
    # hash password to prevent any hacking
    hashed_password = pwd_context.hash(user.password)
    
    # create new user in the database
    # Name, Email, Phone, Date of birth, password
    db_user = models.User(username=user.username, email=user.email, phone=user.phone, dob=user.dob, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# Login endpoint api

# Configuration 
# using JWT and Session tokens
SECRET_KEY = "1234" # for example along with that be tested with docker
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Retrieve user from database


# Verification and validation
def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode("utf8")[:72], hashed.encode("utf-8"))

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    # database 
    user = load.user(data.username)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect user name or password",
            headers={"WWW-Authenticate": "Bearer"},
            
        )
    access_token = create_access_token(data={"sub": user["username"]})
    return {"access_token": access_token, "token_type": "bearer"}
        
        

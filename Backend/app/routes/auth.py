# Author: Kyle Angeles
# File-Name: auth.py
# Description: This component is used for the endpoints for the signup and login
# Basic API structure through FashAPI
from fastapi import APIRouter, HTTPException, Depends 
from pydantic import BaseModel
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from . import models, schemas
from ..database import SessionLocal
import bcrypt
from ..security import create_access_token

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


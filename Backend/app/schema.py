# Author: Kyle Angeles
# File-Name: schema.py
# This component will update the current schema through supa base 


# Sample Script from Claude ATM
from pydantic import BaseModel
from datetime import date 
from typing import Optional


class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    phone: Optional[str] = None
    dob: Optional[date] = None


class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True  # lets this serialize directly from a SQLAlchemy models.User instance
    
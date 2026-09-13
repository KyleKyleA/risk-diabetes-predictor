from fastapi import APIRouter, FastAPI, HTTPException
from pydantic import BaseModel

router = APIRouter()


class PredictionRequest(BaseModel):
    gender: str
    age: int
    hypertension: float
    heart_disease: float
    smoking_history: str
    bmi: float
    HBA1C_Level: float
    blood_glucose_level: float
    
    
    

class PredictionResponse(BaseModel):
    risk_score: float # The calculated risk score
    risk_category: str # The category of the risk
    risk_percentage: float # The percentage of risk as a chart -> hopefully to be displayed as different charts
    risk_next_steps: str # Recommended next steps based on the risk assessment
    
   
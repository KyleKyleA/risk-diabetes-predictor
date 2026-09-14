from fastapi import APIRouter, FastAPI, HTTPException
from pydantic import BaseModel, Field 
from typing import Optional 

router = APIRouter()
model = None  # Placeholder for the actual model, which should be loaded here


class PredictionRequest(BaseModel):
    gender: Optional[str] = "Unknown"
    age: Optional [int] = 30
    hypertension: Optional [float] = 0.0
    heart_disease: Optional [float] = 0.0
    smoking_history: Optional [str] = "never"
    bmi: Optional [float] = 22.0
    HBA1C_Level: Optional[float] = 5.5
    blood_glucose_level: Optional [float] = 100.0
    
    
    

class PredictionResponse(BaseModel):
    success: bool = True
    risk_score: float # The calculated risk score
    risk_category: str # The category of the risk
    risk_percentage: float # The percentage of risk as a chart -> hopefully to be displayed as different charts
    risk_next_steps: str # Recommended next steps based on the risk assessment
    
   
@router.post("/predict", response_model=PredictionResponse)
def predict_risk(data: PredictionRequest):
    
    # Real logic from the model would go here. For now, will return a dummy response.
    # In a real scenario, you would preprocess the input data, feed it to the model
    raw_score = 0.75
    
    # For now, we will return a dummy response
    score = 0.75  # Dummy score
    category = "High Risk"  # Dummy category
    percentage = float(raw_score * 100.0) 
    risk_score = min(round(percentage, 2), 100.0)
    next_steps = "Consult a healthcare professional for further evaluation."  # Dummy next steps 
    category = "low" if risk_score < 30 else "medium" if risk_score < 70 else "high"
    
    
    return PredictionResponse(success=True, risk_score=risk_score, risk_category=category, risk_percentage=percentage, risk_next_steps=next_steps)

from fastapi import APIRouter, FastAPI, HTTPException
from pydantic import BaseModel

router = APIRouter()
model = None  # Placeholder for the actual model, which should be loaded here


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
    
   
@router.post("/predict", response_model=PredictionResponse)
def predict_risk(data: PredictionRequest):
    
    # Real logic from the model would go here. For now, will return a dummy response.
    # In a real scenario, you would preprocess the input data, feed it to the model
    
    
    # For now, we will return a dummy response
    score = 0.75  # Dummy score
    category = "High Risk"  # Dummy category
    percentage = 75.0  # Dummy percentage
    next_steps = "Consult a healthcare professional for further evaluation."  # Dummy next steps
    
    risk_score = min(round(score), 100)
    category = "low" if risk_score < 30 else "medium" if risk_score < 70 else "high"
    
    
    return PredictionResponse(risk_score=risk_score, risk_category=category, risk_percentage=percentage, risk_next_steps=next_steps)

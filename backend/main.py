# main.py - FINAL FIXED VERSION
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Literal
import joblib
import xgboost as xgb
import pandas as pd

# Load models
print("📦 Loading models...")
xgb_model = joblib.load("models/accident_xgb_model.pkl")
rf_model = joblib.load("models/accident_rf_model.pkl")
encoders = joblib.load("models/encoders.pkl")
feature_order = joblib.load("models/feature_order.pkl")
print("✅ Models loaded!")

# Fix XGBoost
if hasattr(xgb_model, '__dict__'):
    xgb_model.__dict__.pop('_le', None)
    xgb_model.__dict__.pop('use_label_encoder', None)

# Schemas
class AccidentInput(BaseModel):
    alcohol_involved: Literal["Yes", "No"]
    seatbelt_used: Literal["Yes", "No"]
    collision_type: Literal["Head-On", "Rear-End", "Side-Impact", "Single-Vehicle"]
    vehicle_type: Literal["Bicycle", "Car", "Motorcycle", "Pedestrian", "Truck"]
    weather: Literal["Clear", "Fog", "Rain", "Sleet", "Snow"]
    light: Literal["Dark", "Dawn/Dusk", "Daylight"]
    road_type: Literal["Arterial", "Highway", "Local", "Ramp"]
    urban_rural: Literal["Urban", "Rural"]
    visibility: float
    speed_limit: int
    num_vehicles: int
    driver_age: int
    driver_gender: Literal["Male", "Female"]
    hour: int
    day_of_week: int
    month: int
    is_holiday: int
    latitude: float
    longitude: float

# FastAPI App
app = FastAPI(
    title="Traffic Accident AI",
    version="1.0",
    description="XGBoost (73.55%) & Random Forest (82.27%)"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def prepare_features(data: dict):
    """Prepare input data with proper encoding"""
    df = pd.DataFrame([data])
    
    # FIX: Map frontend values to encoder expected values
    value_mappings = {
        'collision_type': {
            'Head-On': 'Head-on',
            'Rear-End': 'Rear-end',
            'Side-Impact': 'Side-impact',
            'Single-Vehicle': 'Single-vehicle'
        },
        'weather': {
            'Clear': 'Clear',
            'Fog': 'Fog', 
            'Rain': 'Rain',
            'Sleet': 'Sleet',
            'Snow': 'Snow'
        },
        'light': {
            'Dark': 'Dark',
            'Dawn/Dusk': 'Dawn/Dusk',
            'Daylight': 'Daylight'
        },
        'road_type': {
            'Arterial': 'Arterial',
            'Highway': 'Highway',
            'Local': 'Local',
            'Ramp': 'Ramp'
        },
        'urban_rural': {
            'Urban': 'Urban',
            'Rural': 'Rural'
        },
        'vehicle_type': {
            'Bicycle': 'Bicycle',
            'Car': 'Car',
            'Motorcycle': 'Motorcycle',
            'Pedestrian': 'Pedestrian',
            'Truck': 'Truck'
        },
        'driver_gender': {
            'Male': 'Male',
            'Female': 'Female'
        },
        'seatbelt_used': {
            'Yes': 'Yes',
            'No': 'No'
        },
        'alcohol_involved': {
            'Yes': 'Yes',
            'No': 'No'
        }
    }
    
    # Apply mappings
    for col, mapping in value_mappings.items():
        if col in df.columns:
            val = df[col].iloc[0]
            if val in mapping:
                df[col] = mapping[val]
    
    # Encode categorical variables
    for col, encoder in encoders.items():
        if col in df.columns:
            try:
                df[col] = encoder.transform(df[col])
            except Exception as e:
                print(f"⚠️ Encoding error for {col}: {e}")
                print(f"  Value: {df[col].iloc[0]}")
                print(f"  Encoder classes: {list(encoder.classes_)}")
                df[col] = 0  # Default value
    
    # Reorder columns
    df = df[feature_order]
    return df

@app.get("/")
def root():
    return {
        "message": "✅ Traffic Accident AI Backend Running",
        "models": ["xgboost", "random_forest"],
        "endpoints": {
            "GET /": "This info",
            "GET /models": "List models",
            "POST /predict": "Predict with XGBoost",
            "POST /predict/random_forest": "Predict with Random Forest",
            "POST /predict/both": "Get both predictions"
        }
    }

@app.get("/models")
def list_models():
    return {
        "models": [
            {"name": "xgboost", "accuracy": "73.55%", "default": True},
            {"name": "random_forest", "accuracy": "82.27%", "default": False}
        ]
    }

@app.post("/predict")
def predict_xgboost(input_data: AccidentInput):
    """Predict using XGBoost (default)"""
    df = prepare_features(input_data.dict())
    dmatrix = xgb.DMatrix(df)
    proba = xgb_model.get_booster().predict(dmatrix)[0]
    
    # For binary classification
    severe_proba = proba
    non_severe_proba = 1 - proba
    
    prediction = "Severe" if severe_proba > 0.5 else "Non-Severe"
    
    return {
        "prediction": prediction,
        "probability": {
            "Non-Severe": f"{non_severe_proba * 100:.1f}%",
            "Severe": f"{severe_proba * 100:.1f}%"
        },
        "model": "xgboost",
        "confidence": "High" if abs(severe_proba-0.5) > 0.3 else "Medium"
    }

@app.post("/predict/random_forest")
def predict_random_forest(input_data: AccidentInput):
    """Predict using Random Forest"""
    df = prepare_features(input_data.dict())
    
    # Get both probabilities
    probabilities = rf_model.predict_proba(df)[0]
    non_severe_proba = probabilities[0]
    severe_proba = probabilities[1]
    
    prediction = "Severe" if severe_proba > 0.5 else "Non-Severe"
    
    return {
        "prediction": prediction,
        "probability": {
            "Non-Severe": f"{non_severe_proba * 100:.1f}%",
            "Severe": f"{severe_proba * 100:.1f}%"
        },
        "model": "random_forest",
        "confidence": "High" if abs(severe_proba-0.5) > 0.3 else "Medium"
    }

@app.post("/predict/both")
def predict_both(input_data: AccidentInput):
    """Get predictions from both models"""
    df = prepare_features(input_data.dict())
    
    # XGBoost
    dmatrix = xgb.DMatrix(df)
    xgb_proba = xgb_model.get_booster().predict(dmatrix)[0]
    xgb_pred = "Severe" if xgb_proba > 0.5 else "Non-Severe"
    
    # Random Forest
    rf_probs = rf_model.predict_proba(df)[0]
    rf_severe_proba = rf_probs[1]
    rf_pred = "Severe" if rf_severe_proba > 0.5 else "Non-Severe"
    
    return {
        "xgboost": {
            "prediction": xgb_pred,
            "probability": f"{xgb_proba*100:.1f}%",
            "detailed_probability": {
                "Non-Severe": f"{(1 - xgb_proba) * 100:.1f}%",
                "Severe": f"{xgb_proba * 100:.1f}%"
            }
        },
        "random_forest": {
            "prediction": rf_pred,
            "probability": f"{rf_severe_proba*100:.1f}%",
            "detailed_probability": {
                "Non-Severe": f"{rf_probs[0] * 100:.1f}%",
                "Severe": f"{rf_severe_proba * 100:.1f}%"
            }
        },
        "comparison": {
            "same_prediction": xgb_pred == rf_pred,
            "probability_difference": f"{abs(xgb_proba - rf_severe_proba) * 100:.1f}%",
            "recommended_model": "random_forest" if rf_severe_proba > xgb_proba else "xgboost"
        }
    }
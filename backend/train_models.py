import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import xgboost as xgb
import joblib
import os

def train_and_save_models():
    print("🔄 Training models with EXACT OLD parameters...")
    
    # Load data
    df = pd.read_csv("TrafficAccidents.csv")
    
    # EXACT SAME as your old XGBoost script
    categorical_cols = [
        "road_type", "urban_rural", "weather", "light", "vehicle_type",
        "collision_type", "driver_gender", "seatbelt_used", "alcohol_involved"
    ]
    
    # EXACT SAME encoding
    label_encoders = {}
    for col in categorical_cols:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col].astype(str))
        label_encoders[col] = le
    
    # Features and target
    X = df.drop("severe", axis=1)
    y = df["severe"]
    
    # EXACT feature order (dynamic from dataset)
    feature_order = X.columns.tolist()
    print(f"✅ Features: {len(feature_order)} columns")
    
    # Train/test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # TRAIN XGBoost with EXACT OLD parameters
    print("🌲 Training XGBoost (n_estimators=250, learning_rate=0.05)...")
    xgb_model = xgb.XGBClassifier(
        n_estimators=250,
        max_depth=6,
        learning_rate=0.05,
        subsample=0.85,
        colsample_bytree=0.85,
        eval_metric="logloss",
        random_state=42,
        use_label_encoder=False
    )
    xgb_model.fit(X_train, y_train)
    
    # TRAIN Random Forest with EXACT OLD parameters
    print("🌳 Training Random Forest (n_estimators=300)...")
    rf_model = RandomForestClassifier(
        n_estimators=300,
        random_state=42
    )
    rf_model.fit(X_train, y_train)
    
    # Save models
    os.makedirs("models", exist_ok=True)
    joblib.dump(xgb_model, "models/accident_xgb_model.pkl")
    joblib.dump(rf_model, "models/accident_rf_model.pkl")
    joblib.dump(label_encoders, "models/encoders.pkl")
    joblib.dump(feature_order, "models/feature_order.pkl")
    
    # Evaluate
    xgb_pred = xgb_model.predict(X_test)
    rf_pred = rf_model.predict(X_test)
    
    xgb_acc = accuracy_score(y_test, xgb_pred)
    rf_acc = accuracy_score(y_test, rf_pred)
    
    print(f"\n✅ Models saved successfully!")
    print(f"📊 XGBoost Accuracy: {xgb_acc:.4f}")
    print(f"📊 Random Forest Accuracy: {rf_acc:.4f}")
    
    # Test with same input as your old script
    print("\n🧪 Testing with same input as old script...")
    sample_data = {
        "hour": 12,
        "day_of_week": 1,
        "month": 1,
        "is_holiday": 0,
        "latitude": 24.8607,
        "longitude": 67.0011,
        "speed_limit": 60,
        "visibility": 0.5,
        "num_vehicles": 10,
        "driver_age": 20,
        "road_type": "Highway",
        "urban_rural": "Urban",
        "weather": "Clear",
        "light": "Dark",
        "vehicle_type": "Car",
        "collision_type": "Rear-end",
        "driver_gender": "Male",
        "seatbelt_used": "No",
        "alcohol_involved": "Yes"
    }
    
    # Prepare sample data
    df_sample = pd.DataFrame([sample_data])
    for col, encoder in label_encoders.items():
        if col in df_sample.columns:
            try:
                df_sample[col] = encoder.transform(df_sample[col])
            except:
                df_sample[col] = 0
    
    df_sample = df_sample[feature_order]
    
    # Predict
    xgb_proba = xgb_model.predict_proba(df_sample)[0]
    rf_proba = rf_model.predict_proba(df_sample)[0]
    
    print(f"\n📊 XGBoost Prediction:")
    print(f"  Non-Severe: {xgb_proba[0]*100:.2f}%")
    print(f"  Severe: {xgb_proba[1]*100:.2f}%")
    
    print(f"\n📊 Random Forest Prediction:")
    print(f"  Non-Severe: {rf_proba[0]*100:.2f}%")
    print(f"  Severe: {rf_proba[1]*100:.2f}%")

if __name__ == "__main__":
    train_and_save_models()

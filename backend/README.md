# 🚦 Traffic Accident Severity Prediction — Backend API

A FastAPI-based REST API that predicts traffic accident severity using trained Machine Learning models (XGBoost & Random Forest).

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| FastAPI | Web framework for building APIs |
| XGBoost | Gradient boosting ML model |
| Random Forest | Ensemble ML model |
| scikit-learn | Preprocessing & model utilities |
| pandas | Data manipulation |
| joblib | Model serialization |
| Uvicorn | ASGI server |

---

## 📁 Project Structure
```
backend/
├── main.py               # FastAPI app, routes & CORS config
├── train_models.py       # Model training & saving script
├── config.py             # App configuration & constants
├── requirements.txt      # Python dependencies
├── TrafficAccidents.csv  # Training dataset (not included in repo)
├── models/               # Saved model files (auto-generated)
│   ├── accident_xgb_model.pkl
│   ├── accident_rf_model.pkl
│   ├── encoders.pkl
│   └── feature_order.pkl
├── schemas/
│   └── inputs.py         # Pydantic request/response schemas
└── utils/
    ├── predictions.py    # Prediction logic
    └── preprocessing.py  # Data preprocessing helpers
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/FarrukhGul/Traffic-Accident-Severity-Prediction.git
cd Traffic-Accident-Severity-Prediction/backend
```

### 2. Create a virtual environment
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Train the models
> ⚠️ You need `TrafficAccidents.csv` in the backend directory before running this.
```bash
python train_models.py
```
This will generate the `.pkl` files inside the `models/` directory.

### 5. Start the server
```bash
uvicorn main:app --reload
```

API will be available at: `http://127.0.0.1:8000`

---

## 🌐 API Endpoints

### `GET /`
Returns API info and list of available endpoints.

### `GET /models`
Returns available ML models with their accuracy scores.

**Response:**
```json
{
  "models": {
    "xgboost": { "accuracy": "73.55%" },
    "random_forest": { "accuracy": "82.27%" }
  }
}
```

---

### `POST /predict`
Predict using **XGBoost** model (default).

### `POST /predict/random_forest`
Predict using **Random Forest** model.

### `POST /predict/both`
Get predictions from **both models** simultaneously.

---

## 📥 Request Body (All Predict Endpoints)
```json
{
  "driver_age": 28,
  "driver_gender": "Male",
  "alcohol_involved": 0,
  "seatbelt_used": 1,
  "vehicle_type": "Car",
  "num_vehicles": 2,
  "weather_condition": "Clear",
  "light_condition": "Daylight",
  "visibility": "Good",
  "road_type": "Highway",
  "urban_rural": "Urban",
  "latitude": 31.5204,
  "longitude": 74.3587,
  "hour": 14,
  "day_of_week": "Monday",
  "month": 3,
  "is_holiday": 0,
  "speed_limit": 60,
  "collision_type": "Rear-end"
}
```

---

## 📤 Response Example
```json
{
  "model": "random_forest",
  "prediction": "Severe",
  "probability": {
    "Non-Severe": 0.23,
    "Severe": 0.77
  }
}
```

---

## 🤖 ML Models

### XGBoost
- **Accuracy:** 73.55%
- **Parameters:** `n_estimators=250`, `learning_rate=0.05`, `max_depth=6`

### Random Forest
- **Accuracy:** 82.27%
- **Parameters:** `n_estimators=300`

### Training Details
- **Dataset:** TrafficAccidents.csv
- **Target:** Accident Severity (Severe / Non-Severe)
- **Features:** 19 input parameters
- **Split:** 80% train / 20% test (stratified)
- **Encoding:** Label encoding for categorical variables

---

## 🔒 Notes

- `TrafficAccidents.csv` and `.pkl` model files are excluded from the repository.
- Run `train_models.py` to regenerate all model files locally.
- CORS is enabled for frontend integration.

---

## 👨‍💻 Author

**Muhammad Farrukh Gul**  
BS Computer Science — University of Minhaj, Lahore  
[GitHub](https://github.com/FarrukhGul)

# 🚦 Traffic Accident Severity Prediction

A full-stack machine learning web application that predicts the severity of traffic accidents based on various input parameters. The system uses two trained ML models exposed via a **FastAPI** backend and consumed by a **React + Vite** frontend.

---

## 🌐 Live Demo

> Coming soon

---

## 📸 Preview

<img width="1920" height="1080" alt="header" src="https://github.com/user-attachments/assets/a2e8786e-b614-43aa-bebe-bae9fcad8e9d" />
<img width="1838" height="651" alt="InputPart1" src="https://github.com/user-attachments/assets/32b761a6-31cb-4f5b-8cc1-9f39945a1280" />
<img width="1833" height="477" alt="InputPart2" src="https://github.com/user-attachments/assets/6bc8d382-5eb1-4058-821a-d37da55c9516" />
<img width="1842" height="588" alt="predictionPart" src="https://github.com/user-attachments/assets/2bd7bb28-a89a-4b02-a223-e34dfda13587" />



---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| FastAPI | REST API framework |
| XGBoost | Gradient boosting ML model (73.55% accuracy) |
| Random Forest | Ensemble ML model (82.27% accuracy) |
| scikit-learn | Preprocessing & utilities |
| pandas | Data manipulation |
| joblib | Model serialization |

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Axios | API communication |
| Chart.js | Probability visualization |

---

## 📁 Project Structure
```
Traffic-Accident-Severity-Prediction/
├── backend/                    # FastAPI backend
│   ├── main.py                 # API server & routes
│   ├── train_models.py         # Model training script
│   ├── config.py               # Configuration
│   ├── requirements.txt        # Python dependencies
│   ├── models/                 # Trained .pkl files (auto-generated)
│   ├── schemas/
│   │   └── inputs.py           # Pydantic schemas
│   └── utils/
│       ├── predictions.py
│       └── preprocessing.py
└── front-end/                  # React frontend
    ├── src/
    │   ├── App.jsx
    │   ├── components/         # UI components
    │   └── services/
    │       └── api.js          # Axios API service
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm

---

### Backend Setup
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
python train_models.py       # Train & save models
uvicorn main:app --reload    # Start API server
```

API runs at: `http://127.0.0.1:8000`

---

### Frontend Setup
```bash
cd front-end
npm install
npm run dev
```

App runs at: `http://localhost:5173`

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API info |
| GET | `/models` | Available models & accuracies |
| POST | `/predict` | Predict using XGBoost |
| POST | `/predict/random_forest` | Predict using Random Forest |
| POST | `/predict/both` | Predict using both models |

---

## 🤖 ML Models

| Model | Accuracy | Parameters |
|-------|----------|------------|
| XGBoost | 73.55% | n_estimators=250, learning_rate=0.05, max_depth=6 |
| Random Forest | 82.27% | n_estimators=300 |

- **Dataset:** TrafficAccidents.csv
- **Target:** Accident Severity (Severe / Non-Severe)
- **Features:** 19 input parameters
- **Train/Test Split:** 80/20 (stratified)

---

## ✨ Features

- 🎯 Dual ML model predictions with probability scores
- 📋 Multi-section form with real-time validation
- 📊 Probability chart visualization
- 🎨 Animated responsive UI
- 💡 Contextual safety tips
- 📱 Mobile-optimized design

---

## 🔒 Notes

- `TrafficAccidents.csv` and `.pkl` model files are excluded from the repo
- Run `python train_models.py` to regenerate model files locally
- Backend must be running before using the frontend

---

## 👨‍💻 Author

**Muhammad Farrukh Gul**  
BS Computer Science — University of Minhaj, Lahore  
[GitHub](https://github.com/FarrukhGul) • [Instagram @cyberforge](https://instagram.com/cyberforge)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

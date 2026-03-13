# Traffic Accident Severity Prediction System

## Overview

This project is a machine learning-based web application that predicts the severity of traffic accidents based on various input parameters. The system uses two trained models (XGBoost and Random Forest) to provide predictions through a user-friendly web interface.

## Project Structure

```
ML_FB_Project/
├── backend/                    # FastAPI backend
│   ├── main.py                # Main API server with prediction endpoints
│   ├── train_models.py        # Model training script
│   ├── config.py              # Configuration settings
│   ├── requirements.txt       # Python dependencies
│   ├── TrafficAccidents.csv   # Training dataset
│   ├── models/                # Trained model files
│   │   ├── accident_xgb_model.pkl
│   │   ├── accident_rf_model.pkl
│   │   ├── encoders.pkl
│   │   └── feature_order.pkl
│   ├── schemas/               # Pydantic schemas
│   │   └── inputs.py
│   └── utils/                 # Utility functions
│       ├── predictions.py
│       └── preprocessing.py
└── front-end/                 # React frontend
    ├── src/
    │   ├── App.jsx           # Main React application
    │   ├── components/       # React components
    │   │   ├── sections/     # Form sections
    │   │   ├── common/       # Reusable components
    │   │   └── layout/       # Layout components
    │   └── services/
    │       └── api.js        # API service functions
    ├── package.json          # Node.js dependencies
    └── vite.config.js        # Vite configuration
```

## Backend (FastAPI)

### Technologies
- **FastAPI**: Modern, fast web framework for building APIs
- **XGBoost**: Gradient boosting framework (73.55% accuracy)
- **Random Forest**: Ensemble learning method (82.27% accuracy)
- **scikit-learn**: Machine learning library
- **pandas**: Data manipulation library
- **joblib**: Model serialization

### Key Features
- RESTful API with CORS support
- Two prediction models available
- Input validation using Pydantic schemas
- Categorical data encoding
- Probability-based predictions

### API Endpoints
- `GET /`: API information and available endpoints
- `GET /models`: List available models with accuracies
- `POST /predict`: Predict using XGBoost (default)
- `POST /predict/random_forest`: Predict using Random Forest
- `POST /predict/both`: Get predictions from both models

### Input Parameters
The system accepts the following parameters for prediction:
- **Driver Information**: Age, gender, alcohol involvement, seatbelt usage
- **Vehicle Information**: Type, number of vehicles involved
- **Environmental Conditions**: Weather, light conditions, visibility
- **Location Data**: Road type, urban/rural setting, coordinates
- **Temporal Data**: Hour, day of week, month, holiday status
- **Traffic Conditions**: Speed limit, collision type

## Frontend (React + Vite)

### Technologies
- **React 19**: Frontend framework
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Axios**: HTTP client for API calls
- **Chart.js**: Data visualization
- **React Router**: Client-side routing

### Key Features
- Responsive web interface
- Real-time form validation
- Model selection (XGBoost/Random Forest)
- Animated UI components
- Safety tips display
- Mobile-optimized design
- Age validation based on vehicle type

### Components Structure
- **Header**: Application title and navigation
- **Form Sections**:
  - Vehicle & Collision Information
  - Driver Details
  - Time & Date
  - Environmental Conditions
  - Location Data
- **Prediction Section**: Results display with probabilities
- **Footer**: Additional information

## Machine Learning Models

### Training Data
- Dataset: `TrafficAccidents.csv`
- Target: Accident severity (Severe/Non-Severe)
- Features: 19 input parameters

### Model Performance
- **XGBoost**: 73.55% accuracy
  - Parameters: n_estimators=250, learning_rate=0.05, max_depth=6
- **Random Forest**: 82.27% accuracy
  - Parameters: n_estimators=300

### Preprocessing
- Label encoding for categorical variables
- Feature scaling where appropriate
- Train/test split (80/20) with stratification

## Installation & Setup

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python train_models.py  # Train and save models
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd front-end
npm install
npm run dev
```

## Usage

1. Start the backend server
2. Start the frontend development server
3. Access the web application
4. Fill in the accident parameters
5. Select prediction model
6. View severity prediction with probabilities

## Future Enhancements

- Additional machine learning models
- Real-time data integration
- Historical accident analysis
- Advanced visualization features
- Mobile application development
- API rate limiting and authentication</content>
<parameter name="filePath">/home/farrukh-gul/Desktop/ML_FB_Project/source.md
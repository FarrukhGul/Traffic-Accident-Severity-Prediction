# 🚦 Traffic Accident Severity Prediction — Frontend

A responsive React web application that provides a user-friendly interface for predicting traffic accident severity using ML models via a FastAPI backend.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | Frontend UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations & transitions |
| Axios | HTTP client for API calls |
| Chart.js | Probability visualization |
| React Router | Client-side routing |

---

## 📁 Project Structure
```
front-end/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
└── src/
    ├── App.jsx                  # Root component & routing
    ├── App.css
    ├── main.jsx                 # Entry point
    ├── index.css                # Global styles
    ├── services/
    │   └── api.js               # Axios API service functions
    └── components/
        ├── ValidationManager.jsx
        ├── common/
        │   ├── AgeValidationModal.jsx
        │   ├── NumberInput.jsx
        │   ├── SelectInput.jsx
        │   └── SeverityBadge.jsx
        ├── layout/
        │   └── StatsBar.jsx
        └── sections/
            ├── Header.jsx
            ├── Footer.jsx
            ├── VehicleCollisionSection.jsx
            ├── DriverInfoSection.jsx
            ├── TimeDateSection.jsx
            ├── EnvironmentSection.jsx
            ├── LocationSection.jsx
            └── PredictionSection.jsx
```

---

## ⚙️ Setup & Installation

### 1. Navigate to frontend directory
```bash
cd Traffic-Accident-Severity-Prediction/front-end
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```

App will be available at: `http://localhost:5173`

> ⚠️ Make sure the FastAPI backend is running at `http://127.0.0.1:8000` before using the app.

---

## 🌐 Features

- **Multi-section Form** — Organized input fields across 5 sections
- **Model Selection** — Choose between XGBoost or Random Forest
- **Real-time Validation** — Age validation based on vehicle type
- **Prediction Results** — Severity badge with probability chart
- **Animated UI** — Smooth transitions using Framer Motion
- **Responsive Design** — Mobile-optimized layout
- **Safety Tips** — Contextual safety suggestions based on prediction

---

## 📋 Form Sections

### 1. 🚗 Vehicle & Collision
- Vehicle type, number of vehicles, collision type, speed limit

### 2. 👤 Driver Details
- Age, gender, alcohol involvement, seatbelt usage

### 3. 🕐 Time & Date
- Hour, day of week, month, holiday status

### 4. 🌤️ Environmental Conditions
- Weather condition, light condition, visibility

### 5. 📍 Location Data
- Road type, urban/rural setting, coordinates

---

## 🔗 API Integration

The frontend communicates with the FastAPI backend via Axios.

Base URL (configured in `src/services/api.js`):
```js
const BASE_URL = "http://127.0.0.1:8000";
```

Available API calls:
```js
// Predict with XGBoost
POST /predict

// Predict with Random Forest
POST /predict/random_forest

// Predict with both models
POST /predict/both
```

---

## 📦 Build for Production
```bash
npm run build
```

Output will be in the `dist/` folder.

---

## 👨‍💻 Author

**Muhammad Farrukh Gul**  
BS Computer Science — University of Minhaj, Lahore  
[GitHub](https://github.com/FarrukhGul)

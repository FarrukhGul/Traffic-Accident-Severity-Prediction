// App.jsx - ONLY MODEL SELECTION ADDED
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import axios from "axios";
import Header from "./components/sections/Header";
import VehicleCollisionSection from "./components/sections/VehicleCollisionSection";
import DriverInfoSection from "./components/sections/DriverInfoSection";
import TimeDateSection from "./components/sections/TimeDateSection";
import EnvironmentSection from "./components/sections/EnvironmentSection";
import LocationSection from "./components/sections/LocationSection";
import PredictionSection from "./components/sections/PredictionSection";
import Footer from "./components/sections/Footer";
import { getAvailableModels } from "./services/api"; // ✅ Import added

// Age validation rules
const AGE_RULES = {
  'Car': { min: 18, max: 70 },
  'Truck': { min: 21, max: 70 },
  'Motorcycle': { min: 18, max: 70 },
  'Bicycle': { min: 10, max: 70 },
  'Pedestrian': { min: 5, max: 70 }
};

const SAFETY_TIPS = [
  "🚗 Always wear your seatbelt",
  "🚫 Never drink and drive",
  "📱 Avoid distractions",
  "🌧️ Slow down in bad weather",
  "⏰ Take breaks on long drives"
];

const initialFormState = {
  alcohol_involved: "Yes",
  seatbelt_used: "No",
  collision_type: "Rear-End",
  vehicle_type: "Car",
  weather: "Clear",
  light: "Dark",
  road_type: "Highway",
  urban_rural: "Urban",
  visibility: 0.5,
  speed_limit: 60,
  num_vehicles: 10,
  driver_age: 20,
  driver_gender: "Male",
  hour: 12,
  day_of_week: 1,
  month: 1,
  is_holiday: 0,
  latitude: 24.8607,
  longitude: 67.0011
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [form, setForm] = useState(initialFormState);
  const [currentTip, setCurrentTip] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [predictionError, setPredictionError] = useState(null);
  // ✅ MODEL SELECTION STATE ADDED
  const [selectedModel, setSelectedModel] = useState("xgboost");
  const [availableModels, setAvailableModels] = useState([]);
  const [bothModelsResult, setBothModelsResult] = useState(null);

  // Check screen size for optimizations
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Rotate safety tips every 8 seconds
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % SAFETY_TIPS.length);
    }, 8000);

    // ✅ LOAD AVAILABLE MODELS ON STARTUP
   const loadModels = async () => {
  try {
    const modelsData = await getAvailableModels();
    setAvailableModels(modelsData.models || []);
  } catch (error) {
    console.error("Failed to load models:", error);
    // Set ACCURATE accuracies
    setAvailableModels([
      { name: "xgboost", accuracy: "73.55%", default: true },
      { name: "random_forest", accuracy: "82.27%", default: false }
    ]);
  }
};
    loadModels();

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(tipInterval);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value
    }));
  };

  // ✅ UPDATED PREDICT FUNCTION WITH MODEL SELECTION
  const predict = async () => {
    // Clear previous results and errors
    setResult(null);
    setBothModelsResult(null);
    setPredictionError(null);
    
    // Fixed prediction validation
    const validation = validateAge(form.vehicle_type, form.driver_age);
    
    if (!validation.isValid) {
      alert(`Age Error: ${validation.message}`);
      return;
    }
    
    setLoading(true);
    
    try {
      console.log("Sending prediction request with data:", form, "Model:", selectedModel);
      
      let endpoint = "http://127.0.0.1:8000/predict";
      if (selectedModel === "random_forest") {
        endpoint = "http://127.0.0.1:8000/predict/random_forest";
      }
      
      const res = await axios.post(endpoint, form, {
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log("Prediction response:", res.data);
      setResult(res.data);
      
    } catch (error) {
      console.error("Prediction failed:", error);
      
      let errorMessage = "Prediction failed. ";
      
      if (error.code === 'ECONNABORTED') {
        errorMessage += "Request timeout. Backend server might be down.";
      } else if (error.response) {
        errorMessage += `Server responded with status ${error.response.status}`;
      } else if (error.request) {
        errorMessage += "No response from backend. Make sure backend is running.";
      } else {
        errorMessage += error.message;
      }
      
      setPredictionError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ✅ NEW FUNCTION: PREDICT WITH BOTH MODELS
  const predictWithBothModels = async () => {
    // Clear previous results and errors
    setResult(null);
    setBothModelsResult(null);
    setPredictionError(null);
    
    // Fixed prediction validation
    const validation = validateAge(form.vehicle_type, form.driver_age);
    
    if (!validation.isValid) {
      alert(`Age Error: ${validation.message}`);
      return;
    }
    
    setLoading(true);
    
    try {
      console.log("Sending prediction request to both models:", form);
      
      const res = await axios.post("http://127.0.0.1:8000/predict/both", form, {
        timeout: 15000, // 15 second timeout
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log("Both models response:", res.data);
      setBothModelsResult(res.data);
      
    } catch (error) {
      console.error("Prediction failed:", error);
      
      let errorMessage = "Prediction failed. ";
      
      if (error.code === 'ECONNABORTED') {
        errorMessage += "Request timeout. Backend server might be down.";
      } else if (error.response) {
        errorMessage += `Server responded with status ${error.response.status}`;
      } else if (error.request) {
        errorMessage += "No response from backend. Make sure backend is running.";
      } else {
        errorMessage += error.message;
      }
      
      setPredictionError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const validateAge = (vehicleType, age) => {
    const rule = AGE_RULES[vehicleType];
    
    if (!rule) {
      return { isValid: true, message: '' };
    }
    
    if (age < rule.min) {
      return { 
        isValid: false, 
        message: `Minimum age for ${vehicleType} is ${rule.min} years` 
      };
    }
    
    if (age > rule.max) {
      return { 
        isValid: false, 
        message: `Maximum age for ${vehicleType} is ${rule.max} years` 
      };
    }
    
    return { isValid: true, message: '' };
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 p-3 sm:p-4 md:p-6 font-sans relative overflow-hidden">
      {/* Premium linear Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-cyan-50/30 via-white/20 to-emerald-50/30" />
        
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-linear(circle_at_30%_30%,#3b82f6,transparent_50%),radial-linear(circle_at_70%_70%,#10b981,transparent_50%)]" />
        </div>
        
        {/* Very subtle floating elements - optimized */}
        {!isMobile && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-cyan-400/10"
                initial={{ 
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                  rotate: 0
                }}
                animate={{ 
                  x: [null, Math.random() * 40, -Math.random() * 25],
                  y: [null, Math.random() * 25, -Math.random() * 40],
                  rotate: 360
                }}
                transition={{
                  duration: 45 + Math.random() * 25,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              >
                <svg className="w-7 h-7 sm:w-9 sm:h-9" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </motion.div>
            ))}
          </>
        )}
      </motion.div>

      {/* Safety Tips Banner - Modern Design */}
      <motion.div 
        className="relative z-10 mb-4 sm:mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 100
        }}
      >
        <div className="bg-linear-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 backdrop-blur-lg border border-emerald-200/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="bg-linear-to-br from-emerald-500/20 to-cyan-500/20 p-1.5 sm:p-2 rounded-lg"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </motion.div>
              
              <div className="min-h-[20px] sm:min-h-[24px] overflow-hidden flex-1">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentTip}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-slate-800 text-sm sm:text-base font-semibold"
                  >
                    {SAFETY_TIPS[currentTip]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
            
            <div className="text-emerald-600/70 text-xs sm:text-sm whitespace-nowrap ml-2 font-medium">
              {currentTip + 1}/{SAFETY_TIPS.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-2 w-full bg-emerald-100/50 rounded-full h-1.5 overflow-hidden">
            <motion.div 
              className="bg-linear-to-r from-emerald-500 to-cyan-500 h-full rounded-full"
              key={currentTip}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 8, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>

      {/* ✅ MODEL SELECTION CARD - NEW ADDITION */}
      <motion.div 
        className="relative z-10 mb-4 sm:mb-6"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="bg-linear-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 backdrop-blur-lg border border-blue-200/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm sm:text-base">Select Prediction Model</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Choose which AI model to use for prediction</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none text-sm font-medium"
                >
                  {availableModels.map((model) => (
                    <option key={model.name} value={model.name}>
                      {model.name === "xgboost" ? "🚀 XGBoost" : "🌲 Random Forest"} ({model.accuracy})
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <button
                onClick={predictWithBothModels}
                disabled={loading}
                className="bg-linear-to-r from-purple-600 to-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Compare Both
              </button>
            </div>
          </div>
          
          {/* Model Info */}
          <div className="mt-3 pt-3 border-t border-blue-200/30">
            <div className="flex flex-wrap gap-2">
              {availableModels.map((model) => (
                <div 
                  key={model.name}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                    selectedModel === model.name 
                      ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                      : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    selectedModel === model.name ? 'bg-blue-500' : 'bg-gray-400'
                  }`} />
                  <span className="capitalize">{model.name.replace('_', ' ')}</span>
                  <span className="text-xs opacity-75">{model.accuracy}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards - Modern Design */}
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8 relative z-10"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {[
          { label: "Accidents", value: "1.3M", color: "text-rose-600", bg: "from-rose-500/10 to-pink-500/10", border: "border-rose-200/30" },
          { label: "Speed", value: "31%", color: "text-amber-600", bg: "from-amber-500/10 to-orange-500/10", border: "border-amber-200/30" },
          { label: "Night", value: "42%", color: "text-indigo-600", bg: "from-indigo-500/10 to-purple-500/10", border: "border-indigo-200/30" },
          { label: "Seatbelt", value: "45%", color: "text-emerald-600", bg: "from-emerald-500/10 to-teal-500/10", border: "border-emerald-200/30" },
        ].map((stat, index) => (
          <motion.div 
            key={index}
            className={`bg-linear-to-br ${stat.bg} backdrop-blur-sm border ${stat.border} rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all duration-300 shadow-sm hover:shadow-md`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            whileHover={{ 
              scale: 1.03, 
              y: -2,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" 
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col gap-1">
              <span className="text-slate-600 text-xs sm:text-sm font-medium truncate">{stat.label}</span>
              <div className="flex items-center justify-between">
                <motion.span 
                  className={`${stat.color} font-bold text-lg sm:text-xl md:text-2xl`}
                  animate={{ 
                    scale: [1, 1.05, 1],
                    transition: { 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.3 
                    }
                  }}
                >
                  {stat.value}
                </motion.span>
                <div className={`w-2 h-2 rounded-full ${stat.color.replace('text', 'bg')}/20`}>
                  <div className={`w-full h-full rounded-full animate-pulse ${stat.color.replace('text', 'bg')}`} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Header />
        </motion.div>

        <main className="w-full mx-auto">
          {/* Top Row - 3 Columns */}
          <div className="grid lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
            {[
              { Component: VehicleCollisionSection, delay: 0.15 },
              { Component: DriverInfoSection, delay: 0.2 },
              { Component: TimeDateSection, delay: 0.25 }
            ].map(({ Component, delay }, index) => (
              <motion.div
                key={index}
                initial={{ 
                  x: isMobile ? 0 : (index === 0 ? -30 : index === 2 ? 30 : 0), 
                  y: isMobile ? 20 : 0, 
                  opacity: 0 
                }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay }}
                className={isMobile ? "col-span-3" : ""}
              >
                <Component form={form} handleChange={handleChange} />
              </motion.div>
            ))}
          </div>

          {/* Middle Row - 2 Columns */}
          <div className="grid lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
            {[
              { Component: EnvironmentSection, delay: 0.3 },
              { Component: LocationSection, delay: 0.35 }
            ].map(({ Component, delay }, index) => (
              <motion.div
                key={index}
                initial={{ 
                  x: isMobile ? 0 : (index === 0 ? -30 : 30), 
                  y: isMobile ? 20 : 0, 
                  opacity: 0 
                }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay }}
                className={isMobile ? "col-span-2" : ""}
              >
                <Component form={form} handleChange={handleChange} />
              </motion.div>
            ))}
          </div>

          {/* Prediction Section - UPDATED TO SHOW BOTH MODELS RESULT */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <PredictionSection 
              loading={loading}
              result={result}
              bothModelsResult={bothModelsResult} // ✅ NEW PROP
              selectedModel={selectedModel} // ✅ NEW PROP
              predict={predict}
              form={form}
              error={predictionError}
            />
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.45 }}
          >
            <Footer />
          </motion.div>
        </main>
      </div>

      {/* Emergency Button - Premium Design */}
      <motion.div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-20"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 15, 
          delay: 0.5 
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <button 
          className="bg-linear-to-br from-rose-600 via-red-500 to-orange-500 text-white p-3 sm:p-4 rounded-full shadow-xl hover:shadow-2xl hover:shadow-rose-500/30 transition-all duration-300 flex items-center justify-center group"
          onClick={() => alert("🚨 Emergency: Call 112\n🏥 Ambulance: 115\n🚓 Police: 15")}
          aria-label="Emergency Hotline"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="absolute inset-0 bg-rose-500 rounded-full blur-md"
            />
            <svg className="relative w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          
          <motion.span 
            className="absolute -top-7 sm:-top-8 bg-linear-to-r from-rose-700 to-red-600 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg font-medium"
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            whileHover={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            🚨 Emergency: 112
          </motion.span>
        </button>
      </motion.div>

      {/* Subtle Pulse Effect - Only on desktop */}
      {!isMobile && (
        <motion.div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.03, 0, 0.03]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-linear-to-r from-cyan-500/5 via-emerald-500/5 to-blue-500/5" />
        </motion.div>
      )}

      {/* Decorative corner accents */}
      {!isMobile && (
        <>
          <div className="absolute top-0 left-0 w-32 h-32 bg-linear-to-br from-cyan-500/5 to-transparent rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-linear-to-tl from-emerald-500/5 to-transparent rounded-tl-full" />
        </>
      )}
    </div>
  );
}
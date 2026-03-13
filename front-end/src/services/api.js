// src/services/api.js - UPDATED VERSION
import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const predictAccident = async (data, modelType = "xgboost") => {
  try {
    let endpoint = "/predict";
    if (modelType === "random_forest") {
      endpoint = "/predict/random_forest";
    }
    
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const predictBothModels = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict/both`, data, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getAvailableModels = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/models`, {
      timeout: 5000
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    // Return default models if API fails
    return {
      models: [
        { name: "xgboost", accuracy: "77.78%", default: true },
        { name: "random_forest", accuracy: "82.10%", default: false }
      ]
    };
  }
};
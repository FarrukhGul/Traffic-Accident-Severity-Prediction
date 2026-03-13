import pandas as pd
import joblib
from config import ENCODER_PATH, FEATURE_ORDER_PATH, FEATURE_ORDER

class DataPreprocessor:
    def __init__(self):
        self.encoders = joblib.load(ENCODER_PATH)
        self.feature_order = joblib.load(FEATURE_ORDER_PATH) if FEATURE_ORDER_PATH else FEATURE_ORDER
    
    def prepare_features(self, input_dict: dict) -> pd.DataFrame:
        """Convert input dictionary to properly encoded DataFrame"""
        df = pd.DataFrame([input_dict])
        
        # Encode categorical variables
        for col, encoder in self.encoders.items():
            if col in df.columns:
                try:
                    df[col] = encoder.transform(df[col])
                except ValueError:
                    # Handle unseen categories by using the most common class
                    df[col] = 0
        
        # Reorder columns to match training data
        df = df[self.feature_order]
        
        return df
from models.xgboost_model import XGBoostPredictor
from models.random_forest_model import RandomForestPredictor

class PredictionHandler:
    def __init__(self):
        self.xgboost_predictor = None
        self.random_forest_predictor = None
    
    def get_predictor(self, model_type: str):
        """Get the appropriate predictor based on model type"""
        if model_type == "xgboost":
            if self.xgboost_predictor is None:
                self.xgboost_predictor = XGBoostPredictor()
            return self.xgboost_predictor
        elif model_type == "random_forest":
            if self.random_forest_predictor is None:
                self.random_forest_predictor = RandomForestPredictor()
            return self.random_forest_predictor
        else:
            raise ValueError(f"Unknown model type: {model_type}")
    
    def predict(self, input_data: dict, model_type: str = "xgboost") -> dict:
        """Main prediction function"""
        predictor = self.get_predictor(model_type)
        return predictor.predict(input_data)
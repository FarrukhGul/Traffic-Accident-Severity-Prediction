# Configuration settings
MODEL_PATHS = {
    "xgboost": "models/accident_xgb_model.pkl",
    "random_forest": "models/accident_rf_model.pkl"
}

ENCODER_PATH = "models/encoders.pkl"
FEATURE_ORDER_PATH = "models/feature_order.pkl"

FEATURE_ORDER = [
    "alcohol_involved", "seatbelt_used", "collision_type",
    "vehicle_type", "weather", "light", "road_type", "urban_rural",
    "visibility", "speed_limit", "num_vehicles", "driver_age",
    "driver_gender", "hour", "day_of_week", "month",
    "is_holiday", "latitude", "longitude"
]

CATEGORICAL_COLS = [
    "road_type", "urban_rural", "weather", "light",
    "vehicle_type", "collision_type", "driver_gender",
    "seatbelt_used", "alcohol_involved"
]
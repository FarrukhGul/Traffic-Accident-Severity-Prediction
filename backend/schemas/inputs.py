from pydantic import BaseModel
from typing import Literal

class AccidentInput(BaseModel):
    alcohol_involved: Literal["Yes", "No"]
    seatbelt_used: Literal["Yes", "No"]
    collision_type: Literal["Head-On", "Rear-End", "Side-Impact", "Single-Vehicle"]
    vehicle_type: Literal["Bicycle", "Car", "Motorcycle", "Pedestrian", "Truck"]
    weather: Literal["Clear", "Fog", "Rain", "Sleet", "Snow"]
    light: Literal["Dark", "Dawn/Dusk", "Daylight"]
    road_type: Literal["Arterial", "Highway", "Local", "Ramp"]
    urban_rural: Literal["Urban", "Rural"]
    visibility: float
    speed_limit: int
    num_vehicles: int
    driver_age: int
    driver_gender: Literal["Male", "Female"]
    hour: int
    day_of_week: int
    month: int
    is_holiday: int
    latitude: float
    longitude: float

class ModelSelection(BaseModel):
    model_type: Literal["xgboost", "random_forest"]
# test_encoding.py
import joblib

encoders = joblib.load("models/encoders.pkl")

print("Testing collision_type encoding:")
print(f"Encoder classes: {list(encoders['collision_type'].classes_)}")

# Test Head-On encoding
test_val = "Head-On"
try:
    # Try different formats
    formats = ["Head-On", "Head-on", "Head On", "head-on"]
    for fmt in formats:
        try:
            encoded = encoders['collision_type'].transform([fmt])
            print(f"  '{fmt}' -> {encoded[0]}")
        except:
            print(f"  '{fmt}' -> Failed")
except Exception as e:
    print(f"Error: {e}")
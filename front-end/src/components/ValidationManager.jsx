import React, { useState, useEffect, useRef } from 'react';

const ValidationManager = ({ form, onAgeCorrection }) => {
  const [showModal, setShowModal] = useState(false);
  const [validationData, setValidationData] = useState(null);
  const prevAgeRef = useRef(form.driver_age); // Track previous age

  // Age rules
  const AGE_RULES = {
    'Car': { minAge: 18, message: "Driver age must be 18 or above for Car" },
    'Truck': { minAge: 21, message: "Driver age must be 21 or above for Truck" },
    'Motorcycle': { minAge: 18, message: "Rider age must be 18 or above for Motorcycle" },
    'Bicycle': { minAge: 10, message: "Rider age must be 10 or above for Bicycle" },
    'Pedestrian': { minAge: 5, message: "Pedestrian age must be 5 or above" }
  };

  // Check validation - only when age goes BELOW minimum
  useEffect(() => {
    const currentAge = form.driver_age;
    const prevAge = prevAgeRef.current;
    
    if (form.vehicle_type && currentAge !== undefined) {
      const rule = AGE_RULES[form.vehicle_type];
      
      // Only show error if:
      // 1. There is a rule for this vehicle type
      // 2. Current age is below minimum age
      // 3. Age actually decreased (or is being set for first time)
      if (rule && currentAge < rule.minAge) {
        // Check if age actually decreased or this is initial validation
        if (currentAge < prevAge || prevAge === undefined || prevAge >= rule.minAge) {
          setValidationData({
            message: rule.message,
            minAge: rule.minAge,
            currentAge: currentAge,
            vehicleType: form.vehicle_type
          });
          setShowModal(true);
        }
      }
    }
    
    // Update previous age reference
    prevAgeRef.current = currentAge;
  }, [form.vehicle_type, form.driver_age]);

  const handleSetAge = () => {
    if (validationData && onAgeCorrection) {
      onAgeCorrection(validationData.minAge);
    }
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowModal(false)} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.500 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Age Validation Required</h3>
          </div>
          <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-red-600 font-semibold text-lg mb-4">{validationData?.message}</p>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-600">Vehicle Type:</div>
              <div className="font-medium">{validationData?.vehicleType}</div>
              <div className="text-gray-600">Minimum Age:</div>
              <div className="font-medium text-red-600">{validationData?.minAge} years</div>
              <div className="text-gray-600">Current Age:</div>
              <div className="font-medium text-red-600">{validationData?.currentAge} years</div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <div className="flex items-center text-yellow-700">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">Age must be {validationData?.minAge} or above for {validationData?.vehicleType}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end p-6 border-t border-gray-200 space-x-3">
          <button 
            onClick={() => setShowModal(false)}
            className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button 
            onClick={handleSetAge}
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
          >
            Set to {validationData?.minAge} Years
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidationManager;
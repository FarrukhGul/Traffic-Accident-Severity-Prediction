import React from "react";

// Age validation rules with max age limit
const AGE_VALIDATION_RULES = {
  'Car': { 
    minAge: 18, 
    maxAge: 70, 
    message: "Driver must be 18 to 70 years for Car" 
  },
  'Truck': { 
    minAge: 21, 
    maxAge: 70, 
    message: "Driver must be 21 to 70 years for Truck" 
  },
  'Motorcycle': { 
    minAge: 18, 
    maxAge: 70, 
    message: "Rider must be 18 to 70 years for Motorcycle" 
  },
  'Bicycle': { 
    minAge: 10, 
    maxAge: 70, 
    message: "Rider must be 10 to 70 years for Bicycle" 
  },
  'Pedestrian': { 
    minAge: 5, 
    maxAge: 70, 
    message: "Pedestrian must be 5 to 70 years" 
  }
};

const NumberInput = ({ label, name, value, onChange, min, max, step = 1, form }) => {
  // Check if this is the driver_age field
  const isDriverAge = name === 'driver_age';
  const vehicleType = form?.vehicle_type;
  
  let validationError = null;
  let isValid = true;
  
  // Validate driver age based on vehicle type
  if (isDriverAge && vehicleType && value !== undefined && value !== '') {
    const rule = AGE_VALIDATION_RULES[vehicleType];
    const age = Number(value);
    
    if (rule) {
      // Check if age is below minimum
      if (age < rule.minAge) {
        validationError = `Minimum age for ${vehicleType} is ${rule.minAge} years`;
        isValid = false;
      }
      // Check if age is above maximum
      else if (age > rule.maxAge) {
        validationError = `Maximum age for ${vehicleType} is ${rule.maxAge} years`;
        isValid = false;
      }
    }
  }

  return (
    <div className="flex flex-col space-y-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-200 ${
            isValid 
              ? 'border-gray-300 text-gray-700 focus:ring-blue-500 focus:border-transparent' 
              : 'border-red-500 text-red-700 bg-red-50 focus:ring-red-500 focus:border-red-500'
          }`}
        />
        <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
          isValid ? 'text-gray-400' : 'text-red-400'
        }`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {/* Show validation error */}
      {validationError && (
        <div className="mt-1 flex items-start space-x-1 animate-pulse">
          <svg className="h-4 w-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span className="text-xs text-red-600 font-medium">{validationError}</span>
        </div>
      )}
      
      {/* Show validation success */}
      {isDriverAge && vehicleType && value !== undefined && value !== '' && isValid && (
        <div className="mt-1 flex items-start space-x-1">
          <svg className="h-4 w-4 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs text-green-600 font-medium">
            {vehicleType === 'Bicycle' ? `✓ Valid age for bicycle (10-70 years)` :
             vehicleType === 'Car' ? `✓ Valid age for car (18-70 years)` :
             vehicleType === 'Truck' ? `✓ Valid age for truck (21-70 years)` :
             vehicleType === 'Motorcycle' ? `✓ Valid age for motorcycle (18-70 years)` :
             vehicleType === 'Pedestrian' ? `✓ Valid age for pedestrian (5-70 years)` :
             "✓ Valid age"}
          </span>
        </div>
      )}
      
      {/* Show age range hint */}
      {isDriverAge && vehicleType && AGE_VALIDATION_RULES[vehicleType] && (
        <div className="mt-1">
          <div className="text-xs text-gray-500 flex items-center">
            <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Valid range: {AGE_VALIDATION_RULES[vehicleType].minAge} to {AGE_VALIDATION_RULES[vehicleType].maxAge} years
          </div>
        </div>
      )}
    </div>
  );
};

export default NumberInput;
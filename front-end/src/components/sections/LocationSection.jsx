import React from "react";
import NumberInput from "../common/NumberInput";

const LocationSection = ({ form, handleChange }) => (
 <section className="bg-white backdrop-blur-sm border border-slate-200 p-5 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center mb-6">
      <div className="bg-red-100 p-2 rounded-lg mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <h2 className="font-bold text-xl text-gray-800">Location Details</h2>
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      <NumberInput 
        label="Latitude" 
        name="latitude" 
        value={form.latitude}
        onChange={handleChange}
        step={0.0001} 
      />
      <NumberInput 
        label="Longitude" 
        name="longitude" 
        value={form.longitude}
        onChange={handleChange}
        step={0.0001} 
      />
      <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Map Preview</span>
          <span className="text-xs text-gray-500">24.8607, 67.0011</span>
        </div>
        <div className="h-32 bg-linear-to-r from-blue-400 to-blue-300 rounded-lg flex items-center justify-center">
          <div className="text-white text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="text-sm font-medium">Karachi, Pakistan</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default LocationSection;
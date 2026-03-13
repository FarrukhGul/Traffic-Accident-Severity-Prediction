import React from "react";
import SelectInput from "../common/SelectInput";
import NumberInput from "../common/NumberInput";

const DriverInfoSection = ({ form, handleChange }) => (
<section className="bg-white backdrop-blur-sm border border-slate-200 p-5 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center mb-6">
      <div className="bg-green-100 p-2 rounded-lg mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <h2 className="font-bold text-xl text-gray-800">Driver Information</h2>
    </div>
    <div className="space-y-4">
      <NumberInput 
        label="Driver Age" 
        name="driver_age" 
        value={form.driver_age}
        onChange={handleChange}
        min={1} 
        max={100}
        form={form} 
      />
      <SelectInput 
        label="Driver Gender" 
        name="driver_gender" 
        value={form.driver_gender}
        onChange={handleChange}
        options={["Male","Female"]} 
      />
      <SelectInput 
        label="Alcohol Involved" 
        name="alcohol_involved" 
        value={form.alcohol_involved}
        onChange={handleChange}
        options={["No","Yes"]} 
      />
      <SelectInput 
        label="Seatbelt Used" 
        name="seatbelt_used" 
        value={form.seatbelt_used}
        onChange={handleChange}
        options={["Yes","No"]} 
      />
    </div>
  </section>
);

export default DriverInfoSection;
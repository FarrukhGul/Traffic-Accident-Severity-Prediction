import React from "react";
import SelectInput from "../common/SelectInput";
import NumberInput from "../common/NumberInput";

const EnvironmentSection = ({ form, handleChange }) => (
<section className="bg-white backdrop-blur-sm border border-slate-200 p-5 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center mb-6">
      <div className="bg-yellow-100 p-2 rounded-lg mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
        </svg>
      </div>
      <h2 className="font-bold text-xl text-gray-800">Environment Conditions</h2>
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      <SelectInput 
        label="Weather" 
        name="weather"
        value={form.weather}
        onChange={handleChange}
        options={["Clear","Fog","Rain","Sleet","Snow"]} 
      />
      <SelectInput 
        label="Light Conditions" 
        name="light"
        value={form.light}
        onChange={handleChange}
        options={["Daylight","Dark","Dawn/Dusk"]} 
      />
      <NumberInput 
        label="Visibility (km)" 
        name="visibility" 
        value={form.visibility}
        onChange={handleChange}
        min={0} 
        max={50} 
        step={0.1} 
      />
      <SelectInput 
        label="Road Type" 
        name="road_type"
        value={form.road_type}
        onChange={handleChange}
        options={["Arterial","Highway","Local","Ramp"]} 
      />
      <div className="md:col-span-2">
        <SelectInput 
          label="Urban / Rural" 
          name="urban_rural"
          value={form.urban_rural}
          onChange={handleChange}
          options={["Urban","Rural"]} 
        />
      </div>
    </div>
  </section>
);

export default EnvironmentSection;
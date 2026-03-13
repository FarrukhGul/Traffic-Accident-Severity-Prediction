import React from "react";
import SelectInput from "../common/SelectInput";
import NumberInput from "../common/NumberInput";

const TimeDateSection = ({ form, handleChange }) => (
  <section className="bg-white backdrop-blur-sm border border-slate-200 p-5 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center mb-6">
      <div className="bg-purple-100 p-2 rounded-lg mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="font-bold text-xl text-gray-800">Time & Date</h2>
    </div>
    <div className="space-y-4">
      <NumberInput 
        label="Hour (0-23)" 
        name="hour" 
        value={form.hour}
        onChange={handleChange}
        min={0} 
        max={23} 
      />
      <NumberInput 
        label="Day of Week (1-7)" 
        name="day_of_week" 
        value={form.day_of_week}
        onChange={handleChange}
        min={1} 
        max={7} 
      />
      <NumberInput 
        label="Month (1-12)" 
        name="month" 
        value={form.month}
        onChange={handleChange}
        min={1} 
        max={12} 
      />
      <SelectInput 
        label="Holiday" 
        name="is_holiday" 
        value={form.is_holiday}
        onChange={handleChange}
        options={[0,1]} 
      />
    </div>
  </section>
);

export default TimeDateSection;
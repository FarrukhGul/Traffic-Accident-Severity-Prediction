import React from "react";
import SelectInput from "../common/SelectInput";
import NumberInput from "../common/NumberInput";

const VehicleCollisionSection = ({ form, handleChange }) => (
 <section className="bg-white backdrop-blur-sm border border-slate-200 p-5 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center mb-6">
      <div className="bg-blue-100 p-2 rounded-lg mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      </div>
      <h2 className="font-bold text-xl text-gray-800">Vehicle & Collision</h2>
    </div>
    <div className="space-y-4">
      <SelectInput 
        label="Vehicle Type" 
        name="vehicle_type"
        value={form.vehicle_type}
        onChange={handleChange}
        options={["Bicycle","Car","Motorcycle","Pedestrian","Truck"]} 
      />
      <SelectInput 
        label="Collision Type" 
        name="collision_type"
        value={form.collision_type}
        onChange={handleChange}
        options={["Head-On","Rear-End","Side-Impact","Single-Vehicle"]} 
      />
      <NumberInput 
        label="Number of Vehicles" 
        name="num_vehicles" 
        value={form.num_vehicles}
        onChange={handleChange}
        min={1} 
        max={10} 
      />
      <NumberInput 
        label="Speed Limit (km/h)" 
        name="speed_limit" 
        value={form.speed_limit}
        onChange={handleChange}
        min={0} 
        max={300} 
      />
    </div>
  </section>
);

export default VehicleCollisionSection;
import React from "react";

const StatsBar = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-sm">Accuracy</span>
        <span className="text-green-500 font-bold">76.67%</span>
      </div>
    </div>
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-sm">Predictions</span>
        <span className="text-blue-500 font-bold">1,247</span>
      </div>
    </div>
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-sm">Avg Response</span>
        <span className="text-purple-500 font-bold">120ms</span>
      </div>
    </div>
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-sm">Status</span>
        <span className="flex items-center">
          <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
          <span className="text-green-500 font-bold">Online</span>
        </span>
      </div>
    </div>
  </div>
);

export default StatsBar;
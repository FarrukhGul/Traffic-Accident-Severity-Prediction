import React from "react";
import StatsBar from "../layout/StatsBar";

const Header = () => (
  <header className="w-full mx-auto mb-6 md:mb-8">
    <div className="bg-linear-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white p-5 md:p-7 rounded-2xl shadow-xl mb-5 border border-white/20">
      <div className="flex items-center space-x-4">
        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Traffic Accident Severity Predictor</h1>
          <p className="text-cyan-100 opacity-90 text-sm md:text-base">AI-powered prediction system for accident severity assessment</p>
        </div>
      </div>
    </div>
    
    <StatsBar />
  </header>
);

export default Header;
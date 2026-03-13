// src/components/sections/PredictionSection.jsx - UPDATED VERSION
import React from "react";
import { SeverityBadge } from "../common/SeverityBadge";

const PredictionSection = ({ loading, result, bothModelsResult, selectedModel, predict, form, error }) => (
 <section className="bg-white backdrop-blur-sm border border-slate-200 p-5 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="font-bold text-xl text-gray-800 mb-2">Severity Prediction</h2>
        <p className="text-gray-500">Click predict to analyze accident severity based on provided data</p>
      </div>
      <div className="hidden md:block">
        <div className="flex space-x-2">
          <span className="h-3 w-3 bg-red-500 rounded-full"></span>
          <span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
          <span className="h-3 w-3 bg-green-500 rounded-full"></span>
        </div>
      </div>
    </div>

    {/* ERROR DISPLAY */}
    {error && (
      <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span className="text-red-700 font-medium">{error}</span>
        </div>
      </div>
    )}

    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <button
          onClick={predict}
          disabled={loading}
          className="w-full bg-linear-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Predicting...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Predict with {selectedModel === "xgboost" ? "XGBoost" : "Random Forest"}
            </>
          )}
        </button>
        
        <div className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-2">Data Summary</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-500">Vehicle:</div>
            <div className="font-medium">{form.vehicle_type}</div>
            <div className="text-gray-500">Collision:</div>
            <div className="font-medium">{form.collision_type}</div>
            <div className="text-gray-500">Alcohol:</div>
            <div className="font-medium">{form.alcohol_involved}</div>
            <div className="text-gray-500">Weather:</div>
            <div className="font-medium">{form.weather}</div>
            <div className="text-gray-500">Selected Model:</div>
            <div className="font-medium capitalize">{selectedModel.replace('_', ' ')}</div>
          </div>
        </div>
      </div>

      {/* RESULT DISPLAY - UPDATED FOR BOTH MODELS */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-4">Prediction Results</h3>
        
        {bothModelsResult ? (
          // BOTH MODELS RESULT VIEW
          <div className="space-y-4">
            {/* XGBoost Result */}
            <div className="bg-linear-to-br from-blue-50 to-white p-5 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-bold text-gray-800">XGBoost</span>
                </div>
                <SeverityBadge severity={bothModelsResult.xgboost.prediction} />
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">Probability</span>
                  <span className="font-bold text-gray-900">{bothModelsResult.xgboost.probability}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: bothModelsResult.xgboost.probability }}
                  ></div>
                </div>
              </div>
              {bothModelsResult.xgboost.confidence && (
                <div className="text-xs text-gray-500">
                  Confidence: {bothModelsResult.xgboost.confidence}
                </div>
              )}
            </div>

            {/* Random Forest Result */}
            <div className="bg-linear-to-br from-green-50 to-white p-5 rounded-xl border border-green-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-bold text-gray-800">Random Forest</span>
                </div>
                <SeverityBadge severity={bothModelsResult.random_forest.prediction} />
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">Probability</span>
                  <span className="font-bold text-gray-900">{bothModelsResult.random_forest.probability}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: bothModelsResult.random_forest.probability }}
                  ></div>
                </div>
              </div>
              {bothModelsResult.random_forest.confidence && (
                <div className="text-xs text-gray-500">
                  Confidence: {bothModelsResult.random_forest.confidence}
                </div>
              )}
            </div>

            {/* Comparison */}
            {bothModelsResult.comparison && (
              <div className="bg-linear-to-br from-purple-50 to-white p-4 rounded-xl border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-bold text-gray-800 text-sm">Comparison</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="text-gray-600">Same Prediction:</div>
                  <div className={`font-medium ${bothModelsResult.comparison.same_prediction ? 'text-green-600' : 'text-red-600'}`}>
                    {bothModelsResult.comparison.same_prediction ? '✅ Yes' : '❌ No'}
                  </div>
                  <div className="text-gray-600">Probability Difference:</div>
                  <div className="font-medium text-gray-900">{bothModelsResult.comparison.probability_difference}</div>
                  {bothModelsResult.comparison.recommended_model && (
                    <>
                      <div className="text-gray-600">Recommended:</div>
                      <div className="font-medium capitalize text-blue-600">
                        {bothModelsResult.comparison.recommended_model.replace('_', ' ')}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : result ? (
          // SINGLE MODEL RESULT VIEW
          <div className="bg-linear-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 shadow-inner">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Using {result.model_used || selectedModel}</div>
                <SeverityBadge severity={result.prediction} />
              </div>
              <div className="text-xl sm:text-2xl md:text-2xl lg:text-2 font-bold text-gray-800">
                {result.probability && typeof result.probability === 'object' 
                  ? Math.max(
                      ...Object.values(result.probability).map(v => 
                        parseFloat(v.replace('%', ''))
                      )
                    ).toFixed(1) + '%'
                  : result.probability || 'N/A'}
              </div>
            </div>
            
            {result.probability && typeof result.probability === 'object' ? (
              <div className="space-y-4">
                {Object.entries(result.probability).map(([key, value]) => {
                  const percentage = parseFloat(value.replace('%', ''));
                  return (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">{key}</span>
                        <span className="font-semibold text-gray-900">{value}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            key === 'Severe' ? 'bg-red-500' : 
                            key === 'Moderate' ? 'bg-yellow-500' : 
                            'bg-green-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                Probability data not available
              </div>
            )}
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Prediction generated at {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
            </div>
          </div>
        ) : (
          // NO RESULT VIEW
          <div className="bg-linear-to-br from-gray-50 to-white p-8 rounded-xl border-2 border-dashed border-gray-300 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 font-medium">No prediction yet</p>
            <p className="text-gray-400 text-sm mt-1">Click the predict button to analyze accident severity</p>
          </div>
        )}
      </div>
    </div>
  </section>
);

export default PredictionSection;
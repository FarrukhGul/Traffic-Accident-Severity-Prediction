import React from "react";
import PredictionSection from '../sections/PredictionSection'
const severityColor = (severity) => {
  switch (severity) {
    case "Severe":
      return "bg-red-500";
    case "Moderate":
      return "bg-yellow-500";
    case "Minor":
      return "bg-green-500";
    default:
      return "bg-red-500";
  }
};

const SeverityBadge = ({ severity}) => (
  <div
    className={`px-4 py-2 rounded-lg ${severityColor(
      severity
    )} text-white font-bold`}
  >
    {severity}
  </div>
);

export { SeverityBadge, severityColor };

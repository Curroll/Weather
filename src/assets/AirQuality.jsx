import React from "react";

const AirQuality = ({ aqi }) => {
  const getAqiStatus = (aqi) => {
    const levels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
    return levels[aqi - 1] || "Unknown";
  };

  return (
    <div className="bg-gray-700 p-4 rounded-2xl w-full text-center">
      <p className="text-lg font-bold">🌫️ Air Quality: {getAqiStatus(aqi)} ({aqi})</p>
    </div>
  );
};

export default AirQuality; // ✅ This ensures the file has a default export

import React, { useState, useEffect } from "react";
import WeatherForecast from "./WeatherForecast";

const Location = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          fetchWeather(latitude, longitude);
          fetchAirQuality(latitude, longitude);

          // Auto-refresh weather every 5 minutes
          const interval = setInterval(() => {
            fetchWeather(latitude, longitude);
            fetchAirQuality(latitude, longitude);
          }, 300000);

         

          return () => clearInterval(interval);
        },
        (err) => {
          setError(`Error: ${err.message}`);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (location) {
      fetchWeather(location.latitude, location.longitude);
      fetchAirQuality(location.latitude, location.longitude);
    }
  }, [location]);

  const fetchWeather = async (lat, lon) => {
    try {
      const API_KEY = "6dcb60675386aa9bf78ce14f5166b486";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data.");
      const data = await response.json();
      setWeather(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchAirQuality = async (lat, lon) => {
    try {
      const API_KEY = "6dcb60675386aa9bf78ce14f5166b486";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`||
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error("Failed to fetch air quality data.");
      const data = await response.json();
      setAqi(data.list?.[0]?.main?.aqi || null);
    } catch (err) {
      setError(err.message);
    }
  };

  const getAqiStatus = (aqi) => {
    const levels = ["Good 🟢", "Fair 🟡", "Moderate 🟠", "Poor 🔴", "Very Poor ‼️"];
    return levels[aqi - 1] || "Unknown";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-6 mt-2">
      {error && <p className="text-red-500">{error}</p>}

      {weather ? (
        <div className="m-0 p-0">
          <div className="bg-gray-700 p-6 rounded-2xl flex flex-row items-center w-75">
            <div>
              <h2 className="text-xl font-semibold">{weather.name}</h2>
              <p className="text-lg">{weather.main.temp}°C</p>
              <p className="capitalize">{weather.weather[0].description}</p>
              <p className="text-sm opacity-80 mt-2">Last updated: {lastUpdated}</p>
            </div>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="w-20 h-20"
            />
          </div>

          <div className="flex flex-start items-center gap-3 mt-2">
            {aqi !== null && (
              <div className="bg-gray-700 p-3 rounded-2xl w-full text-center">
                <p className="text-lg font-bold">Air Quality: {getAqiStatus(aqi)}</p>
                <p className="text-lg font-bold">Humidity: {weather.main.humidity}%</p>
              </div>
            )}
          </div>
          <WeatherForecast lat={location.latitude} lon={location.longitude} />
        </div>
        
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Location;

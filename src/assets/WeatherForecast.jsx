import React, { useState, useEffect } from "react";
import SearchCity from "./SearchCity";

const WeatherForecast = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState({
    yesterday: null,
    today: null,
    tomorrow: null,
  });
  const [error, setError] = useState(null);
  const API_KEY = "6dcb60675386aa9bf78ce14f5166b486"; // Replace with your API key

  useEffect(() => {
    if (lat && lon) {
      fetchWeatherData(lat, lon);
    }
  }, [lat, lon]);

  const fetchWeatherData = async (lat, lon) => {
    try {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const yesterdayTimestamp = currentTimestamp - 86400; // 1 day before

      // Fetch YESTERDAY'S Weather
      const yesterdayResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${yesterdayTimestamp}&appid=${API_KEY}&units=metric`
      );
      const yesterdayData = await yesterdayResponse.json();
      console.log("Yesterday's API Response:", yesterdayData);

      // Fetch TODAY'S Weather
      const todayResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const todayData = await todayResponse.json();
      console.log("Today's API Response:", todayData);

      // Fetch TOMORROW'S Weather
      const tomorrowResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const tomorrowData = await tomorrowResponse.json();
      console.log("Tomorrow's API Response:", tomorrowData);

      // Get tomorrow’s forecast at noon (closest match)
      const tomorrowForecast = tomorrowData.list.find((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setWeatherData({
        yesterday: yesterdayData.current || null,
        today: todayData || null,
        tomorrow: tomorrowForecast || null,
      });
    } catch (err) {
      setError("Failed to fetch weather data.");
    }
  };

  return (
    <div className="flex  mt-2">
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-row gap-4">
        {/* Yesterday's Weather */}
        {weatherData.yesterday && (
          <div className="bg-gray-700 p-4 rounded-2xl text-center">
            <h3 className="text-sm font-semibold">📅 Yesterday</h3>
            <p>Temp: {weatherData.yesterday.temp}°C</p>
            <p className="capitalize">{weatherData.yesterday.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.yesterday.weather[0].icon}.png`}
              alt="Weather Icon"
              className="mx-auto"
            />
          </div>
        )}

        {/* Today's Weather */}
        {weatherData.today && (
          <div className="bg-gray-700 p-2 rounded-2xl text-center">
            <h3 className="text-sm font-semibold">🌞 Today</h3>
            <p>Temp: {weatherData.today.main.temp}°C</p>
            <p className="capitalize">{weatherData.today.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.today.weather[0].icon}.png`}
              alt="Weather Icon"
              className="mx-auto"
            />
          </div>
        )}

        {/* Tomorrow's Weather */}
        {weatherData.tomorrow && (
          <div className="bg-gray-700 p-2 rounded-2xl text-center">
            <h3 className="text-sm font-semibold">🌥️ Tomorrow</h3>
            <p>Temp: {weatherData.tomorrow.main.temp}°C</p>
            <p className="capitalize">{weatherData.tomorrow.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.tomorrow.weather[0].icon}.png`}
              alt="Weather Icon"
              className="mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherForecast;

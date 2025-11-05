import React, { useState, useEffect } from "react";
import "./Alerts.css";

function Alerts({ cityFromHome }) {
  const [city, setCity] = useState(cityFromHome || "");
  const [weather, setWeather] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("normal");

  const apiKey = "0e62256fee1a37258c2b81d504f0c4dc";

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWeather = async (cityName) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    // 🧩 Defensive check for valid response
    if (data.cod !== 200) {
      setWeather({ error: "City not found" });
      setAlertMessage("");
      return;
    }

    // ✅ Extract weather data safely
    setWeather({
      name: data.name,
      temp: data.main.temp,
      desc: data.weather?.[0]?.description || "Unknown",
      icon: data.weather?.[0]?.icon || "",
    });

    // 🌦️ Dynamic Background + Alerts
    const condition = data.weather?.[0]?.main?.toLowerCase() || "";

    if (condition.includes("thunderstorm")) {
      setAlertType("danger");
      setAlertMessage("⚡ Severe Thunderstorm Alert! Stay indoors!");
    } else if (condition.includes("rain")) {
      setAlertType("warning");
      setAlertMessage("🌧️ It's raining. Don't forget your umbrella!");
    } else if (condition.includes("clear")) {
      setAlertType("success");
      setAlertMessage("🌞 Perfect weather! Enjoy your day!");
    } else if (condition.includes("cloud")) {
      setAlertType("info");
      setAlertMessage("☁️ Cloudy skies — nice and cool outside.");
    } else if (condition.includes("snow")) {
      setAlertType("info");
      setAlertMessage("❄️ Snowfall alert — stay warm!");
    } else {
      setAlertType("normal");
      setAlertMessage("🌤️ Weather conditions are stable.");
    }

  } catch (error) {
    console.error("Error fetching weather:", error);
    setWeather({ error: "Error fetching data" });
    setAlertMessage("");
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city){
       fetchWeather(city);
    }
    };

  return (
    <div className="alerts-page">
      {/* ⚡ Animated Layers */}
      <div className="weather-overlay"></div>

      {/* Alert Banner */}
      {alertMessage && (
        <div className={`alert-banner ${alertType}`}>{alertMessage}</div>
      )}

      {/* City Form */}
      <form className="weather-form alert-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <span className="input-icon">🔍</span>
          <input
            type="text"
            className="city-input"
            placeholder="Enter City Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <button type="submit">Check Alert</button>
      </form>

      {/* Weather Display */}
      {weather && !weather.error && (
        <div className="alert-container">
          <h1 className="alert-title">AccuWeather</h1>
          <p className="alert-subtitle">Accurate forecasts, anytime.</p>

          <div className="alert-weather">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="Weather Icon"
              className="alert-icon"
            />
            <h2 className="alert-temp">{Math.round(weather.temp)}°C</h2>
            <p className="alert-condition">
              {weather.desc.charAt(0).toUpperCase() + weather.desc.slice(1)}
            </p>
          </div>

        </div>
      )}

      {weather && weather.error && <p className="error">{weather.error}</p>}
    </div>
  );
}

export default Alerts;

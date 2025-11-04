import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import WeatherCard from "./pages/WeatherCard";
import Home from "./pages/Home";
import About from "./pages/About";
import Alerts from "./pages/Alerts";
import Maps from "./pages/Maps";
import Auth from "./pages/Auth";
import "./index.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city) return;

    try {
      const apiKey = "0e62256fee1a37258c2b81d504f0c4dc";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      console.log(data);

      if (data.cod === 200) {
      setWeather({
        name: data.name,
        temp: data.main.temp,
        humidity: data.main.humidity,
        desc: data.weather[0].description,
        icon: data.weather[0].icon,
        wind: data.wind.speed,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        timezone: data.timezone,
      });

      } else {
        setWeather({ error: "City not found" });
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      setWeather({ error: "Error fetching data. Please try again." });
    }
  };

  return (
    <Router>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <main className="home-page">
              <div className="hero-section">
                <h1 className="hero-title">Welcome to AccuWeather</h1>
                <p className="hero-subtitle">Get real-time weather updates for any city worldwide</p>
                <div className="weather-icons">
                  <span className="weather-icon">☀️</span>
                  <span className="weather-icon">🌧️</span>
                  <span className="weather-icon">⛈️</span>
                  <span className="weather-icon">❄️</span>
                  <span className="weather-icon">☁️</span>
                </div>
              </div>

              <div className="search-section">
                <form className="weather-form" onSubmit={handleSubmit}>
                  <div className="input-wrapper">
                    <span className="input-icon">🔍</span>
                    <input
                      type="text"
                      className="city-input"
                      placeholder="Enter City Name (e.g., London, New York)"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <button type="submit">Get Weather</button>
                </form>
                {weather && <WeatherCard weather={weather} />}
              </div>

              <div className="features-section">
                <h2 className="features-title">What We Offer</h2>
                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-icon">🌡️</div>
                    <h3>Temperature</h3>
                    <p>Real-time temperature readings in Celsius</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">💧</div>
                    <h3>Humidity</h3>
                    <p>Current humidity levels for better planning</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">🌬️</div>
                    <h3>Wind Speed</h3>
                    <p>Wind speed and conditions updates</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">🌅</div>
                    <h3>Sunrise/Sunset</h3>
                    <p>Daily sunrise and sunset times</p>
                  </div>
                </div>
              </div>

              <div className="quick-tips">
                <h3>💡 Quick Tips</h3>
                <ul>
                  <li>Search for any city name worldwide</li>
                  <li>Check the Alerts page for weather warnings</li>
                  <li>Explore our About page to learn more</li>
                </ul>
              </div>
            </main>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/alerts" element={<Alerts cityFromHome={city} />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;

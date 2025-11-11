import { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Header from "./pages/Header";
import WeatherCard from "./pages/WeatherCard";
import Forecast from "./pages/Forecast";
import About from "./pages/About";
import Alerts from "./pages/Alerts";
import Maps from "./pages/Maps";
import Auth from "./pages/Auth";

import "./index.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  // Use API key from .env
  const apiKey = useMemo(() => import.meta.env.VITE_OPENWEATHER_API_KEY, []);

  // keep background in sync with weather
  const applyBodyTheme = (main) => {
    const t = (main || "").toLowerCase();
    // keep any pre-existing classes; just update data-attr
    document.body.setAttribute("data-weather", t);
  };

  useEffect(() => {
    // reset theme on first load
    applyBodyTheme("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        applyBodyTheme(data.weather?.[0]?.main);
        setWeather({
          name: data.name,
          country: data.sys?.country,
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          desc: data.weather[0].description,
          main: data.weather[0].main,
          icon: data.weather[0].icon,
          wind: data.wind.speed,
          wind_deg: data.wind.deg,
          clouds: data.clouds.all,
          visibility: data.visibility,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          timezone: data.timezone,
          coord: data.coord,
        });
      } else {
        setWeather({ error: data?.message ? String(data.message) : "City not found" });
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      setWeather({ error: "Error fetching data. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Header />

        <Routes>
          {/* Auth Route - Public */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Protected Routes - Require Authentication */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <main className="home-page">
              <div className="hero-section">
                <h1 className="hero-title">Welcome to AccuWeather</h1>
                <p className="hero-subtitle">
                  Get real-time weather updates for any city worldwide
                </p>
                <div className="weather-icons" aria-hidden>
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
                      aria-label="City name"
                    />
                  </div>
                  <button type="submit" disabled={loading}>
                    {loading ? "Loading…" : "Get Weather"}
                  </button>
                </form>

                {loading && (
                  <div className="loader" aria-live="polite">
                    <div className="spinner" /> Fetching weather…
                  </div>
                )}

                {weather && !loading && <WeatherCard weather={weather} />}

                <div className="actions-row">
                  <Link
                    className="pill-link"
                    to={`/forecast?city=${encodeURIComponent(city || weather?.name || "")}`}
                    state={{ fromCity: city || weather?.name || "" }}
                  >
                    View 3-Day Forecast →
                  </Link>
                </div>
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
                    <h3>Wind</h3>
                    <p>Speed & direction updates</p>
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
                  <li>Search any city name worldwide</li>
                  <li>Check the Alerts page for warnings</li>
                  <li>Visit the Forecast page for the next 3 days</li>
                </ul>
              </div>
            </main>
              </ProtectedRoute>
            }
          />
          <Route 
            path="/forecast" 
            element={
              <ProtectedRoute>
                <Forecast apiKey={apiKey} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/about" 
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/alerts" 
            element={
              <ProtectedRoute>
                <Alerts cityFromHome={city || weather?.name || ""} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/maps" 
            element={
              <ProtectedRoute>
                <Maps />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;

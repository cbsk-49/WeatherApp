import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Maps.css";

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function ClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function Maps() {
  const [clickedPosition, setClickedPosition] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [markers, setMarkers] = useState([]);

  const API_KEY = "0e62256fee1a37258c2b81d504f0c4dc";

  const handleMapClick = async (lat, lng) => {
    setLoading(true);
    setError(null);
    setClickedPosition({ lat, lng });

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeather({
          name: data.name || `${lat.toFixed(2)}, ${lng.toFixed(2)}`,
          temp: data.main.temp,
          humidity: data.main.humidity,
          desc: data.weather[0].description,
          icon: data.weather[0].icon,
          wind: data.wind?.speed || 0,
          country: data.sys?.country || "",
          feelsLike: data.main.feels_like,
          pressure: data.main.pressure,
        });

        // Add marker to the map
        const newMarker = {
          id: Date.now(),
          lat,
          lng,
          name: data.name || "Location",
        };
        setMarkers((prev) => [...prev, newMarker]);
      } else {
        setError("Weather data not available for this location");
      }
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherEmoji = (iconId) => {
    const icon = iconId?.toString() || "";
    if (icon.includes("01")) return "☀️";
    if (icon.includes("02")) return "⛅";
    if (icon.includes("03") || icon.includes("04")) return "☁️";
    if (icon.includes("09") || icon.includes("10")) return "🌧️";
    if (icon.includes("11")) return "⛈️";
    if (icon.includes("13")) return "❄️";
    if (icon.includes("50")) return "🌫️";
    return "🌤️";
  };

  return (
    <div className="maps-page">
      <div className="maps-header">
        <h1 className="maps-title">🗺️ Interactive Weather Map</h1>
        <p className="maps-subtitle">
          Click anywhere on the map to get real-time weather information for that location!
        </p>
      </div>

      <div className="maps-container">
        <div className="map-wrapper">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: "100%", width: "100%", borderRadius: "16px" }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickHandler onMapClick={handleMapClick} />
            {markers.map((marker) => (
              <Marker key={marker.id} position={[marker.lat, marker.lng]}>
                <Popup>{marker.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="weather-sidebar">
          {loading && (
            <div className="weather-loading">
              <div className="loading-spinner"></div>
              <p>Loading weather data...</p>
            </div>
          )}

          {error && (
            <div className="weather-error">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && !weather && (
            <div className="weather-placeholder">
              <div className="placeholder-icon">📍</div>
              <h3>Click on the Map</h3>
              <p>Click anywhere on the map to view weather information for that location.</p>
            </div>
          )}

          {!loading && !error && weather && (
            <div className="weather-card-map">
              <div className="weather-card-header">
                <h2 className="weather-location">
                  {weather.name}
                  {weather.country && <span className="weather-country">, {weather.country}</span>}
                </h2>
                {clickedPosition && (
                  <p className="weather-coords">
                    {clickedPosition.lat.toFixed(4)}, {clickedPosition.lng.toFixed(4)}
                  </p>
                )}
              </div>

              <div className="weather-main-info">
                <div className="weather-icon-large">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.desc}
                  />
                  <span className="weather-emoji-large">{getWeatherEmoji(weather.icon)}</span>
                </div>
                <div className="weather-temp-large">
                  {Math.round(weather.temp)}°C
                </div>
                <p className="weather-desc-large">
                  {weather.desc.charAt(0).toUpperCase() + weather.desc.slice(1)}
                </p>
              </div>

              <div className="weather-details-grid">
                <div className="weather-detail-item">
                  <span className="detail-icon">🌡️</span>
                  <div className="detail-content">
                    <span className="detail-label">Feels Like</span>
                    <span className="detail-value">{Math.round(weather.feelsLike)}°C</span>
                  </div>
                </div>
                <div className="weather-detail-item">
                  <span className="detail-icon">💧</span>
                  <div className="detail-content">
                    <span className="detail-label">Humidity</span>
                    <span className="detail-value">{weather.humidity}%</span>
                  </div>
                </div>
                <div className="weather-detail-item">
                  <span className="detail-icon">🌬️</span>
                  <div className="detail-content">
                    <span className="detail-label">Wind Speed</span>
                    <span className="detail-value">{weather.wind} m/s</span>
                  </div>
                </div>
                <div className="weather-detail-item">
                  <span className="detail-icon">📊</span>
                  <div className="detail-content">
                    <span className="detail-label">Pressure</span>
                    <span className="detail-value">{weather.pressure} hPa</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="maps-instructions">
        <div className="instruction-card">
          <span className="instruction-icon">👆</span>
          <h4>Click to Explore</h4>
          <p>Click anywhere on the map to get instant weather data</p>
        </div>
        <div className="instruction-card">
          <span className="instruction-icon">🔍</span>
          <h4>Zoom In/Out</h4>
          <p>Use mouse wheel or controls to zoom for precise location</p>
        </div>
        <div className="instruction-card">
          <span className="instruction-icon">📍</span>
          <h4>Markers</h4>
          <p>Your clicked locations are marked on the map</p>
        </div>
      </div>
    </div>
  );
}

export default Maps;

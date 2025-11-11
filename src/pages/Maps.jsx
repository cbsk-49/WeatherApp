import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Maps.css";

// ✅ Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
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
  const mapRef = useRef(null);

  // ✅ Use environment variable or fallback key
  const API_KEY =
  import.meta.env.VITE_OPENWEATHER_API_KEY ||
  "0e62256fee1a37258c2b81d504f0c4dc";

  // ✅ Cleaned and safe version of handleMapClick
  const handleMapClick = async (lat, lng) => {
    setLoading(true);
    setError(null);
    setClickedPosition({ lat, lng });

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (!response.ok || Number(data.cod) !== 200) {
        throw new Error(data.message || `HTTP error ${response.status}`);
      }

      // ✅ Update weather info
      setWeather({
        name: data.name || `${lat.toFixed(2)}, ${lng.toFixed(2)}`,
        temp: data.main.temp,
        humidity: data.main.humidity,
        desc: data.weather?.[0]?.description || "N/A",
        icon: data.weather?.[0]?.icon || "",
        wind: data.wind?.speed || 0,
          windDeg: data.wind?.deg,
        country: data.sys?.country || "",
        feelsLike: data.main.feels_like,
        pressure: data.main.pressure,
          visibility: data.visibility,
          clouds: data.clouds?.all,
          sunrise: data.sys?.sunrise,
          sunset: data.sys?.sunset,
          obsTime: data.dt,
          timezone: data.timezone,
      });

      // ✅ Add marker
      const newMarker = {
        id: Date.now(),
        lat,
        lng,
        name: data.name || "Location",
      };
      setMarkers((prev) => [...prev, newMarker]);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError(err.message || "Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const removeMarker = (id) => {
    setMarkers((prev) => prev.filter((m) => m.id !== id));
  };

  const clearMarkers = () => {
    setMarkers([]);
  };

  const centerOnClicked = (zoomLevel = 8) => {
    if (!clickedPosition || !mapRef.current) return;
    try {
      if (typeof mapRef.current.flyTo === "function") {
        mapRef.current.flyTo(
          [clickedPosition.lat, clickedPosition.lng],
          zoomLevel,
          { duration: 0.8 }
        );
      }
    } catch (e) {
      console.warn("Could not center map:", e);
    }
  };

  const formatTimeFromUnix = (unixSeconds, tzOffsetSeconds) => {
    if (!unixSeconds) return "N/A";
    // Convert unix seconds to milliseconds
    const utcMs = unixSeconds * 1000;
    // Create date from UTC ms then apply timezone offset
    const localMs = utcMs + (tzOffsetSeconds || 0) * 1000;
    const d = new Date(localMs);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const windDirectionFromDeg = (deg) => {
    if (deg == null) return "N/A";
    const directions = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
    const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 22.5) % 16;
    return directions[index];
  };

  const formatVisibility = (m) => {
    if (m == null) return 'N/A';
    if (m >= 1000) return `${(m/1000).toFixed(1)} km`;
    return `${m} m`;
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
          Click anywhere on the map to get real-time weather information for that
          location!
        </p>
      </div>

      <div className="maps-container">
        {/* === Map Section === */}
        <div className="map-wrapper">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: "100%", width: "100%", borderRadius: "16px" }}
            scrollWheelZoom={true}
            whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
              OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickHandler onMapClick={handleMapClick} />

            {markers.map((marker) => (
              <Marker key={marker.id} position={[marker.lat, marker.lng]}>
                <Popup>
                  <div style={{ minWidth: 140 }}>
                    <div style={{ marginBottom: 8 }}>{marker.name}</div>
                    <button
                      onClick={() => removeMarker(marker.id)}
                      style={{ cursor: "pointer" }}
                    >
                      Remove
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* === Sidebar Section === */}
        <div className="weather-sidebar">
          {loading && (
            <div className="weather-loading" role="status" aria-live="polite">
              <div className="loading-spinner"></div>
              <p>Loading weather data...</p>
            </div>
          )}

          {error && (
            <div className="weather-error" role="alert" aria-live="assertive">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
            </div>
          )}

          {/* ✅ Map Control Buttons */}
          <div
            className="map-controls"
            style={{ margin: "12px 0", display: "flex", gap: 8 }}
          >
            <button
              onClick={clearMarkers}
              disabled={markers.length === 0}
              className="btn btn-small"
            >
              Clear Markers
            </button>
            <button
              onClick={() => centerOnClicked()}
              disabled={!clickedPosition}
              className="btn btn-small"
            >
              Center on Last Click
            </button>
          </div>

          {/* === Weather Display States === */}
          {!loading && !error && !weather && (
            <div className="weather-placeholder">
              <div className="placeholder-icon">📍</div>
              <h3>Click on the Map</h3>
              <p>Click anywhere on the map to view weather information.</p>
            </div>
          )}

          {!loading && !error && weather && (
            <div className="weather-card-map">
              <div className="weather-card-header">
                <h2 className="weather-location">
                  {weather.name}
                  {weather.country && (
                    <span className="weather-country">, {weather.country}</span>
                  )}
                </h2>
                {clickedPosition && (
                  <p className="weather-coords">
                    {clickedPosition.lat.toFixed(4)},{" "}
                    {clickedPosition.lng.toFixed(4)}
                  </p>
                )}
              </div>

              <div className="weather-main-info">
                <div className="weather-icon-large">
                  {weather.icon ? (
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                      alt={weather.desc || "weather icon"}
                    />
                  ) : (
                    <div
                      className="weather-emoji-large"
                      aria-hidden="true"
                    >
                      {getWeatherEmoji(weather.icon)}
                    </div>
                  )}
                </div>
                <div className="weather-temp-large">
                  {Math.round(weather.temp)}°C
                </div>
                <p className="weather-desc-large">
                  {weather.desc
                    ? weather.desc.charAt(0).toUpperCase() + weather.desc.slice(1)
                    : "N/A"}
                </p>
              </div>

              <div className="weather-details-grid">
                <div className="weather-detail-item">
                  <span className="detail-icon">🌡️</span>
                  <div className="detail-content">
                    <span className="detail-label">Feels Like</span>
                    <span className="detail-value">
                      {Math.round(weather.feelsLike)}°C
                    </span>
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
                  <span className="detail-icon">🧭</span>
                  <div className="detail-content">
                    <span className="detail-label">Wind Direction</span>
                    <span className="detail-value">{windDirectionFromDeg(weather.windDeg)}</span>
                  </div>
                </div>
                <div className="weather-detail-item">
                  <span className="detail-icon">📊</span>
                  <div className="detail-content">
                    <span className="detail-label">Pressure</span>
                    <span className="detail-value">{weather.pressure} hPa</span>
                  </div>
                </div>
                <div className="weather-detail-item">
                  <span className="detail-icon">👁️</span>
                  <div className="detail-content">
                    <span className="detail-label">Visibility</span>
                    <span className="detail-value">{formatVisibility(weather.visibility)}</span>
                  </div>
                </div>
                <div className="weather-detail-item">
                  <span className="detail-icon">☁️</span>
                  <div className="detail-content">
                    <span className="detail-label">Cloud Cover</span>
                    <span className="detail-value">{weather.clouds != null ? `${weather.clouds}%` : 'N/A'}</span>
                  </div>
                </div>
                <div className="weather-detail-item">
                  <span className="detail-icon">🌅</span>
                  <div className="detail-content">
                    <span className="detail-label">Sunrise</span>
                    <span className="detail-value">{formatTimeFromUnix(weather.sunrise, weather.timezone)}</span>
                  </div>
                </div>
                <div className="weather-detail-item">
                  <span className="detail-icon">🌇</span>
                  <div className="detail-content">
                    <span className="detail-label">Sunset</span>
                    <span className="detail-value">{formatTimeFromUnix(weather.sunset, weather.timezone)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* === Instructions Section === */}
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

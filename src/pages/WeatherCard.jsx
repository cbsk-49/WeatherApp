/* Light, informative current weather card */
function WeatherCard({ weather }) {
  if (weather?.error) {
    return (
      <div className="card">
        <p className="errordisplay">⚠️ {weather.error}</p>
      </div>
    );
  }

  const formatTime = (timestamp, timezone) => {
    const date = new Date((timestamp + timezone) * 1000);
    const h = date.getUTCHours().toString().padStart(2, "0");
    const m = date.getUTCMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  return (
    <div className="card">
      <h1 className="citydisplay">
        {weather.name}
        {weather.country ? `, ${weather.country}` : ""}
      </h1>

      <div className="card-main">
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.desc}
          className="wx-icon"
        />
        <div className="tempblock">
          <p className="tempdisplay">{Math.round(weather.temp)}°C</p>
          <p className="descdisplay">
            {weather.desc.charAt(0).toUpperCase() + weather.desc.slice(1)}
          </p>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric">
          <span className="label">Feels like</span>
          <span className="value">{Math.round(weather.feels_like)}°C</span>
        </div>
        <div className="metric">
          <span className="label">Min</span>
          <span className="value">{Math.round(weather.temp_min)}°C</span>
        </div>
        <div className="metric">
          <span className="label">Max</span>
          <span className="value">{Math.round(weather.temp_max)}°C</span>
        </div>
        <div className="metric">
          <span className="label">Humidity</span>
          <span className="value">{weather.humidity}%</span>
        </div>
        <div className="metric">
          <span className="label">Pressure</span>
          <span className="value">{weather.pressure} hPa</span>
        </div>
        <div className="metric">
          <span className="label">Visibility</span>
          <span className="value">{(weather.visibility / 1000).toFixed(1)} km</span>
        </div>
        <div className="metric">
          <span className="label">Wind</span>
          <span className="value">{weather.wind} m/s</span>
        </div>
        <div className="metric">
          <span className="label">Direction</span>
          <span className="value">{weather.wind_deg}°</span>
        </div>
        <div className="metric">
          <span className="label">Clouds</span>
          <span className="value">{weather.clouds}%</span>
        </div>
      </div>

      {weather.sunrise && weather.timezone && (
        <div className="sun-row">
          <div className="sun-item">🌅 Sunrise: {formatTime(weather.sunrise, weather.timezone)}</div>
          <div className="sun-item">🌇 Sunset: {formatTime(weather.sunset, weather.timezone)}</div>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;

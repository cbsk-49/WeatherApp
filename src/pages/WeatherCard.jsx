function WeatherCard({ weather }) {
  if (weather.error) {
    return <div className="card"><p className="errordisplay">{weather.error}</p></div>;
  }

  function formatTime(timestamp, timezone) {
    // Convert UTC timestamp to local time in the city's timezone
    const date = new Date((timestamp + timezone) * 1000);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }


  return (
    <div className="card">
      <h1 className="citydisplay">{weather.name}</h1>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt="weather icon"
        style={{ width: "100px", height: "100px" }}
      />
      <p className="tempdisplay">{Math.round(weather.temp)}°C</p>
      <p className="descdisplay">{weather.desc.charAt(0).toUpperCase() + weather.desc.slice(1)}</p>
      <p className="humiditydisplay">Humidity: {weather.humidity}%</p>
      {weather.wind && <p>Wind Speed: {weather.wind} m/s</p>}
      {weather.sunrise && weather.timezone && (
        <>
          <p>Sunrise: {formatTime(weather.sunrise, weather.timezone)}</p>
          <p>Sunset: {formatTime(weather.sunset, weather.timezone)}</p>
        </>
      )}
    </div>
  );
}
export default WeatherCard;
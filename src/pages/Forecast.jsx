import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

function groupByDayThreeSnapshots(list) {
  // pick around 12:00 (or nearest) per day, for next 3 distinct days
  const byDate = new Map();
  list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const key = date.toISOString().slice(0, 10); // YYYY-MM-DD
    if (!byDate.has(key)) byDate.set(key, []);
    byDate.get(key).push(item);
  });

  const days = [];
  for (const [key, arr] of byDate.entries()) {
    // prefer entries around 12:00:00
    const targetHour = 12;
    let best = arr[0];
    let bestDelta = 24;
    for (const it of arr) {
      const h = new Date(it.dt * 1000).getHours();
      const delta = Math.abs(h - targetHour);
      if (delta < bestDelta) {
        best = it;
        bestDelta = delta;
      }
    }
    days.push({ date: key, item: best });
  }

  // today might appear; we want next 3 (including today) — feel free to slice(0,3)
  return days.slice(0, 3);
}

export default function Forecast({ apiKey }) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const initialCity =
    searchParams.get("city") ||
    location?.state?.fromCity ||
    "";

  const [city, setCity] = useState(initialCity);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasKey = useMemo(() => Boolean(apiKey), [apiKey]);

  const fetchForecast = async (q) => {
    if (!q || !hasKey) return;
    setLoading(true);
    setError("");
    setDays([]);

    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
        q
      )}&appid=${apiKey}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod === "200") {
        const grouped = groupByDayThreeSnapshots(data.list);
        setDays(
          grouped.map(({ date, item }) => ({
            date,
            temp: Math.round(item.main.temp),
            min: Math.round(item.main.temp_min),
            max: Math.round(item.main.temp_max),
            desc: item.weather?.[0]?.description ?? "",
            main: item.weather?.[0]?.main ?? "",
            icon: item.weather?.[0]?.icon ?? "01d",
          }))
        );
        // Optional: set theme based on first day's main
        if (grouped[0]?.item?.weather?.[0]?.main) {
          document.body.setAttribute(
            "data-weather",
            grouped[0].item.weather[0].main.toLowerCase()
          );
        }
      } else {
        setError(data?.message ? String(data.message) : "Could not fetch forecast");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCity) fetchForecast(initialCity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCity]);

  const onSubmit = (e) => {
    e.preventDefault();
    fetchForecast(city);
  };

  return (
    <main className="page">
      <h1>3-Day Forecast</h1>

      <form className="weather-form" onSubmit={onSubmit} style={{ marginTop: 16 }}>
        <div className="input-wrapper">
          <span className="input-icon">📍</span>
          <input
            className="city-input"
            placeholder="Enter City (e.g., Tokyo)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            aria-label="City name for forecast"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading…" : "Get Forecast"}
        </button>
      </form>

      {loading && (
        <div className="loader" aria-live="polite">
          <div className="spinner" /> Fetching forecast…
        </div>
      )}

      {error && <div className="error">⚠️ {error}</div>}

      {!loading && !error && days.length > 0 && (
        <div className="forecast-grid">
          {days.map((d) => {
            const dt = new Date(d.date);
            const weekday = dt.toLocaleDateString(undefined, { weekday: "long" });
            const month = dt.toLocaleDateString(undefined, { month: "short", day: "numeric" });
            return (
              <div className="forecast-card" key={d.date}>
                <div className="fc-header">
                  <div className="fc-day">{weekday}</div>
                  <div className="fc-date">{month}</div>
                </div>
                <img
                  className="fc-icon"
                  src={`https://openweathermap.org/img/wn/${d.icon}@2x.png`}
                  alt={d.desc}
                />
                <div className="fc-temp">{d.temp}°C</div>
                <div className="fc-range">
                  <span>H: {d.max}°</span>
                  <span>L: {d.min}°</span>
                </div>
                <div className="fc-desc">{d.desc}</div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

import { useEffect, useRef } from "react";

function About() {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    });

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero" ref={addRef}>
        <div className="hero-content">
          <h1 className="about-main-title">🌍 Understanding Weather</h1>
          <p className="hero-description">
            Weather is the state of the atmosphere at a specific time and place, 
            including temperature, humidity, wind, and precipitation. It's the 
            constant dance between the sun, ocean, and atmosphere that shapes our daily lives.
          </p>
        </div>
      </section>

      {/* Weather Facts Section */}
      <section className="weather-facts" ref={addRef}>
        <h2 className="section-title" ref={addRef}>🌦️ Amazing Weather Facts</h2>
        <div className="facts-grid">
          <div className="fact-card" ref={addRef}>
            <div className="fact-icon">⚡</div>
            <h3>The Lightning Factory</h3>
            <p>At any given moment, over 1,800 thunderstorms are actively raging across the planet, 
               generating an astonishing average of 100 lightning strikes per second!</p>
          </div>
          <div className="fact-card" ref={addRef}>
            <div className="fact-icon">💧</div>
            <h3>The Weight of Water</h3>
            <p>The atmosphere constantly holds approximately 37.5 million billion gallons of water vapor. 
               If all moisture fell at once, it would cover the globe to a depth of 2.5 centimeters!</p>
          </div>
          <div className="fact-card" ref={addRef}>
            <div className="fact-icon">🌪️</div>
            <h3>The Wind Tunnel</h3>
            <p>The fastest non-tornadic wind gust ever recorded reached 408 km/h (253 mph) in Australia, 
               powerful enough to tear steel structures apart!</p>
          </div>
          <div className="fact-card" ref={addRef}>
            <div className="fact-icon">🌀</div>
            <h3>The Hurricane's Heart</h3>
            <p>A single mature hurricane can release energy equivalent to 10,000 atomic bombs over one day. 
               The heat engine driving one storm exceeds the world's combined electrical generating capacity!</p>
          </div>
          <div className="fact-card" ref={addRef}>
            <div className="fact-icon">🛡️</div>
            <h3>The Ozone Shield</h3>
            <p>The Ozone Layer protecting us from harmful UV radiation is incredibly thin. If compressed 
               to Earth's surface, it would be only about 3 millimeters (one-eighth of an inch) thick!</p>
          </div>
          <div className="fact-card" ref={addRef}>
            <div className="fact-icon">🌡️</div>
            <h3>Temperature Extremes</h3>
            <p>The hottest temperature ever recorded was 56.7°C (134°F) in Death Valley, while the coldest 
               was -89.2°C (-128.6°F) in Antarctica!</p>
          </div>
        </div>
      </section>

      {/* Weather Components Section */}
      <section className="weather-components" ref={addRef}>
        <h2 className="section-title" ref={addRef}>☁️ What Makes Up Weather?</h2>
        <div className="components-list">
          <div className="component-item" ref={addRef}>
            <div className="component-number">1</div>
            <div className="component-content">
              <h3>Temperature</h3>
              <p>Measures how hot or cold the air is, influenced by solar radiation, altitude, and proximity to water.</p>
            </div>
          </div>
          <div className="component-item" ref={addRef}>
            <div className="component-number">2</div>
            <div className="component-content">
              <h3>Humidity</h3>
              <p>The amount of water vapor in the air. High humidity makes us feel hotter, while low humidity can cause dryness.</p>
            </div>
          </div>
          <div className="component-item" ref={addRef}>
            <div className="component-number">3</div>
            <div className="component-content">
              <h3>Wind</h3>
              <p>Air movement caused by differences in atmospheric pressure. Wind speed and direction are crucial for weather patterns.</p>
            </div>
          </div>
          <div className="component-item" ref={addRef}>
            <div className="component-number">4</div>
            <div className="component-content">
              <h3>Precipitation</h3>
              <p>Any form of water falling from clouds—rain, snow, sleet, or hail—essential for life on Earth.</p>
            </div>
          </div>
          <div className="component-item" ref={addRef}>
            <div className="component-number">5</div>
            <div className="component-content">
              <h3>Atmospheric Pressure</h3>
              <p>The weight of air above us. High pressure usually means clear skies, while low pressure often brings storms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Climate Change Section */}
      <section className="climate-section" ref={addRef}>
        <h2 className="section-title" ref={addRef}>🌍 Climate Change & Global Warming</h2>
        <div className="climate-content" ref={addRef}>
          <p className="climate-text">
            Climate change is one of the most critical challenges of our time. Global warming, caused primarily 
            by human activities like burning fossil fuels, is increasing Earth's average temperature. This leads to:
          </p>
          <div className="climate-impacts">
            <div className="impact-item" ref={addRef}>
              <span className="impact-icon">🌊</span>
              <p>Rising sea levels</p>
            </div>
            <div className="impact-item" ref={addRef}>
              <span className="impact-icon">🔥</span>
              <p>More extreme weather events</p>
            </div>
            <div className="impact-item" ref={addRef}>
              <span className="impact-icon">🌱</span>
              <p>Ecosystem disruption</p>
            </div>
            <div className="impact-item" ref={addRef}>
              <span className="impact-icon">🏔️</span>
              <p>Melting ice caps</p>
            </div>
          </div>
          <p className="climate-closing">
            Understanding weather patterns and climate helps us prepare for these changes and work toward solutions.
          </p>
        </div>
      </section>

      {/* About Our App Section */}
      <section className="app-about" ref={addRef}>
        <div className="app-about-content" ref={addRef}>
          <h2 className="section-title" ref={addRef}>🌤️ About AccuWeather</h2>
          <div className="app-info-card">
            <div className="app-logo-large">🌦️</div>
            <h3>AccuWeather - Your Weather Companion</h3>
            <p className="app-description">
              AccuWeather is a modern weather tracking application built with React and powered by the 
              OpenWeather API. Our mission is to provide accurate, real-time weather information for 
              cities worldwide, helping you stay ahead of the skies.
            </p>
            
            <div className="app-features-list">
              <div className="app-feature">
                <span className="feature-check">✓</span>
                <span>Real-time weather data for any city</span>
              </div>
              <div className="app-feature">
                <span className="feature-check">✓</span>
                <span>Temperature, humidity, and wind speed</span>
              </div>
              <div className="app-feature">
                <span className="feature-check">✓</span>
                <span>Sunrise and sunset times</span>
              </div>
              <div className="app-feature">
                <span className="feature-check">✓</span>
                <span>Weather alerts and warnings</span>
              </div>
            </div>

            <div className="app-footer-info">
              <p><strong>Version:</strong> 1.0.0</p>
              <p><strong>Powered by:</strong> OpenWeather</p>
              <p className="app-tagline">"Stay ahead of the skies."</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;

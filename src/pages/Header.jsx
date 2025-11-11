import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="navbar">
      <Link className="nav-heading" to="/">
        <span className="logo">🌤️</span>
        <div>
          <h1>AccuWeather</h1>
          <p>Clean. Fast. Accurate.</p>
        </div>
      </Link>

      <nav className="nav-list">
        <ul>
          <li>
            <NavLink to="/" className="btn">Home</NavLink>
          </li>
          <li>
            <NavLink to="/forecast" className="btn">Forecast</NavLink>
          </li>
          <li>
            <NavLink to="/alerts" className="btn">Alerts</NavLink>
          </li>
          <li>
            <NavLink to="/maps" className="btn">Maps</NavLink>
          </li>
          <li>
            <NavLink to="/about" className="btn">About</NavLink>
          </li>
          <li>
            <NavLink to="/auth" className="btn">Sign In</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

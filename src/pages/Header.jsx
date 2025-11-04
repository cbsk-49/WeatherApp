import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-heading">
          <img
            src="/images/Stormclouds.jpg"
            alt="AccuWeather logo"
            style={{ width: "60px", height: "60px", borderRadius: "10px", marginRight: "10px", objectFit: "cover" }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div>
            <h1>AccuWeather</h1>
            <p>“Stay ahead of the skies.”</p>
          </div>
        </div>

        <div className="nav-list">
          <ul>
            <li className="btn">
              <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                Home
              </NavLink>
            </li>
            <li className="btn">
              <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                About
              </NavLink>
            </li>
            <li className="btn">
              <NavLink to="/alerts" className={({ isActive }) => (isActive ? "active" : "")}>
                Alerts
              </NavLink>
            </li>
            <li className="btn">
              <NavLink to="/maps" className={({ isActive }) => (isActive ? "active" : "")}>
                Maps
              </NavLink>
            </li>
            <li className="btn">
              <NavLink to="/auth" className={({ isActive }) => (isActive ? "active" : "")}>
                Sign In
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;

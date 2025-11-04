import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-heading">
          <div>
            <h1>AccuWeather</h1>
            <p>“Stay ahead of the skies.”</p>
          </div>
        </div>

        <div className="nav-list">
          <ul>
            <li className="btn">
              <NavLink to="/">
                Home
              </NavLink>
            </li>
            <li className="btn">
              <NavLink to="/about">
                About
              </NavLink>
            </li>
            <li className="btn">
              <NavLink to="/alerts">
                Alerts
              </NavLink>
            </li>
            <li className="btn">
              <NavLink to="/maps">
                Maps
              </NavLink>
            </li>
            <li className="btn">
              <NavLink to="/auth">
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

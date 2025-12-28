import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import "./Header.css";

export default function Header() {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const username = user?.name || user?.email?.split('@')[0] || 'User';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="modern-navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <Link className="navbar-logo" to={user ? "/" : "/auth"}>
          <span className="logo-icon">🌤️</span>
          <div className="logo-text">
            <h1 className="logo-title">AccuWeather</h1>
            <p className="logo-subtitle">Clean. Fast. Accurate.</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        {user && (
          <>
            <nav className="navbar-nav desktop-nav">
              <NavLink to="/" className="nav-link">
                <span className="nav-icon">🏠</span>
                Home
              </NavLink>
              <NavLink to="/forecast" className="nav-link">
                <span className="nav-icon">📅</span>
                Forecast
              </NavLink>
              <NavLink to="/alerts" className="nav-link">
                <span className="nav-icon">⚠️</span>
                Alerts
              </NavLink>
              <NavLink to="/maps" className="nav-link">
                <span className="nav-icon">🗺️</span>
                Maps
              </NavLink>
              <NavLink to="/about" className="nav-link">
                <span className="nav-icon">ℹ️</span>
                About
              </NavLink>
            </nav>

            {/* User Section */}
            <div className="navbar-user">
              <div className="user-welcome">
                <span className="welcome-icon">👋</span>
                <span className="welcome-text">Welcome, <strong>{username}</strong>!</span>
              </div>
              <button onClick={signOut} className="btn-signout">
                <span className="signout-icon">🚪</span>
                Sign Out
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
              <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>

            {/* Mobile Navigation */}
            <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
              <div className="mobile-user-info">
                <div className="mobile-avatar">👤</div>
                <div>
                  <div className="mobile-username">{username}</div>
                  <div className="mobile-email">{user?.email}</div>
                </div>
              </div>
              <div className="mobile-nav-links">
                <NavLink to="/" className="mobile-nav-link" onClick={toggleMobileMenu}>
                  <span className="nav-icon">🏠</span>
                  Home
                </NavLink>
                <NavLink to="/forecast" className="mobile-nav-link" onClick={toggleMobileMenu}>
                  <span className="nav-icon">📅</span>
                  Forecast
                </NavLink>
                <NavLink to="/alerts" className="mobile-nav-link" onClick={toggleMobileMenu}>
                  <span className="nav-icon">⚠️</span>
                  Alerts
                </NavLink>
                <NavLink to="/maps" className="mobile-nav-link" onClick={toggleMobileMenu}>
                  <span className="nav-icon">🗺️</span>
                  Maps
                </NavLink>
                <NavLink to="/about" className="mobile-nav-link" onClick={toggleMobileMenu}>
                  <span className="nav-icon">ℹ️</span>
                  About
                </NavLink>
                <button onClick={() => { signOut(); toggleMobileMenu(); }} className="mobile-signout">
                  <span className="signout-icon">🚪</span>
                  Sign Out
                </button>
              </div>
            </nav>
          </>
        )}

        {/* Guest View */}
        {!user && (
          <div className="navbar-guest">
            <Link to="/auth" className="btn-signin">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

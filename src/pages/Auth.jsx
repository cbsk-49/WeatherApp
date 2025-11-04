import { useState } from "react";
import "./Auth.css";

function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isSignIn) {
      if (!formData.name) {
        newErrors.name = "Name is required";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert(isSignIn ? "Sign In successful!" : "Sign Up successful! Welcome to AccuWeather!");
      // In a real app, you would handle authentication here
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }, 1000);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">🌦️</div>
          <h1 className="auth-title">{isSignIn ? "Welcome Back!" : "Create Account"}</h1>
          <p className="auth-subtitle">
            {isSignIn
              ? "Sign in to access your weather preferences"
              : "Join AccuWeather to personalize your experience"}
          </p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${isSignIn ? "active" : ""}`}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button
            className={`auth-tab ${!isSignIn ? "active" : ""}`}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isSignIn && (
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <span className="label-icon">👤</span>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-input ${errors.name ? "error" : ""}`}
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <span className="label-icon">📧</span>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${errors.email ? "error" : ""}`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <span className="label-icon">🔒</span>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-input ${errors.password ? "error" : ""}`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {!isSignIn && (
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                <span className="label-icon">🔐</span>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`form-input ${errors.confirmPassword ? "error" : ""}`}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          )}

          {isSignIn && (
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-link">
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className={`auth-button ${isSubmitting ? "loading" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                {isSignIn ? "Signing In..." : "Creating Account..."}
              </>
            ) : (
              isSignIn ? "Sign In" : "Sign Up"
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <div className="social-auth">
          <button className="social-button google">
            <span className="social-icon">🔍</span>
            Google
          </button>
          <button className="social-button github">
            <span className="social-icon">💻</span>
            GitHub
          </button>
        </div>

        <div className="auth-footer">
          <p>
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <button
              className="toggle-link"
              onClick={() => {
                setIsSignIn(!isSignIn);
                setErrors({});
                setFormData({
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                });
              }}
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Auth.css";

function Auth() {
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error on typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setServerError("");
  };

  // Basic validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!isSignIn) {
      if (!formData.name) newErrors.name = "Name is required";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setServerError("");

    try {
      if (isSignIn) {
        // Sign In
        const { data, error } = await signIn(formData.email, formData.password);
        if (error) {
          setServerError(error.message || "Sign in failed");
        } else {
          navigate("/");
        }
      } else {
        // Sign Up
        const { data, error } = await signUp(formData.email, formData.password, formData.name);
        if (error) {
          setServerError(error.message || "Sign up failed");
        } else {
          alert("Sign up successful! Please check your email to verify your account.");
          setIsSignIn(true);
          setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        }
      }
    } catch (err) {
      setServerError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>{isSignIn ? "Sign In" : "Sign Up"}</h1>

        <div className="auth-tabs">
          <button
            className={isSignIn ? "active" : ""}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button
            className={!isSignIn ? "active" : ""}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>

        {serverError && (
          <div className="server-error">
            ⚠️ {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isSignIn && (
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
          )}
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          {!isSignIn && (
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>
          )}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? isSignIn
                ? "Signing In..."
                : "Creating Account..."
              : isSignIn
              ? "Sign In"
              : "Sign Up"}
          </button>
        </form>
        <p className="switch-mode">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            className="link-btn"
            onClick={() => {
              setIsSignIn(!isSignIn);
              setErrors({});
              setFormData({ name: "", email: "", password: "", confirmPassword: "" });
            }}
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
export default Auth;
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext.jsx";

export default function Login() {
  const { login, loading } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Store error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const success = await login({ email, password });

    if (success) {
      navigate("/"); // Redirect to home page after login
    } else {
      setError("Invalid email or password. Please try again."); // Display error
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h3 className="login-title">Login</h3>

        {error && <p className="error-message">{error}</p>} {/* Show error if any */}

        <div className="form-group">
          <label className="form-label">
            Email <span className="required-icon">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Password <span className="required-icon">*</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <div className="register-link">
          Not yet registered? <Link to="/register">Register</Link>
        </div>

        <div className="forgot-password-link">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
}

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function Register() {
  const { register, loading } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert("Passwords don't match");
      return;
    }

    await register(name, email, password);
    navigate("/login"); // Redirect to login page after registration
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h3 className="register-title">Register</h3>

        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            placeholder="Enter Username"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
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
          <label className="form-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="Password"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Repeat Password</label>
          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="form-input"
            placeholder="Repeat Password"
            required
          />
        </div>

        <button type="submit" className="register-button" disabled={loading}>
          {loading ? "Registering..." : "Sign Up"}
        </button>

        <div className="register-link">
          Already have an account? <Link to="/login" className="login-redirect">Login</Link>
        </div>
      </form>
    </div>
  );
}
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // ====> To Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate login process
    if (email && password) {
      setMessage('Login successful!');
      setTimeout(() => {
        navigate('/dashboard'); // Redirect to dashboard after a delay
      }, 1500);
    } else {
      setMessage('Please fill in all fields.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h3 className="login-title">Login</h3>

        <div className="form-group">
          <label className="form-label">
            Email
            <span className="required-icon">*</span>
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Password
            <span className="required-icon">*</span>
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

        <button type="submit" className="login-button">
          Sign in
        </button>

        {message && <p className="message">{message}</p>}

        <div className="register-link">
          Not yet registered? <Link to="/register">Register</Link>
        </div>

        {/* Forgot Password Link */}
        <div className="forgot-password-link">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
}
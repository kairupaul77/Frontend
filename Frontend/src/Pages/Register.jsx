import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // ====> To Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate passwords
    if (password !== repeatPassword) {
      setMessage("Passwords don't match");
      return;
    }

    // Simulate successful registration
    setMessage('Registration successful!');
    setTimeout(() => {
      navigate('/login'); // Redirect to login after a delay
    }, 1500);
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h3 className="register-title">Register</h3>

        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        <button type="submit" className="register-button">
          Sign Up
        </button>

        {message && <p className="message">{message}</p>}

        <div className="register-link">
          Already have an account? <Link to="/login" className="login-redirect">Login</Link>
        </div>
      </form>
    </div>
  );
}
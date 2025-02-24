import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // ====> To Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate sending a password reset email
    if (email) {
      setMessage('Password reset email sent!');
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after a delay
      }, 1500);
    } else {
      setMessage('Please enter your email address.');
    }
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <h3 className="forgot-password-title">Forgot Password</h3>

        <div className="form-group">
          <label className="form-label">
            Email
            <span className="required-icon">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="Enter your email"
            required
          />
        </div>

        <button type="submit" className="forgot-password-button">
          Send Reset Link
        </button>

        {message && <p className="message">{message}</p>}

        <div className="back-to-login-link">
          <Link to="/login">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}
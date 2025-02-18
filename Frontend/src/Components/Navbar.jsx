import { Link } from "react-router-dom";
import React from 'react';
import '../App.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo or Brand Name */}
        <Link to="/home" className="navbar-logo">
          MyApp
        </Link>

        {/* Navigation Links */}
        <div className="navbar-links">
          <Link to="/home" className="navbar-link">
            Home
          </Link>
          <Link to="/cart" className="navbar-link">
            Cart
          </Link>
          <Link to="/menu" className="navbar-link">
            Menu
          </Link>
          <Link to="/orders" className="navbar-link">
            Orders
          </Link>
          <Link to="/register" className="navbar-link">
            Register
          </Link>
          <Link to="/login" className="navbar-link">
            Login
          </Link>
          <Link to="/checkout" className="navbar-link">
            Checkout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
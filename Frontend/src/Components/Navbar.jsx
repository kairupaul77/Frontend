import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";

import "../App.css"; // Import the CSS file

const Navbar = () => {
  const { user, logout } = useContext(UserContext); // Get user and logout function
  const [cartCount, setCartCount] = useState(0);
  const [isCheckout, setIsCheckout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartCount = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(updatedCart.length);
    };

    const checkCheckoutStatus = () => {
      const checkoutStatus = JSON.parse(localStorage.getItem("checkout")) || false;
      setIsCheckout(checkoutStatus);
    };

    updateCartCount();
    checkCheckoutStatus();

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("checkoutUpdated", checkCheckoutStatus);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("checkoutUpdated", checkCheckoutStatus);
    };
  }, []);

  const handleLogout = () => {
    logout(); // Call logout function from context
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Name */}
        <Link to="/" className="navbar-brand">
          <img src="/logo.jpeg" alt="Pafaan Logo" className="logo-image" />
          <span className="brand-name">Pafaan House of Eateries</span>
        </Link>

        {/* Navigation Links */}
        <div className="navbar-links">
          {!user ? (
            <>
              <Link to="/register" className="navbar-link">Register</Link>
              <Link to="/login" className="navbar-link">Login</Link>
            </>
          ) : (
            <>
              <Link to="/home" className="navbar-link">Home</Link>
              <Link to="/menu" className="navbar-link">Menu</Link>
              {cartCount > 0 && (
                <Link to="/cart" className="navbar-link">
                  Cart ({cartCount})
                </Link>
              )}
              <Link to="/orders" className="navbar-link">Orders</Link>
              {isCheckout && (
                <Link to="/checkout" className="navbar-link">Checkout</Link>
              )}
              {/* Logout Button */}
              <button onClick={handleLogout} className="navbar-link logout-button">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

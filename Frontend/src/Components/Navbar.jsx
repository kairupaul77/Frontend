import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../App.css"; // Import the CSS file

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isCheckout, setIsCheckout] = useState(false);

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

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Name */}
        <Link to="/home" className="navbar-brand">
          <img src="/logo.jpeg" alt="Pafaan Logo" className="logo-image" />
          <span className="brand-name">Pafaan House of Eateries</span>
        </Link>

        {/* Navigation Links */}
        <div className="navbar-links">
          <Link to="/home" className="navbar-link">Home</Link>
          <Link to="/menu" className="navbar-link">Menu</Link>
          {cartCount > 0 && (
            <Link to="/cart" className="navbar-link">
              Cart ({cartCount})
            </Link>
          )}
          <Link to="/orders" className="navbar-link">Orders</Link>
          <Link to="/register" className="navbar-link">Register</Link>
          <Link to="/login" className="navbar-link">Login</Link>
          {isCheckout && (
            <Link to="/checkout" className="navbar-link">Checkout</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

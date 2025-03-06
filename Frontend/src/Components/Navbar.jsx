import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
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
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white text-black shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo and Name */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.jpeg" alt="Pafaan Logo" className="h-10 w-10 rounded-full" />
          <span className="text-xl font-bold">Pafaan House of Eateries</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {!user ? (
            <>
              <Link to="/register" className="hover:text-gray-600">Register</Link>
              <Link to="/login" className="hover:text-gray-600">Login</Link>
            </>
          ) : (
            <>
              {user.isAdmin ? (
                <>
                  <Link to="/menu" className="hover:text-gray-600">Menu</Link>
                  <Link to="/orders" className="hover:text-gray-600">Orders</Link>
                  <Link to="/admin-dashboard" className="hover:text-gray-600">Admin Dashboard</Link>
                </>
              ) : (
                <>
                  <Link to="/home" className="hover:text-gray-600">Home</Link>
                  <Link to="/menu" className="hover:text-gray-600">Menu</Link>
                  {cartCount > 0 && (
                    <Link to="/cart" className="hover:text-gray-600">
                      Cart ({cartCount})
                    </Link>
                  )}
                  <Link to="/orders" className="hover:text-gray-600">Orders</Link>
                  {isCheckout && (
                    <Link to="/checkout" className="hover:text-gray-600">Checkout</Link>
                  )}
                </>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
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

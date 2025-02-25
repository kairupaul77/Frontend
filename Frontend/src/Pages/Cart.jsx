import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const LOCAL_STORAGE_KEY = "cart";

  // Load cart from localStorage once on mount
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY); // Remove empty cart from storage
    }
    window.dispatchEvent(new Event("cartUpdated")); // Dispatch event to update Navbar
  }, [cart]);

  // Increase quantity of an item
  const increaseQuantity = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      return updatedCart;
    });
  };

  // Decrease quantity or remove if quantity is 1
  const decreaseQuantity = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0); // Remove items with quantity 0

      return updatedCart;
    });
  };

  // Remove an item from the cart
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Confirm order
  const confirmOrder = () => {
    navigate("/orders", { state: { cart } });
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">${item.price}</p>
                  <div className="quantity-controls">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="quantity-button"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="quantity-button"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="remove-item-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3 className="total-price">Total: ${totalPrice.toFixed(2)}</h3>
            <button onClick={confirmOrder} className="confirm-order-button">
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

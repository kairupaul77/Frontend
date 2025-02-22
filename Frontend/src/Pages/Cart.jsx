import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(location.state?.cart || []);

  // Function to increase quantity of an item
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCart(updatedCart);
  };

  // Function to decrease quantity of an item
  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id && (item.quantity || 1) > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  // Function to remove an item from the cart
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  // Calculate total price of the cart
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  // Function to confirm order
  const confirmOrder = () => {
    navigate('/orders', { state: { cart } }); // Pass cart data to the orders page
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
                <img src={item.image} alt={item.name} className="cart-item-image" />
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
                    <span className="quantity">{item.quantity || 1}</span>
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
            <button
              onClick={confirmOrder}
              className="confirm-order-button"
            >
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
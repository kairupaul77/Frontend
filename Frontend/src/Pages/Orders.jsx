import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Orders = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  // Calculate total price of the order
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  // Function to proceed to checkout
  const proceedToCheckout = () => {
    navigate('/checkout', { state: { cart } }); // Pass cart data to the checkout page
  };

  return (
    <div className="orders-container">
      <h1 className="orders-title">Your Order</h1>
      {cart.length === 0 ? (
        <p className="empty-orders-message">No items in your order.</p>
      ) : (
        <>
          <div className="order-items">
            {cart.map((item) => (
              <div key={item.id} className="order-item">
                <img src={item.image} alt={item.name} className="order-item-image" />
                <div className="order-item-details">
                  <h3 className="order-item-name">{item.name}</h3>
                  <p className="order-item-price">${item.price}</p>
                  <p className="order-item-quantity">Quantity: {item.quantity || 1}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-summary">
            <h3 className="total-price">Total: ${totalPrice.toFixed(2)}</h3>
            <button
              onClick={proceedToCheckout}
              className="checkout-button"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
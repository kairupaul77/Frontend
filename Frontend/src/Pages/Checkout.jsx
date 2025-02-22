import React from 'react';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const cart = location.state?.cart || [];

  // Calculate total price of the order
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-summary">
        <h3>Order Summary</h3>
        {cart.map((item) => (
          <div key={item.id} className="checkout-item">
            <p>{item.name} (x{item.quantity || 1}) - ${item.price * (item.quantity || 1)}</p>
          </div>
        ))}
        <h3 className="total-price">Total: ${totalPrice.toFixed(2)}</h3>
      </div>
      <div className="payment-details">
        <h3>Payment Details</h3>
        <form>
          <label>
            Card Number:
            <input type="text" name="cardNumber" required />
          </label>
          <label>
            Expiry Date:
            <input type="text" name="expiryDate" required />
          </label>
          <label>
            CVV:
            <input type="text" name="cvv" required />
          </label>
          <button type="submit" className="pay-now-button">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
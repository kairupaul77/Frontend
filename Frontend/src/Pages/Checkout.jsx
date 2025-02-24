import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
  const location = useLocation();
  const cart = location.state?.cart || [];

  // Calculate total price of the order
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  // State for payment method
  const [paymentMethod, setPaymentMethod] = useState('card'); // Default to card payment
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [mpesaOption, setMpesaOption] = useState(''); // For M-Pesa options
  const [accountNumber, setAccountNumber] = useState(''); // For Paybill account number
  const [amount, setAmount] = useState(totalPrice.toFixed(2)); // For Paybill amount

  // Handle payment method change
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setMpesaOption(''); // Reset M-Pesa options when switching payment methods
  };

  // Handle M-Pesa option change
  const handleMpesaOptionChange = (e) => {
    setMpesaOption(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === 'card') {
      // Validate card details
      if (!cardNumber || !expiryDate || !cvv) {
        toast.error('Please fill in all card details.');
        return;
      }

      // Simulate card payment processing
      toast.info('Processing card payment...');
      setTimeout(() => {
        toast.success(`Payment of $${totalPrice.toFixed(2)} successful!`);
      }, 2000);
    } else if (paymentMethod === 'mpesa') {
      if (mpesaOption === 'paybill') {
        if (!accountNumber || !amount) {
          toast.error('Please enter account number and amount.');
          return;
        }
        // Simulate Paybill payment
        toast.info(`Sending payment of $${amount} to account ${accountNumber}...`);
        setTimeout(() => {
          toast.success(`Payment of $${amount} to account ${accountNumber} sent successfully!`);
        }, 2000);
      } else {
        toast.info('Please select a valid M-Pesa option.');
      }
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-summary">
        <h3>Order Summary</h3>
        {cart.map((item) => (
          <div key={item.id} className="checkout-item">
            <p>
              {item.name} (x{item.quantity || 1}) - ${item.price * (item.quantity || 1)}
            </p>
          </div>
        ))}
        <h3 className="total-price">Total: ${totalPrice.toFixed(2)}</h3>
      </div>
      <div className="payment-details">
        <h3>Payment Details</h3>
        <form onSubmit={handleSubmit}>
          {/* Payment Method Selection */}
          <div className="payment-method">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={handlePaymentMethodChange}
              />
              Card Payment
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="mpesa"
                checked={paymentMethod === 'mpesa'}
                onChange={handlePaymentMethodChange}
              />
              M-Pesa Payment
            </label>
          </div>

          {/* Card Payment Fields */}
          {paymentMethod === 'card' && (
            <div className="card-payment-fields">
              <label>
                Card Number:
                <input
                  type="text"
                  name="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </label>
              <label>
                Expiry Date:
                <input
                  type="text"
                  name="expiryDate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
              </label>
              <label>
                CVV:
                <input
                  type="text"
                  name="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </label>
            </div>
          )}

          {/* M-Pesa Options */}
          {paymentMethod === 'mpesa' && (
            <div className="mpesa-options">
              <h4>M-Pesa Options</h4>
              <label>
                <input
                  type="radio"
                  name="mpesaOption"
                  value="safaricom+"
                  checked={mpesaOption === 'safaricom+'}
                  onChange={handleMpesaOptionChange}
                />
                Safaricom+
              </label>
              <label>
                <input
                  type="radio"
                  name="mpesaOption"
                  value="mpesa"
                  checked={mpesaOption === 'mpesa'}
                  onChange={handleMpesaOptionChange}
                />
                M-Pesa
              </label>

              {/* M-Pesa Sub-Options */}
              {mpesaOption === 'mpesa' && (
                <div className="mpesa-sub-options">
                  <label>
                    <input
                      type="radio"
                      name="mpesaSubOption"
                      value="sendMoney"
                      onChange={handleMpesaOptionChange}
                    />
                    Send Money
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="mpesaSubOption"
                      value="withdraw"
                      onChange={handleMpesaOptionChange}
                    />
                    Withdraw
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="mpesaSubOption"
                      value="buyAirtime"
                      onChange={handleMpesaOptionChange}
                    />
                    Buy Airtime
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="mpesaSubOption"
                      value="lipaNaMpesa"
                      onChange={handleMpesaOptionChange}
                    />
                    Lipa Na M-Pesa
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="mpesaSubOption"
                      value="myAccount"
                      onChange={handleMpesaOptionChange}
                    />
                    My Account
                  </label>
                </div>
              )}

              {/* Lipa Na M-Pesa Sub-Options */}
              {mpesaOption === 'mpesa' && (
                <div className="lipa-na-mpesa-options">
                  <label>
                    <input
                      type="radio"
                      name="lipaNaMpesaOption"
                      value="paybill"
                      onChange={handleMpesaOptionChange}
                    />
                    Paybill
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="lipaNaMpesaOption"
                      value="buyGoods"
                      onChange={handleMpesaOptionChange}
                    />
                    Buy Goods and Services
                  </label>
                </div>
              )}

              {/* Paybill Fields */}
              {mpesaOption === 'mpesa' && (
                <div className="paybill-fields">
                  <label>
                    Account Number:
                    <input
                      type="text"
                      name="accountNumber"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Amount:
                    <input
                      type="number"
                      name="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </label>
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="pay-now-button">
            {paymentMethod === 'mpesa' && mpesaOption === 'paybill' ? 'Send Payment' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
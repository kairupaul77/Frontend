import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CreditCard, Phone, ShoppingCart } from 'lucide-react';
import { useOrder } from "../Context/OrderContext";
import { UserContext } from "../Context/UserContext";

const Checkout = () => {
  const { placeOrder } = useOrder();
  const { logout } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const { cart = [] } = location.state || {};
  console.log("Cart received from location.state:", cart);

  const totalPrice = cart.reduce((total, item) => total + Number(item.price) * (item.quantity || 1), 0);
  console.log("Total price calculated:", totalPrice);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [tillNumber, setTillNumber] = useState('');

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === 'card' && (!cardNumber || !expiryDate || !cvv)) {
      return toast.error('Please fill in all card details.');
    }

    if (paymentMethod === 'mpesa' && !tillNumber) {
      return toast.error('Please fill in the M-Pesa till number.');
    }

    toast.info('Processing payment...');

    setTimeout(async () => {
      toast.success(`Payment of Ksh ${totalPrice.toFixed(2)} successful!`);

      const orderData = {
        items: cart.map((item) => ({
          menu_id: item.menu_id || item.id,
          quantity: item.quantity || 1,
          price: Number(item.price) || 0.0,
        })),
        total: totalPrice,
        paymentMethod,
        date: new Date().toLocaleString(),
        invoiceNumber: `INV-${Math.floor(Math.random() * 1000000)}`,
        status: "Paid", // Add status
      };
      

      console.log("Formatted orderData before sending:", JSON.stringify(orderData, null, 2));

      await placeOrder(orderData.items);
      navigate("/orders");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 flex items-center">
        <ShoppingCart className="mr-2" /> Checkout
      </h1>
      <div className="mb-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className="flex justify-between text-gray-700">
              <p>{item.name} (x{item.quantity || 1})</p>
              <p>Ksh {(Number(item.price) * (item.quantity || 1)).toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        <h3 className="text-xl font-semibold mt-2">Total: Ksh {totalPrice.toFixed(2)}</h3>
      </div>
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex gap-4">
            <label className="flex items-center">
              <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={handlePaymentMethodChange} className="mr-2" />
              <CreditCard className="mr-2" /> Card Payment
            </label>
            <label className="flex items-center">
              <input type="radio" name="paymentMethod" value="mpesa" checked={paymentMethod === 'mpesa'} onChange={handlePaymentMethodChange} className="mr-2" />
              <Phone className="mr-2" /> M-Pesa Payment
            </label>
          </div>
          {paymentMethod === 'card' && (
            <div className="space-y-2">
              <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full p-2 border rounded" required />
              <input type="text" placeholder="Expiry Date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="w-full p-2 border rounded" required />
              <input type="text" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} className="w-full p-2 border rounded" required />
            </div>
          )}
          {paymentMethod === 'mpesa' && (
            <input type="text" placeholder="M-Pesa Till Number" value={tillNumber} onChange={(e) => setTillNumber(e.target.value)} className="w-full p-2 border rounded" required />
          )}
          <button type="submit" className="w-full mt-4 p-2 bg-blue-600 text-white rounded">Confirm Payment</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

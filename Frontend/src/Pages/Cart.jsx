import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const LOCAL_STORAGE_KEY = "cart";

  const [cart, setCart] = useState([]);

  // Get role and token from sessionStorage
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const storedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cart]);

  // Listen for checkout success event and reset cart
  useEffect(() => {
    const handleCheckoutSuccess = () => {
      setCart([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    };

    window.addEventListener("checkoutSuccess", handleCheckoutSuccess);

    return () => {
      window.removeEventListener("checkoutSuccess", handleCheckoutSuccess);
    };
  }, []);

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      return alert("Your cart is empty.");
    }

    navigate("/checkout", { state: { cart, total: totalPrice.toFixed(2) } });
  };

  // ✅ Hide Cart if user is Admin
  if (role === "admin") {
    return null; // Do not render anything
  }

  const handlePaymentSuccess = () => {
    // Clear the cart after successful payment
    setCart([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    alert("Payment successful! Thank you for your purchase.");

    // Dispatch event to update cart across components
    window.dispatchEvent(new Event("checkoutSuccess"));

    navigate("/order-summary"); // Redirect to order summary or a confirmation page
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-4 mb-4 shadow-md rounded-lg bg-white"
              >
                <img
                  src={item.image || "https://via.placeholder.com/80"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Ksh {Number(item.price).toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded-l hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 bg-gray-200">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded-r hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg ml-4 hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="w-full max-w-3xl mt-6 p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-bold">Total: Ksh {totalPrice.toFixed(2)}</h3>
            <button
              onClick={proceedToCheckout}
              className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Checkout
            </button>
            {/* Uncomment this button to simulate a successful payment */}
            {/* <button
              onClick={handlePaymentSuccess}
              className="w-full mt-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Simulate Payment Success
            </button> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

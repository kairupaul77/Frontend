import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../Context/OrderContext"; // Correct import

const Cart = () => {
  const navigate = useNavigate();
  const { placeOrder } = useOrder(); // Correct function usage
  const LOCAL_STORAGE_KEY = "cart";

  const [cart, setCart] = useState([]);

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

  useEffect(() => {
    console.log("Cart Items:", cart);
  }, [cart]);

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

  const confirmOrder = async () => {
    if (cart.length === 0) {
      return alert("Your cart is empty.");
    }

    const orderData = {
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: totalPrice.toFixed(2),
    };

    try {
      await placeOrder(orderData); // Send order to backend using OrderContext
      setCart([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      navigate("/orders"); // Navigate to orders page
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
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
                  <p className="text-gray-600">${Number(item.price).toFixed(2)}</p>
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
            <h3 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h3>
            <button
              onClick={confirmOrder}
              className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
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

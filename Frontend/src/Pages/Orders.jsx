import React, { useEffect } from "react";
import { useOrder } from "../Context/OrderContext";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { orders, revenue, loading, fetchOrders, fetchOrderHistory, changeOrder } = useOrder();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role"); // Retrieve role from session storage

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (role === "admin") {
      fetchOrders(); // Fetch all orders for admin
    } else {
      fetchOrderHistory(); // Fetch only user's order history
    }
  }, [role, token]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        {role === "admin" ? "All Orders (Admin View)" : "Your Orders"}
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700">Order #{order.id}</h3>
              <p className="text-gray-600">Total: <span className="font-medium">${order.totalPrice}</span></p>
              <p className={`text-sm font-medium ${order.status === "Completed" ? "text-green-600" : "text-red-500"}`}>
                Status: {order.status}
              </p>

              {role === "admin" && (
                <button
                  onClick={() => changeOrder({ id: order.id, status: "Completed" })}
                  className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {role === "admin" && (
        <div className="bg-gray-100 p-4 mt-6 rounded-lg text-center shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Revenue: <span className="text-blue-600">${revenue}</span></h3>
        </div>
      )}

      {role !== "admin" && (
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/checkout")}
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg text-lg transition-all shadow-md"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;

import React, { useState } from "react";
import { useOrder } from "../Context/OrderContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Make sure to import toast for notifications

const Orders = () => {
  const {
    orders, 
    revenue, 
    loading, 
    fetchOrders, 
    fetchOrderHistory, 
  } = useOrder();
  
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  const email = sessionStorage.getItem("email"); // Get email from sessionStorage

  const [manualFetch, setManualFetch] = useState(false);

  // Check if token exists; if not, redirect to login page
  if (!token) {
    navigate("/login"); // Redirect if not authenticated
    return null;
  }

  // Handle admin action to change the order status
  const handleAdminAction = (orderId, newMenuId) => {
    const userRole = sessionStorage.getItem("role").trim().toLowerCase();

    if (userRole !== "admin") {
      toast.error("Unauthorized access. Admins only.");
      console.log(`Unauthorized access attempt by user: ${email}`);
      return;
    }

    changeOrder(orderId, newMenuId);
  };

  // Manually fetch orders for Admin or Customers
  const handleFetchOrders = () => {
    if (role === "admin") {
      fetchOrders();
    } else if (role === "customer") {
      fetchOrderHistory();
    }
    setManualFetch(true); // To show the orders once fetched
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        {role === "admin" ? "All Orders (Admin View)" : "Your Orders"}
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : manualFetch && orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700">Order #{order.id}</h3>
              <p className="text-gray-600">
                Total: <span className="font-medium">KSh {order.total_price ? order.total_price.toLocaleString() : "0"}</span>
              </p>

              {/* Display the correct order status */}
              <p className={`text-sm font-medium ${role === "customer" || order.payment_status === "Updated" ? "text-green-600" : "text-red-500"}`}>
  Status: {role === "customer" ? "Paid" : order.payment_status === "Updated" ? "Updated" : "Updated"}
</p>
            </div>
          ))}
        </div>
      )}

      {role === "admin" && (
        <div className="bg-gray-100 p-4 mt-6 rounded-lg text-center shadow">
          <h3 className="text-lg font-semibold text-gray-800">
            Total Revenue: <span className="text-blue-600">KSh {revenue ? revenue.toLocaleString() : "0"}</span>
          </h3>
        </div>
      )}
    </div>
  );
};

export default Orders;

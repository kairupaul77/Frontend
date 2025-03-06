import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch All Orders (Admin Only)
  const fetchOrders = async () => {
    if (role !== "admin") {
        console.log("User role is not admin, skipping fetch.");
        toast.error("Unauthorized access. Admins only.");
        return;
    }

    try {
        console.log("Fetching admin orders...");

        const res = await fetch("https://pafaan-l0b6.onrender.com/orders/admin-history", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Response status:", res.status);

        const data = await res.json();
        console.log("Fetched data:", data);

        if (res.ok) {
            setOrders(data.orders || []);
            console.log("Updated orders state:", data.orders || []);
        } else {
            toast.error(data.message || "Failed to fetch orders.");
        }
    } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders. Please try again later.");
    }
};

  // Fetch Revenue (Admin Only)
  const fetchRevenue = async () => {
    if (role !== "admin") {
      toast.error("Unauthorized access. Admins only.");
      return;
    }
  
    try {
      const res = await fetch("https://pafaan-l0b6.onrender.com/orders/revenue", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const data = await res.json();
      console.log(data);  // Add this to check what the backend returns
      if (res.ok) {
        setRevenue(data.revenue);
        setTotalOrders(data.total_orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch revenue.");
    }
  };
  

  // Fetch Order History for Customers
  const fetchOrderHistory = async () => {
    if (role !== "customer") {
        console.log("User role is not customer, skipping fetch.");
        return;
    }

    setLoading(true);
    setError(null);
    
    try {
        console.log("Fetching order history...");

        const response = await fetch("https://pafaan-l0b6.onrender.com/orders/history", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Response status:", response.status);

        const data = await response.json();
        console.log("Fetched data:", data);

        if (response.ok) {
            setOrders(data.orders || []);
            console.log("Updated orders state:", data.orders || []);
        } else {
            throw new Error(data.message || "Failed to fetch order history");
        }
    } catch (err) {
        console.error("Fetch error:", err.message);
        setError(err.message);
    } finally {
        setLoading(false);
    }
};


  // Automatically fetch orders based on role
  useEffect(() => {
    if (token) {
      if (role === "admin") {
        fetchOrders();
        fetchRevenue(); // Fetch revenue for the admin
      } else if (role === "customer") {
        fetchOrderHistory();
      }
    }
  }, [token, role]);

  // Place Order Function
  const placeOrder = async (items ,menu_id) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("https://pafaan-l0b6.onrender.com/orders/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items ,menu_id}),

      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      setSuccessMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Change Order (Admin Only)
  const changeOrder = async (orderId, newMenuId) => {
    try {
      const response = await axios.post(
        "/orders/change",
        { order_id: orderId, new_menu_id: newMenuId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Order updated successfully!");
        setOrders(orders.map((order) =>
          order.id === orderId ? { ...order, status: 'Updated' } : order
        ));
      } else {
        toast.error(response.data.message || "Error updating order.");
      }
    } catch (error) {
      console.error("Error changing order status:", error);
      toast.error("Internal server error.");
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        revenue,
        totalOrders,
        loading,
        role,
        fetchOrders,
        fetchRevenue,
        fetchOrderHistory,
        placeOrder,
        changeOrder,
        error,
        successMessage,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);

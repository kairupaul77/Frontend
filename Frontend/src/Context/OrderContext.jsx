import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(sessionStorage.getItem("role"));

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    setRole(sessionStorage.getItem("role"));
  }, []);

  const fetchOrders = async () => {
    if (role !== "admin") {
      toast.error("Unauthorized access. Admins only.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/orders", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch orders.");
    }
  };

  const fetchRevenue = async () => {
    if (role !== "admin") {
      toast.error("Unauthorized access. Admins only.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/orders/revenue", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setRevenue(data.revenue);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch revenue.");
    }
    setLoading(false);
  };

  const fetchOrderHistory = async () => {
    if (!role) {
      toast.error("Unauthorized access.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/orders/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch order history.");
    }
  };
  
  const placeOrder = async (orderData) => {
    if (!role) {
      toast.error("Unauthorized access.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/orders/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Order placed successfully.");
        fetchOrderHistory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to place order.");
    }
    setLoading(false);
  };
  
  const changeOrder = async (orderId, newMenuId) => {
    if (role !== "admin") {
      toast.error("Unauthorized access. Admins only.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/orders/change", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ order_id: orderId, new_menu_id: newMenuId }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Order updated successfully.");
        fetchOrders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update order.");
    }
    setLoading(false);
  };

  return (
    <OrderContext.Provider
      value={{ orders, revenue, loading, role, fetchOrders, fetchRevenue, fetchOrderHistory, placeOrder, changeOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);

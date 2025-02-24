import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // Add an item to the cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // Confirm an order
  const confirmOrder = () => {
    if (cart.length > 0) {
      const newOrder = {
        id: orders.length + 1,
        items: cart,
      };
      setOrders([...orders, newOrder]); // Add the order to the orders list
      setCart([]); // Clear the cart
    }
  };

  return (
    <UserContext.Provider value={{ cart, addToCart, orders, confirmOrder }}>
      {children}
    </UserContext.Provider>
  );
};
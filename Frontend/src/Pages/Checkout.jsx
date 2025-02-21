import React from 'react';

const Checkout = () => {
  // Sample order data
  const orders = [
    {
      id: 1,
      status: 'completed',
      items: [
        { name: 'Burger', quantity: 2, price: 10 },
        { name: 'Pizza', quantity: 1, price: 15 },
      ],
      total: 35,
    },
    {
      id: 2,
      status: 'pending',
      items: [
        { name: 'Pasta', quantity: 1, price: 12 },
        { name: 'Sushi', quantity: 3, price: 20 },
      ],
      total: 72,
    },
    {
      id: 3,
      status: 'completed',
      items: [
        { name: 'Tacos', quantity: 2, price: 8 },
      ],
      total: 16,
    },
  ];

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Order Status</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className={`order-card ${order.status}`}>
            <h2 className="order-id">Order #{order.id}</h2>
            <p className="order-status">Status: {order.status}</p>
            <div className="order-items">
              <h3>Items:</h3>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index} className="order-item">
                    {item.name} - {item.quantity} x ${item.price}
                  </li>
                ))}
              </ul>
            </div>
            <p className="order-total">Total: ${order.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkout;
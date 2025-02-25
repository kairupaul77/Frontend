import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  // ✅ Fix: Initialize cart from localStorage immediately
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const [showToast, setShowToast] = useState(false);

  // ✅ Keep cart in sync with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated")); // Custom event for cart updates
  }, [cart]);

  const meals = [
    {
      id: 1,
      name: "Burger",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjAMLedZRk2kc2Gg7NC0jRaHIjxa1-vf-b_A&s",
      price: 10,
    },
    {
      id: 2,
      name: "Pizza",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzUXwxKjDkf17YKakug9okRsOuGVhZD8h6RA&s",
      price: 15,
    },
    {
      id: 3,
      name: "Pasta",
      image:
        "https://i.pinimg.com/736x/88/a5/d1/88a5d191d4293eb3ce0aa85a4e0fbb5b.jpg",
      price: 12,
    },
    {
      id: 4,
      name: "Sushi",
      image:
        "https://i.pinimg.com/736x/82/18/78/8218787b2a51e82fc230d6d0ca708883.jpg",
      price: 20,
    },
    {
      id: 5,
      name: "Tacos",
      image:
        "https://i.pinimg.com/736x/fc/e9/ba/fce9bab5ec1519da02334a06c764f8e1.jpg",
      price: 8,
    },
  ];

  const addToCart = (meal) => {
    if (!cart.some((item) => item.id === meal.id)) {
      setCart([...cart, { ...meal, quantity: 1 }]);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const isAdded = (meal) => cart.some((item) => item.id === meal.id);

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="menu-container">
      <h1 className="menu-title">Our Menu</h1>
      <div className="meals-grid">
        {meals.map((meal) => (
          <div key={meal.id} className="meal-card">
            <img src={meal.image} alt={meal.name} className="meal-image" />
            <h3 className="meal-name">{meal.name}</h3>
            <p className="meal-price">${meal.price}</p>
            <button
              onClick={() => addToCart(meal)}
              className={`add-to-cart-button ${isAdded(meal) ? "added" : ""}`}
              style={{ backgroundColor: isAdded(meal) ? "green" : "" }}
              disabled={isAdded(meal)}
            >
              {isAdded(meal) ? "Added" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
      {showToast && (
        <div className="toast">
          <p>Item added to cart!</p>
          <button onClick={goToCart} className="go-to-cart-button">
            Go to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;

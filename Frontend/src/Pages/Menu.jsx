import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MealContext } from "../Context/MealContext";

const Menu = () => {
  const navigate = useNavigate();
  const { meals } = useContext(MealContext);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cart]);

  const addToCart = (meal) => {
    if (!cart.some((item) => item.id === meal.id)) {
      setCart([...cart, { ...meal, quantity: 1 }]);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const isAdded = (meal) => cart.some((item) => item.id === meal.id);
  const goToCart = () => navigate("/cart");

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Our Menu</h1>
      
      {showToast && (
        <div className="fixed top-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md">
          Item added to cart!
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div key={meal.id} className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300">
              <img src={meal.image_url} alt={meal.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{meal.name}</h2>
                <p className="text-gray-600">${meal.price.toFixed(2)}</p>
                
                {isAdded(meal) ? (
                  <button 
                    className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    onClick={goToCart}
                  >
                    View Cart
                  </button>
                ) : (
                  <button 
                    className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                    onClick={() => addToCart(meal)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No meals available.</p>
        )}
      </div>
    </div>
  );
};

export default Menu;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  // Sample meal data with 20 items
  const meals = [
    {
      id: 1,
      name: 'Burger',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjAMLedZRk2kc2Gg7NC0jRaHIjxa1-vf-b_A&s',
      price: 10,
    },
    {
      id: 2,
      name: 'Pizza',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzUXwxKjDkf17YKakug9okRsOuGVhZD8h6RA&s',
      price: 15,
    },
    {
      id: 3,
      name: 'Pasta',
      image: 'https://i.pinimg.com/736x/88/a5/d1/88a5d191d4293eb3ce0aa85a4e0fbb5b.jpg',
      price: 12,
    },
    {
      id: 4,
      name: 'Sushi',
      image: 'https://i.pinimg.com/736x/82/18/78/8218787b2a51e82fc230d6d0ca708883.jpg',
      price: 20,
    },
    {
      id: 5,
      name: 'Tacos',
      image: 'https://i.pinimg.com/736x/fc/e9/ba/fce9bab5ec1519da02334a06c764f8e1.jpg',
      price: 8,
    },
    {
      id: 6,
      name: 'Steak',
      image: 'https://i.pinimg.com/474x/4c/44/40/4c44402de11a9b2a374663de98dd0ff8.jpg',
      price: 25,
    },
    {
      id: 7,
      name: 'Salad',
      image: 'https://i.pinimg.com/236x/cd/36/a1/cd36a153987a94ec4f1fc337bae35828.jpg',
      price: 7,
    },
    {
      id: 8,
      name: 'Ramen',
      image: 'https://i.pinimg.com/474x/d1/a7/b5/d1a7b584b2d8de3dfdb96352ae190459.jpg',
      price: 12,
    },
    {
      id: 9,
      name: 'Fried Chicken',
      image: 'https://i.pinimg.com/236x/d9/6d/e7/d96de7c0c6728041c54d5585024f0fb4.jpg',
      price: 14,
    },
    {
      id: 10,
      name: 'Sandwich',
      image: 'https://i.pinimg.com/236x/be/68/6d/be686dab3797e0b43cba7b663851fd2b.jpg',
      price: 9,
    },
    {
      id: 11,
      name: 'Curry',
      image: 'https://i.pinimg.com/236x/63/86/9c/63869c258ce76588e342465fdc82e9ee.jpg',
      price: 11,
    },
    {
      id: 12,
      name: 'Dumplings',
      image: 'https://i.pinimg.com/236x/0f/23/8e/0f238e6174448555f9aa573ae4366939.jpg',
      price: 6,
    },
    {
      id: 13,
      name: 'Fish and Chips',
      image: 'https://i.pinimg.com/474x/da/83/cc/da83ccd2aba8bec9742033633c744700.jpg',
      price: 13,
    },
    {
      id: 14,
      name: 'Lasagna',
      image: 'https://i.pinimg.com/474x/e7/b9/9d/e7b99dc733b48ffd53d3a753587380db.jpg',
      price: 16,
    },
    {
      id: 15,
      name: 'Burrito',
      image: 'https://i.pinimg.com/474x/81/ba/7e/81ba7e840b3ab37317c15117b6a735d6.jpg',
      price: 10,
    },
    {
      id: 16,
      name: 'Pho',
      image: 'https://i.pinimg.com/236x/c7/c7/f1/c7c7f12ec7247b4d46fcd002f73efced.jpg',
      price: 12,
    },
    {
      id: 17,
      name: 'Falafel',
      image: 'https://i.pinimg.com/474x/d8/d5/ff/d8d5ff01012326ec5991f0b40adf788f.jpg',
      price: 8,
    },
    {
      id: 18,
      name: 'Paella',
      image: 'https://i.pinimg.com/236x/db/26/f4/db26f481dce0cef8d40c615a96788f13.jpg',
      price: 18,
    },
    {
      id: 19,
      name: 'Kebab',
      image: 'https://i.pinimg.com/236x/74/ad/df/74addf556012a3e112fdaedcdbd2b58e.jpg',
      price: 9,
    },
    {
      id: 20,
      name: 'Cheesecake',
      image: 'https://i.pinimg.com/236x/38/0f/0c/380f0cad4883c3cad1c43bc71ed72e99.jpg',
      price: 7,
    },
  ];

  // Add item to cart
  const addToCart = (meal) => {
    setCart([...cart, meal]);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Hide toast after 3 seconds
  };

  // Go to cart page
  const goToCart = () => {
    navigate('/cart', { state: { cart } }); // Pass cart data to the cart page
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
              className="add-to-cart-button"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Toast Message */}
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
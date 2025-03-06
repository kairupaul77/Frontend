import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  // Featured meals data
  const featuredMeals = [
    {
      id: 1,
      name: "Signature Pasta",
      price: "ksh 1500.00",
      rating: 4.8,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjAMLedZRk2kc2Gg7NC0jRaHIjxa1-vf-b_A&s"
    },
    {
      id: 2,
      name: "Gourmet Burger",
      price: "ksh 2000.00",
      rating: 4.7,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqh23N9c_aH0PvHiaE-KNpcNP0ShomxKEqdQ&s"
    },
    {
      id: 3,
      name: "Fresh Salad Bowl",
      price: "ksh1200.00",
      rating: 4.6,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg2sGD0m7GqD3djELxtsNJ3yRXRbOMuY6ZoQ&s"
    },
    {
      id: 4,
      name: "Deluxe Pizza",
      price: "ksh2500.00",
      rating: 4.9,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzUXwxKjDkf17YKakug9okRsOuGVhZD8h6RA&s"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://cmkt-image-prd.freetls.fastly.net/0.1.0/ps/3683855/1820/1213/m1/fpnw/wm1/krqyfhubd7oft9ct47vf0c4iqejohkp7flkbgbunlmmgg57f8q5om1yzmga7jaod-.jpg?1512398578=&s=7dcf9d0943f23852b83ad73f84e51e40')",
            filter: "brightness(0.8)"
          }}
        ></div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Savor the <span className="text-yellow-400">Experience</span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl drop-shadow-md">
            Fresh, delicious, and made just for you. Get your meal delivered hot and fast!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/menu")}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              View Menu
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fresh Ingredients</h3>
              <p className="text-gray-600">We source only the freshest, organic ingredients from local farmers.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">👨‍🍳</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Expert Chefs</h3>
              <p className="text-gray-600">Our award-winning chefs create culinary masterpieces just for you.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Hot and fresh meals delivered to your doorstep in 30 minutes or less.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Best Value</h3>
              <p className="text-gray-600">Premium quality at affordable prices with regular special offers.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Meals Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Meals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Handpicked dishes loved by our customers</p>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredMeals.map((meal) => (
              <div key={meal.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                <div className="relative h-64 w-full">
                  <img 
                    src={meal.image} 
                    alt={meal.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-500 text-black font-semibold py-1 px-3 rounded-full">
                    {meal.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{meal.name}</h3>
                  <div className="flex items-center mb-4">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="ml-1 text-gray-600">{meal.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate("/menu")}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
            >
              View Full Menu
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* About Us Section with parallax effect */}
      <div className="relative py-24 bg-fixed bg-cover bg-center" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1506748686217-7fbc1f5d9c87')",
      }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Us</h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            We are a team of passionate chefs and food enthusiasts committed to delivering unforgettable dining experiences. Whether you're in the mood for a quick meal or a gourmet feast, we’ve got you covered!
          </p>
          <button
            onClick={() => navigate("/about")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

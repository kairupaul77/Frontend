import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-12 rounded-lg bg-cover bg-center text-white"
      style={{
        backgroundImage: `url('https://cmkt-image-prd.freetls.fastly.net/0.1.0/ps/3683855/1820/1213/m1/fpnw/wm1/krqyfhubd7oft9ct47vf0c4iqejohkp7flkbgbunlmmgg57f8q5om1yzmga7jaod-.jpg?1512398578=&s=7dcf9d0943f23852b83ad73f84e51e40')`,
        filter: "brightness(1.2)"
      }}
    >
      {/* Welcome Section */}
      <h1 className="text-7xl font-extrabold mb-6 text-center text-white">
        Welcome & Savor the Experience
      </h1>
      <p className="text-2xl mb-8 text-center max-w-3xl text-white">
        Fresh, delicious, and made just for you. Get your meal delivered hot and fast!
      </p>

      {/* About Us & Why Choose Us Section */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* About Us Section */}
        <div className="p-6 bg-white bg-opacity-60 rounded-lg shadow-lg text-center text-black">
          <h2 className="text-4xl font-bold mb-4">About Us</h2>
          <p className="text-lg font-medium">
            We are passionate about delivering <strong>authentic, mouthwatering meals</strong> made with <strong>fresh ingredients</strong> and expert craftsmanship. Whether you're dining in or ordering online, we promise a <strong>memorable experience</strong> with every bite!
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="p-6 bg-white bg-opacity-60 rounded-lg shadow-lg text-left text-black">
          <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
          <ul className="text-2xl font-semibold list-disc list-inside">
            <li>✅ 100% Fresh & Organic Ingredients</li>
            <li>✅ Fast & Hot Delivery</li>
            <li>✅ Unique & Tasty Recipes</li>
            <li>✅ Affordable Prices & Special Offers</li>
          </ul>
        </div>
      </div>

      {/* Featured Meals Section */}
      <h2 className="text-5xl font-bold mb-6 text-white">ORDER YOUR FAVORITE MEALS</h2>
      <h3 className="text-3xl font-semibold mb-8 text-white">FEATURED MEALS</h3>

      {/* Meal Images Grid */}
      <div className="grid grid-cols-2 gap-12 mb-12">
        {[
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjAMLedZRk2kc2Gg7NC0jRaHIjxa1-vf-b_A&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqh23N9c_aH0PvHiaE-KNpcNP0ShomxKEqdQ&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg2sGD0m7GqD3djELxtsNJ3yRXRbOMuY6ZoQ&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzUXwxKjDkf17YKakug9okRsOuGVhZD8h6RA&s"
        ].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Sample Food ${index + 1}`}
            className="w-96 h-96 object-cover rounded-3xl shadow-xl"
          />
        ))}
      </div>

      {/* Opening Hours */}
      <div className="text-center max-w-lg mb-10 p-8 bg-white bg-opacity-60 rounded-lg shadow-lg text-black">
        <h2 className="text-4xl font-bold mb-4">Opening Hours</h2>
        <p className="text-2xl font-medium">
          🕘 Monday - Friday: <strong>9:00 AM - 10:00 PM</strong> <br />
          🕙 Saturday - Sunday: <strong>10:00 AM - 11:30 PM</strong>
        </p>
      </div>

      {/* Handpicked Dishes Section */}
      <p className="text-2xl font-semibold mb-8 text-white">
        Handpicked dishes loved by our customers
      </p>

      {/* Booking Button */}
      <button
        onClick={() => navigate("/menu")}
        className="bg-green-500 hover:bg-green-600 font-extrabold text-6xl py-8 px-20 rounded-lg shadow-lg transition-transform transform hover:scale-105 text-white"
      >
        BOOK NOW
      </button>
    </div>
  );
};

export default Home;

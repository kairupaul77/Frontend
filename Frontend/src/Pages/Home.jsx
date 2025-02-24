import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-12 rounded-lg bg-cover bg-center"
      style={{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_49M_X4NviMHmRFArAvnssO-PHD4iwGcnyA&s')`,
      }}
    >
      {/* Welcome message at the top */}
      <h2 className="text-6xl font-extrabold mb-8 text-white">
        Welcome and savor the experience
      </h2>

      <p className="text-center text-white mb-8 text-xl">
        Fresh, delicious, and made just for you. Get your meal delivered hot and fast!
      </p>

      {/* About Us */}
      <div className="text-center max-w-2xl mb-10 p-6 bg-white bg-opacity-50 rounded-lg">
        <h3 className="text-3xl text-white font-bold mb-4">About Us</h3>
        <p className="text-white text-lg">
          We are passionate about delivering <strong>authentic, mouthwatering meals</strong> made with <strong>fresh ingredients</strong> and expert craftsmanship.
          Whether you're dining in or ordering online, we promise a <strong>memorable experience</strong> with every bite!
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="text-center max-w-3xl mb-10 p-6 bg-white bg-opacity-50 rounded-lg">
        <h3 className="text-3xl text-white font-bold mb-4">Why Choose Us?</h3>
        <ul className="text-white text-lg list-disc list-inside">
          <li>✅ 100% Fresh & Organic Ingredients</li>
          <li>✅ Fast & Hot Delivery</li>
          <li>✅ Unique & Tasty Recipes</li>
          <li>✅ Affordable Prices & Special Offers</li>
        </ul>
      </div>

      {/* Featured Meals */}
      <div className="text-center mb-8">
        <p className="font-semibold text-3xl text-white">ORDER YOUR FAVORITE MEALS</p>
        <p className="font-bold mt-3 text-2xl text-white">FEATURED MEALS</p>
      </div>

      {/* Food Images with Spacing & Rounded Corners */}
      <div className="flex flex-wrap justify-center gap-32 mb-12 p-6">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjAMLedZRk2kc2Gg7NC0jRaHIjxa1-vf-b_A&s"
          alt="Sample Food 1"
          className="w-80 h-80 object-cover rounded-2xl shadow-lg"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqh23N9c_aH0PvHiaE-KNpcNP0ShomxKEqdQ&s"
          alt="Sample Food 2"
          className="w-80 h-80 object-cover rounded-2xl shadow-lg"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-32 mb-12 p-6">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg2sGD0m7GqD3djELxtsNJ3yRXRbOMuY6ZoQ&s"
          alt="Sample Food 3"
          className="w-80 h-80 object-cover rounded-2xl shadow-lg"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzUXwxKjDkf17YKakug9okRsOuGVhZD8h6RA&s"
          alt="Sample Food 4"
          className="w-80 h-80 object-cover rounded-2xl shadow-lg"
        />
      </div>

      {/* Opening Hours */}
      <div className="text-center max-w-lg mb-10 p-6 bg-white bg-opacity-50 rounded-lg">
        <h3 className="text-3xl text-white font-bold mb-4">Opening Hours</h3>
        <p className="text-white text-lg">
          🕘 Monday - Friday: <strong>9:00 AM - 10:00 PM</strong> <br />
          🕙 Saturday - Sunday: <strong>10:00 AM - 11:30 PM</strong>
        </p>
      </div>

      {/* Handpicked Dishes */}
      <p className="text-white mb-8 text-xl">
        Handpicked dishes loved by our customers
      </p>

      {/* Green Booking Button */}
      <button
        onClick={() => navigate("/menu")}
        className="bg-green-500 hover:bg-green-600 text-white font-bold text-4xl py-5 px-12 rounded-lg transition"
      >
        BOOK NOW
      </button>
    </div>
  );
};

export default Home;

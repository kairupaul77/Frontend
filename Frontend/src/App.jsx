import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProvider from "./Context/UserContext.jsx";
import { MealProvider } from './Context/MealContext';
import { OrderProvider } from './Context/OrderContext';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Home from './Pages/Home';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import Menu from './Pages/Menu';
import Orders from './Pages/Orders';
import Register from './Pages/Register';
import AdminDashboard from './Pages/AdminDashboard.jsx';
import Terms from './Pages/Terms';
import Privacy from './Pages/Privacy';
import './index.css';

function App() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const responseMessage = (response) => {
    console.log("Google Login Success:", response);
    toast.success("Google login successful!");
  };

  const errorMessage = () => {
    console.error("Google Login Failed");
    toast.error("Google login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <BrowserRouter>
        <UserProvider>
          <MealProvider>
          <OrderProvider>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="app-container">
              <Navbar cartCount={cart.length} />
              <div className="main-content">
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
                  <Route path="/menu" element={<Menu meals={meals} />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                </Routes>
                <div className="google-login-container">
                  <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                </div>
              </div>
              <Footer />
            </div>
            </OrderProvider>
          </MealProvider>
        </UserProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProvider from "./Context/UserContext.jsx"; // Ensure correct path
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
// import styles from "./index.css"
import { MealProvider } from './Context/MealContext'; // Ensure correct path and use named import

function App() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [meals, setMeals] = useState([]); // Menu state

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <BrowserRouter> {/* Wrap the app inside BrowserRouter */}
      <UserProvider> {/* Wrap UserProvider inside BrowserRouter */}
        <MealProvider> {/* Wrap MealProvider inside UserProvider */}
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
            </div>
            <Footer />
          </div>
        </MealProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

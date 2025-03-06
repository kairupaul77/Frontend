import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProvider, { UserContext } from "./Context/UserContext.jsx";
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

function ProtectedRoute({ element }) {
  const { user } = useContext(UserContext);
  
  return user ? element : <Navigate to="/login" replace />;
}

function App() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <BrowserRouter>
      <UserProvider>
        <MealProvider>
          <OrderProvider>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="app-container">
              <Navbar cartCount={cart.length} />
              <div className="main-content">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />

                  {/* Protected Routes */}
                  <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
                  <Route path="/cart" element={<ProtectedRoute element={<Cart cart={cart} setCart={setCart} />} />} />
                  <Route path="/menu" element={<ProtectedRoute element={<Menu meals={meals} />} />} />
                  <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
                  <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
                  <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />

                  {/* Default Route */}
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </OrderProvider>
        </MealProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

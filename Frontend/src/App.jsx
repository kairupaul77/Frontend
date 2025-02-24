import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Terms from './Pages/Terms'; // Import Terms component
import Privacy from './Pages/Privacy'; // Import Privacy component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      {/* ToastContainer for global toast notifications */}
      <ToastContainer
        position="top-right" // Position of the toast
        autoClose={3000} // Auto-close after 3 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={false} // New toasts appear below older ones
        closeOnClick // Close toast on click
        rtl={false} // Left-to-right layout
        pauseOnFocusLoss // Pause toast when window loses focus
        draggable // Allow dragging to dismiss
        pauseOnHover // Pause toast on hover
      />
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add this route */}
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/terms" element={<Terms />} /> {/* Add Terms route */}
            <Route path="/privacy" element={<Privacy />} /> {/* Add Privacy route */}
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
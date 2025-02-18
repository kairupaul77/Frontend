import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Menu from './Pages/Menu';
import Orders from './Pages/Orders';
import Register from './Pages/Register';

function App() {

  
  return (
  
    <BrowserRouter>
      
         <Navbar/>
          <Routes>
             <Route path="/home" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart/>} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />

          </Routes>
        
    </BrowserRouter>
  );
}


export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import DashboardNavbar from './components/Navbar';
import CartPage from './pages/CartPage';
import { useAuthStore } from './store/authStore';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from './pages/Home';
import CartModal from './components/CartModal';
import './App.css'; 
import { useCartStore } from './store/cartStore';
import Profile from './pages/Profile';
import OrdersPage from './pages/OrdersPage';

function App() {

    const { fetchUser, loading } = useAuthStore();
      const { fetchCart } = useCartStore();

        useEffect(() => {
    fetchCart(); // 🛒 restore cart on refresh
  }, []);

  useEffect(() => {
    fetchUser(); // ✅ restore user on refresh
  }, []);

  if (loading) return null; // or loader
 
  return (
    <Router>
           <DashboardNavbar /> 
      <Toaster 
        position="top-center"  // default is top-right
        toastOptions={{
          style: {
            fontSize: '16px',
            padding: '16px 24px',
          },
        }}
      />
       <CartModal />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/home' element={<Home/>}/>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<OrdersPage />} />


    
      </Routes>
    </Router>
  );
}

export default App;
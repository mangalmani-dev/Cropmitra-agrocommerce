import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from "./components/AdminLayout";
import AdminUsers from "./pages/AdminUsers";
import AdminFarmers from "./pages/AdminFarmers";
import AdminOrders from "./pages/AdminOrders";



import DashboardNavbar from './components/Navbar';
import CartPage from './pages/CartPage';
import { useAuthStore } from './store/authStore';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from './pages/Home';
import CartModal from './components/CartModal';
import './App.css'; 
import { useCartStore } from './store/cartStore';
import Profile from './pages/Profile';
import OrdersPage from './pages/OrdersPage';
import AddCrop from './pages/AddCrop';
import MyCrops from './pages/MyCrops';
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";

function App() {

  const { fetchUser, loading, user } = useAuthStore(); // ✅ added user
  const { fetchCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return null;

  return (
    <Router>

      {/* ✅ Hide Navbar for Admin */}
      {user?.role !== "admin" && <DashboardNavbar />}

      <Toaster 
        position="top-center"
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
        <Route path="/add-crop" element={<AddCrop />} />
        <Route path="/my-crops" element={<MyCrops />} /> 

        {/* ✅ ADMIN PROTECTED ROUTE */}
     <Route
 path="/admin"
 element={
   <ProtectedRoute role="admin">
      <AdminLayout/>
   </ProtectedRoute>
 }
>

   <Route path="dashboard" element={<AdminDashboard/>} />
   <Route path="users" element={<AdminUsers/>} />
   <Route path="farmers" element={<AdminFarmers/>} />
   <Route path="orders" element={<AdminOrders/>} />

</Route>


      </Routes>
    </Router>
  );
}

export default App;

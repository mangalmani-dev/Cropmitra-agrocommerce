import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import DashboardNavbar from "./components/Navbar";
import CartModal from "./components/CartModal";
import { Toaster } from "react-hot-toast";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Profile from "./pages/Profile";
import OrdersPage from "./pages/OrdersPage";
import AddCrop from "./pages/AddCrop";
import MyCrops from "./pages/MyCrops";

// Admin
import AdminLayout from "./components/AdminLayout";
import AdminUsers from "./pages/AdminUsers";
import AdminFarmers from "./pages/AdminFarmers";
import AdminOrders from "./pages/AdminOrders";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Store
import { useAuthStore } from "./store/authStore";
import { useCartStore } from "./store/cartStore";

import "./App.css";
import Addresses from "./pages/Addresses";
import Checkout from "./pages/Checkout";

//////////////////////////////////////////////////////
// ⭐ INNER COMPONENT (Senior Pattern)
//////////////////////////////////////////////////////

function AppContent() {
  const { fetchUser } = useAuthStore();
  const { fetchCart } = useCartStore();
  const location = useLocation();

  //----------------------------------

  useEffect(() => {
    fetchUser();
    fetchCart();
  }, []);

  //----------------------------------
  // 🔥 ROUTES WHERE NAVBAR SHOULD HIDE
  //----------------------------------

  const hideNavbarRoutes = [
    "/profile",
    "/admin",
      
  ];

  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  //----------------------------------

  return (
    <>
      {/* ✅ NAVBAR */}
      {!shouldHideNavbar && <DashboardNavbar />}

      {/* ✅ TOASTER */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "16px",
            padding: "16px 24px",
          },
        }}
      />

      {/* ✅ CART MODAL */}
      <CartModal />

      {/* ✅ ROUTES */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/add-crop" element={<AddCrop />} />
        <Route path="/my-crops" element={<MyCrops />} />
        <Route path="/addresses" element={<Addresses />} />
          <Route path="/checkout" element={<Checkout />} />

        {/* ✅ ADMIN PROTECTED ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="farmers" element={<AdminFarmers />} />
          <Route path="orders" element={<AdminOrders />} />
        

        </Route>
      </Routes>
    </>
  );
}

//////////////////////////////////////////////////////
// ⭐ MAIN APP
//////////////////////////////////////////////////////

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

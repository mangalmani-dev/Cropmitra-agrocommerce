import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useCropStore } from "../store/cropStore";
import { useCartStore } from "../store/cartStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { search, setSearch } = useCropStore();
  const { cartCount } = useCartStore();

  if (!user) return null;

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/home" className="text-xl font-bold text-green-700">
          Crop<span className="text-black">Mitra</span>
        </Link>

        {/* 🔍 Global Search */}
        <div className="hidden md:flex flex-1 mx-6">
          <input
            type="text"
            placeholder="Search crops (Tomato, Wheat, Onion...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg px-4 py-2
              focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 text-sm">
          <Link to="/orders" className="hover:text-green-600">
            Orders
          </Link>

        <Link to="/cart" className="relative">
      🛒
      {cartCount() > 0 && (
        <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs px-2 rounded-full">
          {cartCount()}
        </span>
      )}
    </Link>

     <Link to="/profile" className="hover:text-green-600">
  Profile
</Link>
          <button
            onClick={logout}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const AuthNavbar = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <header className="w-full bg-white border-b border-gray-200 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="CropMitra Logo" className="h-9 w-auto" />
          <span className="text-xl font-bold text-black">
            Crop<span className="text-green-600">Mitra</span>
          </span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-black relative">

          {/* HOME */}
          <Link to="/" className="nav-link">
            Home
          </Link>

          {/* FEATURES */}
          <div
            className="relative"
            onMouseEnter={() => setHovered("features")}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="nav-link">Features</span>

            {hovered === "features" && (
              <DropdownCard>
                <DropdownItem title="Crop Marketplace" desc="Buy & sell fresh crops" />
                <DropdownItem title="Farmer Dashboard" desc="Track sales & earnings" />
                <DropdownItem title="Secure Payments" desc="Fast & safe checkout" />
              </DropdownCard>
            )}
          </div>

          {/* HOW IT WORKS */}
          <div
            className="relative"
            onMouseEnter={() => setHovered("how")}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="nav-link">How it Works</span>

            {hovered === "how" && (
              <DropdownCard>
                <DropdownItem title="Sign Up" desc="Create your free account" />
                <DropdownItem title="List or Browse" desc="Farmers list, users buy" />
                <DropdownItem title="Order & Deliver" desc="Simple checkout flow" />
              </DropdownCard>
            )}
          </div>

          {/* PRICING */}
          <div
            className="relative"
            onMouseEnter={() => setHovered("pricing")}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="nav-link">Pricing</span>

            {hovered === "pricing" && (
              <DropdownCard>
                <DropdownItem title="Free Buyers" desc="No extra cost" />
                <DropdownItem title="Low Commission" desc="Farmer-friendly pricing" />
                <DropdownItem title="Transparent" desc="No hidden charges" />
              </DropdownCard>
            )}
          </div>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-black hover:text-gray-600 transition"
          >
            Log In
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 rounded-md bg-black text-white 
                       border border-yellow-400 hover:bg-gray-900
                       transition shadow-[0_0_0_0] hover:shadow-[0_0_10px_rgba(234,179,8,0.6)]"
          >
            Join for Free
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AuthNavbar;

/* ---------------- DROPDOWN COMPONENTS ---------------- */

const DropdownCard = ({ children }) => (
  <div className="absolute top-12 left-0 w-64 bg-white border 
                  border-gray-200 shadow-xl rounded-xl p-4 space-y-3
                  animate-dropdown">
    {children}
  </div>
);

const DropdownItem = ({ title, desc }) => (
  <div className="p-2 rounded-lg hover:bg-yellow-50 transition cursor-pointer">
    <p className="font-semibold text-black">{title}</p>
    <p className="text-xs text-gray-500">{desc}</p>
  </div>
);

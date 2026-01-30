import React from "react";
import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";
import appleImg from "../assets/apple.jpg";

const MiniCart = ({ onClose }) => {
  const { cart, removeItem } = useCartStore();

  const total = cart.reduce(
    (sum, item) => sum + item.crop.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="absolute right-0 mt-3 w-72 bg-white border rounded-xl shadow-lg p-4 z-50">
        <p className="text-center text-gray-500">Cart is empty 🛒</p>
      </div>
    );
  }

  return (
    <div className="absolute right-0 mt-3 w-80 bg-white border rounded-xl shadow-lg p-4 z-50">
      <h3 className="font-semibold mb-3">My Cart</h3>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {cart.map((item) => (
          <div
            key={item.crop.id}
            className="flex items-center justify-between gap-3 text-sm"
          >
            {/* 🖼️ Crop Image */}
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={item.crop.images?.[0] || appleImg}
                alt={item.crop.name}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = appleImg;
                }}
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <p className="font-medium">{item.crop.name}</p>
              <p className="text-gray-500 text-xs">
                x{item.quantity} · ₹{item.crop.price}
              </p>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeItem(item.crop.id)}
              className="text-red-500 text-xs hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <hr className="my-3" />

      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <Link
        to="/cart"
        onClick={onClose}
        className="block mt-4 bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700"
      >
        View Cart
      </Link>
    </div>
  );
};

export default MiniCart;

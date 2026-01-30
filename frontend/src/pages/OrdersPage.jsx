import React, { useEffect } from "react";
import { useOrderStore } from "../store/orderStore";
import appleImg from "../assets/apple.jpg";

const OrdersPage = () => {
  const { orders, fetchMyOrders, loading } = useOrderStore();

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading orders...</p>
      </div>
    );
  }

  // 📭 No orders
  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-semibold mb-2">
          No orders yet
        </h2>
        <p className="text-gray-500">
          Your placed orders will appear here 🌾
        </p>
      </div>
    );
  }

  return (
  <div className="max-w-7xl mx-auto px-6 py-10">
    <h1 className="text-3xl font-bold mb-8">My Orders</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {orders.flatMap((order) =>
        order.items.map((item, index) => (
          <div
            key={`${order._id}-${index}`}
            className="bg-white border rounded-xl shadow-sm p-4 hover:shadow-md transition"
          >
            {/* Crop Image */}
            <img
              src={item.crop?.images?.[0] || appleImg}
              alt={item.crop?.name}
              className="w-full h-32 object-contain bg-gray-100 rounded mb-3"
              onError={(e) => {
                e.currentTarget.src = appleImg;
              }}
            />

            {/* Crop Name */}
            <h3 className="font-semibold text-sm truncate">
              {item.crop?.name}
            </h3>

            {/* Quantity */}
            <p className="text-xs text-gray-500 mt-1">
              Qty: {item.quantity}
            </p>

            {/* Price */}
            <p className="font-bold text-green-700 mt-2">
              ₹{item.price * item.quantity}
            </p>

            {/* Order Meta */}
            <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
              <span>
                #{order._id.slice(-6)}
              </span>
              <span>{order.status}</span>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);


};

export default OrdersPage;

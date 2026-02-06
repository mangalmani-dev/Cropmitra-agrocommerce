import React, { useEffect } from "react";
import { useOrderStore } from "../store/orderStore";
import appleImg from "../assets/apple.jpg";

const OrdersPage = () => {
  const { orders, fetchMyOrders, loading } = useOrderStore();

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  // ✅ Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading your orders...
        </p>
      </div>
    );
  }

  // ✅ Empty State
  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50 flex flex-col items-center justify-center text-center">
        <div className="text-7xl mb-4">📦</div>

        <h2 className="text-2xl font-bold mb-2">
          No orders yet
        </h2>

        <p className="text-gray-500">
          Your placed orders will appear here 🌾
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50">
      
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* SAME heading style as home */}
        <h1 className="text-3xl font-bold mb-2">
          My Orders 📦
        </h1>

        <p className="text-gray-500 mb-8">
          Quickly review and track your recent purchases.
        </p>

        {/* GRID — same spacing as home */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {orders.flatMap((order) =>
            order.items.map((item, index) => (
              
              <div
                key={`${order._id}-${index}`}
                className="
                  group
                  relative
                  bg-white/70
                  backdrop-blur-xl
                  border border-white/40
                  rounded-3xl
                  p-5
                  shadow-lg
                  hover:shadow-2xl
                  hover:-translate-y-3
                  transition
                  duration-500
                "
              >

                {/* STATUS BADGE — like Fresh badge */}
                <span className={`
                  absolute top-4 left-4 text-xs px-3 py-1 rounded-full shadow font-medium
                  ${order.status === "delivered"
                    ? "bg-green-600 text-white"
                    : order.status === "pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-blue-600 text-white"}
                `}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>

                {/* Image — SAME STYLE */}
                <div className="h-44 flex items-center justify-center bg-gradient-to-br from-green-50 to-white rounded-2xl overflow-hidden">
                  <img
                    src={item.crop?.images?.[0] || appleImg}
                    alt={item.crop?.name}
                    className="
                      object-contain
                      max-h-full
                      group-hover:scale-125
                      transition
                      duration-500
                    "
                    onError={(e) => {
                      e.currentTarget.src = appleImg;
                    }}
                  />
                </div>

                {/* Info */}
                <h3 className="mt-4 text-xl font-bold tracking-tight truncate">
                  {item.crop?.name}
                </h3>

                <p className="text-gray-400 text-sm">
                  Order #{order._id.slice(-6)}
                </p>

                {/* Price */}
                <p className="text-2xl font-extrabold text-green-600 mt-2">
                  ₹{item.price * item.quantity}
                </p>

                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default OrdersPage;

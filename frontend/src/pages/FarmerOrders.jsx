import { useEffect } from "react";
import { useFarmerOrderStore } from "../store/farmerOrderStore";

const FarmerOrders = () => {
  const {
    orders,
    loading,
    fetchFarmerOrders,
    updateStatus,
  } = useFarmerOrderStore();

  useEffect(() => {
    fetchFarmerOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        Loading orders...
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="flex justify-center mt-20 text-gray-500">
        No orders yet 📦
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        Farmer Orders 🚜
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-2xl shadow"
          >

            {/* TOP */}
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">
                  Order ID: {order._id.slice(-6)}
                </p>

                <p className="text-gray-500">
                  Buyer: {order.buyer?.name}
                </p>
              </div>

              <span className="font-bold text-green-600">
                ₹{order.totalAmount}
              </span>
            </div>

            {/* ITEMS */}
            <div className="mt-4">
              {order.items.map((item) => (
                <p key={item._id} className="text-gray-600">
                  🌾 {item.crop?.name} × {item.quantity}
                </p>
              ))}
            </div>

            {/* STATUS */}
            <div className="flex justify-between items-center mt-6">

              <span className="font-semibold">
                Status: {order.status}
              </span>

              {/* STATUS BUTTONS */}
              <div className="flex gap-3">

                {order.status === "pending" && (
                  <button
                    onClick={() =>
                      updateStatus(order._id, "accepted")
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Accept
                  </button>
                )}

                {order.status === "accepted" && (
                  <button
                    onClick={() =>
                      updateStatus(order._id, "shipped")
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Ship
                  </button>
                )}

                {order.status === "shipped" && (
                  <button
                    onClick={() =>
                      updateStatus(order._id, "delivered")
                    }
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                  >
                    Deliver
                  </button>
                )}

              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmerOrders;

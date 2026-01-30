import React, { useEffect } from "react";
import { useCartStore } from "../store/cartStore";
import appleImg from "../assets/apple.jpg";
import { useOrderStore } from "../store/orderStore";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cart,
    fetchCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCartStore();


    const { placeOrder, loading } = useOrderStore();
     const navigate = useNavigate();


  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // 🧮 Total price
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.crop.price * item.quantity,
    0
  );

  // 🛒 Empty cart
  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-semibold mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500">
          Add fresh crops to continue shopping 🌾
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">My Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 🟢 Cart Items */}
        <div className="lg:col-span-2 space-y-5">
          {cart.map((item) => (
            <div
              key={item.crop._id}
              className="bg-white rounded-xl shadow-sm border p-5 flex flex-col sm:flex-row gap-5"
            >
              {/* 🖼️ Crop Image (same as Home page) */}
              <div className="w-full sm:w-32">
                <div className="h-40 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
               <div className="h-40 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
  <img
    src={item.crop.images?.[0]}
    alt={item.crop.name}
    className="max-h-full max-w-full object-contain"
    loading="lazy"
    onError={(e) => {
      e.currentTarget.src = appleImg;
    }}
  />
</div>
                </div>
              </div>

              {/* 🧾 Details */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  {item.crop.name}
                </h3>

                <p className="text-sm text-gray-500">
                  ₹{item.crop.price} / {item.crop.unit}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Farmer: {item.crop.farmerName || "Verified Farmer"}
                </p>

                {/* 🔢 Quantity Controls */}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() =>
                      updateQuantity(item.crop._id, item.quantity - 1)
                    }
                    disabled={item.quantity === 1}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  >
                    −
                  </button>

                  <span className="font-medium">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(item.crop._id, item.quantity + 1)
                    }
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 💰 Price + Remove */}
              <div className="flex sm:flex-col justify-between items-end">
                <p className="font-semibold text-lg">
                  ₹{item.crop.price * item.quantity}
                </p>

                <button
                  onClick={() => removeItem(item.crop._id)}
                  className="text-red-500 text-sm hover:underline mt-3"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 🟢 Order Summary */}
        <div className="bg-white border rounded-xl shadow-sm p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Delivery</span>
            <span>Free</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-semibold mb-6">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
<button
  onClick={() => placeOrder(cart, clearCart, navigate)}
  disabled={loading}
  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
>
  {loading ? "Placing Order..." : "Place Order"}
</button>
          <button
            onClick={clearCart}
            className="w-full mt-3 text-red-500 text-sm hover:underline"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

import React, { useEffect } from "react";
import { useCropStore } from "../store/cropStore";
import { useCartStore } from "../store/cartStore";
import CropFilters from "../components/CropFilters";
import appleImg from "../assets/apple.jpg";

const Home = () => {
  const { fetchCrops, filteredCrops, loading } = useCropStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    fetchCrops();
  }, [fetchCrops]);

  const crops = filteredCrops();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Fresh Crops 🌾</h1>

      <CropFilters />

      {/* 🔹 Show loading text ONLY */}
      {loading && (
        <p className="mt-6 text-gray-500">Loading crops...</p>
      )}

      {/* 🔹 No crops */}
      {!loading && crops.length === 0 && (
        <p className="mt-6 text-gray-500">No crops found.</p>
      )}

      {/* 🔹 Render cards ONLY after loading = false */}
      {!loading && crops.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {crops.map((crop) => (
            <div
              key={crop._id}
              className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              {/* ✅ Crop Image (no blinking now) */}
                          
                          <div className="h-40 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
          <img
    src={crop.images?.[0] || appleImg}
    alt={crop.name}
    className="max-h-full max-w-full object-contain"
    loading="lazy"
    onError={(e) => {
      e.currentTarget.src = appleImg;
    }}
  />
</div>

              {/* Crop Info */}
              <h3 className="mt-3 font-semibold text-lg">
                {crop.name}
              </h3>

              <p className="text-sm text-gray-600">
                ₹{crop.price} / {crop.unit}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Farmer: {crop.farmerName || "Verified Farmer"}
              </p>

              {/* Add to Cart */}
              <button
              onClick={() => addToCart(crop.id, 1)}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

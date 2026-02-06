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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50">
      
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* 🔥 HERO SECTION */}
    
<div className="relative mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 px-8 py-8 text-white shadow-xl">
  
  <div className="flex items-center justify-between gap-6 flex-wrap">

    {/* LEFT */}
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold leading-snug">
        Farm Fresh Crops 🌾
      </h1>

      <p className="mt-2 text-green-100">
        Buy directly from farmers. Fresher crops, better prices.
      </p>
    </div>

    {/* RIGHT BUTTON */}
    <button className="bg-white text-green-700 px-5 py-2.5 rounded-lg font-semibold hover:scale-105 transition">
      Explore →
    </button>

  </div>

  {/* subtle glow */}
  <div className="absolute -right-10 -top-10 h-40 w-40 bg-white/20 rounded-full blur-2xl"></div>
</div>
        {/* Heading */}
        <h2 className="text-3xl font-bold mb-2">
          Fresh Crops 🌾
        </h2>

        <p className="text-gray-500 mb-6">
          Hand-picked quality products from verified farmers.
        </p>

        <CropFilters />

        {/* Loading */}
        {loading && (
          <p className="mt-10 text-gray-500 animate-pulse">
            Loading fresh crops...
          </p>
        )}

        {/* No crops */}
        {!loading && crops.length === 0 && (
          <p className="mt-10 text-gray-500">
            No crops found.
          </p>
        )}

        {/* CROPS GRID */}
        {!loading && crops.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
            {crops.map((crop) => (
              <div
                key={crop._id}
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
                
                {/* Badge */}
                <span className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow">
                  Fresh
                </span>

                {/* Image */}
                <div className="h-48 flex items-center justify-center bg-gradient-to-br from-green-50 to-white rounded-2xl overflow-hidden">
                  <img
                    src={crop.images?.[0] || appleImg}
                    alt={crop.name}
                    className="
                      object-contain
                      max-h-full
                      group-hover:scale-125
                      transition
                      duration-500
                    "
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = appleImg;
                    }}
                  />
                </div>

                {/* Info */}
                <h3 className="mt-4 text-xl font-bold tracking-tight">
                  {crop.name}
                </h3>

                <p className="text-gray-400 text-sm">
                  👨‍🌾 {crop.farmerName || "Verified Farmer"}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between mt-3">
                  <p className="text-2xl font-extrabold text-green-600">
                    ₹{crop.price}
                    <span className="text-sm text-gray-400 font-normal">
                      /{crop.unit}
                    </span>
                  </p>
                </div>

                {/* Button */}
                <button
                  onClick={() => addToCart(crop.id, 1)}
                  className="
                    mt-5
                    w-full
                    bg-gradient-to-r
                    from-green-600
                    to-emerald-500
                    text-white
                    py-3
                    rounded-2xl
                    font-semibold
                    hover:scale-105
                    active:scale-95
                    transition
                    shadow-md
                  "
                >
                  Add to Cart 🛒
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;

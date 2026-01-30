import React, { useEffect } from "react";
import { useCropStore } from "../store/useCropStore";
import { Trash2 } from "lucide-react";
import Mango from "../assets/mango.jpg"

const ActiveCropListings = () => {
  const { crops, loading, fetchFarmerCrops, deleteCrop } = useCropStore();

  useEffect(() => {
    fetchFarmerCrops();
  }, []);

  return (
    <div className="flex-1 bg-white rounded-3xl shadow-sm border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Active Crop Listings
        </h2>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-gray-500 text-sm">Loading crops...</p>
      )}

      {/* Empty State */}
      {!loading && crops.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No active crops found 🌱
        </div>
      )}

      {/* Crop Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {crops.map((crop) => (
          <div
            key={crop._id}
            className="rounded-2xl border hover:shadow-md transition overflow-hidden"
          >
            {/* Image */}
            <div className="h-40 bg-gray-100">
              <img
                src={crop.image || "/placeholder-crop.jpg"}
                alt={crop.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">
                {crop.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {crop.cropType}
              </p>

              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="font-medium text-gray-800">
                    {crop.quantityAvailable} {crop.unitType}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-semibold text-green-600 text-lg">
                    ₹{crop.pricePerUnit} / {crop.unitType}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => deleteCrop(crop._id)}
                  className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveCropListings;

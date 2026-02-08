import { useEffect } from "react";
import { useFarmerCropStore } from "../store/farmerCropStore";

const MyCrops = () => {

  const {
    crops,
    fetchFarmerCrops,
    deleteCrop,
    fetchLoading,
    deleteLoading
  } = useFarmerCropStore();

  useEffect(() => {
    fetchFarmerCrops();
  }, [fetchFarmerCrops]);

  if (fetchLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold text-green-700 animate-pulse">
          Loading Crops...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-6">

      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-2xl font-semibold text-green-700 text-center mb-6">
          🌾 My Crops
        </h2>

        {crops.length === 0 ? (
          <p className="text-center text-gray-600">
            No crops added yet.
          </p>
        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {crops.map((crop) => (
              <div
                key={crop._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-3"
              >

                <img
                  src={crop.images?.[0] || "/no-image.png"}
                  alt={crop.name}
                  className="w-full h-36 object-cover rounded-lg mb-3"
                />

                <h3 className="text-lg font-semibold text-gray-800">
                  {crop.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {crop.category}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  ₹ {crop.price}
                </p>

                <p className="text-sm text-gray-600">
                  {crop.quantity} {crop.unit}
                </p>

                {crop.organic && (
                  <span className="inline-block mt-2 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    Organic 🌿
                  </span>
                )}

                <button
                  disabled={deleteLoading}
                  className="w-full mt-3 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white py-1.5 rounded-lg text-sm transition"
                  onClick={() => deleteCrop(crop._id)}
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </button>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyCrops;

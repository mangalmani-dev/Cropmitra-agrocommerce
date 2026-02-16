import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFarmerCropStore } from "../store/farmerCropStore";
import ProfileTopBar from "../components/ProfileTopBar";

const MyCrops = () => {
  const navigate = useNavigate();

  const {
    crops,
    fetchFarmerCrops,
    deleteCrop,
    fetchLoading,
    deleteLoading
  } = useFarmerCropStore();

  useEffect(() => {
    fetchFarmerCrops();
  }, []);

  //----------------------------------

  if (fetchLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-green-50">
        <p className="text-xl font-semibold text-green-700 animate-pulse">
          Loading Your Crops 🌾...
        </p>
      </div>
    );
  }

  //----------------------------------

  return (
    <>
      {/* ✅ TOP BAR */}
      <ProfileTopBar />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50">

        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-10">

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                🌾 My Crops
              </h1>

              <p className="text-gray-500 mt-1">
                Manage and track your crop listings
              </p>
            </div>

            {/* ADD CROP BUTTON */}
            {/* <button
              onClick={() => navigate("/farmer/add-crop")}
              className="
                bg-green-600 hover:bg-green-700
                text-white px-6 py-3
                rounded-xl font-semibold
                shadow-md hover:shadow-lg
                transition
              "
            >
              + Add Crop
            </button> */}

          </div>

          {/* EMPTY STATE */}
          {crops.length === 0 ? (
            <div className="text-center mt-20">
              <p className="text-gray-500 text-lg">
                You haven't added any crops yet.
              </p>

              <button
                onClick={() => navigate("/farmer/add-crop")}
                className="
                  mt-6
                  bg-green-600 hover:bg-green-700
                  text-white px-6 py-3
                  rounded-xl font-semibold
                "
              >
                Add Your First Crop 🌱
              </button>
            </div>
          ) : (

            //----------------------------------

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {crops.map((crop) => (
                <div
                  key={crop._id}
                  className="
                    group
                    bg-white
                    rounded-2xl
                    shadow-md hover:shadow-xl
                    transition
                    overflow-hidden
                  "
                >

                  {/* IMAGE */}
                  <div className="h-48 overflow-hidden">
                    <img
                      src={crop.images?.[0] || "/no-image.png"}
                      alt={crop.name}
                      className="
                        w-full h-full object-cover
                        group-hover:scale-110
                        transition duration-500
                      "
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-4">

                    <h3 className="text-lg font-bold text-gray-800">
                      {crop.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {crop.category}
                    </p>

                    {/* PRICE */}
                    <p className="text-2xl font-extrabold text-green-600 mt-2">
                      ₹{crop.price}
                      <span className="text-sm text-gray-400 font-normal">
                        /{crop.unit}
                      </span>
                    </p>

                    {/* QUANTITY */}
                    <p className="text-sm text-gray-600 mt-1">
                      Stock: {crop.quantity} {crop.unit}
                    </p>

                    {/* ORGANIC */}
                    {crop.organic && (
                      <span className="
                        inline-block mt-2
                        bg-green-100 text-green-700
                        px-3 py-1 rounded-full text-xs
                      ">
                        Organic 🌿
                      </span>
                    )}

                    {/* DELETE */}
                    <button
                      disabled={deleteLoading}
                      onClick={() => deleteCrop(crop._id)}
                      className="
                        w-full mt-4
                        bg-red-500 hover:bg-red-600
                        disabled:bg-red-300
                        text-white
                        py-2 rounded-xl
                        font-semibold
                        transition
                      "
                    >
                      {deleteLoading ? "Deleting..." : "Delete Crop"}
                    </button>

                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCrops;

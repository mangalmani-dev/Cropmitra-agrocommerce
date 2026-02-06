import { useEffect } from "react";
import { useAdminStore } from "../store/adminStore";

const AdminFarmers = () => {

  const {
    farmers,
    fetchFarmers,
    approveFarmer,
    rejectFarmer,
    loading
  } = useAdminStore();

  useEffect(()=>{
    fetchFarmers();
  },[]);

  if(loading){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold animate-pulse">
          Loading Farmers...
        </h1>
      </div>
    );
  }

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            🌾 Farmer Management
          </h1>

          <p className="text-gray-500">
            Approve farmers before they can sell crops.
          </p>
        </div>

        <div className="bg-green-600 text-white px-4 py-2 rounded-xl shadow">
          Total Farmers: {farmers.length}
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left">Farmer</th>
              <th className="p-4 text-left">Farm</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Joined</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {farmers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No Farmers Found
                </td>
              </tr>
            )}

            {farmers.map((farmer)=>(

              <tr
                key={farmer._id}
                className="border-b hover:bg-gray-50 transition"
              >

                {/* Farmer Info */}
                <td className="p-4">
                  <p className="font-semibold">
                    {farmer.user?.name}
                  </p>

                  <p className="text-gray-500 text-sm">
                    {farmer.user?.email}
                  </p>
                </td>

                {/* Farm Name */}
                <td className="p-4">
                  {farmer.farmName || "N/A"}
                </td>

                {/* Location */}
                <td className="p-4">
                  {farmer.location}
                </td>

                {/* Status */}
                <td className="p-4">

                  {farmer.isApproved ? (

                    <span className="bg-green-100 text-green-700 
                    px-3 py-1 rounded-full text-sm font-semibold">
                      Approved
                    </span>

                  ) : (

                    <span className="bg-yellow-100 text-yellow-700 
                    px-3 py-1 rounded-full text-sm font-semibold">
                      Pending
                    </span>

                  )}

                </td>

                {/* Date */}
                <td className="p-4 text-gray-500">
                  {new Date(farmer.createdAt).toLocaleDateString()}
                </td>

                {/* ACTIONS */}
                <td className="p-4 flex gap-2">

                  {!farmer.isApproved && (

                    <button
                      onClick={()=>approveFarmer(farmer._id)}
                      className="bg-green-600 hover:bg-green-700 
                      text-white px-3 py-1 rounded-lg text-sm transition"
                    >
                      Approve
                    </button>

                  )}

                  <button
                    onClick={()=>rejectFarmer(farmer._id)}
                    className="bg-red-500 hover:bg-red-600 
                    text-white px-3 py-1 rounded-lg text-sm transition"
                  >
                    Reject
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminFarmers;

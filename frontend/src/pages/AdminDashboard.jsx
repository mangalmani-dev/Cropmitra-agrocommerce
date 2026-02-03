import { useEffect } from "react";
import { useAdminStore } from "../store/adminStore";
import { FaUsers, FaLeaf, FaShoppingCart, FaSeedling } from "react-icons/fa";

const AdminDashboard = () => {

  const { stats, fetchDashboard, loading } = useAdminStore();

  useEffect(()=>{
    fetchDashboard();
  },[]);

  if(loading) return <h1 className="text-2xl">Loading Dashboard...</h1>;

  return (

    <div className="p-6">

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6">
        🚀 Admin Dashboard
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Users */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition">
          <FaUsers className="text-4xl text-blue-500"/>
          <div>
            <p className="text-gray-500">Total Users</p>
            <h2 className="text-2xl font-bold">
              {stats?.totalUsers || 0}
            </h2>
          </div>
        </div>

        {/* Farmers */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition">
          <FaSeedling className="text-4xl text-green-500"/>
          <div>
            <p className="text-gray-500">Farmers</p>
            <h2 className="text-2xl font-bold">
              {stats?.totalFarmers || 0}
            </h2>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition">
          <FaShoppingCart className="text-4xl text-purple-500"/>
          <div>
            <p className="text-gray-500">Orders</p>
            <h2 className="text-2xl font-bold">
              {stats?.totalOrders || 0}
            </h2>
          </div>
        </div>

        {/* Crops */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition">
          <FaLeaf className="text-4xl text-emerald-500"/>
          <div>
            <p className="text-gray-500">Crops Listed</p>
            <h2 className="text-2xl font-bold">
              {stats?.totalCrops || 0}
            </h2>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;

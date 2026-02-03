import { useEffect } from "react";
import { useAdminStore } from "../store/adminStore";

const AdminUsers = () => {

  const { users, fetchUsers, loading } = useAdminStore();

  useEffect(()=>{
    fetchUsers();
  },[]);

  if(loading) return <h1 className="text-xl">Loading Users...</h1>;

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      {/* 🔥 Gradient Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 
      text-white p-6 rounded-2xl shadow-lg mb-6">

        <h1 className="text-3xl font-bold">
          👥 User Management
        </h1>

        <p className="opacity-90">
          Manage platform users, block suspicious accounts, and monitor activity.
        </p>

      </div>


      {/* 🔥 Table Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Joined</th>
            </tr>
          </thead>

          <tbody>

            {users.map((user)=>(
              <tr 
                key={user._id} 
                className="border-b hover:bg-gray-50 transition"
              >

                {/* User */}
                <td className="p-4">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </td>

                {/* Role */}
                <td className="p-4 capitalize">
                  <span className="bg-blue-100 text-blue-700 
                  px-3 py-1 rounded-full text-sm">
                    {user.role}
                  </span>
                </td>

                {/* Status */}
                <td className="p-4">

                  {user.isBlocked ? (

                    <span className="bg-red-100 text-red-600 
                    px-3 py-1 rounded-full text-sm font-semibold">
                      Blocked
                    </span>

                  ) : (

                    <span className="bg-green-100 text-green-600 
                    px-3 py-1 rounded-full text-sm font-semibold">
                      Active
                    </span>

                  )}

                </td>

                {/* Date */}
                <td className="p-4 text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminUsers;

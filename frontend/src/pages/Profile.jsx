import ProfileTopBar from "../components/ProfileTopBar";
import ProfileNavbar from "../components/ProfileTopBar";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();

  // 🔐 Guards
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10">Please login</p>;
  }

  return (
    <>
      {/* 🔝 Profile Navbar */}
      <ProfileTopBar />

      {/* 📄 Profile Content */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-4xl p-6 text-center">

          <h1 className="text-2xl font-bold mb-6">My Profile</h1>

          {/* ⭐ Farmer Action Buttons */}
          <div className="flex gap-4 justify-center">

            <button
              onClick={() => navigate("/add-crop")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              Add Crop 🌾
            </button>

            <button
              onClick={() => navigate("/my-crops")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              My Crops 📦
            </button>

          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;

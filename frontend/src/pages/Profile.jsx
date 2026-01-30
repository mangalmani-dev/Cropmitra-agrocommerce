import ProfileTopBar from "../components/ProfileTopBar";
import ProfileNavbar from "../components/ProfileTopBar";
import { useAuthStore } from "../store/authStore";

const Profile = () => {
  const { user, loading } = useAuthStore();

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
  <div className="max-w-4xl p-6">
    <h1 className="text-2xl font-bold">My Profile</h1>
  </div>
</div>
    </>
  );
};

export default Profile;

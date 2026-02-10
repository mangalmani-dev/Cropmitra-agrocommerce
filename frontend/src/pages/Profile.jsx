import ProfileTopBar from "../components/ProfileTopBar";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Please login
      </div>
    );
  }

  return (
    <>
      <ProfileTopBar />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50">
        <div className="max-w-6xl mx-auto px-6 py-10">

          {/* ACTION CARDS */}
          <div className="grid sm:grid-cols-2 gap-8 mt-10">
            {[
              { title: "My Orders", icon: "📦", path: "/orders" },
              { title: "Addresses", icon: "📍", path: "/addresses" },

              // ✅ Farmer Only Cards
              ...(user?.role === "Farmer"
                ? [
                    { title: "Farmer Orders", icon: "🚜", path: "/farmer/orders" },
                    { title: "Add Crop", icon: "🌾", path: "/farmer/add-crop" },
                    { title: "My Crops", icon: "🌱", path: "/farmer/my-crops" },
                  ]
                : []),

            ].map((card) => (
              <div
                key={card.title}
                onClick={() => navigate(card.path)}
                className="
                  cursor-pointer
                  bg-white/70
                  backdrop-blur-xl
                  border border-white/40
                  rounded-3xl
                  p-8
                  shadow-lg
                  hover:-translate-y-2
                  hover:shadow-2xl
                  transition
                "
              >
                <h2 className="text-2xl font-bold">
                  {card.icon} {card.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  Manage your {card.title.toLowerCase()}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;

import React from "react";
import ProfileFarmerSidebar from "../components/ProfileFarmerSidebar";
import ActiveCropListings from "../components/ActiveCropListings";
import { useOrderStore } from "../store/orderStore";

const ProfilePage = () => {
  const user = {
    farmName: "Green Valley Organics",
  };

  const { orders, fetchMyOrders } = useOrderStore();
  useEffect(() => {
  fetchMyOrders();
}, []);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto flex gap-6">

        {/* LEFT SIDEBAR */}
        <ProfileFarmerSidebar user={user} />

        {/* RIGHT PANEL (IMAGE STYLE) */}
        <div className="flex-1">
          <ActiveCropListings />
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;

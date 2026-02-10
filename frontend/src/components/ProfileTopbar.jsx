import { useAuthStore } from "../store/authStore";
import { useRef, useState, useEffect } from "react";
import FarmerApplyForm from "./FarmerApplyForm";
import { useNavigate } from "react-router-dom";

const ProfileTopBar = () => {
  const { user, loading, uploadProfileImage } = useAuthStore();

  const navigate = useNavigate();

  const fileRef = useRef(null);
  const menuRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showFarmerForm, setShowFarmerForm] = useState(false);

  //////////////////////////////////////////
  // ✅ NORMALIZE ROLE (VERY IMPORTANT)
  //////////////////////////////////////////

  const role = user?.role?.toLowerCase();
  const isFarmer = role === "farmer";

  //////////////////////////////////////////
  // Close dropdown on outside click
  //////////////////////////////////////////

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <>
      {/* ================= TOP BAR ================= */}

      <div
        className="
        w-full 
        sticky top-0 z-40
        bg-white/70 
        backdrop-blur-xl
        border-b border-white/40
        shadow-md
        "
      >
        <div className="max-w-7xl mx-auto px-6 h-[88px] flex items-center justify-between">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-5">

            {/* Avatar + Dropdown */}
            <div className="relative" ref={menuRef}>
              <div
                onClick={() => setShowMenu((prev) => !prev)}
                className="
                  w-16 h-16
                  rounded-full
                  cursor-pointer
                  overflow-hidden
                  bg-green-600/10
                  flex items-center justify-center
                  font-bold text-green-700
                  ring-2 ring-white
                  shadow-sm
                  hover:scale-105
                  transition
                "
                title="Profile options"
              >
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              {/* DROPDOWN */}
              {showMenu && (
                <div
                  className="
                    absolute top-20 left-0
                    bg-white/90 backdrop-blur-lg
                    border border-white/40
                    rounded-xl
                    shadow-xl
                    w-48
                    z-50
                    overflow-hidden
                  "
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  {user.profileImage && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setShowPreview(true);
                          setShowMenu(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm"
                      >
                        👁 View Image
                      </button>

                      <div className="border-t"></div>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      fileRef.current.click();
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm"
                  >
                    🔄 Change Image
                  </button>
                </div>
              )}
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  uploadProfileImage(e.target.files[0]);
                }
              }}
            />

            {/* USER INFO */}
            <div>
              <p className="font-semibold text-gray-900 text-lg">
                {user.name}
              </p>

              <p className="text-sm text-gray-500">
                {user.email}
              </p>

              <span
                className="
                  inline-block
                  mt-1
                  bg-green-100
                  text-green-700
                  px-3 py-1
                  rounded-full
                  text-xs
                  font-semibold
                  capitalize
                "
              >
                {role}
              </span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* ⭐ QUICK ACTION FOR FARMERS */}
            {isFarmer && (
              <button
                onClick={() => navigate("/farmer/add-crop")}
                className="
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  px-6 py-2.5
                  rounded-xl
                  font-semibold
                  shadow-md
                  transition
                "
              >
                + Add Crop
              </button>
            )}

            {/* BECOME FARMER BUTTON */}
            {!isFarmer ? (
              <button
                type="button"
                onClick={() => setShowFarmerForm(true)}
                disabled={loading}
                className="
                  bg-gradient-to-r
                  from-green-600
                  to-emerald-500
                  text-white
                  px-7 py-3
                  rounded-xl
                  text-sm
                  font-semibold
                  hover:scale-105
                  active:scale-95
                  transition
                  shadow-md
                  disabled:opacity-50
                "
              >
                Become a Farmer 🌾
              </button>
            ) : (
              <span
                className="
                  bg-green-100
                  text-green-700
                  px-5 py-2.5
                  rounded-full
                  text-sm
                  font-semibold
                "
              >
                Farmer ✔
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ================= IMAGE PREVIEW ================= */}

      {showPreview && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-5 relative shadow-xl">
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <img
              src={user.profileImage}
              alt="profile"
              className="w-80 h-80 object-cover rounded-xl"
            />
          </div>
        </div>
      )}

      {/* ================= FARMER FORM ================= */}

      {showFarmerForm && (
        <FarmerApplyForm
          onClose={() => setShowFarmerForm(false)}
        />
      )}
    </>
  );
};

export default ProfileTopBar;

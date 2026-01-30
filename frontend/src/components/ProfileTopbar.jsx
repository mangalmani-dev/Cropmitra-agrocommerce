import { useAuthStore } from "../store/authStore";
import { useRef, useState, useEffect } from "react";
import FarmerApplyForm from "./FarmerApplyForm";

const ProfileTopBar = () => {
  const { user, loading, uploadProfileImage } = useAuthStore();

  const fileRef = useRef(null);
  const menuRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showFarmerForm, setShowFarmerForm] = useState(false);

  // 🔹 Close dropdown on outside click
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
      <div className="w-full border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* 🔹 LEFT: Profile Info */}
          <div className="flex items-center gap-4">

            {/* Avatar + Dropdown */}
            <div className="relative" ref={menuRef}>
              <div
                onClick={() => setShowMenu((prev) => !prev)}
                className="w-12 h-12 rounded-full border cursor-pointer overflow-hidden bg-gray-100 flex items-center justify-center font-semibold"
                title="Profile options"
              >
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{user.name?.charAt(0).toUpperCase()}</span>
                )}
              </div>

              {/* 🔽 Dropdown Menu */}
              {showMenu && (
                <div
                  className="absolute top-14 left-0 bg-white border rounded-lg shadow-md w-40 z-50 overflow-hidden"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  {user.profileImage && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowPreview(true);
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      👁 View Image
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      fileRef.current.click();
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    🔄 Change Image
                  </button>
                </div>
              )}
            </div>

            {/* Hidden file input */}
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

            {/* Name / Email / Role */}
            <div>
              <p className="font-semibold text-gray-900">
                {user.name}
              </p>
              <p className="text-sm text-gray-500">
                {user.email}
              </p>
              <p className="text-xs text-green-600 font-semibold">
                {user.role}
              </p>
            </div>
          </div>

          {/* 🔹 RIGHT: Upgrade Button */}
          <div>
            {user.role !== "farmer" ? (
              <button
                type="button"
                onClick={() => setShowFarmerForm(true)}
                disabled={loading}
                className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-green-700 disabled:opacity-50"
              >
                Upgrade to Farmer 🌾
              </button>
            ) : (
              <span className="text-green-600 font-semibold">
                Farmer ✔
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ================= IMAGE PREVIEW MODAL ================= */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 relative">
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <img
              src={user.profileImage}
              alt="profile"
              className="w-72 h-72 object-cover rounded-lg"
            />
          </div>
        </div>
      )}

      {/* ================= FARMER APPLY FORM MODAL ================= */}
      {showFarmerForm && (
        <FarmerApplyForm
          onClose={() => setShowFarmerForm(false)}
        />
      )}
    </>
  );
};

export default ProfileTopBar;

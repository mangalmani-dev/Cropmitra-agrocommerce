import { useEffect, useState } from "react";
import { useAddressStore } from "../store/addressStore";
import AddressModal from "../components/AddressModal";
import { useNavigate } from "react-router-dom";

const Addresses = () => {

  const navigate = useNavigate();

  const {
    addresses,
    fetchAddresses,
    deleteAddress,
    loading
  } = useAddressStore();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading addresses...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100">

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* 🔙 Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-green-700 font-semibold hover:underline"
        >
          ← Back
        </button>

        {/* HEADER */}
        <div className="flex justify-between items-center mb-12">

          <div>
            <h1 className="
              text-5xl
              font-extrabold
              bg-gradient-to-r from-green-600 to-emerald-500
              bg-clip-text
              text-transparent
            ">
              My Addresses
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Manage your delivery locations easily
            </p>
          </div>

          <button
            onClick={() => {
              setSelected(null);
              setOpen(true);
            }}
            className="
              bg-gradient-to-r from-green-600 to-emerald-500
              hover:from-green-700 hover:to-emerald-600
              text-white
              px-6 py-3
              rounded-xl
              shadow-lg
              hover:shadow-2xl
              transition
              font-semibold
            "
          >
            + Add Address
          </button>
        </div>

        {/* EMPTY STATE */}
        {addresses.length === 0 && (
          <div className="
            bg-white/80
            backdrop-blur-xl
            p-14
            rounded-3xl
            text-center
            shadow-lg
          ">
            <h2 className="text-3xl font-bold">
              No addresses yet 📍
            </h2>

            <p className="text-gray-500 mt-3">
              Add your first address to start ordering faster.
            </p>

            <button
              onClick={() => setOpen(true)}
              className="
                mt-8
                bg-green-600
                hover:bg-green-700
                text-white
                px-5 py-3
                rounded-xl
                shadow
                transition
              "
            >
              Add Address
            </button>
          </div>
        )}

        {/* ADDRESS GRID */}
        <div className="grid md:grid-cols-2 gap-10">

          {addresses.map((addr) => (

            <div
              key={addr._id}
              className="
                group
                relative
                bg-white/70
                backdrop-blur-xl
                border border-white/40
                rounded-3xl
                p-7
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >

              {/* DEFAULT BADGE */}
              {addr.isDefault && (
                <span className="
                  absolute top-5 right-5
                  text-xs
                  bg-gradient-to-r from-green-400 to-emerald-500
                  text-white
                  px-3 py-1
                  rounded-full
                  shadow
                ">
                  DEFAULT
                </span>
              )}

              <h2 className="text-2xl font-bold text-gray-800">
                {addr.label}
              </h2>

              <p className="font-semibold mt-3 text-lg">
                {addr.fullName}
              </p>

              <p className="text-gray-600 mt-3 leading-relaxed">
                {addr.addressLine}
              </p>

              <p className="text-gray-500">
                {addr.city}, {addr.state} - {addr.pincode}
              </p>

              <p className="mt-3 font-medium">
                📞 {addr.phone}
              </p>

              {/* ACTION BUTTONS */}
              <div className="
                flex gap-6 mt-7
                opacity-80
                group-hover:opacity-100
                transition
              ">

                <button
                  onClick={() => {
                    setSelected(addr);
                    setOpen(true);
                  }}
                  className="
                    px-4 py-2
                    rounded-lg
                    bg-blue-50
                    text-blue-600
                    hover:bg-blue-100
                    transition
                    font-medium
                  "
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => deleteAddress(addr._id)}
                  className="
                    px-4 py-2
                    rounded-lg
                    bg-red-50
                    text-red-600
                    hover:bg-red-100
                    transition
                    font-medium
                  "
                >
                  🗑 Delete
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* MODAL */}
      {open && (
        <AddressModal
          selected={selected}
          onClose={() => setOpen(false)}
        />
      )}

    </div>
  );
};

export default Addresses;

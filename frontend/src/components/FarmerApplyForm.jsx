import { useState } from "react";
import { useFarmerStore } from "../store/farmerStore";

const FarmerApplyForm = ({ onClose }) => {
  const { applyFarmer, loading } = useFarmerStore();

  const [form, setForm] = useState({
    farmName: "",
    location: "",
    licenseNumber: "",
  });

 const submitHandler = async (e) => {
  e.preventDefault(); // 🔥 MUST BE FIRST LINE
  e.stopPropagation();


  console.log("SUBMIT HANDLER CALLED", form);

  try {
    const res = await applyFarmer(form);
    onClose();
  } catch (err) {
    console.log("ERROR OBJECT", err);

  }
};
;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold">Apply as Farmer 🌾</h2>

        <input
          type="text"
          placeholder="Farm Name"
          required
          value={form.farmName}
          onChange={(e) =>
            setForm({ ...form, farmName: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Location"
          required
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="License Number (optional)"
          value={form.licenseNumber}
          onChange={(e) =>
            setForm({ ...form, licenseNumber: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FarmerApplyForm;

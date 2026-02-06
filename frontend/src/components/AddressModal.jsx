import { useState, useEffect } from "react";
import { useAddressStore } from "../store/addressStore";

const AddressModal = ({ selected, onClose }) => {

  const { addAddress, updateAddress } = useAddressStore();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    label: "Home",
    isDefault: false
  });

  useEffect(() => {
    if (selected) {
      setForm(selected);
    }
  }, [selected]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async () => {

    let success;

    if (selected) {
      success = await updateAddress(selected._id, form);
    } else {
      success = await addAddress(form);
    }

    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white p-8 rounded-3xl w-[500px]">

        <h2 className="text-2xl font-bold mb-6">
          {selected ? "Edit Address" : "Add Address"}
        </h2>

        <div className="grid gap-4">

          <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} className="border p-2 rounded" />

          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="border p-2 rounded" />

          <input name="addressLine" placeholder="Address Line" value={form.addressLine} onChange={handleChange} className="border p-2 rounded" />

          <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="border p-2 rounded" />

          <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="border p-2 rounded" />

          <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} className="border p-2 rounded" />

          <select
            name="label"
            value={form.label}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option>Home</option>
            <option>Farm</option>
            <option>Work</option>
            <option>Other</option>
          </select>

          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              name="isDefault"
              checked={form.isDefault}
              onChange={handleChange}
            />
            Set as default
          </label>

        </div>

        <div className="flex justify-end gap-4 mt-6">

          <button onClick={onClose}>
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
};

export default AddressModal;

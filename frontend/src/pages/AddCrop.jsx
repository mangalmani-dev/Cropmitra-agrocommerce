import { useState } from "react";
import { useCropStore } from "../store/useCropStore";

const AddCrop = () => {

  const { addCrop, loading } = useCropStore();

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    quantity: "",
    unit: "",
    price: "",
    discount: "",
    expiryDate: "",
    organic: false,
    location: ""
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(form).forEach(key => {
      data.append(key, form[key]);
    });

    if (image) data.append("image", image);

    await addCrop(data);
  };

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">

        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          🌾 Add New Crop
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Crop Name */}
          <input
            name="name"
            placeholder="Crop Name"
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-green-500"
          />

          {/* Category */}
          <input
            name="category"
            placeholder="Category"
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-green-500"
          />

          {/* Quantity */}
          <input
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-green-500"
          />

          {/* Unit */}
          <input
            name="unit"
            placeholder="Unit (Kg / Ton)"
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-green-500"
          />

          {/* Price */}
          <input
            name="price"
            placeholder="Price"
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-green-500"
          />

          {/* Discount */}
          <input
            name="discount"
            placeholder="Discount %"
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-green-500"
          />

          {/* Expiry Date */}
          <input
            type="date"
            name="expiryDate"
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-green-500"
          />

          {/* Location */}
          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-green-500"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2 focus:outline-green-500"
          />

          {/* Organic */}
          <label className="flex items-center gap-2 md:col-span-2">
            <input
              type="checkbox"
              name="organic"
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span className="font-medium">Organic Crop</span>
          </label>

          {/* Image Upload */}
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="md:col-span-2 border p-2 rounded-lg"
          />

          {/* Submit Button */}
          <button
            disabled={loading}
            className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Adding Crop..." : "Add Crop 🌱"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddCrop;

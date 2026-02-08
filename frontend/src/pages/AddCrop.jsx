import { useState } from "react";
import { useFarmerCropStore } from "../store/farmerCropStore";

const CATEGORY_OPTIONS = [
  "fruit",
  "vegetable",
  "grain",
  "pulse",
  "other"
];

const AddCrop = () => {

  const { addCrop, addLoading } = useFarmerCropStore();

  const initialState = {
    name: "",
    category: "",
    description: "",
    quantity: "",
    unit: "kg",
    price: "",
    discount: "",
    expiryDate: "",
    organic: false,
    location: ""
  };

  const [form, setForm] = useState(initialState);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {

      // convert numbers properly
      if (["quantity", "price", "discount"].includes(key)) {
        data.append(key, Number(value));
      } else {
        data.append(key, value);
      }

    });

    if (image) {
      data.append("image", image);
    }

    const success = await addCrop(data);

    if(success){
      setForm(initialState);
      setImage(null);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">

        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          🌾 Add New Crop
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          {/* Name */}
          <input
            name="name"
            value={form.name}
            placeholder="Crop Name"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          {/* Category */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          >
            <option value="">Select Category</option>

            {CATEGORY_OPTIONS.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}

          </select>

          {/* Quantity */}
          <input
            name="quantity"
            type="number"
            value={form.quantity}
            placeholder="Quantity"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          {/* Unit */}
          <select
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="kg">kg</option>
            <option value="ton">ton</option>
            <option value="quintal">quintal</option>
          </select>

          {/* Price */}
          <input
            name="price"
            type="number"
            value={form.price}
            placeholder="Price"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          {/* Discount */}
          <input
            name="discount"
            type="number"
            value={form.discount}
            placeholder="Discount %"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          {/* Expiry */}
          <input
            type="date"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          {/* Location */}
          <input
            name="location"
            value={form.location}
            placeholder="Location"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            value={form.description}
            placeholder="Description"
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

          {/* Organic */}
          <label className="flex items-center gap-2 md:col-span-2">
            <input
              type="checkbox"
              name="organic"
              checked={form.organic}
              onChange={handleChange}
            />
            Organic Crop
          </label>

          {/* Image */}
          <input
            type="file"
            accept="image/*"
            onChange={(e)=>setImage(e.target.files[0])}
            className="md:col-span-2 border p-2 rounded-lg"
          />

          {/* Submit */}
          <button
            disabled={addLoading}
            className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
          >
            {addLoading ? "Adding Crop..." : "Add Crop 🌱"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddCrop;

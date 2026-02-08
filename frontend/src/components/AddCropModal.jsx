import React, { useState, useRef } from 'react';
import { useFarmerCropStore } from '../store/farmerCropStore';

const AddCropModal = () => {

  const { addCrop, addLoading } = useFarmerCropStore();
  const modalRef = useRef(null);

  const initialState = {
    name: '',
    cropType: '',
    pricePerUnit: '',
    unitType: 'kg',
    quantityAvailable: '',
    location: '',
    description: ''
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await addCrop(formData);

    if (success) {
      modalRef.current.close();
      setFormData(initialState);
    }
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box max-w-2xl">

        <h3 className="font-bold text-lg mb-4">
          List New Harvest for Sale
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          {/* Crop Name */}
          <div>
            <label className="text-xs font-bold">Crop Name</label>
            <input
              type="text"
              placeholder="e.g. Alphonso Mango"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={(e)=>handleChange("name", e.target.value)}
              required
            />
          </div>

          {/* Crop Type */}
          <div>
            <label className="text-xs font-bold">Crop Type</label>
            <select
              className="select select-bordered"
              value={formData.cropType}
              onChange={(e)=>handleChange("cropType", e.target.value)}
              required
            >
              <option value="">Select Type</option>
              <option value="fruit">Fruit</option>
              <option value="vegetable">Vegetable</option>
              <option value="grain">Grain</option>
              <option value="pulse">Pulse</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="text-xs font-bold">Price per Unit (₹)</label>
            <input
              type="number"
              className="input input-bordered"
              value={formData.pricePerUnit}
              onChange={(e)=>handleChange("pricePerUnit", e.target.value)}
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="text-xs font-bold">Quantity Available</label>

            <div className="join w-full">
              <input
                type="number"
                className="input input-bordered join-item w-full"
                value={formData.quantityAvailable}
                onChange={(e)=>handleChange("quantityAvailable", e.target.value)}
                required
              />

              <select
                className="select select-bordered join-item"
                value={formData.unitType}
                onChange={(e)=>handleChange("unitType", e.target.value)}
              >
                <option value="kg">kg</option>
                <option value="ton">ton</option>
                <option value="quintal">quintal</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <label className="text-xs font-bold">
              Farm Location / Pickup Point
            </label>

            <input
              type="text"
              placeholder="Area, City"
              className="input input-bordered"
              value={formData.location}
              onChange={(e)=>handleChange("location", e.target.value)}
              required
            />
          </div>

          {/* Actions */}
          <div className="modal-action md:col-span-2">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={()=>modalRef.current.close()}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-success text-white px-8"
              disabled={addLoading}
            >
              {addLoading ? "Listing..." : "List Crop"}
            </button>
          </div>

        </form>
      </div>
    </dialog>
  );
};

export default AddCropModal;

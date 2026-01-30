import React, { useState } from 'react';
import { useCropStore } from '../store/useCropStore';

const AddCropModal = () => {
  const { addCrop, loading } = useCropStore();
  const [formData, setFormData] = useState({
    name: '',
    cropType: '',
    pricePerUnit: '',
    unitType: 'kg',
    quantityAvailable: '',
    location: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addCrop(formData);
    if (success) {
      document.getElementById('add_crop_modal').close();
      setFormData({ name: '', cropType: '', pricePerUnit: '', unitType: 'kg', quantityAvailable: '', location: '', description: '' });
    }
  };

  return (
    <dialog id="add_crop_modal" className="modal">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-4">List New Harvest for Sale</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="form-control">
            <label className="label text-xs font-bold">Crop Name</label>
            <input type="text" placeholder="e.g. Alphonso Mango" className="input input-bordered w-full" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          </div>

          <div className="form-control">
            <label className="label text-xs font-bold">Crop Type</label>
            <select className="select select-bordered" onChange={(e) => setFormData({...formData, cropType: e.target.value})} required>
              <option value="">Select Type</option>
              <option value="Fruit">Fruit</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Grain">Grain</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label text-xs font-bold">Price per Unit (₹)</label>
            <input type="number" className="input input-bordered" 
              onChange={(e) => setFormData({...formData, pricePerUnit: e.target.value})} required />
          </div>

          <div className="form-control">
            <label className="label text-xs font-bold">Quantity Available</label>
            <div className="join w-full">
              <input type="number" className="input input-bordered join-item w-full" 
                onChange={(e) => setFormData({...formData, quantityAvailable: e.target.value})} required />
              <select className="select select-bordered join-item" onChange={(e) => setFormData({...formData, unitType: e.target.value})}>
                <option value="kg">kg</option>
                <option value="ton">ton</option>
                <option value="quintal">quintal</option>
              </select>
            </div>
          </div>

          <div className="form-control md:col-span-2">
            <label className="label text-xs font-bold">Farm Location / Pickup Point</label>
            <input type="text" placeholder="Area, City" className="input input-bordered" 
              onChange={(e) => setFormData({...formData, location: e.target.value})} required />
          </div>

          <div className="modal-action md:col-span-2">
            <button type="button" className="btn btn-ghost" onClick={() => document.getElementById('add_crop_modal').close()}>Cancel</button>
            <button type="submit" className="btn btn-success text-white px-8" disabled={loading}>
              {loading ? "Listing..." : "List Crop"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddCropModal;
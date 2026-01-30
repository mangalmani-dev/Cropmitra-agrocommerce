import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useCropStore = create((set) => ({
  crops: [],
  loading: false,

  fetchFarmerCrops: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/crops/my-crops");
      // Accessing res.data.crops based on your controller
      set({ crops: res.data.crops || [] });
    } catch (err) {
      set({ crops: [] });
    } finally {
      set({ loading: false });
    }
  },

  addCrop: async (formData) => {
    set({ loading: true });
    try {
      // Note: Use multipart/form-data if uploading images
      const res = await axiosInstance.post("/crops", formData); 
      set((state) => ({ crops: [res.data.crop, ...state.crops] }));
      toast.success("Crop added to supply chain!");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add crop");
      return false;
    } finally {
      set({ loading: false });
    }
  },
  
  // Logic for deleting
  deleteCrop: async (id) => {
    try {
      await axiosInstance.delete(`/crops/${id}`);
      set((state) => ({ crops: state.crops.filter(c => c._id !== id) }));
      toast.success("Crop removed");
    } catch (err) {
      toast.error("Delete failed");
    }
  }
}));
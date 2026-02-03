import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useCropStore = create((set) => ({

  crops: [],
  loading: false,

  // ✅ Fetch Farmer Crops
  fetchFarmerCrops: async () => {
    set({ loading: true });

    try {
      const res = await axiosInstance.get("/crops/me");

      set({
        crops: res.data || []
      });

    } catch (err) {
      set({ crops: [] });
      toast.error("Failed to fetch crops");
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Add Crop (FormData Required)
  addCrop: async (formData) => {
    set({ loading: true });

    try {

      const res = await axiosInstance.post(
        "/crops/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      set((state) => ({
        crops: [res.data.crop, ...state.crops]
      }));

      toast.success("Crop added successfully 🌾");
      return true;

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to add crop"
      );
      return false;

    } finally {
      set({ loading: false });
    }
  },

  // ✅ Delete Crop
  deleteCrop: async (id) => {
    try {

      await axiosInstance.delete(`/crops/${id}`);

      set((state) => ({
        crops: state.crops.filter((c) => c._id !== id)
      }));

      toast.success("Crop deleted");

    } catch (err) {
      toast.error("Delete failed");
    }
  }

}));

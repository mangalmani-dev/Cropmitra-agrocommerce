import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useFarmerStore = create((set) => ({
  loading: false,
  farmerProfile: null,
  farmerRequests: [],
  earnings: null,
  error: null,

  // ================= APPLY FARMER =================
  applyFarmer: async (data) => {
    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.post("/farmer/apply", data);

      set({
        farmerProfile: res.data.farmerProfile,
        loading: false,
      });

      // ✅ SUCCESS TOAST
      toast.success("Farmer application submitted successfully 🌾");

      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || "Apply farmer failed";

      set({
        loading: false,
        error: message,
      });

      // ❌ ERROR TOAST
      toast.error(message);

      throw err;
    }
  },

  // ================= GET MY FARMER PROFILE =================
  getMyFarmerProfile: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/farmer/me");
      set({
        farmerProfile: res.data.profile,
        loading: false,
      });
    } catch (err) {
      set({ loading: false });
    }
  },

  // ================= ADMIN: GET FARMER REQUESTS =================
  getFarmerRequests: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/farmer/requests");
      set({
        farmerRequests: res.data.requests,
        loading: false,
      });
    } catch (err) {
      set({ loading: false });
    }
  },

  // ================= ADMIN: APPROVE FARMER =================
  approveFarmer: async (farmerId) => {
    set({ loading: true });
    try {
      await axiosInstance.patch(`/farmer/approve/${farmerId}`);

      toast.success("Farmer approved successfully ✅");

      set((state) => ({
        farmerRequests: state.farmerRequests.filter(
          (f) => f._id !== farmerId
        ),
        loading: false,
      }));
    } catch (err) {
      toast.error("Failed to approve farmer");
      set({ loading: false });
    }
  },

  // ================= FARMER: EARNINGS =================
  getFarmerEarnings: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/farmer/earnings");
      set({
        earnings: res.data,
        loading: false,
      });
    } catch (err) {
      set({ loading: false });
    }
  },
}));

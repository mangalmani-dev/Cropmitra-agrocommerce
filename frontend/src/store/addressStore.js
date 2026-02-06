import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useAddressStore = create((set, get) => ({

  addresses: [],
  loading: false,

  // =========================
  // ✅ FETCH ALL ADDRESSES
  // =========================
  fetchAddresses: async () => {

    set({ loading: true });

    try {

      const res = await axiosInstance.get("/address");

      set({ addresses: res.data });

    } catch (err) {

      toast.error("Failed to load addresses");

    } finally {

      set({ loading: false });
    }
  },

  // =========================
  // ✅ ADD ADDRESS
  // =========================
  addAddress: async (data) => {

    try {

      const res = await axiosInstance.post("/address", data);

      set({
        addresses: [res.data, ...get().addresses]
      });

      toast.success("Address added");

      return true;

    } catch (err) {

      toast.error(err.response?.data?.message || "Failed to add address");

      return false;
    }
  },

  // =========================
  // ✅ UPDATE ADDRESS
  // =========================
  updateAddress: async (id, data) => {

    try {

      const res = await axiosInstance.put(`/address/${id}`, data);

      set({
        addresses: get().addresses.map(addr =>
          addr._id === id ? res.data : addr
        )
      });

      toast.success("Address updated");

      return true;

    } catch (err) {

      toast.error("Update failed");

      return false;
    }
  },

  // =========================
  // ✅ DELETE ADDRESS
  // =========================
  deleteAddress: async (id) => {

    try {

      await axiosInstance.delete(`/address/${id}`);

      set({
        addresses: get().addresses.filter(
          addr => addr._id !== id
        )
      });

      toast.success("Address deleted");

    } catch (err) {

      toast.error("Delete failed");
    }
  },

}));

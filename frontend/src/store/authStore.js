// src/store/authStore.js
import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,

  // 🔹 Helper to update user from anywhere
  setUser: (user) => set({ user }),

  // ✅ Register
  register: async (data) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ user: res.data.user });
      toast.success(res.data.message || "Registered successfully");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Login
  login: async (data) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ user: res.data.user });
      toast.success(res.data.message || "Logged in successfully!");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Logout
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error("Logout failed");
    }
  },

  // ✅ Fetch current user
  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/auth/me");
      set({ user: res.data.user });
    } catch (err) {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  // 🌾 Upgrade to farmer
  upgradeToFarmer: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/users/upgrade-to-farmer");
      set({ user: res.data.user });
      toast.success("Upgraded to Farmer 🌾");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Upgrade failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // 🖼️ Upload Profile Image (NEW)
  uploadProfileImage: async (file) => {
    set({ loading: true });
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axiosInstance.post(
        "/auth/upload-profile",
        formData
      );

      set({ user: res.data.user });
      toast.success("Profile image updated");
      return true;
    } catch (err) {
      toast.error("Image upload failed");
      return false;
    } finally {
      set({ loading: false });
    }
  }
}));

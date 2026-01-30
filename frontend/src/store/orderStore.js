import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useOrderStore = create((set) => ({
  loading: false,
  orders: [],

  // 🛒 Place Order
  placeOrder: async (cart, clearCart, navigate) => {
    set({ loading: true });
    try {
      const items = cart.map((item) => ({
        crop: item.crop._id,
        quantity: item.quantity,
      }));

      await axiosInstance.post("/orders/place", { items });

      toast.success("Order placed successfully 🌾");
      clearCart();
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Order failed");
    } finally {
      set({ loading: false });
    }
  },

  // 👤 My Orders (for Profile)
  fetchMyOrders: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/orders/my");
      set({ orders: res.data.orders });
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      set({ loading: false });
    }
  },
}));

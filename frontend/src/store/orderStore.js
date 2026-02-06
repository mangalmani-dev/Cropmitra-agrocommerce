import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useOrderStore = create((set) => ({

  loading: false,
  orders: [],


  // ⭐ PLACE ORDER
  placeOrder: async (orderData) => {

    set({ loading: true });

    try {

      const res = await axiosInstance.post(
        "/orders/place",
        orderData
      );

      toast.success("Order placed successfully 🌾");

      return res.data; // ⭐ VERY IMPORTANT

    } catch (error) {

      toast.error(
        error.response?.data?.message || error.message
      );

      return null; // ⭐ VERY IMPORTANT
    }

    finally {
      set({ loading: false });
    }
  },



  // ⭐ FETCH MY ORDERS
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

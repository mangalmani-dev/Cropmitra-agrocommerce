import { create } from "zustand";
import { axiosInstance } from "../libs/axios";

export const useFarmerOrderStore = create((set) => ({
  orders: [],
  loading: false,
  error: null,

  //----------------------------------
  // FETCH FARMER ORDERS
  //----------------------------------
  fetchFarmerOrders: async () => {
    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.get("/orders/farmer");

      set({
        orders: res.data.orders,
        loading: false,
      });

    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch orders",
        loading: false,
      });
    }
  },

  //----------------------------------
  // UPDATE ORDER STATUS
  //----------------------------------
  updateStatus: async (orderId, status) => {
    try {

      await axiosInstance.patch(`/orders/${orderId}/status`, {
        status,
      });

      // ✅ Instant UI update (VERY IMPORTANT)
      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === orderId
            ? { ...order, status }
            : order
        ),
      }));

    } catch (err) {
      console.error("Status update failed");
    }
  },
}));

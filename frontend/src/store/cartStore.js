import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  // 🛒 CART DATA
  cart: [],
  loading: false,

  // 🟢 CART MODAL (CENTER POPUP)
  cartModalOpen: false,
  openCartModal: () => set({ cartModalOpen: true }),
  closeCartModal: () => set({ cartModalOpen: false }),

  // 🔢 Total items (quantity based)
  cartCount: () =>
    get().cart.reduce((sum, item) => sum + item.quantity, 0),

  // ✅ Fetch cart
  fetchCart: async () => {
    try {
      const res = await axiosInstance.get("/cart/me");
      set({ cart: res.data.items });
    } catch (err) {
      console.error("Fetch cart failed");
    }
  },

  // ✅ Add to cart (ONLY cropId + quantity)
  addToCart: async (cropId, quantity = 1) => {
    set({ loading: true });
    try {
      await axiosInstance.post("/cart/add", {
        cropId,
        quantity,
      });

      // refresh cart from backend
      await get().fetchCart();

      // 🔥 OPEN CART MODAL (shows ALL items)
      get().openCartModal();

      toast.success("Add items in cart");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Update quantity
  updateQuantity: async (cropId, quantity) => {
    try {
      await axiosInstance.patch("/cart/update", {
        cropId,
        quantity,
      });
      await get().fetchCart();
    } catch {
      toast.error("Failed to update quantity");
    }
  },

  // ✅ Remove item
  removeItem: async (cropId) => {
    try {
      await axiosInstance.delete(`/cart/remove/${cropId}`);
      toast.success("Removed from cart");
      await get().fetchCart();
    } catch {
      toast.error("Failed to remove item");
    }
  },

  // ✅ Clear cart
  clearCart: async () => {
    try {
      await axiosInstance.delete("/cart/clear");
      set({ cart: [] });
    } catch {
      toast.error("Failed to clear cart");
    }
  },
}));

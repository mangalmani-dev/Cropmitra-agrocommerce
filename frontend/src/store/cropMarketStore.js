import { create } from "zustand";
import { axiosInstance } from "../libs/axios";

export const useCropMarketStore = create((set, get) => ({
  crops: [],
  loading: false,
  error: null,

  //---------------- PAGINATION ----------------
  page: 1,
  totalPages: 1,

  //---------------- FILTERS ----------------
  search: "",
  category: "all",
  organic: "all",
  priceSort: "none",

  //---------------- FETCH ----------------
  fetchCrops: async () => {
    set({ loading: true, error: null });

    try {
      const { search, category, organic, priceSort, page } = get();

      const params = { page };

      if (search) params.search = search;
      if (category !== "all") params.category = category;
      if (organic !== "all") params.organic = organic;
      if (priceSort !== "none") params.sort = priceSort;

      const res = await axiosInstance.get("/crops", { params });

      set({
        crops: res.data.crops,
        totalPages: res.data.totalPages,
      });

    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch crops",
      });
    } finally {
      set({ loading: false });
    }
  },

  //---------------- PAGE ----------------
  setPage: (value) => {
    set({ page: value });
    get().fetchCrops();
  },

  //---------------- FILTER SETTERS ----------------
  // ⭐ ALWAYS RESET PAGE TO 1

  setSearch: (value) => {
    set({ search: value, page: 1 });
    get().fetchCrops();
  },

  setCategory: (value) => {
    set({ category: value, page: 1 });
    get().fetchCrops();
  },

  setOrganic: (value) => {
    set({ organic: value, page: 1 });
    get().fetchCrops();
  },

  setPriceSort: (value) => {
    set({ priceSort: value, page: 1 });
    get().fetchCrops();
  },
}));

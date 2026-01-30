import { create } from "zustand";
import { axiosInstance } from "../libs/axios";

export const useCropStore = create((set, get) => ({
  crops: [],
  loading: false,
  error: null,

  // filters
  search: "",
  category: "All",
  organic: "All", // All | true | false
  priceSort: "none", // none | lowToHigh | highToLow

  // fetch crops
  fetchCrops: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/crops");
      set({ crops: res.data, loading: false });
    } catch (err) {
      set({ error: "Failed to load crops", loading: false });
    }
  },

  // setters
  setSearch: (value) => set({ search: value }),
  setCategory: (value) => set({ category: value }),
  setOrganic: (value) => set({ organic: value }),
  setPriceSort: (value) => set({ priceSort: value }),

  // filtered crops (derived state)
  filteredCrops: () => {
    const { crops, search, category, organic, priceSort } = get();

    let data = [...crops];

    // 🔍 search
    if (search) {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🏷 category
    if (category !== "All") {
      data = data.filter((c) => c.category === category);
    }

    // 🌱 organic
    if (organic !== "All") {
      data = data.filter((c) => c.organic === (organic === "true"));
    }

    // 💰 price sort
    if (priceSort === "lowToHigh") {
      data.sort((a, b) => a.price - b.price);
    } else if (priceSort === "highToLow") {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  },
}));

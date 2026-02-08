import { useCropMarketStore } from "../store/cropMarketStore";

const CATEGORY_OPTIONS = [
  { label: "All Categories", value: "all" },
  { label: "Fruits", value: "fruits" },
  { label: "Vegetables", value: "vegetable" },
  { label: "Grains", value: "grain" },
  { label: "Pulse", value: "pulse" },
  { label: "Other", value: "other" },
];

const CropFilters = () => {
  const {
    search,
    setSearch,
    category,
    setCategory,
    organic,
    setOrganic,
    priceSort,
    setPriceSort,
  }  = useCropMarketStore();

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-6 grid gap-4 md:grid-cols-4">
      
      {/* Search */}
      <input
        type="text"
        placeholder="Search crops..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-3 py-2"
      />

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        {CATEGORY_OPTIONS.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      {/* Organic */}
      <select
        value={organic}
        onChange={(e) => setOrganic(e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        <option value="all">All</option>
        <option value="true">Organic</option>
        <option value="false">Non-Organic</option>
      </select>

      {/* Price sort */}
      <select
        value={priceSort}
        onChange={(e) => setPriceSort(e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        <option value="none">Sort by Price</option>
        <option value="lowToHigh">Low → High</option>
        <option value="highToLow">High → Low</option>
      </select>
    </div>
  );
};

export default CropFilters;

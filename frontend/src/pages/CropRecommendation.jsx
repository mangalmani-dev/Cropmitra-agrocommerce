
import { useState, useMemo } from "react";
import dummyCropData from "../data/dummyCropData";
import DummyCropCards from "../components/DummyCropCards";

const FILTERS = [
  "All",
  "Wheat",
  "Cotton",
  "Rice",
  "Potato",
  "Tomato",
  "Soybean",
];

function StatCard({ label, value }) {
  return (
    <div
      className="
        bg-white/80
        backdrop-blur-xl
        rounded-3xl
        p-6
        shadow-lg
        border border-white/40
        hover:shadow-2xl
        transition-all
      "
    >
      <p className="text-sm text-gray-500">{label}</p>
      <h2 className="text-3xl font-bold text-green-700 mt-2">{value}</h2>
    </div>
  );
}

export default function CropRecommendation() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQ, setSearchQ] = useState("");

  const filtered = useMemo(() => {
    return dummyCropData.filter((item) => {
      const matchFilter =
        activeFilter === "All" || item.crop === activeFilter;

      const matchSearch =
        !searchQ ||
        item.crop.toLowerCase().includes(searchQ.toLowerCase()) ||
        item.district.toLowerCase().includes(searchQ.toLowerCase());

      return matchFilter && matchSearch;
    });
  }, [activeFilter, searchQ]);

  const avgScore = Math.round(
    dummyCropData.reduce((a, b) => a + b.score, 0) /
      dummyCropData.length
  );

  const totalProfit = dummyCropData.reduce(
    (a, b) => a + b.profit,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
          <div>
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              Crop Recommendation
            </h1>
            <p className="text-gray-500 mt-3 text-lg">
              AI-powered crop suggestions for your farm
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl px-5 py-3">
            <span className="text-green-700 font-semibold">
              🌱 Analysing soil & climate
            </span>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <StatCard
            label="Total Recommendations"
            value={dummyCropData.length}
          />
          <StatCard
            label="Average Score"
            value={`${avgScore}%`}
          />
          <StatCard
            label="Est. Total Profit"
            value={`₹${Math.round(totalProfit / 1000)}k`}
          />
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 mb-8 items-center">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full transition ${
                activeFilter === filter
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white shadow text-gray-700"
              }`}
            >
              {filter}
            </button>
          ))}

          <input
            type="text"
            placeholder="Search crop or district..."
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            className="
              ml-auto
              px-4 py-2
              rounded-xl
              border
              shadow
              outline-none
              w-72
            "
          />
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <DummyCropCards key={item.id} crop={item} />
          ))}
        </div>
      </div>
    </div>
  );
}


import { useTranslation } from "react-i18next";



function DummyCropCards({ crop }) {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold">
        🌾 {crop.crop}
      </h2>

      <p className="text-gray-500 mt-2">
        📍 {crop.district} • {crop.landType}
      </p>

      <div className="mt-4">
        <p>🌱 Soil: {crop.soil}</p>
        <p>☀ Season: {crop.season}</p>
        <p>💧 Water: {crop.water}</p>
        <p>📈 Yield: {crop.yield} t</p>
        <p>💰 Profit: ₹{crop.profit}</p>
      </div>
    </div>
  );
}

export default DummyCropCards;


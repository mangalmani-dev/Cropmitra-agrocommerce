import React, { useEffect } from "react";
import { useFarmerStore } from "../store/farmerStore";
import { useTranslation } from "react-i18next";

const FarmerEarnings = () => {
  const { t } = useTranslation();
  const { earnings, loading, error, getFarmerEarnings } = useFarmerStore();

  useEffect(() => {
    getFarmerEarnings();
  }, []);

  // 🔄 Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-500 animate-pulse">
          {t("earningsPage.loading")}
        </p>
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  const total = earnings?.totalEarnings || 0;
  const history = earnings?.earningsHistory || [];

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          💰 {t("earningsPage.title")}
        </h1>
        <p className="text-gray-500 mt-1">
          {t("earningsPage.subtitle")}
        </p>
      </div>

      {/* 💰 STATS */}
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-100 p-6 rounded-2xl shadow">
          <h3 className="text-gray-600">
            {t("earningsPage.totalEarnings")}
          </h3>
          <p className="text-2xl font-bold text-green-700 mt-2">
            ₹{total}
          </p>
        </div>

        <div className="bg-blue-100 p-6 rounded-2xl shadow">
          <h3 className="text-gray-600">
            {t("earningsPage.totalOrders")}
          </h3>
          <p className="text-2xl font-bold text-blue-700 mt-2">
            {history.length}
          </p>
        </div>
      </div>

      {/* 📜 HISTORY */}
      <h2 className="text-xl font-semibold mb-4">
        {t("earningsPage.historyTitle")}
      </h2>

      {history.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          {t("earningsPage.empty")}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="p-4">
                  {t("earningsPage.table.date")}
                </th>
                <th className="p-4">
                  {t("earningsPage.table.amount")}
                </th>
                <th className="p-4">
                  {t("earningsPage.table.status")}
                </th>
              </tr>
            </thead>

            <tbody>
              {history.map((item, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4 font-semibold">
                    ₹{item.amount}
                  </td>

                  <td
                    className={`p-4 font-medium ${
                      item.status === "DELIVERED"
                        ? "text-green-600"
                        : "text-yellow-500"
                    }`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FarmerEarnings;
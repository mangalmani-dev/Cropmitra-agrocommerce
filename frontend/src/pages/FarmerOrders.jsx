import { useEffect } from "react";
import { useFarmerOrderStore } from "../store/farmerOrderStore";
import ProfileTopBar from "../components/ProfileTopbar";
import { useTranslation } from "react-i18next";

const FarmerOrders = () => {
  const {
    orders = [],
    loading,
    fetchFarmerOrders,
    updateStatus,
  } = useFarmerOrderStore();

  const { t } = useTranslation();

  useEffect(() => {
    fetchFarmerOrders();
  }, []);

  //----------------------------------

  if (loading) {
    return (
      <div className="flex justify-center mt-40 text-xl font-semibold">
        {t("farmerOrdersPage.loading")}
      </div>
    );
  }

  //----------------------------------

  if (!orders?.length) {
    return (
      <div className="flex justify-center mt-40 text-gray-500 text-xl">
        {t("farmerOrdersPage.empty")}
      </div>
    );
  }

  //----------------------------------

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      
      <ProfileTopBar />

      <div className="max-w-7xl mx-auto p-10">

        {/* HEADER */}
        <h1 className="text-5xl font-bold mb-12 bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent">
          {t("farmerOrdersPage.title")}
        </h1>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-8 mb-14">

          <StatCard title={t("farmerOrdersPage.stats.total")} value={orders.length} />

          <StatCard
            title={t("farmerOrdersPage.stats.placed")}
            value={orders.filter(o => o.status === "PLACED").length}
          />

          <StatCard
            title={t("farmerOrdersPage.stats.confirmed")}
            value={orders.filter(o => o.status === "CONFIRMED").length}
          />

          <StatCard
            title={t("farmerOrdersPage.stats.delivered")}
            value={orders.filter(o => o.status === "DELIVERED").length}
          />

        </div>

        {/* ORDERS */}
        <div className="space-y-8">
          {orders.map((order) => (

            <div
              key={order._id}
              className="relative bg-white/80 backdrop-blur-md border border-gray-200 p-7 rounded-3xl shadow-md hover:shadow-2xl transition hover:-translate-y-1"
            >

              <div className="absolute left-0 top-0 h-full w-2 bg-green-500 rounded-l-3xl"/>

              <div className="flex justify-between items-start">

                <div>
                  <p className="font-semibold text-xl text-gray-800">
                    Order #{order._id.slice(-6)}
                  </p>

                  <p className="text-gray-500">
                    {t("farmerOrdersPage.buyer")}: {order.buyer?.name}
                  </p>

                  <p className="text-gray-400 text-sm mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-green-600 text-2xl">
                    ₹{order.totalAmount}
                  </p>

                  <StatusBadge status={order.status} />
                </div>

              </div>

              <hr className="my-5"/>

              <div className="space-y-1">
                {order.items.map((item) => (
                  <p key={item._id} className="text-gray-700">
                    🌾 {item.crop?.name} × {item.quantity}
                  </p>
                ))}
              </div>

              <div className="flex justify-end gap-4 mt-6">

                {order.status === "PLACED" && (
                  <ActionButton
                    label={t("farmerOrdersPage.actions.confirm")}
                    color="bg-green-600 hover:bg-green-700"
                    onClick={() => updateStatus(order._id, "CONFIRMED")}
                  />
                )}

                {order.status === "CONFIRMED" && (
                  <ActionButton
                    label={t("farmerOrdersPage.actions.ship")}
                    color="bg-blue-600 hover:bg-blue-700"
                    onClick={() => updateStatus(order._id, "SHIPPED")}
                  />
                )}

                {order.status === "SHIPPED" && (
                  <ActionButton
                    label={t("farmerOrdersPage.actions.deliver")}
                    color="bg-purple-600 hover:bg-purple-700"
                    onClick={() => updateStatus(order._id, "DELIVERED")}
                  />
                )}

              </div>

            </div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmerOrders;

// STAT CARD
const StatCard = ({ title, value }) => (
  <div className="bg-white/70 backdrop-blur-lg border border-white/40 p-6 rounded-3xl shadow-md hover:shadow-xl transition hover:-translate-y-1">
    <p className="text-gray-500 text-sm mb-1">{title}</p>
    <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
  </div>
);

// STATUS BADGE
const StatusBadge = ({ status }) => {
  const { t } = useTranslation();

  const styles = {
    PLACED: "bg-yellow-100 text-yellow-700",
    CONFIRMED: "bg-blue-100 text-blue-700",
    SHIPPED: "bg-indigo-100 text-indigo-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <span className={`${styles[status]} px-4 py-1.5 rounded-full text-xs font-bold mt-2 inline-block`}>
      {t(`orderStatus.${status}`)}
    </span>
  );
};

// BUTTON
const ActionButton = ({ label, color, onClick }) => (
  <button
    onClick={onClick}
    className={`${color} text-white px-5 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition hover:scale-105`}
  >
    {label}
  </button>
);
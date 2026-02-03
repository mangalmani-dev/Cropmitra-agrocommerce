import { useEffect } from "react";
import { useAdminStore } from "../store/adminStore";

const AdminOrders = () => {

 const { orders, fetchOrders, loading } = useAdminStore();

 useEffect(()=>{
   fetchOrders();
 },[]);

 if(loading) return <h1>Loading Orders...</h1>;

 const totalRevenue = orders?.reduce(
   (acc,order)=> acc + order.totalPrice,0
 );

 return (

<div className="p-6 bg-gradient-to-br from-slate-100 to-slate-200 min-h-screen">

{/* 🔥 HEADER */}
<div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500
text-white p-8 rounded-3xl shadow-xl mb-8">

<h1 className="text-3xl font-bold">
 📦 Orders Management
</h1>

<p className="opacity-90">
Track platform orders and monitor revenue.
</p>

</div>


{/* 🔥 STATS CARDS */}
<div className="grid grid-cols-3 gap-6 mb-8">

<div className="bg-white p-6 rounded-2xl shadow-lg">
<p className="text-gray-500">Total Orders</p>
<h2 className="text-3xl font-bold">
{orders?.length || 0}
</h2>
</div>

<div className="bg-white p-6 rounded-2xl shadow-lg">
<p className="text-gray-500">Revenue</p>
<h2 className="text-3xl font-bold text-emerald-600">
₹ {totalRevenue}
</h2>
</div>

<div className="bg-white p-6 rounded-2xl shadow-lg">
<p className="text-gray-500">Pending</p>
<h2 className="text-3xl font-bold text-orange-500">
{
orders?.filter(o=>o.status==="pending").length
}
</h2>
</div>

</div>


{/* 🔥 TABLE */}
<div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">

<table className="w-full">

<thead className="border-b">
<tr className="text-gray-600">
<th className="p-4 text-left">Customer</th>
<th className="p-4 text-left">Amount</th>
<th className="p-4 text-left">Status</th>
<th className="p-4 text-left">Date</th>
</tr>
</thead>

<tbody>

{orders?.map(order=>(
<tr
 key={order._id}
 className="hover:bg-indigo-50 hover:scale-[1.01] transition duration-200"
>

<td className="p-4">
<p className="font-semibold">
{order.buyer?.name}
</p>
<p className="text-gray-500 text-sm">
{order.buyer?.email}
</p>
</td>

<td className="p-4 font-bold text-emerald-600">
₹ {order.totalPrice}
</td>

<td className="p-4">

{order.status === "pending" && (
<span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-xs font-bold">
Pending
</span>
)}

{order.status === "delivered" && (
<span className="bg-emerald-100 text-emerald-600 px-4 py-1 rounded-full text-xs font-bold">
Delivered
</span>
)}

{order.status === "cancelled" && (
<span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-xs font-bold">
Cancelled
</span>
)}

</td>

<td className="p-4 text-gray-500">
{new Date(order.createdAt).toLocaleDateString()}
</td>

</tr>
))}

</tbody>
</table>

</div>

</div>
 );
};

export default AdminOrders;

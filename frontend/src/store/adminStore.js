import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useAdminStore = create((set) => ({

  users: [],
  orders: [],
  farmers: [],
  pendingFarmers: [], // ⭐ NEW
  stats: null,
  loading:false,

// =================================
// ✅ DASHBOARD
// =================================

fetchDashboard: async ()=>{

  set({loading:true});

  try{

    const res = await axiosInstance.get("/admin/dashboard");

    set({ stats: res.data.data });

  }catch{
    toast.error("Failed to load dashboard");
  }
  finally{
    set({loading:false});
  }
},

// =================================
// ✅ USERS
// =================================

fetchUsers: async ()=>{

 set({loading:true});

 try{

   const res = await axiosInstance.get("/admin/users");

   set({ users: res.data.users });

 }catch{
   toast.error("Failed to fetch users");
 }
 finally{
   set({loading:false});
 }
},

// =================================
// ✅ ORDERS
// =================================

fetchOrders: async ()=>{

 set({loading:true});

 try{

   const res = await axiosInstance.get("/admin/orders");

   set({orders: res.data.orders});

 }catch{
   toast.error("Failed to fetch orders");
 }
 finally{
   set({loading:false});
 }
},

// =================================
// ✅ ALL FARMERS
// =================================

fetchFarmers: async () => {

 set({loading:true});

 try{

   const res = await axiosInstance.get("/admin/farmers");

   set({ farmers: res.data.farmers });

 }catch{
   toast.error("Failed to fetch farmers");
 }
 finally{
   set({loading:false});
 }
},

// =================================
// ✅ PENDING FARMERS ⭐ VERY IMPORTANT
// =================================

fetchPendingFarmers: async ()=>{

 set({loading:true});

 try{

   const res = await axiosInstance.get("/admin/pending-farmers");

   set({ pendingFarmers: res.data.farmers });

 }catch{
   toast.error("Failed to fetch pending farmers");
 }
 finally{
   set({loading:false});
 }
},

// =================================
// ✅ APPROVE FARMER
// =================================

approveFarmer: async (id)=>{

 try{

   await axiosInstance.patch(`/admin/farmers/${id}/approve`);

   toast.success("Farmer Approved ✅");

   // remove from pending list instantly
   set((state)=>({
     pendingFarmers: state.pendingFarmers.filter(
       farmer => farmer._id !== id
     )
   }));

 }catch{
   toast.error("Approval failed");
 }
},

// =================================
// ✅ REJECT FARMER
// =================================

rejectFarmer: async (id)=>{

 try{

   await axiosInstance.patch(`/admin/farmers/${id}/reject`);

   toast.success("Farmer Rejected ❌");

   set((state)=>({
     pendingFarmers: state.pendingFarmers.filter(
       farmer => farmer._id !== id
     )
   }));

 }catch{
   toast.error("Rejection failed");
 }
},

}));

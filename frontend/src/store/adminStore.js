import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useAdminStore = create((set) => ({
  users: [],
  orders: [],
  stats: null,
  loading:false,

  // ✅ FETCH DASHBOARD STATS
  fetchDashboard: async ()=>{

    set({loading:true});

    try{

      const res = await axiosInstance.get("/admin/dashboard");

      set({ stats: res.data.data });

    }catch(err){

      toast.error("Failed to load dashboard");

    }finally{
      set({loading:false});
    }
  },

  fetchUsers: async ()=>{

 set({loading:true});

 try{

   const res = await axiosInstance.get("/admin/users");

   set({ users: res.data.users });

 }catch(err){
   toast.error("Failed to fetch users");
 }

 finally{
   set({loading:false});
 }

},
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
}

}));

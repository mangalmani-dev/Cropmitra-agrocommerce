import express from "express";
import {
  getDashboard,
  getPendingFarmers,
  approveFarmer,
  rejectFarmer,
  blockUser,
  unblockUser,
  getAllUsers,
  getAllFarmers, getAllOrders
} from "../controllers/admin.controller.js";

import { protect} from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/admin.js";

const router = express.Router();


// ✅ DASHBOARD
router.get("/dashboard", protect, adminOnly, getDashboard);

// get all order for farmer
router.get(
  "/orders",
  protect,
  adminOnly,
  getAllOrders
);


// ✅ FARMER MANAGEMENT
router.get("/pending-farmers", protect, adminOnly, getPendingFarmers);

router.patch("/farmers/:id/approve", protect, adminOnly, approveFarmer);

router.patch("/farmers/:id/reject", protect, adminOnly, rejectFarmer);


// ✅ USER CONTROL
router.patch("/users/:id/block", protect, adminOnly, blockUser);

router.patch("/users/:id/unblock", protect, adminOnly, unblockUser);


// ✅ PLATFORM DATA
router.get("/users", protect, adminOnly, getAllUsers);

router.get("/farmers", protect, adminOnly, getAllFarmers);


export default router;

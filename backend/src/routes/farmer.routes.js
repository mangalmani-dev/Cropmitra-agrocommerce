import express from "express";
import {
  applyFarmer,
  getFarmerRequests,
  approveFarmer,
  getMyFarmerProfile
} from "../controllers/farmer.controller.js";

import { adminOnly } from "../middleware/admin.js";
import { protect } from "../middleware/authMiddleware.js";
import { getFarmerEarnings } from "../controllers/order.controller.js";

const router = express.Router();

// Apply to become a farmer (user)
router.post("/apply", protect, applyFarmer);

// Get my farmer profile (user)
router.get("/me", protect, getMyFarmerProfile);

// ADMIN routes
router.get("/requests", protect, adminOnly, getFarmerRequests);
router.patch("/approve/:id", protect, adminOnly, approveFarmer);

 // Earning 

 router.get("/earnings", protect, getFarmerEarnings);




export default router;

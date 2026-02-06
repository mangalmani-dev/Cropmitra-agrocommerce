import express from "express";
import {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress
} from "../controllers/address.controller.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);


router.post("/", addAddress);
router.get("/", getAddresses);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

export default router;

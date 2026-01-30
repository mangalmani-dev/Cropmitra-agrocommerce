import express from "express";
import {
  addToCart,
  getMyCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from "../controllers/cart.controller.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/me", protect, getMyCart);
router.patch("/update", protect, updateCartItem);
router.delete("/remove/:cropId", protect, removeFromCart);
router.delete("/clear", protect, clearCart);

export default router;

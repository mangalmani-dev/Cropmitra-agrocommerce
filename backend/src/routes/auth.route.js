import express from "express";
import { login, logout, me, signup } from "../controllers/auth.controller.js";
import { uploadProfileImage } from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

// Auth
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, me);

// ✅ Profile image upload (NEW)
router.post(
  "/upload-profile",
  protect,
  upload.single("image"),
  uploadProfileImage
);

export default router;

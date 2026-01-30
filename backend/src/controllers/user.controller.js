import { uploadOnCloudinary } from "../libs/cloudinary.js";
import User from "../models/user.model.js";

export const uploadProfileImage = async (req, res) => {
  try {
    // 1️⃣ Check file
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    // 2️⃣ Upload to Cloudinary using helper
    const result = await uploadOnCloudinary(
      req.file.path,
      "cropmitra/profiles"
    );

    if (!result) {
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }

    // 3️⃣ Update user
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profileImage: result.secure_url },
      { new: true }
    );

    // 4️⃣ Response
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Profile image upload failed" });
  }
};

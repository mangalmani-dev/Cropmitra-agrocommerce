import Crop from "../models/crops.model.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../libs/cloudinary.js";

// ------------------ FARMER CONTROLLERS ------------------

// Add a new crop

export const addCrop = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      quantity,
      unit,
      price,
      discount,
      expiryDate,
      organic,
      location
    } = req.body;

    let images = [];

    // 🔴 handle image upload
    if (req.file) {
      const cloudRes = await uploadOnCloudinary(req.file.path);
      if (!cloudRes) {
        return res.status(500).json({ message: "Image upload failed" });
      }
      images.push(cloudRes.secure_url);
    }

    const crop = new Crop({
      farmer: req.user._id,
      name,
      category,
      description,
      images, // ✅ cloudinary URLs
      quantity,
      unit,
      price,
      discount: discount || 0,
      expiryDate,
      organic: organic || false,
      location
    });

    await crop.save();
    res.status(201).json({ message: "Crop added successfully", crop });

  } catch (error) {
    console.error("Add Crop Error:", error);
    res.status(500).json({ message: "Server error while adding crop" });
  }
};


// Update crop (farmer only)
export const updateCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const crop = await Crop.findById(id);

    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    if (!crop.farmer.equals(req.user._id)) {
      return res.status(403).json({ message: "You can only edit your own crops" });
    }

    // 🔴 if new image is sent
    if (req.file) {
      const cloudRes = await uploadOnCloudinary(req.file.path);
      if (!cloudRes) {
        return res.status(500).json({ message: "Image upload failed" });
      }
      crop.images = [cloudRes.secure_url]; // replace old image
    }

    Object.assign(crop, req.body);
    await crop.save();

    res.status(200).json({ message: "Crop updated", crop });

  } catch (error) {
    console.error("Update Crop Error:", error);
    res.status(500).json({ message: "Server error while updating crop" });
  }
};

// Delete crop (farmer only)
export const deleteCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const crop = await Crop.findById(id);

    if (!crop) return res.status(404).json({ message: "Crop not found" });
    if (!crop.farmer.equals(req.user._id)) return res.status(403).json({ message: "You can only delete your own crops" });

    await crop.remove();
    res.status(200).json({ message: "Crop deleted successfully" });
  } catch (error) {
    console.error("Delete Crop Error:", error);
    res.status(500).json({ message: "Server error while deleting crop" });
  }
};

// Get all crops of the logged-in farmer
export const getMyCrops = async (req, res) => {
  try {
    const crops = await Crop.find({ farmer: req.user._id });
    res.status(200).json(crops);
  } catch (error) {
    console.error("Get My Crops Error:", error);
    res.status(500).json({ message: "Server error while fetching crops" });
  }
};

// ------------------ BUYER CONTROLLERS ------------------

// Get all available crops (for buyers)
export const getAvailableCrops = async (req, res) => {
  try {
    const crops = await Crop.find({ isAvailable: true })
      .populate("farmer", "name location") // only name + location
      .select("name category description images quantity unit price discount organic");

    const buyerCrops = crops.map(c => ({
      id: c._id,
      name: c.name,
      category: c.category,
      description: c.description,
      images: c.images,
      quantityAvailable: c.quantity - c.sold,
      unit: c.unit,
      price: c.price,
      discount: c.discount,
      farmerName: c.farmer.name,
      location: c.farmer.location,
      organic: c.organic
    }));

    res.status(200).json(buyerCrops);
  } catch (error) {
    console.error("Get Available Crops Error:", error);
    res.status(500).json({ message: "Server error while fetching crops" });
  }
};

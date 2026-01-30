import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
  farmer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  }, // e.g., Vegetable, Fruit, Grain
  description: { 
    type: String 
  },
  images: [{ 
    type: String 
  }], // array of image URLs
  quantity: { 
    type: Number, 
    required: true 
  },
  unit: { 
    type: String, 
    required: true 
  }, // e.g., Kg, Dozen, Liter
  price: { 
    type: Number, 
    required: true 
  },
  discount: { 
    type: Number, 
    default: 0 
  }, // percentage discount
  sold: { 
    type: Number, 
    default: 0 
  }, // quantity sold
  isAvailable: { 
    type: Boolean, 
    default: true 
  },
  expiryDate: { 
    type: Date 
  }, // optional
  organic: { 
    type: Boolean, 
    default: false 
  },
  location: { 
    type: String 
  }, // optional
}, { timestamps: true });

const Crop = mongoose.model("Crop", cropSchema);

export default Crop;

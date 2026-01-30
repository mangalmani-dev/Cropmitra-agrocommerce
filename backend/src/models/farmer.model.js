import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // links FarmerProfile to User account
    },

    farmName: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    licenseNumber: {
      type: String,
      default: "", // optional for now
    },

    isApproved: {
      type: Boolean,
      default: false, // admin must approve
    },

    totalEarnings: {
      type: Number,
      default: 0, // updated when crops are sold
    },
    earningsHistory: [
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    },
    amount: Number,
    date: {
      type: Date,
      default: Date.now
    }
  }
],
    crops: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Crop", // link to Crop model
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("FarmerProfile", farmerSchema);

import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true // 🔥 makes queries faster
    },

    fullName: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true
    },

    pincode: {
      type: String,
      required: true
    },

    state: String,
    city: String,

    addressLine: {
      type: String,
      required: true
    },

    landmark: String,

    label: {
      type: String,
      enum: ["Home", "Farm", "Work", "Other"],
      default: "Home"
    },

    isDefault: {
      type: Boolean,
      default: false
    },

    // ⭐ FUTURE READY (Geo Queries)
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
      }
    }
  },
  { timestamps: true }
);


// ⭐ VERY IMPORTANT for geo search later
addressSchema.index({ location: "2dsphere" });

const Address = mongoose.model("Address", addressSchema);

export default Address;

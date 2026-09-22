const mongoose = require("mongoose");

const pickupSchema = new mongoose.Schema(
  {
    claim: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Claim",
      required: true
    },

    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodListing",
      required: true
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    status: {
      type: String,
      enum: [
        "AVAILABLE",
        "ASSIGNED",
        "PICKED_UP",
        "DELIVERED",
        "COMPLETED",
        "CANCELLED"
      ],
      default: "AVAILABLE"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Pickup", pickupSchema);
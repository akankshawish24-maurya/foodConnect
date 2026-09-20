const mongoose = require("mongoose");

const foodListingSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: true,
      trim: true
    },

    foodType: {
      type: String,
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    unit: {
      type: String,
      required: true
    },

    preparedAt: {
      type: Date,
      required: true
    },

    availableUntil: {
      type: Date,
      required: true
    },

    pickupLocation: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: [
        "AVAILABLE",
        "CLAIMED",
        "PICKUP_ASSIGNED",
        "PICKED_UP",
        "DELIVERED",
        "COMPLETED",
        "CANCELLED",
        "EXPIRED"
      ],
      default: "AVAILABLE"
    },

    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("FoodListing", foodListingSchema);
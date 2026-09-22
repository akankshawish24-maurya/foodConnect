const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
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

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "ACCEPTED",
        "REJECTED",
        "CANCELLED",
        "COMPLETED"
      ],
      default: "PENDING"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Claim", claimSchema);
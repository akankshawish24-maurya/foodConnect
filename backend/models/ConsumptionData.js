const mongoose = require("mongoose");

const consumptionDataSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: true,
      trim: true
    },

    dayOfWeek: {
      type: String,
      required: true
    },

    preparedQuantity: {
      type: Number,
      required: true,
      min: 0
    },

    consumedQuantity: {
      type: Number,
      required: true,
      min: 0
    },

    wastedQuantity: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ConsumptionData",
  consumptionDataSchema
);
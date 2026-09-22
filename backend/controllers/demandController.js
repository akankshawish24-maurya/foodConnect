const ConsumptionData = require("../models/ConsumptionData");

// Add consumption data
const addConsumptionData = async (req, res) => {
  try {
    const {
      foodName,
      dayOfWeek,
      preparedQuantity,
      consumedQuantity
    } = req.body;

    if (
      !foodName ||
      !dayOfWeek ||
      preparedQuantity === undefined ||
      consumedQuantity === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const wastedQuantity =
      Number(preparedQuantity) -
      Number(consumedQuantity);

    const data = await ConsumptionData.create({
      foodName,
      dayOfWeek,
      preparedQuantity,
      consumedQuantity,
      wastedQuantity
    });

    res.status(201).json({
      message: "Consumption data added successfully",
      data
    });

  } catch (error) {
    console.error("Add consumption error:", error);

    res.status(500).json({
      message: "Failed to add consumption data"
    });
  }
};


// Get demand prediction
const getDemandPrediction = async (req, res) => {
  try {
    const data = await ConsumptionData.find();

    if (data.length === 0) {
      return res.status(200).json({
        totalRecords: 0,
        predictions: [],
        message: "Not enough data for prediction"
      });
    }

    // Group consumption by food name
    const foodData = {};

    data.forEach((item) => {
      if (!foodData[item.foodName]) {
        foodData[item.foodName] = [];
      }

      foodData[item.foodName].push(
        Number(item.consumedQuantity)
      );
    });

    // Calculate prediction for each food
    const predictions = Object.keys(foodData).map(
      (foodName) => {

        const quantities = foodData[foodName];

        const total = quantities.reduce(
          (sum, quantity) => sum + quantity,
          0
        );

        const averageDemand = Math.round(
          total / quantities.length
        );

        // 5% preparation buffer
        const suggestedPreparation = Math.ceil(
          averageDemand * 1.05
        );

        return {
          foodName,
          records: quantities.length,
          averageDemand,
          suggestedPreparation
        };
      }
    );

    res.status(200).json({
      totalRecords: data.length,
      predictions
    });

  } catch (error) {
    console.error("Demand prediction error:", error);

    res.status(500).json({
      message: "Failed to calculate demand"
    });
  }
};


module.exports = {
  addConsumptionData,
  getDemandPrediction
};
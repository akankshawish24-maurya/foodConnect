const FoodListing = require("../models/FoodListing");
const {
  calculateUrgency
} = require("../utils/urgency");

const createFood = async (req, res) => {
  try {
    const {
      foodName,
      foodType,
      quantity,
      unit,
      preparedAt,
      availableUntil,
      pickupLocation,
      description
    } = req.body;

    if (
      !foodName ||
      !foodType ||
      !quantity ||
      !unit ||
      !preparedAt ||
      !availableUntil ||
      !pickupLocation
    ) {
      return res.status(400).json({
        message: "Please fill all required fields"
      });
    }
console.log("USER FROM TOKEN:", req.user);
    const food = await FoodListing.create({
      foodName,
      foodType,
      quantity,
      unit,
      preparedAt,
      availableUntil,
      pickupLocation,
      description,
      donor: req.user.id
    });

    res.status(201).json({
      message: "Food listing created successfully",
      food
    });

  } catch (error) {
    console.error("Create food error:", error);

    res.status(500).json({
      message: "Failed to create food listing"
    });
  }
};
const getMyFoodListings = async (req, res) => {
  try {
    const foods = await FoodListing.find({
      donor: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json(foods);

  } catch (error) {
    console.error("Get listings error:", error);

    res.status(500).json({
      message: "Failed to get food listings"
    });
  }
};
const deleteFood = async (req, res) => {
  try {
    const food = await FoodListing.findOne({
      _id: req.params.id,
      donor: req.user.id
    });

    if (!food) {
      return res.status(404).json({
        message: "Food listing not found"
      });
    }

    await food.deleteOne();

    res.status(200).json({
      message: "Food listing deleted successfully"
    });

  } catch (error) {
    console.error("Delete food error:", error);

    res.status(500).json({
      message: "Failed to delete food"
    });
  }
};
const updateFood = async (req, res) => {
  try {
    const {
      foodName,
      foodType,
      quantity,
      unit,
      preparedAt,
      availableUntil,
      pickupLocation,
      description
    } = req.body;

    const food = await FoodListing.findOne({
      _id: req.params.id,
      donor: req.user.id
    });

    if (!food) {
      return res.status(404).json({
        message: "Food listing not found"
      });
    }

    food.foodName = foodName;
    food.foodType = foodType;
    food.quantity = quantity;
    food.unit = unit;
    food.preparedAt = preparedAt;
    food.availableUntil = availableUntil;
    food.pickupLocation = pickupLocation;
    food.description = description;

    await food.save();

    res.status(200).json({
      message: "Food listing updated successfully",
      food
    });

  } catch (error) {
    console.log("Update food error:", error);

    res.status(500).json({
      message: "Failed to update food listing"
    });
  }
};
const getAvailableFood = async (req, res) => {
  try {

    // Automatically mark expired food
    await FoodListing.updateMany(
      {
        status: "AVAILABLE",
        availableUntil: {
          $lte: new Date()
        }
      },
      {
        $set: {
          status: "EXPIRED"
        }
      }
    );

    // Get only currently available food
    const foods = await FoodListing.find({
      status: "AVAILABLE"
    }).sort({ createdAt: -1 });

    console.log(
      "AVAILABLE FOOD COUNT:",
      foods.length
    );

    const foodsWithUrgency = foods.map((food) => {
      const urgency = calculateUrgency(
        food.availableUntil
      );

      return {
        ...food.toObject(),

        urgencyLevel: urgency.level,
        urgencyLabel: urgency.label,
        minutesRemaining:
          urgency.minutesRemaining
      };
    });

    console.log(
      "AVAILABLE FOODS:",
      foodsWithUrgency
    );

    res.status(200).json(
      foodsWithUrgency
    );

  } catch (error) {
    console.error(
      "Get available food error:",
      error
    );

    res.status(500).json({
      message: "Failed to get available food"
    });
  }
};
module.exports = {
  createFood,
   getMyFoodListings,
    deleteFood,
    updateFood,
     getAvailableFood
};
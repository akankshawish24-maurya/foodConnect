const Claim = require("../models/Claim");
const FoodListing = require("../models/FoodListing");
const Pickup = require("../models/Pickup");

const createClaim = async (req, res) => {
  try {
    const { foodId, quantity } = req.body;

    if (!foodId || !quantity) {
      return res.status(400).json({
        message: "Food and quantity are required"
      });
    }

    const food = await FoodListing.findById(foodId);

    if (!food) {
      return res.status(404).json({
        message: "Food not found"
      });
    }

    if (food.status !== "AVAILABLE") {
      return res.status(400).json({
        message: "Food is no longer available"
      });
    }

    if (quantity > food.quantity) {
      return res.status(400).json({
        message: "Requested quantity is too high"
      });
    }

    // Create claim
    const claim = await Claim.create({
      food: foodId,
      receiver: req.user.id,
      quantity: quantity
    });

    // Create pickup
    const pickup = await Pickup.create({
      claim: claim._id,
      food: foodId,
      receiver: req.user.id,
        status: "AVAILABLE"
    });

    res.status(201).json({
      message: "Food claimed successfully",
      claim,
      pickup
    });

  } catch (error) {
    console.error("Create claim error:", error);

    res.status(500).json({
      message: "Failed to claim food"
    });
  }
};

module.exports = {
  createClaim
};
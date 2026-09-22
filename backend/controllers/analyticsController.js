const FoodListing = require("../models/FoodListing");
const Claim = require("../models/Claim");
const Pickup = require("../models/Pickup");

const getDonorAnalytics = async (req, res) => {
  try {

    // Find food created by this donor
    const foods = await FoodListing.find({
      donor: req.user.id
    });

    // Get food IDs
    const foodIds = foods.map((food) => food._id);

    // Find claims for donor's food
    const claims = await Claim.find({
      food: { $in: foodIds }
    });

    // Find pickups for donor's food
    const pickups = await Pickup.find({
      food: { $in: foodIds }
    });

    // Calculate numbers
    const totalListings = foods.length;

    const availableListings = foods.filter(
      (food) => food.status === "AVAILABLE"
    ).length;

    const completedListings = foods.filter(
      (food) => food.status === "COMPLETED"
    ).length;

    const totalQuantityDonated = foods.reduce(
      (total, food) => total + Number(food.quantity),
      0
    );

    const totalClaimedQuantity = claims.reduce(
      (total, claim) => total + Number(claim.quantity),
      0
    );

    const completedPickups = pickups.filter(
      (pickup) => pickup.status === "COMPLETED"
    ).length;

    res.status(200).json({
      totalListings,
      availableListings,
      completedListings,
      totalClaims: claims.length,
      totalPickups: pickups.length,
      completedPickups,
      totalQuantityDonated,
      totalClaimedQuantity
    });

  } catch (error) {

    console.error("Analytics error:", error);

    res.status(500).json({
      message: "Failed to load analytics"
    });
  }
};

module.exports = {
  getDonorAnalytics
};
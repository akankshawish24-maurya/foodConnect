const User = require("../models/User");
const FoodListing = require("../models/FoodListing");
const Claim = require("../models/Claim");
const Pickup = require("../models/Pickup");


// Dashboard statistics
const getDashboardStats = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalFoodListings = await FoodListing.countDocuments();

    const totalClaims = await Claim.countDocuments();

    const totalPickups = await Pickup.countDocuments();

    const completedPickups = await Pickup.countDocuments({
      status: "COMPLETED"
    });

    const completedFood = await FoodListing.countDocuments({
      status: "COMPLETED"
    });

    res.status(200).json({
      totalUsers,
      totalFoodListings,
      totalClaims,
      totalPickups,
      completedPickups,
      completedFood
    });

  } catch (error) {

    console.error("Admin statistics error:", error);

    res.status(500).json({
      message: "Failed to get dashboard statistics"
    });
  }
};


// Get all users
const getAllUsers = async (req, res) => {
  try {

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(users);

  } catch (error) {

    console.error("Get users error:", error);

    res.status(500).json({
      message: "Failed to get users"
    });
  }
};


// Get all food listings
const getAllFoodListings = async (req, res) => {
  try {

    const foods = await FoodListing.find()
      .populate("donor", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(foods);

  } catch (error) {

    console.error("Get food listings error:", error);

    res.status(500).json({
      message: "Failed to get food listings"
    });
  }
};


// Get all claims
const getAllClaims = async (req, res) => {
  try {

    const claims = await Claim.find()
      .populate("food")
      .populate("receiver", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(claims);

  } catch (error) {

    console.error("Get claims error:", error);

    res.status(500).json({
      message: "Failed to get claims"
    });
  }
};


// Get all pickups
const getAllPickups = async (req, res) => {
  try {

    const pickups = await Pickup.find()
      .populate("food")
      .populate("receiver", "name email")
      .populate("volunteer", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(pickups);

  } catch (error) {

    console.error("Get pickups error:", error);

    res.status(500).json({
      message: "Failed to get pickups"
    });
  }
};


module.exports = {
  getDashboardStats,
  getAllUsers,
  getAllFoodListings,
  getAllClaims,
  getAllPickups
};
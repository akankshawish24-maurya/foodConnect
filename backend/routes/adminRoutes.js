const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
  getAllUsers,
  getAllFoodListings,
  getAllClaims,
  getAllPickups
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


// Admin dashboard statistics
router.get(
  "/stats",
  authMiddleware,
  roleMiddleware("admin"),
  getDashboardStats
);


// All users
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsers
);


// All food listings
router.get(
  "/food",
  authMiddleware,
  roleMiddleware("admin"),
  getAllFoodListings
);


// All claims
router.get(
  "/claims",
  authMiddleware,
  roleMiddleware("admin"),
  getAllClaims
);


// All pickups
router.get(
  "/pickups",
  authMiddleware,
  roleMiddleware("admin"),
  getAllPickups
);


module.exports = router;
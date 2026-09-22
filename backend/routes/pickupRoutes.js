const express = require("express");

const router = express.Router();

const {
  getAvailablePickups,
  acceptPickup,
  updatePickupStatus,
  getMyPickups,
   getDonorPickups
} = require("../controllers/pickupController");

const authMiddleware = require("../middleware/authMiddleware");


// Available pickups
router.get(
  "/available",
  authMiddleware,
  getAvailablePickups
);


// My pickups
router.get(
  "/my",
  authMiddleware,
  getMyPickups
);

// Donor's pickups

router.get(
  "/donor",
  authMiddleware,
  getDonorPickups
);

// Accept pickup
router.post(
  "/:id/accept",
  authMiddleware,
  acceptPickup
);


// Update pickup status
router.put(
  "/:id/status",
  authMiddleware,
  updatePickupStatus
);


module.exports = router;
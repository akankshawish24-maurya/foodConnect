const Pickup = require("../models/Pickup");
const FoodListing = require("../models/FoodListing");
const Claim = require("../models/Claim");
const Notification = require("../models/Notification");

// Get all available pickups
const getAvailablePickups = async (req, res) => {
  try {
    const pickups = await Pickup.find({
      status: "AVAILABLE"
    })
      .populate("food")
      .populate("receiver", "name email")
      .populate("claim");

    res.status(200).json(pickups);

  } catch (error) {
    console.error("Get pickups error:", error);

    res.status(500).json({
      message: "Failed to get pickups"
    });
  }
};


// Volunteer accepts pickup
const acceptPickup = async (req, res) => {
  try {
    const pickup = await Pickup.findById(req.params.id);

    if (!pickup) {
      return res.status(404).json({
        message: "Pickup not found"
      });
    }

    if (pickup.status !== "AVAILABLE") {
      return res.status(400).json({
        message: "Pickup is no longer available"
      });
    }

    pickup.volunteer = req.user.id;
    pickup.status = "ASSIGNED";

    await pickup.save();
    await Notification.create({
      user: pickup.receiver,
      message: "A volunteer has accepted your food pickup.",
      type: "PICKUP"
    });

    // Update food status
    await FoodListing.findByIdAndUpdate(
      pickup.food,
      {
        status: "PICKUP_ASSIGNED"
      }
    );

    res.status(200).json({
      message: "Pickup accepted successfully",
      pickup
    });

  } catch (error) {
    console.error("Accept pickup error:", error);

    res.status(500).json({
      message: "Failed to accept pickup"
    });
  }
};


// Update pickup status
const updatePickupStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "PICKED_UP",
      "DELIVERED",
      "COMPLETED"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid pickup status"
      });
    }

    const pickup = await Pickup.findById(req.params.id);

    if (!pickup) {
      return res.status(404).json({
        message: "Pickup not found"
      });
    }

    // Only assigned volunteer can update it
    if (
      !pickup.volunteer ||
      pickup.volunteer.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You are not assigned to this pickup"
      });
    }

    pickup.status = status;

    await pickup.save();

    // Update food status according to pickup
    let foodStatus = "AVAILABLE";

    if (status === "PICKED_UP") {
      foodStatus = "PICKED_UP";
    }

    if (status === "DELIVERED") {
      foodStatus = "DELIVERED";
    }

    if (status === "COMPLETED") {
      foodStatus = "COMPLETED";

      await Claim.findByIdAndUpdate(
        pickup.claim,
        {
          status: "COMPLETED"
        }
      );
      await Notification.create({
        user: pickup.receiver,
        message: "Your food pickup has been completed successfully.",
        type: "DELIVERY"
      });
    }

    await FoodListing.findByIdAndUpdate(
      pickup.food,
      {
        status: foodStatus
      }
    );

    res.status(200).json({
      message: "Pickup status updated successfully",
      pickup
    });

  } catch (error) {
    console.error("Update pickup error:", error);

    res.status(500).json({
      message: "Failed to update pickup"
    });
  }
};


// Get volunteer's own pickups
const getMyPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find({
      volunteer: req.user.id
    })
      .populate("food")
      .populate("receiver", "name email")
      .populate("claim");

    res.status(200).json(pickups);

  } catch (error) {
    console.error("Get my pickups error:", error);

    res.status(500).json({
      message: "Failed to get your pickups"
    });
  }
};
// Get pickups for donor's food listings
const getDonorPickups = async (req, res) => {
  try {
    // Find food listings created by this donor
    const donorFoods = await FoodListing.find({
      donor: req.user.id
    }).select("_id");

    const foodIds = donorFoods.map((food) => food._id);

    // Find pickups for those food listings
    const pickups = await Pickup.find({
      food: { $in: foodIds }
    })
      .populate("food", "foodName foodType quantity unit pickupLocation status")
      .populate("receiver", "name email")
      .populate("volunteer", "name email")
      .populate("claim")
      .sort({ createdAt: -1 });

    res.status(200).json(pickups);

  } catch (error) {
    console.error("Get donor pickups error:", error);

    res.status(500).json({
      message: "Failed to get donor pickups"
    });
  }
};


module.exports = {
  getAvailablePickups,
  acceptPickup,
  updatePickupStatus,
  getMyPickups,
  getDonorPickups
};
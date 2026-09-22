const FoodListing = require("../models/FoodListing");

const {
  calculateMatchScore
} = require("../utils/matching");
const {
  calculateUrgency
} = require("../utils/urgency");


// ==========================================
// GET SMART FOOD MATCHES
// ==========================================

const getSmartMatches = async (req, res) => {
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

    // ------------------------------------------
    // Get receiver requirements
    // ------------------------------------------

    const {
      foodType,
      requiredQuantity,
      distanceKm = 5
    } = req.query;


    // ------------------------------------------
    // Validate required quantity
    // ------------------------------------------

    if (!requiredQuantity) {
      return res.status(400).json({
        message: "Required quantity is needed"
      });
    }


    // ------------------------------------------
    // Find available food
    // ------------------------------------------

    const foods = await FoodListing.find({
      status: "AVAILABLE"
    }).sort({
      createdAt: -1
    });


    // ------------------------------------------
    // Calculate match score
    // ------------------------------------------

    const matches = foods.map((food) => {

      const foodTypeMatch =
        foodType
          ? food.foodType.toLowerCase() ===
          foodType.toLowerCase()
          : true;


      const score = calculateMatchScore({
        foodQuantity: Number(food.quantity),

        requiredQuantity:
          Number(requiredQuantity),

        foodTypeMatch,

        distanceKm:
          Number(distanceKm),

        availableUntil:
          food.availableUntil
      });
      const urgency = calculateUrgency(
        food.availableUntil
      );


      return {
        foodId: food._id,

        foodName: food.foodName,

        foodType: food.foodType,

        quantity: food.quantity,

        unit: food.unit,

        pickupLocation:
          food.pickupLocation,

        availableUntil:
          food.availableUntil,

        status: food.status,
        urgencyLevel:
          urgency.level,

        urgencyLabel:
          urgency.label,

        minutesRemaining:
          urgency.minutesRemaining,


        matchScore: score
      };

    });


    // ------------------------------------------
    // Sort by highest score
    // ------------------------------------------

    matches.sort(
      (a, b) =>
        b.matchScore - a.matchScore
    );


    // ------------------------------------------
    // Send response
    // ------------------------------------------

    res.status(200).json({
      totalMatches: matches.length,

      matches
    });


  } catch (error) {

    console.error(
      "Smart matching error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to calculate smart matches"
    });

  }
};


module.exports = {
  getSmartMatches
};
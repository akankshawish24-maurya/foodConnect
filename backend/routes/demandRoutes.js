const express = require("express");

const router = express.Router();

const {
  addConsumptionData,
  getDemandPrediction
} = require("../controllers/demandController");

const authMiddleware = require("../middleware/authMiddleware");


// Add consumption data
router.post(
  "/consumption",
  authMiddleware,
  addConsumptionData
);


// Get demand prediction
router.get(
  "/prediction",
  authMiddleware,
  getDemandPrediction
);


module.exports = router;
const express = require("express");

const router = express.Router();

const {
  getSmartMatches
} = require("../controllers/matchingController");

const authMiddleware = require("../middleware/authMiddleware");


// Get smart food matches
router.get(
  "/",
  authMiddleware,
  getSmartMatches
);


module.exports = router;
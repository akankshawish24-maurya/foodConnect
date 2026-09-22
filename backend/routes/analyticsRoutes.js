const express = require("express");

const router = express.Router();

const {
  getDonorAnalytics
} = require("../controllers/analyticsController");

const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/donor",
  authMiddleware,
  getDonorAnalytics
);

module.exports = router;
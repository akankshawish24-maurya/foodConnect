const express = require("express");

const router = express.Router();

const {
  getMyNotifications,
  markAsRead
} = require("../controllers/notificationController");

const authMiddleware = require("../middleware/authMiddleware");


// Get logged-in user's notifications
router.get(
  "/",
  authMiddleware,
  getMyNotifications
);


// Mark notification as read
router.put(
  "/:id/read",
  authMiddleware,
  markAsRead
);


module.exports = router;
const Notification = require("../models/Notification");

// Get notifications for logged-in user
//const getMyNotifications = async (req, res) => {
//   try {
//     const notifications = await Notification.find({
//       user: req.user.id
//     }).sort({
//       createdAt: -1
//     });

//     res.status(200).json(notifications);

//   } catch (error) {
//     console.error("Get notifications error:", error);

//     res.status(500).json({
//       message: "Failed to get notifications"
//     });
//   }
// };
// const getMyNotifications = async (req, res) => {
//   try {
//     console.log("REQ.USER:", req.user);
//     console.log("USER ID:", req.user.id);

//     const notifications = await Notification.find({
//       user: req.user.id
//     }).sort({
//       createdAt: -1
//     });

//     console.log("NOTIFICATIONS FOUND:", notifications);

//     res.status(200).json(notifications);

//   } catch (error) {
//     console.error("Get notifications error:", error);

//     res.status(500).json({
//       message: "Failed to get notifications"
//     });
//   }
// };
const getMyNotifications = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user);
    console.log("REQ.USER.ID:", req.user.id);

    const notifications = await Notification.find({
      user: req.user.id
    }).sort({
      createdAt: -1
    });

    console.log("NOTIFICATIONS FOUND:", notifications);

    res.status(200).json(notifications);

  } catch (error) {
    console.error("Get notifications error:", error);

    res.status(500).json({
      message: "Failed to get notifications"
    });
  }
};


// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found"
      });
    }

    notification.isRead = true;

    await notification.save();

    res.status(200).json({
      message: "Notification marked as read",
      notification
    });

  } catch (error) {
    console.error("Mark notification error:", error);

    res.status(500).json({
      message: "Failed to mark notification"
    });
  }
};


module.exports = {
  getMyNotifications,
  markAsRead
};
// const getMyNotifications = async (req, res) => {
//   try {
//     console.log("LOGGED IN USER ID:", req.user.id);

//     const notifications = await Notification.find({
//       user: req.user.id
//     }).sort({
//       createdAt: -1
//     });

//     console.log("NOTIFICATIONS FOUND:", notifications);

//     res.status(200).json(notifications);

//   } catch (error) {
//     console.error("Get notifications error:", error);

//     res.status(500).json({
//       message: "Failed to get notifications"
//     });
//   }
// };
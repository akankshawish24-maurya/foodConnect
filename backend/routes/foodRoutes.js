// const express = require("express");
// const router = express.Router();

// const { createFood } = require("../controllers/foodController");

// const authMiddleware = require("../middleware/authMiddleware");

// router.post(
//   "/",
//   authMiddleware,
//   createFood
// );

// module.exports = router;
const express = require("express");

const router = express.Router();

const {
  createFood,
   getMyFoodListings,
     deleteFood,
      updateFood
} = require("../controllers/foodController");

const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware,
  createFood
);
router.get(
  "/my-listings",
  authMiddleware,
  getMyFoodListings
);
router.delete(
  "/:id",
  authMiddleware,
  deleteFood
);
router.put(
  "/:id",
  authMiddleware,
  updateFood
);
module.exports = router;

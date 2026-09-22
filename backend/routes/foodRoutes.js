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
      updateFood,
      getAvailableFood
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
router.get(
  "/available",
  authMiddleware,
  getAvailableFood
);

router.put(
  "/:id",
  authMiddleware,
  updateFood
);

router.delete(
  "/:id",
  authMiddleware,
  deleteFood
);
router.get("/test", (req, res) => {
  res.send("FOOD ROUTES ARE WORKING");
});

module.exports = router;

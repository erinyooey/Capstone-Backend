const { route } = require("../shared/shared");
const {
  createReviewController,
  getReviewByIdController,
  getReviewsByUserController,
  updatedReviewController,
  deleteReviewController,
  getReviewsForRestaurantController,
} = require("../controllers/reviewControllers");

const { findUserWithToken } = require("../queries/userQueries");

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await findUserWithToken(req.headers.authorization);
    next();
  } catch (error) {
    res.status(401).json({message: "Unauthorized"})
    next(error);
  }
};

route.post("/", isLoggedIn, createReviewController);
route.put("/:id", isLoggedIn, updatedReviewController);
route.delete("/:id", isLoggedIn, deleteReviewController);

route.get(
  "/:restaurantId",
  isLoggedIn,
  getReviewsForRestaurantController
);
route.get("/:id", isLoggedIn, getReviewByIdController);
route.get("/:userId", isLoggedIn, getReviewsByUserController);

module.exports = route;
module.exports.isLoggedIn = isLoggedIn;

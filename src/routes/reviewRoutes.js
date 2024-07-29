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
    next(error);
  }
};

route.post("/reviews", isLoggedIn, createReviewController);
route.put("/reviews/:id", isLoggedIn, updatedReviewController);
route.delete("/reviews/:id", isLoggedIn, deleteReviewController);

route.get(
  "/restaurants/:restaurantId/reviews",
  getReviewsForRestaurantController
);
route.get("/reviews/:id", getReviewByIdController);
route.get("/users/:userId/reviews", getReviewsByUserController);

module.exports = route;
module.exports.isLoggedIn = isLoggedIn;

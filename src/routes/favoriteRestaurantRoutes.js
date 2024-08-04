const { route } = require("../shared/shared");
const { findUserWithToken, getMe } = require("../queries/userQueries");
const {
  favoriteRestaurant,
  deleteFavoriteRestaurants,
  displayAllFavoriteRestaurants,
  updateFavoriteRestaurants,
} = require("../controllers/favoriteRestaurantControllers");

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await findUserWithToken(req.headers.authorization);
    next();
  } catch (error) {
    res.status(401).json({message: "Unauthorized"})
    next(error);
  }
};

route.post("/:id", isLoggedIn, favoriteRestaurant);
route.delete(
  "/:favoriteId",
  isLoggedIn,
  deleteFavoriteRestaurants
);

route.get(
  "/:id",
  isLoggedIn,
  displayAllFavoriteRestaurants
);
route.put(
  "/:favoriteId",
  isLoggedIn,
  updateFavoriteRestaurants
);

module.exports = route;
module.exports.isLoggedIn = isLoggedIn;
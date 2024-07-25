const { route } = require("../shared/shared");
const { findUserWithToken, getMe } = require("../queries/userQueries");
const {
  favoriteRestaurant,
  deleteFavoriteRestaurants,
  displayAllFavoriteRestaurants,
  updateFavoriteRestaurants,
} = require("../controllers/restaurantControllers");

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await findUserWithToken(req.headers.authorization);
    next();
  } catch (error) {
    next(error);
  }
};

route.post("/:id/favorite_restaurant", isLoggedIn, favoriteRestaurant);
route.delete(
  "/:id/deleteFavoriteRestaurants/:id",
  isLoggedIn,
  deleteFavoriteRestaurants
);

route.get("/:id/allFavoriteRestaurants", isLoggedIn, displayAllFavoriteRestaurants)
route.put(":id/updateFavoriteRestaurants/:id", isLoggedIn, updateFavoriteRestaurants)

module.exports = route;
module.exports.isLoggedIn = isLoggedIn;
const { route } = require("../shared/shared");
const {
  favoriteRestaurant,
  deleteFavoriteRestaurants,
  displayAllRestaurants
} = require("../controllers/userControllers");

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

route.post("/all_restaurants", isLoggedIn, displayAllRestaurants)
// route.put(":id"/)

module.exports = route;
module.exports.isLoggedIn = isLoggedIn;

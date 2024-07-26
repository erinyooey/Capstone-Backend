const { route } = require("../shared/shared");
const { findUserWithToken, getMe } = require("../queries/userQueries");
const {
  addRestaurant,
  deleteRestaurants,
  displayAllRestaurants,
  updateRestaurants,
} = require("../controllers/restaurantControllers");

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await findUserWithToken(req.headers.authorization);
    next();
  } catch (error) {
    next(error);
  }
};

route.post("/:id/addRestaurant", isLoggedIn, addRestaurant);
route.get("/:id/allRestaurants", isLoggedIn, displayAllRestaurants);
route.delete("/:id/deleteRestaurants/:id", isLoggedIn, deleteRestaurants);
route.put("/:id/updateRestaurants/:id", isLoggedIn, updateRestaurants);

module.exports = route;
module.exports.isLoggedIn = isLoggedIn;

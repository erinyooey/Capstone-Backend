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

const isAdmin = (req, res, next) => {
  if(req.user.role !== 'ADMIN'){
    return res.status(403).json({message: "Admins only"})
  }
  next()
}

route.post("/:id/favorite_restaurant", isLoggedIn, isAdmin, favoriteRestaurant);
route.delete(
  "/:favoriteId",
  isLoggedIn,
  isAdmin,
  deleteFavoriteRestaurants
);

route.get(
  "/:id/allFavoriteRestaurants",
  isLoggedIn,
  displayAllFavoriteRestaurants
);
route.put(
  "/:favoriteId",
  isLoggedIn,
  isAdmin,
  updateFavoriteRestaurants
);

module.exports = route;
module.exports.isLoggedIn = isLoggedIn;
module.exports.isAdmin = isAdmin
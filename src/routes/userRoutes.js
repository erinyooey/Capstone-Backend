const { route } = require("../shared/shared");
const { findUserWithToken, getMe } = require("../queries/userQueries");
const {
  register,
  login,
  displayAll,
  displayOne,
  displayMe,
  deleteUser,
  updateUser,
  favoriteRestaurant,
  deleteFavoriteRestaurants,
} = require("../controllers/userControllers");

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await findUserWithToken(req.headers.authorization);
    next();
  } catch (error) {
    next(error);
  }
};

route.post("/register", register);
route.post("/login", login);
route.put("/:id/change", isLoggedIn, updateUser);
route.delete("/:id/delete_user", isLoggedIn, deleteUser);

route.get("/all_users", isLoggedIn, displayAll);
route.get("/:id/user", isLoggedIn, displayOne);
route.get("/:id/me", isLoggedIn, displayMe);


module.exports = route;
module.exports.isLoggedIn = isLoggedIn;

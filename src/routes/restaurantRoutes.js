const { route } = require("../shared/shared");
const { findUserWithToken } = require("../queries/userQueries");
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

route.post("/addRestaurant", isLoggedIn, isAdmin, addRestaurant);
route.get("/", displayAllRestaurants);
route.delete("/remove/:id", isLoggedIn, isAdmin, deleteRestaurants);
route.put("/change/:id", isLoggedIn, isAdmin, updateRestaurants);

module.exports = route;
module.exports.isLoggedIn = isLoggedIn;
module.exports.isAdmin = isAdmin

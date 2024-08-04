const { route } = require("../shared/shared");
const { findUserWithToken } = require("../queries/userQueries");
const {
  addRestaurant,
  deleteRestaurants,
  displayAllRestaurants,
  updateRestaurants,
} = require("../controllers/restaurantControllers");


const isAdmin = (req, res, next) => {
  if(req.user.role !== 'ADMIN'){
    return res.status(403).json({message: "Admins only"})
  }
  next()
}

route.post("/addRestaurant", isAdmin, addRestaurant);
route.get("/", displayAllRestaurants);
route.delete("/remove/:id", isAdmin, deleteRestaurants);
route.put("/change/:id", isAdmin, updateRestaurants);

module.exports = route;
module.exports.isAdmin = isAdmin

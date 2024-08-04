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
} = require("../controllers/userControllers");

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await findUserWithToken(req.headers.authorization);
    next();
  } catch (error) {
    console.error("error in loggedin middleware: ", error.message)
    res.status(401).json({message: "Unauthorized"})
  }
};

const isAdmin = (req, res, next) => {
  if(!req.user || req.user.role !== 'ADMIN'){
    return res.status(403).json({message: "Admins only"})
  }
  next()
}

route.post("/register", register);
route.post("/login", login);
route.put("/:id/change", isLoggedIn, updateUser);
route.delete("/:id/delete_user", isLoggedIn, deleteUser);

route.get("/all_users", isAdmin, displayAll);
route.get("/:id/user", isAdmin, displayOne);
route.get("/:id/me", isAdmin, displayMe);

module.exports = route;
module.exports.isLoggedIn = isLoggedIn;
module.exports.isAdmin = isAdmin
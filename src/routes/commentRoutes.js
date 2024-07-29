const { route } = require("../shared/shared");
const { findUserWithToken } = require("../queries/userQueries");
const {} = require("../controllers/commentControllers");

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await findUserWithToken(req.headers.authorization);
    next();
  } catch (error) {
    next(error);
  }
};

route.post("/");
route.post("/");
route.put("/", isLoggedIn);
route.delete("/:id/delete_user", isLoggedIn);

route.get("/all_users", isLoggedIn);
route.get("/:id/user", isLoggedIn);
route.get("/:id/me", isLoggedIn);

module.exports = route;
module.exports.isLoggedIn = isLoggedIn;

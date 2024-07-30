const { route } = require("../shared/shared");
const { findUserWithToken } = require("../queries/userQueries");
const {
  getAllCommentsController,
  getCommentsByReviewIdController,
  getCommentsByUserIdController,
  createCommentController,
  updateCommentController,
  deleteCommentController
} = require("../controllers/commentControllers");

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await findUserWithToken(req.headers.authorization);
    next();
  } catch (error) {
    res.status(401).json({error: "Invalid user token"})
    next(error);
  }
};

route.post("/comments", isLoggedIn, createCommentController);
route.put("/:commentId", isLoggedIn, updateCommentController);
route.delete("/:commentId", isLoggedIn, deleteCommentController);

route.get("/comments", getAllCommentsController);
route.get("/review/:reviewId", getCommentsByReviewIdController);
route.get("/user/:userId", isLoggedIn), getCommentsByUserIdController;

module.exports = route;
module.exports.isLoggedIn = isLoggedIn;

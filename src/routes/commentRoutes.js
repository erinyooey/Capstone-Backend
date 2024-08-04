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
    res.status(401).json({error: "Unauthorized"})
    next(error);
  }
};

route.post("/", isLoggedIn, createCommentController);
route.put("/:commentId", isLoggedIn, updateCommentController);
route.delete("/:commentId", isLoggedIn, deleteCommentController);

route.get("/", isLoggedIn, getAllCommentsController);
route.get("/:reviewId", isLoggedIn, getCommentsByReviewIdController);
route.get("/:userId", isLoggedIn, getCommentsByUserIdController);

module.exports = route;
module.exports.isLoggedIn = isLoggedIn;

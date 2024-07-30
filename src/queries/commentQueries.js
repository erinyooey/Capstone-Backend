const { prisma, jwt } = require("../shared/shared");
const JWT_SECRET = process.env.JWT_SECRET || "shhh";
if (JWT_SECRET === "shhh") {
  console.log("SET JWT ENVIRONMENT VARIABLE IN PRODUCTION");
}
const { findUserWithToken } = require("./userQueries");

// to display all comments
const getAllComments = async() => {
  return await prisma.comment.findMany()
}

const getCommentsByReviewId = async(reviewId) => {
  return await prisma.comment.findMany({
    where: {reviewId: reviewId},
    include: {user: true}
  })
}

const getCommentsByUserId = async(userId) => {
  return await prisma.comment.findMany({
    where: {userId: userId},
    include: {review: true}
  })
}

const createComment = async ({ reviewId, writtenComment, authorizationHeader }) => {
  const user = await findUserWithToken(authorizationHeader)

  return await prisma.comment.create({
    data: {
      reviewId: reviewId,
      userId: user.id,
      writtenComment: writtenComment,
    }
  })
};

const updateComment = async({commentId, writtenComment, authorizationHeader}) => {
  const user = await findUserWithToken(authorizationHeader)

  const comment = await prisma.comment.findUnique({
    where: {id: commentId}
  })

  if(comment.userId !== user.id){
    throw new Error("You can only edit your own comments")
  }

  return await prisma.comment.update({
    where: {id: commentId},
    data: {writtenComment: writtenComment}
  })
}

const deleteComment = async(commentId, authorizationHeader) => {
  const user = await findUserWithToken(authorizationHeader)

  const comment = await prisma.comment.findUnique({
    where: {id: commentId}
  })

  if(comment.userId !== user.id){
    throw new Error("You can only delete your own comments")
  }

  await prisma.comment.delete({
    where: {id: commentId}
  })
  return {message: "Comment deleted"}

}

module.exports = {
  getAllComments,
  getCommentsByReviewId,
  getCommentsByUserId,
  createComment,
  updateComment,
  deleteComment
};

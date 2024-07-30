const {
    getAllComments,
    getCommentsByReviewId,
    getCommentsByUserId,
    createComment,
    updateComment,
    deleteComment
} = require("../queries/commentQueries")

const getAllCommentsController = async(req, res) => {
    try {
        const comments = await getAllComments()
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch comments"})
    }
}

const getCommentsByReviewIdController = async(req, res) => {
    const {reviewId} = req.params
    try {
        const comments = await getCommentsByReviewId(reviewId)
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch comments by review id"})
    }
}

const getCommentsByUserIdController = async(req, res) => {
    const {userId} = req.params
    try {
        const comments = await getCommentsByUserId(userId)
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch comments by user id"})
    }
}

const createCommentController = async(req, res) => {
    const {reviewId, writtenComment} = req.body
    const authorizationHeader = req.headers.authorization
    try {
        const newComment = await createComment({reviewId, writtenComment, authorizationHeader})
        res.status(201).json(newComment)
    } catch (error) {
        res.status(500).json({error: "Failed to create comment"})
    }
}

const updateCommentController = async(req, res) => {
    const {commentId} = req.params
    const {writtenComment} = req.body
    const authorizationHeader = req.headers.authorization
    try {
        const updatedComment = await updateComment({commentId, writtenComment, authorizationHeader})
        res.status(200).json(updatedComment)
    } catch (error) {
        res.status(500).json({error: "Failed to update comment"})
    }
}

const deleteCommentController = async(req, res) => {
    const {commentId} = req.params
    const authorizationHeader = req.headers.authorization
    try {
        const result = await deleteComment(commentId, authorizationHeader)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({error: "Failed to delete comment"})
    }
}

module.exports = {
    getAllCommentsController,
    getCommentsByReviewIdController,
    getCommentsByUserIdController,
    createCommentController,
    updateCommentController,
    deleteCommentController
}


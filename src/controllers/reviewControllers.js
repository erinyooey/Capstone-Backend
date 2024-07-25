const {createReview} = require("../queries/reviewQueries")

const createReviewController = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization
        const reviewData = {
            writtenReview: req.body.writtenReview,
            rating: req.body.rating,
            restaurantId: req.body.restaurantId
        }
        const newReview = await createReview(reviewData, authorizationHeader)
        res.status(201).json(newReview)
    } catch (error) {
        console.error("Failed to create new review: ", error)
        res.status(400).json({error: "Failed to create review"})
    }
} 

module.exports = {
    createReviewController
}
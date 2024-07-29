const {createReview, 
getReviewsForRestaurant,
getReviewById,
updateReview,
deleteReview,
getReviewsByUser
} = require("../queries/reviewQueries")

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

const getReviewsForRestaurantController = async(req, res) => {
    try {
        const restaurantId = req.params.restaurantId;
        const reviews = await getReviewsForRestaurant(restaurantId)
        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json({error: "Failed to get reviews for restaurant"})
    }
}

const getReviewByIdController = async(req, res) => {
    try {
        const reviewId = req.params.id;
        const review = await getReviewById(reviewId)
        res.status(200).json(review)
    } catch (error) {
        res.status(500).json({error: "Cannot get review by its id"})
    }
}

const updatedReviewController = async(req, res) => {
    try {
        const reviewData = {writtenReview: req.body.writtenReview, rating: req.body.rating}
        const updatedReview = await updateReview(req.params.id, reviewData, req.headers.authorization)
        res.status(200).json(updateReview)
    } catch (error) {
        res.status(400).json({error: "Failed to update review"})
    }
}

const deleteReviewController = async(req, res) => {
    try {
        await deleteReview(req.params.id, req.headers.authorization)
        res.status(204).send()
    } catch (error) {
        res.status(400).json({error: "Failed to delete review"})
    }
}

const getReviewsByUserController = async(req, res) => {
    try {
        const userId = req.params.userId;
        const reviews = await getReviewById(userId)
        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json({error: "Failed to get reviews by user"})
    }
}

module.exports = {
    createReviewController,
    getReviewsForRestaurantController,
    getReviewByIdController,
    updatedReviewController,
    deleteReviewController,
    getReviewsByUserController
}
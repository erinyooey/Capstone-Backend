const { prisma, jwt } = require("../shared/shared");
const JWT_SECRET = process.env.JWT_SECRET || 'shhh';
if(JWT_SECRET === 'shhh'){
    console.log('SET JWT ENVIRONMENT VARIABLE IN PRODUCTION')
}
const {findUserWithToken} = require("./userQueries")

const createReview = async ({writtenReview, rating, restaurantId}, authorizationHeader) => {
    const user = await findUserWithToken(authorizationHeader)

    // 5 star rating logic
    if (rating < 1 || rating > 5){
        throw new Error('Rating must be between 1 and 5')
    }

    const review = await prisma.review.create({
        data: {
            writtenReview,
            rating,
            restaurantId,
            userId: user.id // associate the review with the user who created it
        }
    })
    return review
}

const getReviewsForRestaurant = async(restaurantId) => {
    const reviews = await prisma.review.findMany({
        where: {restaurantId},
        include: {
            user: true,
            comments: {
                include: {user: true}
            }
        }
    })
    return reviews
}

const getReviewById = async(reviewId) => {
    const review = await prisma.await.findUnique({
        where: {id: reviewId},
        include: {
            user: true,
            comments: {
                include: {user: true}
            }
        }
    })
    return review
}

const updateReview = async(reviewId, {writtenReview, rating}, authorizationHeader)=> {
    const user = await findUserWithToken(authorizationHeader) // only user who created the review can update

    const review = await prisma.review.findUnique({
        where: {id: reviewId}
    })

    if(review.userId !== user.id){
        throw new Error("You can only edit your own reviews")
    }
    const updatedReview = await prisma.review.update({
        where: {id: reviewId},
        data: {
            writtenReview,
            rating
        }
    })
    return updateReview
}

const deleteReview = async(reviewId, authorizationHeader) => {
    const user = await findUserWithToken(authorizationHeader)

    const review = await prisma.review.findUnique({
        where: {id: reviewId}
    })

    if(review.userId !== user.id){
        throw new Error("You can only delete your own reviews")
    }
    await prisma.review.delete({
        where: {id: reviewId}
    })

    return {message: "Review deleted"}
}

const getReviewsByUser = async(userId) => {
    const reviews = await prisma.review.findMany({
        where: {userId},
        include: {
            restaurant: true,
            comments: {
                include: {user: true}
            }
        }
    })
    return reviews
}

module.exports = {
    createReview,
    getReviewsForRestaurant,
    getReviewById,
    updateReview,
    deleteReview,
    getReviewsByUser
}
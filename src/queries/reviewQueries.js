const { prisma, jwt } = require("../shared/shared");
const JWT_SECRET = process.env.JWT_SECRET;
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
            userId: user.id
        }
    })
    return review
}

module.exports = {
    createReview
}
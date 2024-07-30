const {prisma} = require("../src/shared/shared")

const user = [
    {
        firstName: "User1",
        lastName: "Test",
        email: "hi@example.com",
        password: "first",
        role: "USER"
    },
    {
        firstName: "Admin",
        lastName: "Seed 2",
        email: "hi123@example.com",
        password: "second",
        role: "ADMIN"
    },
    {
        firstName: "User 3",
        lastName: "Seed 3",
        email: "hi321@example.com",
        password: "third",
        role: "USER"
    }
]

const favoriteRestaurant = [
    {
        businessName: "Chipotle",
        category: "Mexican",
        address: "123 Main St",
        operationTime: "9am-10pm"        
    }
]

const restaurant = [
    {
        businessName: "Chipotle",
        category: "Mexican",
        address: "123 Main St",
        operationTime: "9am-10pm"
    },
    {
        businessName: "Olive Garden",
        category: "Italian",
        address: "541 St",
        operationTime: "12pm-9pm"        
    },
    {
        businessName: "Shake Shack",
        category: "American",
        address: "928 St",
        operationTime: "9am-9pm"        
    }
]

const review = [
    {
        writtenReview: "My favorite place!",
        rating: 5,
        restaurantId: restaurant.id,
        userId: user.id
    },
    {
        writtenReview: "Not bad",
        rating: 3,
        restaurantId: restaurant.id,
        userId: user.id
    },
    {
        writtenReview: "Service is horrible",
        rating: 1,
        restaurantId: restaurant.id,
        userId: user.id
    }
]

const comment = [
    {
        reviewId: review.id,
        userId: user.id,
        writtenComment: "I totally agree.",
    },
    {
        reviewId: review.id,
        userId: user.id,
        writtenComment: "I thought the food was great",
    },
    {
        reviewId: review.id,
        userId: user.id,
        writtenComment: "That's crazy!",
    }
]

module.exports = {user, favoriteRestaurant, restaurant, review, comment}
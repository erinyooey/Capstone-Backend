const {prisma} = require("../src/shared/shared")
const {user, favoriteRestaurant, restaurant, review, comment} = require('./data')

const load = async() => {
    try {
        await prisma.user.createMany({
            data: user
        })
        console.log("User database created")

        await prisma.favoriteRestaurant.createMany({
            data: favoriteRestaurant
        })
        console.log("Favorite restaurant database created")

        await prisma.restaurant.createMany({
            data: restaurant
        })
        console.log("Restaurant database created")

        // To get ids from users and restaurants
        // const users = await prisma.user.findMany()
        // const restaurants = await prisma.restaurant.findMany()

        // const updatedReviews

        await prisma.review.createMany({
            data: review
        })
        console.log("Reviews are created")

        await prisma.comment.createMany({
            data: comment
        })
        console.log("Comments are created")


    } catch (error) {
        console.error(error)
    } finally{
        await prisma.$disconnect()
    }

    console.log("Database seeded")
}

load()
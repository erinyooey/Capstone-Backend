const {prisma} = require("../src/shared/shared")
const {user, favoriteRestaurant, restaurant, review, comment} = require('./data')

const load = async() => {
    try {
        prisma.user.createMany({
            data: user
        })
        console.log("User database created")

        prisma.favoriteRestaurant.createMany({
            data: favoriteRestaurant
        })
        console.log("Favorite restaurant database created")

        prisma.restaurant.createMany({
            data: restaurant
        })
        console.log("Restaurant database created")

        prisma.review.createMany({
            data: review
        })
        console.log("Reviews are created")

        prisma.comment.createMany({
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
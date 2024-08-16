const {prisma} = require("../src/shared/shared")
const {user, favoriteRestaurant, restaurant, review, comment} = require('./data')

const load = async() => {
    try {
        await prisma.user.createMany({
            data: user
        })
        console.log("User database created")

        await prisma.product.createMany({
            data: product
        })
        console.log("Shoe product database created")


        await prisma.cart.createMany({
            data: cart
        })
        console.log("Cart database is created")

    } catch (error) {
        console.error(error)
    } finally{
        await prisma.$disconnect()
    }

    console.log("Database seeded")
}

load()
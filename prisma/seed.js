const {prisma} = require("../src/shared/shared")
const {user, cart, product} = require('./data')

const load = async() => {
    try {
        // Clear existing data
        await prisma.user.deleteMany({});
        await prisma.cart.deleteMany({});
        await prisma.product.deleteMany({});
        console.log("Existing data deleted");

        await prisma.user.createMany({
            data: user
        })
        console.log("User database created")

        // Fetch created users to get their IDs
        const user1 = await prisma.user.findUnique({where: {email: "hi@example.com"}})
        const user2 = await prisma.user.findUnique({where: {email: "hi123@example.com"}})

        // create products
        await prisma.product.createMany({
            data: product
        })
        console.log("Shoe product database created")

        // Fetch created products to get their ids
        const product1 = await prisma.product.findFirst({where: {name: "Converse Chuck Taylor All Star High Top"}})
        const product2 = await prisma.product.findFirst({where: {name: "Converse Chuck Taylor All Star Low Top"}})
        
        // create carts individually using user ids
        const cart1 = await prisma.cart.create({ data: { userId: user1.id } });
        const cart2 = await prisma.cart.create({ data: { userId: user2.id } });
        
        console.log("Cart database is created")

        await prisma.cartItem.createMany({
            data: [
                {
                    cartId: cart1.id,
                    productId: product1.id,
                    quantity: 3
                },
                {
                    cartId: cart2.id,
                    productId: product2.id,
                    quantity: 1
                }
            ]
        })
        console.log("Cart items created")

    } catch (error) {
        console.error("Error seeding the database", error)
    } finally{
        await prisma.$disconnect()
    }

    console.log("Database seeded")
}

load()
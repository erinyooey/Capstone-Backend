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

const cart = [
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

const product = [
    {
        name: "Converse Chuck Taylor All Star High Top",
        price: 55.00,
        pictureUrl: "",
        description: "The iconic Converse high-top sneaker",
        isAvailable: true,
    },
    {
        name: "Converse Chuck Taylor All Star Low Top",
        price: 50.00,
        pictureUrl: "",
        description: "The low-top version of the timeless Converse Chuck Taylor All Star",
        isAvailable: true,
    },
    {
        name: "Converse Chuck 70 High Top",
        price: 85.00,
        pictureUrl: "",
        description: "",
        isAvailable: true,
    }
]


module.exports = {user, cart, product}
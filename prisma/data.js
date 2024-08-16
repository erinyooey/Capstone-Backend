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
        userId: "",
        cartItem: [
            {
                productId: "",
                quantity: 3,
            }
        ],
    },
    {
        userId: "",
        cartItem: [
            {
                productId: "",
                quantity: 2,
            }
        ],    
    },
    {
        userId: "",
        cartItem: [
            {
                productId: "",
                quantity: 1,
            }
        ],  
    }
]

const product = [
    {
        name: "Converse Chuck Taylor All Star High Top",
        price: 55.00,
        pictureUrl: "https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw3931bb17/images/a_107/M9160_A_107X1.jpg?sw=964",
        description: "The iconic Converse high-top sneaker",
        isAvailable: true,
    },
    {
        name: "Converse Chuck Taylor All Star Low Top",
        price: 50.00,
        pictureUrl: "https://images.journeys.com/images/products/1_4386_FS.JPG",
        description: "The low-top version of the timeless Converse Chuck Taylor All Star",
        isAvailable: true,
    },
    {
        name: "Converse x Comme des Garcons PLAY Chuck 70 High Top",
        price: 150.00,
        pictureUrl: "https://www.converse.com/dw/image/v2/BJJF_PRD/on/demandware.static/-/Sites-cnv-master-catalog-we/default/dw65aadf74/images/a_08/150204C_A_08X1.jpg?sw=406",
        description: "The unique half-heart design, often seen in special collaborations, adds a stylish twist.",
        isAvailable: false,
    },
    {
        name: "Converse x Comme des Garcons PLAY Chuck 70 Low Top",
        price: 150.00,
        pictureUrl: "https://cdn-images.farfetch-contents.com/12/15/13/80/12151380_41472877_1000.jpg",
        description: "This Chuck 70 Low Top features the signature heart-and-eyes logo combined with everyday comfort.",
        isAvailable: true,
    },
    {
        name: "Converse Chuck 70 High Top",
        price: 90.00,
        pictureUrl: "https://www.toddsnyder.com/cdn/shop/files/converse-chuck-70-high-top-parchmentconverse-219876_2000x.jpg?v=1713496064",
        description: "A premium update to the classic high-top, offering modern comfort with a vintage look ",
        isAvailable: true,
    },
    {
        name: "Converse Chuck 70 Low Top",
        price: 85.00,
        pictureUrl: "https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dwf2220713/images/a_107/162065C_A_107X1.jpg?sw=964",
        description: "A low-top version of the Chuck 70, blending classic style with enhanced cushioning",
        isAvailable: true,
    },
    {
        name: "Converse One Star",
        price: 75.00,
        pictureUrl: "https://scene7.zumiez.com/is/image/zumiez/product_main_medium/Converse-One-Star-Pro-Black-%26-White-Suede-Skate-Shoes-_344519.jpg",
        description: "A bold, suede sneaker with the iconic star logo, perfect for casual wear",
        isAvailable: true,
    },
    {
        name: "Converse Run Star Hike",
        price: 100.00,
        pictureUrl: "https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dwe567d830/images/a_107/166800C_A_107X1.jpg?sw=964",
        description: "A chunky platform sneaker",
        isAvailable: true,
    }
]


module.exports = {user, cart, product}
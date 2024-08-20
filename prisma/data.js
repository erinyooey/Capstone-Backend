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
        name: "Converse Pro Leather",
        price: 90.00,
        pictureUrl: "https://www.converse.com/dw/image/v2/BJJF_PRD/on/demandware.static/-/Sites-cnv-master-catalog-we/default/dw5aa7f508/images/a_107/171069C_A_107X1.jpg?sw=964",
        description: "A classic basketball sneaker with a sleek, modern design.",
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
        name: "Converse Chuck Taylor All Star Lugged Lift",
        price: 75.00,
        pictureUrl: "https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dwf2d51c1e/images/a_107/A05101C_A_107X1.jpg?sw=964",
        description: "A rugged take on the classic high-top with a lugged outsole for extra traction and a bold look, now in crisp white.",
        isAvailable: true
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
        isAvailable: false,
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
    },
    {
        name: "Converse All Star Disrupt CX",
        price: 100.00,
        pictureUrl: "https://www.converse.com/dw/image/v2/BJJF_PRD/on/demandware.static/-/Sites-cnv-master-catalog-we/default/dwa0a81297/images/a_107/169447C_A_107X1.jpg?sw=964",
        description: "An innovative take on the classic Chuck Taylor with modern materials.",
        isAvailable: false,
    },
    {
        name: "Converse Run Star Motion",
        price: 110.00,
        pictureUrl: "https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dwca1a158f/images/a_107/171546C_A_107X1.jpg?sw=406",
        description: "An exaggerated platform sneaker with dynamic, wavy lines.",
        isAvailable: true,
    },
    {
        name: "Converse Jack Purcell",
        price: 80.00,
        pictureUrl: "https://n.nordstrommedia.com/id/sr3/15b10e8b-aff1-4b6c-aec6-cd186396ea71.jpeg?trim=color&w=350&h=536",
        description: "A heritage tennis shoe with a sleek and simple design.",
        isAvailable: true,
    },
    {
        name: "Converse All Star High Street",
        price: 65.00,
        pictureUrl: "https://media.kohlsimg.com/is/image/kohls/6805460_Dark_Waters?wid=400&hei=400&op_sharpen=1",
        description: "A modern update to the classic design with added padding for extra comfort and a sleek look",
        isAvailable: true
    },
    {
        name: "Converse Chuck Taylor All Star Lift Platform Canvas High Top",
        price: 70.00,
        pictureUrl: "https://www.converse.co.za/media/catalog/product/cache/7f6a169d6daf93d7e88ad894ec757bce/5/6/560845c_a_08x1.png",
        description: "A platform version of the classic high-top, elevating both height and style with a bold sole",
        isAvailable: false
    },
    {
        name: "Converse Chuck Taylor All Star Lift Platform Low Top",
        price: 70.00,
        pictureUrl: "https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dwd60cbc29/images/a_107/560251C_A_107X1.jpg?sw=964",
        description: "A low-top platform sneaker that elevates your style with its iconic design",
        isAvailable: true

    }
]


module.exports = {user, cart, product}
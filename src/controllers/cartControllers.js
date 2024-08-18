const {prisma} = require("../shared/shared")

const {createOrFindCart,
    addItem,
    removeItem,
    getCartByUserId,
    updateQuantity
} = require("../queries/cartQueries")

const createCart = async(req, res) => {
    // utilize user id. if no user id, throw 400 error
    if(!req.user || !req.user.id){
        return res.status(401).json({message: "Unauthorized: User not authenticated"})
    }
    try {
        const userId = req.user.id

        // check if a cart already exists for the user
        const existingCart = await prisma.cart.findUnique({where: {userId: userId}})
        if(existingCart){
            return res.status(400).json({message: "Cart already exists for this user"})
        }

        // else create a new cart for the user
        const createdCart = await prisma.cart.create({
            data: {
                userId, // associate with user id
            }
        })
        res.status(200).json({message: "Cart created", cart: createdCart})
    } catch (error) {
        console.error("Error creating cart: ", error)
        res.status(500).json({error: "Failed to create cart"})
    }
}

const addItemToCart = async (req, res) => {
    const {productId, quantity} = req.body
    const userId = req.user.id;
    try {
        const userCart = await prisma.cart.findUnique({
            where: { userId: userId },
        });
        if (!userCart) {
            return res.status(404).json({ error: "Cart not found for this user" });
        }
         // Use the cart ID to add an item to the cart
    const addedItem = await addItem(userCart.id, productId, quantity);
    res.status(200).json(addedItem);
    } catch (error) {
        console.error("console error: ", error)
        res.status(500).json({error: "Failed to add item to cart"})
    }
} 

const updateCartItem = async(req, res) => {
    try {
        const {cartId, quantity, productId} = req.body;
        const cartItem = await updateQuantity({cartId, quantity, productId})
        res.status(200).json(cartItem)
    } catch (error) {
        console.error("error: ", error)
        res.status(500).json({error: "Failed to get update cart item quantity"})
    }
}

const getCartForUser = async(req, res) => {
    try {
        const userId = req.user.id;
        const cart = await getCartByUserId(userId)
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({error: "Cannot get retrieve cart"})
    }
}


const removeItemFromCart = async(req, res) => {
    try {
        const {cartId, cartItemId} = req.body
        const deleteCartItem = await removeItem(cartId, cartItemId)
        res.status(204).send(deleteCartItem)
    } catch (error) {
        res.status(500).json({error: "Failed to remove item from cart"})
    }
}



module.exports = {
    addItemToCart,
    updateCartItem,
    getCartForUser,
    removeItemFromCart,
    createCart
}
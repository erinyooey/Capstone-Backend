const { prisma, jwt } = require("../shared/shared");
const WEB_TOKEN = process.env.WEB_TOKEN || "shhh";
if (WEB_TOKEN === "shhh") {
  console.log("SET JWT ENVIRONMENT VARIABLE IN PRODUCTION");
}

const createOrFindCart = async (userId) => {
  let cart = await prisma.cart.findUnique({
    where: {userId},
    include: {cartItems: true}
  })

  if(!cart){
    cart = await prisma.cart.create({
      data: {userId},
      include: {cartItems: true}
    })
  }

  return cart;
};

const addItem = async(cartId, productId, quantity = 1) => {
  try {
    console.log("Adding item to cart:", { cartId, productId, quantity }); // Debugging line

    const foundProduct = await prisma.product.findUnique({
      where: {id: productId}
    })
    console.log("product id: ", foundProduct)

    const existingItem = await prisma.cartItem.findFirst({
      where: {cartId: cartId, productId: productId}
    })

    if(existingItem){
      console.log("Item exists in cart, updating quantity..."); // Debugging line
      // update the cart quantity
      const updatedCartItem = await prisma.cartItem.update({
        where: {id: existingItem.id},
        data: {quantity: existingItem.quantity + quantity}
      })
      return updatedCartItem
    } else {
      const newItem = await prisma.cartItem.create({
        data: {
          cartId: cartId,
          productId: productId,
          quantity: quantity,
        }
      })
      return newItem
    }
  } catch (error) {
    console.error("Error adding item to cart", error)
    throw error
  }
}

const updateQuantity = async({cartId, quantity, productId})=>{
  try {
    console.log("cart item id: ", cartId)

    const existingCartItem = await prisma.cartItem.findFirst({
      where: {cartId: cartId, productId: productId}
    })

    if(!existingCartItem){
      // if user adds item for the first time, add the item with quantity 1
      const update = await prisma.cartItem.create({
        data: {quantity: 1},
      })
      return update
    }
    else{
      const update = await prisma.cartItem.update({
        where: {id: existingCartItem.id},
        data: {quantity}
      })
      return update
    }

  } catch (error) {
    console.error("Error updating quantity: ", error)
    throw new Error("Error updating quantity")
  }
}

const getCartByUserId = async (userId) => {
  return await prisma.cart.findUnique({
    where: {userId},
    include: {cartItems: {include: {product: true}}}
  })
}

const removeItem = async (cartId, cartItemId) => {
  try {
    return await prisma.cartItem.delete({
      where: {cartId, id: cartItemId}
    })
  } catch (error) {
    console.error("error deleting cart item: ", error)
    throw new Error("Failed removing cart item")
  }
}

module.exports = {
  createOrFindCart,
  getCartByUserId,
  removeItem,
  addItem,
  updateQuantity
}

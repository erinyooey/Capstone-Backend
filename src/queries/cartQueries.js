const { prisma, jwt } = require("../shared/shared");
const JWT_SECRET = process.env.JWT_SECRET || "shhh";
if (JWT_SECRET === "shhh") {
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
    const existingItem = await prisma.cartItem.findFirst({
      where: {cartId, productId}
    })
    
    let updatedCartItem;

    if(existingItem){
      // update the cart quantity
      updatedCartItem = await prisma.cartItem.update({
        where: {id: existingItem.id},
        data: {quantity: existingItem.quantity + quantity}
      })
    } else {
      // create cart item that got added
      updatedCartItem = await prisma.cartItem.create({
        data: {
          cartId,
          productId,
          quantity
        }
      })
    }
    return {
      id: updatedCartItem.id,
      productId: updatedCartItem.productId,
      quantity: updatedCartItem.quantity
    }
  } catch (error) {
    console.error("Error adding item to cart", error)
    throw error
  }
}

const updateQuantity = async({cartItemId, quantity})=>{
  try {
    const update = await prisma.cartItem.update({
      where: {id: cartItemId},
      data: {quantity}
    })
    return update
  } catch (error) {
    console.error("Error updating quantity")
    throw error
  }
}

const getCartByUserId = async (userId) => {
  return await prisma.cart.findUnique({
    where: {userId},
    include: {cartItems: {include: {product: true}}}
  })
}

const removeItem = async (cartItemId) => {
  let remove
  try {
    remove = await prisma.cartItem.delete({
      where: {id: cartItemId}
    })
  } catch (error) {
    console.error("error deleting cart item")
  }
  return remove
}

module.exports = {
  createOrFindCart,
  getCartByUserId,
  removeItem,
  addItem,
  updateQuantity
}

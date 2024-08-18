const express = require('express');
const router = express.Router();
const {
  addItemToCart,
  updateCartItem,
  getCartForUser,
  removeItemFromCart,
  createCart
} = require("../controllers/cartControllers");

const {isLoggedIn} = require("../../server/authMiddleware")

router.post("/create", isLoggedIn, createCart)
router.post("/add", isLoggedIn, addItemToCart);
router.put("/update", isLoggedIn, updateCartItem);
router.delete("/remove", isLoggedIn, removeItemFromCart);

router.get("/", isLoggedIn, getCartForUser)

module.exports = router;

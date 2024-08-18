const express = require('express');
const router = express.Router();
const {isAdmin, isLoggedIn} = require("../../server/authMiddleware")
const {
  addProduct,
  displayAllProducts,
} = require("../controllers/productControllers");


router.post("/addProduct", isLoggedIn, addProduct);
router.get("/", displayAllProducts);


module.exports = router;

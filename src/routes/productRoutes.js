const express = require('express');
const router = express.Router();
const {isAdmin, isLoggedIn} = require("../../server/authMiddleware")
const {
  addProduct,
  displayAllProducts,
  getProductById
} = require("../controllers/productControllers");

router.get("/:id", getProductById)
router.get("/", displayAllProducts);

router.post("/addProduct", isAdmin, addProduct);


module.exports = router;

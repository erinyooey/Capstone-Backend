const express = require('express');
const router = express.Router();
const {loginUser, registerUser, getAllUsersController} = require("../controllers/userControllers")
const {isAdmin} = require("../../server/authMiddleware")


router.post("/register", registerUser)
router.post("/login", loginUser)

router.get("/profile", isAdmin, getAllUsersController)
module.exports = router


const express = require("express") // express framework to create server and handle routing, requests, and responses
const bcrypt = require("bcrypt") // to securely store passwords through hashing
const jwt = require("jsonwebtoken") // for user authentication
const cors = require("cors")
const {PrismaClient} = require('@prisma/client') // import prisma client
const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())


module.exports = {
    prisma,
    app,
    bcrypt,
    jwt,
}
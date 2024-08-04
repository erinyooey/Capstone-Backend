const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const route = express.Router();
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

module.exports = {
  app,
  bcrypt,
  jwt,
  route,
  prisma,
};

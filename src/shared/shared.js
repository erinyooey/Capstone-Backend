const {PrismaClient} = require('@prisma/client') // import prisma client
const prisma = new PrismaClient()

module.exports = {
    prisma
}
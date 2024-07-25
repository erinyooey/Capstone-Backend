const { prisma, jwt } = require("../shared/shared");
const JWT_SECRET = process.env.JWT_SECRET;
const {findUserWithToken} = require("./userQueries")

const createComment = async() => {

}

module.exports = {
    createComment
}
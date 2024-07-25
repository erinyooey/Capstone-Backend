const { prisma, jwt } = require("../shared/shared");
const JWT_SECRET = process.env.JWT_SECRET || 'shhh';
if(JWT_SECRET === 'shhh'){
    console.log('SET JWT ENVIRONMENT VARIABLE IN PRODUCTION')
}
const {findUserWithToken} = require("./userQueries")

const createComment = async() => {

}

module.exports = {
    createComment
}
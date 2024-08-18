const { Role } = require("@prisma/client")
const {bcrypt, prisma, jwt} = require("../shared/shared")
const { user } = require("../../prisma/data")

// set up JWT token
const JWT = process.env.WEB_TOKEN || 'set jwt'
if(JWT === 'set jwt'){
    console.log('Set JWT environment variable')
}

const createUserQuery = async ({firstName, lastName, email, password}) => {
    try {
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                password: hashPassword,
                email,
            }
        })
        return {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email
        }
    } catch (error) {
        console.error("Error creating user: ", error)
        throw error
    }
}

const registerQuery = async({firstName, lastName, email, password}) => {
    const hashPassword = await bcrypt.hash(password, 10)
    const registerUser = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashPassword
        }
    })

    const token = jwt.sign(
    {
        id: registerUser.id
    },
    process.env.WEB_TOKEN,
    {
        expiresIn: "1h",
    }
)
return {token, user: registerUser}
}

// take jwt token from request header, verify it, and retrieve user associated with the token
const findUserByToken = async(header) => {
    if(!header){
        throw new Error("No authorization header provided")
    }
    const token = header.split(" ")[1]
    if(!token){
        throw new Error("No token provided")
    }
    let userId

    try {
        const payload = jwt.verify(token, process.env.WEB_TOKEN)
        userId = payload.id
    } catch (error) {
        throw new Error("Invalid or expired token")
    }
    const user = await prisma.user.findUnique({
        where: {id: userId}
    })
    if(!user){
        throw new Error("User not found")
    }
    return user
}

const getAllUsers = async() => {
    try {
        let users
        users = await prisma.user.findMany()
        return users
    } catch (error) {
        console.error("Failed to get all users: ", error)
        throw error
    }
}

const loginQuery = async ({email, password}) => {
    try {
        console.log("Login attempt: ", email)
        const userLogin = await prisma.user.findUnique({where: {email}})
        if(!userLogin){
            return {error: "Incorrect login"}
        }
        // use bcrypt.compare to verify password
        const validPassword = await bcrypt.compare(password, userLogin.password)
        if(!validPassword){
            return {error: "Incorrect Login"}
        }

        // return jwt token if login is successful
        const token = jwt.sign({id: userLogin.id}, process.env.WEB_TOKEN, {expiresIn: "1h"})


        return{token, 
            user: {firstName: userLogin.firstName, lastName: userLogin.lastName, email: userLogin.email}}

    } catch (error) {
        console.log(error)
        return {error: "Error logging in from query"}
    }
}

module.exports = {
    createUserQuery,
    getAllUsers,
    loginQuery,
    registerQuery,
    findUserByToken
}
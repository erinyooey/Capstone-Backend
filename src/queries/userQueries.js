const { Role } = require("@prisma/client")

// set up JWT token
const JWT = process.env.JWT || 'set jwt'
if(JWT === 'set jwt'){
    console.log('Set JWT environment variable')
}

const createUserQuery = async ({firstName, lastName, email, password}) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                password,
                email,
            }
        })
        return {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            password: newUser.password,
            email: newUser.email
        }
    } catch (error) {
        console.error("Error creating user: ", error)
        throw error
    }
}

const getAllUsers = async() => {
    try {
        let users
        users = await prisma.user.findMany()
        
    } catch (error) {
        console.error("Failed to get all users: ", error)
        throw error
    }
    return users
}

const loginQuery = async ({email, password}) => {
    try {
        const userLogin = await prisma.user.findUnique({where: {email}})
        if(!userLogin){
            return {error: "Incorrect login"}
        }
        return{firstName: userLogin.firstName, lastName: userLogin.lastName, email: userLogin.email}
    } catch (error) {
        console.log(error)
        return {error: "Error logging in from query"}
    }
}

module.exports = {
    createUserQuery,
    getAllUsers,
    loginQuery
}
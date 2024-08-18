const {createUserQuery, getAllUsers, loginQuery, registerQuery} = require("../queries/userQueries")

const loginUser = async(req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({error: "Email and password are required"})
    }
    try {
        const {token, user, error} = await loginQuery({email, password})
        if(error) {
            return res.status(401).json({error})
        }
        res.status(200).json({token, user})
    } catch (error) {
        console.error("Login error: ", error)
        res.status(500).json({message: "Failed to log in user"})
    }
}

const registerUser = async(req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body

        // call register query to create the user and get the token
        const {token, user} = await registerQuery({firstName, lastName, email, password})
        res.status(201).json({token, user})
    } catch (error) {
        res.status(500).json({error: "Failed to register user"})
    }
}

const getAllUsersController = async(req, res) => {
    try {
        const users = await getAllUsers()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error: "Failed to retrieve users"})
    }
}

module.exports = {
    loginUser,
    registerUser,
    getAllUsersController
}
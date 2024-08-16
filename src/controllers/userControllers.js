const {createUserQuery, getAllUsers, loginQuery} = require("../queries/userQueries")

const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body
        const result = await loginQuery({email, password})
        res.status(200).json(result)
    } catch (error) {
        console.error("Login error: ", error)
        res.status(500).json({message: "Error from controller"})
    }
}

module.exports = {
    loginUser
}
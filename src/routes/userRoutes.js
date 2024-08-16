const { route } = require("../shared/shared");
const {loginUser} = require("../controllers/userControllers")

route.post("/", loginUser)

module.exports = route

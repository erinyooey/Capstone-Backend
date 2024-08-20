const {findUserByToken} = require("../src/queries/userQueries")

const isLoggedIn = async (req, res, next) => {
    try {
        console.log("req.headers.authorization: ", req.headers.authorization)
        req.user = await findUserByToken(req.headers.authorization);
        console.log("Authenticated user: ", req.user)
        next();
    } catch (error) {
        console.log("Authorization error: ", error)
        return res.status(401).json({ message: "Unauthorized" });
    }
  };
  
  const isAdmin = (req, res, next) => {
    // ? is a safety check
    if (req.user?.role !== 'ADMIN') { // req.user?.role is same thing as checking
        // if(req.user !== undefined && req.user.role !== "ADMIN")
      return res.status(403).json({ message: "Admins only" });
    }
    next();
  };
  
  module.exports = {
    isLoggedIn,
    isAdmin
  };
const { route } = require("../shared/shared");
const { findUserWithToken } = require("../queries/userQueries");
const {
  addProduct,
  displayAllProducts,
} = require("../controllers/productControllers");


const isAdmin = (req, res, next) => {
  if(req.user.role !== 'ADMIN'){
    return res.status(403).json({message: "Admins only"})
  }
  next()
}

route.post("/addProduct", isAdmin, addProduct);
route.get("/", displayAllProducts);


module.exports = route;
module.exports.isAdmin = isAdmin;

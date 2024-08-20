const prisma = require("../shared/shared")

const {
    productQuery,
    getAllProduct,
    getProductByIdQuery
  } = require("../queries/productQueries");



  const addProduct = async (req, res) => {
    const { name, price, pictureUrl, isAvailable } = req.body;
  
    try {
      const productResponse = await productQuery(req.body);
      res.json(productResponse);
    } catch (error) {
      console.error(error);
      res.status(401).send("Invalid.");
    }
  };

  // display all products

  const displayAllProducts = async (req, res, next) => {
    try {      
      const products = await getAllProduct();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error in displayAllProducts:", error); // Log the detailed error
      res.status(500).json({error: "Internal Server Error"})
    }
  };

  // fetch single product by ID
  const getProductById = async(req, res)=> {
    console.log('req.params:', req.params); // Log the params to debug

    const {id} = req.params
    try {
      const product = await getProductByIdQuery(id)
      if(!product){
        return res.status(404).json({error: "Product not found"})
      }
      res.json(product)
    } catch (error) {
      console.error("Error fetching product by id:", error.message); // Log the actual error
      res.status(500).json({error: "Error fetching product by id"})
    }
  }

  module.exports = {
    addProduct,
    displayAllProducts,
    getProductById
  };

const {
    productQuery,
    getAllProduct,
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

  module.exports = {
    addProduct,
    displayAllProducts
  };

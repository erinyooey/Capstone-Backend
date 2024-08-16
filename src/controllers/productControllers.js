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
      res.status(500).json({error: "Internal Server Error"})
    }
  };



  // const deleteRestaurants = async (req, res, next) => {
  //   const id = req.params.id;
  //   const deleteRestaurant = await destroyRestaurant(id);
  //   res.send(deleteRestaurant);
  // };


  // const updateRestaurants = async (req, res, next) => {
  //   const restaurantId = req.params.id;
  
  //   try {
  //     const changedRestaurant = await alterRestaurant(
  //       restaurantId,
  //       req.body
  //     );
  //     res.json(changedRestaurant);
  //   } catch (error) {
  //     console.error(error);
  //     res
  //       .status(500)
  //       .json({ error: "Failed to update favorite restaurant info" });
  //   }
  // };
  

  module.exports = {
    addProduct,
    displayAllProducts
  };

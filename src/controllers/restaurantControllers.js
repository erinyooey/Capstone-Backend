const {
    restaurantsQuery,
    destroyRestaurant,
    getAllRestaurant,
    alterRestaurant,
  } = require("../queries/restaurantQueries");

  // add restaurant endpoint

  const addRestaurant = async (req, res) => {
    const { businessName, category, location, limit } = req.body;
  
    try {
      const restaurantResponse = await restaurantsQuery({
        businessName,
        category,
        location,
        limit,
      });
      res.json(restaurantResponse);
    } catch (error) {
      console.error(error);
      res.status(401).send("Invalid.");
    }
  };

  // display all restaurants

  const displayAllRestaurants = async (req, res, next) => {
    const restaurants = await getAllRestaurant();
    res.send(restaurants);
  };

  // delete restaurant

  const deleteRestaurants = async (req, res, next) => {
    const id = req.params.id;
    const deleteRestaurant = await destroyRestaurant(id);
    res.send(deleteRestaurant);
  };

  //update restaurant

  const updateRestaurants = async (req, res, next) => {
    const restaurantId = req.params.id;
  
    try {
      const changedRestaurant = await alterRestaurant(
        restaurantId,
        req.body
      );
      res.json(changedRestaurant);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Failed to update favorite restaurant info" });
    }
  };
  

  module.exports = {
    addRestaurant,
    deleteRestaurants,
    displayAllRestaurants,
    updateRestaurants,
  };
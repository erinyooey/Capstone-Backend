const {
  favoriteRestaurantsQuery,
  destroyFavoriteRestaurant,
  getAllFavoriteRestaurant,
  alterFavoriteRestaurant,
} = require("../queries/favoriteRestaurantQueries");

const favoriteRestaurant = async (req, res) => {
  const { businessName, category, operationTime, address } = req.body;

  try {
    const favoriteRestaurantResponse = await favoriteRestaurantsQuery({
      businessName,
      category,
      operationTime,
      address,
    });
    res.json(favoriteRestaurantResponse);
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid.");
  }
};

const deleteFavoriteRestaurants = async (req, res, next) => {
  const id = req.params.id;
  const deleteFavoriteRestaurant = await destroyFavoriteRestaurant(id);
  res.send(deleteFavoriteRestaurant);
};

// display all restaurant

const displayAllFavoriteRestaurants = async (req, res, next) => {
  const restaurants = await getAllFavoriteRestaurant();
  res.send(restaurants);
};

// update restaurant endpoint

const updateFavoriteRestaurants = async (req, res, next) => {
  const restaurantId = req.params.id;

  try {
    const changedFavoriteRestaurant = await alterFavoriteRestaurant(
      restaurantId,
      req.body
    );
    res.json(changedFavoriteRestaurant);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to update favorite restaurant info" });
  }
};

module.exports = {
  favoriteRestaurant,
  deleteFavoriteRestaurants,
  displayAllFavoriteRestaurants,
  updateFavoriteRestaurants,
};
const { bcrypt, prisma, jwt } = require("../shared/shared");
const JWT_SECRET = process.env.JWT_SECRET;

const favoriteRestaurantsQuery = async ({
  businessName,
  category,
  operationTime,
  address,
}) => {
  try {
    const createFavoriteRestaurant = await prisma.favoriteRestaurant.create({
      data: {
        businessName,
        category,
        operationTime,
        address,
      },
    });

    return {
      businessName: createFavoriteRestaurant.businessName,
      category: createFavoriteRestaurant.category,
      operationTime: createFavoriteRestaurant.operationTime,
      address: createFavoriteRestaurant.address,
    };
  } catch (error) {
    console.error("Error add restaurant", error);
    throw error;
  }
};

const destroyFavoriteRestaurant = async (id) => {
  let deleteRestaurant;
  try {
    deleteRestaurant = await prisma.favoriteRestaurant.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return deleteRestaurant;
};

// display all restaurant

const getAllRestaurant = async () => {
  const restaurants = await prisma.restaurant.findMany();
  return restaurants;
};

// update restaurant endpoint WIP

const alterRestaurant = async (id, body) => {
  try {
    const changedRestaurant = await prisma.Restaurant.update({
      where: { id },
      data: {
        id,
        castegory: category,
        location: location,
        limit: limit,
      },
    });
    return changedRestaurant;
  } catch (error) {
    console.error("Error updating restaurant:", error);
    throw error;
  }
};

module.exports = {
  favoriteRestaurantsQuery,
  destroyFavoriteRestaurant,
  getAllRestaurant,
  alterRestaurant,
};

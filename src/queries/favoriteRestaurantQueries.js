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

const getAllFavoriteRestaurant = async () => {
  const favoriteRestaurants = await prisma.favoriteRestaurant.findMany();
  return favoriteRestaurants;
};

// update restaurant endpoint WIP

const alterFavoriteRestaurant = async (id, body) => {
  try {
    const { businessName, category, operationTime, address } = body;
    const changedFavoriteRestaurant = await prisma.favoriteRestaurant.update({
      where: { id },
      data: {
        id,
        businessName: businessName,
        category: category,
        operationTime: operationTime,
        address: address,
      },
    });
    return changedFavoriteRestaurant;
  } catch (error) {
    console.error("Error updating favorite restaurant:", error);
    throw error;
  }
};

module.exports = {
  favoriteRestaurantsQuery,
  destroyFavoriteRestaurant,
  getAllFavoriteRestaurant,
  alterFavoriteRestaurant,
};

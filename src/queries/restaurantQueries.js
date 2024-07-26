const { bcrypt, prisma, jwt } = require("../shared/shared");
const JWT_SECRET = process.env.JWT_SECRET || 'shhh';
if(JWT_SECRET === 'shhh'){
  console.log('SET JWT ENVIRONMENT VARIABLE IN PRODUCTION')
}

const restaurantsQuery = async ({
  businessName,
  category,
  location,
  limit,
}) => {
  try {
    const createRestaurant = await prisma.restaurant.create({
      data: {
        businessName,
        category,
        location,
        limit,
      },
    });

    return {
      businessName: createRestaurant.businessName,
      category: createRestaurant.category,
      location: createRestaurant.location,
      limit: createRestaurant.limit,
    };
  } catch (error) {
    console.error("Error add restaurant", error);
    throw error;
  }
};

// display all restaurant

const getAllRestaurant = async () => {
  const Restaurants = await prisma.Restaurant.findMany();
  return Restaurants;
};

// delete restaurant

const destroyRestaurant = async (id) => {
  let deleteRestaurant;
  try {
    deleteRestaurant = await prisma.Restaurant.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return deleteRestaurant;
};

// update restaurant

const alterRestaurant = async (id, body) => {
  try {
    const { businessName, category, location, limit } = body;
    const changedRestaurant = await prisma.Restaurant.update({
      where: { id },
      data: {
        id,
        businessName: businessName,
        category: category,
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
  restaurantsQuery,
  destroyRestaurant,
  getAllRestaurant,
  alterRestaurant,
};

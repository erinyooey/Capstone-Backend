const { bcrypt, prisma, jwt } = require("../shared/shared");
const JWT_SECRET = process.env.JWT_SECRET || 'shhh';
if(JWT_SECRET === 'shhh'){
  console.log('SET JWT ENVIRONMENT VARIABLE IN PRODUCTION')
}

const productQuery = async ({
  name,
  price,
  pictureUrl,
  description,
  isAvailable
}) => {
  try {
    const createProduct = await prisma.product.create({
      data: {
        name,
        price,
        pictureUrl,
        description,
        isAvailable
      },
    });

    return {
      name: createProduct.name,
      price: createProduct.price,
      pictureUrl: createProduct.pictureUrl,
      description: createProduct.description,
      isAvailable: createProduct.pictureUrl
    };
  } catch (error) {
    console.error("Error add product", error);
    throw error;
  }
};

// display all restaurant

const getAllProduct = async () => {
  const products = await prisma.product.findMany();
  return products;
};

// delete restaurant

// const destroyRestaurant = async (id) => {
//   let deleteRestaurant;
//   try {
//     deleteRestaurant = await prisma.Restaurant.delete({
//       where: {
//         id: id,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
//   return deleteRestaurant;
// };

// update restaurant

// const alterRestaurant = async (id, body) => {
//   try {
//     const { businessName, category, address, operationTime } = body;
//     const changedRestaurant = await prisma.Restaurant.update({
//       where: { id },
//       data: {
//         id,
//         businessName: businessName,
//         category: category,
//         address: address,
//         operationTime: operationTime,
//       },
//     });
//     return changedRestaurant;
//   } catch (error) {
//     console.error("Error updating restaurant:", error);
//     throw error;
//   }
// };

module.exports = {
  productQuery,
  getAllProduct
};

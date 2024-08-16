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

const getAllProduct = async () => {
  const products = await prisma.product.findMany();
  return products;
};


module.exports = {
  productQuery,
  getAllProduct
};

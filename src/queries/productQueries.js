const { bcrypt, prisma, jwt } = require("../shared/shared");
const WEB_TOKEN = process.env.WEB_TOKEN || 'shhh';
if(WEB_TOKEN === 'shhh'){
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
    // console.log("createProduct: ", createProduct)

    // check product id
    // const product = await prisma.product.findUnique({
    //   where: { id: productId },
    // });
    
    // if (!product) {
    //   console.error(`Product with ID ${productId} does not exist`);
    //   return res.status(400).json({ message: "Invalid product ID" });
    // }

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
  try {    
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.error("Error fetching products: ", error)
    throw error
  }
};

const getProductByIdQuery = async (id) => {
  try {
    const product = await prisma.product.findUnique({
      where: {id: id}
    })
    return product
  } catch (error) {
    console.error("Error fetching product by ID in query: ", error)
    throw error
  }
}

module.exports = {
  productQuery,
  getAllProduct,
  getProductByIdQuery
};

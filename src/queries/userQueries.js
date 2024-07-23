const { bcrypt, prisma, jwt } = require("../shared/shared");
const JWT_SECRET = process.env.JWT_SECRET;

const registerQuery = async ({ firstName, lastName, email, password }) => {
  const hashPassword = await bcrypt.hash(password, 10);
  const registerUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashPassword,
    },
  });
  const token = jwt.sign(
    {
      id: registerUser.id,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return {
    token: token,
    firstName: registerUser.firstName,
    lastName: registerUser.lastName,
    email: registerUser.email,
  };
};

const loginQuery = async ({ email, password }) => {
  try {
    const userLogin = await prisma.user.findUnique({
      where: { email },
    });
    if (!userLogin || !bcrypt.compareSync(password, userLogin.password)) {
      return "Invalid login credentials.";
    }
    const token = jwt.sign(
      {
        id: userLogin.id,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return {
      token: token,
      id: userLogin.id,
      firstName: userLogin.firstName,
      lastName: userLogin.lastName,
      email: userLogin.email,
    };
  } catch (error) {
    console.log(error);
  }
};

const getOneUser = async (userId) => {
  let oneUser;

  try {
    oneUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return oneUser;
  console.log(oneUser);
};

const getMe = async ({ id }) => {
  let meUser;

  try {
    meUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!meUser) {
      throw new Error("User not found");
    }

    console.log(meUser);

    return meUser;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Error fetching user information");
  }
};

const getAllUser = async () => {
  let allUsers;

  try {
    allUsers = await prisma.user.findMany();
  } catch (error) {
    console.log(error);
  }
  return allUsers;
  console.log(getAllUser);
};

const findUserWithToken = async (authorizationHeader) => {
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    throw new Error("Authorization header is missing or malformed");
  }
  const token = authorizationHeader.split(" ")[1];
  const decoded = jwt.verify(token, JWT_SECRET);
  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });
  if (!user) {
    throw new Error("User not found or token is invalid");
  }
  return user;
};

const destroyUser = async (userId) => {
  let byeUser;
  try {
    byeUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return byeUser;
};

const alterUser = async ({ id, firstName, lastName, password }) => {
  try {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const changedUser = await prisma.user.update({
      where: { id },
      data: {
        id,
        firstName: firstName,
        lastName: lastName,
        password: hashPassword,
      },
    });
    return changedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

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

module.exports = {
  registerQuery,
  loginQuery,
  getAllUser,
  getOneUser,
  getMe,
  findUserWithToken,
  destroyUser,
  alterUser,
  favoriteRestaurantsQuery,
  destroyFavoriteRestaurant,
};

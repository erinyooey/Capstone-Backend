const { bcrypt, prisma, jwt } = require("../shared/shared");
const JWT_SECRET = process.env.JWT_SECRET || 'shhh';
if(JWT_SECRET === 'shhh'){
  console.log('SET JWT ENVIRONMENT VARIABLE IN PRODUCTION')
}

const registerQuery = async ({ firstName, lastName, email, password }) => {
  const hashPassword = await bcrypt.hash(password, 10);
  const registerUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      role: "USER",
      password: hashPassword,
    },
  });
  const token = jwt.sign(
    {
      id: registerUser.id,
      role: registerUser.role
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
    if (!userLogin || !bcrypt.compare(password, userLogin.password)) {
      return "Invalid login credentials.";
    }
    const token = jwt.sign(
      {
        id: userLogin.id,
        role: userLogin.role
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
    return {error: "an error occurred during login"}
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
  console.log(oneUser);
  return oneUser;
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
  console.log("authorization header: ", authorizationHeader)
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    throw new Error("Authorization header is missing or malformed");
  }
  const token = authorizationHeader.split(" ")[1];
  console.log("Token: ", token)
  let decoded
  try {
    decoded = jwt.verify(token, JWT_SECRET);
    console.log("decoded token", decoded)
  } catch (error) {
    throw new Error("Invalid token")
  }


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

module.exports = {
  registerQuery,
  loginQuery,
  getAllUser,
  getOneUser,
  getMe,
  findUserWithToken,
  destroyUser,
  alterUser,
};
